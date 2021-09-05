const express = require("express");
const getAdress = require('../model/puppeeer.js')

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Rota: /:cep')
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const adress = await getAdress(id)
    if(!adress) {
        res.status(400).send('NOT FOUND')
    }
    console.log(adress)
    res.json(adress);
});

module.exports = router;
