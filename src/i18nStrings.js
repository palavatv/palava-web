export default {
  en: {
    closeAlt: "cross symbol",
    moreInfoTitle: "More info",
    moreInfoAlt: "info sign",
    palavaLogoAlt: "palava parrot",
    switchLanguageTitle: "Switch language",
    switchLanguageAlt: "language code",
    home: {
      blog: "Blog",
      github: "GitHub",
      goTitle: "Create or join this meeting room",
      goAlt: "two people",
      hiddenRoomIntro: "Or start a",
      hiddenRoom: "hidden meeting",
      hiddenRoomTitle: "Create meeting room with random name",
      noSupportMessage: `
        Sorry, but we could not detect the required WebRTC technology in your web browser.<br/>
        <br/>
        In order to be able to use palava.tv,
        you will need install a web browser which supports WebRTC, such as Firefox.
        If you are in luck, you just need to update your current browser to the latest version.
      `,
      palavaLogoTitle: "What is palava.tv?",
      roomIdPlaceholder: "Enter name of a meeting room",
      twitter: "Twitter",
    },
    info: {
      palavaLogoTitle: "Go to palava.tv home page",
      confirmLeave: "This will exit the current palava.tv session. Continue?",
    },
    room: {
      aboutPalava: "Learn more about palava.tv",
      emptyTitle: "Meeting Room",
      errorFullHeading: "This palava.tv meeting room is full",
      errorFullDescription: "You cannot enter this room, because the maximum number of participants is reached.",
      errorFullTryAgain: "Try again!",
      errorMaintenanceHeading: "Sorry, your connection will be reset",
      errorMaintenanceDescription: "Because of a palava.tv server maintenance, your connection is being lost. We apologize for any inconvenience this may cause.",
      errorMaintenanceTryAgain: "Please reload in a few moments!",
      errorConnectionHeading: "Unable to join this palava.tv meeting room",
      errorConnectionDescription: "The connection to palava.tv could not be established. This might be caused by an error with your Internet connection.",
      errorConnectionTryAgain: "Try again!",
      gumChooseMedia: "Please choose if you want to send your video and audio to others in the room, or only one of both:",
      gumChoiceVideoAndAudio: "Video and audio",
      gumChoiceVideo: "Only video",
      gumChoiceAudio: "Only audio",
      gumChoiceNoMedia: "Only text",
      gumErrorReasons: `
        <p>
          Possible reasons and solutions:
        </p>

        <ul>
          <li>You have denied access. Try again by pressing one of the above buttons.</li>
          <li>You have previously denied palava.tv to access you microphone or camera. You will need to unblock it in your browser settings to be able to join this room. In most browsers, this can be done by clicking on a small camera symbol in the address bar</li>
          <li>Another program on your computer is using the camera. Stop this program and try again.</li>
        </ul>
      `,
      gumErrorHeading: "palava.tv was unable to access the requested media stream",
      gumHeading: "You are about to join a palava.tv meeting room",
      gumIntro: `
        This will join or create a video chat meeting with anyone also connected to this page.
        For technical reasons, your IP address and other personal data is sent to all other
        participants via the palava.tv server. By continuing, you consent to our privacy policy,
        <a href="/info/privacy">you can read it here</a>.
      `,
      waitingForUserMedia: "waiting for media streams",
      waitingForRoomServer: "internet connection unstable,<br/>trying to reach server",
    },
    party: {
      toggleControls: "Toggle controls",
      infoTitle: "Info",
      infoAlt: "Info sign",
      copyLinkTitle: "Share/copy link",
      copyLinkAlt: "chain links",
      turnOffCameraTitle: "Turn off camera",
      turnOnCameraTitle: "Turn on camera",
      cameraAlt: "camera",
      muteMicrophoneTitle: "Mute microphone",
      unmuteMicrophoneTitle: "Turn on microphone",
      microphoneAlt: "microphone",
      screenShareTitle: "Share screen",
      screenShareAlt: "computer display",
      openTextChatTitle: "Show text chat",
      hideTextChatTitle: "Hide text chat",
      textChatAlt: "speech bubbles",
      hangUpTitle: "Hang up",
      hangUpAlt: "telephone handset facing downward",
    },
    peer: {
      toggleEnlargeTitle: "Enlarge",
      toggleEnlargeAlt: "arrow pointing upwards left",
      toggleMinimizeTitle: "Minimize",
      toggleMinimizeAlt: "arrow pointing downwards right",
      fullScreenTitle: "View on full screen",
      fullScreenAlt: "square of four corners",
      networkInfoTitle: "Show network info",
      networkInfoAlt: "globe with network",
      muteAudioTitle: "Mute",
      unmuteAudioTitle: "Unmute",
      mutedAudioAlt: "speaker without noise",
      withAudioAlt: "speaker with noise",
      placeholderAlt: "area colored with {color}",
      statusAudioAlt: "telephone handset",
      statusNotReadyAlt: "pulsating dots",
      statusNoMediaAlt: "circle with diagonal line",
      statusErrorAlt: "circle with cross",
      errorConnectionClosed: "Connection closed",
      errorConnectionFailed: "No connection",
      errorConnectionDisconnected: "Disconnected",
      noMedia: "No media streams",
      waiting: "Waiting",
    },
    chat: {
      error: "You are not connected to any other person. This message will thus not be seen by anyone."
    },
    networkInfo: {
      directConnection: "Direct connection",
      relayedConnection: "Connection via relay",
      remoteIps: "Remote IP addresses",
      localIps: "Your IP addresses",
      ipTitle: "",
      ipAlt: "",
      ipIsRelay: "relay",
      unknownConnection: "Unknown connection status",
    },
    infoPages: [
      {
        id: "about",
        title: "Info",
        content: `
          <h2>Info</h2>
          <p>
            Insert information about this palava.tv installation here
          </p>
        `
      },
      {
        id: "contact",
        title: "Contact",
        content: `
          <h2>Contact</h2>
          <p>
            Insert contact details here
          </p>
        `
      },
      {
        id: "network",
        linked: false,
        title: "Network Info",
        content: `
          <h2>Connection Type</h2>
          <p>
            There are two different ways in which you can connect to someone via palava.tv:
          </p>
          <br/>
          <ul>
            <li><strong>Direct:</strong> Your device is directly connected to the other device</li>
            <li><strong>Relayed:</strong> Both devices send their data to a relay server. This is sometimes necessary to successfully enable the connection. The relay server has no access to the data.</li>
          </ul>

          <h2>Remote &amp; Local IPs</h2>
          <p>
            In order to establish a working connection, both parties send all their IP addresses to each other, including ones from your local network.
          </p>
          <p>
            IP addresses can come in IPv4 format (X.X.X.X) or IPv6 format (X:X:X:X:X:X:X:X).
          </p>
        `
      },
      {
        id: "not-found",
        linked: false,
        title: 'Not Found',
        content: `
          <h2>Not Found</h2>
          <p>
            The page could not be found. The content might be gone, or maybe you have mistyped the URL.
          </p>
        `
      },
    ]
  },
  de: {
    closeAlt: "Kreuz",
    moreInfoTitle: "Mehr erfahren",
    moreInfoAlt: "Info Symbol",
    palavaLogoAlt: "palava Papagei",
    switchLanguageTitle: "Sprache umschalten",
    switchLanguageAlt: "Sprachkürzel",
    home: {
      blog: "Blog",
      github: "GitHub",
      goTitle: " Erstelle den Meetingraum oder tritt ihm bei",
      goAlt: "Zwei Leute",
      hiddenRoomIntro: "Oder starte ein",
      hiddenRoom: "verstecktes Meeting",
      hiddenRoomTitle: "Erstelle ein Meetingraum mit einem zufälligem Namen",
      noSupportMessage: `
        Entschuldigung, aber wir konnten die benötigte WebRTC-Technologie im Webbrowser nicht finden.<br/>
        <br/>
        Um palava.tv benutzen zu können, musst du einen Webbrowser mit Unterstützung für WebRTC installieren, wie zum Beispiel Firefox.
        Eventuell reicht es bereits aus, den jetzigen Browser auf die neuste Version upzudaten.
      `,
      palavaLogoTitle: "Was ist palava.tv?",
      roomIdPlaceholder: "Gib den Namen eines Meetingraums ein",
      twitter: "Twitter",
    },
    info: {
      confirmLeave: "Dies wird die derzeitige palava.tv-Sitzung beenden. Fortfahren?",
    },
    room: {
      aboutPalava: "Mehr über palava.tv erfahren",
      emptyTitle: "Meetingraum",
      errorFullHeading: "Dieser palava.tv Meetingraum ist voll",
      errorFullDescription: "Du kannst diesen Meetingraum nicht betreten, weil die maximale Anzahl an Nutzern darin ereicht ist.",
      errorFullTryAgain: "Versuche es nochmal!",
      errorMaintenanceHeading: "Entschuldigung, deine Verbindung wird zurückgesetzt",
      errorMaintenanceDescription: "Wegen Wartungsarbeiten des palava.tv-Servers, verlierst du deine Verbindung. Wir entschuldingen uns für etwaige daraus entstandene Unannehmlichkeiten.",
      errorMaintenanceTryAgain: "Bitte lade in einigen Augenblicken neu!",
      errorConnectionHeading: "Nicht möglich diesen palava.tv Meetingraum zu betreten",
      errorConnectionDescription: "Die Verbindung zu palava.tv konnte nicht hergestellt werden. Der Grund dafür könnte ein Fehler mit der Internetverbindung sein.",
      errorConnectionTryAgain: "Versuche es nochmal!",
      gumChooseMedia: "Bitte wähle, ob du dein Video und Audio an die Anderen im Meetingraum senden möchtest, oder nur eins von beiden:",
      gumChoiceVideoAndAudio: "Video und Audio",
      gumChoiceVideo: "Nur Video",
      gumChoiceAudio: "Nur Audio",
      gumChoiceNoMedia: "Nur Text",
      gumErrorReasons: `
        <p>
          Mögliche Gründe und Lösungen:
        </p>

        <ul>
          <li>Du hast den Zugriff abgelehnt. Probier es nocheinmal, indem du au einen der obigen Knöpfe drückst.</li>
          <li>Du hast bei einem vorigem Besuch den Zugriff von palava.tv auf dein Mikrofon oder deine Kamera nicht gestattet.
          Du musst das Zugriffsverbot in deinen Browsereinstellungen aufheben, um dem Meetingraum beitreten zu können.
          In den meisten Browsern ist das möglich, indem man auf ein kleines Kamerasymbol in der Adresszeile klickt.</li>
          <li>Ein anderes Programm auf deinem Computer benutzt die Kamera. Beende das Programm und probiere es noch einmal.</li>
        </ul>
      `,
      gumErrorHeading: "palava.tv konnte nicht auf den gewünschten Medienstrom zugreifen",
      gumHeading: "Du bist dabei, einen palava.tv Meetingraum zu betreten",
      gumIntro: `
        Dies wird einem Videochat mit allen, die auch mit dieser Seite verbunden sind, beitreten oder einen neuen eröffnen.
        Aus technischen Gründen werden deine IP-Adresse und andere persönliche Daten über den palava.tv-Server an alle
        anderen Teilnehmer_innen gesendet. Durch das Fortfahren, stimmst du unserer Datenschutzerklärung zu,
        <a href="/info/privacy">du kannst sie hier lesen</a>.
      `,
      waitingForUserMedia: "Warte auf Medienströme",
      waitingForRoomServer: "Internetverbindung instabil,<br/>versuche Server zu erreichen",
    },
    party: {
      toggleControls: "Bedienelemente umschalten",
      infoTitle: "Info",
      infoAlt: "Info Symbol",
      copyLinkTitle: "Link teilen/kopieren",
      copyLinkAlt: "Klemmbrett",
      turnOffCameraTitle: "Kamera abschalten",
      turnOnCameraTitle: "Kamera anschalten",
      cameraAlt: "Kamera",
      muteMicrophoneTitle: "Mikrofon stummschalten",
      unmuteMicrophoneTitle: "Mikrofon anschalten ",
      microphoneAlt: "Mikrofon",
      screenShareTitle: "Bildschirm teilen",
      screenShareAlt: "Desktop-Computer",
      openTextChatTitle: "Text-chat zeigen",
      hideTextChatTitle: "Text-chat verbergen",
      textChatAlt: "Sprechblasen",
      hangUpTitle: "Auflegen",
      hangUpAlt: "Telefonhörer nach unten zeigend",
    },
    peer: {
      toggleEnlargeTitle: "Vergrößern",
      toggleEnlargeAlt: "Pfeil mit Spitze nach oben links",
      toggleMinimizeTitle: "Verkleinern",
      toggleMinimizeAlt: "Pfeil mit Spitze nach unten rechts",
      fullScreenTitle: "Auf vollem Bild­schirm anzeigen",
      fullScreenAlt: "Viereck aus vier Ecken",
      networkInfoTitle: "Netzwerk­infor­mationen anzeigen",
      networkInfoAlt: "Erdkugel mit Netzwerk",
      muteAudioTitle: "Stumm­schalten",
      unmuteAudioTitle: "Laut­schalten",
      mutedAudioAlt: "Lautsprecher ohne Geräusch",
      withAudioAlt: "Lautsprecher mit Geräusch",
      placeholderAlt: "Fläche ausgefüllt mit der Farbe {color}",
      statusAudioAlt: "Telefonhörer",
      statusNotReadyAlt: "Pulsierende Punkte",
      statusNoMediaAlt: "Kreis mit diagonalem Balken",
      statusErrorAlt: "Kreis mit Kreuz",
      errorConnectionClosed: "Verbindung geschlossen",
      errorConnectionFailed: "Keine Verbindung",
      errorConnectionDisconnected: "Verbindung getrennt",
      noMedia: "Keine Medienströme",
      waiting: "Warte",
    },
    chat: {
      error: "Sie sind mit niemandem verbunden. Diese Chatnachricht wird daher auch niemand sehen."
    },
    networkInfo: {
      directConnection: "Direktverbindung",
      relayedConnection: "Verbindung über Zwischenstation",
      remoteIps: "Ferne IP-Adressen",
      localIps: "Deine IP-Adressen",
      cLineIpTitle: "Standard IP-Adresse",
      cLineIpAlt: "Stern",
      iceIpTitle: "Kandidaten IP-Adresse",
      iceIpAlt: "Kreis",
      ipIsRelay: "Zwischenstation",
      unknownConnection: "Unbekannter Verbindungsstatus",
    },
    infoPages: [
      {
        id: "about",
        title: "Info",
        content: `
          <h2>Info</h2>
          <p>
            Hier Informationen über die palava.tv-Installation einfügen
          </p>
        `,
      },
      {
        id: "contact",
        title: "Kontakt",
        content: `
          <h2>Kontakt</h2>
          <p>
            Hier die Kontaktmöglichkeiten eintragen
          </p>
        `,
      },
      {
        id: "network",
        linked: false,
        title: "Netzwerkinformationen",
        content: `
          <h2>Verbindungstyp</h2>
          <p>
            Es gibt zwei verschiedene Arten, wie du dich mit jemandem auf palava.tv verbinden kannst:
          </p>
          <br/>
          <ul>
            <li><strong>Direkt:</strong> Dein Gerät ist direkt mit dem anderen Gerät verbunden</li>
            <li><strong>Mit Zwischenstation:</strong> Beide Geräte senden ihre Daten an eine Zwischenstation. Das ist manchmal notwendig, um eine erfolgreiche Verbindung herstellen zu können. Der Zwischenübertragungsserver hat keine Zugriff auf die Daten.</li>
          </ul>
          <p>Zur Zeit sind alle Verbindungen <strong>direkt</strong>. Wir arbeiten daran, demnächst Zwischenübertragungsserver bereit zu stellen.</p>

          <h2>Ferne &amp; Eigene IPs</h2>
          <p>
            Um eine funktionierende Verbindung herzustellen, müssen beide Parteien sich gegenseitig alle ihre IP-Adressen senden, inklusive welche, aus dem eigenen (lokalen) Netzwerk.
          </p>
          <p>
            IP-Adressen können im IPv4-Fromat (X.X.X.X), oder im IPv6-Format vorkommen (X:X:X:X:X:X:X:X).
          </p>
        `,
      },
      {
        id: "not-found",
        linked: false,
        title: "Nicht gefunden",
        content: `
          <h2>Nicht gefunden</h2>
          <p>
            Die Seite konnte nicht gefunden werden. Der Inhalt könnte verschwunden sein, oder vielleicht hast du die URL falsch eingegeben.
          </p>
        `,
      },
    ],
  },
}
