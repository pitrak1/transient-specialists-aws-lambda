exports.getItemGroups = () => `
  SELECT id FROM ItemGroups;
`

exports.getCount = id => `
  SELECT MIN(Counts.count)
  FROM (
    SELECT COUNT(CASE WHEN (RecentEvents.status = 'READY' OR RecentEvents.status = 'IN') THEN 1 END), ItemGroupsModels.model_id
    FROM Equipments
    INNER JOIN ItemGroupsModels ON Equipments.model_id = ItemGroupsModels.model_id
    LEFT JOIN RecentEvents ON Equipments.id = RecentEvents.equipment_id
    WHERE ItemGroupsModels.item_group_id = ${id}
    GROUP BY ItemGroupsModels.model_id
  ) AS Counts;
`

exports.getHandles = id => `
  SELECT handle
  FROM Handles
  WHERE item_group_id = ${id};
`

exports.getEquipment = () => `
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
  RIGHT JOIN Equipments ON Equipments.id = RecentEvents.equipment_id
  INNER JOIN Types ON Equipments.type_id = Types.id
  INNER JOIN Models ON Equipments.model_id = Models.id
  INNER JOIN Oems ON Models.oem_id = Oems.id
`
