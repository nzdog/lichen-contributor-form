(function() {
  const form = document.getElementById('transitionForm');
  const saveButton = document.getElementById('saveButton');
  const confirmModal = document.getElementById('confirmModal');
  const confirmSubmit = document.getElementById('confirmSubmit');
  const cancelSubmit = document.getElementById('cancelSubmit');

  function getFormData() {
    return {
      stable: form.stable.value,
      shifting: form.shifting.value,
      signals: form.signals.value,
      patterns: form.patterns.value,
      support: form.support.value,
      notYet: form.notYet.value,
      rhythm: form.rhythm.value
    };
  }

  function populateForm(data) {
    if (!data) return;
    form.stable.value = data.stable || '';
    form.shifting.value = data.shifting || '';
    form.signals.value = data.signals || '';
    form.patterns.value = data.patterns || '';
    form.support.value = data.support || '';
    form.notYet.value = data.notYet || '';
    form.rhythm.value = data.rhythm || '';
  }

  // Load saved data on startup
  const saved = localStorage.getItem('transitionFormData');
  if (saved) {
    try {
      populateForm(JSON.parse(saved));
    } catch (e) {
      console.error('Failed to parse saved data:', e);
    }
  }

  function submitToNetlify(data) {
    return fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(data).toString(),
      mode: 'no-cors'
    });
  }

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    confirmModal.classList.remove('hidden');
  });

  cancelSubmit.addEventListener('click', function() {
    confirmModal.classList.add('hidden');
  });

  confirmSubmit.addEventListener('click', function() {
    confirmModal.classList.add('hidden');
    const data = getFormData();
    data['form-name'] = 'transitionForm';
    submitToNetlify(data)
      .then(function() {
        alert('Done!');
        form.reset();
        localStorage.removeItem('transitionFormData');
      })
      .catch(function(err) {
        console.error('Submission failed:', err);
      });
  });

  saveButton.addEventListener('click', function() {
    const data = getFormData();
    localStorage.setItem('transitionFormData', JSON.stringify(data));
    alert('Form saved to local storage.');
  });
})();
