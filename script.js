import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const translations = {
    ar: {
        admin_panel: 'لوحة الإدارة <i class="fa-solid fa-gears"></i>',
        store_overview: 'نظرة عامة على المتجر',
        products: 'المنتجات',
        total_orders: 'الطلبات الكلية',
        completed_sales: 'المبيعات (مكتملة)',
        quick_alerts: 'تنبيهات سريعة',
        you_have: 'لديك',
        pending_alert: 'طلبات بانتظار التأكيد!',
        manage_products: 'إدارة المنتجات',
        add_product: 'رفع منتج',
        incoming_orders: 'الطلبات الواردة',
        manage_offers: 'إدارة العروض (5 بـ 15)',
        add_offer: 'إضافة عرض',
        nav_home: 'الرئيسية',
        nav_products: 'المنتجات',
        nav_orders: 'الطلبات',
        nav_offers: 'العروض',
        empty_products: 'لا توجد منتجات حالياً',
        category: 'القسم',
        cat_covers: 'كفرات',
        cat_accessories: 'ملحقات',
        cat_phones: 'أجهزة',
        currency: 'د.ع',
        empty_orders: 'لا توجد طلبات جديدة حالياً',
        order_num: 'طلب',
        customer: 'الزبون',
        total: 'الإجمالي',
        payment: 'الدفع',
        method_cod: 'عند الاستلام',
        method_cc: 'ماستر كارد',
        items: 'المنتجات',
        status_pending: 'بانتظار التأكيد <i class="fa-solid fa-clock"></i>',
        status_completed: 'مكتمل <i class="fa-solid fa-check"></i>',
        btn_accept: 'قبول وتأكيد',
        btn_reject: 'رفض وحذف',
        btn_archive: 'أرشفة',
        empty_offers: 'لا توجد عروض مضافة حالياً',
        colors: 'الألوان المتاحة',
        dir: 'rtl'
    },
    en: {
        admin_panel: 'Admin Panel <i class="fa-solid fa-gears"></i>',
        store_overview: 'Store Overview',
        products: 'Products',
        total_orders: 'Total Orders',
        completed_sales: 'Completed Sales',
        quick_alerts: 'Quick Alerts',
        you_have: 'You have',
        pending_alert: 'pending orders!',
        manage_products: 'Manage Products',
        add_product: 'Add Product',
        incoming_orders: 'Incoming Orders',
        manage_offers: 'Manage Offers',
        add_offer: 'Add Offer',
        nav_home: 'Dashboard',
        nav_products: 'Products',
        nav_orders: 'Orders',
        nav_offers: 'Offers',
        empty_products: 'No products available',
        category: 'Category',
        cat_covers: 'Covers',
        cat_accessories: 'Accessories',
        cat_phones: 'Phones',
        currency: 'IQD',
        empty_orders: 'No new orders right now',
        order_num: 'Order',
        customer: 'Customer',
        total: 'Total',
        payment: 'Payment',
        method_cod: 'COD',
        method_cc: 'MasterCard',
        items: 'Items',
        status_pending: 'Pending <i class="fa-solid fa-clock"></i>',
        status_completed: 'Completed <i class="fa-solid fa-check"></i>',
        btn_accept: 'Accept',
        btn_reject: 'Reject',
        btn_archive: 'Archive',
        empty_offers: 'No offers available',
        colors: 'Available Colors',
        dir: 'ltr'
    },
    ku: {
        admin_panel: 'پەناڵی بەڕێوەبەر <i class="fa-solid fa-gears"></i>',
        store_overview: 'پوختەی فرۆشگا',
        products: 'بەرهەمەکان',
        total_orders: 'کۆی داواکارییەکان',
        completed_sales: 'فرۆشتنی تەواوکراو',
        quick_alerts: 'ئاگادارکردنەوە خێراکان',
        you_have: 'تۆ هەتە',
        pending_alert: 'داواکاری چاوەڕوانکراو!',
        manage_products: 'بەڕێوەبردنی بەرهەمەکان',
        add_product: 'زیادکردنی بەرهەم',
        incoming_orders: 'داواکارییە هاتووەکان',
        manage_offers: 'بەڕێوەبردنی ئۆفەرەکان',
        add_offer: 'زیادکردنی ئۆفەر',
        nav_home: 'سەرەکی',
        nav_products: 'بەرهەمەکان',
        nav_orders: 'داواکارییەکان',
        nav_offers: 'ئۆفەرەکان',
        empty_products: 'هیچ بەرهەمێک بەردەست نییە',
        category: 'هاوپۆل',
        cat_covers: 'بەرگ',
        cat_accessories: 'پێداویستی',
        cat_phones: 'مۆبایل',
        currency: 'دینار',
        empty_orders: 'هیچ داواکارییەکی نوێ نییە',
        order_num: 'داواکاری',
        customer: 'کڕیار',
        total: 'کۆ',
        payment: 'پارەدان',
        method_cod: 'نەخت',
        method_cc: 'ماستەرکارد',
        items: 'کاڵاکان',
        status_pending: 'چاوەڕوانکراو <i class="fa-solid fa-clock"></i>',
        status_completed: 'تەواوکراو <i class="fa-solid fa-check"></i>',
        btn_accept: 'پەسەندکردن',
        btn_reject: 'ڕەتکردنەوە',
        btn_archive: 'ئەرشیف',
        empty_offers: 'ئۆفەر نییە',
        colors: 'ڕەنگەکان',
        dir: 'rtl'
    }
};

