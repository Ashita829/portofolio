// Mobile nav toggle
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
if (burger) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('nav-active'));
  });
}

// Animate stat bars when they scroll into view
const bars = document.querySelectorAll('.stat-bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.width = el.dataset.w + '%';
      barObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });
bars.forEach(b => barObserver.observe(b));

// NPC hint chat
const chatContainer = document.getElementById('ai-chat-container');
const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const closeChat = document.getElementById('close-chat');

if (chatContainer) {
  chatContainer.addEventListener('click', () => {
    if (chatContainer.classList.contains('chat-minimized')) {
      chatContainer.classList.remove('chat-minimized');
    }
  });

  closeChat.addEventListener('click', (e) => {
    e.stopPropagation();
    chatContainer.classList.add('chat-minimized');
  });

  function getBotResponse(input) {
    const text = input.toLowerCase();
    if (text.includes('project')) return "She's built 6 projects — a RAG chatbot, an ML churn pipeline, an AI resume assistant (Gemini API), SkillSwap, a timetable scheduler, and an LLM ticket-tagger. Check the Quest Log!";
    if (text.includes('skill') || text.includes('tech')) return "Python, Java, JavaScript, C, Flask, LangChain, scikit-learn, MySQL, Git — see the full inventory in Skill Mastery.";
    if (text.includes('ai') || text.includes('ml') || text.includes('machine')) return "AI/ML is her main focus — RAG systems, NLP, prompt engineering, and classic ML pipelines with scikit-learn.";
    if (text.includes('education') || text.includes('degree') || text.includes('university')) return "BSc Computer Science at IoBM, Karachi (2024–Present), CGPA 3.59/4.00.";
    if (text.includes('contact') || text.includes('email') || text.includes('hire')) return "Hit the Save Point section below for email, LinkedIn, GitHub and her resume.";
    return "Good question! Try asking about her projects, skills, or education — or scroll down to explore.";
  }

  function handleMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    const userDiv = document.createElement('p');
    userDiv.className = 'you-msg';
    userDiv.innerHTML = `<strong>You:</strong> ${message}`;
    chatBody.appendChild(userDiv);

    setTimeout(() => {
      const botDiv = document.createElement('p');
      botDiv.className = 'bot-msg';
      botDiv.innerHTML = `<strong>NPC:</strong> ${getBotResponse(message)}`;
      chatBody.appendChild(botDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 400);

    userInput.value = '';
  }

  sendBtn.addEventListener('click', handleMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleMessage();
  });
}
