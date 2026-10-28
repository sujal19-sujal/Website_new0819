export const config = {
  runtime: 'edge',
}

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await request.json()
    const incomingPasscode = String(body.passcode || '').trim()
    const expectedPasscode = String(process.env.BIRTHDAY_PASSCODE || '0102200529102007').trim()

    if (incomingPasscode === expectedPasscode) {
      return new Response(
        JSON.stringify({
          success: true,
          sessionToken: 'auth_romantic_' + Date.now().toString(36),
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Incorrect passcode',
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch {
    return new Response(JSON.stringify({ error: 'Malformed request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
