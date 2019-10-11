const utils = require('./utils')
const queries = require('./queries')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const handler = async event => {
    const showHandler = async event => {
      const type = await client.query(queries.getTypesShow(event))
      return {
        statusCode: 200,
        body: { type: type.rows[0] },
      }
    }

    const indexHandler = async () => {
      const result = await client.query(queries.getTypesIndex(event))
      const count = await client.query(queries.getTypesIndexCount(event))
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
