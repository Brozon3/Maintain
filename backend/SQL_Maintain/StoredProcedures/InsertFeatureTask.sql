USE Maintain_Database;
DROP procedure IF EXISTS insert_feature_task;

DELIMITER //

CREATE PROCEDURE insert_feature_task (
IN userID_p					INT,
IN propertyID_p				VARCHAR(45),
IN featureType_p			VARCHAR(45),
OUT propertyFeaturesID_p	VARCHAR(45))
	
BEGIN
    DECLARE addFeatureID		INT;
    
    SELECT featureID INTO addFeatureID
	FROM features 
    WHERE featureType = featureType_p;
    
    INSERT INTO propertyFeatures (propertyID, featureID) VALUES (propertyID_p, addFeatureID);
    
    SET propertyFeaturesID_p = LAST_INSERT_ID();

    INSERT INTO userTaskList (userID, propertyID, taskID, dueDate, propertyFeaturesID, propertyApplianceID)
        SELECT
            userID_p as userID,
            propertyID_p as propertyID,
            taskID,
            NOW(),
            propertyFeaturesID_p,
            NULL
        FROM featureTask WHERE featureID = addFeatureID;

END//

DELIMITER ;

