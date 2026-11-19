(function(root){
'use strict';
const base=root.PaisGuide,id='pdf1500_341',canonical='pps_catalog_766f0c1503706658',pdf=base.topics.find(t=>t.key===id),src=base.topics.find(t=>t.key===canonical);
if(!pdf||!src||!src.specificGuidance)throw Error('Missing dengue identities');
const topic={...pdf,sections:src.sections,refs:src.refs,generalGuidanceMode:false,catalogOnly:false,specificGuidance:true,clinicalEntity:src.clinicalEntity};
const match=v=>v===id||String(v||'').trim().toLocaleLowerCase('pt-BR')===pdf.label.toLocaleLowerCase('pt-BR');
root.PaisGuide={...base,topics:base.topics.map(t=>t.key===id?topic:t),resolve(v){return match(v)?topic:base.resolve(v);},
build(p={}){if(!match(p?.diagnosis))return base.build(p);const old=base.build(p);if(old?.specificBodyAllowed===false||!old?.ok)return old;
const out=base.build({...p,diagnosis:canonical});if(!out.ok||!out.directedGuidance)return out;return {...out,topic:id,label:pdf.label,text:out.text.replace('ORIENTAÇÕES AOS PAIS — '+src.label,'ORIENTAÇÕES AOS PAIS — '+pdf.label)};}};
})(window);
