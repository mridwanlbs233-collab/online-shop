// Nama halaman tujuan setelah pembayaran berhasil.
// Ganti jadi "sukses.html" kalau file kamu bernama sukses.html.
const HALAMAN_SUKSES = "transaksi.html";

//  DATA PRODUK 

const products = [
  // referensi foto sneakers https://www.meshy.ai/id/posts/019f9336-1a00-7495-9338-7052bcdeabd5
  {
    id: 1,
    name: "Sepatu converse",
    price: 350000,
    icon: "👟",
    desc: "sepatu converse nyaman digunakan dan tampilan jadi bagus untuk style anak muda. ",
    images: [
      { src: "sneakers1.png", desc: "Tampilan samping sepatu" },
      { src: "sneakers2.png", desc: "Tampilan atas sepatu" },
      { src: "sneakers3.png", desc: "Detail sol sepatu" },
    ],
  },
  // referensi foto sepatu https://www.meshy.ai/id/posts/beige-knit-running-shoe-019fcc7d-c2bc-757b-8eef-06d370ea688e
  {
    id: 2,
    name: "Sepatu Joging",
    price: 420000,
    icon: "👟",
    desc: "bahan bagus dan untuk sol sangat empuk sehingga untuk digunakan sebagai joging sangat enak.",
    images: [
      { src: "sport1.png", desc: "dilihat dari samping sepatu lari" },
      { src: "sport2.png", desc: "dilihat dari depan" },
      { src: "sport3.png", desc: "Detail bantalan sol" },
    ],
  },
  // referensi foto baju https://www.meshy.ai/3d-models/TShirt-019f9c72-5db2-7e5b-b75c-1eca762fb824
  {
    id: 3,
    name: "Kaos Polos Hitam",
    price: 85000,
    icon: "👕",
    desc: "Kaos katun polos dan kaos adem sangat digunakan ketika diluar rumah.",
    images: [
      { src: "baju1.png", desc: "Kaos dari depan" },
      { src: "baju2.png", desc: "Kaos dari belakang" },
      { src: "baju3.png", desc: "Detail bahan katun" },
    ],
  },
  // referensi foto topi https://www.meshy.ai/3d-models/Hat-019d6527-6f18-7dd3-917a-41fa6c678c5d
  {
    id: 4,
    name: "Topi keren",
    price: 60000,
    icon: "🧢",
    desc: "Topi kekinian dengan style dan warna yang bagus untuk dibawa kemana mana.",
    images: [
      { src: "topi1.png", desc: "Topi dari depan" },
      { src: "topi2.png", desc: "Topi dilihat dari samping" },
      { src: "topi3.png", desc: "Detail ukuran belakang" },
    ],
  },
  // referensi foto tas https://www.meshy.ai/3d-models/bag-019da205-0af8-778c-b1d0-738910ba728b
  {
    id: 5,
    name: "Tas sandang",
    price: 275000,
    icon: "🎒",
    desc: "tas sandang berwarna merah bagus untuk dibawa kemana mana.",
    images: [
      { src: "tas1.png", desc: "Ransel dari depan" },
      { src: "tas2.png", desc: "Bagian dalam ransel" },
      { src: "tas3.png", desc: "Detail tali dan punggung" },
    ],
  },
  // referensi foto jam https://www.meshy.ai/3d-models/Apple-Watch-019b5a02-552f-7631-8a49-5cd4e12852d8
  {
    id: 6,
    name: "Jam Tangan",
    price: 500000,
    icon: "⌚",
    desc: "Jam tangan digital dengan beberapa fitur sangat rekomended untuk digunakan.",
    images: [
      { src: "jam1.png", desc: "Jam tangan dari depan" },
      { src: "jam2.png", desc: "Diliat dari samping" },
      { src: "jam3.png", desc: "Detail tali kulit" },
    ],
  },
   // referensi foto Hoodie https://www.meshy.ai/3d-models/Blue-Hoodie-019831fe-0f0c-7811-bf2d-b67e83d97ef1
  {
    id: 7,
    name: "Hoodie",
    price: 200000,
    icon: "",
    desc: "Pakaian yang membantu untuk menghangatkan badan ketika sedang kedinginan dan cocok untuk dipakai berpergian.",
    images: [
      { src: "hoodie1.png", desc: "Hoodie tampak depan" },
      { src: "hoodie2.png", desc: "Hoodie samping" },
      { src: "hoodie3.png", desc: "diliat dari dekat" },
    ],
  },
   // referensi foto trofi https://www.meshy.ai/3d-models/World-Cup-019f9c64-45ef-7487-900b-6097eda691e3
  {
    id: 7,
    name: "Trofi Piala",
    price: 100000000,
    icon: "",
    desc: "trofi piala untuk ajang olahraga.",
    images: [
      { src: "trofi1.png", desc: "Trofi dilihat dari depan" },
      { src: "trofi2.png", desc: "Trofi dari samping" },
      { src: "trofi3.png", desc: "Detail trofi" },
    ],
  },
];

