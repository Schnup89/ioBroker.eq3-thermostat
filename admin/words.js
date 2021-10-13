/*global systemDictionary:true */
"use strict";

systemDictionary = {
    "eq3-thermostat adapter settings": {
        "en": "Adapter settings for eq3-thermostat",
        "de": "Adaptereinstellungen für eq3-thermostat",
        "ru": "Настройки адаптера для eq3-thermostat",
        "pt": "Configurações do adaptador para eq3-thermostat",
        "nl": "Adapterinstellingen voor eq3-thermostat",
        "fr": "Paramètres d'adaptateur pour eq3-thermostat",
        "it": "Impostazioni dell'adattatore per eq3-thermostat",
        "es": "Ajustes del adaptador para eq3-thermostat",
        "pl": "Ustawienia adaptera dla eq3-thermostat",
        "zh-cn": "eq3-thermostat的适配器设置"
    },
    "lab_general": {
        "en": "General",
        "de": "Allgemein",
    },
    "text_general": {
        "en": "To be defined...",
        "de": "<b>Der Adapter dient zur einfachen Steuerung eurer eq3-Thermostate per Bluetooth.</b><br><br>"+
        "Die Thermostate werden (nach Wunsch) in den manuellen Modus versetzt, dies bedeutet dass die eingebaute Zeitsteuerung / Automatik im Thermostat nicht mehr genutzt werden kann. Um eine Zeitsteuerung zu erreichen muss diese in IOBroker abgebildet werden.<br>"+
        "Eine Änderung der Temperatur am Thermostat aktualisert auch den Datenpunkt in IOBroker, hierfür wird gemäß des Aktualisierungsintervalls die aktuellen Informationen abgerufen.<br>"+
        "Ein zu niedriger Aktualisierungsintervall wirkt sich negativ auf die Batterielaufzeit des Thermostats aus !<br>"+
        "Ein Danke geht an <a href=\"https://github.com/Heckie75\" target=\"_blank\">Heckie75</a> für sein Expect-Script <a href=\"https://github.com/Heckie75/eQ-3-radiator-thermostat\" target=\"_blank\">eq3.exp</a> welche hier genutzt wird.<br><br>"+
        "Voraussetzungen:<br>"+
        "- Getestestet wurde auf einem RPI 3B+, andere Systeme sollten mit Bluetooth auch funktionieren<br>"+
        "- Expect - Installieren per <i>sudo apt-get install expect</i><br>"+
        "- Das eq3.exp-Script<br><br>"+
        "Für eine genaue Anleitung und Troubleshooting-Tipps gehe auf die Github-Webseite dieses Adapters, (? oben rechts, oder <a href=\"https://github.com/Schnup89/ioBroker.eq3-Thermostat/\" target=\"_blank\">HIER</a>)"
    },
    "lab_eq3Controller_path_short": {
        "en": "Path to eq3.exp",
        "de": "Pfad zu eq3.exp"
    },
    "lab_eq3Controller_path_long": {
        "en": "<a href=\"https://github.com/Heckie75/eQ-3-radiator-thermostat/blob/master/eq3.exp" target=\"_blank\">eq3.exp</a>   |  e.g. expect /opt/iobroker/node_modules/iobroker.eq3-thermostat/eq3.exp",
        "de": "<a href=\"https://github.com/Heckie75/eQ-3-radiator-thermostat/blob/master/eq3.exp\" target=\"_blank\">eq3.exp</a>   |  z.B. expect /opt/iobroker/node_modules/iobroker.eq3-thermostat/eq3.exp"
    },
    "btn_checkPath": {
        "en": "Check Path",
        "de": "Pfad testen",
    },
    "lab_refresh_interval_short": {
        "en": "Refresh interval",
        "de": "Aktualisierungsintervall",
    },
    "lab_refresh_interval_long": {
        "en": "in minutes",
        "de": "In Minuten",
    },
    "lab_button_step_short": {
        "en": "Temperature steps for plus/minus button (experimental)",
        "de": "Temperaturschritte für Plus/Minus button (experimental)",
    },
    "lab_button_step_long": {
        "en": "0.5°C or 1.0°C",
        "de": "0,5°C oder 1,0°C",
    },
    "lab_override_modemanual_short": {
        "en": "Always manual mode",
        "de": "Manuellen Modus erzwingen",
    },
    "lab_devices": {
        "en": "Devicelist",
        "de": "Geräteliste",
    },
    "text_devices": {
        "en": "Add your eq3-Devices, which you want to control. <br> 1. Power on eq3-Device. Only one at a time they have all the same Bluetooth-Name (CC-RT-BLE) <br> 2. Get the MAC-Address with the Command \"sudo hcitool lescan\" <br> 3. Add Device with the + Button",
        "de": "Hier fügst du \r deine eq3-Geräte hinzu, die du steuern möchtest. <br> 1. eq3-Gerät starten. Immer nur eines, da der Bluetooth Name bei allen Geräten gleich ist. (CC-RT-BLE) <br> 2. Führe das Kommando \"sudo hcitool lescan\" auf der Konsole aus. <br> 3. Mit der + Knopf eine neue Zeile einfügen und die MAC-Adresse setzen.",
    },
    "text_devices_loading": {
        "en": "Loading, please wait for 10 seconds... <br> Found Devices will be displayed here one finished!",
        "de": "Suche nach Geräten, bitte 10 Sekunden warten... <br> Gefundene Geräte erscheinen hier sobald die Suche abgeschlossen ist!",
    },
    "lab_BtnAddManual": {
        "en": "Add Device",
        "de": "Hinzufügen",
    },
    "lab_BtnAddScan": {
        "en": "BT Scan (experimental)",
        "de": "BT Scan (experimental)",
    },
    "eq3MAC": {
        "en": "eq3 MAC-Address",
        "de": "eq3 MAC-Adresse",
    },
    "eq3Name": {
        "en": "eq3 Device Name/Room",
        "de": "eq3 Gerätename/Zimmer",
    },
    "delete": {
        "en": "delete",
        "de": "löschen",
    }
};