export default {
  closeAlt: 'Kreuz',
  moreInfoTitle: 'Mehr erfahren',
  moreInfoAlt: 'Info Symbol',
  palavaLogoAlt: 'palava Papagei',
  switchLanguageTitle: 'Sprache umschalten',
  switchLanguageAlt: 'Sprachkuerzel',
  home: {
    blog: 'Blog',
    github: 'GitHub',
    goTitle: ' Erstelle den Meetingraum oder tritt ihm bei',
    goAlt: 'Zwei Leute',
    hiddenRoomIntro: 'Oder starte ein',
    hiddenRoom: 'verstecktes Meeting',
    hiddenRoomTitle: 'Erstelle ein Meetingraum mit einem zufaelligem Namen',
    noSupportMessage: `
      Entschuldigung, aber wir konnten die benoetigte WebRTC-Technologie im Webbrowser nicht finden.<br/>
      <br/>
      Um palava.tv benutzen zu koennen, musst du einen Webbrowser mit Unterstuetzung fuer WebRTC installieren, wie zum Beispiel Firefox.
      Eventuell reicht es bereits aus, den jetzigen Browser auf die neuste Version upzudaten.
    `,
    palavaLogoTitle: 'Was ist palava.tv?',
    roomIdPlaceholder: 'Gib den Namen eines Meetingraums ein',
    twitter: 'Twitter',
  },
  info: {
    palavaLogoTitle: 'Zur palava.tv-Startseite',
    confirmLeave: 'Dies wird die derzeitige palava.tv-Sitzung beenden. Fortfahren?',
  },
  room: {
    aboutPalava: 'Mehr ueber palava.tv erfahren',
    emptyTitle: 'Meetingraum',
    errorFullHeading: 'Dieser palava.tv Meetingraum ist voll',
    errorFullDescription: 'Du kannst diesen Meetingraum nicht betreten, weil die maximale Anzahl an Nutzern darin ereicht ist.',
    errorFullTryAgain: 'Versuche es nochmal!',
    errorMaintenanceHeading: 'Entschuldigung, deine Verbindung wird zurueckgesetzt',
    errorMaintenanceDescription: 'Wegen Wartungsarbeiten des palava.tv-Servers, verlierst du deine Verbindung. Wir entschuldingen uns fuer etwaige daraus entstandene Unannehmlichkeiten.',
    errorMaintenanceTryAgain: 'Bitte lade in einigen Augenblicken neu!',
    errorConnectionHeading: 'Nicht moeglich diesen palava.tv Meetingraum zu betreten',
    errorConnectionDescription: 'Die Verbindung zu palava.tv konnte nicht hergestellt werden. Der Grund dafuer koennte ein Fehler mit der Internetverbindung sein.',
    errorConnectionTryAgain: 'Versuche es nochmal!',
    gumChooseMedia: 'Bitte waehle, ob du dein Video und Audio an die Anderen im Meetingraum senden moechtest, oder nur eins von beiden:',
    gumChoiceVideoAndAudio: 'Video und Audio',
    gumChoiceVideo: 'Nur Video',
    gumChoiceAudio: 'Nur Audio',
    gumChoiceNoMedia: 'Nur Text',
    gumErrorReasons: `
      <p>
        Moegliche Gruende und Loesungen:
      </p>
      <ul>
        <li>Du hast den Zugriff abgelehnt. Probier es nocheinmal, indem du auf einen der obigen Knoepfe drueckst.</li>
        <li>Du hast bei einem vorigem Besuch den Zugriff von palava.tv auf dein Mikrofon oder deine Kamera nicht gestattet.
        Du musst das Zugriffsverbot in deinen Browsereinstellungen aufheben, um dem Meetingraum beitreten zu koennen.
        In den meisten Browsern ist das moeglich, indem man auf ein kleines Kamerasymbol in der Adresszeile klickt.</li>
        <li>Ein anderes Programm auf deinem Computer benutzt die Kamera. Beende das Programm und probiere es noch einmal.</li>
      </ul>
    `,
    gumErrorHeading: 'palava.tv konnte nicht auf den gewuenschten Medienstrom zugreifen',
    gumHeading: 'Du bist dabei, einen palava.tv Meetingraum zu betreten',
    gumIntro: `
      Dies wird einem Videochat mit allen, die auch mit dieser Seite verbunden sind, beitreten oder einen neuen eroeffnen.
      Aus technischen Gruenden werden deine IP-Adresse und andere persoenliche Daten ueber den palava.tv-Server an alle
      anderen Teilnehmer_innen gesendet. Durch das Fortfahren, stimmst du unserer Datenschutzerklaerung zu,
      <a href="/info/privacy">du kannst sie hier lesen</a>.
    `,
    waitingForUserMedia: 'Warte auf Medienstroeme',
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
    hangUpAlt: 'Telefonhoerer nach unten zeigend',
  },
  peer: {
    toggleEnlargeTitle: 'Vergroessern',
    toggleEnlargeAlt: 'Pfeil mit Spitze nach oben links',
    toggleMinimizeTitle: 'Verkleinern',
    toggleMinimizeAlt: 'Pfeil mit Spitze nach unten rechts',
    fullScreenTitle: 'Auf vollem Bildschirm anzeigen',
    fullScreenAlt: 'Viereck aus vier Ecken',
    networkInfoTitle: 'Netzwerkinformationen anzeigen',
    networkInfoAlt: 'Erdkugel mit Netzwerk',
    muteAudioTitle: 'Stummschalten',
    unmuteAudioTitle: 'Lautschalten',
    mutedAudioAlt: 'Lautsprecher ohne Geraeusch',
    withAudioAlt: 'Lautsprecher mit Geraeusch',
    placeholderAlt: 'Flaeche ausgefuellt mit der Farbe {color}',
    statusAudioAlt: 'Telefonhoerer',
    statusNotReadyAlt: 'Pulsierende Punkte',
    statusNoMediaAlt: 'Kreis mit diagonalem Balken',
    statusErrorAlt: 'Kreis mit Kreuz',
    errorConnectionClosed: 'Verbindung geschlossen',
    errorConnectionFailed: 'Keine Verbindung',
    errorConnectionDisconnected: 'Verbindung getrennt',
    noMedia: 'Keine Medienstroeme',
    waiting: 'Warte',
  },
  networkInfo: {
    directConnection: 'Direktverbindung',
    relayedConnection: 'Verbindung ueber Zwischenstation',
    remoteIps: 'Ferne IP-Adressen',
    localIps: 'Deine IP-Adressen',
    ipTitle: '',
    ipAlt: '',
    ipIsRelay: 'Zwischenstation',
    unknownConnection: 'Unbekannter Verbindungsstatus',
  },
  infoPages: [
    {
      id: 'about',
      title: 'Info',
      content: `
        <h2>Info</h2>
        <p>
          Hier Informationen ueber die palava.tv-Installation einfuegen
        </p>
      `,
    },
    {
      id: 'contact',
      title: 'Kontakt',
      content: `
        <h2>Kontakt</h2>
        <p>
          Hier die Kontaktmoeglichkeiten eintragen
        </p>
      `,
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
          <li><strong>Direkt:</strong> Dein Geraet ist direkt mit dem anderen Geraet verbunden</li>
          <li><strong>Mit Zwischenstation:</strong> Beide Geraete senden ihre Daten an eine Zwischenstation. Das ist manchmal notwendig, um eine erfolgreiche Verbindung herstellen zu koennen. Der Zwischenuebertragungsserver hat keine Zugriff auf die Daten.</li>
        </ul>

        <h2>Ferne &amp; Eigene IPs</h2>
        <p>
          Um eine funktionierende Verbindung herzustellen, muessen beide Parteien sich gegenseitig alle ihre IP-Adressen senden, inklusive welche, aus dem eigenen (lokalen) Netzwerk.
        </p>
        <p>
          IP-Adressen koennen im IPv4-Format (X.X.X.X), oder im IPv6-Format vorkommen (X:X:X:X:X:X:X:X).
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
          Die Seite konnte nicht gefunden werden. Der Inhalt koennte verschwunden sein, oder vielleicht hast du die URL falsch eingegeben.
        </p>
      `,
    },
  ],
}
