const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require('cors')
const bcrypt = require("bcrypt");
require("dotenv").config();
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");

app.use(cors()) // Use this after the variable declaration
app.use(express.json()); // Then use express.json()

// Connect to MongoDB
const uri = `mongodb+srv://game-booking-admin:8HItQdNryhHlH9gq@game-booking-database.dk9rjnj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// TODO: verify the user have the valid token or not
function tokenVerify(req, res, next) {
  const authorization = req.headers.authorization;
  console.log(authorization);
  if (!authorization) {
    return res.status(401).send({ message: "UnAuthorize Access" });
  } else {
    next();
  }
}


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client
      .connect()
      .then(() => {
        console.log("Successfully connected to MongoDB!");
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
      });

    const database = client?.db("game-booking-database");
    const usersCollection = database.collection("users");
    const gamesCollection = database.collection("games");
    const bookedGamesCollection = database.collection("bookedGames");

    //* Student Register Route
    app.post("/register", async (req, res) => {
      try {
        const { student_id, password, student_name } = req.body;

        // Check if the user already exists
        const existingUser = await usersCollection.findOne({ student_id });

        if (existingUser) {
          return res.status(400).json({
            error: { message: "User already exists", type: "student_id" },
          });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = {
          student_name,
          student_id,
          password: hashedPassword,
          token: "",
        };

        // Save the user to the database
        await usersCollection.insertOne(newUser);

        // Generate JWT token
        const token = jwt.sign(
          { student_id: newUser.student_id },
          process.env.JWT_ACCESS_TOKEN,
          { expiresIn: "12h" }
        );
        // console.log("Search criteria:", { student_id });

        // Update user's token in the database
        await usersCollection.updateOne(
          { student_id: newUser.student_id },
          { $set: { token } }
        );

        res
          .status(200)
          .json({ message: "User registered successfully", token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    //* Login Student Route
    app.post("/login", async (req, res) => {
      try {
        const { student_id, password } = req.body;

        // Check if the user exists
        const user = await usersCollection.findOne({ student_id });
        if (!user) {
          return res.status(401).json({
            error: { message: "Invalid credentials", type: "student_id" },
          });
        }

        // Verify the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({
            error: { message: "Incorrect Password", type: "password" },
          });
        }

        // Generate JWT token
        const token = jwt.sign(
          { student_id: user.student_id },
          process.env.JWT_ACCESS_TOKEN,
          { expiresIn: "12h" }
        );

        // Update user's token in the database
        await usersCollection.updateOne(
          { student_id: user.student_id },
          { $set: { token } }
        );

        res.status(200).json({ message: "Login successful", token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    //* Get profile Information
    app.get("/myProfile/:token", async (req, res) => {
      try {
        const token = req.params.token;
        const query = { token: token };
        const cursor = await usersCollection.findOne(query);
        const profile = {
          student_id: cursor.student_id,
          student_name: cursor.student_name,
        };
        res.send(profile);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    //* Game Register Route
    app.post("/game-register", async (req, res) => {
      const token = req.headers.accesstoken;
      if (token) {
        try {
          const data = req.body;

          // Save the user to the database
          await gamesCollection.insertOne(data);

          res.status(200).json({ message: "Game registered successfully" });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    });

    //* Get all games
    app.get("/games", async (req, res) => {
      try {
        const query = {};
        const cursor = gamesCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Delete game
    app.delete("/games", async (req, res) => {
      try {
        console.log(req.query.id);
        const query = { '_id': ObjectId(req.params.id) };
         const result = await gamesCollection.deleteOne(query);
          res.send(result);
          res.status(200).json({ message: "Delete Successfully" });
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    //* book a game
    app.post("/game-book", async (req, res) => {
      const token = req.headers.accesstoken;
      if (token) {
        try {
          const data = req.body;

          // Save the user to the database
          await bookedGamesCollection.insertOne(data);

          res.status(200).json({ message: "Game Booked successfully" });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    });

    //* Get my games
    app.get("/my-booked-games", async (req, res) => {
      const token = req.headers.accesstoken;      
       try {
         const query = {};
         const cursor = bookedGamesCollection.find(query);
         const result = await cursor.toArray();
         res.send(result);
       } catch (error) {
         console.error(error);
         res.status(500).json({ error: "Internal Server Error" });
       }
    });


    // TEST ROUTE
    app.get("/user", (req, res) => {
      res.json({ name: "x" });
    });
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("Server listening on port", port);
});