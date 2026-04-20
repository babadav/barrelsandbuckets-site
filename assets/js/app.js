const navItems = [
  { slug: "inventory", href: "inventory.html", label: "Inventory" },
  { slug: "services", href: "services.html", label: "Services" },
  { slug: "sell-surplus-containers", href: "sell-surplus-containers.html", label: "Sell Surplus" },
  { slug: "about", href: "about.html", label: "About" },
  { slug: "contact", href: "contact.html", label: "Contact" }
];

function renderHeader() {
  const header = document.querySelector("[data-site-header]");
  if (!header) return;
  const page = document.body.dataset.page;
  header.className = "site-header";
  header.innerHTML = `
    <div class="header-inner">
      <a class="brand-mark" href="index.html" aria-label="Barrels and Buckets home">
        <strong>Barrels & Buckets</strong>
        <span>Industrial Packaging & Surplus</span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav-links">
        <span></span>
        <span></span>
        <span></span>
        <span class="sr-only">Toggle navigation</span>
      </button>
      <nav class="site-nav" id="site-nav-links" aria-label="Primary">
        <div class="site-nav-links">
          ${navItems
            .map(
              (item) =>
                `<a href="${item.href}" class="${item.slug === page ? "active" : ""}">${item.label}</a>`
            )
            .join("")}
        </div>
      </nav>
      <a class="header-cta" href="contact.html">Request Pricing</a>
    </div>
  `;
}

function renderFooter() {
  const footer = document.querySelector("[data-site-footer]");
  if (!footer) return;
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-top">
        <div>
          <p class="eyebrow">Barrels and Buckets</p>
          <h3>Inquiry-driven industrial packaging</h3>
          <p>
            Georgia-based company serving buyers and suppliers across nationwide
            relationships. Inventory changes quickly and is subject to prior sale.
          </p>
        </div>
        <div class="footer-links">
          <strong>Core Pages</strong>
          <a href="inventory.html">Inventory</a>
          <a href="services.html">Services</a>
          <a href="sell-surplus-containers.html">Sell Surplus Containers</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="footer-links">
          <strong>Specialties</strong>
          <span>5 Gallon Buckets</span>
          <span>Industrial Shrink Wrap</span>
          <span>Steel Drums</span>
          <span>IBC Totes</span>
        </div>
      </div>
      <p class="footer-note">
        Availability moves fast. Contact us for current stock, freight options, and pricing.
      </p>
    </div>
  `;
}

function createInventoryCard(item) {
  return `
    <article class="inventory-card">
      <div class="inventory-card-body">
        <div class="inventory-card-top">
          <span class="badge">${item.condition}</span>
          ${item.featured ? '<span class="badge">Featured</span>' : ""}
        </div>
        <span class="inventory-meta">${item.category_label} | ${item.region}</span>
        <h3>${item.title}</h3>
        <p>${item.short_description}</p>
        <div class="inventory-footer">
          <div>
            <span class="inventory-meta">${item.quantity_label}${item.moq ? ` | MOQ ${item.moq}` : ""}</span>
          </div>
          <a class="button button-secondary" href="contact.html?listing_id=${item.listing_id}">${item.cta_label}</a>
        </div>
      </div>
    </article>
  `;
}

function normalizedInventory() {
  return (window.BB_INVENTORY || []).filter((item) => item.publish_to_site && item.status === "available");
}

function renderInventoryPreview() {
  const node = document.querySelector("[data-inventory-preview]");
  if (!node) return;
  const limit = Number(node.dataset.limit || 4);
  node.innerHTML = normalizedInventory()
    .slice(0, limit)
    .map(createInventoryCard)
    .join("");
}

function applyInventoryFilters(items, grid) {
  const category = document.querySelector('[data-filter="category"]')?.value || "all";
  const condition = document.querySelector('[data-filter="condition"]')?.value || "all";
  const region = document.querySelector('[data-filter="region"]')?.value || "all";
  const fixedCategory = grid.dataset.category;

  return items.filter((item) => {
    if (fixedCategory && item.category !== fixedCategory) return false;
    if (category !== "all" && item.category !== category) return false;
    if (condition !== "all" && item.condition !== condition) return false;
    if (region !== "all" && item.region !== region) return false;
    return true;
  });
}

function renderInventoryGrid(grid) {
  const items = applyInventoryFilters(normalizedInventory(), grid);
  grid.innerHTML = items.length
    ? items.map(createInventoryCard).join("")
    : `<article class="inventory-card"><div class="inventory-card-body"><h3>No public listings match that filter</h3><p>Inventory changes frequently. Submit an inquiry for current sourcing options.</p><a class="button button-primary" href="contact.html">Submit Inquiry</a></div></article>`;
}

function initInventoryGrid() {
  const grids = document.querySelectorAll("[data-inventory-grid]");
  if (!grids.length) return;
  grids.forEach((grid) => renderInventoryGrid(grid));
  document.querySelectorAll("[data-filter]").forEach((control) => {
    control.addEventListener("change", () => grids.forEach((grid) => renderInventoryGrid(grid)));
  });
}

renderHeader();
renderFooter();
renderInventoryPreview();
initInventoryGrid();

const navToggle = document.querySelector(".nav-toggle");
const siteHeader = document.querySelector(".site-header");
if (navToggle && siteHeader) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    siteHeader.classList.toggle("nav-open", !expanded);
  });
}
