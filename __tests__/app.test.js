const app = require('../app');
const request = require('supertest');
const db = require("../db/connection");
const data = require('../db/data/test-data');
const seed = require('../db/seeds/seed');

beforeEach(() => seed(data));
afterAll(() => db.end());

describe('GET', () => {

    describe('GET: /api/topics', () => {

        describe('GOOD PATH:', () => {

            test('200: /api/topics responds with an array of topic objects: each having a description and aslug property', () => {
                return request(app)
                .get('/api/topics')
                .expect(200)
                .then(({body}) => {
                    const {topics} = body;
                    expect(Array.isArray(topics)).toBe(true);
                    topics.forEach((topic) => {
                        expect(typeof topic.description).toBe("string");
                        expect(typeof topic.slug).toBe("string");
                    })
                });
            });

        });


    });

    describe('GET: /api', () => {

        describe('GOOD PATH:', () => {

            test(`200: /api responds with an object containing all available endpoints in this API.
            each endpoint key should have a object property which contains endpoint desccription,
            any queries the enddpoint takes, and an example response`, () => {
                return request(app)
                .get('/api')
                .expect(200)
                .then(({body}) => {
                    const {endpoints} = body;
                    expect(typeof endpoints).toBe('object');
                    expect(Array.isArray(endpoints)).toBe(false);
                    expect(endpoints !== null).toBe(true);
                    for(const endpoint in endpoints){
                        if(endpoint === "GET /api"){
                            expect(typeof endpoints[endpoint].description).toBe('string');
                        }else{
                            expect(typeof endpoints[endpoint].description).toBe('string');
                            expect(Array.isArray(endpoints[endpoint].queries)).toBe(true);
                            expect(typeof endpoints[endpoint].exampleResponse).toBe('object');
                        }
                    }
                });
            });

        });


    });

});

describe('URL BAD PATHS:', () => {

    test('400: /api/topic responds with a 404 not found error as that endpoint does not exist', () => {
        return request(app)
        .get('/api/topic')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("Not found: Path doesnt exist"); 
        });
    });

});