const authenticate = require("./authenticate");

describe("Middlewares", () => {
  describe("Authenticate", () => {
    it.skip("Should have id 1", () => {
      const req = {
        header: jest.fn().mockReturnValue("1"),
      };
      const res = {
        sendStatus: jest.fn(),
      };
      const next = jest.fn();
      authenticate(req, res, next);
      expect(req.header.mock.calls).toEqual([
        ["user_id"]
      ]);
      expect(res.sendStatus.mock.calls).toEqual([]);
      expect(next.mock.calls).toEqual([
        []
      ]);
    });
    it.skip("Should fail if user id is not 1", () => {
      const req = {
        header: jest.fn().mockReturnValue("2"),
      };
      const res = {
        sendStatus: jest.fn(),
      };
      const next = jest.fn();
      authenticate(req, res, next);
      expect(req.header.mock.calls).toEqual([
        ["user_id"]
      ]);
      expect(res.sendStatus.mock.calls).toEqual([
        [403]
      ]);
      expect(next.mock.calls).toEqual([]);
    });
  });
});