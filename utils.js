const pg = require('pg')

exports.createDbConnection = () => {
  const client = new pg.Client(
    `postgres://${process.env.DB_MASTER_USERNAME}:${process.env.DB_MASTER_PASSWORD}@${process.env.DB_ENDPOINT}:5432/${process.env.DB_NAME}?ssl=1&integrated_security=1`,
  )
  client.connect()
  return client
}

exports.createEquipment = async (client, fields) => {
  try {
    await client.query(`
      INSERT INTO Equipments (serial_number, type_id, model_id)
      VALUES ('${fields.serialNumber}', ${fields.typeId}, ${fields.modelId});
    `)
    return {
      statusCode: 200,
      body: fields,
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message,
    }
  }
}

exports.createType = async (client, fields) => {
  try {
    await client.query(`
      INSERT INTO Types (name)
      VALUES ('${fields.name}');
    `)
    return {
      statusCode: 200,
      body: fields,
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message,
    }
  }
}
