*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #f4f4f2;
  color: #1a1a1a;
  min-height: 100vh;
  padding: 2rem 1rem;
}

.container {
  max-width: 560px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.header h1 {
  font-size: 1.6rem;
  font-weight: 600;
  color: #111;
  margin-bottom: 0.3rem;
}

.header p {
  font-size: 0.9rem;
  color: #777;
}

.tabs {
  display: flex;
  gap: 6px;
  background: #e8e8e5;
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 1.25rem;
}

.tab {
  flex: 1;
  padding: 9px 12px;
  border: none;
  border-radius: 9px;
  background: transparent;
  font-size: 0.875rem;
  font-weight: 500;
  color: #888;
  cursor: pointer;
  transition: all 0.15s;
}

.tab.active {
  background: #fff;
  color: #111;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.card {
  background: #fff;
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

.alert.success {
  background: #edfaf3;
  color: #1a7a47;
  border: 1px solid #a8e6c0;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 0.875rem;
  margin-bottom: 1.25rem;
  font-weight: 500;
}

.field {
  margin-bottom: 1rem;
}

.field label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 5px;
}

.field input {
  width: 100%;
  padding: 10px 13px;
  border: 1.5px solid #e0e0db;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #111;
  background: #fafaf8;
  transition: border-color 0.15s, box-shadow 0.15s;
  outline: none;
}

.field input:focus {
  border-color: #4a7cf7;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(74, 124, 247, 0.1);
}

.field input.error {
  border-color: #e05252;
}

.error-msg {
  display: block;
  font-size: 0.78rem;
  color: #c0392b;
  margin-top: 4px;
}

.divider {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 1.2rem 0;
  color: #aaa;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.divider::before, .divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #ebebea;
}

.btn-submit {
  width: 100%;
  padding: 11px;
  margin-top: 0.5rem;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}

.btn-submit:hover { background: #333; }
.btn-submit:active { transform: scale(0.99); }
.btn-submit:disabled { background: #999; cursor: not-allowed; }

.empty {
  text-align: center;
  color: #999;
  font-size: 0.9rem;
  padding: 2rem 0;
}

.empty-box {
  text-align: center;
  background: #fff;
  border-radius: 14px;
  padding: 2.5rem 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

.empty-box span { font-size: 2.5rem; display: block; margin-bottom: 0.5rem; }
.empty-box p { color: #999; font-size: 0.9rem; }

.teams-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.team-card {
  background: #fff;
  border-radius: 12px;
  padding: 1rem 1.2rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

.team-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.team-number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f0f0ee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: #555;
  flex-shrink: 0;
}

.team-name {
  font-weight: 600;
  font-size: 1rem;
  color: #111;
  flex: 1;
}

.team-date {
  font-size: 0.75rem;
  color: #bbb;
}

.team-members {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px 12px;
  border-top: 1px solid #f0f0ee;
  padding-top: 10px;
}

.member {
  font-size: 0.875rem;
  color: #444;
  display: flex;
  align-items: center;
  gap: 6px;
}

.member-dot {
  color: #ccc;
  font-size: 1rem;
  line-height: 1;
}

.footer-note {
  text-align: center;
  font-size: 0.75rem;
  color: #bbb;
  margin-top: 1.5rem;
}
