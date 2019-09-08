const utils = require('./utils')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const handler = async event => {
    if (event.id) {
      return await utils.getTypesShow(client, event.id)
    }
    return await utils.getTypesIndex(client)
  }
  return await utils.genericHandler(event, handler)
}
