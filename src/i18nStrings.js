export default {
  en: {
    closeAlt: "cross symbol",
    moreInfoTitle: "More info",
    moreInfoAlt: "info sign",
    palavaLogoAlt: "palava parrot",
    switchLanguageTitle: "Switch language",
    switchLanguageAlt: "language code",
    home: {
      about: "About",
      blog: "Blog",
      github: "GitHub",
      goTitle: "Create or join this meeting room",
      goAlt: "dove",
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
        title: "About Palava",
        content: `
          <h2>What is palava.tv?</h2>
          <p>
            It is a simplistic, free, and open source video meeting platform, which is developed by
            a non-profit organization based in the EU. It runs in your browser and no registration is required.
          </p>

          <h2>Directly connected meetings</h2>
          <p>
            The palava.tv platform connects you to all people in a meeting room directly,
            which means that no video or audio gets sent to the palava.tv server.
          </p>

          <p>
            Because everyone in the meeting is connected to everyone else, it works best for small groups with no more than 4-5 people.
            Although palava.tv allows you to connect to up to 10 people, video quality decreases, and this is not recommended.
          <p>
            <strong>Important to know:</strong> In some cases, it is not possible to create a direct media connection between to people and a connection error is shown instead of a video.
          Unfortunately, palava.tv does not work in these cases. We are aware of this situation and are preparing relay servers to mitigate this problem.

          <!--<h2>Learn more</h2>
          <p>
            You can find a step-by-step tutorial at <strong>Usage Tips</strong>. palava.tv is based on the <strong>WebRTC technology</strong>, and everyone with server hosting experience can <strong>easily setup their own version of palava.tv</strong>.
          </p>
          <p>
             The non-commercial <strong>Palava Association</strong> organizes further development, find their contact details on the <strong>contact page</strong>. We do not save your personal details, <strong>click here to read the full privacy policy</strong>.
          </p>-->

        `
      },
      contact: {
        title: "Contact Info",
        content: `
          <h2>Reach us</h2>
          <p>
            The best way to get in touch is to write us an email: <a href="mailto:contact@palava.tv">contact@palava.tv</a><br/>
            We are also tweeting from: <a href="https://twitter.com/palavatv">@palavatv</a><br/>
            Our code is open source on GitHub: <a href="https://github.com/palavatv">@palavatv</a>
          </p>

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
          <p>
            [TODO: 2020 content]
          </p>

          <p>We are <strong>palava e. V.</strong>, a German non-profit organization which aims to promote knowledge about decentralized communication technologies like WebRTC. Our three areas of activity are:</p>

          <h2>Education</h2>
          <p>We are blogging about new webrtc and palava developments on our blog. We explain how to use new decentral technologies, hold workshops, and give talks from time to time.</p>

          <h2>Open Source</h2>
          <p>palava is open source software that makes use of the WebRTC technology. See our <a href="https://github.com/palavatv/palava">GitHub profile</a> for more information. Feel free to setup your own palava.</p>

          <h2>palava.tv</h2>
          <p>As an example of how to use WebRTC to enable a new way of communication, we maintain this page.</p>
        `
      },
      hosting: {
        title: 'Host Yourself',
        content: `
          <p>
            [TODO: 2020 content]
          </p>
        `,
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
        title: 'Not Found',
        content: `
          <p>
            The page could not be found. The content might be gone, or maybe you have mistyped the URL.
          </p>
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
        `,
      },
      usage: {
        title: 'Usage Tips',
        content: `
          <p>
            [TODO: 2020 content]
          </p>
          <p>
            It is possible to create a hidden conference room by clicking the &lt;secret conference&gt; link on the start page. It will create a long random name for the conference, which noone can guess. Share this link as usual to invite you friends. Only people who know this exact link can join.
          </p>
        `
      },
      webrtc: {
        title: 'WebRTC',
        content: `
          <p>
            [TODO: 2020 content]
          </p>
          <h2>How does palava.tv work under the hood?</h2>
          <p>
            <strong>palava.tv</strong> is based on a technology called <a href="https://www.webrtc.org/">Web Real-Time Communication</a> (WebRTC) which enables pluginless video conferencing via peer-to-peer connections. It is built on top of many <a href="https://datatracker.ietf.org/wg/rtcweb/documents/">lower-level standards by the Internet Engineering Task Force</a>. Please see our <a href="https://blog.palava.tv/">blog</a> or our <a href="https://github.com/palavatv/palava">GitHub page</a> for more technical information.
          </p>
        `,
      },
    }
  },
  de: {
    closeAlt: "Kreuz",
    moreInfoTitle: "Mehr erfahren",
    moreInfoAlt: "Info Symbol",
    palavaLogoAlt: "palava Papagei",
    switchLanguageTitle: "Sprache umschalten",
    switchLanguageAlt: "Sprachkürzel",
    home: {
      about: "Infos",
      blog: "Blog",
      github: "GitHub",
      goTitle: " Erstelle den Meetingraum oder tritt ihm bei",
      goAlt: "Taube",
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
      hangUpTitle: "Auflegen",
      hangUpAlt: "Telefonhörer nach unten zeigend",
    },
    peer: {
      toggleEnlargeTitle: "Vergrößern",
      toggleEnlargeAlt: "Pfeil mit Spitze nach oben links",
      toggleMinimizeTitle: "Verkleinern",
      toggleMinimizeAlt: "Pfeil mit Spitze nach unten rechts",
      fullScreenTitle: "Auf vollem Bildschirm anzeigen",
      fullScreenAlt: "Viereck aus vier Ecken",
      networkInfoTitle: "Netzwerkinformationen anzeigen",
      networkInfoAlt: "Erdkugel mit Netzwerk",
      muteAudioTitle: "Stummschalten",
      unmuteAudioTitle: "Lautschalten",
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
    infoPages: {
      about: {
        title: "Über Palava",
      },
      contact: {
        title: "Kontakt & Impressum",
      },
      ev: {
        title: "Palava Verein",
      },
      hosting: {
        title: "Selbst Hosten",
      },
      network: {
        title: "Netzwerkinformationen",
      },
      'not-found': {
        title: "Nicht gefunden",
      },
      privacy: {
        title: "Datenschutzerklärung",
      },
      usage: {
        title: "Benutzungshinweise",
      },
      webrtc: {
        title: "WebRTC",
      },
    },
  },
}
