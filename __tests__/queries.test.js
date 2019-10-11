const queries = require('../src/queries')

expect.extend({
  toMatchWithoutWhitespace(received, expected) {
    const receivedFiltered = received.replace(/\s+/g, ' ')
    const expectedFiltered = expected.replace(/\s+/g, ' ')
    if (receivedFiltered == expectedFiltered) {
      return {
        message: () =>
          `expected ${receivedFiltered} not to match ${expectedFiltered}`,
        pass: true,
      }
    } else {
      return {
        message: () =>
          `expected ${receivedFiltered} to match ${expectedFiltered}`,
        pass: false,
      }
    }
  },
})

describe('Queries', () => {
  describe('deleteEventsByEquipmentId', () => {
    it('embeds equipmentId as id into query', () => {
      const expected = `
        DELETE FROM Events
        WHERE equipment_id = 4;
      `
      expect(
        queries.deleteEventsByEquipmentId({ id: 4 }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('deleteEquipmentById', () => {
    it('embeds id into query', () => {
      const expected = `
        DELETE FROM Equipments
        WHERE Equipments.id = 4;
      `
      expect(queries.deleteEquipmentById({ id: 4 })).toMatchWithoutWhitespace(
        expected,
      )
    })
  })

  describe('deleteModelById', () => {
    it('embeds id into query', () => {
      const expected = `
        DELETE FROM Models
        WHERE Models.id = 4;
      `
      expect(queries.deleteModelById({ id: 4 })).toMatchWithoutWhitespace(
        expected,
      )
    })
  })

  describe('deleteOemById', () => {
    it('embeds id into query', () => {
      const expected = `
        DELETE FROM Oems
        WHERE Oems.id = 4;
      `
      expect(queries.deleteOemById({ id: 4 })).toMatchWithoutWhitespace(
        expected,
      )
    })
  })

  describe('deleteTypeById', () => {
    it('embeds id into query', () => {
      const expected = `
        DELETE FROM Types
        WHERE Types.id = 4;
      `
      expect(queries.deleteTypeById({ id: 4 })).toMatchWithoutWhitespace(
        expected,
      )
    })
  })

  describe('getEquipmentShow', () => {
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
      expect(queries.getEquipmentShow({ id: 4 })).toMatchWithoutWhitespace(
        expected,
      )
    })
  })

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
        queries.getEventsByEquipmentId({
          id: 4,
          sortBy: 'some_column',
          ascending: false,
          perPage: 10,
          page: 3,
        }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('getEquipmentIndex', () => {
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
        queries.getEquipmentIndex({
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
        queries.getEquipmentIndex({
          sortBy: 'some_column',
          ascending: false,
          perPage: 10,
          page: 3,
          searchValue: 'ABCD',
        }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('getEquipmentIndexCount', () => {
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
        queries.getEquipmentIndexCount({
          searchValue: 'ABCD',
        }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('getModelsIndex', () => {
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
        queries.getModelsIndex({
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
        queries.getModelsIndex({
          sortBy: 'some_column',
          ascending: false,
          perPage: 10,
          page: 3,
          searchValue: 'ABCD',
        }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('getModelsIndexCount', () => {
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
        queries.getModelsIndexCount({
          searchValue: 'ABCD',
        }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('getOemsIndex', () => {
    it('properly uses sorting and pagination options', () => {
      const expected = `
        SELECT id, name
        FROM Oems
        ORDER BY some_column DESC
        LIMIT 10
        OFFSET 30;
      `
      expect(
        queries.getOemsIndex({
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
        queries.getOemsIndex({
          sortBy: 'some_column',
          ascending: false,
          perPage: 10,
          page: 3,
          searchValue: 'ABCD',
        }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('getOemsIndexCount', () => {
    it('properly uses searchValue if given', () => {
      const expected = `
        SELECT COUNT(*)
        FROM Oems
        WHERE LOWER(Oems.name) LIKE '%abcd%';
      `
      expect(
        queries.getOemsIndexCount({
          searchValue: 'ABCD',
        }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('getTypesShow', () => {
    it('embeds name into query', () => {
      const expected = `
        SELECT id, name
        FROM Types
        WHERE Types.id = 3;
      `
      expect(queries.getTypesShow({ id: 3 })).toMatchWithoutWhitespace(expected)
    })
  })

  describe('getTypesIndex', () => {
    it('properly uses sorting and pagination options', () => {
      const expected = `
        SELECT id, name
        FROM Types
        ORDER BY some_column DESC
        LIMIT 10
        OFFSET 30;
      `
      expect(
        queries.getTypesIndex({
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
        queries.getTypesIndex({
          sortBy: 'some_column',
          ascending: false,
          perPage: 10,
          page: 3,
          searchValue: 'ABCD',
        }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('getTypesIndexCount', () => {
    it('properly uses searchValue if given', () => {
      const expected = `
        SELECT COUNT(*)
        FROM Types
        WHERE LOWER(Types.name) LIKE '%abcd%';
      `
      expect(
        queries.getTypesIndexCount({
          searchValue: 'ABCD',
        }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('updateType', () => {
    it('embeds id and name into query', () => {
      const expected = `
        UPDATE Types
        SET Types.name = 'Type 1'
        WHERE Types.id = 3;
      `
      expect(
        queries.updateType({ name: 'Type 1', id: 3 }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('createEquipment', () => {
    it('embeds serialNumber, modelId, and typeId into query', () => {
      const expected = `
        INSERT INTO Equipments (serial_number, model_id, type_id)
        VALUES ('123', 3, 4);
      `
      expect(
        queries.createEquipment({ serialNumber: '123', modelId: 3, typeId: 4 }),
      ).toMatchWithoutWhitespace(expected)
    })

    it('embeds notes into query if given', () => {
      const expected = `
        INSERT INTO Equipments (serial_number, model_id, type_id, notes)
        VALUES ('123', 3, 4, 'Some Notes');
      `
      expect(
        queries.createEquipment({
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
        queries.createEquipment({
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
        queries.createEquipment({
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
        queries.createEquipment({
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

  describe('findEquipmentIdBySerialNumber', () => {
    it('embeds serialNumber into query', () => {
      const expected = `
        SELECT *
        FROM Equipments
        WHERE Equipments.serial_number = '123';
      `
      expect(
        queries.findEquipmentIdBySerialNumber({ serialNumber: '123' }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('createEvents', () => {
    it('embeds equipmentId and status into query', () => {
      const expected = `
        INSERT INTO Events (equipment_id, status)
        VALUES (3, 'IN');
      `
      expect(
        queries.createEvent({ equipmentId: 3, status: 'IN' }),
      ).toMatchWithoutWhitespace(expected)
    })

    it('embeds jobNumber into query if given', () => {
      const expected = `
        INSERT INTO Events (equipment_id, status, job_number)
        VALUES (3, 'IN', '123');
      `
      expect(
        queries.createEvent({ equipmentId: 3, status: 'IN', jobNumber: '123' }),
      ).toMatchWithoutWhitespace(expected)
    })

    it('embeds companyNotes into query if given', () => {
      const expected = `
        INSERT INTO Events (equipment_id, status, company_notes)
        VALUES (3, 'IN', 'Some Notes');
      `
      expect(
        queries.createEvent({
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
        queries.createEvent({
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
        queries.createEvent({
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
        queries.createEvent({
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
        queries.createEvent({
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

  describe('createModel', () => {
    it('embeds name and oemId into query', () => {
      const expected = `
        INSERT INTO Models (name, oem_id)
        VALUES ('Model 1', 3);
      `
      expect(
        queries.createModel({ name: 'Model 1', oemId: 3 }),
      ).toMatchWithoutWhitespace(expected)
    })
  })

  describe('createOem', () => {
    it('embeds name into query', () => {
      const expected = `
        INSERT INTO Oems (name)
        VALUES ('OEM 1');
      `
      expect(queries.createOem({ name: 'OEM 1' })).toMatchWithoutWhitespace(
        expected,
      )
    })
  })

  describe('createType', () => {
    it('embeds name into query', () => {
      const expected = `
        INSERT INTO Types (name)
        VALUES ('Type 1');
      `
      expect(queries.createType({ name: 'Type 1' })).toMatchWithoutWhitespace(
        expected,
      )
    })
  })
})
