const express = require("express");
const {
    getAll,
    getByMonth,
    getBySort,
    orderByShop,
    deleteById,
    create,
    update,
} = require("./controllers");

const router = express.Router();

router.get("/", getAll);

router.get("/month/:month", getByMonth);

router.get("/sorted", getBySort);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", deleteById);

module.exports = router;
