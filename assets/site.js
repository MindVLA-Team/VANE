(function () {
  "use strict";

  var copyButton = document.querySelector("[data-copy]");
  if (copyButton && navigator.clipboard) {
    copyButton.addEventListener("click", function () {
      var target = document.querySelector(copyButton.getAttribute("data-copy"));
      if (!target) return;

      navigator.clipboard.writeText(target.textContent).then(function () {
        var previousLabel = copyButton.textContent;
        copyButton.textContent = "Copied";
        window.setTimeout(function () {
          copyButton.textContent = previousLabel;
        }, 1600);
      });
    });
  }

  if ("IntersectionObserver" in window) {
    var navigationLinks = Array.from(document.querySelectorAll(".nav-links a"));
    var sections = navigationLinks
      .map(function (link) {
        return document.querySelector(link.getAttribute("href"));
      })
      .filter(Boolean);

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navigationLinks.forEach(function (link) {
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-35% 0px -58% 0px" });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }
})();
