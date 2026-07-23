import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Barbell,
  Brain,
  Briefcase,
  Buildings,
  ChartLineUp,
  CheckCircle,
  Code,
  Database,
  Dog,
  FileText,
  GithubLogo,
  LinkedinLogo,
  List,
  MagnifyingGlass,
  PersonSimpleSwim,
  ShieldCheck,
  TennisBall,
  X,
} from "@phosphor-icons/react";
import { siteTitle, translateContent, translateText } from "./site-language.js";

const navItems = [
  { id: "experience", label: "Experience" },
  { id: "work", label: "Selected Work" },
  { id: "story", label: "Story" },
  { id: "off-hours", label: "Off Hours" },
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

function LanguageToggle({ language, onChange, label }) {
  return (
    <div className="language-toggle" role="group" aria-label={label}>
      <button className={language === "en" ? "active" : ""} onClick={() => onChange("en")} aria-pressed={language === "en"}>
        EN
      </button>
      <span aria-hidden="true">/</span>
      <button className={language === "zh" ? "active" : ""} onClick={() => onChange("zh")} aria-pressed={language === "zh"}>
        {"\u4e2d\u6587"}
      </button>
    </div>
  );
}

function Header({ progress, language, onLanguageChange, items, t }) {
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
        <button className="wordmark" onClick={() => scrollToId("top")} aria-label={t("Back to top")}>
          <span>{t("REGINALD'S PERSONAL WEBSITE")}</span>
          <strong>UNRAVEL</strong>
          <small>{t("Xiaoyuan Zhang \u00b7 \u5f20\u6f47\u8fdc")}</small>
        </button>
        <nav className="desktop-nav" aria-label={t("Primary navigation")}>
          {items.map((item) => (
            <button key={item.id} onClick={() => scrollToId(item.id)}>
              {item.label}
            </button>
          ))}
          <a href="/assets/Xiaoyuan_Zhang_CV_2026.pdf" target="_blank" rel="noreferrer">
            CV
          </a>
          <LanguageToggle language={language} onChange={onLanguageChange} label={t("Language selection")} />
        </nav>
        <button
          className="menu-button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? t("Close navigation") : t("Open navigation")}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={24} /> : <List size={25} />}
        </button>
        <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
          {items.map((item) => (
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
          <a href="/assets/Xiaoyuan_Zhang_CV_2026.pdf" target="_blank" rel="noreferrer">
            {t("View CV")}
          </a>
          <LanguageToggle language={language} onChange={onLanguageChange} label={t("Language selection")} />
        </div>
      </header>
    </>
  );
}

function ProjectDialog({ project, onClose, t }) {
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
        <button className="dialog-close" onClick={onClose} aria-label={t("Close case file")}>
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
            <span>{t("01 / QUESTION")}</span>
            <p>{project.question}</p>
          </section>
          <section>
            <span>{t("02 / METHOD & SYSTEM")}</span>
            <p>{project.method}</p>
          </section>
          <section>
            <span>{t("03 / VALIDATION")}</span>
            <p>{project.validation}</p>
          </section>
          <section>
            <span>{t("04 / EVIDENCE VALUE")}</span>
            <p>{project.value}</p>
          </section>
        </div>
        <p className="confidentiality-note">
          {t("Public-safe overview. Patient-level data, company-confidential figures, and regulated records are not shown.")}
        </p>
      </article>
    </div>
  );
}

function AppContent() {
  const [progress, setProgress] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [qualityMode, setQualityMode] = useState("gcp");
  const [language, setLanguage] = useState(() => {
    try {
      return window.localStorage.getItem("unravel-language") === "zh" ? "zh" : "en";
    } catch {
      return "en";
    }
  });

  const t = (text) => translateText(text, language);
  const localizedNavItems = useMemo(() => translateContent(navItems, language), [language]);
  const localizedExperiences = useMemo(() => translateContent(experiences, language), [language]);
  const localizedFoundations = useMemo(() => translateContent(earlierFoundations, language), [language]);
  const localizedProjects = useMemo(() => translateContent(projects, language), [language]);
  const localizedMethods = useMemo(() => translateContent(methods, language), [language]);
  const localizedStory = useMemo(() => translateContent(story, language), [language]);
  const localizedInterests = useMemo(() => translateContent(interests, language), [language]);
  const selectedProject = localizedProjects.find((project) => project.id === selectedProjectId) ?? null;


  const qualityCopy = useMemo(
    () => translateContent({
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
    }, language),
    [language],
  );

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = siteTitle(language);
    try {
      window.localStorage.setItem("unravel-language", language);
    } catch {
      // The language toggle still works when storage is unavailable.
    }
  }, [language]);

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
  }, [language]);

  const activeQuality = qualityCopy[qualityMode];

  return (
    <>
      <a className="skip-link" href="#main-content">
        {t("Skip to content")}
      </a>
      <Header progress={progress} language={language} onLanguageChange={setLanguage} items={localizedNavItems} t={t} />
      <main id="main-content">
        <section id="top" className="hero section-dark">
          <div className="hero-copy">
            <p className="kicker">{t("REGINALD'S PERSONAL WEBSITE")}</p>
            <p className="hero-owner">{t("Reginald \u2014 Xiaoyuan Zhang / \u5f20\u6f47\u8fdc")}</p>
            <h1>UNRAVEL</h1>
            <h2>{t("From human decisions to medical evidence systems.")}</h2>
            <p className="hero-lede">{t("I use biostatistics, epidemiology, computational modeling, and intelligent systems to turn complex health data into evidence that can be trusted—and acted upon.")}</p>
            <p className="discipline-line">{t("Computational Psychiatry · fMRI · Biostatistics · RWE · Safety Science")}</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => scrollToId("work")}>
                {t("Explore the evidence")} <ArrowRight size={18} />
              </button>
              <a className="button button-secondary" href="/assets/Xiaoyuan_Zhang_CV_2026.pdf" target="_blank" rel="noreferrer">
                {t("View CV")} <FileText size={18} />
              </a>
            </div>
          </div>
        </section>

        <section id="origin" className="origin section-dark section-pad">
          <div className="section-heading light" data-reveal>
            <p className="section-number">{t("RESEARCH FOUNDATIONS / HOW DO WE KNOW?")}</p>
            <h2>{t("Before evidence becomes a system, it begins as a question.")}</h2>
            <p>{t("My research path began with how people perceive, decide, and behave—then moved toward the latent processes that cannot be observed directly.")}</p>
          </div>
          <div className="origin-grid">
            <figure className="fmri-frame" data-reveal>
              <img
                src="/assets/fmri-illustrative.webp"
                alt={t("Illustrative fMRI-inspired brain scan film on archival research papers")}
              />
              <figcaption>{t("Illustrative fMRI-inspired visual · no patient or study data shown")}</figcaption>
            </figure>
            <div className="research-notes" data-reveal>
              <article>
                <Brain size={27} weight="light" />
                <span>{t("COMPUTATIONAL PSYCHIATRY")}</span>
                <h3>{t("Inference beneath behavior")}</h3>
                <p>{t("Hierarchical drift diffusion modeling to examine latent mechanisms in working-memory decisions, with uncertainty carried through the model rather than hidden behind a single score.")}</p>
              </article>
              <article>
                <ChartLineUp size={27} weight="light" />
                <span>{t("COGNITIVE NEUROSCIENCE")}</span>
                <h3>{t("Signals in context")}</h3>
                <p>{t("fMRI-based affective flexibility research using linear mixed-effects models, alongside behavioral, neuropsychological, ECG, and multimodal data collection.")}</p>
              </article>
              <article>
                <MagnifyingGlass size={27} weight="light" />
                <span>{t("MACHINE LEARNING")}</span>
                <h3>{t("Prediction with restraint")}</h3>
                <p>{t("Random-forest work on anxiety and executive-function features—treating prediction as a testable tool, not a substitute for scientific interpretation.")}</p>
              </article>
            </div>
          </div>
        </section>

        <section id="quality" className="quality section-paper section-pad">
          <div className="paper-inner">
            <div className="section-heading dark" data-reveal>
              <p className="section-number">{t("EVIDENCE QUALITY / HOW DO WE MEASURE?")}</p>
              <h2>{t("Evidence quality across the product lifecycle.")}</h2>
              <p>{t("Analysis is only as credible as the system that generated the data. GCP and GVP are not acronyms in a skills list—they are two connected quality environments.")}</p>
            </div>
            <div className="quality-console" data-reveal>
              <div className="quality-switch" role="tablist" aria-label={t("Evidence quality framework")}>
                <button
                  className={qualityMode === "gcp" ? "active" : ""}
                  role="tab"
                  aria-selected={qualityMode === "gcp"}
                  onClick={() => setQualityMode("gcp")}
                >
                  <span>GCP</span>
                  {t("Clinical evidence")}
                </button>
                <button
                  className={qualityMode === "gvp" ? "active" : ""}
                  role="tab"
                  aria-selected={qualityMode === "gvp"}
                  onClick={() => setQualityMode("gvp")}
                >
                  <span>GVP</span>
                  {t("Post-market evidence")}
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
            <blockquote data-reveal>{t("“Good data. Better questions. Rigor is a habit.”")}</blockquote>
          </div>
        </section>

        <section id="experience" className="experience section-dark section-pad" aria-labelledby="experience-title">
          <div className="section-heading light" data-reveal>
            <p className="section-number">{t("EXPERIENCE / EVIDENCE IN PRACTICE")}</p>
            <h2 id="experience-title">{t("Work changed the scale of the question.")}</h2>
            <p>{t("Across research, clinical operations, medical data, and regulated safety systems, each role revealed another part of how evidence is generated, governed, and used. Pharmacovigilance is one domain in that broader path.")}</p>
          </div>
          <div className="experience-grid">
            {localizedExperiences.map((item) => {
              const Icon = item.icon;
              return (
                <article className="experience-card" key={item.id} data-reveal>
                  <div className="experience-card-top">
                    <Icon size={26} weight="light" aria-hidden="true" />
                    <time>{item.period}</time>
                  </div>
                  <p className="experience-company">{item.company}</p>
                  <h3>{item.role}</h3>
                  <p className="experience-location">{item.location}</p>
                  <p className="experience-summary">{item.summary}</p>
                  <div className="experience-thread">
                    <span>{t("PATH THREAD")}</span>
                    <p>{item.path}</p>
                  </div>
                  <ul className="experience-tags" aria-label={t("Key capabilities")}>
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
          <div className="earlier-foundations" data-reveal>
            <div className="foundations-heading">
              <p>{t("EARLIER FOUNDATIONS")}</p>
              <h3>{t("Research, communication, and cross-cultural coordination came first.")}</h3>
            </div>
            <div className="foundation-list">
              {localizedFoundations.map((item) => (
                <article key={item.id}>
                  <time>{item.year}</time>
                  <h4>{item.title}</h4>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="work section-dark section-pad">
          <div className="section-heading light" data-reveal>
            <p className="section-number">{t("CASE FILES / SELECTED EVIDENCE SYSTEMS")}</p>
            <h2>{t("Selected evidence systems.")}</h2>
            <p>{t("The work is organized by the evidence problem it solves—not by a list of tools. Open a case file to see the question, method, validation logic, and maturity.")}</p>
          </div>
          <div className="project-grid">
            {localizedProjects.map((project) => {
              const Icon = project.icon;
              return (
                <button className="project-card" key={project.id} onClick={() => setSelectedProjectId(project.id)} data-reveal>
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
                    {t("Open case file")} <ArrowRight size={17} />
                  </span>
                </button>
              );
            })}
          </div>
          <p className="work-note" data-reveal>{t("Selected work reflects direct contributions and active development. Sensitive records and internal results are intentionally omitted.")}</p>
        </section>

        <section id="lab" className="lab section-paper section-pad">
          <div className="paper-inner lab-inner">
            <div className="section-heading dark" data-reveal>
              <p className="section-number">{t("METHODS / HOW I WORK")}</p>
              <h2>{t("Model the process, not only the outcome.")}</h2>
              <p>{t("My method stack spans statistical inference, computational models, and pragmatic data systems. The common thread is a preference for assumptions that can be examined and results that can be challenged.")}</p>
            </div>
            <div className="method-list">
              {localizedMethods.map((method) => (
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
              <p>{t("SELECTED PUBLICATION")}</p>
              <h3>{t("A Multilevel Study of Leaders’ Emotional Labor on Servant Leadership and Job Satisfaction")}</h3>
              <span>{t("Research on Emotion in Organizations, Vol. 15 · 2019 · Co-author")}</span>
            </div>
          </div>
        </section>

        <section id="story" className="story section-dark section-pad">
          <div className="section-heading light" data-reveal>
            <p className="section-number">{t("CAREER PATH / THE EVIDENCE THREAD")}</p>
            <h2>{t("One question, changing scales.")}</h2>
            <p>{t("This is not a pivot away from one profession. It is a widening frame—from individual cognition to evidence systems that shape medical decisions.")}</p>
          </div>
          <div className="story-timeline">
            {localizedStory.map((item, index) => (
              <article key={`story-${index}`} data-reveal>
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
            <p className="section-number">{t("NEXT / WHERE THIS CAN GO")}</p>
            <h2>{t("From medical questions to decision-ready evidence.")}</h2>
            <p>{t("I am building toward roles where biostatistics, clinical and real-world data, pharmacoepidemiology, Safety Science, and technology support better medical decisions—from rigorous analysis to evidence systems that can operate in regulated environments.")}</p>
            <div className="future-fields" aria-label={t("Target fields")}>
              <span>{t("Real-World Evidence")}</span>
              <span>{t("Clinical Data Science")}</span>
              <span>{t("Safety Science")}</span>
              <span>{t("Pharmacoepidemiology")}</span>
              <span>{t("Medical Data Analytics")}</span>
              <span>{t("Intelligent Health Systems")}</span>
            </div>
          </div>
          <div className="decision-panel" data-reveal>
            <div className="panel-header">
              <ShieldCheck size={26} />
              <div>
                <span>{t("INTELLIGENT HEALTH SYSTEM")}</span>
                <strong>{t("Evidence before automation")}</strong>
              </div>
            </div>
            <ul>
              <li>
                <span>01</span> {t("Start from the medical question")}
              </li>
              <li>
                <span>02</span> {t("Understand how the data were generated")}
              </li>
              <li>
                <span>03</span> {t("Model uncertainty and heterogeneity")}
              </li>
              <li>
                <span>04</span> {t("Validate against source and context")}
              </li>
              <li>
                <span>05</span> {t("Build for traceable human decisions")}
              </li>
            </ul>
          </div>
        </section>

        <section id="off-hours" className="off-hours section-dark section-pad" aria-labelledby="off-hours-title">
          <div className="section-heading light" data-reveal>
            <p className="section-number">{t("OFF HOURS / THE HUMAN SIDE")}</p>
            <h2 id="off-hours-title">{t("Still testing, training, and paying attention.")}</h2>
            <p>{t("Sport, companionship, and small experiments keep curiosity physical, practical, and personal.")}</p>
          </div>
          <div className="interest-grid">
            {localizedInterests.map((item) => {
              const Icon = item.icon;
              const SecondaryIcon = item.secondaryIcon;
              return (
                <article className={`interest-card interest-card--${item.id}`} key={item.id} data-reveal>
                  <div className="interest-card-top" aria-hidden="true">
                    <Icon size={30} weight="light" />
                    {SecondaryIcon ? <SecondaryIcon size={25} weight="light" /> : null}
                  </div>
                  <p className="interest-eyebrow">{item.eyebrow}</p>
                  <h3>{item.title}</h3>
                  <p className="interest-fact">{item.fact}</p>
                  <p className="interest-body">{item.body}</p>
                  <ul className="interest-tags" aria-label={t("Details")}>
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section className="contact section-dark">
          <div>
            <p className="section-number">{t("CONTACT / KEEP IN TOUCH")}</p>
            <h2>{t("Complexity is where the work begins.")}</h2>
            <p>{t("Xiaoyuan “Reginald” Zhang · 张潇远 · Biostatistics · Medical Evidence · Intelligent Health Systems")}</p>
            <address className="contact-details">
              <span>
                <b>{t("WeChat")}</b>
                reginaldzhang1119
              </span>
              <a href="tel:+8613552604882">
                <b>{t("Mobile")}</b>
                +86 135-5260-4882
              </a>
            </address>
          </div>
          <div className="contact-actions">
            <a className="button button-primary" href="mailto:reggiezhang9719@gmail.com">
              {t("Start a conversation")} <ArrowRight size={18} />
            </a>
            <a className="icon-link" href="https://github.com/Unravelreggie" target="_blank" rel="noreferrer" aria-label={t("GitHub profile")}>
              <GithubLogo size={24} />
            </a>
            <a
              className="icon-link"
              href="https://www.linkedin.com/in/xiaoyuan-zhang-4a4999352"
              target="_blank"
              rel="noreferrer"
              aria-label={t("LinkedIn profile")}
            >
              <LinkedinLogo size={24} />
            </a>
          </div>
        </section>
      </main>
      <ProjectDialog project={selectedProject} onClose={() => setSelectedProjectId(null)} t={t} />
    </>
  );
}

export function App() {
  return <AppContent />;
}
const experiences = [
  {
    id: "sinovac",
    period: "06/2025 – Present",
    company: "Sinovac Biotech Group Co., Ltd.",
    role: "International Pharmacovigilance Administrator",
    location: "Beijing / Chengdu, China",
    summary:
      "Interpret GVP requirements across international markets; coordinate PVA/SDEA, vendors, audits, and periodic-report support; and contribute to workflow automation and structured data infrastructure for global vaccine safety.",
    path:
      "Made the real constraints behind post-market evidence visible: regulation, accountability, data quality, and cross-market coordination.",
    tags: ["Global safety operations", "GVP quality", "Workflow systems"],
    icon: ShieldCheck,
  },
  {
    id: "miami-brain",
    period: "08/2023 – 05/2025",
    company: "University of Miami · BRAIN Group",
    role: "Graduate Research Assistant",
    location: "Miami, USA",
    summary:
      "Studied anxiety and executive function through behavioral tasks, fMRI, ECG, random forest, linear mixed models, and hierarchical drift diffusion modeling, while supporting data quality and research-assistant training.",
    path:
      "Connected questions about human decision-making to measurable, uncertainty-aware models.",
    tags: ["Computational psychiatry", "fMRI & ECG", "HDDM / HSSM"],
    icon: Brain,
  },
  {
    id: "medchemexpress",
    period: "01/2023 – 08/2023",
    company: "MedChemExpress LLC",
    role: "Operations Associate",
    location: "New Jersey, USA",
    summary:
      "Managed 80+ daily cases for a biomedical research-material supplier, coordinating logistics and trade-compliance solutions among clients, agents, vendors, and researchers.",
    path:
      "Revealed the operational network that enables biomedical research.",
    tags: ["Biomedical research", "Cross-border operations", "Researcher support"],
    icon: Buildings,
  },
  {
    id: "cb-payments",
    period: "10/2022 – 12/2022",
    company: "CB Payments LLC",
    role: "Data Analyst Intern",
    location: "Remote, USA",
    summary:
      "Applied NLP, data capture, and cleaning to prostate-cancer case reports, alongside literature and patent research on medical-language applications.",
    path:
      "Created a direct bridge between computational methods and disease-specific medical data.",
    tags: ["Medical NLP", "Case reports", "Data cleaning"],
    icon: Code,
  },
  {
    id: "hopkins-medtech",
    period: "01/2022 – 09/2022",
    company: "Hopkins MedTech Compliance LLC",
    role: "Clinical Research Associate",
    location: "New Jersey, USA",
    summary:
      "Led a 10-person data-entry team supporting 300+ participant records daily, analyzed COVID-19 test sensitivity and specificity, and supervised FDA-aligned site execution.",
    path:
      "Placed me inside the clinical data-generating process, where protocol execution and data quality are inseparable.",
    tags: ["Clinical research", "Diagnostic data", "FDA-aligned conduct"],
    icon: Briefcase,
  },
  {
    id: "deloitte",
    period: "06/2019 – 08/2019",
    company: "Deloitte Consulting Shanghai",
    role: "Business Analyst Intern",
    location: "Beijing, China",
    summary:
      "Used Excel-based analysis for city-level salary normalization and financial-report review, and supported the design of an international management-trainee program.",
    path:
      "Built an early habit of structuring ambiguous organizational questions for decisions.",
    tags: ["Business analytics", "Excel visualization", "Cross-functional work"],
    icon: ChartLineUp,
  },
];

const earlierFoundations = [
  {
    id: "bit-research",
    year: "2018",
    title: "Beijing Institute of Technology · Research Assistant",
    detail:
      "Behavioral-science research in data cleaning, SPSS analysis, report development, and study interpretation; later connected to a co-authored multilevel study published in 2019.",
  },
  {
    id: "pea-teaching",
    year: "2018",
    title: "PEA International Summer School · Teaching Assistant",
    detail:
      "Supported international-course delivery, faculty coordination, classroom organization, and student logistics at Beihang University.",
  },
  {
    id: "new-oriental",
    year: "2017",
    title: "New Oriental · Teaching Assistant",
    detail:
      "Supported English learning, student progress tracking, and communication among students, parents, and teachers.",
  },
];

const interests = [
  {
    id: "tennis",
    eyebrow: "PLAY / ITERATE",
    title: "Tennis Lab",
    fact: "NTRP 3.0",
    body:
      "I rotate between two distinct setups: the precision and connected feedback of a Wilson Pro Staff 97 v14 (315 g), and the faster, spin-oriented Babolat Pure Aero 98 (305 g).",
    tags: ["Wilson Pro Staff 97 v14 · 315 g", "Babolat Pure Aero 98 · 305 g"],
    icon: TennisBall,
  },
  {
    id: "movement",
    eyebrow: "MOVE / RESET",
    title: "Swimming & Strength",
    fact: "Rhythm · Endurance · Progression",
    body:
      "Swimming develops rhythm and endurance; strength training adds structure and progressive work. Both reset attention away from the screen.",
    tags: ["Swimming", "Strength training"],
    icon: PersonSimpleSwim,
    secondaryIcon: Barbell,
  },
  {
    id: "dogs",
    eyebrow: "COMPANIONS / DAILY LIFE",
    title: "Chacha & Rocky",
    fact: "Golden Retriever · French Bulldog",
    body:
      "Chacha, a Golden Retriever, and Rocky, a French Bulldog, bring companionship and a different rhythm to daily life.",
    tags: ["Chacha · Golden Retriever", "Rocky · French Bulldog"],
    icon: Dog,
  },
  {
    id: "ai-coding",
    eyebrow: "BUILD / TEST",
    title: "AI Coding Playground",
    fact: "Small prototypes · New tools",
    body:
      "In spare time I test AI-assisted coding workflows, build small prototypes, and explore where models accelerate iteration—and where human verification still matters.",
    tags: ["AI-assisted coding", "Rapid prototyping", "Human verification"],
    icon: Code,
  },
];
