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
