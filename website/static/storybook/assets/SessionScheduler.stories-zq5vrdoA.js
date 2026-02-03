import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as c}from"./index-GiUgBvb1.js";import{c as x}from"./cn-BNf5BS2b.js";import{B as S}from"./Box-DYJzRMmP.js";import{V as m,H as u}from"./Stack-1XI3stiC.js";import{T as p}from"./Typography-Wmkp-g7N.js";import{B as h}from"./Button-B7t-_IKa.js";import{C as fe}from"./Card-BNT5PrJ5.js";import{B as y}from"./Badge-Dd4QqFOk.js";import{u as be}from"./useEventBus-BNZMNlv8.js";import{C as P}from"./calendar-rGtwHcH_.js";import{P as L}from"./plus-jSzJaRn3.js";import{C as je}from"./chevron-left-zGYeMbNT.js";import{C as we}from"./chevron-right-pDF_OUfd.js";import{U as W}from"./users-CV1mGUsS.js";import{E as ye}from"./eye-DPfPdwVp.js";import{X as ae}from"./x-circle-CCPeOM9T.js";import{C as ne}from"./check-circle-DX_bNA1C.js";import{P as re}from"./play-C6U2eifx.js";import{C as De}from"./clock-DT9ve7xf.js";import{Y as Ce}from"./youtube-BrUjTZcy.js";import{P as Ie}from"./pen-DNARvM59.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";const ke={scheduled:{color:"text-blue-600",bgColor:"bg-blue-100",label:"Scheduled",icon:P},"in-progress":{color:"text-amber-600",bgColor:"bg-amber-100",label:"In Progress",icon:re},completed:{color:"text-emerald-600",bgColor:"bg-emerald-100",label:"Completed",icon:ne},cancelled:{color:"text-red-600",bgColor:"bg-red-100",label:"Cancelled",icon:ae}},ve=t=>{const a=[];for(let r=0;r<7;r++){const i=new Date(t);i.setDate(t.getDate()+r),a.push(i)}return a},Ne=t=>new Date(t).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0}),Ae=t=>{const a=new Date,r=t.toDateString()===a.toDateString();return{day:t.toLocaleDateString("en-US",{weekday:"short"}),date:t.getDate().toString(),isToday:r}},G=t=>{const a=new Date(t),r=a.getDay(),i=a.getDate()-r+(r===0?-6:1);return a.setDate(i),a.setHours(0,0,0,0),a},Te=t=>{const a=new Map;return t.forEach(r=>{const i=new Date(r.scheduledAt).toDateString();a.has(i)||a.set(i,[]),a.get(i).push(r)}),a},E=({sessions:t,availableSlots:a=[],traineeId:r,trainerId:i,weekStartDate:B,bookingMode:Ge=!1,entity:d="TrainingSession",className:ie})=>{const l=be(),[w,T]=c.useState(G(B||new Date)),oe=c.useMemo(()=>ve(w),[w]),le=c.useMemo(()=>Te(t),[t]),de=c.useCallback(()=>{T(s=>{const n=new Date(s);return n.setDate(n.getDate()-7),n})},[]),ce=c.useCallback(()=>{T(s=>{const n=new Date(s);return n.setDate(n.getDate()+7),n})},[]),ue=c.useCallback(()=>{T(G(new Date))},[]),U=c.useCallback(s=>{l.emit("UI:CREATE",{traineeId:r,trainerId:i,scheduledAt:s,entity:d})},[l,r,i,d]),z=c.useCallback(s=>{l.emit("UI:VIEW",{row:s,entity:d})},[l,d]),me=c.useCallback(s=>{l.emit("UI:EDIT",{row:s,entity:d})},[l,d]),pe=c.useCallback(s=>{l.emit("UI:CANCEL",{row:s,entity:d})},[l,d]),he=c.useCallback(s=>{l.emit("UI:START",{row:s,entity:d})},[l,d]),ge=c.useCallback(s=>{l.emit("UI:COMPLETE",{row:s,entity:d})},[l,d]),xe=s=>{const n=s.status||"scheduled",b=ke[n],f=b.icon;return e.jsx(S,{rounded:"lg",padding:"sm",border:!0,className:x("cursor-pointer hover:shadow-md transition-shadow bg-white",n==="cancelled"&&"opacity-60"),onClick:()=>z(s),children:e.jsxs(m,{gap:"xs",children:[e.jsxs(u,{justify:"between",align:"start",children:[e.jsxs(m,{gap:"none",className:"flex-1 min-w-0",children:[e.jsx(p,{variant:"label",className:x("truncate",n==="cancelled"&&"line-through"),children:s.title}),e.jsxs(u,{gap:"xs",align:"center",children:[e.jsx(De,{className:"h-3 w-3 text-neutral-400"}),e.jsxs(p,{variant:"small",className:"text-neutral-500",children:[Ne(s.scheduledAt)," (",s.duration,"min)"]})]})]}),e.jsx(y,{variant:"default",size:"sm",className:b.bgColor,children:e.jsx(f,{className:x("h-3 w-3",b.color)})})]}),e.jsxs(u,{gap:"xs",children:[s.isGroupSession&&e.jsxs(y,{variant:"default",size:"sm",children:[e.jsx(W,{className:"h-3 w-3 mr-1"}),"Group"]}),s.youtubeLink&&e.jsx(y,{variant:"default",size:"sm",children:e.jsx(Ce,{className:"h-3 w-3 text-red-500"})})]}),n==="scheduled"&&e.jsxs(u,{gap:"xs",className:"mt-1",children:[e.jsxs(h,{variant:"ghost",size:"sm",onClick:g=>{g.stopPropagation(),he(s)},className:"text-emerald-600 hover:bg-emerald-50",children:[e.jsx(re,{className:"h-3 w-3 mr-1"}),"Start"]}),e.jsx(h,{variant:"ghost",size:"sm",onClick:g=>{g.stopPropagation(),me(s)},children:e.jsx(Ie,{className:"h-3 w-3"})}),e.jsx(h,{variant:"ghost",size:"sm",onClick:g=>{g.stopPropagation(),pe(s)},className:"text-red-500 hover:bg-red-50",children:e.jsx(ae,{className:"h-3 w-3"})})]}),n==="in-progress"&&e.jsxs(h,{variant:"primary",size:"sm",onClick:g=>{g.stopPropagation(),ge(s)},className:"w-full mt-1",children:[e.jsx(ne,{className:"h-3 w-3 mr-1"}),"Complete"]})]})},s.id)};return e.jsx(fe,{className:x("p-4",ie),children:e.jsxs(m,{gap:"md",children:[e.jsxs(u,{justify:"between",align:"center",children:[e.jsxs(u,{gap:"sm",align:"center",children:[e.jsx(S,{display:"flex",rounded:"lg",padding:"sm",className:"items-center justify-center bg-blue-100",children:e.jsx(P,{className:"h-5 w-5 text-blue-600"})}),e.jsxs(m,{gap:"none",children:[e.jsx(p,{variant:"h4",children:"Schedule"}),e.jsx(p,{variant:"small",className:"text-neutral-500",children:w.toLocaleDateString("en-US",{month:"long",year:"numeric"})})]})]}),e.jsxs(u,{gap:"sm",children:[e.jsx(h,{variant:"ghost",size:"sm",onClick:ue,children:"Today"}),e.jsxs(h,{variant:"primary",size:"sm",onClick:()=>U(),children:[e.jsx(L,{className:"h-4 w-4 mr-1"}),"Schedule"]})]})]}),e.jsxs(u,{justify:"between",align:"center",children:[e.jsx(h,{variant:"ghost",size:"sm",onClick:de,children:e.jsx(je,{className:"h-4 w-4"})}),e.jsxs(p,{variant:"body",className:"font-medium",children:["Week of ",w.toLocaleDateString("en-US",{month:"short",day:"numeric"})]}),e.jsx(h,{variant:"ghost",size:"sm",onClick:ce,children:e.jsx(we,{className:"h-4 w-4"})})]}),e.jsx(S,{className:"grid grid-cols-7 gap-2",children:oe.map(s=>{const{day:n,date:b,isToday:f}=Ae(s),j=(le.get(s.toDateString())||[]).filter(Se=>Se.status!=="cancelled");return e.jsxs(m,{gap:"xs",className:x("min-h-[120px] p-2 rounded-lg border",f?"bg-blue-50 border-blue-200":"bg-neutral-50 border-neutral-200"),children:[e.jsxs(m,{gap:"none",align:"center",children:[e.jsx(p,{variant:"small",className:x("font-medium",f?"text-blue-600":"text-neutral-500"),children:n}),e.jsx(S,{display:"flex",rounded:"full",className:x("h-7 w-7 items-center justify-center",f?"bg-blue-600 text-white":""),children:e.jsx(p,{variant:"body",className:x("font-semibold",f&&"text-white"),children:b})})]}),e.jsxs(m,{gap:"xs",className:"flex-1 w-full",children:[j.slice(0,2).map(xe),j.length>2&&e.jsxs(h,{variant:"ghost",size:"sm",className:"w-full text-xs",onClick:()=>{l.emit("UI:VIEW_DAY",{date:s,sessions:j})},children:["+",j.length-2," more"]}),j.length===0&&e.jsx(S,{className:"flex-1 flex items-center justify-center cursor-pointer hover:bg-white rounded",onClick:()=>U(s),children:e.jsx(L,{className:"h-4 w-4 text-neutral-300"})})]})]},s.toISOString())})}),t.filter(s=>s.status==="scheduled").length>0&&e.jsxs(m,{gap:"sm",children:[e.jsx(p,{variant:"label",className:"text-neutral-600",children:"Upcoming Sessions"}),e.jsx(m,{gap:"xs",children:t.filter(s=>s.status==="scheduled").sort((s,n)=>new Date(s.scheduledAt).getTime()-new Date(n.scheduledAt).getTime()).slice(0,3).map(s=>e.jsx(S,{rounded:"lg",padding:"sm",border:!0,className:"bg-white cursor-pointer hover:bg-neutral-50",onClick:()=>z(s),children:e.jsxs(u,{justify:"between",align:"center",children:[e.jsxs(u,{gap:"sm",align:"center",children:[e.jsx(S,{display:"flex",rounded:"full",padding:"xs",className:"items-center justify-center bg-blue-100",children:e.jsx(P,{className:"h-4 w-4 text-blue-600"})}),e.jsxs(m,{gap:"none",children:[e.jsx(p,{variant:"body",className:"font-medium",children:s.title}),e.jsx(p,{variant:"small",className:"text-neutral-500",children:new Date(s.scheduledAt).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})})]})]}),e.jsxs(u,{gap:"xs",children:[s.isGroupSession&&e.jsx(y,{variant:"default",size:"sm",children:e.jsx(W,{className:"h-3 w-3"})}),e.jsx(h,{variant:"ghost",size:"sm",children:e.jsx(ye,{className:"h-4 w-4"})})]})]})},s.id))})]})]})})};E.displayName="SessionScheduler";E.__docgenInfo={description:"",methods:[],displayName:"SessionScheduler",props:{sessions:{required:!0,tsType:{name:"Array",elements:[{name:"TrainingSessionData"}],raw:"TrainingSessionData[]"},description:"Already booked sessions to display"},availableSlots:{required:!1,tsType:{name:"Array",elements:[{name:"TimeSlot"}],raw:"TimeSlot[]"},description:"Available time slots (optional - for booking mode)",defaultValue:{value:"[]",computed:!1}},traineeId:{required:!1,tsType:{name:"string"},description:"Trainee ID for booking context"},trainerId:{required:!1,tsType:{name:"string"},description:"Trainer ID for booking context"},weekStartDate:{required:!1,tsType:{name:"Date"},description:"Start date of displayed week"},bookingMode:{required:!1,tsType:{name:"boolean"},description:"Show booking mode (available slots)",defaultValue:{value:"false",computed:!1}},entity:{required:!1,tsType:{name:"string"},description:"Entity context for events",defaultValue:{value:'"TrainingSession"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const ts={title:"Blaz-Klemenc/Organisms/SessionScheduler",component:E,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{bookingMode:{control:"boolean",description:"Show available time slots for booking"},weekStartDate:{control:"date",description:"Start date of displayed week"}}},o=(t,a=10,r=0)=>{const i=new Date;return i.setDate(i.getDate()+t),i.setHours(a,r,0,0),i},A=[{id:"session-1",traineeId:"trainee-1",trainerId:"trainer-1",title:"Upper Body Strength",description:"Focus on chest, shoulders, and arms",scheduledAt:o(0,9,0),duration:60,status:"scheduled",isGroupSession:!1},{id:"session-2",traineeId:"trainee-2",trainerId:"trainer-1",title:"HIIT Training",description:"High intensity interval training",scheduledAt:o(0,14,0),duration:45,status:"in-progress",isGroupSession:!0,maxParticipants:8,youtubeLink:"https://youtube.com/watch?v=example"},{id:"session-3",traineeId:"trainee-3",trainerId:"trainer-1",title:"Flexibility & Mobility",description:"Stretching and mobility work",scheduledAt:o(1,10,0),duration:45,status:"scheduled",isGroupSession:!0,maxParticipants:12},{id:"session-4",traineeId:"trainee-1",trainerId:"trainer-1",title:"Lower Body Focus",description:"Legs and glutes training",scheduledAt:o(2,11,0),duration:60,status:"scheduled",isGroupSession:!1},{id:"session-5",traineeId:"trainee-4",trainerId:"trainer-1",title:"Core & Stability",description:"Core strengthening exercises",scheduledAt:o(-1,9,0),duration:45,status:"completed",isGroupSession:!1},{id:"session-6",traineeId:"trainee-2",trainerId:"trainer-1",title:"Personal Training",description:"One-on-one session",scheduledAt:o(-2,15,0),duration:60,status:"cancelled",isGroupSession:!1},{id:"session-7",traineeId:"trainee-5",trainerId:"trainer-1",title:"Functional Training",description:"Functional movement patterns",scheduledAt:o(3,8,0),duration:60,status:"scheduled",isGroupSession:!1},{id:"session-8",traineeId:"trainee-6",trainerId:"trainer-1",title:"Boxing Cardio",description:"Boxing-based cardio workout",scheduledAt:o(4,17,0),duration:45,status:"scheduled",isGroupSession:!0,maxParticipants:6,youtubeLink:"https://youtube.com/watch?v=boxing"}],D={args:{sessions:A,traineeId:"trainee-1",trainerId:"trainer-1"}},C={args:{sessions:[],traineeId:"trainee-1",trainerId:"trainer-1"}},I={args:{sessions:A.filter(t=>new Date(t.scheduledAt).toDateString()===new Date().toDateString()),traineeId:"trainee-1",trainerId:"trainer-1"}},k={args:{sessions:[...A,{id:"session-9",title:"Morning Yoga",scheduledAt:o(0,7,0),duration:60,status:"scheduled",isGroupSession:!0,maxParticipants:15},{id:"session-10",title:"Evening Spin",scheduledAt:o(0,18,0),duration:45,status:"scheduled",isGroupSession:!0,maxParticipants:20},{id:"session-11",title:"PT Session",scheduledAt:o(1,14,0),duration:60,status:"scheduled",isGroupSession:!1},{id:"session-12",title:"Assessment",scheduledAt:o(1,16,0),duration:30,status:"scheduled",isGroupSession:!1}],traineeId:"trainee-1",trainerId:"trainer-1"}},v={args:{sessions:[{id:"status-1",title:"Scheduled Session",scheduledAt:o(0,9,0),duration:60,status:"scheduled",isGroupSession:!1},{id:"status-2",title:"In Progress Session",scheduledAt:o(0,11,0),duration:60,status:"in-progress",isGroupSession:!1},{id:"status-3",title:"Completed Session",scheduledAt:o(-1,10,0),duration:60,status:"completed",isGroupSession:!1},{id:"status-4",title:"Cancelled Session",scheduledAt:o(1,14,0),duration:60,status:"cancelled",isGroupSession:!1}],traineeId:"trainee-1",trainerId:"trainer-1"}},N={args:{sessions:A.filter(t=>t.isGroupSession),traineeId:"trainee-1",trainerId:"trainer-1"}};var M,O,q;D.parameters={...D.parameters,docs:{...(M=D.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    sessions: sampleSessions,
    traineeId: "trainee-1",
    trainerId: "trainer-1"
  }
}`,...(q=(O=D.parameters)==null?void 0:O.docs)==null?void 0:q.source}}};var V,H,F;C.parameters={...C.parameters,docs:{...(V=C.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    sessions: [],
    traineeId: "trainee-1",
    trainerId: "trainer-1"
  }
}`,...(F=(H=C.parameters)==null?void 0:H.docs)==null?void 0:F.source}}};var Y,_,R;I.parameters={...I.parameters,docs:{...(Y=I.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    sessions: sampleSessions.filter(s => new Date(s.scheduledAt).toDateString() === new Date().toDateString()),
    traineeId: "trainee-1",
    trainerId: "trainer-1"
  }
}`,...(R=(_=I.parameters)==null?void 0:_.docs)==null?void 0:R.source}}};var K,X,J;k.parameters={...k.parameters,docs:{...(K=k.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    sessions: [...sampleSessions,
    // Add more sessions for a busy week
    {
      id: "session-9",
      title: "Morning Yoga",
      scheduledAt: getDate(0, 7, 0),
      duration: 60,
      status: "scheduled",
      isGroupSession: true,
      maxParticipants: 15
    }, {
      id: "session-10",
      title: "Evening Spin",
      scheduledAt: getDate(0, 18, 0),
      duration: 45,
      status: "scheduled",
      isGroupSession: true,
      maxParticipants: 20
    }, {
      id: "session-11",
      title: "PT Session",
      scheduledAt: getDate(1, 14, 0),
      duration: 60,
      status: "scheduled",
      isGroupSession: false
    }, {
      id: "session-12",
      title: "Assessment",
      scheduledAt: getDate(1, 16, 0),
      duration: 30,
      status: "scheduled",
      isGroupSession: false
    }],
    traineeId: "trainee-1",
    trainerId: "trainer-1"
  }
}`,...(J=(X=k.parameters)==null?void 0:X.docs)==null?void 0:J.source}}};var Q,Z,$;v.parameters={...v.parameters,docs:{...(Q=v.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    sessions: [{
      id: "status-1",
      title: "Scheduled Session",
      scheduledAt: getDate(0, 9, 0),
      duration: 60,
      status: "scheduled",
      isGroupSession: false
    }, {
      id: "status-2",
      title: "In Progress Session",
      scheduledAt: getDate(0, 11, 0),
      duration: 60,
      status: "in-progress",
      isGroupSession: false
    }, {
      id: "status-3",
      title: "Completed Session",
      scheduledAt: getDate(-1, 10, 0),
      duration: 60,
      status: "completed",
      isGroupSession: false
    }, {
      id: "status-4",
      title: "Cancelled Session",
      scheduledAt: getDate(1, 14, 0),
      duration: 60,
      status: "cancelled",
      isGroupSession: false
    }],
    traineeId: "trainee-1",
    trainerId: "trainer-1"
  }
}`,...($=(Z=v.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,se,te;N.parameters={...N.parameters,docs:{...(ee=N.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    sessions: sampleSessions.filter(s => s.isGroupSession),
    traineeId: "trainee-1",
    trainerId: "trainer-1"
  }
}`,...(te=(se=N.parameters)==null?void 0:se.docs)==null?void 0:te.source}}};const as=["Default","Empty","TodayOnly","BusyWeek","AllStatuses","GroupSessionsOnly"];export{v as AllStatuses,k as BusyWeek,D as Default,C as Empty,N as GroupSessionsOnly,I as TodayOnly,as as __namedExportsOrder,ts as default};
