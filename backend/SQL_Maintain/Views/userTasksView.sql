USE Maintain_Database;
-- not currently used. See propertTaskView

CREATE VIEW userTasks AS
SELECT t.description, 
		utl.userID,
        p.address,
        a.applianceType,
        pa.model,
        pa.manufacturer,
        f.featureType,
        dueDate
FROM tasks t JOIN userTaskList utl ON(t.taskID = utl.taskID) 
JOIN properties p ON(p.propertyID = utl.propertyID)
JOIN propertyAppliances pa ON(pa.propertyID = p.propertyID)
JOIN appliances a ON(pa.applianceID = a.applianceID)
JOIN propertyFeatures pf ON(pf.propertyID = p.propertyID)
JOIN features f ON(pf.featureID = f.featureID);

SELECT * FROM userTasks;