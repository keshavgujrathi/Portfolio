// Keshav's Digital Twin Chatbot - Hip-hop confident but professional
// Static version with pre-defined responses

class KeshavChatbot {
    constructor() {
        this.isOpen = false;
        this.responses = this.initializeResponses();
        this.init();
    }

    init() {
        this.chatbotIcon = document.getElementById('chatbot-icon');
        this.chatbotWindow = document.getElementById('chatbot-window');
        this.chatbotClose = document.getElementById('chatbot-close');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.inputField = document.getElementById('chatbot-input-field');
        this.sendButton = document.getElementById('chatbot-send');

        this.bindEvents();
    }

    bindEvents() {
        this.chatbotIcon.addEventListener('click', () => this.toggleChat());
        this.chatbotClose.addEventListener('click', () => this.closeChat());
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Quick action buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-btn')) {
                const question = e.target.dataset.question;
                this.handleQuickAction(question);
            }
        });
    }

    initializeResponses() {
        return {
            safestreets: "SafeStreets is Keshav's flagship project - a real-time road safety intelligence system. Built configurable rule-based safety scoring with interactive dashboard, heatmaps, and CSV export for analyst workflows. Uses Python, Streamlit, Folium, and OSMnx to process 50,000+ road segments. Shows end-to-end product thinking from data ingestion to user interface.",
            emotion: "The Emotion Recognition project showcases Keshav's deep learning expertise. Achieved 85%+ validation accuracy on FER-2013 dataset with real-time webcam demo. Built complete CNN pipeline using TensorFlow, OpenCV, and Keras with live inference capabilities. Demonstrates both model development and deployment skills.",
            skills: "Keshav's core strength is ML & AI: TensorFlow, Keras, scikit-learn, OpenCV. Data Engineering: Pandas, Streamlit, Folium, Matplotlib. Cloud & Deployment: Google Cloud, ML APIs, Git/GitHub, Jupyter. Programming: Python, Java, SQL, NumPy. He picks tools that solve real problems, not just trendy tech.",
            mozilla: "As Co-Secretary of Mozilla Firefox Club, Keshav co-led 100+ member open-source community, ran programming calendar and contributor onboarding. Organized InnovationX hackathon with 250+ participants - handled end-to-end logistics, sponsorships, and judging. Real leadership experience managing technical teams.",
            education: "Currently pursuing B.Tech in Computer Science & Engineering (Data Science specialization) at VIT Vellore with 8.34/10 CGPA. Relevant coursework: Data Structures & Algorithms, Machine Learning, Database Management, Operating Systems, Computer Networks. Google Cloud ML APIs certified, HarvardX ML audited.",
            contact: "Reach Keshav at gujrathikeshav94@gmail.com. Connect on LinkedIn, GitHub, or LeetCode. He's actively seeking ML Engineering and Data Science roles where he can build products that move the needle. Fast, creative, and real impact.",
            default: "Hey! I'm Keshav's digital twin. Ask me about his projects (SafeStreets, Emotion Recognition), technical skills, Mozilla leadership, education, or how to contact him. What interests you most?"
        };
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.chatbotWindow.classList.toggle('active', this.isOpen);
        
        if (this.isOpen) {
            this.inputField.focus();
            // Add slight delay for animation
            setTimeout(() => {
                this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
            }, 300);
        }
    }

    closeChat() {
        this.isOpen = false;
        this.chatbotWindow.classList.remove('active');
    }


    handleQuickAction(action) {
        const response = this.responses[action] || this.responses.default;
        this.addBotMessage(response);
        this.removeQuickActions();
    }

    sendMessage() {
        const message = this.inputField.value.trim();
        if (!message) return;

        this.addUserMessage(message);
        this.inputField.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate thinking time
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addBotMessage(response);
        }, 1000 + Math.random() * 1000);
    }

    generateResponse(userMessage) {
        let response;
        
        if (userMessage.toLowerCase().includes('safestreets') || userMessage.toLowerCase().includes('safe streets')) {
            response = this.responses.safestreets;
        } else if (userMessage.toLowerCase().includes('emotion') || userMessage.toLowerCase().includes('recognition') || userMessage.toLowerCase().includes('cnn')) {
            response = this.responses.emotion;
        } else if (userMessage.toLowerCase().includes('skills') || userMessage.toLowerCase().includes('tech') || userMessage.toLowerCase().includes('tools')) {
            response = this.responses.skills;
        } else if (userMessage.toLowerCase().includes('mozilla') || userMessage.toLowerCase().includes('leadership') || userMessage.toLowerCase().includes('experience')) {
            response = this.responses.mozilla;
        } else if (userMessage.toLowerCase().includes('education') || userMessage.toLowerCase().includes('vit') || userMessage.toLowerCase().includes('college')) {
            response = this.responses.education;
        } else if (userMessage.toLowerCase().includes('contact') || userMessage.toLowerCase().includes('email') || userMessage.toLowerCase().includes('hire')) {
            response = this.responses.contact;
        } else {
            response = this.responses.default;
        }
        
        return response;
    }

    addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <span class="message-avatar">👤</span>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <span class="message-avatar">👾</span>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-message';
        typingDiv.innerHTML = `
            <span class="message-avatar">👾</span>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingMessage = this.messagesContainer.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }

    removeQuickActions() {
        const quickActions = this.messagesContainer.querySelector('.quick-actions');
        if (quickActions) {
            quickActions.style.opacity = '0.5';
            quickActions.style.pointerEvents = 'none';
        }
    }

    scrollToBottom() {
        setTimeout(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }, 100);
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new KeshavChatbot();
});

// Add some extra interactive elements to the main site
document.addEventListener('DOMContentLoaded', () => {
    // Add particle effects on mouse move
    const hookSection = document.querySelector('.hook-section');
    if (hookSection) {
        let particles = [];
        
        hookSection.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.95) { // Only create particles occasionally
                createParticle(e.clientX, e.clientY);
            }
        });
        
        function createParticle(x, y) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 3px;
                height: 3px;
                background: #8b5cf6;
                border-radius: 50%;
                pointer-events: none;
                z-index: 5;
                left: ${x}px;
                top: ${y}px;
                animation: particleFade 2s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
        
        // Add particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFade {
                0% {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) translateY(-50px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add dynamic project number counter
    const projectNumbers = document.querySelectorAll('.case-number');
    projectNumbers.forEach(number => {
        number.addEventListener('mouseenter', () => {
            number.style.transform = 'scale(1.2) rotate(5deg)';
            number.style.color = '#ffffff';
        });
        
        number.addEventListener('mouseleave', () => {
            number.style.transform = 'scale(1) rotate(0deg)';
            number.style.color = '#8b5cf6';
        });
    });
});
