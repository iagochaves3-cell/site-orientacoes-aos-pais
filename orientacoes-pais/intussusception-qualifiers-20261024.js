(function(root){'use strict';
const base=root.PaisGuide;
const sourceAdditions={
 pais108_intussusception_chop:{name:'Intussusception — Children’s Hospital of Philadelphia',url:'https://www.chop.edu/conditions-diseases/intussusception'},
 pais108_intussusception_pathogens:{name:'Associations of Intussusception With Adenovirus, Rotavirus, and Other Pathogens — PubMed',url:'https://pubmed.ncbi.nlm.nih.gov/33060518/'}
};
const sources={...base.sources,...sourceAdditions};
const refs=['pais107_intussusception_rch','pais108_intussusception_chop','pais108_intussusception_pathogens'];
const rows=[
 {key:'pdf1500_921',label:'Intussuscepção intestinal de origem infecciosa',kind:'infectious',entity:'Intussuscepção intestinal com infecção recente ou concomitante; causalidade individual não demonstrada',assessment:'SOURCE_TERM_ISSUE: infecção viral recente é associação frequente, e adenovírus tem associação epidemiológica consistente, mas isso não prova “origem infecciosa” em uma criança nem cria subtipo para tratamento antimicrobiano automático.'},
 {key:'pdf1500_922',label:'Intussuscepção intestinal grave',kind:'severe',entity:'Intussuscepção intestinal com possível instabilidade, isquemia, perfuração ou peritonite',assessment:'SOURCE_TERM_ISSUE: “grave” descreve estado clínico ou complicação, não subtipo. Toda suspeita ileocólica exige avaliação rápida; choque, peritonite ou perfuração impedem redução por enema.'},
 {key:'pdf1500_923',label:'Intussuscepção intestinal idiopático',kind:'idiopathic',entity:'Intussuscepção intestinal sem ponto de invaginação identificado',assessment:'SOURCE_TERM_ISSUE: “idiopática” é descrição etiológica válida e frequente, mas o termo está em discordância gramatical e não representa doença autônoma; idade maior, recorrência ou apresentação atípica podem exigir investigação de ponto patológico.'},
 {key:'pdf1500_924',label:'Intussuscepção intestinal induzido por medicamentos',kind:'medication',entity:'Intussuscepção intestinal; atribuição a medicamento não estabelecida',assessment:'SOURCE_TERM_ISSUE: “induzida por medicamentos” não é categoria pediátrica estabelecida nas fontes revisadas. Relação temporal não comprova causalidade e não autoriza suspender tratamento prescrito.'},
 {key:'pdf1500_925',label:'Intussuscepção intestinal leve',kind:'mild',entity:'Intussuscepção intestinal com sintomas descritos como leves',assessment:'SOURCE_TERM_ISSUE: “leve” descreve intensidade percebida, não segurança. Intussuscepção ileoileal curta pode ter sintomas leves e resolver sob avaliação, mas isso depende de ultrassom e equipe; não pode ser inferido pelo nome.'},
 {key:'pdf1500_926',label:'Intussuscepção intestinal moderado',kind:'moderate',entity:'Intussuscepção intestinal com sintomas descritos como moderados',assessment:'SOURCE_TERM_ISSUE: “moderada” é qualificador de intensidade, não subtipo. Aparência intermediária não exclui obstrução, isquemia ou deterioração.'},
 {key:'pdf1500_927',label:'Intussuscepção intestinal não especificado',kind:'unspecified',entity:'Intussuscepção intestinal sem segmento, causa ou complicação especificados',assessment:'SOURCE_TERM_ISSUE: “não especificada” indica cadastro incompleto. A urgência permanece até definir localização, estabilidade, complicações e eventual ponto de invaginação.'}
];
const byKey=new Map(rows.map(r=>[r.key,r]));
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const byName=new Map(rows.map(r=>[norm(r.label),r]));
function inherited(fn){const current=root.PaisGuide;root.PaisGuide=base;try{return fn();}finally{root.PaisGuide=current;}}
function rowFor(v){return byKey.get(String(v||''))||byName.get(norm(v))||null;}
function qualifier(row){
 const map={
  infectious:['Uma infecção viral recente pode estar associada, mas não prova que a intussuscepção foi causada por infecção. Diarreia no início pode confundir o quadro com gastroenterite.','Não use antibiótico, antiviral ou antiparasitário por conta própria: tratar uma infecção não desfaz a obstrução intestinal.'],
  severe:['“Grave” descreve instabilidade ou complicação, não outra doença. Palidez intensa, prostração, barriga rígida/distendida, vômito verde, sangue nas fezes ou desmaio aumentam a urgência.','Choque, perfuração ou peritonite exigem ressuscitação e cirurgia; redução por enema pode ser contraindicada.'],
  idiopathic:['“Idiopática” significa que não foi identificado ponto causador, situação comum na faixa típica. Isso não reduz a urgência nem dispensa confirmação por imagem.','Em criança maior, recorrência ou apresentação atípica, a equipe pode investigar pólipo, divertículo de Meckel, linfoma ou outra causa estrutural.'],
  medication:['“Induzida por medicamentos” não é categoria pediátrica estabelecida. Informe todos os medicamentos e vacinas e os horários, mas não atribua causalidade nem suspenda prescrição por conta própria.','A avaliação e a redução da intussuscepção não devem ser atrasadas para investigar o produto usado.'],
  mild:['“Leve” não torna o quadro seguro para casa. A criança pode parecer bem entre crises e ainda haver obstrução.','Uma forma curta apenas de intestino delgado pode ter sintomas leves e se resolver, mas essa distinção depende de ultrassom e decisão da equipe; não pode ser feita pelo nome ou em casa.'],
  moderate:['“Moderada” descreve intensidade percebida, não subtipo. Aparência intermediária não exclui perda de irrigação, perfuração ou piora rápida.','Não espere a dor se tornar intensa nem fezes com sangue aparecerem para buscar atendimento.'],
  unspecified:['“Não especificada” significa que faltam dados sobre segmento, causa ou complicação. Isso não permite observação domiciliar.','Ultrassom e avaliação cirúrgica definem localização, possibilidade de redução e necessidade de investigar ponto causador.']
 };
 return map[row.kind];
}
function sectionsFor(row,age){
 const infant=['u3m','3a5m','6a11m','1a'].includes(age);
 return [
  {title:'CUIDADOS EM CASA',items:[...qualifier(row),'Intussuscepção é uma emergência em que um segmento do intestino entra dentro de outro. Vá agora ao pronto atendimento; a criança pode parecer bem entre crises e ainda assim haver obstrução.',infant?'No bebê, crises de choro, palidez, pernas encolhidas, recusa de mamadas, vômitos ou moleza/sonolência isolada são sinais importantes.':'Dor em crises, palidez, vômitos ou prostração são sinais importantes. Fezes com sangue e muco são tardias e podem não ocorrer.']},
  {title:'MEDIDAS SEM REMÉDIOS',items:['Não massageie a barriga, não tente reduzir o intestino e não faça enema ou lavagem intestinal.','Mantenha a criança acompanhada, anote início e frequência das crises e leve exames e lista de produtos usados; não atrase a ida para observar outra crise.']},
  {title:'MEDICAMENTOS',items:['Não dê laxante, antidiarreico, antibiótico, analgésico extra ou remédio caseiro para tentar resolver. Redução por enema guiado ou cirurgia só pode ser feita no hospital.',row.kind==='medication'?'Não suspenda medicamento prescrito apenas pela coincidência de tempo; leve a embalagem para avaliação.':'Medicamentos não substituem a avaliação por imagem e a equipe cirúrgica.']},
  {title:'ALIMENTAÇÃO E LÍQUIDOS',items:['Não ofereça comida ou bebida até avaliação da emergência, salvo orientação direta da equipe, pois podem ser necessários sedação, enema terapêutico ou cirurgia.']},
  {title:'VOLTE IMEDIATAMENTE AO PRONTO ATENDIMENTO',items:['A orientação já é ir imediatamente. Acione emergência se houver desmaio, dificuldade para acordar, respiração alterada, barriga muito distendida ou rígida, vômito verde, sangue nas fezes, palidez intensa ou sinais de choque.','Atraso pode levar a obstrução, perda de irrigação do intestino, perfuração, infecção abdominal e choque.']},
  {title:'QUANDO REAVALIAR',items:['A avaliação é agora, com ultrassom e equipe cirúrgica conforme o serviço. Após tratamento, volte imediatamente se dor em crises, vômitos, palidez ou prostração retornarem, especialmente nas primeiras 24–48 horas.']}
 ];
}
const topics=base.topics.map(t=>{const r=byKey.get(t.key);return r?{...t,generalGuidanceMode:false,catalogOnly:false,specificGuidance:false,termResolution:true,sections:sectionsFor(r,'unknown'),refs:[...refs],clinicalEntity:r.entity,termAssessment:r.assessment,directedReview:'2026-10-24'}:t;});
function resolve(v){const r=rowFor(v);if(r)return topics.find(t=>t.key===r.key);return inherited(()=>base.resolve(v));}
function build(input={}){
 const p=input&&typeof input==='object'?input:{},row=rowFor(p.diagnosis)||(()=>{const t=inherited(()=>base.resolve(p.diagnosis));return t&&byKey.get(t.key);})();if(!row)return inherited(()=>base.build(input));
 const age=p.age===undefined||p.age===null||p.age===''?'unknown':p.age;if(!Object.hasOwn(base.ages,age))return {ok:false,code:'AGE_INVALID',message:'Selecione uma faixa etária válida.'};
 const previous=inherited(()=>base.build({...p,diagnosis:row.key,age}));if(!previous?.ok)return previous;if(p.reviewed!==true&&p.danger!=='yes')return {ok:false,code:'REVIEW_REQUIRED',message:'Confirme a avaliação do diagnóstico pela equipe. O site não decide alta.'};
 let sections=[{title:'ATENDIMENTO URGENTE',items:['Esta condição exige avaliação imediata; esta ficha não autoriza observação ou alta domiciliar.']},...sectionsFor(row,age)];
 const clean=(v,n)=>typeof v==='string'?v.replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,n):'',notes=clean(p.notes,1400),plan=clean(p.returnPlan,200);if(notes)sections.push({title:'COMPLEMENTO DA CONSULTA',items:[notes]});if(plan)sections.find(s=>s.title==='QUANDO REAVALIAR').items.push('Retorno combinado: '+plan);
 const text='ORIENTAÇÕES AOS PAIS — '+row.label+'\nFaixa etária: '+base.ages[age]+'\n\n'+sections.map((s,i)=>(i+1)+'. '+s.title+'\n'+s.items.map(x=>'• '+x).join('\n')).join('\n\n');
 return {...previous,ok:true,mode:'urgent',topic:row.key,label:row.label,sections,refs:[...refs],text,warnings:['Necessidade de avaliação urgente; esta ficha não autoriza alta.'],effectiveAgeBand:age,directedGuidance:false,termResolution:true,termAssessment:row.assessment};
}
function audit(){const old=inherited(()=>base.audit()),issues=[...(old.issues||[])];for(const r of rows){const t=topics.find(x=>x.key===r.key);if(!t||t.label!==r.label||t.specificGuidance!==false||t.termResolution!==true||!refs.every(k=>sources[k]))issues.push('intussusception-qualifiers:'+r.key);}return {...old,ok:!issues.length,issues,topics:topics.length};}
root.PaisGuide={...base,sources,topics,resolve,build,audit,intussusceptionQualifiers_20261024:{keys:rows.map(r=>r.key),checked_at:'2026-10-24T17:48:31.000Z'}};
})(typeof window!=='undefined'?window:globalThis);
