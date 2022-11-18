import app from '../../../app';
import supertest from 'supertest';
import { truncateDB } from '../../../spec/utils';

describe('[E2E] Product', function () {

  describe('Testing Orders endpoint', function () {
    let mytoken: string;
    let userId:number;
    let productId:number;
    let orderId:number;
    beforeAll(async () => {
      await truncateDB();
      const addUserResponse = await supertest(app)
        .post(
          '/users/create',
        )
        .send({
          firstname: 'test',
          lastname: 'test',
          email: 'test24@test24.com',
          password: '12345645',
        });
      mytoken = addUserResponse.body.data.token;
      userId=addUserResponse.body.data.user.id;
      const addProductResponse = await supertest(app)
        .post('/products/create')
        .send({
          name: 'Python',
          price: 45,
        }).set('Authorization', 'Bearer ' + mytoken);
      productId=addProductResponse.body.data.product.id;

    });

    it('Create a Order', async function () {
      const createOrderResponse = await supertest(app)
        .post('/orders/create')
        .send({
          product_id:productId,
          qty:5,
          user_id:userId,
        }).set('Authorization', 'Bearer ' + mytoken);
      orderId= createOrderResponse.body.data.order.id;
      expect(createOrderResponse.statusCode).toBe(201);
    });

    it('Get All Orders', async function () {
      const createOrderResponse = await supertest(app)
        .get('/orders/').set('Authorization', 'Bearer ' + mytoken);
      expect(createOrderResponse.statusCode).toBe(200);
    });

    it('Get Order By Id', async function () {
      const createOrderResponse = await supertest(app)
        .get('/orders/'+orderId).set('Authorization', 'Bearer ' + mytoken);
      expect(createOrderResponse.statusCode).toBe(200);
    });

  });
});
