# Deployement

# DB

create postgres instance

```
docker run --name chess-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgrespw \
  -e POSTGRES_DB=chess \
  -p 5432:5432 \
  -d postgres
```

db url

```
DATABASE_URL=postgresql://postgres:postgrespw@localhost:5432/chess
```

# BACKEND

```
export DATABASE_URL="postgresql://postgres:postgrespw@localhost:5432/chess" JWT_SECRET="your_super_secret_key_here" FRONTEND_URL="http://localhost:4173"

npm install

npm run build

npm run db:migrate

npm run build

npm run start

```

# BACKEND

```
export DATABASE_URL="postgresql://postgres:postgrespw@localhost:5432/chess" JWT_SECRET="your_super_secret_key_here"

npm install

npm run build

npm run db:generate

npm run build

npm run start

```

# FRONTEND

```
export VITE_BACKEND_URL="http://localhost:3000" VITE_WEBSOCKET_URL="ws://localhost:8080"

npm install

npm run build

npm run preview
```

```
or

npm run dev
```
