import { isValidImdbId, formatImdbId } from '../src/lib/validation';

describe('isValidImdbId', () => {
  test('returns true for tt0133093', () => {
    expect(isValidImdbId('tt0133093')).toBe(true);
  });

  test('returns true for 8-digit ID tt10872600', () => {
    expect(isValidImdbId('tt10872600')).toBe(true);
  });

  test('returns false for random string', () => {
    expect(isValidImdbId('thematrix')).toBe(false);
  });

  test('returns false for too short tt01234', () => {
    expect(isValidImdbId('tt01234')).toBe(false);
  });

  test('returns false for empty string', () => {
    expect(isValidImdbId('')).toBe(false);
  });

  test('returns false for uppercase TT0133093', () => {
    expect(isValidImdbId('TT0133093')).toBe(false);
  });
});

describe('formatImdbId', () => {
  test('trims whitespace', () => {
    expect(formatImdbId('  tt0133093  ')).toBe('tt0133093');
  });

  test('lowercases input', () => {
    expect(formatImdbId('TT0133093')).toBe('tt0133093');
  });
});
