import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProjectSlugs,
  getExplorePageForGroup,
  getProjectBySlug,
} from "@/lib/project-groups";
import { site } from "@/lib/site";
import "./project-page.css";
import { ProjectPageScript } from "./project-page-script";

const roles = [
  "Design",
  "Coding",
  "Research",
  "Prototyping",
  "Testing",
  "Documentation",
  "Deployment",
  "Strategy",
  "Writing",
];

const teamLabel = "Solo project";

export function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  if (slugs.length === 0) {
    return [{ slug: "__placeholder__" }];
  }
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const result = getProjectBySlug(slug);
  if (!result) return {};
  return {
    title: result.project.title,
    description: result.project.about,
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const result = getProjectBySlug(slug);

  if (!result) notFound();

  const { project, group } = result;
  const explorePage = getExplorePageForGroup(group);
  const backHref = explorePage
    ? `/explore/projects/${explorePage.id}`
    : "/home?tab=projects#work";

  return (
    <div className="project-page" id="top">
      <div className="project-shell">
        <main>
          <div className="project-head">
            <Link className="project-back-link" href={backHref}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
                <path d="M9 12h12" />
              </svg>
              Back to all projects
            </Link>

            <section className="intro" aria-labelledby="project-title">
              <div>
                <div className="project-eyebrow">
                  <span>{explorePage?.name?.toUpperCase() ?? "PROJECT"}</span>
                  <span className="dot"></span>
                  <span>{group.title.toUpperCase()}</span>
                </div>
                <h1 id="project-title">
                  {project.title}
                  <span className="dot">.</span>
                </h1>
                <p className="project-intro-copy">{project.about}</p>
                <div className="project-actions">
                  <a
                    className="project-button primary project-placeholder-link"
                    href="#live-preview"
                    data-message="Replace this demo action with your project's live URL."
                  >
                    View live project{" "}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </a>
                  <a
                    className="project-button"
                    href={site.links.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on GitHub{" "}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M9 18 3 12l6-6M15 6l6 6-6 6M14 4l-4 16" />
                    </svg>
                  </a>
                  <a className="project-button" href={site.links.email}>
                    Discuss a project{" "}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </section>

            <section className="project-meta" aria-label="Project metadata">
              <div className="project-meta-item">
                <span className="project-meta-label">My role</span>
                <button
                  className="project-meta-roles"
                  type="button"
                  data-open-project="project-roles-overlay"
                  aria-haspopup="dialog"
                  aria-label="View all roles"
                >
                  <span className="project-meta-roles-list">
                    {roles.map((role) => (
                      <span key={role} className="role">
                        {role}
                      </span>
                    ))}
                  </span>
                  <span className="project-meta-more" aria-hidden="true"></span>
                </button>
              </div>
              <div className="project-meta-item">
                <span className="project-meta-label">Team</span>
                <span className="project-meta-value">{teamLabel}</span>
              </div>
              <div className="project-meta-item">
                <span className="project-meta-label">Tools &amp; stack</span>
                <button
                  className="project-meta-stack"
                  type="button"
                  data-open-project="project-stack-overlay"
                  aria-haspopup="dialog"
                  aria-label="View the full technology stack"
                >
                  <span className="project-meta-stack-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag project-tag">
                        {tag}
                      </span>
                    ))}
                  </span>
                  <span className="project-meta-more" aria-hidden="true"></span>
                </button>
              </div>
              <div className="project-meta-item">
                <span className="project-meta-label">Status</span>
                <span className="project-meta-value">
                  {project.status === "live"
                    ? "Built / live"
                    : project.status === "wip"
                      ? "In progress"
                      : "Archived"}
                  {project.year ? ` · ${project.year}` : ""}
                </span>
              </div>
            </section>
          </div>

          <section
            className="project-preview-wrap"
            id="live-preview"
            aria-label="Project visual preview"
          >
            <div className="project-preview">
              <div className="project-browser">
                <div className="project-browser-bar">
                  <span className="project-browser-dot"></span>
                  <span className="project-browser-dot"></span>
                  <span className="project-browser-dot"></span>
                  <div className="project-browser-address">
                    {project.slug}.example / workspace
                  </div>
                </div>
                <div className="project-app">
                  <aside className="project-app-sidebar" aria-hidden="true">
                    <div className="project-app-logo">
                      <span className="project-app-logo-mark">
                        {project.title.charAt(0).toUpperCase()}
                      </span>
                      <span>{project.title.toLowerCase().replace(/\s+/g, "")}</span>
                    </div>
                    <div className="project-side-label">Workspace</div>
                    <div className="project-side-item selected">
                      <span className="tiny-icon"></span>Overview
                    </div>
                    <div className="project-side-item">
                      <span className="tiny-icon"></span>My tasks
                    </div>
                    <div className="project-side-item">
                      <span className="tiny-icon"></span>Projects
                    </div>
                    <div className="project-side-label">Personal</div>
                    <div className="project-side-item">
                      <span className="tiny-icon"></span>Notes
                    </div>
                    <div className="project-side-item">
                      <span className="tiny-icon"></span>Archive
                    </div>
                  </aside>
                  <div className="project-app-main">
                    <div className="project-app-topline">
                      <span>MONDAY, OCTOBER 27</span>
                      <span className="project-avatar">FO</span>
                    </div>
                    <div className="project-app-heading">Good morning, Favour.</div>
                    <div className="project-app-subtitle">
                      A little progress, consistently, adds up.
                    </div>
                    <div className="project-app-stats">
                      <div className="project-stat-card">
                        <div className="project-stat-top">
                          <span>In progress</span>
                          <span>↗</span>
                        </div>
                        <div className="project-stat-num">06</div>
                        <span className="project-stat-change">This week</span>
                      </div>
                      <div className="project-stat-card">
                        <div className="project-stat-top">
                          <span>Completed</span>
                          <span>✓</span>
                        </div>
                        <div className="project-stat-num">12</div>
                        <span className="project-stat-change">+3 this week</span>
                      </div>
                      <div className="project-stat-card">
                        <div className="project-stat-top">
                          <span>Focus time</span>
                          <span>◷</span>
                        </div>
                        <div className="project-stat-num">4.5h</div>
                        <span className="project-stat-change">On track</span>
                      </div>
                    </div>
                    <div className="project-work-panel">
                      <div className="project-panel-head">
                        <span>Today&apos;s focus</span>
                        <span>View all →</span>
                      </div>
                      <div className="project-work-row">
                        <span className="project-work-title">
                          <span className="project-work-check">✓</span>
                          Refine the project structure
                        </span>
                        <span>10:00 AM</span>
                        <span className="project-status-pill">Done</span>
                      </div>
                      <div className="project-work-row">
                        <span className="project-work-title">
                          <span className="project-work-check"></span>
                          Build the detail page
                        </span>
                        <span>11:30 AM</span>
                        <span className="project-status-pill">In progress</span>
                      </div>
                      <div className="project-work-row">
                        <span className="project-work-title">
                          <span className="project-work-check"></span>
                          Review and document
                        </span>
                        <span>02:00 PM</span>
                        <span className="project-status-pill">Next up</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span className="project-preview-caption">
                Illustrative interface · {project.title}
              </span>
            </div>
          </section>

          <div className="project-content-layout">
            <article className="project-case-content">
              <section className="project-content-section" id="overview">
                <div className="project-section-kicker">
                  <span>01</span> Overview
                </div>
                <h2>Useful software starts with a real problem.</h2>
                <p>
                  {project.title} is a {group.title.toLowerCase()} build.{" "}
                  {project.about}
                </p>
                <p>
                  This page follows the same structure as the project case study
                  template — document the problem, approach, key decisions, and
                  learnings for this specific build.
                </p>
                <div className="project-highlight-quote">
                  &ldquo;The goal is not to add more features. It is to make the next
                  useful action easier to find.&rdquo;
                </div>
              </section>

              <section className="project-content-section" id="challenge">
                <div className="project-section-kicker">
                  <span>02</span> The challenge
                </div>
                <h2>What needed to be solved?</h2>
                <p>
                  Outline the friction this project addresses and the constraints
                  you worked within. The reasoning matters more than a list of
                  requirements.
                </p>
                <div className="project-challenge-grid">
                  <div className="project-challenge-card">
                    <span className="card-number">A / THE PROBLEM</span>
                    <h3>Too much scattered information</h3>
                    <p>
                      Explain the specific experience that was confusing, slow,
                      repetitive, or unnecessarily difficult.
                    </p>
                  </div>
                  <div className="project-challenge-card">
                    <span className="card-number">B / THE GOAL</span>
                    <h3>A clearer path forward</h3>
                    <p>
                      Describe the outcome you wanted for the user and how you
                      would recognise that the solution worked.
                    </p>
                  </div>
                </div>
              </section>

              <section className="project-content-section" id="approach">
                <div className="project-section-kicker">
                  <span>03</span> Approach
                </div>
                <h2>From an initial idea to a working product.</h2>
                <p>
                  Show your thinking process. Focus on the most important
                  decisions and how they evolved through experimentation.
                </p>
                <div className="project-process-list">
                  <div className="project-process-step">
                    <div className="project-step-index">01</div>
                    <div>
                      <h3>Understand the user and the context</h3>
                      <p>
                        Record the assumptions you started with, the needs you
                        investigated, and what you learned before building.
                      </p>
                    </div>
                  </div>
                  <div className="project-process-step">
                    <div className="project-step-index">02</div>
                    <div>
                      <h3>Map the experience</h3>
                      <p>
                        Explain how you organised the information, designed the
                        main flow, and decided what deserved attention first.
                      </p>
                    </div>
                  </div>
                  <div className="project-process-step">
                    <div className="project-step-index">03</div>
                    <div>
                      <h3>Build, test, and refine</h3>
                      <p>
                        Describe the implementation, the problems you
                        encountered, and what you changed after testing the
                        result.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="project-content-section" id="details">
                <div className="project-section-kicker">
                  <span>04</span> Key decisions
                </div>
                <h2>Small choices shape the whole experience.</h2>
                <p>
                  Highlight a few decisions that reveal your product and
                  engineering judgement. Explain the trade-off, not only the final
                  choice.
                </p>
                <div className="project-feature-board">
                  <div className="project-feature-board-top">
                    <span>Design principles</span>
                    <span>{project.title}</span>
                  </div>
                  <div className="project-feature-row">
                    <span className="project-feature-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 6h16M4 12h10M4 18h13" />
                      </svg>
                    </span>
                    <div>
                      <h3>Clear hierarchy</h3>
                      <p>
                        Show how layout and content priorities help people
                        understand what matters first.
                      </p>
                    </div>
                  </div>
                  <div className="project-feature-row">
                    <span className="project-feature-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 3v18M3 12h18" />
                        <circle cx="12" cy="12" r="8" />
                      </svg>
                    </span>
                    <div>
                      <h3>Intentional interaction</h3>
                      <p>
                        Describe an interaction you simplified, clarified, or
                        made more predictable for users.
                      </p>
                    </div>
                  </div>
                  <div className="project-feature-row">
                    <span className="project-feature-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 5h16v14H4zM8 9h8M8 13h5" />
                      </svg>
                    </span>
                    <div>
                      <h3>Maintainable implementation</h3>
                      <p>
                        Explain how you structured the code or components to make
                        future changes easier.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="project-content-section" id="learnings">
                <div className="project-section-kicker">
                  <span>05</span> Reflection
                </div>
                <h2>What I learned by building it.</h2>
                <p>
                  Write about the parts that were harder than expected, what you
                  would do differently now, and which skills improved through the
                  work.
                </p>
                <div className="project-reflection">
                  <h3>Looking back</h3>
                  <p>
                    Replace this sample reflection with a specific lesson from{" "}
                    {project.title}. Honest trade-offs and concrete learning often
                    tell a stronger story than claiming that every decision was
                    perfect.
                  </p>
                </div>
              </section>
            </article>

            <aside className="project-case-aside" aria-label="Page contents">
              <nav className="project-toc" aria-label="On this page">
                <div className="project-toc-label">On this page</div>
                <a href="#overview">Overview</a>
                <a href="#challenge">The challenge</a>
                <a href="#approach">Approach</a>
                <a href="#details">Key decisions</a>
                <a href="#learnings">Reflection</a>
              </nav>
            </aside>
          </div>

          <Link href={backHref} className="project-next">
            <span>
              <span className="project-next-label">
                Keep exploring · Back to projects
              </span>
              <span className="project-next-title">More things I&apos;ve been building</span>
            </span>
            <span className="project-next-arrow">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </main>
      </div>

      <div className="project-toast" id="project-toast" role="status" aria-live="polite"></div>

      <dialog
        className="project-stack-dialog"
        id="project-stack-overlay"
        aria-labelledby="project-stack-overlay-title"
      >
        <div className="project-stack-dialog-head">
          <h3 id="project-stack-overlay-title">Tools &amp; stack</h3>
          <button
            className="project-stack-dialog-close"
            type="button"
            data-close-project
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="project-tags project-stack-dialog-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
      </dialog>

      <dialog
        className="project-stack-dialog"
        id="project-roles-overlay"
        aria-labelledby="project-roles-overlay-title"
      >
        <div className="project-stack-dialog-head">
          <h3 id="project-roles-overlay-title">My role</h3>
          <button
            className="project-stack-dialog-close"
            type="button"
            data-close-project
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="project-tags project-stack-dialog-tags">
          {roles.map((role) => (
            <span key={role} className="project-tag">
              {role}
            </span>
          ))}
        </div>
      </dialog>

      <ProjectPageScript />
    </div>
  );
}
