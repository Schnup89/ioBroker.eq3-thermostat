/*global systemDictionary:true */
"use strict";

systemDictionary = {
    "eq3-thermostat adapter settings": {
        "en": "Adapter settings for eq3-thermostat\"",
        "de": "Adaptereinstellungen für eq3-thermostat\"",
        "ru": "Настройки адаптера для eq3-термостат »",
        "pt": "Configurações do adaptador para termostato eq3 \"",
        "nl": "Adapter instellingen voor eq3-thermostaat\"",
        "fr": "Réglages de l'adaptateur pour eq3-thermostat\"",
        "it": "Impostazioni adattatore per termostato eq3\"",
        "es": "Ajustes del adaptador para termostato eq3 \"",
        "pl": "Ustawienia adaptera do termostatu eq3-\"",
        "zh-cn": "eq3-thermostat 的适配器设置\""
    },
    "lab_general": {
        "en": "General",
        "de": "Allgemein",
        "ru": "Общий",
        "pt": "Em geral",
        "nl": "Algemeen",
        "fr": "Général",
        "it": "Generale",
        "es": "General",
        "pl": "Ogólny",
        "zh-cn": "一般的"
    },
    "text_general": {
        "en": "This adapter lets you control the eq3 bluetooth thermostate, see the github page for more informations",
        "de": "<b>Der Adapter dient zur einfachen Steuerung eurer eq3-Thermostate per Bluetooth.</b><br><br>"+
        "Die Thermostate werden (nach Wunsch) in den manuellen Modus versetzt, dies bedeutet dass die eingebaute Zeitsteuerung / Automatik im Thermostat nicht mehr genutzt werden kann. Um eine Zeitsteuerung zu erreichen muss diese in IOBroker abgebildet werden.<br>"+
        "Eine Änderung der Temperatur am Thermostat aktualisert auch den Datenpunkt in IOBroker, hierfür wird gemäß des Aktualisierungsintervalls die aktuellen Informationen abgerufen.<br>"+
        "Ein zu niedriger Aktualisierungsintervall wirkt sich negativ auf die Batterielaufzeit des Thermostats aus !<br>"+
        "Ein Danke geht an <a href=\"https://github.com/Heckie75\" target=\"_blank\">Heckie75</a> für sein Expect-Script <a href=\"https://github.com/Heckie75/eQ-3-radiator-thermostat\" target=\"_blank\">eq3.exp</a> welche hier genutzt wird.<br><br>"+
        "Voraussetzungen:<br>"+
        "- Getestestet wurde auf einem RPI 3B+, andere Systeme sollten mit Bluetooth auch funktionieren<br>"+
        "- Expect - Installieren per <i>sudo apt-get install expect</i><br>"+
        "- Das eq3.exp-Script<br><br>"+
        "Für eine genaue Anleitung und Troubleshooting-Tipps gehe auf die Github-Webseite dieses Adapters, (? oben rechts, oder <a href=\"https://github.com/Schnup89/ioBroker.eq3-Thermostat/\" target=\"_blank\">HIER</a>)",
        "ru": "Этот адаптер позволяет управлять термостатом eq3 bluetooth, дополнительную информацию см. На странице github.",
        "pt": "Este adaptador permite que você controle o termostato bluetooth eq3, veja a página do github para mais informações",
        "nl": "Met deze adapter kun je de eq3 bluetooth thermostaat bedienen, zie de github pagina voor meer informatie",
        "fr": "Cet adaptateur permet de contrôler le thermostat bluetooth eq3, voir la page github pour plus d'informations",
        "it": "Questo adattatore consente di controllare il termostato bluetooth eq3, vedere la pagina github per maggiori informazioni",
        "es": "Este adaptador le permite controlar el termostato bluetooth eq3, consulte la página de github para obtener más información",
        "pl": "Ten adapter pozwala kontrolować termostat eq3 bluetooth, zobacz stronę github, aby uzyskać więcej informacji",
        "zh-cn": "此适配器可让您控制 eq3 蓝牙恒温器，请参阅 github 页面了解更多信息"
    },
    "lab_eq3Controller_path_short": {
        "en": "Path to eq3.exp",
        "de": "Pfad zu eq3.exp",
        "ru": "Путь к eq3.exp",
        "pt": "Caminho para eq3.exp",
        "nl": "Pad naar eq3.exp",
        "fr": "Chemin vers eq3.exp",
        "it": "Percorso per eq3.exp",
        "es": "Ruta a eq3.exp",
        "pl": "Ścieżka do eq3.exp",
        "zh-cn": "eq3.exp 的路径"
    },
    "lab_eq3Controller_path_long": {
        "en": "<a href=\"https://github.com/Heckie75/eQ-3-radiator-thermostat/blob/master/eq3.exp\" target=\"_blank\">eq3.exp</a>   |  e.g. expect /opt/iobroker/node_modules/iobroker.eq3-thermostat/eq3.exp",
        "de": "<a href=\"https://github.com/Heckie75/eQ-3-radiator-thermostat/blob/master/eq3.exp\" target=\"_blank\">eq3.exp</a>   |  z.B. expect /opt/iobroker/node_modules/iobroker.eq3-thermostat/eq3.exp",
        "ru": "<a href=\"https://github.com/Heckie75/eQ-3-radiator-thermostat/blob/master/eq3.exp\" target=\"_blank\">eq3.exp</a>   |  e.g. expect /opt/iobroker/node_modules/iobroker.eq3-thermostat/eq3.exp",
        "pt": "<a href=\"https://github.com/Heckie75/eQ-3-radiator-thermostat/blob/master/eq3.exp\" target=\"_blank\">eq3.exp</a>   |  e.g. expect /opt/iobroker/node_modules/iobroker.eq3-thermostat/eq3.exp",
        "nl": "<a href=\"https://github.com/Heckie75/eQ-3-radiator-thermostat/blob/master/eq3.exp\" target=\"_blank\">eq3.exp</a>   |  e.g. expect /opt/iobroker/node_modules/iobroker.eq3-thermostat/eq3.exp",
        "fr": "<a href=\"https://github.com/Heckie75/eQ-3-radiator-thermostat/blob/master/eq3.exp\" target=\"_blank\">eq3.exp</a>   |  e.g. expect /opt/iobroker/node_modules/iobroker.eq3-thermostat/eq3.exp",
        "it": "<a href=\"https://github.com/Heckie75/eQ-3-radiator-thermostat/blob/master/eq3.exp\" target=\"_blank\">eq3.exp</a>   |  e.g. expect /opt/iobroker/node_modules/iobroker.eq3-thermostat/eq3.exp",
        "es": "<a href=\"https://github.com/Heckie75/eQ-3-radiator-thermostat/blob/master/eq3.exp\" target=\"_blank\">eq3.exp</a>   |  e.g. expect /opt/iobroker/node_modules/iobroker.eq3-thermostat/eq3.exp",
        "pl": "<a href=\"https://github.com/Heckie75/eQ-3-radiator-thermostat/blob/master/eq3.exp\" target=\"_blank\">eq3.exp</a>   |  e.g. expect /opt/iobroker/node_modules/iobroker.eq3-thermostat/eq3.exp",
        "zh-cn": "<a href=\"https://github.com/Heckie75/eQ-3-radiator-thermostat/blob/master/eq3.exp\" target=\"_blank\">eq3.exp</a>   |  e.g. expect /opt/iobroker/node_modules/iobroker.eq3-thermostat/eq3.exp"
    },
    "btn_checkPath": {
        "en": "Check Path",
        "de": "Pfad prüfen",
        "ru": "Проверить путь",
        "pt": "Verifique o caminho",
        "nl": "Controleer pad",
        "fr": "Vérifier le chemin",
        "it": "Controlla percorso",
        "es": "Comprobar ruta",
        "pl": "Sprawdź ścieżkę",
        "zh-cn": "检查路径"
    },
    "lab_refresh_interval_short": {
        "en": "Refresh interval",
        "de": "Aktualisierungsintervall",
        "ru": "Интервал обновления",
        "pt": "Intervalo de atualização",
        "nl": "Vernieuwingsinterval",
        "fr": "Intervalle de rafraîchissement",
        "it": "Intervallo di aggiornamento",
        "es": "Intervalo de actualización",
        "pl": "Częstotliwość odświeżania",
        "zh-cn": "刷新间隔"
    },
    "lab_refresh_interval_long": {
        "en": "in minutes",
        "de": "in Minuten",
        "ru": "в считанные минуты",
        "pt": "em minutos",
        "nl": "in minuten",
        "fr": "en quelques minutes",
        "it": "in pochi minuti",
        "es": "en minutos",
        "pl": "w minutach",
        "zh-cn": "在几分钟内"
    },
    "lab_button_step_short": {
        "en": "Temperature steps for plus/minus button (experimental)",
        "de": "Temperaturstufen für Plus/Minus-Taste (experimentell)",
        "ru": "Шаги температуры для кнопки плюс / минус (экспериментальная)",
        "pt": "Etapas de temperatura para o botão mais / menos (experimental)",
        "nl": "Temperatuurstappen voor plus/min-knop (experimenteel)",
        "fr": "Étapes de température pour le bouton plus/moins (expérimental)",
        "it": "Gradini di temperatura per il pulsante più/meno (sperimentale)",
        "es": "Pasos de temperatura para el botón más / menos (experimental)",
        "pl": "Kroki temperatury dla przycisku plus/minus (eksperymentalne)",
        "zh-cn": "加/减按钮的温度步骤（实验性）"
    },
    "lab_button_step_long": {
        "en": "0.5°C or 1.0°C",
        "de": "0,5°C oder 1,0°C",
        "ru": "0,5 °C или 1,0 ° C",
        "pt": "0,5 °C ou 1,0 ° C",
        "nl": "0,5°C of 1,0°C",
        "fr": "0,5°C ou 1,0°C",
        "it": "0,5°C o 1,0°C",
        "es": "0,5 °C o 1,0 ° C",
        "pl": "0,5°C lub 1,0°C",
        "zh-cn": "0.5°C 或 1.0°C"
    },
    "lab_override_modemanual_short": {
        "en": "Always manual mode",
        "de": "Immer manueller Modus",
        "ru": "Всегда ручной режим",
        "pt": "Modo sempre manual",
        "nl": "Altijd handmatige modus",
        "fr": "Mode toujours manuel",
        "it": "Modalità sempre manuale",
        "es": "Siempre en modo manual",
        "pl": "Zawsze tryb ręczny",
        "zh-cn": "始终手动模式"
    },
    "lab_devices": {
        "en": "Devicelist",
        "de": "Geräteliste",
        "ru": "Devicelist",
        "pt": "Lista de dispositivos",
        "nl": "Lijst met apparaten",
        "fr": "Liste des périphériques",
        "it": "Elenco dispositivi",
        "es": "Lista de dispositivos",
        "pl": "Lista urządzeń",
        "zh-cn": "设备列表"
    },
    "text_devices": {
        "en": "Add your eq3-Devices, which you want to control. <br> 1. Power on eq3-Device. Only one at a time they have all the same Bluetooth-Name (CC-RT-BLE) <br> 2. Get the MAC-Address with the Command \"sudo hcitool lescan\" <br> 3. Add Device with the + Button",
        "de": "Hier fügst du \r deine eq3-Geräte hinzu, die du steuern möchtest. <br> 1. eq3-Gerät starten. Immer nur eines, da der Bluetooth Name bei allen Geräten gleich ist. (CC-RT-BLE) <br> 2. Führe das Kommando \"sudo hcitool lescan\" auf der Konsole aus. <br> 3. Mit der + Knopf eine neue Zeile einfügen und die MAC-Adresse setzen.",
        "ru": "Add your eq3-Devices, which you want to control. <br> 1. Power on eq3-Device. Only one at a time they have all the same Bluetooth-Name (CC-RT-BLE) <br> 2. Get the MAC-Address with the Command \"sudo hcitool lescan\" <br> 3. Add Device with the + Button",
        "pt": "Add your eq3-Devices, which you want to control. <br> 1. Power on eq3-Device. Only one at a time they have all the same Bluetooth-Name (CC-RT-BLE) <br> 2. Get the MAC-Address with the Command \"sudo hcitool lescan\" <br> 3. Add Device with the + Button",
        "nl": "Add your eq3-Devices, which you want to control. <br> 1. Power on eq3-Device. Only one at a time they have all the same Bluetooth-Name (CC-RT-BLE) <br> 2. Get the MAC-Address with the Command \"sudo hcitool lescan\" <br> 3. Add Device with the + Button",
        "fr": "Add your eq3-Devices, which you want to control. <br> 1. Power on eq3-Device. Only one at a time they have all the same Bluetooth-Name (CC-RT-BLE) <br> 2. Get the MAC-Address with the Command \"sudo hcitool lescan\" <br> 3. Add Device with the + Button",
        "it": "Add your eq3-Devices, which you want to control. <br> 1. Power on eq3-Device. Only one at a time they have all the same Bluetooth-Name (CC-RT-BLE) <br> 2. Get the MAC-Address with the Command \"sudo hcitool lescan\" <br> 3. Add Device with the + Button",
        "es": "Add your eq3-Devices, which you want to control. <br> 1. Power on eq3-Device. Only one at a time they have all the same Bluetooth-Name (CC-RT-BLE) <br> 2. Get the MAC-Address with the Command \"sudo hcitool lescan\" <br> 3. Add Device with the + Button",
        "pl": "Add your eq3-Devices, which you want to control. <br> 1. Power on eq3-Device. Only one at a time they have all the same Bluetooth-Name (CC-RT-BLE) <br> 2. Get the MAC-Address with the Command \"sudo hcitool lescan\" <br> 3. Add Device with the + Button",
        "zh-cn": "Add your eq3-Devices, which you want to control. <br> 1. Power on eq3-Device. Only one at a time they have all the same Bluetooth-Name (CC-RT-BLE) <br> 2. Get the MAC-Address with the Command \"sudo hcitool lescan\" <br> 3. Add Device with the + Button"
    },
    "text_devices_loading": {
        "en": "Loading, please wait for 10 seconds... <br> Found Devices will be displayed here one finished!",
        "de": "Suche nach Geräten, bitte 10 Sekunden warten... <br> Gefundene Geräte erscheinen hier sobald die Suche abgeschlossen ist!",
        "ru": "Идет загрузка, подождите 10 секунд ...<br> Найденные устройства будут отображаться здесь один готовый!",
        "pt": "Carregando, aguarde 10 segundos ...<br> Dispositivos encontrados serão exibidos aqui um concluído!",
        "nl": "Bezig met laden, wacht 10 seconden...<br> Gevonden apparaten worden hier weergegeven als er één klaar is!",
        "fr": "Chargement, veuillez patienter 10 secondes...<br> Les appareils trouvés seront affichés ici une fois terminés !",
        "it": "Caricamento in corso, attendere 10 secondi...<br> I dispositivi trovati verranno visualizzati qui uno finito!",
        "es": "Cargando, espere 10 segundos ...<br> Los dispositivos encontrados se mostrarán aquí ¡uno terminado!",
        "pl": "Ładowanie, poczekaj 10 sekund...<br> Znalezione urządzenia będą wyświetlane tutaj jeden zakończony!",
        "zh-cn": "正在加载，请等待 10 秒...<br> Found Devices 这里会显示一个完成！"
    },
    "lab_BtnAddManual": {
        "en": "Add Device",
        "de": "Gerät hinzufügen",
        "ru": "Добавить устройство",
        "pt": "Adicionar Dispositivo",
        "nl": "Voeg toestel toe",
        "fr": "Ajouter un appareil",
        "it": "Aggiungi dispositivo",
        "es": "Añadir dispositivo",
        "pl": "Dodaj urządzenie",
        "zh-cn": "添加设备"
    },
    "lab_BtnAddScan": {
        "en": "BT Scan (experimental)",
        "de": "BT-Scan (experimentell)",
        "ru": "BT Scan (экспериментальный)",
        "pt": "BT Scan (experimental)",
        "nl": "BT-scan (experimenteel)",
        "fr": "BT Scan (expérimental)",
        "it": "Scansione BT (sperimentale)",
        "es": "BT Scan (experimental)",
        "pl": "Skanowanie BT (eksperymentalne)",
        "zh-cn": "BT 扫描（实验性）"
    },
    "eq3MAC": {
        "en": "eq3 MAC-Address",
        "en": "eq3 MAC-Address",
        "de": "eq3 MAC-Address",
        "ru": "eq3 MAC-Address",
        "pt": "eq3 MAC-Address",
        "nl": "eq3 MAC-Address",
        "fr": "eq3 MAC-Address",
        "it": "eq3 MAC-Address",
        "es": "eq3 MAC-Address",
        "pl": "eq3 MAC-Address",
        "zh-cn": "eq3 MAC 地址"
    },
    "eq3Name": {
        "en": "eq3 Device Name/Room",
        "de": "eq3 Gerätename/Raum",
        "ru": "eq3 Имя устройства / Комната",
        "pt": "eq3 Nome do dispositivo / sala",
        "nl": "eq3 Apparaatnaam/ruimte",
        "fr": "eq3 Nom de l'appareil/Pièce",
        "it": "eq3 Nome dispositivo/Stanza",
        "es": "eq3 Nombre del dispositivo / Sala",
        "pl": "eq3 Nazwa urządzenia/Pomieszczenie",
        "zh-cn": "eq3 设备名称/房间"
    },
    "delete": {
        "en": "delete",
        "de": "löschen",
        "ru": "удалять",
        "pt": "excluir",
        "nl": "verwijderen",
        "fr": "effacer",
        "it": "Elimina",
        "es": "Eliminar",
        "pl": "kasować",
        "zh-cn": "删除"
    }
};
