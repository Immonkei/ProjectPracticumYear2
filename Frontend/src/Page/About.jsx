import React from "react";
import { motion } from "framer-motion";
import { 
  UserGroupIcon, 
  LightBulbIcon, 
  ChartBarIcon,
  SparklesIcon,
  RocketLaunchIcon,
  HeartIcon,
  CodeBracketIcon,
  CpuChipIcon,
  AcademicCapIcon,
  StarIcon
} from "@heroicons/react/24/outline";

const About = () => {
  const teamMembers = [
    {
      name: "Min Phanith",
      role: "Frontend & Backend",
      photo: "/Assets/IMG_0215.JPG",
      skills: ["React", "Node.js", "UI/UX"],
      gradient: "from-blue-600 to-blue-500"
    },
    {
      name: "Rath Chhneoum",
      role: "Machine Learning Trainer",
      photo: "/Assets/chneoum.jpg",
      skills: ["Python", "TensorFlow", "AI"],
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      name: "Ly Hour",
      role: "Backend & Machine Learning",
      photo: "/Assets/hour.jpg",
      skills: ["Python", "ML", "APIs"],
      gradient: "from-blue-600 to-blue-700"
    },
    {
      name: "Ly Keasing",
      role: "Supporter",
      photo: "/path/to/photo4.jpg",
      skills: ["Support", "Testing", "QA"],
      gradient: "from-blue-600 to-blue-800"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-20 md:py-28 text-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white opacity-5 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white opacity-10 rounded-full animate-bounce"></div>
          <div className="absolute bottom-32 left-1/3 w-16 h-16 bg-white opacity-5 rounded-full animate-ping"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 max-w-4xl relative z-10"
        >
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-20 animate-ping"></div>
              <div className="relative bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-full border border-white border-opacity-30">
                <SparklesIcon className="w-12 h-12 text-white" />
              </div>
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white">
            About{" "}
            <span className="bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">
              Thrive
            </span>
          </h1>
          <motion.p 
            className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Transforming careers through AI-powered innovation. We connect talented individuals 
            with their perfect opportunities using cutting-edge technology.
          </motion.p>

          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {[
              { number: "1000+", label: "Job Matches" },
              { number: "95%", label: "Success Rate" },
              { number: "24/7", label: "AI Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-200 text-sm uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Our Story Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-blue-600 p-4 rounded-full">
                <RocketLaunchIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100"
            >
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  <span className="text-blue-600 font-semibold">Thrive</span> was born from a vision to revolutionize career discovery. 
                  As passionate second-year ITE students, we recognized the challenges in today's job market and decided to create a solution.
                </p>
                <p className="text-lg">
                  Our journey began during our practicum, where we witnessed firsthand the disconnect between 
                  talented job seekers and the right opportunities. We knew AI could bridge this gap.
                </p>
                <p className="text-lg">
                  Today, we're proud to offer a platform that doesn't just match jobs—it understands aspirations, 
                  analyzes potential, and opens doors to careers people truly love.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {[
                { icon: AcademicCapIcon, title: "Student Innovation", desc: "Built by students, for everyone" },
                { icon: CpuChipIcon, title: "AI-Powered", desc: "Advanced algorithms for perfect matches" },
                { icon: HeartIcon, title: "Passion-Driven", desc: "Connecting people with their dream careers" }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-blue-600 p-3 rounded-xl flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[{
              title: "Inclusion",
              icon: UserGroupIcon,
              description: "Everyone deserves a chance to thrive. We eliminate bias to create equitable job opportunities for all backgrounds and experiences.",
              color: "bg-blue-600",
              bgColor: "bg-blue-50"
            }, {
              title: "Innovation",
              icon: LightBulbIcon, 
              description: "We push boundaries through AI and design thinking to constantly improve how people discover and pursue their ideal careers.",
              color: "bg-blue-600",
              bgColor: "bg-blue-50"
            }, {
              title: "Impact",
              icon: ChartBarIcon,
              description: "Our success is measured by the meaningful careers we help create and the lives we positively transform through technology.",
              color: "bg-blue-600",
              bgColor: "bg-blue-50"
            }].map((value, index) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center group hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-20 h-20 ${value.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-600 uppercase tracking-wide">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-blue-600 p-4 rounded-full">
                <CodeBracketIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              The passionate developers behind Thrive's innovation
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group"
              >
                <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-3xl border border-white border-opacity-20 text-center hover:bg-opacity-20 transition-all duration-300">
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-r ${member.gradient} rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
                    <img
                      src={member.photo}
                      alt={member.name}
                      onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                      className="relative w-32 h-32 rounded-full mx-auto object-cover border-4 border-white border-opacity-30 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-blue-400 rounded-full p-2">
                      <StarIcon className="w-4 h-4 text-blue-900" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-white">{member.name}</h3>
                  <p className="text-blue-200 mb-4 font-medium">{member.role}</p>
                  
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-blue-600 bg-opacity-30 rounded-full text-xs font-medium text-white border border-blue-400 border-opacity-30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;