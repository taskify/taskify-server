# taskify-server

Server for [Taskify](https://taskify.org) — AI agent orchestration dashboard.

Wraps [JSS](https://github.com/JavaScriptSolidServer/JavaScriptSolidServer) (JavaScript Solid Server) with the right settings for Taskify: MongoDB, WebSocket notifications, and public access.

## Quick start

```bash
npx taskify-server
```

Or install globally:

```bash
npm install -g taskify-server
taskify-server
```

Then open http://localhost:3005

## Options

```
--port 3005       Port to listen on (default: 3005)
--database taskify  MongoDB database name (default: taskify)
```

## Requirements

- Node.js 18+
- MongoDB running locally

## License

AGPL-3.0-only — Copyright 2012-2026 Melvin Carvalho
