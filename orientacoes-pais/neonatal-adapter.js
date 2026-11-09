/* Last wrapper intercepts retired aliases before any legacy resolver/build. Exact content and per-topic release gates. */
(function(root){'use strict';const G=root.PaisNeonatalGuard;if(!G)throw Error('Neonatal guard not loaded');
function create(base,data,policy=data.releasePolicy){
 if(!base||!data)throw Error('Neonatal prerequisites missing');
 const updates=new Map(data.topics.map(t=>[t.key,t]));
 const topics=base.topics.map(t=>updates.has(t.key)?structuredCopy(updates.get(t.key)):{...t,aliases:(t.aliases||[]).filter(x=>!G.broad(x))});
 const effectivePolicy={};for(const k of G.keys){const current=topics.find(t=>t.key===k),accepted=data.acceptedArtifacts?.[k];const matched=!!accepted&&G.canonical(current)===accepted.topicCanonical&&(!updates.has(k)||G.canonical(data.outputs[k])===accepted.outputCanonical);effectivePolicy[k]={textAccepted:policy?.[k]?.textAccepted===true,bodyArtifactMatched:matched&&updates.has(k),topicArtifactMatched:matched};}
 const index=new Map();for(const t of topics.filter(t=>G.keys.includes(t.key)))for(const label of [t.key,t.label,t.parent,...(t.aliases||[])])if(label&&!G.broad(label)){const n=G.norm(label);if(index.has(n)&&index.get(n).key!==t.key)throw Error('Neonatal alias collision: '+label);index.set(n,t);}
 function resolve(value){if(G.broad(value))return null;const own=index.get(G.norm(value));if(own)return own;const old=base.resolve(value);return old?topics.find(t=>t.key===old.key)||null:null;}
 function build(input={}){const p=input&&typeof input==='object'?input:{};
 // Current dangerous facts are handled before resolution, optional data parsing and scope verification.
 const direct=index.get(G.norm(p.diagnosis)),emergency=G.currentEmergency(direct?.key||null,p);if(emergency){
  // Preserve unrelated and already-published home emergency flows byte-for-byte.
  // Exact-hour/new-event metadata is neonatal-only and still receives help for an unknown label.
  const c=G.context(p),neoMetadata=['postnatalAgeHours','neonatalWindowConfirmed','newRespiratoryEvent','currentApnea','currentRespiratoryDifficulty'].some(k=>Object.prototype.hasOwnProperty.call(c,k));
  if(!direct&&!G.broad(p.diagnosis)&&!neoMetadata)return base.build(p);
  return G.asGuidance(emergency);
 }
 if(G.broad(p.diagnosis))return G.asGuidance({bodyDecision:'REVIEW_CONTEXT',populationStatus:'review',priority:G.context(p).currentRespiratoryDifficulty==='yes'?'immediate':'routine_review',genericUrgency:G.context(p).currentRespiratoryDifficulty==='yes',specificBodyAllowed:false,requestedTopic:null,renderedTopic:null,reasonCode:'BROAD_RESPIRATORY_ALIAS',missingFields:['specificContext'],familyMessage:'Esse termo não confirma a causa. Se há dificuldade para respirar agora, procure atendimento imediatamente; não espere esclarecer o diagnóstico. A ficha de deficiência de surfactante exige confirmação específica e atual da equipe.',preserveExistingCare:true});
 const t=resolve(p.diagnosis);if(!t||!G.keys.includes(t.key))return base.build(p);
 const population=G.evaluate(t.key,p);let inherited=null,emissionPolicy=effectivePolicy;
 if(population.populationCompatible&&!updates.has(t.key)){
  // Confront the ACTUAL output for this patient's chosen variant, not a neutral probe or metadata hash.
  const editorialInput={...p,diagnosis:t.key,age:population.effectiveAgeBand};
  try{inherited=structuredCopy(base.build(editorialInput));}catch(_){inherited=null;}
  const expected=expectedLegacyOutput(t.key,editorialInput,data.acceptedArtifacts?.[t.key]?.legacyBodyIdentity);
  const matched=effectivePolicy[t.key].topicArtifactMatched&&!!inherited&&!!expected&&G.canonical(bodyArtifact(inherited))===G.canonical(expected);
  emissionPolicy={...effectivePolicy,[t.key]:{...effectivePolicy[t.key],bodyArtifactMatched:matched}};
 }
 const gate=G.applyRelease(population,emissionPolicy);if(!gate.specificBodyAllowed)return G.asGuidance(gate);
 if(updates.has(t.key)){const o=structuredCopy(data.outputs[t.key]);return {...gate,ok:true,mode:'urgent',topic:t.key,label:t.label,sections:o.sections,text:o.text,refs:[...t.refs],population};}
 // Three unchanged topics are separate approvals, never released by the six updated bodies' approvals.
 const output=inherited;if(!output.ok)return G.asGuidance({...gate,specificBodyAllowed:false,renderedTopic:null,bodyDecision:'REVIEW_RUNTIME',reasonCode:'BASE_BUILD_FAILED',familyMessage:'Não foi possível conferir esta orientação. Use o plano da equipe e procure ajuda conforme os sinais atuais.'});
 return {...output,...gate,topic:t.key,renderedTopic:t.key,population};
 }
 function audit(){const old=base.audit(),issues=[...(old.issues||[])];if(resolve('desconforto respiratório neonatal')!==null)issues.push('broad-neonatal-alias');for(const key of G.keys){if(!topics.some(t=>t.key===key))issues.push(key+':missing');const r=build({diagnosis:key,reviewed:true});if(r.specificBodyAllowed||r.topic!==null)issues.push(key+':implicit-release');}return {...old,ok:issues.length===0,issues,neonatalPopulation:{guardedKeys:[...G.keys],updatedBodies:[...G.updated],candidateOnly:true,independentIntegratedReviewPending:true}};}
 return {...base,topics,sources:{...base.sources,...data.sources},resolve,build,audit,neonatalPopulation:{version:G.version,guardedKeys:[...G.keys],updatedBodies:[...G.updated],independentIntegratedReviewPending:true,humanClinicalReviewPerformed:false}};
}
function bodyArtifact(r){return {ok:r.ok,mode:r.mode,topic:r.topic,label:r.label,sections:r.sections,refs:r.refs,text:r.text};}
function expectedLegacyOutput(key,p,identity){
 if(!identity)return null;const variant=[p.age,p.nasal==='yes'?'yes':'no',p.diarrhea==='yes'||p.vomiting==='yes'?'yes':'no',p.risk==='yes'?'yes':'no'].join('|');
 const fixed=identity.variants?.[variant]?.output;if(!fixed)return null;const expected=structuredCopy(fixed);
 if(key==='pps_135'){
  // Match the existing renderer exactly; these are explicit manual additions, not validated clinical content.
  const clean=(s,n=1400)=>String(s||'').replace(/[\u0000-\u001f\u007f#*]/g,' ').trim().slice(0,n);
  const returnPlan=clean(p.returnPlan,200),notes=clean(p.notes);
  if(returnPlan){const section=expected.sections.find(s=>s.title==='QUANDO REAVALIAR');if(!section)return null;section.items=[...new Set(['Retorno combinado na consulta: '+returnPlan,...section.items])];}
  if(notes)expected.sections.push({title:'COMPLEMENTO DA CONSULTA',items:[notes]});
  expected.text='ORIENTAÇÕES AOS PAIS — '+expected.label+'\n\n'+expected.sections.map((s,i)=>(i+1)+'. '+s.title+'\n'+s.items.map(x=>'• '+x).join('\n')).join('\n\n');
 }
 return expected;
}
function structuredCopy(x){return JSON.parse(JSON.stringify(x));}
root.PaisNeonatalAdapter=Object.freeze({create});root.PaisGuide=create(root.PaisGuide,root.PaisNeonatalContent);
})(typeof window!=='undefined'?window:globalThis);
