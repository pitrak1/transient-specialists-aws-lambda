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
  runQuery(client, queries.getEquipmentIndex(), result => result.rows)

exports.getEquipmentShow = async (client, id) =>
  runQuery(client, queries.getEquipmentShow(id), result => result.rows[0])

exports.getEquipmentNew = async client => {
  const runQueries = async () => {
    const oems = await runQuery(
      client,
      queries.getOemsIndex(),
      result => result.rows,
    )
    const models = await runQuery(
      client,
      queries.getModelsIndex(),
      result => result.rows,
    )
    const types = await runQuery(
      client,
      queries.getTypesIndex(),
      result => result.rows,
    )
    return { oems: oems.body, models: models.body, types: types.body }
  }
  return runCustomQuery(runQueries, result => result)
}

exports.postEquipmentCreate = async (client, data) =>
  runQuery(client, queries.postEquipmentCreate(data), _result => ({}))

exports.deleteEquipmentDestroy = async (client, id) =>
  runQuery(client, queries.deleteEquipmentDestroy(id), _result => ({}))

exports.getOemsIndex = async client =>
  runQuery(client, queries.getOemsIndex(), result => result.rows)

exports.getOemsShow = async (client, id) =>
  runQuery(client, queries.getOemsShow(id), result => result.rows[0])

exports.postOemsCreate = async (client, data) =>
  runQuery(client, queries.postOemsCreate(data), _result => ({}))

exports.deleteOemsDestroy = async (client, id) =>
  runQuery(client, queries.deleteOemsDestroy(id), _result => ({}))

exports.getModelsIndex = async client =>
  runQuery(client, queries.getModelsIndex(), result => result.rows)

exports.getModelsShow = async (client, id) =>
  runQuery(client, queries.getModelsShow(id), result => result.rows[0])

exports.getModelsNew = async client => {
  const runQueries = async () => {
    const oems = await runQuery(
      client,
      queries.getOemsIndex(),
      result => result.rows,
    )
    return { oems: oems.body }
  }
  return runCustomQuery(runQueries, result => result)
}

exports.postModelsCreate = async (client, data) =>
  runQuery(client, queries.postModelsCreate(data), _result => ({}))

exports.deleteModelsDestroy = async (client, id) =>
  runQuery(client, queries.deleteModelsDestroy(id), _result => ({}))

exports.getTypesIndex = async client =>
  runQuery(client, queries.getTypesIndex(), result => result.rows)

exports.getTypesShow = async (client, id) =>
  runQuery(client, queries.getTypesShow(id), result => result.rows[0])

exports.postTypesCreate = async (client, data) =>
  runQuery(client, queries.postTypesCreate(data), _result => ({}))

exports.deleteTypesDestroy = async (client, id) =>
  runQuery(client, queries.deleteTypesDestroy(id), _result => ({}))

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
