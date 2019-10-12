const oemQueries = require('../oemQueries')
const customMatchers = require('../../customMatchers.js')

expect.extend(customMatchers.matchers)

describe('oemQueries', () => {
  describe('getShow', () => {
    it('embeds id into query', () => {
      const expected = `
        SELECT id, name
        FROM Oems
        WHERE Oems.id = 3;
      `
      expect(oemQueries.getShow({ id: 3 })).toMatchWithoutWhitespace(expected)
    })
  })

  describe('getIndex', () => {
    it('properly uses sorting and pagination options', () => {
      const expected = `
        SELECT id, name
        FROM Oems
        ORDER BY some_column DESC
        LIMIT 10
        OFFSET 30;
      `
      expect(
        oemQueries.getIndex({
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
        FROM Oems
        WHERE LOWER(Oems.name) LIKE '%abcd%'
        ORDER BY some_column DESC
        LIMIT 10
        OFFSET 30;
      `
      expect(
        oemQueries.getIndex({
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
        FROM Oems
        WHERE LOWER(Oems.name) LIKE '%abcd%';
      `
      expect(
        oemQueries.getIndexCount({
          searchValue: 'ABCD',
        }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('update', () => {
    it('embeds id and name into query', () => {
      const expected = `
        UPDATE Oems
        SET name = 'OEM 1'
        WHERE Oems.id = 3;
      `
      expect(
        oemQueries.update({ name: 'OEM 1', id: 3 }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('create', () => {
    it('embeds name into query', () => {
      const expected = `
        INSERT INTO Oems (name)
        VALUES ('OEM 1');
      `
      expect(oemQueries.create({ name: 'OEM 1' })).toMatchWithoutWhitespace(
        expected,
      )
    })
  })

  describe('deleteById', () => {
    it('embeds id into query', () => {
      const expected = `
        DELETE FROM Oems
        WHERE Oems.id = 4;
      `
      expect(oemQueries.deleteById({ id: 4 })).toMatchWithoutWhitespace(
        expected,
      )
    })
  })
})
