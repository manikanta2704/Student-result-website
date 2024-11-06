import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { searchResult } from '../services/api';

interface Subject {
  code: string;
  name: string;
  marks: string;
  grade: string;
}

interface Result {
  name: string;
  fatherName: string;
  rollNumber: string;
  examination: string;
  college: string;
  stream: string;
  medium: string;
  passingYear: string;
  session: string;
  subjects: Subject[];
  totalMarks: number;
}

export default function ResultsPage() {
  const { rollNumber } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const data = await searchResult(rollNumber!);
        setResult(data.result);
      } catch (error) {
        toast.error('Failed to fetch result!');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [rollNumber, navigate]);

  const handleDownload = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading result...</div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">Result not found!</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
            >
              <Download size={20} />
              <span>Download Result</span>
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Online Mark Sheet for {result.name}
            </h1>
            <p className="text-gray-600">Roll Number: {result.rollNumber}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-sm text-gray-600">Father's Name</p>
              <p className="font-medium">{result.fatherName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Examination</p>
              <p className="font-medium">{result.examination}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">College/Institution</p>
              <p className="font-medium">{result.college}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Stream</p>
              <p className="font-medium">{result.stream}</p>
            </div>
            {result.medium && (
              <div>
                <p className="text-sm text-gray-600">Medium</p>
                <p className="font-medium">{result.medium}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600">Month & Year of Passing</p>
              <p className="font-medium">{result.passingYear}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Session</p>
              <p className="font-medium">{result.session}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Subject Code
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Subject Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Marks</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {result.subjects.map((subject, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{subject.code}</td>
                    <td className="px-4 py-2">{subject.name}</td>
                    <td className="px-4 py-2">{subject.marks}</td>
                    <td className="px-4 py-2">{subject.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Total Marks</p>
                <p className="text-xl font-bold">{result.totalMarks}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Result Status</p>
                <p
                  className={`text-xl font-bold ${
                    result.totalMarks >= 0.4 * (result.subjects.length * 100)
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {result.totalMarks >= 0.4 * (result.subjects.length * 100)
                    ? 'PASS'
                    : 'FAIL'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}