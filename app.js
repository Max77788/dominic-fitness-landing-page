const images = [
  'display_images/66ec718ccfb7f307e573303c.png',
  'display_images/Gpe1Q8GXAAAmDDr.png',
  'display_images/man-before-after-weight-loss-260.png',
  'display_images/Screen-Shot-2017-08-17-at-15.13.png',
  'display_images/542605445_18136929922433418_2277.png'
];

const steps = [
  {
    title: "Let's Get Started with your fitness journey!",
    label: 'What is your name?',
    name: 'name',
    type: 'text',
    image: images[0],
    placeholder: 'Your full name ...',
    required: true,
  },
  {
    title: "Contact Info",
    label: 'Your email address',
    name: 'email',
    type: 'email',
    image: images[1],
    placeholder: 'example@email.com',
    required: true,
  },
  {
    title: "Main Fitness Goal",
    label: 'What is your main goal?',
    name: 'goal',
    type: 'textarea',
    image: images[2],
    placeholder: 'Lose weight, build muscle, get healthy...',
    required: true,
  },
  {
    title: "Timeline",
    label: 'When do you want to start?',
    name: 'startTime',
    type: 'select',
    options: [
      { value: '', label: '-- Select --' },
      { value: 'immediately', label: 'Immediately' },
      { value: 'in7days', label: 'In 7 days' },
      { value: 'later', label: 'Later' }
    ],
    image: images[3],
    required: true,
  },
  {
    title: 'Discount Code (optional)',
    label: 'Enter discount code if you have one:',
    name: 'discount',
    type: 'discount',
    placeholder: 'Enter code here (optional)',
    required: false,
  },
  {
    title: "You're Done!",
    label: '',
    type: 'completed',
    image: images[4], // or rotate image
  },
];

const webhookUrl = 'https://mom-ai-tech-n8n-939af7dfbda3.herokuapp.com/webhook/new-dominics-client'; // Placeholder

