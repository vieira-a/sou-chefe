const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors()); 
app.use(express.static(path.join(__dirname, "img")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "/img/home"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

app.post("/upload", upload.single("imagem"), (req, res) => {
    if (req.file) {
        res.json({ caminho: `../img/home/${req.file.filename}` });
    } else {
        res.status(400).send("Erro ao fazer upload.");
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
