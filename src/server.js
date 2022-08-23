import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import itemRouter from './resources/item/item.router'
import userRouter from './resources/user/user.router'
import listRouter from './resources/list/list.router'
import { protect, signin, signup } from './utils/auth'

export const app = express()
app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use((req, res, next) => {
  console.log('logging')
  next()
})
app.post('/signup', signup)
app.post('/signin', signin)

app.use('/api', protect)
app.use('/api/item', itemRouter)
app.use('/api/user', userRouter)
app.use('/api/list', listRouter)

export const start = async () => {
  try {
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}
