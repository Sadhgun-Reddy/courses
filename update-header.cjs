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

fs.writeFileSync('./src/components/Header.jsx', `
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  useEffect(() => {
    // Dispatch events so Elementor scripts can bind if any
    setTimeout(() => {
      window.dispatchEvent(new Event('load'));
      window.dispatchEvent(new Event('DOMContentLoaded'));
      window.dispatchEvent(new Event('resize'));
    }, 500);
  }, []);

  return (
    <>
      ${headerJsx}
    </>
  );
}
`);

console.log('Header JSX extracted and rewritten successfully.');
