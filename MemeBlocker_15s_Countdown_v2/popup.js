document.addEventListener('DOMContentLoaded', ()=> {
  const input = document.getElementById('site');
  const add = document.getElementById('add');
  const list = document.getElementById('list');

  function render(){
    chrome.storage.sync.get(['blockedSites'], (r)=>{
      const arr = r.blockedSites || [];
      list.innerHTML = '';
      arr.forEach((s,i)=>{
        const li = document.createElement('li');
        li.textContent = s + ' ';
        const btn = document.createElement('button');
        btn.textContent = 'Remove';
        btn.addEventListener('click', ()=> {
          arr.splice(i,1);
          chrome.storage.sync.set({blockedSites: arr}, render);
        });
        li.appendChild(btn);
        list.appendChild(li);
      });
    });
  }

  add.addEventListener('click', ()=> {
    const v = input.value.trim();
    if(!v) return;
    chrome.storage.sync.get(['blockedSites'], (r)=>{
      const arr = r.blockedSites || [];
      arr.push(v);
      chrome.storage.sync.set({blockedSites: arr}, ()=>{ input.value=''; render(); });
    });
  });

  render();
});
