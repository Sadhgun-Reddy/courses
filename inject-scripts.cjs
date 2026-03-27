const fs = require('fs');

const origPath = 'c:\\moironix\\LMS\\akademic.arrowtheme.com\\akademic.arrowtheme.com\\index.html';
const destPath = 'c:\\moironix\\LMS\\akademic.arrowtheme.com\\akademic.arrowtheme.com\\react-app\\index.html';

const origHtml = fs.readFileSync(origPath, 'utf8');
const destHtml = fs.readFileSync(destPath, 'utf8');

// Find where scripts start in original (after back-to-top)
const scriptsStart = origHtml.indexOf('<div id="back-to-top"');
const scriptsEnd = origHtml.indexOf('</body>');

if (scriptsStart !== -1 && scriptsEnd !== -1) {
    const scriptsStr = origHtml.substring(scriptsStart, scriptsEnd);
    // Remove the back-to-top div because we only want scripts
    const justScripts = scriptsStr.replace(/<div id="back-to-top"[^>]+>.*?<\/div>/s, '')
                                  .replace(/<script type="speculationrules">.*?<\/script>/s, '')
                                  .replace(/<div id="tp_style_selector".*?<\/style>/s, '');
    
    const newDestHtml = destHtml.replace('</body>', justScripts + '\n  </body>');
    fs.writeFileSync(destPath, newDestHtml, 'utf8');
    console.log('Scripts injected successfully.');
} else {
    console.log('Could not find script bounds in original HTML');
}
