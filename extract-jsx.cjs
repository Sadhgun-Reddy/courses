const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window;
global.document = window.document;
global.navigator = window.navigator;

const HTMLtoJSX = require('htmltojsx');

const rawHtml = fs.readFileSync('../index.html', 'utf8');

const headerStart = rawHtml.indexOf('<div class="thim-ekit__header">');
const contentStart = rawHtml.indexOf('<div data-elementor-type="wp-page"', headerStart);
const contentEnd = rawHtml.indexOf('<div class="thim-ekit__footer">');
const footerStart = contentEnd;
const footerEnd = rawHtml.lastIndexOf('</body>');

function prepareHtml(html) {
    if (!html) return '';
    return html
        .replace(/elementor-invisible/g, '')
        .replace(/opacity:\s*0;/g, '')
        .replace(/data-src=/g, 'src=')
        .replace(/lazyload/g, '')
        .replace(/<!--(.*?)-->/g, ''); 
}

const headerHtml = prepareHtml(rawHtml.slice(headerStart, contentStart));
const contentHtml = prepareHtml(rawHtml.slice(contentStart, contentEnd));
const footerHtml = prepareHtml(rawHtml.slice(footerStart, footerEnd));

const converter = new HTMLtoJSX({
  createClass: false,
  outputClassName: 'Component'
});

function toJsx(htmlStr) {
  try {
    return converter.convert(htmlStr);
  } catch(e) {
    console.error("Error converting HTML:", e.message);
    return '<div>Error converting HTML to JSX</div>';
  }
}

const headerJsx = toJsx(headerHtml);
const contentJsx = toJsx(contentHtml);
const footerJsx = toJsx(footerHtml);

fs.writeFileSync('./src/components/Header.jsx', `
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      ${headerJsx}
    </>
  );
}
`);

fs.writeFileSync('./src/components/Footer.jsx', `
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      ${footerJsx}
    </>
  );
}
`);

fs.writeFileSync('./src/pages/Home.jsx', `
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('load'));
      window.dispatchEvent(new Event('DOMContentLoaded'));
      window.dispatchEvent(new Event('resize'));
    }, 500);
  }, []);

  return (
    <main className="main-content">
      ${contentJsx}
    </main>
  );
}
`);

console.log('JSX extraction complete');
