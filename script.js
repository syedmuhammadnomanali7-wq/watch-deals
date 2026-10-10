// ============================================
// WATCH DEALS - MAIN SCRIPT
// Author: Syed Muhammad Noman Ali Shah
// ============================================

// Load products from localStorage
let products = JSON.parse(localStorage.getItem('watchProducts')) || defaultProducts;

// ---------- RENDER BRAND FILTERS ----------
function renderBrandFilters() {
  const brands = ['all', ...new Set(products.map(p => p.brand))];
  const container = document.querySelector('.brand-filters');
  if (!container) return;
  
  container.innerHTML = brands.map(brand => 
    `<button class="brand-btn ${brand === 'all' ? 'active' : ''}" data-brand="${brand}">
      ${brand === 'all' ? 'All Brands' : brand}
    </button>`
  ).join('');
  
  container.querySelectorAll('.brand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.brand-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterProducts(btn.dataset.brand);
    });
  });
}

// ---------- FILTER PRODUCTS ----------
function filterProducts(brand) {
  const filtered = brand === 'all' ? products : products.filter(p => p.brand === brand);
  renderProducts(filtered);
}

// ---------- RENDER PRODUCT GRID ----------
function renderProducts(list) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  
  if (list.length === 0) {
    grid.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: #777;">No products found.</p>';
    return;
  }
  
  grid.innerHTML = list.map(p => `
    <div class="product-card" data-id="${p.id}">
      <img src="${p.mainImage}" alt="${p.name} - ${p.brand} watch available on Amazon" loading="lazy">
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="brand-tag">${p.brand}</p>
        <div class="price">Rs ${p.discountedPrice.toLocaleString()} <span>Rs ${p.originalPrice.toLocaleString()}</span></div>
        <button class="buy-btn quick-view-btn">View Details</button>
      </div>
    </div>
  `).join('');
  
  // Add click listeners
  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => openQuickView(parseInt(card.dataset.id)));
  });
  
  // Add SEO Schema
  addProductSchema(list);
}

// ---------- OPEN QUICK VIEW MODAL ----------
function openQuickView(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  
  document.getElementById('modalMainImage').src = product.mainImage;
  document.getElementById('modalMainImage').alt = product.name;
  document.getElementById('modalTitle').textContent = product.name;
  document.getElementById('modalBrand').textContent = product.brand;
  document.getElementById('modalDiscountedPrice').textContent = `Rs ${product.discountedPrice.toLocaleString()}`;
  document.getElementById('modalOriginalPrice').textContent = `Rs ${product.originalPrice.toLocaleString()}`;
  document.getElementById('modalDescription').textContent = product.description;
  document.getElementById('modalBuyBtn').href = product.affiliateLink;
  
  // Thumbnails
  const thumbs = document.getElementById('modalThumbnails');
  if (product.images && product.images.length > 0) {
    thumbs.innerHTML = product.images.map(img => 
      `<img src="${img}" alt="${product.name} thumbnail" onclick="document.getElementById('modalMainImage').src='${img}'">`
    ).join('');
  } else {
    thumbs.innerHTML = '';
  }
  
  // Video
  const videoContainer = document.getElementById('modalVideoContainer');
  if (product.video) {
    videoContainer.innerHTML = `<iframe width="100%" height="200" src="${product.video}" frameborder="0" allowfullscreen title="${product.name} video"></iframe>`;
  } else {
    videoContainer.innerHTML = '';
  }
  
  document.getElementById('quickViewModal').classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Track click on Buy Now
  document.getElementById('modalBuyBtn').onclick = () => trackClick(product);
}

// ---------- CLOSE MODAL ----------
function closeModal() {
  document.getElementById('quickViewModal').classList.remove('active');
  document.body.style.overflow = '';
}

// ---------- TRACK CLICKS ----------
function trackClick(product) {
  let clicks = JSON.parse(localStorage.getItem('watchClicks')) || [];
  clicks.push({
    productId: product.id,
    productName: product.name,
    brand: product.brand,
    date: new Date().toISOString().split('T')[0],
    timestamp: Date.now()
  });
  localStorage.setItem('watchClicks', JSON.stringify(clicks));
}

// ---------- ADD PRODUCT SCHEMA (SEO) ----------
function addProductSchema(list) {
  // Remove old schema
  document.querySelectorAll('script[data-product-schema]').forEach(s => s.remove());
  
  list.forEach(p => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": p.name,
      "brand": { "@type": "Brand", "name": p.brand },
      "image": p.mainImage,
      "description": p.description,
      "offers": {
        "@type": "Offer",
        "price": p.discountedPrice,
        "priceCurrency": "PKR",
        "availability": "https://schema.org/InStock",
        "url": p.affiliateLink
      }
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-product-schema', 'true');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

// ---------- INITIALIZE ----------
document.addEventListener('DOMContentLoaded', () => {
  renderBrandFilters();
  renderProducts(products);
  
  // Modal close events
  const closeBtn = document.getElementById('closeModal');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  
  const modal = document.getElementById('quickViewModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});