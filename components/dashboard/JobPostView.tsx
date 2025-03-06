import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  MapPin,
  Users,
  Eye,
  Calendar,
  X,
  Check,
  Briefcase,
  FileText,
  List,
  UserPlus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  applicants: number;
  posted: string;
  description?: string;
  requirements?: string[];
  requiredStaff?: number;
  deadline?: string;
}

interface JobPostsViewProps {
  onJobClick: (jobId: number) => void;
  onViewApplicants: (jobId: number) => void;
}

export function JobPostsView({ onJobClick, onViewApplicants }: JobPostsViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newJob, setNewJob] = useState<Partial<Job>>({
    title: "",
    department: "",
    location: "",
    description: "",
    requirements: [""],
    requiredStaff: 1,
    deadline: ""
  });
  
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      applicants: 48,
      posted: "5 days ago",
      description: "Lead the development of our customer-facing web applications.",
      requirements: ["5+ years React experience", "TypeScript", "UI/UX expertise"],
      requiredStaff: 2,
      deadline: "April 15, 2025"
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      applicants: 36,
      posted: "1 week ago",
      description: "Shape the roadmap of our core product offerings.",
      requirements: ["3+ years in SaaS product management", "Data analysis", "User research"],
      requiredStaff: 1,
      deadline: "April 7, 2025"
    },
    {
      id: 3,
      title: "UX/UI Designer",
      department: "Design",
      location: "San Francisco, CA",
      applicants: 24,
      posted: "3 days ago",
      description: "Create beautiful interfaces that delight our users.",
      requirements: ["Visual design expertise", "Figma mastery", "User testing experience"],
      requiredStaff: 2,
      deadline: "March 30, 2025"
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      applicants: 18,
      posted: "2 days ago",
      description: "Build and maintain our cloud infrastructure and CI/CD pipelines.",
      requirements: ["AWS/Azure experience", "Kubernetes", "Terraform"],
      requiredStaff: 1,
      deadline: "April 20, 2025"
    },
  ]);

  const handleAddNewJob = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })}`;
    
    const newJobWithId: Job = {
      ...newJob as Job,
      id: jobs.length + 1,
      applicants: 0,
      posted: "Just now",
    };
    
    setJobs([...jobs, newJobWithId]);
    setIsModalOpen(false);
    setNewJob({
      title: "",
      department: "",
      location: "",
      description: "",
      requirements: [""],
      requiredStaff: 1,
      deadline: ""
    });
  };

  const handleRequirementChange = (index: number, value: string) => {
    const updatedRequirements = [...(newJob.requirements || [])];
    updatedRequirements[index] = value;
    setNewJob({...newJob, requirements: updatedRequirements});
  };

  const addRequirement = () => {
    setNewJob({
      ...newJob,
      requirements: [...(newJob.requirements || []), ""]
    });
  };

  const removeRequirement = (index: number) => {
    const updatedRequirements = [...(newJob.requirements || [])];
    updatedRequirements.splice(index, 1);
    setNewJob({...newJob, requirements: updatedRequirements});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Active Job Postings</h2>
          <p className="text-slate-300">Manage your current open positions</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white border-0 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
        >
          <Zap className="mr-2 h-4 w-4" /> Create New Job
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <Card 
            key={job.id} 
            className="border-0 shadow-xl bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-violet-600/5"></div>
            <CardContent className="p-6 relative">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-xl text-white">{job.title}</h3>
                  <div className="text-xs bg-indigo-500/20 text-indigo-300 py-1 px-2 rounded-full inline-flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {job.applicants}
                  </div>
                </div>
                
                <div className="flex items-center text-slate-300 text-sm space-x-4">
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1 text-slate-400" />
                    {job.department}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-slate-400" />
                    {job.location}
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-slate-300">
                      <Calendar className="h-4 w-4 mr-1 text-slate-400" />
                      Posted: {job.posted}
                    </div>
                    {job.deadline && (
                      <div className="flex items-center text-slate-300">
                        <Calendar className="h-4 w-4 mr-1 text-slate-400" />
                        Deadline: {job.deadline}
                      </div>
                    )}
                  </div>
                  
                  {job.requiredStaff && (
                    <div className="flex items-center text-sm text-slate-300">
                      <UserPlus className="h-4 w-4 mr-1 text-slate-400" />
                      Hiring: {job.requiredStaff} {job.requiredStaff === 1 ? 'position' : 'positions'}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Button
                    onClick={() => onJobClick(job.id)}
                    className="bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30"
                  >
                    <Eye className="h-4 w-4 mr-1" /> View Job
                  </Button>
                  <Button
                    onClick={() => onViewApplicants(job.id)}
                    className="bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/30"
                  >
                    <Users className="h-4 w-4 mr-1" /> Applicants
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Job Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-0 shadow-2xl max-w-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-violet-600/5 rounded-lg pointer-events-none"></div>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Create New Job Posting</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-6 py-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-300">Job Title</Label>
                <Input 
                  id="title" 
                  value={newJob.title}
                  onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                  className="bg-slate-800/60 border-slate-700 text-white"
                  placeholder="e.g. Senior Developer"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department" className="text-slate-300">Department</Label>
                <Input 
                  id="department" 
                  value={newJob.department}
                  onChange={(e) => setNewJob({...newJob, department: e.target.value})}
                  className="bg-slate-800/60 border-slate-700 text-white"
                  placeholder="e.g. Engineering"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location" className="text-slate-300">Location</Label>
                <Input 
                  id="location" 
                  value={newJob.location}
                  onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                  className="bg-slate-800/60 border-slate-700 text-white"
                  placeholder="e.g. Remote, New York, NY"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="requiredStaff" className="text-slate-300">Required Staff</Label>
                <Input 
                  id="requiredStaff" 
                  type="number"
                  min="1"
                  value={newJob.requiredStaff}
                  onChange={(e) => setNewJob({...newJob, requiredStaff: parseInt(e.target.value) || 1})}
                  className="bg-slate-800/60 border-slate-700 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="postDate" className="text-slate-300">Post Date</Label>
                <Input 
                  id="postDate" 
                  type="date"
                  className="bg-slate-800/60 border-slate-700 text-white"
                  value={new Date().toISOString().split('T')[0]}
                  disabled
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deadline" className="text-slate-300">Deadline</Label>
                <Input 
                  id="deadline" 
                  type="date"
                  value={newJob.deadline}
                  onChange={(e) => setNewJob({...newJob, deadline: e.target.value})}
                  className="bg-slate-800/60 border-slate-700 text-white"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-300">Job Description</Label>
              <Textarea 
                id="description" 
                value={newJob.description}
                onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                className="bg-slate-800/60 border-slate-700 text-white min-h-24"
                placeholder="Describe the role and responsibilities..."
              />
            </div>
            
            <div className="space-y-3">
              <Label className="text-slate-300 flex items-center">
                <List className="h-4 w-4 mr-2" />
                Key Requirements
              </Label>
              
              {newJob.requirements?.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <Input 
                    value={req}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    className="bg-slate-800/60 border-slate-700 text-white"
                    placeholder="e.g. 3+ years of experience"
                  />
                  <Button 
                    type="button" 
                    variant="destructive"
                    size="icon"
                    onClick={() => removeRequirement(index)}
                    className="bg-red-900/20 hover:bg-red-900/30 text-red-300 border border-red-900/30"
                    disabled={newJob.requirements?.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button 
                type="button" 
                onClick={addRequirement}
                className="bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Requirement
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
              className="bg-transparent hover:bg-slate-800 text-slate-300 border border-slate-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddNewJob}
              className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white border-0"
              disabled={!newJob.title || !newJob.department || !newJob.location}
            >
              <Check className="h-4 w-4 mr-1" /> Create Job Posting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}