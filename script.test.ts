import supertest from 'supertest'
import app from './script'
import { error } from 'console'
const request = supertest(app)
describe('Testing the API', () => {
    test('Get /', async()=>{
  await request.get('/api/v1/')
  .expect(200)
  .catch(err=>{
    throw err
  })
  
    
    })
    test('post /upload', async()=>{
  await request.post(`/api/v1/upload`)
  .expect(201) 
  .catch(err=>{
    throw err
  }) 
    
    })
    test('PATCH /api/v1/update/:id', async () => {
      const id = '65f9b3591d0549195a44be53'; 
  
      try {
          
          await request.patch(`/api/v1/update/${id}`).expect(200);
      } catch (err) {
       
          throw err;
      }
  });
    test('delete /api/v1/update/:id', async () => {
      const id = '65f9b3591d0549195a44be53'; 
  
      try {
         
          await request.delete(`/api/v1/delete/${id}`).expect(200);
      } catch (err) {
         
          throw err;
      }
  });
    test('get /api/v1/login', async () => {
      const id = '65f9b3591d0549195a44be53'; 
  
      try {
       
          await request.post(`/api/v1/login`).expect(200);
      } catch (err) {
        
          throw err;
      }
  });
    test('post user signup', async () => {
      const id = '65f9b3591d0549195a44be53'; 
  
      try {
          await request.post(`/api/v1/signup`).expect(200);
      } catch (err) {
       
          throw err;
      }
  });
  
    
    })
    
