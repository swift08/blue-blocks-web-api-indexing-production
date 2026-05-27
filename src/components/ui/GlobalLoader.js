export default function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FFFFFF]/70">
      <div className="relative h-20 w-20 animate-bb-spin">
        {/* Top */}
        <span className="absolute left-1/2 top-0 h-8 w-8 -translate-x-1/2 rotate-45 rounded-lg bg-sky-400" />

        {/* Left */}
        <span className="absolute left-0 top-1/2 h-8 w-8 -translate-y-1/2 rotate-45 rounded-lg bg-indigo-500" />

        {/* Right */}
        <span className="absolute right-0 top-1/2 h-8 w-8 -translate-y-1/2 rotate-45 rounded-lg bg-indigo-500" />

        {/* Bottom */}
        <span className="absolute bottom-0 left-1/2 h-8 w-8 -translate-x-1/2 rotate-45 rounded-lg bg-sky-400" />
      </div>
    </div>
  );
}
