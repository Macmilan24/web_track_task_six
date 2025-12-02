import { useState, useEffect } from 'react';
import JobCard from './JobCard';
import { fetchOpportunities } from '../services/apiService';
import { ChevronDown, Loader2, AlertCircle } from 'lucide-react';

const JobDashboard = ({ onJobClick }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadOpportunities();
    }, []);

    const loadOpportunities = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchOpportunities();
            setJobs(data);
        } catch (err) {
            setError(err.message || 'Failed to load opportunities. Please try again.');
            console.error('Error loading opportunities:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto p-8">
                <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                    <p className="text-gray-600 text-lg">Loading opportunities...</p>
                </div>
            </div>
        );
    }

    // Error state - show error message with retry button
    if (error) {
        return (
            <div className="max-w-5xl mx-auto p-8">
                <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md w-full">
                        <div className="flex items-start space-x-3">
                            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Opportunities</h3>
                                <p className="text-red-700 text-sm mb-4">{error}</p>
                                <button
                                    onClick={loadOpportunities}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (jobs.length === 0) {
        return (
            <div className="max-w-5xl mx-auto p-8">
                <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                    <p className="text-gray-600 text-lg">No opportunities available at the moment.</p>
                    <button
                        onClick={loadOpportunities}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        Refresh
                    </button>
                </div>
            </div>
        );
    }

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
