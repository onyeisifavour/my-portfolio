"use client";

import { useEffect } from "react";

/*
 * Client runtime for the blog reading page.
 * Ported 1:1 from rough-drafts/blog-reading-page/script.js — overlays, the generated
 * table of contents (desktop aside + mobile contents page), scroll spy, read-strip and
 * the floating dot. Runs after hydration so it can read the server-rendered article DOM,
 * and cleans up every listener when the slug changes.
 */

type TocNode = {
  el: HTMLElement;
  id: string;
  num: string;
  label: string;
  title: string;
  crumb: string;
  children: TocNode[];
};

export function BlogReadingScript({ slug }: { slug: string }) {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const on = (
      target: EventTarget,
      type: string,
      handler: EventListenerOrEventListenerObject,
      options?: AddEventListenerOptions | boolean,
    ) => {
      target.addEventListener(type, handler, options);
      cleanups.push(() => target.removeEventListener(type, handler, options));
    };

    /* -------------------------------------------------------------------------
       SITE HEADER HEIGHT — seat the mobile read-strip (and anchored sections)
       directly below the sticky site header, whatever its real height is.
       ------------------------------------------------------------------------- */
    const siteHeader = document.querySelector(".site-header");
    const syncHeaderHeight = () => {
      if (!siteHeader) return;
      const h = Math.round(siteHeader.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--site-header-h", `${h}px`);
    };
    syncHeaderHeight();
    on(window, "resize", syncHeaderHeight);

    /* -------------------------------------------------------------------------
       OVERLAYS — one open helper + wiring for every .overlay dialog
       ------------------------------------------------------------------------- */
    const openOverlay = (id: string | null) => {
      if (!id) return;
      const dialog = document.getElementById(id) as HTMLDialogElement | null;
      if (dialog && typeof dialog.showModal === "function") {
        dialog.showModal();
        /* Lock background scroll while any dialog is open (full-screen contents page). */
        document.body.classList.add("has-overlay");
      }
    };

    /* Any [data-open="dialog-id"] button opens that dialog. Opening from the FAB
       also collapses the FAB cluster. */
    document.querySelectorAll("[data-open]").forEach((btn) => {
      on(btn, "click", () => {
        openOverlay(btn.getAttribute("data-open"));
        const fab = document.getElementById("fab");
        if (fab) fab.classList.remove("is-open");
      });
    });

    document.querySelectorAll(".reading-page .overlay").forEach((dialog) => {
      const close = dialog.querySelector(".overlay-close");
      if (close) on(close, "click", () => (dialog as HTMLDialogElement).close());

      /* Close only via the close button, Esc (native), or a triple-click on empty space.
         A manual counter is used instead of event.detail: click counts are unreliable for
         slower triple-clicks and for touch taps, and empty space can be the dialog itself
         or any non-interactive child (e.g. the .toc-tree padding). */
      let emptyClicks = 0;
      let emptyTimer: ReturnType<typeof setTimeout> | null = null;
      on(dialog, "click", (event) => {
        const e = event as MouseEvent;
        if ((e.target as Element).closest("button, a, input, select, textarea")) return;
        emptyClicks += 1;
        clearTimeout(emptyTimer ?? undefined);
        if (emptyClicks >= 3) {
          emptyClicks = 0;
          (dialog as HTMLDialogElement).close();
          return;
        }
        emptyTimer = setTimeout(() => {
          emptyClicks = 0;
        }, 800);
      });

      /* Release the scroll lock once the last dialog closes. */
      on(dialog, "close", () => {
        if (!document.querySelector("dialog[open]"))
          document.body.classList.remove("has-overlay");
      });
    });

    /* -------------------------------------------------------------------------
       TOC TREE — one builder, rendered into the desktop aside AND the overlay page
       ------------------------------------------------------------------------- */
    /* 1. Read the article's heading hierarchy (.article-section / .article-subsection)
          into a plain data tree: { el, id, num, label, children, parent }. */
    const readNode = (el: HTMLElement): TocNode => {
      const idx = el.querySelector(
        ":scope > .section-index, :scope > .subsection-index",
      );
      const head = el.querySelector(":scope > h2, :scope > h3");
      const num = idx ? (idx.textContent ?? "").trim().split(/\s+/)[0] : "";
      const label = head ? (head.textContent ?? "").trim() : "";
      const node: TocNode = {
        el,
        id: el.id,
        num,
        label,
        title: "",
        crumb: "",
        children: [],
      };
      Array.from(el.children).forEach((child) => {
        if (
          child.classList.contains("article-section") ||
          child.classList.contains("article-subsection")
        ) {
          node.children.push(readNode(child as HTMLElement));
        }
      });
      node.title = (num ? num + " · " : "") + label;
      return node;
    };

    const tocTree: TocNode[] = [];
    const bodyEl = document.querySelector(".reading-page .article-body");
    if (bodyEl) {
      Array.from(bodyEl.children).forEach((child) => {
        if (child.classList.contains("article-section"))
          tocTree.push(readNode(child as HTMLElement));
      });
    }

    /* 2. Give each node a breadcrumb ("01 · Section › Subsection") for the strip. */
    const crumb = (nodes: TocNode[], prefix: string) => {
      nodes.forEach((n) => {
        n.crumb = prefix ? prefix + " › " + n.label : n.title;
        crumb(n.children, n.crumb);
      });
    };
    crumb(tocTree, "");

    /* 3. Render the data tree to <ul>/<li> markup. A node with children gets a
          clickable dot (→ downward caret when open); leaves get a plain dot. */
    const renderTree = (nodes: TocNode[], uid: string): HTMLUListElement => {
      const ul = document.createElement("ul");
      ul.className = "toc-children";
      nodes.forEach((n) => {
        const li = document.createElement("li");
        li.className = "toc-item";

        const row = document.createElement("div");
        row.className = "toc-row";

        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "toc-toggle";
        if (n.children.length) {
          toggle.setAttribute("aria-expanded", "false");
          toggle.setAttribute("aria-controls", "toc-kids-" + uid + "-" + n.id);
          toggle.setAttribute("aria-label", "Toggle subsections of " + n.label);
          toggle.innerHTML =
            '<span class="toc-dot" aria-hidden="true"></span><span class="toc-caret" aria-hidden="true"></span>';
        } else {
          toggle.classList.add("is-leaf");
          toggle.tabIndex = -1;
          toggle.setAttribute("aria-hidden", "true");
          toggle.innerHTML = '<span class="toc-dot is-leaf" aria-hidden="true"></span>';
        }
        row.appendChild(toggle);

        const link = document.createElement("a");
        link.className = "toc-link";
        link.href = "#" + n.id;
        link.innerHTML = '<span class="toc-num"></span><span class="toc-title"></span>';
        (link.querySelector(".toc-num") as HTMLElement).textContent = n.num;
        (link.querySelector(".toc-title") as HTMLElement).textContent = n.label;
        row.appendChild(link);

        li.appendChild(row);

        if (n.children.length) {
          const kids = renderTree(n.children, uid);
          kids.id = "toc-kids-" + uid + "-" + n.id;
          kids.hidden = true;
          li.appendChild(kids);
        }
        ul.appendChild(li);
      });
      return ul;
    };

    /* 4. Render into both containers (each tree gets a unique id prefix so aria-controls
          targets stay unique; JS toggling itself uses relative lookups, not the ids). */
    ["toc-desktop", "toc-overlay-tree"].forEach((id, i) => {
      const host = document.getElementById(id);
      if (!host) return;
      host.innerHTML = "";
      const root = renderTree(tocTree, "t" + i);
      root.classList.add("toc-root");
      host.appendChild(root);
    });

    /* 5. Expand/collapse a single branch. Looked up relative to the clicked toggle so
          duplicate ids across the two trees can never target the wrong list. */
    const toggleBranch = (toggle: Element) => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      const item = toggle.closest(".toc-item");
      const kids = item ? (item.querySelector(":scope > .toc-children") as HTMLElement | null) : null;
      if (kids) kids.hidden = open;
    };

    /* Close a dialog and lift the scroll lock immediately (the scroll lock is cleared
       asynchronously on the dialog's 'close' event, which would otherwise block the
       smooth scroll that follows a navigation tap). */
    const closeAndUnlock = (dialog: Element | null) => {
      const d = dialog as HTMLDialogElement | null;
      if (d && d.open) d.close();
      document.body.classList.remove("has-overlay");
    };

    const navigateTo = (hash: string | null) => {
      const target = hash ? document.querySelector(hash) : null;
      if (!target) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() =>
        (target as HTMLElement).scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "start",
        }),
      );
    };

    /* 6. Delegated interaction.
          - Desktop aside: dot toggles a branch; text navigates.
          - Mobile contents page: one click/tap on text OR dot expands/collapses;
            two clicks/taps in quick succession navigate to the section. Leaf links always navigate.
          A manual timer (not the native dblclick event) detects the second click so the
          behavior also works for touch taps and slower double-clicks. */
    let tocNavTimer: ReturnType<typeof setTimeout> | null = null;
    on(document, "click", (event) => {
      const e = event as MouseEvent;
      const target = e.target as Element;

      const toggle = target.closest(".toc-toggle");
      if (toggle && !toggle.classList.contains("is-leaf")) {
        toggleBranch(toggle);
        return;
      }
      const link = target.closest(".toc-link");
      if (!link) return;

      const item = link.closest(".toc-item");
      const hasKids = Boolean(item && item.querySelector(":scope > .toc-children"));
      const inContentsPage = Boolean(link.closest(".toc-page"));
      const dialog = link.closest("dialog");

      if (!inContentsPage || !hasKids) {
        /* Desktop aside, or a leaf: a single click navigates. */
        closeAndUnlock(dialog);
        return;
      }

      e.preventDefault();
      if (tocNavTimer) {
        /* Second click within the window -> navigate. */
        clearTimeout(tocNavTimer);
        tocNavTimer = null;
        closeAndUnlock(dialog);
        navigateTo(link.getAttribute("href"));
        return;
      }
      /* First click -> expand/collapse if no second click follows. */
      tocNavTimer = setTimeout(() => {
        tocNavTimer = null;
        const t = item ? item.querySelector(":scope > .toc-row > .toc-toggle") : null;
        if (t) toggleBranch(t);
      }, 260);
    });

    /* -------------------------------------------------------------------------
       SCROLL SPY — drives the mobile read-strip, the strip overlay, and TOC highlight.
         1. Landmarks = the intro + every section/subsection, each with a breadcrumb.
         2. READING LINE = the strip's underside on mobile, a fixed 96px on desktop.
         3. CURRENT = the LAST landmark whose top is above the line.
         4. The strip text paints only ≤760px; the TOC .is-active highlight runs always.
       ------------------------------------------------------------------------- */
    const strip = document.getElementById("read-strip");
    if (strip) {
      const out = document.getElementById("read-strip-current");
      const stripText = document.getElementById("strip-overlay-text");
      const header = document.querySelector(".reading-page .article-header");
      const mq = window.matchMedia("(max-width: 760px)");

      const landmarks: Array<{
        el: HTMLElement;
        crumb: string;
        id: string;
        ancestors: string[];
      }> = [];
      if (bodyEl) landmarks.push({ el: bodyEl as HTMLElement, crumb: "Introduction", id: "", ancestors: [] });
      const flatten = (nodes: TocNode[], ancestors: string[]) => {
        nodes.forEach((n) => {
          landmarks.push({ el: n.el, crumb: n.crumb, id: n.id, ancestors });
          flatten(n.children, ancestors.concat(n.id));
        });
      };
      flatten(tocTree, []);

      const update = () => {
        const stuck = mq.matches && header ? header.getBoundingClientRect().bottom <= 0 : false;
        if (mq.matches) strip.classList.toggle("is-visible", stuck);

        const line = stuck ? strip.getBoundingClientRect().bottom : 96;
        let active = landmarks[0];
        landmarks.forEach((l) => {
          if (l.el.getBoundingClientRect().top <= line) active = l;
        });

        if (mq.matches && out && out.textContent !== active.crumb) out.textContent = active.crumb;

        /* Highlight the current node AND its ancestor sections (parent stays active
           while reading a subsection). Only classes change — branches never auto-expand. */
        const activeIds = new Set<string>();
        if (active.id) {
          activeIds.add(active.id);
          active.ancestors.forEach((id) => activeIds.add(id));
        }
        document.querySelectorAll(".reading-page .toc-link").forEach((a) => {
          a.classList.toggle("is-active", activeIds.has((a.getAttribute("href") ?? "").slice(1)));
        });
      };

      /* The strip opens the soft overlay; fill it with the FULL untruncated label. */
      on(strip, "click", () => {
        if (stripText && out) stripText.textContent = out.textContent;
      });

      on(window, "scroll", update, { passive: true });
      on(window, "resize", update);
      on(mq, "change", update);
      update();
    }

    /* -------------------------------------------------------------------------
       FLOATING DOT (≤760px) — reveals back-to-top + contents
       ------------------------------------------------------------------------- */
    const fab = document.getElementById("fab");
    const main = document.getElementById("fab-main");
    if (fab && main) {
      on(main, "click", () => {
        const open = fab.classList.toggle("is-open");
        main.setAttribute("aria-expanded", open ? "true" : "false");
      });

      const top = fab.querySelector('[data-fab-action="top"]');
      if (top) {
        on(top, "click", () => {
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
          fab.classList.remove("is-open");
          main.setAttribute("aria-expanded", "false");
        });
      }
    }

    /* DESKTOP BACK TO TOP — smooth-scroll the article-end link (href="#top" is the no-JS fallback). */
    document.querySelectorAll("[data-back-to-top]").forEach((el) => {
      on(el, "click", (event) => {
        event.preventDefault();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
      document.body.classList.remove("has-overlay");
    };
  }, [slug]);

  return null;
}
