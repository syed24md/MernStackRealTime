import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
  useRef,
} from "react";

import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../api";

/* ═══════════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --blue:      #0071ce;
  --blue-dk:   #005baa;
  --blue-lt:   #e8f4fd;
  --yellow:    #ffc220;
  --yellow-lt: #fff8e7;
  --red:       #dc2626;
  --green:     #16a34a;
  --green-lt:  #dcfce7;
  --ink:       #0d1117;
  --ink-2:     #374151;
  --muted:     #6b7280;
  --border:    #e5e7eb;
  --surface:   #ffffff;
  --bg:        #f5f7fb;
  --radius:    12px;
  --radius-lg: 20px;
  --shadow-sm: 0 1px 4px rgba(0,0,0,.06), 0 2px 10px rgba(0,0,0,.04);
  --shadow:    0 4px 20px rgba(0,0,0,.09), 0 1px 4px rgba(0,0,0,.05);
  --shadow-lg: 0 12px 40px rgba(0,0,0,.14);
  --t:         .22s cubic-bezier(.4,0,.2,1);
  --fd:        'Syne', sans-serif;
  --fb:        'DM Sans', sans-serif;
}

body { font-family: var(--fb); background: var(--bg); color: var(--ink); -webkit-font-smoothing: antialiased; }
img  { display: block; width: 100%; height: 100%; object-fit: cover; }
button { font-family: var(--fb); cursor: pointer; }
input, select, textarea { font-family: var(--fb); }

/* ── LAYOUT ── */
.app-shell { min-height: 100vh; display: flex; flex-direction: column; }

.page-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px 80px;
  width: 100%;
  flex: 1;
  animation: fadeIn .4s both;
}

/* ── HEADER ── */
.app-header {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
}

.logo-spark { width: 30px; height: 30px; }

.logo-text {
  font-family: var(--fd);
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--blue);
  letter-spacing: -.3px;
}
.logo-text span { color: var(--yellow); }

.nav-tabs { display: flex; gap: 6px; }

.nav-tab {
  padding: 7px 16px;
  border-radius: 8px;
  font-size: .82rem;
  font-weight: 600;
  background: transparent;
  border: 1.5px solid transparent;
  color: var(--muted);
  transition: all var(--t);
}
.nav-tab:hover  { color: var(--blue); background: var(--blue-lt); }
.nav-tab.active { color: var(--blue); background: var(--blue-lt); border-color: #b3d9f5; }

.cart-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 18px;
  background: var(--blue);
  color: #fff;
  border: none;
  border-radius: 9px;
  font-size: .83rem;
  font-weight: 600;
  transition: background var(--t), transform var(--t), box-shadow var(--t);
  box-shadow: 0 3px 10px rgba(0,113,206,.3);
}
.cart-btn:hover { background: var(--blue-dk); transform: translateY(-1px); box-shadow: 0 5px 16px rgba(0,113,206,.4); }

.cart-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 19px;
  height: 19px;
  background: var(--yellow);
  color: var(--ink);
  font-size: .65rem;
  font-weight: 800;
  border-radius: 100px;
  padding: 0 5px;
  line-height: 1;
}

/* ── PAGE TITLES ── */
.page-title {
  font-family: var(--fd);
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 800;
  letter-spacing: -.5px;
  color: var(--ink);
  margin-bottom: 6px;
}
.page-title span { color: var(--blue); }

.page-sub {
  font-size: .9rem;
  color: var(--muted);
  margin-bottom: 36px;
}

/* ── PROGRESS BAR ── */
.progress-bar {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 40px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 16px 24px;
  box-shadow: var(--shadow-sm);
}

.progress-step {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.progress-step:not(:last-child)::after {
  content: '';
  flex: 1;
  height: 2px;
  background: var(--border);
  border-radius: 2px;
  margin: 0 10px;
  transition: background var(--t);
}
.progress-step.done:not(:last-child)::after,
.progress-step.active:not(:last-child)::after { background: var(--blue); }

.step-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .8rem;
  font-weight: 700;
  background: var(--bg);
  border: 2px solid var(--border);
  color: var(--muted);
  flex-shrink: 0;
  transition: all var(--t);
}
.progress-step.active .step-dot {
  background: var(--blue);
  border-color: var(--blue);
  color: #fff;
  box-shadow: 0 0 0 4px rgba(0,113,206,.15);
}
.progress-step.done .step-dot {
  background: var(--green);
  border-color: var(--green);
  color: #fff;
}

.step-label {
  font-size: .78rem;
  font-weight: 600;
  color: var(--muted);
  white-space: nowrap;
  display: none;
}
.progress-step.active .step-label { color: var(--blue); display: block; }
.progress-step.done  .step-label { color: var(--green); display: block; }

/* ── CART PAGE ── */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
  align-items: start;
}

/* Cart Items */
.cart-items-panel {
  background: var(--surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.panel-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel-title {
  font-family: var(--fd);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--ink);
}

.clear-btn {
  font-size: .78rem;
  font-weight: 600;
  color: var(--red);
  background: none;
  border: none;
  transition: opacity var(--t);
}
.clear-btn:hover { opacity: .7; }

.cart-item {
  display: flex;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
  transition: background var(--t);
  animation: slideIn .3s both;
}
.cart-item:last-child { border-bottom: none; }
.cart-item:hover { background: #fafbfc; }

.cart-item__img {
  width: 90px;
  height: 90px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--bg);
  border: 1px solid var(--border);
}

.cart-item__body { flex: 1; display: flex; flex-direction: column; gap: 8px; }

.cart-item__name {
  font-size: .9rem;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.4;
}

.cart-item__meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

.cart-item__price {
  font-family: var(--fd);
  font-size: 1rem;
  font-weight: 800;
  color: var(--ink);
}

.cart-item__original {
  font-size: .78rem;
  color: var(--muted);
  text-decoration: line-through;
}

.cart-item__save {
  font-size: .7rem;
  font-weight: 700;
  color: var(--green);
  background: var(--green-lt);
  padding: 2px 7px;
  border-radius: 100px;
}

.cart-item__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
}

/* Quantity Stepper */
.qty-stepper {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--surface);
}

.qty-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  border: none;
  font-size: 1rem;
  font-weight: 700;
  color: var(--ink-2);
  transition: background var(--t), color var(--t);
  flex-shrink: 0;
}
.qty-btn:hover { background: var(--blue-lt); color: var(--blue); }
.qty-btn:disabled { opacity: .35; cursor: not-allowed; }

.qty-val {
  width: 36px;
  text-align: center;
  font-size: .88rem;
  font-weight: 700;
  color: var(--ink);
  border: none;
  border-left: 1.5px solid var(--border);
  border-right: 1.5px solid var(--border);
  background: var(--surface);
  padding: 6px 0;
}

