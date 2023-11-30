USE Maintain_Database;
DROP procedure IF EXISTS reset_users_properties;

DELIMITER //

CREATE PROCEDURE reset_users_properties ()
    
BEGIN
	DECLARE sql_error 	TINYINT DEFAULT FALSE;
	DECLARE userID_P 	INT;
	DECLARE propertyID 	INT;
	DECLARE message_res VARCHAR(255);
    
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
		SET sql_error = TRUE;
        
	START TRANSACTION;

		DELETE FROM userProperty;
		DELETE FROM userTaskList;
		DELETE FROM propertyAppliances;
		DELETE FROM propertyFeatures;
		DELETE FROM applianceTasks;
		DELETE FROM defaultTasks;
		DELETE FROM featureTask;
		DELETE FROM propertyTasks;
		DELETE FROM taskLog;
		DELETE FROM tasks;
		DELETE FROM appliances;
		DELETE FROM features;
		DELETE FROM properties;

		-- Create applianceTypes
		INSERT IGNORE INTO appliances (applianceType) VAlUES
			('oven'),
			('snowblower'),
			('clothes washing machine'),
			('clothes dryer'),
			('mini split'),
			('dishwasher'),
			('air conditioner'),
			('drying cabinet'),
			('freezer'),
			('refrigerator'),
			('woodstove'),
			('water heater'),
			('trash compactor'),
			('microwave oven'),
			('lawnmower'),
			('air fryer'),
			('vacuum cleaner'),
			('Heater'),
			('Water Cooler'),
			('oil furnace'),
			('HRV');

		-- Create featureType
		INSERT IGNORE INTO features (featureType) VAlUES
			("carpet"),
			("roof_metal"),
			("roof_shingles"),
			("heating_electric"),
			("heating_oil"),
			("exterior_vinyl"),
			("exterior_aluminum"),
			("exeterior_paint");

		-- Create feature and appliance tasks
		CALL add_task('Service the snowblower for winter.', NULL, NULL, "1 YEAR", NULL, "snowblower", NULL, NULL, NULL, @message_res);
		CALL add_task("Time to clean the dryer vent again.", NULL, NULL, "1 YEAR", NULL, "clothes dryer", NULL, NULL, NULL,@message_res);
		CALL add_task("Time to clean the oven", NULL, NULL, "1 MONTH", NULL, "oven", NULL, NULL, NULL, @message_res);
		CALL add_task("Inspect and clean indoor unit's air filter.", NULL, NULL, "1 MONTH", NULL, "mini split", NULL, NULL, NULL,@message_res);
		CALL add_task("Clean the dishwasher filter.", NULL, NULL, "1 MONTH", NULL, "dishwasher", NULL, NULL, NULL,@message_res);
		CALL add_task("Clean or replace your air filters", NULL, NULL, "3 MONTH", NULL, "air conditioner", NULL, NULL, NULL,@message_res);
		CALL add_task("Defrost the freezer", NULL, NULL, "1 YEAR", NULL, "freezer", NULL,NULL, NULL, @message_res);
		CALL add_task("Inspect and clean fridge coils.", NULL, NULL, "1 MONTH", NULL, "refrigerator", NULL, NULL, NULL,@message_res);
		CALL add_task("Inspect stovepipe and flue before fall.", NULL, NULL, "1 YEAR", NULL, "woodstove", NULL, NULL, NULL,@message_res);
		CALL add_task("Drain the tank and wash out sediment.", NULL, NULL, "1 YEAR", NULL, "water heater", NULL, NULL, NULL,@message_res);
		CALL add_task("Clean  the trash compactor.", NULL, NULL, "1 MONTH", NULL, "trash compactor", NULL, NULL, NULL,@message_res);
		CALL add_task("Deep clean the microwave", NULL, NULL, "6 MONTH", NULL, "microwave oven", NULL, NULL, NULL,@message_res);
		CALL add_task("Check the oil and sparkplugs.", NULL, NULL, "1 YEAR", NULL, "lawnmower", NULL,NULL, NULL, @message_res);
		CALL add_task("No real regular maintenance, just keep it clean.", NULL, NULL, "1 MONTH", NULL, "air fryer", NULL, NULL, NULL,@message_res);
		CALL add_task("Empty the bag/dump debris.", NULL, NULL, "1 MONTH", NULL, "vacuum cleaner", NULL, NULL, NULL,@message_res);
		CALL add_task("Contact your provider for annual maintenance", NULL, NULL, "1 YEAR", NULL, "oil furnace", NULL, NULL, NULL,@message_res);
		CALL add_task("Clean the gutters and check the shingles", NULL, NULL, "1 YEAR", "roof_shingles", NULL, NULL, NULL, NULL, @message_res);
		CALL add_task("Clean the gutters.", NULL, NULL, "1 YEAR", "roof_metal", NULL, NULL, NULL, NULL, @message_res);
		
		-- Create default tasks added to all new properties
		CALL add_default_task("Test smoke alarms and replace batteries", "1 YEAR");
		CALL add_default_task("Property walk-through and inspection", "1 YEAR");
		CALL add_default_task("Winter is coming! Time to bring in the patio furniture,", "1 YEAR");
		CALL add_default_task("Safety first! Check fire alarms and fire exthinguishers.", "6 MONTH");
		CALL add_default_task("They help us stay clean but get dirty in the process. Time to scrub the tub.", "1 MONTH");
		CALL add_default_task("Clean the house before NYE party.", "2 YEAR");

		-- Dev 1 default properties & appliances
		SET userID_p = 69;
		-- Property 1
		CALL add_property(userID_p, "44 Cheshire Place", "St. John's", "NL", 1, "heating_electric", 1, "Cabin", "roof_metal", @propertyID, @message_res);
		CALL add_propertyAppliance(userID_p, @propertyID, "snowblower", "234886598", NOW(), 5, "Poulan Pro", "445", @propertyApplianceID);
		CALL add_propertyAppliance(userID_p, @propertyID, "oven", "76393456120as", NOW(), 2, "Frigidaire Gallery", "GCRE306CAF", @propertyApplianceID);
		CALL add_propertyAppliance(userID_p, @propertyID, "refrigerator", "kjdfgkjh348askjh", NOW(), 2, "LG Electronics", "LRFGC2706S", @propertyApplianceID);
		-- Property 2
		CALL add_property(userID_p, "48 Python Place", "London", "ON", 1, "heating_oil", 1, "Home", "roof_metal", @propertyID, @message_res);
		CALL add_propertyAppliance(userID_p, @propertyID, "clothes washing machine", "ASFJHdkkjshg", NOW(), 5, "Samsung", "WA50R5200AW", @propertyApplianceID);
		CALL add_propertyAppliance(userID_p, @propertyID, "clothes dryer", "ASHFD3457565", NOW(), 2, "Hotpoint", "HTX24EASKWS", @propertyApplianceID);
		CALL add_propertyAppliance(userID_p, @propertyID, "mini split", "DHDD33453456", NOW(), 1, "DuctlessAire", "DA2421-H2", @propertyApplianceID);
		-- Property 3
		CALL add_property(userID_p, "47 John Coltrane Place", "St-Louis-de-Ha-Ha!", "NB ", 1, "heating_electric", 1, "Cabin", "roof_metal", @propertyID, @message_res);
		CALL add_propertyAppliance(userID_p, @propertyID, "oil furnace", "fkfdsASDFJAS", NOW(), 50, "MorrHeat", "MH80", @propertyApplianceID);
		CALL add_propertyAppliance(userID_p, @propertyID, "lawnmower", "dlsgkjh", NOW(), NULL, "Troy Built", "Check Don't Change 3 in 1", @propertyApplianceID);
		CALL add_propertyAppliance(userID_p, @propertyID, "woodstove", "ASDF2345644", NOW(), NULL, "Pleasant Hearth", "LWS-2200", @propertyApplianceID);
		
		-- Dev 2 default properties & appliances
		SET userID_p = 2;
		-- Property 1
		CALL add_property(userID_p, "44 College Rd.", "Halifax", "NL", 1, "heating_electric", 1, "Cabin", "roof_metal", @propertyID, @message_res);
		CALL add_propertyAppliance(userID_p, @propertyID, "snowblower", "234886598", NOW(), 5, "Poulan Pro", "445", @propertyApplianceID);
		CALL add_propertyAppliance(userID_p, @propertyID, "oven", "76393456120as", NOW(), 2, "Frigidaire Gallery", "GCRE306CAF", @propertyApplianceID);
		CALL add_propertyAppliance(userID_p, @propertyID, "refrigerator", "kjdfgkjh348askjh", NOW(), 2, "LG Electronics", "LRFGC2706S", @propertyApplianceID);
		-- Property 2
		CALL add_property(userID_p, "48 North Atlantic", "Peterborough", "ON", 1, "heating_oil", 1, "Home", "roof_metal", @propertyID, @message_res);
		CALL add_propertyAppliance(userID_p, @propertyID, "clothes washing machine", "ASFJHdkkjshg", NOW(), 5, "Samsung", "WA50R5200AW", @propertyApplianceID);
		CALL add_propertyAppliance(userID_p, @propertyID, "clothes dryer", "ASHFD3457565", NOW(), 2, "Hotpoint", "HTX24EASKWS", @propertyApplianceID);
		CALL add_propertyAppliance(userID_p, @propertyID, "mini split", "DHDD33453456", NOW(), 1, "DuctlessAire", "DA2421-H2", @propertyApplianceID);
		-- Property 3
		CALL add_property(userID_p, "47 Ridge Road", "Montreal", "NB ", 1, "heating_electric", 1, "Cabin", "roof_metal", @propertyID, @message_res);
		CALL add_propertyAppliance(userID_p, @propertyID, "oil furnace", "fkfdsASDFJAS", NOW(), 50, "MorrHeat", "MH80", @propertyApplianceID);
		CALL add_propertyAppliance(userID_p, @propertyID, "lawnmower", "dlsgkjh", NOW(), NULL, "Troy Built", "Check Don't Change 3 in 1", @propertyApplianceID);
		CALL add_propertyAppliance(userID_p, @propertyID, "woodstove", "ASDF2345644", NOW(), NULL, "Pleasant Hearth", "LWS-2200", @propertyApplianceID);

		-- Dev 3 default properties & appliances
		SET userID_p = 79;
		-- Property 1
		CALL add_property(userID_p, "44 My Place", "Dartmouth", "NL", 1, "heating_electric", 1, "Cabin", "roof_metal", @propertyID, @message_res);
		CALL add_propertyAppliance(userID_p, @propertyID, "snowblower", "234886598", NOW(), 5, "Poulan Pro", "445", @propertyApplianceID);
		CALL add_propertyAppliance(userID_p, @propertyID, "oven", "76393456120as", NOW(), 2, "Frigidaire Gallery", "GCRE306CAF", @propertyApplianceID);
		CALL add_propertyAppliance(userID_p, @propertyID, "refrigerator", "kjdfgkjh348askjh", NOW(), 2, "LG Electronics", "LRFGC2706S", @propertyApplianceID);
		-- Property 2
		CALL add_property(userID_p, "48 Murach place", "Mount Pearl", "ON", 1, "heating_oil", 1, "Home", "roof_metal", @propertyID, @message_res);
		CALL add_propertyAppliance(userID_p, @propertyID, "clothes washing machine", "ASFJHdkkjshg", NOW(), 5, "Samsung", "WA50R5200AW", @propertyApplianceID);
		CALL add_propertyAppliance(userID_p, @propertyID, "clothes dryer", "ASHFD3457565", NOW(), 2, "Hotpoint", "HTX24EASKWS", @propertyApplianceID);
		CALL add_propertyAppliance(userID_p, @propertyID, "mini split", "DHDD33453456", NOW(), 1, "DuctlessAire", "DA2421-H2", @propertyApplianceID);
		-- Property 3
		CALL add_property(userID_p, "47 Sweet Way", "Beving", "NB ", 1, "heating_electric", 1, "Cabin", "roof_metal", @propertyID, @message_res);
		CALL add_propertyAppliance(userID_p, @propertyID, "oil furnace", "fkfdsASDFJAS", NOW(), 50, "MorrHeat", "MH80", @propertyApplianceID);
		CALL add_propertyAppliance(userID_p, @propertyID, "lawnmower", "dlsgkjh", NOW(), NULL, "Troy Built", "Check Don't Change 3 in 1", @propertyApplianceID);
		CALL add_propertyAppliance(userID_p, @propertyID, "woodstove", "ASDF2345644", NOW(), NULL, "Pleasant Hearth", "LWS-2200", @propertyApplianceID);
	
	SET message_res = 'Property Added';
    -- SELECT "message"; 
    IF sql_error = FALSE THEN
		COMMIT;
        SELECT 'DB Reset';
	ELSE
		ROLLBACK;
        SELECT 'Rollback', sql_error, SQLERRM() AS error_message;
	END IF;
END//

DELIMITER ;

USE Maintain_Database;
CALL reset_users_properties();
SELECT * FROM userPropertyView;
SELECT * FROM propertyTaskView WHERE propertyID = 228;

SELECT * FROM defaultTasks;
SELECT * FROM tasks;


