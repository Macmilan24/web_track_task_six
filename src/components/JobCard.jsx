import React from 'react';

const JobCard = ({ job, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white p-6 rounded-3xl border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer flex gap-4 items-start"
        >
            <div className="flex-shrink-0">
                <img
                    src={job.logo_url}
                    alt={`${job.company} logo`}
                    className="w-12 h-12 rounded-full object-cover"
                />
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
                <p className="text-sm text-gray-500 mb-3">
                    {job.company} • <span className="text-gray-400">{job.location}</span>
                </p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {job.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-medium text-green-600 bg-green-50 rounded-full border border-green-200">
                        {job.type}
                    </span>
                    <span className="bg-gray-300 h-7 w-0.5"></span>
                    <span className="px-3 py-1 text-xs font-medium text-yellow-600 bg-yellow-50 rounded-full border border-yellow-200">
                        {job.categories[0]}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium text-purple-600 bg-purple-50 rounded-full border border-purple-200">
                        {job.categories[1] || "IT"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
