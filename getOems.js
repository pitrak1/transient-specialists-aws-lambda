const utils = require('./utils')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const handler = async event => {
    try {
      const query = `
        SELECT id, name
        FROM Oems
        ORDER BY ${event.sortBy} ${event.ascending === 'true' ? 'ASC' : 'DESC'}
        LIMIT ${event.perPage}
        OFFSET ${parseInt(event.page) * parseInt(event.perPage)};
      `
      console.log(query)
      const result = await client.query(query)
      const count = await client.query(`SELECT COUNT(*) FROM Oems`)
      return {
        statusCode: 200,
        body: { oems: result.rows, count: parseInt(count.rows[0].count) },
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
