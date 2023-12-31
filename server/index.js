const express = require('express');
const app = express();
const cors = require('cors');
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();
const fs = require('fs');
const path = require('path');

const PORT = 5172;

app.use(express.json());
app.use(cors());

app.get('/ping', (req, res) => {
    res.send('Pong!'); 
});

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case "connection":
                connectionHandler(ws, msg)
                break
            case "draw":
                broadcastConnection(ws, msg)
                break
        }
    })
});

app.post('/image', (req, res) => {
    try {
        const data = req.body.img.replace(`data:image/png;base64,`, '')
        fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64')
        return res.status(200).json({message: "Uploaded"})
    } catch (e) {
        console.log(e)
        return res.status(500).json('error')
    }
});

app.get('/image', (req, res) => {
    try {
        const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
        const data = `data:image/png;base64,` + file.toString('base64')
        res.json(data)
    } catch (e) {
        console.log(e)
        return res.status(500).json('error')
    }
});

app.listen(PORT, () => {
    console.log("The server has been started on http://localhost:5172");
});

const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws, msg)
};

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
};