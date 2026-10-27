// ===== Data produk =====
// Gambar: taruh file di folder images/ sesuai nama di bawah (ganti bebas).
// Tiap produk punya beberapa gambar, masing-masing dengan deskripsi (dipakai sebagai keterangan & alt text).
const imgs = (slug, descs) =>
    descs.map((desc, i) => ({ src: `images/${slug}-${i + 1}.jpg`, desc }));
  
  const products = [
    { id: 1, name: "Sepatu Sneakers Putih", price: 350000, icon: "👟",
      desc: "Sneakers putih yang nyaman untuk dipakai sehari-hari.",
      images: imgs("sneakers-putih", ["Tampak samping sepatu", "Tampak atas sepatu", "Detail sol sepatu"]) },
    { id: 2, name: "Sepatu Lari Biru", price: 420000, icon: "👟",
      desc: "Sepatu lari ringan dengan sol empuk.",
      images: imgs("sepatu-lari", ["Tampak samping sepatu lari", "Tampak depan", "Detail bantalan sol"]) },
    { id: 3, name: "Kaos Polos Hitam", price: 85000, icon: "👕",
      desc: "Kaos katun polos, adem dan mudah dipadukan.",
      images: imgs("kaos-hitam", ["Kaos tampak depan", "Kaos tampak belakang", "Detail bahan katun"]) },
    { id: 4, name: "Topi Baseball", price: 60000, icon: "🧢",
      desc: "Topi baseball dengan ukuran yang bisa diatur.",
      images: imgs("topi", ["Topi tampak depan", "Topi tampak samping", "Detail pengatur ukuran"]) },
    { id: 5, name: "Tas Ransel", price: 275000, icon: "🎒",
      desc: "Ransel muat laptop 14 inci dengan banyak kantong.",
      images: imgs("ransel", ["Ransel tampak depan", "Bagian dalam ransel", "Detail tali dan punggung"]) },
    { id: 6, name: "Jam Tangan", price: 500000, icon: "⌚",
      desc: "Jam tangan analog dengan tali kulit.",
      images: imgs("jam-tangan", ["Jam tangan tampak depan", "Tampak samping", "Detail tali kulit"]) },
  ];
  
  // ===== State (disimpan di localStorage) =====
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
  
  // ===== Helper gambar =====
  // Jika file gambar belum ada, tampilkan kotak placeholder berisi lokasi file yang diharapkan.
  function imgTag(img, icon, cls) {
    return `<img class="${cls}" src="${img.src}" alt="${img.desc}" data-icon="${icon}" data-src="${img.src}" onerror="imgError(this)">`;
  }
  function imgError(el) {
    const ph = document.createElement("div");
    ph.className = el.className + " placeholder";
    ph.innerHTML = `<span>${el.dataset.icon}</span><small>Taruh gambar di:<br>${el.dataset.src}</small>`;
    el.replaceWith(ph);
  }
  
  // ===== Header (dipakai semua halaman) =====
  function renderHeader() {
    $("site-header").innerHTML = `
      <h1><a href="index.html">🛍️ MyShop</a></h1>
      <nav>
        <a href="index.html">Produk</a>
        <a href="keranjang.html">Keranjang (<span id="cart-count">0</span>)</a>
      </nav>`;
    updateCount();
  }
  function updateCount() {
    $("cart-count").textContent = cart.reduce((s, i) => s + i.qty, 0);
  }
  
  // ===== Halaman: index.html =====
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
  
  // ===== Halaman: detail.html =====
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
  
  // ===== Keranjang =====
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
  
  // ===== Halaman: keranjang.html =====
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
  
  // ===== Halaman: checkout.html =====
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
      location.href = "sukses.html";
    });
  }
  
  // ===== Halaman: sukses.html =====
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
  
  // ===== Jalankan sesuai halaman yang sedang dibuka =====
  renderHeader();
  if ($("product-list")) renderProducts();
  if ($("product-detail")) renderDetail();
  if ($("cart-items")) initCartPage();
  if ($("checkout-form")) initCheckoutPage();
  if ($("order-id")) initSuccessPage();