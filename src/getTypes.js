const utils = require('./utils')
const queries = require('./queries')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const handler = async event => {
    try {
      const result = await client.query(queries.getTypesIndex(event))
      const count = await client.query(queries.getTypesIndexCount(event))
      return {
        statusCode: 200,
        body: { types: result.rows, count: count.rows[0].count },
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
