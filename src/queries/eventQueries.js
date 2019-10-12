exports.getShow = event => `
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
  WHERE Events.id = ${event.id};
`

exports.getByEquipmentId = event => `
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

exports.getByEquipmentIdCount = event => `
  SELECT COUNT(*)
  FROM Events
  WHERE equipment_id = ${event.id}
`

exports.update = event => `
  UPDATE Events
  SET
    status = '${event.status}',
    job_number = '${event.jobNumber}',
    company_notes = '${event.companyNotes}',
    start_date = '${event.startDate}',
    end_date = '${event.endDate}',
    updated_at = '${event.updatedAt}'
  WHERE Events.id = ${event.id};
`

exports.create = event => {
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

exports.deleteByEquipmentId = event => `
  DELETE FROM Events
  WHERE equipment_id = ${event.id};
`
