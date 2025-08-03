// ui.js - Advanced UI helper functions for Grace.AI
// Provides sophisticated message rendering with animations and advanced styling

/**
 * Displays a Bible verse with elegant styling
 * @param {Object} verseData - The verse data from the Bible API
 */
function displayVerse(verseData) {
    const chatMessages = document.getElementById('chat-messages');
    const passage = verseData.data.passages[0];
    
    // Remove loading indicator
    removeLoadingIndicator();
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant-message slide-up';
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-text">
                <p>Here's the verse you requested:</p>
                <div class="verse-container">
                    <h3 class="verse-reference">${passage.reference}</h3>
                    <div class="verse-text">"${passage.text}"</div>
                    <div class="verse-translation">ESV Translation</div>
                </div>
                <p class="message-detail">You can ask me to explain this passage or request a study on a related topic.</p>
            </div>
        </div>
    `;
    
    // Add to chat and scroll
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

/**
 * Displays a verse with comprehensive theological explanation
 * @param {Object} verseData - The verse data from the API
 * @param {Object} aiData - The AI-generated explanation data
 */
function displayVerseWithExplanation(verseData, aiData) {
    const chatMessages = document.getElementById('chat-messages');
    const passage = verseData.data.passages[0];
    
    // Remove loading indicator
    removeLoadingIndicator();
    
    // Create message element with advanced styling
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant-message slide-up';
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-text">
                <div class="verse-container">
                    <h3 class="verse-reference">${passage.reference}</h3>
                    <div class="verse-text">"${passage.text}"</div>
                    <div class="verse-translation">ESV Translation</div>
                    
                    <div class="explanation-container">
                        <div class="explanation-section">
                            <h4><span class="icon">📖</span> Explanation</h4>
                            <p>${aiData.explanation}</p>
                        </div>
                        
                        <div class="explanation-section">
                            <h4><span class="icon">🏛️</span> Historical & Biblical Context</h4>
                            <p>${aiData.context}</p>
                        </div>
                        
                        <div class="explanation-section">
                            <h4><span class="icon">💡</span> Application</h4>
                            <p>${aiData.application}</p>
                        </div>
                    </div>
                </div>
                <div class="message-footer">
                    <p class="message-detail">This explanation is provided from a Reformed theological perspective.</p>
                </div>
            </div>
        </div>
    `;
    
    // Add to chat and scroll
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    
    // Add hover effects to sections
    const sections = messageDiv.querySelectorAll('.explanation-section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 16px var(--shadow)';
        });
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

/**
 * Displays a comprehensive Bible study with interactive elements
 * @param {Object} studyData - The generated Bible study data
 */
function displayBibleStudy(studyData) {
    const chatMessages = document.getElementById('chat-messages');
    
    // Remove loading indicator
    removeLoadingIndicator();
    
    // Create the study sections HTML with advanced formatting
    const sectionsHtml = studyData.sections.map((section, index) => {
        return `
            <div class="study-section" id="section-${index}">
                <h4><span class="section-number">${index + 1}</span> ${section.title}</h4>
                <div class="study-verses">
                    <span class="verses-label">📚 Key Verses:</span> ${section.verses.join(', ')}
                </div>
                <p>${section.discussion}</p>
            </div>
        `;
    }).join('');
    
    // Create the questions HTML with numbering
    const questionsHtml = studyData.questions.map((question, index) => {
        return `<li>${question}</li>`;
    }).join('');
    
    // Assemble the complete study HTML with enhanced styling
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant-message slide-up';
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-text">
                <div class="study-container">
                    <h3 class="study-title">📝 ${studyData.title}</h3>
                    <p class="study-audience">Prepared for: <span>${studyData.audience}</span></p>
                    
                    <div class="study-introduction">
                        <h4>Introduction</h4>
                        <p>${studyData.introduction}</p>
                    </div>
                    
                    <div class="study-sections">
                        ${sectionsHtml}
                    </div>
                    
                    <div class="study-questions">
                        <h4>Discussion Questions</h4>
                        <ol>${questionsHtml}</ol>
                    </div>
                    
                    <div class="study-conclusion">
                        <h4>Conclusion</h4>
                        <p>${studyData.conclusion}</p>
                    </div>
                </div>
                <div class="message-footer">
                    <p class="message-detail">This study is crafted from a Reformed theological perspective.</p>
                </div>
            </div>
        </div>
    `;
    
    // Add to chat and scroll
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    
    // Add interactive elements
    const sections = messageDiv.querySelectorAll('.study-section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 16px var(--shadow)';
            this.style.borderLeftWidth = '5px';
        });
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            this.style.borderLeftWidth = '3px';
        });
    });
}

/**
 * Displays a sophisticated loading indicator with animated dots
 * @param {boolean} isLoading - Whether to show or hide the loading state
 */
function setLoading(isLoading) {
    if (isLoading) {
        const chatMessages = document.getElementById('chat-messages');
        
        // Create elegant loading message
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message assistant-message fade-in';
        loadingDiv.id = 'loading-message';
        loadingDiv.innerHTML = `
            <div class="message-content">
                <div class="loading-container">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                    <div>Searching Scripture and consulting theology...</div>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(loadingDiv);
        scrollToBottom();
    } else {
        removeLoadingIndicator();
    }
}

