/* Short family path: current applicability questions only. No numeric calculator, identity, persistence, or network. */
(function(root){'use strict';const G=root.PaisNeonatalGuard;
const questions={
 pps_135:'A equipe confirmou icterícia indireta atual e que esta orientação se aplica à idade e à persistência do amarelão?',
 pps_93:'A equipe comunicou suspeita atual de cardiopatia canal-dependente ou coarctação descompensada e confirmou esta ficha para a avaliação inicial?',
 pps_136:'A equipe confirmou hemólise ou incompatibilidade Rh/ABO com amarelão e necessidade atual de avaliação intensiva? Tipos sanguíneos diferentes, sozinhos, não confirmam esse quadro.',
 pps_137:'A equipe conferiu que esta ficha de sepse precoce, incluindo quando este episódio começou e a convenção de início antes de 72 horas, corresponde ao quadro atual?',
 pps_138:'A equipe conferiu que esta ficha de sepse tardia, incluindo quando este episódio começou e a convenção de início a partir de 72 horas, corresponde ao quadro atual?',
 pps_139:'A equipe confirmou deficiência de surfactante para este episódio relacionado ao nascimento ou às primeiras horas e disse que esta ficha inicial ainda se aplica agora?',
 pps_140:'A equipe confirmou TTRN para este episódio relacionado ao nascimento ou às primeiras horas, após avaliar outras causas, e disse que esta ficha inicial ainda se aplica agora?',
 pps_141:'A equipe neonatal confirmou apneia da prematuridade neste episódio e que esta ficha inicial ainda se aplica à idade e à maturação atuais?',
 pps_142:'A equipe confirmou baixa temperatura não planejada neste episódio e esta orientação inicial? Resfriamento terapêutico planejado no hospital não está incluído.'
};
const labels={carePhase:'Para qual momento do cuidado é esta orientação?',neonatalWindowConfirmed:'O bebê ainda não completou 28 dias de vida?',prematurityConfirmed:'A equipe informou que o bebê nasceu antes de 37 semanas?',conditionRedFlags:'Há amarelão iniciado no primeiro dia, bebê difícil de acordar ou mamando mal, piora importante, choro anormal, urina escura ou fezes muito claras?',contextConfirmed:'Confirmação específica e atual da equipe',individualPlanConfirmed:'Há plano individual atual da equipe, adequado à idade e à persistência do quadro, incluindo controle e retorno?',specialistScopeConfirmed:'A equipe neonatal confirmou especificamente que esta ficha inicial ainda se aplica à idade e à maturação atuais?'};
function mount(document,guide,onInvalidate){const $=id=>document.getElementById(id),host=$('neonatalContextFields'),help=$('neonatalHelp'),controls={},rows={},fieldLabels={};let visible=[],previous=null;
for(const [name,text] of Object.entries(labels)){const row=document.createElement('div');row.className='field';const label=document.createElement('label');label.textContent=text;const select=document.createElement('select');select.id='neonatal_'+name;select.name=select.id;select.disabled=true;select.setAttribute('autocomplete','off');label.setAttribute('for',select.id);const values=name==='carePhase'?[['unknown','Não sei / não confirmado'],['urgent_or_hospital_initial','Avaliação urgente ou hospitalar inicial'],['ongoing_neonatal_hospital','Continua internado em cuidado neonatal'],['home_plan_after_assessment','Plano de cuidado em casa após avaliação'],['historical_or_resolved','Episódio antigo ou resolvido']]:[['unknown','Não sei / não confirmado'],['yes','Sim'],['no','Não']];for(const[v,t]of values){const o=document.createElement('option');o.value=v;o.textContent=t;select.appendChild(o);}select.value='unknown';row.append(label,select);host.appendChild(row);controls[name]=select;rows[name]=row;fieldLabels[name]=label;}
function facts(){return {diagnosis:$('diagnosis').value,age:$('age').value,danger:$('danger').value,fever:$('fever').value,nasal:$('nasal').value,diarrhea:$('diarrhea').value,vomiting:$('vomiting').value,risk:$('risk').value,ageMonths:$('ageMonths').value,carePhase:controls.carePhase.value,neonatalWindowConfirmed:controls.neonatalWindowConfirmed.value,prematurityConfirmed:controls.prematurityConfirmed.value,conditionRedFlags:controls.conditionRedFlags.value};}
function clearAll(){for(const c of Object.values(controls))c.value='unknown';}
function clearConfirmations(){for(const k of ['contextConfirmed','individualPlanConfirmed','specialistScopeConfirmed'])controls[k].value='unknown';$('reviewed').checked=false;}
function key(){const selected=guide.resolve($('diagnosis').value)?.key||null;return guide.neonatalClinicalKey?guide.neonatalClinicalKey(selected):selected;}
function sync(){const now=facts();if(previous&&(now.diagnosis!==previous.diagnosis||now.age!==previous.age)){clearAll();$('reviewed').checked=false;onInvalidate();}else if(previous&&Object.keys(now).some(k=>now[k]!==previous[k])){clearConfirmations();onInvalidate();}
 const k=key(),active=G.keys.includes(k);host.hidden=!active;help.hidden=!active;visible=[];
 if(active){visible.push('carePhase');if(k==='pps_141'){visible.push('prematurityConfirmed','contextConfirmed','individualPlanConfirmed');if(!['unknown','u3m'].includes($('age').value))visible.push('specialistScopeConfirmed');}else{visible.push('neonatalWindowConfirmed');if(k==='pps_135')visible.push('conditionRedFlags');visible.push('contextConfirmed');if(k==='pps_135')visible.push('individualPlanConfirmed');}
 fieldLabels.contextConfirmed.textContent=questions[k];fieldLabels.individualPlanConfirmed.textContent=k==='pps_141'?'Há plano individual atual de monitorização e tratamento definido pela equipe neonatal? Uso antigo de cafeína, sozinho, não confirma isso.':labels.individualPlanConfirmed;
 }
 for(const[n,c]of Object.entries(controls)){const enabled=visible.includes(n);rows[n].hidden=!enabled;c.disabled=!enabled;if(!enabled)c.value='unknown';}previous=facts();
}
function collect(p){const k=key();if(!G.keys.includes(k))return undefined;const c={};for(const n of visible)c[n]=controls[n].value;const runtime={...p,populationContext:c};c.scope=G.scopeFor(k,runtime);return c;}
function reset(){clearAll();previous=null;sync();}
sync();return Object.freeze({sync,collect,reset,isActive:()=>G.keys.includes(key())});}
root.PaisNeonatalUI=Object.freeze({mount,questions});
})(typeof window!=='undefined'?window:globalThis);
