const listAction = async (req: Request, username: string, KV: KVNamespace): Promise<Response> => {
  const latestStars = await KV.get(`latestStars:${username}`)
  return new Response(JSON.stringify(latestStars))
}

export {listAction}