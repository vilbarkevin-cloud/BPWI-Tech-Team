import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

let poolInstance: Pool | null = null

function getPoolInstance(): Pool {
  if (!poolInstance) {
    poolInstance = new Pool({
      connectionString: process.env.DATABASE_URL,
    })
  }
  return poolInstance
}

export const pool = new Proxy({} as Pool, {
  get(target, prop) {
    return Reflect.get(getPoolInstance(), prop)
  },
})

export const db = drizzle(getPoolInstance(), { schema })

