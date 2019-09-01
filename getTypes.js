const utils = require('./utils')

const client = utils.createDbConnection()

exports.handler = async (_event, context, _callback) => {
  const { statusCode, body } = await utils.getTypes(client)
  context.succeed({
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body,
  })
}