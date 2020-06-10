module.exports = class Demo {
  data() {
    return {
      name: 'demo',
      layout: 'react',
    };
  }

  render(params) {
    return String.raw`
      <script src="/static/scripts/demo.js"></script>
    `;
  }
};