let currentLang = 'ar';
window.changeLanguage = function(lang) {
    currentLang = lang;
    const dict = translations[lang];
    if (!dict) return;
    
    document.documentElement.lang = lang;
    document.documentElement.dir = dict.dir;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });

    updateDashboard();
    renderProducts();
    renderOrders();
    renderOffers();
};

// إعدادات Firebase من المستخدم
const firebaseConfig = {
    apiKey: "AIzaSyC0nqk6NrifyUwziWC0RmYRwE0nqM4Cuzc",
    authDomain: "elele-a0008.firebaseapp.com",
    projectId: "elele-a0008",
    storageBucket: "elele-a0008.firebasestorage.app",
    messagingSenderId: "1035574351177",
    appId: "1:1035574351177:web:b94e7a4ab9c9aa8e5fb698"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let adminProducts = [];
let adminOffers = [];
let adminOrders = [];
let adminCategories = [];
let adminBanners = [];

window.addEventListener('load', () => {
    changeLanguage(currentLang);
    loadDataFromFirestore();
});

// تحميل البيانات من Firestore
async function loadDataFromFirestore() {
    try {
        const prodSnap = await getDocs(collection(db, "products"));
        adminProducts = prodSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const offSnap = await getDocs(collection(db, "offers"));
        adminOffers = offSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const orderSnap = await getDocs(collection(db, "orders"));
        adminOrders = orderSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        try {
            const catSnap = await getDocs(collection(db, "categories"));
            adminCategories = catSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch(e) {}
        
        try {
            const bannerSnap = await getDocs(collection(db, "banners"));
            adminBanners = bannerSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch(e) {}

        updateDashboard();
        renderProducts();
        renderOrders();
        renderOffers();
        renderAdminCategories();
        renderAdminBanners();
    } catch(e) {
        console.error("Error loading data from Firestore: ", e);
        showToast('فشل في جلب البيانات من الخادم', true);
    }
}

// دالة ضغط الصورة لتحسين الأداء
function compressImage(file, maxWidth = 800, maxSizeMB = 0.5) {
    return new Promise((resolve, reject) => {
        if (!file.type.match(/image.*/)) {
            return resolve(file);
        }
        
        // إذا كان حجم الصورة أصغر من الحد المسموح، لا تقم بضغطها
        if (file.size / 1024 / 1024 < maxSizeMB) {
            return resolve(file);
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = function () {
                const canvas = document.createElement("canvas");
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                
                // حفظ الصورة بصيغة jpeg وبجودة 0.6 تقريباً لتقليص الحجم للنصف أو أكثر
                canvas.toBlob((blob) => {
                    if (blob) {
                        const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                            type: "image/jpeg",
                            lastModified: Date.now()
                        });
                        resolve(compressedFile);
                    } else {
                        resolve(file); // في حال فشل الضغط
                    }
                }, "image/jpeg", 0.6);
            };
            img.onerror = () => resolve(file);
        };
        reader.onerror = () => resolve(file);
    });
}

// دالة الرفع إلى ImgBB
async function uploadToImgBB(file) {
    showToast("جاري المعالجة والضغط...", false);
    const compressedFile = await compressImage(file);

    const formData = new FormData();
    formData.append("image", compressedFile);
    const apiKey = "eb47af92715ce25440decd59e66a5bd0";
    
    showToast("جاري رفع الصورة للمتجر...", false);

    const uploadResponse = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData
    });

    if (!uploadResponse.ok) {
        throw new Error("حدث خطأ أثناء رفع الصورة عبر ImgBB");
    }

    const data = await uploadResponse.json();
    if (data.success) {
        return data.data.url;
    } else {
        throw new Error(data.error?.message || "فشل رفع الصورة");
    }
}

// --- التنقل ---
window.switchTab = function(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    
    document.getElementById(`tab-${tabId}`).classList.add('active');
    element.classList.add('active');
    window.scrollTo({top: 0, behavior: 'smooth'});

    if(tabId === 'dashboard') updateDashboard();
};

window.toggleTheme = function() {
    document.body.classList.toggle('dark-theme');
    const icon = document.querySelector('#theme-toggle i');
    if (document.body.classList.contains('dark-theme')) icon.className = 'fa-solid fa-sun';
    else icon.className = 'fa-solid fa-moon';
};

window.openModal = function(id) {
    const modal = document.getElementById(id);
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
};

window.closeModal = function(id) {
    const modal = document.getElementById(id);
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
};

function showToast(text, isError = false) {
    const toast = document.getElementById('toast');
    toast.innerHTML = isError ? `<i class="fa-solid fa-circle-exclamation"></i> ${text}` : `<i class="fa-solid fa-circle-check"></i> ${text}`;
    toast.style.backgroundColor = isError ? '#e74c3c' : 'var(--success)';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// --- الرئيسية ---
function updateDashboard() {
    const totalProds = adminProducts.length;
    const pendingOrders = adminOrders.filter(o => o.status === 'pending').length;
    const totalRev = adminOrders.filter(o => o.status === 'completed').reduce((sum, o) => sum + (o.total || 0), 0);
    const dict = translations[currentLang];

    document.getElementById('total-products').innerText = totalProds;
    document.getElementById('total-orders').innerText = adminOrders.length;
    document.getElementById('total-revenue').innerText = totalRev.toLocaleString() + ' ' + (dict ? dict.currency : 'د.ع');
    document.getElementById('pending-count').innerText = pendingOrders;
    
    const badge = document.getElementById('orders-badge');
    badge.innerText = pendingOrders;
    badge.style.display = pendingOrders > 0 ? 'inline-block' : 'none';
}

// --- المنتجات ---
function renderProducts() {
    const list = document.getElementById('admin-products-list');
    list.innerHTML = '';
    const dict = translations[currentLang];
    
    if(adminProducts.length === 0) {
        list.innerHTML = `<p style="text-align:center; color:var(--text-sec); padding: 20px;">${dict.empty_products}</p>`;
        return;
    }

    [...adminProducts].reverse().forEach(p => {
        let catName = p.category === 'covers' ? dict.cat_covers : (p.category === 'accessories' ? dict.cat_accessories : dict.cat_phones);
        list.innerHTML += `
            <div class="list-item">
                <img src="${p.image_url}" alt="${p.name}" class="list-img" onerror="this.src='https://via.placeholder.com/70'">
                <div class="list-details">
                    <h4>${p.name}</h4>
                    <p>${dict.category}: ${catName}</p>
                    <span class="price">${p.price.toLocaleString()} ${dict.currency}</span>
                </div>
                <div class="list-actions">
                    <button class="btn-icon delete" onclick="deleteProduct('${p.id}')"><i class="fa-solid fa-trash"></i></button>
                    <button class="btn-icon" style="color:var(--primary)" onclick="editProduct('${p.id}')"><i class="fa-solid fa-pen"></i></button>
                </div>
            </div>
        `;
    });
}

// دالة تحديث بيانات المنتج مع رفع الصورة ل ImgBB
async function updateProductData(productId, newData, newImageFile) {
    let finalImageUrl = newData.image_url;

    // إذا اختار المستخدم صورة جديدة يتم رفعها أولاً
    if (newImageFile) {
        finalImageUrl = await uploadToImgBB(newImageFile);
    } else {
        // إذا لم يرفع المستخدم صورة جديدة، نجلب الرابط القديم إذا لم يكن موجوداً
        if (!finalImageUrl && productId) {
            const oldProd = adminProducts.find(p => p.id === productId);
            if (oldProd) {
                finalImageUrl = oldProd.image_url;
            }
        }
    }

    // تحديث البيانات مع الرابط النهائي
    const updatedData = {
        ...newData,
        image_url: finalImageUrl || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        updatedAt: new Date().toISOString()
    };

    if (productId) {
        // تحديث المستند في Firestore
        await updateDoc(doc(db, "products", productId), updatedData);
    } else {
        // في حالة المنتج الجديد
        updatedData.createdAt = new Date().toISOString();
        const docRef = await addDoc(collection(db, "products"), updatedData);
        productId = docRef.id;
    }

    return { id: productId, ...updatedData };
}

window.addProduct = async function() {
    const fileInput = document.getElementById('prod-img-file');
    const imgUrlInput = document.getElementById('prod-img').value.trim();
    const name = document.getElementById('prod-name').value.trim();
    const desc = document.getElementById('prod-desc').value.trim();
    const price = parseInt(document.getElementById('prod-price').value);
    const cat = document.getElementById('prod-cat').value;

    if(!name || !price || isNaN(price)) {
        showToast('الرجاء إدخال اسم المنتج والسعر بشكل صحيح', true); return;
    }

    const btn = document.querySelector('#add-product-modal .btn-primary');
    let oldText = "حفظ";
    if (btn) oldText = btn.innerHTML;

    try {
        if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> تحديث جاري...';
            btn.disabled = true;
        }

        const productData = { 
            name, 
            price, 
            category: cat, 
            desc: desc || "منتج ممتاز متوفر الآن.",
            updatedAt: new Date().toISOString()
        };
        const editId = document.getElementById('prod-edit-id').value;
        if(!editId) {
            productData.createdAt = new Date().toISOString();
        }

        const file = fileInput.files.length > 0 ? fileInput.files[0] : null;
        if (!file && imgUrlInput) {
            productData.image_url = imgUrlInput;
        }

        const savedProduct = await updateProductData(editId || null, productData, file);

        if (editId) {
            const idx = adminProducts.findIndex(p => p.id === editId);
            if(idx > -1) adminProducts[idx] = savedProduct;
            showToast('تم تعديل المنتج بنجاح!');
        } else {
            adminProducts.push(savedProduct);
            showToast('تم رفع المنتج بنجاح!');
        }

        renderProducts();
        updateDashboard();
        closeModal('add-product-modal');
        
        document.getElementById('prod-edit-id').value = '';
        
        document.getElementById('prod-img-file').value = '';
        document.getElementById('prod-img').value = '';
        document.getElementById('prod-name').value = '';
        document.getElementById('prod-desc').value = '';
        document.getElementById('prod-price').value = '';

        if (btn) {
            btn.innerHTML = oldText;
            btn.disabled = false;
        }
    } catch(err) {
        console.error(err);
        showToast('حدث خطأ: ' + err.message, true);
        if(btn) {
            btn.innerHTML = oldText;
            btn.disabled = false;
        }
    }
};

