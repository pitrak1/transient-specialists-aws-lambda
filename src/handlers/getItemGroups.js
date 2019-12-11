const utils = require('../utils')
const itemGroupQueries = require('../queries/itemGroupQueries')
const oemQueries = require('../queries/oemQueries')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const showHandler = async () => {
    const itemGroupResult = await client.query(itemGroupQueries.getShow(event))
    const itemGroup = itemGroupResult.rows[0]
    const modelsResult = await client.query(itemGroupQueries.getModels(event))
    itemGroup.models = modelsResult.rows
    const handlesResult = await client.query(itemGroupQueries.getHandles(event))
    itemGroup.handles = handlesResult.rows
    const models = await client.query(itemGroupQueries.getOtherModels(event))
    const oems = await client.query(oemQueries.getAll())
    return {
      statusCode: 200,
      body: { itemGroup, models: models.rows, oems: oems.rows },
    }
  }

  const indexHandler = async () => {
    const result = await client.query(itemGroupQueries.getIndex(event))
    const count = await client.query(itemGroupQueries.getIndexCount(event))
    return {
      statusCode: 200,
      body: { data: result.rows, count: count.rows[0].count },
    }
  }

  const handler = async event => {
    try {
      if (event.show || event.edit) {
        return await showHandler()
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
