const utils = require('./utils')
const queries = require('./queries')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const showHandler = async () => {
    const oem = await client.query(queries.getOemsShow(event))
    return {
      statusCode: 200,
      body: { oem: oem.rows[0] },
    }
  }

  const indexHandler = async () => {
    const result = await client.query(queries.getOemsIndex(event))
    const count = await client.query(queries.getOemsIndexCount(event))
    return {
      statusCode: 200,
      body: { oems: result.rows, count: count.rows[0].count },
    }
  }

  const handler = async event => {
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
