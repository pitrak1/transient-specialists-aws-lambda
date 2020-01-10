const utils = require('../utils')
const reportQueries = require('../queries/reportQueries')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const equipmentHandler = async () => {
    const equipment = await client.query(reportQueries.getEquipment())
    let result =
      'serial_number, model, oem, type, notes, cal_company, cal_due, status, job_number, company_notes, start_date, end_date'

    for (const item of equipment.rows) {
      const serialNumber = item.serial_number.replace(/,/g, '')
      const model = item.model_name.replace(/,/g, '')
      const oem = item.oem_name.replace(/,/g, '')
      const type = item.type_name.replace(/,/g, '')
      const notes = item.notes ? item.notes.replace(/,/g, '') : ''
      const calCompany = item.cal_company
        ? item.cal_company.replace(/,/g, '')
        : ''
      const calDue = item.cal_due ? item.cal_due.replace(/,/g, '') : ''
      const status = item.event_status.replace(/,/g, '')
      const jobNumber = item.event_job_number
        ? item.event_job_number.replace(/,/g, '')
        : ''
      const companyNotes = item.event_company_notes
        ? item.event_company_notes.replace(/,/g, '')
        : ''
      const startDate = item.event_start_date
        ? `${item.event_start_date.getFullYear()}/${item.event_start_date.getMonth() +
            1}/${item.event_start_date.getDate()}`
        : ''
      const endDate = item.event_end_date
        ? `${item.event_end_date.getFullYear()}/${item.event_end_date.getMonth() +
            1}/${item.event_end_date.getDate()}`
        : ''

      result += `\n${serialNumber},${model},${oem},${type},${notes},${calCompany},${calDue},${status},${jobNumber},${companyNotes},${startDate},${endDate}`
    }

    return {
      statusCode: 200,
      body: { result },
    }
  }

  const countHandler = async () => {
    const itemGroups = await client.query(reportQueries.getItemGroups())
    let result = 'handle,count'

    for (const itemGroup of itemGroups.rows) {
      const count = await client.query(reportQueries.getCount(itemGroup.id))
      const handles = await client.query(reportQueries.getHandles(itemGroup.id))
      handles.rows.forEach(handle => {
        result += `\n${handle.handle},${count.rows[0].min || 0}`
      })
    }

    return {
      statusCode: 200,
      body: { result },
    }
  }

  const handler = async event => {
    try {
      if (event.reportName === 'equipment') {
        return await equipmentHandler()
      } else {
        return await countHandler()
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
