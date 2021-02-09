from eq3bt import Thermostat
import subprocess
import sys
import time
import os, signal


def check_kill_process(pstring):
    for line in os.popen("ps ax | grep " + pstring + " | grep -v grep"):
        fields = line.split()
        pid = fields[0]
        os.kill(int(pid), signal.SIGKILL)


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
        if rcounter < 5:
            time.sleep(2)
            doBT(mode)
        else:
            check_kill_process("eq3Controller.py")
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
