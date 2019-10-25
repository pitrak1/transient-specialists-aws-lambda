const utils = require('../utils')
const equipmentQueries = require('../queries/equipmentQueries')
const eventQueries = require('../queries/eventQueries')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const handler = async event => {
    try {
      await client.query(equipmentQueries.create(event))

      return {
        statusCode: 200,
        body: {},
      }
    } catch (e) {
      return {
        statusCode: 500,
        body: e.message,
      }
    }
  }
  return await utils.genericHandler(event, handler)
}
