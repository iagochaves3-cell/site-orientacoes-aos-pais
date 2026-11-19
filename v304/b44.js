
(function(root){'use strict';
 const base=root.PaisGuide;
 const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
 const blockedLabels=new Set(['especificado','infecciosa','medicamentos','pneumoniae','por medicamentos','recorrente'].map(normalize));
 const hiddenKeys=new Set(base.topics.filter(t=>blockedLabels.has(normalize(t.label))).map(t=>t.key));
 const catalogVisibleTopics20261028=base.topics.filter(t=>!hiddenKeys.has(t.key));
 const currentEmergency=input=>input?.danger==='yes'||(typeof root.PaisNeonatalGuard?.currentEmergency==='function'&&root.PaisNeonatalGuard.currentEmergency(null,input))||(typeof root.PaisPopulationGuard?.emergency==='function'&&root.PaisPopulationGuard.emergency(input,null));
 const issue=()=>({ok:false,code:'SOURCE_TERM_ISSUE',specificBodyAllowed:false,message:'O termo informado é incompleto ou ambíguo e não identifica um diagnóstico. Confirme e corrija o diagnóstico registrado antes de gerar orientações.'});
 root.PaisGuide={...base,
  resolve(value){return blockedLabels.has(normalize(value))?null:base.resolve(value);},
  build(input={}){
   if(blockedLabels.has(normalize(input?.diagnosis))&&!currentEmergency(input))return issue();
   return base.build(input);
  },
  catalogVisibleTopics20261028,
  catalogIdentityGuard20261028:{blockedLabels:[...blockedLabels],hiddenKeys:[...hiddenKeys]},
  audit(){const report=base.audit();return {...report,catalogIdentityGuard20261028:{ok:hiddenKeys.size===28&&catalogVisibleTopics20261028.length===base.topics.length-28,blockedLabels:blockedLabels.size,hiddenKeys:hiddenKeys.size}};}
 };
})(window);
