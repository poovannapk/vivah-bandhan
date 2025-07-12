import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface UserWithFlaggedPhotos {
  _id: string;
  personal: { firstName?: string; lastName?: string; photo?: string };
  flaggedPhotos: string[];
}

const FlaggedPhotos: React.FC = () => {
  const [users, setUsers] = useState<UserWithFlaggedPhotos[]>([]);

  useEffect(() => {
    axios.get('/api/admin/flagged-photos', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setUsers(res.data));
  }, []);

  const handleReview = (userId: string, photoUrl: string) => {
    // Implement review logic (e.g., remove photo, mark as safe, etc.)
    alert(`Reviewed photo for user ${userId}: ${photoUrl}`);
  };

  const handleApprove = (userId: string, photoUrl: string) => {
    // Approve: remove from flaggedPhotos (implement endpoint if needed)
    setUsers(users => users.map(u => u._id === userId ? { ...u, flaggedPhotos: u.flaggedPhotos.filter(p => p !== photoUrl) } : u));
  };
  const handleDelete = (userId: string, photoUrl: string) => {
    // Delete: remove photo (implement endpoint if needed)
    setUsers(users => users.map(u => u._id === userId ? { ...u, flaggedPhotos: u.flaggedPhotos.filter(p => p !== photoUrl) } : u));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Flagged Photos</h2>
      {users.length === 0 ? <p>No flagged photos.</p> : (
        <ul className="space-y-4">
          {users.map(user => (
            <li key={user._id} className="border p-4 rounded">
              <div className="mb-2 font-semibold">{user.personal?.firstName} {user.personal?.lastName}</div>
              {user.flaggedPhotos.map(photo => (
                <div key={photo} className="mb-2 flex items-center gap-2">
                  <img src={photo} alt="Flagged" className="w-16 h-16 object-cover rounded" />
                  <button onClick={() => handleApprove(user._id, photo)} className="text-sm text-green-600 hover:underline mr-2">Approve</button>
                  <button onClick={() => handleDelete(user._id, photo)} className="text-sm text-red-600 hover:underline">Delete</button>
                </div>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FlaggedPhotos;
