exports.getAll = () => `
  SELECT
    Models.id,
    Models.name,
    Oems.id AS oem_id,
    Oems.name AS oem_name
  FROM Models
    INNER JOIN Oems ON Models.oem_id = Oems.id;
`

exports.getShow = event => `
  SELECT
    Models.id,
    Models.name,
    Oems.id AS oem_id,
    Oems.name AS oem_name
  FROM Models
  INNER JOIN Oems ON Models.oem_id = Oems.id
  WHERE Models.id = ${event.id};
`

exports.getIndex = event => {
  let search = ''
  if (event.searchValue) {
    search = `
      WHERE LOWER(Models.name) LIKE '%${event.searchValue.toLowerCase()}%'
      OR LOWER(Oems.name) LIKE '%${event.searchValue.toLowerCase()}%'
    `
  }

  return `
    SELECT
      Models.id,
      Models.name,
      Oems.id AS oem_id,
      Oems.name AS oem_name
    FROM Models
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
      WHERE LOWER(Models.name) LIKE '%${event.searchValue.toLowerCase()}%'
      OR LOWER(Oems.name) LIKE '%${event.searchValue.toLowerCase()}%'
    `
  }

  return `
    SELECT COUNT(*)
    FROM Models
      INNER JOIN Oems ON Models.oem_id = Oems.id
    ${search};
  `
}

exports.update = event => `
  UPDATE Models
  SET name = '${event.name}', oem_id = ${event.oemId}
  WHERE Models.id = ${event.id};
`

exports.create = event => `
  INSERT INTO Models (name, oem_id)
  VALUES ('${event.name}', ${event.oemId});
`

exports.deleteById = event => `
  DELETE FROM Models
  WHERE Models.id = ${event.id};
`
