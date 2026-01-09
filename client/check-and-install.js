import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Checking installation...\n');

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
const packageLockPath = path.join(__dirname, 'package-lock.json');

let needsInstall = false;

if (!fs.existsSync(nodeModulesPath)) {
  console.log('❌ node_modules folder not found');
  needsInstall = true;
} else {
  console.log('✅ node_modules folder exists');
  
  // Check critical packages
  const criticalPackages = [
    '@react-oauth/google',
    'jwt-decode',
    'react',
    'react-dom'
  ];
  
  for (const pkg of criticalPackages) {
    const pkgPath = path.join(nodeModulesPath, pkg);
    if (!fs.existsSync(pkgPath)) {
      console.log(`❌ Missing package: ${pkg}`);
      needsInstall = true;
    } else {
      console.log(`✅ Package found: ${pkg}`);
    }
  }
}

if (needsInstall) {
  console.log('\n⚠️  Some packages are missing!');
  console.log('📦 Installing packages...\n');
  
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('\n✅ Installation complete!');
    console.log('\n🚀 You can now run: npm run dev');
  } catch (error) {
    console.error('\n❌ Installation failed!');
    console.error('Please run manually: npm install');
    process.exit(1);
  }
} else {
  console.log('\n✅ All packages are installed!');
  console.log('🚀 Ready to run: npm run dev');
}
