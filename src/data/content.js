export const profile = {
  name: "Oyewusi Christopher",
  title: "Data Analyst",
  tagline: ["Turning Raw", "Data Into Decisions."],
  bio: [
    "I'm Oyewusi Christopher, a data analyst with 5+ years turning business questions into data-driven answers.",
    "I specialize in end-to-end analytics: from writing complex SQL queries and building ETL pipelines, to delivering executive dashboards in Power BI and Tableau that actually change how decisions get made.",
    "I've worked across fintech, e-commerce, and FMCG — industries where bad data costs real money.",
    "My edge isn't just technical fluency. It's the ability to sit in a stakeholder meeting, understand what the business actually needs, and come back with something they can act on.",
  ],
  stats: [
    { value: 12, suffix: "+", label: "Projects Completed" },
    { value: 5,  suffix: "+", label: "Years Experience" },
    { value: 8,  suffix: "",  label: "Tools Mastered" },
    { value: 3,  suffix: "",  label: "Industries" },
  ],
  contact: {
    email: "oyewusichristopher@gmail.com",
    linkedin: "https://linkedin.com/in/oyewusichristopher",
    github: "https://github.com/oyewusichristopher",
    location: "Lagos, Nigeria",
  },
  availability: "Available for freelance / full-time",
  formspreeId: "YOUR_FORM_ID",
}

export const skills = {
  languages: [
    { name: "SQL",            level: 5 },
    { name: "Python",         level: 4 },
    { name: "R",              level: 3 },
    { name: "DAX",            level: 4 },
    { name: "M (Power Query)", level: 4 },
  ],
  bi: [
    { name: "Power BI",            level: 5 },
    { name: "Tableau",             level: 4 },
    { name: "Looker",              level: 3 },
    { name: "Google Data Studio",  level: 4 },
    { name: "Excel",               level: 5 },
  ],
  engineering: [
    { name: "dbt",       level: 3 },
    { name: "BigQuery",  level: 4 },
    { name: "Snowflake", level: 3 },
    { name: "Azure",     level: 3 },
    { name: "Pandas",    level: 4 },
    { name: "Airflow",   level: 2 },
  ],
  proficiencyBars: [
    { label: "Business Intelligence", value: 85 },
    { label: "Statistical Analysis",  value: 72 },
    { label: "Data Engineering",      value: 60 },
  ],
  radar: [
    { subject: "SQL Mastery",          score: 95, fullMark: 100 },
    { subject: "Visualization",        score: 88, fullMark: 100 },
    { subject: "Statistical Thinking", score: 78, fullMark: 100 },
    { subject: "Business Acumen",      score: 92, fullMark: 100 },
    { subject: "Communication",        score: 85, fullMark: 100 },
    { subject: "Engineering",          score: 72, fullMark: 100 },
  ],
}

export const projects = [
  {
    id: "churn-prediction",
    title: "Customer Churn Prediction Model",
    category: ["Python", "Machine Learning"],
    description:
      "Built an ML pipeline to predict customer churn 90 days in advance using behavioral and transactional signals.",
    outcomes: [
      "Reduced churn rate by 18% within 6 months of deployment",
      "Achieved 91% recall on the high-value customer segment",
      "Saved an estimated $1.2M in annual revenue",
    ],
    stack: ["Python", "scikit-learn", "Tableau", "pandas"],
    insight: "Payment failure frequency was 3× more predictive than customer tenure.",
    github: "https://github.com/oyewusichristopher/churn-prediction",
    demo: null,
  },
  {
    id: "sales-dashboard",
    title: "Executive Sales Dashboard",
    category: ["Power BI", "SQL"],
    description:
      "Real-time executive dashboard consolidating 12 weekly manual reports into a single live view.",
    outcomes: [
      "Replaced 12 reports — 6 hours of weekly manual work eliminated",
      "Adopted by C-suite within 2 weeks of launch",
      "Reduced reporting lag from 5 days to under 4 hours",
    ],
    stack: ["Power BI", "SQL", "DAX", "Azure"],
    insight: "EMEA had a 22% higher pipeline-to-close ratio hidden inside a category rollup.",
    github: null,
    demo: "https://app.powerbi.com/view",
  },
  {
    id: "ecommerce-funnel",
    title: "E-commerce Funnel Analysis",
    category: ["SQL", "Python"],
    description:
      "End-to-end funnel analysis exposing a checkout drop-off invisible to the existing reporting stack.",
    outcomes: [
      "Identified a checkout stage losing $240K in revenue per year",
      "Fix shipped in one sprint — conversion improved 14%",
      "Analysis adopted as standard methodology by the product team",
    ],
    stack: ["SQL", "BigQuery", "Looker", "Python"],
    insight: "Mobile users abandoned at address validation — a field desktop auto-completed.",
    github: "https://github.com/oyewusichristopher/funnel-analysis",
    demo: null,
  },
  {
    id: "demand-forecasting",
    title: "Inventory Demand Forecasting",
    category: ["Python", "Machine Learning"],
    description:
      "ARIMA + XGBoost ensemble for SKU-level demand forecasting across 3 warehouse locations.",
    outcomes: [
      "Reduced stockout events by 32% across all locations",
      "Improved forecast accuracy from 68% to 87% MAPE",
      "Integrated with ERP for automated reorder triggers",
    ],
    stack: ["Python", "ARIMA", "XGBoost", "Excel"],
    insight: "A single global model was masking distinct seasonality patterns by region.",
    github: "https://github.com/oyewusichristopher/demand-forecast",
    demo: null,
  },
  {
    id: "hr-attrition",
    title: "HR Attrition Analysis",
    category: ["SQL", "Power BI"],
    description:
      "Statistical deep-dive on 4 years of HR data to surface the leading predictors of employee attrition.",
    outcomes: [
      "Surfaced 4 predictors with 3× baseline predictive power",
      "Influenced a company-wide retention policy change",
      "Engineering attrition dropped 9% in Q3 post-intervention",
    ],
    stack: ["SQL", "Python", "Power BI", "pandas"],
    insight: "Compensation wasn't the top predictor — lack of promotion within 24 months was.",
    github: null,
    demo: null,
  },
  {
    id: "kpi-pipeline",
    title: "Financial KPI Automation Pipeline",
    category: ["SQL", "Python"],
    description:
      "Replaced a fragile manual process with a fully automated dbt + Airflow pipeline on Snowflake.",
    outcomes: [
      "Replaced 6 hours of weekly manual work with a 15-minute automated run",
      "Reduced data errors from 12% to under 0.3% per cycle",
      "Pipeline handles 50M+ rows nightly with full lineage documentation",
    ],
    stack: ["dbt", "Snowflake", "Airflow", "SQL"],
    insight: "The legacy process had 3 undocumented manual adjustments baked in — all incorrect.",
    github: "https://github.com/oyewusichristopher/kpi-pipeline",
    demo: null,
  },
]

