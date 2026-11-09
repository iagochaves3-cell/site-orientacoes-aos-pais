/* Last engine wrapper: preserves the active resolver and every prior clinical wrapper. */
(function(root){'use strict';const base=root.PaisGuide,G=root.PaisPopulationGuard;
if(!base||!G||!root.PaisPopulationFixtures)throw Error('Population prototype prerequisites not loaded');
if(base.populationGuard)throw Error('Population wrapper already installed');
function build(input={}){
 const p=input&&typeof input==='object'?input:{};
 // Danger is evaluated before even trying to resolve a diagnosis or parse an age.
 if(p.danger==='yes'){
  const emergency=base.build({...p,diagnosis:'resfriado',age:'unknown'});
  const gate=G.emergency(p,G.keys.includes(p.diagnosis)?p.diagnosis:null);
  return emergency.ok&&emergency.mode==='urgent'?{...emergency,...gate}:G.asGuidance(gate);
 }
 const t=base.resolve(p.diagnosis),key=t?.key||null;
 // Small-infant fever is never hidden by age conflicts or unknown diagnostic labels.
 const urgent=G.emergency(p,key);
 if(urgent){
  if(!G.keys.includes(key)&&urgent.reasonCode==='INFANT_FEVER')return base.build({...p,diagnosis:'resfriado',age:'u3m'});
  return G.asGuidance(urgent);
 }
 if(!G.keys.includes(key))return base.build(p);
 const gate=G.evaluate(key,p);
 if(!gate.specificBodyAllowed)return G.asGuidance(gate);
 const output=base.build({...p,age:gate.effectiveAgeBand});
 if(!output.ok)return {...output,population:gate};
 return {...output,...gate,topic:output.topic,renderedTopic:output.topic,specificBodyAllowed:output.mode!=='urgent',population:gate};
}
function audit(){const old=base.audit(),issues=[...(old.issues||[])];for(const key of G.keys){const synthetic=root.PaisPopulationFixtures.forTopic(key),ok=build(synthetic),blocked=build({diagnosis:key,age:synthetic.age,reviewed:true});if(!ok.ok||!ok.specificBodyAllowed||ok.topic!==key)issues.push(key+':population-valid-synthetic');if(blocked.specificBodyAllowed||blocked.topic!==null)issues.push(key+':population-missing-context');}return {...old,ok:issues.length===0,issues,populationPrototype:{rules:G.keys.length,pendingIndependentReview:true}};}
root.PaisGuide={...base,build,audit,populationGuard:{version:G.version,keys:G.keys,prototype:true,pendingIndependentReview:true}};
})(typeof window!=='undefined'?window:globalThis);
