const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname)));

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "register.html"));
});

app.get("/phone-verification", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "phone-verification.html"));
});

app.get("/email-verification", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "email-verification.html"));
});

app.get("/check-email", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "check-email.html"));
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/stock", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "stock.html"));
});

app.get('/specification', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "specification.html"));
})

app.get("/google-complete", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "google-complete.html"));
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
