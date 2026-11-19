
(function(root){'use strict';const expected={"clinicalDocumentSha256":"bc61eb2be4ce5dc3d4b96f83d73ebddcbc27bfb80e149783e235c13067f45c11","aliases":["tce","trauma craniano","traumatismo craniano","Batida na cabeça","Traumatismo cranioencefálico","Trauma cranioencefálico","queimadura","Queimadura térmica","Queimaduras","Queimaduras térmicas"],"removals":[{"key":"pps_54","remove":["tce","trauma craniano","traumatismo craniano","Batida na cabeça"]},{"key":"pps_72","remove":["queimadura"]}]},base=root.PaisGuide,loaded=base?.traumaBroadContainment;
const ready=!!(loaded&&loaded.clinicalDocumentSha256===expected.clinicalDocumentSha256&&typeof loaded.groupFor==='function');
root.PaisTraumaLoadStatus={ready,expectedClinicalDocumentSha256:expected.clinicalDocumentSha256,loadedClinicalDocumentSha256:loaded?.clinicalDocumentSha256||null,fallbackActive:!ready};
if(ready||!base)return;
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim(),names=new Set(expected.aliases.map(norm)),changes=new Map(expected.removals.map(x=>[x.key,new Set(x.remove)]));
const topics=base.topics.map(t=>changes.has(t.key)?{...t,aliases:t.aliases.filter(a=>!changes.get(t.key).has(a))}:t),byKey=new Map(topics.map(t=>[t.key,t]));
function resolve(value){if(names.has(norm(value)))return null;const t=base.resolve(value);return t?(byKey.get(t.key)||t):null;}
function build(input={}){const p=input&&typeof input==='object'?input:{};if(!names.has(norm(p.diagnosis)))return base.build(p);
const N=root.PaisNeonatalGuard,P=root.PaisPopulationGuard;if(p.danger==='yes'||(typeof N?.currentEmergency==='function'&&N.currentEmergency(null,p))||(typeof P?.emergency==='function'&&P.emergency(p,null)))return base.build(p);
return {ok:false,code:'TRAUMA_SCOPE_LOAD_REQUIRED',message:'Não foi possível carregar a proteção para nomes amplos de trauma. Nenhuma ficha específica foi gerada. Confirme a orientação adequada com a equipe; diante de sinais de alarme, procure atendimento sem esperar recarregar a página.'};}
root.PaisGuide={...base,topics,resolve,build,traumaBroadLoadFallback:true,audit(){return {...base.audit(),traumaBroadContainmentLoad:{ready:false,fallbackActive:true,broadSpecificBodiesBlocked:true}};}};
})(window);
