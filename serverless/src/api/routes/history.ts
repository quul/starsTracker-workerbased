const HistoryAction = async (req: Request, username: string, KV: KVNamespace): Promise<Response> => {
  const lists = await KV.list({prefix: `diff:${username}`})
  // TODO: As limitation is 1000, maybe it's better to change this by year
  let diffList = await Promise.all(lists?.keys.map(key => KV.get(key.name, 'json')))
  let resultMap = [lists?.keys.map(key=>key.name), diffList]
  return new Response(JSON.stringify(resultMap))
}

export {HistoryAction}