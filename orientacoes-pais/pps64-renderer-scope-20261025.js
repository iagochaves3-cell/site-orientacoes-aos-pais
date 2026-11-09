(function(root){
  'use strict';
  const base=root.PaisGuide,renderer=root.PaisSkinVerifiedRenderer20261025;
  const target=base.topics.find(t=>t.key==='pps_64');
  if(!target||!renderer)return;
  const expectedTopic=JSON.stringify(target);
  function inherited(input){
    const current=root.PaisGuide;root.PaisGuide=base;
    try{return base.build(input);}finally{root.PaisGuide=current;}
  }
  function build(input={}){
    const selected=base.resolve(input?.diagnosis);
    if(selected?.key!=='pps_64')return inherited(input);
    const currentTopic=root.PaisGuide.topics.find(t=>t.key==='pps_64');
    if(JSON.stringify(currentTopic)!==expectedTopic)return inherited(input);
    const result=renderer.render({...input,diagnosis:'pps_64'});
    if(!result?.ok||result.specificBodyAllowed===false)return result;
    if(!renderer.validReferences(result.refs,root.PaisGuide.sources))return inherited(input);
    return result;
  }
  root.PaisGuide={...base,build,pps64ScopedRenderer20261025:true};
})(typeof window!=='undefined'?window:globalThis);
