# UI5 Todo List Application

This is a learning project to study UI5 (OpenUI5/SAPUI5) framework.

## Description

This project was created for learning the basics of application development using the UI5 framework from SAP. The project demonstrates the basic structure of a UI5 application and the main concepts of the framework.

## Development Tools

### ESLint 9 with Flat Config

This project uses ESLint 9.30+ with the new flat configuration system:

- **Configuration file**: `eslint.config.mjs`
- **Format**: ESM modules with flat config array
- **Features**: Modern JavaScript rules, UI5-specific adjustments, Prettier integration

### Git Hooks

#### Pre-push Hook

The project includes a **pre-push git hook** that automatically runs code quality checks before allowing push to the repository:

**What it checks:**

- 🔍 **ESLint rules** - ensures code follows linting standards
- 🎨 **Prettier formatting** - ensures consistent code formatting

**How it works:**

- Runs automatically on every `git push`
- Blocks push if any issues are found
- Shows clear error messages and suggestions for fixes
- Can be bypassed with `git push --no-verify` if needed

**Example output:**

```bash
🔍 Running code quality checks before push...
📋 Checking ESLint rules...
✅ ESLint checks passed
🎨 Checking Prettier formatting...
✅ Prettier checks passed
🎉 All code quality checks passed! Proceeding with push...
```

### Available Scripts

```bash
npm run start          # Start UI5 development server
npm run lint           # Run ESLint checks
npm run lint:fix       # Run ESLint with auto-fix
npm run prettier       # Check code formatting
npm run prettier:fix   # Fix code formatting
```

### Dependencies

- **ESLint 9.30+**: Modern JavaScript linting with flat config
- **Prettier 3.6+**: Code formatting
- **UI5 CLI 4.0+**: UI5 development tools
- **Globals**: Environment-specific global variables
