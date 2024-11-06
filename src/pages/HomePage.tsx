import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { generateCaptcha } from '../utils/captcha';
import { searchResult } from '../services/api';

export default function HomePage() {
  const navigate = useNavigate();
  const [rollNumber, setRollNumber] = useState('');
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
      const response = await searchResult(rollNumber);
      if (response.success) {
        navigate(`/results/${rollNumber}`);
      } else {
        toast.error('Roll number not found!');
      }
    } catch (error) {
      toast.error('Something went wrong! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Student Results Portal
          </h1>
          <p className="text-gray-600">
            Enter your roll number to view results
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="rollNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Roll Number
            </label>
            <input
              id="rollNumber"
              type="text"
              required
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your roll number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Captcha Verification
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
            className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
          >
            {loading ? (
              'Searching...'
            ) : (
              <>
                <Search size={20} />
                <span>View Results</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/admin/login"
            className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Admin Login →
          </a>
        </div>
      </div>
    </div>
  );
}
