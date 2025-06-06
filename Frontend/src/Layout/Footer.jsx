import React, { useState } from 'react';
import { 
  Gift, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Youtube,
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Heart,
  Globe,
  Shield,
  Award,
  Users,
  Briefcase,
  TrendingUp
} from 'lucide-react';

const Footer = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = isMobileMenuOpen ? 'unset' : 'hidden';
  };
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Gift className="text-white text-xl" />
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Thrive
              </span>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering careers, connecting dreams. We're more than a job board – 
              we're your partner in professional growth and success.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Russian Federation Blvd (110), Phnom Penh 120404</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>thrive@gmail.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { Icon: Twitter, href: '#', color: 'hover:text-blue-600' },
                { Icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
                { Icon: Facebook, href: '#', color: 'hover:text-blue-600' },
                { Icon: Instagram, href: '#', color: 'hover:text-blue-600' },
                { Icon: Youtube, href: '#', color: 'hover:text-blue-600' }
              ].map(({ Icon, href, color }, index) => (
                <a
                  key={index}
                  href={href}
                  className={`w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:bg-blue-600 ${color}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

       
          <div>
            <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/careers', label: 'Careers' },
                { to: '/blog', label: 'Blog' },
                { to: '/press', label: 'Press Kit' },
                { to: '/investors', label: 'Investors' }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.to}
                    className="text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Resources
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/jobs', label: 'Job Board' },
                { to: '/services', label: 'Services' },
                { to: '/help', label: 'Help Center' },
                { to: '/resources', label: 'Career Guide' },
                { to: '/salary', label: 'Salary Insights' }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.to}
                    className="text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Legal
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms of Service' },
                { to: '/cookies', label: 'Cookie Policy' },
                { to: '/accessibility', label: 'Accessibility' },
                { to: '/security', label: 'Security' }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.to}
                    className="text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm flex items-center gap-2">
              © 2025 Thrive. Made with 
              <Heart className="w-4 h-4 text-blue-600 fill-current" />
              for your success.
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                All systems operational
              </div>
              <div className="text-gray-400">
                Version 2.1.0
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;