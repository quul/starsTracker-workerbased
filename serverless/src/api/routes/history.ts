const HistoryAction = async (req: Request, username: string, KV: KVNamespace): Promise<Response> => {
  if (!(await KV.get(`cacheStatus:${username}`, json)).cacheStatus) {
    const cache = await KV.get(`cache:${username}`,'json')
    if (cache) return new Response(JSON.stringify(cache))
  }
  const lists = await KV.list({prefix: `diff:${username}`})
  // TODO: As limitation is 1000, maybe it's better to change this by year
  let diffList = await Promise.all(lists?.keys.map(key => KV.get(key.name, 'json')))
  let resultMap = [lists?.keys.map(key => key.name), diffList]
  await KV.put(`cache:${username}`, JSON.stringify(resultMap))
  return new Response(JSON.stringify(resultMap))
}

export {HistoryAction}