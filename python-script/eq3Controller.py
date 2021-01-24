from eq3bt import Thermostat
import subprocess
import sys
import time


def doBT(mode):
    global rcounter

    try:
        # CMD Parameter
        if mode[1] == "check":      #Check
            print("eq3OK")

        if mode[1] == "getValue":   #Get Informatioms from BTDevice
            thermostat = Thermostat(mode[2])
            thermostat.update()
            if str(thermostat.mode) == "Mode.Closed":
                thermostat.mode = 3   #Set Mode Manual
                thermostat.update()
            print(str(thermostat.target_temperature) + ";" + str(thermostat.valve_state)  + ";" + str(thermostat.low_battery))
            time.sleep(1)

        if mode[1] == "setValue":   #Set Temperature to BTDevice
            thermostat = Thermostat(mode[2])
            thermostat.target_temperature = float(sys.argv[3])
            thermostat.update()
            print ("OK")

    except:
        rcounter += 1
        if rcounter < 10:
            doBT(mode)
        else:
            raise


# retry counter
rcounter = 0

if len(sys.argv) > 1:
    doBT(sys.argv)

else:
    print("Possible Arguments:");
    print("   check");
    print("   getValue [MAC]");
    print("   setValue [MAC] [Temperature]");