.remove-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: .75rem;
  font-weight: 600;
  color: var(--muted);
  background: none;
  border: none;
  padding: 4px 8px;
  border-radius: 6px;
  transition: color var(--t), background var(--t);
}
.remove-btn:hover { color: var(--red); background: #fef2f2; }

/* ── PRICE SUMMARY PANEL ── */
.summary-panel {
  background: var(--surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  position: sticky;
  top: 84px;
}

.summary-body { padding: 24px; display: flex; flex-direction: column; gap: 14px; }

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: .88rem;
  color: var(--ink-2);
}

.summary-row.total {
  font-family: var(--fd);
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--ink);
  padding-top: 14px;
  border-top: 2px solid var(--border);
  margin-top: 4px;
}

.summary-row.total .summary-val { color: var(--blue); }

.summary-divider { height: 1px; background: var(--border); margin: 4px 0; }

.summary-label { color: var(--muted); }
.summary-val   { font-weight: 600; }
.summary-val.green { color: var(--green); }
.summary-val.red   { color: var(--red); }

.coupon-row {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.coupon-input {
  flex: 1;
  padding: 9px 13px;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  font-size: .82rem;
  color: var(--ink);
  outline: none;
  transition: border-color var(--t);
}
.coupon-input:focus { border-color: var(--blue); }

.coupon-btn {
  padding: 9px 16px;
  background: var(--blue-lt);
  color: var(--blue);
  border: 1.5px solid #b3d9f5;
  border-radius: 8px;
  font-size: .82rem;
  font-weight: 700;
  transition: all var(--t);
}
.coupon-btn:hover { background: var(--blue); color: #fff; border-color: var(--blue); }

.checkout-btn {
  width: 100%;
  padding: 15px;
  background: var(--blue);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  font-family: var(--fd);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: .01em;
  box-shadow: 0 4px 16px rgba(0,113,206,.35);
  transition: all var(--t);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
}
.checkout-btn:hover { background: var(--blue-dk); transform: translateY(-2px); box-shadow: 0 6px 22px rgba(0,113,206,.45); }
.checkout-btn:active { transform: translateY(0); }
.checkout-btn:disabled { opacity: .5; cursor: not-allowed; transform: none; }

.safe-badges {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 14px 24px;
  border-top: 1px solid var(--border);
  background: #fafbfc;
}
.safe-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: .72rem;
  color: var(--muted);
  font-weight: 500;
}

/* ── EMPTY CART ── */
.empty-cart {
  text-align: center;
  padding: 80px 24px;
  background: var(--surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
}
.empty-cart__icon { font-size: 4rem; margin-bottom: 20px; }
.empty-cart h3 { font-family: var(--fd); font-size: 1.4rem; font-weight: 800; color: var(--ink); margin-bottom: 8px; }
.empty-cart p  { font-size: .9rem; color: var(--muted); margin-bottom: 28px; }

/* ── DEMO PRODUCTS ── */
.demo-products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 36px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.demo-label {
  grid-column: 1/-1;
  font-family: var(--fd);
  font-size: .95rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.demo-label::after { content: ''; flex:1; height:1px; background: var(--border); }

.mini-card {
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--bg);
  transition: border-color var(--t), transform var(--t), box-shadow var(--t);
  cursor: pointer;
}
.mini-card:hover { border-color: var(--blue); transform: translateY(-3px); box-shadow: var(--shadow); }

.mini-card__img { height: 130px; overflow: hidden; }
.mini-card__img img { transition: transform .4s ease; }
.mini-card:hover .mini-card__img img { transform: scale(1.07); }

.mini-card__body { padding: 12px; }
.mini-card__name {
  font-size: .78rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}
.mini-card__price { font-family: var(--fd); font-size: .92rem; font-weight: 800; color: var(--ink); margin-bottom: 10px; }

.add-btn {
  width: 100%;
  padding: 8px;
  background: var(--blue);
  color: #fff;
  border: none;
  border-radius: 7px;
  font-size: .75rem;
  font-weight: 600;
  transition: background var(--t), transform var(--t);
}
.add-btn:hover { background: var(--blue-dk); transform: translateY(-1px); }
.add-btn.added { background: var(--green); }

/* ── CHECKOUT PAGE ── */
.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 24px;
  align-items: start;
}

.checkout-steps { display: flex; flex-direction: column; gap: 20px; }

/* Step Card */
.step-card {
  background: var(--surface);
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--border);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: border-color var(--t), box-shadow var(--t);
}
.step-card.active { border-color: #b3d9f5; box-shadow: 0 0 0 3px rgba(0,113,206,.08), var(--shadow-sm); }
.step-card.done   { border-color: #a7f3d0; }

.step-card__header {
  padding: 18px 22px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  background: #fafbfc;
  border-bottom: 1px solid var(--border);
  transition: background var(--t);
}
.step-card.active .step-card__header { background: var(--blue-lt); border-color: #b3d9f5; }
.step-card.done   .step-card__header { background: var(--green-lt); border-color: #a7f3d0; }

.step-card__num {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--fd);
  font-size: .85rem;
  font-weight: 800;
  background: var(--border);
  color: var(--muted);
  flex-shrink: 0;
  transition: all var(--t);
}
.step-card.active .step-card__num { background: var(--blue); color: #fff; }
.step-card.done   .step-card__num { background: var(--green); color: #fff; }

.step-card__title {
  font-family: var(--fd);
  font-size: 1rem;
  font-weight: 700;
  color: var(--ink);
  flex: 1;
}

.step-card__status {
  font-size: .75rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 100px;
}
.step-card.active .step-card__status { background: var(--blue-lt); color: var(--blue); }
.step-card.done   .step-card__status { background: var(--green-lt); color: var(--green); }
.step-card__status.pending { background: var(--bg); color: var(--muted); border: 1px solid var(--border); }

.step-card__body { padding: 24px 22px; display: flex; flex-direction: column; gap: 18px; animation: fadeIn .3s both; }

/* ── FORM ── */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.form-grid .span-2 { grid-column: 1/-1; }

.form-group { display: flex; flex-direction: column; gap: 6px; }

.form-label {
  font-size: .78rem;
  font-weight: 600;
  color: var(--ink-2);
  display: flex;
  align-items: center;
  gap: 4px;
}
.form-label .req { color: var(--red); font-size: .85rem; }

.form-input {
  padding: 11px 14px;
  border: 1.5px solid var(--border);
  border-radius: 9px;
  font-size: .88rem;
  color: var(--ink);
  background: var(--surface);
  outline: none;
  transition: border-color var(--t), box-shadow var(--t);
}
.form-input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(0,113,206,.1); }
.form-input.error { border-color: var(--red); background: #fff5f5; }
.form-input.error:focus { box-shadow: 0 0 0 3px rgba(220,38,38,.1); }

.form-error {
  font-size: .72rem;
  color: var(--red);
  display: flex;
  align-items: center;
  gap: 4px;
}

/* ── PAYMENT OPTIONS ── */
.payment-options { display: flex; flex-direction: column; gap: 12px; }

.payment-option {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border: 2px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all var(--t);
  background: var(--surface);
  position: relative;
  overflow: hidden;
}
.payment-option:hover { border-color: #b3d9f5; background: var(--blue-lt); }
.payment-option.selected { border-color: var(--blue); background: var(--blue-lt); }
.payment-option.selected::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 4px;
  background: var(--blue);
  border-radius: 0 2px 2px 0;
}

.payment-radio {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color var(--t);
}
.payment-option.selected .payment-radio { border-color: var(--blue); }

.payment-radio-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--blue);
  opacity: 0;
  transform: scale(0);
  transition: all .2s cubic-bezier(.34,1.56,.64,1);
}
.payment-option.selected .payment-radio-dot { opacity: 1; transform: scale(1); }

.payment-icon { font-size: 1.5rem; width: 36px; text-align: center; }

.payment-info { flex: 1; }
.payment-name { font-size: .9rem; font-weight: 600; color: var(--ink); margin-bottom: 2px; }
.payment-desc { font-size: .75rem; color: var(--muted); }

.payment-badge {
  font-size: .65rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 100px;
  background: var(--yellow-lt);
  color: #92400e;
  border: 1px solid #fde68a;
}

/* Card fields */
.card-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 4px;
  padding: 16px;
  background: var(--bg);
  border-radius: 10px;
  border: 1px solid var(--border);
  animation: fadeIn .3s both;
}
.card-fields .span-2 { grid-column: 1/-1; }

/* ── ORDER SUMMARY REVIEW ── */
.order-review-items { display: flex; flex-direction: column; gap: 12px; }

.review-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--bg);
  border-radius: 10px;
  border: 1px solid var(--border);
}

