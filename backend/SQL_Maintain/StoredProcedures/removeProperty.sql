USE Maintain_Database;
DROP procedure IF EXISTS remove_property;

DELIMITER //

CREATE PROCEDURE remove_property (
IN propertyID_p	INT,
OUT message_res VARCHAR(45)
)
	
BEGIN

	DECLARE sql_error TINYINT DEFAULT FALSE;
    
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
		SET sql_error = TRUE;
        
	START TRANSACTION;
	DELETE FROM userProperty WHERE propertyID = propertyID_p;
	DELETE FROM propertyFeatures WHERE propertyID = propertyID_p;
	DELETE FROM propertyTasks WHERE propertyID = propertyID_p;
	DELETE FROM userTaskList WHERE propertyID = propertyID_p;
	DELETE FROM propertyAppliances WHERE propertyID = propertyID_p;
    DELETE FROM properties WHERE propertyID = propertyID_p;
    
    IF sql_error = FALSE THEN
		COMMIT;
        DELETE FROM properties WHERE propertyID = propertyID_param;
        SET message_res = 'Property Removed';
	ELSE 
		ROLLBACK;
        SELECT 'Deletion Failed';
        SET message_res= 'Deletion error. Property not deleted.';
	END IF;    

END//

DELIMITER ;

SET @ID = 363;
SELECT * FROM properties WHERE propertyID = @ID;
DELETE FROM userProperty WHERE propertyID = @ID;
DELETE FROM propertyFeatures WHERE propertyID = @ID;
DELETE FROM propertyTasks WHERE propertyID = @ID;
DELETE FROM userTaskList WHERE propertyID = @ID;
DELETE FROM propertyAppliances WHERE propertyID = @ID;
DELETE FROM properties WHERE propertyID = @ID;


CALL remove_property(@ID, @message_res);

