import React, { useState } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Users, Filter, X, Star, Building, Clock } from 'lucide-react';

// jobsData remains unchanged, just removing the remote property for consistency
const jobsData = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    posted: '2 days ago',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    salary: '$120,000 - $150,000',
    experience: 'Senior',
    logo: 'https://via.placeholder.com/50',
    featured: true,
    urgent: false,
    description: 'Join our innovative team to build cutting-edge web applications using modern technologies.'
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'InnovateSoft',
    location: 'New York, NY',
    type: 'Full-time',
    posted: '1 day ago',
    skills: ['Product Strategy', 'Agile', 'User Research'],
    salary: '$110,000 - $140,000',
    experience: 'Mid',
    logo: 'https://via.placeholder.com/50',
    featured: false,
    urgent: true,
    description: 'Lead product development and strategy for our flagship SaaS platform.'
  },
  {
    id: 3,
    title: 'Marketing Specialist',
    company: 'GrowthMarketing',
    location: 'Chicago, IL',
    type: 'Part-time',
    posted: '4 days ago',
    skills: ['Social Media', 'Content Creation', 'Analytics'],
    salary: '$60,000 - $75,000',
    experience: 'Entry',
    logo: 'https://via.placeholder.com/50',
    featured: false,
    urgent: false,
    description: 'Drive growth through creative marketing campaigns and data-driven strategies.'
  },
  {
    id: 4,
    title: 'UX Designer',
    company: 'DigitalCreations',
    location: 'Remote',
    type: 'Full-time',
    posted: '1 week ago',
    skills: ['Figma', 'User Flows', 'Prototyping'],
    salary: '$90,000 - $110,000',
    experience: 'Mid',
    logo: 'https://via.placeholder.com/50',
    featured: true,
    urgent: false,
    description: 'Design beautiful and intuitive user experiences for mobile and web applications.'
  },
  {
    id: 5,
    title: 'Backend Engineer',
    company: 'DataSystems',
    location: 'Austin, TX',
    type: 'Full-time',
    posted: '3 days ago',
    skills: ['Node.js', 'Python', 'AWS'],
    salary: '$130 drizzle',
    experience: 'Senior',
    logo: 'https://via.placeholder.com/50',
    featured: false,
    urgent: false,
    description: 'Build scalable backend systems and APIs for our growing platform.'
  },
];

// Job Card Component
const JobCard = ({ job }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className={`group relative bg-white rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
      job.featured ? 'border-blue-200 bg-gradient-to-r from-blue-50/50 to-white' : 'border-gray-100 hover:border-gray-200'
    }`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
              <Building className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {job.title}
              </h3>
              <p className="text-gray-600 font-medium">{job.company}</p>
            </div>
          </div>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-full transition-all ${
              isBookmarked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
          >
            <Star className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{job.posted}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{job.experience}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-blue-600 font-bold text-lg">
            <DollarSign className="w-5 h-5" />
            <span>{job.salary}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        Previous
      </button>
      
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    jobType: 'All Types',
    location: 'All Locations',
    experience: 'All Levels',
    salary: 'Any Range',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = 
      filters.jobType === 'All Types' || job.type === filters.jobType;
    
    const matchesLocation = 
      filters.location === 'All Locations' || 
      job.location === filters.location;

    const matchesExperience = 
      filters.experience === 'All Levels' || job.experience === filters.experience;
    
    const matchesSalary = 
      filters.salary === 'Any Range' || 
      (filters.salary === '$100,000+' && parseInt(job.salary.replace(/[^0-9]/g, '')) >= 100000);

    return (
      matchesSearch &&
      matchesType &&
      matchesLocation &&
      matchesExperience &&
      matchesSalary
    );
  });

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      jobType: 'All Types',
      location: 'All Locations',
      experience: 'All Levels',
      salary: 'Any Range',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 pt-20 pb-32">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20"></div>
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative max-w-6xl mx-auto text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your
            <span className="bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent"> Dream Job</span>
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-8">
            Discover thousands of opportunities from top companies worldwide. 
            Your next career milestone is just one click away.
          </p>
          
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white rounded-2xl p-2 shadow-2xl">
                <div className="flex items-center">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Job title, skills, or company..."
                      className="w-full p-4 pl-14 pr-4 text-lg border-0 rounded-xl focus:outline-none focus:ring-0"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg">
                    Search Jobs
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10,000+</div>
              <div className="text-blue-200">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-blue-200">Top Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">95%</div>
              <div className="text-blue-200">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
              <Filter className="w-5 h-5 text-blue-600" />
              Filter Jobs
            </h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
            >
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 transition-all duration-300 ${
            showFilters ? 'block' : 'hidden md:grid'
          }`}>
            <select
              name="jobType"
              value={filters.jobType}
              onChange={handleFilterChange}
              className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="All Types">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>

            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="All Locations">All Locations</option>
              <option value="San Francisco, CA">San Francisco</option>
              <option value="New York, NY">New York</option>
              <option value="Chicago, IL">Chicago</option>
              <option value="Remote">Remote</option>
            </select>

            <select
              name="experience"
              value={filters.experience}
              onChange={handleFilterChange}
              className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="All Levels">All Levels</option>
              <option value="Entry">Entry Level</option>
              <option value="Mid">Mid Level</option>
              <option value="Senior">Senior Level</option>
            </select>

            <select
              name="salary"
              value={filters.salary}
              onChange={handleFilterChange}
              className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="Any Range">Any Salary</option>
              <option value="$50,000 - $75,000">$50k - $75k</option>
              <option value="$75,000 - $100,000">$75k - $100k</option>
              <option value="$100,000+">$100k+</option>
            </select>

            <button
              onClick={clearFilters}
              className="p-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all font-medium flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
            </h2>
            <p className="text-gray-600">
              Showing {Math.min(startIndex + 1, filteredJobs.length)}-{Math.min(startIndex + jobsPerPage, filteredJobs.length)} of {filteredJobs.length} results
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Sort by:</span>
            <select className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option>Most Recent</option>
              <option>Highest Salary</option>
              <option>Most Relevant</option>
              <option>Company A-Z</option>
            </select>
          </div>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="space-y-6 mb-12">
            {currentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No jobs found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any jobs matching your criteria. Try adjusting your search or filters to discover more opportunities.
            </p>
            <button
              onClick={clearFilters}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}