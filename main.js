"use strict";

/*
 * Created with @iobroker/create-adapter v1.23.0
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require("@iobroker/adapter-core");

let exec;
let tmr_EQ3Update = null;

class Eq3Thermostat extends utils.Adapter {

    /**
     * @param {Partial<ioBroker.AdapterOptions>} [options={}]
     */
    constructor(options) {
        super({
            ...options,
            name: "eq3-thermostat",
        });
        this.on("ready", this.onReady.bind(this));
        this.on("objectChange", this.onObjectChange.bind(this));
        this.on("stateChange", this.onStateChange.bind(this));
        this.on("message", this.onMessage.bind(this));
        this.on("unload", this.onUnload.bind(this));
    }

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    async onReady() {
        // Initialize your adapter here
        const version = process.version;
        const va = version.split(".");
        if (va[0] === "v0" && va[1] === "10") {
            this.log.info("NODE Version = " + version + ", we need new exec-sync");
            exec     = require("sync-exec");
        } else {
            this.log.info("NODE Version = " + version + ", we need new execSync");
            exec     = require("child_process").execSync;
        }
        
        this.log.info("##### LOADED CONFIG ##### ");
        this.log.info("Loaded " + this.config.getEQ3Devices.length + " eq3-Devices");
        this.log.info("Update-Interval: " + this.config.inp_refresh_interval);
        this.log.info("PY-Script Path:  \"" + this.config.inp_eq3Controller_path +"\" ");


        this.log.info("##### CREATE OBJECTS ##### ");
        if (this.config.getEQ3Devices.length) {
            for (let nDev = 0; nDev < this.config.getEQ3Devices.length; nDev++) {
                const sDevMAC = this.config.getEQ3Devices[nDev].eq3MAC;
                await this.createDevice(sDevMAC);
                await this.createState(sDevMAC,"","temperature","level");
                await this.createState(sDevMAC,"","valve","level");
                await this.createState(sDevMAC,"","low_battery_alarm","indicator");
                await this.createState(sDevMAC,"","name","text");
            }
        }


        this.log.info("##### RUN ADAPTER ##### ");

        if (this.config.getEQ3Devices.length) {
            this.fEQ3Update();
        }
        
        /*
        For every state in the system there has to be also an object of type state
        Here a simple template for a boolean variable named "testVariable"
        Because every adapter instance uses its own unique namespace variable names can't collide with other adapters variables
        
        await this.setObjectAsync("testVariable", {
            type: "state",
            common: {
                name: "testVariable",
                type: "boolean",
                role: "indicator",
                read: true,
                write: true,
            },
            native: {},
        });

        */

        // in this template all states changes inside the adapters namespace are subscribed
        this.subscribeStates("*");

        /*
        setState examples
        you will notice that each setState will cause the stateChange event to fire (because of above subscribeStates cmd)
        
        // the variable testVariable is set to true as command (ack=false)
        await this.setStateAsync("testVariable", true);

        // same thing, but the value is flagged "ack"
        // ack should be always set to true if the value is received from or acknowledged from the target system
        await this.setStateAsync("testVariable", { val: true, ack: true });

        // same thing, but the state is deleted after 30s (getState will return null afterwards)
        await this.setStateAsync("testVariable", { val: true, ack: true, expire: 30 });

        // examples for the checkPassword/checkGroup functions
        let result = await this.checkPasswordAsync("admin", "iobroker");
        this.log.info("check user admin pw iobroker: " + result);

        result = await this.checkGroupAsync("admin", "admin");
        this.log.info("check group user admin group admin: " + result);
        */
    }

    /**
     * Is called when adapter shuts down - callback has to be called under any circumstances!
     * @param {() => void} callback
     */
    onUnload(callback) {
        try {
            if (tmr_EQ3Update) {
                clearInterval(tmr_EQ3Update);
                tmr_EQ3Update = null;
            }
            this.log.info("cleaned everything up...");
            callback();
        } catch (e) {
            callback();
        }
    }

    /**
     * Is called if a subscribed object changes
     * @param {string} id
     * @param {ioBroker.Object | null | undefined} obj
     */
    onObjectChange(id, obj) {
        if (obj) {
            // The object was changed
            this.log.info(`object ${id} changed: ${JSON.stringify(obj)}`);
        } else {
            // The object was deleted
            this.log.info(`object ${id} deleted`);
        }
    }

    /**
     * Is called if a subscribed state changes
     * @param {string} id
     * @param {ioBroker.State | null | undefined} state
     */
    onStateChange(id, state) {
        if (state) {
            //And only if it's not changed from this adapter
            if (!(state.from == "system.adapter.eq3-thermostat.0")) {
                //And only on Temperature Change since this is the Only one implemented yet
                const aState = id.split(".");
                if (aState[aState.length-1].toString() == "temperature") {   //aState.len -1 = statename
                    this.log.info(id + " changed from " + state.from);
                    //Only send BT Temperature after Temperature does not have Changed for 8 Seconds
                    const sTmrName = "tmr_" + aState[aState.length-2];  //aState.len -2 = MAC
                    if(global[sTmrName]) {  //if Timer active
                        clearTimeout(global[sTmrName]);    //Reset it
                    }
                    global[sTmrName] = setTimeout(this.fSetTemp.bind(this, aState[aState.length-2], state.val), 8000);   // this, MAC, Temperatur
                }
            }
        } else {
            // The state was deleted
        }
    }
    
    // /**
    //  * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
    //  * Using this method requires "common.message" property to be set to true in io-package.json
    //  * @param {ioBroker.Message} obj
    //  */
    onMessage(obj) {
        if (typeof obj === "object") {
            //TT, Pathcheck
            if (obj.command === "checkEQ3Path") {
                //TT, save Command Result true/false
                const bCMDRes = this.fCheckLiveEQ3Controller(obj.message.EQ3Path);
                //TT, send Result back
                if (obj.callback) this.sendTo(obj.from, obj.command, bCMDRes.toString(), obj.callback);
            }
        }
    }

    fCheckLiveEQ3Controller(sPath) {
        try {
            const sCommand = "python " + sPath + " check";
            const sCmdRes = exec(sCommand).toString().trim();
            this.log.info("Result from Command \"" + sCommand + "\": " + sCmdRes);
            if (sCmdRes === "eq3OK") {
                this.log.info("check successful!");
                return true;
            }
        }catch (e) {
            this.log.info("check Failed! Responese doesn't match eq3OK");
            return false;
        }
        this.log.info("check Failed! Responese doesn't match eq3OK");
        return false;
    }
    //sudo timeout 10s sudo hcitool lescan | grep CC-RT-BLE

    fEQ3Update() {
        if (this.config.getEQ3Devices.length) {
            //Set Timer for next Update
            tmr_EQ3Update = setTimeout(() =>this.fEQ3Update(),this.config.inp_refresh_interval * 60000);

            //Get Information from EQ3 Devices via Python script for each device
            for (let nDev = 0; nDev < this.config.getEQ3Devices.length; nDev++) {
                const sDevMAC = this.config.getEQ3Devices[nDev].eq3MAC;
                const sDevName = this.config.getEQ3Devices[nDev].eq3Name; 
                const sPath = this.config.inp_eq3Controller_path;
                const sCommand = "python " + sPath + " getValue " + sDevMAC;  
                try {
                    //0 = Temperature | 1 = Valve | 2 = LowBattaryAlarm 
                    const aCmdRes = exec(sCommand).toString().trim().split(";");
                    this.fUpdateDevObj(aCmdRes, sDevMAC, sDevName);
                }catch (e) {
                    this.log.error("Command \"" + sCommand + "\" failed!");
                    this.log.error("-----------\"" + e);
                }      
            }
        }else{
            //No Devices No Timer
            clearInterval(tmr_EQ3Update);
            tmr_EQ3Update = null;
        }
    }

    fUpdateDevObj(aDevValues, sDevMAC, sDevName) {
        //0 = Temperature | 1 = Valve | 2 = LowBattaryAlarm 
        this.setStateAsync(sDevMAC+".temperature", { val: aDevValues[0], ack: true });
        this.setStateAsync(sDevMAC+".valve", { val: aDevValues[1], ack: true });
        this.setStateAsync(sDevMAC+".low_battery_alarm", { val: aDevValues[2], ack: true });
        this.setStateAsync(sDevMAC+".name", { val: sDevName, ack: true });
    }

    fSetTemp(sDevMAC, sTemp) {
        this.log.info("********MAC: " + sDevMAC + " Temp: "+sTemp);
        const sPath = this.config.inp_eq3Controller_path;
        const sCommand = "python " + sPath + " setValue " + sDevMAC + " " + sTemp;  
        try {
            const sCmdRes = exec(sCommand).toString();
            this.log.info("Command result: " + sCmdRes);
        }catch (e) {
            this.log.error("Command \"" + sCommand + "\" failed!");
            this.log.error("-----------\"" + e);
        }     
    }
}


// @ts-ignore parent is a valid property on module
if (module.parent) {
    // Export the constructor in compact mode
    /**
     * @param {Partial<ioBroker.AdapterOptions>} [options={}]
     */
    module.exports = (options) => new Eq3Thermostat(options);
} else {
    // otherwise start the instance directly
    new Eq3Thermostat();
}
