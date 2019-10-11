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
