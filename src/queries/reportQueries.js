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
