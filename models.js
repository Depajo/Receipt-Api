const connection = require("./server");

// Create a object with all the functions. This is the model. This is the object that will be exported.
const recept = {
    findAll: () =>
        new Promise((resolve, reject) => {
            console.log("findAll");
            connection.query(
                "SELECT *, DATE_FORMAT(date, '%Y-%m-%d') as date FROM recept",
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        }),

    getByMonth: (month) =>
        new Promise((resolve, reject) => {
            connection.query(
                "SELECT *, DATE_FORMAT(date, '%M') as month FROM recept WHERE DATE_FORMAT(date, '%M') = ?",
                [month],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        }),

    getBySort: (object) =>
        new Promise((resolve, reject) => {
            const query =
                "SELECT *, DATE_FORMAT(date, '%M') as month FROM recept WHERE ?";
            connection.query(query, [object], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        }),

    create: (data) =>
        new Promise((resolve, reject) => {
            console.log("create");
            connection.query(
                "INSERT INTO recept SET ?",
                [data],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        }),

    update: (data, id) =>
        new Promise((resolve, reject) => {
            connection.query(
                "UPDATE recept SET ? WHERE id = ?",
                [data, id],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        }),

    deleteById: (id) =>
        new Promise((resolve, reject) => {
            connection.query(
                "DELETE FROM recept WHERE id = ?",
                [id],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        }),
};

// Export the function.
module.exports = recept;
