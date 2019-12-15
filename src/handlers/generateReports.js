const utils = require('../utils')
const reportQueries = require('../queries/reportQueries')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const handler = async event => {
    try {
      const itemGroups = await client.query(reportQueries.getItemGroups())
      let result = 'handle,count'

      for (const itemGroup of itemGroups.rows) {
        const count = await client.query(reportQueries.getCount(itemGroup.id))
        const handles = await client.query(
          reportQueries.getHandles(itemGroup.id),
        )
        handles.rows.forEach(handle => {
          result += `\n${handle.handle},${count.rows[0].min || 0}`
        })
      }

      return {
        statusCode: 200,
        body: { result },
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
