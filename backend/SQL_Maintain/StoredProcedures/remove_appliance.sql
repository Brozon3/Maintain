USE Maintain_Database;
DROP procedure IF EXISTS remove_appliance;

DELIMITER //

CREATE PROCEDURE remove_appliance (
IN propertyApplianceID_p	INT,
OUT message_res VARCHAR(45)
)
	
BEGIN
	DECLARE sql_error 		TINYINT DEFAULT FALSE;
    
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
		SET sql_error = TRUE;
        
	START TRANSACTION;
        
	DELETE FROM userTaskList WHERE propertyApplianceID = propertyApplianceID_p;
	DELETE FROM propertyAppliances WHERE propertyApplianceID = propertyApplianceID_p;
    
    IF sql_error = FALSE THEN
		COMMIT;
        SET message_res = 'Appliance Removed';
	ELSE 
		ROLLBACK;
        SELECT 'Deletion Failed';
        SET message_res= 'Deletion error. Appliance not deleted.';
	END IF;     
	
END//

DELIMITER ;

USE Maintain_Database;
CALL remove_appliance(672, @message_res);


SELECT propertyAddress, propertyApplianceID, applianceType, applianceID FROM applianceView;
DELETE FROM userTaskList WHERE propertyApplianceID = 673;
DELETE FROM propertyAppliances WHERE propertyApplianceID = 673;

