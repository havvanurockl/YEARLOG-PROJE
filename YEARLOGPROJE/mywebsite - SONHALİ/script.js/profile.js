import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, deleteUser, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
  // aynı config...
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const nameEl = document.getElementById("name");
const surnameEl = document.getElementById("surname");
const emailEl = document.getElementById("email");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      nameEl.value = data.name;
      surnameEl.value = data.surname;
      emailEl.value = data.email;
    }
  }
});

// Güncelleme
document.getElementById("profileForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  if (!user) return;

  try {
    await updateDoc(doc(db, "users", user.uid), {
      name: nameEl.value,
      surname: surnameEl.value,
    });
    alert("Bilgiler güncellendi.");
  } catch (error) {
    alert("Hata: " + error.message);
  }
});

// Silme
document.getElementById("deleteAccount").addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return;

  if (confirm("Hesabınızı silmek istediğinizden emin misiniz?")) {
    try {
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
      alert("Hesap silindi.");
      window.location.href = "index.html";
    } catch (error) {
      alert("Hesap silinemedi: " + error.message);
    }
  }
});
