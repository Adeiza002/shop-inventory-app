# Shop Inventory App

A simple, lightweight inventory management app built for small shops to track items, monitor stock levels, and get low-stock alerts — built as a capstone project for the **3MTT NextGen Program** (Software Development track).

**Live Demo:** https://adeiza002.github.io/shop-inventory-app/

## Problem Context

Many small shops in Nigeria mismanage stock — running out of fast-selling items unexpectedly, or over-ordering slow-moving ones — because there's no simple way to track what's in stock at a glance. This app solves that with a clean, easy-to-use inventory dashboard.

## Features

- **Add, edit, and delete items** — track name, category, quantity, low-stock threshold, and unit price
- **Automatic low-stock alerts** — items are visually flagged in red once their quantity drops to or below their set threshold
- **Live inventory dashboard** — see total items, total inventory value (₦), and low-stock count at a glance
- **Search and filter** — quickly find items by name or filter by category
- **Data persistence** — all data is saved in the browser's `localStorage`, so it's not lost on refresh

## Built With

- HTML5
- CSS3 (custom styling, no framework)
- Vanilla JavaScript (no libraries or frameworks)
- Browser `localStorage` for data persistence

## How to Run Locally

1. Clone or download this repository
2. Open the folder in a code editor (e.g. VS Code)
3. Open `index.html` directly in a browser, or use the **Live Server** extension in VS Code for auto-reload
4. No build steps, no dependencies, no installation required

## Project Structure

```
shop-inventory-app/
├── index.html    → Page structure (dashboard, table, add/edit form)
├── style.css     → Styling
├── script.js     → App logic (CRUD, alerts, search/filter, calculations)
└── README.md     → Project documentation
```

## How It Works

- All item data is stored as a JavaScript array, saved to and loaded from `localStorage`
- Adding or editing an item opens a shared modal form
- Every time data changes, the app recalculates and re-renders: the table, the low-stock badges, and the summary totals
- A "Low Stock" badge appears automatically when an item's quantity is at or below its set threshold

## Note on Data

Since this app uses browser `localStorage`, inventory data is specific to the browser/device it was entered on. Opening the live demo link on a different device will show an empty inventory — this is expected behavior, not a bug.

## Author

Built by **Abubakar Suleiman** (Adeiza002) as part of the 3MTT NextGen Software Development capstone project.