"use strict";

/*
 * Created with @iobroker/create-adapter v1.23.0
 */
// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require("@iobroker/adapter-core");
const { execSync } = require("child_process");

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
        let bPreCheckErr = false;   //We can't stop the adapter since we need it 4 path check. Make preCheck, if error found don't run main functions

        /*const version = process.version;
        const va = version.split(".");
        if (va[0] === "v0" && va[1] === "10") {
            this.log.info("NODE Version = " + version + ", we need new exec-sync");
            // @ts-ignore
            const execSync     = require("sync-exec");
        } else {
            this.log.info("NODE Version = " + version + ", we need new execSync");
            const execSync     = require("child_process").execSync;
        }*/

        this.log.info("##### LOAD CONFIG ##### ");
        if (!this.config.getEQ3Devices.length) {
            this.log.info("## No Devices created, only Path-Check available");
            bPreCheckErr = true;
        }
        if (isNaN(this.config.inp_refresh_interval)) {
            this.config.inp_refresh_interval = 5;
            this.log.info("Update-Interval overwritten to: " + this.config.inp_refresh_interval);
        }
        if (!parseFloat(this.config.inp_button_step_size)) {
            this.config.inp_button_step_size = 1.0;
            this.log.info("Button step overwritten to: " + this.config.inp_button_step_size);
        }
        this.log.info("Force Mode-Manual: " + this.config.inp_override_modemanual);
 
        //bPreCheckErr = true;   If this is not defined we do it! Dont stop :)
        if (this.config.inp_eq3Controller_path.length == 0) {
            this.log.info("## Expect-Path emtpy, only Path-Check available");
            bPreCheckErr = true;
        }
        this.log.info("Loaded " + this.config.getEQ3Devices.length + " eq3-Devices");
        this.log.info("Update-Interval: " + this.config.inp_refresh_interval);
        this.log.info("Button step: " + this.config.inp_button_step_size);
        this.log.info("Expect-Script Path:  \"" + this.config.inp_eq3Controller_path +"\" ");

        this.log.info("##### CREATE OBJECTS ##### ");
        if (this.config.getEQ3Devices.length) {
            for (let nDev = 0; nDev < this.config.getEQ3Devices.length; nDev++) {
                // @ts-ignore
                const sDevMAC = this.config.getEQ3Devices[nDev].eq3MAC;

                await this.setObjectNotExists(sDevMAC, { type: "device", common: { name: sDevMAC }, native: {} });
                await this.setObjectNotExists(sDevMAC+".temperature", { type: "state", common: { name: "temperature", role: "level.temperature", write: true, type: "number", unit: "°C", min: 5, max: 30 }, native: {} });
                await this.setObjectNotExists(sDevMAC+".valve", { type: "state", common: { name: "valve", role: "level", write: false, type: "number", unit: "%", min: 0, max: 100 }, native: {} });
                await this.setObjectNotExists(sDevMAC+".low_battery_alarm", { type: "state", common: { name: "low_battery_alarm", role: "indicator", write: false, type: "boolean" }, native: {} });
                await this.setObjectNotExists(sDevMAC+".no_connection", { type: "state", common: { name: "no_connection", role: "indicator", write: false, type: "boolean" }, native: {} });
                await this.setObjectNotExists(sDevMAC+".last_cmd_failed", { type: "state", common: { name: "last_cmd_failed", role: "indicator", write: false, type: "boolean" }, native: {} });
                await this.setObjectNotExists(sDevMAC+".name", { type: "state", common: { name: "name", role: "text", write: false, type: "string" }, native: {} });
                await this.setObjectNotExists(sDevMAC+".plus", { type: "state", common: { name: "name", role: "button", write: true, type: "boolean" }, native: {} });
                await this.setObjectNotExists(sDevMAC+".minus", { type: "state", common: { name: "name", role: "button", write: true, type: "boolean" }, native: {} });
                await this.setObjectNotExists(sDevMAC+".boost", { type: "state", common: { name: "name", role: "switch", write: true, type: "boolean" }, native: {} });
            }
        }


        this.log.info("##### RUN ADAPTER ##### ");
        if (!bPreCheckErr) {
            this.fEQ3Update();
        } else {
            this.log.info("##### PRE CHECK ERRORS, MAIN FUNCTIONS DISABLED! Check Settings");
        }



        // in this template all states changes inside the adapters namespace are subscribed
        this.subscribeStates("*");
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
                const stateName = aState[aState.length - 1].toString() //aState.len -1 = statename
                const updateStep = parseFloat(this.config.inp_refresh_interval);
                if (stateName === "temperature") {
                    this.log.info(id + " changed from " + state.from);
                    //Only send BT Temperature after Temperature does not have Changed for 8 Seconds
                    const sTmrName = "tmr_" + aState[aState.length - 2];  //aState.len -2 = MAC
                    if(global[sTmrName]) {  //if Timer active
                        clearTimeout(global[sTmrName]);    //Reset it
                    }
                    global[sTmrName] = setTimeout(this.fSetTemp.bind(this, aState[aState.length - 2], state.val), 8000);  // this, MAC, Temperatur
                } else if (stateName === "plus") {
                    state.val = state.val + updateStep;
                } else if (stateName === "minus") {
                    state.val = state.val - updateStep;
                } else if (stateName === "boost") {
                    this.fSetBoost(aState[aState.length - 2],state.val);
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
            if (obj.command === "findDevices") {
                //TT, save Command Result true/false
                try {
                        var stdout = execSync("timeout -s INT 8s stdbuf -oL hcitool lescan").toString().replace(new RegExp('\r?\n','g'), '<br>');
                }catch (e) {
                        var stdout = "Error: " + e.stdout.toString().replace(new RegExp('\r?\n','g'), '<br>');
                }
                var aMacFound = stdout.split('<br>');
                var sOut = "";
                for (const val of aMacFound) { // You can use `let` instead of `const` if you like
                    if (val.indexOf("CC-RT-BLE") > -1) {
                        sOut = sOut + val + "<br>";
                    }
                }
                //TT, send Result back   sudo timeout 10s sudo hcitool lescan | grep CC-RT-BLE
                if (obj.callback) this.sendTo(obj.from, obj.command, sOut.toString(), obj.callback);
            }
        }
    }

    fCheckLiveEQ3Controller(sPath) {
        try {
        const stdout = execSync(sPath + " help").toString();  //print exp script help
        this.log.debug("PathCheck-Result: " + stdout);
            if (stdout.indexOf("Full-featured CLI for radiator thermostat eQ-3 CC-RT-BLE") > -1) {  //Script found :)
                this.log.info("check successful!");
                return true;
            }else{
                this.log.info("check Failed! Response doesn't match expected output");  //Expected Connection Failed
                this.log.info("check Failed! Response: " + sCmdRes);
            return false;
            }
        }catch (e) {
            this.log.info("check Failed! Response doesn't match expected output");
            this.log.info("check Failed! Response: " + e);
            return false;
        }
        return false;
    }

    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    fEQ3Update() {
        if (this.config.getEQ3Devices.length) {
            //Set Timer for next Update
            tmr_EQ3Update = setTimeout(() =>this.fEQ3Update(),this.config.inp_refresh_interval * 60000);

            //Get Information from EQ3 Devices via Expect script for each device
            for (let nDev = 0; nDev < this.config.getEQ3Devices.length; nDev++) {
                // @ts-ignore
                const sDevMAC = this.config.getEQ3Devices[nDev].eq3MAC;
                // @ts-ignore
                const sDevName = this.config.getEQ3Devices[nDev].eq3Name;
                const sPath = this.config.inp_eq3Controller_path;
                if (nDev > 0) {
                    this.sleep(1000);  //Sleep blocking 1 Sec between bluetooth calls
                }

                try {
                    try {
                        var stdout = execSync(sPath + " " + sDevMAC + " json").toString();
                    } catch (e) {
                        if (e.stdout.indexOf("Connection failed") >= 0) {
                            this.log.error("Connection Failed for MAC: " + sDevMAC);
                            this.setStateAsync(sDevMAC+".no_connection", { val: true, ack: true });
                            continue;
                        }
                    }
                    try {
                        JSON.parse(stdout);
                    } catch (e) {
                        this.log.error("No valid JSON for MAC: " + sDevMAC);
                        this.log.debug("error Message: " + e);
                        this.log.debug("Expect-Output: " + stdout);
                        this.setStateAsync(sDevMAC+".no_connection", { val: true, ack: true });
                        continue;
                    }
                    const jRes = JSON.parse(stdout);
                    if (jRes.hasOwnProperty('error')) {
                        this.log.error("Connection Error for MAC: " + sDevMAC);
                        this.setStateAsync(sDevMAC+".no_connection", { val: true, ack: true });
                        continue;
                    }
                    //If Force Mode Manual is set
                    if (this.config.inp_override_modemanual){
                        if (!jRes['mode']['manual']) {   //If Mode is not manual
                            //Set manual mode ! Dont check result, it's not critical, we have no time in this for-loop
                            this.log.info("Wrong Mode detected, changing to Manual-Mode for Device: \"" + sDevMAC + "\" ");
                            execSync(sPath + " " + sDevMAC + " manual");
                        }
                    }
                    //0 = Temperature | 1 = Valve | 2 = LowBattaryAlarm | 3 = NoConnection | 4 = Boost
                    const aValues = [jRes['temperature'], jRes['valve'], jRes['mode']['low battery'], false, jRes['mode']['boost']];
                    this.fUpdateDevObj(aValues, sDevMAC, sDevName);
                }catch (e) {
                    this.log.error("Could not get Values for Device: \"" + sDevMAC + "\" ");
                    this.log.error("-----------\"" + e);
                    this.setStateAsync(sDevMAC+".no_connection", { val: true, ack: true });
                }
            }
        }else{
            //No Devices No Timer
            clearInterval(tmr_EQ3Update);
            tmr_EQ3Update = null;
        }
    }

    fUpdateDevObj(aDevValues, sDevMAC, sDevName) {
        //0 = Temperature | 1 = Valve | 2 = LowBattaryAlarm | 3 = NoConnection | 4 = Boost
        this.setStateAsync(sDevMAC+".temperature", { val: aDevValues[0], ack: true });
        this.setStateAsync(sDevMAC+".valve", { val: aDevValues[1], ack: true });
        this.setStateAsync(sDevMAC+".low_battery_alarm", { val: aDevValues[2], ack: true });
        this.setStateAsync(sDevMAC+".no_connection", { val: aDevValues[3], ack: true });
        this.setStateAsync(sDevMAC+".name", { val: sDevName, ack: true });
        this.setStateAsync(sDevMAC+".boost", { val: aDevValues[4], ack: true });
    }

    fSetTemp(sDevMAC, sTemp) {
        this.log.info("Set " + sTemp + "°C on Device  "+sDevMAC);
        const sPath = this.config.inp_eq3Controller_path;
        var retries = 3;
        var success = false;
        for (var i = 0; i < retries; i++) {
            try {
                const stdout = execSync(sPath + " " + sDevMAC + " temp " + sTemp);
                this.log.info("Command result: " + stdout);
                success = true;
                break;
            }catch (e) {
                this.log.error("Command failed for MAC: " + sDevMAC);
                this.log.error("-----------" + e);
            }
            this.sleep(1000);  //Sleep blocking 1 Sec between bluetooth calls
        }
        if (success) {
                this.setStateAsync(sDevMAC+".last_cmd_failed", { val: false, ack: true });
        }else{
                this.setStateAsync(sDevMAC+".last_cmd_failed", { val: true, ack: true });
        }
    }

    fSetBoost(sDevMAC, bON) {
        this.log.info("Set Boost to " + bON + " on Device  "+sDevMAC);
        const sPath = this.config.inp_eq3Controller_path;
        var retries = 3;
        var success = false;
        for (var i = 0; i < retries; i++) {
            try {
                if (bON) {
                    const stdout = execSync(sPath + " " + sDevMAC + " boost");
                }else{
                    const stdout = execSync(sPath + " " + sDevMAC + " boost off");
                }
                this.log.info("Command result: " + stdout);
                success = true;
                break;
            }catch (e) {
                this.log.error("Command failed for MAC: " + sDevMAC);
                this.log.error("-----------" + e);
            }
            this.sleep(1000);  //Sleep blocking 1 Sec between bluetooth calls
        }
        if (success) {
                this.setStateAsync(sDevMAC+".last_cmd_failed", { val: false, ack: true });
        }else{
                this.setStateAsync(sDevMAC+".last_cmd_failed", { val: true, ack: true });
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
