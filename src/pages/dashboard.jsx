// src/Dashboard.jsx
import { FiGrid, FiFolder, FiDownload, FiSettings } from "react-icons/fi";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db,auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";


export default function Dashboard() {

const {user}=useContext(UserContext);

let displayWelcomeText;
if (!user || !user.username){
   displayWelcomeText="Welcome User!"
}else{
   displayWelcomeText=`Welcome ${user.username}!`;
}

const navigate = useNavigate();

const handleNewProject = async () => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/login")//  redirect to login
      return;
    }

    try {
      // users/{uid}/projects
      const projectsRef = collection(db, "users", user.uid, "projects");

      const docRef = await addDoc(projectsRef, {
        title: "Untitled professor portfolio",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        // initial empty canvas / blocks config
        blocks: [],
        status: "draft",
      }); // auto‑generated doc ID[web:134][web:143]

      // go to editor for this project
      navigate(`/canvas/${docRef.id}`);
    } catch (err) {
      console.error("Failed to create project", err);
    }
  };




  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 p-4 gap-4 border-r border-slate-200 bg-white">
        <div className="flex items-center gap-2 px-2">
          <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-indigo-500" />
          <div>
            <h1 className="text-lg font-semibold">CanvasX</h1>
            <p className="text-[11px] text-slate-500">
              Portfolio builder dashboard
            </p>
          </div>
        </div>

        <nav className="mt-4 space-y-1 text-sm">
          <SidebarItem icon={<FiGrid />} label="Dashboard" active />
          <SidebarItem icon={<FiFolder />} label="Projects" />
          <SidebarItem icon={<FiDownload />} label="Exports" />
          <SidebarItem icon={<FiSettings />} label="Settings" />
        </nav>

        <div className="mt-auto rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs">
          <p className="font-semibold">Autosave</p>
          <p className="text-slate-500">
            Changes are stored every few seconds.
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-wide text-emerald-500">
            • Enabled
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col gap-6 p-4 md:p-8">
        {/* Top bar */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-4xl font-semibold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
              {displayWelcomeText}
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              Track projects, exports and recent activity at a glance.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex text-[11px] px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600">
              Draft • Autosaved
            </span>
            <button className="text-xs sm:text-sm px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 text-white font-semibold shadow-sm"
            onClick={handleNewProject}>
              New project
            </button>
          </div>
        </header>

        {/* Stats cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <MetricCard title="Active projects" value="4" helper="2 professor" />
          <MetricCard title="Total exports" value="18" helper="HTML & ZIP combined" />
          <MetricCard title="This week edits" value="42" helper="+12 vs last week" accent />
          <MetricCard title="Errors on export" value="0" helper="Last 7 days" />
        </section>

        {/* Lower section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <GlassCard title="Recent activity" className="lg:col-span-2">
            <ul className="text-xs space-y-2 text-slate-600">
              <li>• Exported “Prof. Sharma – CS Portfolio” as HTML.</li>
              <li>• Updated publications for “Prof. Das – Physics”.</li>
              <li>• Created template “Minimal Academic”.</li>
              <li>• Enabled autosave for all existing projects.</li>
            </ul>
          </GlassCard>

          <GlassCard title="Quick actions">
            <div className="grid grid-cols-1 gap-2 text-xs">
              <button className="w-full px-3 py-2 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 text-white font-semibold shadow-sm">
                Create professor portfolio
              </button>
              <button className="w-full px-3 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition text-slate-700">
                Import images
              </button>
              <button className="w-full px-3 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition text-slate-700">
                View all exports
              </button>
            </div>
          </GlassCard>
        </section>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active }) {
  return (
    <button
      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition ${
        active
          ? "bg-slate-900 text-white"
          : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function MetricCard({ title, value, helper, accent }) {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200">
      <h3 className="text-xs font-semibold uppercase tracking-wide bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="mt-2 text-2xl font-semibold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
        {value}
      </p>
      <p
        className={`mt-1 text-xs ${
          accent ? "text-emerald-500" : "text-slate-500"
        }`}
      >
        {helper}
      </p>
    </div>
  );
}

function GlassCard({ title, children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-3xl p-4 shadow-sm border border-slate-200 ${className}`}
    >
      <h3 className="text-xs font-semibold uppercase tracking-wide bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
        {title}
      </h3>
      <div className="mt-2">{children}</div>
    </div>
  );
}
