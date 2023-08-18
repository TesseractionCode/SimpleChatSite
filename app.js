const express = require("express");
const fs = require("fs");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/get-current-messages", (req, res) => {
    fs.readFile("./chat_data.json", (err, data) => {
        if (err) {
            res.status(404);
        } else {
            res.send(data);
        }
    });
});

app.post("/submit-message", (req, res) => {
    const msg_object = req.body;
    fs.readFile("./chat_data.json", (err, data) => {
        if (err) {
            return;
        }
        const msg_objects = JSON.parse(data);
        msg_objects.push(msg_object);
        fs.writeFile("./chat_data.json", JSON.stringify(msg_objects), err => {
            if (!err) {
                res.status(200);
            }
        }); 
    });
});

app.listen(3000)