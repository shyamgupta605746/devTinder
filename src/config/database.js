const mongoose = require("mongoose");

const dbConnection = async () => {
  await mongoose.connect(
    "mongodb+srv://shyamgupta605746_db_user:yxKggAnCese8TG8L@shalinishyamdev.as69lrd.mongodb.net/devTinder?appName=ShaliniShyamdev"
  );
};

module.exports = dbConnection;
