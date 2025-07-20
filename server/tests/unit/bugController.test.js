const Bug = require('../../src/models/Bug');
const {
  getBugs,
  getBug,
  createBug,
  updateBug,
  deleteBug
} = require('../../src/controllers/bugs');

// Mock the Bug model
jest.mock('../../src/models/Bug');

describe('Bug Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  describe('getBugs', () => {
    it('should return all bugs', async () => {
      const mockBugs = [{ title: 'Bug 1' }, { title: 'Bug 2' }];
      Bug.find.mockResolvedValue(mockBugs);

      await getBugs(req, res, next);

      expect(Bug.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        count: mockBugs.length,
        data: mockBugs
      });
    });

    it('should handle errors', async () => {
      const error = new Error('Test error');
      Bug.find.mockRejectedValue(error);

      await getBugs(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('createBug', () => {
    it('should create a new bug', async () => {
      const mockBug = { title: 'New Bug', description: 'Test' };
      req.body = mockBug;
      Bug.create.mockResolvedValue(mockBug);

      await createBug(req, res, next);

      expect(Bug.create).toHaveBeenCalledWith(mockBug);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockBug
      });
    });
  });
});