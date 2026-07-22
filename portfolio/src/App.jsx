import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Brain,
  ChartLineUp,
  CheckCircle,
  Database,
  FileText,
  GithubLogo,
  LinkedinLogo,
  List,
  MagnifyingGlass,
  ShieldCheck,
  X,
} from "@phosphor-icons/react";

const navItems = [
  { id: "work", label: "Selected Work" },
  { id: "lab", label: "Evidence Lab" },
  { id: "story", label: "Story" },
];

const chapters = [
  {
    number: "01",
    title: "How do we know?",
    detail: "Computational psychiatry · HDDM · fMRI",
    target: "origin",
  },
  {
    number: "02",
    title: "How do we measure?",
    detail: "Biostatistics · Epidemiology · GCP",
    target: "quality",
  },
  {
    number: "03",
    title: "Evidence in the real world",
    detail: "Safety Science · RWD · GVP",
    target: "work",
  },
  {
    number: "04",
    title: "Where can this go?",
    detail: "RWE · Clinical Data Science · Intelligent systems",
    target: "future",
  },
];

const projects = [
  {
    id: "clinical-quality",
    eyebrow: "CAPTURE → VALIDATE",
    title: "Clinical Follow-up & SDV Assurance",
    summary:
      "A local-first workflow that converts scanned follow-up records into structured review data and flags identity or visit-date inconsistencies before manual SDV.",
    tags: ["OCR", "Clinical data", "Quality control"],
    maturity: "Internal prototype",
    icon: MagnifyingGlass,
    question:
      "How can a clinical team review high-volume paper records without losing source traceability or missing mismatches between the record and the scheduled subject visit?",
    method:
      "Batch OCR, field extraction, rule-based comparison, exception routing, and a reviewer-facing audit trail. The workflow keeps the original page adjacent to every extracted field.",
    validation:
      "Tested against a manually reviewed sample with separate checks for subject identity, visit date, field completeness, and extraction confidence. Disagreements remain visible rather than being silently overwritten.",
    value:
      "Moves review effort toward ambiguous records while preserving human sign-off and the source-data relationship required in a GCP environment.",
  },
  {
    id: "safety-reporting",
    eyebrow: "STRUCTURE → ANALYZE",
    title: "Safety Data & Periodic Reporting",
    summary:
      "Reusable deduplication, seriousness logic, and summary-table workflows for safety datasets used in periodic review and reporting support.",
    tags: ["Safety analytics", "PSUR / PBRER", "Python"],
    maturity: "Internal toolset",
    icon: ChartLineUp,
    question:
      "How can recurring safety reviews become more reproducible when quarterly files, historical cases, and reporting structures arrive in inconsistent forms?",
    method:
      "Canonical event keys, structured reconciliation states, repeatable table-generation logic, and explicit handling for severity, time windows, and unmatched records.",
    validation:
      "Outputs are compared with source counts and prior manual summaries; exceptions are surfaced for review. The system separates exact matches, partial matches, and new records.",
    value:
      "Creates a more auditable evidence trail for periodic safety review while reducing repetitive transformation work.",
  },
  {
    id: "global-rwd",
    eyebrow: "GOVERN → CONNECT",
    title: "Global Safety Data Foundation",
    summary:
      "A developing cross-market data foundation designed to connect distribution context, adverse-event information, regulatory status, and downstream comparative analysis.",
    tags: ["RWD foundation", "Data governance", "In progress"],
    maturity: "In progress",
    icon: Database,
    question:
      "What data structure is needed before global post-market information can support reliable comparison rather than isolated operational reporting?",
    method:
      "Common identifiers, data dictionaries, provenance fields, country and product mappings, quality rules, and a staged path from operational records to analysis-ready datasets.",
    validation:
      "Quality gates are being defined around completeness, duplicate detection, temporal consistency, source coverage, and reproducible transformations.",
    value:
      "Builds the prerequisite for future pharmacoepidemiology and RWE work without presenting an unfinished database as completed evidence.",
  },
  {
    id: "regulatory-intelligence",
    eyebrow: "INTERPRET → ACT",
    title: "Regulatory Intelligence & Evidence Workflows",
    summary:
      "A knowledge and workflow layer that links regulations, safety agreements, lifecycle triggers, and accountable actions across international markets.",
    tags: ["Regulatory intelligence", "RAG", "Workflow design"],
    maturity: "Prototype / operational design",
    icon: FileText,
    question:
      "How can complex GVP obligations remain searchable, traceable, and connected to the agreements and operational events they should trigger?",
    method:
      "Structured regulatory sources, retrievable evidence chunks, agreement-field extraction, lifecycle triggers, and human confirmation for legal or medical interpretation.",
    validation:
      "Source links and retrieved passages remain available for verification. High-impact conclusions are treated as assisted analysis, not autonomous compliance decisions.",
    value:
      "Turns fragmented regulatory reading into a maintainable evidence and action system while keeping professional judgment in the loop.",
  },
];

