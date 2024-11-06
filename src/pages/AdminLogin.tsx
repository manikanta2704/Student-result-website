import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../store/auth';
import { adminLogin } from '../services/api';
import { generateCaptcha } from '../utils/captcha';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    username: 'admin',
    password: 'admin',
  });
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userCaptcha, setUserCaptcha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userCaptcha.toLowerCase() !== captcha.toLowerCase()) {
      toast.error('Invalid captcha! Please try again.');
      return;
    }

    setLoading(true);
    try {
      const response = await adminLogin(credentials);
      login(response.token);
      toast.success('Login successful!');
      navigate('/admin/panel');
    } catch (error) {
      toast.error('Invalid credentials!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-600">Access the admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter password"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Captcha
            </label>
            <div className="flex items-center space-x-4 mb-2 p-3 bg-gray-50 rounded-lg">
              <div className="flex-1 text-2xl font-bold text-gray-700 tracking-wider text-center">
                {captcha}
              </div>
              <button
                type="button"
                onClick={() => setCaptcha(generateCaptcha())}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <RefreshCw size={20} />
              </button>
            </div>
            <input
              type="text"
              required
              value={userCaptcha}
              onChange={(e) => setUserCaptcha(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter captcha"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
