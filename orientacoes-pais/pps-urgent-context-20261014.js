(function(root){'use strict';
const base=root.PaisGuide;
function build(p={}){
 const result=base.build(p);
 // Context identification only. Never regenerate a guarded body with altered clinical inputs.
 if(!result?.ok||result.mode!=='urgent'||result.topic!=null)return result;
 const selected=base.resolve(p?.diagnosis);
 if(!selected)return result;
 const label='Avaliação imediata — tema informado: '+selected.label;
 const context='Tema informado: '+selected.label+'. Isso identifica a seleção, não confirma o diagnóstico nem libera cuidados em casa.';
 const text=typeof result.text==='string'?result.text+'\n\n'+context:result.text;
 return {...result,topic:selected.key,label,text,selectedTopicContext:{key:selected.key,label:selected.label,diagnosisConfirmed:false,clinicalBodyUnchanged:true}};
}
root.PaisGuide={...base,build,urgentContextRevision:{checked:'2026-10-14',scope:'identity_only',clinicalBodyRegenerated:false}};
})(typeof window!=='undefined'?window:globalThis);
