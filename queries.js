exports.getEquipmentIndex = () => `
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
`

exports.getEquipmentShow = id => `
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
`

exports.postEquipmentCreate = ({ serialNumber, modelId, typeId }) => `
  INSERT INTO Equipments (serial_number, model_id, type_id)
  VALUES ('${serialNumber}', ${modelId}, ${typeId});
`

exports.getOemsIndex = () => `
  SELECT id, name
  FROM Oems;
`

exports.getOemsShow = id => `
  SELECT id, name
  FROM Oems
  WHERE Oems.id = ${id};
`

exports.postOemsCreate = ({ name }) => `
  INSERT INTO Oems (name)
  VALUES ('${name}');
`

exports.getModelsIndex = () => `
  SELECT
    Models.id,
    Models.name,
    Oems.id AS oem_id,
    Oems.name AS oem_name
  FROM Models
    INNER JOIN Oems ON Models.oem_id = Oems.id;
`

exports.getModelsShow = id => `
  SELECT
    Models.id,
    Models.name,
    Oems.id AS oem_id,
    Oems.name AS oem_name
  FROM Models
    INNER JOIN Oems ON Models.oem_id = Oems.id
  WHERE Models.id = ${id};
`

exports.postModelsCreate = ({ name, oemId }) => `
  INSERT INTO Models (name, oem_id)
  VALUES ('${name}', ${oemId});
`

exports.getTypesIndex = () => `
  SELECT id, name
  FROM Types;
`

exports.getTypesShow = id => `
  SELECT id, name
  FROM Types
  WHERE Types.id = ${id};
`

exports.postTypesCreate = ({ name }) => `
  INSERT INTO Types (name)
  VALUES ('${name}');
`
