const request = require('supertest')

const awaawawawa = async ()=>{
    const app = await require('./app')
    // const {app,mongoConnect} = require('./app')
    
    // await mongoConnect()
    
    describe('Create a new user', async() => {
        it('should create a new user', async () => {
            const res = await request(app)
                .post('/users/add')
                .send({
                    username: "abcde",
                    password: "123",
                    email: "abcde@email.com",
                    department: "Engineering"
                })
                expect(res.statusCode).toEqual(200)
                expect(res.body).toHaveProperty('post')
        })
    })
    
    describe('Space test suite', async() => {
        it('My Space Test', () => {
            expect(true).toEqual(true);
        });
    });
    
}
 awaawawawa()