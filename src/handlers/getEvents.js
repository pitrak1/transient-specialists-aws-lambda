const utils = require('../utils')
const eventQueries = require('../queries/eventQueries')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const handler = async event => {
    try {
      const result = await client.query(eventQueries.getShow(event))
      return {
        statusCode: 200,
        body: { event: result.rows[0] },
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
