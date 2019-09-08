const utils = require('./utils')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const handler = async event => {
    if (event.new) {
      return await utils.getEquipmentNew(client)
    } else if (event.id) {
      return await utils.getEquipmentShow(client, event.id)
    }
    return await utils.getEquipmentIndex(client)
  }
  return await utils.genericHandler(event, handler)
}
