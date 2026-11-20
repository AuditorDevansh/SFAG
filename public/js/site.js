(function () {
  const { quizUrl, upcomingEvents, volunteers, topics } = window.SAG_CONFIG;

  function escapeHtml(value) {
    return String(value).replace(/[&<>"]/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;"
    })[character]);
  }

  function renderVolunteers() {
    const list = document.getElementById("vols");
    list.innerHTML = volunteers.map((volunteer) => `
      <div class="vol${volunteer[3] ? " lv" : ""}">
        <img src="${volunteer[2]}" alt="${escapeHtml(volunteer[0])}" loading="lazy" decoding="async">
        <h3>${escapeHtml(volunteer[0])}</h3>
        <span class="badge">${escapeHtml(volunteer[1])}</span>
      </div>
    `).join("");
  }

  function renderUpcomingEvents() {
    const list = document.getElementById("upcoming");
    if (!upcomingEvents.length) {
      list.innerHTML = `
        <div class="soon">
          <h3>Next event coming soon</h3>
          <p>No date is announced yet. Check back here, or call 9211627211 to hear about it first.</p>
        </div>`;
      return;
    }

    list.innerHTML = upcomingEvents.map((event) => `
      <div class="soon ev">
        <h3>${escapeHtml(event.title)}</h3>
        <p>${escapeHtml(event.date)}<br>${escapeHtml(event.place)}</p>
        ${event.link ? `<a class="btn" href="${escapeHtml(event.link)}" rel="noopener">Register</a>` : ""}
      </div>
    `).join("");
  }

  function configureQuizLinks() {
    const quizButton = document.getElementById("quizBtn");
    const navigationButton = document.getElementById("navQuiz");
    if (!quizUrl) {
      quizButton.textContent = "Quiz opens soon";
      quizButton.setAttribute("aria-disabled", "true");
      return;
    }

    [quizButton, navigationButton].forEach((link) => {
      link.href = quizUrl;
      if (quizUrl.startsWith("/")) {
        link.removeAttribute("target");
        link.removeAttribute("rel");
      } else {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    });
  }

  function initializeThemeToggle() {
    const root = document.documentElement;
    const toggle = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");
    const systemDark = matchMedia("(prefers-color-scheme: dark)");
    const isDark = root.dataset.theme === "dark" ||
      (root.dataset.theme !== "light" && systemDark.matches);

    function updateControl(dark) {
      toggle.setAttribute("aria-pressed", String(dark));
      toggle.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} theme`);
      icon.textContent = dark ? "☀" : "☾";
    }

    updateControl(isDark);
    toggle.addEventListener("click", () => {
      const currentDark = root.dataset.theme
        ? root.dataset.theme === "dark"
        : systemDark.matches;
      root.dataset.theme = currentDark ? "light" : "dark";
      updateControl(!currentDark);
    });
  }

  function initializeMobileNavigation() {
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");

    function closeMenu() {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
    }

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      links.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", `${open ? "Close" : "Open"} navigation menu`);
    });
    links.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        toggle.focus();
      }
    });
  }

  function initializeTopics() {
    const buttons = document.getElementById("topics");
    const description = document.getElementById("tdesc");

    Object.entries(topics).forEach(([name, text], index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = name;
      button.setAttribute("aria-pressed", "false");

      function selectTopic() {
        buttons.querySelectorAll("button").forEach((topicButton) => {
          topicButton.setAttribute("aria-pressed", String(topicButton === button));
        });
        description.textContent = text;
      }

      button.addEventListener("click", selectTopic);
      button.addEventListener("mouseenter", selectTopic);
      button.addEventListener("focus", selectTopic);
      buttons.appendChild(button);
      if (index === 0) selectTopic();
    });
  }

  function initializeScrollAnimations() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("rv-on");
    const elements = document.querySelectorAll(
      "section:not(.hero) h2,.pills,.leadcard,.vols,.past,.studio,.quiz,.soon"
    );
    elements.forEach((element) => element.classList.add("rv"));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    elements.forEach((element) => observer.observe(element));
  }

  renderVolunteers();
  renderUpcomingEvents();
  configureQuizLinks();
  initializeThemeToggle();
  initializeMobileNavigation();
  initializeTopics();
  initializeScrollAnimations();

  const dropZone = document.getElementById("dz");
  ["dragenter", "dragover"].forEach((eventName) => {
    dropZone.addEventListener(eventName, () => dropZone.classList.add("over"));
  });
  ["dragleave", "drop"].forEach((eventName) => {
    dropZone.addEventListener(eventName, () => dropZone.classList.remove("over"));
  });
})();
