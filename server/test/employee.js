const server = require('../server.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongo = require('../database/mongo');
const { DB_MODELS } = require('../constants');
chai.should();
chai.use(chaiHttp);

describe("Test get Employees route", () => {
  it("It should get 10 Employees", (done) => {
    chai.request(server)
        .get("/api/employee/getEmployees")
        .query(({
          limit:10,
          offset:0
        }))
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('success').eq(true);
          res.body.should.have.property('data').property('totalCount').gt(0);
          res.body.should.have.property('data').property('data').length(10);
          done();
        })
  })
})
