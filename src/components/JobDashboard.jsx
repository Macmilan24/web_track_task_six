import JobCard from './JobCard';
import { jobs } from '../data/jobs';
import { ChevronDown } from 'lucide-react';

const JobDashboard = ({ onJobClick }) => {
    return (
        <div className="max-w-5xl mx-auto p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Opportunities</h1>
                    <p className="text-gray-500 text-sm mt-1">Showing {jobs.length} results</p>
                </div>
                <div className="text-sm text-gray-500 flex items-center justify-between gap-2">
                    Sort by: <span className="font-medium text-gray-900">Most relevant</span>
                    <ChevronDown className="w-4 h-4 text-gray-500 mr-2 font-medium " />
                    <span className="bg-gray-300 h-6 w-px"></span>
                </div>

            </div>

            <div className="space-y-4">
                {jobs.map((job) => (
                    <JobCard key={job.id} job={job} onClick={() => onJobClick(job)} />
                ))}
            </div>
        </div>
    );
};

export default JobDashboard;
