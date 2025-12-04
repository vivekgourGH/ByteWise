import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! 👋 I'm CodeBot, your coding buddy! Ask me anything about programming, courses, or how to get started! 🚀",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = {
    // Greetings
    'hello': "Hello! 👋 Ready to start your coding adventure? What would you like to learn today?",
    'hi': "Hi there! 🌟 I'm here to help you with all your coding questions!",
    'hey': "Hey! 🎉 What coding magic do you want to create today?",
    
    // Course questions
    'courses': "We have amazing coding adventures! 🎮 Block Programming (ages 8-14), Python (ages 10-16), Game Development (ages 13-18), Web Development (ages 12-17), Mobile Apps (ages 14-18), and Robotics (ages 10-16)! Which one sounds fun to you?",
    'scratch': "Scratch is perfect for beginners! 🧩 You drag and drop colorful blocks to create games and animations. No typing needed - just pure creativity! It's like digital LEGO for coding!",
    'python': "Python is like learning a friendly language! 🐍 It's great for making games, solving puzzles, and even controlling robots! We make it super fun with projects like creating your own adventure games!",
    'game': "Game development is AWESOME! 🎮 You'll learn to create your own video games using JavaScript. Imagine making games that your friends can play - how cool is that?",
    'web': "Web development lets you build websites! 🌐 Learn HTML, CSS, and JavaScript to create amazing websites. You could even build a website about your favorite hobby!",
    'robot': "Robotics is so exciting! 🤖 You'll build real robots with Arduino and program them to move, light up, and respond to sensors. It's like bringing your creations to life!",
    
    // Age and difficulty
    'age': "Our courses are designed for different ages! 🎂 Block Programming (8-14), Python & Robotics (10-16), Web Development (12-17), and Game/Mobile Development (13-18). What's your age?",
    'beginner': "Perfect! 🌟 For beginners, I recommend starting with Scratch (Block Programming). It's visual, fun, and you'll create cool projects without typing code!",
    'easy': "Don't worry! 😊 We make coding super easy and fun! Start with visual blocks, then gradually move to text coding. Our teachers are amazing at explaining things simply!",
    
    // Pricing
    'price': "Our courses are super affordable! 💰 Starting from just ₹999! We believe every kid should have access to coding education. Plus, we often have family discounts!",
    'cost': "Courses range from ₹999 to ₹1599 - that's less than most video games! 🎮 And you'll learn skills that last a lifetime!",
    
    // Technical questions
    'what is coding': "Coding is like giving instructions to a computer! 💻 Just like you follow a recipe to bake cookies, computers follow code to do amazing things. It's basically digital magic! ✨",
    'programming': "Programming is the superpower of creating with computers! 🦸‍♀️ You can build games, websites, apps, and even control robots. It's like being a digital wizard!",
    'javascript': "JavaScript makes websites interactive! ⚡ It's what makes buttons work, games run in browsers, and websites respond to your clicks. Super powerful and fun to learn!",
    
    // Getting started
    'start': "Ready to start? 🚀 First, pick a course that matches your age and interests. Then sign up, and you'll get access to fun projects, games, and awesome teachers!",
    'help': "I'm here to help! 🤗 You can ask me about courses, coding basics, pricing, or anything else. Just type your question and I'll do my best to help!",
    
    // Fun responses
    'fun': "Coding IS fun! 🎉 You get to create games, build websites, make robots dance, and solve puzzles. It's like having superpowers on a computer!",
    'cool': "Right? Coding is super cool! 😎 You can create anything you imagine - from simple animations to complex games. The only limit is your creativity!",
    
    // Default responses
    'default': [
      "That's a great question! 🤔 Can you tell me more about what you'd like to know?",
      "Hmm, I'm still learning! 🤖 Try asking about our courses, coding basics, or how to get started!",
      "Interesting! 💭 Ask me about Scratch, Python, game development, or any of our coding adventures!",
      "I'd love to help! 😊 Try asking about courses, pricing, or what coding language to start with!"
    ]
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Check for keywords in the message
    for (const [keyword, response] of Object.entries(botResponses)) {
      if (keyword !== 'default' && message.includes(keyword)) {
        return response;
      }
    }
    
    // Return random default response
    const defaultResponses = botResponses.default;
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          {isOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-40 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-t-xl">
            <div className="flex items-center">
              <FaRobot className="mr-2" />
              <div>
                <h3 className="font-semibold">CodeBot 🤖</h3>
                <p className="text-xs opacity-90">Your coding buddy!</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg text-sm ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about coding! 😊"
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-2 rounded-lg transition-all duration-200"
              >
                <FaPaperPlane size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;