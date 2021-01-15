exports.get = event => `
  SELECT *
  FROM Files
  WHERE Files.id = ${event.id};
`

exports.create = event => `
  INSERT INTO Files (name, equipment_id)
  VALUES ('${event.name}', ${event.equipmentId});
`

exports.deleteById = event => `
  DELETE FROM Files
  WHERE Files.id = ${event.id};
`

exports.getByEquipmentId = event => `
  SELECT *
  FROM Files
  WHERE Files.equipment_id = ${event.id};
`
