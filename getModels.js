const utils = require('./utils')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const handler = async event => {
    if (event.new) {
      return await utils.getModelsNew(client)
    } else if (event.id) {
      return await utils.getModelsShow(client, event.id)
    }
    return await utils.getModelsIndex(client)
  }
  return await utils.genericHandler(event, handler)
}
