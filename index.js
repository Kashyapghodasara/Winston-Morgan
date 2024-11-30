// Date - 23-11-2024  --  Saturday
// Date - 24-11-2024  --  Sunday

import express from 'express'
const app = express();

import { config as configDotenv } from 'dotenv';
configDotenv();

import logger from "./logger.js";
import morgan from "morgan";
const morganFormat = ":method :url :status :response-time ms";

app.use(express.json());

app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],   
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );

let listId = 1;
let mainList = []; // In-memory storage

// Create and Add Values
app.post('/create-list', (req, res) => {
    const { name, age } = req.body;
    const newList = { id: listId++, name, age };
    mainList.push(newList); 
    res.status(200).send(newList);
});

// Show All Values
app.get('/create-list', (req, res) => {
    res.status(200).send(mainList);
});

// Get Value by ID
app.get('/create-list/:id', (req, res) => {
    const data = mainList.find(t => t.id === parseInt(req.params.id));
    if (!data) {
        return res.status(404).send("No Data Found");
    }
    res.status(200).send(data);
});

//Update The Value
app.put("/create-list/:id", (req, res)=> {
    const data = mainList.find(t => t.id === parseInt(req.params.id));
    if (!data) {
        return res.status(404).send("No Data Found");
    }
    const {name, age} = req.body
    data.name = name;
    data.age = age;
    res.status(200).send(data);
})

//Delete Data
app.delete("/create-list/:id", (req, res)=> {
    const index = mainList.findIndex(t => t.id === parseInt(req.params.id))
    if(index === -1) {
        return res.status(404).send("Data not Available")
    } else {
        mainList.splice(index, 1)
        res.status(200).send("Deleted")
    }
})

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
   logger.debug(`Server running on port ${PORT}`);
});

