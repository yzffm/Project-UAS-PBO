import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Users, User, ArrowRight, Code2, Palette, Database, Server, Layout, GitBranch, FileCode, Video } from 'lucide-react';

const GroupInfoPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const members = [
    { 
      name: 'Yusuf Maulana Arrosyid', id: '25051204426', photo: '/images/team/yusuf.jpg',
      roles: [
        { label: 'Lead Developer', icon: Code2 },
        { label: 'Full Stack Developer', icon: Server },
        { label: 'Documentation', icon: Users }
      ]
    },
    { 
      name: 'Reivandani Aji Prakoso', id: '25051204422', photo: '/images/team/reivandani.png',
      roles: [
        { label: 'Frontend Developer', icon: Layout },
        { label: 'Documentation', icon: Users }
      ]
    },
    { 
      name: 'Ayesha Humayra Nadra Rafianti', id: '25051204430', photo: '/images/team/ayesha.png',
      roles: [
        { label: 'Frontend Developer', icon: Layout },
        { label: 'Laporan', icon: FileCode }
      ]
    },
    { 
      name: 'Daffa Maulana Putra Hanayu', id: '25051204425', photo: '/images/team/daffa.png',
      roles: [
        { label: 'Backend Developer', icon: Database },
        { label: 'Video Editing', icon: Video }
      ]
    },
    { 
      name: 'Rendy Nur Jamal Prasetyo', id: '25051204435', photo: '/images/team/rendy.png',
      roles: [{ label: 'Backend Developer', icon: Database }]
    },
    { 
      name: 'Celvin Saputra Pratama', id: '25051204439', photo: '/images/team/celvin.png',
      roles: [{ label: 'Frontend Developer', icon: Layout }]
    },
    { 
      name: 'Siska Nur Fauziah', id: '25051204440', photo: '/images/team/siska.png',
      roles: [
        { label: 'Frontend Developer', icon: Layout },
        { label: 'Laporan', icon: FileCode }
      ]
    },
  ];

  const handleContinue = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  // Split members: first row (4), second row (3 centered)
  const firstRow = members.slice(0, 4);
  const secondRow = members.slice(4);

  const renderCard = (member, index) => {
    return (
      <div
        key={index}
        className="group w-full sm:w-[calc(50%-1rem)] lg:w-[260px] glass-card rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10"
      >
        {/* Gradient Banner */}
        <div className="h-28 bg-gradient-to-br from-blue-500 to-indigo-600 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(255,255,255,0.15),transparent)]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/10 to-transparent"></div>

          {/* Avatar */}
          <div className="absolute -bottom-12 inset-x-0 flex justify-center">
            <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg shadow-blue-500/20 border-4 border-white">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center text-gray-300 group-hover:from-blue-50 group-hover:to-indigo-50 group-hover:text-blue-400 transition-all duration-300">
                  <User size={40} strokeWidth={1.5} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-16 pb-8 px-5 text-center space-y-3">
          <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors min-h-[2.5rem] flex items-center justify-center">
            {member.name}
          </h3>
          <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
            {member.id}
          </p>
          <div className="pt-1 flex flex-col items-center gap-2">
            {member.roles.map((role, roleIdx) => {
              const RoleIcon = role.icon;
              return (
                <span 
                  key={roleIdx} 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50/80 text-blue-700 border border-blue-100/60 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                >
                  <RoleIcon size={12} />
                  {role.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen app-bg py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-5%] left-[-5%] w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-[40%] right-[-5%] w-96 h-96 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[10%] left-[30%] w-72 h-72 bg-purple-300/15 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero — NOT CHANGED */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex justify-center mb-4">
            <div className="bg-white/50 backdrop-blur-md p-4 rounded-full shadow-inner shadow-blue-200/50 border border-white/60">
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

        {/* First Row — 4 cards */}
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          {firstRow.map((member, index) => renderCard(member, index))}
        </div>

        {/* Second Row — 3 cards, centered */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {secondRow.map((member, index) => renderCard(member, index + 4))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-full overflow-hidden focus:outline-none focus:ring-4 focus:ring-blue-300/50 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300"
          >
            <span className="relative z-10">Lanjutkan ke Aplikasi</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupInfoPage;
