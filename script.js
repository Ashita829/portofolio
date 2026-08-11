// ---- Scroll reveal ----
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  revealEls.forEach((el) => io.observe(el));
  setTimeout(() => revealEls.forEach((el) => el.classList.add('in')), 1800);
} else {
  revealEls.forEach((el) => el.classList.add('in'));
}

// ---- Ask NPC (mini chat) ----
const chatContainer = document.getElementById('ai-chat-container');

if (chatContainer) {
  const chatBody = document.getElementById('chat-body');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const closeChat = document.getElementById('close-chat');

  chatContainer.addEventListener('click', () => {
    if (chatContainer.classList.contains('chat-minimized')) {
      chatContainer.classList.remove('chat-minimized');
      userInput.focus();
    }
  });

  closeChat.addEventListener('click', (e) => {
    e.stopPropagation();
    chatContainer.classList.add('chat-minimized');
  });

  function getBotResponse(input) {
    const text = input.toLowerCase();
    if (text.includes('project') || text.includes('quest')) return 'Six quests completed: SkillSwap, a RAG chatbot, an AI resume assistant, churn prediction, a timetable scheduler, and LLM ticket-tagging. Full log on the Projects page!';
    if (text.includes('skill')) return 'Python, Java, JavaScript, C — plus Flask/REST APIs, LangChain, scikit-learn, MySQL, and Git.';
    if (text.includes('education') || text.includes('study')) return 'BSc Computer Science at IoBM, Karachi (2024–Present), CGPA 3.59/4.00.';
    if (text.includes('contact') || text.includes('email') || text.includes('hire')) return 'Best reached at ashitakumari15@gmail.com — or head to the Save Point (Contact page)!';
    return 'Good question! Check the About or Projects levels for more on that.';
  }

  function appendLine(who, text) {
    const p = document.createElement('p');
    p.style.margin = '0 0 10px';
    const color = who === 'You' ? '#FFD873' : '#F5EFFF';
    p.innerHTML = `<strong style="color:${color}">${who}:</strong> ${text}`;
    chatBody.appendChild(p);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function handleMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    appendLine('You', message);
    userInput.value = '';
    setTimeout(() => appendLine('NPC', getBotResponse(message)), 400);
  }

  sendBtn.addEventListener('click', (e) => { e.preventDefault(); handleMessage(); });
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); handleMessage(); }
  });
}

// ---- Contact form (static hosting — acknowledge only) ----
function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'SAVED ✓';
  e.target.reset();
  setTimeout(() => { btn.textContent = original; }, 2500);
}
