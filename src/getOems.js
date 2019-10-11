const utils = require('./utils')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const handler = async event => {
    try {
      const search = event.searchValue
        ? `WHERE LOWER(Oems.name) LIKE '%${event.searchValue.toLowerCase()}%'`
        : ''
      const query = `
        SELECT id, name
        FROM Oems
        ${search}
        ORDER BY ${event.sortBy} ${event.ascending === 'true' ? 'ASC' : 'DESC'}
        LIMIT ${event.perPage}
        OFFSET ${parseInt(event.page) * parseInt(event.perPage)};
      `
      console.log(query)
      const result = await client.query(query)
      return {
        statusCode: 200,
        body: { oems: result.rows, count: result.rowCount },
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
