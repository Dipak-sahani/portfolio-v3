const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* About */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Berojgar Founder
            </h2>
            <p className="text-sm leading-relaxed">
              A next-generation platform for founders, creators, and businesses
              to connect, chat in real time, showcase products, and grow using
              secure payments and AI-driven insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/explore" className="hover:text-white">Explore</a></li>
              <li><a href="/create-page" className="hover:text-white">Create Page</a></li>
              <li><a href="/chat" className="hover:text-white">Chat</a></li>
              <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
            </ul>
          </div>

          {/* Creators & Sellers */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              For Creators & Sellers
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Create Your Page</li>
              <li>Promote Products</li>
              <li>UPI & Secure Payments</li>
              <li>Analytics & Insights</li>
              <li>Trust & Safety</li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>

            <div className="flex items-center gap-3 mb-3 text-sm">
              <i className="fa-solid fa-envelope"></i>
              <span>support@berojgarfounder.com</span>
            </div>

            <div className="flex items-center gap-3 mb-4 text-sm">
              <i className="fa-solid fa-location-dot"></i>
              <span>India</span>
            </div>

            <div className="flex gap-4 text-lg">
              <a href="#" className="hover:text-white">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Trust badges */}
          <div className="flex gap-6 text-sm">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-lock"></i> Secure Payments
            </span>
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-shield-halved"></i> Data Protection
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400 text-center">
            © 2026 <span className="text-white">Berojgarfounder</span>. All rights
            reserved. Built with ❤️ in India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
