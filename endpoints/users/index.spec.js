const handlers = require("./index");

describe("Endpoint", () => {
  describe("Users", () => {
    describe("Get", () => {
      it("return ti user json", async() => {
        const axios = {
          get: jest.fn().mockResolvedValue({ data: 1 }),
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
        await handlers({ axios }).get({}, res);
        expect(res.status.mock.calls).toEqual([
          [200]
        ]);
        expect(res.send.mock.calls).toEqual([
          [1]
        ]);
      });
    });
    describe("Post", () => {
      it("Creates a resources", async() => {
        const axios = {
          post: jest.fn().mockResolvedValue({ data: 1 }),
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
        const req = {
          body: "Request Body",
        };
        await handlers({ axios }).post(req, res);
        expect(res.status.mock.calls).toEqual([
          [201]
        ]);
        expect(res.send.mock.calls).toEqual([
          [1]
        ]);
        expect(axios.post.mock.calls).toEqual([
          ["https://jsonplaceholder.typicode.com/users", "Request Body"],
        ]);
      });
    });
    describe("Put", () => {
      it("Updates resoruce", async() => {
        const axios = {
          put: jest.fn().mockResolvedValue({ data: 1 }),
        };
        const req = {
          body: "request Body",
          params: {
            id: 12,
          },
        };
        const res = {
          sendStatus: jest.fn(),
        };
        await handlers({ axios }).put(req, res);
        expect(axios.put.mock.calls).toEqual([
          ["https://jsonplaceholder.typicode.com/users/12", "request Body"],
        ]);
        expect(res.sendStatus.mock.calls).toEqual([
          [204]
        ]);
      });
    });
    describe("Delete", () => {
      it("Delete resoruces", async() => {
        const axios = {
          delete: jest.fn(),
        };
        const req = {
          params: {
            id: 11,
          },
        };
        const res = {
          sendStatus: jest.fn(),
        };
        await handlers({ axios }).delete(req, res);
        expect(axios.delete.mock.calls).toEqual([
          ["https://jsonplaceholder.typicode.com/users/11"],
        ]);
        expect(res.sendStatus.mock.calls).toEqual([
          [204]
        ]);
      });
    });
  });
});