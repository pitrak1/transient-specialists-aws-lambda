exports.getShow = event => `
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
  RIGHT JOIN Equipments ON Equipments.id = RecentEvents.equipment_id
  INNER JOIN Types ON Equipments.type_id = Types.id
  INNER JOIN Models ON Equipments.model_id = Models.id
  INNER JOIN Oems ON Models.oem_id = Oems.id
  WHERE Equipments.id = ${event.id};
`

exports.getIndex = event => {
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
    RIGHT JOIN Equipments ON Equipments.id = RecentEvents.equipment_id
    INNER JOIN Types ON Equipments.type_id = Types.id
    INNER JOIN Models ON Equipments.model_id = Models.id
    INNER JOIN Oems ON Models.oem_id = Oems.id
    ${search}
    ORDER BY ${event.sortBy} ${event.ascending === 'true' ? 'ASC' : 'DESC'}
    LIMIT ${event.perPage}
    OFFSET ${parseInt(event.page) * parseInt(event.perPage)};
  `
}

exports.getIndexCount = event => {
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
    SELECT COUNT(*)
    FROM RecentEvents
    INNER JOIN Equipments ON Equipments.id = RecentEvents.equipment_id
    INNER JOIN Types ON Equipments.type_id = Types.id
    INNER JOIN Models ON Equipments.model_id = Models.id
    INNER JOIN Oems ON Models.oem_id = Oems.id
    ${search};
  `
}

exports.update = event => `
  UPDATE Equipments
  SET
    serial_number = '${event.serialNumber}',
    notes = '${event.notes}',
    cal_company = '${event.calCompany}',
    cal_due = ${event.calDue ? `'${event.calDue}'` : null},
    type_id = ${event.typeId},
    model_id = ${event.modelId}
  WHERE Equipments.id = ${event.id};
`

exports.create = event => {
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

exports.deleteById = event => `
  DELETE FROM Equipments
  WHERE Equipments.id = ${event.id};
`

exports.findBySerialNumber = event => `
  SELECT *
  FROM Equipments
  WHERE Equipments.serial_number = '${event.serialNumber}';
`
