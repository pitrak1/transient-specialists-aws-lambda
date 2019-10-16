const utils = require('../utils')
const eventQueries = require('../queries/eventQueries')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const handler = async event => {
    try {
      const ev = await client.query(eventQueries.getShow(event))
      const count = await client.query(
        eventQueries.getByEquipmentIdCount({ id: ev.rows[0].equipment_id }),
      )

      if (count.rows[0].count === 1) {
        throw 'Cannot delete the last event for an equipment'
      }

      await client.query(eventQueries.deleteById(event))

      return {
        statusCode: 200,
        body: {},
      }
    } catch (e) {
      return {
        statusCode: 500,
        body: e.message,
      }
    }
  }
  return await utils.genericHandler(event, handler)
}
