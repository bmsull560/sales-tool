import { Company, Demo, DemoType, DemoStage, Attendee, UseCase, Stakeholder, Relationship } from './types';

// Mock Companies
export const mockDemos: Demo[] = [
  {
    id: "1",
    companyId: "1",
    title: "Initial Platform Overview",
    date: "2025-03-15T14:00:00Z",
    type: "Vision",
    stage: "Discovery",
    attendees: [
      {
        id: "1",
        name: "John Smith",
        title: "CTO",
        email: "john.smith@acme.example.com"
      },
      {
        id: "2",
        name: "Sarah Johnson",
        title: "Engineering Manager",
        email: "sarah.j@acme.example.com"
      }
    ],
    useCases: [
      {
        id: "1",
        name: "CI/CD Pipeline Automation",
        description: "Streamlining deployment processes across multiple teams"
      },
      {
        id: "2",
        name: "Developer Productivity",
        description: "Improving code review and collaboration workflows"
      }
    ],
    recordingUrl: "https://recording.example.com/demo-1",
    aiSummary: "Key discussion points included CI/CD automation needs and developer productivity challenges. Strong interest in deployment automation features. Technical requirements focus on Git integration and custom workflow support.",
    actionItems: [
      "Schedule technical deep-dive for CI/CD integration",
      "Share documentation on API specifications",
      "Follow up with pricing for enterprise tier"
    ],
    created_at: "2025-03-15T14:00:00Z",
    updated_at: "2025-03-15T15:30:00Z"
  },
  {
    id: "2",
    companyId: "1",
    title: "Technical Deep Dive",
    date: "2025-03-20T15:00:00Z",
    type: "Technical",
    stage: "Technical Review",
    attendees: [
      {
        id: "2",
        name: "Sarah Johnson",
        title: "Engineering Manager",
        email: "sarah.j@acme.example.com"
      },
      {
        id: "3",
        name: "Mike Chen",
        title: "Lead Developer",
        email: "mike.c@acme.example.com"
      }
    ],
    useCases: [
      {
        id: "1",
        name: "CI/CD Pipeline Automation",
        description: "Detailed technical implementation discussion"
      }
    ],
    recordingUrl: "https://recording.example.com/demo-2",
    aiSummary: "Deep technical discussion on API integration capabilities. Team showed particular interest in custom workflow automation. Questions raised about scalability and performance under high load.",
    actionItems: [
      "Provide sample API integration code",
      "Share performance benchmarks",
      "Schedule follow-up with security team"
    ],
    created_at: "2025-03-20T15:00:00Z",
    updated_at: "2025-03-20T16:45:00Z"
  }
];

export const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Acme Corporation",
    website: "https://acme.example.com",
    headquarters: "San Francisco, CA",
    industry: "Technology",
    size: "501-1000",
    revenue: "$50M - $100M",
    funding: "Series C, $75M",
    stage: "growth",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-03-20T14:45:00Z",
    demos: mockDemos.filter(demo => demo.companyId === "1")
  },
  {
    id: "2",
    name: "TechStart Inc",
    website: "https://techstart.example.com",
    headquarters: "Austin, TX",
    industry: "Technology",
    size: "11-50",
    revenue: "$1M - $5M",
    funding: "Seed, $2M",
    stage: "startup",
    created_at: "2024-02-01T09:00:00Z",
    updated_at: "2024-03-15T16:30:00Z",
    demos: mockDemos.filter(demo => demo.companyId === "2")
  },
  {
    id: "3",
    name: "Enterprise Solutions Ltd",
    website: "https://enterprise.example.com",
    headquarters: "Chicago, IL",
    industry: "Technology",
    size: "1000+",
    revenue: "$500M+",
    funding: "Public",
    stage: "enterprise",
    created_at: "2024-01-20T11:15:00Z",
    updated_at: "2024-03-10T13:45:00Z",
    demos: mockDemos.filter(demo => demo.companyId === "3")
  }
];

