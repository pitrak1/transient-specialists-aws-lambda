const utils = require('../utils')
const typeQueries = require('../queries/typeQueries')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const handler = async event => {
    const showHandler = async event => {
      const type = await client.query(typeQueries.getShow(event))
      return {
        statusCode: 200,
        body: { type: type.rows[0] },
      }
    }

    const indexHandler = async () => {
      const result = await client.query(typeQueries.getIndex(event))
      const count = await client.query(typeQueries.getIndexCount(event))
      return {
        statusCode: 200,
        body: { types: result.rows, count: count.rows[0].count },
      }
    }

    try {
      if (event.id) {
        return await showHandler(event)
      }
      return await indexHandler()
    } catch (e) {
      return {
        statusCode: 500,
        body: e.message,
      }
    }
  }
  return await utils.genericHandler(event, handler)
}
