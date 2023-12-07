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

SELECT * FROM properties;
SET @ID = 365;
SELECT * FROM properties WHERE propertyID = @ID;

DELETE FROM userProperty WHERE propertyID = @ID;
DELETE FROM propertyFeatures WHERE propertyID = @ID;
DELETE FROM propertyTasks WHERE propertyID = @ID;
DELETE FROM userTaskList WHERE propertyID = @ID;

DELETE FROM propertyAppliances WHERE propertyID = @ID;

DELETE FROM properties WHERE propertyID = @ID;

SELECT * FROM properties WHERE propertyID = @ID;

Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails (`Maintain_Database`.`taskLog`, CONSTRAINT `propertyID_fk02` FOREIGN KEY (`propertyID`) REFERENCES `properties` (`propertyID`))

CALL remove_property(@ID, @message_res);

