USE Maintain_Database;

CREATE OR REPLACE VIEW propertyTaskView AS
SELECT 
		utl.entryID as entryID,
        p.propertyID as propertyID,
        utl.userID AS userID,
        pa.propertyApplianceID as propertyApplianceID,
        pf.propertyFeaturesID as propertyFeatureID,
        t.description AS description,
        p.address AS address,
        p.prov AS prov,
        p.city AS city,
        a.applianceType as applianceType,
        pa.manufacturer as manufacturer,
		pa.model as model,
		pa.serialNumber as serialNumber,
        f.featureType as featureType,    
        utl.dueDate AS dueDate
    FROM
        tasks t
        JOIN userTaskList utl ON(t.taskID = utl.taskID)
        JOIN properties p ON(utl.propertyID = p.propertyID)
		LEFT JOIN propertyAppliances pa ON(utl.propertyApplianceID = pa.propertyApplianceID)
        LEFT JOIN propertyFeatures pf ON(pf.propertyFeaturesID = utl.propertyFeaturesID)
        LEFT JOIN appliances a ON(pa.applianceID = a.applianceID)
        LEFT JOIN features f ON(f.featureID = pf.featureID);
        
SELECT * FROM propertyTaskView;