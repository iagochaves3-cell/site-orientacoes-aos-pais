
(function(root){'use strict';
if(root.PaisSkinInfectionAllergyLoadStatus?.ready!==true)return;
const verified=root.PaisGuide,expectedSources=Object.fromEntries(Object.entries(verified.sources).map(([id,source])=>[id,JSON.stringify(source)]));
root.PaisSkinVerifiedRenderer20261025=Object.freeze({
render(input){const current=root.PaisGuide;root.PaisGuide=verified;try{return verified.build(input);}finally{root.PaisGuide=current;}},
validReferences(refs,registry){return Array.isArray(refs)&&refs.every(id=>Object.hasOwn(expectedSources,id)&&JSON.stringify(registry?.[id])===expectedSources[id]);}
});
})(window);
