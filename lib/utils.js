exports.sanitizeCommitMessage = (message) =>
  message
    .split('\n')
    .filter(line => line.indexOf('#') !== 0)
    .join('\n')
    .trim();
