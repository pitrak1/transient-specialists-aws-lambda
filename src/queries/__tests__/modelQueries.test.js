const modelQueries = require('../modelQueries')
const customMatchers = require('../../customMatchers.js')

expect.extend(customMatchers.matchers)

describe('modelQueries', () => {
  describe('getShow', () => {
    it('embeds id into query', () => {
      const expected = `
        SELECT
          Models.id,
          Models.name,
          Oems.id AS oem_id,
          Oems.name AS oem_name
        FROM Models
        INNER JOIN Oems ON Models.oem_id = Oems.id
        WHERE Models.id = 3;
      `
      expect(modelQueries.getShow({ id: 3 })).toMatchWithoutWhitespace(expected)
    })
  })

  describe('getIndex', () => {
    it('properly uses sorting and pagination options', () => {
      const expected = `
        SELECT
          Models.id,
          Models.name,
          Oems.id AS oem_id,
          Oems.name AS oem_name
        FROM Models
          INNER JOIN Oems ON Models.oem_id = Oems.id
        ORDER BY some_column DESC
        LIMIT 10
        OFFSET 30;
      `
      expect(
        modelQueries.getIndex({
          sortBy: 'some_column',
          ascending: false,
          perPage: 10,
          page: 3,
        }),
      ).toMatchWithoutWhitespace(expected)
    })

    it('properly uses searchValue if given', () => {
      const expected = `
        SELECT
          Models.id,
          Models.name,
          Oems.id AS oem_id,
          Oems.name AS oem_name
        FROM Models
          INNER JOIN Oems ON Models.oem_id = Oems.id
        WHERE LOWER(Models.name) LIKE '%abcd%'
          OR LOWER(Oems.name) LIKE '%abcd%'
        ORDER BY some_column DESC
        LIMIT 10
        OFFSET 30;
      `
      expect(
        modelQueries.getIndex({
          sortBy: 'some_column',
          ascending: false,
          perPage: 10,
          page: 3,
          searchValue: 'ABCD',
        }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('getIndexCount', () => {
    it('properly uses searchValue if given', () => {
      const expected = `
        SELECT COUNT(*)
        FROM Models
        INNER JOIN Oems ON Models.oem_id = Oems.id
        WHERE LOWER(Models.name) LIKE '%abcd%'
          OR LOWER(Oems.name) LIKE '%abcd%'
        ;
      `
      expect(
        modelQueries.getIndexCount({
          searchValue: 'ABCD',
        }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('update', () => {
    it('embeds id, name, and oemId into query', () => {
      const expected = `
        UPDATE Models
        SET name = 'Model 1', oem_id = 4
        WHERE Models.id = 3;
      `
      expect(
        modelQueries.update({ name: 'Model 1', id: 3, oemId: 4 }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('create', () => {
    it('embeds name and oemId into query', () => {
      const expected = `
        INSERT INTO Models (name, oem_id)
        VALUES ('Model 1', 3);
      `
      expect(
        modelQueries.create({ name: 'Model 1', oemId: 3 }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('deleteById', () => {
    it('embeds id into query', () => {
      const expected = `
        DELETE FROM Models
        WHERE Models.id = 4;
      `
      expect(modelQueries.deleteById({ id: 4 })).toMatchWithoutWhitespace(
        expected,
      )
    })
  })
})
