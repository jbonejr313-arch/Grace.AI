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
        const verseData = await fetchBibleVerse(reference);
        displayVerse(verseData);
    } catch (error) {
        showError('Sorry, we could not find that verse. Please check the reference and try again.');
    }
}

async function handleExplanationQuery(reference, question) {
    try {
        const verseData = await fetchBibleVerse(reference);
        const passage = verseData.data.passages[0].text;
        const aiExplanation = await getAIExplanation(passage, question);
        
        displayVerseWithExplanation(verseData, aiExplanation);
    } catch (error) {
        showError('Sorry, we could not generate an explanation. Please try a different query.');
    }
}

async function handleStudyQuery(topic) {
    try {
        const studyData = await createBibleStudy(topic);
        displayBibleStudy(studyData);
    } catch (error) {
        showError('Sorry, we could not create a study on that topic. Please try again.');
    }
}
// Change your existing message handling to use the new AI function
// Replace code that currently shows error messages with this:

const loadingElement = addLoadingMessage();

try {
  // Get AI response - this is the key new line
  const aiResponse = await sendMessageToAI(userInput);
  
  // Remove loading indicator
  removeLoadingMessage(loadingElement);
  
  // Add AI response to chat
  addAssistantMessage(aiResponse);
} catch (error) {
  // Remove loading indicator
  removeLoadingMessage(loadingElement);
  
  // Show error message
  addAssistantMessage("I'm sorry, I couldn't process your request. Please try again.");
}