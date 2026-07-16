// MEXCOR 인트라넷 공통 네비게이션
(function(){
  const PAGES = [
    {id:'summary',file:'summary_live.html',icon:'🏠',ko:'Summary',es:'Resumen'},
    {id:'aviso',file:'aviso_live.html',icon:'📋',ko:'AVISO',es:'AVISO'},
    {id:'ar',file:'ar_live.html',icon:'💰',ko:'AR',es:'CxC'},
    {id:'ap',file:'ap_live.html',icon:'💳',ko:'AP',es:'CxP'},
    {id:'sales',file:'sales_live.html',icon:'📊',ko:'매출',es:'Ventas'},
    {id:'inv',file:'inventory_live.html',icon:'📦',ko:'재고',es:'Inventario'},
    {id:'crm',file:'crm_live.html',icon:'🤝',ko:'고객관리',es:'Clientes'},
  ];

  let lang = localStorage.getItem('mexcor_lang')||'ko';
  const curFile = location.pathname.split('/').pop()||'summary_live.html';

  const style = document.createElement('style');
  style.textContent = `
    body { padding-top: 48px !important; }
    #mexcor-nav {
      position: fixed; top: 0; left: 0; right: 0; height: 48px;
      background: #1a1f3a; display: flex; align-items: center;
      padding: 0 14px; gap: 3px; z-index: 9999;
      border-bottom: 0.5px solid #2a3060;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    .mn-logo { margin-right: 10px; padding-right: 10px; border-right: 0.5px solid #3a4070; flex-shrink:0; }
    .mn-logo img { height: 28px; width: auto; display: block; }
    .mn-tabs { display: flex; gap: 2px; flex: 1; overflow-x: auto; }
    .mn-tabs::-webkit-scrollbar { display: none; }
    .mn-tab {
      display: flex; align-items: center; gap: 5px;
      padding: 5px 11px; border-radius: 6px; cursor: pointer;
      border: none; background: transparent; color: #9a98a0;
      font-family: inherit; font-size: 12px; white-space: nowrap;
      text-decoration: none; transition: background .1s;
    }
    .mn-tab:hover { background: #252b50; color: #fff; }
    .mn-tab.active { background: #252b50; color: #fff; }
    .mn-status { font-size: 10px; padding: 1px 5px; border-radius: 20px; margin-left: 1px; }
    .mn-right { margin-left: auto; display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
    .mn-time { font-size: 11px; color: #555; }
    .mn-lang {
      background: none; border: 0.5px solid #3a4070; border-radius: 5px;
      color: #777; padding: 3px 9px; font-size: 11px; cursor: pointer; font-family: inherit;
    }
    .mn-lang:hover { border-color: #666; color: #ccc; }
    .mn-s-ok { background: #1a5c3c; color: #5DCAA5; }
    .mn-s-warn { background: #5c3a0a; color: #EF9F27; }
    .mn-s-danger { background: #5c1a1a; color: #F09595; }
    .mn-s-gray { background: #2a2a3a; color: #666; }
  `;
  document.head.appendChild(style);

  const logoSrc = (curFile==='summary_live.html'?'':'') + 'logo.png';
  const nav = document.createElement('nav');
  nav.id = 'mexcor-nav';
  nav.innerHTML = `
    <div class="mn-logo">
      <img src="logo.png" alt="MEXCOR" onerror="this.outerHTML='<span style=\"color:#fff;font-weight:700;font-size:14px;letter-spacing:.05em;\">MEXCOR</span>'">
    </div>
    <div class="mn-tabs">
      ${PAGES.map(p=>`<a class="mn-tab${p.file===curFile?' active':''}" href="${p.file}" data-id="${p.id}">
        <span>${p.icon}</span><span class="mn-label" data-ko="${p.ko}" data-es="${p.es}">${lang==='ko'?p.ko:p.es}</span>
        <span class="mn-status mn-s-gray" id="nav-st-${p.id}" style="display:none;"></span>
      </a>`).join('')}
    </div>
    <div class="mn-right">
      <span class="mn-time" id="nav-time"></span>
      <button class="mn-lang" id="nav-lang" onclick="window._navToggleLang()">${lang==='ko'?'KO':'ES'}</button>
    </div>
  `;
  document.body.prepend(nav);

  function updateTime(){ document.getElementById('nav-time').textContent=new Date().toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'}); }
  updateTime(); setInterval(updateTime,60000);

  function applyLang(){
    document.querySelectorAll('.mn-label').forEach(el=>{
      el.textContent = lang==='ko'?el.dataset.ko:el.dataset.es;
    });
    document.getElementById('nav-lang').textContent = lang==='ko'?'KO':'ES';
    // data-ko/data-es 속성 가진 모든 요소 번역
    document.querySelectorAll('[data-ko][data-es]').forEach(el=>{
      if(!el.classList.contains('mn-label'))
        el.textContent = lang==='ko'?el.dataset.ko:el.dataset.es;
    });
  }

  window._navToggleLang = function(){
    lang = lang==='ko'?'es':'ko';
    localStorage.setItem('mexcor_lang', lang);
    applyLang();
    document.dispatchEvent(new CustomEvent('mexcorLangChange',{detail:{lang}}));
  };

  window._mexcorSetStatus = function(tabId, status, label){
    const el=document.getElementById('nav-st-'+tabId);
    if(!el) return;
    el.textContent=label; el.style.display='inline-block';
    el.className='mn-status mn-s-'+(status||'gray');
  };

  window._mexcorLang = lang;
  applyLang();
})();
