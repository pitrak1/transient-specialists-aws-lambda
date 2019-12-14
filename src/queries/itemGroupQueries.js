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
    ItemGroupsModels.item_group_id,
    Models.id,
    Models.name,
    Models.oem_id
  FROM ItemGroupsModels
  INNER JOIN Models ON ItemGroupsModels.model_id = Models.id
  WHERE ItemGroupsModels.item_group_id = ${event.id};
`

exports.getOtherModels = event => `
  SELECT
    Models.id,
    Models.name,
    Models.oem_id,
    ItemGroupsModels.item_group_id
  FROM Models
  LEFT JOIN ItemGroupsModels on Models.id = ItemGroupsModels.model_id
  WHERE (ItemGroupsModels.item_group_id != ${event.id}) OR (ItemGroupsModels.item_group_id IS NULL)
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

exports.updateAddModel = event => `
  INSERT INTO ItemGroupsModels (model_id, item_group_id)
  VALUES (${event.id}, ${event.itemGroupId});
`

exports.updateAddHandle = event => `
  INSERT INTO Handles (handle, item_group_id)
  VALUES ('${event.handle}', ${event.id});
`

exports.updateRemoveModel = event => `
  DELETE FROM ItemGroupsModels
  WHERE model_id = ${event.id} AND item_group_id = ${event.itemGroupId};
`

exports.updateRemoveHandle = event => `
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
