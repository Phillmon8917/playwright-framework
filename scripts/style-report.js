import fs from "fs";
import path from "path";

const reportPath = path.resolve("playwright-report/index.html");
let html = fs.readFileSync(reportPath, "utf8");

html = html.replace(
  "</head>",
  `<style>
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&display=swap');

    .pw-report-header {
      background: #13131a;
      border-bottom: 1px solid #2a2a35;
      padding: 14px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .pw-report-header-title {
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 0.06em;
      color: #f0f0f5;
    }

    .pw-report-header-title span {
      color: #7c6af7;
    }

    .pw-report-header-badge {
      font-family: monospace;
      font-size: 11px;
      background: rgba(124, 106, 247, 0.12);
      border: 1px solid #7c6af7;
      color: #7c6af7;
      padding: 4px 12px;
      border-radius: 999px;
    }
  </style>
  </head>`,
);

html = html.replace(
  "<body>",
  `<body>
   <div class="pw-report-header">
     <div class="pw-report-header-title">
       Tester: <span>Phillimon Motsinoni</span> &nbsp;·&nbsp; Application: <span>PHP TRAVELS</span>
     </div>
     <div class="pw-report-header-badge">Playwright Report</div>
   </div>`,
);

fs.writeFileSync(reportPath, html, "utf8");
