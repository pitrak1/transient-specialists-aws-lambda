const utils = require('./utils')
const client = utils.createDbConnection()

exports.handler = async event => {
  const result = await client.query('SELECT * FROM Equipments')
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: result.rows,
  }
}
