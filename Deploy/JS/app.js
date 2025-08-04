// app.js - Main application logic for Grace.AI

document.addEventListener('DOMContentLoaded', function() {
    console.log('Grace.AI is ready to help you explore the Bible!');
    
    // NEW: Initialize Daily Verse
    initializeDailyVerse();
    
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

// Daily Verse System - Reformed Theological Insights
const dailyVerses = [
    {
        text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
        reference: "Romans 8:28",
        insight: "God's sovereignty means nothing is random or meaningless in the believer's life. Even our struggles serve His eternal purposes and our sanctification."
    },
    {
        text: "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast.",
        reference: "Ephesians 2:8-9",
        insight: "Salvation is entirely God's work from start to finish. This truth humbles us and gives us unshakeable assurance—our salvation doesn't depend on our performance."
    },
    {
        text: "Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",
        reference: "Proverbs 3:5-6",
        insight: "Human wisdom is limited and often contradicts God's ways. True wisdom begins with acknowledging our dependence on God's revelation in all decisions."
    },
    {
        text: "The heart is deceitful above all things, and desperately sick; who can understand it?",
        reference: "Jeremiah 17:9",
        insight: "Total depravity reminds us that our hearts naturally deceive us. We need Scripture and the Spirit's guidance, not our feelings, to discern truth."
    },
    {
        text: "No temptation has overtaken you that is not common to man. God is faithful, and he will not let you be tempted beyond your ability, but with the temptation he will also provide the way of escape.",
        reference: "1 Corinthians 10:13",
        insight: "God's sovereignty extends to our temptations. He limits what we face and provides grace sufficient for every trial, proving His faithfulness to His children."
    },
    {
        text: "Come to me, all who labor and are heavy laden, and I will give you rest. Take my yoke upon you, and learn from me, for I am gentle and lowly in heart, and you will find rest for your souls.",
        reference: "Matthew 11:28-29",
        insight: "Christ offers true rest not through easy circumstances, but through union with Him. His yoke represents purposeful discipleship, not burdensome religion."
    },
    {
        text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.' Therefore I will boast all the more gladly of my weaknesses, so that the power of Christ may rest upon me.",
        reference: "2 Corinthians 12:9",
        insight: "God often works through our weaknesses rather than despite them. Our limitations become opportunities for His grace to be displayed more clearly."
    },
    {
        text: "For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers, nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord.",
        reference: "Romans 8:38-39",
        insight: "The perseverance of the saints is grounded in God's unchanging love. Nothing can sever the union between Christ and His people because God holds us fast."
    },
    {
        text: "All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness, that the man of God may be complete, equipped for every good work.",
        reference: "2 Timothy 3:16-17",
        insight: "Scripture's authority comes from God Himself. It is sufficient to equip believers for life and godliness, making human tradition secondary to God's revealed Word."
    },
    {
        text: "Count it all joy, my brothers, when you meet trials of various kinds, for you know that the testing of your faith produces steadfastness.",
        reference: "James 1:2-3",
        insight: "Trials aren't punishments but instruments of sanctification. God uses difficulties to strengthen our faith and conform us to Christ's image."
    },
    {
        text: "The Lord your God is in your midst, a mighty one who will save; he will rejoice over you with gladness; he will quiet you by his love; he will exult over you with loud singing.",
        reference: "Zephaniah 3:17",
        insight: "God doesn't merely tolerate us—He delights in His children. Understanding His joy over us transforms how we view our relationship with Him."
    },
    {
        text: "Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come.",
        reference: "2 Corinthians 5:17",
        insight: "Union with Christ fundamentally changes our identity. We're not just forgiven; we're made new. This reality should shape how we see ourselves and live."
    },
    {
        text: "And my God will supply every need of yours according to his riches in glory in Christ Jesus.",
        reference: "Philippians 4:19",
        insight: "God's provision is guaranteed not because of our faith's strength, but because of Christ's finished work. His resources are infinite and available to His children."
    },
    {
        text: "Be anxious for nothing, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.",
        reference: "Philippians 4:6-7",
        insight: "Anxiety is conquered not by positive thinking but by prayer rooted in God's sovereignty. His peace guards us because He controls all circumstances."
    },
    {
        text: "For we are his workmanship, created in Christ Jesus for good works, which God prepared beforehand, that we should walk in them.",
        reference: "Ephesians 2:10",
        insight: "Our good works don't earn salvation but flow from it. God has sovereignly prepared specific works for each believer, giving purpose to our lives."
    },
    {
        text: "But seek first the kingdom of God and his righteousness, and all these things will be added to you.",
        reference: "Matthew 6:33",
        insight: "Priority determines provision. When God's kingdom comes first, He ensures our needs are met according to His perfect wisdom and timing."
    },
    {
        text: "The name of the Lord is a strong tower; the righteous man runs into it and is safe.",
        reference: "Proverbs 18:10",
        insight: "True security is found in God's character, not circumstances. His name represents His unchanging attributes—our ultimate refuge in every storm."
    },
    {
        text: "I can do all things through him who strengthens me.",
        reference: "Philippians 4:13",
        insight: "This isn't about personal empowerment but about Christ's strength enabling us to be content in all circumstances, whether abundance or need."
    },
    {
        text: "He must increase, but I must decrease.",
        reference: "John 3:30",
        insight: "True joy comes from making much of Christ, not ourselves. As He becomes more central, our ego-driven anxieties naturally diminish."
    },
    {
        text: "The grass withers, the flower fades, but the word of our God will stand forever.",
        reference: "Isaiah 40:8",
        insight: "In a world of constant change, Scripture remains our unchanging foundation. Human philosophies fade, but God's truth endures eternally."
    },
    {
        text: "For my thoughts are not your thoughts, neither are your ways my ways, declares the Lord. For as the heavens are higher than the earth, so are my ways higher than your ways and my thoughts than your thoughts.",
        reference: "Isaiah 55:8-9",
        insight: "God's ways often perplex us because His wisdom infinitely exceeds ours. Trusting Him means accepting His mysterious but perfect providence."
    },
    {
        text: "The Lord is my shepherd; I shall not want.",
        reference: "Psalm 23:1",
        insight: "Christ as our shepherd ensures we lack nothing truly necessary. This isn't material prosperity but spiritual sufficiency under His loving care."
    },
    {
        text: "Commit your way to the Lord; trust in him, and he will act.",
        reference: "Psalm 37:5",
        insight: "True commitment involves surrendering control to God's sovereignty. When we trust His timing and methods, He works on our behalf in perfect ways."
    },
    {
        text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
        reference: "John 3:16",
        insight: "The gospel's heart is God's initiating love, not human decision. God's love motivated the gift of His Son, demonstrating grace beyond our comprehension."
    },
    {
        text: "The fear of the Lord is the beginning of wisdom, and the knowledge of the Holy One is insight.",
        reference: "Proverbs 9:10",
        insight: "True wisdom starts with proper reverence for God's holiness and sovereignty. Without this foundation, all human knowledge lacks proper perspective."
    },
    {
        text: "Casting all your anxieties on him, because he cares for you.",
        reference: "1 Peter 5:7",
        insight: "God's care isn't just sentimental—it's based on His covenant commitment to His people. We can cast our burdens because He's strong enough to bear them."
    },
    {
        text: "And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
        reference: "Romans 8:28",
        insight: "This promise belongs specifically to those called by God. His sovereignty ensures that even sin and suffering serve His ultimate good purposes."
    },
    {
        text: "The Lord will fight for you, and you have only to be silent.",
        reference: "Exodus 14:14",
        insight: "Sometimes our role is simply to trust and wait while God works. His power doesn't need our anxiety or striving—just our faith and obedience."
    },
    {
        text: "In their hearts humans plan their course, but the Lord establishes their steps.",
        reference: "Proverbs 16:9",
        insight: "We make plans, but God's sovereignty ultimately determines outcomes. This truth should humble our planning while encouraging our dependence on Him."
    },
    {
        text: "Greater love has no one than this, that someone lay down his life for his friends.",
        reference: "John 15:13",
        insight: "Christ's sacrificial love sets the standard for true love. His death wasn't just an example but the atoning sacrifice that makes our love for others possible."
    },
    {
        text: "Be still, and know that I am God. I will be exalted among the nations, I will be exalted in the earth!",
        reference: "Psalm 46:10",
        insight: "In our activist culture, sometimes the most faithful response is quiet trust in God's sovereignty. His exaltation is certain regardless of circumstances."
    }
];

// Daily Verse Functions
function initializeDailyVerse() {
    const today = new Date();
    const verseIndex = getDayOfYear(today) % dailyVerses.length;
    const todaysVerse = dailyVerses[verseIndex];
    
    displayDailyVerse(todaysVerse, today);
    setupVerseSharing(todaysVerse);
}

function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function displayDailyVerse(verse, date) {
    const dateElement = document.getElementById('verse-date');
    const textElement = document.getElementById('verse-text');
    const referenceElement = document.getElementById('verse-reference');
    const insightElement = document.getElementById('verse-insight');
    
    if (dateElement) {
        dateElement.textContent = formatDate(date);
    }
    
    if (textElement) {
        textElement.textContent = verse.text;
    }
    
    if (referenceElement) {
        referenceElement.textContent = verse.reference;
    }
    
    if (insightElement) {
        insightElement.textContent = verse.insight;
    }
}

function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

function setupVerseSharing(verse) {
    const shareBtn = document.getElementById('verse-share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            const shareText = `${verse.text}\n\n— ${verse.reference}\n\n💡 ${verse.insight}\n\n🔗 graceai.live`;
            
            if (navigator.share) {
                navigator.share({
                    title: `Today's Verse - ${verse.reference}`,
                    text: shareText,
                    url: 'https://graceai.live'
                }).catch(err => {
                    console.error('Error sharing:', err);
                });
            } else {
                // Fallback: Copy to clipboard
                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(shareText).then(() => {
                        showVerseShareSuccess(shareBtn);
                    });
                } else {
                    fallbackCopy(shareText, shareBtn);
                }
            }
        });
    }
}