/**
 * Removes the loading indicator if it exists
 */
function removeLoadingIndicator() {
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
        loadingMessage.classList.add('fade-out');
        setTimeout(() => {
            if (loadingMessage.parentNode) {
                loadingMessage.parentNode.removeChild(loadingMessage);
            }
        }, 300);
    }
}

/**
 * Displays a professionally styled error message
 * @param {string} message - The error message to display
 */
function showError(message) {
    const chatMessages = document.getElementById('chat-messages');
    
    // Remove loading indicator if it exists
    removeLoadingIndicator();
    
    // Create error message with warning styling
    const errorDiv = document.createElement('div');
    errorDiv.className = 'message assistant-message slide-up';
    errorDiv.innerHTML = `
        <div class="message-content">
            <div class="message-text">
                <div class="error-container">
                    <div class="error-icon">⚠️</div>
                    <div class="error-message">${message}</div>
                </div>
                <p class="message-detail">Try searching for "John 3:16" or requesting a study on "faith", "calling", "relationships", "doubt", "purpose", "anxiety" or "money" to see a demonstration.</p>
            </div>
        </div>
    `;
    
    // Add styling
    const errorContainer = errorDiv.querySelector('.error-container');
    errorContainer.style.padding = '1rem';
    errorContainer.style.backgroundColor = 'rgba(225, 29, 72, 0.1)';
    errorContainer.style.borderRadius = '8px';
    errorContainer.style.display = 'flex';
    errorContainer.style.alignItems = 'center';
    errorContainer.style.gap = '0.8rem';
    
    const errorIcon = errorDiv.querySelector('.error-icon');
    errorIcon.style.fontSize = '1.3rem';
    
    const errorMessage = errorDiv.querySelector('.error-message');
    errorMessage.style.fontWeight = '500';
    errorMessage.style.color = '#e11d48';
    
    // Add to chat and scroll
    chatMessages.appendChild(errorDiv);
    scrollToBottom();
}

/**
 * Smoothly scrolls the chat container to the bottom
 * Uses a throttled approach for performance
 */
function scrollToBottom() {
    // Use requestAnimationFrame for smooth scrolling
    requestAnimationFrame(() => {
        const chatContainer = document.querySelector('.chat-container');
        const scrollHeight = chatContainer.scrollHeight;
        
        // Smooth scroll behavior
        chatContainer.scrollTo({
            top: scrollHeight,
            behavior: 'smooth'
        });
    });
}

/**
 * Add CSS animations to the message
 * @param {HTMLElement} element - The element to animate
 */
function animateElement(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(10px)';
    
    // Trigger animation
    setTimeout(() => {
        element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100);
}