// ============================================================
//  STATE (disimpan di localStorage)
// ============================================================
function loadJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; }
  catch { return fallback; }
}
let cart = loadJSON("cart", []);
let orders = loadJSON("orders", []);

function save() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("orders", JSON.stringify(orders));
}

const rupiah = (n) => "Rp" + n.toLocaleString("id-ID");
const $ = (id) => document.getElementById(id);
const getProduct = (id) => products.find((p) => p.id === id);

// ============================================================
//  HELPER GAMBAR
// ============================================================
// Membuat tag <img>. Kalau file foto belum ada, otomatis tampil kotak
// placeholder yang menuliskan lokasi file yang dicari.
function imgTag(img, icon, cls) {
  return `<img class="${cls}" src="${img.src}" alt="${img.desc}" data-icon="${icon}" data-src="${img.src}" onerror="imgError(this)">`;
}
function imgError(el) {
  const ph = document.createElement("div");
  ph.className = el.className + " placeholder";
  ph.innerHTML = `<span>${el.dataset.icon}</span><small>Taruh gambar di:<br>${el.dataset.src}</small>`;
  el.replaceWith(ph);
}

// ============================================================
//  HEADER (dipakai semua halaman)
// ============================================================
function renderHeader() {
  $("site-header").innerHTML = `
    <h1><a href="index.html">🛍️ Tokoku.id</a></h1>
    <nav>
      <a href="index.html">Produk</a>
      <a href="keranjang.html">Keranjang (<span id="cart-count">0</span>)</a>
    </nav>`;
  updateCount();
}
function updateCount() {
  $("cart-count").textContent = cart.reduce((s, i) => s + i.qty, 0);
}

// ============================================================
//  HALAMAN: index.html (daftar produk)
// ============================================================
function renderProducts() {
  $("product-list").innerHTML = products.map((p) => `
    <div class="card">
      <a href="detail.html?id=${p.id}" class="card-link">
        ${imgTag(p.images[0], p.icon, "card-img")}
        <h3>${p.name}</h3>
        <p class="price">${rupiah(p.price)}</p>
      </a>
      <button class="btn" onclick="addToCart(${p.id})">+ Keranjang</button>
    </div>`).join("");
}

// ============================================================
//  HALAMAN: detail.html (detail satu produk + galeri foto)
// ============================================================
function showImage(pid, idx) {
  const p = getProduct(pid);
  const img = p.images[idx];
  $("main-image").innerHTML = imgTag(img, p.icon, "main-img");
  $("image-caption").textContent = img.desc;
  document.querySelectorAll(".thumbs .thumb-btn").forEach((b, i) =>
    b.classList.toggle("active", i === idx));
}
function renderDetail() {
  const id = Number(new URLSearchParams(location.search).get("id"));
  const p = getProduct(id);
  if (!p) {
    $("product-detail").innerHTML = "<p>Produk tidak ditemukan.</p>";
    return;
  }
  document.title = "MyShop - " + p.name;
  $("product-detail").innerHTML = `
    <div class="detail">
      <div class="gallery">
        <div id="main-image"></div>
        <p id="image-caption" class="caption"></p>
        <div class="thumbs">
          ${p.images.map((img, i) => `
            <button class="thumb-btn" onclick="showImage(${p.id}, ${i})">
              ${imgTag(img, p.icon, "thumb-img")}
            </button>`).join("")}
        </div>
      </div>
      <div class="info">
        <h2>${p.name}</h2>
        <p class="price">${rupiah(p.price)}</p>
        <p>${p.desc}</p>
        <button class="btn" onclick="addToCart(${p.id}); alert('Ditambahkan ke keranjang')">+ Keranjang</button>
        <button class="btn primary" onclick="addToCart(${p.id}); location.href='keranjang.html'">Beli Sekarang</button>
      </div>
    </div>`;
  showImage(p.id, 0);
}

