const eventQueries = require('../eventQueries.js')
const customMatchers = require('../../customMatchers.js')

expect.extend(customMatchers.matchers)

describe('eventQueries', () => {
  describe('getEventsByEquipmentId', () => {
    it('properly uses sorting and pagination options', () => {
      const expected = `
        SELECT
          id,
          status,
          job_number,
          company_notes,
          start_date,
          end_date,
          updated_at,
          equipment_id
        FROM Events
        WHERE equipment_id = 4
        ORDER BY some_column DESC
        LIMIT 10
        OFFSET 30;
      `
      expect(
        eventQueries.getByEquipmentId({
          id: 4,
          sortBy: 'some_column',
          ascending: false,
          perPage: 10,
          page: 3,
        }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('getEventsByEquipmentIdCount', () => {
    it('embeds equipmentId into query', () => {
      const expected = `
        SELECT COUNT(*)
        FROM Events
        WHERE equipment_id = 2
      `
      expect(
        eventQueries.getByEquipmentIdCount({ id: 2 }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('update', () => {
    it('embeds all fields into query', () => {
      const expected = `
        UPDATE Events
        SET
          status = 'IN',
          job_number = '123',
          company_notes = 'Some Notes',
          start_date = '01/01/2019',
          end_date = '02/01/2019',
          updated_at = '03/01/2019'
        WHERE Events.id = 3;
      `
      expect(
        eventQueries.update({
          id: 3,
          status: 'IN',
          jobNumber: '123',
          companyNotes: 'Some Notes',
          startDate: '01/01/2019',
          endDate: '02/01/2019',
          updatedAt: '03/01/2019',
        }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('create', () => {
    it('embeds equipmentId and status into query', () => {
      const expected = `
        INSERT INTO Events (equipment_id, status)
        VALUES (3, 'IN');
      `
      expect(
        eventQueries.create({ equipmentId: 3, status: 'IN' }),
      ).toMatchWithoutWhitespace(expected)
    })

    it('embeds jobNumber into query if given', () => {
      const expected = `
        INSERT INTO Events (equipment_id, status, job_number)
        VALUES (3, 'IN', '123');
      `
      expect(
        eventQueries.create({ equipmentId: 3, status: 'IN', jobNumber: '123' }),
      ).toMatchWithoutWhitespace(expected)
    })

    it('embeds companyNotes into query if given', () => {
      const expected = `
        INSERT INTO Events (equipment_id, status, company_notes)
        VALUES (3, 'IN', 'Some Notes');
      `
      expect(
        eventQueries.create({
          equipmentId: 3,
          status: 'IN',
          companyNotes: 'Some Notes',
        }),
      ).toMatchWithoutWhitespace(expected)
    })

    it('embeds startDate into query if given', () => {
      const expected = `
        INSERT INTO Events (equipment_id, status, start_date)
        VALUES (3, 'IN', '01/01/19');
      `
      expect(
        eventQueries.create({
          equipmentId: 3,
          status: 'IN',
          startDate: '01/01/19',
        }),
      ).toMatchWithoutWhitespace(expected)
    })

    it('embeds endDate into query if given', () => {
      const expected = `
        INSERT INTO Events (equipment_id, status, end_date)
        VALUES (3, 'IN', '01/01/19');
      `
      expect(
        eventQueries.create({
          equipmentId: 3,
          status: 'IN',
          endDate: '01/01/19',
        }),
      ).toMatchWithoutWhitespace(expected)
    })

    it('embeds updatedAt into query if given', () => {
      const expected = `
        INSERT INTO Events (equipment_id, status, updated_at)
        VALUES (3, 'IN', '01/01/19');
      `
      expect(
        eventQueries.create({
          equipmentId: 3,
          status: 'IN',
          updatedAt: '01/01/19',
        }),
      ).toMatchWithoutWhitespace(expected)
    })

    it('embeds multiple optional params into query if given', () => {
      const expected = `
        INSERT INTO Events (equipment_id, status, job_number, company_notes, start_date, end_date, updated_at)
        VALUES (3, 'IN', '123', 'Some Notes', '01/01/19', '02/01/19', '03/01/19');
      `
      expect(
        eventQueries.create({
          equipmentId: 3,
          status: 'IN',
          jobNumber: '123',
          companyNotes: 'Some Notes',
          startDate: '01/01/19',
          endDate: '02/01/19',
          updatedAt: '03/01/19',
        }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('deleteByEquipmentId', () => {
    it('embeds equipmentId as id into query', () => {
      const expected = `
        DELETE FROM Events
        WHERE equipment_id = 4;
      `
      expect(
        eventQueries.deleteByEquipmentId({ id: 4 }),
      ).toMatchWithoutWhitespace(expected)
    })
  })
})
