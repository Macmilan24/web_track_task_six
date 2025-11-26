import React, { useState } from 'react';
import JobDashboard from './components/JobDashboard';
import ApplicantDashboard from './components/ApplicantDashboard';

function App() {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {selectedJob ? (
        <ApplicantDashboard
          job={selectedJob}
          onBack={() => setSelectedJob(null)}
        />
      ) : (
        <JobDashboard
          onJobClick={(job) => setSelectedJob(job)}
        />
      )}
    </div>
  );
}

export default App;
