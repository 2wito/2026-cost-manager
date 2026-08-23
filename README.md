# Cost Manager — RESTful Web Services

Final project for the **Asynchronous Server-Side Development** course.

A cost-tracking REST API split into **four independent Node.js processes**
(microservices) backed by a single MongoDB Atlas database. Built with
Express.js, Mongoose, and Pino.

## Services

| Process | Port (default) | Responsibility | Endpoints |
| --- | --- | --- | --- |
| `users`  | 3001 | User accounts            | `POST /api/add`, `GET /api/users`, `GET /api/users/:id` |
| `costs`  | 3002 | Cost items & reports     | `POST /api/add`, `GET /api/report` |
| `logs`   | 3003 | Admin: read request logs | `GET /api/logs` |
| `about`  | 3004 | Team / developer info    | `GET /api/about` |

> The `about` service does **not** touch the database — team members are read
> from `.env` (or hardcoded) per the spec.

## Repository layout

Each of the 4 microservices is fully self-contained — its own `models/`
folder, its own Mongoose connection, logger, env loading and validation, and
its own `package.json` listing its real dependencies directly. Nothing is
shared between them at the code level; they only meet at the database.

```
cost-manager/
├── services/
│   ├── users/              # Process 1 — user-related endpoints
│   │   ├── models/         # user.js, cost.js (read-only, for totals), log.js
│   │   ├── db.js / logger.js / env.js / validation.js
│   │   └── index.js
│   ├── costs/               # Process 2 — cost-related endpoints + report
│   │   ├── models/         # cost.js, user.js (read-only, for userid checks), report.js, log.js
│   │   ├── db.js / logger.js / env.js / validation.js
│   │   └── index.js
│   ├── logs/                # Process 3 — log reader (admin)
│   │   ├── models/log.js
│   │   ├── db.js / logger.js / env.js
│   │   └── index.js
│   └── about/                # Process 4 — developers info
│       ├── models/log.js   # about has no domain data, but still logs its own requests
│       ├── db.js / logger.js / env.js
│       └── index.js
├── tests/                 # Unit / integration tests for every endpoint
├── scripts/seed.js        # inserts the single demo user
├── .env.example
├── package.json           # Workspaces root: scripts to run each service
└── README.md
```

## Quick start

```bash
cp .env.example .env       # fill MONGO_URI etc.
npm install                # installs deps for all workspaces
npm run dev:users          # or dev:costs / dev:logs / dev:about
npm test                   # run unit tests
```
