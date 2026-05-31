// js/api.js

/**
 * Function to send user message to the AI and get a response.
 * This uses the serverless function to connect to Google Gemini AI.
 */
async function sendMessageToAI(message) {
  try {
    console.log("Sending message to AI:", message);

    const response = await fetch('/.netlify/functions/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('AI request failed:', response.status, errorData);
      throw new Error(`AI request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error sending message to AI:', error);
    return "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.";
  }
}

/**
 * Function to generate a Bible study on a specific topic.
 * This is a fallback that provides pre-written content if the AI fails.
 */
function generateBibleStudy(topic) {
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
          content: `Your career isn't just a job—it's part of God's sovereign plan. Understanding biblical vocation helps us see work as worship and find purpose in God's calling.

The Doctrine of Vocation (1 Corinthians 7:17, Ephesians 2:10, Colossians 3:23-24)
Reformed theology teaches that God sovereignly calls us to specific roles. Our primary calling is to Christ, but God also calls us to serve in various spheres of life.

Work as Worship and Cultural Mandate (Genesis 1:28, Genesis 2:15, 1 Corinthians 10:31)
The cultural mandate calls us to cultivate creation for God's glory. Our work, when done faithfully, serves as a means of grace and kingdom advancement.

Wisdom in Decision Making (Proverbs 16:9, James 1:5, Psalm 32:8)
While we plan our course, the Lord establishes our steps. We should seek God's wisdom through Scripture, prayer, wise counsel, and the circumstances He ordains.

Questions for Reflection:
1. How does the doctrine of God's sovereignty comfort you in uncertain career decisions?
2. What unique gifts and passions has God given you, and how might these point to His calling?
3. How can you glorify God and serve others through your future profession?
4. What's the difference between a secular view of success and a biblical understanding of faithful stewardship?

As Reformed believers, we find our purpose not in self-fulfillment but in glorifying God and enjoying Him forever through the vocations He's called us to.`
      },
      'relationships': {
          title: 'Biblical Dating and Relationships: Covenant Love in Practice',
          content: `In a culture of casual dating, Scripture offers a better way. Understanding covenant love, biblical masculinity and femininity, and marriage as a picture of Christ and the church transforms how we approach relationships.

The Purpose of Dating and Marriage (Ephesians 5:22-33, Genesis 2:18-25, 1 Corinthians 7:1-9)
Marriage reflects the covenant relationship between Christ and His church. Dating should be intentional, with marriage in view, not merely recreational or self-focused.

Purity and Boundaries (1 Thessalonians 4:3-8, 1 Corinthians 6:18-20, Hebrews 13:4)
Sexual purity isn't just about rules—it's about honoring God with our bodies and preserving the sanctity of marriage. Clear physical and emotional boundaries protect both parties.

Biblical Manhood and Womanhood (Ephesians 5:25-28, Titus 2:3-5, 1 Peter 3:1-7)
Complementarianism teaches that men and women are equal in dignity but distinct in roles. This applies to dating through male servant leadership and mutual respect.

Questions for Reflection:
1. How does understanding marriage as a covenant (not just a contract) change your approach to dating?
2. What are practical ways to honor God in romantic relationships while in college?
3. How can you prepare now for potential future marriage, even while single?
4. What role should parents, pastors, and mature believers play in relationship decisions?

May God's design for relationships guide your path, whether in singleness or dating, as you seek to honor Him above all.`
      },
      'doubt': {
          title: 'Faith and Doubt: Intellectual Integrity in Belief',
          content: `College often brings intellectual challenges to faith. Rather than avoiding questions, Reformed theology provides robust answers rooted in Scripture's authority and the Spirit's witness.

The Nature of Faith (Hebrews 11:1, Romans 1:16-17, 2 Corinthians 5:7)
Faith isn't blind belief—it's confident trust based on God's revealed truth. Doubt isn't always sin; sometimes it's the growing edge of deeper faith when addressed honestly.

Scripture's Authority and Sufficiency (2 Timothy 3:16-17, Psalm 119:160, Isaiah 55:10-11)
The doctrine of sola scriptura means Scripture is our ultimate authority. While we engage with other sources of knowledge, God's Word provides certainty in an uncertain world.

Apologetics and Reason (1 Peter 3:15, Romans 1:19-20, Acts 17:22-31)
We're called to give reasons for our hope. Reformed theology acknowledges the noetic effects of sin (how sin affects our thinking) while affirming that reason, redeemed by grace, serves faith.

Questions for Reflection:
1. What intellectual challenges to faith have you encountered, and how has Scripture addressed them?
2. How do you balance honest questioning with submission to God's revealed truth?
3. What role does the Holy Spirit play in giving assurance of faith?
4. How can studying theology and apologetics strengthen rather than weaken faith?

Remember that even in moments of doubt, Christ holds you fast. His grace is sufficient in our weakness, including intellectual struggles.`
      },
      'purpose': {
          title: 'Identity and Purpose: Finding Yourself in Christ',
          content: `In a world obsessed with self-actualization, Scripture reveals our true identity as image-bearers redeemed by grace. Our purpose flows from who we are in Christ.

Image of God and Human Dignity (Genesis 1:27, Psalm 8:3-6, James 3:9)
Every person bears God's image, giving inherent dignity and worth. This truth addresses questions of identity and self-worth in a performance-driven culture.

Union with Christ (Romans 6:1-11, Galatians 2:20, Ephesians 1:3-14)
Our primary identity is found "in Christ." Union with Christ provides security that performance, achievements, or relationships cannot. We are justified, adopted, and sanctified in Him.

Sanctification and Growth (Philippians 1:6, 2 Corinthians 3:18, Romans 8:28-29)
God is conforming us to Christ's image through all circumstances. Understanding progressive sanctification gives purpose to both victories and struggles as part of God's refining work.

Questions for Reflection:
1. How does being "in Christ" change how you view success, failure, and identity?
2. What worldly identities or achievements are you tempted to find security in?
3. How can understanding your eternal purpose help with present anxiety and uncertainty?
4. What does it mean practically to "seek first the kingdom of God" in college/early career?

In Christ, you are not defined by what you do but by what He has done. Your purpose is to glorify God and enjoy Him forever.`
      },
      'anxiety': {
          title: 'Anxiety and Mental Health: Finding Peace in God\'s Sovereignty',
          content: `Anxiety affects many young adults. While affirming the value of professional help, Scripture provides ultimate hope through understanding God's character and promises.

The Sovereignty of God (Romans 8:28, Ephesians 1:11, Proverbs 16:9)
God ordains all things for His glory and our good. Trusting in divine sovereignty provides an anchor during anxious seasons, knowing nothing is outside His control.

Cast Your Cares (1 Peter 5:7, Philippians 4:6-7, Psalm 55:22)
We're commanded to bring our anxieties to God in prayer. This involves both honest expression of fears and deliberate trust in His faithfulness, resulting in "peace that surpasses understanding."

Renewing the Mind (Romans 12:2, Philippians 4:8, 2 Corinthians 10:5)
Anxiety often involves distorted thinking. Scripture helps us evaluate and replace anxious thoughts with truth, taking every thought captive to Christ through meditation on what is true.

Questions for Reflection:
1. What specific anxieties do you face, and how do God's promises address them?
2. How do you balance trusting God with taking practical steps for mental health?
3. What role does Christian community play in supporting those struggling with anxiety?
4. How can practices like prayer, Scripture meditation, and worship reorient your mind when anxious?

God's perfect love casts out fear. Even in anxiety, we are held securely in His sovereign hand.`
      }
  };
  
  // Return the appropriate study or a generic message if not found
  if (studies[cleanTopic]) {
      return studies[cleanTopic].content;
  } else {
      return `I'd be happy to create a study on ${cleanTopic}, but I need to understand this topic better. Could you provide more details about what aspect of ${cleanTopic} you'd like to explore from a Reformed perspective?`;
  }
}
