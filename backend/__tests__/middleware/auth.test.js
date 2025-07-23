const jwt = require('jsonwebtoken');
const auth = require('../../src/middleware/auth');
const sinon = require('sinon');

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      header: sinon.stub().returns('Bearer valid_token'),
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    next = sinon.spy();
  });

  it('should call next() for valid admin token', async () => {
    const decoded = { role: 'admin' };
    sinon.stub(jwt, 'verify').returns(decoded);
    process.env.JWT_SECRET = 'test_secret';

    await auth(req, res, next);

    expect(next.calledOnce).toBe(true);
    expect(req.user).toEqual(decoded);
    jwt.verify.restore();
  });

  it('should return 401 if no token is provided', async () => {
    req.header = sinon.stub().returns(null);

    await auth(req, res, next);

    expect(res.status.calledWith(401)).toBe(true);
    expect(res.json.calledWith({ error: 'No token provided' })).toBe(true);
    expect(next.called).toBe(false);
  });

  it('should return 403 if role is not admin', async () => {
    const decoded = { role: 'user' };
    sinon.stub(jwt, 'verify').returns(decoded);

    await auth(req, res, next);

    expect(res.status.calledWith(403)).toBe(true);
    expect(res.json.calledWith({ error: 'Admin access required' })).toBe(true);
    expect(next.called).toBe(false);
    jwt.verify.restore();
  });

  it('should return 401 for invalid token', async () => {
    sinon.stub(jwt, 'verify').throws(new Error('Invalid token'));

    await auth(req, res, next);

    expect(res.status.calledWith(401)).toBe(true);
    expect(res.json.calledWith({ error: 'Invalid token' })).toBe(true);
    expect(next.called).toBe(false);
    jwt.verify.restore();
  });
});