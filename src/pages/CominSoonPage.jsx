import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRocket, 
  faLightbulb, 
  faChartLine, 
  faUsers, 
  faTools, 
  faHandshake,
  faFileAlt,
  faBullhorn,
  faCode,
  faPalette,
  faUserTie,
  faGlobe,
  faCreditCard,
  faBalanceScale,
  faChartBar,
  faRobot
} from '@fortawesome/free-solid-svg-icons';

const ComingSoonPage = () => {
  const features = [
    { icon: faRocket, title: "Startup Ideas", desc: "Curated startup concepts and validation methods" },
    { icon: faLightbulb, title: "Business Models", desc: "Revenue models and business frameworks" },
    { icon: faChartLine, title: "Pitch Decks", desc: "Investor-ready pitch deck templates" },
    { icon: faUsers, title: "Funding & Investors", desc: "Connect with angel investors and VCs" },
    { icon: faHandshake, title: "Incubators & Accelerators", desc: "Application guidance for top programs" },
    { icon: faUserTie, title: "Mentorship", desc: "Connect with industry mentors" },
    { icon: faFileAlt, title: "Case Studies", desc: "Real-world startup success stories" },
    { icon: faUsers, title: "Find Co-Founders", desc: "Match with complementary co-founders" },
    { icon: faCode, title: "Developers", desc: "Hire vetted tech talent" },
    { icon: faPalette, title: "Designers", desc: "UI/UX and product designers" },
    { icon: faBullhorn, title: "Marketers", desc: "Growth and digital marketing experts" },
    { icon: faUserTie, title: "Advisors", desc: "Industry advisors and consultants" },
    { icon: faUsers, title: "Freelancers", desc: "On-demand freelance professionals" },
    { icon: faUsers, title: "Teams", desc: "Pre-built startup teams" },
    { icon: faGlobe, title: "Website Builder", desc: "No-code website creation tools" },
    { icon: faCreditCard, title: "Payment Integration", desc: "Easy payment gateway setup" },
    { icon: faBalanceScale, title: "Legal & Compliance", desc: "Legal templates and compliance guides" },
    { icon: faChartBar, title: "Accounting & GST", desc: "Financial management tools" },
    { icon: faBullhorn, title: "Marketing Tools", desc: "Digital marketing automation" },
    { icon: faChartLine, title: "Analytics", desc: "Business intelligence dashboards" },
    { icon: faRobot, title: "AI Tools", desc: "AI-powered startup assistants" }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6">
            <FontAwesomeIcon 
              icon={faRocket} 
              className="text-blue-600 text-4xl animate-bounce"
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Launching Soon!
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building something amazing to help startups grow. 
            Our platform is under construction and will be ready to launch soon.
          </p>
          <div className="mt-8">
            <span className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full text-lg">
              <FontAwesomeIcon icon={faTools} className="mr-3" />
              Under Active Development
            </span>
            <Link 
                to="/"
                className="inline-flex items-center px-6 py-3 mt-2 bg-cyan-600 text-white font-semibold rounded-full text-lg"
              >
                Back to Home
              </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Features We're Building 
            <span className="text-blue-600 ml-2">
              <FontAwesomeIcon icon={faLightbulb} />
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
              >
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon 
                        icon={feature.icon} 
                        className="text-blue-500 text-xl"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{feature.desc}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"
                      style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                    ></div>
                  </div>
                  <span className="ml-3 font-medium">In Progress</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Countdown/CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white mb-12">
          <div className="max-w-3xl mx-auto">
            <FontAwesomeIcon 
              icon={faChartLine} 
              className="text-5xl mb-6 opacity-80"
            />
            <h2 className="text-3xl font-bold mb-4">
              Be The First To Know When We Launch!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get early access, exclusive resources, and startup tools before anyone else.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300">
                Notify Me on Launch
                <FontAwesomeIcon icon={faRocket} className="ml-2" />
              </button>
              <Link 
                to="/"
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-500">
          <p className="text-lg mb-4">
            <FontAwesomeIcon icon={faHandshake} className="mr-2" />
            Building the future of startup ecosystem
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} berojgarfounder. All rights reserved. 
            <span className="mx-2">•</span>
            Contact: hello@berojgarfounder.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;