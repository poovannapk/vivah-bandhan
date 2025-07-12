import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Message {
  _id: string;
  content: string;
  from: string;
  to: string;
  createdAt: string;
}

const FlaggedMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    axios.get('/api/admin/flagged-messages', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setMessages(res.data));
  }, []);

  const handleUnflag = (id: string) => {
    axios.post(`/api/admin/flag-message/${id}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(() => setMessages(msgs => msgs.filter(m => m._id !== id)));
  };

  const handleApprove = (id: string) => {
    // Approve: unflag the message (implement endpoint if needed)
    axios.post(`/api/admin/flag-message/${id}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(() => setMessages(msgs => msgs.filter(m => m._id !== id)));
  };
  const handleDelete = (id: string) => {
    // Delete: remove the message (implement endpoint if needed)
    // Example: axios.delete(`/api/message/${id}`)
    setMessages(msgs => msgs.filter(m => m._id !== id));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Flagged Messages</h2>
      {messages.length === 0 ? <p>No flagged messages.</p> : (
        <ul className="space-y-4">
          {messages.map(msg => (
            <li key={msg._id} className="border p-4 rounded">
              <div className="mb-2">{msg.content}</div>
              <button onClick={() => handleApprove(msg._id)} className="text-sm text-green-600 hover:underline mr-2">Approve</button>
              <button onClick={() => handleDelete(msg._id)} className="text-sm text-red-600 hover:underline">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FlaggedMessages;
