const utils = require('./utils')

const client = utils.createDbConnection()

exports.handler = async (event, _context, _callback) => {
  const newHandler = async () => {
    const oems = await client.query(`
      SELECT id, name
      FROM Oems;
    `)
    return {
      statusCode: 200,
      body: { oems: oems.rows },
    }
  }

  const indexHandler = async () => {
    const query = `
      SELECT
        Models.id,
        Models.name,
        Oems.id AS oem_id,
        Oems.name AS oem_name
      FROM Models
        INNER JOIN Oems ON Models.oem_id = Oems.id
      ORDER BY ${event.sortBy} ${event.ascending === 'true' ? 'ASC' : 'DESC'}
      LIMIT ${event.perPage}
      OFFSET ${parseInt(event.page) * parseInt(event.perPage)};
    `
    console.log(query)
    const result = await client.query(query)
    const count = await client.query(`SELECT COUNT(*) FROM Models`)
    return {
      statusCode: 200,
      body: { models: result.rows, count: parseInt(count.rows[0].count) },
    }
  }

  const handler = async event => {
    try {
      if (event.new) {
        return await newHandler()
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
