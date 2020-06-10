const fs = require('fs');
const path = require('path');
const pathPrefix = [__dirname, '..', '..', 'app', 'vault'].join('/');
const variablesPath = path.resolve(pathPrefix, 'variables.json');
const { data: secrets } = require(path.resolve(pathPrefix, 'secrets.json'));
const { variables, files } = Object.keys(secrets).reduce(
  (acc, key) => {
    const isFile = key.match(/\./);
    const value = secrets[key];

    isFile ? acc.files.push([key, value]) : (acc.variables[key] = value);

    return acc;
  },
  { variables: {}, files: [] }
);

files.forEach(([key, value]) => {
  const filePath = path.resolve(pathPrefix, key);
  const utf8Encoded = Buffer.from(value, 'base64').toString('utf8');

  fs.writeFileSync(filePath, utf8Encoded, 'utf8');

  console.info('wrote', filePath);
});

fs.writeFileSync(variablesPath, JSON.stringify(variables), 'utf8');
console.info('wrote', variablesPath);
