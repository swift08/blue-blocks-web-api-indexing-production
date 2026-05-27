export default function PyramidTiersRounded({
  className = "",
  top = { age: "0-6", text: "The Absorbent\nMind\n(Construction\nof the Self)" },
  middle = { age: "6-12", text: "The Reasoning Mind\n(Construction of the\nIntellect)" },
  bottom = { age: "12-18", text: "The Social Self (Construction of Society)" },
}) {
  return (
    <div className={className}>
      <svg viewBox="0 0 420 420" className="w-full h-auto" role="img">
        {/* ---------------- TOP (rounded triangle, correct) ---------------- */}
        <path
          fill="#253B74"
          d="
            M210 52
            Q222 52 230 64
            L276 132
            Q284 144 278 154
            Q272 164 258 164
            L162 164
            Q148 164 142 154
            Q136 144 144 132
            L190 64
            Q198 52 210 52
            Z
          "
        />

        {/* ---------------- MIDDLE (TRAPEZOID: narrow top, wide base) ----------------
           Visual: top shorter, base wider, with rounded corners.
        */}
        <path
        fill="#8FC4A6"
        d="
            M162 198
            Q152 198 146 206
            L140 214
            L116 246
            Q110 254 116 262
            Q124 272 140 272
            L280 272
            Q296 272 304 262
            Q310 254 304 246
            L280 214
            L274 206
            Q268 198 258 198
            Z
        "
        />

        {/* ---------------- BOTTOM (TRAPEZOID: narrower top, widest base) ---------------- */}
        <path
          fill="#D77E57"
          d="
            M130 292
            Q116 292 108 304
            L78 346
            Q72 354 78 362
            Q86 372 100 372
            L320 372
            Q334 372 342 362
            Q348 354 342 346
            L312 304
            Q304 292 290 292
            Z
          "
        />

        {/* ---------------- TEXT: TOP ---------------- */}
        <text
          x="210"
          y="98"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="36"
          fontWeight="700"
          fontFamily="inherit"
        >
          {top.age}
        </text>

        <text
          x="210"
          y="122"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="12.5"
          fontWeight="500"
          opacity="0.92"
          fontFamily="inherit"
        >
          {String(top.text)
            .split("\n")
            .map((line, i) => (
              <tspan key={i} x="210" dy={i === 0 ? 0 : 14}>
                {line}
              </tspan>
            ))}
        </text>

        {/* ---------------- TEXT: MIDDLE ---------------- */}
        <text
          x="210"
          y="236"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="40"
          fontWeight="800"
          fontFamily="inherit"
        >
          {middle.age}
        </text>

        <text
          x="210"
          y="258"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="12.5"
          fontWeight="500"
          opacity="0.92"
          fontFamily="inherit"
        >
          {String(middle.text)
            .split("\n")
            .map((line, i) => (
              <tspan key={i} x="210" dy={i === 0 ? 0 : 14}>
                {line}
              </tspan>
            ))}
        </text>

        {/* ---------------- TEXT: BOTTOM ---------------- */}
        <text
          x="210"
          y="336"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="44"
          fontWeight="800"
          fontFamily="inherit"
        >
          {bottom.age}
        </text>

        <text
          x="210"
          y="358"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="12.5"
          fontWeight="500"
          opacity="0.92"
          fontFamily="inherit"
        >
          {String(bottom.text)
            .split("\n")
            .map((line, i) => (
              <tspan key={i} x="210" dy={i === 0 ? 0 : 14}>
                {line}
              </tspan>
            ))}
        </text>
      </svg>
    </div>
  );
}
