import { useState, useRef, useCallback } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #dbeafe;
    --bg2: #bfdbfe;
    --card: #eff6ff;
    --right-panel: #1e3a8a;
    --right-panel2: #1d4ed8;
    --accent: #2563eb;
    --accent-light: #3b82f6;
    --accent-soft: #dbeafe;
    --dark: #0f172a;
    --mid: #334155;
    --muted: #64748b;
    --border: #bfdbfe;
    --green: #10b981;
    --green-soft: #d1fae5;
    --shadow-sm: 0 1px 3px rgba(30,58,138,0.08), 0 1px 2px rgba(30,58,138,0.06);
    --shadow-md: 0 4px 24px rgba(30,58,138,0.13), 0 1px 4px rgba(30,58,138,0.08);
    --shadow-lg: 0 16px 48px rgba(30,58,138,0.18), 0 4px 12px rgba(30,58,138,0.1);
    --shadow-xl: 0 24px 64px rgba(30,58,138,0.22), 0 8px 24px rgba(30,58,138,0.12);
    --radius: 20px;
    --radius-sm: 10px;
  }

  .atsify-page {
    min-height: 100vh;
    background: linear-gradient(135deg, var(--bg) 0%, var(--bg2) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 16px;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
  }

  .atsify-page::before {
    content: '';
    position: fixed;
    top: -30%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(96,165,250,0.25) 0%, transparent 70%);
    pointer-events: none;
  }

  .atsify-page::after {
    content: '';
    position: fixed;
    bottom: -20%;
    right: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%);
    pointer-events: none;
  }

  .atsify-card {
    display: flex;
    width: 100%;
    max-width: 960px;
    min-height: 560px;
    border-radius: var(--radius);
    box-shadow: var(--shadow-xl);
    overflow: hidden;
    background: var(--card);
    animation: cardIn 0.7s cubic-bezier(0.22,1,0.36,1) both;
  }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(32px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ─── LEFT PANEL ─────────────────────────────── */
  .left-panel {
    flex: 1;
    padding: 48px 44px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    background: var(--card);
    position: relative;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .brand-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, var(--accent) 0%, #1d4ed8 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(37,99,235,0.35);
    flex-shrink: 0;
  }

  .brand-icon svg { color: white; }

  .brand-title {
    font-family: 'Fraunces', serif;
    font-size: 2rem;
    font-weight: 900;
    color: #1e3a8a;
    letter-spacing: -0.03em;
    line-height: 1;
  }

  .brand-tagline {
    font-size: 0.78rem;
    font-weight: 500;
    color: var(--muted);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-top: 2px;
  }

  .upload-section { display: flex; flex-direction: column; gap: 14px; }

  .upload-label {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--dark);
    letter-spacing: -0.01em;
  }

  .upload-sublabel {
    font-size: 0.78rem;
    color: var(--muted);
    margin-top: 2px;
  }

  .dropzone {
    border: 2px dashed var(--border);
    border-radius: var(--radius-sm);
    padding: 36px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.25s ease;
    background: linear-gradient(145deg, #f0f7ff, #e8f0fe);
    position: relative;
    overflow: hidden;
  }

  .dropzone::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(37,99,235,0.04), rgba(99,102,241,0.04));
    opacity: 0;
    transition: opacity 0.25s;
  }

  .dropzone:hover, .dropzone.dragging {
    border-color: var(--accent);
    background: linear-gradient(145deg, #eff6ff, #e0eaff);
    box-shadow: 0 0 0 4px rgba(37,99,235,0.08), var(--shadow-sm);
    transform: translateY(-2px);
  }

  .dropzone:hover::before, .dropzone.dragging::before { opacity: 1; }

  .dropzone.dragging {
    border-color: var(--accent);
    border-style: solid;
    background: #eff6ff;
  }

  .dropzone-icon {
    width: 52px;
    height: 52px;
    background: linear-gradient(135deg, var(--accent-soft) 0%, #dde8ff 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.25s ease;
    box-shadow: var(--shadow-sm);
  }

  .dropzone:hover .dropzone-icon { transform: scale(1.08) translateY(-2px); }

  .dropzone-text {
    text-align: center;
  }

  .dropzone-main {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--dark);
  }

  .dropzone-main span {
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .dropzone-sub {
    font-size: 0.75rem;
    color: var(--muted);
    margin-top: 4px;
  }

  .file-badges {
    display: flex;
    gap: 8px;
  }

  .badge {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 3px 8px;
    border-radius: 4px;
    background: var(--accent-soft);
    color: var(--accent);
    border: 1px solid #bfdbfe;
  }

  input[type="file"] { display: none; }

  .file-selected {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    background: var(--green-soft);
    border-radius: var(--radius-sm);
    border: 1px solid #a7f3d0;
    animation: fileIn 0.35s cubic-bezier(0.22,1,0.36,1) both;
  }

  @keyframes fileIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .file-name {
    font-size: 0.83rem;
    font-weight: 600;
    color: #065f46;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .file-remove {
    background: none;
    border: none;
    cursor: pointer;
    color: #6ee7b7;
    font-size: 1.1rem;
    line-height: 1;
    padding: 2px;
    border-radius: 4px;
    transition: color 0.15s;
  }

  .file-remove:hover { color: #059669; }

  .submit-btn {
    width: 100%;
    padding: 14px 24px;
    background: linear-gradient(135deg, var(--accent) 0%, #1d4ed8 100%);
    color: white;
    border: none;
    border-radius: var(--radius-sm);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: -0.01em;
    transition: all 0.2s ease;
    box-shadow: 0 4px 14px rgba(37,99,235,0.35);
    position: relative;
    overflow: hidden;
  }

  .submit-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }

  .submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(37,99,235,0.45);
  }

  .submit-btn:hover:not(:disabled)::after { opacity: 1; }
  .submit-btn:active:not(:disabled) { transform: translateY(0); }

  .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Progress */
  .progress-wrap {
    display: flex;
    flex-direction: column;
    gap: 6px;
    animation: fileIn 0.3s ease both;
  }

  .progress-bar-bg {
    height: 6px;
    background: var(--border);
    border-radius: 999px;
    overflow: hidden;
  }

  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent-light), var(--accent));
    border-radius: 999px;
    transition: width 0.4s ease;
  }

  .progress-label {
    font-size: 0.72rem;
    color: var(--muted);
    font-weight: 500;
  }

  /* ─── RIGHT PANEL ────────────────────────────── */
  .right-panel {
    width: 340px;
    flex-shrink: 0;
    background: linear-gradient(160deg, #1e3a8a 0%, #1e40af 60%, #1d4ed8 100%);
    padding: 48px 36px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
    position: relative;
    overflow: hidden;
  }

  .right-panel::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 220px; height: 220px;
    background: rgba(255,255,255,0.05);
    border-radius: 50%;
  }

  .right-panel::after {
    content: '';
    position: absolute;
    bottom: -80px; left: -40px;
    width: 260px; height: 260px;
    background: rgba(99,102,241,0.18);
    border-radius: 50%;
  }

  .score-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    position: relative;
    z-index: 1;
  }

  .score-ring-wrap {
    position: relative;
    width: 158px;
    height: 158px;
  }

  .score-ring {
    width: 158px;
    height: 158px;
    transform: rotate(-90deg);
  }

  .score-ring-bg { fill: none; stroke: rgba(255,255,255,0.1); stroke-width: 8; }

  .score-ring-fill {
    fill: none;
    stroke: url(#ringGrad);
    stroke-width: 8;
    stroke-linecap: round;
    stroke-dasharray: 408;
    stroke-dashoffset: 0;
    animation: ringFill 1.4s cubic-bezier(0.22,1,0.36,1) 0.3s both;
  }

  @keyframes ringFill {
    from { stroke-dashoffset: 408; }
    to   { stroke-dashoffset: 0; }
  }

  .score-inner {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0px;
  }

  .score-number {
    font-family: 'Fraunces', serif;
    font-size: 2rem;
    font-weight: 900;
    color: #fff;
    line-height: 1;
    animation: numIn 0.6s ease 0.5s both;
  }

  .score-unit {
    font-size: 0.65rem;
    color: rgba(255,255,255,0.6);
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  @keyframes numIn {
    from { opacity: 0; transform: scale(0.7); }
    to   { opacity: 1; transform: scale(1); }
  }

  .score-checkmarks {
    display: flex;
    gap: 6px;
  }

  .dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
    animation: dotPop 0.3s ease both;
  }

  .dot.active {
    background: #34d399;
    box-shadow: 0 0 6px rgba(52,211,153,0.6);
  }

  .dot:nth-child(1) { animation-delay: 0.8s; }
  .dot:nth-child(2) { animation-delay: 0.9s; }
  .dot:nth-child(3) { animation-delay: 1.0s; }
  .dot:nth-child(4) { animation-delay: 1.1s; }
  .dot:nth-child(5) { animation-delay: 1.2s; }

  @keyframes dotPop {
    from { opacity: 0; transform: scale(0); }
    to   { opacity: 1; transform: scale(1); }
  }

  .quote-block {
    position: relative;
    z-index: 1;
  }

  .quote-text {
    font-family: 'Fraunces', serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
    line-height: 1.4;
    letter-spacing: -0.02em;
    margin-bottom: 4px;
  }

  .quote-sub {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.55);
    font-weight: 400;
    line-height: 1.5;
  }

  .checks-block {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

  .checks-title {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    margin-bottom: 2px;
  }

  .check-item {
    display: flex;
    align-items: center;
    gap: 10px;
    animation: checkIn 0.4s cubic-bezier(0.22,1,0.36,1) both;
  }

  .check-item:nth-child(2) { animation-delay: 0.1s; }
  .check-item:nth-child(3) { animation-delay: 0.2s; }
  .check-item:nth-child(4) { animation-delay: 0.3s; }
  .check-item:nth-child(5) { animation-delay: 0.4s; }

  @keyframes checkIn {
    from { opacity: 0; transform: translateX(-10px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .check-icon {
    width: 22px; height: 22px;
    border-radius: 6px;
    background: rgba(52,211,153,0.18);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    border: 1px solid rgba(52,211,153,0.25);
  }

  .check-label {
    font-size: 0.82rem;
    font-weight: 500;
    color: rgba(255,255,255,0.85);
  }

  /* ─── JOB DESCRIPTION DROPDOWN ─────────────── */
  .job-desc-section { display: flex; flex-direction: column; gap: 6px; position: relative; }

  .job-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .job-input {
    width: 100%;
    padding: 11px 40px 11px 14px;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    background: linear-gradient(145deg, #f0f7ff, #e8f0fe);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    color: var(--dark);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    cursor: pointer;
  }

  .job-input::placeholder { color: var(--muted); }

  .job-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
    background: #fff;
  }

  .job-arrow {
    position: absolute;
    right: 12px;
    pointer-events: none;
    color: var(--muted);
    transition: transform 0.2s;
    display: flex;
    align-items: center;
  }

  .job-arrow.open { transform: rotate(180deg); }

  .job-dropdown {
    position: absolute;
    top: calc(100% + 6px);
    left: 0; right: 0;
    background: #fff;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-md);
    z-index: 100;
    overflow-y: auto;
    max-height: calc(6 * 38px);
    animation: dropIn 0.15s cubic-bezier(0.22,1,0.36,1) both;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
  }

  .job-dropdown::-webkit-scrollbar { width: 4px; }
  .job-dropdown::-webkit-scrollbar-track { background: transparent; }
  .job-dropdown::-webkit-scrollbar-thumb { background: var(--border); border-radius: 999px; }

  .job-option {
    padding: 10px 14px;
    font-size: 0.78rem;
    color: var(--mid);
    cursor: pointer;
    transition: background 0.12s, color 0.12s;
    font-family: 'DM Sans', sans-serif;
    line-height: 1.4;
  }

  .job-option:hover { background: var(--accent-soft); color: var(--accent); }
  .job-option:not(:last-child) { border-bottom: 1px solid #f0f4ff; }

  .job-no-result {
    padding: 10px 14px;
    font-size: 0.78rem;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
  }

  /* ─── RESULTS PANEL ──────────────────────────────────────── */
  .results-panel {
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow-y: auto;
    max-height: 100%;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.12) transparent;
    padding-right: 2px;
  }

  /* Centered score ring block */
  .res-ring-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

  /* Motivation line */
  .res-motivation {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.76rem;
    color: rgba(255,255,255,0.52);
    font-style: italic;
    text-align: center;
    line-height: 1.5;
    position: relative;
    z-index: 1;
  }

  /* Divider */
  .res-divider {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.07);
    margin: 0;
    position: relative;
    z-index: 1;
  }

  /* Stat row: label + bar + pct */
  .res-stat {
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: relative;
    z-index: 1;
  }

  .res-stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .res-stat-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.68rem;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.03em;
  }

  .res-stat-pct {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    color: rgba(255,255,255,0.7);
  }

  .res-bar-bg {
    height: 4px;
    background: rgba(255,255,255,0.1);
    border-radius: 999px;
    overflow: hidden;
  }

  .res-bar-fill {
    height: 100%;
    border-radius: 999px;
    transition: width 1s ease;
  }

  .res-bar-fill.green   { background: #34d399; }
  .res-bar-fill.orange  { background: #fbbf24; }
  .res-bar-fill.red     { background: #f87171; }

  /* Skill group */
  .res-skill-group {
    position: relative;
    z-index: 1;
  }

  .res-skill-group-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 6px;
  }

  .res-skill-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .res-skill-list li {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.76rem;
    color: rgba(255,255,255,0.75);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .res-skill-list li::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .res-skill-list.core li::before { background: #f87171; }
  .res-skill-list.reco li::before { background: rgba(255,255,255,0.28); }

  /* Feedback note */
  .res-note {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.7rem;
    color: rgba(255,255,255,0.42);
    line-height: 1.5;
    position: relative;
    z-index: 1;
  }

  /* ─── PAGE TRANSITIONS ───────────────────────────────────── */
  .upload-view {
    width: 100%;
    max-width: 960px;
    box-sizing: border-box;
    animation: pageIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
  }

  .upload-view--exit {
    animation: pageOut 0.35s ease forwards;
    pointer-events: none;
  }

  @keyframes pageIn {
    from { opacity: 0; transform: translateY(24px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes pageOut {
    from { opacity: 1; transform: translateY(0); }
    to   { opacity: 0; transform: translateY(-16px); }
  }

  /* ─── RESULTS DASHBOARD ──────────────────────────────────── */
  .results-view {
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    box-sizing: border-box;
    animation: pageIn 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both;
  }

  .dash-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 20px;
    width: 100%;
    box-sizing: border-box;
  }

  .dash-brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .dash-role-badge {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 999px;
    background: rgba(37,99,235,0.12);
    color: var(--accent);
    border: 1px solid rgba(37,99,235,0.2);
    letter-spacing: 0.02em;
  }

  .dash-back-btn {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    padding: 7px 16px;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.15s;
  }

  .dash-back-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
    background: rgba(37,99,235,0.05);
  }

  .dash-body {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: flex-start;
    background: var(--card);
    border-radius: var(--radius);
    box-shadow: var(--shadow-xl);
    overflow: hidden;
    min-height: 560px;
    box-sizing: border-box;
    width: 100%;
  }

  /* ── LEFT PANEL — 35% ── */
  .dash-left {
    width: 35%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
    background: linear-gradient(160deg, #1e3a8a 0%, #1e40af 60%, #1d4ed8 100%);
    padding: 36px 28px;
  }

  .dash-score-card {
    background: transparent;
    border-radius: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    box-shadow: none;
    position: relative;
    overflow: visible;
    margin-bottom: 28px;
  }

  .dash-score-card::before { display: none; }

  .dash-overall-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    position: relative;
    z-index: 1;
  }

  .dash-motivation {
    font-family: 'Fraunces', serif;
    font-size: 0.82rem;
    font-weight: 700;
    color: rgba(255,255,255,0.75);
    font-style: italic;
    text-align: center;
    line-height: 1.5;
    position: relative;
    z-index: 1;
  }

  .dash-candidate-badge {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.68rem;
    color: rgba(255,255,255,0.45);
    position: relative;
    z-index: 1;
  }

  /* Bar rows inside left score card */
  .dash-bar-row {
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: relative;
    z-index: 1;
    width: 100%;
  }

  .dash-bar-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dash-bar-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    color: rgba(255,255,255,0.55);
  }

  .dash-bar-pct {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.72rem;
    font-weight: 700;
  }

  .dash-bar-track {
    height: 5px;
    background: rgba(255,255,255,0.1);
    border-radius: 999px;
    overflow: hidden;
  }

  .dash-bar-fill {
    height: 100%;
    border-radius: 999px;
    transition: width 1s cubic-bezier(0.22,1,0.36,1);
  }

  /* ── RIGHT PANEL — 65% ── */
  .dash-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 36px 36px;
    background: var(--card);
    overflow-y: auto;
  }

  .dash-detail-card {
    background: #f8faff;
    border-radius: var(--radius-sm);
    padding: 16px 18px;
    box-shadow: none;
    border: 1px solid var(--border);
    animation: cardIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
    margin-bottom: 12px;
  }

  .dash-detail-card:last-child { margin-bottom: 0; }

  .dash-detail-card:nth-child(1) { animation-delay: 0.05s; }
  .dash-detail-card:nth-child(2) { animation-delay: 0.10s; }
  .dash-detail-card:nth-child(3) { animation-delay: 0.15s; }
  .dash-detail-card:nth-child(4) { animation-delay: 0.20s; }
  .dash-detail-card:nth-child(5) { animation-delay: 0.25s; }

  .dash-card-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 12px;
  }

  .dash-card-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .dash-skill-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .dash-chip {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.73rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 6px;
    letter-spacing: 0.01em;
  }

  .dash-chip.core {
    background: rgba(248,113,113,0.1);
    color: #dc2626;
    border: 1px solid rgba(248,113,113,0.25);
  }

  .dash-chip.reco {
    background: rgba(251,191,36,0.1);
    color: #b45309;
    border: 1px solid rgba(251,191,36,0.25);
  }

  .dash-feedback-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.83rem;
    color: var(--mid);
    line-height: 1.6;
  }

  .dash-structure-issue {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    color: var(--mid);
    line-height: 1.8;
  }

  /* Responsive */
  @media (max-width: 720px) {
    .atsify-card   { flex-direction: column; align-items: center; }
    .left-panel    { padding: 36px 28px; width: 100%; box-sizing: border-box; }
    .right-panel   { width: 100%; padding: 36px 28px; }
    .score-block   { flex-direction: row; align-items: center; }
    .upload-view   { max-width: 100%; }
    .results-view  { max-width: 100%; margin: 0; }
    .dash-body     { flex-direction: column; align-items: center; gap: 0; }
    .dash-left     { width: 100%; }
    .dash-right    { width: 100%; }
  }
`;

const CHECK_ITEMS = [
  { label: "Keywords match", icon: "🔑" },
  { label: "Resume structure", icon: "📐" },
  { label: "Skills relevance", icon: "⚡" },
  { label: "ATS compatibility", icon: "🤖" },
];

function ScoreRing({ score = 0 }) {
  const r = 65;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 75 ? '#34d399' : score >= 45 ? '#fbbf24' : '#f87171';
  return (
    <div className="score-ring-wrap">
      <svg className="score-ring" viewBox="0 0 158 158">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <circle className="score-ring-bg" cx="79" cy="79" r={r} />
        <circle
          className="score-ring-fill"
          cx="79" cy="79" r={r}
          style={{ strokeDasharray: circ, strokeDashoffset: offset, transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="score-inner">
        <span className="score-number">{score}%</span>
        <span className="score-unit">ATS Score</span>
      </div>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function BrandIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12l2 2 4-4" />
      <path d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const JOB_ROLES = [
  // Information Technology
  "Software Engineer","Frontend Developer","Backend Developer","Full Stack Developer",
  "Data Analyst","Data Scientist","Machine Learning Engineer","AI Engineer",
  "Java Developer","Python Developer","JavaScript Developer","React Developer",
  "Node.js Developer","DevOps Engineer","Cloud Architect","Cybersecurity Analyst",
  "Network Engineer","Database Administrator","IT Support Specialist","QA Engineer",
  "Mobile App Developer","iOS Developer","Android Developer","Blockchain Developer",
  "Product Manager","Scrum Master","Business Analyst","Systems Analyst",
  "IT Project Manager","Technical Writer","Web Developer",
  // Healthcare
  "Doctor","Nurse","Surgeon","Pharmacist","Dentist","Physiotherapist",
  "Radiologist","Anesthesiologist","Pediatrician","Psychiatrist","Dermatologist",
  "Medical Lab Technician","Occupational Therapist","Nutritionist","Paramedic",
  "Clinical Research Associate","Healthcare Administrator","Veterinarian",
  "Speech Therapist","Optometrist",
  // Finance
  "Accountant","Financial Analyst","Investment Banker","Auditor","Tax Consultant",
  "Chief Financial Officer","Credit Analyst","Risk Manager","Actuary",
  "Loan Officer","Wealth Manager","Insurance Underwriter","Payroll Specialist",
  "Budget Analyst","Compliance Officer",
  // Marketing
  "Marketing Manager","Digital Marketing Specialist","SEO Analyst","Content Strategist",
  "Social Media Manager","Brand Manager","Copywriter","Email Marketing Specialist",
  "Market Research Analyst","Public Relations Manager","Growth Hacker",
  "Advertising Manager","Campaign Manager",
  // Education
  "Teacher","Professor","School Principal","Education Coordinator","Tutor",
  "Curriculum Developer","Instructional Designer","School Counselor",
  "Special Education Teacher","Academic Advisor","Librarian","E-Learning Developer",
  // Engineering
  "Civil Engineer","Mechanical Engineer","Electrical Engineer","Chemical Engineer",
  "Aerospace Engineer","Structural Engineer","Biomedical Engineer","Environmental Engineer",
  "Industrial Engineer","Manufacturing Engineer","Petroleum Engineer","Robotics Engineer",
  "Automotive Engineer","Quality Control Engineer",
  // Human Resources
  "HR Manager","HR Generalist","Talent Acquisition Specialist","Recruiter",
  "Compensation & Benefits Analyst","Learning & Development Manager",
  "HR Business Partner","Payroll Manager","Employee Relations Specialist",
  "Organizational Development Consultant",
  // Sales
  "Sales Manager","Account Executive","Business Development Manager",
  "Sales Representative","Inside Sales Specialist","Key Account Manager",
  "Sales Operations Analyst","Pre-Sales Consultant","Retail Sales Associate",
  "Channel Sales Manager",
  // Design
  "Graphic Designer","UX Designer","UI Designer","Product Designer",
  "Motion Graphics Designer","Brand Identity Designer","Interior Designer",
  "Fashion Designer","Illustrator","Industrial Designer",
  // Law
  "Lawyer","Paralegal","Legal Advisor","Corporate Lawyer","Criminal Lawyer",
  "Intellectual Property Lawyer","Civil Lawyer","Legal Researcher","Notary Public",
  // Hospitality & Travel
  "Chef","Hotel Manager","Travel Consultant","Event Manager","Tour Guide",
  "Flight Attendant","Hospitality Coordinator",
  // Government & Public Sector
  "Civil Servant","Policy Analyst","Diplomat","Public Administrator",
  "Defense Officer","Law Enforcement Officer",
  // Creative
  "Photographer","Director of Photography",
];

export default function ATSify() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  const [jobQuery, setJobQuery] = useState('');
  const [jobOpen, setJobOpen] = useState(false);
  const jobRef = useRef();
  const filteredRoles = JOB_ROLES.filter(r =>
    r.toLowerCase().includes(jobQuery.toLowerCase())
  );
  const handleJobSelect = (role) => { setJobQuery(role); setJobOpen(false); };
  const handleJobBlur = (e) => {
    if (!jobRef.current.contains(e.relatedTarget)) setJobOpen(false);
  };

  const [results, setResults] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const acceptFile = (f) => {
    if (!f) return;
    const ext = f.name.split('.').pop().toLowerCase();
    if (!['pdf','docx'].includes(ext)) return alert('Please upload a PDF or DOCX file.');
    setFile(f);
    setProgress(0);
    setAnalyzing(false);
    setResults(null);
    setShowResult(false);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    acceptFile(e.dataTransfer.files[0]);
  }, []);

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);

  // ── STOP WORDS ──────────────────────────────────────────────
  const STOP_WORDS = new Set([
    'is','was','has','have','had','the','and','or','a','an','of','to','for',
    'in','on','with','at','by','from','as','are','be','been','being','it',
    'its','this','that','these','those','will','would','could','should','may',
    'might','do','does','did','but','not','no','so','if','then','than','too',
    'very','just','also','about','into','over','after','above','below','up',
    'down','out','off','through','during','before','between','each','more',
    'most','other','some','such','their','our','your','my','his','her','we',
    'they','you','he','she','i','me','him','us','them','what','which','who',
    'when','where','how','all','both','any','same','own','only','use','using',
    'used','can','able','need','needs','within','across','well','good','work',
    'working','works','experience','experienced','strong','excellent','great'
  ]);

  // ── JOB SKILLS MAP ──────────────────────────────────────────
  const JOB_SKILLS = {
    // Information Technology
    "Software Engineer":         { core: ["Data Structures","Algorithms","Git/GitHub","System Design"], optional: ["Unit Testing"] },
    "Frontend Developer":        { core: ["HTML5","CSS3/Sass","JavaScript (ES6+)","React/Vue/Angular"], optional: ["Responsive Design"] },
    "Backend Developer":         { core: ["Node.js/Python/Java","RESTful APIs","SQL/NoSQL Databases","Microservices"], optional: ["JWT Authentication"] },
    "Full Stack Developer":      { core: ["JavaScript","React","Node.js","REST APIs"], optional: ["Database Management","Cloud Deployment (AWS/Azure)"] },
    "Data Analyst":              { core: ["SQL","Python/R","Power BI/Tableau","Statistical Analysis"], optional: ["Excel (VBA/Macros)"] },
    "Data Scientist":            { core: ["Python","Machine Learning (Scikit-learn)","Deep Learning","SQL"], optional: ["Big Data (Spark/Hadoop)"] },
    "Machine Learning Engineer": { core: ["TensorFlow/PyTorch","Model Deployment","Neural Networks","NLP"], optional: ["Computer Vision"] },
    "AI Engineer":               { core: ["LLM Fine-tuning","Prompt Engineering","Python","API Integration"], optional: ["Vector Databases"] },
    "Java Developer":            { core: ["Java 17+","Spring Boot","Hibernate/JPA","Microservices"], optional: ["Maven/Gradle"] },
    "Python Developer":          { core: ["Python","Django/Flask/FastAPI","Asyncio","PostgreSQL"], optional: ["Unit Testing (Pytest)"] },
    "JavaScript Developer":      { core: ["ES6+","Node.js","TypeScript","Asynchronous Programming"], optional: ["Webpack/Vite"] },
    "React Developer":           { core: ["React.js","Redux/Context API","React Hooks","Next.js"], optional: ["Tailwind CSS"] },
    "Node.js Developer":         { core: ["Node.js","Express.js","MongoDB","Event Loop Optimization"], optional: ["Socket.io"] },
    "DevOps Engineer":           { core: ["Docker","Kubernetes","CI/CD Pipelines","Terraform/IaC"], optional: ["Cloud Platforms (AWS/GCP/Azure)"] },
    "Cloud Architect":           { core: ["Cloud Migration","Serverless Architecture","IAM (Identity & Access Management)","Cost Optimization"], optional: ["Disaster Recovery Planning"] },
    "Cybersecurity Analyst":     { core: ["Network Security","Firewall Configuration","IDS/IPS Monitoring","SIEM Tools"], optional: ["Vulnerability Assessment"] },
    "Network Engineer":          { core: ["TCP/IP","BGP/OSPF Routing","SD-WAN","Cisco/Juniper Hardware"], optional: ["VPN Configuration"] },
    "Database Administrator":    { core: ["SQL Tuning","Database Backup/Recovery","Oracle/MySQL/MSSQL","Data Warehousing"], optional: ["Replication/Clustering"] },
    "IT Support Specialist":     { core: ["Active Directory","Ticketing Systems (Jira/Zendesk)","Hardware Diagnostics","OS Troubleshooting (Windows/Linux)"], optional: ["Basic Networking"] },
    "QA Engineer":               { core: ["Selenium/Cypress","Automation Testing","API Testing (Postman)","Bug Tracking"], optional: ["SDLC Knowledge"] },
    "Mobile App Developer":      { core: ["Flutter/React Native","Native SDKs","REST API Consumption","App Store/Play Store Deployment"], optional: ["Mobile UI Patterns"] },
    "iOS Developer":             { core: ["Swift","SwiftUI/UIKit","Xcode","Core Data"], optional: ["Apple Human Interface Guidelines"] },
    "Android Developer":         { core: ["Kotlin/Java","Android Jetpack","Retrofit","Material Design"], optional: ["Room Database"] },
    "Blockchain Developer":      { core: ["Solidity","Smart Contracts","Ethereum/Web3.js","Cryptography"], optional: ["Hyperledger Fabric"] },
    "Product Manager":           { core: ["Product Roadmap","Agile/Scrum","User Story Mapping","Market Analysis"], optional: ["Stakeholder Management"] },
    "Scrum Master":              { core: ["Agile Frameworks","Sprint Planning","Jira/Confluence","Conflict Resolution"], optional: ["Process Improvement"] },
    "Business Analyst":          { core: ["Requirements Gathering","UML Modeling","Gap Analysis","Stakeholder Interviews"], optional: ["Business Process Mapping"] },
    "Systems Analyst":           { core: ["System Architecture","SDLC","Data Flow Diagrams (DFD)","Feasibility Studies"], optional: ["Technical Specifications"] },
    "IT Project Manager":        { core: ["Project Lifecycle Management","Budget Forecasting","Risk Mitigation","Agile/Waterfall"], optional: ["MS Project"] },
    "Technical Writer":          { core: ["API Documentation","Markdown","DITA/XML","Content Strategy"], optional: ["Technical Editing"] },
    // Healthcare
    "Doctor":                    { core: ["Clinical Diagnosis","Patient Care Protocols","EHR/EMR Software","Medical Ethics"], optional: ["Preventive Medicine"] },
    "Nurse":                     { core: ["Advanced Life Support (ACLS)","Patient Monitoring","Wound Care","Medication Administration"], optional: ["Patient Advocacy"] },
    "Surgeon":                   { core: ["Surgical Procedures","Pre-operative Assessment","Robotic Surgery Systems","Post-operative Care"], optional: ["Anatomy Expertise"] },
    "Pharmacist":                { core: ["Pharmacology","Drug Interaction Analysis","Regulatory Compliance","Patient Counseling"], optional: ["Inventory Management"] },
    "Dentist":                   { core: ["Restorative Dentistry","Oral Surgery","Diagnostic Imaging","Patient Management"], optional: ["Local Anesthesia"] },
    "Physiotherapist":           { core: ["Manual Therapy","Exercise Prescription","Kinesiology","Patient Assessment"], optional: ["Rehabilitation Planning"] },
    "Radiologist":               { core: ["Image Interpretation (MRI/CT/PET)","Radiation Safety","PACS Systems","Diagnostic Reporting"], optional: ["Interventional Radiology"] },
    "Anesthesiologist":          { core: ["Pain Management","Intubation","Anesthetic Pharmacology","Hemodynamic Monitoring"], optional: ["Critical Care"] },
    "Pediatrician":              { core: ["Child Development","Immunization Protocols","Pediatric Emergencies","Family Counseling"], optional: ["Newborn Screening"] },
    "Psychiatrist":              { core: ["Psychopharmacology","CBT/DBT Therapy","Mental Status Examination (MSE)","Crisis Intervention"], optional: ["DSM-5 Criteria"] },
    "Dermatologist":             { core: ["Dermoscopy","Skin Biopsies","Cosmetic Procedures","Treatment Planning"], optional: ["Pathology Analysis"] },
    "Medical Lab Technician":    { core: ["Specimen Processing","Hematology","Clinical Chemistry","Quality Control"], optional: ["Lab Automation Systems"] },
    "Occupational Therapist":    { core: ["ADL Assessment","Assistive Technology","Ergonomics","Sensory Integration"], optional: ["Therapeutic Planning"] },
    "Nutritionist":              { core: ["Medical Nutrition Therapy","Dietary Assessment","Nutritional Biochemistry","Menu Planning"], optional: ["Patient Education"] },
    "Paramedic":                 { core: ["Emergency Medicine","Advanced Airway Management","Triage","Trauma Life Support"], optional: ["Radio Communication"] },
    "Clinical Research Associate":{ core: ["GCP Compliance","Site Monitoring","Data Management","Regulatory Submissions"], optional: ["Protocol Development"] },
    "Healthcare Administrator":  { core: ["Facility Management","Healthcare Finance","Regulatory Compliance (HIPAA)","Strategic Planning"], optional: ["Process Optimization"] },
    "Veterinarian":              { core: ["Animal Surgery","Zoonotic Disease Knowledge","Diagnostic Imaging","Pharmacology"], optional: ["Animal Husbandry"] },
    "Speech Therapist":          { core: ["Swallowing Disorders","Language Assessment","Articulation Therapy","AAC Devices"], optional: ["Cognitive Rehabilitation"] },
    "Optometrist":               { core: ["Refraction","Ocular Disease Diagnosis","Contact Lens Fitting","Visual Field Testing"], optional: ["Optometric Instruments"] },
    // Finance
    "Accountant":                { core: ["GAAP/IFRS Standards","General Ledger Management","Tax Compliance","ERP Systems (SAP/Oracle)"], optional: ["Financial Reporting"] },
    "Financial Analyst":         { core: ["Financial Modeling","DCF Analysis","Variance Analysis","Forecasting"], optional: ["Equity Research"] },
    "Investment Banker":         { core: ["M&A Modeling","Capital Raising","Valuation Methods","Due Diligence"], optional: ["Market Research"] },
    "Auditor":                   { core: ["Internal Controls","Compliance Auditing","Risk Assessment","Audit Documentation"], optional: ["Fraud Detection"] },
    "Tax Consultant":            { core: ["Corporate Tax Law","Tax Strategy","Regulatory Filings","Audit Representation"], optional: ["Transfer Pricing"] },
    "Chief Financial Officer":   { core: ["Capital Structure Management","Strategic Finance","Investor Relations","Corporate Governance"], optional: ["FP&A"] },
    "Credit Analyst":            { core: ["Cash Flow Analysis","Debt Service Coverage","Risk Scoring","Financial Statement Analysis"], optional: ["Underwriting"] },
    "Risk Manager":              { core: ["Market Risk Assessment","Operational Risk","Stress Testing","Regulatory Compliance (Basel III)"], optional: ["Hedging Strategies"] },
    "Actuary":                   { core: ["Probability Modeling","Life/Health Insurance Mathematics","Predictive Analytics","SAS/SQL"], optional: ["Financial Solvency"] },
    "Loan Officer":              { core: ["Mortgage/Commercial Lending","Credit Analysis","Loan Documentation","Relationship Management"], optional: ["Underwriting Standards"] },
    "Wealth Manager":            { core: ["Portfolio Diversification","Asset Allocation","Estate Planning","Client Relationship Management"], optional: ["Investment Advisory"] },
    "Insurance Underwriter":     { core: ["Actuarial Science Knowledge","Risk Evaluation","Policy Issuance","Loss Ratio Analysis"], optional: ["Regulatory Compliance"] },
    "Payroll Specialist":        { core: ["Payroll Tax Law","FLSA Compliance","ADP/Workday Systems","Benefits Administration"], optional: ["General Ledger Posting"] },
    "Budget Analyst":            { core: ["Cost-Benefit Analysis","Budget Variance Reporting","Strategic Resource Allocation","Financial Forecasting"], optional: ["Excel Modeling"] },
    "Compliance Officer":        { core: ["Anti-Money Laundering (AML)","KYC Protocols","Regulatory Reporting","Policy Auditing"], optional: ["Ethics Management"] },
    // Marketing
    "Marketing Manager":         { core: ["Marketing Strategy","Campaign ROI Analysis","Brand Management","Market Segmentation"], optional: ["Cross-functional Leadership"] },
    "Digital Marketing Specialist":{ core: ["PPC (Google Ads)","Social Media Marketing","Email Automation","Google Analytics"], optional: ["Content Strategy"] },
    "SEO Analyst":               { core: ["Technical SEO","Keyword Research","Link Building","Search Console"], optional: ["On-page Optimization"] },
    "Content Strategist":        { core: ["Content Lifecycle Management","Editorial Planning","SEO Writing","Audience Research"], optional: ["Performance Tracking"] },
    "Social Media Manager":      { core: ["Community Engagement","Social Listening","Content Creation","Influencer Marketing"], optional: ["Analytics Reporting"] },
    "Brand Manager":             { core: ["Brand Positioning","Identity Management","Market Research","Product Launch Strategy"], optional: ["Competitor Analysis"] },
    "Copywriter":                { core: ["Persuasive Writing","Brand Voice Consistency","Direct Response","Editing/Proofreading"], optional: ["Campaign Conceptualization"] },
    "Email Marketing Specialist":{ core: ["CRM Segmentation","A/B Testing","Deliverability Optimization","Drip Campaigns"], optional: ["HTML/CSS for Email"] },
    "Market Research Analyst":   { core: ["Quantitative Research","Qualitative Analysis","Survey Design","Data Visualization"], optional: ["Trend Forecasting"] },
    "Public Relations Manager":  { core: ["Media Relations","Crisis Management","Press Release Writing","Event Coordination"], optional: ["Brand Advocacy"] },
    "Growth Hacker":             { core: ["A/B Testing","Customer Acquisition Cost (CAC) Analysis","Viral Loops","Funnel Optimization"], optional: ["Data Analytics"] },
    "Advertising Manager":       { core: ["Media Buying","Ad Copy Strategy","Budget Management","Creative Direction"], optional: ["Campaign Performance Tracking"] },
    "Campaign Manager":          { core: ["Project Coordination","Omnichannel Strategy","Targeting/Personalization","Reporting Dashboards"], optional: ["Vendor Management"] },
    // Education
    "Teacher":                   { core: ["Curriculum Planning","Classroom Management","Pedagogical Strategies","Student Assessment"], optional: ["Differentiated Instruction"] },
    "Professor":                 { core: ["Academic Research","Higher Education Pedagogy","Scholarly Publishing","Grant Writing"], optional: ["Mentorship"] },
    "School Principal":          { core: ["School Administration","Budget Management","Staff Supervision","Educational Policy"], optional: ["Stakeholder Engagement"] },
    "Education Coordinator":     { core: ["Program Development","Assessment Design","Resource Allocation","Teacher Training"], optional: ["Accreditation Compliance"] },
    "Tutor":                     { core: ["Personalized Instruction","Subject Mastery","Test Prep (SAT/GRE)","Progress Tracking"], optional: ["Learning Style Adaptation"] },
    "Curriculum Developer":      { core: ["Instructional Design","Learning Management Systems (LMS)","Standardized Assessment","Educational Psychology"], optional: ["Content Mapping"] },
    "Instructional Designer":    { core: ["E-Learning Design","ADDIE/SAM Models","Adobe Captivate/Articulate Storyline","Multimedia Integration"], optional: ["UX for Learning"] },
    "School Counselor":          { core: ["Crisis Intervention","Academic Advising","Career Counseling","Social-Emotional Learning"], optional: ["Conflict Resolution"] },
    "Special Education Teacher": { core: ["Individualized Education Programs (IEP)","Behavior Modification","Assistive Technology","Inclusive Education"], optional: ["Adaptive Instruction"] },
    "Academic Advisor":          { core: ["Degree Audit","Student Retention Strategies","Transfer Credits Evaluation","Academic Planning"], optional: ["Career Guidance"] },
    "Librarian":                 { core: ["Information Literacy","Digital Archiving","Cataloging (Dewey/LOC)","Database Management"], optional: ["Community Programming"] },
    "E-Learning Developer":      { core: ["SCORM/xAPI","LMS Administration","Instructional Video Production","Technical Troubleshooting"], optional: ["Authoring Tools"] },
    // Engineering
    "Civil Engineer":            { core: ["AutoCAD/Civil 3D","Structural Analysis","Project Management","BIM"], optional: ["Site Planning"] },
    "Mechanical Engineer":       { core: ["SolidWorks/CAD","Thermodynamics","Prototyping","FEA Analysis"], optional: ["GD&T Standards"] },
    "Electrical Engineer":       { core: ["Circuit Design","PLC Programming","Power Systems Engineering","MATLAB"], optional: ["Electrical Safety Standards"] },
    "Chemical Engineer":         { core: ["Process Simulation (Aspen Plus)","Unit Operations","Safety Compliance (HAZOP)","Chemical Reaction Engineering"], optional: ["Process Scaling"] },
    "Aerospace Engineer":        { core: ["Aerodynamics","Avionics Systems","Structural Mechanics","Flight Simulation Software"], optional: ["Material Science"] },
    "Structural Engineer":       { core: ["SAP2000/ETABS","Reinforced Concrete Design","Steel Design","Building Codes"], optional: ["Seismic Analysis"] },
    "Biomedical Engineer":       { core: ["Bio-instrumentation","Medical Device Regulation","Biomechanics","Tissue Engineering"], optional: ["Signal Processing"] },
    "Environmental Engineer":    { core: ["Water Treatment Design","EIA","Regulatory Compliance","Air Quality Modeling"], optional: ["GIS"] },
    "Industrial Engineer":       { core: ["Six Sigma/Lean","Supply Chain Optimization","Time & Motion Studies","Facility Layout Design"], optional: ["Simulation (Arena/FlexSim)"] },
    "Manufacturing Engineer":    { core: ["CNC Programming","Quality Management Systems (QMS)","Production Planning","Robotics/Automation"], optional: ["DFM"] },
    "Petroleum Engineer":        { core: ["Reservoir Simulation","Drilling Operations","Well Logging","Enhanced Oil Recovery (EOR)"], optional: ["Production Optimization"] },
    "Robotics Engineer":         { core: ["ROS","Sensor Fusion","Embedded Systems","Kinematics"], optional: ["C++/Python"] },
    "Automotive Engineer":       { core: ["Powertrain Design","Vehicle Dynamics","Automotive Electronics","Chassis Engineering"], optional: ["Safety Systems (ADAS)"] },
    "Quality Control Engineer":  { core: ["SPC","Root Cause Analysis","ISO 9001","Metrology"], optional: ["Quality Auditing"] },
    // Human Resources
    "HR Manager":                { core: ["Strategic HR Planning","Employment Law Compliance","Performance Management","Talent Management"], optional: ["Labor Relations"] },
    "HR Generalist":             { core: ["Employee Lifecycle Management","HRIS Management (Workday/SAP)","Policy Administration","Onboarding/Offboarding"], optional: ["Employee Records"] },
    "Talent Acquisition Specialist":{ core: ["Full-cycle Recruitment","ATS Management","Interview Techniques","Candidate Experience Optimization"], optional: ["Sourcing Strategies"] },
    "Recruiter":                 { core: ["Boolean Search","Cold Outreach","Market Mapping","Screening/Vetting"], optional: ["Negotiation"] },
    "Compensation & Benefits Analyst":{ core: ["Market Benchmarking","Total Rewards Strategy","Benefit Plan Administration","Job Evaluation"], optional: ["FLSA Compliance"] },
    "Learning & Development Manager":{ core: ["Training Needs Analysis","Instructional Design","Leadership Coaching","Learning ROI Tracking"], optional: ["LMS Management"] },
    "HR Business Partner":       { core: ["Organizational Design","Change Management","Employee Engagement","Workforce Analytics"], optional: ["Coaching"] },
    "Payroll Manager":           { core: ["Payroll Tax Accounting","Multi-state Compliance","Audit Management","Garnishment Administration"], optional: ["System Integration"] },
    "Employee Relations Specialist":{ core: ["Workplace Investigations","Grievance Handling","Conflict Resolution","Policy Interpretation"], optional: ["Union Negotiations"] },
    "Organizational Development Consultant":{ core: ["Culture Assessment","Succession Planning","Team Dynamics","Intervention Strategies"], optional: ["Strategic Workforce Planning"] },
    // Sales
    "Sales Manager":             { core: ["Sales Pipeline Management","Forecasting","CRM Strategy (Salesforce)","Quota Planning"], optional: ["Team Leadership"] },
    "Account Executive":         { core: ["Discovery Calls","Product Demonstrations","Closing Techniques","Contract Negotiation"], optional: ["Lead Qualification"] },
    "Business Development Manager":{ core: ["Lead Generation","Strategic Partnerships","Market Expansion","Value-Based Selling"], optional: ["Relationship Management"] },
    "Sales Representative":      { core: ["Inbound/Outbound Sales","Objection Handling","Active Listening","Product Knowledge"], optional: ["Account Management"] },
    "Inside Sales Specialist":   { core: ["Social Selling (LinkedIn)","Sales Engagement Tools","Pipeline Nurturing","KPI Management"], optional: ["CRM Data Entry"] },
    "Key Account Manager":       { core: ["Account Retention Strategy","Cross-selling/Up-selling","Customer Success","Strategic Account Planning"], optional: ["Executive Presentations"] },
    "Sales Operations Analyst":  { core: ["Data Analysis","Sales Performance Metrics","Territory Management","Process Automation"], optional: ["Reporting Dashboards"] },
    "Pre-Sales Consultant":      { core: ["Technical Requirements Scoping","Proof of Concept (POC)","Product Architecture","RFP Responses"], optional: ["Cross-functional Alignment"] },
    "Retail Sales Associate":    { core: ["Customer Experience","POS System Operation","Visual Merchandising","Inventory Tracking"], optional: ["Product Knowledge"] },
    "Channel Sales Manager":     { core: ["Partner Enablement","Incentive Planning","Joint Business Planning","Channel Strategy"], optional: ["Ecosystem Management"] },
    // Design
    "Graphic Designer":          { core: ["Adobe Creative Suite","Typography","Visual Identity Systems","Print Production"], optional: ["Layout Design"] },
    "UX Designer":               { core: ["Wireframing/Prototyping","User Research","Information Architecture","Usability Testing"], optional: ["Personas/User Journeys"] },
    "UI Designer":               { core: ["High-fidelity Prototyping","Figma/Adobe XD","Design Systems","Visual Hierarchy"], optional: ["Micro-interactions"] },
    "Product Designer":          { core: ["Full Product Lifecycle","Interaction Design","Prototyping","User-centric Design"], optional: ["Cross-functional Collaboration"] },
    "Motion Graphics Designer":  { core: ["After Effects","Cinema 4D/3D Motion","Animation Principles","Video Compositing"], optional: ["Storyboarding"] },
    "Brand Identity Designer":   { core: ["Logo Design","Brand Guidelines","Typography","Color Theory"], optional: ["Visual Storytelling"] },
    "Interior Designer":         { core: ["Space Planning","Material Selection","AutoCAD/Revit","Lighting Design"], optional: ["Client Consultation"] },
    "Fashion Designer":          { core: ["Trend Analysis","Pattern Making","Garment Construction","Textile Knowledge"], optional: ["Fashion Illustration"] },
    "Illustrator":               { core: ["Digital Illustration","Vector Art","Storyboarding","Character Design"], optional: ["Concept Art"] },
    "Industrial Designer":       { core: ["Product Sketching","CAD Modeling","Prototyping","Ergonomics"], optional: ["Materials Selection"] },
    // Law
    "Lawyer":                    { core: ["Legal Writing","Litigation Strategy","Case Law Research","Advocacy"], optional: ["Dispute Resolution"] },
    "Paralegal":                 { core: ["Legal Documentation","Case Management","Research & Brief Preparation","Compliance"], optional: ["Court Filings"] },
    "Legal Advisor":             { core: ["Contract Drafting","Regulatory Guidance","Risk Assessment","Negotiation"], optional: ["Corporate Governance"] },
    "Corporate Lawyer":          { core: ["M&A Transactions","Shareholder Agreements","Corporate Compliance","Due Diligence"], optional: ["Commercial Contracts"] },
    "Criminal Lawyer":           { core: ["Criminal Defense","Investigation Review","Plea Negotiation","Courtroom Representation"], optional: ["Legal Strategy"] },
    "Intellectual Property Lawyer":{ core: ["Patent Filing","Trademark Registration","IP Litigation","Copyright Law"], optional: ["IP Portfolio Management"] },
    "Civil Lawyer":              { core: ["Property Law","Contract Disputes","Civil Litigation","Legal Research"], optional: ["Negotiation"] },
    "Legal Researcher":          { core: ["Case Law Analysis","Legal Databases (LexisNexis/Westlaw)","Statutory Interpretation","Regulatory Updates"], optional: ["Brief Drafting"] },
    "Notary Public":             { core: ["Document Verification","Legal Certification","Oaths & Affirmations","Record Maintenance"], optional: ["Compliance Adherence"] },
    // Hospitality & Travel
    "Hotel Manager":             { core: ["Front Office Management","Hospitality Operations","Staff Scheduling","Customer Experience"], optional: ["Revenue Management"] },
    "Chef":                      { core: ["Culinary Skills","Menu Development","Food Safety (HACCP)","Kitchen Operations"], optional: ["Inventory Management"] },
    "Travel Consultant":         { core: ["Itinerary Planning","Booking Systems (GDS)","Visa & Passport Guidance","Customer Service"], optional: ["Destination Knowledge"] },
    "Event Manager":             { core: ["Event Planning","Vendor Coordination","Budget Management","Timeline Management"], optional: ["Client Liaison"] },
    "Tour Guide":                { core: ["Local History Knowledge","Safety Protocols","Communication Skills","Group Management"], optional: ["Customer Engagement"] },
    "Flight Attendant":          { core: ["In-flight Safety","Passenger Service","Emergency Procedures","First Aid"], optional: ["Customer Communication"] },
    "Hospitality Coordinator":   { core: ["Reservation Management","Guest Relations","Housekeeping Oversight","Facility Coordination"], optional: ["Service Standards"] },
    // Government & Public Sector
    "Civil Servant":             { core: ["Policy Analysis","Public Administration","Government Regulations","Stakeholder Management"], optional: ["Program Implementation"] },
    "Policy Analyst":            { core: ["Data Analysis","Legislative Research","Policy Recommendations","Impact Assessment"], optional: ["Stakeholder Consultation"] },
    "Diplomat":                  { core: ["International Relations","Negotiation","Cross-cultural Communication","Protocol & Etiquette"], optional: ["Policy Advisory"] },
    "Public Administrator":      { core: ["Program Management","Budget Allocation","Regulatory Compliance","Stakeholder Engagement"], optional: ["Reporting & Metrics"] },
    "Defense Officer":           { core: ["Strategic Planning","Operational Command","Tactical Execution","Military Training"], optional: ["Risk Assessment"] },
    "Law Enforcement Officer":   { core: ["Criminal Investigation","Patrol & Surveillance","Evidence Handling","Community Policing"], optional: ["Crisis Response"] },
    // Web (new)
    "Web Developer":             { core: ["HTML","CSS","JavaScript","React","Node.js","Git/GitHub"], optional: ["Responsive Design","Basic SEO","Express.js","MongoDB","REST APIs","Tailwind CSS"] },
    // Creative
    "Photographer":              { core: ["Camera Handling","Lighting Techniques","Composition","Photo Editing","Adobe Lightroom","Adobe Photoshop"], optional: ["Portrait Photography","Event Photography","Studio Setup","Color Grading","Retouching","Drone Photography","Basic Videography"] },
    "Director of Photography":   { core: ["Cinematography","Lighting Design","Camera Operation","Visual Storytelling","Film Production"], optional: ["Color Grading","Drone Operation","Storyboarding","Adobe Premiere","DaVinci Resolve"] },
    // Fallback
    "General Position":          { core: ["communication","teamwork","problem solving","leadership","time management"], optional: ["organization","attention to detail","adaptability","critical thinking","project management","microsoft office","data analysis","reporting","collaboration","initiative"] },
  };

  // ── TEXT UTILITIES ───────────────────────────────────────────
  const tokenize = (text) =>
    text.toLowerCase()
      .replace(/[^a-z0-9\s.+#]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 1 && !STOP_WORDS.has(w));

  // ── GRAMMAR ANALYSIS — RULE-BASED ────────────────────────────
  // Evaluates resume text purely on writing quality.
  // Completely independent of job role or skill matching.
  // Returns score 0–100 (same shape as old checkGrammar).

  const getGrammarDetails = (text) => {
    if (!text || !text.trim()) return ['Empty resume text — no content to evaluate.'];

    const issues = [];

    // ── Split into sentences ──────────────────────────────────
    const sentences = text
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 3); // ignore fragments under 4 chars

    if (sentences.length === 0) return ['No readable sentences found.'];

    // ── Rule 1: Capitalization ────────────────────────────────
    // Each sentence should begin with an uppercase letter.
    sentences.forEach((s, i) => {
      if (s.length > 0 && !/^[A-Z0-9"'([]/.test(s)) {
        issues.push(`Sentence ${i + 1} does not start with a capital letter: "${s.slice(0, 40)}…"`);
      }
    });

    // ── Rule 2: End punctuation ───────────────────────────────
    // The full text should end with ., !, or ?
    if (!/[.!?]$/.test(text.trim())) {
      issues.push('Resume text does not end with proper punctuation (., !, or ?).');
    }

    // ── Rule 3: Consecutive repeated words ───────────────────
    // Detects patterns like "very very", "and and", "the the"
    const repeatWordRegex = /\b(\w+)\s+\1\b/gi;
    const repeatMatches   = text.match(repeatWordRegex) || [];
    repeatMatches.forEach(m => {
      issues.push(`Consecutive repeated word detected: "${m}"`);
    });

    // ── Rule 4: Long sentences (readability) ─────────────────
    // Sentences over 25 words are hard to read in a resume context.
    sentences.forEach((s, i) => {
      const wordCount = s.split(/\s+/).filter(Boolean).length;
      if (wordCount > 25) {
        issues.push(`Sentence ${i + 1} is too long (${wordCount} words) — consider splitting it.`);
      }
    });

    // ── Rule 5: Double spaces ─────────────────────────────────
    if (/  +/.test(text)) {
      issues.push('Multiple consecutive spaces found — clean up formatting.');
    }

    // ── Rule 6: Standalone lowercase "i" ─────────────────────
    if (/\bi\b/.test(text) && !/\bI\b/.test(text)) {
      issues.push('Lowercase "i" used as a pronoun — should be capitalized "I".');
    }

    return issues.length === 0
      ? ['Grammar looks good.']
      : issues;
  };

  const analyzeGrammar = (text) => {
    if (!text || !text.trim()) return 0;

    let score = 100;

    const sentences = text
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 3);

    // ── Penalty: capitalization errors (-0.5 each) ────────────
    sentences.forEach(s => {
      if (s.length > 0 && !/^[A-Z0-9"'([]/.test(s)) score -= 0.5;
    });

    // ── Penalty: missing end punctuation (-1) ─────────────────
    if (!/[.!?]$/.test(text.trim())) score -= 1;

    // ── Penalty: consecutive repeated words (-0.3 each) ───────
    const repeatMatches = text.match(/\b(\w+)\s+\1\b/gi) || [];
    score -= repeatMatches.length * 0.3;

    // ── Penalty: long sentences over 25 words (-0.5 each) ─────
    sentences.forEach(s => {
      if (s.split(/\s+/).filter(Boolean).length > 25) score -= 0.5;
    });

    // ── Penalty: double spaces (-0.5) ──────────────────────────
    if (/  +/.test(text)) score -= 0.5;

    // ── Penalty: standalone lowercase "i" (-0.5) ───────────────
    if (/\bi\b/.test(text) && !/\bI\b/.test(text)) score -= 0.5;

    // ── Positive bias: reward any non-empty resume ─────────────
    if (score > 0) score += 10;

    // ── Smart floor: enforce minimum based on quality tier ─────
    const hasValidSentences = sentences.length > 0;
    const noMajorRepetition = repeatMatches.length <= 2;

    if (hasValidSentences && noMajorRepetition) {
      if      (score >= 85) score = Math.max(score, 95);
      else if (score >= 70) score = Math.max(score, 80);
      else                  score = Math.max(score, 70);
    }

    return Math.round(Math.min(100, score));
  };

  // ── GRAMMAR FEEDBACK — SCORE-ALIGNED ─────────────────────────
  // Feedback derived from the final grammar score, not from error count.
  // Optionally appends specific detected issues as bullet hints.
  const getGrammarFeedback = (score, details = []) => {
    let base;
    if      (score >= 95) base = 'Grammar looks excellent.';
    else if (score >= 80) base = 'Grammar is good, but minor improvements can be made.';
    else if (score >= 60) base = 'Some grammar issues detected. Consider improving sentence structure and clarity.';
    else                  base = 'Significant grammar issues found. Needs improvement.';

    // Append specific actionable hints (exclude the "looks good" placeholder)
    const hints = details
      .filter(d => d !== 'Grammar looks good.' && d !== 'Empty resume text — no content to evaluate.' && d !== 'No readable sentences found.')
      .slice(0, 3) // limit to 3 hints to keep it concise
      .map(d => {
        // Shorten verbose details to brief bullet-friendly tips
        if (d.includes('capital'))      return 'Start all sentences with a capital letter.';
        if (d.includes('punctuation'))  return 'End the resume with proper punctuation (., !, or ?).';
        if (d.includes('Consecutive'))  return 'Avoid consecutive repeated words (e.g. "very very").';
        if (d.includes('too long'))     return 'Break long sentences (>25 words) into shorter ones.';
        if (d.includes('spaces'))       return 'Remove extra spaces between words.';
        if (d.includes('"i"'))          return 'Capitalize the pronoun "I" throughout.';
        return d;
      });

    return hints.length > 0
      ? base + '\n' + hints.map(h => `· ${h}`).join('\n')
      : base;
  };

  // Adapter: wraps analyzeGrammar + getGrammarFeedback to return the
  // { grammarScore, grammarNote } shape expected by the scoring engine.
  const checkGrammar = (text) => {
    const grammarScore = analyzeGrammar(text);
    const details      = getGrammarDetails(text);
    const grammarNote  = getGrammarFeedback(grammarScore, details);
    return { grammarScore, grammarNote };
  };

  // ── REPETITION SCORING (5% of final score) ──────────────────
  // Words repeated more than 5 times (ignoring stop words) each
  // cost 2 points; score is clamped between 0 and 100.
  const countRepetitions = (tokens) => {
    const freq = {};
    tokens.forEach(t => { freq[t] = (freq[t] || 0) + 1; });
    return Object.values(freq).filter(c => c > 5).length;
  };

  const calcRepetitionScore = (tokens) => {
    const repeatedWords = countRepetitions(tokens);
    const penalty = repeatedWords * 2;
    return Math.max(0, Math.min(100, 100 - penalty));
  };

  // ── SCORING ENGINE ───────────────────────────────────────────
  const scoreResume = (resumeText, jobRole) => {
    const roleData = JOB_SKILLS[jobRole] || JOB_SKILLS['General Position'];
    const coreSkills = roleData.core;
    const allSkills  = [...roleData.core, ...roleData.optional];
    const resumeTokens = tokenize(resumeText);

    // ── NORMALIZATION ────────────────────────────────────────────
    // Converts common tech aliases to canonical short forms so that
    // "React.js", "ReactJS", "reactjs" all normalize to "react", etc.
    const NORM_MAP = {
      'react.js': 'react', 'reactjs': 'react',
      'node.js':  'node',  'nodejs':  'node',
      'vue.js':   'vue',   'vuejs':   'vue',
      'next.js':  'next',  'nextjs':  'next',
      'express.js':'express','expressjs':'express',
      'javascript': 'js',  'typescript': 'ts',
      'machine learning': 'ml',
      'artificial intelligence': 'ai',
      'natural language processing': 'nlp',
      'continuous integration': 'ci',
      'continuous deployment': 'cd',
      'ci/cd': 'cicd',
      'postgresql': 'postgres',
      'mongodb': 'mongo',
      'kubernetes': 'k8s',
      'github': 'git',
    };

    const normalize = (text) => {
      let t = text.toLowerCase();
      // Apply longest-match replacements first
      Object.entries(NORM_MAP)
        .sort((a, b) => b[0].length - a[0].length)
        .forEach(([from, to]) => {
          t = t.split(from).join(to);
        });
      return t;
    };

    const resumeNorm = normalize(resumeText);

    // ── SYNONYMS DICTIONARY ──────────────────────────────────────
    // Keys = normalized form. Values = additional surface forms to
    // check in the resume (also normalized before comparison).
    const SYNONYMS = {
      // JavaScript ecosystem
      'react':        ['react.js','reactjs','react js'],
      'node':         ['node.js','nodejs','node js'],
      'express':      ['express.js','expressjs'],
      'next':         ['next.js','nextjs'],
      'vue':          ['vue.js','vuejs'],
      'angular':      ['angularjs','angular js'],
      'js':           ['javascript','ecmascript'],
      'ts':           ['typescript'],
      // Python ecosystem
      'python':       ['py','python3','python 3'],
      'django':       ['django rest framework','drf'],
      'flask':        ['flask api'],
      'fastapi':      ['fast api'],
      // Data / ML
      'ml':           ['machine learning','scikit learn','sklearn'],
      'ai':           ['artificial intelligence'],
      'nlp':          ['natural language processing','text mining'],
      'dl':           ['deep learning','neural network','neural networks'],
      'cv':           ['computer vision','image recognition'],
      // Databases
      'sql':          ['mysql','structured query language','t-sql','plsql'],
      'mongo':        ['mongodb','mongo db'],
      'postgres':     ['postgresql','pg'],
      'redis':        ['redis cache'],
      // DevOps / Cloud
      'k8s':          ['kubernetes','kube'],
      'git':          ['github','gitlab','bitbucket','version control'],
      'cicd':         ['ci/cd','continuous integration','continuous delivery','continuous deployment','jenkins','github actions','gitlab ci'],
      'aws':          ['amazon web services','amazon aws','ec2','s3','lambda'],
      'azure':        ['microsoft azure','azure cloud'],
      'gcp':          ['google cloud','google cloud platform'],
      'docker':       ['containerization','containers'],
      'terraform':    ['infrastructure as code','iac'],
      // APIs / Architecture
      'rest':         ['restful','rest api','rest apis','restful api','restful apis','http api'],
      'graphql':      ['graph ql'],
      'grpc':         ['grpc api'],
      'microservices':['micro services','microservice','service oriented'],
      // Frontend
      'html':         ['html5','hypertext markup','markup language'],
      'css':          ['css3','sass','scss','less','stylesheets'],
      'tailwind':     ['tailwind css','tailwindcss'],
      'redux':        ['redux toolkit','react redux','state management'],
      'webpack':      ['bundler','parcel','vite','rollup'],
      // Java ecosystem
      'java':         ['java 8','java 11','java 17','jvm','openjdk'],
      'spring':       ['spring boot','spring framework','spring mvc'],
      // Mobile
      'flutter':      ['dart','flutter sdk'],
      'swift':        ['swiftui','ios development'],
      'kotlin':       ['android kotlin'],
      // Data tools
      'pandas':       ['dataframe','data frames'],
      'tensorflow':   ['tf','keras'],
      'pytorch':      ['torch'],
      // Collaboration / PM
      'agile':        ['scrum','kanban','sprint','agile methodology'],
      'jira':         ['atlassian jira','jira software'],
      'figma':        ['figma design'],
      // Healthcare
      'ehr':          ['electronic health record','emr','electronic medical record'],
      'icu':          ['intensive care','critical care'],
      // Finance
      'gaap':         ['generally accepted accounting principles'],
      'ifrs':         ['international financial reporting standards'],
      // Marketing
      'seo':          ['search engine optimization'],
      'sem':          ['search engine marketing','ppc','pay per click'],
      'crm':          ['customer relationship management','salesforce','hubspot'],
    };

    // ── isSkillMatch ─────────────────────────────────────────────
    // Primary entry point: normalizes the skill, then checks the
    // normalized resume for the skill itself OR any synonym.
    const isSkillMatch = (skill) => {
      const normSkill = normalize(skill.trim());
      // Direct normalized match
      if (resumeNorm.includes(normSkill)) return true;
      // Synonym match (normalize each synonym too, for consistency)
      const variations = SYNONYMS[normSkill] || [];
      if (variations.some(v => resumeNorm.includes(normalize(v)))) return true;
      return false;
    };
    // Higher weight = more impact on skillScore.
    // Unlisted skills default to weight 1.
    const SKILL_WEIGHTS = {
      // IT Core
      'React': 5, 'React.js': 5, 'React Developer': 5,
      'Node.js': 5, 'Node.js Developer': 5,
      'JavaScript': 4, 'JavaScript (ES6+)': 4, 'ES6+': 4,
      'TypeScript': 4,
      'Python': 5, 'Java 17+': 5, 'Java': 5,
      'SQL': 4, 'SQL/NoSQL Databases': 4,
      'MongoDB': 4, 'PostgreSQL': 4,
      'Docker': 4, 'Kubernetes': 4,
      'REST APIs': 4, 'RESTful APIs': 4,
      'Git/GitHub': 3, 'Git': 3,
      'HTML5': 2, 'HTML': 2,
      'CSS3/Sass': 2, 'CSS': 2,
      'Agile/Scrum': 3, 'Agile Frameworks': 3,
      'Machine Learning (Scikit-learn)': 5,
      'TensorFlow/PyTorch': 5,
      'Deep Learning': 4,
      'CI/CD Pipelines': 4,
      // Healthcare
      'Clinical Diagnosis': 5, 'Patient Care Protocols': 5,
      'EHR/EMR Software': 4, 'Medication Administration': 4,
      'Surgical Procedures': 5, 'Pharmacology': 4,
      // Finance
      'Financial Modeling': 5, 'GAAP/IFRS Standards': 5,
      'Tax Compliance': 4, 'Risk Assessment': 4,
      // Marketing
      'SEO': 4, 'Technical SEO': 4,
      'Google Analytics': 4, 'PPC (Google Ads)': 4,
      'Content Strategy': 3,
      // Design
      'Figma/Adobe XD': 4, 'Adobe Creative Suite': 4,
      'Wireframing/Prototyping': 4, 'User Research': 4,
    };

    const weightOf = (skill) => SKILL_WEIGHTS[skill] ?? 1;

    // ── SKILL MATCH HELPER ──────────────────────────────────────
    // Calls isSkillMatch (synonym-aware) first, then falls through
    // to deeper structural matches (parens, version strip, slash, &).
    const skillMatch = (skill) => {
      // Step 1 — synonym + normalized match (fastest path)
      if (isSkillMatch(skill)) return true;

      const resumeLower = resumeText.toLowerCase();
      const s = skill.toLowerCase().trim();
      const sNorm = normalize(s);

      // Step 2 — exact lowercase substring (handles edge cases not caught by normalize)
      if (resumeLower.includes(s)) return true;

      // Helper: word-boundary aware regex test
      const testToken = (token) => {
        if (!token || token.length < 2) return false;
        const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp(`(?<![a-z0-9])${escaped}(?![a-z0-9])`, 'i');
        return re.test(resumeText);
      };

      // Helper: strip version/qualifier suffixes
      const stripVersion = (token) =>
        token
          .replace(/\.js\b/gi, '')
          .replace(/\s+\d[\w.+]*/g, '')
          .replace(/\d+[.+]*$/g, '')
          .replace(/[+]+$/, '')
          .trim();

      // Step 3 — strip parenthetical qualifiers: "Machine Learning (Scikit-learn)" → "machine learning"
      const withoutParens = s.replace(/\s*\(.*?\)/g, '').trim();
      if (withoutParens && withoutParens !== s) {
        if (isSkillMatch(withoutParens)) return true;
        if (resumeNorm.includes(normalize(withoutParens))) return true;
        if (resumeLower.includes(withoutParens)) return true;
        if (testToken(withoutParens)) return true;
      }

      // Step 4 — standalone version strip: "Java 17+" → "java", "React.js" → "react"
      const sBase = stripVersion(s);
      if (sBase && sBase !== s && sBase.length >= 2) {
        if (isSkillMatch(sBase)) return true;
        if (resumeNorm.includes(normalize(sBase))) return true;
        if (resumeLower.includes(sBase)) return true;
        if (testToken(sBase)) return true;
      }

      // Step 5 — slash-separated aliases: "Node.js/Python/Java", "Flutter/React Native"
      const slashParts = s.split('/').map(p => p.trim()).filter(p => p.length >= 2);
      if (slashParts.length > 1) {
        for (const part of slashParts) {
          if (isSkillMatch(part)) return true;
          if (resumeNorm.includes(normalize(part))) return true;
          if (resumeLower.includes(part)) return true;
          if (testToken(part)) return true;
          const base = stripVersion(part);
          if (base && base !== part && base.length >= 2) {
            if (isSkillMatch(base)) return true;
            if (resumeNorm.includes(normalize(base))) return true;
            if (resumeLower.includes(base)) return true;
            if (testToken(base)) return true;
          }
        }
      }

      // Step 6 — ampersand compound: "Research & Brief Preparation" → try each side
      if (s.includes(' & ')) {
        const ampParts = s.split(' & ').map(p => p.trim());
        if (ampParts.some(p => isSkillMatch(p) || resumeNorm.includes(normalize(p)) || resumeLower.includes(p) || testToken(p))) return true;
      }

      // Step 7 — first two significant words as phrase: "Sprint Planning" → "sprint planning"
      const words = withoutParens.split(/\s+/).filter(w => w.length >= 3);
      if (words.length >= 2) {
        const firstTwo = words.slice(0, 2).join(' ');
        if (isSkillMatch(firstTwo)) return true;
        if (resumeNorm.includes(normalize(firstTwo))) return true;
        if (resumeLower.includes(firstTwo)) return true;
      }

      return false;
    };

    // ── SECTOR CONFIGURATION ──────────────────────────────────────

    // Maps every role to a sector for weight + keyword lookup
    const ROLE_TO_SECTOR = {
      // IT
      'Software Engineer':'IT','Frontend Developer':'IT','Backend Developer':'IT',
      'Full Stack Developer':'IT','Data Analyst':'IT','Data Scientist':'IT',
      'Machine Learning Engineer':'IT','AI Engineer':'IT','Java Developer':'IT',
      'Python Developer':'IT','JavaScript Developer':'IT','React Developer':'IT',
      'Node.js Developer':'IT','DevOps Engineer':'IT','Cloud Architect':'IT',
      'Cybersecurity Analyst':'IT','Network Engineer':'IT','Database Administrator':'IT',
      'IT Support Specialist':'IT','QA Engineer':'IT','Mobile App Developer':'IT',
      'iOS Developer':'IT','Android Developer':'IT','Blockchain Developer':'IT',
      'Product Manager':'IT','Scrum Master':'IT','Business Analyst':'IT',
      'Systems Analyst':'IT','IT Project Manager':'IT','Technical Writer':'IT',
      'Web Developer':'IT',
      // Creative
      'Graphic Designer':'Creative','UX Designer':'Creative','UI Designer':'Creative',
      'Product Designer':'Creative','Motion Graphics Designer':'Creative',
      'Brand Identity Designer':'Creative','Interior Designer':'Creative',
      'Fashion Designer':'Creative','Illustrator':'Creative','Industrial Designer':'Creative',
      'Photographer':'Creative','Director of Photography':'Creative',
      // Finance
      'Accountant':'Finance','Financial Analyst':'Finance','Investment Banker':'Finance',
      'Auditor':'Finance','Tax Consultant':'Finance','Chief Financial Officer':'Finance',
      'Credit Analyst':'Finance','Risk Manager':'Finance','Actuary':'Finance',
      'Loan Officer':'Finance','Wealth Manager':'Finance','Insurance Underwriter':'Finance',
      'Payroll Specialist':'Finance','Budget Analyst':'Finance','Compliance Officer':'Finance',
      // Healthcare
      'Doctor':'Healthcare','Nurse':'Healthcare','Surgeon':'Healthcare',
      'Pharmacist':'Healthcare','Dentist':'Healthcare','Physiotherapist':'Healthcare',
      'Radiologist':'Healthcare','Anesthesiologist':'Healthcare','Pediatrician':'Healthcare',
      'Psychiatrist':'Healthcare','Dermatologist':'Healthcare',
      'Medical Lab Technician':'Healthcare','Occupational Therapist':'Healthcare',
      'Nutritionist':'Healthcare','Paramedic':'Healthcare',
      'Clinical Research Associate':'Healthcare','Healthcare Administrator':'Healthcare',
      'Veterinarian':'Healthcare','Speech Therapist':'Healthcare','Optometrist':'Healthcare',
      // Marketing
      'Marketing Manager':'Marketing','Digital Marketing Specialist':'Marketing',
      'SEO Analyst':'Marketing','Content Strategist':'Marketing',
      'Social Media Manager':'Marketing','Brand Manager':'Marketing',
      'Copywriter':'Marketing','Email Marketing Specialist':'Marketing',
      'Market Research Analyst':'Marketing','Public Relations Manager':'Marketing',
      'Growth Hacker':'Marketing','Advertising Manager':'Marketing','Campaign Manager':'Marketing',
      // Education
      'Teacher':'Education','Professor':'Education','School Principal':'Education',
      'Education Coordinator':'Education','Tutor':'Education',
      'Curriculum Developer':'Education','Instructional Designer':'Education',
      'School Counselor':'Education','Special Education Teacher':'Education',
      'Academic Advisor':'Education','Librarian':'Education','E-Learning Developer':'Education',
      // Engineering
      'Civil Engineer':'Engineering','Mechanical Engineer':'Engineering',
      'Electrical Engineer':'Engineering','Chemical Engineer':'Engineering',
      'Aerospace Engineer':'Engineering','Structural Engineer':'Engineering',
      'Biomedical Engineer':'Engineering','Environmental Engineer':'Engineering',
      'Industrial Engineer':'Engineering','Manufacturing Engineer':'Engineering',
      'Petroleum Engineer':'Engineering','Robotics Engineer':'Engineering',
      'Automotive Engineer':'Engineering','Quality Control Engineer':'Engineering',
      // HR
      'HR Manager':'HR','HR Generalist':'HR','Talent Acquisition Specialist':'HR',
      'Recruiter':'HR','Compensation & Benefits Analyst':'HR',
      'Learning & Development Manager':'HR','HR Business Partner':'HR',
      'Payroll Manager':'HR','Employee Relations Specialist':'HR',
      'Organizational Development Consultant':'HR',
      // Sales
      'Sales Manager':'Sales','Account Executive':'Sales',
      'Business Development Manager':'Sales','Sales Representative':'Sales',
      'Inside Sales Specialist':'Sales','Key Account Manager':'Sales',
      'Sales Operations Analyst':'Sales','Pre-Sales Consultant':'Sales',
      'Retail Sales Associate':'Sales','Channel Sales Manager':'Sales',
      // Law
      'Lawyer':'Law','Paralegal':'Law','Legal Advisor':'Law','Corporate Lawyer':'Law',
      'Criminal Lawyer':'Law','Intellectual Property Lawyer':'Law','Civil Lawyer':'Law',
      'Legal Researcher':'Law','Notary Public':'Law',
    };

    // Sector-specific scoring weights
    // Total per row = 1.0
    // quality raised to 0.10 across all sectors so grammar has noticeable impact
    const SECTOR_WEIGHTS = {
      IT:          { core: 0.70, recommended: 0.10, experience: 0.10, certification: 0,    quality: 0.10 },
      Creative:    { core: 0.45, recommended: 0.10, experience: 0.30, certification: 0,    quality: 0.15 },
      Finance:     { core: 0.45, recommended: 0.10, experience: 0.15, certification: 0.20, quality: 0.10 },
      Healthcare:  { core: 0.35, recommended: 0.05, experience: 0.40, certification: 0.10, quality: 0.10 },
      Marketing:   { core: 0.50, recommended: 0.15, experience: 0.20, certification: 0,    quality: 0.15 },
      Education:   { core: 0.45, recommended: 0.10, experience: 0.30, certification: 0.05, quality: 0.10 },
      Engineering: { core: 0.55, recommended: 0.10, experience: 0.25, certification: 0,    quality: 0.10 },
      HR:          { core: 0.45, recommended: 0.10, experience: 0.30, certification: 0.05, quality: 0.10 },
      Sales:       { core: 0.45, recommended: 0.10, experience: 0.30, certification: 0,    quality: 0.15 },
      Law:         { core: 0.40, recommended: 0.05, experience: 0.40, certification: 0.05, quality: 0.10 },
      Default:     { core: 0.70, recommended: 0.10, experience: 0.10, certification: 0,    quality: 0.10 },
    };

    // Sector-specific experience/context keywords
    const SECTOR_KEYWORDS = {
      IT:          ['project','github','application','development','deployed','built','api'],
      Creative:    ['portfolio','photoshoot','client','gallery','exhibition','shoot','commission'],
      Finance:     ['internship','experience','audit','report','analysis','budget','forecast'],
      Healthcare:  ['clinical','hospital','patient','treatment','ward','diagnosis','surgery'],
      Marketing:   ['campaign','brand','digital','seo','social media','analytics','content'],
      Education:   ['teaching','classroom','curriculum','students','lesson','school','university'],
      Engineering: ['project','design','specifications','prototype','construction','testing'],
      HR:          ['recruitment','hiring','onboarding','payroll','employee','training'],
      Sales:       ['revenue','target','client','deal','pipeline','quota','sales'],
      Law:         ['case','client','court','legal','contract','litigation','counsel'],
    };

    // ── ROLE-BASED PRIORITY (projects / experience / certifications) ──
    // Defines how projects, experience, and certifications are weighted
    // relative to each other within the "experience" portion of the score.
    // Falls back to sector defaults when a role isn't listed.
    const ROLE_PRIORITY = {
      // IT roles
      'Web Developer':              { projects: 0.5, experience: 0.3, certifications: 0.2 },
      'Software Engineer':          { projects: 0.4, experience: 0.4, certifications: 0.2 },
      'Frontend Developer':         { projects: 0.5, experience: 0.3, certifications: 0.2 },
      'Backend Developer':          { projects: 0.3, experience: 0.5, certifications: 0.2 },
      'Full Stack Developer':       { projects: 0.4, experience: 0.4, certifications: 0.2 },
      'Data Analyst':               { projects: 0.3, experience: 0.4, certifications: 0.3 },
      'Data Scientist':             { projects: 0.3, experience: 0.4, certifications: 0.3 },
      'Machine Learning Engineer':  { projects: 0.4, experience: 0.4, certifications: 0.2 },
      'AI Engineer':                { projects: 0.4, experience: 0.4, certifications: 0.2 },
      'DevOps Engineer':            { projects: 0.2, experience: 0.6, certifications: 0.2 },
      'Cloud Architect':            { projects: 0.2, experience: 0.5, certifications: 0.3 },
      'Cybersecurity Analyst':      { projects: 0.2, experience: 0.5, certifications: 0.3 },
      'QA Engineer':                { projects: 0.3, experience: 0.5, certifications: 0.2 },
      'Mobile App Developer':       { projects: 0.5, experience: 0.3, certifications: 0.2 },
      'React Developer':            { projects: 0.5, experience: 0.3, certifications: 0.2 },
      'Java Developer':             { projects: 0.3, experience: 0.5, certifications: 0.2 },
      'Python Developer':           { projects: 0.4, experience: 0.4, certifications: 0.2 },
      // Creative
      'Photographer':               { projects: 0.6, experience: 0.3, certifications: 0.1 },
      'Director of Photography':    { projects: 0.6, experience: 0.3, certifications: 0.1 },
      'Graphic Designer':           { projects: 0.6, experience: 0.3, certifications: 0.1 },
      'UX Designer':                { projects: 0.5, experience: 0.4, certifications: 0.1 },
      'UI Designer':                { projects: 0.5, experience: 0.4, certifications: 0.1 },
      'Motion Graphics Designer':   { projects: 0.6, experience: 0.3, certifications: 0.1 },
      // Finance
      'Accountant':                 { projects: 0.1, experience: 0.5, certifications: 0.4 },
      'Financial Analyst':          { projects: 0.2, experience: 0.4, certifications: 0.4 },
      'Auditor':                    { projects: 0.1, experience: 0.5, certifications: 0.4 },
      'Tax Consultant':             { projects: 0.1, experience: 0.4, certifications: 0.5 },
      // Healthcare
      'Doctor':                     { projects: 0.1, experience: 0.7, certifications: 0.2 },
      'Nurse':                      { projects: 0.1, experience: 0.7, certifications: 0.2 },
      'Pharmacist':                 { projects: 0.1, experience: 0.6, certifications: 0.3 },
      // Marketing
      'Marketing Manager':          { projects: 0.4, experience: 0.4, certifications: 0.2 },
      'Digital Marketing Specialist':{ projects: 0.4, experience: 0.3, certifications: 0.3 },
      'SEO Analyst':                { projects: 0.4, experience: 0.3, certifications: 0.3 },
      'Content Strategist':         { projects: 0.5, experience: 0.3, certifications: 0.2 },
    };

    // Resolve role priority (fall back to sector-neutral split if role not listed)
    const rolePriority = ROLE_PRIORITY[jobRole] || { projects: 0.33, experience: 0.34, certifications: 0.33 };

    const sector   = ROLE_TO_SECTOR[jobRole] || 'Default';
    const category = sector;
    const swt      = SECTOR_WEIGHTS[sector] || SECTOR_WEIGHTS.Default;

    // ── SECTION EXTRACTORS ───────────────────────────────────────
    const resumeLower = resumeText.toLowerCase();

    const extractProjectsScore = () => {
      const kw = [
        'project','built','developed','created','designed','implemented','deployed',
        'launched','engineered','portfolio','github','demo','app','system','platform',
        'application','website','tool','module','feature','api','dashboard',
      ];
      return Math.min(100, kw.filter(k => resumeLower.includes(k)).length * 7);
    };

    const detectHasExperience = () => {
      const expKeywords = [
        'experience','worked','employed','employment','company','organization',
        'years of experience','yr experience','years experience',
        'senior','junior','lead','principal','manager','intern',
        'full time','part time','contract','freelance',
      ];
      const yearPattern = /(\d+)\s*\+?\s*years?/i.test(resumeText);
      const kwHit = expKeywords.some(k => resumeLower.includes(k));
      return yearPattern || kwHit;
    };

    const extractExperienceScore = () => {
      let score = 0;
      const yearMatches = resumeText.match(/(\d+)\s*\+?\s*years?/gi) || [];
      const maxYears = yearMatches.reduce((max, m) => {
        const n = parseInt(m, 10); return n > max ? n : max;
      }, 0);
      score += Math.min(60, maxYears * 8);
      const histKw = [
        'experience','worked','responsible','led','managed','coordinated','supervised',
        'internship','trainee','associate','senior','junior','lead','principal',
        'employment','position','role','company','organization','employer',
      ];
      score += Math.min(40, histKw.filter(k => resumeLower.includes(k)).length * 3);
      return Math.min(100, score);
    };

    const extractCertScore = () => {
      const kw = [
        'certified','certification','certificate','license','licensed','credential',
        'aws certified','google certified','microsoft certified','pmp','cpa','cfa',
        'ceh','cissp','ccna','ccnp','acls','bls','rn','md','phd','mba','coursera',
        'udemy','linkedin learning','comptia','oracle certified','scrum master',
        'course','training',
      ];
      return Math.min(100, kw.filter(k => resumeLower.includes(k)).length * 12);
    };

    const extractLicenseScore = () => {
      const kw = [
        'license','licensed','rn','md','do','np','pa','dds','dmd','pharmd',
        'npi','dea','state license','board certified','medical license',
        'nursing license','dental license','pharmacy license','bar exam','bar certified',
        'solicitor','advocate','notary',
      ];
      return Math.min(100, kw.filter(k => resumeLower.includes(k)).length * 20);
    };

    // ── CANDIDATE TYPE DETECTION ─────────────────────────────────
    const hasExperience = detectHasExperience();
    const candidateType = hasExperience ? 'Experienced' : 'Fresher';

    // ── SKILL SCORING ────────────────────────────────────────────
    const matched = allSkills.filter(skillMatch);
    const missing = allSkills.filter(s => !skillMatch(s));
    const missingSkillsPercent = Math.round((missing.length / allSkills.length) * 100);

    // 1. CORE SKILLS SCORE — weighted + frequency boost
    const matchedCore  = coreSkills.filter(skillMatch);
    const coreTotal    = coreSkills.reduce((sum, s) => sum + weightOf(s), 0);
    const coreMatchedW = matchedCore.reduce((sum, s) => {
      const baseW = weightOf(s);
      const freq  = (resumeNorm.split(normalize(s)).length - 1);
      const boost = Math.min(0.2, (freq - 1) * 0.05);
      return sum + baseW * (1 + boost);
    }, 0);
    const coreScore = coreTotal > 0 ? Math.min(100, Math.round((coreMatchedW / coreTotal) * 100)) : 0;
    const skillScore = coreScore;

    // 2. RECOMMENDED SKILLS SCORE
    const optionalSkills  = roleData.optional || [];
    const matchedOptional = optionalSkills.filter(skillMatch);
    const recommendedScore = optionalSkills.length > 0
      ? Math.round((matchedOptional.length / optionalSkills.length) * 100)
      : 0;

    // 3. SECTOR-AWARE EXPERIENCE SCORE
    const sectorKw = SECTOR_KEYWORDS[sector] || [];
    const sectorExpFound = sectorKw.some(w => resumeLower.includes(w));
    const genericExpScore = extractExperienceScore();
    const sectorExperienceScore = sectorExpFound
      ? Math.min(100, genericExpScore + 20)
      : genericExpScore;

    // 4. CERTIFICATION SCORE
    const certificationScore = extractCertScore();

    // 5. PROJECT SCORE (always computed for role-priority use)
    const rawProjectsScore = extractProjectsScore();

    // 5a. GRAMMAR + REPETITION QUALITY SCORE
    const { grammarScore, grammarNote } = checkGrammar(resumeText);
    const repetitionScore   = calcRepetitionScore(resumeTokens);
    const repetitionPenalty = 100 - repetitionScore;
    const qualityScore      = Math.round((grammarScore + repetitionScore) / 2);

    // ── ROLE-PRIORITY SECTION SCORE ──────────────────────────────
    // Combines projects, experience, and certifications using role-specific weights.
    // This replaces the flat experience weight in SECTOR_WEIGHTS for those three signals.
    let roleSectionScore =
      rawProjectsScore     * rolePriority.projects +
      sectorExperienceScore * rolePriority.experience +
      certificationScore    * rolePriority.certifications;

    // ── MISSING COMPONENT PENALTIES ───────────────────────────────
    // If a role heavily weights experience but none is found → penalise
    if (rolePriority.experience > 0.5 && sectorExperienceScore === 0) {
      roleSectionScore *= 0.6;
    }
    // If a role heavily weights projects but none is found → penalise
    if (rolePriority.projects > 0.5 && rawProjectsScore === 0) {
      roleSectionScore *= 0.6;
    }

    roleSectionScore = Math.min(100, roleSectionScore);

    console.log('Role Priority:', ROLE_PRIORITY[jobRole] || 'default split');
    console.log('Project Score:', rawProjectsScore);
    console.log('Experience Score:', sectorExperienceScore);

    // 6. FINAL SCORE — sector weights for core/recommended/quality;
    //    role-priority score replaces the old flat experience component.
    const overallScore = Math.round(
      Math.max(0, Math.min(100,
        coreScore        * swt.core +
        recommendedScore * swt.recommended +
        roleSectionScore * (swt.experience + (swt.certification || 0)) + // role-priority covers both
        qualityScore     * swt.quality
      ))
    );

    // Section score aliases (kept for sectionScores object and feedback)
    const projectsScore   = rawProjectsScore;
    const experienceScore = sectorExperienceScore;
    const certScore       = certificationScore;
    const licenseScore    = null;
    const coreScoreTotal  = overallScore;

    // ── DYNAMIC FEEDBACK ─────────────────────────────────────────
    const feedbackLines = [];

    feedbackLines.push(
      candidateType === 'Fresher'
        ? 'You are evaluated as a fresher candidate — focus on skills and projects.'
        : 'You are evaluated as an experienced candidate.'
    );

    if (overallScore >= 80)
      feedbackLines.push(`You are in a great position for ${jobRole}!`);
    else if (overallScore >= 60)
      feedbackLines.push(`You are in a good position but need to improve a few areas for ${jobRole}.`);
    else if (overallScore >= 40)
      feedbackLines.push(`Your resume needs significant improvement for ${jobRole}.`);
    else
      feedbackLines.push(`Low ATS match for ${jobRole}. Rebuild around core requirements.`);

    if (missing.length > 0)
      feedbackLines.push(`Missing key skills: ${missing.slice(0, 4).join(', ')}.`);
    if (candidateType === 'Fresher')
      feedbackLines.push('Add internships or work experience to improve your score over time.');
    if (swt.experience > 0 && sectorExperienceScore < 40)
      feedbackLines.push('Add sector-relevant experience or portfolio work to strengthen your profile.');
    if (swt.certification > 0 && certificationScore < 30)
      feedbackLines.push('Include relevant certifications to boost your score.');
    if (grammarScore < 70)
      feedbackLines.push('Grammar needs improvement — check capitalization and spacing.');
    if (repetitionPenalty > 10)
      feedbackLines.push('Avoid repeated words — vary your language for better readability.');

    const feedback = feedbackLines.join(' ');

    const improvements = [
      missing.length > 0
        ? `Add missing skills: ${missing.slice(0, 3).join(', ')}`
        : 'All core skills are present — great job!',
      repetitionPenalty > 0
        ? 'Reduce repeated keywords — vary your language for better readability.'
        : 'Good keyword variety — no excessive repetition found.',
      grammarScore < 80
        ? 'Improve grammar: start sentences with capitals and avoid repeated spaces.'
        : 'Resume clarity is good — sentences are well-structured.',
    ];

    // ── SKILL CLASSIFICATION ─────────────────────────────────────
    const coreSkillsToImprove = missing.filter(s => coreSkills.includes(s));
    const recommendedSkills   = missing.filter(s => !coreSkills.includes(s));

    // ── MOTIVATION ───────────────────────────────────────────────
    const motivationQuotes = [
      "You're close — refine a few areas to improve your match.",
      "Strong foundation. A few updates will make a real difference.",
      "Almost there — small changes can significantly boost your score.",
      "Good progress. Focus on gaps to get to the next level.",
      "Solid start. Addressing key areas will sharpen your profile.",
      "Keep going — targeted improvements will raise your score.",
      "Good base. A bit more polish and you'll stand out.",
      "You're on the right track — refine and you'll shine.",
    ];
    const motivationIndex = Math.min(Math.floor((100 - overallScore) / 14), motivationQuotes.length - 1);
    const motivation = motivationQuotes[Math.max(0, motivationIndex)];

    const sectionScores = { skills: skillScore };
    if (projectsScore   !== null) sectionScores.projects      = projectsScore;
    if (experienceScore !== null) sectionScores.experience     = experienceScore;
    if (certScore       !== null) sectionScores.certifications = certScore;
    if (licenseScore    !== null) sectionScores.license        = licenseScore;

    return {
      overallScore,
      coreScore:            coreScoreTotal,
      skillScore,
      projectsScore:        projectsScore   ?? undefined,
      experienceScore:      experienceScore ?? undefined,
      certScore:            certScore       ?? undefined,
      licenseScore:         licenseScore    ?? undefined,
      grammarScore:         Math.round(grammarScore),
      repetitionScore,
      missingSkillsPercent,
      candidateType,
      category,
      sectionScores,
      feedback,
      motivation,
      matchedSkills:        matched,
      missingSkills:        missing,
      coreSkillsToImprove,
      recommendedSkills,
      improvements,
      grammarNote,
    };
  };

  // ── PDF EXTRACTION — TEXT + EMBEDDED IMAGES ─────────────────
  // Returns { text, logoSkillsFromPDF }
  // Extracts both text content and embedded images from each PDF page.
  // Images are extracted via two methods (primary + fallback):
  //   Primary:  pdf.js operator list → paintImageXObject → objs.get()
  //   Fallback: render full page to canvas, crop into grid cells
  const extractFromPDF = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const typedArray = new Uint8Array(e.target.result);

          // Load pdf.js
          if (!window.pdfjsLib) {
            await new Promise((res, rej) => {
              const s = document.createElement('script');
              s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
              s.onload = res; s.onerror = rej;
              document.head.appendChild(s);
            });
            window.pdfjsLib.GlobalWorkerOptions.workerSrc =
              'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          }

          const pdf      = await window.pdfjsLib.getDocument({ data: typedArray }).promise;
          let   text     = '';
          const imageBlobs = [];
          const imagesMeta = []; // parallel array: { w, h } for each blob

          for (let pageNum = 1; pageNum <= Math.min(pdf.numPages, 5); pageNum++) {
            const page = await pdf.getPage(pageNum);

            // ── TEXT ──────────────────────────────────────────────
            const content = await page.getTextContent();
            text += content.items.map(item => item.str).join(' ') + '\n';

            // ── PRIMARY: extract embedded image objects ────────────
            let primarySucceeded = false;
            try {
              const opList  = await page.getOperatorList();
              const OPS     = window.pdfjsLib.OPS;
              const imgKeys = new Set();

              for (let i = 0; i < opList.fnArray.length; i++) {
                const fn = opList.fnArray[i];
                if (fn === OPS.paintImageXObject      ||
                    fn === OPS.paintInlineImageXObject ||
                    fn === OPS.paintImageMaskXObject) {
                  const key = opList.argsArray[i]?.[0];
                  if (key) imgKeys.add(key);
                }
              }

              for (const key of imgKeys) {
                if (imageBlobs.length >= 20) break;
                try {
                  // pdf.js 3.x: objs.get() is callback-based; wrap as promise
                  const imgObj = await new Promise((res) => {
                    const obj = page.objs.get(key, (data) => res(data));
                    // Some builds return synchronously
                    if (obj !== undefined) res(obj);
                  });

                  if (!imgObj || !imgObj.width || !imgObj.height) continue;
                  // Skip decorative tiny images or full-page backgrounds
                  const px = imgObj.width * imgObj.height;
                  if (px < 400 || px > 4_000_000) continue;

                  const canvas = document.createElement('canvas');
                  canvas.width  = imgObj.width;
                  canvas.height = imgObj.height;
                  const ctx = canvas.getContext('2d');

                  // Handle both Uint8ClampedArray (RGBA) and plain arrays
                  const raw = imgObj.data instanceof Uint8ClampedArray
                    ? imgObj.data
                    : new Uint8ClampedArray(imgObj.data);

                  // pdf.js images are RGBA; if length is width*height*3 (RGB), convert
                  let rgba;
                  if (raw.length === imgObj.width * imgObj.height * 4) {
                    rgba = raw;
                  } else if (raw.length === imgObj.width * imgObj.height * 3) {
                    rgba = new Uint8ClampedArray(imgObj.width * imgObj.height * 4);
                    for (let p = 0, q = 0; p < raw.length; p += 3, q += 4) {
                      rgba[q] = raw[p]; rgba[q+1] = raw[p+1];
                      rgba[q+2] = raw[p+2]; rgba[q+3] = 255;
                    }
                  } else {
                    continue; // unknown format
                  }

                  ctx.putImageData(new ImageData(rgba, imgObj.width, imgObj.height), 0, 0);
                  const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
                  if (blob) {
                    imageBlobs.push(blob);
                    imagesMeta.push({ w: imgObj.width, h: imgObj.height });
                    primarySucceeded = true;
                  }
                } catch (_) { /* skip individual unreadable image */ }
              }
            } catch (_) { /* operator list unavailable for this page */ }

            // ── FALLBACK: render page to canvas, crop into cells ──
            // Used when primary extraction found 0 images (e.g. SVG logos, form XObjects)
            if (!primarySucceeded) {
              try {
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas   = document.createElement('canvas');
                canvas.width   = Math.round(viewport.width);
                canvas.height  = Math.round(viewport.height);
                await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;

                // Crop a strip from the top-right quarter where skill icons often sit
                // This is a heuristic — logos are commonly in header/sidebar areas
                const regions = [
                  { x: 0,                          y: 0,                            w: canvas.width,     h: Math.round(canvas.height * 0.25) }, // top strip
                  { x: Math.round(canvas.width * 0.6), y: 0,                        w: Math.round(canvas.width * 0.4), h: canvas.height },       // right sidebar
                ];
                for (const reg of regions) {
                  if (imageBlobs.length >= 20) break;
                  const crop = document.createElement('canvas');
                  crop.width  = reg.w; crop.height = reg.h;
                  crop.getContext('2d').drawImage(canvas, reg.x, reg.y, reg.w, reg.h, 0, 0, reg.w, reg.h);
                  const blob = await new Promise(r => crop.toBlob(r, 'image/png'));
                  if (blob) {
                    imageBlobs.push(blob);
                    imagesMeta.push({ w: reg.w, h: reg.h });
                  }
                }
              } catch (_) { /* page render failed — skip */ }
            }
          }

          // ── OCR ALL COLLECTED IMAGE BLOBS (non-blocking batched) ─
          let logoSkillsFromPDF = [];
          if (imageBlobs.length > 0) {
            try {
              // ── 1. FILTER OUT PROFILE IMAGE ──────────────────────
              // Profile photo is typically the first large image (>200×200)
              // We can't measure blob dimensions directly, so we track
              // width/height alongside blobs using a parallel metadata array.
              // imageBlobs was built above; imagesMeta was populated in parallel.
              const filteredBlobs = imageBlobs.filter((blob, index) => {
                const meta = imagesMeta[index];
                return !(index === 0 && meta && meta.w > 200 && meta.h > 200);
              });

              // ── 2. TIMEOUT WRAPPER ────────────────────────────────
              const withTimeout = (promise, ms) =>
                Promise.race([
                  promise,
                  new Promise((_, rej) => setTimeout(() => rej('Timeout'), ms)),
                ]);

              // ── 3. SINGLE IMAGE PROCESSOR WITH TIMEOUT ───────────
              const processImageWithTimeout = async (blob) => {
                try {
                  return await withTimeout(detectLogoSkills(blob), 3000);
                } catch (_) {
                  return []; // timeout or error → empty, never blocks
                }
              };

              // ── 4. BATCHED PROCESSING (CONCURRENT_LIMIT = 2) ─────
              const CONCURRENT_LIMIT = 2;
              const allSkills = new Set();

              for (let i = 0; i < filteredBlobs.length; i += CONCURRENT_LIMIT) {
                const batch        = filteredBlobs.slice(i, i + CONCURRENT_LIMIT);
                const batchResults = await Promise.all(batch.map(processImageWithTimeout));
                batchResults.flat().forEach(s => allSkills.add(s));

                // Yield to browser between batches to keep UI responsive
                if (i + CONCURRENT_LIMIT < filteredBlobs.length) {
                  await new Promise(res => setTimeout(res, 100));
                }
              }

              logoSkillsFromPDF = [...allSkills];
            } catch (_) { /* OCR pipeline failed — continue without */ }
          }

          console.log('Detected Logo Skills:', logoSkillsFromPDF);
          resolve({ text: text || '', logoSkillsFromPDF });
        } catch (err) {
          resolve({ text: '', logoSkillsFromPDF: [] });
        }
      };
      reader.onerror = () => resolve({ text: '', logoSkillsFromPDF: [] });
      reader.readAsArrayBuffer(file);
    });

  // Legacy alias kept for any future use
  const extractTextFromPDF = async (file) => (await extractFromPDF(file)).text;

  // ── LOGO DETECTION — STATE (internal only — no UI upload) ────
  const [logoSkills, setLogoSkills] = useState([]);

  // ── LOGO DETECTION — SKILL DATABASE ──────────────────────────
  // Comprehensive keyword → canonical skill name map.
  // Each entry covers full name, short forms, abbreviations, and common variations.
  // Keys used for BOTH text-based (word-boundary) and OCR (substring) matching.
  const LOGO_MAP = [
    // JavaScript ecosystem
    { keys: ['javascript','js','es6','es2015','ecmascript','vanilla js','vanillajs'], skill: 'JavaScript (ES6+)' },
    { keys: ['typescript','ts','tsc'],                                                skill: 'TypeScript' },
    { keys: ['react','reactjs','react.js','react js','react native'],                 skill: 'React.js' },
    { keys: ['redux','redux toolkit','rtk'],                                          skill: 'Redux/Context API' },
    { keys: ['next','nextjs','next.js','next js'],                                    skill: 'Next.js' },
    { keys: ['vue','vuejs','vue.js','vue js','vue 3'],                                skill: 'Vue' },
    { keys: ['angular','angularjs','angular.js','ng'],                                skill: 'Angular' },
    { keys: ['node','nodejs','node.js','node js','npm'],                              skill: 'Node.js' },
    { keys: ['express','expressjs','express.js','express js'],                        skill: 'Express.js' },
    { keys: ['webpack','vite','rollup','parcel','bundler'],                           skill: 'Webpack/Vite' },
    { keys: ['tailwind','tailwindcss','tailwind css'],                                skill: 'Tailwind CSS' },
    { keys: ['html','html5','htm'],                                                   skill: 'HTML5' },
    { keys: ['css','css3','sass','scss','less','stylesheets'],                        skill: 'CSS3/Sass' },
    // Python ecosystem
    { keys: ['python','py','python3','python 3'],                                     skill: 'Python' },
    { keys: ['django','drf','django rest'],                                           skill: 'Django/Flask/FastAPI' },
    { keys: ['flask','flask api'],                                                    skill: 'Django/Flask/FastAPI' },
    { keys: ['fastapi','fast api'],                                                   skill: 'Django/Flask/FastAPI' },
    { keys: ['pandas','dataframe','data frames'],                                     skill: 'Pandas' },
    { keys: ['numpy','np'],                                                           skill: 'NumPy' },
    { keys: ['tensorflow','tf','keras'],                                              skill: 'TensorFlow/PyTorch' },
    { keys: ['pytorch','torch'],                                                      skill: 'TensorFlow/PyTorch' },
    { keys: ['scikit','sklearn','scikit-learn','scikit learn'],                       skill: 'Machine Learning (Scikit-learn)' },
    // Java ecosystem
    { keys: ['java','jvm','openjdk','java 8','java 11','java 17'],                   skill: 'Java 17+' },
    { keys: ['spring','springboot','spring boot','spring mvc','spring framework'],    skill: 'Spring Boot' },
    { keys: ['maven','gradle'],                                                       skill: 'Maven/Gradle' },
    { keys: ['hibernate','jpa','orm'],                                                skill: 'Hibernate/JPA' },
    { keys: ['junit','mockito','test'],                                               skill: 'Unit Testing (Pytest)' },
    // Databases
    { keys: ['sql','mysql','t-sql','plsql','rdbms','relational db'],                 skill: 'SQL/NoSQL Databases' },
    { keys: ['mongo','mongodb','mongo db'],                                           skill: 'MongoDB' },
    { keys: ['postgres','postgresql','pg','psql'],                                    skill: 'PostgreSQL' },
    { keys: ['redis','redis cache','in-memory'],                                      skill: 'Redis' },
    { keys: ['graphql','graph ql','gql'],                                             skill: 'GraphQL' },
    { keys: ['nosql','dynamodb','cassandra','firebase','firestore'],                  skill: 'SQL/NoSQL Databases' },
    // DevOps / Cloud
    { keys: ['docker','container','containerize','compose','dockerfile'],             skill: 'Docker' },
    { keys: ['kubernetes','k8s','kube','kubectl','helm'],                             skill: 'Kubernetes' },
    { keys: ['aws','amazon web services','ec2','s3','lambda','cloudfront'],           skill: 'Cloud Platforms (AWS/GCP/Azure)' },
    { keys: ['azure','microsoft azure','azure devops'],                               skill: 'Cloud Platforms (AWS/GCP/Azure)' },
    { keys: ['gcp','google cloud','google cloud platform','bigquery'],                skill: 'Cloud Platforms (AWS/GCP/Azure)' },
    { keys: ['terraform','iac','infrastructure as code'],                             skill: 'Terraform/IaC' },
    { keys: ['ci/cd','cicd','jenkins','github actions','gitlab ci','circleci','pipeline'], skill: 'CI/CD Pipelines' },
    { keys: ['git','github','gitlab','bitbucket','version control','vcs'],            skill: 'Git/GitHub' },
    { keys: ['linux','ubuntu','debian','centos','bash','shell','unix'],               skill: 'Linux' },
    { keys: ['nginx','apache','web server'],                                          skill: 'Nginx' },
    // Mobile
    { keys: ['flutter','dart','flutter sdk'],                                         skill: 'Flutter/React Native' },
    { keys: ['react native','rn'],                                                    skill: 'Flutter/React Native' },
    { keys: ['swift','swiftui','ios','xcode','uikit'],                                skill: 'Swift' },
    { keys: ['kotlin','android','android jetpack','android studio'],                  skill: 'Kotlin/Java' },
    // Design — Adobe suite with abbreviations
    { keys: ['photoshop','adobe photoshop','ps','psd'],                               skill: 'Adobe Photoshop' },
    { keys: ['illustrator','adobe illustrator','ai','ai file'],                       skill: 'Adobe Illustrator' },
    { keys: ['lightroom','adobe lightroom','lr','lrcat'],                             skill: 'Adobe Lightroom' },
    { keys: ['indesign','adobe indesign','id','indd'],                                skill: 'InDesign' },
    { keys: ['after effects','aftereffects','adobe ae','aep'],                        skill: 'After Effects' },
    { keys: ['premiere','adobe premiere','prpro','pr'],                               skill: 'Adobe Premiere' },
    { keys: ['xd','adobe xd','adobe experience design'],                              skill: 'Figma/Adobe XD' },
    { keys: ['figma','fig'],                                                          skill: 'Figma/Adobe XD' },
    { keys: ['sketch','sketch app'],                                                  skill: 'Sketch' },
    { keys: ['invision','invisionapp','inv'],                                         skill: 'InVision' },
    { keys: ['blender','bpy'],                                                        skill: 'Blender' },
    { keys: ['cinema4d','cinema 4d','c4d','cineware'],                                skill: 'Cinema 4D/3D Motion' },
    // Photography
    { keys: ['capture one','captureone','c1'],                                        skill: 'Photo Editing' },
    { keys: ['dji','drone','uav','aerial photography'],                               skill: 'Drone Photography' },
    { keys: ['canon','nikon','sony','fujifilm','camera','dslr','mirrorless'],         skill: 'Camera Handling' },
    { keys: ['color grading','lut','grade'],                                          skill: 'Color Grading' },
    { keys: ['retouching','retouch','skin retouching'],                               skill: 'Retouching' },
    { keys: ['studio','lighting setup','strobe','softbox'],                           skill: 'Lighting Techniques' },
    // Analytics / BI
    { keys: ['tableau','twbx'],                                                       skill: 'Power BI/Tableau' },
    { keys: ['powerbi','power bi','pbix','dax'],                                      skill: 'Power BI/Tableau' },
    { keys: ['excel','xlsx','spreadsheet','vba','macro'],                             skill: 'Excel (VBA/Macros)' },
    { keys: ['google analytics','ga','ga4','gtm','google tag manager'],               skill: 'Google Analytics' },
    { keys: ['looker','data studio','google data studio'],                            skill: 'Power BI/Tableau' },
    // Collaboration / PM
    { keys: ['jira','jira software','atlassian'],                                     skill: 'Jira/Confluence' },
    { keys: ['confluence','wiki'],                                                    skill: 'Jira/Confluence' },
    { keys: ['notion','notion.so'],                                                   skill: 'Notion' },
    { keys: ['slack','slack channel'],                                                skill: 'Slack' },
    { keys: ['trello','kanban'],                                                      skill: 'Trello' },
    { keys: ['asana','asana tasks'],                                                  skill: 'Asana' },
    { keys: ['scrum','agile','sprint','standup','backlog'],                           skill: 'Agile/Scrum' },
    // Other languages / frameworks
    { keys: ['rust','rustlang','cargo'],                                              skill: 'Rust' },
    { keys: ['golang','go lang','go programming'],                                    skill: 'Go' },
    { keys: ['ruby','rails','ruby on rails','ror'],                                   skill: 'Ruby on Rails' },
    { keys: ['php','laravel','symfony','composer'],                                   skill: 'PHP/Laravel' },
    { keys: ['c++','cpp','stl','c plus plus'],                                        skill: 'C++' },
    { keys: ['csharp','c#','.net','dotnet','asp.net'],                                skill: 'C#/.NET' },
    { keys: ['matlab','simulink'],                                                    skill: 'MATLAB' },
    { keys: ['opencv','computer vision','image processing'],                          skill: 'Computer Vision' },
    { keys: ['solidity','smart contract','ethereum','web3','blockchain','nft'],       skill: 'Solidity' },
    { keys: ['kafka','rabbitmq','message queue','pub sub'],                           skill: 'Kafka' },
    { keys: ['graphql','apollo','resolver'],                                          skill: 'GraphQL' },
  ];

  // ── LOGO DETECTION — OCR LOADER ──────────────────────────────
  const loadTesseract = () => new Promise((res, rej) => {
    if (window.Tesseract) return res(window.Tesseract);
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/4.1.1/tesseract.min.js';
    s.onload  = () => res(window.Tesseract);
    s.onerror = rej;
    document.head.appendChild(s);
  });

  // ── LOGO DETECTION — PIPELINE ─────────────────────────────────
  const detectLogoSkills = async (imgFile) => {
    const detectedTokens = new Set();

    try {
      // Step 1: Resize image to max 1200px to keep OCR fast
      const resized = await new Promise((res) => {
        const img = new Image();
        const url = URL.createObjectURL(imgFile);
        img.onload = () => {
          const MAX = 1200;
          const scale = Math.min(1, MAX / Math.max(img.width, img.height));
          const canvas = document.createElement('canvas');
          canvas.width  = Math.round(img.width  * scale);
          canvas.height = Math.round(img.height * scale);
          canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
          URL.revokeObjectURL(url);
          canvas.toBlob(blob => res(blob), 'image/png');
        };
        img.src = url;
      });

      // Step 2: OCR — extract all visible text from the image
      const Tesseract = await loadTesseract();
      const { data: { words } } = await Tesseract.recognize(resized, 'eng', {
        logger: () => {},
        tessedit_pageseg_mode: '11', // sparse text mode — best for logo grids
      });

      // Step 3: Collect words with confidence ≥ 40%
      words
        .filter(w => w.confidence >= 40 && w.text.trim().length >= 2)
        .forEach(w => {
          const clean = w.text.toLowerCase().replace(/[^a-z0-9.#+\s]/g, '').trim();
          if (clean) clean.split(/\s+/).forEach(tok => detectedTokens.add(tok));
          detectedTokens.add(clean); // also add multi-word phrases
        });

    } catch (err) {
      console.warn('Logo OCR failed (non-fatal):', err.message);
    }

    // Step 4: Match collected tokens against LOGO_MAP using substring/fuzzy logic
    const foundSkills = new Set();
    const tokenList   = [...detectedTokens].filter(Boolean);

    LOGO_MAP.forEach(({ keys, skill }) => {
      const hit = keys.some(k =>
        tokenList.some(tok => tok.includes(k) || k.includes(tok))
      );
      if (hit) foundSkills.add(skill);
    });

    return [...foundSkills];
  };

  // ── TEXT-BASED LOGO KEYWORD SCANNER ─────────────────────────
  // Primary logo detection: scan resume text for skill keywords.
  // Strategy per key:
  //   • Multi-word keys  → simple includes() (already specific enough)
  //   • Short/ambiguous keys (≤3 chars or known abbreviations) → \b word-boundary regex
  //     so "js" matches "JS" but NOT "jobs", "ps" matches "PS" but NOT "capsule"
  //   • Long single-word keys → includes() (fast, low false-positive risk)
  const SHORT_KEYS = new Set([
    'js','ts','py','ng','rn','ps','ai','ae','pr','xd','lr','id','tf',
    'np','c1','pg','go','k8s','iac','drf','vcs','ror','cpp','dax','ga',
    'gql','npm','inv','fig','htm','aws','gcp','ec2','s3','bpy','c4d',
  ]);

  const detectLogoSkillsFromText = (text) => {
    const lower = text.toLowerCase();
    const found = new Set();

    LOGO_MAP.forEach(({ keys, skill }) => {
      const hit = keys.some(key => {
        const isMultiWord = key.includes(' ');
        const isShort     = key.length <= 3 || SHORT_KEYS.has(key);

        if (isMultiWord) {
          // Multi-word: substring check (already precise)
          return lower.includes(key);
        }
        if (isShort) {
          // Short/abbreviation: require word boundary to avoid false positives
          // e.g. "js" should not match "jobs", "ps" should not match "capsule"
          try {
            const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            return new RegExp(`\\b${escaped}\\b`, 'i').test(lower);
          } catch (_) {
            return lower.includes(key);
          }
        }
        // Long single-word key: standard substring match
        return lower.includes(key);
      });

      if (hit) found.add(skill);
    });

    return [...found];
  };

  // ── ANALYZE HANDLER ──────────────────────────────────────────
  const handleAnalyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    setProgress(10);
    setResults(null);

    const ext     = file.name.split('.').pop().toLowerCase();
    const jobRole = jobQuery || 'General Position';

    try {
      setProgress(20);
      let resumeText         = '';
      let logoSkillsFromImages = [];  // secondary: image OCR

      if (ext === 'pdf') {
        const { text, logoSkillsFromPDF } = await extractFromPDF(file);
        resumeText           = text;
        logoSkillsFromImages = logoSkillsFromPDF;
      } else {
        resumeText = await new Promise((res, rej) => {
          const r = new FileReader();
          r.onload = () => res(r.result);
          r.onerror = rej;
          r.readAsText(file);
        });
      }

      setProgress(60);

      if (!resumeText.trim()) {
        alert('Could not read text from your resume. Please try a different file.');
        setAnalyzing(false);
        return;
      }

      // ── PRIMARY: text-based logo keyword scan ─────────────────
      const logoSkillsFromText = detectLogoSkillsFromText(resumeText);

      console.log('Logo Skills (Text):', logoSkillsFromText);
      console.log('Logo Skills (Images):', logoSkillsFromImages);

      // ── MERGE: text skills + image skills (deduped) ───────────
      const allLogoSkills = [...new Set([...logoSkillsFromText, ...logoSkillsFromImages])];
      setLogoSkills(allLogoSkills);

      setProgress(70);

      // Augment resume text with merged skill names so the
      // existing normalizer + synonym matcher picks them up
      const augmentedText = allLogoSkills.length > 0
        ? resumeText + '\n' + allLogoSkills.join(' ')
        : resumeText;

      await new Promise(r => setTimeout(r, 300));

      const scored = scoreResume(augmentedText, jobRole);
      setProgress(100);
      await new Promise(r => setTimeout(r, 200));
      setResults({ ...scored, logoSkills: allLogoSkills });
      setShowResult(true);
    } catch (e) {
      console.error('ATSify error:', e);
      alert('Something went wrong. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="atsify-page">

      {!showResult ? (
        /* ══════════════════════════════════════════════════
            UPLOAD PAGE
        ══════════════════════════════════════════════════ */
        <div className="upload-view">
          <div className="atsify-card">

            {/* ─── LEFT ─── */}
            <div className="left-panel">
              <div className="brand">
                <div className="brand-icon"><BrandIcon /></div>
                <div>
                  <div className="brand-title">ATSify</div>
                  <div className="brand-tagline">Resume Intelligence Platform</div>
                </div>
              </div>

              {/* ─── JOB DESCRIPTION ─── */}
              <div className="job-desc-section" ref={jobRef} onBlur={handleJobBlur}>
                <div>
                  <div className="upload-label">Job Description</div>
                  <div className="upload-sublabel">Select the role you're applying for</div>
                </div>
                <div className="job-input-wrap">
                  <input
                    className="job-input"
                    type="text"
                    placeholder="e.g. Frontend Developer"
                    value={jobQuery}
                    onChange={e => { setJobQuery(e.target.value); setJobOpen(true); }}
                  />
                  <span
                    className={`job-arrow${jobOpen ? ' open' : ''}`}
                    onMouseDown={e => { e.preventDefault(); setJobOpen(o => !o); }}
                    style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                  {jobOpen && (
                    <div className="job-dropdown">
                      {filteredRoles.length > 0
                        ? filteredRoles.map(role => (
                            <div key={role} className="job-option" onMouseDown={() => handleJobSelect(role)}>{role}</div>
                          ))
                        : <div className="job-no-result">No matching roles found</div>
                      }
                    </div>
                  )}
                </div>
              </div>

              <div className="upload-section">
                <div>
                  <div className="upload-label">Upload Your Resume</div>
                  <div className="upload-sublabel">Get instant ATS compatibility feedback</div>
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.docx"
                  onChange={e => acceptFile(e.target.files[0])}
                />

                <div
                  className={`dropzone${dragging ? ' dragging' : ''}`}
                  onClick={() => fileRef.current.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && fileRef.current.click()}
                >
                  <div className="dropzone-icon"><UploadIcon /></div>
                  <div className="dropzone-text">
                    <div className="dropzone-main">
                      Drag & drop or <span>browse file</span>
                    </div>
                    <div className="dropzone-sub">Supports PDF and DOCX formats</div>
                  </div>
                  <div className="file-badges">
                    <span className="badge">PDF</span>
                    <span className="badge">DOCX</span>
                  </div>
                </div>

                {file && (
                  <div className="file-selected">
                    <FileIcon />
                    <span className="file-name">{file.name}</span>
                    <button className="file-remove" onClick={() => { setFile(null); setProgress(0); setAnalyzing(false); setResults(null); setShowResult(false); }}>✕</button>
                  </div>
                )}

                {analyzing && (
                  <div className="progress-wrap">
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="progress-label">Analyzing resume… {progress}%</span>
                  </div>
                )}

                <button
                  className="submit-btn"
                  onClick={handleAnalyze}
                  disabled={!file || analyzing}
                >
                  {analyzing ? `Analyzing… ${progress}%` : 'Analyze Resume →'}
                </button>
              </div>
            </div>

            {/* ─── RIGHT ─── */}
            <div className="right-panel">
              <div className="score-block">
                <ScoreRing score={0} />
                <div className="score-checkmarks">
                  {[1,2,3,4,5].map(i => <div key={i} className="dot" />)}
                </div>
              </div>
              <div className="quote-block">
                <div className="quote-text">"Optimize your resume for success"</div>
                <div className="quote-sub">Beat the bots. Land the interview. Let ATSify show you what recruiters' systems actually see.</div>
              </div>
              <div className="checks-block">
                <div className="checks-title">What we analyze</div>
                {CHECK_ITEMS.map((item) => (
                  <div className="check-item" key={item.label}>
                    <div className="check-icon"><CheckIcon /></div>
                    <span className="check-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ══════════════════════════════════════════════════
            RESULTS DASHBOARD
        ══════════════════════════════════════════════════ */
        <div className="results-view">

            {/* Header bar */}
            <div className="dash-header">
              <div className="dash-brand">
                <div className="brand-icon" style={{ width: 32, height: 32, borderRadius: 8 }}><BrandIcon /></div>
                <span className="brand-title" style={{ fontSize: '1.4rem' }}>ATSify</span>
                <span className="dash-role-badge">{jobQuery || 'General Position'}</span>
              </div>
              <button
                className="dash-back-btn"
                onClick={() => { setResults(null); setProgress(0); setShowResult(false); }}
              >
                ← Analyze Another
              </button>
            </div>

            {/* 2-column dashboard */}
            <div className="dash-body">

              {/* ── LEFT: Score Panel (35%) ── */}
              <div className="dash-left">
                {(() => {
                  // Score color helper — used for ring, bars, and percentage text
                  const getScoreColor = (score) =>
                    score >= 85 ? '#34d399' : score >= 70 ? '#fbbf24' : '#f87171';

                  return (
                    <>
                      {/* Big circular score */}
                      <div className="dash-score-card">
                        <ScoreRing score={results.overallScore} />
                        <div className="dash-overall-label">Overall ATS Score</div>
                        <div className="dash-motivation">"{results.motivation}"</div>
                        <div className="dash-candidate-badge">
                          {results.candidateType === 'Fresher' ? '🎓 Fresher' : '💼 Experienced'}
                          &nbsp;·&nbsp;{results.category || 'General'}
                        </div>
                      </div>

                      {/* Score breakdown bars */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', zIndex: 1 }}>
                        {[
                          { label: 'Skill Match',  pct: results.skillScore },
                          { label: 'Grammar',      pct: results.grammarScore },
                          { label: 'Repetition',   pct: results.repetitionScore },
                        ].map(({ label, pct }) => {
                          const color = getScoreColor(pct);
                          return (
                            <div key={label} className="dash-bar-row">
                              <div className="dash-bar-meta">
                                <span className="dash-bar-label">{label}</span>
                                <span className="dash-bar-pct" style={{ color }}>{pct}%</span>
                              </div>
                              <div className="dash-bar-track">
                                <div className="dash-bar-fill" style={{ width: `${pct}%`, background: color }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* ── RIGHT: Details Panel (65%) ── */}
              <div className="dash-right">

                {/* Core Skills to Improve */}
                {results.coreSkillsToImprove?.length > 0 && (
                  <div className="dash-detail-card">
                    <div className="dash-card-title">
                      <span className="dash-card-dot" style={{ background: '#f87171' }} />
                      Core Skills to Improve
                    </div>
                    <div className="dash-skill-chips">
                      {results.coreSkillsToImprove.map(s => (
                        <span key={s} className="dash-chip core">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended Skills */}
                {results.recommendedSkills?.length > 0 && (
                  <div className="dash-detail-card">
                    <div className="dash-card-title">
                      <span className="dash-card-dot" style={{ background: '#fbbf24' }} />
                      Recommended Skills
                    </div>
                    <div className="dash-skill-chips">
                      {results.recommendedSkills.slice(0, 8).map(s => (
                        <span key={s} className="dash-chip reco">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Grammar Feedback */}
                <div className="dash-detail-card">
                  <div className="dash-card-title">
                    <span className="dash-card-dot" style={{ background: '#60a5fa' }} />
                    Grammar Feedback
                  </div>
                  <div className="dash-feedback-text">
                    {results.grammarNote || (
                      results.grammarScore >= 95 ? 'Grammar looks excellent.' :
                      results.grammarScore >= 80 ? 'Grammar is good, but minor improvements can be made.' :
                      results.grammarScore >= 60 ? 'Some grammar issues detected. Consider improving sentence structure.' :
                      'Significant grammar issues found. Needs improvement.'
                    )}
                  </div>
                </div>

                {/* Repetition Feedback */}
                <div className="dash-detail-card">
                  <div className="dash-card-title">
                    <span className="dash-card-dot" style={{ background: '#a78bfa' }} />
                    Repetition Feedback
                  </div>
                  <div className="dash-feedback-text">
                    {results.repetitionScore >= 80
                      ? 'No significant repetition found.'
                      : results.repetitionScore >= 60
                        ? 'Some repeated words detected — vary your language for clarity.'
                        : 'Reduce repeated words significantly for better readability.'}
                  </div>
                </div>

                {/* Resume Structure Feedback */}
                <div className="dash-detail-card">
                  <div className="dash-card-title">
                    <span className="dash-card-dot" style={{ background: '#34d399' }} />
                    Resume Structure
                  </div>
                  <div className="dash-feedback-text">
                    {(() => {
                      const issues = [];
                      const txt = (results.matchedSkills || []).join(' ').toLowerCase();
                      // Detect common missing sections by checking result context + candidate type
                      if (!results.sectionScores?.experience && results.candidateType === 'Experienced')
                        issues.push('No work experience section detected.');
                      if ((results.coreSkillsToImprove?.length || 0) + (results.recommendedSkills?.length || 0) === (results.missingSkills?.length || 0) && results.missingSkills?.length > 5)
                        issues.push('Skills section appears thin — add more relevant skills.');
                      if (results.skillScore < 20)
                        issues.push('No recognizable skills section found.');
                      if (results.projectsScore === 0 && results.candidateType === 'Fresher')
                        issues.push('No projects section detected — add portfolio or personal projects.');
                      if (results.certScore === 0 && ['Finance','Healthcare'].includes(results.category))
                        issues.push('No certifications or licenses listed — required for this field.');
                      return issues.length === 0
                        ? 'Resume structure looks good.'
                        : issues.map((issue, i) => <div key={i} className="dash-structure-issue">· {issue}</div>);
                    })()}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}