(function(root){'use strict';
const base=root.PaisGuide;
const sourceAdditions={
 pais113_meningitis_ms:{name:'Ministério da Saúde: Meningite — sintomas, diagnóstico, tratamento e prevenção',url:'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/m/meningite'},
 pais113_meningitis_nice:{name:'NICE NG240: Bacterial meningitis and meningococcal disease',url:'https://www.nice.org.uk/guidance/ng240'},
 pais113_meningitis_rch:{name:'Royal Children’s Hospital: Meningitis and encephalitis guideline',url:'https://www.rch.org.au/clinicalguide/guideline_index/Meningitis_encephalitis/'},
 pais113_meningitis_contacts:{name:'Ministério da Saúde: Nota Técnica 97/2024 — quimioprofilaxia de contatos',url:'https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/notas-tecnicas/2024/nota-tecnica-no-97-2024-cgzv-deidt-svsa-ms'},
 pais113_meningitis_followup:{name:'NICE NG240: follow-up after bacterial meningitis',url:'https://www.nice.org.uk/guidance/ng240/chapter/Recommendations#follow-up-for-bacterial-meningitis'}
};
const sources={...base.sources,...sourceAdditions};
const refs=Object.keys(sourceAdditions);
const rows=[
 {key:'pdf1500_962',label:'Meningite bacteriana',kind:'base',specific:true,entity:'Meningite bacteriana pediátrica',assessment:'VALIDATED_AI: meningite bacteriana suspeita ou confirmada é emergência médica. Pode piorar rapidamente e exige avaliação hospitalar e antibiótico sem atraso quando indicado.'},
 {key:'pdf1500_963',label:'Meningite bacteriana agudo',kind:'acute',entity:'Meningite bacteriana; qualificador agudo redundante',assessment:'SOURCE_TERM_ISSUE: “agudo” é redundante e está em desacordo gramatical com meningite. Não define subtipo nem reduz a urgência; a suspeita de meningite bacteriana exige hospital imediatamente.'},
 {key:'pdf1500_964',label:'Meningite bacteriana bilateral',kind:'bilateral',entity:'Meningite bacteriana; bilateralidade anatomicamente inaplicável',assessment:'SOURCE_TERM_ISSUE: “bilateral” não se aplica às meninges e não define subtipo de meningite. O rótulo precisa ser corrigido sem atrasar a avaliação urgente.'},
 {key:'pdf1500_965',label:'Meningite bacteriana crônico',kind:'chronic',entity:'Síndrome de meningite persistente; causa não especificada',assessment:'SOURCE_TERM_ISSUE: “crônico” isolado não identifica agente nem causa. Meningite persistente pode ter etiologias diferentes; duração prolongada não autoriza manejo domiciliar nem confirma meningite bacteriana comum.'},
 {key:'pdf1500_966',label:'Meningite bacteriana de origem infecciosa',kind:'infectious',entity:'Meningite bacteriana; origem infecciosa tautológica',assessment:'SOURCE_TERM_ISSUE: “de origem infecciosa” é tautológico, pois meningite bacteriana é uma infecção. Não constitui entidade distinta e não muda a necessidade de tratamento hospitalar urgente.'},
 {key:'pdf1500_967',label:'Meningite bacteriana grave',kind:'severe',entity:'Meningite bacteriana com possível instabilidade, sepse ou comprometimento neurológico',assessment:'SOURCE_TERM_ISSUE: “grave” descreve estado clínico ou complicação, não subtipo. Toda suspeita já é urgente; choque, púrpura, convulsão ou alteração de consciência aumentam o risco imediato.'},
 {key:'pdf1500_968',label:'Meningite bacteriana idiopático',kind:'idiopathic',entity:'Meningite bacteriana com agente ainda não identificado; rótulo causal inadequado',assessment:'SOURCE_TERM_ISSUE: “idiopático” é incompatível com a definição infecciosa de meningite bacteriana. Agente ainda não identificado não torna a doença idiopática e não permite adiar tratamento.'}
];
const byKey=new Map(rows.map(r=>[r.key,r]));
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const byName=new Map(rows.map(r=>[norm(r.label),r]));
function inherited(fn){const current=root.PaisGuide;root.PaisGuide=base;try{return fn();}finally{root.PaisGuide=current;}}
function rowFor(v){return byKey.get(String(v||''))||byName.get(norm(v))||null;}
function qualifier(row){
 const map={
  base:['Meningite bacteriana é infecção das membranas que envolvem o cérebro e a medula. Pode piorar em poucas horas: vá ao hospital agora; não observe em casa.'],
  acute:['“Agudo” não cria uma doença diferente. A suspeita de meningite bacteriana já exige hospital imediatamente, mesmo no começo dos sintomas.'],
  bilateral:['“Bilateral” não se aplica às meninges. Confirme o diagnóstico no prontuário, mas não espere a correção do nome para procurar o hospital.'],
  chronic:['“Crônico” não informa a causa. Sintomas persistentes precisam de investigação especializada, e febre, piora neurológica ou prostração exigem hospital agora.'],
  infectious:['“De origem infecciosa” repete o significado de bacteriana e não muda a conduta: suspeita de meningite bacteriana é emergência.'],
  severe:['“Grave” descreve o estado da criança, não um subtipo. Confusão, choque, manchas roxas ou convulsão exigem atendimento de emergência imediato.'],
  idiopathic:['“Idiopático” não é adequado para uma infecção bacteriana. Não saber ainda qual bactéria causou o quadro não permite esperar pelo resultado antes do tratamento.']
 };
 return map[row.kind];
}
function sectionsFor(row,age){
 const infant=['u3m','3a5m','6a11m','1a'].includes(age);
 return [
  {title:'CUIDADOS EM CASA',items:[...qualifier(row),infant?'Em bebês, os sinais podem ser discretos: febre ou temperatura baixa, recusa das mamadas, irritabilidade ou choro diferente, sonolência, corpo molinho, vômitos, pausas na respiração ou moleira abaulada. A ausência de rigidez de nuca não tranquiliza.':'Os sinais podem incluir febre, dor de cabeça forte, rigidez ou dor no pescoço, incômodo com luz, vômitos, sonolência, confusão ou convulsão. Nem todos aparecem juntos.','Não deixe a criança sozinha e não espere surgir mancha na pele ou rigidez de nuca para buscar atendimento.']},
  {title:'MEDIDAS SEM REMÉDIOS',items:['Organize transporte imediato. Chame o SAMU 192 se a criança estiver difícil de acordar, convulsionando, com dificuldade para respirar, manchas roxas, extremidades frias ou piora rápida.','Durante convulsão, afaste objetos, proteja a cabeça, não segure os movimentos e não coloque nada na boca. Quando for seguro, vire a criança de lado.','Leve carteira de vacinação, lista de medicamentos, alergias e horário de início dos sintomas. Não force o pescoço nem tente confirmar o diagnóstico em casa.']},
  {title:'MEDICAMENTOS',items:['Não use antibiótico guardado ou de outra pessoa. No hospital, a equipe pode iniciar antibiótico na veia antes de todos os resultados; exames não devem atrasar o tratamento quando há suspeita.','Antitérmico ou analgésico previamente orientado pode aliviar desconforto, mas não trata a meningite, não prova melhora e nunca deve atrasar o hospital. Esta ficha não prescreve dose.','Antibiótico preventivo para contatos só é indicado pela equipe ou vigilância em situações específicas, como doença meningocócica ou alguns casos invasivos por Hib. Não faça profilaxia por conta própria.']},
  {title:'ALIMENTAÇÃO E LÍQUIDOS',items:['Não force comida, leite ou líquidos se a criança estiver sonolenta, confusa, convulsionando, vomitando repetidamente ou com dificuldade para engolir, pois há risco de aspiração.','Siga as instruções do serviço de emergência durante o transporte. Não atrase a saída para oferecer refeição ou preparar solução caseira.']},
  {title:'VOLTE IMEDIATAMENTE AO PRONTO ATENDIMENTO',items:['A orientação já é ir agora. Chame o SAMU 192 diante de manchas vermelhas ou roxas que não clareiam à pressão, dificuldade para acordar, confusão, convulsão, fraqueza, respiração difícil, pele fria, palidez intensa ou piora rápida.','Bebê com recusa das mamadas, choro persistente ou agudo, moleira abaulada, sonolência fora do habitual, pausas na respiração ou temperatura instável precisa de avaliação imediata.']},
  {title:'QUANDO REAVALIAR',items:['A primeira avaliação é hospitalar imediata. Após a alta, cumpra o retorno pediátrico combinado; a audição deve ser avaliada assim que a criança estiver bem o suficiente, preferencialmente antes da alta e no máximo em cerca de 4 semanas.','Confirme revisão pediátrica em 4 a 6 semanas e acompanhamento de audição, desenvolvimento, aprendizagem e comportamento conforme a equipe. Procure antes se houver nova febre, dor de cabeça, vômitos, sonolência ou qualquer perda de habilidade.','Mantenha vacinas atualizadas. Se houver suspeita de meningococo ou Hib, informe os contatos próximos e siga a vigilância; não feche escola nem medique contatos sem orientação oficial.']}
 ];
}
const topics=base.topics.map(t=>{const r=byKey.get(t.key);return r?{...t,generalGuidanceMode:false,catalogOnly:false,specificGuidance:r.specific===true,termResolution:r.specific!==true,sections:sectionsFor(r,'unknown'),refs:[...refs],clinicalEntity:r.entity,termAssessment:r.assessment,directedReview:'2026-10-24',urgency:true}:t;});
function resolve(v){const r=rowFor(v);if(r)return topics.find(t=>t.key===r.key);return inherited(()=>base.resolve(v));}
function build(input={}){
 const p=input&&typeof input==='object'?input:{},row=rowFor(p.diagnosis)||(()=>{const t=inherited(()=>base.resolve(p.diagnosis));return t&&byKey.get(t.key);})();
 if(!row)return inherited(()=>base.build(input));
 const age=p.age===undefined||p.age===null||p.age===''?'unknown':p.age;
 if(!Object.hasOwn(base.ages,age))return {ok:false,code:'AGE_INVALID',message:'Selecione uma faixa etária válida.'};
 const previous=inherited(()=>base.build({...p,diagnosis:row.key,age})); if(!previous?.ok)return previous;
 if(p.reviewed!==true&&p.danger!=='yes')return {ok:false,code:'REVIEW_REQUIRED',message:'Confirme a avaliação do diagnóstico pela equipe. O site não decide alta.'};
 let sections=[{title:'ATENDIMENTO URGENTE',items:['Suspeita de meningite bacteriana exige avaliação hospitalar imediata. Não observe em casa, não espere todos os sinais e não atrase o atendimento por causa desta orientação.']},...sectionsFor(row,age)];
 const clean=(v,n)=>typeof v==='string'?v.replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,n):'',notes=clean(p.notes,1400),plan=clean(p.returnPlan,200);
 if(notes)sections.push({title:'COMPLEMENTO DA CONSULTA',items:[notes]}); if(plan)sections.find(s=>s.title==='QUANDO REAVALIAR').items.push('Retorno combinado: '+plan);
 const text='ORIENTAÇÕES AOS PAIS — '+row.label+'\nFaixa etária: '+base.ages[age]+'\n\n'+sections.map((s,i)=>(i+1)+'. '+s.title+'\n'+s.items.map(x=>'• '+x).join('\n')).join('\n\n');
 return {...previous,ok:true,mode:'urgent',topic:row.key,label:row.label,sections,refs:[...refs],text,warnings:['Necessidade de avaliação hospitalar imediata; esta ficha não autoriza alta.'],effectiveAgeBand:age,directedGuidance:row.specific===true,termResolution:row.specific!==true,termAssessment:row.assessment};
}
function audit(){const old=inherited(()=>base.audit()),issues=[...(old.issues||[])];for(const r of rows){const t=topics.find(x=>x.key===r.key);if(!t||t.label!==r.label||t.specificGuidance!==(r.specific===true)||!refs.every(k=>sources[k]))issues.push('bacterial-meningitis:'+r.key);}return {...old,ok:!issues.length,issues,topics:topics.length};}
root.PaisGuide={...base,sources,topics,resolve,build,audit,bacterialMeningitis_20261024:{keys:rows.map(r=>r.key),checked_at:'2026-10-25T00:20:00.000Z'}};
})(typeof window!=='undefined'?window:globalThis);
