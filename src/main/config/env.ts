import 'dotenv/config'

export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/test',
  port: process.env.SERVER_PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tj67O==5H',
}
