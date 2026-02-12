export const GUIDE_DATA = {
    funding: {
        title: "Funding & Investors",
        tagline: "Fueling your startup's growth journey",
        icon: "faMoneyBillWave", // You will need to map this in the component
        sections: [
            {
                title: "Types of Funding",
                content: [
                    "**Bootstrapping**: Self-funding or funding from initial revenue. Keeps full control but limits growth speed.",
                    "**Angel Investors**: High-net-worth individuals providing capital for equity, often early-stage.",
                    "**Venture Capital (VC)**: Firms investing institutional money in high-growth startups for equity.",
                    "**Crowdfunding**: Raising small amounts from a large number of people (Kickstarter, Indiegogo).",
                    "**Grants**: Non-repayable funds from governments or organizations (SBIR, etc.).",
                    "**Debt Financing**: Loans that must be repaid with interest, keeping equity intact."
                ]
            },
            {
                title: "Investment Stages",
                content: [
                    "**Pre-Seed**: Idea validation, MVP development.",
                    "**Seed**: Product-market fit, early traction.",
                    "**Series A**: Scaling user base and revenue.",
                    "**Series B**: Expanding market reach, team growth.",
                    "**Series C+**: IPO preparation, acquisitions, global expansion."
                ]
            },
            {
                title: "Strategies for Fundraising",
                content: [
                    "**Build a Network**: Warm introductions to investors are far more effective than cold emails.",
                    "**Know Your Numbers**: deeply understand CAC, LTV, burn rate, and projected revenue.",
                    "**Create FOMO**: Generate competition among investors by running a tight process.",
                    "**Show Traction**: Demonstrate week-over-week growth in key metrics."
                ]
            },
            {
                title: "Pitching Tips",
                content: [
                    "Tell a compelling story, don't just list facts.",
                    "Focus on the problem you're solving.",
                    "Highlight your team's unique advantages.",
                    "Keep the deck concise (10-15 slides)."
                ]
            }
        ]
    },
    pitchDeck: {
        title: "Pitch Decks",
        tagline: "Crafting the perfect story for investors",
        icon: "faChalkboard", // Map locally
        sections: [
            {
                title: "Essential Slides",
                content: [
                    "**Title Slide**: Company name, tagline, presenter contact.",
                    "**Problem**: Define the pain point clearly.",
                    "**Solution**: Your product/service as the answer.",
                    "**Market Size**: TAM, SAM, SOM analysis.",
                    "**Product**: Show, don't just tell (screenshots/demo).",
                    "**Business Model**: How you make money.",
                    "**Traction**: Proof of concept/growth.",
                    "**Competition**: Competitive landscape and your moat.",
                    "**Team**: Why you are the right people to solve this.",
                    "**Ask**: How much you need and what you'll do with it."
                ]
            },
            {
                title: "Design Principles",
                content: [
                    "**Less is More**: One key idea per slide.",
                    "**Visuals Over Text**: Use charts, images, and icons.",
                    "**Consistent Branding**: Use company colors and fonts.",
                    "**Readable Font Size**: At least 24pt for body text."
                ]
            },
            {
                title: "Common Mistakes",
                content: [
                    "Too much text on slides.",
                    "Unrealistic financial projections.",
                    "Ignoring the competition.",
                    "Spending too much time on the product and not enough on the business."
                ]
            }
        ]
    },
    incubators: {
        title: "Incubators & Accelerators",
        tagline: "Fast-tracking your startup success",
        icon: "faRocket",
        sections: [
            {
                title: "Definitions",
                content: [
                    "**Incubators**: Focus on early-stage startups, providing workspace, mentorship, and resources over a longer period (often 1-5 years). Less focus on rapid growth.",
                    "**Accelerators**: Cohort-based programs (fixed term, e.g., 3-6 months) focused on rapid growth, mentorship, and investment (seed capital) culminating in a Demo Day."
                ]
            },
            {
                title: "Top Global Accelerators",
                content: [
                    "**Y Combinator (YC)**: The most prestigious. Based in Silicon Valley.",
                    "**Techstars**: Global network with many city-specific programs.",
                    "**500 Startups**: Focuses on global reach and diverse founders."
                ]
            },
            {
                title: "Application Tips",
                content: [
                    "**Team First**: They bet on founders more than ideas.",
                    "**Clarity**: Be able to explain your business in one sentence.",
                    "**Video Application**: Make it authentic and show your personality.",
                    "**Traction**: Even early programs want to see you've done something."
                ]
            }
        ]
    },
    mentorship: {
        title: "Mentorship",
        tagline: "Guidance from those who have been there",
        icon: "faChalkboardTeacher",
        sections: [
            {
                title: "Why You Need a Mentor",
                content: [
                    "**Experience**: Learn from their mistakes instead of making your own.",
                    "**Network**: Access to their connections (investors, hires, partners).",
                    "**Perspective**: Unbiased feedback on your strategy.",
                    "**Support**: Emotional support during the tough journey."
                ]
            },
            {
                title: "Finding a Mentor",
                content: [
                    "Identify leaders in your specific industry or function.",
                    "Use LinkedIn, industry events, and alumni networks.",
                    "Don't optimize for 'famous' names; look for relevant experience.",
                    "Start with a specific question, not 'will you be my mentor?'."
                ]
            },
            {
                title: "Mentorship Etiquette",
                content: [
                    "Respect their time.",
                    "Set a clear agenda for meetings.",
                    "Follow up on their advice.",
                    "Show gratitude."
                ]
            }
        ]
    },
    caseStudy: {
        title: "Case Studies",
        tagline: "Learning from real-world examples",
        icon: "faBookOpen",
        sections: [
            {
                title: "Value of Case Studies",
                content: [
                    "**Problem Solving**: See how others tackled specific challenges.",
                    "**Strategy**: Understand the 'why' behind major decisions.",
                    "**Benchmarking**: Compare your metrics against successful companies."
                ]
            },
            {
                title: "Famous Pivot Examples",
                content: [
                    "**Slack**: Started as a gaming company (Tiny Speck). Pivot: Internal chat tool -> Enterprise communication.",
                    "**Instagram**: Started as a check-in app (Burbn). Pivot: Photo sharing features only.",
                    "**YouTube**: Started as a video dating site. Pivot: General video hosting."
                ]
            }
        ]
    },
    developers: {
        title: "Developers",
        tagline: "Building your technical foundation",
        icon: "faCode",
        sections: [
            {
                title: "Finding Developers",
                content: [
                    "**Freelance Platforms**: Upwork, Toptal, Fiverr for contract work.",
                    "**Tech Communities**: GitHub, Stack Overflow, Dev.to.",
                    "**Hackathons**: meet passionate builders in action.",
                    "**Referrals**: Ask your network."
                ]
            },
            {
                title: "Hiring Tips",
                content: [
                    "Test for problem-solving skills, not just syntax memory.",
                    "Look for 'product engineers' who care about the user experience.",
                    "Review their portfolio/GitHub projects.",
                    "Cultural fit is crucial for early hires."
                ]
            }
        ]
    },
    designers: {
        title: "Designers",
        tagline: "Crafting user-centric experiences",
        icon: "faPaintBrush",
        sections: [
            {
                title: "Types of Design",
                content: [
                    "**UI (User Interface)**: Visual look and feel.",
                    "**UX (User Experience)**: Usability and user journey.",
                    "**Graphic Design**: Branding, marketing materials.",
                    "**Product Design**: Holistic view of product function and form."
                ]
            },
            {
                title: "Collaborating with Designers",
                content: [
                    "Provide clear briefs and user stories.",
                    "Involve them early in the process.",
                    "Give constructive feedback, not prescriptive solutions.",
                    "Trust their expertise on visual hierarchy."
                ]
            }
        ]
    },
    marketers: {
        title: "Marketers",
        tagline: "Reaching your target audience",
        icon: "faBullhorn",
        sections: [
            {
                title: "Key Marketing Channels",
                content: [
                    "**Content Marketing**: SEO, Blogs, Videos.",
                    "**Social Media**: Organic & Paid (Ads).",
                    "**Email Marketing**: High ROI retention channel.",
                    "**Influencer Marketing**: Leveraging trusted voices."
                ]
            },
            {
                title: "Growth Hacking",
                content: [
                    "Focus on low-cost, high-impact experiments.",
                    "Viral loops (e.g., Dropbox referral program).",
                    "Data-driven decision making."
                ]
            }
        ]
    },
    advisors: {
        title: "Advisors",
        tagline: "Strategic guidance for growth",
        icon: "faUserTie",
        sections: [
            {
                title: "Role of Advisors",
                content: [
                    "Fill specific knowledge gaps (e.g., legal, industry specific).",
                    "Provide credibility to investors.",
                    "Make high-level introductions."
                ]
            },
            {
                title: "Compensation",
                content: [
                    "Typically equity-based (0.1% - 1% depending on stage and involvement).",
                    "Vesting schedules (usually 2 years) to ensure long-term value.",
                    "Formal agreement (FAST agreement)."
                ]
            }
        ]
    },
    freelancers: {
        title: "Freelancers",
        tagline: "Agile talent for specific tasks",
        icon: "faLaptopHouse",
        sections: [
            {
                title: "When to Hire Freelancers",
                content: [
                    "Short-term projects.",
                    "Specialized skills needed occasionally.",
                    "Budget constraints preventing full-time hires."
                ]
            },
            {
                title: "Management Tips",
                content: [
                    "Clear scope of work and deadlines.",
                    "Regular check-ins.",
                    "Use tools like Trello/Asana for task tracking.",
                    "Treat them as part of the team for better engagement."
                ]
            }
        ]
    },
    team: {
        title: "Team Building",
        tagline: "Your most valuable asset",
        icon: "faUsers",
        sections: [
            {
                title: "Structuring Your Team",
                content: [
                    "Identify core roles (CEO, CTO, COO, etc.).",
                    "Balance skills (Technical vs. Business vs. Creative).",
                    "Define clear responsibilities and ownership."
                ]
            },
            {
                title: "Culture",
                content: [
                    "Define your values early.",
                    "Hire for culture add, not just culture fit.",
                    "Foster transparency and psychological safety."
                ]
            }
        ]
    },
    websiteBuilder: {
        title: "Website Builders",
        tagline: "Create your online presence",
        icon: "faLaptopCode",
        sections: [
            {
                title: "Popular Tools",
                content: [
                    "**WordPress**: Flexible, powerful, requires some maintenance.",
                    "**Wix/Squarespace**: Easy drag-and-drop, all-in-one.",
                    "**Webflow**: High design control, steeper learning curve.",
                    "**Shopify**: Best for e-commerce."
                ]
            },
            {
                title: "Selection Criteria",
                content: [
                    "Ease of use vs. Customization needs.",
                    "Scalability.",
                    "SEO capabilities.",
                    "Cost."
                ]
            }
        ]
    },
    paymentValues: { // "payment" key might conflict or be vague, using paymentValues mapped to /payment route
        title: "Payment Integration",
        tagline: "Monetize your product",
        icon: "faCreditCard",
        sections: [
            {
                title: "Top Gateways",
                content: [
                    "**Stripe**: Developer-friendly, global standard.",
                    "**PayPal**: widely trusted by consumers.",
                    "**Razorpay/Paytm**: Strong in India.",
                    "**Lemon Squeezy**: Handles tax compliance for SaaS."
                ]
            },
            {
                title: "Key Considerations",
                content: [
                    "Transaction fees.",
                    "Settlement time.",
                    "Global currency support.",
                    "Chargeback protection."
                ]
            }
        ]
    },
    legalCompliance: {
        title: "Legal & Compliance",
        tagline: "Protecting your business",
        icon: "faGavel",
        sections: [
            {
                title: "Startup Legal Checklist",
                content: [
                    "Incorporation (LLC, C-Corp, Pvt Ltd).",
                    "Founders Agreement.",
                    "IP Assignment Agreements.",
                    "Privacy Policy & Terms of Service.",
                    "Employment Contracts."
                ]
            }
        ]
    },
    accounting: {
        title: "Accounting & GST",
        tagline: "Managing your finances",
        icon: "faCalculator",
        sections: [
            {
                title: "Basics",
                content: [
                    "Separate business and personal accounts.",
                    "Track all expenses.",
                    "Understand tax obligations (GST, Income Tax)."
                ]
            },
            {
                title: "Tools",
                content: [
                    "QuickBooks, Xero, Zoho Books.",
                    "Excel/Google Sheets for very early stage."
                ]
            }
        ]
    },
    marketing: {
        title: "Marketing Tools",
        tagline: "Amplify your reach",
        icon: "faBullhorn",
        sections: [
            {
                title: "Essential Stack",
                content: [
                    "**Analytics**: Google Analytics 4, Mixpanel.",
                    "**Social Media**: Buffer, Hootsuite.",
                    "**Email**: Mailchimp, ConvertKit.",
                    "**Content**: Canva, Figma."
                ]
            }
        ]
    },
    analytics: {
        title: "Analytics",
        tagline: "Data-driven decisions",
        icon: "faChartLine",
        sections: [
            {
                title: "Metrics to Track",
                content: [
                    "**Acquisition**: Traffic sources, CPC.",
                    "**Activation**: Sign-up rate, onboarding completion.",
                    "**Retention**: Churn rate, LTV.",
                    "**Revenue**: MRR, ARR, ARPU."
                ]
            }
        ]
    },
    aiTool: {
        title: "AI Tools",
        tagline: "Supercharge your productivity",
        icon: "faRobot",
        sections: [
            {
                title: "Categories",
                content: [
                    "**Generation**: ChatGPT, Claude, Jasper (Text).",
                    "**Image**: Midjourney, DALL-E, Stable Diffusion.",
                    "**Coding**: GitHub Copilot, Cursor.",
                    "**Meeting Notes**: Otter.ai, Fireflies."
                ]
            }
        ]
    },
    businessModel: {
        title: "Business Model Planning",
        tagline: "Structuring your startup for success",
        icon: "faChartLine",
        sections: [
            {
                title: "1. Idea and Vision",
                content: [
                    "**Problem Statement**: What problem am I solving, and why does it matter?",
                    "**Target Audience**: Who exactly has this problem?",
                    "**Unique Value Proposition**: What makes my solution better or different?",
                    "**Scalability**: Is my idea scalable or just a one-off?",
                    "**Long Term Viability**: Could this idea survive 5–10 years from now?"
                ]
            },
            {
                title: "2. Market and Customers",
                content: [
                    "**Customer Persona**: Age, gender, profession, location, interests.",
                    "**Market Size**: TAM (Total Addressable Market), SAM (Serviceable Available Market), SOM (Serviceable Obtainable Market).",
                    "**Willingness to Pay**: What are customers willing to pay?",
                    "**Purchase Motivation**: What motivates them to buy?"
                ]
            },
            {
                title: "3. Competition and Differentiation",
                content: [
                    "**Competitor Landscape**: Direct and Indirect competitors.",
                    "**SWOT Analysis**: Strengths, Weaknesses, Opportunities, Threats.",
                    "**Competitive Advantage**: Why choose you over them?",
                    "**Moat Strategy**: IP, brand, network effects."
                ]
            },
            {
                title: "4. Product and Solution",
                content: [
                    "**MVP Definition**: Minimum Viable Product features.",
                    "**Unit Cost**: Cost of production/delivery.",
                    "**Quality Assurance**: ensuring reliability.",
                    "**Sustainability Impact**: Environmental responsibility."
                ]
            },
            {
                title: "5. Business Model and Revenue",
                content: [
                    "**Revenue Streams**: Subscription, one-time, freemium, ads, etc.",
                    "**Pricing Logic**: Cost-plus, value-based, competitive.",
                    "**CAC & LTV**: Customer Acquisition Cost vs Lifetime Value.",
                    "**Break Even Point**: Time to profitability."
                ]
            },
            {
                title: "6. Marketing and Growth",
                content: [
                    "**Brand Awareness**: How will people hear about it?",
                    "**Channel Mix**: Social, SEO, Ads, Referrals.",
                    "**Viral Coefficient**: Creating network effects.",
                    "**Retention Strategy**: Keeping customers long-term."
                ]
            },
            {
                title: "7. Operations and Team",
                content: [
                    "**Human Capital**: Key roles needed now vs later.",
                    "**Tech Stack**: Tools and technology required.",
                    "**Supply Chain**: Logistics and management.",
                    "**Legal & Compliance**: IP, contracts, regulations."
                ]
            },
            {
                title: "8. Finances and Funding",
                content: [
                    "**Startup Capital**: Amount needed to start.",
                    "**Cash Runway**: How long capital will last.",
                    "**Funding Source**: Bootstrap, Angel, VC, Grants.",
                    "**Exit Strategy**: Acquisition, IPO, Profitability."
                ]
            },
            {
                title: "9. Risks and Challenges",
                content: [
                    "**Primary Risks**: Market, Tech, Competition risks.",
                    "**Mitigation Plan**: Strategy to handle risks.",
                    "**Macro Sensitivity**: Economic changes impact."
                ]
            },
            {
                title: "10. Vision and Long Term Strategy",
                content: [
                    "**Roadmap Milestones**: 1 year, 3 years, 5 years goals.",
                    "**Founder Alignment**: Personal vs business goals.",
                    "**Success Definitions**: Metrics beyond revenue."
                ]
            },
            {
                title: "11. Validation and Feedback Loops",
                content: [
                    "**Hypothesis Testing**: Validating assumptions.",
                    "**Customer Feedback Loop**: Collecting and implementing feedback.",
                    "**Fail Fast Criteria**: When to pivot or stop."
                ]
            }
        ]
    }
};
