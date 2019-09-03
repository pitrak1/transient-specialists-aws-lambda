const utils = require('./utils')

const client = utils.createDbConnection()

exports.handler = async (_event, _context, _callback) => {
  let statusCode, body
  if (event.id) {
    ;({ statusCode, body } = await utils.getModelsShow(client, event.id))
  } else {
    ;({ statusCode, body } = await utils.getModelsIndex(client))
  }
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body,
  }
}
