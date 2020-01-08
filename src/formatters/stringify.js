export default (value, level) => JSON.stringify(value)
  .replace(/"/g, '')
  .replace(/{/g, `{\n${level === 0 ? ' '.repeat(8) : ' '.repeat(12)}`)
  .replace(/:/g, ': ')
  .replace(/}/g, `\n${level === 0 ? ' '.repeat(4) : ' '.repeat(8)}}`);