function showStep(stepIdx, formData, progress) {
  const step = steps[stepIdx];
  const root = document.getElementById('root');

  root.innerHTML = '';

  const formDiv = document.createElement('div');
  formDiv.className = 'form-container';

  const progressBar = document.createElement('div');
  progressBar.className = 'progress';
  const barFill = document.createElement('div');
  barFill.className = 'progress-bar';
  barFill.style.width = `${progress}%`;
  progressBar.appendChild(barFill);

  formDiv.appendChild(progressBar);

  if (stepIdx === 0) {
    const h2 = document.createElement('h2');
    h2.textContent = '"Shred in Six" Program';
    h2.style.textAlign = 'center';
    h2.style.fontWeight = '800';
    h2.style.fontSize = '2.0rem';
    h2.style.margin = '0 0 1rem 0';
    h2.style.letterSpacing = '0.01em';
    h2.style.color = '#1a1a1a';
    formDiv.appendChild(h2);
  }

  if (step.image) {
    const img = document.createElement('img');
    img.className = 'hero-image';
    img.src = step.image;
    img.alt = '';
    img.style.background = '#fff';
    img.style.objectFit = 'contain';
    img.style.height = '220px';
    img.style.width = '100%';
    img.style.display = 'block';
    img.style.borderRadius = '22px 22px 8px 8px';
    img.style.marginBottom = '1.5rem';
    formDiv.appendChild(img);
  }

  if (step.title) {
    const h1 = document.createElement('h1');
    h1.textContent = step.title;
    formDiv.appendChild(h1);
  }

  if (step.type === 'completed') {
    const p = document.createElement('p');
    p.style.textAlign = 'center';
    p.style.fontSize = '1.18rem';
    p.textContent = "Thank you for applying! Dominic or his team will contact you during the next 3 days.";
    formDiv.appendChild(p);
    root.appendChild(formDiv);
    return;
  }

  if (step.label) {
    const label = document.createElement('label');
    label.htmlFor = step.name;
    label.textContent = step.label;
    formDiv.appendChild(label);
  }

  let input;
  let iconContainer;
  if (step.type === 'discount') {
    const wrapper = document.createElement('div');
    wrapper.className = 'discount-wrapper';

    input = document.createElement('input');
    input.type = 'text';
    input.id = step.name;
    input.name = step.name;
    input.autocomplete = 'off';
    input.value = formData[step.name] || '';
    input.placeholder = step.placeholder || '';
    input.autofocus = true;

    // Animated checkmark
    const checkSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    checkSvg.setAttribute('width', '28');
    checkSvg.setAttribute('height', '28');
    checkSvg.innerHTML = '<circle cx="14" cy="14" r="13" fill="none" stroke="#20c933" stroke-width="3"/><polyline points="8,15 13,21 21,9" fill="none" stroke="#20c933" stroke-width="3.1" stroke-linecap="round" stroke-linejoin="round"/>';
    // Append and bind
    wrapper.appendChild(input);
    wrapper.appendChild(checkSvg);
    formDiv.appendChild(wrapper);

    // Always check, even on page entry
    function updateCheck() {
      const value = input.value.trim();
      if (value.length > 0 && value.toLowerCase() === 'shreddie') {
        checkSvg.classList.add('visible');
      } else {
        checkSvg.classList.remove('visible');
      }
    }
    input.addEventListener('input', updateCheck);
    // On render
    setTimeout(() => {
      input.focus();
      updateCheck();
    }, 120);
  } else if (step.type === 'text') {
    input = document.createElement('input');
    input.type = step.type;
    input.id = step.name;
    input.name = step.name;
    input.autocomplete = 'off';
    input.value = formData[step.name] || '';
    input.placeholder = step.placeholder || '';
    input.required = step.required === true;
    input.autofocus = true;
    setTimeout(() => input.focus(), 120);
    formDiv.appendChild(input);
  } else if (step.type === 'email') {
    input = document.createElement('input');
    input.type = step.type;
    input.id = step.name;
    input.name = step.name;
    input.autocomplete = 'off';
    input.value = formData[step.name] || '';
    input.placeholder = step.placeholder || '';
    input.required = step.required === true;
    input.autofocus = true;
    setTimeout(() => input.focus(), 120);
    formDiv.appendChild(input);
    // --- Instagram handle field ---
    const igInput = document.createElement('input');
    igInput.type = 'text';
    igInput.id = 'instagram';
    igInput.name = 'instagram';
    igInput.placeholder = 'Instagram handle (optional)';
    igInput.value = formData.instagram || '';
    igInput.style.marginBottom = '1.35rem';
    formDiv.appendChild(igInput);
  } else if (step.type === 'textarea') {
    input = document.createElement('textarea');
    input.id = step.name;
    input.name = step.name;
    input.value = formData[step.name] || '';
    input.placeholder = step.placeholder || '';
    input.rows = 4;
    input.required = step.required === true;
    input.autofocus = true;
    setTimeout(() => input.focus(), 120);
    formDiv.appendChild(input);
  } else if (step.type === 'select') {
    input = document.createElement('select');
    input.id = step.name;
    input.name = step.name;
    input.required = step.required === true;
    step.options.forEach(opt => {
      const o = document.createElement('option');
      o.value = opt.value;
      o.textContent = opt.label;
      if ((formData && formData[step.name] === opt.value)) o.selected = true;
      input.appendChild(o);
    });
    setTimeout(() => input.focus(), 120);
    formDiv.appendChild(input);
  }

  // Error/success message
  const msgDiv = document.createElement('div');
  msgDiv.id = 'message';
  msgDiv.style.minHeight = '22px';
  formDiv.appendChild(msgDiv);

  // Button group
  const isDiscountStep = step.type === 'discount';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = stepIdx === steps.length - 2 ? 'Submit' : 'Next';
  btn.onclick = () => {
    let value;
    if (step.type === 'discount') value = input.value.trim();
    else if (step.type === 'text' || step.type === 'email') value = input.value.trim();
    else if (step.type === 'textarea') value = input.value.trim();
    else if (step.type === 'select') value = input.value;
    // Validation
    if (step.type === 'email' && (!value || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value))) {
      msgDiv.textContent = 'Please enter a valid email address.';
      input.focus();
      return;
    }
    // Discount validation
    if (step.type === 'discount') {
      if (value && value.toLowerCase() !== 'shreddie') {
        msgDiv.textContent = 'Discount code is invalid.';
        input.focus();
        return;
      }
      formData[step.name] = value;
      // Submit with discount
      submitForm(formData, () => {
        transition(() => showStep(stepIdx + 1, formData, 100));
      });
      return;
    }
    // Other fields
    if (step.required && !value) {
      msgDiv.textContent = 'This field is required.';
      input.focus();
      return;
    }
    formData[step.name] = value;
    transition(() => showStep(stepIdx + 1, formData, ((stepIdx + 2) / (steps.length - 1)) * 100));
  };
  formDiv.appendChild(btn);
  transition(() => {
    root.appendChild(formDiv);
  });
}

function transition(cb) {
  const root = document.getElementById('root');
  const prev = root.firstChild;
  if (prev) {
    prev.style.opacity = '1';
    prev.style.transition = 'opacity 0.4s cubic-bezier(0.4,0,0.2,1)';
    prev.style.opacity = '0';
    setTimeout(() => {
      if (prev.parentNode === root) root.removeChild(prev);
      cb();
    }, 400);
  } else {
    cb();
  }
}

function submitForm(data, cb) {
  const btn = document.querySelector('button');
  btn.disabled = true;
  btn.textContent = 'Sending...';
  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, discount: data.discount || '', instagram: data.instagram || '' }),
  })
    .then(() => { btn.disabled = false; cb(); })
    .catch(() => { btn.disabled = false; cb(); });
}

// Start
showStep(0, {}, 0);
