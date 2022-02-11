const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const GithubUser = require('../lib/models/GithubUser.js');

jest.mock('../lib/utils/github');

const agent = request.agent(app);

describe('why-i-autha routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect to the github oauth page upon login', async () => {
    const req = await request(app).get('/api/v1/github/login');

    expect(req.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback&scope=user/i
    );
  });

  it('should login and redirect users to /api/v1/posts', async () => {
    const res = await agent
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    const expected = [expect.stringMatching('/api/v1/posts')];
    expect(res.redirects).toEqual(expect.arrayContaining(expected));
  });

  it('should create a new post, only when a user is signed in', async () => {
    const user = await GithubUser.insert({ username:'k1ll3rb33s', email:'killer@bees.com', avatar:'https://killerbees.com/bee.jpg'})

    const res = await agent
    .post('/api/v1/posts')
    .send({ content: 'who am i where am I omg whats going on?', user_id: user.id });
    
    expect(res.body).toEqual({
      id: expect.any(String),
      content: 'who am i where am I omg whats going on?',
      user_id: expect.any(String)
    })
  })
  
  // it('should return a list of posts for an authorized use', async () => {
  //   const res = await agent
  //     .get(`/api/v1/github/login/callback?code=42`)
  //     .redirects(1)

  //     expect (res.body).toEqual([]);

  // })
  // it('should error when a user tries to post a post & is not logged in', async () => {

  //   const fraudPost = await request(app).post('/api/v1/posts').send({ ...testPost, user_id: 6})
   
  //   expect(fraudPost.body).toEqual({ status: 401, message: 'You must be signed in to continue' })
  // })
});
