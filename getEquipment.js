const utils = require('./utils')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  let statusCode, body
  if (event.id) {
    ;({ statusCode, body } = await utils.getEquipmentShow(client, event.id))
  } else {
    ;({ statusCode, body } = await utils.getEquipmentIndex(client))
  }
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body,
  }
}
