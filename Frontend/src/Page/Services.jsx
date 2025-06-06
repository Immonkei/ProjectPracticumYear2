import { useState } from "react";
import { motion } from "framer-motion";
import {
  DocumentArrowUpIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  CloudArrowUpIcon,
  SparklesIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon
} from "@heroicons/react/24/solid";

export default function Services() {
  const [fileName, setFileName] = useState("No file chosen");
  const [showJobs, setShowJobs] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : "No file chosen");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setShowJobs(true);
    }, 2000);
  };

  const jobMatches = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      type: "Full-time",
      salary: "$80k - $120k",
      skills: ["React", "TypeScript", "Tailwind CSS"],
      match: "95%",
      posted: "2 days ago"
    },
    {
      title: "Data Analyst",
      company: "InsightX",
      location: "Phnom Penh",
      type: "Full-time", 
      salary: "$50k - $70k",
      skills: ["Python", "SQL", "Machine Learning"],
      match: "88%",
      posted: "1 week ago"
    },
    {
      title: "UI/UX Designer",
      company: "DesignStudio",
      location: "Hybrid",
      type: "Contract",
      salary: "$60k - $90k",
      skills: ["Figma", "Adobe Suite", "Prototyping"],
      match: "82%",
      posted: "3 days ago"
    },
    {
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Phnom Penh",
      type: "Full-time",
      salary: "$70k - $100k", 
      skills: ["Node.js", "React", "MongoDB"],
      match: "90%",
      posted: "5 days ago"
    }
  ];

  return (
    <>
      {/* Hero Section with Blue Primary Theme */}
      <section className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 pt-20 pb-16 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center max-w-4xl relative z-10"
        >
          {/* Enhanced Icon with Animation */}
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-20 animate-ping"></div>
              <div className="relative bg-blue-600 p-4 rounded-full shadow-lg">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold text-blue-600 mb-6">
            AI-Powered Job Matching
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Upload your resume and let our advanced AI instantly find the perfect job opportunities tailored to your unique skills and experience.
          </p>

          {/* Enhanced Upload Form */}
          <div className="max-w-md mx-auto">
            <motion.div
              className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                isDragOver 
                  ? 'border-blue-600 bg-blue-50 scale-105' 
                  : 'border-gray-300 bg-white hover:border-blue-600 hover:bg-blue-50'
              } shadow-lg hover:shadow-xl`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: isDragOver ? 10 : 0 }}
                  className="mx-auto mb-4"
                >
                  <CloudArrowUpIcon className="w-12 h-12 text-blue-600 mx-auto" />
                </motion.div>
                
                <label
                  htmlFor="cv-upload"
                  className="cursor-pointer block"
                >
                  <span className="text-lg font-semibold text-gray-700 block mb-2">
                    {isDragOver ? 'Drop your file here' : 'Drag & drop your CV'}
                  </span>
                  <span className="text-sm text-gray-500 block mb-4">or click to browse</span>
                  
                  <div className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <DocumentArrowUpIcon className="w-5 h-5 mr-2" />
                    Choose File
                  </div>
                </label>
                
                <input
                  id="cv-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                {fileName !== "No file chosen" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-center justify-center text-sm text-green-600 bg-green-50 px-4 py-2 rounded-lg"
                  >
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    {fileName}
                  </motion.div>
                )}
              </div>
              
              <div className="mt-6 text-xs text-gray-400 text-center">
                Supported formats: PDF, DOC, DOCX (Max 10MB)
              </div>
            </motion.div>

            <motion.button
              onClick={handleSubmit}
              disabled={fileName === "No file chosen" || isUploading}
              whileHover={{ scale: fileName !== "No file chosen" ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-8 w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 ${
                fileName === "No file chosen" 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isUploading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Analyzing CV...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  Find My Perfect Jobs
                </div>
              )}
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Jobs Section */}
      {showJobs && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <motion.div 
                className="flex justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <div className="bg-blue-600 p-4 rounded-full shadow-lg">
                  <BriefcaseIcon className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Perfect Matches Found!
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Based on your CV analysis, here are the top job opportunities that match your skills and experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {jobMatches.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-600 group"
                >
                  <div className="p-6">
                    {/* Match Percentage Badge */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-blue-600 font-semibold">{job.company}</p>
                      </div>
                      <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {job.match} Match
                      </div>
                    </div>

                    {/* Job Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPinIcon className="w-4 h-4 mr-2 text-blue-600" />
                        {job.location} • {job.type}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <CurrencyDollarIcon className="w-4 h-4 mr-2 text-green-500" />
                        {job.salary}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <CalendarIcon className="w-4 h-4 mr-2 text-blue-600" />
                        Posted {job.posted}
                      </div>
                    </div>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}