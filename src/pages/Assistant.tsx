import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export const Assistant: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello ${user?.name}! I'm your inventory assistant. I can help you with product information, stock levels, sales data, and answer questions about your inventory management system. How can I assist you today?`,
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('stock') || lowerMessage.includes('inventory')) {
      return "Based on your current inventory, you have 3 products in stock. The Coffee Mug is running low with only 5 units remaining (below the minimum threshold of 15). I recommend restocking soon to avoid stockouts.";
    }
    
    if (lowerMessage.includes('sales') || lowerMessage.includes('revenue')) {
      return "Your recent sales performance shows $449.97 in total sales. The best-selling item is Wireless Headphones with 2 units sold recently. Sales have been trending upward over the past week.";
    }
    
    if (lowerMessage.includes('low stock') || lowerMessage.includes('reorder')) {
      return "Currently, you have 1 product with low stock: Coffee Mug (5 units remaining, minimum: 15). I suggest reordering 25-30 units to maintain healthy stock levels.";
    }
    
    if (lowerMessage.includes('product') && lowerMessage.includes('add')) {
      return "To add a new product, go to the Products page and click 'Add Product'. Make sure to include all required information: name, SKU, category, pricing, and stock levels. Don't forget to set appropriate minimum stock thresholds!";
    }
    
    if (lowerMessage.includes('user') || lowerMessage.includes('access')) {
      return "Your system has 3 user roles: Admin (full access), Assistant (products & sales), and Cashier (sales only). You can manage users from the Users page if you have admin privileges.";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
      return "I can help you with:\n• Stock level monitoring and alerts\n• Sales performance analysis\n• Product management guidance\n• User role explanations\n• System navigation tips\n\nWhat specific area would you like help with?";
    }
    
    return "I understand you're asking about inventory management. Could you be more specific? I can help with stock levels, sales data, product management, user roles, or general system guidance.";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputMessage),
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Assistant</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Get help with your inventory management
        </p>
      </div>

      {/* Chat container */}
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    } items-start space-x-3`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'user'
                          ? 'bg-primary-600 ml-3'
                          : 'bg-gray-200 dark:bg-dark-700 mr-3'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-dark-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === 'user'
                            ? 'text-primary-100'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-dark-700 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="bg-gray-100 dark:bg-dark-700 rounded-lg px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <Loader className="w-4 h-4 animate-spin text-gray-600 dark:text-gray-300" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Thinking...
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-gray-200 dark:border-dark-700 p-4">
            <div className="flex space-x-3">
              <Input
                placeholder="Ask me anything about your inventory..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};