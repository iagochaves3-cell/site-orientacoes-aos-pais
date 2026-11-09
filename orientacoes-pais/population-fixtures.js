/* Explicit synthetic inputs for hidden technical self-tests ONLY; never consulted by build. */
(function(root){'use strict';const G=root.PaisPopulationGuard;function forTopic(key){let p;
 if(key==='pps_81')p={diagnosis:key,age:'2a5',reviewed:true,populationContext:{populationAgeYears:5,contextConfirmed:'yes',hasDaytimeUrinarySymptoms:'no',previousDrySixMonths:'no'}};
 else if(key==='pps_21')p={diagnosis:key,age:'3a5m',reviewed:true,populationContext:{contextConfirmed:'yes',conditionRedFlags:'no'}};
 else if(key==='pps_114')p={diagnosis:key,age:'1a',reviewed:true,populationContext:{contextConfirmed:'yes',individualPlanConfirmed:'yes'}};
 else return null;
 p.populationContext.scope=G.scopeFor(key,p);return p;
}root.PaisPopulationFixtures=Object.freeze({forTopic});})(typeof window!=='undefined'?window:globalThis);
