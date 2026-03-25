---
name: verify-build
description: Run pnpm build and lint to verify the project builds without errors
---

# Verify Build Skill

Run the build and lint checks for the ML Math E-Book project.

## Steps

1. Run `pnpm build` from the project root (`L:/projects/ML-math/ml-math`)
2. Check for TypeScript errors
3. Check for build warnings
4. Verify `out/` directory is generated with expected routes
5. Run `pnpm lint` to check for linting issues

## Expected Output

- Build should succeed with `output: 'export'`
- The `out/` directory should contain:
  - `index.html` (homepage)
  - `chapter/{slug}/index.html` for each of the 56 chapters
- No TypeScript errors
- No lint errors

## Usage

```
/verify-build
```
