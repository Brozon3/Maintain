import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.AWS_RDS_HOST,
  user: process.env.AWS_RDS_USER,
  password: process.env.AWS_RDS_PASSWORD
})

export const getAllFeatures = {
  path: "/api/features",
  method: "get",
  handler: (req, res) => {
    conn.connect(function(err) {
      conn.query(`SELECT * FROM Maintain_Database.featuresAndAppliances`, function(err, result, fields) {
          if (err) res.send(err);
          if (result) res.send(result);
      });
    });
  },
};

export const insertFeatures = {
  path: "/api/features",
  method: "post",
  handler: (req, res) => {
      if (req.query.brand && req.query.model && req.query.feature_type && req.query.description && req.query.documentation_link) {
        console.log('Request received');
        conn.connect(function(err) {
            conn.query(`INSERT INTO Maintain_Database.featuresAndAppliances (brand, model, feature_type, description, documentation_link) VALUES ('${req.query.brand}', '${req.query.model}', '${req.query.feature_type}', '${req.query.description}', '${req.query.documentation_link}')`, function(err, result, fields) {
                if (err) res.send(err);
                if (result) res.send({brand: req.query.brand, model: req.query.model, feature_type: req.query.feature_type, description: req.query.description, documentation_link: req.query.documentation_link});
                if (fields) console.log(fields);
            });
        });
    } else {
        console.log('Missing a parameter');
    }
  },
};