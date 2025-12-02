import { Clock, Flame, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

const ApplicantDashboard = ({ job, onBack }) => {
    if (!job) return null;

    return (
        <div className="max-w-5xl mx-auto p-8 bg-white min-h-screen">
            <button
                onClick={onBack}
                className="mb-6 text-gray-500 hover:text-gray-900 flex items-center gap-2"
            >
                ← Back to Jobs
            </button>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column */}
                <div className="flex-grow md:w-2/3">
                    <section className="mb-8">
                        <h2 className="text-2xl font-black text-gray-900 mb-4">Description</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {job.description}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-black text-gray-900 mb-4">Responsibilities</h2>
                        {job.responsibilities && job.responsibilities.length > 0 ? (
                            <ul className="space-y-3">
                                {job.responsibilities.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-600">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 italic">No responsibilities listed</p>
                        )}
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-black text-gray-900 mb-4">Ideal Candidate we want</h2>
                        {job.ideal_candidate && job.ideal_candidate.length > 0 ? (
                            <ul className="space-y-3">
                                {job.ideal_candidate.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-600">
                                        <span className="text-gray-900 font-black">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 italic">No ideal candidate information available</p>
                        )}
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-black text-gray-900 mb-4">When & Where</h2>
                        <div className="flex items-center gap-3 text-gray-600 border border-gray-200 p-4 rounded-xl">
                            <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            {job.when_where}
                        </div>
                    </section>
                </div>

                {/* Right Column - Sidebar */}
                <div className="md:w-1/3 space-y-8">
                    <section>
                        <h3 className="text-xl font-black text-gray-900 mb-6">About</h3>
                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 rounded-full border-2 border-blue-400 flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Posted On</p>
                                    <p className="text-sm font-semibold text-gray-900">{job.about.posted_on}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 rounded-full border-2 border-blue-400 flex items-center justify-center flex-shrink-0">
                                    <Flame className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Deadline</p>
                                    <p className="text-sm font-semibold text-gray-900">{job.about.deadline}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 rounded-full border-2 border-blue-400 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Location</p>
                                    <p className="text-sm font-semibold text-gray-900">{job.about.location}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 rounded-full border-2 border-blue-400 flex items-center justify-center flex-shrink-0">
                                    <Calendar className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Start Date</p>
                                    <p className="text-sm font-semibold text-gray-900">{job.about.start_date}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 rounded-full border-2 border-blue-400 flex items-center justify-center flex-shrink-0">
                                    <Calendar className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">End Date</p>
                                    <p className="text-sm font-semibold text-gray-900">{job.about.end_date}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-black text-gray-900 mb-4 border-b pb-2">Categories</h3>
                        {job.categories && job.categories.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {job.categories.map((cat, index) => (
                                    <span key={index} className={`px-3 py-1 text-xs font-medium rounded-full ${index % 2 === 0 ? 'text-yellow-600 bg-yellow-50' : 'text-green-600 bg-green-50'}`}>
                                        {cat}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic text-sm">No categories specified</p>
                        )}
                    </section>

                    <section>
                        <h3 className="text-xl font-black text-gray-900 mb-4 border-b pb-2">Required Skills</h3>
                        {job.required_skills && job.required_skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {job.required_skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic text-sm">No required skills specified</p>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ApplicantDashboard;
