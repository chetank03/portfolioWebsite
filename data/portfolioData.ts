import { Education, Experience, PageInfo, Project, Skill, Social } from "../typings";

const blankMeta = {
  _createdAt: "",
  _rev: "",
  _updatedAt: "",
};

export const pageInfo: PageInfo = {
  ...blankMeta,
  _id: "page-info",
  _type: "pageInfo",
  address: "New York, USA",
  backgroundInformation:
    "I am a software engineer and computer engineering student who likes building systems that are usable, inspectable, and grounded in real technical constraints. My work sits across machine learning pipelines, embedded sensing, and product-facing applications, with a consistent focus on reliability and implementation depth.",
  email: "chetankodeboyina@gmail.com",
  role: "Software Engineer / Student",
  heroImage: null,
  name: "Chetan Kodeboyina",
  phoneNumber: "+1 (929) 754-7135",
  profilePic: null,
};

export const socials: Social[] = [
  {
    ...blankMeta,
    _id: "social-linkedin",
    _type: "social",
    title: "LinkedIn",
    url: "https://linkedin.com/in/chetan-kodeboyina-b229a8219/",
  },
  {
    ...blankMeta,
    _id: "social-github",
    _type: "social",
    title: "GitHub",
    url: "https://github.com/chetank03",
  },
  {
    ...blankMeta,
    _id: "social-email",
    _type: "social",
    title: "Email",
    url: "mailto:chetankodeboyina@gmail.com",
  },
];

export const skills: Skill[] = [
  { ...blankMeta, _id: "skill-python", _type: "skill", image: null, iconUrl: "https://cdn.simpleicons.org/python", progress: 90, title: "Python" },
  { ...blankMeta, _id: "skill-cpp", _type: "skill", image: null, iconUrl: "https://cdn.simpleicons.org/cplusplus", progress: 80, title: "C++" },
  { ...blankMeta, _id: "skill-typescript", _type: "skill", image: null, iconUrl: "https://cdn.simpleicons.org/typescript", progress: 82, title: "TypeScript" },
  { ...blankMeta, _id: "skill-react", _type: "skill", image: null, iconUrl: "https://cdn.simpleicons.org/react", progress: 84, title: "React" },
  { ...blankMeta, _id: "skill-next", _type: "skill", image: null, iconUrl: "https://cdn.simpleicons.org/nextdotjs", progress: 76, title: "Next.js" },
  { ...blankMeta, _id: "skill-fastapi", _type: "skill", image: null, iconUrl: "https://cdn.simpleicons.org/fastapi", progress: 78, title: "FastAPI" },
  { ...blankMeta, _id: "skill-django", _type: "skill", image: null, iconUrl: "https://cdn.simpleicons.org/django", progress: 74, title: "Django" },
  { ...blankMeta, _id: "skill-docker", _type: "skill", image: null, iconUrl: "https://cdn.simpleicons.org/docker", progress: 75, title: "Docker" },
  { ...blankMeta, _id: "skill-mlflow", _type: "skill", image: null, iconUrl: "https://cdn.simpleicons.org/mlflow", progress: 72, title: "MLflow" },
  { ...blankMeta, _id: "skill-onnx", _type: "skill", image: null, iconUrl: "https://cdn.simpleicons.org/onnx", progress: 76, title: "ONNX" },
  { ...blankMeta, _id: "skill-platformio", _type: "skill", image: null, iconUrl: "https://cdn.simpleicons.org/platformio", progress: 68, title: "PlatformIO" },
  { ...blankMeta, _id: "skill-ble", _type: "skill", image: null, iconUrl: "https://cdn.simpleicons.org/bluetooth", progress: 66, title: "BLE" },
];

export const experiences: Experience[] = [
  {
    ...blankMeta,
    _id: "exp-ctel-fulltime",
    _type: "experience",
    company: "C-TEL InfoSystems Pvt Ltd",
    companyImage: null,
    companyLogoUrl: "/ctel-logo.webp",
    dateStarted: "2024-08-01",
    dateEnded: "2025-08-01",
    isCurrentlyWorkingHere: false,
    jobTitle: "Software Engineer",
    points: [
      "Re-architected a legacy PHP application into 4 Django and FastAPI microservices with 15+ REST endpoints and WebSocket channels, improving response times by 50% for real-time client workflows.",
      "Deployed a deep learning object detection pipeline with ONNX Runtime for industrial recognition tasks, reducing end-to-end recognition time by 40% in production environments.",
      "Optimized inference services with caching, retry handling, and request-path tuning, reducing average latency from 800ms to 200ms for workloads handling 500+ requests per hour.",
      "Built a cross-platform desktop application in Python and PyQt5 for industrial camera integration, increasing scan throughput to 75 items per minute and reducing manual tracking errors by 30%.",
    ],
    technologies: [
      { ...blankMeta, _id: "tech-django-fulltime", _type: "technology", image: null, progress: 80, title: "Django" },
      { ...blankMeta, _id: "tech-fastapi-fulltime", _type: "technology", image: null, progress: 78, title: "FastAPI" },
      { ...blankMeta, _id: "tech-onnx-fulltime", _type: "technology", image: null, progress: 76, title: "ONNX Runtime" },
      { ...blankMeta, _id: "tech-pyqt5-fulltime", _type: "technology", image: null, progress: 72, title: "PyQt5" },
    ],
  },
  {
    ...blankMeta,
    _id: "exp-ctel-intern",
    _type: "experience",
    company: "C-TEL InfoSystems Pvt Ltd",
    companyImage: null,
    companyLogoUrl: "/ctel-logo.webp",
    dateStarted: "2023-06-01",
    dateEnded: "2023-09-01",
    isCurrentlyWorkingHere: false,
    jobTitle: "Software Engineer Intern",
    points: [
      "Developed 8 Django-based REST API endpoints for internal business applications, supporting 3 production features.",
      "Reduced manual processing time by 35% through backend automation and cleaner service boundaries.",
      "Contributed to 20+ peer code reviews during the internship while working inside an existing engineering workflow.",
    ],
    technologies: [
      { ...blankMeta, _id: "tech-django-intern", _type: "technology", image: null, progress: 80, title: "Django" },
      { ...blankMeta, _id: "tech-rest-intern", _type: "technology", image: null, progress: 74, title: "REST APIs" },
      { ...blankMeta, _id: "tech-python-intern", _type: "technology", image: null, progress: 90, title: "Python" },
    ],
  },
];

