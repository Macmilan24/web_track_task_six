const BASE_URL = 'https://akil-backend.onrender.com';

// Transform API data to match our component structure
const transformJobData = (apiJob) => {
  return {
    id: apiJob.id,
    title: apiJob.title,
    company: apiJob.orgName,
    location: Array.isArray(apiJob.location) 
      ? apiJob.location.join(', ') 
      : apiJob.location || 'Location not specified',
    description: apiJob.description || '',
    responsibilities: apiJob.responsibilities 
      ? apiJob.responsibilities.split('\n').filter(r => r.trim()) 
      : [],
    ideal_candidate: apiJob.idealCandidate 
      ? apiJob.idealCandidate.split('\n').filter(c => c.trim())
      : [],
    when_where: apiJob.whenAndWhere || '',
    about: {
      posted_on: apiJob.datePosted ? new Date(apiJob.datePosted).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }) : '',
      deadline: apiJob.deadline ? new Date(apiJob.deadline).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }) : '',
      location: Array.isArray(apiJob.location) ? apiJob.location[0] : apiJob.location || '',
      start_date: apiJob.startDate ? new Date(apiJob.startDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }) : '',
      end_date: apiJob.endDate ? new Date(apiJob.endDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }) : '',
    },
    categories: apiJob.categories || [],
    required_skills: apiJob.requiredSkills || [],
    logo_url: apiJob.logoUrl || 'https://via.placeholder.com/150',
    type: apiJob.opType === 'inPerson' ? 'In Person' : 'Virtual',
    org_type: apiJob.orgType || 'Organization',
    requirements: apiJob.requirements || '',
  };
};

export const fetchOpportunities = async () => {
  try {
    const response = await fetch(`${BASE_URL}/opportunities/search`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch opportunities');
    }
    
    if (!result.data || !Array.isArray(result.data)) {
      throw new Error('Invalid response format: data is not an array');
    }
    
    const transformedJobs = result.data.map(transformJobData);
    
    return transformedJobs;
    
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
    }
    
    throw error;
  }
};

export const fetchOpportunityById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/opportunities/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Job opportunity not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch opportunity');
    }
    
    return transformJobData(result.data);
    
  } catch (error) {
    console.error('Error fetching opportunity by ID:', error);
    throw error;
  }
};

// ==================== Authentication API Functions ====================


export const signup = async (name, email, password, confirmPassword, role = 'user') => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
        role,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to sign up');
    }

    return result;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};


export const verifyEmail = async (email, otp) => {
  try {
    const response = await fetch(`${BASE_URL}/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        OTP: otp,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to verify email');
    }

    return result;
  } catch (error) {
    console.error('Error during email verification:', error);
    throw error;
  }
};


export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to log in');
    }

    // Save token if login successful
    if (result.success && result.data?.accessToken) {
      saveAuthToken(result.data.accessToken);
    }

    return result;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// ==================== Token Management ====================

const TOKEN_KEY = 'auth_token';


export const saveAuthToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};


export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};
