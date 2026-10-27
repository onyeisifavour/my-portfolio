"use client";

import { useEffect } from "react";

export function ProjectPageScript() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const on = (
      target: EventTarget,
      type: string,
      handler: EventListenerOrEventListenerObject,
    ) => {
      target.addEventListener(type, handler);
      cleanups.push(() => target.removeEventListener(type, handler));
    };

    const toast = document.getElementById("project-toast");
    let toastTimer: ReturnType<typeof setTimeout> | undefined;

    const showToast = (message: string) => {
      if (!toast) return;
      toast.textContent = message;
      toast.classList.add("visible");
      if (toastTimer) window.clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("visible"), 3100);
    };

    document.querySelectorAll(".project-placeholder-link").forEach((link) => {
      on(link, "click", (event) => {
        event.preventDefault();
        const el = link as HTMLElement;
        showToast(
          el.dataset.message || "Replace this placeholder with your project link.",
        );
      });
    });

    const metaStack = document.querySelector(".project-meta-stack");
    if (metaStack) {
      const stackTags = metaStack.querySelector(".project-meta-stack-tags") as HTMLElement | null;
      const stackMore = metaStack.querySelector(".project-meta-more") as HTMLElement | null;
      if (stackTags && stackMore) {
        const updateStack = () => {
          const visibleBottom = stackTags.clientHeight;
          let hidden = 0;
          Array.from(stackTags.children).forEach((tag) => {
            const el = tag as HTMLElement;
            if (el.offsetTop + el.offsetHeight > visibleBottom + 1) hidden += 1;
          });
          stackMore.textContent = hidden ? `+${hidden} more` : "";
        };
        updateStack();
        on(window, "resize", updateStack);
      }
    }

    const metaRoles = document.querySelector(".project-meta-roles");
    if (metaRoles) {
      const roleMore = metaRoles.querySelector(".project-meta-more") as HTMLElement | null;
      const roles = metaRoles.querySelectorAll(".role");
      if (roleMore) {
        const hiddenRoles = roles.length - 3;
        roleMore.textContent = hiddenRoles > 0 ? `+${hiddenRoles} more` : "";
      }
    }

    document.querySelectorAll("[data-open-project]").forEach((trigger) => {
      on(trigger, "click", () => {
        const id = (trigger as HTMLElement).dataset.openProject;
        if (!id) return;
        const dialog = document.getElementById(id) as HTMLDialogElement | null;
        if (dialog && typeof dialog.showModal === "function") {
          dialog.showModal();
        }
      });
    });

    document.querySelectorAll(".project-stack-dialog").forEach((dialog) => {
      dialog.querySelectorAll("[data-close-project]").forEach((button) => {
        on(button, "click", () => (dialog as HTMLDialogElement).close());
      });
      on(dialog, "click", (event) => {
        if (event.target === dialog) (dialog as HTMLDialogElement).close();
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
