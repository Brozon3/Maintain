USE Maintain_Database;
DROP procedure IF EXISTS add_task;

DELIMITER //

CREATE PROCEDURE add_task (
IN description_p			VARCHAR(500),
IN dueDate_p				DATE,
IN userID_p					INT,
IN defaultDate_p			VARCHAR(45),
IN frequency_p				VARCHAR(45),
IN featureType_p			VARCHAR(45),
IN applianceType_p			VARCHAR(45),
IN propertyID_p				INT,
IN propertyApplianceID_p	INT,
IN propertyFeatureID_p		INT,
IN eventID_p				VARCHAR(45),
OUT message_res 			VARCHAR(255))
BEGIN
	DECLARE rowsAffected 	INT;
    DECLARE taskID_p		INT;
    DECLARE featureID_p		INT;
    DECLARE applianceID_p	INT;
    DECLARE fValue_p		VARCHAR(5);
    DECLARE fInterval_p		VARCHAR(45);
    
    SELECT DATE_FORMAT(dueDate_p, '%Y-%m-%d') INTO message_res;
    
    -- If the dueDate_p is null, construct if from defaultDate_p -- default date should be a string in the format of mm-dd
    IF dueDate_p IS NULL AND defaultDate_p IS NOT NULL THEN
		SET dueDate_p = STR_TO_DATE(
        IF(
            STR_TO_DATE(CONCAT(YEAR(NOW()), '-', defaultDate_p), '%Y-%m-%d') < CURDATE(),
				CONCAT(YEAR(NOW()) + 1, '-', defaultDate_p),
				CONCAT(YEAR(NOW()), '-', defaultDate_p)
        ),
        '%Y-%m-%d'
    );
		
    
    ELSEIF dueDate_p IS NULL AND frequency_p IS NOT NULL AND frequency_p <> 'Once' THEN
		SET fValue_p = SUBSTRING_INDEX(frequency_p, ' ', 1);
        SET fInterval_p = SUBSTRING_INDEX(frequency_p, ' ', -1);
        
        SET @sql = CONCAT('SELECT DATE_ADD(NOW(), INTERVAL ', fValue_p, ' ', fInterval_p, ') INTO @updatedDueDate_p');
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
        
        SET dueDate_p = @updatedDueDate_p;
	END IF;
		
    -- Insert the new task and set the task ID. If the description already exists, get the existing task ID.
	INSERT IGNORE INTO tasks (description, frequency, defaultDate)
    VALUES (description_p, frequency_p, defaultDate_p);
    
    SELECT ROW_COUNT() INTO rowsAffected;
    
    IF rowsAffected > 0 THEN
		SET taskID_p =  LAST_INSERT_ID();
	ELSE
		SELECT taskID INTO taskID_p FROM tasks WHERE description = description_p;
	END IF;
    
    -- Add the task to the relevant applianceTask, featureTask or propertyTask table
    IF applianceType_p IS NOT NULL AND userID_p is NULL THEN
		SELECT applianceID INTO applianceID_p from appliances where applianceType = applianceType_p;
        INSERT INTO applianceTasks (applianceID, taskID) VALUES (applianceID_p, taskID_p);
        SET message_res = CONCAT(" appliance task added ");
	END IF;
    
	IF featureType_p IS NOT NULL AND userID_p is NULL THEN
		SELECT featureID INTO featureID_p from features where featureType = featureType_p;
        INSERT INTO featureTask (featureID, taskID) VALUES (featureID_p, taskID_p);
        SET message_res = CONCAT(message_res, "propertyFeature task added");
	END IF;
    
	IF propertyID_p IS NOT NULL AND userID_p is NULL THEN
		INSERT INTO propertyTasks (propertyID, taskID) VALUES (propertyID_p, taskID_p);
		SET message_res = CONCAT(message_res, "property task added");
	END IF;
    
	IF userID_p IS NOT NULL THEN
		INSERT INTO userTaskList (userID, propertyID, taskID, propertyFeaturesID, propertyApplianceID, dueDate, eventID) VALUES
        (userID_p, propertyID_p, taskID_p, propertyFeatureID_p, propertyApplianceID_p, dueDate_p, eventID_p);
        SET message_res = CONCAT(message_res, "item added to user task list.");
	END IF;
     
END//

DELIMITER ;



