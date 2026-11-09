(function(root){'use strict';
const base=root.PaisGuide;
const refs=['pais102_lactose_niddk_causes','pais102_lactose_niddk_diet','pais102_lactose_aap'];
const rows=[
 {key:'pdf1500_887',label:'Intolerância à lactose primária agudo',entity:'Intolerância primária à lactose / não persistência da lactase; sintomas podem surgir em episódios após ingestão',assessment:'SOURCE_TERM_ISSUE: “primária aguda” não é entidade distinta. A deficiência primária se desenvolve com a idade; início súbito exige conferir exposição, infecção recente e causas secundárias.',kind:'acute'},
 {key:'pdf1500_888',label:'Intolerância à lactose primária bilateral',entity:'Intolerância primária à lactose / não persistência da lactase',assessment:'SOURCE_TERM_ISSUE: “bilateral” não se aplica à atividade da lactase no intestino delgado e não define subtipo clínico.',kind:'bilateral'},
 {key:'pdf1500_889',label:'Intolerância à lactose primária crônico',entity:'Intolerância primária à lactose / não persistência da lactase, geralmente duradoura',assessment:'SOURCE_TERM_ISSUE: “crônica” é qualificador redundante, não uma doença nova. Persistência apesar do plano exige rever diagnóstico, exposição e causas secundárias.',kind:'chronic'},
 {key:'pdf1500_890',label:'Intolerância à lactose primária de origem infecciosa',entity:'Suspeita de intolerância secundária à lactose após lesão intestinal infecciosa, não intolerância primária',assessment:'SOURCE_TERM_ISSUE: origem infecciosa contradiz “primária”. Intolerância após infecção é secundária e frequentemente temporária; diarreia persistente também exige excluir infecção ativa e outras causas.',kind:'infectious'},
 {key:'pdf1500_891',label:'Intolerância à lactose primária grave',entity:'Sintomas intensos atribuídos à lactose; gravidade exige reavaliação e exclusão de desidratação, alergia e doença intestinal',assessment:'SOURCE_TERM_ISSUE: “grave” é qualificador clínico incompleto e não confirma intolerância primária. Sinais sistêmicos ou perda de peso exigem avaliação de outras causas e não autorizam alta domiciliar.',kind:'severe',alwaysUrgent:true},
 {key:'pdf1500_892',label:'Intolerância à lactose primária idiopático',entity:'Intolerância primária à lactose / não persistência da lactase',assessment:'SOURCE_TERM_ISSUE: “idiopática” não acrescenta entidade demonstrada. A forma primária corresponde à não persistência da lactase; causa incerta exige confirmação e diferenciais.',kind:'idiopathic'}
];
const byKey=new Map(rows.map(r=>[r.key,r]));
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const byName=new Map(rows.map(r=>[norm(r.label),r]));
const required=['CUIDADOS EM CASA','MEDIDAS SEM REMÉDIOS','MEDICAMENTOS','ALIMENTAÇÃO E LÍQUIDOS','VOLTE IMEDIATAMENTE AO PRONTO ATENDIMENTO','QUANDO REAVALIAR'];
function rowFor(v){return byKey.get(String(v||''))||byName.get(norm(v))||null;}
function copySections(sections){return sections.map(s=>({title:s.title,items:[...s.items]}));}
function qualifierItems(row){
 const map={
  acute:['Sintomas podem começar de forma súbita após uma refeição, mas isso não transforma a deficiência primária em uma doença “aguda”.','Início recente, especialmente após diarreia ou infecção, precisa ser revisto porque pode representar intolerância secundária e temporária.'],
  bilateral:['“Bilateral” não se aplica à intolerância à lactose: a lactase atua no revestimento do intestino delgado, não em um órgão par.','Use a orientação da intolerância primária somente se o diagnóstico-base estiver confirmado.'],
  chronic:['A forma primária costuma ser duradoura, mas “crônica” não cria um subtipo diferente. O objetivo é encontrar a menor redução de lactose que controle os sintomas sem prejudicar a nutrição.','Sintomas contínuos apesar da redução adequada exigem rever o diagnóstico e outras doenças intestinais.'],
  infectious:['Intolerância que aparece após infecção é secundária, não primária. Ela pode melhorar quando a mucosa intestinal se recupera.','Diarreia prolongada, febre, sangue nas fezes ou perda de peso não devem ser atribuídos automaticamente à lactose.'],
  severe:['O rótulo “grave” não confirma intolerância primária nem autoriza cuidados apenas em casa. Sintomas intensos, desidratação ou perda de peso exigem reavaliação presencial.','Urticária, inchaço ou falta de ar sugerem reação alérgica e precisam de atendimento imediato; intolerância à lactose não causa anafilaxia.'],
  idiopathic:['“Idiopática” não define uma nova forma. A intolerância primária costuma decorrer da redução da lactase com a idade; quando a causa não está clara, o diagnóstico precisa ser confirmado.','Não faça restrição ampla apenas porque a causa foi chamada de desconhecida.']
 };
 return map[row.kind];
}
function adapt(row,sections){
 const out=copySections(sections);
 const care=out.find(s=>s.title==='CUIDADOS EM CASA');
 const review=out.find(s=>s.title==='QUANDO REAVALIAR');
 if(care)care.items=[...qualifierItems(row),...care.items];
 if(review){
  if(row.kind==='infectious')review.items.unshift('Reavalie após a recuperação da infecção para decidir quando e como reintroduzir lactose; persistência exige investigação de outra causa.');
  if(row.kind==='acute')review.items.unshift('Início súbito ou sintomas novos exigem confirmar se há causa secundária, em vez de presumir intolerância primária aguda.');
  if(row.kind==='severe')review.items.unshift('A reavaliação deve ocorrer hoje; sinais de alarme exigem pronto atendimento imediato.');
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
 let sections=adapt(row,prior.sections);
 const urgent=row.alwaysUrgent||p.danger==='yes'||prior.mode==='urgent';
 if(row.alwaysUrgent&&!sections.some(s=>s.title==='ATENDIMENTO URGENTE'))sections.unshift({title:'ATENDIMENTO URGENTE',items:['O qualificador “grave” exige avaliação presencial hoje; esta ficha não autoriza alta domiciliar.','Procure pronto atendimento imediatamente diante de desidratação, sangue nas fezes, dificuldade para respirar, inchaço, desmaio, criança difícil de acordar ou dor abdominal intensa.']});
 const topic=topics.find(t=>t.key===row.key);
 const text='ORIENTAÇÕES AOS PAIS — '+topic.label+'\nFaixa etária: '+base.ages[age]+'\n\n'+sections.map((s,i)=>(i+1)+'. '+s.title+'\n'+s.items.map(x=>'• '+x).join('\n')).join('\n\n');
 return {...prior,ok:true,mode:urgent?'urgent':'guidance',topic:row.key,label:row.label,sections,refs:[...refs],text,warnings:urgent?['Necessidade de reavaliação urgente; esta ficha não autoriza alta.']:[],effectiveAgeBand:age,directedGuidance:false,termResolution:true,termAssessment:row.assessment};
}
function audit(){const old=base.audit(),issues=[...(old.issues||[])];for(const r of rows){const t=topics.find(x=>x.key===r.key);if(!t||t.label!==r.label||t.specificGuidance!==false||t.termResolution!==true||!refs.every(k=>base.sources[k]))issues.push('lactose-qualifier:'+r.key);}return {...old,ok:!issues.length,issues,topics:topics.length};}
root.PaisGuide={...base,topics,resolve,build,audit,lactosePrimaryQualifiers20261024:{keys:rows.map(r=>r.key),checked_at:'2026-10-24T12:00:00.000Z'}};
})(typeof window!=='undefined'?window:globalThis);
