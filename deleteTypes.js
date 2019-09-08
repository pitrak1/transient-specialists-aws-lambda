const utils = require('./utils')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const handler = async event =>
    await utils.deleteTypesDestroy(client, event.id)
  return await utils.genericHandler(event, handler)
}
