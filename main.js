document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("lichenForm");

  // === Submit handler ===
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const confirmSubmit = confirm("Are you sure you want to submit your reflection?");
    if (!confirmSubmit) return;

    const formData = collectFormData(form);
    localStorage.setItem("lichenReflection", JSON.stringify(formData));
    localStorage.removeItem("lichenReflectionDraft"); // clear saved draft
    form.reset(); // clear the form inputs

    console.log("Submitted reflection:", formData);
    alert("Form submitted.");
  });

  // === Save for Later handler ===
  const saveButton = document.getElementById("saveButton");
  if (saveButton) {
    saveButton.addEventListener("click", () => {
      const formData = collectFormData(form);
      localStorage.setItem("lichenReflectionDraft", JSON.stringify(formData));
      console.log("Draft saved:", formData);
      alert("Reflection saved for later.");
    });
  }

  // === Auto-load saved draft on page load ===
  const savedDraft = localStorage.getItem("lichenReflectionDraft");
  if (savedDraft) {
    const data = JSON.parse(savedDraft);
    Object.keys(data).forEach((key) => {
      const el = form.elements.namedItem(key);
      if (el) el.value = data[key];
    });
  }
});

// === Helper function to collect form data ===
function collectFormData(form) {
  const data = {};
  const elements = form.elements;

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    if (el.tagName === "TEXTAREA" || el.tagName === "INPUT") {
      data[el.name] = el.value.trim();
    }
  }

  return data;
}
