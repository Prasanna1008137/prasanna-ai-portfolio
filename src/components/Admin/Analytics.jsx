import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { FolderKanban, Award, MessageSquare, Cpu } from 'lucide-react';
import { getProjects, getSkills, getCertifications, getMessages } from '../../api';

const data = [
  { name: 'Mon', visits: 420, views: 240 },
  { name: 'Tue', visits: 490, views: 320 },
  { name: 'Wed', visits: 600, views: 580 },
  { name: 'Thu', visits: 810, views: 790 },
  { name: 'Fri', visits: 950, views: 880 },
  { name: 'Sat', visits: 1100, views: 980 },
  { name: 'Sun', visits: 1240, views: 1040 },
];

const StatCard = ({ icon: Icon, label, value, color, loading }) => (
  <div className="glass-card p-6 border-white/5 relative overflow-hidden group">
    <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-500 ${color}`}>
      <Icon size={48} />
    </div>
    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
    {loading ? (
      <div className="h-9 w-16 bg-white/5 animate-pulse rounded" />
    ) : (
      <h3 className="text-3xl font-black text-white">{value}</h3>
    )}
    <div className={`h-1 w-12 mt-4 rounded-full ${color.replace('text-', 'bg-')}`}></div>
  </div>
);

export default function Analytics() {
  const [counts, setCounts] = useState({
    projects: 0,
    skills: 0,
    certs: 0,
    messages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const [projRes, skillRes, certRes, msgRes] = await Promise.all([
          getProjects(),
          getSkills(),
          getCertifications(),
          getMessages()
        ]);
        setCounts({
          projects: projRes.data.length,
          skills: skillRes.data.length,
          certs: certRes.data.length,
          messages: msgRes.data.length
        });
      } catch (err) {
        console.error("Failed to load metrics telemetry:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTelemetry();
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <header>
        <div className="text-[9px] font-mono text-teal/40 uppercase tracking-[0.4em] mb-1">Diagnostic Terminal</div>
        <h2 className="text-3xl font-black tracking-tight text-white">System <span className="text-teal">Intelligence</span></h2>
        <p className="text-white/40 text-sm">Real-time engagement metrics and active database rows telemetry.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={FolderKanban} label="Total Projects" value={counts.projects} color="text-teal" loading={loading} />
        <StatCard icon={Cpu} label="Registered Skills" value={counts.skills} color="text-iris" loading={loading} />
        <StatCard icon={Award} label="Credentials" value={counts.certs} color="text-ember" loading={loading} />
        <StatCard icon={MessageSquare} label="Signals Inbox" value={counts.messages} color="text-teal" loading={loading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 min-h-[400px] border-white/5">
          <h3 className="text-lg font-bold text-white mb-6 font-display">Traffic Over Time (Visits)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00d4aa" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} fontClassName="font-mono" />
                <YAxis stroke="#ffffff40" fontSize={10} fontClassName="font-mono" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020408', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#00d4aa' }}
                />
                <Area type="monotone" dataKey="visits" stroke="#00d4aa" fillOpacity={1} fill="url(#colorVisits)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8 min-h-[400px] border-white/5">
          <h3 className="text-lg font-bold text-white mb-6 font-display">Engagement Distribution (Views)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} fontClassName="font-mono" />
                <YAxis stroke="#ffffff40" fontSize={10} fontClassName="font-mono" />
                <Tooltip 
                  cursor={{fill: '#ffffff05'}}
                  contentStyle={{ backgroundColor: '#020408', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#7c5cfc' }}
                />
                <Bar dataKey="views" fill="#7c5cfc" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
