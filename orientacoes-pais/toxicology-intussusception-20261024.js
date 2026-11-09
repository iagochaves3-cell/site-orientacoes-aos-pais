(function(root){'use strict';
const base=root.PaisGuide;
const sourceAdditions={
 pais107_iron_rch:{name:'Clinical Practice Guidelines: Iron poisoning — Royal Children’s Hospital Melbourne',url:'https://www.rch.org.au/clinicalguide/guideline_index/Iron_Poisoning/'},
 pais107_paracetamol_rch:{name:'Clinical Practice Guidelines: Paracetamol poisoning — Royal Children’s Hospital Melbourne',url:'https://www.rch.org.au/clinicalguide/guideline_index/paracetamol_poisoning/'},
 pais107_saneantes_anvisa:{name:'Orientações para os consumidores de saneantes — Anvisa',url:'https://www.gov.br/anvisa/pt-br/centraisdeconteudo/publicacoes/saneantes/orientacoes-para-os-consumidores-de-saneantes.pdf'},
 pais107_intussusception_rch:{name:'Clinical Practice Guidelines: Intussusception — Royal Children’s Hospital Melbourne',url:'https://www.rch.org.au/clinicalguide/guideline_index/intussusception/'}
};
const sources={...base.sources,...sourceAdditions};
const refsByKind={iron:['pais107_iron_rch','pais102_poison_anvisa'],paracetamol:['pais107_paracetamol_rch','pais102_poison_anvisa'],cleaners:['pais107_saneantes_anvisa','pais102_poison_anvisa'],intussusception:['pais107_intussusception_rch']};
const rows=[
 {key:'pdf1500_914',label:'Intoxicação por ferro',specific:true,kind:'iron',entity:'Intoxicação aguda por ferro',assessment:'VALIDATED_AI: exposição ao ferro é emergência toxicológica; risco depende do ferro elementar ingerido e sintomas podem apresentar melhora aparente antes de deterioração.'},
 {key:'pdf1500_915',label:'Intoxicação por paracetamol',specific:true,kind:'paracetamol',entity:'Intoxicação aguda por paracetamol',assessment:'VALIDATED_AI: intoxicação tempo-dependente; lesão hepática pode surgir tardiamente e a ausência inicial de sintomas não exclui risco.'},
 {key:'pdf1500_916',label:'Intoxicação por saneantes domésticos',specific:true,kind:'cleaners',entity:'Intoxicação ou exposição relevante a saneantes domésticos',assessment:'VALIDATED_AI: orientação depende do produto e da via de exposição; não provocar vômito, não neutralizar e levar o rótulo para avaliação.'},
 {key:'pdf1500_917',label:'Intussuscepção intestinal',specific:true,kind:'intussusception',entity:'Intussuscepção intestinal pediátrica',assessment:'VALIDATED_AI: emergência obstrutiva; apresentação pode ser intermitente e a criança pode parecer bem entre episódios.'},
 {key:'pdf1500_918',label:'Intussuscepção intestinal agudo',specific:false,kind:'intussusception',entity:'Intussuscepção intestinal; condição aguda por definição clínica',assessment:'SOURCE_TERM_ISSUE: “agudo” é redundante e discorda gramaticalmente do termo feminino “intussuscepção”; não representa nova entidade.'},
 {key:'pdf1500_919',label:'Intussuscepção intestinal bilateral',specific:false,kind:'intussusception',entity:'Intussuscepção intestinal; bilateralidade anatomicamente inaplicável',assessment:'SOURCE_TERM_ISSUE: “bilateral” não se aplica a uma invaginação de segmento intestinal e não define subtipo clínico.'},
 {key:'pdf1500_920',label:'Intussuscepção intestinal crônico',specific:false,kind:'intussusception',entity:'Intussuscepção intestinal com curso descrito como crônico ou recorrente; qualificador incompleto',assessment:'SOURCE_TERM_ISSUE: “crônico” é qualificador atípico e gramaticalmente inadequado; sintomas intermitentes ou recorrentes ainda exigem avaliação urgente.'}
];
const byKey=new Map(rows.map(r=>[r.key,r]));
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const byName=new Map(rows.map(r=>[norm(r.label),r]));
function inherited(fn){const current=root.PaisGuide;root.PaisGuide=base;try{return fn();}finally{root.PaisGuide=current;}}
function rowFor(v){return byKey.get(String(v||''))||byName.get(norm(v))||null;}
function poisonSections(row){
 const ciatox='Ligue agora para o Disque-Intoxicação 0800 722 6001 e siga a orientação do CIATox; se houver sintomas, quantidade desconhecida, ingestão intencional ou piora, vá imediatamente ao pronto atendimento.';
 const commonAlarm='Sonolência incomum, confusão, desmaio, convulsão, dificuldade para respirar, lábios arroxeados, vômitos repetidos, sangue em vômito ou fezes, dor forte, palidez intensa ou piora rápida exigem emergência imediata.';
 if(row.kind==='iron')return [
  {title:'CUIDADOS EM CASA',items:['Isto é uma emergência toxicológica. Não espere aparecerem sintomas e não se tranquilize com melhora aparente: intoxicações importantes podem piorar depois de um intervalo sem sintomas.',ciatox,'Separe a embalagem. Informe nome e concentração do produto, número aproximado de comprimidos, horário e peso da criança; o risco é calculado pelo ferro elementar, não apenas pelo peso total do comprimido.']},
  {title:'MEDIDAS SEM REMÉDIOS',items:['Retire restos visíveis da boca sem provocar vômito. Mantenha a criança acompanhada e leve todas as embalagens ao atendimento.','Não tente carvão ativado, neutralização ou receita caseira: o carvão não liga o ferro de forma útil.']},
  {title:'MEDICAMENTOS',items:['Não dê nova dose de ferro, laxante, antiácido, carvão ativado ou antídoto por conta própria. Tratamento e exames dependem da avaliação toxicológica e hospitalar.']},
  {title:'ALIMENTAÇÃO E LÍQUIDOS',items:['Não force alimentos, leite ou líquidos para “diluir”. Siga a orientação do CIATox ou da emergência, pois podem ser necessários exames e procedimentos.']},
  {title:'VOLTE IMEDIATAMENTE AO PRONTO ATENDIMENTO',items:[commonAlarm,'Dor abdominal, diarreia, vômitos, sangue, prostração ou qualquer suspeita de quantidade relevante/desconhecida exigem atendimento imediato, mesmo que a criança pareça melhor depois.']},
  {title:'QUANDO REAVALIAR',items:['A reavaliação é agora, pelo CIATox e serviço de urgência. Depois da alta hospitalar, cumpra exatamente o retorno e os exames definidos pela equipe.']}
 ];
 if(row.kind==='paracetamol')return [
  {title:'CUIDADOS EM CASA',items:['Isto é uma emergência toxicológica tempo-dependente. Não espere sintomas: muitas crianças parecem bem no início, enquanto a lesão do fígado pode aparecer mais tarde.',ciatox,'Leve todas as embalagens e informe apresentação, concentração, quantidade, horário e todos os produtos combinados usados. Ingestão intencional exige emergência e supervisão contínua.']},
  {title:'MEDIDAS SEM REMÉDIOS',items:['Retire restos visíveis da boca sem provocar vômito. Não atrase o atendimento para observar em casa ou tentar calcular sozinho se a dose foi segura.']},
  {title:'MEDICAMENTOS',items:['Não dê mais paracetamol nem outro produto que possa contê-lo até orientação profissional. Não use antídoto, carvão ativado ou receita caseira por conta própria.']},
  {title:'ALIMENTAÇÃO E LÍQUIDOS',items:['Não force comida ou bebida. Siga o CIATox ou a emergência, porque o horário de exames e tratamento é decisivo.']},
  {title:'VOLTE IMEDIATAMENTE AO PRONTO ATENDIMENTO',items:[commonAlarm,'Náusea, dor abdominal, suor, palidez, pele ou olhos amarelados, urina escura ou sangramento exigem emergência; a ausência desses sinais não permite esperar.']},
  {title:'QUANDO REAVALIAR',items:['A reavaliação é imediata. Depois da alta, cumpra os exames e o retorno definidos; não reinicie paracetamol antes da liberação da equipe.']}
 ];
 return [
  {title:'CUIDADOS EM CASA',items:['Afaste a criança e outras pessoas do produto e do ambiente contaminado. Não provoque vômito e não tente neutralizar ou misturar produtos.',ciatox,'Leve o rótulo ou uma foto legível da embalagem e informe produto, via de contato, horário e sintomas. Não transfira saneante para garrafa de bebida.']},
  {title:'MEDIDAS SEM REMÉDIOS',items:['Nos olhos ou na pele, retire roupa contaminada e lave imediatamente com bastante água corrente. Se houve inalação, vá para local arejado sem se expor ao produto.','Não ofereça nada pela boca a criança sonolenta, convulsionando ou com dificuldade para engolir. Para ingestão, siga apenas o rótulo, CIATox ou equipe de emergência.']},
  {title:'MEDICAMENTOS',items:['Não dê remédio, carvão ativado, antiácido ou receita caseira por conta própria. O tratamento depende do produto e da via de exposição.']},
  {title:'ALIMENTAÇÃO E LÍQUIDOS',items:['Não force leite, água, suco ou alimento para “diluir”. Aguarde orientação específica do CIATox ou serviço de emergência.']},
  {title:'VOLTE IMEDIATAMENTE AO PRONTO ATENDIMENTO',items:[commonAlarm,'Tosse persistente, chiado, engasgo, salivação intensa, dificuldade para engolir, queimadura de boca/pele/olhos, dor intensa ou alteração visual exigem emergência imediata.']},
  {title:'QUANDO REAVALIAR',items:['A reavaliação é imediata pelo CIATox; sintomas respiratórios, oculares ou digestivos podem exigir observação hospitalar. Cumpra o retorno definido pela equipe.']}
 ];
}
function intussusceptionSections(row,age){
 const infant=['u3m','3a5m','6a11m','1a'].includes(age),term=row.specific?[]:[row.assessment.replace('SOURCE_TERM_ISSUE: ','')];
 return [
  {title:'CUIDADOS EM CASA',items:[...term,'Intussuscepção é uma emergência em que um segmento do intestino entra dentro de outro. Vá agora ao pronto atendimento; a criança pode parecer bem entre crises e ainda assim haver obstrução.','Crises de dor ou choro súbito, palidez, pernas encolhidas, vômitos ou '+(infant?'moleza/sonolência incomum no bebê':'prostração ou sonolência incomum')+' são sinais compatíveis. Fezes com sangue e muco são sinal tardio e podem não ocorrer.']},
  {title:'MEDIDAS SEM REMÉDIOS',items:['Não massageie a barriga e não tente reduzir o intestino. Não faça enema, lavagem intestinal ou exercício.','Mantenha a criança acompanhada, anote o início e a frequência das crises e leve exames anteriores; não atrase a ida para observar outra crise.']},
  {title:'MEDICAMENTOS',items:['Não dê laxante, antidiarreico, antibiótico, analgésico extra ou remédio caseiro para tentar resolver. Redução por enema guiado ou cirurgia só pode ser feita no hospital.']},
  {title:'ALIMENTAÇÃO E LÍQUIDOS',items:['Não ofereça comida ou bebida até avaliação da emergência, salvo orientação direta da equipe, porque podem ser necessários sedação, enema terapêutico ou cirurgia.']},
  {title:'VOLTE IMEDIATAMENTE AO PRONTO ATENDIMENTO',items:['A orientação já é ir imediatamente. Acione emergência se houver desmaio, dificuldade para acordar, respiração alterada, barriga muito distendida/rija, vômito verde, sangue nas fezes, palidez intensa ou sinais de choque.','Atraso pode levar a perda de irrigação do intestino, perfuração, infecção abdominal e choque.']},
  {title:'QUANDO REAVALIAR',items:['A avaliação é agora, com ultrassom e equipe cirúrgica conforme o serviço. Após tratamento, volte imediatamente se dor em crises, vômitos, palidez ou prostração retornarem, especialmente nas primeiras 24–48 horas.']}
 ];
}
function sectionsFor(row,age){return row.kind==='intussusception'?intussusceptionSections(row,age):poisonSections(row);}
const topics=base.topics.map(t=>{const r=byKey.get(t.key);return r?{...t,generalGuidanceMode:false,catalogOnly:false,specificGuidance:r.specific,termResolution:!r.specific,sections:sectionsFor(r,'unknown'),refs:[...refsByKind[r.kind]],clinicalEntity:r.entity,termAssessment:r.assessment,directedReview:'2026-10-24'}:t;});
function resolve(v){const r=rowFor(v);if(r)return topics.find(t=>t.key===r.key);return inherited(()=>base.resolve(v));}
function build(input={}){
 const p=input&&typeof input==='object'?input:{},row=rowFor(p.diagnosis)||(()=>{const t=inherited(()=>base.resolve(p.diagnosis));return t&&byKey.get(t.key);})();if(!row)return inherited(()=>base.build(input));
 const age=p.age===undefined||p.age===null||p.age===''?'unknown':p.age;if(!Object.hasOwn(base.ages,age))return {ok:false,code:'AGE_INVALID',message:'Selecione uma faixa etária válida.'};
 const previous=inherited(()=>base.build({...p,diagnosis:row.key,age}));if(!previous?.ok)return previous;if(p.reviewed!==true&&p.danger!=='yes')return {ok:false,code:'REVIEW_REQUIRED',message:'Confirme a avaliação do diagnóstico pela equipe. O site não decide alta.'};
 let sections=[{title:'ATENDIMENTO URGENTE',items:['Esta condição exige avaliação imediata; esta ficha não autoriza observação ou alta domiciliar.']},...sectionsFor(row,age)];
 const clean=(v,n)=>typeof v==='string'?v.replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,n):'',notes=clean(p.notes,1400),plan=clean(p.returnPlan,200);if(notes)sections.push({title:'COMPLEMENTO DA CONSULTA',items:[notes]});if(plan)sections.find(s=>s.title==='QUANDO REAVALIAR').items.push('Retorno combinado: '+plan);
 const topic=topics.find(t=>t.key===row.key),text='ORIENTAÇÕES AOS PAIS — '+topic.label+'\nFaixa etária: '+base.ages[age]+'\n\n'+sections.map((s,i)=>(i+1)+'. '+s.title+'\n'+s.items.map(x=>'• '+x).join('\n')).join('\n\n');
 return {...previous,ok:true,mode:'urgent',topic:row.key,label:row.label,sections,refs:[...refsByKind[row.kind]],text,warnings:['Necessidade de avaliação urgente; esta ficha não autoriza alta.'],effectiveAgeBand:age,directedGuidance:row.specific,termResolution:!row.specific,termAssessment:row.assessment};
}
function audit(){const old=inherited(()=>base.audit()),issues=[...(old.issues||[])];for(const r of rows){const t=topics.find(x=>x.key===r.key);if(!t||t.label!==r.label||t.specificGuidance!==r.specific||t.termResolution===r.specific||!refsByKind[r.kind].every(k=>sources[k]))issues.push('toxicology-intussusception:'+r.key);}return {...old,ok:!issues.length,issues,topics:topics.length};}
root.PaisGuide={...base,sources,topics,resolve,build,audit,toxicologyIntussusception_20261024:{keys:rows.map(r=>r.key),checked_at:'2026-10-24T16:48:42.000Z'}};
})(typeof window!=='undefined'?window:globalThis);
