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
    title: "You're Done!",
    label: '',
    type: 'completed',
    image: images[4],
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
    p.textContent = "Thank you for applying! We'll contact you soon.";
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
  if (step.type === 'text' || step.type === 'email') {
    input = document.createElement('input');
    input.type = step.type;
    input.id = step.name;
    input.name = step.name;
    input.autocomplete = 'off';
    input.value = formData[step.name] || '';
    input.placeholder = step.placeholder || '';
    input.required = step.required === true;
    input.autofocus = true;
  } else if (step.type === 'textarea') {
    input = document.createElement('textarea');
    input.id = step.name;
    input.name = step.name;
    input.value = formData[step.name] || '';
    input.placeholder = step.placeholder || '';
    input.rows = 4;
    input.required = step.required === true;
    input.autofocus = true;
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
  }

  if (input) {
    formDiv.appendChild(input);
    setTimeout(() => input.focus(), 150);
  }

  // Error/success message
  const msgDiv = document.createElement('div');
  msgDiv.id = 'message';
  msgDiv.style.minHeight = '22px';
  formDiv.appendChild(msgDiv);

  // Button group
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = stepIdx === steps.length - 2 ? 'Submit' : 'Next';
  btn.onclick = () => {
    let value;
    if (step.type === 'text' || step.type === 'email') value = input.value.trim();
    else if (step.type === 'textarea') value = input.value.trim();
    else if (step.type === 'select') value = input.value;
    // Validation
    if (step.required && (!value || (step.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)))) {
      msgDiv.textContent = step.type === 'email' ? 'Please enter a valid email address.' : 'This field is required.';
      input.focus();
      return;
    }
    formData[step.name] = value;
    if (stepIdx < steps.length - 2) {
      transition(() => showStep(stepIdx + 1, formData, ((stepIdx + 2) / (steps.length - 1)) * 100));
    } else {
      submitForm(formData, () => {
        transition(() => showStep(stepIdx + 1, formData, 100));
      });
    }
  };
  formDiv.appendChild(btn);

  // Animate in
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
    body: JSON.stringify(data),
  })
    .then(() => { btn.disabled = false; cb(); })
    .catch(() => { btn.disabled = false; cb(); });
}

// Start
showStep(0, {}, 0);
