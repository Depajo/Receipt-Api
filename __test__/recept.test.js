const { describe, expect, test, beforeAll } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const url = "/api/recept";

describe("GET recept", () => {
    test("It should response 200", (done) => {
        request(app).get(url).expect(200).end(done);
    });
    test("Data is json format", (done) => {
        request(app).get(url).expect("Content-Type", /json/).end(done);
    });
    test("Return 404 when not found", (done) => {
        request(app)
            .get(url + "/sorted?id=10023")
            .expect(404)
            .end(done);
    });
    test("Return 200 when found by id", (done) => {
        request(app)
            .get(url + "/sorted?id=1")
            .expect(200)
            .end(done);
    });
});

describe("POST recept", () => {
    test("POST and It should response 201", async () => {
        const recept = {
            date: "2023-01-01",
            amount: 100.0,
            shop: "testi",
            category: "testi",
        };

        const res = await request(app)
            .post(url)
            .set("Accept", "application/json")
            .send(recept);

        expect(res.status).toEqual(201);
        expect(res.body.id).toBeTruthy();
        expect(res.header["content-type"]).toMatch(/json/);
    });

    test("POST and It should response 400", async () => {
        const recept = {
            date: "2023-01-01",
            amount: 100.0,
            shop: "testi",
        };

        const res = await request(app)
            .post(url)
            .set("Accept", "application/json")
            .send(recept);

        expect(res.status).toEqual(400);
        expect(res.header["content-type"]).toMatch(/json/);
    });
});

describe("PUT recept", () => {
    let postid;
    beforeAll(async () => {
        const recept = {
            date: "2023-01-01",
            amount: 100.0,
            shop: "testi",
            category: "testi",
        };

        const res = await request(app)
            .post(url)
            .set("Accept", "application/json")
            .send(recept);

        postid = res.body.id;
    });

    test("PUT and It should response 200", async () => {
        const recept = {
            date: "2023-01-01",
            amount: 100.0,
            shop: "testi",
            category: "testi",
        };

        const res = await request(app)
            .put(url + "/" + postid)
            .set("Accept", "application/json")
            .send(recept);

        expect(res.status).toEqual(200);
        expect(res.header["content-type"]).toMatch(/json/);
    });

    test("PUT and It should response 400", async () => {
        const recept = {
            date: "2023-01-01",
            amount: 100.0,
            shop: "testi",
        };

        const res = await request(app)
            .put(url + "/" + postid)
            .set("Accept", "application/json")
            .send(recept);

        expect(res.status).toEqual(400);
        expect(res.header["content-type"]).toMatch(/json/);
    });

    // test("PUT and It should response 404", async () => {
    //     const recept = {
    //         date: "2023-01-01",
    //         amount: 100.0,
    //         shop: "testi",
    //         category: "testi",
    //     };

    //     const res = await request(app)
    //         .put(url + "/100000")
    //         .set("Accept", "application/json")
    //         .send(recept);

    //     expect(res.status).toEqual(404);
    //     expect(res.header["content-type"]).toMatch(/json/);
    // });
});

describe("DELETE recept", () => {
    let postid;
    beforeAll(async () => {
        const recept = {
            date: "2023-01-01",
            amount: 100.0,
            shop: "testi",
            category: "testi",
        };

        const res = await request(app)
            .post(url)
            .set("Accept", "application/json")
            .send(recept);

        postid = res.body.id;
    });

    test("DELETE and It should response 200", async () => {
        const res = await request(app).delete(url + "/sorted?id=" + postid);

        expect(res.status).toEqual(200);
        expect(res.header["content-type"]).toMatch(/json/);
    });

    // test("DELETE and It should response 404", async () => {
    //     const res = await request(app).delete(url + "/" + postid);

    //     expect(res.status).toEqual(404);
    //     expect(res.header["content-type"]).toMatch(/json/);
    // });
});
