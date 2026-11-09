/* Pure nine-topic editorial guard. No network, storage, treatment calculation, or clinical defaults. */
(function(root,factory){'use strict';const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PaisNeonatalGuard=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){'use strict';
const keys=Object.freeze(['pps_135','pps_93','pps_136','pps_137','pps_138','pps_139','pps_140','pps_141','pps_142']);
const updated=Object.freeze(['pps_93','pps_137','pps_138','pps_139','pps_140','pps_141']);
const bands=['unknown','u3m','3a5m','6a11m','1a','2a5','6a11','12a17'];
const phases=['unknown','home_plan_after_assessment','urgent_or_hospital_initial','ongoing_neonatal_hospital','historical_or_resolved'];
const releaseFields=['textAccepted','bodyArtifactMatched'];
const norm=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const broad=v=>norm(v)==='desconforto respiratorio neonatal';
const has=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
const tri=v=>['yes','no','unknown'].includes(v)?v:'unknown';
const context=p=>p&&p.populationContext&&typeof p.populationContext==='object'&&!Array.isArray(p.populationContext)?p.populationContext:{};
function canonical(v){if(v===undefined)return 'undefined';if(v===null||typeof v!=='object')return typeof v==='number'&&!Number.isFinite(v)?JSON.stringify(String(v)):JSON.stringify(v);if(Array.isArray(v))return '['+v.map(canonical).join(',')+']';return '{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}';}
function scopeFor(key,p={}){const c={...context(p)};delete c.scope;return {version:'neo-scope-v1',topicKey:key,diagnosis:norm(p.diagnosis),age:p.age??'unknown',danger:p.danger??'unknown',fever:p.fever??'unknown',reviewed:p.reviewed===true,nasal:p.nasal??'unknown',diarrhea:p.diarrhea??'unknown',vomiting:p.vomiting??'unknown',risk:p.risk??'unknown',ageMonths:p.ageMonths??'',contextSignature:canonical(c)};}
function scopeMatches(key,p){return canonical(context(p).scope)===canonical(scopeFor(key,p));}
function number(v){if(v===undefined||v===null||typeof v==='string'&&v.trim()==='')return {kind:'missing',value:null};if(typeof v!=='number'&&typeof v!=='string')return {kind:'invalid',value:null};let n=v;if(typeof v==='string'){const s=v.trim();if(!/^\d+(?:[.,]\d+)?$/.test(s))return {kind:'invalid',value:null};n=Number(s.replace(',','.'));}return Number.isFinite(n)&&n>=0?{kind:'valid',value:n}:{kind:'invalid',value:null};}
function gestation(v){if(v===undefined||v===null)return {kind:'missing',days:null};if(typeof v!=='object'||Array.isArray(v))return {kind:'invalid',days:null};const w=number(v.weeks),d=number(v.days);if(w.kind!=='valid'||d.kind!=='valid'||!Number.isInteger(w.value)||!Number.isInteger(d.value)||d.value>6||w.value<20||w.value>45)return {kind:'invalid',days:null};return {kind:'valid',days:w.value*7+d.value};}
function result(key,bodyDecision,reasonCode,familyMessage,extra={}){return {bodyDecision,populationStatus:'review',priority:'routine_review',genericUrgency:false,specificBodyAllowed:false,requestedTopic:key,renderedTopic:null,reasonCode,missingFields:[],familyMessage,preserveExistingCare:true,changeCaffeineDose:false,homeWaitingAllowed:false,...extra};}
function currentEmergency(key,p){const c=context(p),h=number(c.postnatalAgeHours);if(p.danger==='yes'||c.newRespiratoryEvent==='yes'||c.currentApnea==='yes'||c.currentRespiratoryDifficulty==='yes')return result(key,'URGENT_GENERIC','CURRENT_DANGER','Há sinal de gravidade ou piora atual. Procure atendimento imediatamente. Se o bebê não respira normalmente, está arroxeado ou é difícil acordá-lo, ligue 192 e siga o atendente. Não espere completar o formulário.',{priority:'immediate',genericUrgency:true});
if(p.fever==='yes'&&(p.age==='u3m'||c.neonatalWindowConfirmed==='yes'||h.kind==='valid'&&h.value<92*24))return result(key,'URGENT_GENERIC','INFANT_FEVER','Bebê pequeno com febre ou suspeita de febre precisa de avaliação imediata, mesmo que pareça bem. Não espere corrigir os dados para buscar ajuda.',{priority:'immediate',genericUrgency:true});
if(key==='pps_135'&&(c.conditionRedFlags==='yes'||c.jaundiceStartedFirstDay==='yes'||c.currentJaundiceReported===true&&h.kind==='valid'&&h.value<24))return result(key,'URGENT_GENERIC','CURRENT_JAUNDICE_WARNING','Amarelão no primeiro dia ou sinais de alerta atuais precisam de avaliação médica sem demora. Não espere preencher o site nem use banho de sol como tratamento.',{priority:'immediate',genericUrgency:true});return null;}
function evaluate(key,input={}){const p=input&&typeof input==='object'?input:{},c=context(p),emergency=currentEmergency(key,p);if(emergency)return emergency;if(!keys.includes(key))return null;
const h=number(c.postnatalAgeHours),onset=number(c.onsetAgeHours),ga=gestation(c.gestationalAgeAtBirth),age=p.age??'unknown',phase=c.carePhase??'unknown';
const phaseActive=['urgent_or_hospital_initial','ongoing_neonatal_hospital'].includes(phase),stable=['home_plan_after_assessment','historical_or_resolved'].includes(phase);
const genericUrgency=key!=='pps_135'&&phaseActive;
const triageExplicitlyStable=p.danger==='no'&&p.fever==='no'&&['newRespiratoryEvent','currentApnea','currentRespiratoryDifficulty'].every(k=>!has(c,k)||c[k]==='no');
const priority=genericUrgency?'immediate':triageExplicitlyStable?'routine_review':'not_determined';
const preserve=key==='pps_141'?' Se a cafeína foi prescrita, siga exatamente o plano da equipe; não inicie, ajuste nem suspenda por conta própria.':' Mantenha o cuidado e os retornos já orientados pela equipe.';
const finish=(decision,reason,message,extra={})=>result(key,decision,reason,message+preserve,{priority,genericUrgency,...extra});
const invalid=[];if(!bands.includes(age))invalid.push('age');if(!phases.includes(phase))invalid.push('carePhase');if(h.kind==='invalid')invalid.push('postnatalAgeHours');if(onset.kind==='invalid')invalid.push('onsetAgeHours');if(ga.kind==='invalid')invalid.push('gestationalAgeAtBirth');
if(invalid.length)return finish('REVIEW_DATA_CONFLICT','INVALID_CONTEXT_VALUE','Confira os dados informados. Eles não permitem selecionar esta ficha.',{missingFields:invalid});
if(h.kind==='valid'&&onset.kind==='valid'&&onset.value>h.value)return finish('REVIEW_DATA_CONFLICT','ONSET_AFTER_CURRENT_AGE','O início informado está depois da idade atual. Confira os dados; isso não deve atrasar o atendimento.');
// Conservative calendar envelopes only identify unequivocal contradictions. They never assign a month band.
const ranges={u3m:[0,92], '3a5m':[89,184], '6a11m':[181,366], '1a':[365,732], '2a5':[730,2193], '6a11':[2190,4384], '12a17':[4380,6576]};
if(h.kind==='valid'&&ranges[age]&&(h.value/24<ranges[age][0]||h.value/24>=ranges[age][1]))return finish('REVIEW_DATA_CONFLICT','AGE_CONTEXT_CONFLICT','A faixa etária e a idade desde o nascimento não combinam. Confira os dados.');
if(key!=='pps_141'&&c.neonatalWindowConfirmed==='yes'&&(h.kind==='valid'&&h.value>=672||!['unknown','u3m'].includes(age)))return finish('REVIEW_DATA_CONFLICT','AGE_CONTEXT_CONFLICT','A confirmação de menos de 28 dias não combina com a idade informada. Confira os dados.');
if(key!=='pps_141'&&c.neonatalWindowConfirmed==='no'&&h.kind==='valid'&&h.value<672)return finish('REVIEW_DATA_CONFLICT','AGE_CONTEXT_CONFLICT','As respostas sobre a idade não combinam. Confira os dados.');
if(key==='pps_141'){
 if(ga.kind==='valid'&&ga.days>=259)return finish('OUT_OF_SCOPE','TERM_GESTATION','Esta ficha específica de apneia da prematuridade não corresponde à gestação informada. Uma pausa nova precisa de avaliação, qualquer que seja a causa.');
 if(['2a5','6a11','12a17'].includes(age))return finish('OUT_OF_SCOPE','AGE_OUT_OF_EDITORIAL_SCOPE','Esta ficha inicial não é adequada a esta faixa etária. Peça uma orientação individual.');
}else{
 if(!['unknown','u3m'].includes(age))return finish(phase==='ongoing_neonatal_hospital'?'REVIEW_SCOPE':'OUT_OF_SCOPE','AGE_OUT_OF_EDITORIAL_SCOPE','Esta ficha inicial de recém-nascido precisa ser ajustada à idade e à fase do cuidado. Isso não determina a causa nem interrompe tratamento.');
 if(h.kind==='valid'&&h.value>=672||c.neonatalWindowConfirmed==='no')return finish('REVIEW_SCOPE','NEONATAL_EDITORIAL_WINDOW','A partir de 28 dias, esta ficha inicial precisa ser ajustada ao momento atual. Este limite editorial não exclui doença nem reduz a urgência dos sintomas.');
}
if(key!=='pps_135'&&stable)return finish('REVIEW_PHASE','INITIAL_BODY_NOT_HOME_PLAN','Esta ficha explica a avaliação inicial. Para cuidado em casa ou um episódio já resolvido, use o plano individual e confirme a orientação de seguimento com a equipe.',{priority:triageExplicitlyStable?'routine_review':'not_determined',genericUrgency:false,additionalReasons:key==='pps_141'&&!['unknown','u3m'].includes(age)&&c.specialistScopeConfirmed!=='yes'?['SPECIALIST_SCOPE_UNCONFIRMED']:[]});
if(key==='pps_135'&&phase==='historical_or_resolved')return finish('REVIEW_PHASE','HISTORICAL_JAUNDICE','Para um episódio já resolvido, confirme com a equipe qual orientação de seguimento usar.',{priority:'routine_review',genericUrgency:false});
if(c.contextConfirmed==='no'||key==='pps_142'&&c.therapeuticCooling==='yes')return finish('REVIEW_CONTEXT','SPECIFIC_CONTEXT_MISMATCH',key==='pps_142'?'Se o resfriamento foi planejado como tratamento no hospital, não tente reaquecer por esta ficha. Avise a equipe responsável.':'A equipe precisa confirmar que esta ficha corresponde ao quadro e ao momento atuais.');
if(['pps_139','pps_140'].includes(key)&&c.respiratoryOnsetAtBirth==='no')return finish('REVIEW_CONTEXT','NEW_RESPIRATORY_CONTEXT','Um quadro respiratório novo não deve ser atribuído automaticamente ao diagnóstico do nascimento. Procure avaliação conforme os sinais atuais.');
if(['pps_137','pps_138'].includes(key)){
 if(has(c,'sepsisConvention')&&c.sepsisConvention!=='documented_72h')return finish('REVIEW_SUBTYPE','ONSET_CONVENTION_REVIEW','Esta ficha usa a fronteira de 72 horas. Confirme a orientação com a equipe, respeitando o protocolo informado, inclusive quando ele usa sete dias. O site não troca o subtipo.');
 if(onset.kind==='valid'&&(key==='pps_137'&&onset.value>=72||key==='pps_138'&&onset.value<72))return finish('REVIEW_SUBTYPE','ONSET_SUBTYPE_MISMATCH','O início informado não combina com o título desta ficha. A idade atual não substitui a idade em que o episódio começou. O site não troca o subtipo.');
 if(key==='pps_138'&&c.lateOnsetTitleBoundaryCorrected===false)return finish('REVIEW_TITLE_BOUNDARY','LATE_TITLE_BOUNDARY_UNCONFIRMED','A ficha de sepse tardia precisa usar início a partir de 72 horas. Não use uma versão com outra fronteira.');
}
if(key==='pps_141'&&c.prematurityConfirmed==='no')return finish('REVIEW_CONTEXT','PREMATURITY_NOT_CONFIRMED','É necessária confirmação de prematuridade e de que a orientação se aplica ao episódio atual; o uso de cafeína sozinho não confirma a causa.');
const missing=[];if(tri(c.contextConfirmed)!=='yes')missing.push('contextConfirmed');
if(key==='pps_141'){
 if(ga.kind!=='valid'&&tri(c.prematurityConfirmed)!=='yes')missing.push('prematurityConfirmed');
 if(tri(c.individualPlanConfirmed)!=='yes')missing.push('individualPlanConfirmed');
 if(age==='unknown'&&!(h.kind==='valid'&&h.value<672))missing.push('age');
 if(!['unknown','u3m'].includes(age)&&tri(c.specialistScopeConfirmed)!=='yes')return finish('REVIEW_SPECIALIST','CURRENT_SPECIALIST_SCOPE_REQUIRED','A equipe neonatal precisa confirmar que a ficha ainda se aplica à idade e à maturação atuais.',{missingFields:['specialistScopeConfirmed']});
}else if(!(h.kind==='valid'&&h.value<672)&&tri(c.neonatalWindowConfirmed)!=='yes')missing.push('neonatalWindowConfirmed');
if(key==='pps_135'){
 if(c.conditionRedFlags!=='no')missing.push('conditionRedFlags');
 if(tri(c.individualPlanConfirmed)!=='yes')missing.push('individualPlanConfirmed');
 if(p.reviewed!==true)missing.push('reviewed');
 if(h.kind==='valid'&&((ga.kind==='valid'&&h.value>(ga.days>=259?336:504))||(ga.kind==='missing'&&h.value>336))&&tri(c.persistentJaundiceReassessed)!=='yes')missing.push('persistentJaundiceReassessed');
 // Exact hours/gestation are optional. The short-path plan question explicitly includes age and persistence review.
}else if(!phaseActive)missing.push('carePhase');
if(!scopeMatches(key,p))missing.push('scope');
if(p.danger!=='no')missing.push('danger');if(p.fever!=='no')missing.push('fever');
if(missing.length)return finish('REVIEW_REQUIRED_INPUT','EXPLICIT_CURRENT_CONTEXT_REQUIRED','Confirme com a equipe se esta orientação corresponde ao episódio e à fase atuais. Uma resposta desconhecida não confirma a ausência de sinais. Se houver piora ou sinais graves, procure ajuda imediatamente.',{missingFields:[...new Set(missing)]});
const pma=ga.kind==='valid'&&h.kind==='valid'?ga.days+h.value/24:null;
return finish(key==='pps_135'?'ALLOW':updated.includes(key)?'ALLOW_POPULATION_ONLY':'ALLOW_URGENT_ONLY','POPULATION_CONFIRMED','A aplicabilidade editorial foi conferida pelas respostas. Isso não confirma diagnóstico, não autoriza alta e não altera tratamento.',{populationStatus:'confirmed',populationCompatible:true,priority:key==='pps_135'?'not_determined':'immediate',genericUrgency:false,effectiveAgeBand:age==='unknown'?'u3m':age,pmaDays:pma,correctedAgeDays:pma===null?null:pma-280,pmaDisplay:pma===null?null:Math.floor(pma/7)+' semanas e '+Math.floor(pma%7)+' dias',calculatePmaRequired:false});
}
function applyRelease(gate,policy){if(!gate?.populationCompatible)return gate;const release=policy?.[gate.requestedTopic],missing=releaseFields.filter(k=>release?.[k]!==true);if(missing.length)return {...gate,bodyDecision:'ALLOW_POPULATION_ONLY',reasonCode:'CONTENT_REVIEW_PENDING',specificBodyAllowed:false,renderedTopic:null,genericUrgency:gate.priority==='immediate',releaseMissing:missing,familyMessage:'A ficha específica ainda depende das revisões exigidas. Use o plano da equipe. Se há necessidade atual de atendimento ou sinais novos, não espere a liberação do texto para buscar ajuda.'+(gate.requestedTopic==='pps_141'?' Se a cafeína foi prescrita, mantenha exatamente a orientação; não inicie, ajuste nem suspenda por conta própria.':'')};return {...gate,bodyDecision:gate.requestedTopic==='pps_135'?'ALLOW':'ALLOW_URGENT_ONLY',specificBodyAllowed:true,renderedTopic:gate.requestedTopic,releaseMissing:[]};}
function asGuidance(r){const urgent=r.priority==='immediate';const sections=[{title:urgent?'PROCURE ATENDIMENTO SEM DEMORA':'CONFIRA A ORIENTAÇÃO COM A EQUIPE',items:[r.familyMessage]},{title:'SINAIS GRAVES E QUANDO BUSCAR SOCORRO',items:['Se o bebê não respirar normalmente, ficar arroxeado, desfalecer, convulsionar ou for muito difícil de acordar, ligue 192 e siga o atendente. Não espere preencher o formulário.','Bebê com menos de 3 meses e febre ou suspeita de febre precisa de avaliação imediata, mesmo que pareça bem.']}];const label=urgent?'Avaliação imediata':'Orientação a confirmar';return {...r,ok:true,code:r.reasonCode,mode:urgent?'urgent':'review',topic:null,label,sections,refs:['neo_samu','neo_nice_postnatal'],warnings:[r.familyMessage],text:'ORIENTAÇÕES AOS PAIS\n'+label+'\n\n'+sections.map((s,i)=>(i+1)+'. '+s.title+'\n'+s.items.map(v=>'- '+v).join('\n')).join('\n\n')};}
return Object.freeze({version:'1.0.0-external-review',keys,updated,releaseFields,norm,broad,canonical,context,scopeFor,scopeMatches,number,gestation,currentEmergency,evaluate,applyRelease,asGuidance});
});
