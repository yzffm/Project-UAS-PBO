import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Users, User, ArrowRight, ShieldCheck, Mail, Database } from 'lucide-react';

const GroupInfoPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const members = [
    { name: 'Yusuf Maulana Arrosyid', id: '25051204426', role: 'Developer' },
    { name: 'Reivandani Aji Prakoso', id: '25051204422', role: 'Developer' },
    { name: 'Ayesha Humayra Nadra Rafianti', id: '25051204430', role: 'Developer' },
    { name: 'Daffa Maulana Putra Hanayu', id: '25051204425', role: 'Developer' },
    { name: 'Rendy Nur Jamal Prasetyo', id: '25051204435', role: 'Developer' },
    { name: 'Celvin Saputra Pratama', id: '25051204439', role: 'Developer' },
    { name: 'Siska Nur Fauziah', id: '25051204440', role: 'Developer' },
  ];

  const handleContinue = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full shadow-inner shadow-blue-200">
              <Users className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Awesome Team</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Project UAS Pemrograman Berorientasi Objek
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {members.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-500 relative">
                <div className="absolute -bottom-10 inset-x-0 flex justify-center">
                  <div className="w-20 h-20 bg-white rounded-full p-1.5 shadow-md">
                    <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                      <User size={36} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-14 pb-8 px-6 text-center space-y-2">
                <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-gray-500 tracking-wider">
                  NIM: {member.id}
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {member.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-full overflow-hidden shadow-lg shadow-blue-300 hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <span className="relative z-10">Lanjutkan ke Aplikasi</span>
            <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupInfoPage;
