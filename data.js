// ============================================
// WATCH DEALS - PRODUCT DATA
// Author: Syed Muhammad Noman Ali Shah
// ============================================

const defaultProducts = [
  {
    id: 1,
    name: "Classic Leather Watch",
    brand: "Fossil",
    originalPrice: 8999,
    discountedPrice: 4999,
    description: "Premium leather strap with stainless steel case. Water resistant up to 50m. Perfect for formal and casual wear. Verified on Amazon with customer protection.",
    mainImage: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=400&fit=crop"
    ],
    video: "",
    affiliateLink: "https://amzn.to/3TVOvP0"
  },
  {
    id: 2,
    name: "Luxury Gold Watch",
    brand: "Rolex",
    originalPrice: 19999,
    discountedPrice: 12999,
    description: "Elegant gold-plated design with premium craftsmanship. Automatic movement, sapphire crystal glass. A statement piece for any occasion. Shop safely on Amazon.",
    mainImage: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=400&fit=crop"
    ],
    video: "",
    affiliateLink: "https://amzn.to/47LIvvw"
  },
  {
    id: 3,
    name: "Smart Watch Pro",
    brand: "Apple",
    originalPrice: 11999,
    discountedPrice: 6499,
    description: "AMOLED display, heart rate monitor, GPS tracking, 7-day battery life. Water resistant. Compatible with iOS and Android. Available on Amazon with fast delivery.",
    mainImage: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&h=400&fit=crop"
    ],
    video: "",
    affiliateLink: "https://amzn.to/4ySjdYH"
  },
  {
    id: 4,
    name: "Chronograph Sport Watch",
    brand: "Seiko",
    originalPrice: 15999,
    discountedPrice: 8999,
    description: "Chronograph function with tachymeter bezel. Stainless steel construction, luminous hands. Japanese movement. Verified seller on Amazon.",
    mainImage: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&h=400&fit=crop"
    ],
    video: "",
    affiliateLink: "https://amzn.to/4hQEJG5"
  },
  {
    id: 5,
    name: "Minimalist Slim Watch",
    brand: "Daniel Wellington",
    originalPrice: 7499,
    discountedPrice: 3999,
    description: "Ultra-slim minimalist design with mesh strap. Perfect for everyday wear. Lightweight and comfortable. Available on Amazon with easy returns.",
    mainImage: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=600&h=400&fit=crop"
    ],
    video: "",
    affiliateLink: "https://amzn.to/3TVOvP0"
  },
  {
    id: 6,
    name: "OUPINKE Mens Automatic Skeleton Tourbillon Watch",
    brand: "OUPINKE",
    originalPrice: 16999,
    discountedPrice: 9999,
    description: "Self-winding automatic movement with skeleton tourbillon design. Luxury sapphire crystal, business dress watch. Premium craftsmanship, verified on Amazon.",
    mainImage: "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=600&h=400&fit=crop"
    ],
    video: "",
    affiliateLink: "https://amzn.to/4ieQO9i"
  }
];

// Save to localStorage on first load
if (!localStorage.getItem('watchProducts')) {
  localStorage.setItem('watchProducts', JSON.stringify(defaultProducts));
}