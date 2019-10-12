const utils = require('../utils')
const oemQueries = require('../queries/oemQueries')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const showHandler = async () => {
    const oem = await client.query(oemQueries.getShow(event))
    return {
      statusCode: 200,
      body: { oem: oem.rows[0] },
    }
  }

  const indexHandler = async () => {
    const result = await client.query(oemQueries.getIndex(event))
    const count = await client.query(oemQueries.getIndexCount(event))
    return {
      statusCode: 200,
      body: { oems: result.rows, count: count.rows[0].count },
    }
  }

  const handler = async event => {
    try {
      if (event.show || event.edit) {
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
