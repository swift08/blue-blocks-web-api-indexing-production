export default function Container({
  children,
  className = "",
  padding = true, // enable/disable horizontal padding
}) {
  return (
    <div
      className={[
        "mx-auto w-full",
        "max-w-[var(--bb-container)]",
        padding ? "px-[var(--bb-container-pad)]" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}