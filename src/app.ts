import express, {Response, Request} from 'express'
import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'
import planRouter from './routes/plan.routes'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'

const app = express()

app.use(helmet())
app.use(compression())
app.use(cookieParser())
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

const limiter = rateLimit({
    max: 3,
    windowMs: 1000*15*60 //15 minutos
})
app.use(limiter)

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/plan',planRouter)

app.get('/', (req:Request, res:Response)=>{
    res.send('Bienvenido al backend (PLAN IT)')
})

export default app