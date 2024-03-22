export const throwError = (error?: Error): never => {
  if (error) throw error
  else throw new Error()
}
