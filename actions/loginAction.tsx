"use server"

interface Payload {
  username: string
  password: string
}

// eslint-disable-next-line no-unused-vars
export async function login(payload: Payload,) {

  let err, data

  const response = await fetch(`https://de509f1.retas.dev/api/auth`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {'Content-Type': 'application/json'} 
  })

  if(!response.ok) err = response.status === 400 ? 'Invalid Username / Password' : response.status === 404 ? 'Endpoint Not Found' : response.status
  if(response.ok) data = await response.json()

  return { err, data }

}