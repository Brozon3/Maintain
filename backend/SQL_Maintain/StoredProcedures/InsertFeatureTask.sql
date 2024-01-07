USE Maintain_Database;
DROP procedure IF EXISTS insert_feature_task;

DELIMITER //

CREATE PROCEDURE insert_feature_task (
IN userID_p					INT,
IN propertyID_p				INT,
IN featureType_p			VARCHAR(45),
OUT propertyFeaturesID_p	INT)
	
BEGIN
    DECLARE addFeatureID		INT;
    
    SELECT featureID INTO addFeatureID
	FROM features 
    WHERE featureType = featureType_p;
    
    INSERT INTO propertyFeatures (propertyID, featureID) VALUES (propertyID_p, addFeatureID);
    
    SET propertyFeaturesID_p = LAST_INSERT_ID();

    INSERT INTO userTaskList (userID, propertyID, taskID, dueDate, propertyFeaturesID, propertyApplianceID, eventID)
        SELECT
            userID_p as userID,
            propertyID_p as propertyID,
            t.taskID,
            CASE
				WHEN t.defaultDate IS NOT NULL THEN 
					CASE
						WHEN STR_TO_DATE(CONCAT(YEAR(NOW()), '-', defaultDate), '%Y-%m-%d') < CURDATE() THEN
							 STR_TO_DATE(CONCAT(YEAR(NOW()) + 1, '-', defaultDate), '%Y-%m-%d')
						ELSE
							STR_TO_DATE(CONCAT(YEAR(NOW()), '-', defaultDate), '%Y-%m-%d')
						END
				ELSE NOW()
			END AS dueDate,
			propertyFeaturesID_p,
            NULL AS propertyApplianceID,
            NULL AS eventID
        FROM featureTask ft JOIN tasks t USING(taskID)
        WHERE featureID = addFeatureID;

END//

DELIMITER ;

SET @defaultDate = '06-30';
SELECT STR_TO_DATE(
                    IF(
						STR_TO_DATE(CONCAT(YEAR(NOW()), '-', @defaultDate), '%Y-%m-%d') < CURDATE(),
							CONCAT(YEAR(NOW()) + 1, '-',  @defaultDate),
							CONCAT(YEAR(NOW()), '-', @defaultDate)
							),
					'%Y-%m-%d');


USE Maintain_Database;
SELECT * FROM userPropertyView WHERE userID = 69;
SET @propertyID = 448;
SELECT @propertyID;
SET @userID = 69;
SELECT * FROM userTaskList WHERE propertyFeaturesID = @propertyFeaturesID_p;
CALL insert_feature_task(@userID, @propertyID, 'carpet', @propertyFeaturesID_p);
SELECT @propertyFeaturesID_p;
SELECT * FROM userTaskList WHERE propertyFeaturesID = @propertyFeaturesID_p;

USE Maintain_Database;
SELECT f.featureType, t.description, t.frequency, t.defaultDate, f.featureID
FROM features f JOIN featureTask ft USING(featureID) JOIN tasks t USING(taskID);

SET @defaultDate = '06-30';
SELECT CONCAT(YEAR(NOW()), '-', @defaultDate);
SELECT STR_TO_DATE(CONCAT(YEAR(NOW()), '-', @defaultDate), '%Y-%m-%d');

SELECT STR_TO_DATE(
                    IF(
						STR_TO_DATE(CONCAT(YEAR(NOW()), '-', @defaultDate), '%Y-%m-%d') < CURDATE(),
							CONCAT(YEAR(NOW()) + 1, '-',  @defaultDate),
							CONCAT(YEAR(NOW()), '-', @defaultDate)
							),
					'%Y-%m-%d');
                    

INSERT INTO userTaskList (userID, propertyID, taskID, dueDate, propertyFeaturesID, propertyApplianceID, eventID)                    
SELECT
            @userID as userID,
            @propertyID_p as propertyID,
            t.taskID,
            CASE
				WHEN t.defaultDate IS NOT NULL THEN 
					STR_TO_DATE(
                    IF(
						STR_TO_DATE(CONCAT(YEAR(NOW()), '-', @defaultDate), '%Y-%m-%d') < CURDATE(),
							CONCAT(YEAR(NOW()) + 1, '-',  @defaultDate),
							CONCAT(YEAR(NOW()), '-', @defaultDate)
							),
					'%Y-%m-%d')
				ELSE NOW()
			END AS dueDate,
			@propertyFeaturesID_p,
            NULL AS propertyApplianceID,
            NULL AS eventID
        FROM featureTask ft JOIN tasks t USING(taskID)
        WHERE featureID = 400;
        
SELECT STR_TO_DATE(
                    IF(
						STR_TO_DATE(CONCAT(YEAR(NOW()), '-', @defaultDate), '%Y-%m-%d') < CURDATE(),
							CONCAT(YEAR(NOW()) + 1, '-',  @defaultDate),
							CONCAT(YEAR(NOW()), '-', @defaultDate)
							),
					'%Y-%m-%d');
