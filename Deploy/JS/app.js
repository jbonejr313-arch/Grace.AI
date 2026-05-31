// js/app.js

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // DOM references
  const chatMessages = document.getElementById('chat-messages');
  const queryInput = document.getElementById('query-input');
  const searchButton = document.getElementById('search-button');
  const suggestionChips = document.querySelectorAll('.suggestion-chip');
  
  // Set up event handlers
  if (searchButton) {
    searchButton.addEventListener('click', handleUserInput);
  }
  
  if (queryInput) {
    queryInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        handleUserInput();
      }
    });
  }
  
  // Set up suggestion chips
  if (suggestionChips) {
    suggestionChips.forEach(chip => {
      chip.addEventListener('click', function() {
        const query = this.getAttribute('data-query');
        if (query && queryInput) {
          queryInput.value = query;
          handleUserInput();
        }
      });
    });
  }
  
  // Initialize theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-theme');
      localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
    
    // Set initial theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }
});

// Add a user message to the chat
function addUserMessage(message) {
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return;
  
  const messageElement = document.createElement('div');
  messageElement.className = 'message user-message';
  messageElement.innerHTML = `
    <div class="message-content">
      <div class="message-text">
        <p>${message}</p>
      </div>
    </div>
  `;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Parse markdown-style formatting from AI responses into clean HTML
function formatResponse(text) {
  // Split into blocks by double newlines
  const blocks = text.split(/\n\n+/);
  let html = '';

  for (let i = 0; i < blocks.length; i++) {
    let block = blocks[i].trim();
    if (!block) continue;

    // Check if this block is a numbered list (lines starting with 1. 2. etc)
    const listLines = block.split('\n').filter(l => l.trim());
    const isNumberedList = listLines.every(l => /^\d+[\.\)]\s/.test(l.trim()));

    if (isNumberedList) {
      html += '<ol class="response-list">';
      for (const line of listLines) {
        const content = line.replace(/^\d+[\.\)]\s*/, '').trim();
        html += '<li>' + inlineFormat(content) + '</li>';
      }
      html += '</ol>';
    }
    // Check if block is a bullet list
    else if (listLines.every(l => /^[\-\*]\s/.test(l.trim()))) {
      html += '<ul class="response-list">';
      for (const line of listLines) {
        const content = line.replace(/^[\-\*]\s*/, '').trim();
        html += '<li>' + inlineFormat(content) + '</li>';
      }
      html += '</ul>';
    }
    // Check if block looks like a Scripture quote (starts with > or ")
    else if (block.startsWith('>')) {
      const quoteText = block.replace(/^>\s*/gm, '');
      html += '<blockquote class="scripture-quote">' + inlineFormat(quoteText) + '</blockquote>';
    }
    // Regular paragraph
    else {
      html += '<p>' + inlineFormat(block.replace(/\n/g, '<br>')) + '</p>';
    }
  }

  return html;
}

// Handle inline formatting: bold, italic, Scripture references
function inlineFormat(text) {
  // Bold: **text** or __text__
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');
  // Italic: *text* or _text_ (but not inside bold markers)
  text = text.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
  // Highlight Scripture references like (Romans 8:28) or (John 3:16-17)
  text = text.replace(/\((\d?\s?[A-Z][a-z]+ \d+:\d+(?:-\d+)?)\)/g, '<span class="verse-ref">($1)</span>');
  return text;
}

// Add an assistant message to the chat
function addAssistantMessage(message) {
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return;

  const messageElement = document.createElement('div');
  messageElement.className = 'message assistant-message';

  const formattedMessage = formatResponse(message);

  messageElement.innerHTML = `
    <div class="message-content">
      <div class="message-text">
        ${formattedMessage}
      </div>
    </div>
  `;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add a loading message
function addLoadingMessage() {
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return null;
  
  const loadingElement = document.createElement('div');
  loadingElement.className = 'message assistant-message loading';
  loadingElement.innerHTML = `
    <div class="message-content">
      <div class="message-text">
        <p>Thinking...</p>
      </div>
    </div>
  `;
  chatMessages.appendChild(loadingElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return loadingElement;
}

// Remove the loading message
function removeLoadingMessage(element) {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

// Handle when user submits a question
async function handleUserInput() {
  const queryInput = document.getElementById('query-input');
  if (!queryInput) return;
  
  // Get user input
  const userInput = queryInput.value.trim();
  
  // Don't proceed if input is empty
  if (!userInput) return;
  
  // Add user message to chat
  addUserMessage(userInput);
  
  // Clear input field
  queryInput.value = '';
  
  // Show loading indicator
  const loadingElement = addLoadingMessage();
  
  try {
    console.log('Processing query:', userInput);
    
    // First try to get a response from the AI
    let response;
    
    // Check if it's a Bible study request
    if (userInput.toLowerCase().includes('study on') || 
        userInput.toLowerCase().includes('create a study')) {
      try {
        // Try AI first
        response = await sendMessageToAI(userInput);
      } catch (aiError) {
        console.error('AI error, falling back to local generation:', aiError);
        // Fall back to local generation if AI fails
        response = generateBibleStudy(userInput);
      }
    } else {
      // For regular questions, use the AI
      response = await sendMessageToAI(userInput);
    }
    
    // Remove loading indicator
    removeLoadingMessage(loadingElement);
    
    // Add AI response to chat
    addAssistantMessage(response);
  } catch (error) {
    console.error('Error processing input:', error);
    
    // Remove loading indicator
    removeLoadingMessage(loadingElement);
    
    // Show error message
    addAssistantMessage("I'm sorry, I couldn't process your request. Please try again.");
  }
}
