export function isValidImdbId(id) {
  return /^tt\d{7,8}$/.test(id.trim());
}

export function isImdbId(input) {
  return /^tt\d{7,8}$/.test(input.trim());
}

export function isValidInput(input) {
  return input.trim().length >= 1;
}

export function formatInput(raw) {
  return raw.trim();
}
