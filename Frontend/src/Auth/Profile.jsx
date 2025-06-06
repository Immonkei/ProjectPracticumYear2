import { useEffect, useState } from "react";
import { User, Mail, Edit3, Settings, LogOut, Shield, Link, Fingerprint, Sun, Moon, Zap, Award, ArrowLeft } from "lucide-react"; // Import ArrowLeft icon
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();

  // Effect to apply the theme class to the <html> element and save preference
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError("");

      const authToken = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
      const token = authToken;

      if (!token) {
        setError("You are not logged in. Please log in to view your profile.");
        setIsLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        if (err.response && err.response.status === 401) {
          setError("Session expired or invalid. Please log in again.");
          localStorage.removeItem("authToken");
          sessionStorage.removeItem("authToken");
          navigate("/login");
        } else {
          setError(err.response?.data?.detail || "Failed to load profile data.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    window.dispatchEvent(new Event('storage'));
    navigate("/");
  };

  const handleEditProfile = () => {
    alert("Edit Profile clicked! (Feature not yet implemented)");
  };

  // Function to go back to the previous page
  const handleGoBack = () => {
    navigate(-1); // navigate(-1) goes back one step in the history stack
  };

  const getInitials = (name) => {
    const display_name_for_initials = name || profile?.username || 'User';
    return display_name_for_initials.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // --- Error State ---
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4
                     bg-gradient-to-br from-red-100 to-rose-200 dark:from-gray-950 dark:to-gray-800
                     text-gray-900 dark:text-gray-100 transition-colors duration-500">
        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8 max-w-md w-full text-center
                         border border-red-200 dark:border-red-900">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-600 dark:text-red-300" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Authentication Error</h2>
          <p className="text-red-600 dark:text-red-300 mb-6">{error}</p>
          {error.includes("log in") && (
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-red-700 transition-colors"
            >
              Go to Login
            </button>
          )}
        </div>
      </div>
    );
  }

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4
                     bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-gray-800
                     text-gray-900 dark:text-gray-100 transition-colors duration-500">
        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8 max-w-md w-full
                         border border-blue-200 dark:border-indigo-900">
          <div className="animate-pulse">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-600 rounded-full mx-auto mb-6"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded-lg mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded-lg w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  // --- No Profile Data State ---
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4
                     bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-800
                     text-gray-900 dark:text-gray-100 transition-colors duration-500">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300">No profile data available.</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // --- Main Profile UI ---
  return (
    <div className={`min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8
      ${theme === 'light'
        ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900'
        : 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100'}
      transition-colors duration-700 ease-in-out`}>
      <div className={[
        "container mx-auto max-w-5xl rounded-3xl overflow-hidden",
        "shadow-2xl dark:shadow-none",
        "bg-white/80 dark:bg-gray-900/90 backdrop-blur-lg",
        "border border-gray-100 dark:border-gray-700/50",
        "transform transition-all duration-700 ease-in-out",
        theme === 'light' ? 'translate-y-0' : 'translate-y-2'
      ].join(' ')}>
        {/* Cover Image - Now more distinct by mode */}
        <div className={`h-40 sm:h-48 md:h-56 relative
          ${theme === 'light'
            ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600'
            : 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900'
          }`}>
          <div className="absolute inset-0 bg-black opacity-10"></div>
          
          {/* Back Button */}
          <div className="absolute top-4 left-4 z-10">
            <button
              onClick={handleGoBack}
              className={`p-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2
                ${theme === 'light'
                  ? 'bg-white/40 text-blue-800 hover:bg-white/60'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/60'
                }`}
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="hidden sm:inline">Back</span> {/* "Back" label visible on small screens and up */}
            </button>
          </div>

          {/* Theme Toggle Button */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-full shadow-lg transition-all duration-300
                ${theme === 'light'
                  ? 'bg-white/40 text-blue-800 hover:bg-white/60'
                  : 'bg-gray-800/50 text-yellow-300 hover:bg-gray-700/60'
                }`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div className="relative px-6 sm:px-8 pb-8 -mt-20">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between">
            <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full p-2 shadow-xl ring-4 relative flex items-center justify-center
              ${theme === 'light'
                ? 'bg-white ring-white'
                : 'bg-gray-800 ring-gray-800'
              }`}>
              <div className={`w-full h-full rounded-full flex items-center justify-center text-white font-bold
                ${theme === 'light'
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-4xl sm:text-5xl'
                  : 'bg-gradient-to-br from-indigo-700 to-purple-800 text-3xl sm:text-4xl'
                }`}>
                {getInitials(profile?.name || profile?.username)}
              </div>
            </div>

            <div className="mt-4 sm:mt-0 text-center sm:text-right">
              <h1 className={`font-extrabold mb-1
                ${theme === 'light'
                  ? 'text-3xl sm:text-4xl text-gray-900'
                  : 'text-2xl sm:text-3xl text-white'
                }`}>
                {profile?.name || profile?.username || 'User'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Member since 2024</p>
            </div>
          </div>

          {/* Profile Details & Actions */}
          <div className="mt-8 grid md:grid-cols-3 gap-8 sm:gap-12">
            {/* Main Details Column */}
            <div className="md:col-span-2 space-y-6">
              <div className={`p-6 rounded-2xl shadow-inner border
                ${theme === 'light'
                  ? 'bg-gray-50 border-gray-100'
                  : 'bg-gray-800 border-gray-700'}`}>
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2
                  ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                  <User className={`w-5 h-5 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} /> Basic Information
                </h3>
                <div className="space-y-4">
                  {/* User ID */}
                  {profile?.id && (
                    <div className={`flex items-center gap-4 p-4 rounded-xl shadow-sm
                      ${theme === 'light' ? 'bg-white' : 'bg-gray-700'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center
                        ${theme === 'light' ? 'bg-indigo-100' : 'bg-indigo-900'}`}>
                        <Fingerprint className={`w-5 h-5 ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-300'}`} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">User ID</p>
                        <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{profile.id}</p>
                      </div>
                    </div>
                  )}

                  <div className={`flex items-center gap-4 p-4 rounded-xl shadow-sm
                    ${theme === 'light' ? 'bg-white' : 'bg-gray-700'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center
                      ${theme === 'light' ? 'bg-blue-100' : 'bg-blue-900'}`}>
                      <User className={`w-5 h-5 ${theme === 'light' ? 'text-blue-600' : 'text-blue-300'}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Username</p>
                      <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{profile?.username || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-4 p-4 rounded-xl shadow-sm
                    ${theme === 'light' ? 'bg-white' : 'bg-gray-700'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center
                      ${theme === 'light' ? 'bg-green-100' : 'bg-green-900'}`}>
                      <Mail className={`w-5 h-5 ${theme === 'light' ? 'text-green-600' : 'text-green-300'}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                      <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{profile?.email || 'Not provided'}</p>
                    </div>
                  </div>

                  {profile?.google_id && (
                    <div className={`flex items-center gap-4 p-4 rounded-xl shadow-sm
                      ${theme === 'light' ? 'bg-white' : 'bg-gray-700'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center
                        ${theme === 'light' ? 'bg-red-100' : 'bg-red-900'}`}>
                        <Link className={`w-5 h-5 ${theme === 'light' ? 'text-red-600' : 'text-red-300'}`} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Google Account ID</p>
                        <p className={`font-medium text-xs sm:text-sm break-all ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{profile.google_id}</p>
                      </div>
                    </div>
                  )}

                  {profile?.github_id && (
                    <div className={`flex items-center gap-4 p-4 rounded-xl shadow-sm
                      ${theme === 'light' ? 'bg-white' : 'bg-gray-700'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center
                        ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-600'}`}>
                        <Link className={`w-5 h-5 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">GitHub Account ID</p>
                        <p className={`font-medium text-xs sm:text-sm break-all ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{profile.github_id}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleEditProfile}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.01] shadow-md hover:shadow-lg
                  ${theme === 'light'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-indigo-700 text-indigo-100 hover:bg-indigo-800'
                  }`}
              >
                <Edit3 className="w-5 h-5" />
                Edit Profile
              </button>
            </div>

            {/* Sidebar Column */}
            <div className="md:col-span-1 space-y-6">
              {/* Settings Card can be added here if needed */}

              {/* Account Stats */}
              <div className={`p-6 rounded-2xl shadow-xl border
                ${theme === 'light'
                  ? 'bg-white border-gray-100'
                  : 'bg-gray-800 border-gray-700'}`}>
                <h3 className={`text-lg font-semibold mb-4
                  ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Account Stats</h3>
                <div className="space-y-4">
                  <div className={`flex items-center justify-between p-3 rounded-lg
                    ${theme === 'light'
                      ? 'bg-blue-50'
                      : 'bg-blue-900/40 border border-blue-800'}`}>
                    <div className={`font-medium ${theme === 'light' ? 'text-blue-600' : 'text-blue-300'}`}>
                      <Zap className="inline-block w-4 h-4 mr-2" /> Active Sessions
                    </div>
                    <div className={`text-xl font-bold ${theme === 'light' ? 'text-blue-700' : 'text-blue-200'}`}>1</div>
                  </div>
                  <div className={`flex items-center justify-between p-3 rounded-lg
                    ${theme === 'light'
                      ? 'bg-green-50'
                      : 'bg-green-900/40 border border-green-800'}`}>
                    <div className={`font-medium ${theme === 'light' ? 'text-green-600' : 'text-green-300'}`}>
                      <Award className="inline-block w-4 h-4 mr-2" /> Profile Complete
                    </div>
                    <div className={`text-xl font-bold ${theme === 'light' ? 'text-green-700' : 'text-green-200'}`}>100%</div>
                  </div>
                </div>
              </div>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.01] shadow-md hover:shadow-lg
                  ${theme === 'light'
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-red-800 text-red-100 hover:bg-red-900'
                  }`}
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}