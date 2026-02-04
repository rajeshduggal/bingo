import { ESLint } from 'eslint';

test('eslint: codebase has no lint errors', async () => {
  const eslint = new ESLint({});
  const results = await eslint.lintFiles(['src']);
  const errorCount = results.reduce((sum, r) => sum + r.errorCount, 0);
  const warningCount = results.reduce((sum, r) => sum + r.warningCount, 0);
  if (errorCount > 0) {
    const formatter = await eslint.loadFormatter('stylish');
    const resultText = formatter.format(results);
    // Print results to test output for debugging
    console.error(resultText);
    throw new Error(`ESLint found ${errorCount} errors and ${warningCount} warnings`);
  }
});
