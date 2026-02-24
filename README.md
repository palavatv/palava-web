# palava

[palava.tv](https://palava.tv) is a cost-free, simple to use, secure, and open source platform for video calls, built on top of [WebRTC](https://webrtc.org/).

This is a pnpm workspaces monorepo containing:

- **[@palava/client](packages/client/)** — TypeScript WebRTC signaling library implementing the [palava protocol](https://github.com/nicwallace/palava-client/wiki/Protocol)
- **[@palava/web](packages/web/)** — Vue 3 + TypeScript single-page app

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- [pnpm](https://pnpm.io/) (`corepack enable` or `npm i -g pnpm`)

## Getting Started

```sh
pnpm install
pnpm dev
```

This starts the Vite dev server at `http://localhost:5173`. By default it connects to a local [signaltower](https://github.com/nicwallace/signaltower) instance at `ws://localhost:4233`.

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start Vite dev server |
| `pnpm build` | Production build (both packages) |
| `pnpm typecheck` | Type-check both packages |

## License

- `packages/client` — [LGPL-3.0](packages/client/COPYING.LESSER)
- `packages/web` — [MIT](packages/web/LICENSE)
