import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function passcodeDevServerPlugin(): Plugin {
  return {
    name: 'passcode-dev-server',
    configureServer(server) {
      server.middlewares.use('/api/verify', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })

        req.on('end', () => {
          try {
            const data = JSON.parse(body || '{}')
            const incomingPasscode = String(data.passcode || '').trim()
            const expectedPasscode = String(process.env.BIRTHDAY_PASSCODE || '0102200529102007').trim()

            // Artificial subtle delay to feel authentic and prevent brute forcing
            setTimeout(() => {
              if (incomingPasscode === expectedPasscode) {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(
                  JSON.stringify({
                    success: true,
                    sessionToken: 'auth_romantic_' + Date.now().toString(36),
                  })
                )
              } else {
                res.statusCode = 401
                res.setHeader('Content-Type', 'application/json')
                res.end(
                  JSON.stringify({
                    success: false,
                    error: 'Incorrect passcode',
                  })
                )
              }
            }, 300)
          } catch {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Malformed request' }))
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), passcodeDevServerPlugin()],
})
