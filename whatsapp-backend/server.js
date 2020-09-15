const express = require("express");
const mongoose = require("mongoose");
const Messages = require("./dbMessages");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 9000;

var Pusher = require("pusher");

// pusher config
var pusher = new Pusher({
  appId: "1072952",
  key: "f93c635b69e51e1e0e44",
  secret: "9c6c2ca8dc7585600a66",
  cluster: "us2",
  encrypted: true,
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world",
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("db connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType == "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("message", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
      });
    } else {
      console.log("error triggering pusher");
    }
  });
});

// Middleware
// app.use(express.json());
app.use(bodyParser.json());

// mongoDB configuration
const MONGODB_URL =
  "mongodb+srv://tiff0000:tiff0000@cluster0.kttgq.mongodb.net/whatsappdb?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => res.status(200).send("hello world"));

// get all the messages
app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// post a new message
app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
