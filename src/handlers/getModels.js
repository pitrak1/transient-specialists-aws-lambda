const utils = require('../utils')
const oemQueries = require('../queries/oemQueries')
const modelQueries = require('../queries/modelQueries')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const newHandler = async () => {
    const oems = await client.query(modelQueries.getNew())
    return {
      statusCode: 200,
      body: { oems: oems.rows },
    }
  }

  const showHandler = async () => {
    const oems = await client.query(oemQueries.getAll())
    const model = await client.query(modelQueries.getShow(event))
    return {
      statusCode: 200,
      body: { model: model.rows[0], oems: oems.rows },
    }
  }

  const indexHandler = async () => {
    const result = await client.query(modelQueries.getIndex(event))
    const count = await client.query(modelQueries.getIndexCount(event))
    return {
      statusCode: 200,
      body: { models: result.rows, count: count.rows[0].count },
    }
  }

  const handler = async event => {
    try {
      if (event.new) {
        return await newHandler()
      } else if (event.id) {
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