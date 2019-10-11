exports.getAllOems = () => `
  SELECT id, name
  FROM Oems;
`

exports.getAllModels = () => `
  SELECT
    Models.id,
    Models.name,
    Oems.id AS oem_id,
    Oems.name AS oem_name
  FROM Models
    INNER JOIN Oems ON Models.oem_id = Oems.id;
`

exports.getAllTypes = () => `
  SELECT id, name
  FROM Types;
`

exports.deleteEventsByEquipmentId = event => `
  DELETE FROM Events
  WHERE equipment_id = ${event.id};
`

exports.deleteEquipmentById = event => `
  DELETE FROM Equipments
  WHERE Equipments.id = ${event.id};
`

exports.deleteModelById = event => `
  DELETE FROM Models
  WHERE Models.id = ${event.id};
`

exports.deleteOemById = event => `
  DELETE FROM Oems
  WHERE Oems.id = ${event.id};
`

exports.deleteTypeById = event => `
  DELETE FROM Types
  WHERE Types.id = ${event.id};
`

exports.getEquipmentShow = event => `
  SELECT
    RecentEvents.id AS event_id,
    RecentEvents.status AS event_status,
    RecentEvents.job_number AS event_job_number,
    RecentEvents.company_notes AS event_company_notes,
    RecentEvents.start_date AS event_start_date,
    RecentEvents.end_date AS event_end_date,
    Equipments.id AS id,
    Equipments.serial_number,
    Equipments.notes,
    Equipments.cal_company,
    Equipments.cal_due,
    Types.id AS type_id,
    Types.name AS type_name,
    Models.id AS model_id,
    Models.name AS model_name,
    Oems.id AS oem_id,
    Oems.name AS oem_name
  FROM RecentEvents
  INNER JOIN Equipments ON Equipments.id = RecentEvents.equipment_id
  INNER JOIN Types ON Equipments.type_id = Types.id
  INNER JOIN Models ON Equipments.model_id = Models.id
  INNER JOIN Oems ON Models.oem_id = Oems.id
  WHERE Equipments.id = ${event.id};
`

exports.getEventsByEquipmentId = event => `
  SELECT
    id,
    status,
    job_number,
    company_notes,
    start_date,
    end_date,
    updated_at,
    equipment_id
  FROM Events
  WHERE equipment_id = ${event.id}
  ORDER BY ${event.sortBy} ${event.ascending === 'true' ? 'ASC' : 'DESC'}
  LIMIT ${event.perPage}
  OFFSET ${parseInt(event.page) * parseInt(event.perPage)};
`

exports.getEquipmentIndex = event => {
  let search = ''
  if (event.searchValue) {
    search = `
      WHERE LOWER(Equipments.serial_number) LIKE '%${event.searchValue.toLowerCase()}%'
      OR LOWER(Oems.name) LIKE '%${event.searchValue.toLowerCase()}%'
      OR LOWER(Models.name) LIKE '%${event.searchValue.toLowerCase()}%'
      OR LOWER(Types.name) LIKE '%${event.searchValue.toLowerCase()}%'
    `
  }

  return `
    SELECT
      RecentEvents.id AS event_id,
      RecentEvents.status AS event_status,
      RecentEvents.job_number AS event_job_number,
      RecentEvents.company_notes AS event_company_notes,
      RecentEvents.start_date AS event_start_date,
      RecentEvents.end_date AS event_end_date,
      Equipments.id AS id,
      Equipments.serial_number,
      Equipments.notes,
      Equipments.cal_company,
      Equipments.cal_due,
      Types.id AS type_id,
      Types.name AS type_name,
      Models.id AS model_id,
      Models.name AS model_name,
      Oems.id AS oem_id,
      Oems.name AS oem_name
    FROM RecentEvents
    INNER JOIN Equipments ON Equipments.id = RecentEvents.equipment_id
    INNER JOIN Types ON Equipments.type_id = Types.id
    INNER JOIN Models ON Equipments.model_id = Models.id
    INNER JOIN Oems ON Models.oem_id = Oems.id
    ${search}
    ORDER BY ${event.sortBy} ${event.ascending === 'true' ? 'ASC' : 'DESC'}
    LIMIT ${event.perPage}
    OFFSET ${parseInt(event.page) * parseInt(event.perPage)};
  `
}

