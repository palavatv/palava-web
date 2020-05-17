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
      noMedia: "No media streams",
      waiting: "Waiting",
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
            palava.tv is a cost-free, simple to use, secure, and open source platform for video calls. It is developed and operated by a charitable non-profit organization based in the EU. palava.tv runs directly in the web browser and its usage does not require a registration.
          </p>

          <h2>Directly connected meetings</h2>
          <p>
            The palava.tv platform establishes an encrypted direct connection between you and  all people in your meeting room,
            which means that no video or audio data gets sent to the palava.tv server.
          </p>

          <p>
            Because everyone in the meeting is connected to everyone else, palava.tv works best one-to-one conversations or small groups with no more 5 people.
            <!-- Although the platform allows you to connect to up to 10 people, the transmission quality decreases, so this is not recommended. -->
          <p>
            <strong>Important:</strong> In some cases, it is not possible to create a media connection to someone and, instead of the video, a connection error is shown.
          Unfortunately, palava.tv does not work in these cases. We are aware of the situation and are preparing relay servers to mitigate this problem.

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
            We tweet from: <a href="https://twitter.com/palavatv">@palavatv</a><br/>
            Our code is available on GitHub: <a href="https://github.com/palavatv">@palavatv</a>
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
          <h2>We are independent and are not subject to commercial interests</h2>
          <p>
            palava.tv is developed and run by <strong>palava e. V.</strong>, a German non-profit organization. We want to bring knowledge about decentralized video communication to the masses.
          </p>

          <h2>Donations</h2>
          <p>
            If you like our work, you can support us financially. The main use of the funds is to enable further development of the platform by paying people who work on palava.tv or teach the general audience how to use it. The second use is scaling up our server infrastructure. We are starting the the donation campaign in 2020 and will make transparent, how we use the funds.
          </p>

          <p>You can send us something via wire transfer to the following bank account:</p>
          <table class="bank-account">
            <tr>
              <th>Account</th>
              <td>palava e. V.</td>
            </tr>
            <tr>
               <th>IBAN</th>
               <td>DE33430609671157492300</td>
            </tr>
            <tr>
              <th>BIC</th>
              <td>GENODEM1GLS</td>
            </tr>
          </table>

          <p>We are charitable under German law. Please email us at contact@palava.tv if you would like to have a receipt for your donation.</p>
        `
      },
      hosting: {
        title: 'Host Yourself',
        content: `
          <h2>Run your own palava.tv instance</h2>
          <p>
            The job of the palava.tv server is to directly connect everyone who joins the same meeting room. If you have experience in server hosting, you can operate a custom palava.tv server. More info and detailed instructions will follow soon. Meanwhile, take a look at our <a href="https://github.com/palavatv/palava">GitHub page</a>.
          </p>
        `,
      },
      network: {
        title: 'Network Info',
        content: `
          <h2>Connection Type</h2>
          <p>
            There are two different ways in which you can connect to someone via palava.tv:
          </p>
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
          Please note that this is a best-effort translation of our privacy policy into English. Please switch the language to German to read the original document.<br/>

          <h2>Privacy Policy</h2>

          <p>
            The protection of your personal data is of particular concern to us. In this privacy
            policy we inform you about the data processing within the scope of our website. You
            are invited to contact our current board for data protection inquieries:
          </p>

          <p>
            Marius Melzer, Jan Lelis, and Alexandra Weiß<br />
            contact@palava.tv
          </p>

          <p>
            Additional contact data can be found in our imprint. The responsible authority is the
            Saxon data protection officer.
          </p>

          <h2>Collection and processing of data</h2>

          <p>
            On palava.tv it is possible to form a mutual group change by entering
            the same conference name on the start page, or accessing the group directly by URL.
            In order be able to provide the service, the following data of every participant is
            sent via our server to all other participants of the same group chat:
          </p>

          <ul>
            <li>all IP addresses of the user (including local and network-internal ones)</li>
            <li>user agent (browser, browser version, browser engine)</li>
            <li>information about supported audio- and video codecs of the browser</li>
          </ul>

          <p>
            There is no long-term (beyond time of usage) data retention.
            Furthermore, we do not use cookies and do not record personal data (e.g. ip addresses) in our server logs.
          </p>

          <h2>Data retention by our server provider</h2>

          <p>
             Our server is provided by <a href="https://www.simplyroot.de/">simplyroot. (LiWiNeA GmbH)</a>.
             Regarding to information, objection or complaint about data potentially collected by simplyroot. (LiWiNeA GmbH),
             please contact them directly (<a href="https://www.simplyroot.de/de/ansprechpartner/">contact page</a>).
          </p>

          <h2>Contact to us</h2>

          <p>
            If you contact us via e-mail, we will only use your email address to communicate with you.
            Other uses are precluded.
          </p>
        `,
      },
      usage: {
        title: 'Usage Tips',
        content: `
          <h2>How to start a video meeting</h2>
          <p>
            On the palava.tv homepage, enter the name of a meeting room which you want to join. If it does not yet
            exist, it will be created by the palava.tv server. Share the link with the people you want to connect with.
          </p>

          <h2>Recommended: Hidden meetings</h2>
          <p>
            It is possible to create a hidden room by clicking the &lt;hidden meeting&gt; link on the start page. This will create a long random name for the meeting room, which is impossible to guess. Share this link as usual to invite your friends. Only people who know this exact link can join. <strong>Do not post this link publicly</strong>, because anyone who knows the link can join, hence the meeting would not be hidden anymore.
          </p>
        `
      },
      webrtc: {
        title: 'WebRTC',
        content: `
          <h2>How does palava.tv work under the hood?</h2>
          <p>
            palava.tv is based on a technology called <a href="https://www.webrtc.org/">Web Real-Time Communication</a> (WebRTC) which enables peer-to-peer video chat in the web browser. It is built on top of many <a href="https://datatracker.ietf.org/wg/rtcweb/documents/">lower-level standards by the Internet Engineering Task Force</a>.
          </p>

          <h2>How can I find out, if my browser supports WebRTC?</h2>
          <p>
            Most up-to-date browsers (for example: Firefox, Safari or Google Chrome) support this technology. Google offers a <a href="https://test.webrtc.org/">test page</a>, which tells you if WebRTC is possible on your device. If you notice that palava.tv does not work for you, but you think it should, please <a href="https://github.com/palavatv/palava/issues/new/choose">let us know on GitHub</a>, so we can take a look at it and possibly improve palava.tv.
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
      waitingForUserMedia: "Warte auf Medienströme"
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
        content: `
          <h2>Was ist palava.tv?</h2>
          <p>
            palava.tv ist eine kostenlose, einfach benutzbare, sichere und quelloffene Plattform für Videogespräche. Sie wird von einer gemeinnützigen Organisation mit Sitz in der EU entwickelt und betrieben. palava.tv läuft direkt im Webbrowser und die Benutzung erfordert keine Registrierung.
          </p>

          <h2>Direktverbunde Treffen</h2>
          <p>
            Die palava.tv-Plattform baut zwischen dir und allen Leuten in deinem Meetingraum eine verschlüsselte Direktverbindung auf, was bedeutet, dass keine Video- oder Audiodaten an den palava.tv-Server gesendet werden.
          </p>

          <p>
            Weil im Treffen jede_r mit jeder_jedem verbunden ist, funktioniert palava.tv am besten für 1-zu-1 Gespräche oder kleine Gruppen mit maximal 5 Leuten.
            <!-- Die Plattform erlaubt es dir zwar, dich mit bis zu 10 anderen Leuten zu verbinden, allerdings sinkt dabei die Übetragungsqualität, sodass das nicht empfohlen ist.-->
          <p>
            <strong>Wichtig:</strong> In einigen Fällen gelingt es nicht, eine Medienverbindung zu jemandem aufzubauen und anstatt des Videos wird ein Verbindungsfehler angezeigt.
            Leider funktioniert palava.tv in diesen Fällen nicht. Wir kennen das Problem, und arbeiten an einer Lösung mit Zwischenübertragungsservern.
        `,
      },
      contact: {
        title: "Kontakt",
        content: `
          <h2>Kontaktmöglichkeiten</h2>
          <p>
            Die beste Art, mit uns in Kontakt zu treten, ist per Email: <a href="mailto:contact@palava.tv">contact@palava.tv</a><br/>
            Wir tweeten von: <a href="https://twitter.com/palavatv">@palavatv</a><br/>
            Our code is available on GitHub: <a href="https://github.com/palavatv">@palavatv</a>
          </p>

          <h2>Impressum</h2>
          <address>
            palava e. V.<br/>
            Thomas-Müntzer-Platz 5<br/>
            01307 Dresden<br/>
            Germany
          </address>

          <h2>Registrierung</h2>
          <p>VR 5967 (Amtsgericht Dresden)</p>

          <h2>Vorstand</h2>
          <p>Marius Melzer, Jan Lelis, Alexandra Weiss</p>
        `,
      },
      ev: {
        title: "Palava Verein",
        content: `
          <h2>Wir sind unabhängig und unterliegen keinen kommerziellen Interessen</h2>
          <p>
            palava.tv wird von <strong>palava e. V.</strong> entwickelt und betrieben, einem gemeinnützigen Verein in Deutschland. Wir wollen das Wissen über dezentrale Videokommunikation an die breite Masse tragen.
          </p>

          <h2>Spenden</h2>
          <p>
            Wenn du mit unserer Arbeit zufrieden bist, kannst du uns finanziell unterstützen. Der Hauptzweck der Einnahmen ist, die zukünftige Entwicklung der Plattform sicherzustellen, indem Leute bezahlt werden, welche an palava.tv arbeiten oder dessen Benutzung erklären. Der zweite Zweck ist, unsere Serverinfrastruktur zu skalieren. Wir starten die Spendenkampange im Jahr 2020 und werden transparent machen, wie wir die Mittel benutzen.
          </p>

          <p>
            Du kannst uns etwas auf folgendes Bankkonto überweisen:
          </p>

          <table class="bank-account">
            <tr>
              <th>Kontoinhaber</th>
              <td>palava e. V.</td>
            </tr>
            <tr>
               <th>IBAN</th>
               <td>DE33430609671157492300</td>
            </tr>
            <tr>
              <th>BIC</th>
              <td>GENODEM1GLS</td>
            </tr>
          </table>

          <p>Wir sind ein gemeinnütziger Verein. Bitte schreibe eine Email an contact@palava.tv, wenn du eine Spendenquittung haben möchtest.</p>
        `
      },
      hosting: {
        title: "Selber Hosten",
        content: `
          <h2>Betreibe deine eigene palava.tv-Instanz</h2>
          <p>
            Die Aufgabe des palava.tv-Serves ist es, jede_n, die_der den gleichen Meetingraum betritt, miteinander zu verbinden. Wenn du Erfahrung mit dem Hosten von Server hast, kannst du einen eigenen palava.tv-Server betreiben. Mehr Informationen und detailierte Anleitungen folgen demnächst. In der Zwischenzeit, schau dir mal unsere <a href="https://github.com/palavatv/palava">GitHub Seite</a> an.
          </p>
        `,
      },
      network: {
        title: "Netzwerkinformationen",
        content: `
          <h2>Verbindungstyp</h2>
          <p>
            Es gibt zwei verschiedene Arten, wie du dich mit jemandem auf palava.tv verbinden kannst:
          </p>
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
      'not-found': {
        title: "Nicht gefunden",
        content: `
          <p>
            Die Seite konnte nicht gefunden werden. Der Inhalt könnte verschwunden sein, oder vielleicht hast du die URL falsch eingegeben.
          </p>
        `,
      },
      privacy: {
        title: "Datenschutz­",
        content: `
          <h2>Datenschutzerklärung</h2>
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
        title: "Benutzungs­hinweise",
        content: `
          <h2>Wie man ein Videotreffen startet</h2>
          <p>
            Gib auf der palava.tv-Startseite den Namen eines Meetingraums ein, welchem du beitreten möchtest. Wenn der noch nicht existiert, wird er vom palava.tv-Server erstellt. Teile den Link mit den Leuten, mit denen du dich verbinden möchtest.
          </p>

          <h2>Empfohlen: Vesteckte Meetings</h2>
          <p>
            Es ist möglich, einen versteckten Raum zu erzeugen, indem du auf der Startseite auf &lt;verstecktes Meeting&gt; klickst. Dadurch wird ein langer, zufälliger Namen für den Meetingraum erzeugt, welchen man nicht vorraussagen kann. Teile diesen Link wie gewöhnlich mit deinen Freunden. Nur Leute, welchen den genauen Link kennen, können beitreten. <strong>Verschicke den Link nicht öffentlich</strong>, denn jede_r, die_der den Link kennt, könnte dazukommen, sodass das Treffen nicht mehr versteckt wäre.
          </p>
        `,
      },
      webrtc: {
        title: "WebRTC",
        content: `
          <h2>Wie funktioniert palava.tv unter der Oberfläche?</h2>
          <p>
            palava.tv basiert auf einer Technologie mit dem Namen <a href="https://www.webrtc.org/">Web-Echtzeitkommunikation</a> (engl. abgekürzt: WebRTC), welche direktverbundene Videochats im Browser ermöglicht. Sie ist auf der Basis vieler <a href="https://datatracker.ietf.org/wg/rtcweb/documents/">grundlegender Standards der Internet Engineering Task Force</a> gebaut.
          </p>

          <h2>Wie kann ich herausfinden, ob mein Browser WebRTC unterstützt?</h2>
          <p>
            Die meisten aktuellen Browser (wie z.B. Firefox, Safari, oder Google Chrome) unterstützen diese Technologie. Google bietet eine <a href="https://test.webrtc.org/">Testseite</a> an, welche dir anzeigt, ob WebRTC auf deinem Gerät möglich ist. Wenn du merkst, dass palava.tv bei dir nicht funktioniert, und du denkst, es sollte aber, <a href="https://github.com/palavatv/palava/issues/new/choose">dann lass uns dies bitte auf GitHub wissen</a>. Wir können dann einen Blick darauf werfen und gegebenfalls palava.tv verbessern.
          </p>
        `,
      },
    },
  },
}
