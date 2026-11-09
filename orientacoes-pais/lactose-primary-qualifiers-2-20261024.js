(function(root){'use strict';
const base=root.PaisGuide;
const sourceAdditions={
 pais104_lactose_niddk_treatment:{name:'Treatment for Lactose Intolerance — NIDDK',url:'https://www.niddk.nih.gov/health-information/digestive-diseases/lactose-intolerance/treatment'},
 pais104_lactose_ema_excipients:{name:'Excipients labelling — European Medicines Agency',url:'https://www.ema.europa.eu/en/human-regulatory-overview/marketing-authorisation/product-information-requirements/excipients-labelling'}
};
const sources={...base.sources,...sourceAdditions};
const refs=['pais102_lactose_niddk_causes','pais102_lactose_niddk_diet','pais102_lactose_aap','pais104_lactose_niddk_treatment','pais104_lactose_ema_excipients'];
const rows=[
 {key:'pdf1500_893',label:'Intolerância à lactose primária induzido por medicamentos',entity:'Possível intolerância secundária por lesão intestinal relacionada a tratamento ou sintomas após excipiente/adversidade medicamentosa; não intolerância primária induzida',assessment:'SOURCE_TERM_ISSUE: “primária induzida por medicamentos” é contraditório. Tratamentos que lesionam o intestino podem causar deficiência secundária; alguns medicamentos contêm lactose, mas efeitos adversos também podem imitar os sintomas.',kind:'medication'},
 {key:'pdf1500_894',label:'Intolerância à lactose primária leve',entity:'Intolerância primária à lactose com sintomas descritos como leves; gravidade depende da exposição e tolerância individual',assessment:'SOURCE_TERM_ISSUE: “leve” descreve intensidade atual, não subtipo etiológico. A quantidade de lactose e a tolerância individual influenciam os sintomas.',kind:'mild'},
 {key:'pdf1500_895',label:'Intolerância à lactose primária moderado',entity:'Intolerância primária à lactose com sintomas descritos como moderados; gravidade precisa de contexto clínico',assessment:'SOURCE_TERM_ISSUE: “moderada” é qualificador clínico incompleto, não entidade distinta. Persistência, hidratação, crescimento e sinais de alarme definem a necessidade de reavaliação.',kind:'moderate'},
 {key:'pdf1500_896',label:'Intolerância à lactose primária não especificado',entity:'Intolerância primária à lactose sem qualificador clínico suficiente',assessment:'SOURCE_TERM_ISSUE: “não especificada” não acrescenta entidade. É necessário confirmar exposição, sintomas, idade e causas secundárias antes de definir o plano.',kind:'unspecified'},
 {key:'pdf1500_897',label:'Intolerância à lactose primária recorrente',entity:'Intolerância primária à lactose com episódios repetidos após exposição; recorrência não define nova doença',assessment:'SOURCE_TERM_ISSUE: sintomas podem reaparecer conforme a quantidade de lactose ingerida, mas “recorrente” não é subtipo etiológico. Episódios sem relação com lactose exigem rever o diagnóstico.',kind:'recurrent'},
 {key:'pdf1500_898',label:'Intolerância à lactose primária refratário',entity:'Sintomas persistentes apesar de manejo atribuído à intolerância primária; exige revisão diagnóstica e de exposições',assessment:'SOURCE_TERM_ISSUE: “refratária” não é subtipo validado. Falha de melhora exige conferir lactose oculta, adesão, nutrição e diagnósticos diferenciais, sem ampliar restrição ou medicamentos automaticamente.',kind:'refractory'},
 {key:'pdf1500_899',label:'Intolerância à lactose primária unilateral',entity:'Intolerância primária à lactose; unilateralidade é anatomicamente inaplicável',assessment:'SOURCE_TERM_ISSUE: “unilateral” não se aplica à atividade da lactase no intestino delgado e não define subtipo clínico.',kind:'unilateral'}
];
const byKey=new Map(rows.map(r=>[r.key,r]));
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const byName=new Map(rows.map(r=>[norm(r.label),r]));
const required=['CUIDADOS EM CASA','MEDIDAS SEM REMÉDIOS','MEDICAMENTOS','ALIMENTAÇÃO E LÍQUIDOS','VOLTE IMEDIATAMENTE AO PRONTO ATENDIMENTO','QUANDO REAVALIAR'];
function rowFor(v){return byKey.get(String(v||''))||byName.get(norm(v))||null;}
function copySections(sections){return sections.map(s=>({title:s.title,items:[...s.items]}));}
function qualifierItems(row){
 const map={
  medication:['Medicamento não transforma deficiência primária de lactase em doença “induzida”. Tratamentos que lesionam o intestino podem causar intolerância secundária, e alguns comprimidos ou líquidos podem conter pequena quantidade de lactose.','Diarreia, náusea ou dor após iniciar um remédio também podem ser efeito adverso ou outra doença; não atribua automaticamente à lactose.'],
  mild:['“Leve” descreve a intensidade percebida, não uma forma diferente de intolerância primária. A quantidade ingerida e a tolerância individual influenciam os sintomas.','Mantenha o plano individual e não amplie a restrição se pequenas quantidades forem toleradas.'],
  moderate:['“Moderada” não define subtipo próprio. Observe duração, hidratação, crescimento e relação dos sintomas com a quantidade de lactose.','Piora progressiva, perda de peso ou sintomas fora das exposições esperadas exigem revisão do diagnóstico.'],
  unspecified:['“Não especificada” significa que faltam detalhes; não confirma causa primária nem define gravidade.','Registre quais alimentos ou medicamentos precederam os sintomas, a quantidade e o tempo até surgirem.'],
  recurrent:['Episódios podem reaparecer quando a quantidade ingerida ultrapassa a tolerância, mas “recorrente” não cria uma doença diferente.','Sintomas repetidos sem relação clara com lactose ou durante restrição adequada precisam de reavaliação.'],
  refractory:['“Refratária” não é subtipo validado de intolerância primária. Falta de melhora exige conferir lactose oculta, adesão ao plano e outras causas intestinais.','Não faça dieta mais restritiva, mude fórmula ou acrescente suplementos por conta própria para tentar vencer sintomas persistentes.'],
  unilateral:['“Unilateral” não se aplica à intolerância à lactose: a lactase atua no revestimento do intestino delgado, não em um órgão par.','Use a orientação da intolerância primária somente se o diagnóstico-base estiver confirmado.']
 };
 return map[row.kind];
}
function adapt(row,sections){
 const out=copySections(sections);
 const care=out.find(s=>s.title==='CUIDADOS EM CASA');
 const meds=out.find(s=>s.title==='MEDICAMENTOS');
 const review=out.find(s=>s.title==='QUANDO REAVALIAR');
 if(care)care.items=[...qualifierItems(row),...care.items];
 if(row.kind==='medication'&&meds)meds.items.unshift('Não suspenda nem troque medicamento prescrito por conta própria. Confira bula e excipientes com médico ou farmacêutico; a equipe decide se há alternativa adequada.');
 if(review){
  if(row.kind==='medication')review.items.unshift('Reavalie após o início de medicamento se houver diarreia persistente, perda de peso, desidratação ou suspeita de reação; leve a embalagem e a lista completa dos produtos usados.');
  if(row.kind==='moderate')review.items.unshift('Reavalie se os sintomas descritos como moderados não melhorarem com o plano ou limitarem hidratação, alimentação, escola ou atividades.');
  if(row.kind==='recurrent')review.items.unshift('Reavalie episódios recorrentes para confirmar a relação com lactose, a quantidade tolerada e a necessidade de investigar causas secundárias.');
  if(row.kind==='refractory')review.items.unshift('Reavalie antes de intensificar restrições: persistência apesar do plano exige confirmar diagnóstico, exposição oculta e outros problemas intestinais.');
 }
 return out;
}
function baseSections(row,age){const o=base.build({diagnosis:'pdf1500_886',age,reviewed:true});return o.ok?adapt(row,o.sections.filter(s=>required.includes(s.title))):[];}
const topics=base.topics.map(t=>{const r=byKey.get(t.key);return r?{...t,generalGuidanceMode:false,catalogOnly:false,specificGuidance:false,termResolution:true,sections:baseSections(r,'unknown'),refs:[...refs],clinicalEntity:r.entity,termAssessment:r.assessment,directedReview:'2026-10-24'}:t;});
function resolve(v){const r=rowFor(v);if(r)return topics.find(t=>t.key===r.key);return base.resolve(v);}
function build(input={}){
 const p=input&&typeof input==='object'?input:{},row=rowFor(p.diagnosis)||(()=>{const t=base.resolve(p.diagnosis);return t&&byKey.get(t.key);})();
 if(!row)return base.build(input);
 const age=p.age===undefined||p.age===null||p.age===''?'unknown':p.age;
 if(!Object.hasOwn(base.ages,age))return {ok:false,code:'AGE_INVALID',message:'Selecione uma faixa etária válida.'};
 const prior=base.build({...p,diagnosis:'pdf1500_886',age});
 if(!prior?.ok)return prior;
 const sections=adapt(row,prior.sections);
 const urgent=p.danger==='yes'||prior.mode==='urgent';
 const topic=topics.find(t=>t.key===row.key);
 const text='ORIENTAÇÕES AOS PAIS — '+topic.label+'\nFaixa etária: '+base.ages[age]+'\n\n'+sections.map((s,i)=>(i+1)+'. '+s.title+'\n'+s.items.map(x=>'• '+x).join('\n')).join('\n\n');
 return {...prior,ok:true,mode:urgent?'urgent':'guidance',topic:row.key,label:row.label,sections,refs:[...refs],text,warnings:urgent?['Necessidade de reavaliação urgente; esta ficha não autoriza alta.']:[],effectiveAgeBand:age,directedGuidance:false,termResolution:true,termAssessment:row.assessment};
}
function audit(){const old=base.audit(),issues=[...(old.issues||[])];for(const r of rows){const t=topics.find(x=>x.key===r.key);if(!t||t.label!==r.label||t.specificGuidance!==false||t.termResolution!==true||!refs.every(k=>sources[k]))issues.push('lactose-qualifier-2:'+r.key);}return {...old,ok:!issues.length,issues,topics:topics.length};}
root.PaisGuide={...base,sources,topics,resolve,build,audit,lactosePrimaryQualifiers2_20261024:{keys:rows.map(r=>r.key),checked_at:'2026-10-24T12:45:00.000Z'}};
})(typeof window!=='undefined'?window:globalThis);
