  
    // Sticky nav
    window.addEventListener('scroll', () => {
      document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 80);
    });

    // Smooth active link highlight
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
      navLinks.forEach(a => { a.classList.toggle('active', a.getAttribute('href') === '#' + current); });
    });

    // Intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.project-card, .about-grid, .contact-wrapper, .hobby-card')
      .forEach(el => observer.observe(el));

    /* ── TASK 1.2: ADD HOBBY BENEFIT ── */
    function addBenefit() {
      const input = document.getElementById('hobbyInput');
      const text  = input.value.trim();
      if (!text) return;

      const list = document.getElementById('hobbyBenefitsList');
      const li   = document.createElement('li');
      li.innerHTML = text + ' <button class="delete-btn" onclick="deleteBenefit(this)" aria-label="Delete">&#x2715;</button>';

      li.style.opacity   = '0';
      li.style.transform = 'translateX(-10px)';
      list.appendChild(li);
      requestAnimationFrame(function() {
        li.style.transition = 'opacity 0.3s, transform 0.3s';
        li.style.opacity    = '1';
        li.style.transform  = 'translateX(0)';
      });

      input.value = '';
      input.focus();
    }

    /* ── TASK 1.3: DELETE HOBBY BENEFIT ── */
    function deleteBenefit(btn) {
      var li = btn.closest('li');
      li.style.transition = 'opacity 0.25s, transform 0.25s';
      li.style.opacity    = '0';
      li.style.transform  = 'translateX(12px)';
      setTimeout(function() { li.remove(); }, 260);
    }

    /* ── TASK 2.1: ALERT ON FORM SUBMIT ── */
    function handleSubmit(e) {
      e.preventDefault();
      var name  = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();

      alert('Form Submitted Successfully!\n\nThank you, ' + name + '!\nWe will get back to you at ' + email + ' shortly.');

      var success = document.getElementById('formSuccess');
      success.style.display = 'block';
      e.target.reset();
      setTimeout(function() { success.style.display = 'none'; }, 4000);
    }

    /* ── TASK 3.1: DYNAMIC FOOTER CLOCK ── */
    function updateClock() {
      var now    = new Date();
      var days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      var months = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];

      var dayName = days[now.getDay()];
      var dd      = String(now.getDate()).padStart(2, '0');
      var month   = months[now.getMonth()];
      var yyyy    = now.getFullYear();
      var hh      = String(now.getHours()).padStart(2, '0');
      var mm      = String(now.getMinutes()).padStart(2, '0');
      var ss      = String(now.getSeconds()).padStart(2, '0');

      var el = document.getElementById('footerClock');
      if (el) el.textContent = dayName + ', ' + dd + ' ' + month + ' ' + yyyy + ', ' + hh + ':' + mm + ':' + ss;
    }

    updateClock();
    setInterval(updateClock, 1000);

 