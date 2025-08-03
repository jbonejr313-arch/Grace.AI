// app.js - Main application logic for Grace.AI

document.addEventListener('DOMContentLoaded', function() {
    console.log('Grace.AI is ready to help you explore the Bible!');
    
    const searchInput = document.getElementById('query-input');
    const searchButton = document.getElementById('search-button');
    const themeToggle = document.getElementById('theme-toggle');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    
    // Theme toggle functionality
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const themeIcon = themeToggle.querySelector('.theme-icon');
        // For SVG icon, we don't need to change the content, just the styles
    }
    
    // Suggestion chips
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const query = this.getAttribute('data-query');
            searchInput.value = query;
            handleSearch();
        });
    });
    
    // Search functionality
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });
});

async function handleSearch() {
    const searchInput = document.getElementById('query-input');
    const query = searchInput.value.trim();
    
    if (!query) {
        showError('Please enter a verse reference, topic, or question.');
        return;
    }
    
    // Add user message to chat
    addUserMessage(query);
    
    // Clear input
    searchInput.value = '';
    
    // Show loading state
    setLoading(true);
    
    try {
        const intent = analyzeQuery(query);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        switch (intent.type) {
            case 'verse':
                await handleVerseQuery(intent.reference);
                break;
            case 'explanation':
                await handleExplanationQuery(intent.reference, intent.question);
                break;
            case 'study':
                await handleStudyQuery(intent.topic);
                break;
            default:
                await handleExplanationQuery(query, '');
        }
    } catch (error) {
        console.error('Error processing query:', error);
        showError('Sorry, we encountered an error processing your request. Please try again.');
    } finally {
        setLoading(false);
    }
}

function addUserMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-text">${message}</div>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function analyzeQuery(query) {
    query = query.toLowerCase();
    
    if (query.includes('john 3:16')) {
        return {
            type: 'verse',
            reference: 'John 3:16'
        };
    }
    
    if (query.includes('explain') && query.includes('john 3:16')) {
        return {
            type: 'explanation',
            reference: 'John 3:16',
            question: query.replace('explain', '').replace('john 3:16', '').trim()
        };
    }
    
    if (query.includes('create') && query.includes('study')) {
        const topic = query.replace('create', '').replace('a study on', '').replace('study', '').trim();
        return {
            type: 'study',
            topic: topic || 'faith'
        };
    }
    
    const studyTopics = ['calling', 'relationships', 'doubt', 'purpose', 'money', 'anxiety', 'love', 'faith', 'hope', 'prayer', 'forgiveness', 'grace', 'salvation', 'peace', 'joy', 'wisdom'];
    for (let topic of studyTopics) {
        if (query.includes(topic) && (query.includes('study') || query.includes('what does the bible say'))) {
            return {
                type: 'study',
                topic: topic
            };
        }
    }
    
    if (query.includes('what does the bible say about')) {
        const topic = query.replace('what does the bible say about', '').trim();
        return {
            type: 'study',
            topic: topic
        };
    }
    
    return {
        type: 'explanation',
        reference: query,
        question: ''
    };
}

async function handleVerseQuery(reference) {
    try {
        // For now, we'll use a placeholder since we don't have the Bible API set up
        const verseData = {
            reference: reference,
            text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
        };
        displayVerse(verseData);
    } catch (error) {
        showError('Sorry, we could not find that verse. Please check the reference and try again.');
    }
}

async function handleExplanationQuery(reference, question) {
    try {
        // Use our AI function for explanations
        const aiResponse = await sendMessageToAI(`Please explain ${reference}${question ? ': ' + question : ''}`);
        addAssistantMessage(aiResponse);
    } catch (error) {
        showError('Sorry, we could not generate an explanation. Please try a different query.');
    }
}

async function handleStudyQuery(topic) {
    try {
        const studyData = simulateBibleStudy(topic, 'young adults');
        displayBibleStudy(studyData);
    } catch (error) {
        showError('Sorry, we could not create a study on that topic. Please try again.');
    }
}

function displayVerse(verseData) {
    const verseHtml = `
        <div class="bible-verse">
            <h3>${verseData.reference}</h3>
            <p class="verse-text">"${verseData.text}"</p>
        </div>
    `;
    addAssistantMessage(verseHtml);
}

function displayVerseWithExplanation(verseData, explanation) {
    const contentHtml = `
        <div class="bible-verse">
            <h3>${verseData.reference}</h3>
            <p class="verse-text">"${verseData.text}"</p>
            <div class="explanation">
                <h4>Explanation:</h4>
                <p>${explanation}</p>
            </div>
        </div>
    `;
    addAssistantMessage(contentHtml);
}

function displayBibleStudy(study) {
    const studyHtml = `
        <div class="bible-study">
            <h3>${study.title}</h3>
            <p><strong>Introduction:</strong> ${study.introduction}</p>
            
            ${study.sections.map(section => `
                <div class="study-section">
                    <h4>${section.title}</h4>
                    <p><strong>Key Verses:</strong> ${section.verses.join(', ')}</p>
                    <p><strong>Discussion:</strong> ${section.discussion}</p>
                </div>
            `).join('')}
            
            <div class="study-questions">
                <h4>Discussion Questions:</h4>
                <ul>
                    ${study.questions.map(q => `<li>${q}</li>`).join('')}
                </ul>
            </div>
            
            ${study.conclusion ? `<p><strong>Conclusion:</strong> ${study.conclusion}</p>` : ''}
        </div>
    `;
    
    addAssistantMessage(studyHtml);
}

function addAssistantMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-text">${message}</div>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addLoadingMessage() {
    const chatMessages = document.getElementById('chat-messages');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message assistant-message loading';
    loadingDiv.id = 'loading-message';
    loadingDiv.innerHTML = `
        <div class="message-content">
            <div class="message-text">Thinking...</div>
        </div>
    `;
    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return loadingDiv;
}

function removeLoadingMessage(loadingDiv) {
    if (loadingDiv && loadingDiv.parentNode) {
        loadingDiv.parentNode.removeChild(loadingDiv);
    }
}

function setLoading(isLoading) {
    if (isLoading) {
        addLoadingMessage();
    } else {
        const loadingMessage = document.getElementById('loading-message');
        if (loadingMessage) {
            removeLoadingMessage(loadingMessage);
        }
    }
}

function showError(message) {
    addAssistantMessage(`<div class="error-message">⚠️ ${message}</div>`);
}

// Additional helper function for creating Bible studies
function createBibleStudy(topic) {
    return simulateBibleStudy(topic, 'young adults');
}

// Function to get AI explanation (placeholder for now)
async function getAIExplanation(passage, question) {
    try {
        const prompt = question 
            ? `Please explain this Bible passage in context of the question: "${question}". Passage: ${passage}`
            : `Please provide a theological explanation of this Bible passage: ${passage}`;
        
        return await sendMessageToAI(prompt);
    } catch (error) {
        return "I'm sorry, I couldn't generate an explanation at this time. Please try again later.";
    }
}

// Function to fetch Bible verse (placeholder for now)
async function fetchBibleVerse(reference) {
    // This would normally call a Bible API
    // For now, return a placeholder structure
    return {
        data: {
            passages: [{
                text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life. (John 3:16)"
            }]
        },
        reference: reference
    };
}
