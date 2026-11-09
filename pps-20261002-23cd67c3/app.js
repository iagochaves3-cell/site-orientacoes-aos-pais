(() => {
"use strict";
const bootScript = document.currentScript;
const inline = document.getElementById("pps-inline-data");
const baseURL = bootScript && bootScript.src ? new URL(".", bootScript.src) : new URL(".", document.baseURI);
const indexURL = bootScript && bootScript.dataset.ppsIndex ? new URL(bootScript.dataset.ppsIndex, document.baseURI) : new URL("index.json", baseURL);
const CSS = "\n:host{display:block;color:#18343e;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif;font-size:16px;line-height:1.6;color-scheme:light}\n*{box-sizing:border-box}button,input,select{font:inherit}button,a,input,select,summary{touch-action:manipulation}\nbutton{cursor:pointer}button:disabled{cursor:not-allowed;opacity:.48}\na{color:#096c6a;text-underline-offset:3px}button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible{outline:3px solid #ba7840;outline-offset:3px}\n.shell{max-width:1240px;margin:36px auto;padding:0 24px 36px}\n.eyebrow{display:flex;align-items:center;gap:9px;font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#52717a}\n.dot{height:9px;width:9px;display:inline-block;background:#167b75;border-radius:50%}\n.head{display:flex;align-items:flex-start;justify-content:space-between;gap:28px;margin:15px 0 22px}\nh2{font-size:clamp(28px,4vw,43px);font-weight:650;letter-spacing:-.045em;line-height:1.14;margin:0 0 14px}\n.intro{max-width:680px;margin:0;color:#557079;font-size:15px;line-height:1.75}\n.edition{flex-shrink:0;text-align:right;font-size:12px;color:#627980;line-height:1.7;padding-top:8px}\n.edition strong{color:#234b56;display:block;font-size:13px}\n.stats{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid #dbe4e5;background:#fff;border-radius:14px;overflow:hidden;margin:24px 0 20px}\n.stat{padding:17px 22px;border-right:1px solid #e3ebeb}.stat:last-child{border-right:0}\n.stat strong{display:block;font-size:25px;font-weight:650;letter-spacing:-.04em;line-height:1.2}.stat span{font-size:12px;color:#607780}\n.notice{border:1px solid #e8dcc4;background:#fffaf1;border-radius:11px;padding:15px 18px;font-size:12px;color:#715732;margin-bottom:22px}\n.notice p{margin:0}.notice strong{font-weight:750}\n.notice button{padding:0;border:0;background:none;color:#6a512c;font-weight:700;text-decoration:underline;margin-top:5px}\n.nav{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 17px}\n.nav button{border:1px solid #dbe4e5;border-radius:8px;background:#fff;color:#3d606a;padding:10px 14px;font-size:12px;font-weight:650;min-height:43px}\n.nav button[aria-pressed=true]{border-color:#1a615f;background:#1a615f;color:white}\n.searchbox{background:#edf3f2;border:1px solid #dbe6e3;border-radius:12px;padding:15px;margin-bottom:20px}\n.searchrow{display:grid;grid-template-columns:minmax(180px,1fr) 270px;gap:12px}\nlabel{display:block;color:#405f69;font-size:12px;font-weight:650;margin-bottom:6px}\ninput[type=search],select{width:100%;min-height:45px;border:1px solid #cddbdc;border-radius:7px;background:#fff;padding:10px 12px;font-size:13px;color:#18343e}\n.searchmeta{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:11px;font-size:11px;color:#59727a}\n.check{display:flex;align-items:center;gap:7px;margin:0;font-size:11px;font-weight:500;cursor:pointer}\n.check input{accent-color:#1a615f}\n.layout{display:grid;grid-template-columns:335px minmax(0,1fr);gap:22px;align-items:start}\n.results{background:#fff;border:1px solid #dce6e7;border-radius:12px;overflow:hidden}\n.results-top{display:flex;justify-content:space-between;align-items:center;padding:13px 16px;border-bottom:1px solid #e7eeee}\n.results-top h3{font-size:12px;letter-spacing:.03em;margin:0;font-weight:700}.results-top span{font-size:11px;color:#657e86}\n.list{max-height:642px;overflow:auto;padding:5px;scrollbar-width:thin;scrollbar-color:#b1c8c7 transparent}\n.item{width:100%;border:0;border-bottom:1px solid #edf1f2;background:white;text-align:left;padding:12px 12px;border-radius:7px;color:#294d58;font-size:13px;line-height:1.4;min-height:60px}\n.item:hover{background:#f2f7f6}.item[aria-current=true]{background:#e6f1ee;color:#0d5954}\n.item strong{font-weight:620;display:block}.item small{display:block;font-size:10px;color:#71858b;margin-top:5px}\n.pager{display:flex;justify-content:space-between;align-items:center;padding:11px;border-top:1px solid #e7eeee;gap:7px}\n.pager button{border:1px solid #dce5e5;border-radius:6px;background:white;font-size:11px;padding:7px 10px;color:#325762}\n.pager span{font-size:10px;color:#67818a}.empty{padding:24px;color:#687e85;font-size:13px}\n.reader{min-width:0;background:#fff;border:1px solid #dce6e7;border-radius:12px;overflow:hidden}\n.readerhead{padding:24px 27px 19px;border-bottom:1px solid #e5eded}\n.readerhead .kicker{font-size:10px;letter-spacing:.13em;text-transform:uppercase;font-weight:750;color:#50797d;margin-bottom:9px}\n.readerhead h3{font-size:24px;letter-spacing:-.025em;line-height:1.25;margin:0 0 13px;font-weight:650;overflow-wrap:anywhere}\n.badges{display:flex;flex-wrap:wrap;gap:6px}\n.badge{font-size:10px;border-radius:5px;padding:4px 8px;border:1px solid #dce6e5;background:#f3f7f6;color:#51726e}\n.badge.hospital{background:#fff2ef;border-color:#efd6cd;color:#894b36}\n.readercontent{padding:21px 27px 25px}\n.context{font-size:12px;border-left:3px solid #b08550;padding:10px 13px;background:#fbf7ef;color:#745833;margin-bottom:16px}\n.field{margin:0 0 19px}\n.field h4{font-size:12px;line-height:1.4;letter-spacing:.01em;color:#365d66;font-weight:750;margin:0 0 7px}\n.field p,.field .prose{white-space:pre-wrap;overflow-wrap:anywhere;word-break:normal;font-size:13px;line-height:1.8;color:#3b5660;margin:0}\n.field.alert{padding:15px 17px;background:#fff5f1;border:1px solid #efddd3;border-radius:8px}\n.field.alert h4{color:#884d38}.field.alert p{color:#774c3e}\n.original{white-space:pre-wrap;overflow-wrap:anywhere;margin:0;font:13px/1.85 ui-sans-serif,system-ui,sans-serif;color:#3c5963;max-height:760px;overflow:auto}\n.readerfoot{border-top:1px solid #e5eded;padding:16px 27px 20px;background:#fbfdfc}\n.source{font-size:10px;color:#6c8188;margin:0 0 12px;overflow-wrap:anywhere}\n.actions{display:flex;flex-wrap:wrap;gap:8px}\n.actions button,.footer button,.primary{min-height:38px;padding:8px 12px;border:1px solid #ccdcdc;border-radius:7px;background:white;color:#2a5b63;font-size:11px;font-weight:650}\n.actions button:first-child{background:#1a615f;border-color:#1a615f;color:white}\n.status{font-size:11px;min-height:20px;color:#477367;margin:9px 0 0}\n.footer{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-top:24px;padding-top:18px;border-top:1px solid #dbe5e4}\n.footer p{max-width:620px;font-size:11px;color:#688088;margin:0;line-height:1.75}.footer .actions{flex-shrink:0}\n.footer .actions button:first-child{background:#fff;color:#2a5b63;border-color:#ccdcdc}\n.error{padding:22px;background:#fff1ed;color:#8d4031;border:1px solid #e2bbb0;border-radius:10px}\n.loading{padding:30px;color:#557c7a;font-size:14px}\n@media(max-width:900px){.layout{grid-template-columns:280px minmax(0,1fr);gap:14px}.readerhead,.readercontent,.readerfoot{padding-left:20px;padding-right:20px}.searchrow{grid-template-columns:1fr 235px}.footer{align-items:flex-start;flex-direction:column}}\n@media(max-width:680px){.shell{padding:0 14px 28px;margin:24px auto}.head{display:block}.edition{text-align:left;padding-top:14px}.stats{grid-template-columns:repeat(2,1fr)}.stat{padding:15px 18px}.stat:nth-child(2){border-right:0}.stat:nth-child(-n+2){border-bottom:1px solid #e3ebeb}.searchrow{grid-template-columns:1fr}.searchmeta{align-items:flex-start;flex-direction:column}.layout{grid-template-columns:1fr}.list{max-height:275px}.readerhead h3{font-size:22px}.nav button{flex:1 1 44%;padding:10px 8px}.readerhead,.readercontent,.readerfoot{padding-left:18px;padding-right:18px}.footer .actions{flex-wrap:wrap}.notice{font-size:11px}h2{font-size:33px}}\n@media print{.head,.stats,.notice,.nav,.searchbox,.results,.footer,.actions,.source,.status{display:none}.layout{display:block}.reader{border:0}.shell{padding:0;margin:0}.original{max-height:none;overflow:visible}:host{color:black}.readerhead,.readercontent{padding:10px 0}}\n\n@media screen{:host{color:#fff;color-scheme:dark}a{color:#ff9ec2}.stats,.results,.reader,.nav button,.pager button,.actions button,.footer button,.primary{background:#12172f;border-color:#343c5c;color:#fff}.stat,.results-top,.pager,.readerhead,.readerfoot,.footer{border-color:#343c5c}.intro,.edition,.stat span,.searchmeta,.check,.results-top span,.item small,.pager span,.empty,.source,.footer p,.loading{color:#c3c9dd}.eyebrow,.edition strong,.readerhead .kicker,.field h4{color:#ff9ec2}.dot{background:#ff2778}.notice,.context,.field.alert,.error{background:#301b31;border-color:#91445f;color:#ffdae7}.notice button,.field.alert h4,.field.alert p{color:#ffd5e4}.searchbox,.readerfoot{background:#0f142c;border-color:#343c5c}label{color:#fff}input[type=search],select{background:#0c1027;border-color:#566181;color:#fff;font-size:16px}.item{background:#12172f;color:#fff;border-color:#343c5c;font-size:15px}.item:hover{background:#202641}.item[aria-current=true]{background:#36203f;color:#ffc2d9}.nav button[aria-pressed=true],.actions button:first-child{background:#ff2778;border-color:#ff2778;color:#0c1027}.footer .actions button:first-child{background:#1b2340;color:#fff;border-color:#566181}.badge,.badge.hospital{background:#25203c;color:#ffc2d9;border-color:#665071}.field p,.field .prose,.original{color:#fff;font-size:16px}.field h4,label,.nav button,.actions button,.notice,.context{font-size:14px}.stat span,.edition,.item small,.source,.footer p,.searchmeta,.check,.badge{font-size:13px}.check input{accent-color:#ff2778}button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible{outline-color:#ff8bb5}}\n";
const ARCHIVE_NOTICE = "ARQUIVO DOCUMENTAL NÃO VALIDADO CLINICAMENTE. Foram identificadas associações incorretas entre diagnóstico e texto. Não entregue estes textos como orientação às famílias nem os use para decidir cuidados, tratamento ou alta. O original é preservado somente para consulta documental e revisão profissional.";
const KNOWN_ISSUES = {
 f1025: "Hipospádia: o texto trata de acompanhamento de doença renal, sem orientação pertinente ao diagnóstico do título.",
 f1028: "Hipotermia acidental: o texto foi associado a intoxicação por substâncias.",
 f1049: "Ideação suicida: o texto foi associado a intoxicação e não oferece orientação adequada para esse risco.",
 f1056: "Impingem: o texto foi associado a cuidados hematológicos, sem pertinência ao diagnóstico do título.",
 f0120: "Angioedema hereditário: o texto foi associado a anafilaxia e não serve como plano específico para esse diagnóstico.",
 f0274: "Celulite orbitária: o texto foi associado a infecção superficial da pele, com prazo de retorno inadequado para essa emergência.",
 f0350: "Conjuntivite gonocócica neonatal: higiene ocular e retorno em 48–72 horas não cobrem a gravidade nem o tratamento necessário.",
 f1066: "Zika congênita: o texto foi associado a doença febril aguda e não cobre o seguimento do desenvolvimento infantil."
};
const SAFETY_NOTICES = {
  "f0120": {
    "title": "Angioedema hereditário",
    "safetyText": "Angioedema hereditário e anafilaxia precisam de planos diferentes. Não utilize o texto arquivado como tratamento de uma crise. Inchaço na língua ou garganta, mudança da voz ou dificuldade para respirar exigem ajuda imediata: ligue 192. Quem já tem o diagnóstico deve seguir seu plano individual de crise, elaborado pela equipe de alergia/imunologia, sem adiar a busca de ajuda. Um primeiro episódio de inchaço precisa de avaliação médica; a causa não deve ser decidida por esta página.",
    "sourceUrl": "https://www.rch.org.au/clinicalguide/guideline_index/c1_esterase_inhibitor_deficiency/",
    "sourceName": "Royal Children’s Hospital — angioedema hereditário, maio de 2025"
  },
  "f0274": {
    "title": "Celulite Pós-Septal (Orbitária Verdadeira)",
    "safetyText": "Suspeita ou diagnóstico de celulite orbitária exige avaliação hospitalar urgente. Não aguarde o retorno em 24–48 horas indicado no original. Essa infecção pode ameaçar a visão e se espalhar para estruturas próximas ao cérebro. Dor ou dificuldade ao mover o olho, olho projetado para a frente, visão alterada ou dor de cabeça intensa reforçam a urgência. A conduta e a necessidade de internação são definidas pela equipe, não por esta ficha.",
    "sourceUrl": "https://www.rch.org.au/clinicalguide/guideline_index/Periorbital_and_orbital_cellulitis/",
    "sourceName": "Royal Children’s Hospital — celulite periorbitária e orbitária"
  },
  "f0350": {
    "title": "Conjuntivite neonatal por Neisseria gonorrhoeae",
    "safetyText": "Um recém-nascido com suspeita dessa infecção precisa de avaliação médica imediata. Não espere 48–72 horas para retornar e não tente resolver somente com limpeza ou colírio. Há risco de lesão grave dos olhos e de infecção em outras partes do corpo. O tratamento necessário é sistêmico e deve ser definido pela equipe; esta página não orienta medicamentos ou doses.",
    "sourceUrl": "https://www.cdc.gov/std/treatment-guidelines/gonorrhea-neonates.htm",
    "sourceName": "CDC — infecção gonocócica em recém-nascidos"
  },
  "f1066": {
    "title": "Infecção congênita pelo vírus Zika",
    "safetyText": "A infecção congênita por Zika precisa de acompanhamento pediátrico organizado, diferente da orientação para Zika adquirida com febre e manchas. Combine com a equipe a avaliação do crescimento, desenvolvimento, visão, audição e alimentação, com encaminhamento especializado conforme os achados. Mantenha consultas e intervenções indicadas mesmo sem febre. O diagnóstico, sozinho, não significa emergência; os sinais e as necessidades atuais da criança definem a urgência.",
    "sourceUrl": "https://www.cdc.gov/mmwr/volumes/66/wr/mm6641a1.htm",
    "sourceName": "CDC — avaliação e seguimento de crianças com possível infecção congênita por Zika, 2017"
  }
};
const PAGE_SIZE = 30;
const nf = new Intl.NumberFormat("pt-BR");
const norm = s => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const el = (tag, attrs = {}, text) => {
  const node = document.createElement(tag);
  for (const [key,value] of Object.entries(attrs)) {
    if (key === "class") node.className = value;
    else node.setAttribute(key, String(value));
  }
  if (text !== undefined) node.textContent = String(text);
  return node;
};
function escapeHTML(s) { return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
async function run() {
  if (document.getElementById("pps-biblioteca-root")) return;
  const host = el("section", {id:"pps-biblioteca-root","aria-label":"Biblioteca documental PPS completa"});
  let target = document.getElementById("biblioteca");
  if (target) target.appendChild(host);
  else {
    target = el("section",{id:"biblioteca"});
    const parent = document.querySelector("main") || document.body;
    parent.appendChild(target); target.appendChild(host);
  }
  const openLibrary = () => { if(target.tagName === "DETAILS") target.open=true; };
  if(location.hash==="#biblioteca") openLibrary();
  document.querySelectorAll('a[href="#biblioteca"]').forEach(a=>a.addEventListener("click",e=>{openLibrary();if(a.dataset.ppsLibraryLink==="true"){e.preventDefault();const u=new URL(location.href);u.hash="biblioteca";history.replaceState(null,"",u);host.scrollIntoView({block:"start"});}}));
  window.addEventListener("hashchange",()=>{if(location.hash==="#biblioteca")openLibrary();});
  const root = host.attachShadow({mode:"open"});
  root.appendChild(el("style",{},CSS));
  root.appendChild(el("link",{rel:"stylesheet",href:"/theme-silverstorm.css?v=20261006"}));
  root.appendChild(el("link",{rel:"stylesheet",href:"/typography-lucida.css?v=20261006-lucida"}));
  const loading = el("p",{class:"loading",role:"status"},"Carregando o índice da biblioteca…");
  root.appendChild(loading);
  let db, inlineText = null;
  const loaded = new Map();
  async function getJSON(url) {
    const response = await fetch(url, {credentials:"omit"});
    if (!response.ok) throw new Error("Falha ao carregar um arquivo da biblioteca (HTTP "+response.status+").");
    return response.json();
  }
  try {
    if (inline) {
      const data = JSON.parse(inline.textContent);
      db = data.index; inlineText = data.text;
      if (inlineText.length !== db.characters) throw new Error("O tamanho do documento não corresponde ao índice.");
    } else db = await getJSON(indexURL);
    if (db.schema !== 1 || !Array.isArray(db.records) || !Array.isArray(db.packs)) throw new Error("Formato de biblioteca não reconhecido.");
  } catch (error) {
    loading.className = "error";
    loading.textContent = "A biblioteca não foi carregada. "+error.message+" O conteúdo do gerador existente não foi alterado.";
    return;
  }
  async function pack(p) {
    if (!loaded.has(p.path)) {
      const job = getJSON(new URL(p.url || p.path,indexURL)).then(async data => {
        if (data.start !== p.start || data.end !== p.end || data.text.length !== p.end-p.start) throw new Error("Bloco de texto incompatível com o índice.");
        return data;
      }).catch(error => {loaded.delete(p.path); throw error;});
      loaded.set(p.path,job);
    }
    return loaded.get(p.path);
  }
  async function textAt(row) {
    if (inlineText !== null) return inlineText.slice(row.start,row.end);
    const parts = db.packs.filter(p => p.start<row.end && p.end>row.start);
    const pieces = await Promise.all(parts.map(async p => {
      const block = await pack(p);
      return block.text.slice(Math.max(0,row.start-p.start),Math.min(p.end,row.end)-p.start);
    }));
    const result = pieces.join("");
    if (result.length !== row.end-row.start) throw new Error("A ficha não pôde ser reconstruída integralmente.");
    return result;
  }
  const refs = {};
  const shell = el("div",{class:"shell"});
  const eyebrows = el("div",{class:"eyebrow"});
  eyebrows.append(el("span",{class:"dot","aria-hidden":"true"}),el("span",{},"Orientações aos pais · Acervo documental"));
  shell.append(eyebrows);
  const head = el("header",{class:"head"});
  const headline = el("div");
  headline.append(el("h2",{},"Toda a biblioteca, em um só lugar."),
    el("p",{class:"intro"},"Consulte as fichas, os complementos e os textos originais. O conteúdo dos 291 arquivos foi reunido sem cortes, com origem identificada e limites preservados."));
  const edition = el("div",{class:"edition"});
  edition.append(el("strong",{},"Importação documental"),document.createTextNode("Data declarada na fonte: 02/10/2026"));
  head.append(headline,edition);shell.append(head);
  const stats = el("div",{class:"stats"});
  for (const [number,label] of [[db.counts.records,"fichas de orientação"],[db.counts.options,"rótulos do seletor"],[db.counts.complements,"complementos com fontes"],[db.counts.files,"arquivos preservados"]]) {
    const stat = el("div",{class:"stat"});stat.append(el("strong",{},nf.format(number)),el("span",{},label));stats.append(stat);
  }
  shell.append(stats);
  const notice = el("aside",{class:"notice","aria-label":"Limites do acervo"});
  const np = el("p");
  np.append(el("strong",{},"Atenção: inconsistências clínicas identificadas. "),document.createTextNode(ARCHIVE_NOTICE+" Casos já sinalizados: 1025 Hipospádia, 1028 Hipotermia acidental, 1049 Ideação suicida e 1056 Impingem. A lista de erros não é exaustiva; as demais fichas também não estão validadas. Há 1.104 orientações gerais, conteúdos hospitalares e condições não pediátricas. Os 4.859 rótulos não são novas fichas clínicas."));
  const limitsButton = el("button",{type:"button"},"Ler apresentação e limites da fonte");
  notice.append(np,limitsButton);shell.append(notice);
  const modes=[
    ["fichas","Orientações A–Z"],["complementos","Complementos e fontes"],["opcoes","Rótulos do seletor"],["arquivos","Arquivos originais"],["documento","Apresentação e listas"]
  ];
  const nav=el("nav",{class:"nav","aria-label":"Seções da biblioteca"});
  const modeButtons={};
  modes.forEach(([key,label])=>{
    const b=el("button",{type:"button","aria-pressed":key==="fichas"?"true":"false"},label);
    b.addEventListener("click",()=>setMode(key));nav.append(b);modeButtons[key]=b;
  });shell.append(nav);
  const searchbox=el("div",{class:"searchbox"});
  const searchrow=el("div",{class:"searchrow"});
  const searchgroup=el("div");
  refs.query=el("input",{id:"pps-search",type:"search",placeholder:"Ex.: bronquiolite, pneumonia, dengue",autocomplete:"off","aria-controls":"pps-results"});
  searchgroup.append(el("label",{for:"pps-search"},"Buscar nesta seção"),refs.query);
  const filtergroup=el("div");
  refs.filter=el("select",{id:"pps-type"});
  refs.filter.append(el("option",{value:""},"Todos os tipos de conteúdo"));
  db.types.forEach((t,i)=>refs.filter.append(el("option",{value:i},t)));
  filtergroup.append(el("label",{for:"pps-type"},"Tipo de orientação"),refs.filter);
  searchrow.append(searchgroup,filtergroup);
  const searchmeta=el("div",{class:"searchmeta"});
  const checklabel=el("label",{class:"check",for:"pps-fulltext"});
  refs.fulltext=el("input",{id:"pps-fulltext",type:"checkbox"});
  checklabel.append(refs.fulltext,document.createTextNode("Buscar também dentro dos textos"));
  refs.hint=el("span",{},"Busca local, sem envio de termos a serviços de IA.");
  searchmeta.append(checklabel,refs.hint);searchbox.append(searchrow,searchmeta);shell.append(searchbox);
  const layout=el("div",{class:"layout"});
  const resultbox=el("aside",{class:"results","aria-label":"Resultados da busca"});
  const resulthead=el("div",{class:"results-top"});
  refs.resultsHeading=el("h3",{},"Fichas cadastradas");
  refs.count=el("span",{"aria-live":"polite","aria-atomic":"true"});
  resulthead.append(refs.resultsHeading,refs.count);
  refs.list=el("div",{class:"list",id:"pps-results"});
  const pager=el("div",{class:"pager"});
  refs.prev=el("button",{type:"button","aria-label":"Página anterior de resultados"},"← Anterior");
  refs.page=el("span");refs.next=el("button",{type:"button","aria-label":"Próxima página de resultados"},"Próxima →");
  pager.append(refs.prev,refs.page,refs.next);resultbox.append(resulthead,refs.list,pager);
  refs.reader=el("article",{class:"reader","aria-label":"Leitura do texto selecionado",tabindex:"-1"});
  layout.append(resultbox,refs.reader);shell.append(layout);
  const foot=el("footer",{class:"footer"});
  foot.append(el("p",{},"Acervo adicional ao gerador existente. A importação não altera suas regras, não prescreve e não amplia automaticamente os diagnósticos disponíveis no gerador. Fontes e datas são as declaradas nos arquivos enviados."));
  const footacts=el("div",{class:"actions"});
  const saveAll=el("button",{type:"button"},"Baixar integral original (arquivo documental)");
  const verify=el("button",{type:"button"},"Verificar integridade");
  footacts.append(saveAll,verify);foot.append(footacts);shell.append(foot);
  const globalStatus=el("p",{class:"status",role:"status","aria-live":"polite"});
  shell.append(globalStatus);
  loading.remove();root.append(shell);
  let mode="fichas",page=0,filtered=[],selected=null,selectedText="",searchGeneration=0,readGeneration=0;
  const optionsRows=db.options.map((o,i)=>({id:"o"+String(i+1).padStart(4,"0"),title:o[0],start:o[1],end:o[2],kind:"opcoes"}));
  const filesRows=db.files.map(f=>({...f,id:"a"+String(f.n).padStart(3,"0"),title:f.name,kind:"arquivos"}));
  const byMode={
    fichas:db.records.map(r=>({...r,kind:"fichas"})),
    complementos:db.complements.map(r=>({...r,kind:"complementos"})),
    opcoes:optionsRows,arquivos:filesRows,
    documento:db.sections.map(r=>({...r,kind:"documento"}))
  };
  const allRows=Object.values(byMode).flat();
  const byID=new Map(allRows.map(r=>[r.id,r]));
  const fullCache=new Map();
  function setMode(value) {
    mode=value;page=0;refs.query.value="";refs.filter.value="";
    refs.filter.disabled=mode!=="fichas";
    refs.query.placeholder=mode==="arquivos"?"Ex.: Parte_001, Parte_291":mode==="opcoes"?"Ex.: forma grave, bronquiolite":"Digite um nome ou termo";
    for(const [key,b] of Object.entries(modeButtons)) b.setAttribute("aria-pressed",String(key===mode));
    refs.resultsHeading.textContent=modes.find(x=>x[0]===mode)[1];
    updateSearch();
  }
  async function updateSearch() {
    const token=++searchGeneration;page=0;
    const terms=norm(refs.query.value.trim()).split(/\s+/).filter(Boolean);
    let rows=byMode[mode];
    if(mode==="fichas" && refs.filter.value!=="") rows=rows.filter(r=>r.type===Number(refs.filter.value));
    refs.hint.textContent="Busca local, sem envio de termos a serviços de IA.";
    try {
      if(terms.length && refs.fulltext.checked) {
        refs.hint.textContent="Preparando a busca nos textos completos…";
        await Promise.all(rows.map(async row=>{
          if(!fullCache.has(row.id)) fullCache.set(row.id,norm(row.title+" "+await textAt(row)));
        }));
      }
      if(token!==searchGeneration)return;
      filtered=rows.filter(r=>{
        const hay=refs.fulltext.checked&&fullCache.has(r.id)?fullCache.get(r.id):norm(r.title+" "+(r.kind==="fichas"?db.contexts[r.context]:""));
        return terms.every(t=>hay.includes(t));
      });
      refs.hint.textContent="Busca local, sem envio de termos a serviços de IA.";
      renderList();
    } catch(error) {
      if(token!==searchGeneration)return;
      refs.hint.textContent="Não foi possível pesquisar todos os textos: "+error.message;
      filtered=[];renderList();
    }
  }
  function smallLabel(row) {
    if(row.kind==="fichas") return (KNOWN_ISSUES[row.id]?"⚠ INCONSISTÊNCIA · ":"")+row.id.slice(1)+" · "+["Orientação geral","Conteúdo hospitalar","Diagnóstico ou família"][row.type];
    if(row.kind==="complementos")return "Complemento "+Number(row.id.slice(1))+" · Fonte preservada";
    if(row.kind==="opcoes")return "Rótulo "+Number(row.id.slice(1))+" · Não é uma ficha adicional";
    if(row.kind==="arquivos")return nf.format(row.chars)+" caracteres · Parte "+row.n+" de 291";
    return "Texto integral da seção";
  }
  function renderList() {
    refs.count.textContent=nf.format(filtered.length)+" resultados";
    refs.list.replaceChildren();
    const visible=filtered.slice(page*PAGE_SIZE,(page+1)*PAGE_SIZE);
    if(!visible.length)refs.list.append(el("p",{class:"empty"},"Nenhum resultado. Experimente outro nome, retire filtros ou ative a busca nos textos."));
    for(const row of visible) {
      const b=el("button",{type:"button",class:"item","aria-current":String(selected&&selected.id===row.id),"data-record":row.id});
      b.append(el("strong",{},row.title),el("small",{},smallLabel(row)));
      b.addEventListener("click",()=>openRow(row,true));
      refs.list.append(b);
    }
    refs.prev.disabled=page===0;
    refs.next.disabled=(page+1)*PAGE_SIZE>=filtered.length;
    refs.page.textContent=filtered.length?`${page*PAGE_SIZE+1}–${Math.min((page+1)*PAGE_SIZE,filtered.length)} de ${nf.format(filtered.length)}`:"0 resultados";
    refs.list.scrollTop=0;
  }
  function addRichText(parent,text) {
    const re=/https?:\/\/[^\s<>]+/g;let last=0;
    for(const m of text.matchAll(re)) {
      parent.append(document.createTextNode(text.slice(last,m.index)));
      const a=el("a",{href:m[0],target:"_blank",rel:"noopener noreferrer"},m[0]);
      parent.append(a);last=m.index+m[0].length;
    }
    parent.append(document.createTextNode(text.slice(last)));
  }
  function renderOriginal(body,row,text) {
    if(row.kind==="fichas") {
      const lines=text.trimEnd().split("\n");
      const labels=["Contexto","Tipo de conteúdo","Local de cuidado","Cuidados","Como acompanhar a melhora","Procure atendimento se houver","Retorno","Origem das orientações"];
      for(const line of lines.slice(1)) {
        if(!line.trim())continue;
        const label=labels.find(k=>line.startsWith(k+": "));
        if(!label){const p=el("p",{class:"original"});addRichText(p,line);body.append(p);continue;}
        const field=el("section",{class:"field"+(label==="Procure atendimento se houver"?" alert":"")});
        field.append(el("h4",{},label));
        const p=el("p");addRichText(p,line.slice(label.length+2));field.append(p);body.append(field);
      }
    } else {
      const raw=el("div",{class:"original",tabindex:"0","aria-label":"Texto original"});
      addRichText(raw,text);body.append(raw);
    }
  }
  async function openRow(row,focus) {
    selected=row;selectedText="";const token=++readGeneration;
    refs.reader.replaceChildren(el("p",{class:"loading",role:"status"},"Reunindo o texto completo…"));
    renderList();
    try {
      const text=await textAt(row);if(token!==readGeneration)return;selectedText=text;
      const issues=db.records.filter(r=>KNOWN_ISSUES[r.id]&&r.start<row.end&&r.end>row.start).map(r=>KNOWN_ISSUES[r.id]);
      const rh=el("header",{class:"readerhead"});
      rh.append(el("div",{class:"kicker"},smallLabel(row)),el("h3",{},row.title));
      const badges=el("div",{class:"badges"});
      badges.append(el("span",{class:"badge"},"Texto original · sem cortes"));
      if(row.kind==="fichas"&&row.type===1)badges.append(el("span",{class:"badge hospital"},"Acompanhamento hospitalar"));
      if(row.kind==="fichas"&&row.type===0)badges.append(el("span",{class:"badge"},"Conteúdo geral de especialidade"));
      rh.append(badges);
      const body=el("div",{class:"readercontent"});
      body.append(el("div",{class:"context"},ARCHIVE_NOTICE));
      if(issues.length)body.append(el("div",{class:"error",role:"note"},"INCONSISTÊNCIA CONHECIDA — NÃO USAR COMO ORIENTAÇÃO. "+issues.join(" ")+" Cópia e impressão desta seleção estão indisponíveis. O arquivo literal permanece acessível para auditoria."));
      const safetyRows=db.records.filter(r=>SAFETY_NOTICES[r.id]&&r.start<row.end&&r.end>row.start);
      for(const affected of safetyRows){
        const safety=SAFETY_NOTICES[affected.id],box=el("section",{class:"field alert","data-safety-record":affected.id});
        box.append(el("h4",{},"Orientação de segurança — "+safety.title),el("p",{},safety.safetyText));
        box.append(el("a",{href:safety.sourceUrl,target:"_blank",rel:"noopener noreferrer"},"Fonte: "+safety.sourceName));
        body.append(box);
      }
      if(row.kind==="opcoes") {
        body.append(el("div",{class:"context"},"Este item é apenas um rótulo do seletor original, não uma nova ficha clínica. Não aplique a ficha-base automaticamente a uma apresentação grave ou complicada. Leia os perfis de gravidade na apresentação do documento."));
      }
      if(row.kind==="fichas") {
        body.append(el("div",{class:"context"},"Material documental não revisado individualmente. Antes de qualquer uso clínico, o profissional deve conferir a pertinência do texto ao diagnóstico, à idade e à gravidade. A importação não corrige possíveis inconsistências da fonte."));
      }
      if(row.kind==="fichas"&&db.contexts[row.context]) {
        body.append(el("div",{class:"context"},"Contexto declarado na fonte: "+db.contexts[row.context]));
      }
      if(row.kind==="arquivos")body.append(el("div",{class:"context"},"Esta é uma parte literal do arquivo contínuo. Ela pode começar ou terminar no meio de uma ficha; use “Orientações A–Z” para ler a ficha reconstruída."));
      if(issues.length){
        const quarantine=el("details",{class:"quarantine"});
        quarantine.append(el("summary",{},"Exibir original com inconsistência, somente para auditoria"));
        renderOriginal(quarantine,row,text);body.append(quarantine);
      }else renderOriginal(body,row,text);
      const rf=el("footer",{class:"readerfoot"});
      const relevant=db.files.filter(f=>f.start<row.end && f.end>row.start);
      const source=el("p",{class:"source"});
      source.textContent="Origem: "+(relevant.length===1?relevant[0].name:relevant[0].name+" até "+relevant[relevant.length-1].name)+". Conteúdo fornecido pelo usuário; revisão clínica individual não realizada nesta importação.";
      rf.append(source);
      const actions=el("div",{class:"actions"});
      const copy=el("button",{type:"button"},"Copiar original documental");
      const save=el("button",{type:"button"},"Baixar TXT original (arquivo documental)");
      const print=el("button",{type:"button"},"Imprimir");
      const status=el("p",{class:"status",role:"status","aria-live":"polite"});
      if(issues.length){copy.disabled=true;print.disabled=true;}
      copy.addEventListener("click",async()=>{
        if(issues.length)return;
        try {
          await navigator.clipboard.writeText(ARCHIVE_NOTICE+"\n\n"+text);
          status.textContent="Texto documental copiado com aviso obrigatório de não utilização clínica.";
        } catch(error) {
          const input=el("textarea",{"aria-label":"Texto original para copiar"});input.value=ARCHIVE_NOTICE+"\n\n"+text;
          input.style.cssText="position:fixed;left:0;top:0;opacity:0";
          root.append(input);input.focus();input.select();
          const ok=typeof document.execCommand==="function"&&document.execCommand("copy");input.remove();
          status.textContent=ok?"Texto original copiado.":"A cópia foi bloqueada pelo navegador. Use “Salvar TXT”.";
        }
      });
      save.addEventListener("click",()=>download(text,row.kind==="arquivos"?"ARQUIVO_DOCUMENTAL_"+row.name:"ARQUIVO_DOCUMENTAL_NAO_VALIDADO_"+row.id+"-pps.txt"));
      print.addEventListener("click",()=>{
        if(issues.length)return;
        const w=window.open("","_blank");
        if(!w){status.textContent="A impressão foi bloqueada pelo navegador. Autorize a nova janela ou salve o TXT.";return;}
        w.opener=null;
        w.document.write('<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>'+escapeHTML(row.title)+'</title><style>body{font:14px/1.7 system-ui,sans-serif;max-width:850px;margin:36px auto;padding:0 22px}pre{white-space:pre-wrap;overflow-wrap:anywhere;font:inherit}.notice{border:1px solid #777;padding:12px;font-size:12px}button{padding:8px 15px;margin-bottom:20px}@media print{button{display:none}}</style><link rel="stylesheet" href="/typography-lucida.css?v=20261006-lucida"></head><body><button type="button" onclick="window.print()">Imprimir esta ficha</button><p class="notice">'+escapeHTML(ARCHIVE_NOTICE+" "+db.disclaimer)+'</p><pre>'+escapeHTML(text)+'</pre><p>'+escapeHTML(source.textContent)+'</p></body></html>');
        w.document.close();
      });
      actions.append(copy,save,print);rf.append(actions,status);
      refs.reader.replaceChildren(rh,body,rf);
      if(focus){refs.reader.focus({preventScroll:true});if(window.innerWidth<681)refs.reader.scrollIntoView({behavior:"smooth",block:"start"});}
      if(focus)try{const u=new URL(location.href);u.searchParams.set("pps",row.id);u.hash="biblioteca";history.replaceState(null,"",u);}catch(_){}
    } catch(error) {
      if(token===readGeneration)refs.reader.replaceChildren(el("p",{class:"error"},"O texto não foi carregado: "+error.message+" Nenhum trecho parcial será exibido como ficha completa."));
    }
  }
  function download(text,name) {
    const url=URL.createObjectURL(new Blob([text],{type:"text/plain;charset=utf-8"}));
    const link=el("a",{href:url,download:name});document.body.append(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),10000);
  }
  let timer;
  refs.query.addEventListener("input",()=>{clearTimeout(timer);timer=setTimeout(updateSearch,140);});
  refs.query.addEventListener("keydown",event=>{if(event.key==="Enter"){event.preventDefault();clearTimeout(timer);updateSearch();}});
  refs.filter.addEventListener("change",updateSearch);refs.fulltext.addEventListener("change",updateSearch);
  refs.prev.addEventListener("click",()=>{if(page>0){page--;renderList();}});
  refs.next.addEventListener("click",()=>{if((page+1)*PAGE_SIZE<filtered.length){page++;renderList();}});
  limitsButton.addEventListener("click",()=>{setMode("documento");openRow(byID.get("apresentacao"),true);});
  saveAll.addEventListener("click",async()=>{
    saveAll.disabled=true;globalStatus.textContent="Reunindo os 291 arquivos…";
    try{download(await textAt({start:0,end:db.characters}),"PPS_ARQUIVO_DOCUMENTAL_NAO_VALIDADO_integral.txt");globalStatus.textContent="Arquivo documental preparado: "+nf.format(db.characters)+" caracteres originais. Contém inconsistências conhecidas; não utilizar como orientação clínica.";}
    catch(error){globalStatus.textContent="Falha ao reunir o documento: "+error.message;}
    finally{saveAll.disabled=false;}
  });
  verify.addEventListener("click",async()=>{
    verify.disabled=true;globalStatus.textContent="Conferindo conteúdo e assinatura SHA-256…";
    try{
      if(!globalThis.crypto?.subtle)throw new Error("A verificação criptográfica requer HTTPS ou abertura local em navegador compatível.");
      const text=await textAt({start:0,end:db.characters});
      const digest=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(text));
      const hash=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,"0")).join("");
      if(hash!==db.source_text_sha256)throw new Error("O conteúdo não corresponde à assinatura registrada.");
      globalStatus.textContent="Integridade confirmada: 291/291 arquivos e "+nf.format(db.characters)+" caracteres. SHA-256 correspondente. Isto não é validação clínica.";
    }catch(error){globalStatus.textContent="Verificação não concluída: "+error.message;}
    finally{verify.disabled=false;}
  });
  updateSearch();
  const requested=new URL(location.href).searchParams.get("pps");
  const initial=byID.get(requested)||byID.get("apresentacao");
  if(requested&&byID.has(requested))setMode(initial.kind);
  await openRow(initial,false);
  host.dataset.ready="true";
  if(location.hash==="#biblioteca" && !requested) host.scrollIntoView({block:"start"});
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",run,{once:true});
else run();
})();