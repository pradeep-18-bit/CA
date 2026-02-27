# Frontend

This frontend is deployed via Docker + Nginx and calls backend APIs through a relative `/api` prefix.

## Runtime URLs (EC2)
- App: `http://13.201.54.103`
- API through proxy: `http://13.201.54.103/api/*`

Nginx forwards `/api/*` to the backend container (`http://backend:5000/api/*`) on the Docker network.
