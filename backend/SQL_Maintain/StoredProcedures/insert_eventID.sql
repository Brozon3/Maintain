USE Maintain_Database;
DROP procedure IF EXISTS insert_eventID;

DELIMITER //

CREATE PROCEDURE insert_eventID (
IN entryID_p				INT,
IN eventID_p				VARCHAR(45))
	
BEGIN
       
    UPDATE userTaskList
    SET eventID = eventID_p
    WHERE entryID = entryID_p;

END//

DELIMITER ;

