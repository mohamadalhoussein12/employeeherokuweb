const server = require('../server.js');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe("Test get Departments route", () => {
  it("It should get all departments", (done) => {
    chai.request(server)
        .get("/api/department/getDepartments")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('success').eq(true);
          res.body.should.have.property('data').length.gt(0);
          done();
        })
  })
})
