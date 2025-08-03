function simulateBibleStudy(topic, audience) {
    // Clean up the topic parsing
    let cleanTopic = topic.toLowerCase()
        .replace('create', '')
        .replace('for me', '')
        .replace('a study on', '')
        .replace('study on', '')
        .replace('the book of', '')
        .replace('about', '')
        .trim();
    
    // Reformed/Presbyterian-focused studies for young adults
    const studies = {
        'calling': {
            title: 'Discovering Your Calling: Vocation in God\'s Kingdom',
            introduction: 'Your career isn\'t just a job—it\'s part of God\'s sovereign plan. Understanding biblical vocation helps us see work as worship and find purpose in God\'s calling.',
            sections: [
                {
                    title: 'The Doctrine of Vocation',
                    verses: ['1 Corinthians 7:17', 'Ephesians 2:10', 'Colossians 3:23-24'],
                    discussion: 'Reformed theology teaches that God sovereignly calls us to specific roles. How does understanding predestination and God\'s eternal decree affect how we view career decisions?'
                },
                {
                    title: 'Work as Worship and Cultural Mandate',
                    verses: ['Genesis 1:28', 'Genesis 2:15', '1 Corinthians 10:31'],
                    discussion: 'The cultural mandate calls us to cultivate creation for God\'s glory. How can your field of study or career serve as a means of grace and kingdom advancement?'
                },
                {
                    title: 'Wisdom in Decision Making',
                    verses: ['Proverbs 16:9', 'James 1:5', 'Psalm 32:8'],
                    discussion: 'How do we balance seeking God\'s will with using the wisdom and abilities He\'s given us? What role do circumstances, counsel, and Scripture play?'
                }
            ],
            questions: [
                'How does the doctrine of God\'s sovereignty comfort you in uncertain career decisions?',
                'What unique gifts and passions has God given you, and how might these point to His calling?',
                'How can you glorify God and serve others through your future profession?',
                'What\'s the difference between a secular view of success and a biblical understanding of faithful stewardship?'
            ]
        },
        'relationships': {
            title: 'Biblical Dating and Relationships: Covenant Love in Practice',
            introduction: 'In a culture of casual dating and hookup culture, Scripture offers a better way. Understanding covenant love, biblical masculinity and femininity, and marriage as a picture of Christ and the church.',
            sections: [
                {
                    title: 'The Purpose of Dating and Marriage',
                    verses: ['Ephesians 5:22-33', 'Genesis 2:18-25', '1 Corinthians 7:1-9'],
                    discussion: 'Marriage reflects the covenant relationship between Christ and His church. How should this understanding shape dating relationships and expectations?'
                },
                {
                    title: 'Purity and Boundaries',
                    verses: ['1 Thessalonians 4:3-8', '1 Corinthians 6:18-20', 'Hebrews 13:4'],
                    discussion: 'Sexual purity isn\'t just about rules—it\'s about honoring God with our bodies and preserving the sanctity of marriage. How do we set healthy boundaries?'
                },
                {
                    title: 'Biblical Manhood and Womanhood',
                    verses: ['Ephesians 5:25-28', 'Titus 2:3-5', '1 Peter 3:1-7'],
                    discussion: 'Complementarianism teaches that men and women are equal in dignity but distinct in roles. How does this apply to dating and future marriage?'
                }
            ],
            questions: [
                'How does understanding marriage as a covenant (not just a contract) change your approach to dating?',
                'What are practical ways to honor God in romantic relationships while in college?',
                'How can you prepare now for potential future marriage, even while single?',
                'What role should parents, pastors, and mature believers play in relationship decisions?'
            ]
        },
        'doubt': {
            title: 'Faith and Doubt: Intellectual Integrity in Belief',
            introduction: 'College often brings intellectual challenges to faith. Rather than avoiding questions, Reformed theology provides robust answers rooted in Scripture\'s authority and the Spirit\'s witness.',
            sections: [
                {
                    title: 'The Nature of Faith',
                    verses: ['Hebrews 11:1', 'Romans 1:16-17', '2 Corinthians 5:7'],
                    discussion: 'Faith isn\'t blind belief—it\'s confident trust based on God\'s revealed truth. How do we distinguish between reasonable doubt and sinful unbelief?'
                },
                {
                    title: 'Scripture\'s Authority and Sufficiency',
                    verses: ['2 Timothy 3:16-17', 'Psalm 119:160', 'Isaiah 55:10-11'],
                    discussion: 'The doctrine of sola scriptura means Scripture is our ultimate authority. How does biblical inerrancy provide certainty in an uncertain world?'
                },
                {
                    title: 'Apologetics and Reason',
                    verses: ['1 Peter 3:15', 'Romans 1:19-20', 'Acts 17:22-31'],
                    discussion: 'We\'re called to give reasons for our hope. How do we engage intellectual challenges while maintaining that the Spirit must open hearts?'
                }
            ],
            questions: [
                'What intellectual challenges to faith have you encountered, and how has Scripture addressed them?',
                'How do you balance honest questioning with submission to God\'s revealed truth?',
                'What role does the Holy Spirit play in giving assurance of faith?',
                'How can studying theology and apologetics strengthen rather than weaken faith?'
            ]
        },
        'purpose': {
            title: 'Identity and Purpose: Finding Yourself in Christ',
            introduction: 'In a world obsessed with self-actualization, Scripture reveals our true identity as image-bearers redeemed by grace. Our purpose flows from who we are in Christ.',
            sections: [
                {
                    title: 'Image of God and Human Dignity',
                    verses: ['Genesis 1:27', 'Psalm 8:3-6', 'James 3:9'],
                    discussion: 'Every person bears God\'s image, giving inherent dignity and worth. How does this truth address questions of identity and self-worth?'
                },
                {
                    title: 'Union with Christ',
                    verses: ['Romans 6:1-11', 'Galatians 2:20', 'Ephesians 1:3-14'],
                    discussion: 'Our primary identity is found "in Christ." How does union with Christ provide security that performance, achievements, or relationships cannot?'
                },
                {
                    title: 'Sanctification and Growth',
                    verses: ['Philippians 1:6', '2 Corinthians 3:18', 'Romans 8:28-29'],
                    discussion: 'God is conforming us to Christ\'s image through all circumstances. How does understanding sanctification give purpose to both victories and struggles?'
                }
            ],
            questions: [
                'How does being "in Christ" change how you view success, failure, and identity?',
                'What worldly identities or achievements are you tempted to find security in?',
                'How can understanding your eternal purpose help with present anxiety and uncertainty?',
                'What does it mean practically to "seek first the kingdom of God" in college/early career?'
            ]
        },
        'money': {
            title: 'Biblical Stewardship: Money, Debt, and Generosity',
            introduction: 'College debt, career choices, and financial pressure create anxiety. Scripture provides wisdom for faithful stewardship that honors God and serves others.',
            sections: [
                {
                    title: 'Stewardship vs. Ownership',
                    verses: ['Psalm 24:1', '1 Chronicles 29:11-14', 'Luke 16:10-13'],
                    discussion: 'Everything belongs to God—we\'re stewards, not owners. How does this perspective change our approach to money, possessions, and financial decisions?'
                },
                {
                    title: 'Contentment and Provision',
                    verses: ['Philippians 4:11-13', '1 Timothy 6:6-10', 'Matthew 6:25-34'],
                    discussion: 'Contentment comes from trusting God\'s sovereign provision. How do we balance responsible planning with faith in God\'s care?'
                },
                {
                    title: 'Generosity and Justice',
                    verses: ['2 Corinthians 9:6-15', 'Proverbs 19:17', 'Deuteronomy 15:7-11'],
                    discussion: 'Generous giving reflects God\'s grace to us. How can students practice generosity even with limited resources?'
                }
            ],
            questions: [
                'How do you balance wise financial planning with trust in God\'s provision?',
                'What does faithful stewardship look like for a college student or young professional?',
                'How should considerations of salary and financial security factor into career decisions?',
                'What are practical ways to cultivate contentment in a materialistic culture?'
            ]
        },
        'anxiety': {
            title: 'Anxiety and Mental Health: Finding Peace in God\'s Sovereignty',
            introduction: 'Anxiety affects many young adults. While affirming the value of professional help, Scripture provides ultimate hope through understanding God\'s character and promises.',
            sections: [
                {
                    title: 'The Sovereignty of God',
                    verses: ['Romans 8:28', 'Ephesians 1:11', 'Proverbs 16:9'],
                    discussion: 'God ordains all things for His glory and our good. How does trusting in divine sovereignty provide comfort during anxious seasons?'
                },
                {
                    title: 'Cast Your Cares',
                    verses: ['1 Peter 5:7', 'Philippians 4:6-7', 'Psalm 55:22'],
                    discussion: 'We\'re commanded to bring our anxieties to God in prayer. How do we practically "cast our cares" while taking responsible action?'
                },
                {
                    title: 'Renewing the Mind',
                    verses: ['Romans 12:2', 'Philippians 4:8', '2 Corinthians 10:5'],
                    discussion: 'Anxiety often involves distorted thinking. How does Scripture help us evaluate and replace anxious thoughts with truth?'
                }
            ],
            questions: [
                'What specific anxieties do you face, and how do God\'s promises address them?',
                'How do you balance trusting God with taking practical steps for mental health?',
                'What role does Christian community play in supporting those struggling with anxiety?',
                'How can understanding God\'s love and sovereignty provide peace in uncertain times?'
            ]
        }
    };
    
    // Get the appropriate study or create a generic one
    const study = studies[cleanTopic] || {
        title: `${cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1)}: A Reformed Perspective`,
        introduction: `This study explores what Scripture teaches about ${cleanTopic} from a Reformed theological perspective, emphasizing God's sovereignty, Scripture's authority, and salvation by grace alone.`,
        sections: [
            {
                title: 'Biblical Foundation',
                verses: ['Psalm 119:105', '2 Timothy 3:16-17', 'Romans 11:33-36'],
                discussion: `How does Reformed theology help us understand ${cleanTopic} in light of God's sovereignty and Scripture's sufficiency?`
            },
            {
                title: 'Practical Application',
                verses: ['James 1:22-25', 'Romans 12:1-2', 'Colossians 3:17'],
                discussion: `How do we live out biblical principles regarding ${cleanTopic} in a way that glorifies God and serves others?`
            }
        ],
        questions: [
            `How does understanding God's sovereignty change your perspective on ${cleanTopic}?`,
            `What does Scripture clearly teach about ${cleanTopic}, and where do we need wisdom?`,
            `How can you grow in faithfulness regarding ${cleanTopic} through Scripture, prayer, and Christian community?`
        ]
    };
    
    return {
        ...study,
        audience: audience,
        conclusion: `As Reformed believers, we find our hope not in ourselves but in God's sovereign grace. May studying His Word deepen your faith and equip you to live faithfully in every area of life, including ${cleanTopic}.`
    };
}

// Function to send message to AI - NOW WITH REAL GEMINI INTEGRATION!
async function sendMessageToAI(message) {
    try {
        const response = await fetch('/.netlify/functions/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        return data.message;
    } catch (error) {
        console.error('Error sending message to AI:', error);
        return "I'm sorry, I'm having trouble connecting to the AI service right now. Please try again in a moment.";
    }
}

