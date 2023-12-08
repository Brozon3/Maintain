USE Maintain_Database;
DROP procedure IF EXISTS add_property;

DELIMITER //

CREATE PROCEDURE add_property (
IN userID_param				INT,
IN address_param			VARCHAR(45),
IN city_param				VARCHAR(45),
IN prov_param				VARCHAR(45),
IN carpet_param				TINYINT,
IN heating_param			VARCHAR(45),
IN pets_param				TINYINT,
IN propertyType_param		VARCHAR(45),
IN roof_param				VARCHAR(45),
OUT propertyID_res 			INT,
OUT message_res 			VARCHAR(45))
	
BEGIN
	DECLARE propertyExists		INT;
    DECLARE addFeatureID		INT;
    DECLARE dueDate_p 			DATETIME;
    DECLARE propertyFeaturesID_p	INT;
    
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
        SET message_res = 'Could not add property.';
        
	START TRANSACTION;
    
		SELECT COUNT(*)
		INTO propertyExists FROM properties
		WHERE address = address_param
				AND city = city_param
				AND prov = prov_param;
			
			IF propertyExists > 0 THEN
				SET message_res = "Property already exists";
			ELSE
				INSERT IGNORE INTO properties (address, city, prov, type, date_added)
				VALUES (address_param, city_param, prov_param, propertyType_param, NOW());
				
				SET propertyID_res = LAST_INSERT_ID();
				
                -- Insert feature tasks
				IF carpet_param = 1 THEN
					CALL insert_feature_task(userID_param, propertyID_res, 'carpet', propertyFeaturesID_p);                    
				ELSEIF heating_param IS NOT NULL THEN
					CALL insert_feature_task(userID_param, propertyID_res, heating_param, propertyFeaturesID_p);
				ELSEIF roof_param IS NOT NULL THEN
					CALL insert_feature_task(userID_param, propertyID_res, roof_param, propertyFeaturesID_p);
				
                END IF;
				-- Insert default tasks
               INSERT INTO userTaskList (userID, propertyID, taskID, dueDate, propertyFeaturesID, propertyApplianceID)
	SELECT
		userID_param as userID,
		propertyID_res as propertyID,
		t.taskID,
		CASE
			WHEN defaultDate IS NOT NULL THEN
				CASE
					WHEN STR_TO_DATE(CONCAT(YEAR(NOW()), '-', defaultDate), '%Y-%m-%d') < CURDATE() THEN
						STR_TO_DATE(CONCAT(YEAR(NOW()) + 1, '-', defaultDate), '%Y-%m-%d')
					ELSE
						STR_TO_DATE(CONCAT(YEAR(NOW()), '-', defaultDate), '%Y-%m-%d')
					END
			ELSE CURDATE()
		END AS dueDate,
		NULL,
		NULL
		FROM defaultTasks JOIN tasks t USING(taskID);
                
				INSERT INTO userProperty (userID, propertyID)
				VALUES (userID_param, propertyID_res);
				SET message_res = "Property added successfully";
				
			
			END IF;
            
    COMMIT;
    SET message_res = 'Property Added';

END//

DELIMITER ;
        
INSERT INTO userTaskList (userID, propertyID, taskID, dueDate, propertyFeaturesID, propertyApplianceID)
	SELECT
		69 as userID,
		300 as propertyID,
		t.taskID,
		CASE
			WHEN defaultDate IS NOT NULL THEN
				CASE
					WHEN STR_TO_DATE(CONCAT(YEAR(NOW()), '-', defaultDate), '%Y-%m-%d') < CURDATE() THEN
						STR_TO_DATE(CONCAT(YEAR(NOW()) + 1, '-', defaultDate), '%Y-%m-%d')
					ELSE
						STR_TO_DATE(CONCAT(YEAR(NOW()), '-', defaultDate), '%Y-%m-%d')
					END
			ELSE CURDATE()
		END AS dueDate,
		NULL,
		NULL
	FROM defaultTasks JOIN tasks t USING(taskID);
    
    SELECT * FROM propertyTaskView WHERE propertyID = 300;