document.addEventListener("DOMContentLoaded", () => {
  const rebootBtn = document.getElementById("reboot-btn");
  const overlay = document.getElementById("trivia-overlay");
  const modal = overlay.querySelector(".trivia-modal");
  const closeBtn = overlay.querySelector(".trivia-close");
  const form = document.getElementById("trivia-form");
  const result = document.getElementById("trivia-result");

  const isMobile = () => window.matchMedia("(max-width: 1000px)").matches;

  rebootBtn.addEventListener("click", (evt) => {
    if (isMobile()) {
      evt.preventDefault();
      alert(
        "It is recommended to use the desktop version for a better experience."
      );
      openModal();
    }
  });

  function openModal() {
    overlay.style.display = "flex";
    overlay.setAttribute("aria-hidden", "false");
    modal.focus();
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    overlay.style.display = "none";
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    result.textContent = "";
    result.style.color = "";
    form.reset();
  }

  closeBtn.addEventListener("click", closeModal);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const answers = {
      q1: "Olympus Mons",
      q2: "Viking 1",
      q3: "Lack of a global magnetic field",
    };
    let correct = 0;

    for (const key of Object.keys(answers)) {
      const selected = form.querySelector(`input[name="${key}"]:checked`);
      if (selected && selected.value === answers[key]) correct++;
    }

    if (correct === 3) {
      result.textContent =
        "Correct! You restored the system and recovered the route to Mars!";
      result.style.color = "#00ff7f";
      setTimeout(() => {
        window.location.href =
          "https://adrian-cano-udit.github.io/404s-to-mars/";
      }, 2000);
    } else {
      result.textContent = "You missed at least one question. Try again!";
      result.style.color = "#ff4b2b";
    }
  });
});