// ============================================================
//  LOGIKA KERANJANG
// ============================================================
function addToCart(id) {
  const item = cart.find((i) => i.id === id);
  if (item) item.qty++;
  else cart.push({ id, qty: 1 });
  save();
  updateCount();
}
function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((i) => i.id !== id);
  save();
  renderCart();
}
function removeItem(id) {
  cart = cart.filter((i) => i.id !== id);
  save();
  renderCart();
}
function getTotal() {
  return cart.reduce((sum, i) => sum + getProduct(i.id).price * i.qty, 0);
}

// ============================================================
//  HALAMAN: keranjang.html
// ============================================================
function renderCart() {
  if (cart.length === 0) {
    $("cart-items").innerHTML = "<p>Keranjang masih kosong.</p>";
  } else {
    $("cart-items").innerHTML = cart.map((i) => {
      const p = getProduct(i.id);
      return `
      <div class="cart-row">
        <a href="detail.html?id=${p.id}" class="cart-name">${imgTag(p.images[0], p.icon, "cart-img")} ${p.name}</a>
        <span>${rupiah(p.price)}</span>
        <span class="qty">
          <button onclick="changeQty(${i.id}, -1)">−</button>
          ${i.qty}
          <button onclick="changeQty(${i.id}, 1)">+</button>
        </span>
        <span>${rupiah(p.price * i.qty)}</span>
        <button class="del" onclick="removeItem(${i.id})">🗑️</button>
      </div>`;
    }).join("");
  }
  $("cart-total").textContent = rupiah(getTotal());
  updateCount();
}
function initCartPage() {
  renderCart();
  $("btn-checkout").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Keranjang masih kosong, tambahkan barang dulu.");
      return;
    }
    location.href = "checkout.html";
  });
}

// ============================================================
//  HALAMAN: checkout.html
// ============================================================
function setError(field, msg) {
  $("err-" + field).textContent = msg;
  return msg === "";
}
function validateForm() {
  const nama = $("nama").value.trim();
  const hp = $("hp").value.trim();
  const alamat = $("alamat").value.trim();
  const metode = $("metode").value;
  const results = [
    setError("nama", nama.length < 3 ? "Nama minimal 3 karakter" : ""),
    setError("hp", /^08\d{8,11}$/.test(hp) ? "" : "Nomor HP harus diawali 08 dan 10–13 digit"),
    setError("alamat", alamat.length < 10 ? "Alamat minimal 10 karakter" : ""),
    setError("metode", metode === "" ? "Pilih metode pembayaran" : ""),
  ];
  return results.every(Boolean);
}
function initCheckoutPage() {
  if (cart.length === 0) {
    alert("Keranjang kosong, tidak bisa checkout.");
    location.href = "keranjang.html";
    return;
  }
  $("checkout-summary").innerHTML =
    cart.map((i) => {
      const p = getProduct(i.id);
      return `<p>${p.name} x${i.qty} — ${rupiah(p.price * i.qty)}</p>`;
    }).join("") + `<p class="total">Total: <strong>${rupiah(getTotal())}</strong></p>`;

  $("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const order = {
      id: "ORD-" + Date.now(),
      items: cart,
      total: getTotal(),
      metode: $("metode").value,
      nama: $("nama").value.trim(),
      hp: $("hp").value.trim(),
      alamat: $("alamat").value.trim(),
      status: "Berhasil",
      waktu: new Date().toISOString(),
    };
    orders.push(order);
    localStorage.setItem("lastOrder", JSON.stringify(order));
    cart = [];
    save();
    location.href = HALAMAN_SUKSES;
  });
}

// ============================================================
//  HALAMAN: transaksi.html / sukses.html
// ============================================================
function initSuccessPage() {
  const order = loadJSON("lastOrder", null);
  if (!order) {
    location.href = "index.html";
    return;
  }
  $("order-id").textContent = order.id;
  $("order-total").textContent = rupiah(order.total);
  $("order-metode").textContent = order.metode;
}

// ============================================================
//  JALANKAN SESUAI HALAMAN YANG SEDANG DIBUKA
// ============================================================
renderHeader();
if ($("product-list")) renderProducts();
if ($("product-detail")) renderDetail();
if ($("cart-items")) initCartPage();
if ($("checkout-form")) initCheckoutPage();
if ($("order-id")) initSuccessPage();
