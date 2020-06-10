const path = require('path');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('static');
  eleventyConfig.addPassthroughCopy('static');


  eleventyConfig.dir = { output: path.join(__dirname, '..', 'docs') };

  return eleventyConfig;
};