.review-item__img {
  width: 54px;
  height: 54px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: #e5e7eb;
}

.review-item__name { font-size: .84rem; font-weight: 600; color: var(--ink); flex: 1; line-height: 1.4; }
.review-item__meta { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
.review-item__price { font-family: var(--fd); font-size: .88rem; font-weight: 800; color: var(--ink); }
.review-item__qty   { font-size: .72rem; color: var(--muted); }

/* Shipping summary box */
.shipping-box {
  background: var(--bg);
  border-radius: 10px;
  border: 1px solid var(--border);
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.shipping-box__label { font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: var(--muted); margin-bottom: 4px; }
.shipping-box__name  { font-size: .88rem; font-weight: 600; color: var(--ink); }
.shipping-box__addr  { font-size: .82rem; color: var(--ink-2); line-height: 1.5; }

/* ── PLACE ORDER BUTTON ── */
.place-order-btn {
  width: 100%;
  padding: 17px;
  background: linear-gradient(135deg, var(--blue) 0%, #0057a8 100%);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  font-family: var(--fd);
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: .02em;
  box-shadow: 0 6px 24px rgba(0,113,206,.4);
  transition: all var(--t);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
}
.place-order-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,.08) 0%, transparent 60%);
}
.place-order-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(0,113,206,.5); }
.place-order-btn:active { transform: translateY(0); }
.place-order-btn:disabled { opacity: .55; cursor: not-allowed; transform: none; }

/* ── SUCCESS PAGE ── */
.success-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 60px 24px 80px;
  max-width: 560px;
  margin: 0 auto;
  animation: fadeIn .5s both;
}

.success-ring {
  position: relative;
  width: 110px;
  height: 110px;
  margin-bottom: 32px;
}

.success-ring svg {
  position: absolute;
  inset: 0;
  animation: ring-spin .8s .2s cubic-bezier(.4,0,.2,1) both;
}

@keyframes ring-spin {
  from { transform: rotate(-90deg) scale(.6); opacity: 0; }
  to   { transform: rotate(0deg) scale(1); opacity: 1; }
}

.success-check {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  animation: check-pop .4s .6s cubic-bezier(.34,1.56,.64,1) both;
}

@keyframes check-pop {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

.success-page h2 {
  font-family: var(--fd);
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -.5px;
  margin-bottom: 12px;
  animation: fadeUp .5s .8s both;
}

.success-page .order-num {
  display: inline-block;
  padding: 6px 18px;
  background: var(--blue-lt);
  color: var(--blue);
  font-size: .85rem;
  font-weight: 700;
  border-radius: 100px;
  margin-bottom: 20px;
  border: 1px solid #b3d9f5;
  animation: fadeUp .5s .9s both;
}

.success-page p {
  font-size: .92rem;
  color: var(--muted);
  line-height: 1.7;
  max-width: 380px;
  margin-bottom: 36px;
  animation: fadeUp .5s 1s both;
}

.success-details {
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 32px;
  text-align: left;
  animation: fadeUp .5s 1.1s both;
}

.success-detail-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid var(--border);
  font-size: .86rem;
}
.success-detail-row:last-child { border-bottom: none; }
.success-detail-label { color: var(--muted); }
.success-detail-val   { font-weight: 600; color: var(--ink); }

.success-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  animation: fadeUp .5s 1.2s both;
}

.btn-secondary {
  padding: 12px 24px;
  background: var(--surface);
  color: var(--blue);
  border: 1.5px solid #b3d9f5;
  border-radius: var(--radius);
  font-size: .88rem;
  font-weight: 600;
  transition: all var(--t);
}
.btn-secondary:hover { background: var(--blue-lt); }

.btn-primary-sm {
  padding: 12px 24px;
  background: var(--blue);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  font-size: .88rem;
  font-weight: 600;
  box-shadow: 0 3px 12px rgba(0,113,206,.3);
  transition: all var(--t);
}
.btn-primary-sm:hover { background: var(--blue-dk); transform: translateY(-1px); }

/* ── RIGHT SUMMARY (checkout) ── */
.checkout-summary {
  background: var(--surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  position: sticky;
  top: 84px;
}

.co-summary-header {
  padding: 18px 22px;
  border-bottom: 1px solid var(--border);
  background: #fafbfc;
}
.co-summary-title {
  font-family: var(--fd);
  font-size: .95rem;
  font-weight: 700;
  color: var(--ink);
}

.co-summary-items {
  padding: 16px 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-bottom: 1px solid var(--border);
  max-height: 220px;
  overflow-y: auto;
}
.co-summary-items::-webkit-scrollbar { width: 3px; }
.co-summary-items::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

.co-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
.co-item__img {
  width: 44px; height: 44px;
  border-radius: 7px;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--bg);
  border: 1px solid var(--border);
}
.co-item__name { font-size: .78rem; font-weight: 600; color: var(--ink); flex: 1; line-height: 1.35; }
.co-item__price { font-family: var(--fd); font-size: .82rem; font-weight: 800; color: var(--ink); }
.co-item__qty {
  font-size: .68rem;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--muted);
  padding: 1px 6px;
  border-radius: 100px;
  font-weight: 600;
}

