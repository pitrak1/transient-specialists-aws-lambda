const pg = require('pg')

exports.createDbConnection = () => {
  const client = new pg.Client(
    `postgres://${process.env.DB_MASTER_USERNAME}:${process.env.DB_MASTER_PASSWORD}@${process.env.DB_ENDPOINT}:5432/${process.env.DB_NAME}?ssl=1&integrated_security=1`,
  )
  client.connect()
  return client
}

exports.getEquipment = async client => {
  try {
    const result = await client.query(`
      SELECT
        Equipments.id,
        Equipments.serial_number,
        Oems.id AS oem_id,
        Oems.name AS oem_name,
        Models.id AS model_id,
        Models.name AS model_name,
        Types.id AS type_id,
        Types.name AS type_name
      FROM Equipments
        INNER JOIN Types ON Equipments.type_id = Types.id
        INNER JOIN Models ON Equipments.model_id = Models.id
        INNER JOIN Oems ON Models.oem_id = Oems.id;
    `)
    return {
      statusCode: 200,
      body: result.rows,
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message,
    }
  }
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
