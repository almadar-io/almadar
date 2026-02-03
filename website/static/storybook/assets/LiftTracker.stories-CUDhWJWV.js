import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as g}from"./index-GiUgBvb1.js";import{c as oe}from"./cn-BNf5BS2b.js";import{B as u}from"./Box-DYJzRMmP.js";import{V as m,H as o}from"./Stack-DhhoTPuC.js";import{T as a}from"./Typography-Wmkp-g7N.js";import{B as h}from"./Button-Dn0472P0.js";import{C as le}from"./Card-BNT5PrJ5.js";import{B as ce}from"./Badge-CpH0PNM6.js";import{u as me}from"./useEventBus-BNZMNlv8.js";import{D as de}from"./dumbbell-GoIYbK-o.js";import{P as pe}from"./plus-jSzJaRn3.js";import{T as B}from"./trending-up-D7By3kN5.js";import{E as ge}from"./eye-DPfPdwVp.js";import{P as ue}from"./pen-DNARvM59.js";import{T as he}from"./trash-2-ChlfdFMf.js";import{C as xe}from"./chevron-up-B8qTw58L.js";import{C as fe}from"./chevron-down-BQmz_Bpa.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";const we=l=>new Date(l).toLocaleDateString("en-US",{month:"short",day:"numeric"}),je=(l,i)=>{const r=l.filter(t=>t.exerciseName===i).sort((t,d)=>new Date(d.date).getTime()-new Date(t.date).getTime());if(r.length<2)return null;const S=r[0].weight,n=r[1].weight,c=S-n,b=Math.abs(c/n*100);return{direction:c>0?"up":c<0?"down":"same",percentage:Math.round(b*10)/10}},Ne=l=>l.reduce((i,r)=>(i[r.exerciseName]||(i[r.exerciseName]=[]),i[r.exerciseName].push(r),i),{}),k=({lifts:l,traineeId:i,trainerId:r,showSummary:S=!0,entity:n="Lift",maxVisible:c=5,className:b})=>{const t=me(),[d,X]=g.useState(!1),f=l??[],w=[...f].sort((s,p)=>new Date(p.date).getTime()-new Date(s.date).getTime()),C=d?w:w.slice(0,c),Y=w.length>c,Z=g.useCallback(()=>{t.emit("UI:LOG_LIFT",{traineeId:i,trainerId:r,entity:n})},[t,i,r,n]),$=g.useCallback(s=>{t.emit("UI:VIEW",{row:s,entity:n})},[t,n]),ee=g.useCallback(s=>{t.emit("UI:EDIT",{row:s,entity:n})},[t,n]),se=g.useCallback(s=>{t.emit("UI:DELETE",{row:s,entity:n})},[t,n]),te=Ne(f),E=Object.entries(te).map(([s,p])=>{const ae=p.sort((D,ie)=>new Date(ie.date).getTime()-new Date(D.date).getTime())[0],re=je(f,s),ne=Math.max(...p.map(D=>D.weight));return{exerciseName:s,latest:ae,trend:re,maxWeight:ne,count:p.length}});return e.jsx(le,{className:oe("p-4",b),children:e.jsxs(m,{gap:"md",children:[e.jsxs(o,{justify:"between",align:"center",children:[e.jsxs(o,{gap:"sm",align:"center",children:[e.jsx(u,{display:"flex",rounded:"lg",padding:"sm",className:"items-center justify-center bg-red-100",children:e.jsx(de,{className:"h-5 w-5 text-red-600"})}),e.jsxs(m,{gap:"none",children:[e.jsx(a,{variant:"h4",children:"Lift Progress"}),e.jsxs(a,{variant:"small",className:"text-neutral-500",children:[f.length," entries logged"]})]})]}),e.jsxs(h,{variant:"primary",size:"sm",onClick:Z,children:[e.jsx(pe,{className:"h-4 w-4 mr-1"}),"Log Lift"]})]}),S&&E.length>0&&e.jsx(u,{className:"grid grid-cols-2 gap-2 sm:grid-cols-3",children:E.slice(0,6).map(s=>e.jsx(u,{rounded:"lg",padding:"sm",className:"bg-neutral-50",children:e.jsxs(m,{gap:"xs",children:[e.jsx(a,{variant:"small",className:"text-neutral-600 truncate",children:s.exerciseName}),e.jsxs(o,{gap:"xs",align:"center",children:[e.jsx(a,{variant:"h4",className:"text-neutral-900",children:s.latest.weight}),e.jsx(a,{variant:"small",className:"text-neutral-500",children:"kg"}),s.trend&&s.trend.direction!=="same"&&e.jsxs(ce,{variant:s.trend.direction==="up"?"success":"danger",size:"sm",children:[s.trend.direction==="up"?e.jsx(B,{className:"h-3 w-3"}):e.jsx(B,{className:"h-3 w-3 rotate-180"}),s.trend.percentage,"%"]})]}),e.jsxs(a,{variant:"small",className:"text-neutral-400",children:["PR: ",s.maxWeight,"kg"]})]})},s.exerciseName))}),e.jsxs(m,{gap:"sm",children:[e.jsx(a,{variant:"label",className:"text-neutral-600",children:"Recent Entries"}),C.length===0?e.jsx(u,{padding:"md",className:"text-center bg-neutral-50 rounded-lg",children:e.jsx(a,{variant:"body",className:"text-neutral-500",children:"No lifts logged yet. Start tracking your progress!"})}):e.jsx(m,{gap:"xs",children:C.map(s=>e.jsx(u,{rounded:"lg",padding:"sm",border:!0,className:"bg-white hover:bg-neutral-50 transition-colors",children:e.jsxs(o,{justify:"between",align:"center",children:[e.jsx(o,{gap:"sm",align:"center",children:e.jsxs(m,{gap:"none",children:[e.jsx(a,{variant:"body",className:"font-medium",children:s.exerciseName}),e.jsx(a,{variant:"small",className:"text-neutral-500",children:we(s.date)})]})}),e.jsxs(o,{gap:"md",align:"center",children:[e.jsx(o,{gap:"sm",children:e.jsxs(m,{gap:"none",align:"end",children:[e.jsxs(a,{variant:"body",className:"font-semibold",children:[s.weight,"kg"]}),e.jsxs(a,{variant:"small",className:"text-neutral-500",children:[s.sets,"x",s.reps]})]})}),e.jsxs(o,{gap:"xs",children:[e.jsx(h,{variant:"ghost",size:"sm",onClick:()=>$(s),className:"text-neutral-400 hover:text-blue-500",children:e.jsx(ge,{className:"h-4 w-4"})}),e.jsx(h,{variant:"ghost",size:"sm",onClick:()=>ee(s),className:"text-neutral-400 hover:text-blue-500",children:e.jsx(ue,{className:"h-4 w-4"})}),e.jsx(h,{variant:"ghost",size:"sm",onClick:()=>se(s),className:"text-neutral-400 hover:text-red-500",children:e.jsx(he,{className:"h-4 w-4"})})]})]})]})},s.id))}),Y&&e.jsx(h,{variant:"ghost",size:"sm",onClick:()=>X(!d),className:"w-full",children:d?e.jsxs(e.Fragment,{children:[e.jsx(xe,{className:"h-4 w-4 mr-1"}),"Show Less"]}):e.jsxs(e.Fragment,{children:[e.jsx(fe,{className:"h-4 w-4 mr-1"}),"Show ",w.length-c," More"]})})]})]})})};k.displayName="LiftTracker";k.__docgenInfo={description:"",methods:[],displayName:"LiftTracker",props:{lifts:{required:!1,tsType:{name:"Array",elements:[{name:"LiftData"}],raw:"LiftData[]"},description:"Array of lift entries to display"},traineeId:{required:!1,tsType:{name:"string"},description:"Trainee ID for context"},trainerId:{required:!1,tsType:{name:"string"},description:"Trainer ID for context"},showSummary:{required:!1,tsType:{name:"boolean"},description:"Show summary cards for each exercise",defaultValue:{value:"true",computed:!1}},showProgressChart:{required:!1,tsType:{name:"boolean"},description:"Show progress chart"},groupByExercise:{required:!1,tsType:{name:"boolean"},description:"Group by exercise name"},entity:{required:!1,tsType:{name:"string"},description:"Entity context for events",defaultValue:{value:'"Lift"',computed:!1}},operations:{required:!1,tsType:{name:"Array",elements:[{name:"LiftOperation"}],raw:"LiftOperation[]"},description:"Operations/actions available"},maxVisible:{required:!1,tsType:{name:"number"},description:"Max entries to show before collapse",defaultValue:{value:"5",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const Ve={title:"Blaz-Klemenc/Molecules/LiftTracker",component:k,parameters:{layout:"padded"},tags:["autodocs"]},x=[{id:"lift-1",exerciseName:"Squat",weight:100,reps:8,sets:4,date:new Date("2024-01-15"),notes:"Felt strong today"},{id:"lift-2",exerciseName:"Deadlift",weight:120,reps:5,sets:5,date:new Date("2024-01-14")},{id:"lift-3",exerciseName:"Bench Press",weight:80,reps:10,sets:3,date:new Date("2024-01-13"),notes:"Working on form"}],j={args:{lifts:x}},N={args:{lifts:[x[0]]}},v={args:{lifts:[]}},y={args:{lifts:x,showSummary:!0}},L={args:{lifts:x,traineeId:"trainee-123",trainerId:"trainer-456"}},T={args:{lifts:[...x,{id:"lift-4",exerciseName:"Overhead Press",weight:50,reps:8,sets:4,date:new Date("2024-01-12")},{id:"lift-5",exerciseName:"Barbell Row",weight:70,reps:10,sets:3,date:new Date("2024-01-11")},{id:"lift-6",exerciseName:"Squat",weight:105,reps:6,sets:4,date:new Date("2024-01-10"),notes:"PR attempt"}],showSummary:!0}};var I,q,P;j.parameters={...j.parameters,docs:{...(I=j.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    lifts: sampleLifts
  }
}`,...(P=(q=j.parameters)==null?void 0:q.docs)==null?void 0:P.source}}};var M,O,W;N.parameters={...N.parameters,docs:{...(M=N.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    lifts: [sampleLifts[0]]
  }
}`,...(W=(O=N.parameters)==null?void 0:O.docs)==null?void 0:W.source}}};var z,R,U;v.parameters={...v.parameters,docs:{...(z=v.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    lifts: []
  }
}`,...(U=(R=v.parameters)==null?void 0:R.docs)==null?void 0:U.source}}};var V,_,A;y.parameters={...y.parameters,docs:{...(V=y.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    lifts: sampleLifts,
    showSummary: true
  }
}`,...(A=(_=y.parameters)==null?void 0:_.docs)==null?void 0:A.source}}};var F,G,H;L.parameters={...L.parameters,docs:{...(F=L.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    lifts: sampleLifts,
    traineeId: "trainee-123",
    trainerId: "trainer-456"
  }
}`,...(H=(G=L.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var K,J,Q;T.parameters={...T.parameters,docs:{...(K=T.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    lifts: [...sampleLifts, {
      id: "lift-4",
      exerciseName: "Overhead Press",
      weight: 50,
      reps: 8,
      sets: 4,
      date: new Date("2024-01-12")
    }, {
      id: "lift-5",
      exerciseName: "Barbell Row",
      weight: 70,
      reps: 10,
      sets: 3,
      date: new Date("2024-01-11")
    }, {
      id: "lift-6",
      exerciseName: "Squat",
      weight: 105,
      reps: 6,
      sets: 4,
      date: new Date("2024-01-10"),
      notes: "PR attempt"
    }],
    showSummary: true
  }
}`,...(Q=(J=T.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};const _e=["Default","SingleLift","EmptyState","WithSummary","WithTraineeContext","ManyLifts"];export{j as Default,v as EmptyState,T as ManyLifts,N as SingleLift,y as WithSummary,L as WithTraineeContext,_e as __namedExportsOrder,Ve as default};
