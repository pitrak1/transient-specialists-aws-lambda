exports.getAll = () => `
  SELECT id, name
  FROM Types;
`

exports.getShow = event => `
  SELECT id, name
  FROM Types
  WHERE Types.id = ${event.id};
`

exports.getIndex = event => {
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

exports.getIndexCount = event => {
  let search = ''
  if (event.searchValue) {
    search = `WHERE LOWER(Types.name) LIKE '%${event.searchValue.toLowerCase()}%'`
  }

  return `
    SELECT COUNT(*)
    FROM Types
    ${search};
  `
}

exports.update = event => `
  UPDATE Types
  SET name = '${event.name}'
  WHERE Types.id = ${event.id};
`

exports.create = event => `
  INSERT INTO Types (name)
  VALUES ('${event.name}');
`

exports.deleteById = event => `
  DELETE FROM Types
  WHERE Types.id = ${event.id};
`
