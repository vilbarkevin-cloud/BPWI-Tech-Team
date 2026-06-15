import { betterAuth } from 'better-auth'
import { Pool } from 'pg'

let authInstance: any = null

function initializeAuth() {
  if (!authInstance && process.env.DATABASE_URL) {
    try {
      const pool = new Pool({ connectionString: process.env.DATABASE_URL })
      
      authInstance = betterAuth({
        database: pool,
        baseURL:
          process.env.BETTER_AUTH_URL ??
          (process.env.VERCEL_PROJECT_PRODUCTION_URL
            ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
            : process.env.VERCEL_URL
              ? `https://${process.env.VERCEL_URL}`
              : process.env.V0_RUNTIME_URL),
        emailAndPassword: {
          enabled: true,
          autoSignIn: true,
        },
        trustedOrigins: [
          ...(process.env.V0_RUNTIME_URL ? [process.env.V0_RUNTIME_URL] : []),
          ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
          ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
            ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]
            : []),
        ],
        session: {
          expiresIn: 60 * 60 * 24 * 7, // 7 days
          updateAge: 60 * 60 * 24, // 1 day
        },
        ...(process.env.NODE_ENV === 'development'
          ? {
              advanced: {
                defaultCookieAttributes: {
                  sameSite: 'none' as const,
                  secure: true,
                },
              },
            }
          : {}),
      })
    } catch (error) {
      console.error('[v0] Auth initialization error:', error)
      throw error
    }
  }
  
  if (!authInstance) {
    throw new Error('Auth not initialized - DATABASE_URL not set')
  }
  
  return authInstance
}

export const auth = new Proxy({} as any, {
  get(target, prop) {
    return Reflect.get(initializeAuth(), prop)
  },
})

