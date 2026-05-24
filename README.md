# TaskFlow

TaskFlow is a premium monochrome MERN project and task management dashboard inspired by Jira, GoodDay, and modern SaaS workspaces. It includes JWT authentication, project CRUD, task CRUD, Kanban status management, dashboard analytics, responsive layouts, toast feedback, skeleton loading states, and confirmation dialogs.

## Features

- Register and login with JWT authentication
- Protected dashboard routes
- Create, edit, and delete projects
- Create, edit, delete, and update task status
- Native drag-and-drop Kanban columns for Todo, In Progress, and Done
- Dashboard analytics for projects, total tasks, completed tasks, and pending tasks
- Monochrome Tailwind design system using black, white, and neutral gray only
- Responsive fixed-sidebar dashboard with mobile drawer navigation
- Reusable UI components for buttons, inputs, cards, modals, loaders, task cards, and project cards
- Toast notifications, empty states, and skeleton loaders

## Tech Stack

**Frontend**

- React.js with Vite
- Tailwind CSS
- React Router DOM
- Axios
- Context API
- React Hot Toast
- Lucide React icons

**Backend**

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcryptjs password hashing

## Project Structure

```text
client/
  src/
    components/
    context/
    hooks/
    layouts/
    pages/
    services/
    utils/

server/
  config/
  controllers/
  middleware/
  models/
  routes/
```

## Environment Setup

Create `server/.env` from `server/.env.example`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskflow
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Create `client/.env` from `client/.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Installation

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd client
npm install
```

## Run Locally

Start the backend API:

```bash
cd server
npm run dev
```

Start the frontend:

```bash
cd client
npm run dev
```

Open the Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

## API Routes

Auth:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

Projects:

- `GET /api/projects`
- `POST /api/projects`
- `GET /api/projects/:id`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

Tasks:

- `GET /api/tasks`
- `GET /api/tasks?projectId=<projectId>`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `PATCH /api/tasks/:id/status`
- `DELETE /api/tasks/:id`

## Deployment

### MongoDB Atlas

1. Create a MongoDB Atlas cluster.
2. Create a database user and password.
3. Add your deployment IPs to Network Access, or use `0.0.0.0/0` for managed platform deployments.
4. Copy the connection string and set it as `MONGO_URI` in Render.

### Render Backend

1. Create a new Render Web Service from this repository.
2. Set the root directory to `server`.
3. Build command:

```bash
npm install
```

4. Start command:

```bash
npm start
```

5. Add environment variables:

```env
PORT=5000
MONGO_URI=<your MongoDB Atlas URI>
JWT_SECRET=<long random secret>
JWT_EXPIRES_IN=7d
CLIENT_URL=https://<your-vercel-domain>.vercel.app
```

6. Copy the deployed Render URL.

### Vercel Frontend

1. Create a new Vercel project from this repository.
2. Set the root directory to `client`.
3. Build command:

```bash
npm run build
```

4. Output directory:

```text
dist
```

5. Add environment variable:

```env
VITE_API_URL=https://<your-render-service>.onrender.com/api
```

6. Redeploy after updating the environment variable.

## Production Notes

- Use HTTPS in production so bearer tokens are transmitted securely.
- Keep `JWT_SECRET` private and rotate it if it is exposed.
- Restrict MongoDB Atlas network access as tightly as your deployment platform allows.
- Set `CLIENT_URL` on the backend to your production frontend domain to keep CORS scoped.
