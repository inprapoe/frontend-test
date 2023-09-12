"use server"

// eslint-disable-next-line no-unused-vars
export async function getGraph(token: string | null | undefined) {

  let err, data

  if(token) {
    const response = await fetch(`https://de509f1.retas.dev/api/dashboard/graph`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `${token}`
      }
    })

    if(!response.ok) err = response.status === 401 ? 'Unauthorized' : response.status === 400 ? 'Invalid Token' : response.status === 404 ? 'Endpoint Not Found' : response.status
    if(response.ok) data = await response.json()
  } else {
    err = 'No Token'
  }

  return { err, data }

}