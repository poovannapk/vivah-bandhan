import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Send, 
  Phone, 
  Video, 
  MoreVertical,
  Paperclip,
  Smile,
  Check,
  CheckCheck
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';

export const MessagesPage: React.FC<{ onOpenRegisterModal?: () => void }> = ({ onOpenRegisterModal }) => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: '1',
      name: 'Priya Sharma',
      avatar: 'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=100',
      lastMessage: 'Thank you for your interest! I would love to know more about you.',
      timestamp: '2 min ago',
      unreadCount: 2,
      isOnline: true,
      compatibility: 94
    },
    {
      id: '2',
      name: 'Ananya Patel',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100',
      lastMessage: 'Hi! Nice to connect with you.',
      timestamp: '1 hour ago',
      unreadCount: 0,
      isOnline: false,
      compatibility: 91
    },
    {
      id: '3',
      name: 'Kavya Reddy',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      lastMessage: 'Looking forward to hearing from you!',
      timestamp: '3 hours ago',
      unreadCount: 1,
      isOnline: true,
      compatibility: 87
    }
  ];

  const messages = [
    {
      id: '1',
      senderId: '2',
      content: 'Hi! Thank you for showing interest in my profile.',
      timestamp: '10:30 AM',
      isRead: true,
      isDelivered: true
    },
    {
      id: '2',
      senderId: '1',
      content: 'Hello! I found your profile very interesting. Would love to know more about you.',
      timestamp: '10:35 AM',
      isRead: true,
      isDelivered: true
    },
    {
      id: '3',
      senderId: '2',
      content: 'Thank you! I would be happy to share more about myself. What would you like to know?',
      timestamp: '10:40 AM',
      isRead: true,
      isDelivered: true
    },
    {
      id: '4',
      senderId: '1',
      content: 'Could you tell me about your hobbies and interests?',
      timestamp: '10:45 AM',
      isRead: false,
      isDelivered: true
    },
    {
      id: '5',
      senderId: '2',
      content: 'I love reading books, traveling to new places, and cooking. I also enjoy photography and classical music. What about you?',
      timestamp: '10:50 AM',
      isRead: false,
      isDelivered: true
    }
  ];

  const currentUser = '1';
  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Connect with your matches</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className="p-0 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <Input
                type="text"
                placeholder="Search conversations..."
                icon={<Search className="h-5 w-5" />}
              />
            </div>
            
            <div className="overflow-y-auto h-full">
              <ul data-testid="conversation-list">
                {conversations.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                      selectedConversation === conversation.id ? 'bg-primary-50 border-primary-200' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                    data-testid={`conversation-item-${conversation.id}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={conversation.avatar}
                          alt={conversation.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {conversation.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {conversation.name}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                            {conversation.unreadCount > 0 && (
                              <Badge variant="primary" size="sm">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 truncate mt-1">
                          {conversation.lastMessage}
                        </p>
                        
                        <div className="flex items-center mt-2">
                          <Badge variant="success" size="sm">
                            {conversation.compatibility}% Match
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </ul>
            </div>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 p-0 overflow-hidden flex flex-col">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={selectedConv.avatar}
                          alt={selectedConv.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {selectedConv.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {selectedConv.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {selectedConv.isOnline ? 'Online now' : 'Last seen 2 hours ago'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div data-testid="message-thread">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.senderId === currentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.senderId === currentUser
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-200 text-gray-900'
                        }`}>
                          <p className="text-sm" data-testid={`message-${message.id}`}>
                            {message.content}
                          </p>
                          <div className={`flex items-center justify-between mt-1 ${
                            message.senderId === currentUser ? 'text-primary-100' : 'text-gray-500'
                          }`}>
                            <span className="text-xs">{message.timestamp}</span>
                            {message.senderId === currentUser && (
                              <div className="ml-2">
                                {message.isRead ? (
                                  <CheckCheck className="h-3 w-3" />
                                ) : message.isDelivered ? (
                                  <Check className="h-3 w-3" />
                                ) : null}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    
                    <div className="flex-1">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-full resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows={1}
                        data-testid="message-input"
                      />
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <Smile className="h-5 w-5" />
                    </Button>
                    
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      size="sm"
                      data-testid="send-message"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-600">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Get Started Button */}
        {!user && (
          <div className="flex justify-center my-8">
            {onOpenRegisterModal ? (
              <Button size="lg" className="px-8 py-4" onClick={onOpenRegisterModal}>
                Get Started
              </Button>
            ) : (
              <Button size="lg" className="px-8 py-4" disabled>
                Get Started
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};