const methods = [
  {
    number: "01",
    title: "Latent decision mechanisms",
    text: "Hierarchical Drift Diffusion Models to infer how evidence accumulation, caution, and response processes may differ across people and conditions.",
    tools: "HDDM / HSSM · Hierarchical Bayes",
  },
  {
    number: "02",
    title: "Signals across people and studies",
    text: "Mixed models, longitudinal methods, and multilevel structures for repeated measures, heterogeneous populations, and clustered clinical data.",
    tools: "LMM / GLMM · Longitudinal · SEM",
  },
  {
    number: "03",
    title: "Prediction with accountable limits",
    text: "Machine learning for screening and prioritization, paired with transparent validation, interpretable features, and explicit limits on generalization.",
    tools: "Random Forest · Validation · Explainability",
  },
];

const story = [
  {
    year: "2017–2021",
    title: "The question behind the data",
    body: "Philosophy, psychology, and computational cognitive science formed the first thread: how people perceive, reason, and decide.",
  },
  {
    year: "2021–2023",
    title: "A gateway into clinical and medical data",
    body: "Clinical research operations placed me inside the data-generating process: coordinating high-volume participant data capture, supporting COVID-19 diagnostic test analysis, and supervising FDA-aligned site conduct. Prostate-cancer case NLP and work with biomedical research materials then connected medical questions, researchers, and structured information. This was the bridge from studying theory to pursuing medical data analysis.",
  },
  {
    year: "2023–2025",
    title: "From behavior to latent mechanisms",
    body: "At the University of Miami BRAIN Group, anxiety research connected behavioral tasks, fMRI, ECG, machine learning, LMM, and hierarchical drift diffusion modeling.",
  },
  {
    year: "2023–2025",
    title: "Learning to measure uncertainty",
    body: "MSPH training in biostatistics added study design, regression, longitudinal analysis, epidemiology, and a sharper language for evidence and uncertainty.",
  },
  {
    year: "2025–Now",
    title: "Evidence under real-world constraints",
    body: "International vaccine safety work made the data-generating system visible: regulation, quality, reporting routes, agreements, vendors, missingness, and organizational decisions.",
  },
  {
    year: "Next",
    title: "Evidence systems for better medical decisions",
    body: "The direction now expands toward RWE, pharmacoepidemiology, Safety Science, Clinical Data Science, medical evidence generation, and intelligent health systems.",
  },
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Header({ progress }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnResize = () => window.innerWidth > 820 && setMenuOpen(false);
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <header className="site-header">
        <button className="wordmark" onClick={() => scrollToId("top")} aria-label="Back to top">
          UNRAVEL
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollToId(item.id)}>
              {item.label}
            </button>
          ))}
          <a href="/assets/Xiaoyuan_Zhang_CV.docx.pdf" target="_blank" rel="noreferrer">
            CV
          </a>
        </nav>
        <button
          className="menu-button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={24} /> : <List size={25} />}
        </button>
        <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                scrollToId(item.id);
                setMenuOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
          <a href="/assets/Xiaoyuan_Zhang_CV.docx.pdf" target="_blank" rel="noreferrer">
            View CV
          </a>
        </div>
      </header>
    </>
  );
}

function ChapterIndex() {
  return (
    <aside className="chapter-index" aria-label="Narrative chapters">
      {chapters.map((chapter) => (
        <button key={chapter.number} onClick={() => scrollToId(chapter.target)}>
          <span className="chapter-dot" aria-hidden="true" />
          <span className="chapter-copy">
            <strong>
              {chapter.number} / {chapter.title}
            </strong>
            <small>{chapter.detail}</small>
          </span>
        </button>
      ))}
    </aside>
  );
}

