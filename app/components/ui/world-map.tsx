"use client";
import { useRef } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

interface Dot {
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
}

interface WorldMapProps {
  dots?: Dot[];
  lineColor?: string;
}

export function WorldMap({ dots = [], lineColor = "#4F46E5" }: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const svgMap = map.getSVG({
    radius: 0.22,
    color: "#FFFFFF18",
    shape: "circle",
    backgroundColor: "transparent",
  });

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '2 / 1',
        position: 'relative',
        fontFamily: 'sans-serif',
        background: 'transparent',
      }}
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        style={{
          height: '100%',
          width: '100%',
          pointerEvents: 'none',
          userSelect: 'none',
          maskImage: 'linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)',
        }}
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', userSelect: 'none' }}
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="white"     stopOpacity="0" />
            <stop offset="5%"   stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%"  stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white"     stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint   = projectPoint(dot.end.lat,   dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.4 * i, ease: "easeOut" }}
              />
            </g>
          );
        })}

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            {/* Start dot */}
            <circle cx={projectPoint(dot.start.lat, dot.start.lng).x} cy={projectPoint(dot.start.lat, dot.start.lng).y} r="2" fill={lineColor} />
            <circle cx={projectPoint(dot.start.lat, dot.start.lng).x} cy={projectPoint(dot.start.lat, dot.start.lng).y} r="2" fill={lineColor} opacity="0.5">
              <animate attributeName="r"       from="2" to="8" dur="1.5s" begin="0s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
            </circle>
            {/* End dot */}
            <circle cx={projectPoint(dot.end.lat, dot.end.lng).x} cy={projectPoint(dot.end.lat, dot.end.lng).y} r="2" fill={lineColor} />
            <circle cx={projectPoint(dot.end.lat, dot.end.lng).x} cy={projectPoint(dot.end.lat, dot.end.lng).y} r="2" fill={lineColor} opacity="0.5">
              <animate attributeName="r"       from="2" to="8" dur="1.5s" begin="0s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}
