import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n🔧 Running post-install checks...\n');

// Check if .env exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
  console.log('⚠️  .env file not found');
  
  if (fs.existsSync(envExamplePath)) {
    console.log('📝 Creating .env from .env.example...');
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created!');
    console.log('⚠️  Remember to add your Google Client ID in .env');
  } else {
    console.log('📝 Creating default .env file...');
    const defaultEnv = `# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com

# API Configuration
VITE_API_URL=http://localhost:5000

# App Configuration
VITE_APP_NAME=Visual Language Learning
`;
    fs.writeFileSync(envPath, defaultEnv);
    console.log('✅ .env file created!');
    console.log('⚠️  Remember to add your Google Client ID in .env');
  }
} else {
  console.log('✅ .env file exists');
}

// Check critical packages
console.log('\n📦 Verifying critical packages...');

const criticalPackages = [
  '@react-oauth/google',
  'jwt-decode',
  'react',
  'react-dom'
];

let allInstalled = true;

for (const pkg of criticalPackages) {
  const pkgPath = path.join(__dirname, 'node_modules', pkg);
  if (fs.existsSync(pkgPath)) {
    console.log(`✅ ${pkg}`);
  } else {
    console.log(`❌ ${pkg} - NOT FOUND`);
    allInstalled = false;
  }
}

if (allInstalled) {
  console.log('\n✅ All critical packages installed successfully!');
  console.log('\n🚀 Ready to start:');
  console.log('   npm run dev\n');
} else {
  console.log('\n⚠️  Some packages are missing. Try running:');
  console.log('   npm install\n');
}
