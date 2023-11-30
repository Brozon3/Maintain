USE Maintain_Database;
DROP procedure IF EXISTS complete_task;

DELIMITER //

CREATE PROCEDURE complete_task (
IN entryID_p	INT)
	
BEGIN
	DECLARE dateCompleted_p			INT;
    DECLARE updatedDueDate_p 		DATE;
    DECLARE taskFrequency_p			VARCHAR(45);
    DECLARE frequencyValue_p		INT;
    DECLARE frequencyInterval_p		VARCHAR(45);
    DECLARE interval_p				INT;
    DECLARE sql_error 				TINYINT DEFAULT FALSE;
    
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
        SET sql_error= TRUE;
        
	START TRANSACTION;
    
    SET dateCompleted_p = NOW();
    
    -- Add task to task log
	INSERT INTO taskLog (userID, propertyID, task, propertyApplianceID, propertyFeaturesID, dateComplete)
	SELECT
		utl.userID,
		utl.propertyID,
		t.description,
		utl.propertyFeaturesID,
		utl.propertyApplianceID,
		NOW() AS dateComplete
	FROM userTaskList utl JOIN tasks t ON(utl.taskID = t.taskID)
	WHERE utl.entryID = entryID_p;
        
    -- SELECT frequency INTO taskFrequency_p FROM tasks t JOIN userTaskList WHERE taskID = entryID_p;
    
    SELECT t.frequency INTO taskFrequency_p 
    FROM tasks t JOIN userTaskList utl USING(taskID) 
    WHERE utl.entryID = entryID_p;
    
    -- if frequency, add to userTaskList with new dueDate
    IF taskFrequency_p IS NOT NULL THEN
		
		SET frequencyValue_p = SUBSTRING_INDEX(taskFrequency_p, ' ', 1);
        SET frequencyInterval_p = SUBSTRING_INDEX(taskFrequency_p, ' ', -1);
        
        SET @sql = CONCAT('SELECT DATE_ADD(NOW(), INTERVAL ', frequencyValue_p, ' ', frequencyInterval_p, ') INTO @updatedDueDate_p');
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
        
        -- SELECT @sql INTO updatedDueDate_p;
        
        SELECT @updatedDueDate_p;
        
        -- SELECT frequencyValue_p, updatedDueDate_p;
        
        INSERT INTO userTaskList(userID, propertyID, taskID, propertyFeaturesID, propertyApplianceID, dueDate)
			SELECT 
				userID,
				propertyID,
				taskID,
                propertyFeaturesID,
                propertyApplianceID,
				@updatedDueDate_p AS dueDate
			FROM userTaskList WHERE entryID = entryID_p;
	END IF;
    
    -- delete task
	DELETE FROM userTaskList WHERE entryID = entryID_p;
            
    COMMIT;

END//

DELIMITER ;


-- Testing
-- SELECT utl.entryID, utl.userID, utl.propertyID, utl.dueDate, t.description, t.frequency;

SELECT utl.entryID, utl.propertyID, t.description, t.frequency, utl.dueDate
FROM userTaskList utl JOIN tasks t USING(taskID);

SELECT * FROM tasks WHERE taskID = entryID_p;

SELECT * FROM userTaskList;
SELECT * FROM taskLog;
DELETE FROM taskLog;

CALL complete_task(70);


