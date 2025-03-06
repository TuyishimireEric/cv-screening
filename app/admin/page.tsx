"use client";

import { useState } from "react";
import { Users, Briefcase, Home, Menu, X, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { JobPostsView } from "@/components/dashboard/JobPostView";
import { JobApplicantsView } from "@/components/dashboard/JobApplicantView";

export function AdminDashboard() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleJobClick = (jobId: number) => {
    setSelectedJobId(jobId);
    setCurrentView("jobApplicants");
  };

  const handleBackToJobs = () => {
    setSelectedJobId(null);
    setCurrentView("jobPosts");
  };

  const navigationItems = [
    {
      name: "Dashboard",
      view: "dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Job Posts",
      view: "jobPosts",
      icon: <Briefcase className="h-5 w-5" />,
    },
    { name: "Users", view: "users", icon: <Users className="h-5 w-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>

      {/* Abstract background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-64 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-gradient-to-br from-slate-800 to-slate-900 border-r border-white/10 relative z-10">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">
              HR Admin
            </span>
          </h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.view}>
                <button
                  onClick={() => setCurrentView(item.view)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-all",
                    currentView === item.view
                      ? "bg-gradient-to-r from-indigo-500/20 to-violet-500/20 text-indigo-300 border border-indigo-500/30"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {item.icon}
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold">
              A
            </div>
            <div>
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-slate-400">admin@company.com</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-center text-slate-400 text-xs px-4">
            <Shield className="h-3 w-3 mr-1" />
            Secure admin session
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-white/10 p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">
          HR Admin
        </h1>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-white rounded-md hover:bg-white/10"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-10 bg-slate-900/80 backdrop-blur-sm">
          <div className="fixed top-16 left-0 bottom-0 w-64 bg-gradient-to-br from-slate-800 to-slate-900 border-r border-white/10">
            <nav className="p-4">
              <ul className="space-y-1">
                {navigationItems.map((item) => (
                  <li key={item.view}>
                    <button
                      onClick={() => {
                        setCurrentView(item.view);
                        setMobileMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-all",
                        currentView === item.view
                          ? "bg-gradient-to-r from-indigo-500/20 to-violet-500/20 text-indigo-300 border border-indigo-500/30"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {item.icon}
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Admin User</p>
                  <p className="text-xs text-slate-400">admin@company.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6 md:p-8 pt-20 md:pt-8 relative z-10">
        {currentView === "dashboard" && <DashboardView />}
        {currentView === "jobPosts" && (
          <JobPostsView
            onJobClick={handleJobClick}
            onViewApplicants={(jobId: number) => console.log(jobId)}
          />
        )}
        {currentView === "jobApplicants" && selectedJobId && (
          <JobApplicantsView jobId={selectedJobId} onBack={handleBackToJobs} />
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