exports.getModelsIndex = event => {
  let search = ''
  if (event.searchValue) {
    search = `
      WHERE LOWER(Models.name) LIKE '%${event.searchValue.toLowerCase()}%'
      OR LOWER(Oems.name) LIKE '%${event.searchValue.toLowerCase()}%'
    `
  }

  return `
    SELECT
      Models.id,
      Models.name,
      Oems.id AS oem_id,
      Oems.name AS oem_name
    FROM Models
      INNER JOIN Oems ON Models.oem_id = Oems.id
    ${search}
    ORDER BY ${event.sortBy} ${event.ascending === 'true' ? 'ASC' : 'DESC'}
    LIMIT ${event.perPage}
    OFFSET ${parseInt(event.page) * parseInt(event.perPage)};
  `
}

exports.getOemsIndex = event => {
  let search = ''
  if (event.searchValue) {
    search = `WHERE LOWER(Oems.name) LIKE '%${event.searchValue.toLowerCase()}%'`
  }

  return `
    SELECT id, name
    FROM Oems
    ${search}
    ORDER BY ${event.sortBy} ${event.ascending === 'true' ? 'ASC' : 'DESC'}
    LIMIT ${event.perPage}
    OFFSET ${parseInt(event.page) * parseInt(event.perPage)};
  `
}

exports.getTypesIndex = event => {
  let search = ''
  if (event.searchValue) {
    search = `WHERE LOWER(Types.name) LIKE '%${event.searchValue.toLowerCase()}%'`
  }

  return `
    SELECT id, name
    FROM Types
    ${search}
    ORDER BY ${event.sortBy} ${event.ascending === 'true' ? 'ASC' : 'DESC'}
    LIMIT ${event.perPage}
    OFFSET ${parseInt(event.page) * parseInt(event.perPage)};
  `
}

exports.createEquipment = event => {
  const columns = ['serial_number', 'model_id', 'type_id']
  const values = [
    `'${event.serialNumber}'`,
    `${event.modelId}`,
    `${event.typeId}`,
  ]

  if (event.notes) {
    columns.push(`notes`)
    values.push(`'${event.notes}'`)
  }

  if (event.calCompany) {
    columns.push(`cal_company`)
    values.push(`'${event.calCompany}'`)
  }

  if (event.calDue) {
    columns.push(`cal_due`)
    values.push(`'${event.calDue}'`)
  }

  return `
    INSERT INTO Equipments (${columns.join(', ')})
    VALUES (${values.join(', ')});
  `
}

exports.findEquipmentIdBySerialNumber = event => `
  SELECT *
  FROM Equipments
  WHERE Equipments.serial_number = '${event.serialNumber}';
`

exports.createEvent = event => {
  const columns = ['equipment_id', 'status']
  const values = [`${event.equipmentId}`, `'${event.status}'`]

  if (event.jobNumber) {
    columns.push(`job_number`)
    values.push(`'${event.jobNumber}'`)
  }

  if (event.companyNotes) {
    columns.push(`company_notes`)
    values.push(`'${event.companyNotes}'`)
  }

  if (event.startDate) {
    columns.push(`start_date`)
    values.push(`'${event.startDate}'`)
  }

  if (event.endDate) {
    columns.push(`end_date`)
    values.push(`'${event.endDate}'`)
  }

  if (event.updatedAt) {
    columns.push(`updated_at`)
    values.push(`'${event.updatedAt}'`)
  }

  return `
    INSERT INTO Events (${columns.join(', ')})
    VALUES (${values.join(', ')});
  `
}

exports.createModel = event => `
  INSERT INTO Models (name, oem_id)
  VALUES ('${event.name}', ${event.oemId});
`

exports.createOem = event => `
  INSERT INTO Oems (name)
  VALUES ('${event.name}');
`

exports.createType = event => `
  INSERT INTO Types (name)
  VALUES ('${event.name}');
`
