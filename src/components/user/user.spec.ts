import app from '../../../app';
import supertest from 'supertest';
import { truncateDB } from '../../../spec/utils';

describe('[E2E] User', function () {

  describe('Testing the User endpoint', function () {
    beforeEach(async () => {
      await truncateDB();
    });

    // Success scenarios
    it('creates an account', async function () {
      // status code should be 201 `Created`
      const response = await supertest(app)
        .post('/users/create')
        .send({
          firstname: 'testf1',
          lastname: 'tesft1',
          email: 'test@test.com',
          password: '12345f644',
        });
      expect(response.statusCode).toBe(201);
    });

    // Failure scenarios
    it('returns 400 if an account existed with the same email address', async function () {
      // status code should be 201 `Created`
      const createUser1Response = await supertest(app)
        .post('/users/create')
        .send({
          firstname: 'test',
          lastname: 'test',
          email: 'test@test.com',
          password: '12345645',
        });
      expect(createUser1Response.statusCode).toBe(201);

      const createUser2Response = await supertest(app)
        .post('/users/create')
        .send({
          firstname: 'test',
          lastname: 'test',
          email: 'test@test.com',
          password: '12345645',
        });
      expect(createUser2Response.statusCode).toBe(400);
    });

    it('Login returns 200 with correct credintials', async function () {
      // status code should be 201 `Created`
      const createUser1Response = await supertest(app)
        .post('/users/create')
        .send({
          firstname: 'test',
          lastname: 'test',
          email: 'test@test.com',
          password: '12345645',
        });
      expect(createUser1Response.statusCode).toBe(201);

      const loginResponse = await supertest(app)
        .post('/users/login')
        .send({
          email: 'test@test.com',
          password: '12345645',
        });
      expect(loginResponse.statusCode).toBe(200);
    });

    it('Login returns 400 with wrong credintials', async function () {
      // status code should be 201 `Created`
      const createUser1Response = await supertest(app)
        .post('/users/create')
        .send({
          firstname: 'test',
          lastname: 'test',
          email: 'test@test.com',
          password: '12345645',
        });
      expect(createUser1Response.statusCode).toBe(201);

      const loginResponse = await supertest(app)
        .post('/users/login')
        .send({
          email: 'test@test.com',
          password: '12345545',
        });
      expect(loginResponse.statusCode).toBe(400);
    });

    it('Get All users returns 200', async function () {
      // status code should be 201 `Created`
      let mytoken: string;
      const createUser1Response = await supertest(app)
        .post('/users/create')
        .send({
          firstname: 'test',
          lastname: 'test',
          email: 'testo@test.com',
          password: '12345645',
        });
      mytoken = createUser1Response.body.data.token;
      expect(createUser1Response.statusCode).toBe(201);
      const getAllUsersResponse = await supertest(app)
        .get('/users/').set('Authorization', 'Bearer ' + mytoken);;
      expect(getAllUsersResponse.statusCode).toBe(200);
    });
    it('Get Usere with Id  returns 200', async function () {
      let mytoken: string;
      let userid: number;
      const gettoken = await supertest(app)
        .post(
          '/users/create',
        )
        .send({
          firstname: 'test',
          lastname: 'test',
          email: 'test24@test24.com',
          password: '12345645',
        });
      mytoken = gettoken.body.data.token;
      userid = gettoken.body.data.user.id;
      const getAllUsersResponse = await supertest(app)
        .get('/users/' + userid).set('Authorization', 'Bearer ' + mytoken);;
      expect(getAllUsersResponse.statusCode).toBe(200);
    });

  });

});
