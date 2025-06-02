import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDNr6PhC2KPQ6YUNdqU-apdPxz1ULxRq_Y",
  authDomain: "mywebsite-89e08.firebaseapp.com",
  projectId: "mywebsite-89e08",
  storageBucket: "mywebsite-89e08.appspot.com",
  messagingSenderId: "441073438466",
  appId: "1:441073438466:web:a40ffe7d2874726c56bc1b",
  measurementId: "G-T5TZJNTGG1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const favoritesList = document.getElementById("favoritesList");
const toast = document.getElementById("toast");

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => (toast.style.display = "none"), 3000);
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    showToast("Favorileri görüntülemek için giriş yapmalısınız.");
    return;
  }

  try {
    const favsRef = collection(db, "users", user.uid, "favorites");
    const snapshot = await getDocs(favsRef);

    if (snapshot.empty) {
      favoritesList.innerHTML = "<p>Henüz favori eklemediniz.</p>";
      return;
    }

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const card = document.createElement("div");
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
      `;
      favoritesList.appendChild(card);
    });
  } catch (error) {
    console.error("Favoriler alınamadı:", error);
    favoritesList.innerHTML = "<p>Favoriler yüklenirken bir hata oluştu.</p>";
  }
});
