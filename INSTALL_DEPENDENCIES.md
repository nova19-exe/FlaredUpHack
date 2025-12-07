# Installing Dependencies

## Issue: npm command not found

If you're getting `npm: command not found`, Node.js and npm are not installed or not in your PATH.

## Solution: Install Node.js (includes npm)

### Option 1: Download from Official Website (Recommended)

1. **Go to**: https://nodejs.org/
2. **Download**: LTS version (v20.x or v18.x recommended)
3. **Install**: Run the installer
4. **Verify**: Open a new terminal and run:
   ```powershell
   node --version
   npm --version
   ```

### Option 2: Using Chocolatey (Windows)

If you have Chocolatey installed:
```powershell
choco install nodejs
```

### Option 3: Using Winget (Windows 10/11)

```powershell
winget install OpenJS.NodeJS.LTS
```

## After Installing Node.js

### Step 1: Close and Reopen Terminal

Close your current terminal and open a new one so PATH updates take effect.

### Step 2: Verify Installation

```powershell
node --version
npm --version
```

You should see version numbers like:
```
v20.11.0
10.2.4
```

### Step 3: Install Project Dependencies

Navigate to your project directory:
```powershell
cd C:\Users\sanas\OneDrive\Desktop\FlaredUpHack
```

Then install dependencies:
```powershell
npm install
```

This will:
- Read `package.json`
- Install all dependencies
- Create `node_modules/` folder
- Create `package-lock.json`

### Step 4: Verify Installation

Check if Hardhat is installed:
```powershell
npm list hardhat
npm list @nomicfoundation/hardhat-toolbox
```

## Expected Output

When `npm install` runs successfully, you'll see:
```
added 1234 packages, and audited 1235 packages in 2m
```

## Troubleshooting

### If npm still not found after installing Node.js:

1. **Restart your computer** - Sometimes PATH updates need a full restart
2. **Check PATH manually**:
   ```powershell
   $env:PATH
   ```
   Should include: `C:\Program Files\nodejs\`

3. **Add to PATH manually** (if needed):
   - Open System Properties → Environment Variables
   - Add `C:\Program Files\nodejs\` to PATH
   - Restart terminal

### If installation fails:

1. **Clear npm cache**:
   ```powershell
   npm cache clean --force
   ```

2. **Delete node_modules and reinstall**:
   ```powershell
   Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
   Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
   npm install
   ```

## Quick Checklist

- [ ] Node.js installed (v18+)
- [ ] Terminal restarted after Node.js installation
- [ ] `node --version` works
- [ ] `npm --version` works
- [ ] In project directory: `C:\Users\sanas\OneDrive\Desktop\FlaredUpHack`
- [ ] Run `npm install`
- [ ] Dependencies installed successfully

## Next Steps After Installation

Once dependencies are installed:

1. **Compile contracts**:
   ```powershell
   npm run compile
   ```

2. **Run tests**:
   ```powershell
   npm run test:smartaccount
   ```

---

**Install Node.js first, then run `npm install` in your project directory!**




