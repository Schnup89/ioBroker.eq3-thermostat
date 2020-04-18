![Logo](admin/eq3-thermostat.png)

# ioBroker.eq3-thermostat

[![NPM version](http://img.shields.io/npm/v/iobroker.eq3-thermostat.svg)](https://www.npmjs.com/package/iobroker.eq3-thermostat)
[![Downloads](https://img.shields.io/npm/dm/iobroker.eq3-thermostat.svg)](https://www.npmjs.com/package/iobroker.eq3-thermostat)
![Number of Installations (latest)](http://iobroker.live/badges/eq3-thermostat-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/eq3-thermostat-stable.svg)
[![Dependency Status](https://img.shields.io/david/Schnup89/iobroker.eq3-thermostat.svg)](https://david-dm.org/Schnup89/iobroker.eq3-thermostat)
[![Known Vulnerabilities](https://snyk.io/test/github/Schnup89/ioBroker.eq3-thermostat/badge.svg)](https://snyk.io/test/github/Schnup89/ioBroker.eq3-thermostat)

[![NPM](https://nodei.co/npm/iobroker.eq3-thermostat.png?downloads=true)](https://nodei.co/npm/iobroker.eq3-thermostat/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/Schnup89/ioBroker.eq3-thermostat/master.svg)](https://travis-ci.org/Schnup89/ioBroker.eq3-thermostat)


## eq3-Bluetooth-Thermostat Adapter für ioBroker

Adapter zur Anbindung von eq3-Thermostaten via Bluetooth

## Features
- Soll Temperatur eines Thermostats kann über "states" gesetzte werden
- Gesetzte Temperatur wird erst per Bluetooth an Thermostat übermittelt, nachdem der Wert 8 Sekunden nicht verändert wurde
- Wird am Thermostat selbst die Temperatur verändert wird dies über eine zyklische Ausleseroutine ausgelesen und die states gesetzt
- Einstellbarer Aktualisierungsintervall
- Folgende Eigenschaften werden ausgelesen
  - Soll Temperatur (temperature)
  - Ventilstellung (valve)
  - Batteriewarnung (low_battery_alarm)


<b>! WICHTIG !<b>

Die Thermostate werden in den Modus "Manuell" versetzt, sodass die Automatik am Thermostat nicht mehr genutzt werden kann.


Am Thermostat kann weiterhin die gewünschtt Temperatur Manuell eingestellt werden, bei der Aktualisierung wird der Wert in den IOBroker "states" übernommen.
Minimal einstellbare Temperatur 5°C (aus), Maximal einstellbare Temperatur 30°C 


## Vorbereitung und Überprüfung der Umgebung

Für diesen Adapter wird eine Python-Library genutzt welche installiert und getestet sein sollte.


### Schritt-für-Schritt Anleitung:

1. Verbinde dich per SSH oder Lokal auf die Konsole (bash) deines IOBroker Systems

2. Installieren der Python-Library "python-eq3bt"
```bash
pip install python-eq3bt
```
oder für Python3
```bash
pip3 install python-eq3bt
```
! Evtl. ein "sudo" voranstellen

2. Testen der Python-Library

Kopiere die Datei "eq3Controller.py" aus dem Repository-Ordner "python-script" oder erstelle Sie mit einem Text-Editor deiner Wahl.
Sollte die Library richtig installiert und eingebunden sein, sollte folgendes Kommando die Befehle ausgeben:
```bash
python eq3Controller.py
```
oder mit Python3
```bash
python3 eq3Controller.py
```
Ist dies erfolgreich, so notiere dir den Pfad zu dieser Datei. Der aktuelle Pfad mit dem Kommando "pwd" in der Konsole ausgegeben.


## Bluetooth MAC-Adresse auslesen

Um später die EQ3-Thermostate ansprechen zu können beötigt der Adapter die MAC-Adresse und den Raum um die Thermostate zuordnen zu können.

Der Bluetooth-Name ist bei jeden Gerät geleich, sodass hier am besten ein Gerät nach dem anderen eingelesen werden sollte.

1. Batterie in eq3-Thermostat einsetzen (evtl. muss der Thermostat auch an ein Ventil angeschlossen sein <- Bitte kurze Rückmeldung per Issue)

2. BTLE Scan starten und warten (Bis zu 20 Sekunden)
```bash
sudo hcitool lescan
```

3. eq3-Thermostate erscheinen mit dem Namen "CC-RT-BLE", bitte die MAC-Adresse und den gewünschten Raum notieren.

Für jedes Gerät Schritt 1. bis 3. wiederholen.


## Adapterkonfiguration + Erster Start

Im Adapter kann nun der Pfad wie oben bei der Vorberitung notiert eingetragen werden.

Den Aktualisierungsintervall würde ich auf 2-5 Minuten einstellen. je länger der Intervall desto länger halten die Batterien des eq3-Thermostats.

Trage in der Liste unten mit dem "+" die MAC-Adresse und den Raum jedes Gerätes ein.

Sobald die Adapterkonfiguration gespeichert wird, sollten nach einer kurzen Wartezeit die Devices unter den Objekten angelegt werden.

```bash
eq3-thermostat.0.MAC-Adresse
``` 













## Developer manual
This section is intended for the developer. It can be deleted later

### Getting started

You are almost done, only a few steps left:
1. Create a new repository on GitHub with the name `ioBroker.eq3-thermostat`
1. Initialize the current folder as a new git repository:  
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
1. Link your local repository with the one on GitHub:  
    ```bash
    git remote add origin https://github.com/Schnup89/ioBroker.eq3-thermostat
    ```

1. Push all files to the GitHub repo:  
    ```bash
    git push origin master
    ```
1. Head over to [main.js](main.js) and start programming!

### Best Practices
We've collected some [best practices](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices) regarding ioBroker development and coding in general. If you're new to ioBroker or Node.js, you should
check them out. If you're already experienced, you should also take a look at them - you might learn something new :)

### Scripts in `package.json`
Several npm scripts are predefined for your convenience. You can run them using `npm run <scriptname>`
| Script name | Description                                              |
|-------------|----------------------------------------------------------|
| `test:js`   | Executes the tests you defined in `*.test.js` files.     |
| `test:package`    | Ensures your `package.json` and `io-package.json` are valid. |
| `test` | Performs a minimal test run on package files and your tests. |
| `lint` | Runs `ESLint` to check your code for formatting errors and potential bugs. |

### Writing tests
When done right, testing code is invaluable, because it gives you the 
confidence to change your code while knowing exactly if and when 
something breaks. A good read on the topic of test-driven development 
is https://hackernoon.com/introduction-to-test-driven-development-tdd-61a13bc92d92. 
Although writing tests before the code might seem strange at first, but it has very 
clear upsides.

The template provides you with basic tests for the adapter startup and package files.
It is recommended that you add your own tests into the mix.

### Publishing the adapter
To get your adapter released in ioBroker, please refer to the documentation 
of [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories#requirements-for-adapter-to-get-added-to-the-latest-repository).

### Test the adapter manually on a local ioBroker installation
In order to install the adapter locally without publishing, the following steps are recommended:
1. Create a tarball from your dev directory:  
    ```bash
    npm pack
    ```
1. Upload the resulting file to your ioBroker host
1. Install it locally (The paths are different on Windows):
    ```bash
    cd /opt/iobroker
    npm i /path/to/tarball.tgz
    ```

For later updates, the above procedure is not necessary. Just do the following:
1. Overwrite the changed files in the adapter directory (`/opt/iobroker/node_modules/iobroker.eq3-thermostat`)
1. Execute `iobroker upload eq3-thermostat` on the ioBroker host

## Changelog

### 0.0.2
* (Schnup89) First Test & Documentation

### 0.0.1
* (Schnup89) initial release

## License
MIT License

Copyright (c) 2020 Schnup89 <Tobias_Tsafi@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
