const equipmentQueries = require('../equipmentQueries')
const customMatchers = require('../../customMatchers.js')

expect.extend(customMatchers.matchers)

describe('equipmentQueries', () => {
  describe('getShow', () => {
    it('embeds id into query', () => {
      const expected = `
        SELECT
          RecentEvents.id AS event_id,
          RecentEvents.status AS event_status,
          RecentEvents.job_number AS event_job_number,
          RecentEvents.company_notes AS event_company_notes,
          RecentEvents.start_date AS event_start_date,
          RecentEvents.end_date AS event_end_date,
          Equipments.id AS id,
          Equipments.serial_number,
          Equipments.notes,
          Equipments.cal_company,
          Equipments.cal_due,
          Types.id AS type_id,
          Types.name AS type_name,
          Models.id AS model_id,
          Models.name AS model_name,
          Oems.id AS oem_id,
          Oems.name AS oem_name
        FROM RecentEvents
        INNER JOIN Equipments ON Equipments.id = RecentEvents.equipment_id
        INNER JOIN Types ON Equipments.type_id = Types.id
        INNER JOIN Models ON Equipments.model_id = Models.id
        INNER JOIN Oems ON Models.oem_id = Oems.id
        WHERE Equipments.id = 4;
      `
      expect(equipmentQueries.getShow({ id: 4 })).toMatchWithoutWhitespace(
        expected,
      )
    })
  })

  describe('getIndex', () => {
    it('properly uses sorting and pagination options', () => {
      const expected = `
        SELECT
          RecentEvents.id AS event_id,
          RecentEvents.status AS event_status,
          RecentEvents.job_number AS event_job_number,
          RecentEvents.company_notes AS event_company_notes,
          RecentEvents.start_date AS event_start_date,
          RecentEvents.end_date AS event_end_date,
          Equipments.id AS id,
          Equipments.serial_number,
          Equipments.notes,
          Equipments.cal_company,
          Equipments.cal_due,
          Types.id AS type_id,
          Types.name AS type_name,
          Models.id AS model_id,
          Models.name AS model_name,
          Oems.id AS oem_id,
          Oems.name AS oem_name
        FROM RecentEvents
        INNER JOIN Equipments ON Equipments.id = RecentEvents.equipment_id
        INNER JOIN Types ON Equipments.type_id = Types.id
        INNER JOIN Models ON Equipments.model_id = Models.id
        INNER JOIN Oems ON Models.oem_id = Oems.id
        ORDER BY some_column DESC
        LIMIT 10
        OFFSET 30;
      `
      expect(
        equipmentQueries.getIndex({
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
          RecentEvents.id AS event_id,
          RecentEvents.status AS event_status,
          RecentEvents.job_number AS event_job_number,
          RecentEvents.company_notes AS event_company_notes,
          RecentEvents.start_date AS event_start_date,
          RecentEvents.end_date AS event_end_date,
          Equipments.id AS id,
          Equipments.serial_number,
          Equipments.notes,
          Equipments.cal_company,
          Equipments.cal_due,
          Types.id AS type_id,
          Types.name AS type_name,
          Models.id AS model_id,
          Models.name AS model_name,
          Oems.id AS oem_id,
          Oems.name AS oem_name
        FROM RecentEvents
        INNER JOIN Equipments ON Equipments.id = RecentEvents.equipment_id
        INNER JOIN Types ON Equipments.type_id = Types.id
        INNER JOIN Models ON Equipments.model_id = Models.id
        INNER JOIN Oems ON Models.oem_id = Oems.id
        WHERE LOWER(Equipments.serial_number) LIKE '%abcd%'
          OR LOWER(Oems.name) LIKE '%abcd%'
          OR LOWER(Models.name) LIKE '%abcd%'
          OR LOWER(Types.name) LIKE '%abcd%'
        ORDER BY some_column DESC
        LIMIT 10
        OFFSET 30;
      `
      expect(
        equipmentQueries.getIndex({
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
        FROM RecentEvents
        INNER JOIN Equipments ON Equipments.id = RecentEvents.equipment_id
        INNER JOIN Types ON Equipments.type_id = Types.id
        INNER JOIN Models ON Equipments.model_id = Models.id
        INNER JOIN Oems ON Models.oem_id = Oems.id
        WHERE LOWER(Equipments.serial_number) LIKE '%abcd%'
          OR LOWER(Oems.name) LIKE '%abcd%'
          OR LOWER(Models.name) LIKE '%abcd%'
          OR LOWER(Types.name) LIKE '%abcd%'
        ;
      `
      expect(
        equipmentQueries.getIndexCount({
          searchValue: 'ABCD',
        }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('update', () => {
    it('embeds all fields into query', () => {
      const expected = `
        UPDATE Equipments
        SET
          serial_number = '123',
          notes = '',
          cal_company = 'Some Company',
          cal_due = '01/01/2019',
          type_id = 4,
          model_id = 5
        WHERE Equipments.id = 3;
      `
      expect(
        equipmentQueries.update({
          id: 3,
          serialNumber: '123',
          notes: '',
          calCompany: 'Some Company',
          calDue: '01/01/2019',
          typeId: 4,
          modelId: 5,
        }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('create', () => {
    it('embeds serialNumber, modelId, and typeId into query', () => {
      const expected = `
        INSERT INTO Equipments (serial_number, model_id, type_id)
        VALUES ('123', 3, 4);
      `
      expect(
        equipmentQueries.create({ serialNumber: '123', modelId: 3, typeId: 4 }),
      ).toMatchWithoutWhitespace(expected)
    })

    it('embeds notes into query if given', () => {
      const expected = `
        INSERT INTO Equipments (serial_number, model_id, type_id, notes)
        VALUES ('123', 3, 4, 'Some Notes');
      `
      expect(
        equipmentQueries.create({
          serialNumber: '123',
          modelId: 3,
          typeId: 4,
          notes: 'Some Notes',
        }),
      ).toMatchWithoutWhitespace(expected)
    })

    it('embeds calCompany into query if given', () => {
      const expected = `
        INSERT INTO Equipments (serial_number, model_id, type_id, cal_company)
        VALUES ('123', 3, 4, 'Some Company');
      `
      expect(
        equipmentQueries.create({
          serialNumber: '123',
          modelId: 3,
          typeId: 4,
          calCompany: 'Some Company',
        }),
      ).toMatchWithoutWhitespace(expected)
    })

    it('embeds calCompany into query if given', () => {
      const expected = `
        INSERT INTO Equipments (serial_number, model_id, type_id, cal_due)
        VALUES ('123', 3, 4, '01/01/19');
      `
      expect(
        equipmentQueries.create({
          serialNumber: '123',
          modelId: 3,
          typeId: 4,
          calDue: '01/01/19',
        }),
      ).toMatchWithoutWhitespace(expected)
    })

    it('embeds calCompany into query if given', () => {
      const expected = `
        INSERT INTO Equipments (serial_number, model_id, type_id, notes, cal_company, cal_due)
        VALUES ('123', 3, 4, 'Some Notes', 'Some Company', '01/01/19');
      `
      expect(
        equipmentQueries.create({
          serialNumber: '123',
          modelId: 3,
          typeId: 4,
          notes: 'Some Notes',
          calCompany: 'Some Company',
          calDue: '01/01/19',
        }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('deleteById', () => {
    it('embeds id into query', () => {
      const expected = `
        DELETE FROM Equipments
        WHERE Equipments.id = 4;
      `
      expect(equipmentQueries.deleteById({ id: 4 })).toMatchWithoutWhitespace(
        expected,
      )
    })
  })

  describe('findBySerialNumber', () => {
    it('embeds serialNumber into query', () => {
      const expected = `
        SELECT *
        FROM Equipments
        WHERE Equipments.serial_number = '123';
      `
      expect(
        equipmentQueries.findBySerialNumber({ serialNumber: '123' }),
      ).toMatchWithoutWhitespace(expected)
    })
  })
})
