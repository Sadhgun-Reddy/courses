const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window;
global.document = window.document;
global.navigator = window.navigator;

const HTMLtoJSX = require('htmltojsx');
const converter = new HTMLtoJSX({ createClass: false, outputClassName: 'Component' });

function prepareHtml(html) {
    if (!html) return '';
    return html
        .replace(/elementor-invisible/g, '')
        .replace(/opacity:\s*0;/g, '')
        .replace(/data-src=/g, 'src=')
        .replace(/lazyload/g, '')
        .replace(/<!--(.*?)-->/g, ''); 
}

function toJsx(htmlStr) {
  try { return converter.convert(htmlStr); } 
  catch(e) { return '<div>Error converting HTML to JSX</div>'; }
}

try {
  // Home Extract
  const rawHtmlHome = fs.readFileSync('../index.html', 'utf8');
  const headerStartHome = rawHtmlHome.indexOf('<div class="thim-ekit__header">');
  const contentStartHome = rawHtmlHome.indexOf('<div data-elementor-type="wp-page"', headerStartHome);
  const contentEndHome = rawHtmlHome.indexOf('<div class="thim-ekit__footer">');

  const contentHtmlHome = prepareHtml(rawHtmlHome.slice(contentStartHome, contentEndHome));
  const contentJsxHome = toJsx(contentHtmlHome);

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
      ${contentJsxHome}
    </main>
  );
}
  `);

  // AboutUs Extract
  const rawHtmlAbout = fs.readFileSync('../about-us/index.html', 'utf8');
  const headerStartAbout = rawHtmlAbout.indexOf('<div class="thim-ekit__header">');
  const contentStartAbout = rawHtmlAbout.indexOf('<div data-elementor-type="wp-page"', headerStartAbout);
  const contentEndAbout = rawHtmlAbout.indexOf('<div class="thim-ekit__footer">');

  const contentHtmlAbout = prepareHtml(rawHtmlAbout.slice(contentStartAbout, contentEndAbout));
  const contentJsxAbout = toJsx(contentHtmlAbout);

  fs.writeFileSync('./src/pages/AboutUs.jsx', `
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('load'));
      window.dispatchEvent(new Event('DOMContentLoaded'));
      window.dispatchEvent(new Event('resize'));
    }, 500);
  }, []);

  return (
    <main className="main-content">
      ${contentJsxAbout}
    </main>
  );
}
  `);

  console.log('Restored Home and AboutUs Successfully!');
} catch(err) {
  console.error("Extraction error: ", err);
}
