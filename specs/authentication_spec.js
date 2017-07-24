/**
 * Created by Kaveh T a h e r i a n on 22/07/2017.
 */
var assert = require('assert'),
    sinon = require('sinon'),
    Authentication = require('../src/server/processes/authentication'),
    _ = require('lodash'),
    Db = require('../src/server/utils/Db'),
    models = require('../src/server/utils/models')(require('mongoose'));
describe('Authentication',function () {
    describe('provided a valid email and password ',function () {
        var auth,db,validApp,result={};
        before(function (done) {

            var _createdUser= {
                hashed_password: 'a6bb9e15d41f2ba18a0a74ff02328084450de587de6e279a9c15c8adf638fd08',
                salt: 'W0LB0iu+hlJU2OBHpvFgT8YHcuy3gtB6kNLj/LepYHzQCJBnMaJB7biAjMxN4/Eceiuiin3e9BclI3GdeOU8h1EzQ3J7QlbWgq/dp56qkHqWDJxl9Yz/HZDtpJvKkdtzRFRWTF5Zi+kHPHfHmChpUlMi32TcDHAHwdn7+88Hp67Dn+9VTpx3FHhw5g+eMtuejrYrDxQZaj3PXu96LwE+LZZnQpQyMlbOT0Rsq/1nv/ECosiHUtM5ZGMKMPag9hHbPNVWuHpJAiuSzPfnijMSBwWjI/mJtbiPyES0vm5RCSfMq885mjCvwxDtpMrrypBTd55zuzL9KceFEp6wGuLXbw==',
                email: 'test@test.com',
                _id: '592a8fc6dd17460638b0c429',
                modified_at: '2017-05-28T08:52:22.027Z',
                created_at: '2017-05-28T08:52:22.027Z',
                logs: [],
                modifiedAt: '2017-05-28T08:52:22.027Z',
                createdAt: '2017-05-28T08:52:22.027Z',
                login_counts: 1,
                last_login_at: '2017-05-28T08:52:22.027Z',
                current_login_at: '2017-05-28T08:52:22.027Z',
                status: 'pending',
                is_active: false,
                profile: {
                    first_name: 'testFirstName',
                    last_name: 'testLastName',
                    gender: 'Male',
                    age: 20
                }
            };
            var _createdLog = {
                subject : 'Authentication',
                description: 'authentication was successful',
                user_id : _createdUser.id
            };
            var mockDb = {
                User: models.user,
                Log: models.log
            };
            var _newUser;
            var _updatedUser=_newUser = new mockDb.User({
                password : 'testPassword123',
                email :'test@test.com',
                profile : {
                    first_name : 'testFirstName',
                    last_name : 'testLastName',
                    gender : 'Male',
                    age : 20
                },
                modified_at: '2017-05-28T08:52:22.027Z',
                created_at: '2017-05-28T08:52:22.027Z',
                last_login_at: '2017-05-28T08:52:22.027Z',
                current_login_at: '2017-05-28T08:52:22.027Z',
                login_counts: 1
            });
            _updatedUser.status = 'online';
            _updatedUser.login_counts = _newUser.login_counts + 1;
            _updatedUser.current_login_at = Date.now();
            _updatedUser.last_login_at = Date.now();
            _updatedUser.modifiedAt = Date.now;
            var userMocked = sinon.mock(_newUser);
            sinon.stub(_newUser,'checkPassword').returns(true);
            sinon.mock(mockDb.User).expects('findOne').withArgs({ email : 'test@test.com'}).yields(null,userMocked.object);
            sinon.mock(mockDb.User).expects('findOneAndUpdate').withArgs({ email : 'test@test.com' }).yields(null,_updatedUser);
            sinon.mock(mockDb.Log).expects('create').yields(null,_createdLog);
            validApp = {
                email : 'test@test.com',
                password : 'testPassword'
            };
            // db = new Db({});
            // db.init();
            auth = new Authentication(mockDb);
            auth.start(validApp,function (err, res) {
                console.log(err);
                console.log(res);
                result.err = err;
                result.res = res;
                console.log(result);
                done();
            });
        });
        it('user authenticated successfully');
        it('user profile\'s updated');
        it('new log Entry added for authenticated user ');
    });
});