import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

// Create a single pool instance for use across the app
let poolInstance: Pool | null = null

export function getPoolInstance(): Pool {
  if (!poolInstance && process.env.DATABASE_URL) {
    poolInstance = new Pool({
      connectionString: process.env.DATABASE_URL,
    })
  }
  return poolInstance!
}

export const pool = getPoolInstance()

// Drizzle client configured to query the neon_auth schema
export const db = drizzle(pool, { schema })
