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
  StarIcon,
  ChatBubbleLeftRightIcon,
  BuildingOffice2Icon
} from "@heroicons/react/24/outline";

const About = () => {
  const mentor = {
    name: "Dr. Sarah Johnson",
    role: "Senior Tech Mentor & Advisor",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    // skills: ["Leadership", "Strategy", "Mentorship", "AI Ethics"], // Skills removed
    gradient: "from-blue-600 to-blue-500",
    bio: "With 15+ years in tech leadership, Dr. Johnson guides our team toward innovative solutions and ethical AI practices.",
    social: {
      facebook: "https://facebook.com/drjohnson",
      telegram: "https://t.me/drjohnson",
      github: "https://github.com/drjohnson"
    }
  };

  const teamMembers = [
    {
      name: "Min Phanith",
      role: "Frontend & Backend",
      photo: "/Assets/IMG_0215.JPG",
      // skills: ["React", "Node.js", "UI/UX"], // Skills removed
      gradient: "from-blue-600 to-blue-500",
      bio: "Full-stack developer passionate about creating seamless user experiences.",
      social: {
        facebook: "https://facebook.com/minphanith",
        telegram: "https://t.me/minphanith",
        github: "https://github.com/minphanith"
      }
    },
    {
      name: "Rath Chhneoum",
      role: "Machine Learning Trainer",
      photo: "/Assets/chneoum.jpg",
      // skills: ["Python", "TensorFlow", "AI"], // Skills removed
      gradient: "from-blue-600 to-indigo-600",
      bio: "AI specialist focused on developing intelligent matching algorithms.",
      social: {
        facebook: "https://facebook.com/rathchhneoum",
        telegram: "https://t.me/rathchhneoum",
        github: "https://github.com/rathchhneoum"
      }
    },
    {
      name: "Ly Hour",
      role: "Backend & Machine Learning",
      photo: "/Assets/hour.jpg",
      // skills: ["Python", "ML", "APIs"], // Skills removed
      gradient: "from-blue-600 to-blue-700",
      bio: "Backend architect specializing in scalable ML infrastructure.",
      social: {
        facebook: "https://facebook.com/lyhour",
        telegram: "https://t.me/lyhour",
        github: "https://github.com/lyhour"
      }
    },
    {
      name: "Ly Keasing",
      role: "Supporter",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      // skills: ["Support", "Testing", "QA"], // Skills removed
      gradient: "from-blue-600 to-blue-800",
      bio: "Quality assurance expert ensuring our platform delivers excellence.",
      social: {
        facebook: "https://facebook.com/lykeasing",
        telegram: "https://t.me/lykeasing",
        github: "https://github.com/lykeasing"
      }
    },
  ];

  const collaborationLogos = [
    {
      name: "Royal University of Phnom Penh",
      logo: "https://scontent.fpnh10-1.fna.fbcdn.net/v/t39.30808-6/348442150_228255273247320_2311092952281076902_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG0BTBrFTCS6yWTWs66V753Xswx-7U6h9tezDH7tTqH26VmLd6O1Lz2AWWzN5Z3p8qGTfEZHIyPFDmEkV1ls85Y&_nc_ohc=JbohJkchYWkQ7kNvwEAOra0&_nc_oc=AdmiG-fJokQ-lTLZ6q4ruaGyaTgsYUp6G1tMAZmbkptqhpS37klpJol5KW8fcjt77S4&_nc_zt=23&_nc_ht=scontent.fpnh10-1.fna&_nc_gid=BJfowQ0S-ntv_4SeczOXeg&oh=00_AfMQnHRmGiKgClwcEI5NjL4ly-0BKiILRIEIArhm-OyKHg&oe=6848DB6C",
      description: "Leading Higher Education Institution"
    },
    {
      name: "Faculty of Engineering",
      logo: "https://scontent.fpnh10-1.fna.fbcdn.net/v/t39.30808-6/492695647_3944256892492658_6893350523347135550_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHjyD4Cy4Owh_9hLuvkJKQizfvO7WK8-WPN-87tYrz5YwCe54OBR7DBv16OZTqE4q9b4OzfJpEVcckKDZ2ow7li&_nc_ohc=rfJHOAOQZcQQ7kNvwHgkPd_&_nc_oc=AdlTwFmnmisKmEQdLsBM5aCkLniepTOfm_TNTH6cyg9bVsztwYzlfuKyKaCpP0nEHdg&_nc_zt=23&_nc_ht=scontent.fpnh10-1.fna&_nc_gid=rHWXUggtPpz8eQ3UkUvULA&oh=00_AfMjd1cmkX-J9-afSXBL41sNozPRY5ApoPtMHJQ9CVTnGQ&oe=6848B717",
      description: "Engineering Excellence & Innovation"
    },
    {
      name: "ITE Department",
      logo: "https://scontent.fpnh10-1.fna.fbcdn.net/v/t39.30808-6/396717787_804857584773344_3543346762002089097_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEE5DUkaE__K3m43b9uYyr9aAXk4Hk-pnNoBeTgeT6mc3vQ5YGEMCFvO_cD5dYsdVEXK-fUeAipIQJXnNKtWQo6&_nc_ohc=gz8VLsorJ-4Q7kNvwHMUlgN&_nc_oc=AdlsAWF4v5XUTvxFBnytmr18cl8HuhjTRWdUxBkASD8yom7tKvB9PCfORPzs1s4-mbc&_nc_zt=23&_nc_ht=scontent.fpnh10-1.fna&_nc_gid=nweDzNj-nV1GV3yir_NQFA&oh=00_AfOAFAm-lMNHrrsCpdK1UCmIxJ_7oGJuzxiHdCQXvzF9gg&oe=6848C34D",
      description: "Information Technology Engineering"
    }
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

  const SocialIcon = ({ platform, url }) => {
    const platformColors = {
      facebook: "bg-blue-600 hover:bg-blue-700",
      telegram: "bg-sky-500 hover:bg-sky-600",
      github: "bg-gray-800 hover:bg-gray-900"
    };

    const icons = {
      facebook: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      telegram: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      github: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    };

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-10 h-10 ${platformColors[platform]} rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg hover:shadow-xl`}
      >
        <span className="text-white">
          {icons[platform]}
        </span>
      </a>
    );
  };

  const PersonCard = ({ person, isMentor = false }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -10,
        transition: { type: "spring", stiffness: 300 }
      }}
      className="group"
    >
      <div className={`${isMentor ? 'bg-white bg-opacity-10' : 'bg-white bg-opacity-10'} backdrop-blur-sm p-8 rounded-3xl border ${isMentor ? 'border-white border-opacity-20' : 'border-white border-opacity-20'} text-center hover:bg-opacity-20 transition-all duration-300 relative overflow-hidden`}>
        {/* Mentor Badge */}
        {isMentor && (
          <div className="absolute top-4 right-4 bg-blue-400 bg-opacity-30 px-3 py-1 rounded-full">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Mentor</span>
          </div>
        )}

        <div className="relative mb-6">
          <div className={`absolute inset-0 bg-gradient-to-r ${person.gradient} rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
          <img
            src={person.photo}
            alt={person.name}
            onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
            className="relative w-32 h-32 rounded-full mx-auto object-cover border-4 border-white border-opacity-30 group-hover:scale-105 transition-transform duration-300"
          />
          <div className={`absolute -bottom-2 -right-2 ${isMentor ? 'bg-blue-400' : 'bg-blue-400'} rounded-full p-2`}>
            {isMentor ? (
              <ChatBubbleLeftRightIcon className="w-4 h-4 text-blue-900" />
            ) : (
              <StarIcon className="w-4 h-4 text-blue-900" />
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 text-blue-600">{person.name}</h3>
        {/* Changed role color to blue-500 */}
        <p className="text-blue-500 mb-3 font-medium">{person.role}</p>

        {/* Bio */}
        <p className="text-blue-500 text-opacity-80 text-sm mb-4 leading-relaxed">
          {person.bio}
        </p>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-3">
          <SocialIcon platform="facebook" url={person.social.facebook} />
          <SocialIcon platform="telegram" url={person.social.telegram} />
          <SocialIcon platform="github" url={person.social.github} />
        </div>
      </div>
    </motion.div>
  );

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
                  We are passionate students from the <span className="font-semibold text-blue-600">Royal University of Phnom Penh</span>,
                  studying in the <span className="font-semibold text-blue-600">Department of Information Technology Engineering</span>
                  under the <span className="font-semibold text-blue-600">Faculty of Engineering</span>.
                </p>
                <p className="text-lg">
                  Our journey began during our academic studies, where we witnessed firsthand the disconnect between
                  talented job seekers and the right opportunities. As collaborative team members, we recognized
                  the challenges in today's job market and decided to create an AI-powered solution.
                </p>
                <p className="text-lg">
                  Through our collaboration and shared expertise in technology, we've built a platform that doesn't
                  just match jobs—it understands aspirations, analyzes potential, and opens doors to careers people truly love.
                  Our university education has provided us with the foundation to tackle real-world problems through innovation.
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
                { icon: AcademicCapIcon, title: "University Excellence", desc: "Royal University of Phnom Penh students" },
                { icon: CpuChipIcon, title: "ITE Innovation", desc: "Information Technology Engineering expertise" },
                { icon: HeartIcon, title: "Collaborative Spirit", desc: "Teamwork driving technological advancement" }
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

      {/* Collaboration Partners Section */}
      <section className="py-20 md:py-28 bg-white">
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
                <BuildingOffice2Icon className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Academic Partners</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Proud collaboration with leading educational institutions
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {collaborationLogos.map((partner, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl shadow-xl border border-blue-200 text-center group hover:shadow-2xl transition-all duration-300"
              >
                <div className="mb-6">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-24 h-24 mx-auto rounded-2xl object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/100x100/3B82F6/FFFFFF?text=LOGO")}
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">
                  {partner.name}
                </h3>
                <p className="text-blue-600 text-sm">{partner.description}</p>
              </motion.div>
            ))}
          </motion.div>
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

      {/* Enhanced Mentor & Team Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          {/* Mentor Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-blue-600 p-4 rounded-full">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Mentor</h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Guiding our vision with expertise and wisdom
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="max-w-md">
              <PersonCard person={mentor} isMentor={true} />
            </div>
          </motion.div>

          {/* Team Section */}
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
              The passionate ITE students behind Thrive's innovation from Royal University of Phnom Penh
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
              <PersonCard key={index} person={member} />
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;