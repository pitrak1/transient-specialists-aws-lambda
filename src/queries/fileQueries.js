exports.get = event => `
  SELECT *
  FROM Files
  WHERE Files.id = ${event.id};
`

exports.create = event => `
  INSERT INTO Files (name, contents, equipment_id)
  VALUES ('${event.name}', '${event.contents}', ${event.equipmentId});
`

exports.deleteById = event => `
  DELETE FROM Files
  WHERE Files.id = ${event.id};
`

exports.getByEquipmentId = event => `
  SELECT id, name, equipment_id
  FROM Files
  WHERE Files.equipment_id = ${event.id};
`
