export default {
  closeAlt: 'cross symbol',
  moreInfoTitle: 'More info',
  moreInfoAlt: 'info sign',
  palavaLogoAlt: 'palava parrot',
  switchLanguageTitle: 'Switch language',
  switchLanguageAlt: 'language code',
  home: {
    blog: 'Blog',
    github: 'GitHub',
    goTitle: 'Create or join this meeting room',
    goAlt: 'two people',
    hiddenRoomIntro: 'Or start a',
    hiddenRoom: 'hidden meeting',
    hiddenRoomTitle: 'Create meeting room with random name',
    noSupportMessage: `
      Sorry, but we could not detect the required WebRTC technology in your web browser.<br/>
      <br/>
      In order to be able to use palava.tv,
      you will need install a web browser which supports WebRTC, such as Firefox.
      If you are in luck, you just need to update your current browser to the latest version.
    `,
    palavaLogoTitle: 'What is palava.tv?',
    roomIdPlaceholder: 'Enter name of a meeting room',
    mastodon: 'Mastodon',
  },
  info: {
    palavaLogoTitle: 'Go to palava.tv home page',
    confirmLeave: 'This will exit the current palava.tv session. Continue?',
  },
  room: {
    aboutPalava: 'Learn more about palava.tv',
    emptyTitle: 'Meeting Room',
    errorFullHeading: 'This palava.tv meeting room is full',
    errorFullDescription: 'You cannot enter this room, because the maximum number of participants is reached.',
    errorFullTryAgain: 'Try again!',
    errorMaintenanceHeading: 'Sorry, your connection will be reset',
    errorMaintenanceDescription: 'Because of a palava.tv server maintenance, your connection is being lost. We apologize for any inconvenience this may cause.',
    errorMaintenanceTryAgain: 'Please reload in a few moments!',
    errorConnectionHeading: 'Unable to join this palava.tv meeting room',
    errorConnectionDescription: 'The connection to palava.tv could not be established. This might be caused by an error with your Internet connection.',
    errorConnectionTryAgain: 'Try again!',
    gumChooseMedia: 'Please choose if you want to send your video and audio to others in the room, or only one of both:',
    gumChoiceVideoAndAudio: 'Video and audio',
    gumChoiceVideo: 'Only video',
    gumChoiceAudio: 'Only audio',
    gumChoiceNoMedia: 'Only text',
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
    gumErrorHeading: 'palava.tv was unable to access the requested media stream',
    gumHeading: 'You are about to join a palava.tv meeting room',
    gumIntro: `
      This will join or create a video chat meeting with anyone also connected to this page.
      For technical reasons, your IP address and other personal data is sent to all other
      participants via the palava.tv server. By continuing, you consent to our privacy policy,
      <a href="/info/privacy">you can read it here</a>.
    `,
    gumNamePlaceholder: 'Your Name (optional)',
    gumSoundsEnabled: 'Sound effects when people join/leave',
    waitingForUserMedia: 'waiting for media streams',
    waitingForRoomServer: 'internet connection unstable,<br/>trying to reach server',
  },
  party: {
    toggleControls: 'Toggle controls',
    infoTitle: 'Info',
    infoAlt: 'Info sign',
    copyLinkTitle: 'Share/copy link',
    copyLinkAlt: 'chain links',
    turnOffCameraTitle: 'Turn off camera',
    turnOnCameraTitle: 'Turn on camera',
    cameraAlt: 'camera',
    muteMicrophoneTitle: 'Mute microphone',
    unmuteMicrophoneTitle: 'Turn on microphone',
    microphoneAlt: 'microphone',
    screenShareTitle: 'Share screen',
    screenShareAlt: 'computer display',
    hangUpTitle: 'Hang up',
    hangUpAlt: 'telephone handset facing downward',
  },
  peer: {
    toggleEnlargeTitle: 'Enlarge',
    toggleEnlargeAlt: 'arrow pointing upwards left',
    toggleMinimizeTitle: 'Minimize',
    toggleMinimizeAlt: 'arrow pointing downwards right',
    fullScreenTitle: 'View on full screen',
    fullScreenAlt: 'square of four corners',
    networkInfoTitle: 'Show network info',
    networkInfoAlt: 'globe with network',
    muteAudioTitle: 'Mute',
    unmuteAudioTitle: 'Unmute',
    mutedAudioAlt: 'speaker without noise',
    withAudioAlt: 'speaker with noise',
    placeholderAlt: 'area colored with {color}',
    statusAudioAlt: 'telephone handset',
    statusNotReadyAlt: 'pulsating dots',
    statusNoMediaAlt: 'circle with diagonal line',
    statusErrorAlt: 'circle with cross',
    errorConnectionClosed: 'Connection closed',
    errorConnectionFailed: 'No connection',
    errorConnectionDisconnected: 'Disconnected',
    noMedia: 'No media streams',
    waiting: 'Waiting',
  },
  networkInfo: {
    directConnection: 'Direct connection',
    relayedConnection: 'Connection via relay',
    remoteIps: 'Remote IP addresses',
    localIps: 'Your IP addresses',
    ipTitle: '',
    ipAlt: '',
    ipIsRelay: 'relay',
    unknownConnection: 'Unknown connection status',
  },
  infoPages: [
    {
      id: 'about',
      title: 'Info',
      content: `Insert information about this palava.tv installation here`
    },
    {
      id: 'contact',
      title: 'Contact',
      content: `Insert contact details here`
    },
    {
      id: 'network',
      linked: false,
      title: 'Network Info',
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
      id: 'not-found',
      linked: false,
      title: 'Not Found',
      content: `
        <h2>Not Found</h2>
        <p>
          The page could not be found. The content might be gone, or maybe you have mistyped the URL.
        </p>
      `
    }
  ]
}
