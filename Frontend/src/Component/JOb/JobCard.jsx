import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
        <p className="text-gray-600 mb-2 text-sm md:text-base">
          {job.company} • 📍 {job.location} • 🕒 {job.type} • ⏳ {job.posted}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="bg-gray-100 border border-gray-300 text-[#1D4ED8] px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
        <p className="text-gray-700 font-medium">{job.salary}</p>
      </div>
      <button className="bg-[#1D4ED8] text-white px-6 py-2 rounded-md hover:bg-[#164e9a] transition mt-4 md:mt-0 w-full md:w-auto">
        View Details
      </button>
    </div>
  );
};

export default JobCard;