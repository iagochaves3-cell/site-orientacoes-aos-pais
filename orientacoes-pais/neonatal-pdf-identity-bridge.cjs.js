/* Candidate only: reuse protected neonatal bodies while retaining PDF record identity. */
(function(root){'use strict';
 const base=root.PaisGuide,G=root.PaisNeonatalGuard;
 const links=Object.freeze({pdf1500_1365:'pps_137',pdf1500_1366:'pps_138'});
 function clinicalKey(key){return links[key]||key;}
 function inherited(input){const prior=root.PaisGuide;root.PaisGuide=base;try{return base.build(input);}finally{root.PaisGuide=prior;}}
 function build(input={}){
  const p=input&&typeof input==='object'?input:{},selected=base.resolve(p.diagnosis),canonical=links[selected?.key];
  if(!canonical)return inherited(input);
  const forwarded={...p,diagnosis:canonical,populationContext:{...G.context(p)}};
  // Translate the identity-bound scope only after verifying the original current answers.
  // This does not supply any clinical answer, infer onset, or select a different subtype.
  if(G.scopeMatches(canonical,p))forwarded.populationContext.scope=G.scopeFor(canonical,forwarded);
  else delete forwarded.populationContext.scope;
  const result=inherited(forwarded);
  if(!result?.specificBodyAllowed||result.topic!==canonical)return {...result,requestedRecordKey:selected.key,clinicalTopicKey:canonical};
  return {...result,topic:selected.key,label:selected.label,requestedRecordKey:selected.key,clinicalTopicKey:canonical,
   text:result.text.replace('ORIENTAÇÕES AOS PAIS — '+result.label,'ORIENTAÇÕES AOS PAIS — '+selected.label)};
 }
 root.PaisGuide={...base,build,neonatalClinicalKey:clinicalKey};
})(typeof window!=='undefined'?window:globalThis);
