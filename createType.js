const utils = require('./utils')

const client = utils.createDbConnection()

exports.handler = async event => {
  return utils.createType(client, event)
}
