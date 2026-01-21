import React from 'react';
import { Link } from 'react-router-dom';
const MoreOption = () => {

const options = [
    {
        id: 1,
        title: "Startup Ideas",
        isEnable: true,
        link: '/startup-idea'
    },
    {
        id: 2,
        title: "Business Models",
        isEnable: true,
        link: '/business-model'
    },
    {
        id: 3,
        title: "Pitch Decks",
        isEnable: true,
        link: '/pitch-decks'
    },
    {
        id: 4,
        title: "Funding & Investors",
        isEnable: true,
        link: '/funding-investors'
    },
    {
        id: 5,
        title: "Incubators & Accelerators",
        isEnable: true,
        link: '/incubators'
    },
    {
        id: 6,
        title: "Mentorship",
        isEnable: true,
        link: '/mentorship'
    },
    {
        id: 7,
        title: "Case Studies",
        isEnable: true,
        link: '/case-study'
    },
    {
        id: 8,
        title: "Find Co-Founders",
        isEnable: true,
        link: '/users'
    },
    {
        id: 9,
        title: "Developers",
        isEnable: true,
        link: '/developers'
    },
    {
        id: 10,
        title: "Designers",
        isEnable: true,
        link: '/designers'
    },
    {
        id: 11,
        title: "Marketers",
        isEnable: true,
        link: '/marketers'
    },
    {
        id: 12,
        title: "Advisors",
        isEnable: true,
        link: '/advisors'
    },
    {
        id: 13,
        title: "Freelancers",
        isEnable: true,
        link: '/freelancers'
    },
    {
        id: 14,
        title: "Teams",
        isEnable: true,
        link: '/team'
    },
    {
        id: 15,
        title: "Website Builder",
        isEnable: true,
        link: '/website-builder'
    },
    {
        id: 16,
        title: "Payment Integration",
        isEnable: true,
        link: '/payment'
    },
    {
        id: 17,
        title: "Legal & Compliance",
        isEnable: true,
        link: '/legal-compliance'
    },
    {
        id: 18,
        title: "Accounting & GST",
        isEnable: true,
        link: '/accounting'
    },
    {
        id: 19,
        title: "Marketing Tools",
        isEnable: true,
        link: '/marketing'
    },
    {
        id: 20,
        title: "Analytics",
        isEnable: true,
        link: '/analytics'
    },
    {
        id: 21,
        title: "AI Tools",
        isEnable: true,
        link: '/ai-tool'
    }
];

   return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
    {
        options?.map((val) => (
            <div 
                key={val.id} 
                className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
                <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Link 
                    to={val.link} 
                    className="block h-full p-6"
                >
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                            {val.title}
                        </h3>
                        <div className="mt-4 flex items-center text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                            <span className="text-sm font-semibold">Explore</span>
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </div>
                </Link>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
        ))
    }
</div>
);
}

export default MoreOption;
