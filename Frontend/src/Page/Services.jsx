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
  const [selectedFile, setSelectedFile] = useState(null); // NEW: State to hold the actual file object
  const [fileName, setFileName] = useState("No file chosen");
  const [showJobs, setShowJobs] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [jobMatches, setJobMatches] = useState([]); // CHANGED: Now an empty array to be populated by backend data

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file); // Store the file object here
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
      setSelectedFile(file); // Store the file object here
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => { // CHANGED: Made the function async
    e.preventDefault();

    if (!selectedFile) { // Check if a file is actually selected
      alert("Please select a CV file first.");
      return;
    }

    setIsUploading(true);
    setShowJobs(false); // Hide previous jobs while uploading

    const formData = new FormData();
    formData.append("cv_file", selectedFile); // 'cv_file' must match the parameter name in your FastAPI endpoint (@router.post("/recommendations/", cv_file: UploadFile = File(...)))

    try {
      const response = await fetch("http://127.0.0.1:8000/recommendations/recommendations/", { // CHANGED: Your backend API endpoint
        method: "POST",
        body: formData, // Send the FormData object
        // IMPORTANT: Do NOT manually set 'Content-Type': 'multipart/form-data'.
        // The browser sets it correctly when you use FormData.
      });

      if (!response.ok) {
        // Handle HTTP errors (e.g., 400 Bad Request, 500 Internal Server Error)
        const errorData = await response.json();
        const errorMessage = errorData.detail || "Failed to get job recommendations.";
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Received job recommendations:", data); // Log the response for debugging

      setJobMatches(data); // CHANGED: Set the state with the received job data
      setShowJobs(true);

    } catch (error) {
      console.error("Error uploading CV:", error);
      alert(`Error: ${error.message || "Could not connect to the backend or process your CV. Please try again."}`);
    } finally {
      setIsUploading(false); // Stop uploading animation
    }
  };

  // Function to handle viewing job details
  const handleViewDetail = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  // The return (JSX) part remains mostly the same, but now it uses the dynamic jobMatches
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
                    transition={{ opacity: { duration: 0.2 }, y: { duration: 0.2 } }}
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
              disabled={!selectedFile || isUploading} // Use selectedFile for disabled check
              whileHover={{ scale: selectedFile && !isUploading ? 1.05 : 1 }} // Only scale if a file is selected and not uploading
              whileTap={{ scale: selectedFile && !isUploading ? 0.95 : 1 }}
              className={`mt-8 w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 ${
                !selectedFile || isUploading // Check against selectedFile and isUploading
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
      {showJobs && jobMatches.length > 0 && ( // Ensure jobMatches is not empty before rendering
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
                  key={index} // It's better to use a unique ID from the job if available, otherwise index is fallback
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
                      {/* NEW: Term Display */}
                      {job.term && ( // Only render if job.term exists
                        <div className="flex items-center text-gray-600 text-sm">
                          <BriefcaseIcon className="w-4 h-4 mr-2 text-purple-600" /> {/* Using BriefcaseIcon for term, or pick another if preferred */}
                          Term: {job.term}
                        </div>
                      )}
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
                  {/* Job Link as a Button */}
                  <div className="p-6 border-t border-gray-100 text-right">
                    <button
                      onClick={() => handleViewDetail(job.link)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                    >
                      View Detail
                    </button>
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