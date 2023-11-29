USE Maintain_Database;
DROP procedure IF EXISTS add_propertyAppliance;

DELIMITER //
-- userID< propertyId, applianceType, serialNumber, purchaseDate, warrantyLength, manufacturer, model, @propertyApplianceID_p
CREATE PROCEDURE add_propertyAppliance (
IN userID_p					INT,
IN propertyID_p				INT,
IN applianceType_p			VARCHAR(45),
IN serialNumber_p			VARCHAR(45),
IN purchaseDate_p			DATETIME,
IN warrantyLength_p			INT,
IN manufacturer_p			VARCHAR(45),
IN model_p					VARCHAR(45),
OUT propertyApplianceID_p		INT)
	
BEGIN
	DECLARE rowsAffected			INT;
    DECLARE applianceID_p			INT;
    DECLARE propertyApplianceID_p 	INT;
    
    -- If it's a new appliance type, add it.
	INSERT IGNORE INTO appliances (applianceType) 
    VALUES (applianceType_p);
    
    SELECT ROW_COUNT() INTO rowsAffected;
    
    IF rowsAffected > 0 THEN
		SET applianceID_p =  LAST_INSERT_ID();
	ELSE
		SELECT applianceID INTO applianceID_p FROM appliances WHERE applianceType = applianceType_p;
	END IF;
    
    -- Add the appliance
    INSERT INTO propertyAppliances (propertyID, applianceID, serialNumber, purchaseDate, warrantyLength, manufacturer, model, applianceType) VALUES
    (propertyID_p, applianceID_p, serialNumber_p, purchaseDate_p, warrantyLength_p, manufacturer_p, model_p, applianceType_p);
	SET propertyApplianceID_p = LAST_INSERT_ID();
     
    -- Add appliance tasks to usertasklist
	INSERT INTO userTaskList (userID, propertyID, taskID, dueDate, propertyFeaturesID, propertyApplianceID)
		SELECT
				userID_p as userID,
				propertyID_p as propertyID,
				taskID,
                NOW() as dueDate,
                NULL,
                propertyApplianceID_p
			FROM applianceTasks WHERE applianceID = applianceID_p;
            
END//

DELIMITER ;

