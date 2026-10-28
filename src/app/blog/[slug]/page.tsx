import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogReadingScript } from "@/components/blog-reading-script";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { site } from "@/lib/site";
import "./reading.css";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  if (slugs.length === 0) {
    return [{ slug: "__placeholder__" }];
  }
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

function formatDate(date: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

function initialsOf(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("") || "OF"
  );
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const author = post.author || site.name;
  const initials = initialsOf(author);
  const eyebrow = [post.category, post.group].filter(Boolean);

  return (
    <div className="reading-page" id="top">
      <a className="skip-link" href="#article">
        Skip to article
      </a>

      <main id="article">
        <div className="article-shell">
          {/* BACK BUTTON — points at the blog tab on the home page */}
          <Link className="back-button" href="/home?tab=blog">
            <span aria-hidden="true">←</span> BACK
          </Link>

          <header className="article-header">
            <div className="header-topline">
              {eyebrow.length > 0 ? (
                <p className="category">
                  {eyebrow[0]}
                  {eyebrow.length > 1 && (
                    <>
                      <span aria-hidden="true">·</span>
                      {eyebrow[1]}
                    </>
                  )}
                </p>
              ) : (
                <span aria-hidden="true" />
              )}
              {/* TOC MENU BUTTON — opens the contents overlay; shown ≤760px only (desktop uses the aside) */}
              <button type="button" className="toc-menu-btn" data-open="toc-overlay">
                CONTENTS
              </button>
            </div>
            <h1>{post.title}</h1>
            {post.description && <p className="dek">{post.description}</p>}

            <div className="article-meta">
              <div className="author">
                <div className="author-avatar" aria-hidden="true">
                  {initials}
                </div>
                <div>
                  <span className="meta-label">WRITTEN BY</span>
                  <span className="meta-value">{author}</span>
                </div>
              </div>
              <div className="meta-item">
                <span className="meta-label">PUBLISHED</span>
                <span className="meta-value">{formatDate(post.date)}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">READING TIME</span>
                <span className="meta-value">{post.readingTime}</span>
              </div>
              {/* PROJECT MENTIONED — placeholder; no mention data yet (wire to the CMS mention system later) */}
              <button
                type="button"
                className="meta-item meta-project"
                data-open="project-overlay"
              >
                <span className="meta-label">PROJECT MENTIONED</span>
                <span className="meta-value">Open details ↗</span>
              </button>
              {/* VIEW EDIT LOGS — placeholder; no edit-log data yet (wire to the CMS edit-log system later) */}
              <button
                type="button"
                className="edit-logs-btn"
                data-open="edit-logs-overlay"
              >
                VIEW EDIT LOGS
              </button>
            </div>
          </header>

          {/* READ-POSITION STRIP — visible ≤760px only; sticky "you are here" bar showing the current section. */}
          <button
            type="button"
            className="read-strip"
            id="read-strip"
            data-open="strip-overlay"
          >
            <span className="read-strip-label">NOW READING</span>
            <span className="read-strip-current" id="read-strip-current">
              Introduction
            </span>
            <span className="read-strip-cue" aria-hidden="true">
              ›
            </span>
          </button>

          <div className="article-grid">
            <aside className="article-aside" aria-label="Article details">
              <div className="aside-block">
                <span className="aside-label">IN THIS ARTICLE</span>
                {/* TOC tree is generated from the article headings by JS and rendered here (desktop) */}
                <nav className="toc-tree" id="toc-desktop" aria-label="Table of contents" />
              </div>
              <div className="aside-note">
                <span className="aside-star" aria-hidden="true">
                  ✳
                </span>
                <p>Nothing here for today</p>
              </div>
            </aside>

            <article className="article-body">
              {/* ----- Shared article content (identical for every post) ----- */}
              <p className="opening">
                <span className="dropcap">I</span> want to become good at
                making useful things. That means more than finishing tutorials
                or collecting notes. It means understanding problems, trying
                ideas, learning the tools, and returning to the work often
                enough to improve.
              </p>

              <hr className="section-rule" />

              <section id="why-document" className="article-section">
                <p className="section-index">
                  01 <span>THE REASON</span>
                </p>
                <h2>Why document the process?</h2>
                <p>
                  Results are useful, but they rarely show the full story. A
                  finished interface cannot explain every version that failed,
                  every assumption that changed, or the small discovery that
                  made the next attempt better.
                </p>
                <p>
                  Writing things down creates a trail I can revisit. It helps me
                  see what I understood at the time, what I missed, and how my
                  thinking develops as I gain experience.
                </p>
                <blockquote>
                  <span className="quote-mark" aria-hidden="true">
                    “
                  </span>
                  <p>
                    The point is not to look like I know everything. The point
                    is to get better at finding things out.
                  </p>
                </blockquote>

                <section
                  id="why-document-small"
                  className="article-subsection"
                >
                  <p className="subsection-index">
                    01.1 <span>IN PRACTICE</span>
                  </p>
                  <h3>Keep the notes small</h3>
                  <p>
                    Placeholder: shorter entries are easier to finish and easier
                    to revisit. A note can be one decision, one snippet, or one
                    question worth carrying forward.
                  </p>

                  <section
                    id="why-document-small-rhythm"
                    className="article-subsection"
                  >
                    <p className="subsection-index">
                      01.1.1 <span>RHYTHM</span>
                    </p>
                    <h3>A steady rhythm</h3>
                    <p>
                      Placeholder: regular, imperfect entries beat rare, polished
                      ones. The habit matters more than the entry.
                    </p>
                  </section>
                </section>
              </section>

              <section id="show-the-work" className="article-section">
                <p className="section-index">
                  02 <span>THE PRACTICE</span>
                </p>
                <h2>Show the work, not just the outcome.</h2>
                <p>
                  When I build something, I want to record more than a
                  screenshot. I want to explain the problem I was trying to
                  solve, the choices I made, and what I would change after using
                  or testing the result.
                </p>
                <p>
                  That turns each project into evidence of practice. Each
                  article can connect an idea to an artifact; each artifact can
                  raise a better question for the next attempt.
                </p>
                <div className="note-card embed">
                  <span className="note-card-label">A SIMPLE BUILD LOG</span>
                  <ol>
                    <li>
                      <span>01</span> The problem I noticed
                    </li>
                    <li>
                      <span>02</span> What I tried and why
                    </li>
                    <li>
                      <span>03</span> What happened
                    </li>
                    <li>
                      <span>04</span> What I’ll improve next
                    </li>
                  </ol>
                </div>

                <section
                  id="show-the-work-before"
                  className="article-subsection"
                >
                  <p className="subsection-index">
                    02.1 <span>BEFORE / AFTER</span>
                  </p>
                  <h3>Capture the before</h3>
                  <p>
                    Placeholder: a screenshot of the first attempt is often more
                    useful than one of the final version.
                  </p>
                </section>
              </section>

              <section id="keep-going" className="article-section">
                <p className="section-index">
                  03 <span>THE COMMITMENT</span>
                </p>
                <h2>Keep going, keep revising.</h2>
                <p>
                  This page is a starting point, not a claim that the journey is
                  complete. The record should become more useful as the work
                  becomes more ambitious: better questions, stronger reasoning,
                  more capable tools, and projects that respond to real needs.
                </p>
                <p>
                  I’ll measure progress by what I can explain, make, test, and
                  improve—not simply by how much I have consumed.
                </p>

                <section id="keep-going-revisit" className="article-subsection">
                  <p className="subsection-index">
                    03.1 <span>REVISIT</span>
                  </p>
                  <h3>Revisit old entries</h3>
                  <p>
                    Placeholder: reading back shows how the thinking changed,
                    not just what was produced.
                  </p>
                </section>
              </section>

              <footer className="article-end">
                <div className="end-mark" aria-hidden="true">
                  OF<span>.</span>
                </div>
                <div>
                  <p className="end-title">End of note</p>
                  <p className="end-copy">Nothing to show here</p>
                </div>
                {/* DESKTOP BACK TO TOP — pinned to the right of the article-end strip (mobile uses the FAB) */}
                <a
                  className="article-end-top"
                  href="#top"
                  data-back-to-top
                >
                  BACK TO TOP <span aria-hidden="true">↑</span>
                </a>
              </footer>

              {post.tags.length > 0 && (
                <div className="article-tags" aria-label="Article tags">
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              )}
              {/* ----- End shared article content ----- */}
            </article>
          </div>
        </div>
      </main>

      {/* OVERLAYS — consistent overlay component styles */}
      <dialog
        id="project-overlay"
        className="overlay"
        aria-labelledby="project-overlay-title"
      >
        <div className="overlay-head">
          <p className="overlay-title" id="project-overlay-title">
            Project mentioned
          </p>
          <button type="button" className="overlay-close" aria-label="Close overlay">
            CLOSE ×
          </button>
        </div>
        <p>Placeholder: details about the project mentioned in this article.</p>
      </dialog>

      <dialog
        id="edit-logs-overlay"
        className="overlay"
        aria-labelledby="edit-logs-overlay-title"
      >
        <div className="overlay-head">
          <p className="overlay-title" id="edit-logs-overlay-title">
            Edit logs
          </p>
          <button type="button" className="overlay-close" aria-label="Close overlay">
            CLOSE ×
          </button>
        </div>
        <p>Placeholder: changelog of edits made to this article.</p>
      </dialog>

      {/* TOC PAGE — same JS-built tree as the desktop aside; opened from the header button and the FAB */}
      <dialog
        id="toc-overlay"
        className="overlay toc-page"
        aria-labelledby="toc-overlay-title"
      >
        <div className="overlay-head">
          <p className="overlay-title" id="toc-overlay-title">
            Contents
          </p>
          <button type="button" className="overlay-close" aria-label="Close contents">
            CLOSE ×
          </button>
        </div>
        <nav className="toc-tree" id="toc-overlay-tree" aria-label="Table of contents" />
      </dialog>

      {/* STRIP OVERLAY — soft panel showing the full, untruncated current label */}
      <dialog
        id="strip-overlay"
        className="overlay strip-overlay"
        aria-labelledby="strip-overlay-title"
      >
        <div className="overlay-head">
          <p className="overlay-title" id="strip-overlay-title">
            Now reading
          </p>
          <button type="button" className="overlay-close" aria-label="Close">
            CLOSE ×
          </button>
        </div>
        <p className="strip-overlay-text" id="strip-overlay-text" />
      </dialog>

      {/* FLOATING DOT — shown ≤760px; a small pulsing dot that reveals a glass action box */}
      <div className="fab" id="fab">
        <div className="fab-actions" id="fab-actions">
          <button
            type="button"
            className="fab-action"
            data-fab-action="top"
          >
            <span className="fab-action-icon" aria-hidden="true">
              ↑
            </span>{" "}
            BACK TO TOP
          </button>
          <button type="button" className="fab-action" data-open="toc-overlay">
            <span className="fab-action-icon" aria-hidden="true">
              ☰
            </span>{" "}
            CONTENTS
          </button>
        </div>
        <button
          type="button"
          className="fab-main"
          id="fab-main"
          aria-expanded="false"
          aria-controls="fab-actions"
          aria-label="Page actions"
        >
          <span className="fab-dot" aria-hidden="true" />
        </button>
      </div>

      <BlogReadingScript slug={slug} />
    </div>
  );
}
