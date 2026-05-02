// 1. دالة إضافة منتج
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

    // نقلنا المتغيرات للخارج لتعمل في كل الحالات
    const editId = document.getElementById('prod-edit-id').value;
    const btn = document.querySelector('#add-product-modal .btn-primary');
    const oldText = btn ? btn.innerHTML : 'حفظ ونشر على المتجر';

    if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> تحديث جاري...';
        btn.disabled = true;
    }

    try {
        const productData = { 
            name, 
            price, 
            category: cat, 
            desc: desc || "منتج ممتاز متوفر الآن.",
            updatedAt: new Date().toISOString()
        };
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

    } catch(err) {
        console.error(err);
        showToast('حدث خطأ: ' + err.message, true);
    } finally {
        if(btn) {
            btn.innerHTML = oldText;
            btn.disabled = false;
        }
    }
};

// 2. دالة إضافة عرض
window.addOffer = async function() {
    const fileInput = document.getElementById('offer-img-file');
    const imgUrlInput = document.getElementById('offer-img').value.trim();
    const name = document.getElementById('offer-name').value.trim();
    const colorsDataStr = document.getElementById('offer-colors-data').value;
    let colorsRaw = [];
    try { colorsRaw = JSON.parse(colorsDataStr); } catch(e) {}

    if(!name) { showToast('الرجاء كتابة اسم العرض', true); return; }

    const btn = document.querySelector('#add-offer-modal .btn-primary');
    const oldText = btn ? btn.innerHTML : '';

    if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الحفظ...';
        btn.disabled = true;
    }

    try {
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

    } catch(err) {
        console.error(err);
        showToast('خطأ أثناء رفع العرض: ' + err.message, true);
    } finally {
        if (btn) {
            btn.innerHTML = oldText;
            btn.disabled = false;
        }
    }
};

// 3. دالة إضافة قسم
window.addCategory = async function() {
    const editId = document.getElementById('category-edit-id').value;
    const cid = document.getElementById('category-id').value.trim();
    const name = document.getElementById('category-name').value.trim();
    const fileInput = document.getElementById('category-img-file');
    
    if(!cid || !name) {
        showToast('يرجى إدخال اسم القسم والمعرف (مثل phones)', true); return;
    }

    const btn = document.querySelector('#add-category-modal .btn-primary');
    const oldText = btn ? btn.innerHTML : '';

    if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الحفظ...';
        btn.disabled = true;
    }

    try {
        let finalImage = "";
        if (fileInput && fileInput.files.length > 0) {
            finalImage = await uploadToImgBB(fileInput.files[0]);
        } else {
            if (editId) {
                const oldCat = adminCategories.find(c => c.id === editId);
                finalImage = oldCat.img || ''; 
            } else {
                showToast('يرجى اختيار صورة للقسم المضاف', true);
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

    } catch (e) {
        console.error(e);
        showToast('فشل في الإضافة/التعديل: ' + e.message, true);
    } finally {
        if (btn) {
            btn.innerHTML = oldText;
            btn.disabled = false;
        }
    }
};

// 4. دالة إضافة بنر
window.addBanner = async function() {
    const title = document.getElementById('banner-title').value.trim();
    const fileInput = document.getElementById('banner-img-file');
    
    if(fileInput.files.length === 0) {
        showToast('يرجى اختيار صورة', true); return;
    }

    const btn = document.querySelector('#add-banner-modal .btn-primary');
    const oldText = btn ? btn.innerHTML : '';

    if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الرفع والاضافة...';
        btn.disabled = true;
    }

    try {
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

    } catch (e) {
        console.error(e);
        showToast('فشل في الإضافة: ' + e.message, true);
    } finally {
        if (btn) {
            btn.innerHTML = oldText;
            btn.disabled = false;
        }
    }
};
