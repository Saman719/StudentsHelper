const request = require('supertest')
const app = require('./app')

describe('Users  API', () => {

    it('See User Registeration Form', () => {
        return request(app).get('/user/register').expect(200).then((res) => {});
    });

    it('User Not Found', () => {
        return request(app).post('/user/1231312312312').expect(404).then((res) => {});
    });

    it('User Incorrect Password', () => {
        return request(app).post('/user/login').send({
            "username": "SamanGoudarzi",
            "password": "1234"
        }).then((res) => {
            expect(res.data === 'Invalid username/password')
        });
    })

    it('User ID not found', () => {
        return request(app).post('/user/login').send({
            "username": "afbasdfadbfaddoaf",
            "password": "1234"
        }).then((res) => {
            expect(res.status === 'user not found')
        });
    })

    it('User Loged IN successfully', () => {
        return request(app).post('/user/login').send({
            "username": "SamanGoudarzi",
            "password": "12345"
        }).then((res) => {
            expect(res.status === 'ok')
        });
    })

    it('User Pass Must Be Greater Or Equal to 5', () => {
        return request(app).post('/user/register').send({
            "name": "Test",
            "familyName": "Test",
            "username": "TestTest",
            "password": "1234"
        }).then((res) => {
            expect(res.error === 'length should not be < 5')
        });
    })
})

describe('Projects  API', () => {

    it('See Projects List', () => {
        return request(app).get('/project').expect(200).then((res) => {});
    });

    it('See My Projects List', () => {
        return request(app).get('/project/my').expect(200).then((res) => {});
    });

    it('See Project Creation Form', () => {
        return request(app).get('/project/create').expect(200).then((res) => {});
    });

    it('There Is A Problem With Token (iaybe under attack ...)', () => {
        return request(app).post('/user/register').send({
            "courseName": "Software",
            "fieldOfStudy": "Computer Engineering",
            "description": "This is just a test, bruuh",
            "price": "400000",
            "token": "this is a wrong token!!!"
        }).then((res) => {
            expect(res.error === 'Dont try to attack me :)')
        });
    })

    it('Project Is Deactive', () => {
        return request(app).get('/projectt/1234').then((res) => {
            expect(res.err === 'its deactive')
        });
    })

    it('Project Not Found To Modify', () => {
        return request(app).put('/project/1234').then((res) => {
            expect(res.status === 'project not found')
        });
    })

})