// Mock Industry Data
export const mockIndustryData: Record<string, any> = {
  "Technology": {
    id: "tech-1",
    name: "Technology",
    trends: [
      "AI and machine learning integration",
      "Edge computing adoption",
      "Increased focus on cybersecurity"
    ],
    pressures: [
      "Talent shortage",
      "Rapid innovation cycles",
      "Regulatory scrutiny"
    ],
    compliance: [
      "GDPR",
      "CCPA",
      "Industry-specific regulations"
    ],
    disruption: [
      "Open source alternatives",
      "Low-code/no-code platforms",
      "Blockchain technologies"
    ]
  },
  "Healthcare": {
    id: "health-1",
    name: "Healthcare",
    trends: [
      "Telehealth expansion",
      "Data interoperability",
      "Personalized medicine"
    ],
    pressures: [
      "Cost containment",
      "Staffing shortages",
      "Quality of care metrics"
    ],
    compliance: [
      "HIPAA",
      "FDA regulations",
      "Healthcare accreditation standards"
    ],
    disruption: [
      "Direct-to-consumer health services",
      "AI diagnostics",
      "Value-based care models"
    ]
  },
  "Finance": {
    id: "fin-1",
    name: "Finance",
    trends: [
      "Digital banking transformation",
      "Embedded finance",
      "ESG investing"
    ],
    pressures: [
      "Low interest environment",
      "Fintech competition",
      "Legacy system modernization"
    ],
    compliance: [
      "Basel III",
      "Anti-money laundering regulations",
      "KYC requirements"
    ],
    disruption: [
      "Decentralized finance (DeFi)",
      "Robo-advisors",
      "Banking-as-a-Service"
    ]
  },
  "Manufacturing": {
    id: "manuf-1",
    name: "Manufacturing",
    trends: [
      "Industry 4.0 adoption",
      "Supply chain resilience",
      "Sustainable manufacturing"
    ],
    pressures: [
      "Global competition",
      "Raw material costs",
      "Skilled labor shortage"
    ],
    compliance: [
      "ISO standards",
      "Environmental regulations",
      "Trade compliance"
    ],
    disruption: [
      "3D printing/additive manufacturing",
      "Robotics and automation",
      "Digital twins"
    ]
  },
  "Retail": {
    id: "retail-1",
    name: "Retail",
    trends: [
      "Omnichannel integration",
      "Experiential retail",
      "Direct-to-consumer models"
    ],
    pressures: [
      "E-commerce competition",
      "Changing consumer preferences",
      "Supply chain disruptions"
    ],
    compliance: [
      "PCI DSS",
      "Consumer protection laws",
      "Accessibility requirements"
    ],
    disruption: [
      "Social commerce",
      "Voice commerce",
      "Subscription models"
    ]
  }
};

