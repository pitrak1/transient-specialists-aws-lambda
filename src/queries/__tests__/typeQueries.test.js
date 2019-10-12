const typeQueries = require('../typeQueries')
const customMatchers = require('../../customMatchers.js')

expect.extend(customMatchers.matchers)

describe('typeQueries', () => {
  describe('getShow', () => {
    it('embeds id into query', () => {
      const expected = `
        SELECT id, name
        FROM Types
        WHERE Types.id = 3;
      `
      expect(typeQueries.getShow({ id: 3 })).toMatchWithoutWhitespace(expected)
    })
  })

  describe('getIndex', () => {
    it('properly uses sorting and pagination options', () => {
      const expected = `
        SELECT id, name
        FROM Types
        ORDER BY some_column DESC
        LIMIT 10
        OFFSET 30;
      `
      expect(
        typeQueries.getIndex({
          sortBy: 'some_column',
          ascending: false,
          perPage: 10,
          page: 3,
        }),
      ).toMatchWithoutWhitespace(expected)
    })

    it('properly uses searchValue if given', () => {
      const expected = `
        SELECT id, name
        FROM Types
        WHERE LOWER(Types.name) LIKE '%abcd%'
        ORDER BY some_column DESC
        LIMIT 10
        OFFSET 30;
      `
      expect(
        typeQueries.getIndex({
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
        FROM Types
        WHERE LOWER(Types.name) LIKE '%abcd%';
      `
      expect(
        typeQueries.getIndexCount({
          searchValue: 'ABCD',
        }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('update', () => {
    it('embeds id and name into query', () => {
      const expected = `
        UPDATE Types
        SET name = 'Type 1'
        WHERE Types.id = 3;
      `
      expect(
        typeQueries.update({ name: 'Type 1', id: 3 }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('create', () => {
    it('embeds name into query', () => {
      const expected = `
        INSERT INTO Types (name)
        VALUES ('Type 1');
      `
      expect(typeQueries.create({ name: 'Type 1' })).toMatchWithoutWhitespace(
        expected,
      )
    })
  })

  describe('deleteById', () => {
    it('embeds id into query', () => {
      const expected = `
        DELETE FROM Types
        WHERE Types.id = 4;
      `
      expect(typeQueries.deleteById({ id: 4 })).toMatchWithoutWhitespace(
        expected,
      )
    })
  })
})
