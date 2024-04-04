import 'dotenv/config'

const isTrue = (value: any) => {
  if (!value) return false
  if (value === 1 || value === '1' || String(value).toUpperCase() === 'TRUE')
    return true
  else return false
}

export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/test',

  port: process.env.SERVER_PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tj67O==5H',

  databaseType: process.env.DATABASE_TYPE || 'MONGODB',

  prismaType: process.env.PRISMA_TYPE || 'sqlite',
  sqliteFile: process.env.SQLITE_FILE || 'file:./dev.d',

  metricsServerPort: process.env.METRICS_SERVER_PORT || '5051',
  metricsType: process.env.METRICS_TYPE || 'PROMETHEUS',
  validatorType: process.env.VALIDATOR_TYPE || 'ZOD',
  addLogDecorator: (function () {
    const result = isTrue(process.env.ADD_LOG_DECORATOR)
    if (!result) return false
    return true
  })(),
}
