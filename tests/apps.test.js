const apps = require('../api/apps')
const server = require('../index')
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)

describe('Apps API', function(){
    describe('Persisting repository', function(){
        it('Post a repository into database', (done) => {
            let repo = {
                title: "hotel",
                link: "https://github.com/typicode/hotel",
                description: "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
                tags:["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
            }
            chai.request(server)
                .post('/apps')
                .send(repo)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('array')
                    done()
                })
        })
    })

    describe('Return all repositories', function(){
        it('Get all repositories', (done) => {
            chai.request(server)
                .get('/apps')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    done()
                })
        })
    })

    describe('Return repository by id', function(){
        it('Get one repository', done => {
            chai.request(server)
                .get('/apps/'+10)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('Object')
                    done()
                })
        })
    })

    describe('Remove repository', function(){
        it('Remove from database', done => {
            chai.request(server)
                .delete('/apps/:id')
                .end((err, res) =>{
                    res.should.have.status(204)
                    done()
                })
        })
    })

    describe('Return repository by tag name', function(){
        it('Get repositories with tag', (done) => {
            chai.request(server)
                .get('/tools?tag=node')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    done()
                })
        })
    })
})