(function(){
  const videos = [
    chrome.runtime.getURL('assets/suresh1.mp4'),
    chrome.runtime.getURL('assets/suresh2.mp4'),
    chrome.runtime.getURL('assets/mammootty.mp4')
  ];

  const picked = videos[Math.floor(Math.random() * videos.length)];
  const vid = document.getElementById('mvid');
  const countEl = document.getElementById('count');
  const returnBtn = document.getElementById('returnBtn');
  const closeBtn = document.getElementById('closeBtn');
  const params = new URLSearchParams(location.search);
  const src = params.get('src');

  vid.src = picked;
  vid.muted = true;
  vid.autoplay = true;
  vid.playsInline = true;

  vid.play().then(()=> {
    setTimeout(()=> {
      try { vid.muted = false; vid.volume = 1.0; } catch(e) { console.warn('unmute failed', e); }
    }, 800);
  }).catch((e)=> { console.warn('play failed', e); });

  let time = 15;
  countEl.textContent = 'You can return in ' + time + 's';
  const timer = setInterval(()=> {
    time--;
    countEl.textContent = 'You can return in ' + time + 's';
    if (time <= 0) {
      clearInterval(timer);
      returnBtn.disabled = false;
      countEl.textContent = 'You may now return';
    }
  }, 1000);

  returnBtn.addEventListener('click', ()=> { if (src) window.location.href = src; else window.close(); });
  closeBtn.addEventListener('click', ()=> window.close());
})();
