// MEXCOR 인트라넷 공통 네비게이션
(function(){
  const PAGES = [
    {id:'summary',file:'index.html',icon:'🏠',ko:'Summary',es:'Resumen'},
    {id:'aviso',file:'aviso_live.html',icon:'📋',ko:'AVISO',es:'AVISO'},
    {id:'ar',file:'ar_live.html',icon:'💰',ko:'AR',es:'CxC'},
    {id:'ap',file:'ap_live.html',icon:'💳',ko:'AP',es:'CxP'},
    {id:'sales',file:'sales_live.html',icon:'📊',ko:'매출',es:'Ventas'},
    {id:'inv',file:'inventory_live.html',icon:'📦',ko:'재고',es:'Inventario'},
    {id:'crm',file:'crm_live.html',icon:'🤝',ko:'고객관리',es:'Clientes'},
  ];

  let lang = localStorage.getItem('mexcor_lang')||'ko';
  const curFile = location.pathname.split('/').pop()||'index.html';
  const curPage = PAGES.find(p=>p.file===curFile)||PAGES[0];

  // 스타일 주입
  const style = document.createElement('style');
  style.textContent = `
    body { padding-top: 48px !important; }
    #mexcor-nav {
      position: fixed; top: 0; left: 0; right: 0; height: 48px;
      background: #1a1f3a; display: flex; align-items: center;
      padding: 0 14px; gap: 3px; z-index: 9999;
      border-bottom: 0.5px solid #2a3060; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    #mexcor-nav .mn-logo { margin-right: 10px; padding-right: 10px; border-right: 0.5px solid #3a4070; flex-shrink: 0; }
    #mexcor-nav .mn-logo img { height: 26px; width: auto; display: block; }
    #mexcor-nav .mn-tabs { display: flex; gap: 2px; flex: 1; overflow-x: auto; }
    #mexcor-nav .mn-tabs::-webkit-scrollbar { display: none; }
    #mexcor-nav .mn-tab {
      display: flex; align-items: center; gap: 5px;
      padding: 5px 11px; border-radius: 6px; cursor: pointer;
      border: none; background: transparent; color: #9a98a0;
      font-family: inherit; font-size: 12px; white-space: nowrap;
      text-decoration: none; transition: background .1s;
    }
    #mexcor-nav .mn-tab:hover { background: #252b50; color: #fff; }
    #mexcor-nav .mn-tab.active { background: #252b50; color: #fff; }
    #mexcor-nav .mn-tab .mn-status {
      font-size: 10px; padding: 1px 5px; border-radius: 20px; margin-left: 1px;
    }
    #mexcor-nav .mn-right { margin-left: auto; display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
    #mexcor-nav .mn-time { font-size: 11px; color: #666; }
    #mexcor-nav .mn-lang {
      background: none; border: 0.5px solid #3a4070; border-radius: 5px;
      color: #888; padding: 3px 9px; font-size: 11px; cursor: pointer;
      font-family: inherit;
    }
    #mexcor-nav .mn-lang:hover { border-color: #666; color: #ccc; }
    .mn-s-ok { background: #1a5c3c; color: #5DCAA5; }
    .mn-s-warn { background: #5c3a0a; color: #EF9F27; }
    .mn-s-danger { background: #5c1a1a; color: #F09595; }
    .mn-s-gray { background: #2a2a3a; color: #666; }
  `;
  document.head.appendChild(style);

  // 네비 HTML 생성
  const nav = document.createElement('nav');
  nav.id = 'mexcor-nav';
  nav.innerHTML = `
    <div class="mn-logo">
      <img src="${curFile==='index.html'?'':location.pathname.includes('/')?''}logo.png" alt="MEXCOR" onerror="this.style.display='none';this.nextSibling.style.display='block'"><span style="display:none;color:#fff;font-weight:600;font-size:13px;">MEXCOR</span>
    </div>
    <div class="mn-tabs">
      ${PAGES.map(p=>`
        <a class="mn-tab${p.file===curFile?' active':''}" href="${p.file}" data-id="${p.id}">
          <span>${p.icon}</span>
          <span class="mn-label">${lang==='ko'?p.ko:p.es}</span>
          <span class="mn-status mn-s-gray" id="nav-st-${p.id}" style="display:none;"></span>
        </a>`).join('')}
    </div>
    <div class="mn-right">
      <span class="mn-time" id="nav-time"></span>
      <button class="mn-lang" id="nav-lang" onclick="window._mexcorToggleLang()">${lang==='ko'?'KO':'ES'}</button>
    </div>
  `;
  document.body.prepend(nav);

  // 시간
  function updateTime(){ document.getElementById('nav-time').textContent = new Date().toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'}); }
  updateTime(); setInterval(updateTime, 60000);

  // 언어 토글
  window._mexcorToggleLang = function(){
    lang = lang==='ko'?'es':'ko';
    localStorage.setItem('mexcor_lang', lang);
    document.getElementById('nav-lang').textContent = lang==='ko'?'KO':'ES';
    document.querySelectorAll('.mn-label').forEach((el,i)=>{ el.textContent = lang==='ko'?PAGES[i].ko:PAGES[i].es; });
    // 현재 페이지 언어 변경 이벤트
    document.dispatchEvent(new CustomEvent('mexcorLangChange', {detail:{lang}}));
  };

  // 탭 상태 설정 함수 (각 페이지에서 호출)
  window._mexcorSetStatus = function(tabId, status, label){
    const el = document.getElementById('nav-st-'+tabId);
    if(!el) return;
    el.textContent = label;
    el.style.display = 'inline-block';
    el.className = 'mn-status mn-s-'+(status||'gray');
  };

  // 현재 언어 노출
  window._mexcorLang = lang;
})();
