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
	DELETE FROM userProperty WHERE propertyID = @propertyID_p;
	DELETE FROM propertyTasks WHERE propertyID = @propertyID_p;
	DELETE FROM userTaskList WHERE propertyID = @propertyID_p;
	DELETE FROM propertyFeatures WHERE propertyID = @propertyID_p;
	DELETE FROM propertyAppliances WHERE propertyID = @propertyID_p;
    
    IF sql_error = FALSE THEN
		COMMIT;
        SET message_res = 'Property Removed';
	ELSE 
		ROLLBACK;
        SELECT 'Deletion Failed';
        SET message_res= 'Deletion error. Property not deleted.';
	END IF;    

END//

DELIMITER ;
SET @propertyID_p = '404';
SELECT * FROM userPropertyView WHERE propertyID = @propertyID_p;
CALL remove_property(@propertyID_p, @message_res);

DELETE FROM userProperty WHERE propertyID = @propertyID_p;
DELETE FROM propertyTasks WHERE propertyID = @propertyID_p;
DELETE FROM userTaskList WHERE propertyID = @propertyID_p;
DELETE FROM propertyFeatures WHERE propertyID = @propertyID_p;
DELETE FROM propertyAppliances WHERE propertyID = @propertyID_p;


