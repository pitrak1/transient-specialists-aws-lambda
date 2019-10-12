exports.getAll = () => `
  SELECT id, name
  FROM Oems;
`

exports.getShow = event => `
  SELECT id, name
  FROM Oems
  WHERE Oems.id = ${event.id};
`

exports.getIndex = event => {
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

exports.getIndexCount = event => {
  let search = ''
  if (event.searchValue) {
    search = `WHERE LOWER(Oems.name) LIKE '%${event.searchValue.toLowerCase()}%'`
  }

  return `
    SELECT COUNT(*)
    FROM Oems
    ${search};
  `
}

exports.update = event => `
  UPDATE Oems
  SET name = '${event.name}'
  WHERE Oems.id = ${event.id};
`

exports.create = event => `
  INSERT INTO Oems (name)
  VALUES ('${event.name}');
`

exports.deleteById = event => `
  DELETE FROM Oems
  WHERE Oems.id = ${event.id};
`
