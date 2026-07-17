// MEXCOR 인트라넷 공통 네비게이션
(function(){
  const PAGES = [
    {id:'summary',file:'summary_live.html',icon:'🏠',ko:'Summary',es:'Resumen'},
    {id:'aviso',file:'aviso_live.html',icon:'📋',ko:'AVISO',es:'AVISO'},
    {id:'ar',file:'ar_live.html',icon:'💰',ko:'AR',es:'AR'},
    {id:'ap',file:'ap_live.html',icon:'💳',ko:'AP',es:'AP'},
    {id:'sales',file:'sales_live.html',icon:'📊',ko:'매출',es:'Ventas'},
    {id:'inv',file:'inventory_live.html',icon:'📦',ko:'재고',es:'Inventario'},
    {id:'crm',file:'crm_live.html',icon:'🤝',ko:'고객관리',es:'Clientes'},
  ];

  let lang = localStorage.getItem('mexcor_lang')||'ko';
  const curFile = location.pathname.split('/').pop()||'summary_live.html';

  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
    body { padding-top: 48px !important; }
    #mexcor-nav {
      position: fixed; top: 0; left: 0; right: 0; height: 48px;
      background: #2b3260; display: flex; align-items: center;
      padding: 0 14px; gap: 3px; z-index: 9999;
      border-bottom: 0.5px solid #3d4478;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    .mn-logo { margin-right: 10px; padding-right: 10px; border-right: 0.5px solid #4a5290; flex-shrink:0;
      display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1px; }
    .mn-logo img { height: 21px; width: auto; max-height: 21px; display: block; object-fit: contain;
      filter: brightness(0) invert(1); opacity: 0.92; }
    .mn-logo-word { font-family: 'Poppins', -apple-system, sans-serif; font-weight: 600; font-size: 8px;
      letter-spacing: 1.5px; color: #d8dae8; opacity: 0.85; line-height: 1; }
    .mn-tabs { display: flex; gap: 2px; flex: 1; overflow-x: auto; }
    .mn-tabs::-webkit-scrollbar { display: none; }
    .mn-tab {
      display: flex; align-items: center; gap: 5px;
      padding: 5px 11px; border-radius: 6px; cursor: pointer;
      border: none; background: transparent; color: #b0aeb8;
      font-family: inherit; font-size: 12px; white-space: nowrap;
      text-decoration: none; transition: background .1s;
    }
    .mn-tab:hover { background: #3a4278; color: #fff; }
    .mn-tab.active { background: #3a4278; color: #fff; }
    .mn-status { font-size: 10px; padding: 1px 5px; border-radius: 20px; margin-left: 1px; }
    .mn-right { margin-left: auto; display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
    .mn-time { font-size: 11px; color: #a8a6c8; }
    .mn-lang-toggle {
      display: flex; background: #1f2450; border: 0.5px solid #4a5290; border-radius: 5px; overflow: hidden;
    }
    .mn-lang-opt {
      background: transparent; border: none; color: #9a98a0; padding: 4px 9px; font-size: 11px;
      cursor: pointer; font-family: inherit; font-weight: 500;
    }
    .mn-lang-opt.active { background: #5a6090; color: #fff; }
    .mn-lang-opt:hover:not(.active) { color: #fff; }
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
      <img src="logo.svg" alt="MEXCOR" onerror="window._mexcorLogoFallback(this)">
      <span class="mn-logo-word">MEXCOR</span>
    </div>
    <div class="mn-tabs">
      ${PAGES.map(p=>`<a class="mn-tab${p.file===curFile?' active':''}" href="${p.file}" data-id="${p.id}">
        <span>${p.icon}</span><span class="mn-label" data-ko="${p.ko}" data-es="${p.es}">${lang==='ko'?p.ko:p.es}</span>
        <span class="mn-status mn-s-gray" id="nav-st-${p.id}" style="display:none;"></span>
      </a>`).join('')}
    </div>
    <div class="mn-right">
      <span class="mn-time" id="nav-time"></span>
      <div class="mn-lang-toggle">
        <button class="mn-lang-opt${lang==='ko'?' active':''}" onclick="window._navSetLang('ko')" title="한국어">한</button>
        <button class="mn-lang-opt${lang==='es'?' active':''}" onclick="window._navSetLang('es')" title="Español">ES</button>
      </div>
    </div>
  `;
  window._mexcorLogoFallback = function(img){
    img.style.display = 'none';
  };

  document.body.prepend(nav);

  function updateTime(){ document.getElementById('nav-time').textContent=new Date().toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'}); }
  updateTime(); setInterval(updateTime,60000);

  function applyLang(){
    document.querySelectorAll('.mn-label').forEach(el=>{
      el.textContent = lang==='ko'?el.dataset.ko:el.dataset.es;
    });
    document.querySelectorAll('.mn-lang-opt').forEach(el=>{
      el.classList.toggle('active', (lang==='ko')===(el.textContent==='한'));
    });
    // data-ko/data-es 속성 가진 모든 요소 번역
    document.querySelectorAll('[data-ko][data-es]').forEach(el=>{
      if(!el.classList.contains('mn-label'))
        el.textContent = lang==='ko'?el.dataset.ko:el.dataset.es;
    });
  }

  window._navSetLang = function(newLang){
    if(newLang===lang) return;
    lang = newLang;
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
  // nav.js는 <body> 맨 앞에서 동기 실행되기 때문에, 이 시점엔 페이지의 나머지 HTML(차트 제목 등)이
  // 아직 DOM에 파싱되기 전이라 번역이 누락될 수 있음. 파싱 완료 후 한 번 더 적용.
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', applyLang);
  } else {
    applyLang();
  }
})();
