// Firebase modüllerini import et
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-storage.js";
import { getFirestore, doc, getDoc, collection, getDocs, addDoc, serverTimestamp, deleteDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyDNr6PhC2KPQ6YUNdqU-apdPxz1ULxRq_Y",
  authDomain: "mywebsite-89e08.firebaseapp.com",
  projectId: "mywebsite-89e08",
  storageBucket: "mywebsite-89e08.appspot.com",
  messagingSenderId: "441073438466",
  appId: "1:441073438466:web:a40ffe7d2874726c56bc1b",
  measurementId: "G-T5TZJNTGG1"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Toast mesajı gösterme
function showToast(message, duration = 3000) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => (toast.style.display = "none"), duration);
}

// Dosya base64 okuma
function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Sınıf ekleme
const classForm = document.getElementById("classForm");
if (classForm) {
  classForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const classNameInput = document.getElementById("className");
  const className = classNameInput.value.trim();

  if (!className) return showToast("Sınıf adı boş olamaz!");

  try {
    await addDoc(collection(db, "classes"), { name: className });
    showToast("Sınıf eklendi!");
    classNameInput.value = "";
    loadClassOptions(); 
  } catch (error) {
    console.error("Sınıf ekleme hatası:", error);
    showToast("Sınıf eklenirken hata oluştu.");
  }
});

}

// Sınıf seçeneklerini yükle//
  async function loadClassOptions() {
    const select = document.getElementById("classSelect");
    if (!select) return;

    // Eski sınıfları temizle
    select.innerHTML = '<option value="">-- Sınıf seçin --</option>';

    try {
      const snapshot = await getDocs(collection(db, "classes"));
      snapshot.forEach((docSnap) => {
        const option = document.createElement("option");
        option.value = docSnap.id;
        option.textContent = docSnap.data().name;
        select.appendChild(option);
      });
    } catch (error) {
      console.error("Sınıflar yüklenemedi:", error);
    }
  }

  loadClassOptions(); // Sayfa yüklenince çağır



// Yıllık form gönderme
const yearbookForm = document.getElementById("yearbookForm");
if (yearbookForm) {
  yearbookForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const classId = document.getElementById("classSelect").value;
    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const nickname = document.getElementById("nickname").value.trim();
    const lesson = document.getElementById("lesson").value.trim();
    const note = document.getElementById("note").value.trim();
    const photoFile = document.getElementById("photo").files[0];
    const videoFile = document.getElementById("video").files[0];

    if (!classId) return showToast("Lütfen sınıf seçin!");
    if (!photoFile) return showToast("Fotoğraf eklemelisiniz!");

    try {
      const photoBase64 = await readFileAsBase64(photoFile);
      const videoBase64 = videoFile ? await readFileAsBase64(videoFile) : "";

      await addDoc(collection(db, "classes", classId, "yearbook"), {
        name,
        surname,
        nickname,
        lesson,
        note,
        photoBase64,
        videoBase64,
        timestamp: new Date(),
      });

      showToast("Yıllık eklendi");
      yearbookForm.reset();
    } catch (error) {
      console.error("Yıllık ekleme hatası:", error);
      showToast("Yıllık eklenirken hata oluştu!");
    }
  });
}

// Yıllık listesini gör
const showListBtn = document.getElementById("showYearbookListBtn");
if (showListBtn) {
  showListBtn.addEventListener("click", () => {
    window.location.href = "yearbookList.html";
  });
}

