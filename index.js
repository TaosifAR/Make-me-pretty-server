const express = require('express')
const cors = require("cors");
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();
const port = process.env.PORT || 3000;
app.use(cors())
app.use(express.json());


const uri = "mongodb+srv://Makemeprettyuser:nbvhgfytr@cluster0.hdlryhp.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function run() {
    try {
      // Assuming 'client' is properly initialized and connected to MongoDB
      const vehicleCollection = client.db("Product-service").collection("Product Details");
      
      app.post("/add-a-vehicle", async (req, res) => {
        const vehicle = req.body;
        
        const result = await vehicleCollection.insertOne(vehicle);
        res.send(result);
      });
      //API for fetching all product.
      app.get("/add-vehicles",async(req, res) =>{
        const result = await vehicleCollection.find().toArray();
        res.send(result);
      });
      //API for fetching single product details
      app.get("/product/:id", async (req, res) =>{

        const id = req.params.id;
       console.log(id);
        //find a product using the id passed as param.
        //const querry ={_id: new ObjectId(id)};
        const result = await vehicleCollection.findOne({_id: new ObjectId(id)});
        res.send(result);
      });
       // API for updating a single vehicle
    app.put("/update-by-id/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedProduct = req.body;
      console.log(updatedProduct);

      const updates = { $set: updatedProduct };

      // Now call the updateOne method for updating the selected product
      const result = await vehicleCollection.updateOne(filter,updates);
      console.log(result);
      res.send({result});
    });

  
  
    } finally {
      
    }
  }
  run().catch(console.dir);


app.get('/', (req, res) => {
res.send('Hello ')})
app.listen(port, () => {
console.log(`Example app listening on port ${port}`)

})