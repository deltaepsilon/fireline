module.exports = function Base(params) {
  const title = params.title || params.name || 'Chris Esplin';

  return String.raw`
    <!DOCTYPE html>
    <html lang="en">
    <head profile="http://www.w3.org/2005/10/profile">
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <link rel="icon" type="image/png" href="/static/images/logos/chrisesplin-logo.png">
      <link rel="stylesheet" href="https://use.typekit.net/dln5fow.css">
      <link rel="stylesheet" href="/static/css/base.css"/>

      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-D18SD6692G"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-D18SD6692G');
      </script>
    </head>
    <body>
      <header>
        <a href="/">
          <h1>Fireline</h1>
        </a>
      </header>

      <div id="content">${params.content}</div>

      <footer>
        <ul>
          <li>
            <a href="/pages/demo">Demo</a>
          </li>
        </ul>
      </footer>
    </body>
    </html>
  `;
};
