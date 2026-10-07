# Overleaf Compilation Fix & Font Dependency Removal Log (#29)

- **Iteration**: #29 (Fix Overleaf Compilation Error: `fontawesome5.sty not found`)
- **Files**:
  - `cover-letter-overleaf.tex`
  - `resume-overleaf.tex`
- **Location**: `logs/resume/resume_certifications_update_#29.md`
- **Root Cause**: The Overleaf project environment was missing the `fontawesome5` package (`LaTeX Error: File 'fontawesome5.sty' not found. Cover-letter.tex, 16`).

---

## Fixes Implemented

1. **Removed `fontawesome5` Dependency**:
   - Because the contact headers in both documents were already migrated to plain text and commas for ATS optimization, `\usepackage{fontawesome5}` and `\usepackage{marvosym}` were completely unused.
   - Removed `\usepackage{fontawesome5}` and `\usepackage{marvosym}` from both `cover-letter-overleaf.tex` and `resume-overleaf.tex`.

2. **Safe Unicode Glyph Generation (`glyphtounicode`)**:
   - Wrapped `glyphtounicode` inside `\ifdefined\pdfgentounicode ... \fi` to prevent compiler stops across pdfLaTeX, XeLaTeX, and LuaLaTeX:
     ```latex
     \ifdefined\pdfgentounicode
       \input{glyphtounicode}
       \pdfgentounicode=1
     \fi
     ```
   - Eliminated redundant duplicate `\pdfgentounicode=1` assignments.

3. **Compilation Guarantee**:
   - Both `.tex` documents now rely 100% on standard TeX Live core packages (`microtype`, `fullpage`, `titlesec`, `enumitem`, `hyperref`, `fancyhdr`, `babel`, `tabularx`) with zero external file dependencies or missing `.sty` assets.
