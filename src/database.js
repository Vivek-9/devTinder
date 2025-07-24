const {MongoClient} = require("mongodb");

const url = "mongodb+srv://vivek:qcYwp6IlfIExvFFZ@mynode.lascgnj.mongodb.net/";

const client = new MongoClient(url);

const dbName = "HelloWorld";

async function main(){
    await client.connect();
    console.log("Connected successfully  to server");
    const db = client.db(dbName);
    const collection = db.collection("User");

    const data = {
        firstname: 'Akhila',
        lastname:'Vanga',
        city:'Hyderabad',
        phonenumber:'9876543210'
    }

   // const insertResult = await collection.insertMany([data]);
    // console.log("Inserted documents =>", insertResult);

    // Read
    // const findResult = await collection.find({}).toArray();
    // console.log("found documents =>", findResult);

    // const countResult = await collection.countDocuments({});
    // console.log("Count of documents in the User collection =>", countResult);

    const result = await collection.find({firstname:"Akhila"}).count();
    console.log("result => ", result);


    return "done.."
}

main()
.then(console.log)
.catch(console.error)
.finally(()=> client.close());