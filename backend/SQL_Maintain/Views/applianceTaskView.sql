USE Maintain_Database;

CREATE OR REPLACE VIEW applianceTaskView AS
SELECT 
	t.description AS task,
	a.applianceType AS applianceType
FROM
	applianceTasks at JOIN appliances a ON(at.applianceID = a.applianceID)
	JOIN tasks t ON(at.taskID = t.taskID);
        
SELECT * FROM applianceTaskView;