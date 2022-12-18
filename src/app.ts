import express from 'express'
import 'express-async-errors';
import { handleErrorMiddleware } from './middlewares/handleError.middleware';
import announcementsRoutes from './routes/announcements.routes';
import usersRoutes from './routes/users.routes';

const app = express()
app.use(express.json())

app.use("/users", usersRoutes)
app.use("/announcements", announcementsRoutes)

app.use(handleErrorMiddleware)

export default app
