const app = require('../app');
const request = require('supertest');
const db = require("../db/connection");
const data = require('../db/data/test-data');
const seed = require('../db/seeds/seed');
const endpointsCheck = require('../endpoints.json');

beforeEach(() => seed(data));
afterAll(() => db.end());

describe('GET', () => {

    describe('GET: /api/topics', () => {

        describe('GOOD PATH:', () => {

            test('200: /api/topics responds with an array of topic objects: each having a description and aslug property', () => {
                return request(app)
                .get('/api/topics')
                .expect(200)
                .then(({body: { topics }}) => {
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
                .then(({body: { endpoints }}) => {
                    expect(typeof endpoints).toBe('object');
                    expect(Array.isArray(endpoints)).toBe(false);
                    expect(endpoints !== null).toBe(true);
                    for(const receivedEndpoint in endpoints){
                        if(receivedEndpoint === "GET /api"){
                            expect(endpoints[receivedEndpoint].description).toBe("serves up a json representation of all the available endpoints of the api");
                        }else{
                            expect(endpoints[receivedEndpoint].description).toBe(endpointsCheck[receivedEndpoint].description);
                            expect(endpoints[receivedEndpoint].queries).toEqual(endpointsCheck[receivedEndpoint].queries);
                            expect(endpoints[receivedEndpoint].exampleResponse).toEqual(endpointsCheck[receivedEndpoint].exampleResponse);
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
                .then(({body: { article }}) => {
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
            
            test('404: /api/articles/9999 When passed a non-existing id send a 404 Not found', () => {
                return request(app)
                .get('/api/articles/9999')
                .expect(404)
                .then(({body: { msg }}) => {
                    expect(msg).toBe("Not Found: This article_id doesn't exist");
                });
            });

            test('400: /api/articles/not_an_id When passed an id that is not the correct format send a 400 bad request', () => {
                return request(app)
                .get('/api/articles/not_an_id')
                .expect(400)
                .then(({body: { msg }}) => {
                    expect(msg).toBe('Bad Request: article_id must be a number');
                });
            });

        });

    });

    describe('GET: /api/articles', () => {

        describe('GOOD PATH:', () => {

            test(`200: /api/articles responds with an array of article objects: 
            each having author, title, article_id, topic, created_at, votes, 
            article_img_url, comment_count properties`, () => {
                return request(app)
                .get('/api/articles')
                .expect(200)
                .then(({body: { articles }}) => {
                    expect(Array.isArray(articles)).toBe(true);
                    expect(articles.length).toBe(13);
                    expect(articles).toBeSortedBy('created_at', { descending: true });
                    articles.forEach((article) => {
                        expect(article).not.toHaveProperty('body');
                        expect(typeof article.author).toBe("string");
                        expect(typeof article.title).toBe("string");
                        expect(typeof article.article_id).toBe("number");
                        expect(typeof article.topic).toBe("string");
                        expect(typeof article.created_at).toBe("string");
                        expect(typeof article.votes).toBe("number");
                        expect(typeof article.article_img_url).toBe("string");
                        expect(typeof article.comment_count).toBe("number");
                    })
                });
            });

        });


    });

    describe('GET: /api/articles/:article_id/comments', () => {

        describe('GOOD PATH:', () => {

            test(`200: /api/articles/:article_id/comments responds with an array of comment objects: 
            each having comment_id, votes, created_at, author, body and article_id properties`, () => {
                return request(app)
                .get('/api/articles/1/comments')
                .expect(200)
                .then(({body: { comments }}) => {
                    expect(comments.length).toBe(11);
                    expect(comments).toBeSortedBy('created_at', { descending: true });
                    comments.forEach((comment) => {
                        expect(typeof comment.comment_id).toBe("number");
                        expect(typeof comment.votes).toBe("number");
                        expect(typeof comment.created_at).toBe("string");
                        expect(typeof comment.author).toBe("string");
                        expect(typeof comment.body).toBe("string");
                        expect(typeof comment.article_id).toBe("number");
                    })
                });
            });

        });

        describe('BAD PATHS:', () => {

            test(`404: When passed an article_id that does not exist but fits the correct variable type respond with a 404: Not Found error`, () => {
                return request(app)
                .get('/api/articles/9999/comments')
                .expect(404)
                .then(({body: { msg }}) => {
                    expect(msg).toBe("Not Found: This article_id doesn't exist");
                });
            });

            test(`400: When passed an article_id that is not the correct format/variable type respond with a 400: Bad Request`, () => {
                return request(app)
                .get('/api/articles/not_an_id/comments')
                .expect(400)
                .then(({body: { msg }}) => {
                    expect(msg).toBe("Bad Request: article_id must be a number");
                });
            });

            test(`404: When passed an article_id that corresponds to an article with no comments return 404: Not Found`, () => {
                return request(app)
                .get('/api/articles/4/comments')
                .expect(404)
                .then(({body: { msg }}) => {
                    expect(msg).toBe("Not Found: This article has no comments");
                });
            });
        });
    });

});

describe('POST', () => {

    describe('POST: /api/articles/:article_id/comments', () => {

        describe('GOOD PATH:', () => {
            
            test('201: when passed a username and comment body on a correct article_id post the new comment to that article and return the posted comment', () => {

                const inputComment = {
                    username:"icellusedkars",
                    body:"I like eggs"
                }

                return request(app)
                .post('/api/articles/4/comments')
                .send(inputComment)
                .expect(201)
                .then(({body: { postedComment }}) => {
                    expect(typeof postedComment.comment_id).toBe('number');
                    expect(postedComment.body).toBe(inputComment.body);
                    expect(postedComment.author).toBe(inputComment.username);
                    expect(postedComment.article_id).toBe(4);
                    expect(postedComment.votes).toBe(0);
                    expect(typeof postedComment.created_at).toBe('string')
                });
            });

        });

        describe('BAD PATHS:', () => {

            test(`404: When passed an article_id that does not exist but fits the correct variable type respond with a 404: Not Found error`, () => {
                return request(app)
                .post('/api/articles/9999/comments')
                .expect(404)
                .then(({body: { msg }}) => {
                    expect(msg).toBe("Not Found: This article_id doesn't exist");
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
        .then(({body: { msg }}) => {
            expect(msg).toBe("Not found: Path doesnt exist"); 
        });
    });

});