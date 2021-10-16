![Logo](admin/eq3-thermostat.png)

# ioBroker.eq3-thermostat

[![NPM version](http://img.shields.io/npm/v/iobroker.eq3-thermostat.svg)](https://www.npmjs.com/package/iobroker.eq3-thermostat)
[![Downloads](https://img.shields.io/npm/dm/iobroker.eq3-thermostat.svg)](https://www.npmjs.com/package/iobroker.eq3-thermostat)
![Number of Installations (latest)](http://iobroker.live/badges/eq3-thermostat-installed.svg)
[![Dependency Status](https://img.shields.io/david/Schnup89/iobroker.eq3-thermostat.svg)](https://david-dm.org/Schnup89/iobroker.eq3-thermostat)
[![Known Vulnerabilities](https://snyk.io/test/github/Schnup89/ioBroker.eq3-thermostat/badge.svg)](https://snyk.io/test/github/Schnup89/ioBroker.eq3-thermostat)

[![NPM](https://nodei.co/npm/iobroker.eq3-thermostat.png?downloads=true)](https://nodei.co/npm/iobroker.eq3-thermostat/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/Schnup89/ioBroker.eq3-thermostat/master.svg)](https://travis-ci.org/Schnup89/ioBroker.eq3-thermostat)



Adapter zur Anbindung von eq3-Thermostaten via Bluetooth

Mit diesem Adapter ist es möglich Informationen aus den Thermostaten auszulesen und die Soll-Temperatur zu setzen.
Voraussetzung ist das Programm Expect und eine Bluetooth-Adapter inkl. Bluetooth-LowEnergy Funktion (BTLE).

## Installation

- Im ioBroker Webinterface unter "Adapter" oben mit dem "Kopf" Symbol die erweiterte Ansicht einschalten
- Auf das Github-Symbol klicken, dieses erscheint in der oberen Leiste über den Adapter
- "Benutzerdefiniert" auswählen und bei der URL folgende URL eingeben und "INSTALLIEREN" klicken
```bash
https://github.com/Schnup89/ioBroker.eq3-thermostat
```


## Features
- Soll Temperatur eines Thermostats kann über "states" gesetzte werden
- Gesetzte Temperatur wird erst per Bluetooth an Thermostat übermittelt, nachdem der Wert 8 Sekunden nicht verändert wurde
- Wird am Thermostat selbst die Temperatur verändert wird dies über eine zyklische Ausleseroutine ausgelesen und die states gesetzt
- Einstellbarer Aktualisierungsintervall
- Erzwungener Manuell-Modus
- Bluetooth-Scan im Admin-Panel
- Verbindungsprobleme werden als state reported
- Verbindungsversuch wird nach ca. 10 Sekunden abgebrochen
- Folgende Eigenschaften werden ausgelesen
  - Soll Temperatur (temperature)
  - Ventilstellung (valve)
  - Batteriewarnung (low_battery_alarm)


<b>! WICHTIG !</b>

Ist die Option "Manuellen Modus erzwingen" werden die Thermostate in den Modus "Manuell" versetzt, sodass die Automatik am Thermostat nicht mehr genutzt werden kann. Ist die Option in den Adapter-Einstellungen deaktiviert wird der Modus nicht geändert.


Am Thermostat kann weiterhin die gewünschtt Temperatur manuell eingestellt werden, bei der Aktualisierung wird der Wert in den IOBroker "states" übernommen.
Minimal einstellbare Temperatur 5°C (aus), Maximal einstellbare Temperatur 30°C 


## Vorbereitung und Überprüfung der Umgebung

Für diesen Adapter wird das Expect-Script von Heckie75 genutzt. Die Pfade sind im Adapter vorgegeben, können aber angepasst werden. Ist Expect schon installiert, sollte der Adapter direkt nutzbar sein.
Für den Bluetooth-Scan über die Adapterseite (BT Scan) muss vorher per SSH folgende Berechtigung gesetzt werden: 
```bash
sudo setcap cap_net_raw+ep /usr/bin/hcitool
``` 
Evtl muss der Pfad des hcitool angepasst werden, dieser wird euch angezeigt mit dem Befehl:
```bash
which hcitool
``` 

(Optional) Wenn der Scan trotzdem nicht funktioniert, hat folgende Service-Anpassung bei mir geholfen:  
https://raspberrypi.stackexchange.com/questions/40839/sap-error-on-bluetooth-service-status



## Adapterkonfiguration + Erster Start

Im Adapter kann nun das Script getestet werden. Hier wird der volle Pfad (incl. expect kommando) zu der ed3.exp erwartet. Bei mir ist dies expect /opt/iobroker/node_modules/iobroker.eq3-thermostat/eq3.exp
Wenn ihr einen anderen Pfad möchtet, besorgt euch die Datei bei Heckie75 und passt den Pfad entsprechend an.
Der Button "PFAD TESTEN" muss Grün werden, sonst tut der Adapter nichts.


Den Aktualisierungsintervall würde ich auf 3-5 Minuten einstellen. Je länger der Intervall desto länger halten die Batterien des eq3-Thermostats.

Trage in der Liste unten mit dem "+" die MAC-Adresse und den Raum jedes Gerätes ein.

Sobald die Adapterkonfiguration gespeichert wird, sollten nach einer kurzen Wartezeit die Devices unter den Objekten angelegt werden.

```bash
eq3-thermostat.0.MAC-Adresse
``` 

## (Optional) Expect-Script prüfen

1. Verbinde dich per SSH oder Lokal auf die Konsole (bash) deines IOBroker Systems

2. Prüfe ob expect installiert ist
```bash
$ sudo apt install expect
```

3. Prüfe ob Geräte gefunden werden (CC-RT-BLE)
```bash
$ sudo hcitool lescan
LE Scan ...
38:01:95:84:A8:B1 (unknown)
00:1A:22:0A:91:CF (unknown)
00:1A:22:0A:91:CF CC-RT-BLE
```
Bitte beachtet dass der Scan evtl. im Hintergrund ewig läuft.
Sollte die Kommunikation gar nicht mehr funktionieren, bitte Bluetooth wie folgt neu starten:
```bash
$ sudo /etc/init.d/bluetooth restart
```

## (Optional) Bluetooth MAC-Adresse auslesen

```bash
$ sudo hcitool lescan
LE Scan ...
38:01:95:84:A8:B1 (unknown)
00:1A:22:0A:91:CF (unknown)
00:1A:22:0A:91:CF CC-RT-BLE
```
Siehe Hinweis oben bzgl. Bluetooth Scan.

Der Bluetooth-Name ist bei jeden Gerät geleich, sodass hier am besten ein Gerät nach dem anderen eingelesen werden sollte.

1. Batterie in eq3-Thermostat einsetzen (evtl. muss der Thermostat auch an ein Ventil angeschlossen sein <- Bitte kurze Rückmeldung per Issue)

2. BTLE Scan starten und warten (Bis zu 20 Sekunden)
```bash
sudo hcitool lescan
```

3. eq3-Thermostate erscheinen mit dem Namen "CC-RT-BLE", bitte die MAC-Adresse und den gewünschten Raum notieren.

Für jedes Gerät Schritt 1. bis 3. wiederholen.



## (Optional) Habpanel-Steuerung

<img src="https://github.com/Schnup89/ioBroker.eq3-Thermostat/blob/master/eq3-panel.jpg?raw=true" width="30%">



Ich habe für Habpanel (ioBroker-Adapter für Visualisierung) ein für mich gutes Design entwickelt um vom Smartphone aus die Thermostate einstellen zu können.  
Dafür muss natürlich Habpanel installiert sein, und Ihr müsste folgende Einstellungen tätigen:

Ruft euer HABPanel auf und erstellt zwei Objekte, ein "template" und einen "knob" wie im Bild zusehen.

In das Template-Objekt folgenden Inhalt kopieren:

```html
<style>
.progress-bar {
    background-color: #0db9f0;
 }
.progress {
    height: 10px;
 }
</style>

<uib-progressbar style="background-color: #89a" animate="false"
max="100" value="itemValue('eq3-thermostat.0.MAC-Adresse.valve')">
</uib-progressbar>
``` 

<i>! "MAC-Adresse" im Pfad auf die MAC-Adresse des Thermostats anpassen !</i>

Und die Einstellungen für das "Knob"-Element:

```bash
General

Item: eq3-thermostat.0.MAC-Adresse.temperature

Min: 5

Max: 29

Step: 0,5

Unit: °C

x Show Value

x Show Name

Bar & Track

Angles: Start 20, End 340

x Display previous value when dragging

Misc.

Font Size: 24
``` 




## Changelog

### 2.0.2
* (Schnup89) Add 1 second delay between BT-Calls

### 2.0.1
* (Schnup89) New Version with better error-handling and communication with expect script instead of python

### 0.0.2
* (Schnup89) First Test & Documentation

### 0.0.1
* (Schnup89) initial release

## License
MIT License

Copyright (c) 2021 Schnup89 Tobias_Tsafi@gmx.de

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
