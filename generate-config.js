const fs = require('fs');

const { TIAN_API_KEY, SILICON_API_KEY } = process.env;

if (!TIAN_API_KEY || !SILICON_API_KEY) {
  console.error('请设置 TIAN_API_KEY 和 SILICON_API_KEY 环境变量');
  process.exit(1);
}

const content = `window.config = {\n  tianApiKey: '${TIAN_API_KEY}',\n  siliconApiKey: '${SILICON_API_KEY}'\n};\n`;

fs.writeFileSync('config.js', content);
console.log('已生成 config.js');
