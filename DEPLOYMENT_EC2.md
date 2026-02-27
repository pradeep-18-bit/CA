# EC2 Deployment Guide (IP: 13.201.54.103)

This repo is configured to run with Docker Compose:
- Frontend: `http://13.201.54.103`
- Backend API: `http://13.201.54.103:5000` (direct) and `http://13.201.54.103/api` (via frontend nginx proxy)
- Postgres: `13.201.54.103:5432`

## 1) EC2 Security Group
Open inbound ports:
- `80` (HTTP)
- `5000` (backend API, optional but currently exposed)
- `5432` (Postgres, only if you need external DB access)
- `22` (SSH)

## 2) Start services
```bash
cd /path/to/CA
cp .env.example .env
# edit .env and set strong JWT_KEY / DB password
docker compose up -d --build
```

## 3) Verify
```bash
curl http://13.201.54.103/api/System/ping
curl http://13.201.54.103:5000/api/System/ping
```

## 4) Notes
- Frontend uses relative `/api` paths; nginx forwards `/api/*` to backend container.
- Uploaded files are served by backend `UseStaticFiles()` from `wwwroot`.
