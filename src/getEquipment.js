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
    const eventsQuery = `
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
      ORDER BY ${event.sortBy} ${event.ascending === 'true' ? 'ASC' : 'DESC'}
      LIMIT ${event.perPage}
      OFFSET ${parseInt(event.page) * parseInt(event.perPage)};
    `
    console.log(eventsQuery)
    const events = await client.query(eventsQuery)

    const equipmentQuery = `
      SELECT
        RecentEvents.id AS event_id,
        RecentEvents.status AS event_status,
        RecentEvents.job_number AS event_job_number,
        RecentEvents.company_notes AS event_company_notes,
        RecentEvents.start_date AS event_start_date,
        RecentEvents.end_date AS event_end_date,
        Equipments.id AS id,
        Equipments.serial_number,
        Equipments.notes,
        Equipments.cal_company,
        Equipments.cal_due,
        Types.id AS type_id,
        Types.name AS type_name,
        Models.id AS model_id,
        Models.name AS model_name,
        Oems.id AS oem_id,
        Oems.name AS oem_name
      FROM RecentEvents
      INNER JOIN Equipments ON Equipments.id = RecentEvents.equipment_id
      INNER JOIN Types ON Equipments.type_id = Types.id
      INNER JOIN Models ON Equipments.model_id = Models.id
      INNER JOIN Oems ON Models.oem_id = Oems.id
      WHERE Equipments.id = ${event.id};
    `
    console.log(equipmentQuery)
    const equipment = await client.query(equipmentQuery)

    const count = await client.query(`
      SELECT COUNT(*) FROM Events WHERE Events.id = ${event.id};
    `)
    return {
      statusCode: 200,
      body: {
        equipment: equipment.rows[0],
        events: events.rows,
        count: parseInt(count.rows[0].count),
      },
    }
  }

  const indexHandler = async () => {
    let search = ''
    if (event.searchValue) {
      search = `
        WHERE (LOWER(Equipments.serial_number) LIKE '%${event.searchValue.toLowerCase()}%'
        OR LOWER(Oems.name) LIKE '%${event.searchValue.toLowerCase()}%'
        OR LOWER(Models.name) LIKE '%${event.searchValue.toLowerCase()}%'
        OR LOWER(Types.name) LIKE '%${event.searchValue.toLowerCase()}%')
      `
    }

    const query = `
      SELECT
        RecentEvents.id AS event_id,
        RecentEvents.status AS event_status,
        RecentEvents.job_number AS event_job_number,
        RecentEvents.company_notes AS event_company_notes,
        RecentEvents.start_date AS event_start_date,
        RecentEvents.end_date AS event_end_date,
        Equipments.id AS id,
        Equipments.serial_number,
        Equipments.notes,
        Equipments.cal_company,
        Equipments.cal_due,
        Types.id AS type_id,
        Types.name AS type_name,
        Models.id AS model_id,
        Models.name AS model_name,
        Oems.id AS oem_id,
        Oems.name AS oem_name
      FROM RecentEvents
      INNER JOIN Equipments ON Equipments.id = RecentEvents.equipment_id
      INNER JOIN Types ON Equipments.type_id = Types.id
      INNER JOIN Models ON Equipments.model_id = Models.id
      INNER JOIN Oems ON Models.oem_id = Oems.id
      ${search}
      ORDER BY ${event.sortBy} ${event.ascending === 'true' ? 'ASC' : 'DESC'}
      LIMIT ${event.perPage}
      OFFSET ${parseInt(event.page) * parseInt(event.perPage)};
    `
    console.log(query)
    const result = await client.query(query)
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