.co-pricing { padding: 16px 22px; display: flex; flex-direction: column; gap: 10px; }

.co-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: .84rem;
}
.co-row.total {
  font-family: var(--fd);
  font-size: 1.05rem;
  font-weight: 800;
  padding-top: 10px;
  border-top: 2px solid var(--border);
  margin-top: 4px;
}
.co-row.total .co-val { color: var(--blue); }
.co-lbl { color: var(--muted); }
.co-val { font-weight: 600; color: var(--ink); }
.co-val.green { color: var(--green); }

/* ── ANIMATIONS ── */
@keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
@keyframes fadeUp  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
@keyframes slideIn { from { opacity:0; transform:translateX(-16px); } to { opacity:1; transform:translateX(0); } }
@keyframes pulse   { 0%,100%{transform:scale(1);} 50%{transform:scale(1.04);} }

/* ── TOAST ── */
.toast {
  position: fixed;
  bottom: 28px;
  right: 28px;
  background: var(--ink);
  color: #fff;
  padding: 13px 20px;
  border-radius: 12px;
  font-size: .85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 9px;
  box-shadow: var(--shadow-lg);
  z-index: 9999;
  animation: fadeUp .3s both;
  border-left: 4px solid var(--blue);
  max-width: 320px;
}
.toast.green { border-left-color: var(--green); }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .cart-layout, .checkout-layout { grid-template-columns: 1fr; }
  .summary-panel, .checkout-summary { position: static; }
  .step-label { display: block; }
}

