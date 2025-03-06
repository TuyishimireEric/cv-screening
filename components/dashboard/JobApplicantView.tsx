import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Eye,
  Download,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Clock,
  Bell,
  Zap,
} from "lucide-react";

interface JobApplicantsViewProps {
  jobId: number;
  onBack: () => void;
}

export function JobApplicantsView({ jobId, onBack }: JobApplicantsViewProps) {
  const jobTitle = "Senior Frontend Developer";

  const applicants = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      match: "92%",
      status: "Screening",
      applied: "2 days ago",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      match: "87%",
      status: "Interview",
      applied: "3 days ago",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "m.brown@example.com",
      match: "78%",
      status: "Screening",
      applied: "1 day ago",
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "e.wilson@example.com",
      match: "95%",
      status: "Assessment",
      applied: "4 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 text-slate-300 hover:text-white hover:bg-white/5"
        >
          ← Back to Jobs
        </Button>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">{jobTitle}</h2>
            <p className="text-slate-300">
              {applicants.length} applicants found
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-slate-300 border-slate-700 hover:bg-slate-700/40 hover:text-white"
            >
              <Bell className="h-4 w-4 mr-2" /> Notifications
            </Button>
            <Button className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white border-0 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40">
              <Zap className="mr-2 h-4 w-4" /> Export List
            </Button>
          </div>
        </div>
      </div>

      <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-violet-600/5"></div>
        <CardContent className="p-0 relative">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">
                    Applicant
                  </th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">
                    Match Score
                  </th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">
                    Applied
                  </th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {applicants.map((applicant) => (
                  <tr
                    key={applicant.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold">
                          {applicant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-white">
                            {applicant.name}
                          </div>
                          <div className="text-sm text-slate-400">
                            {applicant.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-emerald-400">
                        {applicant.match}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-500/20 text-indigo-300">
                        {applicant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      {applicant.applied}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30"
                        >
                          <Eye className="h-4 w-4 mr-1" /> Resume
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
