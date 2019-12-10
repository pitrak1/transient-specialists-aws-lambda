exports.getAll = () => `
  SELECT
    id,
    name
  FROM ItemGroups
`

exports.getShow = event => `
  SELECT
    ItemGroups.id,
    ItemGroups.name
  FROM ItemGroups
  WHERE ItemGroups.id = ${event.id};
`

exports.getModels = event => `
  SELECT
    Models.id,
    Models.name,
    Models.item_group_id
  FROM Models
  WHERE Models.item_group_id = ${event.id};
`

exports.getOtherModels = event => `
  SELECT
    Models.id,
    Models.name,
    Models.item_group_id
  FROM Models
  WHERE Models.item_group_id IS NULL;
`

exports.getHandles = event => `
  SELECT
    Handles.id AS id,
    Handles.handle,
    ItemGroups.id AS item_group_id
  FROM Handles
  INNER JOIN ItemGroups ON ItemGroups.id = Handles.item_group_id
  WHERE ItemGroups.id = ${event.id};
`

exports.getIndex = event => {
  let search = ''
  if (event.searchValue) {
    search = `WHERE LOWER(ItemGroups.name) LIKE '%${event.searchValue.toLowerCase()}%'`
  }

  return `
    SELECT
      id,
      name
    FROM ItemGroups
    ${search}
    ORDER BY ${event.sortBy} ${event.ascending === 'true' ? 'ASC' : 'DESC'}
    LIMIT ${event.perPage}
    OFFSET ${parseInt(event.page) * parseInt(event.perPage)};
  `
}

exports.getIndexCount = event => {
  let search = ''
  if (event.searchValue) {
    search = `WHERE LOWER(ItemGroups.name) LIKE '%${event.searchValue.toLowerCase()}%'`
  }

  return `
    SELECT COUNT(*)
    FROM ItemGroups
    ${search};
  `
}

exports.update = event => `
  UPDATE ItemGroups
  SET name = '${event.name}'
  WHERE ItemGroups.id = ${event.id};
`

exports.updateAdd = event => `
  INSERT INTO Handles (handle, item_group_id)
  VALUES ('${event.handle}', ${event.id});
`

exports.updateRemove = event => `
  DELETE FROM Handles
  WHERE Handles.id = ${event.handleId};
`

exports.create = event => `
  INSERT INTO ItemGroups (name)
  VALUES ('${event.name}');
`

exports.deleteById = event => `
  DELETE FROM ItemGroups
  WHERE ItemGroups.id = ${event.id};
`
