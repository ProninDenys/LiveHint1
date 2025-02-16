"use client";

import { useState } from 'react';

export default function SettingsPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [requestCount, setRequestCount] = useState(0);
  const requestLimit = 5;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (requestCount >= requestLimit) {
      setError('Request limit reached. Please try again later.');
      return;
    }

    try {
      setRequestCount(prev => prev + 1);
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('API is currently unavailable. Please try again later.');
      }
      setSuccess('Settings updated successfully!');
      setError('');
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">Settings</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form className="bg-white p-6 rounded-lg shadow-md space-y-4 w-96" onSubmit={handleSubmit}>
        <label className="block text-gray-700 font-medium">
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full mt-2 p-2 border rounded-lg" required />
        </label>
        <label className="block text-gray-700 font-medium">
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" className="w-full mt-2 p-2 border rounded-lg" required />
        </label>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
          Save Changes
        </button>
      </form>
    </div>
  );
}