// Mock Personas
export const mockPersonas: Record<string, any[]> = {
  "1": [
    {
      id: "p1-1",
      company_id: "1",
      name: "Sarah Johnson",
      title: "Chief Technology Officer",
      role: "decision_maker",
      email: "sjohnson@acme.example.com",
      phone: "415-555-1234",
      notes: "Technical visionary, focused on AI and ML integration",
      created_at: "2024-01-20T10:30:00Z",
      updated_at: "2024-03-20T14:45:00Z"
    },
    {
      id: "p1-2",
      company_id: "1",
      name: "Michael Chen",
      title: "VP of Engineering",
      role: "influencer",
      email: "mchen@acme.example.com",
      phone: "415-555-2345",
      notes: "Reports to Sarah, concerned about implementation timeline",
      created_at: "2024-01-21T11:30:00Z",
      updated_at: "2024-03-19T10:15:00Z"
    },
    {
      id: "p1-3",
      company_id: "1",
      name: "Alex Rodriguez",
      title: "Security Director",
      role: "blocker",
      email: "arodriguez@acme.example.com",
      phone: "415-555-3456",
      notes: "Very concerned about security implications",
      created_at: "2024-01-22T14:20:00Z",
      updated_at: "2024-03-18T16:30:00Z"
    }
  ],
  "2": [
    {
      id: "p2-1",
      company_id: "2",
      name: "Robert Williams",
      title: "Chief Operations Officer",
      role: "decision_maker",
      email: "rwilliams@globex.example.com",
      phone: "212-555-4567",
      notes: "Focused on operational efficiency and cost reduction",
      created_at: "2024-02-10T09:15:00Z",
      updated_at: "2024-03-15T11:20:00Z"
    },
    {
      id: "p2-2",
      company_id: "2",
      name: "Jennifer Lee",
      title: "Plant Manager",
      role: "user",
      email: "jlee@globex.example.com",
      phone: "212-555-5678",
      notes: "Will be primary user of the solution",
      created_at: "2024-02-11T10:30:00Z",
      updated_at: "2024-03-14T14:45:00Z"
    }
  ],
  "3": [
    {
      id: "p3-1",
      company_id: "3",
      name: "David Kumar",
      title: "CEO & Founder",
      role: "decision_maker",
      email: "dkumar@techstart.example.com",
      phone: "512-555-6789",
      notes: "Visionary founder, quick decision maker",
      created_at: "2024-03-05T15:45:00Z",
      updated_at: "2024-03-20T10:10:00Z"
    },
    {
      id: "p3-2",
      company_id: "3",
      name: "Emma Wilson",
      title: "CTO",
      role: "influencer",
      email: "ewilson@techstart.example.com",
      phone: "512-555-7890",
      notes: "Technical co-founder, very hands-on",
      created_at: "2024-03-06T16:30:00Z",
      updated_at: "2024-03-19T11:45:00Z"
    }
  ],
  "4": [
    {
      id: "p4-1",
      company_id: "4",
      name: "Patricia Moore",
      title: "Chief Medical Officer",
      role: "decision_maker",
      email: "pmoore@medihealth.example.com",
      phone: "617-555-8901",
      notes: "Clinical background, evidence-driven decision maker",
      created_at: "2024-01-25T11:00:00Z",
      updated_at: "2024-03-12T16:30:00Z"
    }
  ],
  "5": [
    {
      id: "p5-1",
      company_id: "5",
      name: "Thomas Garcia",
      title: "Chief Financial Officer",
      role: "decision_maker",
      email: "tgarcia@finserve.example.com",
      phone: "312-555-9012",
      notes: "ROI-focused, needs strong business case",
      created_at: "2023-11-15T14:20:00Z",
      updated_at: "2024-03-08T09:45:00Z"
    },
    {
      id: "p5-2",
      company_id: "5",
      name: "Olivia Smith",
      title: "VP of Technology",
      role: "influencer",
      email: "osmith@finserve.example.com",
      phone: "312-555-0123",
      notes: "Concerned about integration with legacy systems",
      created_at: "2023-11-16T15:30:00Z",
      updated_at: "2024-03-07T10:15:00Z"
    }
  ]
};

export const mockStakeholders: Stakeholder[] = [
  {
    id: "1",
    name: "Vera Williams",
    title: "VP Sales",
    department: "Sales",
    role: "Key Decision Maker",
    responsibilities: [
      "Overall sales strategy",
      "Budget approval",
      "Final sign-off on deals"
    ],
    painPoints: ["Current solution lacks key features", "High cost of ownership"],
    objectives: ["Improve team efficiency by 15%", "Reduce operational costs"],
    keyQuotes: ["We need a system that scales with us."],
    reportsToId: undefined, // CEO
    influence: 90,
    interest: 75,
    tags: ["Decision Maker", "Executive"],
    position: { x: 300, y: 50 }
  },
  {
    id: "2",
    name: "Andy Porter",
    title: "Sr. Sales Director",
    department: "Sales",
    role: "Technical Evaluator",
    responsibilities: [
      "Technical evaluation",
      "Team coordination",
      "Implementation planning"
    ],
    painPoints: ["Integration challenges with existing tools"],
    objectives: ["Ensure seamless integration", "Validate technical feasibility"],
    keyQuotes: ["The tech needs to be robust and reliable."],
    reportsToId: "1", // Vera Williams
    influence: 70,
    interest: 85,
    tags: ["Technical", "Evaluator"],
    position: { x: 100, y: 200 }
  },
  {
    id: "3",
    name: "Jamaica Christensen",
    title: "Sr. Sales Manager",
    department: "Sales",
    role: "Day-to-day Contact",
    responsibilities: [
      "Project management",
      "Requirements gathering",
      "Team communication"
    ],
    painPoints: ["Cumbersome reporting process"],
    objectives: ["Streamline reporting", "Improve data accuracy"],
    keyQuotes: ["My team needs better tools to manage their pipeline."],
    reportsToId: "2", // Andy Porter
    influence: 60,
    interest: 90,
    tags: ["Champion", "Daily Contact"],
    position: { x: 500, y: 200 }
  },
  {
    id: "4",
    name: "Jordan Smith",
    title: "IT Manager",
    department: "IT",
    role: "Gatekeeper / Blocker",
    responsibilities: [
      "Security review",
      "Infrastructure compatibility",
      "Maintenance"
    ],
    painPoints: ["Concerned about data security", "Potential implementation complexity"],
    objectives: ["Ensure compliance with security standards"],
    keyQuotes: ["Security is our top priority."],
    reportsToId: undefined, // Reports to CTO (not in this list)
    influence: 40,
    interest: 30,
    tags: ["IT", "Security"],
    position: { x: 300, y: 350 }
  }
];

