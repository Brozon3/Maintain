USE Maintain_Database;
DROP procedure IF EXISTS update_features;

DELIMITER //

CREATE PROCEDURE update_features (
IN userID_p			INT,
IN propertyID_p		INT,
IN carpet_p			VARCHAR(45),
IN heating_p		VARCHAR(45),
IN roof_p			VARCHAR(45),
IN exterior_p		VARCHAR(45),
OUT message_res 	VARCHAR(45)
)
	
BEGIN
    DECLARE propertyFeaturesID_p 	INT;
	DECLARE sql_error TINYINT DEFAULT FALSE;
    
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
		SET sql_error = TRUE;
        
	START TRANSACTION;
		DELETE FROM userTaskList WHERE propertyID = propertyID_p AND propertyFeaturesID IS NOT NULL;
		DELETE FROM propertyFeatures WHERE propertyID = propertyID_p;
        
        IF carpet_p = 'Yes' THEN
            CALL insert_feature_task(userID_p, propertyID_p, 'carpet', propertyFeaturesID_p);
            
		END IF;
		IF heating_p IS NOT NULL THEN
			CALL insert_feature_task(userID_p, propertyID_p, heating_p, propertyFeaturesID_p);

		END IF;
		IF roof_p IS NOT NULL THEN
			CALL insert_feature_task(userID_p, propertyID_p, roof_p, propertyFeaturesID_p);
			
		END IF;
		IF exterior_p IS NOT NULL THEN
			CALL insert_feature_task(userID_p, propertyID_p, exterior_p, propertyFeaturesID_p);
            SET message_res = propertyFeaturesID_p;
		END IF;
        
    IF sql_error = FALSE THEN
		COMMIT;
        SET message_res = 'Property Features Updated';
        SELECT message_res;
	ELSE 
		ROLLBACK;
        -- SET message_res= 'Update error. Property features not updated';
        SELECT message_res;
        
	END IF;    

END//

DELIMITER ;
USE Maintain_Database;
SELECT * FROM userPropertyView WHERE userID = 69;
SET @propertyID = 422;
SET @userID = 69;
SELECT * FROM featureView WHERE propertyID = @propertyID;
SELECT * FROM propertyFeatures WHERE propertyID = @propertyID;
SELECT * FROM userTaskList WHERE propertyID = @propertyID;
DELETE FROM userTaskList WHERE propertyID = @propertyID AND propertyFeaturesID IS NOT NULL;
DELETE FROM propertyFeatures WHERE propertyID = @propertyID;
CALL update_features(@userID, @propertyID, 'YES', 'heating_electric', 'roof_shingles', 'exterior_vinyl', @message_res);

CALL insert_feature_task(@userID, @propertyID, 'roof_shingles', @propertyFeaturesID_p);




