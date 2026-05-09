interface PageLabelProps {
  label: string;
}

/**
 * Vertical page label — sits on the right edge, centered vertically.
 * Text reads top-to-bottom like a book spine.
 */
const PageLabel = ({ label }: PageLabelProps) => (
  <span
    aria-hidden="true"
    className="absolute top-1/2 right-4 -translate-y-1/2 text-[10px] tracking-[0.25em] uppercase text-muted-foreground/35 font-mono select-none"
    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
  >
    {label}
  </span>
);

export default PageLabel;
