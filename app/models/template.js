import React from 'react';
import ReactDom, {renderToString} from 'react-dom/server';

// should map all components
const documentBody = (musicPlayer, artistInformation, relatedArtists, commentsSection) => `
  <div id="musicPlayer">${musicPlayer}</div>
  <div id="artistInformation">${artistInformation}</div>
  <div id="relatedArtists">${relatedArtists}</div>
  <div id="commentsSection">${commentsSection}</div>
`;

const documentScripts = (items) => `
  <script src="/lib/react.development.js"></script>
  <script src="/lib/react-dom.development.js"></script>

  ${items.map(item => {
    return `<script src="/services/${item}.js"></script>`;
  }).join('\n')}

  <script>
    ${items.map(item => `
      ReactDOM.hydrate(
        React.createElement(${item}),
        document.getElementById('${item}')
      );`).join('\n')}
  </script>
`;

const documentTemplate = (title, body, scripts) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="/style.css">
      <title>${title}</title>
    </head>
    <body>
    ${body}
    </body>
    ${scripts}
  </html>
`;

export function renderClientPage(services, initialState = {}) {

  let components = Object.keys(components).map(item => {
    let component = React.createElement(components[item], initialState);
    return ReactDom.renderToString(component);
  });

  return documentTemplate(
    'dB Cloud Player',
    App(...components),
    Scripts(Object.keys(services))
  );
}



