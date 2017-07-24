/**
 * Created by Kaveh T a h e r i a n on 22/07/2017.
 */
var assert = require('assert'),
    sinon= require('sinon'),
    mongoose = require('mongoose'),
    Registration = require('../src/server/processes/registration'),
    User = require('../src/server/utils/models')(mongoose).user,
    Log = require('../src/server/utils/models')(mongoose).log,
    Db = require('../src/server/utils/Db');
require('sinon-mongoose');
describe.skip('Registration Process',function () {
    this.timeout(60000);
    var result = {};
    before(function (done) {
        var user = {
            password : 'testPassword123',
            confirm: 'testPassword123',
            email :'test@test.com',
            profile : {
                first_name : 'testFirstName',
                last_name : 'testLastName',
                gender : 'Male',
                age : 20
            }
        };

        // sinon.mock(User).expects('findOne').withArgs({ email : 'test@test.com'}).yields(null,null);
        // sinon.mock(User).expects('create').yields(null,new User(user));
        var _log= {
            subject : 'registration',
            description: 'user registered successfully',
            user_id: user._id
        };
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
        var _createdLog = { subject: 'registration',
            description: 'user registered successfully',
            _id: '592a8fc6dd17460638b0c42a',
            user_id : '592a8fc6dd17460638b0c429',
            modified_at: '2017-05-28T08:52:22.029Z',
            created_at: '2017-05-28T08:52:22.029Z' };
        var db = new Db({});
        db.init();
        db.User = User;
        db.Log= Log;
        console.log(db);
        sinon.mock(db.User).expects('findOne').withArgs({ email : 'test@test.com'}).yields(null,null);
        var userMocked = sinon.mock(new db.User(user));
        userMocked.expects('save').yields(null,userMocked.object);
        sinon.mock(db.User).expects('create').yields(null,_createdUser);
        sinon.mock(db.Log).expects('create').yields(null,_createdLog);
        var _reg = new Registration(db);
        _reg.startRegistration(user,function (err, message) {
            if(err) result.error = err;
            if(message) result.message = message;
            console.log(err);
            console.log(message);
            done();
        });
    });
    describe('Valid inputs provided',function () {
        it('user saved to database');
        it('user has a valid MongoDb _id');
        it('user has a related log record which has a successful registration subject');
    });
});