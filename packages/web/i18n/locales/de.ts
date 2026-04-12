export default {
  closeAlt: 'Kreuz',
  moreInfoTitle: 'Mehr erfahren',
  moreInfoAlt: 'Info Symbol',
  palavaLogoAlt: 'palava Papagei',
  switchLanguageTitle: 'Sprache umschalten',
  switchLanguageAlt: 'Sprachkürzel',
  home: {
    blog: 'Blog',
    github: 'GitHub',
    goTitle: ' Erstelle den Meetingraum oder tritt ihm bei',
    goAlt: 'Zwei Leute',
    hiddenRoomIntro: 'Oder starte ein',
    hiddenRoom: 'verstecktes Meeting',
    hiddenRoomTitle: 'Erstelle ein Meetingraum mit einem zufälligem Namen',
    noSupportMessage: `
      Entschuldigung, aber wir konnten die benötigte WebRTC-Technologie im Webbrowser nicht finden.<br/>
      <br/>
      Um palava.tv benutzen zu können, musst du einen Webbrowser mit Unterstützung für WebRTC installieren, wie zum Beispiel Firefox.
      Eventuell reicht es bereits aus, den jetzigen Browser auf die neuste Version upzudaten.
    `,
    palavaLogoTitle: 'Was ist palava.tv?',
    roomIdPlaceholder: 'Gib den Namen eines Meetingraums ein',
    mastodon: 'Mastodon',
  },
  info: {
    palavaLogoTitle: 'Gehe zur palava.tv Startseite',
    confirmLeave: 'Dies wird die derzeitige palava.tv-Sitzung beenden. Fortfahren?',
  },
  room: {
    aboutPalava: 'Mehr über palava.tv erfahren',
    emptyTitle: 'Meetingraum',
    errorFullHeading: 'Dieser palava.tv Meetingraum ist voll',
    errorFullDescription: 'Du kannst diesen Meetingraum nicht betreten, weil die maximale Anzahl an Nutzern darin ereicht ist.',
    errorFullTryAgain: 'Versuche es nochmal!',
    errorMaintenanceHeading: 'Entschuldigung, deine Verbindung wird zurückgesetzt',
    errorMaintenanceDescription: 'Wegen Wartungsarbeiten des palava.tv-Servers, verlierst du deine Verbindung. Wir entschuldingen uns für etwaige daraus entstandene Unannehmlichkeiten.',
    errorMaintenanceTryAgain: 'Bitte lade in einigen Augenblicken neu!',
    errorConnectionHeading: 'Nicht möglich diesen palava.tv Meetingraum zu betreten',
    errorConnectionDescription: 'Die Verbindung zu palava.tv konnte nicht hergestellt werden. Der Grund dafür könnte ein Fehler mit der Internetverbindung sein.',
    errorConnectionTryAgain: 'Versuche es nochmal!',
    gumChooseMedia: 'Bitte wähle, ob du dein Video und Audio an die Anderen im Meetingraum senden möchtest, oder nur eins von beiden:',
    gumChoiceVideoAndAudio: 'Video und Audio',
    gumChoiceVideo: 'Nur Video',
    gumChoiceAudio: 'Nur Audio',
    gumChoiceNoMedia: 'Nur Text',
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
    gumErrorHeading: 'palava.tv konnte nicht auf den gewünschten Medienstrom zugreifen',
    gumHeading: 'Du bist dabei, einen palava.tv Meetingraum zu betreten',
    gumIntro: `
      Dies wird einem Videochat mit allen, die auch mit dieser Seite verbunden sind, beitreten oder einen neuen eröffnen.
      Aus technischen Gründen werden deine IP-Adresse und andere persönliche Daten über den palava.tv-Server an alle
      anderen Teilnehmer_innen gesendet. Durch das Fortfahren, stimmst du unserer Datenschutzerklärung zu,
      <a href="/info/privacy">du kannst sie hier lesen</a>.
    `,
    gumNamePlaceholder: 'Dein Name (optional)',
    gumSoundsEnabled: 'Soundeffekte wenn Leute beitreten/gehen',
    waitingForUserMedia: 'Warte auf Medienströme',
    waitingForRoomServer: 'Internetverbindung instabil,<br/>versuche Server zu erreichen',
  },
  party: {
    toggleControls: 'Bedienelemente umschalten',
    infoTitle: 'Info',
    infoAlt: 'Info Symbol',
    copyLinkTitle: 'Link teilen/kopieren',
    copyLinkAlt: 'Klemmbrett',
    turnOffCameraTitle: 'Kamera abschalten',
    turnOnCameraTitle: 'Kamera anschalten',
    cameraAlt: 'Kamera',
    muteMicrophoneTitle: 'Mikrofon stummschalten',
    unmuteMicrophoneTitle: 'Mikrofon anschalten ',
    microphoneAlt: 'Mikrofon',
    screenShareTitle: 'Bildschirm teilen',
    screenShareAlt: 'Desktop-Computer',
    hangUpTitle: 'Auflegen',
    hangUpAlt: 'Telefonhörer nach unten zeigend',
  },
  peer: {
    toggleEnlargeTitle: 'Vergrößern',
    toggleEnlargeAlt: 'Pfeil mit Spitze nach oben links',
    toggleMinimizeTitle: 'Verkleinern',
    toggleMinimizeAlt: 'Pfeil mit Spitze nach unten rechts',
    fullScreenTitle: 'Auf vollem Bild­schirm anzeigen',
    fullScreenAlt: 'Viereck aus vier Ecken',
    networkInfoTitle: 'Netzwerk­infor­mationen anzeigen',
    networkInfoAlt: 'Erdkugel mit Netzwerk',
    muteAudioTitle: 'Stumm­schalten',
    unmuteAudioTitle: 'Laut­schalten',
    mutedAudioAlt: 'Lautsprecher ohne Geräusch',
    withAudioAlt: 'Lautsprecher mit Geräusch',
    placeholderAlt: 'Fläche ausgefüllt mit der Farbe {color}',
    statusAudioAlt: 'Telefonhörer',
    statusNotReadyAlt: 'Pulsierende Punkte',
    statusNoMediaAlt: 'Kreis mit diagonalem Balken',
    statusErrorAlt: 'Kreis mit Kreuz',
    errorConnectionClosed: 'Verbindung geschlossen',
    errorConnectionFailed: 'Keine Verbindung',
    errorConnectionDisconnected: 'Verbindung getrennt',
    noMedia: 'Keine Medienströme',
    waiting: 'Warte',
  },
  networkInfo: {
    directConnection: 'Direktverbindung',
    relayedConnection: 'Verbindung über Zwischenstation',
    remoteIps: 'Ferne IP-Adressen',
    localIps: 'Deine IP-Adressen',
    cLineIpTitle: 'Standard IP-Adresse',
    cLineIpAlt: 'Stern',
    iceIpTitle: 'Kandidaten IP-Adresse',
    iceIpAlt: 'Kreis',
    ipIsRelay: 'Zwischenstation',
    unknownConnection: 'Unbekannter Verbindungsstatus',
  },
  infoPages: [
    {
      id: 'about',
      title: 'Info',
      content: `Hier Informationen über die palava.tv-Installation einfügen`,
    },
    {
      id: 'contact',
      title: 'Kontakt',
      content: `Hier die Kontaktmöglichkeiten eintragen`,
    },
    {
      id: 'network',
      linked: false,
      title: 'Netzwerkinformationen',
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
      id: 'not-found',
      linked: false,
      title: 'Nicht gefunden',
      content: `
        <h2>Nicht gefunden</h2>
        <p>
          Die Seite konnte nicht gefunden werden. Der Inhalt könnte verschwunden sein, oder vielleicht hast du die URL falsch eingegeben.
        </p>
      `,
    },
  ],
}
