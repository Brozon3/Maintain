USE Maintain_Database;

CREATE OR REPLACE VIEW applianceView AS
SELECT 
	up.userID AS userID,
	pa.propertyApplianceID AS propertyApplianceID,
	p.address AS propertyAddress,
	pa.propertyApplianceID AS propertyAppliance,
	pa.serialNumber AS serialNumber,
	pa.purchaseDate AS purchaseDate,
	pa.warrantyLength AS warrantyLength,
	pa.manufacturer AS manufacturer,
	pa.model AS model,
	a.applianceType AS applianceType
FROM
	propertyAppliances pa JOIN appliances a ON(pa.applianceID = a.applianceID)
	JOIN properties p ON(p.propertyID = pa.propertyID)
	JOIN userProperty up ON(pa.propertyID = up.propertyID);

SELECT * FROM applianceView;