window.deleteProduct = async function(id) {
    if(confirm('هل أنت متأكد من حذف هذا المنتج نهائياً السيرفر؟')) {
        try {
            await deleteDoc(doc(db, "products", id));
            adminProducts = adminProducts.filter(p => p.id !== id);
            renderProducts(); updateDashboard(); showToast('تم الحذف بنجاح');
        } catch(e) {
            showToast('خطأ أثناء الحذف', true);
        }
    }
};

// --- العروض ---
function renderOffers() {
    const list = document.getElementById('admin-offers-list');
    list.innerHTML = '';
    const dict = translations[currentLang];
    
    if(adminOffers.length === 0) {
        list.innerHTML = `<p style="text-align:center; color:var(--text-sec); padding: 20px;">${dict.empty_offers}</p>`;
        return;
    }

    [...adminOffers].reverse().forEach(o => {
        list.innerHTML += `
            <div class="list-item">
                <img src="${o.image_url}" alt="${o.name}" class="list-img" onerror="this.src='https://via.placeholder.com/70'">
                <div class="list-details">
                    <h4>${o.name}</h4>
                    <p>${dict.colors}: ${(o.colors || []).join('، ')}</p>
                </div>
                <div class="list-actions">
                    <button class="btn-icon delete" onclick="deleteOffer('${o.id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
    });
}

window.addOffer = async function() {
    const fileInput = document.getElementById('offer-img-file');
    const imgUrlInput = document.getElementById('offer-img').value.trim();
    const name = document.getElementById('offer-name').value.trim();
    const colorsDataStr = document.getElementById('offer-colors-data').value;
    let colorsRaw = [];
    try {
        colorsRaw = JSON.parse(colorsDataStr);
    } catch(e) {}

    if(!name) { showToast('الرجاء كتابة اسم العرض', true); return; }

    const btn = document.querySelector('#add-offer-modal .btn-primary');
    let oldText = "حفظ";
    if (btn) oldText = btn.innerHTML;

    try {
        if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الحفظ...';
            btn.disabled = true;
        }

        const colors = colorsRaw && colorsRaw.length > 0 ? colorsRaw : ["أسود"];
        const offerData = { name, colors, createdAt: new Date().toISOString() };

        let fsId = null;
        let finalImage = "";

        if (fileInput.files.length > 0) {
            finalImage = await uploadToImgBB(fileInput.files[0]);
        } else {
            finalImage = imgUrlInput || "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=200";
        }
        
        offerData.image_url = finalImage;
        const docRef = await addDoc(collection(db, "offers"), offerData);
        fsId = docRef.id;

        adminOffers.push({ id: fsId, ...offerData });
        renderOffers();
        closeModal('add-offer-modal');
        showToast('تمت إضافة العرض بنجاح!');
        
        document.getElementById('offer-img-file').value = '';
        document.getElementById('offer-img').value = '';
        document.getElementById('offer-name').value = '';
        document.getElementById('offer-colors-data').value = '[]';
        document.getElementById('offer-colors-list').innerHTML = '';
        document.getElementById('offer-new-color').value = '';

        if (btn) {
            btn.innerHTML = oldText;
            btn.disabled = false;
        }
    } catch(err) {
        console.error(err);
        showToast('خطأ أثناء رفع العرض: ' + err.message, true);
        if (btn) {
            btn.innerHTML = oldText;
            btn.disabled = false;
        }
    }
};

window.deleteOffer = async function(id) {
    if(confirm('هل أنت متأكد من حذف العرض؟')) {
        try {
            await deleteDoc(doc(db, "offers", id));
            adminOffers = adminOffers.filter(o => o.id !== id);
            renderOffers(); showToast('تم حذف العرض بنجاح');
        } catch(e) {
            showToast('خطأ أثناء الحذف', true);
        }
    }
};

// --- الطلبات ---
let currentOrdersFilter = 'pending';

window.filterOrdersView = function(view) {
    currentOrdersFilter = view;
    document.querySelectorAll('.orders-tabs button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-btn-${view}`).classList.add('active');
    renderOrders();
};

function renderOrders() {
    const list = document.getElementById('admin-orders-list');
    list.innerHTML = '';
    const dict = translations[currentLang];

    const filteredOrders = adminOrders.filter(o => o.status === currentOrdersFilter);

    if (filteredOrders.length === 0) {
        let emptyMsg = currentOrdersFilter === 'pending' ? dict.empty_orders : (dict.empty_completed || 'لا توجد طلبات مكتملة حالياً');
        list.innerHTML = `<p style="text-align:center; color:var(--text-sec); padding: 20px;">${emptyMsg}</p>`;
        return;
    }

    const sortedOrders = [...filteredOrders].sort((a,b) => new Date(b.date || 0) - new Date(a.date || 0));
    
    sortedOrders.forEach(o => {
        let itemsDesc = o.itemsDetailed ? o.itemsDetailed.map(i => `${i.name} (${i.qty || 1})`).join('، ') : `${o.items} عنصر`;
        
        const isPending = o.status === 'pending';
        const statusLabel = isPending ? `<span class="order-status status-pending">${dict.status_pending}</span>` : `<span class="order-status status-completed">${dict.status_completed}</span>`;
        
        const actionBtns = isPending ? `
            <div class="order-actions">
                <button class="btn-accept" onclick="updateOrderStatus('${o.id}', 'completed')"><i class="fa-solid fa-check"></i> ${dict.btn_accept}</button>
                <button class="btn-reject" onclick="deleteOrder('${o.id}')"><i class="fa-solid fa-xmark"></i> ${dict.btn_reject}</button>
            </div>
        ` : `<div class="order-actions">
                <button class="btn-reject" style="background:var(--text-sec)" onclick="deleteOrder('${o.id}')"><i class="fa-solid fa-trash"></i> ${dict.btn_archive}</button>
             </div>`;

        list.innerHTML += `
            <div class="list-item" style="flex-direction: column; gap: 10px;">
                <div class="order-header">
                    <strong>${dict.order_num} ${new Date(o.date).toLocaleDateString()}</strong>
                    ${statusLabel}
                </div>
                <div class="order-body">
                    <p><i class="fa-solid fa-user"></i> <strong>${dict.customer}:</strong> ${o.customer || o.customerName}</p>
                    <p><i class="fa-brands fa-whatsapp" style="color: #2ecc71;"></i> <strong>الرقم:</strong> <a href="https://wa.me/${(o.phone || o.customerPhone || '').replace(/\+/g, '').replace(/^0/, '964')}" target="_blank" style="text-decoration: underline;">${o.phone || o.customerPhone}</a></p>
                    <p><i class="fa-solid fa-location-dot"></i> <strong>العنوان:</strong> ${o.address || o.customerAddress}</p>
                    <p><i class="fa-solid fa-box"></i> <strong>${dict.items}:</strong> <span style="color:#f39c12; font-weight:bold">${itemsDesc || o.itemsSummary}</span></p>
                    <p><i class="fa-solid fa-credit-card"></i> <strong>${dict.payment}:</strong> ${(o.payment || o.paymentMethod || '') === 'cod' ? dict.method_cod : (o.paymentMethod || dict.method_cc)}</p>
                    <p><i class="fa-solid fa-bag-shopping"></i> <strong>${dict.total}:</strong> <span style="color:var(--primary); font-weight:bold">${(o.total || o.totalAmount || 0).toLocaleString()} ${dict.currency}</span></p>
                </div>
                ${actionBtns}
            </div>
        `;
    });
}

window.updateOrderStatus = async function(id, status) {
    try {
        await updateDoc(doc(db, "orders", id), { status });
        const idx = adminOrders.findIndex(o => o.id === id);
        if(idx > -1) adminOrders[idx].status = status;
        renderOrders(); updateDashboard(); showToast('تم تحديث حالة الطلب');
    } catch(e) {
        showToast('فشل في التحديث', true);
    }
};

window.deleteOrder = async function(id) {
    if(confirm('هل تريد فعلاً حذف هذا السجل؟')) {
        try {
            await deleteDoc(doc(db, "orders", id));
            adminOrders = adminOrders.filter(o => o.id !== id);
            renderOrders(); updateDashboard(); showToast('تم الحذف');
        } catch(e) {
            showToast('خطأ أثناء الحذف', true);
        }
    }
};

window.renderAdminCategories = function() {
    const list = document.getElementById('admin-categories-list');
    list.innerHTML = '';
    
    if(adminCategories.length === 0) {
        list.innerHTML = `<p style="text-align:center; color:var(--text-sec); padding: 20px;">لا توجد أقسام</p>`;
        return;
    }

    [...adminCategories].forEach(c => {
        list.innerHTML += `
            <div class="list-item">
                <img src="${c.img}" alt="${c.name}" class="list-img" onerror="this.src='https://via.placeholder.com/70'">
                <div class="list-details">
                    <h4>${c.name}</h4>
                    <p>المعرف: ${c.internalId || c.id}</p>
                </div>
                <div class="list-actions">
                    <button class="btn-icon delete" onclick="deleteCategory('${c.id}')"><i class="fa-solid fa-trash"></i></button>
                    <!-- <button class="btn-icon" style="color:var(--primary)" onclick="editCategory('${c.id}')"><i class="fa-solid fa-pen"></i></button> -->
                </div>
            </div>
        `;
    });
};

window.editCategory = function(id) {
    const cat = adminCategories.find(c => c.id === id);
    if(!cat) return;
    document.getElementById('category-edit-id').value = cat.id;
    document.getElementById('category-id').value = cat.internalId || cat.id;
    document.getElementById('category-name').value = cat.name;
    openModal('add-category-modal');
};

window.editProduct = function(id) {
    const prod = adminProducts.find(p => p.id === id);
    if(!prod) return;
    document.getElementById('prod-edit-id').value = prod.id;
    document.getElementById('prod-name').value = prod.name;
    document.getElementById('prod-price').value = prod.price;
    document.getElementById('prod-desc').value = prod.desc || '';
    document.getElementById('prod-cat').value = prod.category;
    document.getElementById('prod-img').value = prod.image_url || '';
    
    // Change modal title and button
    document.querySelector('#add-product-modal h3').innerText = 'تعديل المنتج';
    document.querySelector('#add-product-modal .btn-primary').innerText = 'حفظ التغييرات';
    openModal('add-product-modal');
};
window.addCategory = async function() {
    const editId = document.getElementById('category-edit-id').value;
    const cid = document.getElementById('category-id').value.trim();
    const name = document.getElementById('category-name').value.trim();
    const fileInput = document.getElementById('category-img-file');
    
    if(!cid || !name) {
        showToast('يرجى إدخال اسم القسم والمعرف (مثل phones)', true); return;
    }

    const btn = document.querySelector('#add-category-modal .btn-primary');
    let oldText = "حفظ";
    if (btn) oldText = btn.innerHTML;

    try {
        if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الحفظ...';
            btn.disabled = true;
        }

        let finalImage = "";
        if (fileInput && fileInput.files.length > 0) {
            finalImage = await uploadToImgBB(fileInput.files[0]);
        } else {
            if (editId) {
                const oldCat = adminCategories.find(c => c.id === editId);
                finalImage = oldCat.img || ''; 
            } else {
                showToast('يرجى اختيار صورة للقسم المضاف', true);
                if (btn) {
                    btn.innerHTML = oldText;
                    btn.disabled = false;
                }
                return;
            }
        }

        const catData = { id: cid, name, img: finalImage };
        if (editId) {
            await updateDoc(doc(db, "categories", editId), catData);
            const idx = adminCategories.findIndex(c => c.id === editId);
            if(idx > -1) adminCategories[idx] = { id: editId, ...catData };
            showToast('تم التعديل بنجاح');
        } else {
            const docRef = await addDoc(collection(db, "categories"), catData);
            adminCategories.push({ id: docRef.id, ...catData });
            showToast('تم إضافة القسم بنجاح');
        }
        closeModal('add-category-modal');
        renderAdminCategories();
        
        document.getElementById('category-id').value = '';
        document.getElementById('category-name').value = '';
        if(fileInput) fileInput.value = '';
        document.getElementById('category-edit-id').value = '';

        if (btn) {
            btn.innerHTML = oldText;
            btn.disabled = false;
        }
    } catch (e) {
        console.error(e);
        showToast('فشل في الإضافة/التعديل: ' + e.message, true);
        if (btn) {
            btn.innerHTML = oldText;
            btn.disabled = false;
        }
    }
};

