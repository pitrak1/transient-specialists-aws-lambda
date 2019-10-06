const utils = require('./utils')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const handler = async event => {
    try {
      const columns = ['equipment_id', 'status']
      const values = [`${event.equipmentId}`, `'${event.status}'`]

      if (event.jobNumber) {
        columns.push(`job_number`)
        values.push(`'${event.jobNumber}'`)
      }

      if (event.companyNotes) {
        columns.push(`company_notes`)
        values.push(`'${event.companyNotes}'`)
      }

      if (event.startDate) {
        columns.push(`start_date`)
        values.push(`'${event.startDate}'`)
      }

      if (event.endDate) {
        columns.push(`end_date`)
        values.push(`'${event.endDate}'`)
      }

      if (event.updatedAt) {
        columns.push(`updated_at`)
        values.push(`'${event.updatedAt}'`)
      }

      await client.query(`
        INSERT INTO Events (${columns.join(', ')})
        VALUES (${values.join(', ')});
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
