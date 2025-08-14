# Rich Text Editor with Paginated Preview

This project implements a **rich text editor** using [Tiptap](https://tiptap.dev/) with support for:
- **WYSIWYG editing** (bold, italic, underline, headings, alignment, colors, fonts)
- **Edit / Preview modes**
- **Automatic page pagination** for A4 dimensions
- **Right-hand thumbnail panel** (page snippets/index)

---

## Constraints

1. **DOM-based pagination**
   - Pages are split based on actual rendered DOM node heights.
   - Requires a hidden "measurement container" to compute page breaks.
   - Dependent on browser rendering and CSS; changes in font, zoom, or styling can alter pagination results.

2. **Separate pagination logic in thumbnails**
   - Current `ToggleRightbar` splits text by characters, not DOM measurement.
   - This can cause **misalignment** between sidebar thumbnails and actual preview pages.

3. **Fixed dimensions**
   - `PAGE_HEIGHT_PX` and `PAGE_WIDTH_PX` are based on A4 size at a specific zoom.
   - Assumes a consistent display DPI; scaling may break accuracy.

---

## Trade-offs

| Decision                                   | Pros | Cons |
|--------------------------------------------|------|------|
| **DOM measurement for pagination**         | Accurate to what user sees; preserves formatting | More expensive to compute; can cause reflow |
| **Separate logic for right sidebar**       | Simple to implement; no dependency between components | Pages in thumbnails may not match actual pagination |
| **Fixed pixel-based page size**            | Simple and predictable layout | Not responsive to different screen sizes or zoom levels |
| **All HTML nodes kept intact per page**    | Preserves styles and structure | Cannot split a single large element mid-page |

---

## Productionisation Plan

To prepare for production use:

1. **Unify pagination logic**
   - Pass the measured `pages` array from `Tiptap` to `ToggleRightbar` via props.
   - Ensure thumbnails exactly match main preview.

2. **Performance optimisations**
   - Use `ResizeObserver` or `MutationObserver` to recalculate pagination only when content or container size changes.
   - Debounce pagination calculations to avoid excessive reflows.

3. **Scalability**
   - Support different page sizes (A3, Letter) and orientations.
   - Add zoom handling to recompute pagination dynamically.

4. **User Experience**
   - Add page navigation (click thumbnail to scroll to corresponding preview page).
   - Support continuous scroll mode as well as paginated mode.

5. **Styling Consistency**
   - Centralise style variables (margins, paddings, fonts) so pagination stays in sync across components.

6. **Persistence**
   - Save editor content to backend (e.g., JSON from Tiptap) and restore with full formatting.

---
