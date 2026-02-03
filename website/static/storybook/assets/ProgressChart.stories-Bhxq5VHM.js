import{P as Y}from"./ProgressChart-BgFKRv5z.js";import"./jsx-runtime-CDt2p4po.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";import"./Box-DYJzRMmP.js";import"./Stack-DhhoTPuC.js";import"./Typography-Wmkp-g7N.js";import"./Button-Dn0472P0.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./Card-BNT5PrJ5.js";import"./Badge-CpH0PNM6.js";import"./useEventBus-BNZMNlv8.js";import"./trending-up-D7By3kN5.js";import"./trending-down-Dv2LyMoL.js";import"./minus-CvoF9liV.js";const te={title:"Blaz-Klemenc/Molecules/ProgressChart",component:Y,parameters:{layout:"padded"},tags:["autodocs"]},c=[{date:"2024-01-01",value:85,label:"Weight (kg)"},{date:"2024-01-08",value:84.5,label:"Weight (kg)"},{date:"2024-01-15",value:84,label:"Weight (kg)"},{date:"2024-01-22",value:83.2,label:"Weight (kg)"},{date:"2024-01-29",value:82.8,label:"Weight (kg)"},{date:"2024-02-05",value:82.5,label:"Weight (kg)"}],N=[{date:"2024-01-01",value:80,label:"Squat (kg)"},{date:"2024-01-08",value:85,label:"Squat (kg)"},{date:"2024-01-15",value:87.5,label:"Squat (kg)"},{date:"2024-01-22",value:90,label:"Squat (kg)"},{date:"2024-01-29",value:92.5,label:"Squat (kg)"},{date:"2024-02-05",value:95,label:"Squat (kg)"}],U=[{date:"2024-01-01",value:7,label:"Wellness Score"},{date:"2024-01-02",value:6,label:"Wellness Score"},{date:"2024-01-03",value:8,label:"Wellness Score"},{date:"2024-01-04",value:7,label:"Wellness Score"},{date:"2024-01-05",value:9,label:"Wellness Score"},{date:"2024-01-06",value:8,label:"Wellness Score"},{date:"2024-01-07",value:7,label:"Wellness Score"}],e={args:{data:c,metric:"Weight Progress",unit:"kg"}},a={args:{data:N,metric:"Squat Progress",unit:"kg",chartType:"line"}},t={args:{data:U,metric:"Weekly Wellness",chartType:"bar"}},r={args:{data:c,metric:"Body Weight",unit:"kg"}},s={args:{data:U,metric:"Wellness Score",dateRange:"week"}},o={args:{data:N,metric:"Lift Tracking",unit:"kg",dateRange:"month"}},n={args:{data:c,metric:"Weight Over Time",unit:"kg",showDateSelector:!0}},l={args:{data:[],metric:"No Data Yet"}},i={args:{data:[{date:"2024-01-15",value:85,label:"Starting Weight"}],metric:"Initial Measurement",unit:"kg"}};var g,m,d;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    data: weightProgressData,
    metric: "Weight Progress",
    unit: "kg"
  }
}`,...(d=(m=e.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var u,p,h;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    data: liftProgressData,
    metric: "Squat Progress",
    unit: "kg",
    chartType: "line"
  }
}`,...(h=(p=a.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var S,W,k;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    data: wellnessData,
    metric: "Weekly Wellness",
    chartType: "bar"
  }
}`,...(k=(W=t.parameters)==null?void 0:W.docs)==null?void 0:k.source}}};var D,b,v;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    data: weightProgressData,
    metric: "Body Weight",
    unit: "kg"
  }
}`,...(v=(b=r.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var P,f,w;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    data: wellnessData,
    metric: "Wellness Score",
    dateRange: "week"
  }
}`,...(w=(f=s.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};var y,q,R;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    data: liftProgressData,
    metric: "Lift Tracking",
    unit: "kg",
    dateRange: "month"
  }
}`,...(R=(q=o.parameters)==null?void 0:q.docs)==null?void 0:R.source}}};var T,B,M;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    data: weightProgressData,
    metric: "Weight Over Time",
    unit: "kg",
    showDateSelector: true
  }
}`,...(M=(B=n.parameters)==null?void 0:B.docs)==null?void 0:M.source}}};var C,L,E;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    data: [],
    metric: "No Data Yet"
  }
}`,...(E=(L=l.parameters)==null?void 0:L.docs)==null?void 0:E.source}}};var O,x,I;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    data: [{
      date: "2024-01-15",
      value: 85,
      label: "Starting Weight"
    }],
    metric: "Initial Measurement",
    unit: "kg"
  }
}`,...(I=(x=i.parameters)==null?void 0:x.docs)==null?void 0:I.source}}};const re=["Default","LiftProgress","BarChart","WithUnit","WeekDateRange","MonthDateRange","WithDateSelector","EmptyData","SingleDataPoint"];export{t as BarChart,e as Default,l as EmptyData,a as LiftProgress,o as MonthDateRange,i as SingleDataPoint,s as WeekDateRange,n as WithDateSelector,r as WithUnit,re as __namedExportsOrder,te as default};
