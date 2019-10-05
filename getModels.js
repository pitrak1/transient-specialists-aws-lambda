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
    const result = await client.query(`
      SELECT
        Models.id,
        Models.name,
        Oems.id AS oem_id,
        Oems.name AS oem_name
      FROM Models
        INNER JOIN Oems ON Models.oem_id = Oems.id;
    `)
    return {
      statusCode: 200,
      body: result.rows,
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
