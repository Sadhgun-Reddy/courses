const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window;
global.document = window.document;
global.navigator = window.navigator;

const HTMLtoJSX = require('htmltojsx');

const rawHtml = fs.readFileSync('../about-us/index.html', 'utf8');

const headerStart = rawHtml.indexOf('<div class="thim-ekit__header">');
const contentStart = rawHtml.indexOf('<div data-elementor-type="wp-page"', headerStart);
const contentEnd = rawHtml.indexOf('<div class="thim-ekit__footer">');

function prepareHtml(html) {
    if (!html) return '';
    return html
        .replace(/elementor-invisible/g, '')
        .replace(/opacity:\s*0;/g, '')
        .replace(/data-src=/g, 'src=')
        .replace(/lazyload/g, '')
        .replace(/<!--(.*?)-->/g, ''); 
}

const contentHtml = prepareHtml(rawHtml.slice(contentStart, contentEnd));

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

const styleStart = rawHtml.indexOf("<style id='elementor-frontend-inline-css'");
const styleEnd = rawHtml.indexOf('</style>', styleStart) + 8;
const styleHtml = styleStart !== -1 ? rawHtml.slice(styleStart, styleEnd) : '';

const contentJsx = toJsx(contentHtml);
const styleJsx = toJsx(styleHtml);

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
    <>
      ${styleJsx}
      <main className="main-content">
        ${contentJsx}
      </main>
    </>
  );
}
`);

console.log('About Us JSX and styles extraction complete');
