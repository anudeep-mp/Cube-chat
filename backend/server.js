import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import path from 'path'
import cors from "cors"
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import conversationRoutes from './routes/conversationRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import friendRoutes from './routes/friendRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use(
  cors({
    origin: ["http://localhost:3000", "https://cube-chat.onrender.com", "https://cube-chat.anudeep.info"],
    credentials: true,
  })
);


app.use('/api/users', userRoutes)
app.use('/api/conversations', conversationRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/friends', friendRoutes)

const __dirname = path.resolve()

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

//Middlewares****
app.use(notFound)
app.use(errorHandler)
//******* */

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
  )
)
