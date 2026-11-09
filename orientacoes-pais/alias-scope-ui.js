/* Form-only scope selection. Existing output invalidation is reused. No CSS or persistence. */
(function(root){'use strict';
function mount(document,guide,onInvalidate){
 const $=id=>document.getElementById(id),host=$('aliasScopeFields'),A=guide.aliasScope;
 let previousDiagnosis=$('diagnosis').value,previousAge=$('age').value,previousTopic='',previousEpisode='unknown',active=null;
 function field(id,labelText,values){const row=document.createElement('div');row.className='field';const label=document.createElement('label');label.setAttribute('for',id);label.textContent=labelText;const select=document.createElement('select');select.id=id;select.name=id;select.setAttribute('autocomplete','off');row.append(label,select);host.appendChild(row);fill(select,values);return {row,label,select};}
 function fill(select,values){select.replaceChildren();for(const [v,text]of values){const option=document.createElement('option');option.value=v;option.textContent=text;select.appendChild(option);}select.value=values[0][0];}
 const topic=field('aliasScopeTopic','Cenário avaliado pela equipe',[['','Não sei / outro cenário']]);
 const episode=field('aliasScopeCurrentEpisode','Há suspeita ou diagnóstico de cetoacidose em curso agora?',[['unknown','Não sei / não informado'],['yes','Sim, neste momento'],['no','Não, apenas histórico / episódio passado']]);
 const confirm=field('aliasScopeConfirmed','A equipe confirmou que a ficha escolhida corresponde ao quadro e ao momento atuais?',[['unknown','Não sei / não confirmado'],['yes','Sim'],['no','Não']]);
 const help=document.createElement('p');help.className='help';help.textContent='Escolher um nome não confirma o subtipo. Use a avaliação da equipe; estas perguntas não fazem diagnóstico.';host.appendChild(help);
 function resetValues(){topic.select.value='';episode.select.value='unknown';confirm.select.value='unknown';previousTopic='';previousEpisode='unknown';}
 function sync(){const diagnosis=$('diagnosis').value,age=$('age').value,g=A.groupFor(diagnosis),changed=diagnosis!==previousDiagnosis||age!==previousAge;
  if(changed){resetValues();$('reviewed').checked=false;previousDiagnosis=diagnosis;previousAge=age;onInvalidate();}
  if((g?.id||null)!==active){fill(topic.select,[['','Não sei / outro cenário'],...(g?g.options.map(x=>[x.key,x.label]):[])]);resetValues();active=g?.id||null;}
  if(topic.select.value!==previousTopic||episode.select.value!==previousEpisode){confirm.select.value='unknown';previousTopic=topic.select.value;previousEpisode=episode.select.value;onInvalidate();}
  host.hidden=!g;topic.select.disabled=!g;confirm.select.disabled=!g;episode.row.hidden=g?.id!=='cad';episode.select.disabled=g?.id!=='cad';if(!g)resetValues();
 }
 function collect(){sync();const g=A.groupFor($('diagnosis').value);if(!g)return undefined;const p={diagnosis:$('diagnosis').value,age:$('age').value};return {scope:A.scopeFor(p),group:g.id,topicKey:topic.select.value,confirmed:confirm.select.value,currentEpisode:g.id==='cad'?episode.select.value:'unknown'};}
 function reset(){resetValues();previousDiagnosis=$('diagnosis').value;previousAge=$('age').value;sync();}
 sync();return Object.freeze({sync,collect,reset});
}
root.PaisAliasScopeUI=Object.freeze({mount});
})(typeof window!=='undefined'?window:globalThis);
