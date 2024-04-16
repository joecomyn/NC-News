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

    describe('GET: /api/articles/:article_id', () => {

        describe('GOOD PATH:', () => {

            test(`200: /api/topics responds with an article object containing all 
            row properties of an article: (article_id, title, topic, author, body, time created, 
            and image url)`, () => {
                return request(app)
                .get('/api/articles/1')
                .expect(200)
                .then(({body}) => {
                    const { article } = body;
                    //test type returned
                    expect(typeof article).toBe('object');
                    expect(Array.isArray(article)).toBe(false);
                    expect(article === null).toBe(false);
                    //test returned object properties match
                    expect(article.article_id).toBe(1);
                    expect(article.title).toBe("Living in the shadow of a great man");
                    expect(article.topic).toBe("mitch");
                    expect(article.author).toBe("butter_bridge");
                    expect(article.body).toBe("I find this existence challenging");
                    expect(article.created_at).toBe("2020-07-09T20:11:00.000Z");
                    expect(article.article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700");
                });

            });

        });

        describe('BAD PATHS:', () => {
            
            test('400: /api/articles/9999 When passed a non-existing id send a 400 bad request', () => {
                return request(app)
                .get('/api/articles/9999')
                .expect(400)
                .then(({body}) => {
                    expect(body.msg).toBe('Bad Request');
                });
            });

            test('400: /api/articles/not_an_id When passed an id that is not the correct format send a 400 bad request', () => {
                return request(app)
                .get('/api/articles/not_an_id')
                .expect(400)
                .then(({body}) => {
                    expect(body.msg).toBe('Bad Request');
                });
            });

        });

    });


});

describe('URL BAD PATHS:', () => {

    test('404: /api/topic responds with a 404 not found error as that endpoint does not exist', () => {
        return request(app)
        .get('/api/topic')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("Not found: Path doesnt exist"); 
        });
    });

});