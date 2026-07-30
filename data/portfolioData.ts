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
    _id: "exp-ctel-intern-2026",
    _type: "experience",
    company: "C-TEL InfoSystems Pvt Ltd",
    companyImage: null,
    companyLogoUrl: "/ctel-logo.webp",
    dateStarted: "2026-05-01",
    dateEnded: "2026-08-01",
    isCurrentlyWorkingHere: false,
    jobTitle: "Software Engineer Intern",
    points: [
      "Shipped a Django and React internal ERP portal serving role-scoped views to staff, managers, and external vendors, verified by 346 backend and 1,743 frontend tests.",
      "Enforced role-based access control across three visibility tiers, closing a cross-supplier document exposure found in adversarial review by fixing scoped file serving test-first.",
      "Traced an 80-second production report to an unindexed join between a 4.3M-row and an 88M-row Oracle table, 39 seconds per depot on that join alone, where one index takes it to an estimated 2 to 3 seconds and unblocks 3 further reports that would not finish at all.",
      "Removed 2 seconds per request from a vision service by profiling the request path down to name resolution, where the client tried IPv6 first against a v4-only host before falling back.",
      "Built screens for the companion Flutter app on iOS and Android across leave, approvals, and procurement, consolidating its colours and text styles into one shared source so screens stop drifting visually.",
    ],
    technologies: [
      { ...blankMeta, _id: "tech-django-intern-2026", _type: "technology", image: null, progress: 80, title: "Django" },
      { ...blankMeta, _id: "tech-react-intern-2026", _type: "technology", image: null, progress: 84, title: "React" },
      { ...blankMeta, _id: "tech-oracle-intern-2026", _type: "technology", image: null, progress: 70, title: "Oracle" },
      { ...blankMeta, _id: "tech-flutter-intern-2026", _type: "technology", image: null, progress: 68, title: "Flutter" },
      { ...blankMeta, _id: "tech-superset-intern-2026", _type: "technology", image: null, progress: 66, title: "Apache Superset" },
    ],
  },
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
      "Improved real-time client workflow response times 50% by re-architecting a legacy PHP monolith into 4 Django and FastAPI microservices exposing 15+ REST endpoints and WebSocket channels.",
      "Cut end-to-end recognition time 40% by serving a PyTorch detector through ONNX Runtime behind an HTTP service, decoding 2D codes at 97% success under harsh plant lighting, 6.5M codes per day.",
      "Reduced median API latency from 800ms to 200ms at 500+ requests per hour through response caching, bounded retries, and request-path profiling.",
      "Raised production line throughput to 75 items per minute with a Python and PyQt5 operator application, refining its interface after shop floor feedback showed users could not tell why scanning had paused.",
    ],
    technologies: [
      { ...blankMeta, _id: "tech-django-fulltime", _type: "technology", image: null, progress: 80, title: "Django" },
      { ...blankMeta, _id: "tech-fastapi-fulltime", _type: "technology", image: null, progress: 78, title: "FastAPI" },
      { ...blankMeta, _id: "tech-onnx-fulltime", _type: "technology", image: null, progress: 76, title: "ONNX Runtime" },
      { ...blankMeta, _id: "tech-pyqt5-fulltime", _type: "technology", image: null, progress: 72, title: "PyQt5" },
    ],
  },
];

