let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

const csvFilePath = '/Users/sankalanparajuli/repos/protractor-test/report.csv'
const csv = require('csvtojson')

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
	MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
	  if (err) throw err;
	  var dbo = db.db("reports");
	  dbo.collection("reports").insertMany(jsonObj, (err, res) => {
		if (err) throw err;
		console.log("Number of documents inserted: " + res.insertedCount);
		db.close();
	  });
	});
})

// If you need to have icu4c first in your PATH run:
//   echo 'export PATH="/usr/local/opt/icu4c/bin:$PATH"' >> ~/.zshrc
//   echo 'export PATH="/usr/local/opt/icu4c/sbin:$PATH"' >> ~/.zshrc

// For compilers to find icu4c you may need to set:
//   export LDFLAGS="-L/usr/local/opt/icu4c/lib"
//   export CPPFLAGS="-I/usr/local/opt/icu4c/include"
