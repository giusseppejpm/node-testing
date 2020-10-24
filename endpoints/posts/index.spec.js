const postsHandlers = require("./index");

describe("Endpoints", () => {
  describe("Posts", () => {
    it("Create a resources", async() => {
      const mockUser = [{ id: 1 }, { id: 2 }];
      const post = {
        userId: 1,
        id: 1,
        tittle: "Titulo",
        body: "Cuerpo del body",
      };
      const req = {
        body: post,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };
      const axios = {
        get: jest.fn().mockResolvedValue({ data: mockUser }),
        post: jest.fn().mockResolvedValue({ data: { id: 1000 } }),
      };
      await postsHandlers({ axios }).post(req, res);
      expect(res.status.mock.calls).toEqual([
        [201]
      ]);
      expect(res.send.mock.calls).toEqual([
        [{ id: 1000 }]
      ]);
      expect(axios.post.mock.calls).toEqual([
        ["https://jsonplaceholder.typicode.com/posts", post],
      ]);
      expect(axios.get.mock.calls).toEqual([
        ["https://jsonplaceholder.typicode.com/users"],
      ]);
    });
    it("Should not create if userId dont exist", async() => {
      const mockUser = [{ id: 1 }, { id: 2 }];
      const post = {
        userId: 3,
        id: 3,
        tittle: "Titulo",
        body: "Cuerpo del body",
      };
      const req = {
        body: post,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
        sendStatus: jest.fn(),
      };
      const axios = {
        get: jest.fn().mockResolvedValue({ data: mockUser }),
        post: jest.fn().mockResolvedValue({ data: { id: 1000 } }),
      };
      await postsHandlers({ axios }).post(req, res);
      expect(axios.post.mock.calls).toEqual([]);
      expect(res.sendStatus.mock.calls).toEqual([
        [400]
      ]);
    });
  });
});