export const projects: Project[] = [
  {
    ...blankMeta,
    _id: "project-option-engine",
    _type: "project",
    title: "American Option Lattice Engine",
    linkToBuild: "https://github.com/chetank03/american-option-lattice-engine",
    image: null,
    summary:
      "C++17 binomial lattice pricer: Cox-Ross-Rubinstein for European options, Snell-envelope backward induction for American early exercise. Swapping the naive O(N^2) grid for an O(N) rolling path took a 50,000-step American put from 173 seconds and 9.7 GB to 1.6 seconds and 0.4 MB, with both paths agreeing to 1e-10. Validated against Black-Scholes convergence and put-call parity rather than against itself, with 30 checks gating CI. Testing surfaced 3 real defects, including an incomplete no-arbitrage check that was silently admitting a negative risk-neutral probability.",
    technologies: [
      { ...blankMeta, _id: "proj-tech-cpp-lattice", _type: "technology", image: null, progress: 80, title: "C++17" },
      { ...blankMeta, _id: "proj-tech-crr", _type: "technology", image: null, progress: 72, title: "CRR Lattice" },
      { ...blankMeta, _id: "proj-tech-quant", _type: "technology", image: null, progress: 68, title: "Quant Finance" },
    ],
  },
  {
    ...blankMeta,
    _id: "project-iicci",
    _type: "project",
    title: "IICCI Trade Analytics",
    linkToBuild: "",
    liveUrl: "https://iicci.up.railway.app",
    image: null,
    summary:
      "India-Italy bilateral trade analytics platform: Django REST and PostgreSQL behind a React and Recharts dashboard. 21 endpoints covered by 24 tests that pin the aggregation rules, Firebase Google sign-in gated behind a Django-side admin approval step, Excel import in append or replace mode, and short-lived response caching on the reporting routes.",
    technologies: [
      { ...blankMeta, _id: "proj-tech-django-iicci", _type: "technology", image: null, progress: 80, title: "Django REST" },
      { ...blankMeta, _id: "proj-tech-postgres-iicci", _type: "technology", image: null, progress: 74, title: "PostgreSQL" },
      { ...blankMeta, _id: "proj-tech-recharts-iicci", _type: "technology", image: null, progress: 76, title: "React + Recharts" },
    ],
  },
  {
    ...blankMeta,
    _id: "project-bigsmiles",
    _type: "project",
    title: "BigSMILES Viewer",
    linkToBuild: "https://github.com/chetank03/bigsmiles-viewer",
    liveUrl: "https://bigsmiles-viewer.up.railway.app",
    image: null,
    summary:
      "Parses a subset of the BigSMILES polymer notation into a graph, rendering stochastic objects and repeat units as nested boxes instead of flattening them the way a plain SMILES viewer would, with RDKit computing per-unit formula and weight. Code-splitting Cytoscape cut the initial JS bundle 69 percent, from 632 KB to 197 KB. 13 API tests and 7 Playwright specs run in CI, including axe-core WCAG 2.1 AA audits that caught a real contrast failure.",
    technologies: [
      { ...blankMeta, _id: "proj-tech-fastapi-bigsmiles", _type: "technology", image: null, progress: 78, title: "FastAPI" },
      { ...blankMeta, _id: "proj-tech-cytoscape-bigsmiles", _type: "technology", image: null, progress: 74, title: "Cytoscape.js" },
      { ...blankMeta, _id: "proj-tech-rdkit-bigsmiles", _type: "technology", image: null, progress: 70, title: "RDKit" },
    ],
  },
  {
    ...blankMeta,
    _id: "project-studio",
    _type: "project",
    title: "Studio (client site)",
    linkToBuild: "",
    liveUrl: "https://studio-flax-mu-86.vercel.app",
    image: null,
    summary:
      "Site for a bespoke art-installation studio, built to a Figma design in Next.js, TypeScript, Supabase, and Framer Motion. Behind it sits a custom admin area with a rich-text journal editor, portfolio management, and an enquiry inbox wired to transactional email, so the owner runs the site without a developer. Error boundaries in place and CI running lint and build on every push.",
    technologies: [
      { ...blankMeta, _id: "proj-tech-next-studio", _type: "technology", image: null, progress: 80, title: "Next.js" },
      { ...blankMeta, _id: "proj-tech-supabase-studio", _type: "technology", image: null, progress: 74, title: "Supabase" },
      { ...blankMeta, _id: "proj-tech-framer-studio", _type: "technology", image: null, progress: 72, title: "Framer Motion" },
    ],
  },
  {
    ...blankMeta,
    _id: "project-parkinsons",
    _type: "project",
    title: "Parkinson's Motion Monitor",
    linkToBuild: "https://github.com/chetank03/parkinsons-motion-monitor",
    image: null,
    summary:
      "About 1,445 lines of embedded C++ on an STM32 DISCO-L475VG-IOT01A, reading an LSM6DSL IMU over I2C at 400 kHz. A 256-point CMSIS-DSP FFT over a 156-sample window at 52 Hz separates resting tremor (3-5 Hz), dyskinesia (5-7 Hz), and freezing of gait, with 3-window confirmation to suppress false positives and BLE GATT telemetry out. Interrupt-driven with a polling fallback, so a missed data-ready line degrades the sample rate instead of stalling the device. Thresholds are hand-tuned; there is no on-device ML.",
    technologies: [
      { ...blankMeta, _id: "proj-tech-stm32-parkinsons", _type: "technology", image: null, progress: 74, title: "STM32 / mbed" },
      { ...blankMeta, _id: "proj-tech-cmsis-parkinsons", _type: "technology", image: null, progress: 70, title: "CMSIS-DSP FFT" },
      { ...blankMeta, _id: "proj-tech-ble-parkinsons", _type: "technology", image: null, progress: 66, title: "BLE GATT" },
    ],
  },
  {
    ...blankMeta,
    _id: "project-gla-dpo",
    _type: "project",
    title: "GLA-DPO Transformer",
    linkToBuild: "https://github.com/chetank03/gla-dpo-transformer",
    image: null,
    summary:
      "A 158M-parameter Gated Linear Attention language model written from scratch in PyTorch, pretrained on TinyStories and then aligned with Direct Preference Optimization, no separate reward model. GLA matches plain linear attention's loss at equal steps while staying O(N), and holds memory constant during inference where a standard transformer's KV-cache keeps growing. A two-person NYU project with Bryce Miranda: he built the DPO stage and preference data, I built the GLA architecture, pretraining, and the generation interface.",
    technologies: [
      { ...blankMeta, _id: "proj-tech-pytorch-gla", _type: "technology", image: null, progress: 76, title: "PyTorch" },
      { ...blankMeta, _id: "proj-tech-gla", _type: "technology", image: null, progress: 72, title: "Gated Linear Attention" },
      { ...blankMeta, _id: "proj-tech-dpo", _type: "technology", image: null, progress: 70, title: "DPO" },
    ],
  },
  {
    ...blankMeta,
    _id: "project-compilers",
    _type: "project",
    title: "Two Compilers: LLVM-IR and JVM Bytecode",
    linkToBuild: "https://github.com/chetank03/functional-language-compiler-llvm",
    image: null,
    summary:
      "Two Scala compilers sharing a regex-derivative lexer built from first principles rather than a generator. One takes a small functional language to LLVM-IR end to end, demonstrated on recursion, Mandelbrot, and Towers of Hanoi. The companion repo, while-language-jvm-compiler, interprets a WHILE-like imperative language and emits Jasmin-style JVM assembly, demonstrated on Collatz, Fibonacci, factorization, and primes.",
    technologies: [
      { ...blankMeta, _id: "proj-tech-scala-compilers", _type: "technology", image: null, progress: 70, title: "Scala" },
      { ...blankMeta, _id: "proj-tech-llvm-compilers", _type: "technology", image: null, progress: 68, title: "LLVM-IR" },
      { ...blankMeta, _id: "proj-tech-jvm-compilers", _type: "technology", image: null, progress: 68, title: "JVM Bytecode" },
    ],
  },
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
