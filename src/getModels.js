const utils = require('./utils')
const queries = require('./queries')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const newHandler = async () => {
    const oems = await client.query(queries.getModelsNew())
    return {
      statusCode: 200,
      body: { oems: oems.rows },
    }
  }

  const indexHandler = async () => {
    const result = await client.query(queries.getModelsIndex(event))
    const count = await client.query(queries.getModelsIndexCount(event))
    return {
      statusCode: 200,
      body: { models: result.rows, count: count.rows[0].count },
    }
  }

  const handler = async event => {
    try {
      if (event.new) {
        return await newHandler()
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
