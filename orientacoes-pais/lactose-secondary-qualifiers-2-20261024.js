(function(root){'use strict';
const base=root.PaisGuide;
const sourceAdditions={
 pais106_lactose_niddk_medicine:{name:'Symptoms & Causes of Lactose Intolerance — NIDDK',url:'https://www.niddk.nih.gov/health-information/digestive-diseases/lactose-intolerance/symptoms-causes'},
 pais106_lactose_ema_lactose:{name:'Lactose as an excipient — European Medicines Agency',url:'https://www.ema.europa.eu/en/documents/scientific-guideline/draft-information-package-leaflet-regarding-lactose-used-excipient-medicinal-products-human-use_en.pdf'}
};
const sources={...base.sources,...sourceAdditions};
const refs=['pais106_lactose_niddk_medicine','pais102_lactose_niddk_diet','pais102_lactose_aap','pais104_lactose_niddk_treatment','pais106_lactose_ema_lactose','pais105_lactose_niddk_diagnosis','pais105_lactose_niddk_viral','pais105_lactose_gikids'];
const rows=[
 {key:'pdf1500_907',label:'Intolerância à lactose secundária induzido por medicamentos',specific:true,kind:'medication',entity:'Intolerância secundária à lactose por lesão do intestino delgado relacionada a medicamento ou tratamento',assessment:'VALIDATED_AI: entidade causal possível. Alguns medicamentos ou tratamentos podem lesionar o intestino delgado e reduzir lactase; isso deve ser distinguido de lactose como excipiente e de efeitos adversos que apenas imitam intolerância.'},
 {key:'pdf1500_908',label:'Intolerância à lactose secundária leve',specific:false,kind:'mild',entity:'Intolerância secundária à lactose com sintomas descritos como leves',assessment:'SOURCE_TERM_ISSUE: “leve” descreve intensidade atual, não etiologia ou subtipo. A quantidade de lactose, a tolerância individual e a doença intestinal de base precisam ser avaliadas separadamente.'},
 {key:'pdf1500_909',label:'Intolerância à lactose secundária moderado',specific:false,kind:'moderate',entity:'Intolerância secundária à lactose com sintomas descritos como moderados',assessment:'SOURCE_TERM_ISSUE: “moderada” é qualificador de intensidade, não subtipo autônomo. Sintomas relevantes exigem avaliar hidratação, nutrição e atividade da causa intestinal.'},
 {key:'pdf1500_910',label:'Intolerância à lactose secundária não especificado',specific:false,kind:'unspecified',entity:'Intolerância secundária à lactose sem causa registrada',assessment:'SOURCE_TERM_ISSUE: “não especificada” é classificação incompleta. A forma secundária pressupõe lesão ou condição causal, que deve ser identificada ou permanecer explicitamente em investigação.'},
 {key:'pdf1500_911',label:'Intolerância à lactose secundária recorrente',specific:false,kind:'recurrent',entity:'Episódios recorrentes de sintomas atribuídos à intolerância secundária à lactose',assessment:'SOURCE_TERM_ISSUE: “recorrente” descreve repetição, não nova entidade. Recorrência exige rever recuperação da mucosa, reexposição, causa persistente ou diagnóstico alternativo.'},
 {key:'pdf1500_912',label:'Intolerância à lactose secundária refratário',specific:false,kind:'refractory',entity:'Sintomas persistentes apesar de manejo para intolerância secundária à lactose',assessment:'SOURCE_TERM_ISSUE: “refratária” não é subtipo validado. Ausência de melhora exige confirmar causa, diagnóstico, exposição e adequação nutricional antes de ampliar restrições ou tratamentos.'},
 {key:'pdf1500_913',label:'Intolerância à lactose secundária unilateral',specific:false,kind:'unilateral',entity:'Intolerância secundária à lactose; unilateralidade é anatomicamente inaplicável',assessment:'SOURCE_TERM_ISSUE: “unilateral” não se aplica à atividade da lactase no revestimento do intestino delgado e não define subtipo clínico.'}
];
const byKey=new Map(rows.map(r=>[r.key,r]));
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const byName=new Map(rows.map(r=>[norm(r.label),r]));
function inherited(fn){const current=root.PaisGuide;root.PaisGuide=base;try{return fn();}finally{root.PaisGuide=current;}}
function rowFor(v){return byKey.get(String(v||''))||byName.get(norm(v))||null;}
function qualifier(row){
 const map={
  medication:['Alguns medicamentos ou tratamentos podem lesionar o intestino delgado e causar redução secundária de lactase. Isso é diferente de um remédio apenas conter lactose como excipiente.','Diarreia, náusea ou dor após iniciar um remédio também podem ser efeito adverso ou outra doença; não atribua automaticamente à lactose e não suspenda tratamento por conta própria.'],
  mild:['“Leve” descreve a intensidade atual, não uma forma diferente de intolerância secundária. A quantidade ingerida e a tolerância individual influenciam os sintomas.','Mesmo sintomas leves exigem acompanhamento da causa que lesionou o intestino; não prolongue restrições depois da recuperação sem reavaliação.'],
  moderate:['“Moderada” descreve intensidade, não um subtipo. Avalie hidratação, ingestão, perda de peso e atividade da doença intestinal causadora.','Se a criança estiver piorando, urinando menos ou não conseguindo beber, não espere a restrição alimentar resolver o quadro.'],
  unspecified:['“Não especificada” significa que a causa secundária ainda não foi registrada. É preciso identificar infecção, inflamação, tratamento ou outra lesão intestinal pertinente.','Não transforme uma classificação incompleta em dieta de exclusão prolongada.'],
  recurrent:['“Recorrente” descreve episódios repetidos, não uma nova doença. Repetição pode indicar nova lesão intestinal, causa ainda ativa, reexposição ou outro diagnóstico.','Registre a relação com infecções, tratamentos, alimentos e períodos de melhora para orientar a revisão.'],
  refractory:['“Refratária” não é subtipo estabelecido. Sintomas que não melhoram exigem confirmar o diagnóstico, a causa intestinal, a exposição à lactose e a adequação nutricional.','Não amplie restrições, troque fórmula ou acrescente suplementos por conta própria para tentar vencer sintomas persistentes.'],
  unilateral:['“Unilateral” não se aplica à intolerância à lactose: a lactase atua no revestimento do intestino delgado, não em um órgão par.','Use a orientação da forma secundária somente se houver uma causa intestinal identificada ou em investigação.']
 };
 return map[row.kind];
}
function sectionsFor(row,age){
 const infant=['u3m','3a5m','6a11m','1a'].includes(age);
 const medication=row.kind==='medication';
 const review=[];
 if(medication)review.push('Reavalie após iniciar ou mudar um medicamento se houver diarreia persistente, perda de peso ou desidratação; leve a embalagem e a lista completa dos produtos usados.');
 if(row.kind==='recurrent')review.push('Episódios repetidos exigem revisão da causa e da recuperação intestinal antes de repetir ou prolongar restrições.');
 if(row.kind==='refractory')review.push('Reavalie antes de intensificar restrições: falta de melhora exige confirmar diagnóstico, causa de base e diagnósticos diferenciais.');
 return [
  {title:'CUIDADOS EM CASA',items:[...qualifier(row),'Observe a relação entre lactose e gases, distensão, cólica ou diarreia, mas acompanhe também febre, vômitos, sangue nas fezes, disposição e crescimento.']},
  {title:'MEDIDAS SEM REMÉDIOS',items:['Anote alimentos, medicamentos, quantidade, horário e sintomas. Registre também a doença intestinal recente e a evolução da diarreia.','Não faça jejum nem restrição ampla por conta própria. A dieta sem lactose não trata a causa intestinal.']},
  {title:'MEDICAMENTOS',items:[...(medication?['Não suspenda nem troque medicamento prescrito por conta própria. Confira o produto, a bula e os excipientes com médico ou farmacêutico.']:[]),'Use somente os medicamentos prescritos para a causa de base. Não use sobras, antidiarreicos ou antibióticos por conta própria.','Lactase em gotas ou comprimidos pode ajudar algumas pessoas, mas a indicação e o produto precisam ser definidos para a idade; não invente dose nem use o suplemento como teste diagnóstico.']},
  {title:'ALIMENTAÇÃO E LÍQUIDOS',items:[infant?'Mantenha leite materno ou fórmula habitual, salvo mudança orientada pela equipe. Não dilua fórmula e não substitua mamadas por água, chá ou bebida vegetal.':'Mantenha alimentação habitual conforme a aceitação. Reduza lactose apenas se houver sintomas e plano definido; não elimine todos os laticínios automaticamente.','Ofereça líquidos adequados à idade e preserve cálcio, vitamina D, proteína e energia. Revise a tolerância conforme a causa intestinal se recupera.']},
  {title:'VOLTE IMEDIATAMENTE AO PRONTO ATENDIMENTO',items:[(age==='u3m'?'Em bebê menor de três meses, febre ou suspeita de febre exige avaliação imediata. ':'')+'Sangue nas fezes, vômito verde, dor abdominal forte, barriga muito inchada, vômitos repetidos, criança difícil de acordar ou desmaio exigem pronto atendimento.','Recusa de líquidos ou mamadas, bem menos urina, boca seca, ausência de lágrimas, piora rápida, perda de peso, urticária, inchaço ou dificuldade para respirar exigem avaliação sem demora.']},
  {title:'QUANDO REAVALIAR',items:[...review,'Reavalie a causa intestinal e a tolerância à lactose após a recuperação, antes de prolongar a restrição. Procure revisão antes se os sintomas ocorrerem mesmo sem lactose, se houver perda de peso ou falha de crescimento, ou se a dieta ficar difícil de manter.']}
 ];
}
const topics=base.topics.map(t=>{const r=byKey.get(t.key);return r?{...t,generalGuidanceMode:false,catalogOnly:false,specificGuidance:r.specific,termResolution:!r.specific,sections:sectionsFor(r,'unknown'),refs:[...refs],clinicalEntity:r.entity,termAssessment:r.assessment,directedReview:'2026-10-24'}:t;});
function resolve(v){const r=rowFor(v);if(r)return topics.find(t=>t.key===r.key);return inherited(()=>base.resolve(v));}
function build(input={}){
 const p=input&&typeof input==='object'?input:{},row=rowFor(p.diagnosis)||(()=>{const t=inherited(()=>base.resolve(p.diagnosis));return t&&byKey.get(t.key);})();
 if(!row)return inherited(()=>base.build(input));
 const age=p.age===undefined||p.age===null||p.age===''?'unknown':p.age;
 if(!Object.hasOwn(base.ages,age))return {ok:false,code:'AGE_INVALID',message:'Selecione uma faixa etária válida.'};
 const previous=inherited(()=>base.build({...p,diagnosis:row.key,age}));
 if(!previous?.ok)return previous;
 if(p.reviewed!==true&&p.danger!=='yes')return {ok:false,code:'REVIEW_REQUIRED',message:'Confirme a avaliação do diagnóstico pela equipe. O site não decide alta.'};
 let sections=sectionsFor(row,age),urgent=p.danger==='yes'||previous.mode==='urgent';
 if(urgent){const reason=p.danger==='yes'?'Foi informado sinal de gravidade: procure atendimento imediatamente.':'A avaliação exige atendimento urgente. Siga imediatamente o encaminhamento da equipe.';sections=[{title:'ATENDIMENTO URGENTE',items:[reason]},...sections];}
 const clean=(v,n)=>typeof v==='string'?v.replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,n):'',notes=clean(p.notes,1400),plan=clean(p.returnPlan,200);
 if(notes)sections.push({title:'COMPLEMENTO DA CONSULTA',items:[notes]});
 if(plan)sections.find(s=>s.title==='QUANDO REAVALIAR').items.push('Retorno combinado: '+plan);
 const topic=topics.find(t=>t.key===row.key),text='ORIENTAÇÕES AOS PAIS — '+topic.label+'\nFaixa etária: '+base.ages[age]+'\n\n'+sections.map((s,i)=>(i+1)+'. '+s.title+'\n'+s.items.map(x=>'• '+x).join('\n')).join('\n\n');
 return {...previous,ok:true,mode:urgent?'urgent':'guidance',topic:row.key,label:row.label,sections,refs:[...refs],text,warnings:urgent?['Necessidade de avaliação urgente; esta ficha não autoriza alta.']:[],effectiveAgeBand:age,directedGuidance:row.specific,termResolution:!row.specific,termAssessment:row.assessment};
}
function audit(){const old=inherited(()=>base.audit()),issues=[...(old.issues||[])];for(const r of rows){const t=topics.find(x=>x.key===r.key);if(!t||t.label!==r.label||t.specificGuidance!==r.specific||t.termResolution===r.specific||!refs.every(k=>sources[k]))issues.push('lactose-secondary-2:'+r.key);}return {...old,ok:!issues.length,issues,topics:topics.length};}
root.PaisGuide={...base,sources,topics,resolve,build,audit,lactoseSecondaryQualifiers2_20261024:{keys:rows.map(r=>r.key),checked_at:'2026-10-24T14:55:07.604Z'}};
})(typeof window!=='undefined'?window:globalThis);
