(function(root){'use strict';
const base=root.PaisGuide;
const sourceAdditions={
 pais112_hirsch_apsa:{name:'APSA: Hirschsprung Disease — parent resource',url:'https://apsapedsurg.org/parents/learn-about-a-condition/f-o/'},
 pais112_hirsch_ernica:{name:'Updated ERNICA guidelines for rectosigmoid Hirschsprung disease (2025)',url:'https://pubmed.ncbi.nlm.nih.gov/42057764/'},
 pais112_hirsch_nomenclature:{name:'APSA review: nomenclature for long-segment Hirschsprung disease',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC8552809/'}
};
const sources={...base.sources,...sourceAdditions};
const refs=['pais111_hirsch_niddk','pais111_hirsch_treatment_niddk','pais112_hirsch_apsa','pais112_hirsch_ernica','pais112_hirsch_nomenclature'];
const rows=[
 {key:'pdf1500_949',label:'Megacólon congênito (Doença de Hirschsprung) agudo',kind:'acute',urgent:true,entity:'Doença de Hirschsprung com possível obstrução ou enterocolite aguda',assessment:'SOURCE_TERM_ISSUE: “agudo” não é subtipo de Hirschsprung. Sintomas agudos podem indicar obstrução, perfuração ou enterocolite associada e exigem avaliação hospitalar imediata.'},
 {key:'pdf1500_950',label:'Megacólon congênito (Doença de Hirschsprung) bilateral',kind:'bilateral',entity:'Doença de Hirschsprung; bilateralidade é anatomicamente inaplicável',assessment:'SOURCE_TERM_ISSUE: “bilateral” não se aplica à aganglionose intestinal e não define subtipo. A extensão válida é descrita pelo segmento intestinal sem células ganglionares.'},
 {key:'pdf1500_951',label:'Megacólon congênito (Doença de Hirschsprung) crônico Megacólon congênito (Doença de Hirschsprung) de origem',kind:'malformed',entity:'Doença de Hirschsprung; rótulo concatenado e etiologia incompleta',assessment:'SOURCE_TERM_ISSUE: o cadastro concatena “crônico” com “de origem” sem completar a causa. Hirschsprung é congênita; sintomas crônicos não criam etiologia nova.'},
 {key:'pdf1500_952',label:'infecciosa',kind:'infectious',urgent:true,entity:'Fragmento de rótulo possivelmente ligado à enterocolite associada a Hirschsprung',assessment:'SOURCE_TERM_ISSUE: “infecciosa” é fragmento órfão, não diagnóstico independente. Hirschsprung não tem origem infecciosa; enterocolite é complicação potencialmente fatal antes ou depois da cirurgia.'},
 {key:'pdf1500_953',label:'Megacólon congênito (Doença de Hirschsprung) grave',kind:'severe',urgent:true,entity:'Doença de Hirschsprung com possível enterocolite, obstrução, perfuração ou instabilidade',assessment:'SOURCE_TERM_ISSUE: “grave” descreve estado clínico/complicação, não subtipo. Pode corresponder a enterocolite, obstrução, perfuração ou choque e não autoriza alta domiciliar.'},
 {key:'pdf1500_954',label:'Megacólon congênito (Doença de Hirschsprung) idiopático Megacólon congênito (Doença de Hirschsprung) induzido por',kind:'idiopathic_medication',entity:'Doença de Hirschsprung; rótulo concatenado com causalidade incompleta',assessment:'SOURCE_TERM_ISSUE: Hirschsprung é aganglionose congênita, não doença idiopática nem induzida por medicamento. O rótulo está concatenado e incompleto; não permite atribuir causalidade.'},
 {key:'pdf1500_955',label:'medicamentos',kind:'medications',entity:'Fragmento de rótulo sem entidade clínica autônoma',assessment:'SOURCE_TERM_ISSUE: “medicamentos” isolado não é diagnóstico. Fármacos podem causar constipação ou íleo, mas não criam doença de Hirschsprung; não suspenda prescrição nem use esta ficha como diagnóstico.'},
 {key:'pdf1500_956',label:'Megacólon congênito (Doença de Hirschsprung) leve',kind:'mild',entity:'Doença de Hirschsprung com sintomas descritos como leves',assessment:'SOURCE_TERM_ISSUE: “leve” não é subtipo validado nem garante segurança. Aparência estável não exclui obstrução ou enterocolite, especialmente em lactentes.'},
 {key:'pdf1500_957',label:'Megacólon congênito (Doença de Hirschsprung) moderado Megacólon congênito (Doença de Hirschsprung) não',kind:'moderate_malformed',entity:'Doença de Hirschsprung; rótulo de intensidade concatenado e incompleto',assessment:'SOURCE_TERM_ISSUE: “moderado” descreve intensidade, não subtipo, e o fragmento final “não” torna o cadastro incompleto. A conduta depende de sintomas, extensão e complicações.'},
 {key:'pdf1500_958',label:'especificado',kind:'specified',entity:'Fragmento de rótulo sem diagnóstico autônomo',assessment:'SOURCE_TERM_ISSUE: “especificado” isolado é fragmento de cadastro e não contém doença, extensão ou complicação. É obrigatório confirmar o diagnóstico pretendido.'},
 {key:'pdf1500_959',label:'Megacólon congênito (Doença de Hirschsprung) recorrente',kind:'recurrent',entity:'Doença de Hirschsprung com sintomas ou enterocolite recorrentes',assessment:'SOURCE_TERM_ISSUE: a doença congênita não “recorre”; podem recorrer enterocolite, constipação ou sintomas obstrutivos após tratamento. É preciso nomear a complicação e investigar causa.'},
 {key:'pdf1500_960',label:'Megacólon congênito (Doença de Hirschsprung) refratário',kind:'refractory',entity:'Doença de Hirschsprung com sintomas persistentes após tratamento',assessment:'SOURCE_TERM_ISSUE: “refratário” não é subtipo anatômico. Sintomas persistentes exigem avaliação de obstrução mecânica/funcional, enterocolite, constipação e outros diagnósticos antes de mudar tratamento.'},
 {key:'pdf1500_961',label:'Megacólon congênito (Doença de Hirschsprung) unilateral',kind:'unilateral',entity:'Doença de Hirschsprung; unilateralidade é anatomicamente inaplicável',assessment:'SOURCE_TERM_ISSUE: “unilateral” não se aplica à aganglionose intestinal. A extensão é definida por segmentos do intestino, não por lado do corpo.'}
];
const byKey=new Map(rows.map(r=>[r.key,r]));
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const byName=new Map(rows.map(r=>[norm(r.label),r]));
function inherited(fn){const current=root.PaisGuide;root.PaisGuide=base;try{return fn();}finally{root.PaisGuide=current;}}
function rowFor(v){return byKey.get(String(v||''))||byName.get(norm(v))||null;}
function qualifier(row){
 const map={
  acute:['“Agudo” não é uma forma diferente de Hirschsprung. Distensão, vômitos, febre, diarreia explosiva, sangramento, prostração ou parada de fezes/gases podem indicar obstrução ou enterocolite.','A orientação é avaliação hospitalar imediata; não espere o quadro “passar”.'],
  bilateral:['“Bilateral” não se aplica ao intestino e não define extensão. Os subtipos válidos descrevem até onde vai o segmento sem células nervosas.','Confirme no laudo se a doença é de segmento curto, longo, colônica total ou outra extensão anatômica.'],
  malformed:['O nome foi concatenado e terminou em “de origem” sem completar a causa. Hirschsprung é congênita, embora constipação e outros sintomas possam ser crônicos.','Não use o rótulo incompleto para decidir dieta, remédio ou cirurgia; confirme o diagnóstico e a extensão no laudo.'],
  infectious:['“Infecciosa” isolado não é diagnóstico e Hirschsprung não é causada por infecção. Enterocolite associada é uma complicação urgente.','Febre, barriga inchada, diarreia aquosa/explosiva, vômitos, falta de energia, sangramento ou choque exigem hospital agora.'],
  severe:['“Grave” descreve possível complicação, não um subtipo. Enterocolite, obstrução, perfuração e choque precisam de hospital.','Esta ficha não autoriza alta ou observação em casa; siga imediatamente o encaminhamento da equipe.'],
  idiopathic_medication:['Hirschsprung é congênita por ausência de células nervosas em parte do intestino; não é uma doença idiopática nem induzida por medicamento.','O nome está concatenado e incompleto. Confirme o diagnóstico pretendido antes de associar causa ou tratamento.'],
  medications:['“Medicamentos” isolado não é diagnóstico. Alguns fármacos podem causar constipação ou íleo, mas não causam Hirschsprung.','Não suspenda nem repita medicamento por conta própria. Leve lista, doses, horários e embalagens para a revisão do diagnóstico.'],
  mild:['“Leve” descreve aparência ou sintomas atuais, não um subtipo seguro. Bebês podem piorar rapidamente com obstrução ou enterocolite.','Mesmo sem sinais de perigo, mantenha o seguimento com cirurgia pediátrica e o plano de irrigação/evacuação já prescrito.'],
  moderate_malformed:['“Moderado” descreve intensidade, não subtipo, e o fragmento final torna o rótulo incompleto.','Confirme extensão, situação após cirurgia e presença de obstrução ou enterocolite; não derive conduta do cadastro.'],
  specified:['“Especificado” isolado não contém um diagnóstico. Confirme qual doença, extensão e complicação foram pretendidas antes de entregar orientação.','Se a criança tem diagnóstico confirmado de Hirschsprung, use a ficha principal e o plano da cirurgia; se não, não presuma essa associação.'],
  recurrent:['A doença congênita não “recorre”; podem voltar enterocolite, constipação ou sintomas obstrutivos.','Episódios repetidos exigem nomear a complicação e reavaliar anatomia, função intestinal e tratamento com a equipe especializada.'],
  refractory:['“Refratário” não é subtipo anatômico. Sintomas persistentes após cirurgia podem ter causa mecânica, funcional, enterocolite ou constipação.','Não aumente laxante, irrigação ou antibiótico por conta própria; a equipe precisa investigar a causa antes de mudar o tratamento.'],
  unilateral:['“Unilateral” não se aplica ao intestino. A extensão de Hirschsprung é definida pelo segmento sem células ganglionares, não por lado.','Confirme a extensão anatômica no laudo e mantenha o plano individual da cirurgia pediátrica.']
 };
 return map[row.kind];
}
function sectionsFor(row,age){
 const infant=['u3m','3a5m','6a11m','1a'].includes(age);
 return [
  {title:'CUIDADOS EM CASA',items:[...qualifier(row),'Observe evacuações, gases, distensão, vômitos, febre, diarreia, energia, alimentação e urina. Se houver estoma, observe cor, pele e débito conforme o plano da equipe.']},
  {title:'MEDIDAS SEM REMÉDIOS',items:['Faça irrigação retal somente se foi ensinada e prescrita pela equipe de cirurgia. Não use termômetro retal, supositório, enema, estimulação anal ou massagem forte para “desobstruir”.','Registre horários, evacuações, temperatura e sintomas. Leve laudos e o plano cirúrgico nas reavaliações.']},
  {title:'MEDICAMENTOS',items:[row.kind==='medications'?'Não suspenda medicamento prescrito apenas pela coincidência de tempo; peça revisão médica/farmacêutica do produto e da indicação.':'Use apenas laxantes, antibióticos, analgésicos ou outros medicamentos prescritos para esta criança.','Não repita antibiótico ou plano antigo diante de febre, diarreia, vômitos ou barriga inchada; enterocolite precisa de avaliação hospitalar.']},
  {title:'ALIMENTAÇÃO E LÍQUIDOS',items:[infant?'Mantenha leite materno ou fórmula conforme o plano da equipe; não dilua fórmula nem substitua mamadas por chá ou água.':'Ofereça alimentação e líquidos adequados à idade conforme aceitação e orientação da equipe; não imponha dieta especial pelo rótulo.','Vômito verde, recusa persistente, barriga aumentando, menos urina ou perda de peso exigem avaliação.']},
  {title:'VOLTE IMEDIATAMENTE AO PRONTO ATENDIMENTO',items:['Barriga inchando, febre, diarreia aquosa ou explosiva, vômitos, falta de energia, sangramento retal, vômito verde, dor intensa, choque ou incapacidade de eliminar fezes/gases exigem hospital imediatamente.','Enterocolite associada a Hirschsprung pode ocorrer antes ou depois da cirurgia e pode ser fatal.']},
  {title:'QUANDO REAVALIAR',items:[row.kind==='recurrent'?'Episódios repetidos devem ser revistos com cirurgia pediátrica/gastroenterologia mesmo que melhorem entre eles.':row.kind==='refractory'?'Sintomas persistentes exigem revisão especializada antes de intensificar tratamento.':'Cumpra os retornos com cirurgia pediátrica e procure antes se constipação, escapes, distensão, vômitos, baixo ganho de peso ou problema no estoma surgirem.','Confirme e corrija o rótulo no prontuário; a condição não é contagiosa. Escola/creche deve conhecer acesso ao banheiro, cuidados do estoma e sinais de enterocolite.']}
 ];
}
const topics=base.topics.map(t=>{const r=byKey.get(t.key);return r?{...t,generalGuidanceMode:false,catalogOnly:false,specificGuidance:false,termResolution:true,sections:sectionsFor(r,'unknown'),refs:[...refs],clinicalEntity:r.entity,termAssessment:r.assessment,directedReview:'2026-10-24'}:t;});
function resolve(v){const r=rowFor(v);if(r)return topics.find(t=>t.key===r.key);return inherited(()=>base.resolve(v));}
function build(input={}){
 const p=input&&typeof input==='object'?input:{},row=rowFor(p.diagnosis)||(()=>{const t=inherited(()=>base.resolve(p.diagnosis));return t&&byKey.get(t.key);})();
 if(!row)return inherited(()=>base.build(input));
 const age=p.age===undefined||p.age===null||p.age===''?'unknown':p.age;
 if(!Object.hasOwn(base.ages,age))return {ok:false,code:'AGE_INVALID',message:'Selecione uma faixa etária válida.'};
 const previous=inherited(()=>base.build({...p,diagnosis:row.key,age}));
 if(!previous?.ok)return previous;
 if(p.reviewed!==true&&p.danger!=='yes')return {ok:false,code:'REVIEW_REQUIRED',message:'Confirme a avaliação do diagnóstico pela equipe. O site não decide alta.'};
 const urgent=row.urgent||p.danger==='yes'||previous.mode==='urgent';
 let sections=sectionsFor(row,age);
 if(urgent)sections=[{title:'ATENDIMENTO URGENTE',items:['Este rótulo pode ocultar obstrução ou enterocolite: procure avaliação hospitalar imediatamente; esta ficha não autoriza alta domiciliar.']},...sections];
 const clean=(v,n)=>typeof v==='string'?v.replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,n):'',notes=clean(p.notes,1400),plan=clean(p.returnPlan,200);
 if(notes)sections.push({title:'COMPLEMENTO DA CONSULTA',items:[notes]});
 if(plan)sections.find(s=>s.title==='QUANDO REAVALIAR').items.push('Retorno combinado: '+plan);
 const text='ORIENTAÇÕES AOS PAIS — '+row.label+'\nFaixa etária: '+base.ages[age]+'\n\n'+sections.map((s,i)=>(i+1)+'. '+s.title+'\n'+s.items.map(x=>'• '+x).join('\n')).join('\n\n');
 return {...previous,ok:true,mode:urgent?'urgent':'guidance',topic:row.key,label:row.label,sections,refs:[...refs],text,warnings:urgent?['Necessidade de avaliação urgente; esta ficha não autoriza alta.']:[],effectiveAgeBand:age,directedGuidance:false,termResolution:true,termAssessment:row.assessment};
}
function audit(){const old=inherited(()=>base.audit()),issues=[...(old.issues||[])];for(const r of rows){const t=topics.find(x=>x.key===r.key);if(!t||t.label!==r.label||t.specificGuidance!==false||t.termResolution!==true||!refs.every(k=>sources[k]))issues.push('hirschsprung-qualifiers:'+r.key);}return {...old,ok:!issues.length,issues,topics:topics.length};}
root.PaisGuide={...base,sources,topics,resolve,build,audit,hirschsprungQualifiers_20261024:{keys:rows.map(r=>r.key),checked_at:'2026-10-24T23:05:00.000Z'}};
})(typeof window!=='undefined'?window:globalThis);
