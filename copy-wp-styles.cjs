const fs = require('fs');

try {
  const originalHtml = fs.readFileSync('../index.html', 'utf8');
  let reactHtml = fs.readFileSync('./index.html', 'utf8');

  // Extract all stylesheets
  const linkRegex = /<link[^>]*rel=['"]stylesheet['"][^>]*>/gi;
  const links = originalHtml.match(linkRegex) || [];

  // Extract all inline styles (using jsdom to be safer, or regex)
  const styleRegex = /<style[^>]*>[\s\S]*?<\/style>/gi;
  const styles = originalHtml.match(styleRegex) || [];

  const allStyles = [...links, ...styles].join('\n');

  // Inject into index.html before </head>
  // Clean up old injected styles if we run this multiple times
  reactHtml = reactHtml.replace(/<!-- WP_STYLES_START -->[\s\S]*?<!-- WP_STYLES_END -->/, '');

  const injection = `\n<!-- WP_STYLES_START -->\n${allStyles}\n<!-- WP_STYLES_END -->\n</head>`;
  reactHtml = reactHtml.replace('</head>', injection);

  fs.writeFileSync('./index.html', reactHtml);
  console.log('Successfully injected complete WordPress stylesheet bundle into react-app/index.html');

} catch(err) {
  console.error(err);
}
