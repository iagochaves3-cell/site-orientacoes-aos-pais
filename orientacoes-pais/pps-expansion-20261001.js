/* Orientações aos Pais — extensão incremental do catálogo, 2026-10-01. */
(function(root,factory){'use strict';if(typeof module==='object'&&module.exports)module.exports=factory;else{root.PaisGuide=factory(root.PaisGuide,root.PaisPPSPack);}})(typeof window!=='undefined'?window:globalThis,function(base,pack){
'use strict';
if(!base||!pack)throw new Error('Base ou catálogo não carregado.');
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
const clean=(s,n=1400)=>String(s||'').replace(/[\u0000-\u001f\u007f#*]/g,' ').trim().slice(0,n);
const uniq=a=>[...new Set(a.filter(Boolean))];
const sources={...base.sources,...pack.sources};
const index=new Map(),byNumber=new Map(),replaced=new Set(),topics=[];
const addIndex=(value,t)=>{const k=norm(value);if(k&&!index.has(k))index.set(k,t);};
for(const r of pack.rows){
 const [number,label,category,profile,baseKey='',aliases='',detail='']=r;
 if(byNumber.has(number))throw new Error('Identificador documental duplicado.');
 const inherited=baseKey?base.resolve(baseKey):null;
 if(baseKey&&!inherited)throw new Error('Ficha original ausente: '+baseKey);
 const p=profile?pack.profiles[profile]:{};
 if(!p)throw new Error('Perfil ausente: '+profile);
 const first=baseKey&&!replaced.has(baseKey);
 const t={key:'pps_'+number,number,label,parent:p.parent||label,category,profile,baseKey,detail,aliases:uniq([...(aliases?aliases.split('|'):[]),...(first?[inherited.key,inherited.label,inherited.parent,...inherited.aliases]:[])]),refs:uniq([...(inherited?inherited.refs:[]),...(p.refs||[])]),urgency:!!p.urgency};
 if(!t.refs.length||t.refs.some(id=>!sources[id]||!/^https:\/\//.test(sources[id].url)))throw new Error('Referência inválida: '+number);
 topics.push(t);byNumber.set(number,t);addIndex(t.key,t);addIndex(t.label,t);t.aliases.forEach(v=>addIndex(v,t));if(baseKey)replaced.add(baseKey);
}
for(const [number,label,category,profile,alias] of pack.variants||[]){
 const p=pack.profiles[profile];if(!byNumber.has(number)||!p||p.refs.some(id=>!sources[id]))throw new Error('Subtipo inválido.');
 const t={number,sourceNumber:number,key:'pps_variant_'+profile,label,parent:label,category,profile,baseKey:'',detail:'',aliases:[alias],refs:[...p.refs],urgency:!!p.urgency};topics.push(t);[t.key,label,alias].forEach(v=>addIndex(v,t));
}
for(const t of base.topics){if(!replaced.has(t.key)){topics.push(t);[t.key,t.label,t.parent,...t.aliases].forEach(v=>addIndex(v,t));}}
if(pack.meta.count!==byNumber.size)throw new Error('Contagem documental divergente.');
topics.sort((a,b)=>a.label.localeCompare(b.label,'pt-BR'));
const resolve=value=>index.get(norm(value))||null;
const format=sections=>sections.map((s,i)=>(i+1)+'. '+s.title+'\n'+s.items.map(x=>'• '+x).join('\n')).join('\n\n');
const result=(t,sections,mode,refs)=>({ok:true,mode,topic:t.key,label:t.parent||t.label,sections,refs:uniq(refs),text:'ORIENTAÇÕES AOS PAIS — '+(t.parent||t.label)+'\n\n'+format(sections)});
const error=(code,message)=>({ok:false,code,error:message,message});
const testAge=t=>t.baseKey==='bronquiolite'||t.key==='bronquiolite'?'6a11m':(t.number>=135||t.number===114?'u3m':t.number===81?'6a11':'2a5');
function build(input){
 const p={...input};const t=resolve(p.diagnosis);p.age=p.age||'unknown';
 // Never delay the existing general emergency and young-infant fever pathways.
 if(p.danger==='yes'||(p.age==='u3m'&&(p.fever==='yes'||t?.key==='febre')))return base.build({...p,diagnosis:t?.baseKey||p.diagnosis});
 if(!Object.hasOwn(base.ages,p.age))return error('AGE_INVALID','Selecione uma faixa etária válida.');
 if(!t)return error('UNSUPPORTED','Selecione um diagnóstico do catálogo. Texto livre não é interpretado como diagnóstico.');
 if(!t.number)return base.build(p);
 const profile=t.profile?pack.profiles[t.profile]:{};
 if(t.urgency){
  const sections=[{title:'AVALIAÇÃO PRESENCIAL SEM DEMORA',items:uniq([...(profile.home||[]),t.detail])},{title:'ENQUANTO BUSCA AJUDA',items:profile.care||[]},{title:'LIGUE 192 DIANTE DE SINAIS GRAVES',items:uniq([...(profile.urgent||[]),'Ligue 192 se a criança estiver muito difícil de acordar, não respirar normalmente, ficar arroxeada ou apresentar convulsão prolongada.'])},{title:'O QUE ESPERAR NO ATENDIMENTO',items:profile.course||[]},{title:'CONTINUIDADE DO CUIDADO',items:profile.follow||[]}].filter(s=>s.items.length);
  return result(t,sections,'urgent',t.refs);
 }
 if(p.reviewed!==true)return error('REVIEW_REQUIRED','Confirme que a criança foi avaliada e liberada para cuidados em casa.');
 if(t.number>=135&&!['unknown','u3m'].includes(p.age))return error('AGE_REVIEW','A ficha selecionada é neonatal. Confira o diagnóstico e a faixa etária antes de gerar.');
 if(t.baseKey){
  const original=base.build({...p,diagnosis:t.baseKey});if(!original.ok||original.mode==='urgent')return original;
  const sections=original.sections.map(s=>({title:s.title,items:[...s.items]}));
  if(t.detail)sections.unshift({title:'CUIDADO ESPECÍFICO DESTE DIAGNÓSTICO',items:[t.detail]});
  return {...original,...result(t,sections,'guidance',uniq([...original.refs,...t.refs]))};
 }
 const young=['u3m','3a5m'].includes(p.age),unknown=p.age==='unknown';
 const home=[...(profile.home||[])],care=[...(profile.care||[])],food=[...(profile.food||[])],course=[...(profile.course||[])],observe=[...(profile.observe||[])],urgent=[...(profile.urgent||[])],follow=[...(profile.follow||[])],refs=[...t.refs];
 if(t.detail)home.unshift(t.detail);
 if(profile.fluidPlan){food.push('A quantidade de líquidos e de sal deve seguir o plano da equipe que acompanha os rins. Não aumente nem restrinja líquidos por conta própria.');if(p.diarrhea==='yes'||p.vomiting==='yes')follow.unshift('Entre em contato com a equipe hoje: perdas por vômitos ou diarreia podem exigir ajuste do plano de líquidos.');}
 else if(!profile.noDiet){food.push(young?'Antes dos 6 meses, mantenha o leite materno ou a fórmula habitual; não substitua mamadas por água, chás ou alimentos.':'Mantenha a alimentação habitual adequada à idade, sem forçar. Em bebês, continue o aleitamento; antes dos 6 meses, não substitua mamadas por água ou alimentos.');}
 if(p.nasal==='yes'||profile.resp){care.push('Para nariz obstruído, use solução salina isotônica com técnica suave orientada na consulta, sem pressão excessiva.','Nebulização domiciliar somente quando indicada na consulta; não substitui tratamento de falta de ar. Não use vapor quente, óleos ou misturas caseiras.');refs.push('nasal','bronchioHome');}
 if((young||unknown||['6a11m','1a'].includes(p.age))&&['reflux','refluxDisease'].includes(t.profile)){care.push('Para dormir, bebê de barriga para cima, em superfície firme, plana e desimpedida. Não incline o berço nem use travesseiros antirrefluxo.');refs.push('safeSleep');}
 if((p.diarrhea==='yes'||p.vomiting==='yes')&&!profile.fluidPlan){care.push('Se houver perdas por vômitos ou diarreia, use a solução de reidratação oral orientada na consulta, preparada exatamente como na embalagem, em pequenas ofertas frequentes.');refs.push('diarrhea');urgent.push('Vômito verde ou com sangue, sangue nas fezes, incapacidade de beber ou diminuição importante do xixi exigem nova avaliação.');}
 if(young||unknown)urgent.push('Em bebê com menos de 3 meses, temperatura de 38 °C ou mais exige avaliação imediata, mesmo que pareça bem.');
 urgent.push('Falta de ar, lábios arroxeados, desmaio, convulsão ou dificuldade para acordar: busque atendimento imediatamente; em situação grave, ligue 192.');
 refs.push('fever');
 if(p.risk==='yes')follow.unshift('Por haver uma condição de risco informada, antecipe a reavaliação se houver qualquer piora.');
 if(clean(p.returnPlan,200))follow.unshift('Retorno combinado na consulta: '+clean(p.returnPlan,200));
 const sections=[['CUIDADOS EM CASA',home],['MEDIDAS SEM REMÉDIOS',care],['ALIMENTAÇÃO E LÍQUIDOS',food],['O QUE ESPERAR',course],['O QUE OBSERVAR',observe],['VOLTE IMEDIATAMENTE AO PRONTO ATENDIMENTO',urgent],['QUANDO REAVALIAR',follow]].filter(([,a])=>a.length).map(([title,items])=>({title,items:uniq(items)}));
 if(clean(p.notes))sections.push({title:'COMPLEMENTO DA CONSULTA',items:[clean(p.notes)]});
 return result(t,sections,'guidance',refs);
}
function audit(){const issues=[];for(const t of topics){const r=build({diagnosis:t.key,age:testAge(t),reviewed:true});if(!r.ok||r.text.length<150||r.refs.some(id=>!sources[id]))issues.push(t.key);if(t.urgency&&r.mode!=='urgent')issues.push(t.key+':urgency');}return {ok:!issues.length,issues,topics:topics.length,sourceDiagnoses:byNumber.size,urgent:topics.filter(t=>t.urgency).length};}
return {...base,version:'2.0.0-pps142',checked:'01/10/2026',topics,sources,resolve,build,testAge,audit,coverage:{...pack.meta,covered:byNumber.size,totalCards:topics.length,scope:'Índice documental do repositório PPS; não equivale a inventário integral do SiteGPT.'}};
});