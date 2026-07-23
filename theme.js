/* Shared by every page. Loaded with `defer`, so the DOM is ready.
   The no-flash snippet that reads localStorage stays inline in each <head> —
   it has to run before first paint, which an external file cannot guarantee. */
(function () {
  var root = document.documentElement,
    mq = matchMedia("(prefers-color-scheme: dark)"),
    btn = document.getElementById("theme");

  function current() {
    return root.dataset.theme || (mq.matches ? "dark" : "light");
  }

  function sync() {
    if (!btn) return;
    var next = current() === "dark" ? "light" : "dark";
    btn.setAttribute("aria-label", "Switch to " + next + " theme");
    /* drives the CSS tooltip in style.css */
    btn.setAttribute("data-label", next === "dark" ? "Dark mode" : "Light mode");
  }

  if (btn) {
    btn.addEventListener("click", function () {
      var sys = mq.matches ? "dark" : "light",
        next = current() === "dark" ? "light" : "dark";

      /* Toggling back to whatever the system already prefers drops the
         override entirely, so the page resumes following the OS rather than
         staying pinned to a value that merely matches it today. */
      if (next === sys) {
        delete root.dataset.theme;
      } else {
        root.dataset.theme = next;
      }
      try {
        if (next === sys) localStorage.removeItem("theme");
        else localStorage.setItem("theme", next);
      } catch (e) {}
      sync();
    });

    mq.addEventListener("change", sync);
    sync();
  }

  /* Keep the footer's end year current. The markup already carries a literal
     year as the no-JS fallback, so this is a no-op until the calendar moves. */
  var y = document.getElementById("year"),
    now = String(new Date().getFullYear());
  if (y && y.textContent !== now) y.textContent = now;
})();
