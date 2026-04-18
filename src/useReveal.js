import { useEffect } from "react";

export default function useReveal() {
  useEffect(() => {
    const init = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  entry.target.classList.add("visible");
                  entry.target.dataset.revealed = "1";
                  observer.unobserve(entry.target);
                });
              });
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      );

      const observe = (el) => {
        if (el.dataset.revealed) return;
        observer.observe(el);
      };

      document.querySelectorAll(".reveal").forEach(observe);

      const mutation = new MutationObserver(() => {
        document.querySelectorAll(".reveal:not([data-revealed])").forEach(observe);
      });

      mutation.observe(document.body, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
        mutation.disconnect();
      };
    };

    // opacity delayyy
    const timer = setTimeout(init, 300);
    return () => clearTimeout(timer);
  }, []);
}