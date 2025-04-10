import { useState } from 'react';
import { useRouter } from 'next/router';
import API from '../utils/api';
import { toast } from 'react-toastify';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', { name, email, password });
      toast.success('Registered successfully');
      router.push('/login');
    } catch {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 mb-3 w-full rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-3 py-2 mb-3 w-full rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 mb-3 w-full rounded"
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Register
        </button>
        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => router.push('/login')}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
