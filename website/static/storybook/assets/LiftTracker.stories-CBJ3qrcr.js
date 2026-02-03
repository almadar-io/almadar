import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as g}from"./index-GiUgBvb1.js";import{c as ie}from"./cn-BNf5BS2b.js";import{B as u}from"./Box-DYJzRMmP.js";import{V as m,H as c}from"./Stack-1XI3stiC.js";import{T as a}from"./Typography-Wmkp-g7N.js";import{B as h}from"./Button-B7t-_IKa.js";import{C as oe}from"./Card-BNT5PrJ5.js";import{B as ce}from"./Badge-Dd4QqFOk.js";import{u as le}from"./useEventBus-BNZMNlv8.js";import{D as me}from"./dumbbell-GoIYbK-o.js";import{P as de}from"./plus-jSzJaRn3.js";import{T as E}from"./trending-up-D7By3kN5.js";import{E as pe}from"./eye-DPfPdwVp.js";import{P as ge}from"./pen-DNARvM59.js";import{T as ue}from"./trash-2-ChlfdFMf.js";import{C as he}from"./chevron-up-B8qTw58L.js";import{C as xe}from"./chevron-down-BQmz_Bpa.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";const fe=i=>new Date(i).toLocaleDateString("en-US",{month:"short",day:"numeric"}),we=(i,o)=>{const r=i.filter(t=>t.exerciseName===o).sort((t,d)=>new Date(d.date).getTime()-new Date(t.date).getTime());if(r.length<2)return null;const D=r[0].weight,n=r[1].weight,l=D-n,T=Math.abs(l/n*100);return{direction:l>0?"up":l<0?"down":"same",percentage:Math.round(T*10)/10}},je=i=>i.reduce((o,r)=>(o[r.exerciseName]||(o[r.exerciseName]=[]),o[r.exerciseName].push(r),o),{}),y=({lifts:i,traineeId:o,trainerId:r,showSummary:D=!0,entity:n="Lift",maxVisible:l=5,className:T})=>{const t=le(),[d,Q]=g.useState(!1),f=[...i].sort((s,p)=>new Date(p.date).getTime()-new Date(s.date).getTime()),k=d?f:f.slice(0,l),X=f.length>l,Y=g.useCallback(()=>{t.emit("UI:LOG_LIFT",{traineeId:o,trainerId:r,entity:n})},[t,o,r,n]),Z=g.useCallback(s=>{t.emit("UI:VIEW",{row:s,entity:n})},[t,n]),$=g.useCallback(s=>{t.emit("UI:EDIT",{row:s,entity:n})},[t,n]),ee=g.useCallback(s=>{t.emit("UI:DELETE",{row:s,entity:n})},[t,n]),se=je(i),C=Object.entries(se).map(([s,p])=>{const te=p.sort((b,ne)=>new Date(ne.date).getTime()-new Date(b.date).getTime())[0],ae=we(i,s),re=Math.max(...p.map(b=>b.weight));return{exerciseName:s,latest:te,trend:ae,maxWeight:re,count:p.length}});return e.jsx(oe,{className:ie("p-4",T),children:e.jsxs(m,{gap:"md",children:[e.jsxs(c,{justify:"between",align:"center",children:[e.jsxs(c,{gap:"sm",align:"center",children:[e.jsx(u,{display:"flex",rounded:"lg",padding:"sm",className:"items-center justify-center bg-red-100",children:e.jsx(me,{className:"h-5 w-5 text-red-600"})}),e.jsxs(m,{gap:"none",children:[e.jsx(a,{variant:"h4",children:"Lift Progress"}),e.jsxs(a,{variant:"small",className:"text-neutral-500",children:[i.length," entries logged"]})]})]}),e.jsxs(h,{variant:"primary",size:"sm",onClick:Y,children:[e.jsx(de,{className:"h-4 w-4 mr-1"}),"Log Lift"]})]}),D&&C.length>0&&e.jsx(u,{className:"grid grid-cols-2 gap-2 sm:grid-cols-3",children:C.slice(0,6).map(s=>e.jsx(u,{rounded:"lg",padding:"sm",className:"bg-neutral-50",children:e.jsxs(m,{gap:"xs",children:[e.jsx(a,{variant:"small",className:"text-neutral-600 truncate",children:s.exerciseName}),e.jsxs(c,{gap:"xs",align:"center",children:[e.jsx(a,{variant:"h4",className:"text-neutral-900",children:s.latest.weight}),e.jsx(a,{variant:"small",className:"text-neutral-500",children:"kg"}),s.trend&&s.trend.direction!=="same"&&e.jsxs(ce,{variant:s.trend.direction==="up"?"success":"danger",size:"sm",children:[s.trend.direction==="up"?e.jsx(E,{className:"h-3 w-3"}):e.jsx(E,{className:"h-3 w-3 rotate-180"}),s.trend.percentage,"%"]})]}),e.jsxs(a,{variant:"small",className:"text-neutral-400",children:["PR: ",s.maxWeight,"kg"]})]})},s.exerciseName))}),e.jsxs(m,{gap:"sm",children:[e.jsx(a,{variant:"label",className:"text-neutral-600",children:"Recent Entries"}),k.length===0?e.jsx(u,{padding:"md",className:"text-center bg-neutral-50 rounded-lg",children:e.jsx(a,{variant:"body",className:"text-neutral-500",children:"No lifts logged yet. Start tracking your progress!"})}):e.jsx(m,{gap:"xs",children:k.map(s=>e.jsx(u,{rounded:"lg",padding:"sm",border:!0,className:"bg-white hover:bg-neutral-50 transition-colors",children:e.jsxs(c,{justify:"between",align:"center",children:[e.jsx(c,{gap:"sm",align:"center",children:e.jsxs(m,{gap:"none",children:[e.jsx(a,{variant:"body",className:"font-medium",children:s.exerciseName}),e.jsx(a,{variant:"small",className:"text-neutral-500",children:fe(s.date)})]})}),e.jsxs(c,{gap:"md",align:"center",children:[e.jsx(c,{gap:"sm",children:e.jsxs(m,{gap:"none",align:"end",children:[e.jsxs(a,{variant:"body",className:"font-semibold",children:[s.weight,"kg"]}),e.jsxs(a,{variant:"small",className:"text-neutral-500",children:[s.sets,"x",s.reps]})]})}),e.jsxs(c,{gap:"xs",children:[e.jsx(h,{variant:"ghost",size:"sm",onClick:()=>Z(s),className:"text-neutral-400 hover:text-blue-500",children:e.jsx(pe,{className:"h-4 w-4"})}),e.jsx(h,{variant:"ghost",size:"sm",onClick:()=>$(s),className:"text-neutral-400 hover:text-blue-500",children:e.jsx(ge,{className:"h-4 w-4"})}),e.jsx(h,{variant:"ghost",size:"sm",onClick:()=>ee(s),className:"text-neutral-400 hover:text-red-500",children:e.jsx(ue,{className:"h-4 w-4"})})]})]})]})},s.id))}),X&&e.jsx(h,{variant:"ghost",size:"sm",onClick:()=>Q(!d),className:"w-full",children:d?e.jsxs(e.Fragment,{children:[e.jsx(he,{className:"h-4 w-4 mr-1"}),"Show Less"]}):e.jsxs(e.Fragment,{children:[e.jsx(xe,{className:"h-4 w-4 mr-1"}),"Show ",f.length-l," More"]})})]})]})})};y.displayName="LiftTracker";y.__docgenInfo={description:"",methods:[],displayName:"LiftTracker",props:{lifts:{required:!0,tsType:{name:"Array",elements:[{name:"LiftData"}],raw:"LiftData[]"},description:"Array of lift entries to display"},traineeId:{required:!1,tsType:{name:"string"},description:"Trainee ID for context"},trainerId:{required:!1,tsType:{name:"string"},description:"Trainer ID for context"},showSummary:{required:!1,tsType:{name:"boolean"},description:"Show summary cards for each exercise",defaultValue:{value:"true",computed:!1}},entity:{required:!1,tsType:{name:"string"},description:"Entity context for events",defaultValue:{value:'"Lift"',computed:!1}},maxVisible:{required:!1,tsType:{name:"number"},description:"Max entries to show before collapse",defaultValue:{value:"5",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const Ve={title:"Blaz-Klemenc/Molecules/LiftTracker",component:y,parameters:{layout:"padded"},tags:["autodocs"]},x=[{id:"lift-1",exerciseName:"Squat",weight:100,reps:8,sets:4,date:new Date("2024-01-15"),notes:"Felt strong today"},{id:"lift-2",exerciseName:"Deadlift",weight:120,reps:5,sets:5,date:new Date("2024-01-14")},{id:"lift-3",exerciseName:"Bench Press",weight:80,reps:10,sets:3,date:new Date("2024-01-13"),notes:"Working on form"}],w={args:{lifts:x}},j={args:{lifts:[x[0]]}},N={args:{lifts:[]}},v={args:{lifts:x,showSummary:!0}},L={args:{lifts:x,traineeId:"trainee-123",trainerId:"trainer-456"}},S={args:{lifts:[...x,{id:"lift-4",exerciseName:"Overhead Press",weight:50,reps:8,sets:4,date:new Date("2024-01-12")},{id:"lift-5",exerciseName:"Barbell Row",weight:70,reps:10,sets:3,date:new Date("2024-01-11")},{id:"lift-6",exerciseName:"Squat",weight:105,reps:6,sets:4,date:new Date("2024-01-10"),notes:"PR attempt"}],showSummary:!0}};var I,B,P;w.parameters={...w.parameters,docs:{...(I=w.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    lifts: sampleLifts
  }
}`,...(P=(B=w.parameters)==null?void 0:B.docs)==null?void 0:P.source}}};var q,M,W;j.parameters={...j.parameters,docs:{...(q=j.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    lifts: [sampleLifts[0]]
  }
}`,...(W=(M=j.parameters)==null?void 0:M.docs)==null?void 0:W.source}}};var z,R,U;N.parameters={...N.parameters,docs:{...(z=N.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    lifts: []
  }
}`,...(U=(R=N.parameters)==null?void 0:R.docs)==null?void 0:U.source}}};var V,O,_;v.parameters={...v.parameters,docs:{...(V=v.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    lifts: sampleLifts,
    showSummary: true
  }
}`,...(_=(O=v.parameters)==null?void 0:O.docs)==null?void 0:_.source}}};var F,A,H;L.parameters={...L.parameters,docs:{...(F=L.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    lifts: sampleLifts,
    traineeId: "trainee-123",
    trainerId: "trainer-456"
  }
}`,...(H=(A=L.parameters)==null?void 0:A.docs)==null?void 0:H.source}}};var G,K,J;S.parameters={...S.parameters,docs:{...(G=S.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(J=(K=S.parameters)==null?void 0:K.docs)==null?void 0:J.source}}};const Oe=["Default","SingleLift","EmptyState","WithSummary","WithTraineeContext","ManyLifts"];export{w as Default,N as EmptyState,S as ManyLifts,j as SingleLift,v as WithSummary,L as WithTraineeContext,Oe as __namedExportsOrder,Ve as default};
