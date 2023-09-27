const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = chai;

chai.use(chaiHttp);

const GroupController = require('../../controllers/group.controller');
const GroupService = require('../../services/group.service');

describe('GroupController', () => {
  describe('create', () => {
    it('should create a new group', async () => {
      const req = {
        body: { 
          name: "Backend group",
          description: "Creating Backend group"
         },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      sinon.stub(GroupService, 'create').resolves({ name: 'Test Group', _id: '12345' });

      await GroupController.create(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.send.calledWithMatch(/Group created/)).to.be.true;

      GroupService.create.restore(); // Restore the stub after the test
    });
  });

  // Add similar tests for other controller methods (getAll, getOne, update, delete)
});
