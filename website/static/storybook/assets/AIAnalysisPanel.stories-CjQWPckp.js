import{A as B}from"./AIAnalysisPanel-DA1CdsMP.js";import"./jsx-runtime-CDt2p4po.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";import"./Box-DYJzRMmP.js";import"./Stack-1XI3stiC.js";import"./Typography-Wmkp-g7N.js";import"./Button-B7t-_IKa.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./Card-BNT5PrJ5.js";import"./useEventBus-BNZMNlv8.js";import"./sparkles-CE_owp1l.js";import"./refresh-cw-Ocr-wooT.js";import"./lightbulb-BScBdEp_.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";const re={title:"Blaz-Klemenc/Organisms/AIAnalysisPanel",component:B,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{showRegenerate:{control:"boolean",description:"Show regenerate button"},isLoading:{control:"boolean",description:"Is analysis being regenerated"},compact:{control:"boolean",description:"Use compact display mode"}}},e={id:"analysis-1",resourceType:"MealPlan",resourceId:"meal-plan-1",content:"Based on the nutritional data and training schedule, this meal plan provides adequate protein intake (1.8g/kg body weight) and is well-timed around workout sessions. The carbohydrate distribution supports training intensity while maintaining a moderate caloric deficit for body composition goals.",recommendations:["Consider adding a pre-workout snack 1-2 hours before evening sessions","Increase vegetable intake at lunch for better micronutrient balance","Add omega-3 rich foods like salmon or walnuts twice per week","Consider a casein protein source before bed for overnight recovery"],warnings:["Fiber intake is below recommended 25g/day - may affect digestive health","Vitamin D levels may be insufficient - consider supplementation or sun exposure"],highlights:["Excellent protein distribution across meals","Good hydration protocol with 3L daily target","Meal timing aligns well with training schedule"],generatedAt:new Date(Date.now()-2*60*60*1e3),confidence:.87},U={id:"analysis-2",resourceType:"ProgressEntry",resourceId:"progress-1",content:"Your progress over the last 4 weeks shows consistent improvement in strength metrics. Upper body lifts have increased by an average of 8%, while lower body shows a 12% improvement.",generatedAt:new Date,confidence:.92},F={id:"analysis-3",resourceType:"TrainingSession",resourceId:"session-1",content:"Analysis of your recent training session reveals some areas that need attention for optimal progress and injury prevention.",warnings:["Form breakdown observed during heavy squats - consider deload week","RPE consistently exceeding target - risk of overtraining","Recovery time between sets is too short for strength gains","Left-right imbalance detected in single-leg movements"],generatedAt:new Date(Date.now()-30*60*1e3),confidence:.78},N={id:"analysis-4",resourceType:"User",resourceId:"user-1",content:"Excellent work this month! Your dedication to the program is showing clear results across multiple metrics.",highlights:["100% session attendance rate this month","Personal record in deadlift: 140kg","Body fat reduced by 2.3%","Sleep quality improved by 18%","Consistency score at all-time high: 95%"],generatedAt:new Date,confidence:.95},s={args:{analysis:e,showRegenerate:!0,isLoading:!1,compact:!1}},a={args:{analysis:e,compact:!0}},n={args:{analysis:e,showRegenerate:!0,isLoading:!0}},r={args:{analysis:e,showRegenerate:!1}},o={args:{analysis:U,showRegenerate:!0}},t={args:{analysis:F,showRegenerate:!0}},i={args:{analysis:N,showRegenerate:!0}},c={args:{analysis:{...e,confidence:.45,content:"Limited data available for comprehensive analysis. Consider logging more sessions and meals for better insights."},showRegenerate:!0}},l={args:{analysis:{...e,confidence:.98},showRegenerate:!0}};var d,g,m;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    analysis: fullAnalysis,
    showRegenerate: true,
    isLoading: false,
    compact: false
  }
}`,...(m=(g=s.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};var p,u,h;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    analysis: fullAnalysis,
    compact: true
  }
}`,...(h=(u=a.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var y,f,w;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    analysis: fullAnalysis,
    showRegenerate: true,
    isLoading: true
  }
}`,...(w=(f=n.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};var b,v,R;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    analysis: fullAnalysis,
    showRegenerate: false
  }
}`,...(R=(v=r.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};var A,k,L;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    analysis: minimalAnalysis,
    showRegenerate: true
  }
}`,...(L=(k=o.parameters)==null?void 0:k.docs)==null?void 0:L.source}}};var S,W,C;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    analysis: analysisWithWarnings,
    showRegenerate: true
  }
}`,...(C=(W=t.parameters)==null?void 0:W.docs)==null?void 0:C.source}}};var D,I,T;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    analysis: analysisWithHighlights,
    showRegenerate: true
  }
}`,...(T=(I=i.parameters)==null?void 0:I.docs)==null?void 0:T.source}}};var x,H,P;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    analysis: {
      ...fullAnalysis,
      confidence: 0.45,
      content: "Limited data available for comprehensive analysis. Consider logging more sessions and meals for better insights."
    },
    showRegenerate: true
  }
}`,...(P=(H=c.parameters)==null?void 0:H.docs)==null?void 0:P.source}}};var E,M,q;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    analysis: {
      ...fullAnalysis,
      confidence: 0.98
    },
    showRegenerate: true
  }
}`,...(q=(M=l.parameters)==null?void 0:M.docs)==null?void 0:q.source}}};const oe=["Default","Compact","Loading","NoRegenerate","Minimal","WithWarnings","WithHighlights","LowConfidence","HighConfidence"];export{a as Compact,s as Default,l as HighConfidence,n as Loading,c as LowConfidence,o as Minimal,r as NoRegenerate,i as WithHighlights,t as WithWarnings,oe as __namedExportsOrder,re as default};
