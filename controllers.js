const recept = require("./models");
const Joi = require("joi");

const getAll = async (req, res) => {
    console.log("getAll");
    try {
        const result = await recept.findAll();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getByMonth = async (req, res) => {
    const month = req.params.month;
    console.log("month");
    try {
        const result = await recept.getByMonth(month).then((result) => {
            if (result.length === 0) {
                res.status(404).json({ message: "Not found" });
            } else {
                res.status(200).json(result);
            }
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getBySort = async (req, res) => {
    const sort = req.query;
    console.log(sort);

    try {
        const result = await recept.getBySort(sort).then((result) => {
            if (result.length === 0) {
                res.status(404).json({ message: "Not found" });
            } else {
                res.status(200).json(result);
            }
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const create = async (req, res) => {
    const schema = Joi.object({
        date: Joi.string().required(),
        amount: Joi.number().required(),
        shop: Joi.string().required(),
        category: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        res.status(400).send(error);
    } else {
        try {
            const result = await recept.create(req.body);
            if (result) {
                result.id = result.insertId;
                res.status(201).send(result);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }
};

const update = async (req, res) => {
    const id = req.params.id;
    const schema = Joi.object({
        date: Joi.string().required(),
        amount: Joi.number().required(),
        shop: Joi.string().required(),
        category: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        res.status(400).json(error.details);
    } else {
        try {
            // const res = await recept.findById(req.body.id);
            // if (result.length === 0) {
            //     console.log("Not found");
            //     res.status(404).json({ message: "Not found" });
            //     return;
            // }

            const result = await recept.update(req.body, id);
            res.status(200).json(result);
        } catch (e) {
            res.sendStatus(500);
        }
    }
};

const deleteById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await recept.deleteById(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getAll,
    getByMonth,
    getBySort,
    create,
    update,
    deleteById,
};
