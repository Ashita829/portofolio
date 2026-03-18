// Initialize Animations
AOS.init({
    duration: 1000,
    once: true
});

// Mobile Nav Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

if (burger) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
}

// Simple AI Chatbot Simulation
const chatContainer = document.getElementById('ai-chat-container');
const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const closeChat = document.getElementById('close-chat');

// Open/Close Chat
chatContainer.addEventListener('click', (e) => {
    if (chatContainer.classList.contains('chat-minimized')) {
        chatContainer.classList.remove('chat-minimized');
    }
});

closeChat.addEventListener('click', (e) => {
    e.stopPropagation();
    chatContainer.classList.add('chat-minimized');
});

// Logic to simulate AI responses
function getBotResponse(input) {
    const text = input.toLowerCase();
    if (text.includes("project")) return "Ashita has built an AI Resume Assistant and an Interactive Visualizer. Which one should I tell you about?";
    if (text.includes("skill")) return "She is proficient in Java, JavaScript, and AI integration using Gemini API!";
    if (text.includes("education")) return "She is currently pursuing her BSc in Computer Science at IOBM University.";
    return "That's a great question! Ashita is passionate about AI. You can check her Projects section for more.";
}

function handleMessage() {
    const message = userInput.value;
    if (!message) return;

    // User Message
    const userDiv = document.createElement('p');
    userDiv.style.color = "#64ffda";
    userDiv.style.margin = "10px 0";
    userDiv.innerHTML = `<strong>You:</strong> ${message}`;
    chatBody.appendChild(userDiv);

    // Bot Response
    setTimeout(() => {
        const botDiv = document.createElement('p');
        botDiv.style.margin = "10px 0";
        botDiv.innerHTML = `<strong>AI:</strong> ${getBotResponse(message)}`;
        chatBody.appendChild(botDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);

    userInput.value = '';
}

sendBtn.addEventListener('click', handleMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleMessage();
});
