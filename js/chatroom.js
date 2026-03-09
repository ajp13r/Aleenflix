// ── Firebase Setup ────────────────────────────────────────────────
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, orderBy, query }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBuesPSxqZQ5-ytvUF-t0ILR_H6Nmac7YU",
  authDomain: "aleenflix.firebaseapp.com",
  projectId: "aleenflix",
  storageBucket: "aleenflix.firebasestorage.app",
  messagingSenderId: "38425835510",
  appId: "1:38425835510:web:67c8d1226a8b1d3cb939d7"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// ── Chat Logic ────────────────────────────────────────────────────
const chatMessages = document.getElementById('chat-messages');
const chatName     = document.getElementById('chat-name');
const chatMessage  = document.getElementById('chat-message');
const chatSend     = document.getElementById('chat-send');

// Sanitize input to block scripts and HTML tags
function sanitize(str) {
  return str.replace(/[<>&"']/g, c => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function renderMessage(msg) {
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.innerHTML = `
    <div class="chat-user">
      <span class="chat-avatar">${sanitize(msg.name).charAt(0).toUpperCase()}</span>
      ${sanitize(msg.name)}
    </div>
    <div class="chat-text">${sanitize(msg.text)}</div>
    <div class="chat-time">${sanitize(msg.time)}</div>
  `;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Get the user's IP
async function getIP() {
  const res = await fetch('https://api.ipify.org?format=json');
  const data = await res.json();
  return data.ip;
}

// Listen for messages in real time
const q = query(collection(db, 'messages'), orderBy('timestamp'));
onSnapshot(q, (snapshot) => {
  chatMessages.innerHTML = '';
  snapshot.forEach(doc => renderMessage(doc.data()));
});

// Send a message
chatSend.addEventListener('click', async function () {
  const name = chatName.value.trim();
  const text = chatMessage.value.trim();
  if (!name || !text) return;

  // Block anything that looks like a script or HTML tag
  if (/<|>|script|javascript|onclick/i.test(name) || /<|>|script|javascript|onclick/i.test(text)) {
    alert('No HTML or scripts allowed!');
    return;
  }

  const ip = await getIP();

  await addDoc(collection(db, 'messages'), {
    name,
    text,
    time: new Date().toLocaleString(),
    timestamp: Date.now(),
    ip: ip
  });

  chatMessage.value = '';
});

// Send on Enter
chatMessage.addEventListener('keydown', e => {
  if (e.key === 'Enter') chatSend.click();
});