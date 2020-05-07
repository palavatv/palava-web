export default {
  en: {
    home: {
      go: "go",
      hiddenRoom: "hidden conversation",
    },
    room: {
      emptyTitle: 'room',
    },
    infoPages: {
      contact: {
        title: 'contact info',
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
        title: 'palava association',
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
        title: 'how to use',
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
        title: 'privacy policy',
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
    home: {
      go: "los",
      hiddenRoom: "versteckte Unterhaltung",
    },
    titles: {
      contact: "kontakt",
      palavaEv: "ev",
      info: "info",
      privacyPolicy: "datenschutz",
      room: "raum",
    },
    imprint: "Impressum",
    info: "Info",
    palavaEv: "palava e. V.",
    privacyPolicy: "Datenschutz",
    infoPages: {
      test: {
        title: "Info about something",
        content: "content content content"
      }
    }
  },
}
