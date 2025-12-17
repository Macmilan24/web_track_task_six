import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import JobDashboard from './components/JobDashboard';
import ApplicantDashboard from './components/ApplicantDashboard';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import VerifyEmail from './pages/VerifyEmail';

function App() {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Authentication Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Job Dashboard Routes */}
        <Route
          path="/"
          element={
            selectedJob ? (
              <ApplicantDashboard
                job={selectedJob}
                onBack={() => setSelectedJob(null)}
              />
            ) : (
              <JobDashboard onJobClick={(job) => setSelectedJob(job)} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;

