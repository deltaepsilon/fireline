module.exports = class Page {
  data() {
    return {
      name: 'Page',
      layout: 'base',
    };
  }

  render(params) {
    return String.raw`
      <style>
        .page {
          width: 800px;
          max-width: calc(100vw - 2em);
        }

        .page p {
          margin-bottom: 2em;
        }
      </style>
      <div class="page">${params.content}</div>
    `;
  }
};