function ProjectDialog({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && onClose();
    document.body.classList.add("dialog-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("dialog-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;
  const Icon = project.icon;

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <article
        className="project-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="dialog-close" onClick={onClose} aria-label="Close case file">
          <X size={22} />
        </button>
        <div className="dialog-heading">
          <Icon size={28} weight="light" />
          <p>{project.eyebrow}</p>
          <h2 id="dialog-title">{project.title}</h2>
          <span className="status-pill">{project.maturity}</span>
        </div>
        <div className="case-file-grid">
          <section>
            <span>01 / QUESTION</span>
            <p>{project.question}</p>
          </section>
          <section>
            <span>02 / METHOD & SYSTEM</span>
            <p>{project.method}</p>
          </section>
          <section>
            <span>03 / VALIDATION</span>
            <p>{project.validation}</p>
          </section>
          <section>
            <span>04 / EVIDENCE VALUE</span>
            <p>{project.value}</p>
          </section>
        </div>
        <p className="confidentiality-note">
          Public-safe overview. Patient-level data, company-confidential figures, and regulated records are not shown.
        </p>
      </article>
    </div>
  );
}

function AppContent() {
  const [progress, setProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [qualityMode, setQualityMode] = useState("gcp");

  const qualityCopy = useMemo(
    () => ({
      gcp: {
        label: "Clinical research",
        title: "Quality is designed before analysis.",
        body: "GCP connects protocol intent, participant protection, source data, traceability, and reliable analysis. It frames data quality as part of study conduct—not a clean-up step at the end.",
        points: ["Protocol-aligned capture", "Source traceability", "Human-subject protection"],
      },
      gvp: {
        label: "Post-market evidence",
        title: "Quality continues after approval.",
        body: "GVP connects case intake, signal evaluation, reporting responsibilities, vendor oversight, benefit–risk thinking, and evidence communication across markets.",
        points: ["Global-to-local data flow", "Accountable reporting", "Ongoing benefit–risk evidence"],
      },
    }),
    [],
  );

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
      },
      { threshold: 0.15 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const activeQuality = qualityCopy[qualityMode];

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header progress={progress} />
      <main id="main-content">
        <section id="top" className="hero section-dark">
          <div className="hero-copy">
            <p className="kicker">It starts in complexity.</p>
            <h1>UNRAVEL</h1>
            <h2>From human decisions to medical evidence systems.</h2>
            <p className="hero-lede">
              I use biostatistics, epidemiology, computational modeling, and intelligent systems to turn complex health
              data into evidence that can be trusted—and acted upon.
            </p>
            <p className="discipline-line">
              Computational Psychiatry <span>·</span> fMRI <span>·</span> Biostatistics <span>·</span> RWE <span>·</span>{" "}
              Safety Science
            </p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => scrollToId("work")}>
                Explore the evidence <ArrowRight size={18} />
              </button>
              <a className="button button-secondary" href="/assets/Xiaoyuan_Zhang_CV.docx.pdf" target="_blank" rel="noreferrer">
                View CV <FileText size={18} />
              </a>
            </div>
          </div>
          <ChapterIndex />
          <div className="hero-proof-strip" aria-label="Evidence system preview">
            <button className="proof-card audit-preview" onClick={() => scrollToId("work")}>
              <span className="proof-label">AUDIT TRAIL</span>
              <ul>
                <li>
                  <CheckCircle size={14} weight="fill" /> Source captured
                </li>
                <li>
                  <CheckCircle size={14} weight="fill" /> Identity & date checks
                </li>
                <li>
                  <CheckCircle size={14} weight="fill" /> Exceptions reviewed
                </li>
                <li>
                  <CheckCircle size={14} weight="fill" /> Human sign-off
                </li>
              </ul>
              <strong>Traceable. Reproducible. Trustworthy.</strong>
            </button>
            <button className="proof-card lifecycle-preview" onClick={() => scrollToId("quality")}>
              <span className="proof-label">QUALITY FRAMEWORKS</span>
              <div className="lifecycle-pair">
                <span>
                  <b>GCP</b>
                  Designed evidence
                </span>
                <span>
                  <b>GVP</b>
                  Living evidence
                </span>
              </div>
              <strong>One evidence lifecycle</strong>
            </button>
            <button className="proof-card system-preview" onClick={() => scrollToId("future")}>
              <span className="proof-label">INTELLIGENT HEALTH SYSTEM</span>
              <div className="system-flow">
                <span>Clinical · RWD · Safety</span>
                <span>Govern · Model · Validate</span>
                <span>Evidence · Decisions</span>
              </div>
              <strong>
                Evidence before automation <ArrowRight size={15} />
              </strong>
            </button>
          </div>
          <button className="scroll-cue" onClick={() => scrollToId("origin")} aria-label="Continue to research origin">
            Continue the thread <ArrowDown size={18} />
          </button>
        </section>

        <section id="origin" className="origin section-dark section-pad">
          <div className="section-heading light" data-reveal>
            <p className="section-number">ACT I / HOW DO WE KNOW?</p>
            <h2>Before evidence becomes a system, it begins as a question.</h2>
            <p>
              My research path began with how people perceive, decide, and behave—then moved toward the latent processes
              that cannot be observed directly.
            </p>
          </div>
          <div className="origin-grid">
            <figure className="fmri-frame" data-reveal>
              <img
                src="/assets/fmri-illustrative.webp"
                alt="Illustrative fMRI-inspired brain scan film on archival research papers"
              />
              <figcaption>Illustrative fMRI-inspired visual · no patient or study data shown</figcaption>
            </figure>
            <div className="research-notes" data-reveal>
              <article>
                <Brain size={27} weight="light" />
                <span>COMPUTATIONAL PSYCHIATRY</span>
                <h3>Inference beneath behavior</h3>
                <p>
                  Hierarchical drift diffusion modeling to examine latent mechanisms in working-memory decisions, with
                  uncertainty carried through the model rather than hidden behind a single score.
                </p>
              </article>
              <article>
                <ChartLineUp size={27} weight="light" />
                <span>COGNITIVE NEUROSCIENCE</span>
                <h3>Signals in context</h3>
                <p>
                  fMRI-based affective flexibility research using linear mixed-effects models, alongside behavioral,
                  neuropsychological, ECG, and multimodal data collection.
                </p>
              </article>
              <article>
                <MagnifyingGlass size={27} weight="light" />
                <span>MACHINE LEARNING</span>
                <h3>Prediction with restraint</h3>
                <p>
                  Random-forest work on anxiety and executive-function features—treating prediction as a testable tool,
                  not a substitute for scientific interpretation.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="quality" className="quality section-paper section-pad">
          <div className="paper-inner">
            <div className="section-heading dark" data-reveal>
              <p className="section-number">ACT II / HOW DO WE MEASURE?</p>
              <h2>Evidence quality across the product lifecycle.</h2>
              <p>
                Analysis is only as credible as the system that generated the data. GCP and GVP are not acronyms in a
                skills list—they are two connected quality environments.
              </p>
            </div>
            <div className="quality-console" data-reveal>
              <div className="quality-switch" role="tablist" aria-label="Evidence quality framework">
                <button
                  className={qualityMode === "gcp" ? "active" : ""}
                  role="tab"
                  aria-selected={qualityMode === "gcp"}
                  onClick={() => setQualityMode("gcp")}
                >
                  <span>GCP</span>
                  Clinical evidence
                </button>
                <button
                  className={qualityMode === "gvp" ? "active" : ""}
                  role="tab"
                  aria-selected={qualityMode === "gvp"}
                  onClick={() => setQualityMode("gvp")}
                >
                  <span>GVP</span>
                  Post-market evidence
                </button>
              </div>
              <article className="quality-detail" key={qualityMode}>
                <p>{activeQuality.label}</p>
                <h3>{activeQuality.title}</h3>
                <div>{activeQuality.body}</div>
                <ul>
                  {activeQuality.points.map((point) => (
                    <li key={point}>
                      <CheckCircle size={19} weight="fill" /> {point}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
            <blockquote data-reveal>
              “Good data. Better questions. Rigor is a habit.”
            </blockquote>
          </div>
        </section>

        <section id="work" className="work section-dark section-pad">
          <div className="section-heading light" data-reveal>
            <p className="section-number">ACT III / EVIDENCE IN THE REAL WORLD</p>
            <h2>Selected evidence systems.</h2>
            <p>
              The work is organized by the evidence problem it solves—not by a list of tools. Open a case file to see the
              question, method, validation logic, and maturity.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <button className="project-card" key={project.id} onClick={() => setSelectedProject(project)} data-reveal>
                  <div className="project-card-top">
                    <Icon size={26} weight="light" />
                    <span>{project.maturity}</span>
                  </div>
                  <p className="project-eyebrow">{project.eyebrow}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <span className="card-action">
                    Open case file <ArrowRight size={17} />
                  </span>
                </button>
              );
            })}
          </div>
          <p className="work-note" data-reveal>
            Selected work reflects direct contributions and active development. Sensitive records and internal results are
            intentionally omitted.
          </p>
        </section>

        <section id="lab" className="lab section-paper section-pad">
          <div className="paper-inner lab-inner">
            <div className="section-heading dark" data-reveal>
              <p className="section-number">EVIDENCE LAB / METHODS IN MOTION</p>
              <h2>Model the process, not only the outcome.</h2>
              <p>
                My method stack spans statistical inference, computational models, and pragmatic data systems. The common
                thread is a preference for assumptions that can be examined and results that can be challenged.
              </p>
            </div>
            <div className="method-list">
              {methods.map((method) => (
                <article key={method.number} data-reveal>
                  <span>{method.number}</span>
                  <div>
                    <h3>{method.title}</h3>
                    <p>{method.text}</p>
                    <small>{method.tools}</small>
                  </div>
                </article>
              ))}
            </div>
            <div className="publication-note" data-reveal>
              <p>SELECTED PUBLICATION</p>
              <h3>A Multilevel Study of Leaders’ Emotional Labor on Servant Leadership and Job Satisfaction</h3>
              <span>Research on Emotion in Organizations, Vol. 15 · 2019 · Co-author</span>
            </div>
          </div>
        </section>

        <section id="story" className="story section-dark section-pad">
          <div className="section-heading light" data-reveal>
            <p className="section-number">DIRECTOR’S NOTES / THE EVIDENCE THREAD</p>
            <h2>One question, changing scales.</h2>
            <p>
              This is not a pivot away from one profession. It is a widening frame—from individual cognition to evidence
              systems that shape medical decisions.
            </p>
          </div>
          <div className="story-timeline">
            {story.map((item) => (
              <article key={`${item.year}-${item.title}`} data-reveal>
                <span>{item.year}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="future" className="future section-pad">
          <div className="future-copy" data-reveal>
            <p className="section-number">ACT IV / WHERE THIS CAN GO</p>
            <h2>From medical questions to decision-ready evidence.</h2>
            <p>
              I am building toward roles where biostatistics, clinical and real-world data, pharmacoepidemiology, Safety
              Science, and technology support better medical decisions—from rigorous analysis to evidence systems that
              can operate in regulated environments.
            </p>
            <div className="future-fields" aria-label="Target fields">
              <span>Real-World Evidence</span>
              <span>Clinical Data Science</span>
              <span>Safety Science</span>
              <span>Pharmacoepidemiology</span>
              <span>Medical Data Analytics</span>
              <span>Intelligent Health Systems</span>
            </div>
          </div>
          <div className="decision-panel" data-reveal>
            <div className="panel-header">
              <ShieldCheck size={26} />
              <div>
                <span>INTELLIGENT HEALTH SYSTEM</span>
                <strong>Evidence before automation</strong>
              </div>
            </div>
            <ul>
              <li>
                <span>01</span> Start from the medical question
              </li>
              <li>
                <span>02</span> Understand how the data were generated
              </li>
              <li>
                <span>03</span> Model uncertainty and heterogeneity
              </li>
              <li>
                <span>04</span> Validate against source and context
              </li>
              <li>
                <span>05</span> Build for traceable human decisions
              </li>
            </ul>
          </div>
        </section>

        <section className="contact section-dark">
          <div>
            <p className="section-number">EPILOGUE / CONTINUE THE THREAD</p>
            <h2>Complexity is where the work begins.</h2>
            <p>
              Xiaoyuan “Reginald” Zhang · Biostatistics · Medical Evidence · Intelligent Health Systems
            </p>
          </div>
          <div className="contact-actions">
            <a className="button button-primary" href="mailto:reggiezhang9719@gmail.com">
              Start a conversation <ArrowRight size={18} />
            </a>
            <a className="icon-link" href="https://github.com/Unravelreggie" target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <GithubLogo size={24} />
            </a>
            <a
              className="icon-link"
              href="https://www.linkedin.com/in/xiaoyuan-zhang-4a4999352"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
            >
              <LinkedinLogo size={24} />
            </a>
          </div>
        </section>
      </main>
      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}

export function App() {
  return <AppContent />;
}
