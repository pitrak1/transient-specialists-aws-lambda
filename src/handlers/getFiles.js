const utils = require('../utils')
const fileQueries = require('../queries/fileQueries')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const handler = async event => {
    try {
      const file = await client.query(fileQueries.get(event))
      return {
        statusCode: 200,
        body: { file: file.rows[0] },
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
