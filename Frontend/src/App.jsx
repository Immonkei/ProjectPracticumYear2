import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpTrayIcon,
  SparklesIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  CpuChipIcon,
  UserGroupIcon,
  BoltIcon,
  TrophyIcon,
  StarIcon
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom"; // Commented out for artifact compatibility

const HomeImproved = () => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const careers = ["Career Growth"];

  useEffect(() => {
    const currentCareer = careers[currentIndex];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex < currentCareer.length) {
        setTypedText(currentCareer.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, []);

  const features = [
    {
      icon: <ArrowUpTrayIcon className="h-8 w-8" />,
      title: "Smart CV Upload",
      description: "Advanced AI extracts and analyzes your skills, experience, and career preferences with precision.",
      gradient: "from-blue-500 to-blue-600",
      delay: 0
    },
    {
      icon: <SparklesIcon className="h-8 w-8" />,
      title: "AI-Powered Matching",
      description: "Our machine learning algorithms find perfect job matches based on your unique profile and aspirations.",
      gradient: "from-blue-600 to-blue-700",
      delay: 0.2
    },
    {
      icon: <MagnifyingGlassIcon className="h-8 w-8" />,
      title: "Personalized Discovery",
      description: "Explore curated job recommendations that align with your strengths and career goals.",
      gradient: "from-blue-500 to-blue-600",
      delay: 0.4
    },
    {
      icon: <ChartBarIcon className="h-8 w-8" />,
      title: "Career Analytics",
      description: "Track your progress, analyze market trends, and optimize your job search strategy.",
      gradient: "from-blue-600 to-blue-700",
      delay: 0.6
    },
  ];

  const stats = [
    { number: "10,000+", label: "Jobs Matched", icon: <TrophyIcon className="w-6 h-6" /> },
    { number: "95%", label: "Success Rate", icon: <StarIcon className="w-6 h-6" /> },
    { number: "500+", label: "Companies", icon: <UserGroupIcon className="w-6 h-6" /> },
    { number: "50K+", label: "Active Users", icon: <BoltIcon className="w-6 h-6" /> }
    
   
  ];

  return (
    <>
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-60 right-32 w-32 h-32 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-10 animate-bounce"></div>
          <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full opacity-10 animate-ping"></div>
          <div className="absolute bottom-20 right-20 w-36 h-36 bg-gradient-to-r from-blue-300 to-blue-400 rounded-full opacity-10 animate-pulse"></div>
          
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="flex justify-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-xl opacity-50 animate-ping"></div>
                  <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-full">
                    <RocketLaunchIcon className="w-12 h-12 text-white" />
                  </div>
                </motion.div>
              </div>

              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
                Discover Your{" "}
                <span className="relative">
                  <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                    {typedText}
                  </span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="absolute right-0 top-0 w-1 h-full bg-blue-400"
                  />
                </span>
              </h1>
              
              <motion.p 
                className="text-2xl md:text-3xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                AI-powered job matching that understands your potential and connects you with opportunities that truly fit your aspirations.
              </motion.p>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <NavLink to="/jobs">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-10 py-5 rounded-2xl text-xl font-semibold shadow-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-3"
                >
                  <MagnifyingGlassIcon className="w-6 h-6" />
                  Explore Jobs Now
                </motion.button>
               </NavLink> 
              
              <NavLink to="/Services"> 
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white bg-opacity-20 backdrop-blur-sm border-2 border-white border-opacity-30 text-blue-600 px-10 py-5 rounded-2xl text-xl font-semibold hover:bg-opacity-30 transition-all duration-300 flex items-center gap-3"
                >
                  <ArrowUpTrayIcon className="w-6 h-6" />
                  Upload Your CV
                </motion.button>
            </NavLink> 
            </motion.div>

            {/* Stats Section */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-2xl border border-white border-opacity-20 text-center"
                >
                  <div className="flex justify-center mb-3 text-blue-600">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-blue-600 text-sm uppercase tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-70"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced AI Model Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-full">
                <CpuChipIcon className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-blue-600 mb-6">
              Our AI Will Transform Your Career
            </h2>
            <p className="text-2xl text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
              Advanced machine learning algorithms analyze your CV and unlock opportunities perfectly matched to your potential.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 max-w-4xl mx-auto"
            >
              <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl flex-shrink-0">
                    <SparklesIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-600 mb-3">Intelligent CV Analysis</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Our AI extracts and understands your skills, experience, and career trajectory with human-like comprehension.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-2xl flex-shrink-0">
                    <TrophyIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-600 mb-3">Precision Matching</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Get personalized job recommendations based on deep analysis of your strengths, goals, and market trends.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-blue-600 mb-6">
              How Thrive Works
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Four simple steps to discover your perfect career match using cutting-edge AI technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group relative"
              >
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all duration-300 h-full">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    {React.cloneElement(feature.icon, { className: "h-10 w-10 text-white" })}
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-blue-600 mb-4 uppercase tracking-wide">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>

                  {/* Step number */}
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-12 rounded-3xl text-white max-w-4xl mx-auto">
              <h3 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Match?</h3>
              <p className="text-xl mb-8 opacity-90">Join thousands who've discovered their dream careers with Thrive's AI-powered platform.</p>
              <NavLink to="/Services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-10 py-5 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Your Journey Today
                </motion.button>
              </NavLink>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomeImproved;