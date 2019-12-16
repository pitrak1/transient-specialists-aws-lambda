exports.getItemGroups = () => `
  SELECT id FROM ItemGroups;
`

exports.getCount = id => `
  SELECT MIN(Counts.count)
  FROM (
    SELECT COUNT(*), ItemGroupsModels.model_id
    FROM Equipments
    INNER JOIN ItemGroupsModels ON Equipments.model_id = ItemGroupsModels.model_id
    LEFT JOIN RecentEvents ON Equipments.id = RecentEvents.equipment_id
    WHERE ItemGroupsModels.item_group_id = ${id} AND (RecentEvents.status = 'READY' OR RecentEvents.status = 'IN')
    GROUP BY ItemGroupsModels.model_id
  ) AS Counts;
`

exports.getHandles = id => `
  SELECT handle
  FROM Handles
  WHERE item_group_id = ${id};
`