export const mockRelationships: Relationship[] = [
  { id: "r1", sourceStakeholderId: "2", targetStakeholderId: "1", type: "reports_to" },
  { id: "r2", sourceStakeholderId: "3", targetStakeholderId: "2", type: "reports_to" },
  { id: "r3", sourceStakeholderId: "3", targetStakeholderId: "2", type: "works_with", strength: "strong" }, // Jamaica works closely with Andy
  { id: "r4", sourceStakeholderId: "2", targetStakeholderId: "4", type: "influences", strength: "medium" }  // Andy influences Jordan
];

// Mock Value Propositions
export const mockValuePropositions = [
  {
    id: "vp1",
    title: "Reduce Operational Costs",
    description: "Our solution reduces operational costs by automating manual processes and reducing error rates.",
    customerPriority: 85,
    solutionStrength: 75,
    impact: "financial",
    metrics: ["30% reduction in processing time", "25% cost savings", "$500K annual savings"],
    stakeholderIds: ["1", "3"], // VP Sales and Sales Manager
    competitiveAdvantage: "Our automation is 2x faster than the closest competitor",
    timeToValue: "short-term",
    position: { x: 85, y: 75 }
  },
  {
    id: "vp2",
    title: "Improve Customer Satisfaction",
    description: "Enhance customer experience through faster response times and personalized service.",
    customerPriority: 90,
    solutionStrength: 65,
    impact: "operational",
    metrics: ["40% faster response time", "25% increase in NPS", "15% increase in retention"],
    stakeholderIds: ["2", "3"], // Sales Director and Sales Manager
    competitiveAdvantage: "Unique AI-driven personalization engine",
    timeToValue: "medium-term",
    position: { x: 90, y: 65 }
  },
  {
    id: "vp3",
    title: "Enhanced Data Security",
    description: "Enterprise-grade security with advanced threat protection and compliance features.",
    customerPriority: 70,
    solutionStrength: 90,
    impact: "risk",
    metrics: ["99.9% uptime", "SOC 2 compliance", "Zero data breaches"],
    stakeholderIds: ["1"], // VP Sales
    competitiveAdvantage: "Only solution with FedRAMP certification",
    timeToValue: "immediate",
    position: { x: 70, y: 90 }
  },
  {
    id: "vp4",
    title: "Scalable Infrastructure",
    description: "Cloud-native architecture that scales with your business needs without performance degradation.",
    customerPriority: 60,
    solutionStrength: 85,
    impact: "strategic",
    metrics: ["10x capacity without performance impact", "99.99% availability", "50% reduced scaling costs"],
    stakeholderIds: ["2"], // Sales Director
    competitiveAdvantage: "Proprietary auto-scaling technology",
    timeToValue: "long-term",
    position: { x: 60, y: 85 }
  },
  {
    id: "vp5",
    title: "Business Intelligence",
    description: "Advanced analytics and reporting capabilities to drive data-informed decisions.",
    customerPriority: 75,
    solutionStrength: 60,
    impact: "strategic",
    metrics: ["360° customer view", "Real-time dashboards", "Predictive insights"],
    stakeholderIds: ["1", "2", "3"], // All stakeholders
    competitiveAdvantage: "AI-powered predictive analytics",
    timeToValue: "medium-term",
    position: { x: 75, y: 60 }
  }
];

export const mockValueMatrix = {
  id: "vm1",
  name: "Enterprise Solution Value Map",
  description: "Value mapping for our enterprise solution offering",
  demoId: "1",
  valuePropositions: mockValuePropositions,
  createdAt: "2025-03-15T10:30:00Z",
  updatedAt: "2025-04-01T14:45:00Z"
};