@media (max-width: 600px) {
  .page-wrap { padding: 24px 16px 60px; }
  .form-grid { grid-template-columns: 1fr; }
  .form-grid .span-2 { grid-column: 1; }
  .card-fields { grid-template-columns: 1fr; }
  .card-fields .span-2 { grid-column: 1; }
  .nav-tabs { display: none; }
  .header-inner { padding: 0 16px; }
  .progress-bar { padding: 12px 16px; gap: 4px; }
  .step-label { font-size: .68rem; }
  .demo-products { grid-template-columns: repeat(2, 1fr); padding: 16px; }
}
`;

/* ═══════════════════════════════════════════════════════════════
   CART CONTEXT
═══════════════════════════════════════════════════════════════ */
const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((i) => i.id === action.product.id);
      if (existing)
        return state.map((i) =>
          i.id === action.product.id
            ? { ...i, qty: Math.min(i.qty + 1, 10) }
            : i,
        );
      return [...state, { ...action.product, qty: 1 }];
    }
    case "REMOVE":
      return state.filter((i) => i.id !== action.id);
    case "UPDATE_QTY":
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: action.qty } : i))
        .filter((i) => i.qty > 0);
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [items, dispatch] = useReducer(cartReducer, [], () =>
    JSON.parse(localStorage.getItem("wm_cart") || "[]"),
  );

  const addToCart = (p) => dispatch({ type: "ADD", product: p });
  const removeFromCart = (id) => dispatch({ type: "REMOVE", id });
  const updateQuantity = (id, qty) => dispatch({ type: "UPDATE_QTY", id, qty });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 499 ? 0 : 49;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  useEffect(() => {
    localStorage.setItem("wm_cart", JSON.stringify(items));
    localStorage.setItem("cartCount", String(totalItems));
    window.dispatchEvent(
      new CustomEvent("cart-count-updated", { detail: totalItems }),
    );
  }, [items, totalItems]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shipping,
        tax,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

/* ═══════════════════════════════════════════════════════════════
   DEMO PRODUCTS
═══════════════════════════════════════════════════════════════ */
const DEMO_PRODUCTS = [
  {
    id: 2,
    name: "Apple MacBook Air M3",
    price: 114900,
    originalPrice: 119900,
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&q=80",
  },
  {
    id: 4,
    name: "Instant Pot Duo 7-in-1",
    price: 6499,
    originalPrice: 8999,
    img: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=200&q=80",
  },
  {
    id: 5,
    name: 'Samsung 55" QLED 4K TV',
    price: 54999,
    originalPrice: 74999,
    img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=200&q=80",
  },
  {
    id: 6,
    name: "Kindle Paperwhite",
    price: 13999,
    originalPrice: 16999,
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&q=80",
  },
  {
    id: 7,
    name: "Nespresso Vertuo Pop",
    price: 8999,
    originalPrice: 11999,
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&q=80",
  },
  {
    id: 8,
    name: "Garmin Forerunner 265",
    price: 36999,
    originalPrice: 42999,
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
  },
];

/* ═══════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════ */
const fmt = (n) => "₹" + n.toLocaleString("en-IN");

const Toast = ({ msg, type = "" }) => (
  <div className={`toast ${type}`}>
    <span>{type === "green" ? "✓" : "🛒"}</span>
    {msg}
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   CART PAGE
═══════════════════════════════════════════════════════════════ */
const CartPage = ({ onCheckout }) => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    shipping,
    tax,
    total,
    addToCart,
  } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [toast, setToast] = useState(null);
  const [addedIds, setAddedIds] = useState({});

  const showToast = (msg, type = "") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleAdd = (p) => {
    addToCart(p);
    setAddedIds((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => setAddedIds((prev) => ({ ...prev, [p.id]: false })), 1500);
    showToast(`${p.name.slice(0, 30)}… added to cart!`);
  };

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === "WALMART10") {
      setCouponApplied(true);
      showToast("Coupon applied! ₹200 off", "green");
    } else {
      showToast("Invalid coupon code.");
    }
  };

  const discount = couponApplied ? 200 : 0;
  const finalTotal = total - discount;

  if (items.length === 0)
    return (
      <div className="page-wrap">
        {toast && <Toast msg={toast.msg} type={toast.type} />}
        <h1 className="page-title">
          Your <span>Cart</span>
        </h1>
        <p className="page-sub">
          Go to the Products page and add items to your cart.
        </p>
        <div className="empty-cart">
          <div className="empty-cart__icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>
            Looks like you haven't added anything yet. Pick some products below!
          </p>
        </div>
      </div>
    );

  return (
    <div className="page-wrap">
      {toast && <Toast msg={toast.msg} type={toast.type} />}
      <h1 className="page-title">
        Shopping <span>Cart</span>
      </h1>
      <p className="page-sub">
        {items.reduce((s, i) => s + i.qty, 0)} items in your cart
      </p>

      <div className="cart-layout">
        {/* Left: Cart Items */}
        <div className="cart-items-panel">
          <div className="panel-header">
            <span className="panel-title">
              Cart Items ({items.reduce((s, i) => s + i.qty, 0)})
            </span>
            <button className="clear-btn" onClick={clearCart}>
              Clear All
            </button>
          </div>

          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item__img">
                {item.image || item.img ? (
                  <img
                    src={item.image || item.img}
                    alt={item.name}
                    loading="lazy"
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2.2rem",
                      background: "var(--bg)",
                    }}
                  >
                    {item.emoji || "📦"}
                  </div>
                )}
              </div>
              <div className="cart-item__body">
                <p className="cart-item__name">{item.name}</p>
                <div className="cart-item__meta">
                  <span className="cart-item__price">{fmt(item.price)}</span>
                  {item.originalPrice && (
                    <>
                      <span className="cart-item__original">
                        {fmt(item.originalPrice)}
                      </span>
                      <span className="cart-item__save">
                        {Math.round(
                          (1 - item.price / item.originalPrice) * 100,
                        )}
                        % off
                      </span>
                    </>
                  )}
                </div>
                <div className="cart-item__actions">
                  <div className="qty-stepper">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.qty - 1)}
                      disabled={item.qty <= 1}
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <span className="qty-val">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.qty + 1)}
                      disabled={item.qty >= 10}
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    🗑 Remove
                  </button>
                  <span
                    style={{
                      fontSize: ".82rem",
                      color: "var(--muted)",
                      marginLeft: "auto",
                    }}
                  >
                    {fmt(item.price * item.qty)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Summary */}
        <div className="summary-panel">
          <div className="panel-header">
            <span className="panel-title">Price Summary</span>
          </div>

          <div className="summary-body">
            <div className="summary-row">
              <span className="summary-label">
                Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)
              </span>
              <span className="summary-val">{fmt(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Shipping</span>
              <span className={`summary-val ${shipping === 0 ? "green" : ""}`}>
                {shipping === 0 ? "FREE" : fmt(shipping)}
              </span>
            </div>
            {shipping === 0 && (
              <div
                style={{
                  fontSize: ".72rem",
                  color: "var(--green)",
                  background: "var(--green-lt)",
                  padding: "6px 10px",
                  borderRadius: "7px",
                  border: "1px solid #a7f3d0",
                }}
              >
                🎉 You qualify for free shipping!
              </div>
            )}
            <div className="summary-row">
              <span className="summary-label">GST (18%)</span>
              <span className="summary-val">{fmt(tax)}</span>
            </div>
            {couponApplied && (
              <div className="summary-row">
                <span className="summary-label">Coupon (WALMART10)</span>
                <span className="summary-val green">−{fmt(200)}</span>
              </div>
            )}
            <div className="summary-divider" />
            <div className="summary-row total">
              <span>Total Amount</span>
              <span className="summary-val">{fmt(finalTotal)}</span>
            </div>

            {/* Coupon */}
            {!couponApplied && (
              <div className="coupon-row">
                <input
                  className="coupon-input"
                  placeholder="Coupon code (try WALMART10)"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                />
                <button className="coupon-btn" onClick={handleApplyCoupon}>
                  Apply
                </button>
              </div>
            )}

            <button className="checkout-btn" onClick={onCheckout}>
              Proceed to Checkout →
            </button>

            <div
              style={{
                fontSize: ".75rem",
                color: "var(--muted)",
                textAlign: "center",
              }}
            >
              Free returns within 30 days
            </div>
          </div>

          <div className="safe-badges">
            <span className="safe-badge">🔒 Secure</span>
            <span className="safe-badge">✓ SSL</span>
            <span className="safe-badge">🛡 Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   CHECKOUT PAGE
═══════════════════════════════════════════════════════════════ */
const PAYMENT_METHODS = [
  {
    id: "card",
    icon: "💳",
    name: "Credit / Debit Card",
    desc: "Visa, Mastercard, Rupay",
    badge: "Most Popular",
  },
  { id: "upi", icon: "📱", name: "UPI", desc: "GPay, PhonePe, Paytm, BHIM" },
  {
    id: "cod",
    icon: "💵",
    name: "Cash on Delivery",
    desc: "Pay when you receive",
  },
];

const validate = (fields) => {
  const errs = {};
  if (!fields.name?.trim()) errs.name = "Full name is required";
  if (!fields.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
    errs.email = "Valid email required";
  if (!fields.phone?.match(/^[6-9]\d{9}$/))
    errs.phone = "Valid 10-digit mobile number";
  if (!fields.pincode?.match(/^\d{6}$/)) errs.pincode = "Valid 6-digit pincode";
  if (!fields.address?.trim()) errs.address = "Address is required";
  if (!fields.city?.trim()) errs.city = "City is required";
  if (!fields.state?.trim()) errs.state = "State is required";
  return errs;
};

const validateCard = (f) => {
  const e = {};
  if (!f.cardNum?.replace(/\s/g, "").match(/^\d{16}$/))
    e.cardNum = "16-digit card number required";
  if (!f.expiry?.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) e.expiry = "MM/YY format";
  if (!f.cvv?.match(/^\d{3,4}$/)) e.cvv = "3-4 digit CVV";
  if (!f.cardName?.trim()) e.cardName = "Name on card required";
  return e;
};

const CheckoutPage = ({ onBack, onSuccess }) => {
  const { items, subtotal, shipping, tax, total } = useCart();
  const [activeStep, setActiveStep] = useState(0); // 0=address, 1=payment, 2=review
  const [doneSteps, setDoneSteps] = useState([]);

  // Address form
  const [addr, setAddr] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });
  const [addrErrs, setAddrErrs] = useState({});

  // Payment
  const [payMethod, setPayMethod] = useState("card");
  const [cardFields, setCardFields] = useState({
    cardNum: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });
  const [cardErrs, setCardErrs] = useState({});
  const [upiId, setUpiId] = useState("");

  // Placing
  const [placing, setPlacing] = useState(false);

  const updateAddr = (k, v) => {
    setAddr((p) => ({ ...p, [k]: v }));
    if (addrErrs[k]) setAddrErrs((p) => ({ ...p, [k]: "" }));
  };
  const updateCard = (k, v) => {
    if (k === "cardNum")
      v = v
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();
    if (k === "expiry")
      v = v
        .replace(/\D/g, "")
        .slice(0, 4)
        .replace(/^(\d{2})(\d)/, "$1/$2");
    if (k === "cvv") v = v.replace(/\D/g, "").slice(0, 4);
    setCardFields((p) => ({ ...p, [k]: v }));
    if (cardErrs[k]) setCardErrs((p) => ({ ...p, [k]: "" }));
  };

  const handleAddrNext = () => {
    const e = validate(addr);
    if (Object.keys(e).length) {
      setAddrErrs(e);
      return;
    }
    setDoneSteps((p) => [...new Set([...p, 0])]);
    setActiveStep(1);
  };

  const handlePayNext = () => {
    if (payMethod === "card") {
      const e = validateCard(cardFields);
      if (Object.keys(e).length) {
        setCardErrs(e);
        return;
      }
    }
    setDoneSteps((p) => [...new Set([...p, 1])]);
    setActiveStep(2);
  };

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      onSuccess({ addr, payMethod, total, items });
    }, 2200);
  };

  const stepStatus = (i) => {
    if (doneSteps.includes(i)) return "done";
    if (activeStep === i) return "active";
    return "";
  };

  return (
    <div className="page-wrap">
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: ".82rem",
          fontWeight: 600,
          color: "var(--blue)",
          background: "none",
          border: "none",
          marginBottom: 20,
          transition: "opacity .2s",
        }}
      >
        ← Back to Cart
      </button>

      <h1 className="page-title">
        Secure <span>Checkout</span>
      </h1>
      <p className="page-sub">Complete your order in just a few steps</p>

      {/* Progress */}
      <div className="progress-bar">
        {["Shipping Address", "Payment", "Review Order"].map((l, i) => (
          <div key={l} className={`progress-step ${stepStatus(i)}`}>
            <div className="step-dot">
              {doneSteps.includes(i) ? "✓" : i + 1}
            </div>
            <span className="step-label">{l}</span>
          </div>
        ))}
      </div>

      <div className="checkout-layout">
        {/* Left: Steps */}
        <div className="checkout-steps">
          {/* Step 1: Address */}
          <div className={`step-card ${stepStatus(0)}`}>
            <div
              className="step-card__header"
              onClick={() => doneSteps.includes(0) && setActiveStep(0)}
            >
              <div className="step-card__num">
                {doneSteps.includes(0) ? "✓" : "1"}
              </div>
              <span className="step-card__title">Shipping Address</span>
              <span
                className={`step-card__status${!doneSteps.includes(0) && activeStep !== 0 ? " pending" : ""}`}
              >
                {doneSteps.includes(0)
                  ? "Complete"
                  : activeStep === 0
                    ? "In Progress"
                    : "Pending"}
              </span>
            </div>

            {activeStep === 0 && (
              <div className="step-card__body">
                <div className="form-grid">
                  {[
                    {
                      key: "name",
                      label: "Full Name",
                      type: "text",
                      placeholder: "John Doe",
                      col: 1,
                    },
                    {
                      key: "email",
                      label: "Email Address",
                      type: "email",
                      placeholder: "john@example.com",
                      col: 1,
                    },
                    {
                      key: "phone",
                      label: "Mobile Number",
                      type: "tel",
                      placeholder: "10-digit number",
                      col: 1,
                    },
                    {
                      key: "pincode",
                      label: "PIN Code",
                      type: "text",
                      placeholder: "6-digit PIN",
                      col: 1,
                    },
                    {
                      key: "address",
                      label: "Full Address",
                      type: "text",
                      placeholder: "House no., Street, Area…",
                      col: 2,
                    },
                    {
                      key: "landmark",
                      label: "Landmark (optional)",
                      type: "text",
                      placeholder: "Near…",
                      col: 2,
                    },
                    {
                      key: "city",
                      label: "City",
                      type: "text",
                      placeholder: "Mumbai",
                      col: 1,
                    },
                    {
                      key: "state",
                      label: "State",
                      type: "text",
                      placeholder: "Maharashtra",
                      col: 1,
                    },
                  ].map(({ key, label, type, placeholder, col }) => (
                    <div
                      key={key}
                      className={`form-group${col === 2 ? " span-2" : ""}`}
                    >
                      <label className="form-label">
                        {label}
                        {[
                          "name",
                          "email",
                          "phone",
                          "address",
                          "city",
                          "state",
                          "pincode",
                        ].includes(key) && <span className="req">*</span>}
                      </label>
                      <input
                        type={type}
                        className={`form-input${addrErrs[key] ? " error" : ""}`}
                        placeholder={placeholder}
                        value={addr[key]}
                        onChange={(e) => updateAddr(key, e.target.value)}
                      />
                      {addrErrs[key] && (
                        <span className="form-error">⚠ {addrErrs[key]}</span>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  className="checkout-btn"
                  style={{ marginTop: 8 }}
                  onClick={handleAddrNext}
                >
                  Continue to Payment →
                </button>
              </div>
            )}

            {doneSteps.includes(0) && activeStep !== 0 && (
              <div
                style={{
                  padding: "14px 22px",
                  fontSize: ".84rem",
                  color: "var(--ink-2)",
                  background: "var(--bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  📍 {addr.address}, {addr.city}, {addr.state} – {addr.pincode}
                </span>
                <button
                  onClick={() => setActiveStep(0)}
                  style={{
                    fontSize: ".75rem",
                    color: "var(--blue)",
                    background: "none",
                    border: "none",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Step 2: Payment */}
          <div className={`step-card ${stepStatus(1)}`}>
            <div
              className="step-card__header"
              onClick={() => doneSteps.includes(0) && setActiveStep(1)}
            >
              <div className="step-card__num">
                {doneSteps.includes(1) ? "✓" : "2"}
              </div>
              <span className="step-card__title">Payment Method</span>
              <span
                className={`step-card__status${!doneSteps.includes(1) && activeStep !== 1 ? " pending" : ""}`}
              >
                {doneSteps.includes(1)
                  ? "Complete"
                  : activeStep === 1
                    ? "In Progress"
                    : "Pending"}
              </span>
            </div>

            {activeStep === 1 && (
              <div className="step-card__body">
                <div className="payment-options">
                  {PAYMENT_METHODS.map((m) => (
                    <div
                      key={m.id}
                      className={`payment-option${payMethod === m.id ? " selected" : ""}`}
                      onClick={() => setPayMethod(m.id)}
                    >
                      <div className="payment-radio">
                        <div className="payment-radio-dot" />
                      </div>
                      <span className="payment-icon">{m.icon}</span>
                      <div className="payment-info">
                        <p className="payment-name">{m.name}</p>
                        <p className="payment-desc">{m.desc}</p>
                      </div>
                      {m.badge && (
                        <span className="payment-badge">{m.badge}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Card fields */}
                {payMethod === "card" && (
                  <div className="card-fields">
                    <div className="form-group span-2">
                      <label className="form-label">
                        Card Number <span className="req">*</span>
                      </label>
                      <input
                        className={`form-input${cardErrs.cardNum ? " error" : ""}`}
                        placeholder="1234 5678 9012 3456"
                        value={cardFields.cardNum}
                        onChange={(e) => updateCard("cardNum", e.target.value)}
                      />
                      {cardErrs.cardNum && (
                        <span className="form-error">⚠ {cardErrs.cardNum}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        Expiry <span className="req">*</span>
                      </label>
                      <input
                        className={`form-input${cardErrs.expiry ? " error" : ""}`}
                        placeholder="MM/YY"
                        value={cardFields.expiry}
                        onChange={(e) => updateCard("expiry", e.target.value)}
                      />
                      {cardErrs.expiry && (
                        <span className="form-error">⚠ {cardErrs.expiry}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        CVV <span className="req">*</span>
                      </label>
                      <input
                        className={`form-input${cardErrs.cvv ? " error" : ""}`}
                        placeholder="•••"
                        type="password"
                        value={cardFields.cvv}
                        onChange={(e) => updateCard("cvv", e.target.value)}
                        maxLength={4}
                      />
                      {cardErrs.cvv && (
                        <span className="form-error">⚠ {cardErrs.cvv}</span>
                      )}
                    </div>
                    <div className="form-group span-2">
                      <label className="form-label">
                        Name on Card <span className="req">*</span>
                      </label>
                      <input
                        className={`form-input${cardErrs.cardName ? " error" : ""}`}
                        placeholder="As printed on card"
                        value={cardFields.cardName}
                        onChange={(e) => updateCard("cardName", e.target.value)}
                      />
                      {cardErrs.cardName && (
                        <span className="form-error">
                          ⚠ {cardErrs.cardName}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {payMethod === "upi" && (
                  <div style={{ animation: "fadeIn .3s both" }}>
                    <div className="form-group">
                      <label className="form-label">
                        UPI ID <span className="req">*</span>
                      </label>
                      <input
                        className="form-input"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {payMethod === "cod" && (
                  <div
                    style={{
                      padding: "12px 16px",
                      background: "var(--yellow-lt)",
                      border: "1px solid #fde68a",
                      borderRadius: 10,
                      fontSize: ".82rem",
                      color: "#92400e",
                      animation: "fadeIn .3s both",
                    }}
                  >
                    💵 Pay ₹{total.toLocaleString("en-IN")} in cash when your
                    order is delivered. No prepayment needed.
                  </div>
                )}

                <button
                  className="checkout-btn"
                  style={{ marginTop: 8 }}
                  onClick={handlePayNext}
                >
                  Review Order →
                </button>
              </div>
            )}

            {doneSteps.includes(1) && activeStep !== 1 && (
              <div
                style={{
                  padding: "14px 22px",
                  fontSize: ".84rem",
                  color: "var(--ink-2)",
                  background: "var(--bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  {PAYMENT_METHODS.find((m) => m.id === payMethod)?.icon}{" "}
                  {PAYMENT_METHODS.find((m) => m.id === payMethod)?.name}
                </span>
                <button
                  onClick={() => setActiveStep(1)}
                  style={{
                    fontSize: ".75rem",
                    color: "var(--blue)",
                    background: "none",
                    border: "none",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Step 3: Review */}
          <div className={`step-card ${stepStatus(2)}`}>
            <div className="step-card__header">
              <div className="step-card__num">
                {doneSteps.includes(2) ? "✓" : "3"}
              </div>
              <span className="step-card__title">Review & Confirm</span>
              <span
                className={`step-card__status${activeStep !== 2 ? " pending" : ""}`}
              >
                {activeStep === 2 ? "In Progress" : "Pending"}
              </span>
            </div>

            {activeStep === 2 && (
              <div className="step-card__body">
                <div className="order-review-items">
                  {items.map((item) => (
                    <div className="review-item" key={item.id}>
                      <div className="review-item__img">
                        {item.image || item.img ? (
                          <img
                            src={item.image || item.img}
                            alt={item.name}
                            loading="lazy"
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "1.8rem",
                              background: "var(--bg)",
                            }}
                          >
                            {item.emoji || "📦"}
                          </div>
                        )}
                      </div>
                      <span className="review-item__name">{item.name}</span>
                      <div className="review-item__meta">
                        <span className="review-item__price">
                          {fmt(item.price * item.qty)}
                        </span>
                        <span className="review-item__qty">
                          Qty: {item.qty}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="shipping-box">
                  <p className="shipping-box__label">Delivering to</p>
                  <p className="shipping-box__name">
                    {addr.name} · {addr.phone}
                  </p>
                  <p className="shipping-box__addr">
                    {addr.address}
                    {addr.landmark ? `, ${addr.landmark}` : ""}
                    <br />
                    {addr.city}, {addr.state} – {addr.pincode}
                  </p>
                </div>

                <div
                  style={{
                    background: "var(--bg)",
                    borderRadius: 10,
                    border: "1px solid var(--border)",
                    padding: "14px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {[
                    ["Subtotal", fmt(subtotal)],
                    ["Shipping", shipping === 0 ? "FREE" : fmt(shipping)],
                    ["GST (18%)", fmt(tax)],
                    ["Total", fmt(total)],
                  ].map(([l, v]) => (
                    <div
                      key={l}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: ".84rem",
                        fontWeight: l === "Total" ? 800 : 500,
                        borderTop:
                          l === "Total" ? "1.5px solid var(--border)" : "none",
                        paddingTop: l === "Total" ? 10 : 0,
                        color: l === "Total" ? "var(--blue)" : "var(--ink-2)",
                      }}
                    >
                      <span
                        style={{
                          color: l === "Total" ? "var(--ink)" : "var(--muted)",
                        }}
                      >
                        {l}
                      </span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>

                <button
                  className="place-order-btn"
                  onClick={handlePlaceOrder}
                  disabled={placing}
                >
                  {placing ? (
                    <>
                      <span
                        style={{
                          display: "inline-block",
                          animation: "pulse .7s infinite",
                        }}
                      >
                        ⚡
                      </span>
                      Processing your order…
                    </>
                  ) : (
                    <>🔒 Place Order · {fmt(total)}</>
                  )}
                </button>

                <p
                  style={{
                    fontSize: ".72rem",
                    color: "var(--muted)",
                    textAlign: "center",
                  }}
                >
                  By placing this order you agree to Walmart's Terms &
                  Conditions
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Checkout Summary */}
        <div className="checkout-summary">
          <div className="co-summary-header">
            <p className="co-summary-title">
              Order Summary ({items.reduce((s, i) => s + i.qty, 0)} items)
            </p>
          </div>

          <div className="co-summary-items">
            {items.map((item) => (
              <div className="co-item" key={item.id}>
                <div className="co-item__img">
                  {item.image || item.img ? (
                    <img
                      src={item.image || item.img}
                      alt={item.name}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.4rem",
                        background: "var(--bg)",
                      }}
                    >
                      {item.emoji || "📦"}
                    </div>
                  )}
                </div>
                <span className="co-item__name">{item.name}</span>
                <span className="co-item__qty">×{item.qty}</span>
                <span className="co-item__price">
                  {fmt(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>

          <div className="co-pricing">
            <div className="co-row">
              <span className="co-lbl">Subtotal</span>
              <span className="co-val">{fmt(subtotal)}</span>
            </div>
            <div className="co-row">
              <span className="co-lbl">Shipping</span>
              <span className={`co-val${shipping === 0 ? " green" : ""}`}>
                {shipping === 0 ? "FREE" : fmt(shipping)}
              </span>
            </div>
            <div className="co-row">
              <span className="co-lbl">GST (18%)</span>
              <span className="co-val">{fmt(tax)}</span>
            </div>
            <div className="co-row total">
              <span>Total</span>
              <span className="co-val">{fmt(total)}</span>
            </div>
          </div>

          <div
            className="safe-badges"
            style={{
              padding: "14px 22px",
              borderTop: "1px solid var(--border)",
              background: "#fafbfc",
            }}
          >
            <span className="safe-badge">🔒 Secure SSL</span>
            <span className="safe-badge">🛡 Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SUCCESS PAGE
═══════════════════════════════════════════════════════════════ */
const SuccessPage = ({ orderData, onContinue }) => {
  const orderId = useRef(`WMT${Date.now().toString().slice(-8)}`).current;

  return (
    <div className="page-wrap">
      <div className="success-page">
        <div className="success-ring">
          <svg
            viewBox="0 0 110 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="55" cy="55" r="50" stroke="#dcfce7" strokeWidth="8" />
            <circle
              cx="55"
              cy="55"
              r="50"
              stroke="#16a34a"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset="0"
              transform="rotate(-90 55 55)"
              style={{ transition: "stroke-dashoffset 1s ease" }}
            />
          </svg>
          <div className="success-check">✓</div>
        </div>

        <h2>Order Placed!</h2>
        <span className="order-num">Order #{orderId}</span>

        <p>
          Your order has been successfully placed and is being processed. You'll
          receive a confirmation email at{" "}
          <strong>{orderData.addr.email || "your email"}</strong> shortly.
        </p>

        <div className="success-details">
          <div className="success-detail-row">
            <span className="success-detail-label">Delivering to</span>
            <span className="success-detail-val">
              {orderData.addr.name || "You"}
            </span>
          </div>
          <div className="success-detail-row">
            <span className="success-detail-label">Address</span>
            <span
              className="success-detail-val"
              style={{ textAlign: "right", maxWidth: 220 }}
            >
              {orderData.addr.city}, {orderData.addr.state}
            </span>
          </div>
          <div className="success-detail-row">
            <span className="success-detail-label">Payment</span>
            <span className="success-detail-val">
              {PAYMENT_METHODS.find((m) => m.id === orderData.payMethod)?.name}
            </span>
          </div>
          <div className="success-detail-row">
            <span className="success-detail-label">Total Paid</span>
            <span
              className="success-detail-val"
              style={{
                color: "var(--blue)",
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
              }}
            >
              {fmt(orderData.total)}
            </span>
          </div>
          <div className="success-detail-row">
            <span className="success-detail-label">Est. Delivery</span>
            <span className="success-detail-val">3–5 Business Days</span>
          </div>
        </div>

        <div className="success-actions">
          <button className="btn-secondary" onClick={onContinue}>
            Continue Shopping
          </button>
          <button className="btn-primary-sm">Track Order</button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   LOGIN GUARD
═══════════════════════════════════════════════════════════════ */
const LoginGuard = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wm_user"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const sync = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("wm_user")));
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("wm-user-updated", sync);
    return () => window.removeEventListener("wm-user-updated", sync);
  }, []);

  if (user) return children;

  return (
    <div
      className="page-wrap"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
      }}
    >
      <div
        style={{
          background: "var(--surface)",
          border: "1.5px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          padding: "52px 44px",
          textAlign: "center",
          maxWidth: 420,
          width: "100%",
          animation: "fadeUp .4s both",
        }}
      >
        <div style={{ fontSize: "3.5rem", marginBottom: 20 }}>🛒</div>
        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "1.6rem",
            fontWeight: 800,
            color: "var(--ink)",
            letterSpacing: "-.4px",
            marginBottom: 10,
          }}
        >
          Sign in to view your cart
        </h2>
        <p
          style={{
            fontSize: ".9rem",
            color: "var(--muted)",
            lineHeight: 1.65,
            marginBottom: 32,
          }}
        >
          Your cart items are saved. Please login to view your cart and continue
          shopping.
        </p>
        <button
          onClick={() => navigate("/login")}
          style={{
            width: "100%",
            padding: "13px",
            background: "var(--blue)",
            color: "#fff",
            border: "none",
            borderRadius: "var(--radius)",
            fontFamily: "Syne, sans-serif",
            fontSize: "1rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0,113,206,.35)",
            transition: "background var(--t), transform var(--t)",
            marginBottom: 12,
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "var(--blue-dk)")
          }
          onMouseOut={(e) => (e.currentTarget.style.background = "var(--blue)")}
        >
          Login to Continue →
        </button>
        <button
          onClick={() => navigate("/signup")}
          style={{
            width: "100%",
            padding: "12px",
            background: "transparent",
            color: "var(--blue)",
            border: "1.5px solid #b3d9f5",
            borderRadius: "var(--radius)",
            fontFamily: "Syne, sans-serif",
            fontSize: ".9rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background var(--t)",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "var(--blue-lt)")
          }
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          New here? Create an account
        </button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════════ */
const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const routeView =
    searchParams.get("view") === "checkout" ? "checkout" : "cart";
  const [view, setView] = useState("cart"); // "cart" | "checkout" | "success"
  const [orderData, setOrderData] = useState(null);
  const { clearCart } = useCart();

  useEffect(() => {
    if (view !== "success" && view !== routeView) {
      setView(routeView);
    }
  }, [routeView, view]);

  const setViewWithRoute = (nextView) => {
    setView(nextView);
    setSearchParams({ view: nextView }, { replace: true });
  };

  // Place order to backend
  const handleSuccess = async (data) => {
    try {
      // Prepare order payload
      const orderPayload = {
        items: data.items.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.qty,
          image: item.image || item.img || "",
        })),
        total: data.total,
        address: data.addr,
        payment: data.payMethod,
      };
      await api("/api/orders", "POST", orderPayload);
    } catch (e) {
      // Optionally show error toast
      // setToast({ msg: "Order failed! Try again.", type: "" });
    }
    setOrderData(data);
    clearCart();
    setView("success");
  };

  return (
    <div className="app-shell">
      <style>{CSS}</style>
      <LoginGuard>
        {view === "cart" && (
          <CartPage onCheckout={() => setViewWithRoute("checkout")} />
        )}
        {view === "checkout" && (
          <CheckoutPage
            onBack={() => setViewWithRoute("cart")}
            onSuccess={handleSuccess}
          />
        )}
        {view === "success" && (
          <SuccessPage
            orderData={orderData}
            onContinue={() => {
              setViewWithRoute("cart");
            }}
          />
        )}
      </LoginGuard>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   EXPORT — wraps App in CartProvider
═══════════════════════════════════════════════════════════════ */
export default function CartCheckout() {
  return (
    <CartProvider>
      <App />
    </CartProvider>
  );
}
