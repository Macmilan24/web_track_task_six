# Job Listing Application

This project is a Job Listing Application built with React and Tailwind CSS. It features live data integration with the Akil Backend API, displaying real job opportunities with comprehensive details and interactive features.

## Features

-   **Live API Integration**: Fetches real-time job opportunities from the Akil Backend API
-   **Job Dashboard**: Displays a list of job opportunities with key details (Title, Company, Location, Tags)
-   **Applicant Dashboard**: Provides a detailed view of a selected job, including description, responsibilities, ideal candidate profile, and more
-   **Loading States**: Beautiful loading indicators while fetching data
-   **Error Handling**: Graceful error messages with retry functionality
-   **Responsive Design**: Built with Tailwind CSS for a modern and responsive UI

## API Integration

The application integrates with the Akil Backend API to fetch live job opportunities:

- **API Endpoint**: `https://akil-backend.onrender.com/opportunities/search`
- **Data Fetching**: Uses native `fetch()` API with comprehensive error handling
- **Data Transformation**: Automatically maps API fields to component requirements
- **Error Recovery**: Retry functionality for failed network requests
- **Empty States**: Handles cases where no opportunities are available

### Features of API Integration:

1. **Automatic Data Loading**: Job opportunities are fetched automatically when the app loads
2. **Field Mapping**: API data is transformed to match component expectations (e.g., `orgName` → `company`)
3. **Safe Data Access**: All components include null checks to prevent errors from missing data
4. **Loading Indicators**: Spinner shown while data is being fetched
5. **Error Messages**: Clear, user-friendly error messages with retry options

## Screenshots

### Job Dashboard with Live API Data
The main page listing all available job opportunities fetched from the API in real-time.
![Job Dashboard](image.png)

### Applicant Dashboard (Job Details)
The detailed view when a job card is clicked, showing all job information from the API.
![Applicant Dashboard](image-1.png)

## How to Run

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
3.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## Code Structure

```
src/
├── services/
│   └── apiService.js       # API integration and data transformation
├── components/
│   ├── JobDashboard.jsx    # Main job listing page with API data
│   ├── JobCard.jsx         # Individual job card component
│   └── ApplicantDashboard.jsx  # Job detail view
├── App.jsx                 # Main application component
└── main.jsx                # Application entry point
```

## Technical Highlights

- **Clean Code**: Well-commented and organized code following best practices
- **Error Handling**: Comprehensive error handling for network failures and invalid data
- **Loading States**: User-friendly loading indicators during data fetching
- **Data Safety**: Null checks and fallbacks for missing or incomplete data
- **Responsive Design**: Mobile-friendly layout using Tailwind CSS

## API Data Handling

The application handles various API response scenarios:
- ✅ Successful data fetch (23+ opportunities)
- ✅ Network errors (with retry button)
- ✅ Empty data responses (with helpful message)
- ✅ Missing optional fields (with fallbacks)
- ✅ Invalid image URLs (with placeholder fallback)

