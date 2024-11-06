import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Save, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../store/auth';
import { addResult } from '../services/api';

interface Subject {
  code: string;
  name: string;
  marks: string;
  grade: string;
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState({
    name: '',
    fatherName: '',
    rollNumber: '',
    examination: '',
    college: '',
    stream: '',
    medium: '',
    passingYear: '',
    session: '',
  });
  const [subjects, setSubjects] = useState<Subject[]>([
    { code: '', name: '', marks: '', grade: '' },
  ]);

  const handleStudentDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (index: number, field: keyof Subject, value: string) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, { code: '', name: '', marks: '', grade: '' }]);
  };

  const removeSubject = (index: number) => {
    if (subjects.length > 1) {
      const newSubjects = subjects.filter((_, i) => i !== index);
      setSubjects(newSubjects);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addResult({
        ...studentData,
        subjects,
        totalMarks: subjects.reduce((acc, curr) => acc + Number(curr.marks), 0),
      });
      toast.success('Result added successfully!');
      // Reset form
      setStudentData({
        name: '',
        fatherName: '',
        rollNumber: '',
        examination: '',
        college: '',
        stream: '',
        medium: '',
        passingYear: '',
        session: '',
      });
      setSubjects([{ code: '', name: '', marks: '', grade: '' }]);
    } catch (error) {
      toast.error('Failed to add result!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Add Student Result</h1>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={studentData.name}
                  onChange={handleStudentDataChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Father's Name
                </label>
                <input
                  type="text"
                  name="fatherName"
                  required
                  value={studentData.fatherName}
                  onChange={handleStudentDataChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Roll Number
                </label>
                <input
                  type="text"
                  name="rollNumber"
                  required
                  value={studentData.rollNumber}
                  onChange={handleStudentDataChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Examination
                </label>
                <input
                  type="text"
                  name="examination"
                  required
                  value={studentData.examination}
                  onChange={handleStudentDataChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  College/Institution
                </label>
                <input
                  type="text"
                  name="college"
                  required
                  value={studentData.college}
                  onChange={handleStudentDataChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stream</label>
                <input
                  type="text"
                  name="stream"
                  required
                  value={studentData.stream}
                  onChange={handleStudentDataChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medium</label>
                <input
                  type="text"
                  name="medium"
                  value={studentData.medium}
                  onChange={handleStudentDataChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Month & Year of Passing
                </label>
                <input
                  type="text"
                  name="passingYear"
                  required
                  value={studentData.passingYear}
                  onChange={handleStudentDataChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Session</label>
                <input
                  type="text"
                  name="session"
                  required
                  value={studentData.session}
                  onChange={handleStudentDataChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Subjects</h2>
                <button
                  type="button"
                  onClick={addSubject}
                  className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
                >
                  <PlusCircle size={20} />
                  <span>Add Subject</span>
                </button>
              </div>

              {subjects.map((subject, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div>
                    <input
                      type="text"
                      placeholder="Subject Code"
                      value={subject.code}
                      onChange={(e) => handleSubjectChange(index, 'code', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="Subject Name"
                      value={subject.name}
                      onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Marks"
                      value={subject.marks}
                      onChange={(e) => handleSubjectChange(index, 'marks', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Grade"
                      value={subject.grade}
                      onChange={(e) => handleSubjectChange(index, 'grade', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {subjects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSubject(index)}
                        className="p-2 text-red-600 hover:text-red-700"
                      >
                        <Trash size={20} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
            >
              {loading ? (
                'Saving...'
              ) : (
                <>
                  <Save size={20} />
                  <span>Save Result</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}