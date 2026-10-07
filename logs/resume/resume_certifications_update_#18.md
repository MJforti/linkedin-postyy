# Resume Header De-Clustering & Spacing Polish Log (#18)

- **Iteration**: #18 (Header De-Clustering & Visual Spacing Polish)
- **File**: `resume-overleaf.tex`
- **Goal**: Relieve visual crowding in the header contact block by relaxing vertical line heights, expanding pipe separator spacing, and eliminating negative overlap into the Summary section.

---

## What Was Updated

1. **Header Spacing Adjustments**:
   - Increased spacing below candidate name from `\\[2pt]` to `\\[4pt]`.
   - Increased line separation between contact tiers from `\\[2pt]` to `\\[3.5pt]`.
   - Replaced cramped `~ $|$ ~` with clean `\hspace{9pt}$|$\hspace{9pt}` horizontal gutters.
   - Replaced aggressive `\vspace{-9pt}` following the header block with a balanced `\vspace{-3pt}` to prevent collision with the Summary rule.

2. **Visual Hierarchy**:
   - **Tier 1 (Personal Contact & Residence)**: Phone, Email, Location (`Guwahati, Assam`).
   - **Tier 2 (Developer Profiles & Portfolios)**: LinkedIn, GitHub, LeetCode.

3. **Layout Budget**:
   - Preserves strict 1-page geometry across exactly 193 lines.
