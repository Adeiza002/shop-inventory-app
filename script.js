// ===== DATA =====
// All items are stored in localStorage under this key
const STORAGE_KEY = "shopInventoryItems";

// Load items from localStorage, or start with an empty array
let items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// ===== DOM ELEMENTS =====
const itemsTableBody = document.getElementById("itemsTableBody");
const emptyState = document.getElementById("emptyState");
const totalItemsEl = document.getElementById("totalItems");
const totalValueEl = document.getElementById("totalValue");
const lowStockCountEl = document.getElementById("lowStockCount");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const addItemBtn = document.getElementById("addItemBtn");

const itemModal = document.getElementById("itemModal");
const modalTitle = document.getElementById("modalTitle");
const itemForm = document.getElementById("itemForm");
const itemIdInput = document.getElementById("itemId");
const itemNameInput = document.getElementById("itemName");
const itemCategoryInput = document.getElementById("itemCategory");
const itemQuantityInput = document.getElementById("itemQuantity");
const itemThresholdInput = document.getElementById("itemThreshold");
const itemPriceInput = document.getElementById("itemPrice");
const cancelBtn = document.getElementById("cancelBtn");

// ===== SAVE TO LOCALSTORAGE =====
function saveItems() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// ===== RENDER THE TABLE =====
function renderItems() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === "" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  itemsTableBody.innerHTML = "";

  if (filteredItems.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }

  filteredItems.forEach((item) => {
    const isLowStock = item.quantity <= item.threshold;
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.category || "—"}</td>
      <td>${item.quantity}</td>
      <td>${item.threshold}</td>
      <td>₦${Number(item.price).toLocaleString()}</td>
      <td>
        <span class="status-badge ${isLowStock ? "status-low" : "status-ok"}">
          ${isLowStock ? "Low Stock" : "OK"}
        </span>
      </td>
      <td>
        <button class="action-btn edit-btn" data-id="${item.id}">Edit</button>
        <button class="action-btn delete-btn" data-id="${item.id}">Delete</button>
      </td>
    `;

    itemsTableBody.appendChild(row);
  });

  updateSummary();
  updateCategoryDropdown();
}

// ===== UPDATE SUMMARY CARDS =====
function updateSummary() {
  const totalItems = items.length;
  const totalValue = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const lowStockCount = items.filter((item) => item.quantity <= item.threshold).length;

  totalItemsEl.textContent = totalItems;
  totalValueEl.textContent = `₦${totalValue.toLocaleString()}`;
  lowStockCountEl.textContent = lowStockCount;
}

// ===== UPDATE CATEGORY DROPDOWN =====
function updateCategoryDropdown() {
  const currentValue = categoryFilter.value;
  const categories = [...new Set(items.map((item) => item.category).filter(Boolean))];

  categoryFilter.innerHTML = `<option value="">All Categories</option>`;
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  categoryFilter.value = currentValue;
}

// ===== MODAL OPEN/CLOSE =====
function openModal(item = null) {
  if (item) {
    modalTitle.textContent = "Edit Item";
    itemIdInput.value = item.id;
    itemNameInput.value = item.name;
    itemCategoryInput.value = item.category;
    itemQuantityInput.value = item.quantity;
    itemThresholdInput.value = item.threshold;
    itemPriceInput.value = item.price;
  } else {
    modalTitle.textContent = "Add Item";
    itemForm.reset();
    itemIdInput.value = "";
  }
  itemModal.classList.remove("hidden");
}

function closeModal() {
  itemModal.classList.add("hidden");
  itemForm.reset();
}

// ===== FORM SUBMIT (ADD OR EDIT) =====
itemForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = itemIdInput.value;
  const itemData = {
    name: itemNameInput.value.trim(),
    category: itemCategoryInput.value.trim(),
    quantity: Number(itemQuantityInput.value),
    threshold: Number(itemThresholdInput.value),
    price: Number(itemPriceInput.value) || 0,
  };

  if (id) {
    const index = items.findIndex((item) => item.id === id);
    items[index] = { ...items[index], ...itemData };
  } else {
    itemData.id = Date.now().toString();
    items.push(itemData);
  }

  saveItems();
  renderItems();
  closeModal();
});

// ===== EDIT / DELETE BUTTON CLICKS (event delegation) =====
itemsTableBody.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (!id) return;

  if (e.target.classList.contains("edit-btn")) {
    const item = items.find((item) => item.id === id);
    openModal(item);
  }

  if (e.target.classList.contains("delete-btn")) {
    const confirmed = confirm("Delete this item?");
    if (confirmed) {
      items = items.filter((item) => item.id !== id);
      saveItems();
      renderItems();
    }
  }
});

// ===== OTHER EVENT LISTENERS =====
addItemBtn.addEventListener("click", () => openModal());
cancelBtn.addEventListener("click", closeModal);
searchInput.addEventListener("input", renderItems);
categoryFilter.addEventListener("change", renderItems);

// ===== INITIAL RENDER =====
renderItems();