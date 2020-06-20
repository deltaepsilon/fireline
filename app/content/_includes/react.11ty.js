module.exports = class React {
  data() {
    return {
      name: 'React',
      layout: 'base',
    };
  }

  render(params) {
    return String.raw`
      <style>
      </style>
      <div id="react-root"></div>
      <div>${params.content}</div>
    `;
  }
};
