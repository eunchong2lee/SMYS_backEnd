const request = require('supertest')
const app = require('../server')
// describe test를 여러개 묶는 역할
// describe('Test /hello', () => { 
//     test('should return world!', (done) => {
//         request(app).get('/hello').then((response) => {
//             expect(response.text).toBe('world!');
//             done();
//         });
//     });
// });

test('express port 연결 확인', (done) => {
    request(app).get('/').then((response) => {
        expect(response.text).toBe('연결완료');
        done();
    })
})