window.deleteCategory = async function(id) {
    if(confirm('هل تريد حذف القسم نهائياً؟')) {
        try {
            await deleteDoc(doc(db, "categories", id));
            adminCategories = adminCategories.filter(c => c.id !== id);
            renderAdminCategories(); showToast('تم الحذف');
        } catch(e) {
            showToast('حدث خطأ', true);
        }
    }
};

window.renderAdminBanners = function() {
    const list = document.getElementById('admin-banners-list');
    list.innerHTML = '';
    
    if(adminBanners.length === 0) {
        list.innerHTML = `<p style="text-align:center; color:var(--text-sec); padding: 20px;">لا توجد بنرات</p>`;
        return;
    }

    [...adminBanners].forEach(b => {
        list.innerHTML += `
            <div class="list-item">
                <img src="${b.image_url}" alt="بنر" class="list-img" style="width: 120px; border-radius: 4px;" onerror="this.src='https://via.placeholder.com/120x60'">
                <div class="list-details">
                    <h4>${b.title || 'إعلان'}</h4>
                </div>
                <div class="list-actions">
                    <button class="btn-icon delete" onclick="deleteBanner('${b.id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
    });
};

window.addBanner = async function() {
    const title = document.getElementById('banner-title').value.trim();
    const fileInput = document.getElementById('banner-img-file');
    
    if(fileInput.files.length === 0) {
        showToast('يرجى اختيار صورة', true); return;
    }

    const btn = document.querySelector('#add-banner-modal .btn-primary');
    let oldText = "حفظ";
    if (btn) oldText = btn.innerHTML;

    try {
        if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الرفع والاضافة...';
            btn.disabled = true;
        }

        let finalImage = "";
        
        if (fileInput.files.length > 0) {
            finalImage = await uploadToImgBB(fileInput.files[0]);
        }

        const docData = { title, image_url: finalImage };
        const docRef = await addDoc(collection(db, "banners"), docData);
        adminBanners.push({ id: docRef.id, ...docData });
        showToast('تم الإضافة بنجاح');
        closeModal('add-banner-modal');
        renderAdminBanners();
        
        document.getElementById('banner-title').value = '';
        document.getElementById('banner-img-file').value = '';

        if (btn) {
            btn.innerHTML = oldText;
            btn.disabled = false;
        }
    } catch (e) {
        console.error(e);
        showToast('فشل في الإضافة: ' + e.message, true);
        if (btn) {
            btn.innerHTML = oldText;
            btn.disabled = false;
        }
    }
};

window.deleteBanner = async function(id) {
    if(confirm('هل تريد حذف هذا البنر؟')) {
        try {
            await deleteDoc(doc(db, "banners", id));
            adminBanners = adminBanners.filter(b => b.id !== id);
            renderAdminBanners(); showToast('تم الحذف');
        } catch(e) {
            showToast('حدث خطأ', true);
        }
    }
};

window.addOfferColor = function() {
    const input = document.getElementById('offer-new-color');
    let color = input.value.trim();
    if (!color) return;
    
    // clean up quotes
    color = color.replace(/['"]/g, '');

    const dataInput = document.getElementById('offer-colors-data');
    let colors = [];
    try { 
        colors = JSON.parse(dataInput.value); 
        if(!Array.isArray(colors)) colors = [];
    } catch(e) { colors = []; }
    
    // Check for duplicates
    if(colors.includes(color)) {
        input.value = '';
        return;
    }

    colors.push(color);
    dataInput.value = JSON.stringify(colors);
    input.value = '';
    
    renderOfferColorsList();
};

window.removeOfferColor = function(index) {
    const dataInput = document.getElementById('offer-colors-data');
    let colors = [];
    try { 
        colors = JSON.parse(dataInput.value); 
        if(!Array.isArray(colors)) colors = [];
    } catch(e) { colors = []; }
    
    colors.splice(index, 1);
    dataInput.value = JSON.stringify(colors);
    
    renderOfferColorsList();
};

window.renderOfferColorsList = function() {
    const dataInput = document.getElementById('offer-colors-data');
    let colors = [];
    try { 
        colors = JSON.parse(dataInput.value); 
        if(!Array.isArray(colors)) colors = [];
    } catch(e) { colors = []; }
    
    const list = document.getElementById('offer-colors-list');
    list.innerHTML = colors.map((c, i) => `
        <span style="background: var(--border); padding: 5px 10px; border-radius: 12px; font-size: 13px; display: inline-flex; align-items: center; gap: 5px; color: var(--text-main);">
            ${c}
            <i class="fa-solid fa-xmark" style="cursor: pointer; color: var(--danger);" onclick="removeOfferColor(${i})"></i>
        </span>
    `).join('');
};
