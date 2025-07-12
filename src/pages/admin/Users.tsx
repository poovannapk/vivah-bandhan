import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConfirmModal from '../../components/ui/ConfirmModal';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  email: string;
  personal?: { firstName?: string; lastName?: string };
  banned?: boolean;
  verified?: boolean;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [banUserId, setBanUserId] = useState<string | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  useEffect(() => {
    axios.get('/api/admin/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setUsers(res.data));
  }, []);

  const handleBan = (id: string) => {
    setBanUserId(id);
  };
  const confirmBan = () => {
    if (!banUserId) return;
    axios.post(`/api/admin/ban/${banUserId}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(() => {
        setUsers(users => users.map(u => u._id === banUserId ? { ...u, banned: true } : u));
        toast.success('User banned');
      })
      .catch(() => toast.error('Failed to ban user'))
      .finally(() => setBanUserId(null));
  };
  const handleVerify = (id: string) => {
    axios.post(`/api/admin/verify/${id}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(() => setUsers(users => users.map(u => u._id === id ? { ...u, verified: true } : u)));
  };
  const handleDelete = (id: string) => {
    setDeleteUserId(id);
  };
  const confirmDelete = () => {
    if (!deleteUserId) return;
    axios.delete(`/api/admin/user/${deleteUserId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(() => {
        setUsers(users => users.filter(u => u._id !== deleteUserId));
        toast.success('User deleted');
      })
      .catch(() => toast.error('Failed to delete user'))
      .finally(() => setDeleteUserId(null));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="p-2">Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td className="p-2">{u.personal?.firstName} {u.personal?.lastName}</td>
              <td>{u.email}</td>
              <td>
                {u.banned ? <span className="text-red-600">Banned</span> : <span className="text-green-600">Active</span>}
                {u.verified && <span className="ml-2 text-blue-600">Verified</span>}
              </td>
              <td className="space-x-2">
                {!u.banned && <button onClick={() => handleBan(u._id)} className="text-red-600 hover:underline">Ban</button>}
                {!u.verified && <button onClick={() => handleVerify(u._id)} className="text-blue-600 hover:underline">Verify</button>}
                <button onClick={() => handleDelete(u._id)} className="text-gray-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmModal
        isOpen={!!banUserId}
        onClose={() => setBanUserId(null)}
        onConfirm={confirmBan}
        title="Ban User"
        message="Are you sure you want to ban this user?"
        confirmText="Ban"
      />
      <ConfirmModal
        isOpen={!!deleteUserId}
        onClose={() => setDeleteUserId(null)}
        onConfirm={confirmDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  );
};
export default Users;
