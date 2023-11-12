const Profile = require('../models/profile');
const assert = require('assert');
const chai = require('chai');
const { expect } = chai;
const app = require('../app');
// This is working good
describe('create records', function () {
    it('create a profile in db', function (done) {
        const user = { "name": "Kishori Ji", "description": "Adolph Larrue Martinez III.", "mbti": "ISFJ", "enneagram": "9w3", "variant": "sp/so", "tritype": 725, "socionics": "SEE", "sloan": "RCOEN", "psyche": "FEVL", "image": "https://avatars.githubusercontent.com/u/93823479?v=4" };
        const profile = new Profile({ name: user.name, description: user.description, mbti: user?.mbti, enneagram: user?.enneagram, variant: user?.variant, tritype: user?.tritype, socionics: user?.socionics, sloan: user?.sloan, psyche: user?.psyche, image: user?.image });
        profile.save().then(() => {
            assert(!profile.isNew)
            done();
        }).catch(() => assert(false));
    });
});

// This is working good
describe('Profile API', () => {
    it('should create a new profile', (done) => {
        const user = { "name": "Kishori Ji", "description": "Adolph Larrue Martinez III.", "mbti": "ISFJ", "enneagram": "9w3", "variant": "sp/so", "tritype": 725, "socionics": "SEE", "sloan": "RCOEN", "psyche": "FEVL", "image": "https://avatars.githubusercontent.com/u/93823479?v=4" };
        chai.request(app).post('/user/add').send({ name: user.name, description: user.description, mbti: user?.mbti, enneagram: user?.enneagram, variant: user?.variant, tritype: user?.tritype, socionics: user?.socionics, sloan: user?.sloan, psyche: user?.psyche, image: user?.image }).then((res) => { 
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').eql('Profile created successfully');
            done();
        });
    });
});

describe('Post API', () => {
    // This is working good
    it('get all post', (done) => {
        const res = chai.request(app).get('/post/all').then((res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').eql('All Post');
            done();
        });
    });

    // This is working good
    it('create post', (done) => {
        const post = { "user_id": "654e33cfc19e3756b222c2f6", "description": "this post is created by kishori ji", "image": "https://avatars.githubusercontent.com/u/93823479?v=4" }
        chai.request(app).post('/post/create').send({ user_id: post.user_id, description: post.description, image: post.image }).then((res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').eql('Post Created Successfully');
            done();
        });
    });
});