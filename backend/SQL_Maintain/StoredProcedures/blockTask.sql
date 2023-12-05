USE Maintain_Database;
DROP procedure IF EXISTS block_task
DELIMITER //

CREATE PROCEDURE block_task (
IN taskID_p	INT,
IN propertyID_p	INT,
OUT message_res VARCHAR (45)
)
	
BEGIN
	DECLARE sql_error 		TINYINT DEFAULT FALSE;
    
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
		SET sql_error = TRUE;
        
	START TRANSACTION;
        
	INSERT INTO blockedTasks (taskID, propertyID) VALUES (taskID_p, propertyID_p);
    DELETE FROM userTaskList WHERE taskID = taskID_p AND propertyID = propertyID_p;
    
    IF sql_error = FALSE THEN
		COMMIT;
        SET message_res= 'Task blocked';
	ELSE 
		ROLLBACK;
        SET message_res= 'Block Error. Task still active.propertyTaskView';
	END IF;     
	
END//

DELIMITER ;

USE Maintain_Database;
CALL remove_appliance(672, @message_res);


SELECT propertyAddress, propertyApplianceID, applianceType, applianceID FROM applianceView;
DELETE FROM userTaskList WHERE propertyApplianceID = 673;
DELETE FROM propertyAppliances WHERE propertyApplianceID = 673;

