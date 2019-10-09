const utils = require('./utils')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const newHandler = async event => {
    const oems = await client.query(`
      SELECT id, name
      FROM Oems;
    `)
    const models = await client.query(`
      SELECT
        Models.id,
        Models.name,
        Oems.id AS oem_id,
        Oems.name AS oem_name
      FROM Models
        INNER JOIN Oems ON Models.oem_id = Oems.id;
    `)
    const types = await client.query(`
      SELECT id, name
      FROM Types;
    `)
    return {
      statusCode: 200,
      body: { oems: oems.rows, models: models.rows, types: types.rows },
    }
  }

  const showHandler = async event => {
    const events = await client.query(`
      SELECT
        id,
        status,
        job_number,
        company_notes,
        start_date,
        end_date,
        updated_at,
        equipment_id
      FROM Events
      WHERE equipment_id = ${event.id}
      ORDER BY updated_at DESC
    `)
    const equipment = await client.query(`
      SELECT
        Equipments.id,
        Equipments.serial_number,
        Oems.id AS oem_id,
        Oems.name AS oem_name,
        Models.id AS model_id,
        Models.name AS model_name,
        Types.id AS type_id,
        Types.name AS type_name
      FROM Equipments
        INNER JOIN Types ON Equipments.type_id = Types.id
        INNER JOIN Models ON Equipments.model_id = Models.id
        INNER JOIN Oems ON Models.oem_id = Oems.id
      WHERE Equipments.id = ${event.id};
    `)
    return {
      statusCode: 200,
      body: { equipment: equipment.rows[0], events: events.rows },
    }
  }

  const indexHandler = async () => {
    const query = `
      SELECT
        Equipments.id,
        Equipments.serial_number,
        Oems.id AS oem_id,
        Oems.name AS oem_name,
        Models.id AS model_id,
        Models.name AS model_name,
        Types.id AS type_id,
        Types.name AS type_name
      FROM Equipments
        INNER JOIN Types ON Equipments.type_id = Types.id
        INNER JOIN Models ON Equipments.model_id = Models.id
        INNER JOIN Oems ON Models.oem_id = Oems.id
      ORDER BY ${event.sortBy} ${event.ascending === 'true' ? 'ASC' : 'DESC'}
      LIMIT ${event.perPage}
      OFFSET ${parseInt(event.page) * parseInt(event.perPage)};
    `
    console.log(query)
    const result = await client.query(query)
    const count = await client.query(`SELECT COUNT(*) FROM Equipments`)
    return {
      statusCode: 200,
      body: { equipment: result.rows, count: parseInt(count.rows[0].count) },
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