// Sınıf seçilince yıllıkları listele
async function listYearbooksForClass(classId) {
  const yearbookListDiv = document.getElementById("yearbookList");
  yearbookListDiv.innerHTML = "Yükleniyor...";

  if (!classId) return (yearbookListDiv.textContent = "Lütfen sınıf seçin.");

  try {
    const snapshot = await getDocs(collection(db, "classes", classId, "yearbook"));
    yearbookListDiv.innerHTML = "";

    if (snapshot.empty) {
      yearbookListDiv.textContent = "Bu sınıfa ait yıllık bulunamadı.";
      return;
    }

    for (const docSnap of snapshot.docs) {
  const data = docSnap.data();
  const yearbookId = docSnap.id;

  const card = document.createElement('div');
  card.className = "yearbook-card";
  card.innerHTML = `
    <img src="${data.photoBase64 || ''}" alt="Fotoğraf" class="yearbook-photo" style="max-width:150px; border-radius:8px;" />
    <div class="yearbook-info">
      <p><strong>Ad:</strong> ${data.name || '-'}</p>
      <p><strong>Soyad:</strong> ${data.surname || '-'}</p>
      <p><strong>Lakap:</strong> ${data.nickname || '-'}</p>
      <p><strong>Sevdiği Ders:</strong> ${data.lesson || '-'}</p>
      <p><strong>Not:</strong> ${data.note || '-'}</p>
    </div>
    <button class="favorite-btn">⭐ Favori</button>
    <button class="delete-btn">Sil</button>
  `;
const favoriteBtn = card.querySelector('.favorite-btn');
favoriteBtn.addEventListener('click', async () => {
  try {
    const user = auth.currentUser;
    if (!user) return alert("Giriş yapmalısınız!");

    await addDoc(collection(db, "users", user.uid, "favorites"), {
      classId,
      yearbookId,
      ...data
    });

    showToast("Favorilere eklendi!");
  } catch (error) {
    console.error("Favori ekleme hatası:", error);
    showToast("Favori eklenemedi.");
  }
});

  const deleteBtn = card.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', async () => {
    const confirmDelete = confirm("Bu kaydı silmek istediğinize emin misiniz?");
    if (!confirmDelete) return;

    try {
      const yearbookDocRef = doc(db, 'classes', classId, 'yearbook', yearbookId);
      await deleteDoc(yearbookDocRef);
      showToast("Yıllık silindi.");
      listYearbooksForClass(classId);
    } catch (error) {
      console.error("Silme hatası:", error);
      showToast("Yıllık silinirken hata oluştu.");
    }
  });

  yearbookListDiv.appendChild(card);
}




  } catch (error) {
    console.error("Yıllıklar yüklenemedi:", error);
    yearbookListDiv.textContent = "Yıllıklar yüklenirken hata oluştu.";
  }
}

const classSelect = document.getElementById("classSelect");
if (classSelect) {
  classSelect.addEventListener("change", () => {
    listYearbooksForClass(classSelect.value);
  });
}

// Giriş formu
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) return showToast("Email ve şifre boş olamaz!");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        localStorage.setItem("user", JSON.stringify(userDoc.data()));
        showToast("Giriş başarılı!");
        setTimeout(() => (window.location.href = "create.html"), 1500);
      } else {
        showToast("Kullanıcı verisi bulunamadı!");
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
      showToast("Giriş başarısız: " + error.message);
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("searchBtn");

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const term = prompt("Sayfa içinde aramak istediğiniz kelime nedir?");
      if (term) {
        const elements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6");
        let found = false;

        elements.forEach(el => {
          if (el.textContent.toLowerCase().includes(term.toLowerCase())) {
            el.scrollIntoView({ behavior: "smooth" });
            el.style.backgroundColor = "#ffff99";
            found = true;
          }
        });

        if (!found) {
          alert("Aradığınız kelime bulunamadı.");
        }
      }
    });
  } else {
    console.warn("❌ searchBtn bulunamadı.");
  }
});
const pdfButton = document.getElementById("downloadPdfLink");

if (pdfButton) {
  pdfButton.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedClass = document.getElementById("classSelect").value;
    if (!selectedClass) {
      alert("Lütfen önce bir sınıf seçin.");
      return;
    }

    const element = document.getElementById("yearbookList");
    if (!element || element.innerHTML.trim() === "") {
      alert("İndirilecek içerik bulunamadı.");
      return;
    }

    html2pdf().set({
      margin: 10,
      filename: `yillik-${selectedClass}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(element).save();
  });
}



