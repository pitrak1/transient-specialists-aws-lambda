const utils = require('./utils')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const handler = async event => {
    try {
      await client.query(`
        INSERT INTO Equipments (serial_number, model_id, type_id)
        VALUES ('${event.serialNumber}', ${event.modelId}, ${event.typeId});
      `)

      const equipment = await client.query(
        `SELECT * FROM Equipments WHERE Equipments.serial_number = '${event.serialNumber}';`,
      )

      await client.query(`
        INSERT INTO Events (status, equipment_id)
        VALUES ('IN', ${equipment.rows[0].id})
      `)

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