function showVerseShareSuccess(button) {
    const originalText = button.innerHTML;
    button.classList.add('copied');
    button.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
        Shared!
    `;
    
    setTimeout(() => {
        button.classList.remove('copied');
        button.innerHTML = originalText;
    }, 2000);
}

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

// UPDATED: Enhanced addAssistantMessage function with copy/share buttons
function addAssistantMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-text">${message}</div>
            <div class="message-actions">
                <button class="action-btn copy-btn" onclick="copyResponse(this)" title="Copy response">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="m5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy
                </button>
                <button class="action-btn share-btn" onclick="shareResponse(this)" title="Share response">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                        <polyline points="16,6 12,2 8,6"></polyline>
                        <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                    Share
                </button>
            </div>
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

// Copy response function
function copyResponse(button) {
    const messageText = button.closest('.message-content').querySelector('.message-text');
    const textToCopy = messageText.innerText || messageText.textContent;
    
    // Use the modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showCopySuccess(button);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            fallbackCopy(textToCopy, button);
        });
    } else {
        // Fallback for older browsers
        fallbackCopy(textToCopy, button);
    }
}

// Fallback copy method
function fallbackCopy(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess(button);
    } catch (err) {
        console.error('Fallback copy failed: ', err);
    } finally {
        document.body.removeChild(textArea);
    }
}

// Show copy success feedback
function showCopySuccess(button) {
    const originalText = button.innerHTML;
    button.classList.add('copied');
    button.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
        Copied!
    `;
    
    setTimeout(() => {
        button.classList.remove('copied');
        button.innerHTML = originalText;
    }, 2000);
}

// Share response function
function shareResponse(button) {
    const messageText = button.closest('.message-content').querySelector('.message-text');
    const textToShare = messageText.innerText || messageText.textContent;
    const shareText = `Grace.AI Biblical Insight:\n\n${textToShare}\n\n🔗 graceai.live`;
    
    // Check if Web Share API is supported
    if (navigator.share) {
        navigator.share({
            title: 'Grace.AI Biblical Insight',
            text: shareText,
            url: 'https://graceai.live'
        }).catch(err => {
            console.error('Error sharing:', err);
        });
    } else {
        // Fallback: Copy share text to clipboard
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(shareText).then(() => {
                showShareSuccess(button);
            });
        } else {
            fallbackCopy(shareText, button);
        }
    }
}

// Show share success feedback
function showShareSuccess(button) {
    const originalText = button.innerHTML;
    button.classList.add('copied');
    button.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
        Copied!
    `;
    
    setTimeout(() => {
        button.classList.remove('copied');
        button.innerHTML = originalText;
    }, 2000);
}

