const fs = require('fs');

const rawHtml = fs.readFileSync('../index.html', 'utf8');

const headStart = rawHtml.indexOf('<head>') + 6;
const headEnd = rawHtml.indexOf('</head>');
const bodyStart = rawHtml.indexOf('<body');
const bodyInnerStart = rawHtml.indexOf('>', bodyStart) + 1;
const bodyEnd = rawHtml.lastIndexOf('</body>');

function fixPaths(html) {
    return html.replace(/(href|src|data-src)="([^"]*?)"/g, (match, attr, path) => {
        if (!path.startsWith('http') && !path.startsWith('//') && !path.startsWith('data:') && !path.startsWith('#')) {
            return `${attr}="/${path}"`;
        }
        return match;
    });
}

const headContent = fixPaths(rawHtml.slice(headStart, headEnd));

// Extract the body but manually correct Elementor's invisible classes and lazy load images
const bodyContent = fixPaths(rawHtml.slice(bodyInnerStart, bodyEnd))
  .replace(/elementor-invisible/g, '') // Removes the class that hides animated elements
  .replace(/opacity:\s*0;/g, '') // Fallback for hardcoded zero opacity
  .replace(/data-src=/g, 'src=') // Fix lazy-loaded image sources
  .replace(/lazyload/g, ''); // Remove lazyload class just in case

const newIndexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${headContent}
  </head>
  <body class="home wp-singular page-template page-template-elementor_header_footer page page-id-35321 wp-embed-responsive wp-theme-Voltedz elementor-default elementor-template-full-width elementor-kit-19 elementor-page elementor-page-35321">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;

fs.writeFileSync('./index.html', newIndexHtml);

fs.writeFileSync('./src/App.jsx', `
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Attempt to manually trigger events for WP plugins (like Swiper, etc.)
    setTimeout(() => {
      window.dispatchEvent(new Event('load'));
      window.dispatchEvent(new Event('DOMContentLoaded'));
      window.dispatchEvent(new Event('resize'));
      
      const elementorFrontend = window.elementorFrontend;
      if (elementorFrontend && elementorFrontend.init) {
         elementorFrontend.init();
      }
    }, 500);
  }, []);

  const html = ${JSON.stringify(bodyContent)};

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default App;
`);

console.log('Extraction complete');
