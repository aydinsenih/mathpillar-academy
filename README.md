This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install dependencies and run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser. The admin panel is available at [http://localhost:3000/admin](http://localhost:3000/admin) (default: `admin@mathpillar.com` / `admin123`).

---

## SQLite Database Configuration

All course offerings, term schedules, countdown settings, registrations, and instructor profiles are stored locally in a SQLite database (powered by `better-sqlite3` with WAL mode enabled).

### Database Path Hierarchy

The application resolves the database location in the following priority:

1. **`DATABASE_PATH`** (Highest priority): Explicit file path (e.g. `/app/data/mathpillar.sqlite` or `./data/mathpillar.sqlite`).
2. **`DATA_DIR`** or **`DATABASE_DIR`**: Directory path; the database file will be named `mathpillar.sqlite` inside this directory.
3. **Default**:
   - **Docker / Production Container**: `/app/data/mathpillar.sqlite` (declared as a persistent volume).
   - **Local Development**: `./src/data/mathpillar.sqlite`.

---

## Docker & Production Deployment

### 1. Using Docker Compose (Recommended)

To build and run the production container with persistent SQLite storage:

```bash
docker compose up -d
```

The database is stored in the `mathpillar_data` Docker volume, mounted to `/app/data`. Your data remains intact across container updates, rebuilds, and restarts.

### 2. Manual Docker Build & Run

```bash
# Build the production image
docker build -t mathpillar-app .

# Run with a persistent volume mounted to /app/data
docker run -d \
  --name mathpillar \
  -p 3000:3000 \
  -v mathpillar_data:/app/data \
  -e ADMIN_EMAIL="admin@mathpillar.com" \
  -e ADMIN_PASSWORD="your-strong-password" \
  -e ADMIN_SESSION_TOKEN="your-secure-session-secret" \
  mathpillar-app
```

### 3. Deploying with Coolify

1. **Create Service / Application**: Select **Dockerfile** as the build pack.
2. **Configure Persistent Storage**:
   - Navigate to **Storages / Persistent Storage**.
   - Add a volume mount with:
     - **Destination Path**: `/app/data`
     - **Volume Name**: `mathpillar-data`
3. **Environment Variables** (Optional):
   - `DATABASE_PATH`: `/app/data/mathpillar.sqlite` (already default in container).
   - `ADMIN_EMAIL`: Your production admin email.
   - `ADMIN_PASSWORD`: Your secure admin password.
   - `ADMIN_SESSION_TOKEN`: Random secret string for session cookies.
4. **Deploy**: Coolify builds the multi-stage Docker image and automatically attaches the persistent volume.

---

## Environment Variables Reference

See [.env.example](.env.example) for a complete template:

| Variable              | Default (Local)                | Default (Docker)              | Description                           |
| :-------------------- | :----------------------------- | :---------------------------- | :------------------------------------ |
| `DATABASE_PATH`       | `./src/data/mathpillar.sqlite` | `/app/data/mathpillar.sqlite` | SQLite database file location         |
| `DATA_DIR`            | _(unset)_                      | _(unset)_                     | Directory for `mathpillar.sqlite`     |
| `ADMIN_EMAIL`         | `admin@mathpillar.com`         | `admin@mathpillar.com`        | Email for `/admin` login              |
| `ADMIN_PASSWORD`      | `admin123`                     | `admin123`                    | Password for `/admin` login           |
| `ADMIN_SESSION_TOKEN` | `mp_auth_secret_token_2026`    | `mp_auth_secret_token_2026`   | Cookie token for admin authentication |
| `PORT`                | `3000`                         | `3000`                        | HTTP listening port                   |
| `HOSTNAME`            | `0.0.0.0`                      | `0.0.0.0`                     | Binding host address                  |
