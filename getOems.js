const utils = require('./utils')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const handler = async event => {
    if (event.id) {
      return await utils.getOemsShow(client, event.id)
    }
    return await utils.getOemsIndex(client)
  }
  return await utils.genericHandler(event, handler)
}
