import { validateImdbId } from '../src/middleware/validation.js';

function mockRes() {
  const res = {};
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (data) => { res.body = data; return res; };
  return res;
}

describe('validateImdbId middleware', () => {
  test('passes valid IMDb ID tt0133093', () => {
    const req = { params: { imdbId: 'tt0133093' } };
    const res = mockRes();
    const next = jest.fn();
    validateImdbId(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('passes valid 8-digit IMDb ID tt10872600', () => {
    const req = { params: { imdbId: 'tt10872600' } };
    const res = mockRes();
    const next = jest.fn();
    validateImdbId(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('rejects invalid format abc123', () => {
    const req = { params: { imdbId: 'abc123' } };
    const res = mockRes();
    const next = jest.fn();
    validateImdbId(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(400);
  });

  test('rejects missing ID', () => {
    const req = { params: {} };
    const res = mockRes();
    const next = jest.fn();
    validateImdbId(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(400);
  });

  test('rejects tt with only 6 digits', () => {
    const req = { params: { imdbId: 'tt012345' } };
    const res = mockRes();
    const next = jest.fn();
    validateImdbId(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });
});
