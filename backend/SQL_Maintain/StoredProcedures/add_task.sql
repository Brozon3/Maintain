USE Maintain_Database;
DROP procedure IF EXISTS add_task;

DELIMITER //

CREATE PROCEDURE add_task (
IN description_p			VARCHAR(500),
IN dueDate_p				DATETIME,
IN userID_p					INT,
IN frequency_p				VARCHAR(45),
IN featureType_p			VARCHAR(45),
IN applianceType_p			VARCHAR(45),
IN propertyID_p				INT,
IN propertyApplianceID_p	INT,
IN propertyFeatureID_p		INT,
OUT message_res 			VARCHAR(255))
BEGIN
	DECLARE rowsAffected 	INT;
    DECLARE taskID_p		INT;
    DECLARE featureID_p		INT;
    DECLARE applianceID_p	INT;
    
    -- Insert the new task and set the task ID. If the description already exists, get the existing task ID.
	INSERT INTO tasks (description, frequency) 
    VALUES (description_p, frequency_p);
    
    SELECT ROW_COUNT() INTO rowsAffected;
    
    IF rowsAffected > 0 THEN
		SET taskID_p =  LAST_INSERT_ID();
	ELSE
		SELECT taskID INTO taskID_p FROM tasks WHERE description = description_p;
	END IF;
    
    -- Add the task to the relevant applianceTask, featureTask or propertyTask table
    IF applianceType_p IS NOT NULL THEN
		SELECT applianceID INTO applianceID_p from appliances where applianceType = applianceType_p;
        INSERT INTO applianceTasks (applianceID, taskID) VALUES (applianceID_p, taskID_p);
        SET message_res = CONCAT(" appliance task added ");
	ELSEIF featureType_p IS NOT NULL THEN
		SELECT featureID INTO featureID_p from features where featureType = featureType_p;
        INSERT INTO featureTask (featureID, taskID) VALUES (featureID_p, taskID_p);
        SET message_res = CONCAT(message_res, "propertyFeature task added");
	ELSEIF propertyID_p IS NOT NULL THEN
		INSERT INTO propertyTasks (propertyID, taskID) VALUES (propertyID_p, taskID_p);
		SET message_res = CONCAT(message_res, "property task added");
	ELSEIF userID_p IS NOT NULL THEN
		IF dueDate_p IS NULL THEN
			SET dueDate_p = NOW();
		END IF;
		INSERT INTO userTaskList (userID, propertyID, taskID, propertyFeatureID, propertyApplianceID, dueDate) VALUES
        (userID_p, propertyID_p, taskID_p, propertyFeatureID_p, propertyApplianceID_p, dueDate_p);
        SET message_res = CONCAT(message_res, "item added to user task list.");
		
	END IF;
     
END//

DELIMITER ;

