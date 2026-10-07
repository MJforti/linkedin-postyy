# Resume Global Indentation, Alignment & ATS Polish Log (#17)

- **Iteration**: #17 (Global Indentation, Alignment & ATS Standards)
- **File**: `resume-overleaf.tex`
- **Goal**: Standardize indentation across all LaTeX environments, ensure symmetric margins, correct macro table widths, and reinforce ATS friendliness.

---

## What Was Updated

1. **Symmetric Margin Alignment**:
   - Updated `\oddsidemargin` and `\evensidemargin` to `-0.6in` with `\textwidth` at `1.20in`, ensuring exact horizontal symmetry across both margins.

2. **Macro Column Flush Alignment**:
   - Updated `\resumeProjectHeading` from `1.001\textwidth` to `\textwidth` so right-aligned project dates align flush with tabularx right columns in Experience, Education, and Leadership.
   - Standardized `\resumeItemListStart` to uniform spacing parameters (`leftmargin=0.18in`, `itemsep=0.5pt`, `topsep=1.5pt`).

3. **Consistent Code Indentation**:
   - Uniform 2-space indentation applied across all environments (`tabularx`, `itemize`, `resumeSubHeadingList`, `resumeItemList`).
   - Clean whitespace formatting between sections.

4. **ATS Standards Enforcement**:
   - `\pdfgentounicode=1` actively maps all glyphs to standard machine-readable Unicode.
   - Standard semantic section headings.
   - Single-column linear layout prevents OCR/parser jumbling.
   - 100% verifiable credential and project links.
   - Exact 193-line budget on 1 page.
