# palava | web

[palava](https://github.com/palavatv/palava) is a simplistic video chat website. It allows you to talk to your friends and colleagues from within your web browser. It is build on top of the [WebRTC](https://webrtc.org/) technology. No registration or browser plugin is required.

This repository contains the front-end web application of [palava.tv](https://palava.tv). It replaces the former [palava-portal](https://github.com/palavatv/palava-portal).

## Setup

Make sure you have NodeJS and the YARN package manager installed. Then run:

    $ yarn install

You can then start the application on localhost:8080 using this command:

    $ yarn serve

To build the static production version of the page, use:

    $ yarn build

## Configuration

The following ENV variables can be passed to the above commands, or configured via an `.env.local` file:

### `VUE_APP_RTC_URL`

Sets the location to the palava signaling server. To use a local [signaltower](https://github.com/farao/signaltower/) (or the [palava-machine](https://github.com/palavatv/palava-machine/)) on the default port 4233, use `ws://localhost:4233`

### `VUE_APP_STUN_URL`

The (required) [STUN server](https://en.wikipedia.org/wiki/STUN) to use, defaults to `stun: stun:stun.palava.tv`

## Credits

MIT License. Part of the [palava project](https://palava.tv).

    Copyright (C) 2020 palava e. V.  contact@palava.tv

