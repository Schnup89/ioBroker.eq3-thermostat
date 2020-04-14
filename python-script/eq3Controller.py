from eq3bt import Thermostat
import subprocess
import sys
import time

if len(sys.argv) > 1:
    # CMD Parameter
    if sys.argv[1] == "check":      #Check
        print("eq3OK")

    if sys.argv[1] == "getValue":   #Get Informatioms from BTDevice
        thermostat = Thermostat(sys.argv[2])
        thermostat.update()
        if str(thermostat.mode) == "Mode.Closed":
            thermostat.mode = 3   #Set Mode Manual
            thermostat.update()
        print(str(thermostat.target_temperature) + ";" + str(thermostat.valve_state)  + ";" + str(thermostat.low_battery))
        time.sleep(1)

    if sys.argv[1] == "setValue":   #Set Temperature to BTDevice
        thermostat = Thermostat(sys.argv[2])
        thermostat.target_temperature = float(sys.argv[3])
        thermostat.update()
        print ("OK")

else:
    print("Possible Arguments:");
    print("   check");
    print("   getValue [MAC]");
    print("   setValue [MAC] [Temperature]");
