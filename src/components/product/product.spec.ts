import app from '../../../app';
import supertest from 'supertest';
import { truncateDB } from '../../../spec/utils';

describe('[E2E] Product', function () {

  describe('Testing the add Product endpoint', function () {
    let mytoken: string;
    let productId:number;
    beforeAll(async () => {
      await truncateDB();
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
    });
    it('Adds a Product', async function () {
      const addProductResponse = await supertest(app)
        .post('/products/create')
        .send({
          name: 'Python',
          price: 45,
        }).set('Authorization', 'Bearer ' + mytoken);
      productId=addProductResponse.body.data.product.id;
      expect(addProductResponse.statusCode).toBe(201);
    });

    it('Gets All Products', async function () {
      const addProductResponse = await supertest(app)
        .get('/products/')
        .set('Authorization', 'Bearer ' + mytoken);
      expect(addProductResponse.statusCode).toBe(200);
    });

    it('Get Product By ID', async function () {
      const addProductResponse = await supertest(app)
        .get('/products/'+productId)
        .set('Authorization', 'Bearer ' + mytoken);
      expect(addProductResponse.statusCode).toBe(200);
    });
  });
});
