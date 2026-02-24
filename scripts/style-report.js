import fs from "fs";
import path from "path";

const reportPath = path.resolve("playwright-report/index.html");
let html = fs.readFileSync(reportPath, "utf8");

html = html.replace(
  "</head>",
  `<style>
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Syne:wght@400;600;700&display=swap');

    *, *::before, *::after {
      box-sizing: border-box;
    }

    :root {
      --bg-base: #0e0e11;
      --bg-surface: #16161a;
      --bg-elevated: #1e1e24;
      --bg-hover: #25252d;
      --border: #2a2a35;
      --accent: #7c6af7;
      --accent-glow: rgba(124, 106, 247, 0.15);
      --success: #4ade80;
      --error: #f87171;
      --warning: #fbbf24;
      --text-primary: #f0f0f5;
      --text-secondary: #9090a8;
      --text-muted: #55556a;
    }

    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 0 0 var(--accent-glow); }
      50%       { box-shadow: 0 0 18px 4px var(--accent-glow); }
    }

    @keyframes shimmer {
      0%   { background-position: -600px 0; }
      100% { background-position: 600px 0; }
    }

    html, body {
      background-color: var(--bg-base) !important;
      color: var(--text-primary) !important;
      font-family: 'Syne', sans-serif !important;
      margin: 0 auto;
      min-height: 100vh;
      max-width: 1200px;
    }

    /* Animated grain overlay */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 9999;
      opacity: 0.4;
    }

    /* Custom header banner */
    .pw-report-header {
      background: linear-gradient(135deg, #13131a 0%, #1a1525 50%, #13131a 100%);
      border-bottom: 1px solid var(--border);
      padding: 18px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      animation: fadeInDown 0.5s ease both;
      position: relative;
      overflow: hidden;
    }

    .pw-report-header::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--accent), transparent);
      animation: shimmer 3s infinite linear;
      background-size: 600px 1px;
    }

    .pw-report-header-title {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 15px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-primary);
    }

    .pw-report-header-title span {
      color: var(--accent);
    }

    .pw-report-header-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      background: var(--accent-glow);
      border: 1px solid var(--accent);
      color: var(--accent);
      padding: 4px 12px;
      border-radius: 999px;
      animation: pulse-glow 3s ease infinite;
    }

    /* All surfaces */
    div, section, article, aside, main, nav, header, footer {
      background-color: transparent;
    }

    /* Chip headers - file names and section toggles */
    .chip-header {
      background: var(--bg-elevated) !important;
      border: 1px solid var(--border) !important;
      border-radius: 8px !important;
      padding: 8px 14px !important;
      color: var(--text-primary) !important;
      font-family: 'JetBrains Mono', monospace !important;
      font-size: 13px !important;
      transition: background 0.2s, border-color 0.2s !important;
      animation: fadeInUp 0.4s ease both;
    }

    .chip-header:hover {
      background: var(--bg-hover) !important;
      border-color: var(--accent) !important;
    }

    .chip-header span,
    .chip-header-allow-selection {
      color: var(--text-primary) !important;
    }

    .chip-header svg,
    .chip-header .octicon {
      fill: var(--text-secondary) !important;
      color: var(--text-secondary) !important;
    }

    /* Code snippet / error container */
    .test-error-container {
      background: var(--bg-elevated) !important;
      border: 1px solid #3a2020 !important;
      border-left: 3px solid var(--error) !important;
      border-radius: 8px !important;
      padding: 16px !important;
      font-family: 'JetBrains Mono', monospace !important;
      font-size: 13px !important;
      line-height: 1.7 !important;
      animation: fadeInUp 0.5s ease both;
    }

    .test-error-view span {
      background-color: transparent !important;
    }

    .test-error-text {
      color: var(--text-primary) !important;
    }

    /* Force all text visible */
    * {
      color: var(--text-primary) !important;
    }

    /* Keep syntax highlight colors */
    .test-error-view [style*="ansiCyan"]    { color: #67e8f9 !important; }
    .test-error-view [style*="ansiYellow"]  { color: #fde68a !important; }
    .test-error-view [style*="ansiMagenta"] { color: #e879f9 !important; }
    .test-error-view [style*="ansiRed"]     { color: var(--error) !important; }
    .test-error-view [style*="BrightBlack"] { color: var(--text-muted) !important; }

    /* Buttons and interactive */
    button, [role="button"] {
      background: var(--bg-elevated) !important;
      border: 1px solid var(--border) !important;
      color: var(--text-primary) !important;
      border-radius: 6px !important;
      transition: all 0.2s !important;
    }

    button:hover, [role="button"]:hover {
      background: var(--accent) !important;
      border-color: var(--accent) !important;
      color: var(--bg-base) !important;
    }

    /* Status badges */
    .label-colour-green, [class*="passed"] {
      background: rgba(74, 222, 128, 0.12) !important;
      color: var(--success) !important;
      border: 1px solid rgba(74, 222, 128, 0.3) !important;
    }

    .label-colour-red, [class*="failed"] {
      background: rgba(248, 113, 113, 0.12) !important;
      color: var(--error) !important;
      border: 1px solid rgba(248, 113, 113, 0.3) !important;
    }

    .label-colour-yellow, [class*="flaky"] {
      background: rgba(251, 191, 36, 0.12) !important;
      color: var(--warning) !important;
      border: 1px solid rgba(251, 191, 36, 0.3) !important;
    }

    /* Links */
    a { color: var(--accent) !important; text-decoration: none !important; }
    a:hover { text-decoration: underline !important; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg-base); }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 999px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--accent); }

    [role="button"]:hover,
    [role="button"]:hover *,
    button:hover,
    button:hover *,
    .chip-header:hover,
    .chip-header:hover *,
    li:hover,
    li:hover *,
    tr:hover,
    tr:hover *,
    [class*="test-file"]:hover,
    [class*="test-file"]:hover *,
    [class*="list-item"]:hover,
    [class*="list-item"]:hover *,
    .subnav-item:hover,              
    .subnav-item:hover * {           
      background-color: var(--accent) !important;
      color: var(--bg-base) !important;
      border-color: var(--accent) !important;
      fill: var(--bg-base) !important;
    }

    .subnav-item,
    .subnav-item * {
      color: var(--text-primary) !important;
    }

    .counter {
      background: var(--bg-elevated) !important;
      color: var(--text-primary) !important;
      border: 1px solid var(--border) !important;
      border-radius: 999px !important;
    }
  </style>
  </head>`,
);

html = html.replace(
  "<body>",
  `<body>
   <div class="pw-report-header">
     <div class="pw-report-header-title">
       Tester: <span>Phillimon</span> &nbsp;·&nbsp; Application: <span>PHP TRAVELS</span>
     </div>
     <div class="pw-report-header-badge">Playwright Report</div>
   </div>`,
);

fs.writeFileSync(reportPath, html, "utf8");
