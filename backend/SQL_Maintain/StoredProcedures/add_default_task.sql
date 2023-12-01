
USE Maintain_Database;
DROP procedure IF EXISTS add_default_task;

DELIMITER //

CREATE PROCEDURE add_default_task (
	IN description_p			VARCHAR(500),
	IN defaultDate_p			VARCHAR(50),
	IN frequency_p				VARCHAR(45)
	)
BEGIN
	DECLARE rowsAffected INT;
    DECLARE taskID_p INT;
    
	INSERT INTO tasks (description, frequency, defaultDate) 
    VALUES (description_p, frequency_p, defaultDate_p);
    
    SELECT ROW_COUNT() INTO rowsAffected;
    
    IF rowsAffected > 0 THEN
		SET taskID_p =  LAST_INSERT_ID();
	ELSE
		SELECT taskID INTO taskID_p FROM tasks WHERE description = description_p;
        
	END IF;
    
    INSERT INTO defaultTasks (taskID) VALUES (taskID_p);
    
END//

DELIMITER ;