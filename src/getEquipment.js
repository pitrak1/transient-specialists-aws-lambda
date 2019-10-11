const utils = require('./utils')
const queries = require('./queries')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const newHandler = async event => {
    const oems = await client.query(queries.getAllOems())
    const models = await client.query(queries.getAllModels())
    const types = await client.query(queries.getAllTypes())
    return {
      statusCode: 200,
      body: { oems: oems.rows, models: models.rows, types: types.rows },
    }
  }

  const showHandler = async event => {
    const events = await client.query(queries.getEventsByEquipmentId(event))
    const equipment = await client.query(queries.getEquipmentShow(event))

    return {
      statusCode: 200,
      body: {
        equipment: equipment.rows[0],
        events: events.rows,
        count: events.rowCount,
      },
    }
  }

  const indexHandler = async () => {
    const result = await client.query(queries.getEquipmentIndex(event))
    return {
      statusCode: 200,
      body: { equipment: result.rows, count: result.rowCount },
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
