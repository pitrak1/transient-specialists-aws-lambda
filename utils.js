const pg = require('pg')

exports.createDbConnection = () => {
  const client = new pg.Client(
    `postgres://${process.env.DB_MASTER_USERNAME}:${process.env.DB_MASTER_PASSWORD}@${process.env.DB_ENDPOINT}:5432/${process.env.DB_NAME}?ssl=1&integrated_security=1`,
  )
  client.connect()
  return client
}

exports.getEquipmentIndex = async client =>
  getIndex(
    client,
    `
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
    `,
  )

exports.getOemsIndex = async client =>
  getIndex(
    client,
    `
      SELECT id, name
      FROM Oems;
    `,
  )

exports.getModelsIndex = async client =>
  getIndex(
    client,
    `
      SELECT
        Models.id,
        Models.name,
        Oems.id AS oem_id,
        Oems.name AS oem_name
      FROM Models
        INNER JOIN Oems ON Models.oem_id = Oems.id;
    `,
  )

exports.getTypesIndex = async client =>
  getIndex(
    client,
    `
      SELECT id, name
      FROM Types;
    `,
  )

getIndex = async (client, query) => {
  try {
    const result = await client.query(query)
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

exports.getEquipmentShow = async (client, id) =>
  getShow(
    client,
    `
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
        INNER JOIN Oems ON Models.oem_id = Oems.id
      WHERE Equipments.id = ${id};
    `,
  )

exports.getOemsShow = async (client, id) =>
  getShow(
    client,
    `
      SELECT id, name
      FROM Oems
      WHERE Oems.id = ${id};
    `,
  )

exports.getModelsShow = async (client, id) =>
  getShow(
    client,
    `
      SELECT
        Models.id,
        Models.name,
        Oems.id AS oem_id,
        Oems.name AS oem_name
      FROM Models
        INNER JOIN Oems ON Models.oem_id = Oems.id
      WHERE Models.id = ${id};
    `,
  )

exports.getTypesShow = async (client, id) =>
  getShow(
    client,
    `
      SELECT id, name
      FROM Types
      WHERE Types.id = ${id};
    `,
  )

getShow = async (client, query) => {
  try {
    const result = await client.query(query)
    return {
      statusCode: 200,
      body: result.rows[0],
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message,
    }
  }
}

exports.getEquipmentNew = async client => {
  try {
    const oems = await getIndex(
      client,
      `
        SELECT id, name
        FROM Oems;
      `,
    )
    const models = await getIndex(
      client,
      `
        SELECT
          Models.id,
          Models.name,
          Oems.id AS oem_id,
          Oems.name AS oem_name
        FROM Models
          INNER JOIN Oems ON Models.oem_id = Oems.id;
      `,
    )
    const types = await getIndex(
      client,
      `
        SELECT id, name
        FROM Types;
      `,
    )

    return {
      statusCode: 200,
      body: {
        oems: oems.body,
        models: models.body,
        types: types.body,
      },
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message,
    }
  }
}
