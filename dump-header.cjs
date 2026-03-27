const fs = require('fs');

try {
  const rawHtml = fs.readFileSync('../index.html', 'utf8');
  const headerStart = rawHtml.indexOf('<div class="thim-ekit__header">');
  const contentStart = rawHtml.indexOf('<div data-elementor-type="wp-page"', headerStart);

  if (headerStart !== -1 && contentStart !== -1) {
    const headerHtml = rawHtml.slice(headerStart, contentStart);
    fs.writeFileSync('header-original.html', headerHtml);
    console.log('Extracted to header-original.html');
  } else {
    console.log('Could not find header boundaries');
  }
} catch (e) {
  console.error(e);
}
