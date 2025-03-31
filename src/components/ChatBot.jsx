import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

const ChatBot = ({ isVisible, onClose, language = 'zh-CN' }) => {
  const [messages, setMessages] = useState([]);
  const [userType, setUserType] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const prevLanguageRef = useRef(language);

  const translations = {
    'zh-CN': {
      title: '在线咨询',
      welcome: '欢迎！请问您是老师还是学生？',
      teacher: '老师',
      student: '学生',
      inputPlaceholder: '输入您的消息...',
      sendButton: '发送',
      iAmTeacher: '我是老师',
      iAmStudent: '我是学生',
      questions: {
        teacher: [
          '您想教授哪些科目？',
          '您有多少年教学经验？',
          '您期望的课时费是多少？',
          '请留下您的联系方式（邮箱或电话），我们会尽快与您联系。'
        ],
        student: [
          '您需要哪些科目的辅导？',
          '您目前是什么年级？',
          '您期望的上课时间是？',
          '请留下您的联系方式（邮箱或电话），我们会尽快与您联系。'
        ]
      }
    },
    'zh-TW': {
      title: '在線諮詢',
      welcome: '歡迎！請問您是老師還是學生？',
      teacher: '老師',
      student: '學生',
      inputPlaceholder: '輸入您的訊息...',
      sendButton: '發送',
      iAmTeacher: '我是老師',
      iAmStudent: '我是學生',
      questions: {
        teacher: [
          '您想教授哪些科目？',
          '您有多少年教學經驗？',
          '您期望的課時費是多少？',
          '請留下您的聯繫方式（郵箱或電話），我們會盡快與您聯繫。'
        ],
        student: [
          '您需要哪些科目的輔導？',
          '您目前是什麼年級？',
          '您期望的上課時間是？',
          '請留下您的聯繫方式（郵箱或電話），我們會盡快與您聯繫。'
        ]
      }
    },
    'en': {
      title: 'Online Consultation',
      welcome: 'Welcome! Are you a teacher or a student?',
      teacher: 'Teacher',
      student: 'Student',
      inputPlaceholder: 'Type your message...',
      sendButton: 'Send',
      iAmTeacher: 'I am a teacher',
      iAmStudent: 'I am a student',
      questions: {
        teacher: [
          'What subjects would you like to teach?',
          'How many years of teaching experience do you have?',
          'What is your expected hourly rate?',
          'Please leave your contact information (email or phone), and we will get back to you soon.'
        ],
        student: [
          'Which subjects do you need tutoring in?',
          'What grade are you currently in?',
          'What are your preferred class times?',
          'Please leave your contact information (email or phone), and we will get back to you soon.'
        ]
      }
    }
  };

  const t = translations[language] || translations['en'];

  // Reset chat when language changes
  useEffect(() => {
    if (prevLanguageRef.current !== language) {
      setMessages([]);
      setUserType(null);
      setInputMessage('');
      prevLanguageRef.current = language;
    }
  }, [language]);

  // Initialize chat when visible
  useEffect(() => {
    if (isVisible && messages.length === 0) {
      setMessages([{
        type: 'bot',
        content: t.welcome,
        buttons: [
          { text: t.teacher, value: 'teacher' },
          { text: t.student, value: 'student' }
        ]
      }]);
    }
  }, [isVisible, messages.length, t]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    const userMessage = { type: 'user', content: type === 'teacher' ? t.iAmTeacher : t.iAmStudent };
    const botMessage = { type: 'bot', content: t.questions[type][0] };
    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = { type: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Get the current question index
    const currentQuestionIndex = messages.filter(m => m.type === 'bot').length - 1;
    
    if (userType && currentQuestionIndex < t.questions[userType].length - 1) {
      // Send next question
      setTimeout(() => {
        const nextQuestion = { type: 'bot', content: t.questions[userType][currentQuestionIndex + 1] };
        setMessages(prev => [...prev, nextQuestion]);
      }, 500);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isVisible) return null;

  return (
    <div className={`chat-window ${isMinimized ? 'minimized' : ''}`}>
      <div className="chat-header">
        <span>{t.title}</span>
        <div className="chat-controls">
          <button onClick={() => setIsMinimized(!isMinimized)} className="minimize-button">
            {isMinimized ? '+' : '-'}
          </button>
          <button onClick={onClose} className="close-button">×</button>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="message-content">
              {message.content}
              {message.buttons && (
                <div className="button-group">
                  {message.buttons.map((button, i) => (
                    <button
                      key={i}
                      onClick={() => handleUserTypeSelect(button.value)}
                      className="option-button"
                    >
                      {button.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={t.inputPlaceholder}
        />
        <button onClick={handleSendMessage}>
          {t.sendButton}
        </button>
      </div>
    </div>
  );
};

export default ChatBot; 