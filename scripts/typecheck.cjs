const { execSync } = require('child_process');
execSync('tsc --noEmit -p tsconfig.json', { stdio: 'inherit' });