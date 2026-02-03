import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as g}from"./index-GiUgBvb1.js";import{c as h}from"./cn-BNf5BS2b.js";import{B as l}from"./Box-DYJzRMmP.js";import{V as U,H as y}from"./Stack-1XI3stiC.js";import{T as d}from"./Typography-Wmkp-g7N.js";import{B as I}from"./Button-B7t-_IKa.js";import{C as pe}from"./Card-BNT5PrJ5.js";import{B as ge}from"./Badge-Dd4QqFOk.js";import{u as ye}from"./useEventBus-BNZMNlv8.js";import{C as Se}from"./calendar-rGtwHcH_.js";import{C as he}from"./chevron-left-zGYeMbNT.js";import{C as ke}from"./chevron-right-pDF_OUfd.js";import{U as xe}from"./users-CV1mGUsS.js";import{U as De}from"./user-BePscFH1.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";const W=o=>{const s=new Date(o),i=s.getDay(),a=s.getDate()-i+(i===0?-6:1);return s.setDate(a),s.setHours(0,0,0,0),s},be=o=>{const s=[];for(let i=0;i<7;i++){const a=new Date(o);a.setDate(o.getDate()+i),s.push(a)}return s},ve=(o,s,i)=>{const a=[];for(let p=o;p<s;p++)for(let u=0;u<60;u+=i){const E=`${p.toString().padStart(2,"0")}:${u.toString().padStart(2,"0")}`;a.push(E)}return a},we=(o,s,i)=>{const a=new Date(o.startTime),[p,u]=i.split(":").map(Number);return a.toDateString()===s.toDateString()&&a.getHours()===p&&a.getMinutes()===u},fe={personal:"bg-blue-100 border-blue-300 text-blue-700",group:"bg-purple-100 border-purple-300 text-purple-700",break:"bg-neutral-100 border-neutral-300 text-neutral-600"},B=({weekStart:o,events:s=[],workingHoursStart:i=8,workingHoursEnd:a=20,slotDuration:p=60,entity:u="TrainingSession",className:E})=>{const m=ye(),[C,j]=g.useState(W(o||new Date)),P=g.useMemo(()=>be(C),[C]),oe=g.useMemo(()=>ve(i,a,p),[i,a,p]),ie=g.useCallback(()=>{j(t=>{const r=new Date(t);return r.setDate(r.getDate()-7),m.emit("UI:WEEK_CHANGE",{weekStart:r,direction:"prev"}),r})},[m]),le=g.useCallback(()=>{j(t=>{const r=new Date(t);return r.setDate(r.getDate()+7),m.emit("UI:WEEK_CHANGE",{weekStart:r,direction:"next"}),r})},[m]),ue=g.useCallback(()=>{const t=W(new Date);j(t),m.emit("UI:WEEK_CHANGE",{weekStart:t,direction:"today"})},[m]),me=g.useCallback(t=>{const r=s.filter(c=>new Date(c.startTime).toDateString()===t.toDateString());m.emit("UI:DAY_SELECTED",{date:t,events:r,entity:u})},[m,s,u]),ce=g.useCallback((t,r)=>{const c=new Date(t),[S,H]=r.split(":").map(Number);c.setHours(S,H,0,0),m.emit("UI:SLOT_CLICK",{date:c,entity:u})},[m,u]),de=t=>{const r=fe[t.type||"personal"],c=t.type==="group"?xe:De;return e.jsxs(l,{rounded:"md",padding:"xs",border:!0,className:h("cursor-pointer hover:shadow-sm transition-shadow text-xs truncate",r),onClick:S=>{S.stopPropagation(),m.emit("UI:VIEW",{row:t,entity:u})},children:[e.jsxs(y,{gap:"xs",align:"center",children:[e.jsx(c,{className:"h-3 w-3 flex-shrink-0"}),e.jsx(d,{variant:"small",className:"truncate font-medium",children:t.title})]}),t.traineeName&&e.jsx(d,{variant:"small",className:"truncate opacity-75",children:t.traineeName})]},t.id)};return e.jsx(pe,{className:h("p-4 overflow-hidden",E),children:e.jsxs(U,{gap:"md",children:[e.jsxs(y,{justify:"between",align:"center",children:[e.jsxs(y,{gap:"sm",align:"center",children:[e.jsx(Se,{className:"h-5 w-5 text-blue-600"}),e.jsx(d,{variant:"h4",children:C.toLocaleDateString("en-US",{month:"long",year:"numeric"})})]}),e.jsxs(y,{gap:"sm",children:[e.jsx(I,{variant:"ghost",size:"sm",onClick:ie,children:e.jsx(he,{className:"h-4 w-4"})}),e.jsx(I,{variant:"secondary",size:"sm",onClick:ue,children:"Today"}),e.jsx(I,{variant:"ghost",size:"sm",onClick:le,children:e.jsx(ke,{className:"h-4 w-4"})})]})]}),e.jsx(l,{className:"overflow-x-auto",children:e.jsxs(l,{className:"min-w-[800px]",children:[e.jsxs(l,{className:"grid grid-cols-8 border-b",children:[e.jsx(l,{className:"p-2"})," ",P.map(t=>{const r=t.toDateString()===new Date().toDateString(),c=s.filter(S=>new Date(S.startTime).toDateString()===t.toDateString());return e.jsxs(l,{className:h("p-2 text-center cursor-pointer hover:bg-neutral-50 border-l",r&&"bg-blue-50"),onClick:()=>me(t),children:[e.jsx(d,{variant:"small",className:h("font-medium",r?"text-blue-600":"text-neutral-500"),children:t.toLocaleDateString("en-US",{weekday:"short"})}),e.jsx(l,{display:"flex",rounded:"full",className:h("h-8 w-8 mx-auto items-center justify-center",r&&"bg-blue-600 text-white"),children:e.jsx(d,{variant:"body",className:"font-semibold",children:t.getDate()})}),c.length>0&&e.jsx(ge,{variant:"default",size:"sm",className:"mt-1",children:c.length})]},t.toISOString())})]}),e.jsx(l,{className:"max-h-[500px] overflow-y-auto",children:oe.map(t=>e.jsxs(l,{className:"grid grid-cols-8 border-b",children:[e.jsx(l,{className:"p-2 text-right pr-3",children:e.jsx(d,{variant:"small",className:"text-neutral-400",children:t})}),P.map(r=>{const c=s.filter(H=>we(H,r,t)),S=r.toDateString()===new Date().toDateString();return e.jsx(l,{className:h("p-1 min-h-[60px] border-l cursor-pointer hover:bg-neutral-50 transition-colors",S&&"bg-blue-50/30"),onClick:()=>ce(r,t),children:e.jsx(U,{gap:"xs",children:c.map(de)})},`${r.toISOString()}-${t}`)})]},t))})]})}),e.jsxs(y,{gap:"md",justify:"center",className:"border-t pt-3",children:[e.jsxs(y,{gap:"xs",align:"center",children:[e.jsx(l,{className:"h-3 w-3 rounded bg-blue-100 border border-blue-300"}),e.jsx(d,{variant:"small",className:"text-neutral-600",children:"Personal"})]}),e.jsxs(y,{gap:"xs",align:"center",children:[e.jsx(l,{className:"h-3 w-3 rounded bg-purple-100 border border-purple-300"}),e.jsx(d,{variant:"small",className:"text-neutral-600",children:"Group"})]}),e.jsxs(y,{gap:"xs",align:"center",children:[e.jsx(l,{className:"h-3 w-3 rounded bg-neutral-100 border border-neutral-300"}),e.jsx(d,{variant:"small",className:"text-neutral-600",children:"Break"})]})]})]})})};B.displayName="WeeklyCalendar";B.__docgenInfo={description:"",methods:[],displayName:"WeeklyCalendar",props:{weekStart:{required:!1,tsType:{name:"Date"},description:"Start of week to display"},events:{required:!1,tsType:{name:"Array",elements:[{name:"CalendarEvent"}],raw:"CalendarEvent[]"},description:"Events to display",defaultValue:{value:"[]",computed:!1}},workingHoursStart:{required:!1,tsType:{name:"number"},description:"Working hours start (24h format)",defaultValue:{value:"8",computed:!1}},workingHoursEnd:{required:!1,tsType:{name:"number"},description:"Working hours end (24h format)",defaultValue:{value:"20",computed:!1}},slotDuration:{required:!1,tsType:{name:"number"},description:"Slot duration in minutes",defaultValue:{value:"60",computed:!1}},entity:{required:!1,tsType:{name:"string"},description:"Entity context for events",defaultValue:{value:'"TrainingSession"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const _e={title:"Blaz-Klemenc/Organisms/WeeklyCalendar",component:B,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{workingHoursStart:{control:{type:"number",min:0,max:23},description:"Working hours start (24h format)"},workingHoursEnd:{control:{type:"number",min:1,max:24},description:"Working hours end (24h format)"},slotDuration:{control:{type:"select"},options:[15,30,60],description:"Slot duration in minutes"}}},n=(o,s=10,i=0)=>{const a=new Date;return a.setDate(a.getDate()+o),a.setHours(s,i,0,0),a},k=[{id:"event-1",title:"Personal Training - Ana",startTime:n(0,9,0),type:"personal",traineeId:"trainee-1",traineeName:"Ana Kovac"},{id:"event-2",title:"Group HIIT",startTime:n(0,10,0),type:"group"},{id:"event-3",title:"Lunch Break",startTime:n(0,12,0),type:"break"},{id:"event-4",title:"Personal Training - Marko",startTime:n(0,14,0),type:"personal",traineeId:"trainee-2",traineeName:"Marko Horvat"},{id:"event-5",title:"Group Yoga",startTime:n(1,9,0),type:"group"},{id:"event-6",title:"Personal Training - Luka",startTime:n(1,11,0),type:"personal",traineeId:"trainee-3",traineeName:"Luka Novak"},{id:"event-7",title:"Group Strength",startTime:n(2,10,0),type:"group"},{id:"event-8",title:"Personal Training - Maja",startTime:n(2,15,0),type:"personal",traineeId:"trainee-4",traineeName:"Maja Krajnc"},{id:"event-9",title:"Admin Break",startTime:n(3,12,0),type:"break"},{id:"event-10",title:"Group Boxing",startTime:n(3,17,0),type:"group"},{id:"event-11",title:"Personal Training - Jan",startTime:n(4,8,0),type:"personal",traineeId:"trainee-5",traineeName:"Jan Vidmar"},{id:"event-12",title:"Personal Training - Petra",startTime:n(4,10,0),type:"personal",traineeId:"trainee-6",traineeName:"Petra Zupan"}],x={args:{events:k,workingHoursStart:8,workingHoursEnd:20,slotDuration:60}},D={args:{events:[],workingHoursStart:8,workingHoursEnd:20,slotDuration:60}},b={args:{events:k,workingHoursStart:6,workingHoursEnd:14,slotDuration:60}},v={args:{events:k,workingHoursStart:14,workingHoursEnd:22,slotDuration:60}},w={args:{events:k,workingHoursStart:8,workingHoursEnd:18,slotDuration:30}},f={args:{events:k.filter(o=>o.type==="personal"),workingHoursStart:8,workingHoursEnd:20,slotDuration:60}},T={args:{events:k.filter(o=>o.type==="group"),workingHoursStart:8,workingHoursEnd:20,slotDuration:60}},N={args:{events:[{id:"busy-1",title:"Session 1",startTime:n(0,8,0),type:"personal",traineeName:"Client A"},{id:"busy-2",title:"Session 2",startTime:n(0,9,0),type:"personal",traineeName:"Client B"},{id:"busy-3",title:"Session 3",startTime:n(0,10,0),type:"group"},{id:"busy-4",title:"Session 4",startTime:n(0,11,0),type:"personal",traineeName:"Client C"},{id:"busy-5",title:"Lunch",startTime:n(0,12,0),type:"break"},{id:"busy-6",title:"Session 5",startTime:n(0,13,0),type:"personal",traineeName:"Client D"},{id:"busy-7",title:"Session 6",startTime:n(0,14,0),type:"group"},{id:"busy-8",title:"Session 7",startTime:n(0,15,0),type:"personal",traineeName:"Client E"},{id:"busy-9",title:"Session 8",startTime:n(0,16,0),type:"personal",traineeName:"Client F"},{id:"busy-10",title:"Session 9",startTime:n(0,17,0),type:"group"}],workingHoursStart:8,workingHoursEnd:18,slotDuration:60}};var A,L,G;x.parameters={...x.parameters,docs:{...(A=x.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    events: sampleEvents,
    workingHoursStart: 8,
    workingHoursEnd: 20,
    slotDuration: 60
  }
}`,...(G=(L=x.parameters)==null?void 0:L.docs)==null?void 0:G.source}}};var M,O,V;D.parameters={...D.parameters,docs:{...(M=D.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    events: [],
    workingHoursStart: 8,
    workingHoursEnd: 20,
    slotDuration: 60
  }
}`,...(V=(O=D.parameters)==null?void 0:O.docs)==null?void 0:V.source}}};var _,q,K;b.parameters={...b.parameters,docs:{...(_=b.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    events: sampleEvents,
    workingHoursStart: 6,
    workingHoursEnd: 14,
    slotDuration: 60
  }
}`,...(K=(q=b.parameters)==null?void 0:q.docs)==null?void 0:K.source}}};var z,$,F;v.parameters={...v.parameters,docs:{...(z=v.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    events: sampleEvents,
    workingHoursStart: 14,
    workingHoursEnd: 22,
    slotDuration: 60
  }
}`,...(F=($=v.parameters)==null?void 0:$.docs)==null?void 0:F.source}}};var J,R,Y;w.parameters={...w.parameters,docs:{...(J=w.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    events: sampleEvents,
    workingHoursStart: 8,
    workingHoursEnd: 18,
    slotDuration: 30
  }
}`,...(Y=(R=w.parameters)==null?void 0:R.docs)==null?void 0:Y.source}}};var Z,Q,X;f.parameters={...f.parameters,docs:{...(Z=f.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    events: sampleEvents.filter(e => e.type === "personal"),
    workingHoursStart: 8,
    workingHoursEnd: 20,
    slotDuration: 60
  }
}`,...(X=(Q=f.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var ee,te,re;T.parameters={...T.parameters,docs:{...(ee=T.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    events: sampleEvents.filter(e => e.type === "group"),
    workingHoursStart: 8,
    workingHoursEnd: 20,
    slotDuration: 60
  }
}`,...(re=(te=T.parameters)==null?void 0:te.docs)==null?void 0:re.source}}};var ne,se,ae;N.parameters={...N.parameters,docs:{...(ne=N.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    events: [{
      id: "busy-1",
      title: "Session 1",
      startTime: getDate(0, 8, 0),
      type: "personal",
      traineeName: "Client A"
    }, {
      id: "busy-2",
      title: "Session 2",
      startTime: getDate(0, 9, 0),
      type: "personal",
      traineeName: "Client B"
    }, {
      id: "busy-3",
      title: "Session 3",
      startTime: getDate(0, 10, 0),
      type: "group"
    }, {
      id: "busy-4",
      title: "Session 4",
      startTime: getDate(0, 11, 0),
      type: "personal",
      traineeName: "Client C"
    }, {
      id: "busy-5",
      title: "Lunch",
      startTime: getDate(0, 12, 0),
      type: "break"
    }, {
      id: "busy-6",
      title: "Session 5",
      startTime: getDate(0, 13, 0),
      type: "personal",
      traineeName: "Client D"
    }, {
      id: "busy-7",
      title: "Session 6",
      startTime: getDate(0, 14, 0),
      type: "group"
    }, {
      id: "busy-8",
      title: "Session 7",
      startTime: getDate(0, 15, 0),
      type: "personal",
      traineeName: "Client E"
    }, {
      id: "busy-9",
      title: "Session 8",
      startTime: getDate(0, 16, 0),
      type: "personal",
      traineeName: "Client F"
    }, {
      id: "busy-10",
      title: "Session 9",
      startTime: getDate(0, 17, 0),
      type: "group"
    }],
    workingHoursStart: 8,
    workingHoursEnd: 18,
    slotDuration: 60
  }
}`,...(ae=(se=N.parameters)==null?void 0:se.docs)==null?void 0:ae.source}}};const qe=["Default","Empty","EarlyMorningSchedule","EveningSchedule","HalfHourSlots","PersonalOnly","GroupOnly","BusyDay"];export{N as BusyDay,x as Default,b as EarlyMorningSchedule,D as Empty,v as EveningSchedule,T as GroupOnly,w as HalfHourSlots,f as PersonalOnly,qe as __namedExportsOrder,_e as default};
