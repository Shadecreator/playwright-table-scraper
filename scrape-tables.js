 
const { chromium } = require('playwright');

async function scrapeTables() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const urls = [
    'https://sanand0.github.io/tdsdata/js_table/?seed=14',
    'https://sanand0.github.io/tdsdata/js_table/?seed=15',
    'https://sanand0.github.io/tdsdata/js_table/?seed=16',
    'https://sanand0.github.io/tdsdata/js_table/?seed=17',
    'https://sanand0.github.io/tdsdata/js_table/?seed=18',
    'https://sanand0.github.io/tdsdata/js_table/?seed=19',
    'https://sanand0.github.io/tdsdata/js_table/?seed=20',
    'https://sanand0.github.io/tdsdata/js_table/?seed=21',
    'https://sanand0.github.io/tdsdata/js_table/?seed=22',
    'https://sanand0.github.io/tdsdata/js_table/?seed=23'
  ];

  let grandTotal = 0;

  for (const url of urls) {
    console.log(`\n🔍 Scraping: ${url}`);
    
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Wait for tables to be generated (they're dynamically created with JS)
      await page.waitForSelector('table', { timeout: 10000 });
      
      // Extract all numbers from all tables
      const pageTotal = await page.evaluate(() => {
        const tables = document.querySelectorAll('table');
        let total = 0;
        
        tables.forEach(table => {
          const cells = table.querySelectorAll('td, th');
          cells.forEach(cell => {
            const text = cell.textContent.trim();
            const number = parseFloat(text);
            if (!isNaN(number)) {
              total += number;
            }
          });
        });
        
        return total;
      });
      
      console.log(`📊 Sum for ${url}: ${pageTotal}`);
      grandTotal += pageTotal;
      
    } catch (error) {
      console.error(`❌ Error scraping ${url}:`, error.message);
    }
  }

  await browser.close();
  
  console.log(`\n🎯 GRAND TOTAL SUM: ${grandTotal}`);
  console.log(`📧 Contact: 23f3003652@ds.study.iitm.ac.in`);
  
  return grandTotal;
}

scrapeTables().catch(console.error);
