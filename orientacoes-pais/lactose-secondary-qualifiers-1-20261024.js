(function(root){'use strict';
const base=root.PaisGuide;
const sourceAdditions={
 pais105_lactose_niddk_diagnosis:{name:'Diagnosis of Lactose Intolerance — NIDDK',url:'https://www.niddk.nih.gov/health-information/digestive-diseases/lactose-intolerance/diagnosis'},
 pais105_lactose_niddk_viral:{name:'Eating, Diet, & Nutrition for Viral Gastroenteritis — NIDDK',url:'https://www.niddk.nih.gov/health-information/digestive-diseases/viral-gastroenteritis/eating-diet-nutrition'},
 pais105_lactose_gikids:{name:'Lactose Intolerance — NASPGHAN/GIKids',url:'https://gikids.org/wp-content/uploads/2020/02/Lactose-Intolerance.pdf'}
};
const sources={...base.sources,...sourceAdditions};
const commonRefs=['pais102_lactose_niddk_causes','pais102_lactose_niddk_diet','pais102_lactose_aap','pais104_lactose_niddk_treatment','pais105_lactose_niddk_diagnosis','pais105_lactose_niddk_viral','pais105_lactose_gikids'];
const rows=[
 {key:'pdf1500_900',label:'Intolerância à lactose secundária',specific:true,kind:'secondary',entity:'Intolerância secundária à lactose por lesão da mucosa do intestino delgado',assessment:'VALIDATED_AI: entidade clínica válida. Infecções e doenças que lesionam o intestino delgado podem reduzir temporariamente a lactase; o manejo inclui identificar e tratar a causa, preservar a nutrição e reavaliar a tolerância.'},
 {key:'pdf1500_901',label:'Intolerância à lactose secundária agudo',specific:false,kind:'acute',entity:'Intolerância secundária à lactose de início recente; “aguda” descreve o tempo, não uma etiologia própria',assessment:'SOURCE_TERM_ISSUE: “aguda” não define subtipo autônomo. O início recente exige identificar a lesão intestinal ou doença desencadeante e diferenciar infecção ativa de sintomas atribuídos à lactose.'},
 {key:'pdf1500_902',label:'Intolerância à lactose secundária bilateral',specific:false,kind:'bilateral',entity:'Intolerância secundária à lactose; bilateralidade é anatomicamente inaplicável',assessment:'SOURCE_TERM_ISSUE: “bilateral” não se aplica à atividade da lactase no intestino delgado e não define subtipo clínico.'},
 {key:'pdf1500_903',label:'Intolerância à lactose secundária crônico',specific:false,kind:'chronic',entity:'Intolerância secundária persistente enquanto houver lesão ou doença intestinal subjacente',assessment:'SOURCE_TERM_ISSUE: “crônica” descreve duração, não nova entidade. Persistência exige verificar se a causa intestinal continua ativa, se o diagnóstico está correto e se a dieta permanece nutricionalmente adequada.'},
 {key:'pdf1500_904',label:'Intolerância à lactose secundária de origem infecciosa',specific:true,kind:'infectious',entity:'Intolerância secundária à lactose após infecção gastrointestinal',assessment:'VALIDATED_AI: entidade clínica válida. Infecção pode lesionar temporariamente o intestino delgado e reduzir lactase; a tolerância costuma melhorar com recuperação da mucosa, mas sinais de infecção ativa ou desidratação exigem avaliação própria.'},
 {key:'pdf1500_905',label:'Intolerância à lactose secundária grave',specific:false,kind:'severe',entity:'Sintomas intensos atribuídos à intolerância secundária; gravidade exige avaliar desidratação e a doença de base',assessment:'SOURCE_TERM_ISSUE: “grave” é qualificador de intensidade, não subtipo etiológico. Sintomas intensos, desidratação, sangue nas fezes ou perda ponderal exigem avaliação presencial e não autorizam alta domiciliar.',alwaysUrgent:true},
 {key:'pdf1500_906',label:'Intolerância à lactose secundária idiopático',specific:false,kind:'idiopathic',entity:'Suspeita de intolerância à lactose sem causa secundária identificada; classificação incompleta',assessment:'SOURCE_TERM_ISSUE: “secundária idiopática” é contraditório, pois secundária pressupõe lesão ou condição causal. Se a causa não foi identificada, o diagnóstico e os diferenciais precisam ser revistos.'}
];
const byKey=new Map(rows.map(r=>[r.key,r]));
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const byName=new Map(rows.map(r=>[norm(r.label),r]));
const required=['CUIDADOS EM CASA','MEDIDAS SEM REMÉDIOS','MEDICAMENTOS','ALIMENTAÇÃO E LÍQUIDOS','VOLTE IMEDIATAMENTE AO PRONTO ATENDIMENTO','QUANDO REAVALIAR'];
function inherited(fn){const current=root.PaisGuide;root.PaisGuide=base;try{return fn();}finally{root.PaisGuide=current;}}
function rowFor(v){return byKey.get(String(v||''))||byName.get(norm(v))||null;}
function qualifier(row){
 const map={
  secondary:['Na intolerância secundária, uma infecção, doença ou outro dano ao intestino delgado reduz a lactase. Ela pode melhorar quando a causa é tratada e o revestimento intestinal se recupera.','Não presuma que todo desconforto após leite seja apenas lactose: a doença que causou a lesão também precisa ser acompanhada.'],
  acute:['“Aguda” descreve início recente, não uma forma independente. É necessário procurar a infecção, inflamação ou outra lesão intestinal que desencadeou a redução da lactase.','Febre, diarreia contínua ou piora geral podem ser da doença de base e não devem ser explicadas somente pela lactose.'],
  bilateral:['“Bilateral” não se aplica à intolerância à lactose: a lactase atua no revestimento do intestino delgado, não em um órgão par.','Use a orientação da forma secundária somente se houver uma causa intestinal identificada ou em investigação.'],
  chronic:['“Crônica” descreve persistência, não um subtipo separado. Sintomas prolongados podem indicar que a causa intestinal continua ativa ou que o diagnóstico precisa ser revisto.','Não mantenha restrição extensa por tempo indefinido sem revisar crescimento, nutrição e a doença de base.'],
  infectious:['Após gastroenterite ou outra infecção intestinal, a mucosa pode produzir menos lactase por um período. A tolerância costuma voltar conforme o intestino se recupera.','A intolerância em si não é contagiosa; siga as medidas de higiene e afastamento indicadas para a infecção causadora.'],
  severe:['“Grave” não define uma nova forma de intolerância. Sintomas intensos exigem avaliar desidratação, perda de peso, infecção ativa, alergia e outras doenças intestinais.','Esta ficha não autoriza cuidado apenas em casa nem substitui avaliação presencial hoje.'],
  idiopathic:['“Secundária idiopática” é uma combinação contraditória: a forma secundária pressupõe uma causa intestinal. Quando a causa não está clara, o diagnóstico precisa ser revisto.','Não amplie a dieta de exclusão para tentar compensar uma causa ainda desconhecida.']
 };
 return map[row.kind];
}
function sectionsFor(row,age){
 const infant=['u3m','3a5m','6a11m','1a'].includes(age);
 return [
  {title:'CUIDADOS EM CASA',items:[...qualifier(row),'Observe a relação entre lactose e gases, distensão, cólica ou diarreia, mas acompanhe também febre, vômitos, sangue nas fezes, disposição e crescimento.']},
  {title:'MEDIDAS SEM REMÉDIOS',items:['Anote alimentos, quantidade, horário e sintomas. Registre também a doença intestinal recente e a evolução da diarreia.','Não faça jejum nem restrição ampla por conta própria. Se houve infecção, mantenha higiene das mãos e siga as orientações específicas de prevenção da transmissão.']},
  {title:'MEDICAMENTOS',items:['Use somente os medicamentos prescritos para a causa de base. Não use sobras, antidiarreicos ou antibióticos por conta própria.','Lactase em gotas ou comprimidos pode ajudar algumas pessoas, mas a indicação e o produto precisam ser definidos para a idade; não invente dose nem use o suplemento como teste diagnóstico.']},
  {title:'ALIMENTAÇÃO E LÍQUIDOS',items:[infant?'Mantenha leite materno ou fórmula habitual, salvo mudança orientada pela equipe. Não dilua fórmula e não substitua mamadas por água, chá ou bebida vegetal.':'Após gastroenterite, retome a alimentação habitual conforme a aceitação. Reduza lactose apenas se houver sintomas e plano definido; não elimine todos os laticínios automaticamente.','Ofereça líquidos adequados à idade e preserve cálcio, vitamina D, proteína e energia. Dieta sem lactose não trata a causa intestinal e deve ser revista conforme a recuperação.']},
  {title:'VOLTE IMEDIATAMENTE AO PRONTO ATENDIMENTO',items:[(age==='u3m'?'Em bebê menor de três meses, febre ou suspeita de febre exige avaliação imediata. ':'')+'Sangue nas fezes, vômito verde, dor abdominal forte, barriga muito inchada, vômitos repetidos, criança difícil de acordar ou desmaio exigem pronto atendimento.','Recusa de líquidos ou mamadas, bem menos urina, boca seca, ausência de lágrimas, piora rápida ou perda de peso exigem avaliação sem demora. Urticária, inchaço ou dificuldade para respirar sugerem alergia, não intolerância simples, e exigem emergência.']},
  {title:'QUANDO REAVALIAR',items:['Reavalie a causa intestinal e a tolerância à lactose após a recuperação, antes de prolongar a restrição. A equipe orientará quando e como ampliar a dieta novamente.','Procure revisão antes se a diarreia não estiver melhorando, se os sintomas ocorrerem mesmo sem lactose, se houver perda de peso ou falha de crescimento, ou se a dieta ficar difícil de manter.']}
 ];
}
const topics=base.topics.map(t=>{const r=byKey.get(t.key);return r?{...t,generalGuidanceMode:false,catalogOnly:false,specificGuidance:r.specific,termResolution:!r.specific,sections:sectionsFor(r,'unknown'),refs:[...commonRefs],clinicalEntity:r.entity,termAssessment:r.assessment,directedReview:'2026-10-24'}:t;});
function resolve(v){const r=rowFor(v);if(r)return topics.find(t=>t.key===r.key);return inherited(()=>base.resolve(v));}
function build(input={}){
 const p=input&&typeof input==='object'?input:{},row=rowFor(p.diagnosis)||(()=>{const t=inherited(()=>base.resolve(p.diagnosis));return t&&byKey.get(t.key);})();
 if(!row)return inherited(()=>base.build(input));
 const age=p.age===undefined||p.age===null||p.age===''?'unknown':p.age;
 if(!Object.hasOwn(base.ages,age))return {ok:false,code:'AGE_INVALID',message:'Selecione uma faixa etária válida.'};
 const previous=inherited(()=>base.build({...p,diagnosis:row.key,age}));
 if(!previous?.ok)return previous;
 if(p.reviewed!==true&&p.danger!=='yes')return {ok:false,code:'REVIEW_REQUIRED',message:'Confirme a avaliação do diagnóstico pela equipe. O site não decide alta.'};
 let sections=sectionsFor(row,age);
 const urgent=row.alwaysUrgent||p.danger==='yes'||previous.mode==='urgent';
 if(urgent){const reasons=[];if(row.alwaysUrgent)reasons.push('O qualificador “grave” exige avaliação presencial hoje; esta ficha não autoriza alta domiciliar.');if(p.danger==='yes')reasons.push('Foi informado sinal de gravidade: procure atendimento imediatamente.');if(previous.mode==='urgent'&&!reasons.length)reasons.push('A avaliação exige atendimento urgente. Siga imediatamente o encaminhamento da equipe.');sections=[{title:'ATENDIMENTO URGENTE',items:[...new Set(reasons)]},...sections];}
 const clean=(v,n)=>typeof v==='string'?v.replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,n):'',notes=clean(p.notes,1400),plan=clean(p.returnPlan,200);
 if(notes)sections.push({title:'COMPLEMENTO DA CONSULTA',items:[notes]});
 if(plan)sections.find(s=>s.title==='QUANDO REAVALIAR').items.push('Retorno combinado: '+plan);
 const topic=topics.find(t=>t.key===row.key),text='ORIENTAÇÕES AOS PAIS — '+topic.label+'\nFaixa etária: '+base.ages[age]+'\n\n'+sections.map((s,i)=>(i+1)+'. '+s.title+'\n'+s.items.map(x=>'• '+x).join('\n')).join('\n\n');
 return {...previous,ok:true,mode:urgent?'urgent':'guidance',topic:row.key,label:row.label,sections,refs:[...commonRefs],text,warnings:urgent?['Necessidade de avaliação urgente; esta ficha não autoriza alta.']:[],effectiveAgeBand:age,directedGuidance:row.specific,termResolution:!row.specific,termAssessment:row.assessment};
}
function audit(){const old=inherited(()=>base.audit()),issues=[...(old.issues||[])];for(const r of rows){const t=topics.find(x=>x.key===r.key);if(!t||t.label!==r.label||t.specificGuidance!==r.specific||t.termResolution===r.specific||!commonRefs.every(k=>sources[k]))issues.push('lactose-secondary:'+r.key);}return {...old,ok:!issues.length,issues,topics:topics.length};}
root.PaisGuide={...base,sources,topics,resolve,build,audit,lactoseSecondaryQualifiers1_20261024:{keys:rows.map(r=>r.key),checked_at:'2026-10-24T13:35:00.000Z'}};
})(typeof window!=='undefined'?window:globalThis);
