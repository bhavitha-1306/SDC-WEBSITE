"use client";

interface Props {
  items: string[];
  reverse?: boolean;
  speed?: number;   // seconds for one full loop
}

/**
 * Infinite horizontal marquee of pill tags.
 * Items are duplicated to create a seamless loop.
 */
export default function MarqueeStrip({ items, reverse = false, speed = 30 }: Props) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="marquee-outer py-1">
      <div
        className={`marquee-track ${reverse ? "marquee-track-r" : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="tag-pill mx-2">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
