const pg = require('pg')
const queries = require('./queries')

exports.genericHandler = async (event, handler) => {
  console.log(`Event`)
  console.log(event)
  const { statusCode, body } = await handler(event)
  console.log(`Status Code`)
  console.log(statusCode)
  console.log(`Body`)
  console.log(body)
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body,
  }
}

exports.createDbConnection = () => {
  const client = new pg.Client(
    `postgres://${process.env.DB_MASTER_USERNAME}:${process.env.DB_MASTER_PASSWORD}@${process.env.DB_ENDPOINT}:5432/${process.env.DB_NAME}?ssl=1&integrated_security=1`,
  )
  client.connect()
  return client
}

exports.getEquipmentIndex = async client =>
  getIndex(client, queries.getEquipmentIndex())

exports.getEquipmentShow = async (client, id) =>
  getShow(client, queries.getEquipmentShow(id))

exports.getEquipmentNew = async client => {
  const runQueries = async () => {
    const oems = await getIndex(client, queries.getOemsIndex())
    const models = await getIndex(client, queries.getModelsIndex())
    const types = await getIndex(client, queries.getTypesIndex())
    return { oems: oems.body, models: models.body, types: types.body }
  }
  return runCustomQuery(runQueries, result => result)
}

exports.postEquipmentCreate = async (client, data) =>
  postCreate(client, queries.postEquipmentCreate(data))

exports.getOemsIndex = async client => getIndex(client, queries.getOemsIndex())

exports.getOemsShow = async (client, id) =>
  getShow(client, queries.getOemsShow(id))

exports.postOemsCreate = async (client, data) =>
  postCreate(client, queries.postOemsCreate(data))

exports.getModelsIndex = async client =>
  getIndex(client, queries.getModelsIndex())

exports.getModelsShow = async (client, id) =>
  getShow(client, queries.getModelsShow(id))

exports.getModelsNew = async client => {
  const runQueries = async () => {
    const oems = await getIndex(client, queries.getOemsIndex())
    return { oems: oems.body }
  }
  return runCustomQuery(runQueries, result => result)
}

exports.postModelsCreate = async (client, data) =>
  postCreate(client, queries.postModelsCreate(data))

exports.getTypesIndex = async client =>
  getIndex(client, queries.getTypesIndex())

exports.getTypesShow = async (client, id) =>
  getShow(client, queries.getTypesShow(id))

exports.postTypesCreate = async (client, data) =>
  postCreate(client, queries.postTypesCreate(data))

getIndex = async (client, query) =>
  runQuery(client, query, result => result.rows)

getShow = async (client, query) =>
  runQuery(client, query, result => result.rows[0])

postCreate = async (client, query) => runQuery(client, query, _result => ({}))

runQuery = async (client, query, formatOutput) => {
  const runQueries = async () => client.query(query)
  return runCustomQuery(runQueries, formatOutput)
}

runCustomQuery = async (runQueries, formatOutput) => {
  try {
    const result = await runQueries()
    return {
      statusCode: 200,
      body: formatOutput(result),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message,
    }
  }
}
