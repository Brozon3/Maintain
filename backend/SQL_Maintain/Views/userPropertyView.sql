USE Maintain_Database;

CREATE OR REPLACE VIEW userPropertyView AS
SELECT 
	up.propertyID as propertyID,
	up.userID AS userID,
	p.address AS address
FROM
	userProperty up
	JOIN properties p ON(up.propertyID = p.propertyID);
        
SELECT * from userPropertyView WHERE userID = 69;