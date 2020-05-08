export default {
  en: {
    closeAlt: "cross symbol",
    moreInfoTitle: "More info",
    moreInfoAlt: "info sign",
    palavaLogoAlt: "palava parrot",
    home: {
      palavaLogoTitle: "What is palava.tv?",
      goTitle: "Create or join this meeting room",
      goAlt: "dove",
      roomIdPlaceholder: "Enter name of a meeting room",
      hiddenRoomIntro: "Or start a",
      hiddenRoom: "hidden meeting",
      hiddenRoomTitle: "Create meeting room with random name",
      noSupportMessage: `
        Sorry, but we could not detect the required WebRTC technology in your web browser.<br/>
        <br/>
        In order to be able to use palava.tv,
        you will need install a web browser which supports WebRTC, such as Firefox.
        If you are in luck, you just need to update your current browser to the latest version.
      `
    },
    info: {
      confirmLeave: "This will exit the current palava.tv session. Continue?",
    },
    room: {
      emptyTitle: "room",
      waitingForUserMedia: "waits for your media streams"
    },
    party: {
      toggleControls: "Toggle controls",
      infoTitle: "Info",
      infoAlt: "Info sign",
      copyLinkTitle: "Copy link",
      copyLinkAlt: "chain links",
      turnOffCameraTitle: "Turn off camera",
      turnOnCameraTitle: "Turn on camera",
      cameraAlt: "camera",
      muteMicrophoneTitle: "Mute microphone",
      unmuteMicrophoneTitle: "Turn on microphone",
      microphoneAlt: "microphone",
      screenShareTitle: "Share screen",
      screenShareAlt: "computer display",
      // openTextChatTitle: "Show text chat",
      // hideTextChatTitle: "Hide text chat",
      // textChatAlt: "speech bubbles",
      switchLanguageTitle: "Switch language",
      switchLanguageAlt: "language code",
      hangUpTitle: "Hang up",
      hangUpAlt: "telephone handset ",
    },
    peer: {
      toggleEnlargeTitle: "Enlarge",
      toggleEnlargeAlt: "arrow pointing upwards left",
      toggleMinimizeTitle: "Minimize",
      toggleMinimizeAlt: "arrow pointing downwards right",
      fullScreenTitle: "View on full screen",
      fullScreenAlt: "square of four corners",
      networkInfoTitle: "Show network info",
      networkInfoAlt: "network of three computers",
      muteAudioTitle: "Mute",
      unmuteAudioTitle: "Unmute",
      mutedAudioAlt: "speaker without noise",
      withAudioAlt: "speaker with noise",
      placeholderAlt: "area colored with {color}",
      statusAudioAlt: "old telephone",
      statusNotReadyAlt: "pulsating dots",
      statusNoMediaAlt: "speech bubble",
      statusErrorAlt: "cross symbol",
      errorConnectionClosed: "Connnection closed",
      errorConnectionFailed: "No connnection",
      errorConnectionDisconnected: "Disconnnected",
    },
    networkInfo: {
      directConnection: "Direct connection",
      relayedConnection: "Connection via relay",
      remoteIps: "Remote IP addresses",
      localIps: "Your IP addresses",
      cLineIpTitle: "Default IP address",
      cLineIpAlt: "star",
      iceIpTitle: "Candidate IP address",
      iceIpAlt: "circle",
    },
    infoPages: {
      about: {
        title: "About",
        content: `
          TODO
        `
      },
      contact: {
        title: "Contact Info",
        content: `
          <h2>Get in Touch</h2>
          <p>You can reach us at <a href="mailto:contact@palava.tv">contact@palava.tv</a></p>
          <p>We are tweeting from <a href="https://twitter.com/palavatv">@palavatv</a></p>
          <p>Our code is open source on <a href="https://github.com/palavatv">GitHub</a></p>

          <h2>Imprint</h2>
          <address>
            palava e. V.<br/>
            Thomas-Müntzer-Platz 5<br/>
            01307 Dresden<br/>
            Germany
          </address>

          <h2>Registration</h2>
          <p>VR 5967 (Amtsgericht Dresden)</p>

          <h2>Representatives</h2>
          <p>Marius Melzer, Jan Lelis, Alexandra Weiss</p>
        `
      },
      ev: {
        title: 'Palava Association',
        content: `
          <p>We are <strong>palava e. V.</strong>, a German non-profit organization which aims to promote knowledge about decentralized communication technologies like WebRTC. Our three areas of activity are:</p>

          <h2>Education</h2>
          <p>We are blogging about new webrtc and palava developments on our blog. We explain how to use new decentral technologies, hold workshops, and give talks from time to time.</p>

          <h2>Open Source</h2>
          <p>palava is open source software that makes use of the WebRTC technology. See our <a href="https://github.com/palavatv/palava">GitHub profile</a> for more information. Feel free to setup your own palava.</p>

          <h2>palava.tv</h2>
          <p>As an example of how to use WebRTC to enable a new way of communication, we maintain this page.</p>
        `
      },
      how: {
        title: 'How to Use',
        content: `
          <h2>What is palava?</h2>
          <p>
            <strong>palava.tv</strong> is simplistic video communication with your friends and colleagues from within your web browser. No registration or browser plugin required.
          </p>

          <h2>How to use palava?</h2>
          <p>
            TODO
          </p>
          <p>
            It is possible to create a hidden conference room by clicking the &lt;secret conference&gt; link on the start page. It will create a long random name for the conference, which noone can guess. Share this link as usual to invite you friends. Only people who know this exact link can join.
          </p>

          <h2>How does palava.tv work under the hood?</h2>
          <p>
            <strong>palava.tv</strong> is based on a technology called <a href="https://www.webrtc.org/">Web Real-Time Communication</a> (WebRTC) which enables pluginless video conferencing via peer-to-peer connections. It is built on top of many <a href="https://datatracker.ietf.org/wg/rtcweb/documents/">lower-level standards by the Internet Engineering Task Force</a>. Please see our <a href="https://blog.palava.tv/">blog</a> or our <a href="https://github.com/palavatv/palava">GitHub page</a> for more technical information.
          </p>
        `
      },
      network: {
        title: 'Network Info',
        content: `
          <h2>Connection Type</h2>
          <p>There are two different ways in which you can connect to someone via palava.tv:</p>
          <ul>
            <li><strong>Direct:</strong> Your device is directly connected to the other device</li>
            <li><strong>Relayed:</strong> Both devices send there data to a relay server. Sometimes, this is necessary to successfully enable the connection. The relay server has no access to the data.</li>
          </ul>
          <p>As of now, all connections are <strong>direct</strong>. We are working on providing relay servers soon.</p>

          <h2>Remote &amp; Local IPs</h2>
          <p>
            In order to establish a working connection, both parties send all their IP addresses to each other, including ones from your local network.
          </p>
          <p>
            IP addresses can come in IPv4 format (X.X.X.X) or IPv6 format (X:X:X:X:X:X:X:X).
          </p>
        `
      },
      'not-found': {
        title: '404',
        content: `
          <h2>Page could not be found</h2>
        `
      },
      privacy: {
        title: 'Privacy Policy',
        content: `
          <p>
            Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. In diesen
            Datenschutzinformationen informieren wir Sie über die Datenverarbeitung im Rahmen
            unserer Website. Sie können sich mit Datenschutzanliegen
            gern an unseren aktuellen Vorstand wenden:
          </p>

          <p>
            Marius Melzer, Jan Lelis und Alexandra Weiß<br />
            contact@palava.tv
          </p>

          <p>
            Weiterführende Kontaktdaten finden Sie in unserem Impressum. Die zuständige
            Datenschutzbehörde ist der sächsische Datenschutzbeauftragte.
          </p>

          <h2>Erhebung und Verarbeitung von Daten</h2>

          <p>
            Auf palava.tv ist es möglich einen gemeinsamen Gruppenchat zu bilden, indem
            man auf der auf der Startseite den gleichen Konferenznamen angibt,
            beziehungsweise direkt per URL die jeweilige Gruppe zugreift. Die Bereitstellung
            des Dienstes erfordert aus technischen Gründen, die Weitergabe von
            folgenden Daten eines jeder_n Teilnehmer_innen über unseren Server an
            alle anderen Teilnehmer_innen des gleichen Gruppenchats:
          </p>

          <ul>
            <li>alle IP-Adressen des_der Nutzer_in (auch lokale und netzwerkinterne)</li>
            <li>User Agent (Browser, Browserversion, Browserengine)</li>
            <li>Informationen über unterstützte Audio- und Videocodecs des Browsers</li>
          </ul>

          <p>
            Eine längerfristige Speicherung, die über die Nutzungsdauer des Dienstes hinaus
            geht, erfolgt nicht. Weiterhin verwenden wir keine Cookies und protokollieren
            keine personenbezogenen Daten (z.b. IP Adressen) in unseren Serverlogs.
          </p>

          <h2>Datenspeicherung durch den Serverbetreiber</h2>

          <p>
            Unser Server wird von <a href="https://www.simplyroot.de/">SimplyRoot</a> bereitgestellt.
             Zwecks Auskunft, Widerspruch oder Beschwerde über potenziell von SimplyRoot
             erhobene Daten, wenden Sie sich bitte direkt an SimplyRoot
             (<a href="https://www.simplyroot.de/de/ansprechpartner/">Kontaktseite</a>).
          </p>

          <h2>Kontakt zu uns</h2>

          <p>
            Wenn Sie per E-Mail Kontakt mit uns aufnehmen, so verwenden wir Ihre E-Mail-Adresse
            nur, um mit Ihnen in Kontakt zu treten. Andere Verwendungen
            schließen wir aus.
          </p>
        `
      }
    }
  },
  de: {
    closeAlt: "Kreuz",
    moreInfoTitle: "Mehr erfahren",
    moreInfoAlt: "Info Symbol",
    palavaLogoAlt: "palava Papagei",
    home: {
      palavaLogoTitle: "Was ist palava.tv?",
      goTitle: " Erstelle den Meetingraum oder tritt ihm bei",
      goAlt: "Taube",
      roomIdPlaceholder: "Gib den Namen eines Meetingraums ein",
      hiddenRoomIntro: "Oder starte ein",
      hiddenRoom: "verstecktes Meeting",
      hiddenRoomTitle: "Erstelle ein Meetingraum mit einem zufälligem Namen",
      noSupportMessage: `
        Entschuldigung, aber wir konnten die benötigte WebRTC-Technologie im Webbrowser nicht finden.<br/>
        <br/>
        Um palava.tv benutzen zu können, musst du einen Webbrowser mit Unterstützung für WebRTC installieren, wie zum Beispiel Firefox.
        Eventuell reicht es bereits aus, den jetzigen Browser auf die neuste Version upzudaten.
      `
    },
    info: {
      confirmLeave: "Dies wird die derzeitige palava.tv-Sitzung beenden. Fortfahren?",
    },
    room: {
      emptyTitle: "raum",
      waitingForUserMedia: "Wartet auf deine Medienströme"
    },
    party: {
      toggleControls: "Bedienelemente umschalten",
      infoTitle: "Info",
      infoAlt: "Info Symbol",
      copyLinkTitle: "Link kopieren",
      copyLinkAlt: "Klemmbrett",
      turnOffCameraTitle: "Kamera abschalten",
      turnOnCameraTitle: "Kamera anschalten",
      cameraAlt: "Kamera",
      muteMicrophoneTitle: "Mikrofon stummschalten",
      unmuteMicrophoneTitle: "Mikrofon anschalten ",
      microphoneAlt: "Mikrofon",
      screenShareTitle: "Bildschirm teilen",
      screenShareAlt: "Desktop-Computer",
      // openTextChatTitle: "Text-chat zeigen",
      // hideTextChatTitle: "Text-chat verbergen",
      // textChatAlt: "Sprechblasen",
      switchLanguageTitle: "Sprache umschalten",
      switchLanguageAlt: "Sprachkürzel",
      hangUpTitle: "Auflegen",
      hangUpAlt: "Kreuz",
    },
    peer: {
      toggleEnlargeTitle: "Vergrößern",
      toggleEnlargeAlt: "Pfeil mit Spitze nach oben links",
      toggleMinimizeTitle: "Verkleinern",
      toggleMinimizeAlt: "Pfeil mit Spitze nach unten rechts",
      fullScreenTitle: "Auf vollem Bildschirm anzeigen",
      fullScreenAlt: "Viereck aus vier Ecken",
      networkInfoTitle: "Netzwerkinformationen anzeigen",
      networkInfoAlt: "Netzwerk aus drei Computern",
      muteAudioTitle: "Stummschalten",
      unmuteAudioTitle: "Lautschalten",
      mutedAudioAlt: "Lautsprecher ohne Geräusch",
      withAudioAlt: "Lautsprecher mit Geräusch",
      placeholderAlt: "Fläche ausgefüllt mit der Farbe {color}",
      statusAudioAlt: "Altes Telefon",
      statusNotReadyAlt: "Pulsierende Punkte",
      statusNoMediaAlt: "Sprechblase",
      statusErrorAlt: "Kreuz",
      errorConnectionClosed: "Verbindung geschlossen",
      errorConnectionFailed: "Keine Verbindung",
      errorConnectionDisconnected: "Verbindung getrennt",
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
    },
  },
}
