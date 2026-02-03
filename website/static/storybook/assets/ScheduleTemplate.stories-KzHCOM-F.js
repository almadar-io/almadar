import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as p}from"./index-GiUgBvb1.js";import{c as f}from"./cn-BNf5BS2b.js";import{B as u}from"./Box-DYJzRMmP.js";import{V as D,H as g}from"./Stack-1XI3stiC.js";import{T as c}from"./Typography-Wmkp-g7N.js";import{B as A}from"./Button-B7t-_IKa.js";import{C as Se}from"./Card-BNT5PrJ5.js";import{S as fe}from"./Spinner-vF2DJrH5.js";import{u as De}from"./useEventBus-BNZMNlv8.js";import{C as je}from"./chevron-left-zGYeMbNT.js";import{C as Ae}from"./chevron-right-pDF_OUfd.js";import{P as Ne}from"./plus-jSzJaRn3.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";const ve=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],P=Array.from({length:16},(n,m)=>{const r=m+6;return{hour:r,label:r<=12?`${r===12?12:r}${r<12?"am":"pm"}`:`${r-12}pm`}}),we={scheduled:"bg-blue-100 border-blue-300 text-blue-700","in-progress":"bg-amber-100 border-amber-300 text-amber-700",completed:"bg-green-100 border-green-300 text-green-700",cancelled:"bg-red-100 border-red-300 text-red-700"},Ce=n=>{const m=new Date(n);return m.setDate(m.getDate()-m.getDay()),Array.from({length:7},(r,h)=>{const x=new Date(m);return x.setDate(x.getDate()+h),x})},Ee=n=>n.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0}),ke=(n,m)=>{const r=new Date(n.scheduledAt),x=(r.getHours()+r.getMinutes()/60-6)*60,L=n.duration;return{top:Math.max(0,x),height:Math.max(30,L)}},W=({items:n,data:m,isLoading:r=!1,error:h=null,title:x="Schedule",initialDate:L=new Date,entity:l="TrainingSession",className:le})=>{const o=De(),[b,M]=p.useState(L),[I,oe]=p.useState(null),B=n||m||[],S=p.useMemo(()=>Ce(b),[b]),ie=p.useCallback(t=>B.filter(a=>{const i=new Date(a.scheduledAt);return i.getFullYear()===t.getFullYear()&&i.getMonth()===t.getMonth()&&i.getDate()===t.getDate()}),[B]),de=p.useCallback(()=>{const t=new Date(b);t.setDate(t.getDate()-7),M(t),o.emit("UI:WEEK_CHANGE",{date:t,entity:l})},[b,o,l]),ue=p.useCallback(()=>{const t=new Date(b);t.setDate(t.getDate()+7),M(t),o.emit("UI:WEEK_CHANGE",{date:t,entity:l})},[b,o,l]),ce=p.useCallback(()=>{const t=new Date;M(t),o.emit("UI:WEEK_CHANGE",{date:t,entity:l})},[o,l]),me=p.useCallback(t=>{oe(t),o.emit("UI:DAY_SELECTED",{date:t,entity:l})},[o,l]),he=p.useCallback(t=>{o.emit("UI:VIEW",{row:t,entity:l})},[o,l]),pe=p.useCallback((t,a)=>{const i=new Date(t);i.setHours(a,0,0,0),o.emit("UI:CREATE",{scheduledAt:i,entity:l})},[o,l]),ge=p.useMemo(()=>{const t=S[0],a=S[6],i=t.toLocaleDateString("en-US",{month:"short"}),d=a.toLocaleDateString("en-US",{month:"short"}),j=a.getFullYear();return i===d?`${i} ${t.getDate()} - ${a.getDate()}, ${j}`:`${i} ${t.getDate()} - ${d} ${a.getDate()}, ${j}`},[S]),G=t=>{const a=new Date;return t.getFullYear()===a.getFullYear()&&t.getMonth()===a.getMonth()&&t.getDate()===a.getDate()};return e.jsxs(D,{gap:"lg",className:f("p-6 h-full",le),children:[e.jsxs(g,{justify:"between",align:"center",wrap:!0,children:[e.jsxs(D,{gap:"xs",children:[e.jsx(c,{variant:"h1",children:x}),e.jsx(c,{variant:"body",className:"text-neutral-500",children:ge})]}),e.jsxs(g,{gap:"sm",children:[e.jsx(A,{variant:"secondary",size:"sm",onClick:ce,children:"Today"}),e.jsxs(g,{gap:"xs",children:[e.jsx(A,{variant:"ghost",size:"sm",onClick:de,children:e.jsx(je,{className:"h-4 w-4"})}),e.jsx(A,{variant:"ghost",size:"sm",onClick:ue,children:e.jsx(Ae,{className:"h-4 w-4"})})]}),e.jsxs(A,{variant:"primary",onClick:()=>o.emit("UI:CREATE",{entity:l}),className:"gap-2",children:[e.jsx(Ne,{className:"h-4 w-4"}),"New Session"]})]})]}),r&&e.jsxs(D,{align:"center",justify:"center",className:"py-12 flex-1",children:[e.jsx(fe,{size:"lg"}),e.jsx(c,{variant:"body",className:"text-neutral-500",children:"Loading schedule..."})]}),h&&e.jsx(D,{align:"center",justify:"center",className:"py-12 flex-1",children:e.jsxs(c,{variant:"body",className:"text-red-500",children:["Error: ",h.message]})}),!r&&!h&&e.jsx(Se,{className:"flex-1 overflow-hidden",children:e.jsxs(D,{gap:"none",className:"h-full",children:[e.jsxs(g,{gap:"none",className:"border-b border-neutral-200",children:[e.jsx(u,{className:"w-16 flex-shrink-0 border-r border-neutral-200"}),S.map((t,a)=>e.jsxs(u,{className:f("flex-1 py-3 px-2 text-center border-r border-neutral-200 last:border-r-0 cursor-pointer hover:bg-neutral-50",G(t)&&"bg-blue-50",I&&t.getDate()===I.getDate()&&"bg-blue-100"),onClick:()=>me(t),children:[e.jsx(c,{variant:"small",className:f("text-neutral-500",G(t)&&"text-blue-600 font-medium"),children:ve[a]}),e.jsx(c,{variant:"body",className:f("font-medium",G(t)&&"text-blue-600"),children:t.getDate()})]},a))]}),e.jsx(u,{className:"flex-1 overflow-auto",children:e.jsxs(u,{className:"relative",style:{minHeight:P.length*60},children:[e.jsx(u,{className:"absolute left-0 top-0 w-16 z-10 bg-white",children:P.map(t=>e.jsx(u,{className:"h-[60px] border-b border-neutral-100 pr-2 flex items-start justify-end pt-1",children:e.jsx(c,{variant:"small",className:"text-neutral-400",children:t.label})},t.hour))}),e.jsx(g,{gap:"none",className:"ml-16",children:S.map((t,a)=>{const i=ie(t);return e.jsxs(u,{className:"flex-1 relative border-r border-neutral-200 last:border-r-0",children:[P.map(d=>e.jsx(u,{className:"h-[60px] border-b border-neutral-100 cursor-pointer hover:bg-neutral-50",onClick:()=>pe(t,d.hour)},d.hour)),i.map(d=>{const{top:j,height:H}=ke(d),xe=new Date(d.scheduledAt);return e.jsxs(u,{className:f("absolute left-1 right-1 rounded px-2 py-1 cursor-pointer border overflow-hidden",we[d.status||"scheduled"]),style:{top:j,height:Math.max(H,30)},onClick:be=>{be.stopPropagation(),he(d)},children:[e.jsx(c,{variant:"small",className:"font-medium truncate",children:d.title}),H>=45&&e.jsx(c,{variant:"small",className:"opacity-75",children:Ee(xe)})]},d.id)})]},a)})})]})})]})}),e.jsxs(g,{gap:"md",justify:"center",children:[e.jsxs(g,{gap:"xs",align:"center",children:[e.jsx(u,{className:"w-3 h-3 rounded bg-blue-100 border border-blue-300"}),e.jsx(c,{variant:"small",className:"text-neutral-500",children:"Scheduled"})]}),e.jsxs(g,{gap:"xs",align:"center",children:[e.jsx(u,{className:"w-3 h-3 rounded bg-amber-100 border border-amber-300"}),e.jsx(c,{variant:"small",className:"text-neutral-500",children:"In Progress"})]}),e.jsxs(g,{gap:"xs",align:"center",children:[e.jsx(u,{className:"w-3 h-3 rounded bg-green-100 border border-green-300"}),e.jsx(c,{variant:"small",className:"text-neutral-500",children:"Completed"})]})]})]})};W.displayName="ScheduleTemplate";W.__docgenInfo={description:"",methods:[],displayName:"ScheduleTemplate",props:{items:{required:!1,tsType:{name:"unknown"},description:"Session items to display"},data:{required:!1,tsType:{name:"unknown"},description:"Data prop alias"},isLoading:{required:!1,tsType:{name:"boolean"},description:"Loading state",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"union",raw:"Error | null",elements:[{name:"Error"},{name:"null"}]},description:"Error state",defaultValue:{value:"null",computed:!1}},title:{required:!1,tsType:{name:"string"},description:"Page title",defaultValue:{value:'"Schedule"',computed:!1}},initialDate:{required:!1,tsType:{name:"Date"},description:"Initial date to show",defaultValue:{value:"new Date()",computed:!1}},entity:{required:!1,tsType:{name:"string"},description:"Entity context for events",defaultValue:{value:'"TrainingSession"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const qe={title:"Blaz-Klemenc/Templates/ScheduleTemplate",component:W,parameters:{layout:"fullscreen"},tags:["autodocs"]},s=(n,m=10,r=0)=>{const h=new Date;return h.setDate(h.getDate()+n),h.setHours(m,r,0,0),h},T=[{id:"s1",title:"Morning Strength",scheduledAt:s(0,8,0),duration:60,status:"completed",isGroupSession:!1},{id:"s2",title:"HIIT Class",scheduledAt:s(0,10,0),duration:45,status:"in-progress",isGroupSession:!0,maxParticipants:10},{id:"s3",title:"Personal Training - Ana",scheduledAt:s(0,14,0),duration:60,status:"scheduled",isGroupSession:!1},{id:"s4",title:"Evening Yoga",scheduledAt:s(0,18,0),duration:60,status:"scheduled",isGroupSession:!0,maxParticipants:15},{id:"s5",title:"Cardio Session",scheduledAt:s(1,7,0),duration:45,status:"scheduled",isGroupSession:!1},{id:"s6",title:"Group Strength",scheduledAt:s(1,11,0),duration:60,status:"scheduled",isGroupSession:!0,maxParticipants:8},{id:"s7",title:"Personal Training - Marko",scheduledAt:s(1,15,0),duration:60,status:"scheduled",isGroupSession:!1},{id:"s8",title:"Boxing Fundamentals",scheduledAt:s(2,9,0),duration:60,status:"scheduled",isGroupSession:!0,maxParticipants:6},{id:"s9",title:"Mobility Class",scheduledAt:s(2,12,0),duration:45,status:"scheduled",isGroupSession:!0,maxParticipants:12},{id:"s10",title:"Assessment - New Client",scheduledAt:s(3,10,0),duration:90,status:"scheduled",isGroupSession:!1},{id:"s11",title:"Group HIIT",scheduledAt:s(4,17,0),duration:45,status:"scheduled",isGroupSession:!0,maxParticipants:10},{id:"s12",title:"Personal Training - Luka",scheduledAt:s(5,9,0),duration:60,status:"scheduled",isGroupSession:!1},{id:"s13",title:"Yesterday's Session",scheduledAt:s(-1,10,0),duration:60,status:"completed",isGroupSession:!1},{id:"s14",title:"Cancelled Session",scheduledAt:s(-1,14,0),duration:45,status:"cancelled",isGroupSession:!1}],N={args:{items:T,title:"Schedule"}},v={args:{items:[],isLoading:!0}},w={args:{items:[],error:{message:"Failed to load schedule."}}},C={args:{items:[],title:"Schedule"}},E={args:{items:[...T,{id:"b1",title:"Early Bird",scheduledAt:s(0,6,0),duration:45,status:"scheduled"},{id:"b2",title:"Lunch Session",scheduledAt:s(0,12,0),duration:45,status:"scheduled"},{id:"b3",title:"Late Evening",scheduledAt:s(0,20,0),duration:60,status:"scheduled"},{id:"b4",title:"Morning 1",scheduledAt:s(1,8,0),duration:60,status:"scheduled"},{id:"b5",title:"Morning 2",scheduledAt:s(1,9,0),duration:60,status:"scheduled"},{id:"b6",title:"Afternoon",scheduledAt:s(2,14,0),duration:45,status:"scheduled"},{id:"b7",title:"Evening",scheduledAt:s(2,18,0),duration:60,status:"scheduled"}],title:"Busy Week Schedule"}},k={args:{items:T.slice(0,4),title:"Light Week Schedule"}},y={args:{items:T.map(n=>({...n,status:"completed"})),title:"Past Week"}};var $,_,F;N.parameters={...N.parameters,docs:{...($=N.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    items: sampleSessions,
    title: "Schedule"
  }
}`,...(F=(_=N.parameters)==null?void 0:_.docs)==null?void 0:F.source}}};var U,Y,q;v.parameters={...v.parameters,docs:{...(U=v.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    items: [],
    isLoading: true
  }
}`,...(q=(Y=v.parameters)==null?void 0:Y.docs)==null?void 0:q.source}}};var V,z,R;w.parameters={...w.parameters,docs:{...(V=w.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    items: [],
    error: {
      message: "Failed to load schedule."
    } as Error
  }
}`,...(R=(z=w.parameters)==null?void 0:z.docs)==null?void 0:R.source}}};var K,O,J;C.parameters={...C.parameters,docs:{...(K=C.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    items: [],
    title: "Schedule"
  }
}`,...(J=(O=C.parameters)==null?void 0:O.docs)==null?void 0:J.source}}};var Q,X,Z;E.parameters={...E.parameters,docs:{...(Q=E.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    items: [...sampleSessions,
    // Add more sessions for a busy week
    {
      id: "b1",
      title: "Early Bird",
      scheduledAt: getDate(0, 6, 0),
      duration: 45,
      status: "scheduled"
    }, {
      id: "b2",
      title: "Lunch Session",
      scheduledAt: getDate(0, 12, 0),
      duration: 45,
      status: "scheduled"
    }, {
      id: "b3",
      title: "Late Evening",
      scheduledAt: getDate(0, 20, 0),
      duration: 60,
      status: "scheduled"
    }, {
      id: "b4",
      title: "Morning 1",
      scheduledAt: getDate(1, 8, 0),
      duration: 60,
      status: "scheduled"
    }, {
      id: "b5",
      title: "Morning 2",
      scheduledAt: getDate(1, 9, 0),
      duration: 60,
      status: "scheduled"
    }, {
      id: "b6",
      title: "Afternoon",
      scheduledAt: getDate(2, 14, 0),
      duration: 45,
      status: "scheduled"
    }, {
      id: "b7",
      title: "Evening",
      scheduledAt: getDate(2, 18, 0),
      duration: 60,
      status: "scheduled"
    }],
    title: "Busy Week Schedule"
  }
}`,...(Z=(X=E.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,te,se;k.parameters={...k.parameters,docs:{...(ee=k.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    items: sampleSessions.slice(0, 4),
    title: "Light Week Schedule"
  }
}`,...(se=(te=k.parameters)==null?void 0:te.docs)==null?void 0:se.source}}};var ae,re,ne;y.parameters={...y.parameters,docs:{...(ae=y.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    items: sampleSessions.map(s => ({
      ...s,
      status: "completed" as const
    })),
    title: "Past Week"
  }
}`,...(ne=(re=y.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};const Ve=["Default","Loading","Error","Empty","BusyWeek","LightWeek","AllCompleted"];export{y as AllCompleted,E as BusyWeek,N as Default,C as Empty,w as Error,k as LightWeek,v as Loading,Ve as __namedExportsOrder,qe as default};
