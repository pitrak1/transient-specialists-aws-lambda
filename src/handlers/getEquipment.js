const utils = require('./utils')
const equipmentQueries = require('../queries/equipmentQueries')
const eventQueries = require('../queries/eventQueries')
const oemQueries = require('../queries/oemQueries')
const modelQueries = require('../queries/modelQueries')
const typeQueries = require('../queries/typeQueries')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const newHandler = async event => {
    const oems = await client.query(oemQueries.getAll())
    const models = await client.query(modelQueries.getAll())
    const types = await client.query(typeQueries.getAll())
    return {
      statusCode: 200,
      body: { oems: oems.rows, models: models.rows, types: types.rows },
    }
  }

  const showHandler = async event => {
    const events = await client.query(eventQueries.getByEquipmentId(event))
    const equipment = await client.query(equipmentQueries.getShow(event))
    const count = await client.query(eventQueries.getByEquipmentIdCount(event))
    return {
      statusCode: 200,
      body: {
        equipment: equipment.rows[0],
        events: events.rows,
        count: count.rows[0].count,
      },
    }
  }

  const indexHandler = async () => {
    const result = await client.query(equipmentQueries.getIndex(event))
    const count = await client.query(equipmentQueries.getEquipmentCount(event))
    return {
      statusCode: 200,
      body: { equipment: result.rows, count: count.rows[0].count },
    }
  }

  const handler = async event => {
    try {
      if (event.new) {
        return await newHandler(event)
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
