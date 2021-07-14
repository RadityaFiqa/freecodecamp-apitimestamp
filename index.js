const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

app.use(
    cors({
        optionsSuccessStatus: 200,
    })
);

app.get("/api/:date?", (req, res) => {
    try {
        const date = req.params.date || new Date();

        const utc = isNaN(date) ?
            new Date(date).toGMTString() :
            new Date(Number(date)).toGMTString();
        const unix = isNaN(date) ?
            new Date(date).getTime() :
            new Date(Number(date)).getTime();

        if (utc && unix) {
            res.json({
                utc,
                unix,
            });
        } else {
            throw Error("Invalid Date");
        }
    } catch (e) {
        res.json({
            error: e.message,
        });
    }
});

app.listen(port, () => {
    console.log("Your app is listening on port " + port);
});