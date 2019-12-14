const utils = require('../utils')
const modelQueries = require('../queries/modelQueries')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const updateHandler = async event => {
    await client.query(modelQueries.update(event))
    return {
      statusCode: 200,
      body: {},
    }
  }

  const handler = async event => {
    try {
      return await updateHandler(event)
    } catch (e) {
      return {
        statusCode: 500,
        body: e.message,
      }
    }
  }
  return await utils.genericHandler(event, handler)
}