export const projects: Project[] = [
  {
    ...blankMeta,
    _id: "project-notely",
    _type: "project",
    title: "Notely - Real-Time Notes Platform",
    linkToBuild: "",
    image: null,
    summary:
      "Built a Django and ReactJS collaboration platform supporting 50+ concurrent users with real-time editing and formula rendering, reducing note-sharing time by 60% for technical coursework.",
    technologies: [
      { ...blankMeta, _id: "proj-tech-notely-django", _type: "technology", image: null, progress: 80, title: "Django" },
      { ...blankMeta, _id: "proj-tech-notely-react", _type: "technology", image: null, progress: 84, title: "ReactJS" },
      { ...blankMeta, _id: "proj-tech-notely-rest", _type: "technology", image: null, progress: 74, title: "REST APIs" },
    ],
  },
  {
    ...blankMeta,
    _id: "project-2d-code",
    _type: "project",
    title: "2D Code Detection and Decoding",
    linkToBuild: "",
    image: null,
    summary:
      "Designed a CNN-based computer vision model achieving 96% accuracy for QR and Data Matrix detection, then deployed it with ONNX Runtime and OpenCV to detect up to 100 codes in under 500ms.",
    technologies: [
      { ...blankMeta, _id: "proj-tech-cnn", _type: "technology", image: null, progress: 78, title: "CNN" },
      { ...blankMeta, _id: "proj-tech-onnx-cv", _type: "technology", image: null, progress: 76, title: "ONNX Runtime" },
      { ...blankMeta, _id: "proj-tech-opencv", _type: "technology", image: null, progress: 80, title: "OpenCV" },
    ],
  },
  {
    ...blankMeta,
    _id: "project-gla-dpot",
    _type: "project",
    title: "GLA-DPOT Transformer",
    linkToBuild: "https://github.com/chetank03",
    image: null,
    summary:
      "Built a custom PyTorch transformer with Gated Linear Attention, RMSNorm, and SwiGLU, reducing output repetition by 25% and improving coherence by 15% over baseline models.",
    technologies: [
      { ...blankMeta, _id: "proj-tech-pytorch", _type: "technology", image: null, progress: 76, title: "PyTorch" },
      { ...blankMeta, _id: "proj-tech-transformers", _type: "technology", image: null, progress: 74, title: "Transformers" },
      { ...blankMeta, _id: "proj-tech-rmsnorm", _type: "technology", image: null, progress: 70, title: "RMSNorm" },
    ],
  },
  {
    ...blankMeta,
    _id: "project-option-engine",
    _type: "project",
    title: "American Option Lattice Engine",
    linkToBuild: "https://github.com/chetank03",
    image: null,
    summary:
      "Built a C++ lattice-based pricing engine for American options using CRR valuation, Snell-style backward induction for early exercise, and reusable abstractions for the tree model, payoff logic, and pricing lattice.",
    technologies: [
      { ...blankMeta, _id: "proj-tech-cpp-lattice", _type: "technology", image: null, progress: 80, title: "C++" },
      { ...blankMeta, _id: "proj-tech-crr", _type: "technology", image: null, progress: 72, title: "CRR" },
      { ...blankMeta, _id: "proj-tech-quant", _type: "technology", image: null, progress: 68, title: "Quant Finance" },
    ],
  },
  {
    ...blankMeta,
    _id: "project-compiler",
    _type: "project",
    title: "Functional Language Compiler to LLVM-IR",
    linkToBuild: "https://github.com/chetank03",
    image: null,
    summary:
      "Implemented a Scala compiler and lexer pipeline for a small functional language, extending derivative-based tokenization, typed language constructs, and LLVM-IR code generation for programs including recursion and Mandelbrot-style workloads.",
    technologies: [
      { ...blankMeta, _id: "proj-tech-scala", _type: "technology", image: null, progress: 70, title: "Scala" },
      { ...blankMeta, _id: "proj-tech-llvm", _type: "technology", image: null, progress: 68, title: "LLVM-IR" },
      { ...blankMeta, _id: "proj-tech-compilers", _type: "technology", image: null, progress: 72, title: "Compilers" },
    ],
  },
];

export const education: Education[] = [
  {
    ...blankMeta,
    _id: "edu-nyu",
    _type: "education",
    school: "New York University",
    logoUrl: "/nyu-logo.png",
    degree: "Master of Science in Computer Engineering",
    location: "New York, USA",
    dateStarted: "2025-09-01",
    dateEnded: "2027-05-01",
    coursework: ["Machine Learning", "MLOps", "Embedded Systems"],
  },
  {
    ...blankMeta,
    _id: "edu-kcl",
    _type: "education",
    school: "King's College London",
    logoUrl: "/kcl-logo.png",
    degree: "Bachelor of Science in Computer Science (Artificial Intelligence)",
    location: "London, UK",
    dateStarted: "2021-09-01",
    dateEnded: "2024-08-01",
    coursework: [
      "Data Structures",
      "Operating Systems",
      "Databases",
      "Compilers",
      "Machine Learning",
    ],
  },
];
