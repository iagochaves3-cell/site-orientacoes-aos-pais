/* Prototype: three editorial population gates. Pure functions; no storage, network or DOM. */
(function(root,factory){'use strict';const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PaisPopulationGuard=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){'use strict';
const keys=Object.freeze(['pps_81','pps_21','pps_114']);
const bands=Object.freeze({unknown:[0,216],u3m:[0,3],'3a5m':[3,6],'6a11m':[6,12],'1a':[12,24],'2a5':[24,72],'6a11':[72,144],'12a17':[144,216]});
const has=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
const tri=v=>['yes','no','unknown'].includes(v)?v:'unknown';
function integer(v){if(v===undefined||v===null||typeof v==='string'&&v.trim()==='')return {kind:'missing',value:null};if(typeof v!=='number'&&typeof v!=='string')return {kind:'invalid',value:null};if(typeof v==='string'&&!/^\d+$/.test(v.trim()))return {kind:'invalid',value:null};const n=Number(v);return Number.isSafeInteger(n)&&n>=0?{kind:'valid',value:n}:{kind:'invalid',value:null};}
function exactToken(v){const p=integer(v);return p.kind==='missing'?null:p.kind==='valid'?String(p.value):'invalid:'+String(v);}
function context(p){return p&&p.populationContext&&typeof p.populationContext==='object'&&!Array.isArray(p.populationContext)?p.populationContext:{};}
function scopeFor(key,p){const c=context(p);return {topicKey:key,ageBand:p.age===undefined||p.age===null||p.age===''?'unknown':p.age,exactYears:exactToken(c.populationAgeYears),exactMonths:exactToken(c.populationAgeMonths)};}
function scopeMatches(key,p){const got=context(p).scope,expected=scopeFor(key,p);return !!got&&typeof got==='object'&&Object.keys(expected).every(k=>has(got,k)&&got[k]===expected[k]);}
function ageInfo(p){const c=context(p),age=p.age===undefined||p.age===null||p.age===''?'unknown':p.age,y=integer(c.populationAgeYears),m=integer(c.populationAgeMonths);const validBand=typeof age==='string'&&has(bands,age);const invalid=[];if(!validBand)invalid.push('age');if(y.kind==='invalid')invalid.push('populationAgeYears');if(m.kind==='invalid')invalid.push('populationAgeMonths');let lo=0,hi=Infinity;const ranges=[];if(validBand&&age!=='unknown')ranges.push(bands[age]);if(y.kind==='valid')ranges.push([y.value*12,(y.value+1)*12]);if(m.kind==='valid')ranges.push([m.value,m.value+1]);for(const r of ranges){lo=Math.max(lo,r[0]);hi=Math.min(hi,r[1]);}const conflict=lo>=hi;const effective=validBand&&age!=='unknown'?age:(!conflict&&ranges.length?Object.keys(bands).find(b=>b!=='unknown'&&lo>=bands[b][0]&&hi<=bands[b][1])||'unknown':'unknown');return {original:age,lo,hi,conflict,invalid,effective,years:y,months:m,known:ranges.length>0};}
function helpSections(){return [{title:'QUANDO BUSCAR SOCORRO',items:['Se houver falta de ar intensa, criança arroxeada, dificuldade para acordar ou convulsão prolongada, ligue 192.','Bebê com menos de 3 meses e febre ou suspeita de febre precisa de avaliação imediata, mesmo que pareça bem.']}];}
function result(key,decision,code,message,opts={}){const allow=decision==='ALLOW'||decision==='ALLOW_LIMITED_FOLLOWUP';return {bodyDecision:decision,populationStatus:allow?'confirmed':decision==='OUT_OF_SCOPE'?'out_of_scope':'review',reasonCode:code,specificBodyAllowed:allow,priority:allow?'not_determined':'routine_review',requestedTopic:key,renderedTopic:allow?key:null,missingFields:[],familyMessage:message,emergencySections:helpSections(),...opts};}
function emergency(p,key){if(p.danger==='yes')return result(key,'REVIEW_URGENCY','CURRENT_DANGER','Foi informado um sinal de gravidade atual. Procure atendimento imediato; não espere preencher esta ficha.',{priority:'immediate',presentation:'URGENT_GENERIC'});const c=context(p),m=integer(c.populationAgeMonths);if(p.fever==='yes'&&(p.age==='u3m'||m.kind==='valid'&&m.value<3))return result(key,'REVIEW_URGENCY','INFANT_FEVER','Bebê menor de 3 meses com febre ou suspeita de febre precisa de avaliação imediata, mesmo que pareça bem.',{priority:'immediate',presentation:'URGENT_GENERIC'});if(key==='pps_21'&&c.conditionRedFlags==='yes')return result(key,'REVIEW_URGENCY','REFLUX_CURRENT_RED_FLAGS','Vômito verde, com sangue ou em jato, ou piora aguda importante precisam de avaliação sem demora. Esta ficha de golfadas sem sofrimento não deve ser usada agora.',{priority:'immediate',presentation:'URGENT_GENERIC'});return null;}
function evaluate(key,p={}){
 p=p&&typeof p==='object'?p:{};const urgent=emergency(p,key);if(urgent)return urgent;if(!keys.includes(key))return null;
 const c=context(p),a=ageInfo(p);const finish=(d,code,msg,more={})=>result(key,d,code,msg,{effectiveAgeBand:a.effective,...more});
 if(a.conflict)return finish('REVIEW_DATA_CONFLICT','AGE_CONTEXT_CONFLICT','A faixa e a idade informadas não combinam. Confira os dados antes de usar esta ficha. Mantenha o cuidado já prescrito.');
 if(a.invalid.length)return finish('REVIEW_DATA_CONFLICT','AGE_INVALID','Confira a idade: use anos ou meses completos, sem arredondar ou misturar unidades. Mantenha o cuidado já prescrito.',{missingFields:a.invalid});
 const out=key==='pps_81'?(a.known&&(a.hi<=60||a.lo>=216)):(a.known&&a.lo>=24);
 if(out)return finish('OUT_OF_SCOPE','AGE_OUT_OF_EDITORIAL_SCOPE',key==='pps_81'?'Esta ficha é para crianças de 5 a 17 anos. Molhar a cama não é culpa dela: não castigue nem envergonhe; converse com a equipe se houver preocupação.':key==='pps_114'?'Esta ficha foi escrita para bebês menores de 2 anos. A reposição e os exames continuam conforme a prescrição; peça orientação de seguimento adequada à idade.':'Esta ficha de golfadas sem sofrimento foi escrita para menores de 2 anos. Peça uma orientação adequada ao quadro e à idade; refluxo pode ocorrer em outras idades.');
 const missing=[];
 const need=(field,want)=>{if(tri(c[field])!==want)missing.push(field);};
 if(key==='pps_81'){
  if(c.hasDaytimeUrinarySymptoms==='yes'||c.previousDrySixMonths==='yes')return finish('REVIEW_CONTEXT','ENURESIS_SUBTYPE_REVIEW','Sintomas durante o dia ou voltar a molhar a cama após pelo menos seis meses secos precisam de avaliação específica. Mantenha o cuidado já combinado.');
  if(!a.known||a.lo<60)missing.push('populationAgeYears');
  need('contextConfirmed','yes');need('hasDaytimeUrinarySymptoms','no');need('previousDrySixMonths','no');
 }
 if(key==='pps_21'){
  if(has(c,'refluxGrowthAndComfortConfirmed')&&c.refluxGrowthAndComfortConfirmed!=='yes')return finish('REVIEW_CONTEXT','REFLUX_GROWTH_REVIEW','Crescimento insuficiente, sofrimento persistente ou dúvida sobre esses pontos precisam de reavaliação pela equipe. Esta ficha de golfadas sem sofrimento não se aplica enquanto isso. Siga o plano já recebido.',{priority:'priority_contact',missingFields:['refluxGrowthAndComfortConfirmed']});
  if(c.contextConfirmed==='no')return finish('REVIEW_CONTEXT','REFLUX_CONTEXT_REVIEW','Esta ficha exige avaliação de crescimento adequado, boa alimentação e golfadas sem sofrimento importante. Entre em contato com a equipe para reavaliar o quadro.',{priority:'priority_contact'});
  if(c.refluxOnsetBySixMonths==='no')return finish('REVIEW_CONTEXT','REFLUX_LATE_ONSET','Golfadas que começaram depois de completar seis meses precisam ser reavaliadas antes de usar esta ficha.',{priority:'priority_contact'});
  if(c.refluxReassessedAfterOneYear==='no'&&a.lo>=12)return finish('REVIEW_CONTEXT','REFLUX_PERSISTENCE_REVIEW','Golfadas que continuam depois de um ano precisam ser reavaliadas antes de usar esta ficha.',{priority:'priority_contact'});
  if(!a.known||a.hi>24||a.effective==='unknown')missing.push('populationAgeMonths');
  need('contextConfirmed','yes');need('conditionRedFlags','no');
  if(a.lo>=6)need('refluxOnsetBySixMonths','yes');
  if(a.lo>=12)need('refluxReassessedAfterOneYear','yes');
 }
 if(key==='pps_114'){
  if(tri(c.contextConfirmed)!=='yes'||tri(c.individualPlanConfirmed)!=='yes')return finish('REVIEW_PRIORITY_CONTACT','THYROID_PLAN_REVIEW','Se o teste do pezinho veio alterado ou falta confirmar a receita e os exames, entre em contato com a equipe hoje. Não espere sintomas nem deixe esta conferência atrasar o tratamento indicado. Se já há reposição prescrita, mantenha-a como orientado.',{priority:'priority_contact',missingFields:['contextConfirmed','individualPlanConfirmed'].filter(k=>tri(c[k])!=='yes')});
  if(!a.known||a.hi>24)missing.push('populationAgeMonths');
 }
 if(c.contextConfirmed==='no')return finish('REVIEW_CONTEXT','POPULATION_CONTEXT_MISMATCH','A equipe precisa confirmar que esta ficha corresponde ao quadro atual. Mantenha o cuidado já combinado.');
 if(!scopeMatches(key,p))missing.push('scope');
 if(p.reviewed!==true)missing.push('reviewed');
 if(missing.length)return finish('REVIEW_REQUIRED_INPUT','POPULATION_CONTEXT_REQUIRED',key==='pps_114'?'Confirme os dados que faltam para esta ficha de bebê. Mantenha a reposição e os exames conforme a orientação recebida.':key==='pps_81'?'Confirme a idade a partir de 5 anos e as respostas sobre o quadro atual. Molhar a cama não é culpa da criança.':'Confirme a idade e as respostas sobre a avaliação das golfadas. Resposta desconhecida não significa ausência de sinais; mantenha o plano recebido.',{missingFields:[...new Set(missing)]});
 return finish(key==='pps_21'&&a.lo>=12?'ALLOW_LIMITED_FOLLOWUP':'ALLOW','POPULATION_CONFIRMED','A aplicabilidade editorial foi confirmada para os dados informados. Isso não valida um diagnóstico.');
}
function asGuidance(r){const urgent=r.priority==='immediate';const sections=[{title:urgent?'PROCURE ATENDIMENTO SEM DEMORA':'CONFIRA ESTA ORIENTAÇÃO COM A EQUIPE',items:[r.familyMessage]},...r.emergencySections];const label=urgent?'Avaliação imediata':'Orientação a confirmar';return {...r,ok:true,code:r.reasonCode,mode:urgent?'urgent':'review',topic:null,label,sections,refs:['fever','seizure'],warnings:[r.familyMessage],text:'ORIENTAÇÕES AOS PAIS\n'+label+'\n\n'+sections.map((s,i)=>(i+1)+'. '+s.title+'\n'+s.items.map(v=>'- '+v).join('\n')).join('\n\n')};}
return Object.freeze({version:'2.0.0-prototype-home-three',keys,bands,integer,scopeFor,scopeMatches,ageInfo,emergency,evaluate,asGuidance});
});
