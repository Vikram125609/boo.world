const Profile = require('../models/profile');
const assert = require('assert');
const chai = require('chai');
const { expect } = chai;
const app = require('../app');
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
    it('get all post', (done) => {
        const res = chai.request(app).get('/post/all').then((res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').eql('All Post');
            done();
        });
    });

    it('create post', (done) => {
        const post = { "user_id": "654e33cfc19e3756b222c2f6", "description": "this post is created by kishori ji", "image": "https://avatars.githubusercontent.com/u/93823479?v=4" }
        chai.request(app).post('/post/create').send({ user_id: post.user_id, description: post.description, image: post.image }).then((res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').eql('Post Created Successfully');
            done();
        });
    });

    it('add comment on post', (done) => {
        const comment = { user_id: '654e33cfc19e3756b222c2f6', post_id: '654e34f5daff20794cb68bd2', comment: 'this is a test comment' };
        chai.request(app).post('/post/comment').send({ user_id: comment.user_id, comment: comment.comment, post_id: comment.post_id }).then((res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').eql('Commented Successfully');
            done();
        });
    });

    it('like a post', (done) => {
        const data = { user_id: '654e33cfc19e3756b222c2f6', post_id: '654e34f5daff20794cb68bd2' };
        chai.request(app).post('/post/like').send({ user_id: data.user_id, post_id: data.post_id }).then((res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').eql('Liked Successfully');
            done();
        });
    });

    it('get a post by id', (done) => {
        const data = { post_id: '654e34f5daff20794cb68bd2' };
        chai.request(app).get(`/post/${data.post_id}`).then((res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').eql('Get Post Using Id');
            done();
        });
    });

    it('sort best comment on post', (done) => {
        const data = { post_id: '654e34f5daff20794cb68bd2' };
        chai.request(app).get(`/post/${data.post_id}/comment?sort=best`).then((res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').eql('best comments');
            done();
        });
    });

    it('sort latest comment on post', (done) => {
        const data = { post_id: '654e34f5daff20794cb68bd2' };
        chai.request(app).get(`/post/${data.post_id}/comment?sort=recent`).then((res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').eql('recent comments');
            done();
        });
    });
});