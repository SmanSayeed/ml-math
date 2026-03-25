---
name: add-chapter
description: Guide for adding a new chapter JSON to the ML Math E-Book
---

# Add Chapter Skill

## Steps to Add a New Chapter

1. Create JSON file at `src/data/chapters/{category}/{slug}.json`
2. Follow the Chapter interface from `src/types/index.ts`
3. Update `src/data/meta.json` to include the new chapter in the correct category
4. Update the `prev`/`next` links in adjacent chapters
5. Update `src/lib/chapters.ts` import map if using static imports
6. Run `/verify-build` to ensure everything compiles

## Chapter Checklist

- [ ] slug matches filename (without .json)
- [ ] category matches parent folder name
- [ ] order is sequential within category
- [ ] prev/next slugs are correct
- [ ] story has funny Dhakaia Bengali content
- [ ] definition has valid LaTeX formula
- [ ] at least 2 explanation steps
- [ ] worked example has problem + steps + answer
- [ ] 3-5 ML use cases with working code
- [ ] memory trick is a one-liner

## Usage

```
/add-chapter
```