export const experience = [
  {
    company: "Apex Fintech Solutions",
    role: "Senior Data Analyst",
    period: "2022 – Present",
    achievements: [
      "Led analytics for a $40M product line — built the KPI framework from scratch",
      "Cut month-end reporting cycle from 5 days to 18 hours via Snowflake + dbt",
      "Partnered with ML engineers to deploy churn model saving $1.2M annually",
      "Mentored 2 junior analysts; established SQL and Python code review standards",
    ],
    stack: ["SQL", "Python", "dbt", "Snowflake", "Power BI"],
  },
  {
    company: "CartLink E-Commerce",
    role: "Data Analyst",
    period: "2020 – 2022",
    achievements: [
      "Built funnel analysis uncovering a $240K/yr revenue leak in checkout flow",
      "Delivered 3 Tableau dashboards now used daily by 40+ stakeholders",
      "Automated 8 recurring Excel reports with Python + scheduled queries",
      "Increased email campaign ROI by 22% via cohort-based segmentation",
    ],
    stack: ["SQL", "Tableau", "Python", "BigQuery", "GA4"],
  },
  {
    company: "Vantage Consulting Group",
    role: "Junior Data Analyst",
    period: "2019 – 2020",
    achievements: [
      "Supported analytics delivery for 5 client engagements across FMCG and retail",
      "Built a Power BI prototype that secured a $300K follow-on contract",
      "Managed data-cleaning pipelines reducing manual prep time by 60%",
    ],
    stack: ["SQL", "Excel", "Power BI", "Python"],
  },
]

export const education = {
  university: "University of Lagos",
  degree: "BSc Statistics & Data Science",
  year: "2019",
}

export const certifications = [
  { name: "Google Data Analytics Certificate",  issuer: "Google / Coursera",  year: "2021" },
  { name: "Power BI Data Analyst (PL-300)",      issuer: "Microsoft",          year: "2022" },
  { name: "dbt Analytics Engineering",           issuer: "dbt Labs",           year: "2023" },
]

export const testimonials = [
  {
    quote:
      "Oyewusi completely changed how our executive team makes decisions. Before, we were flying blind with a patchwork of spreadsheets. Six months in, every major product decision goes through his dashboard first.",
    name: "Sarah Chen",
    role: "Head of Product",
    company: "CartLink E-Commerce",
  },
  {
    quote:
      "I've worked with a lot of analysts who can build dashboards. Oyewusi is the rare one who understands the business well enough to know what questions we should be asking — and then answers them with data we can actually trust.",
    name: "Marcus Webb",
    role: "VP of Operations",
    company: "Apex Fintech Solutions",
  },
  {
    quote:
      "We brought Oyewusi in to figure out why our pipeline model was off. He didn't just fix the model — he found three upstream data quality issues we'd been ignoring for two years. The kind of analyst who makes the whole team better.",
    name: "Priya Nair",
    role: "Engineering Manager",
    company: "Vantage Consulting Group",
  },
]

export const tickerItems = [
  "SQL", "Python", "Power BI", "Tableau", "Excel",
  "dbt", "BigQuery", "Pandas", "Snowflake", "Looker", "R", "Airflow", "Azure",
]
