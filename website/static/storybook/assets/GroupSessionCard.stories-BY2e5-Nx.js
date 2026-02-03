import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as D}from"./index-GiUgBvb1.js";import{c as B}from"./cn-BNf5BS2b.js";import{B as c}from"./Box-DYJzRMmP.js";import{H as t,V as l}from"./Stack-1XI3stiC.js";import{T as a}from"./Typography-Wmkp-g7N.js";import{B as N}from"./Button-B7t-_IKa.js";import{C as I}from"./Card-BNT5PrJ5.js";import{B as v}from"./Badge-Dd4QqFOk.js";import{u as ue}from"./useEventBus-BNZMNlv8.js";import{U as E}from"./users-CV1mGUsS.js";import{C as pe}from"./calendar-rGtwHcH_.js";import{C as me}from"./clock-DT9ve7xf.js";import{M as ge}from"./map-pin-BS1jFVqS.js";import{Y as he}from"./youtube-BrUjTZcy.js";import{U as M}from"./user-plus-BlQDsowZ.js";import{E as xe}from"./eye-DPfPdwVp.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";const je={scheduled:{color:"text-blue-600",bgColor:"bg-blue-100",label:"Scheduled"},"in-progress":{color:"text-amber-600",bgColor:"bg-amber-100",label:"In Progress"},completed:{color:"text-emerald-600",bgColor:"bg-emerald-100",label:"Completed"},cancelled:{color:"text-red-600",bgColor:"bg-red-100",label:"Cancelled"}},fe=s=>new Date(s).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}),A=({session:s,showAttendees:G=!0,compact:de=!1,entity:d="TrainingSession",className:k})=>{var T;const u=ue(),S=s.status||"scheduled",w=je[S],y=s.currentParticipants??((T=s.participants)==null?void 0:T.length)??0,i=s.maxParticipants-y,o=i<=0,C=D.useCallback(()=>{u.emit("UI:VIEW",{row:s,entity:d})},[u,s,d]),F=D.useCallback(r=>{r.stopPropagation(),u.emit("UI:MANAGE_ATTENDEES",{row:s,entity:d})},[u,s,d]);return de?e.jsx(I,{className:B("p-3 cursor-pointer hover:bg-neutral-50",k),onClick:C,children:e.jsxs(t,{justify:"between",align:"center",children:[e.jsxs(t,{gap:"sm",align:"center",children:[e.jsx(c,{display:"flex",rounded:"lg",padding:"xs",className:"items-center justify-center bg-purple-100",children:e.jsx(E,{className:"h-4 w-4 text-purple-600"})}),e.jsxs(l,{gap:"none",children:[e.jsx(a,{variant:"label",children:s.title}),e.jsxs(a,{variant:"small",className:"text-neutral-500",children:[y,"/",s.maxParticipants," participants"]})]})]}),e.jsx(v,{variant:o?"danger":"success",size:"sm",children:o?"Full":`${i} spots`})]})}):e.jsx(I,{className:B("p-4 cursor-pointer hover:shadow-md transition-shadow",S==="cancelled"&&"opacity-60",k),onClick:C,children:e.jsxs(l,{gap:"md",children:[e.jsxs(t,{justify:"between",align:"start",children:[e.jsxs(t,{gap:"sm",align:"center",children:[e.jsx(c,{display:"flex",rounded:"lg",padding:"sm",className:"items-center justify-center bg-purple-100",children:e.jsx(E,{className:"h-5 w-5 text-purple-600"})}),e.jsxs(l,{gap:"none",children:[e.jsx(a,{variant:"h4",children:s.title}),e.jsx(v,{variant:"default",size:"sm",className:w.bgColor,children:e.jsx("span",{className:w.color,children:w.label})})]})]}),e.jsx(v,{variant:o?"danger":i<=3?"warning":"success",children:o?"Full":`${i} spot${i!==1?"s":""} left`})]}),s.description&&e.jsx(a,{variant:"body",className:"text-neutral-600",children:s.description}),e.jsxs(l,{gap:"xs",children:[e.jsxs(t,{gap:"sm",align:"center",children:[e.jsx(pe,{className:"h-4 w-4 text-neutral-400"}),e.jsx(a,{variant:"body",children:fe(s.scheduledAt)})]}),e.jsxs(t,{gap:"sm",align:"center",children:[e.jsx(me,{className:"h-4 w-4 text-neutral-400"}),e.jsxs(a,{variant:"body",children:[s.duration," minutes"]})]}),s.location&&e.jsxs(t,{gap:"sm",align:"center",children:[e.jsx(ge,{className:"h-4 w-4 text-neutral-400"}),e.jsx(a,{variant:"body",children:s.location})]}),s.youtubeLink&&e.jsxs(t,{gap:"sm",align:"center",children:[e.jsx(he,{className:"h-4 w-4 text-red-500"}),e.jsx(a,{variant:"small",className:"text-red-600",children:"Video available"})]})]}),G&&s.participants&&s.participants.length>0&&e.jsxs(l,{gap:"sm",children:[e.jsxs(t,{justify:"between",align:"center",children:[e.jsxs(a,{variant:"label",className:"text-neutral-600",children:["Participants (",y,"/",s.maxParticipants,")"]}),e.jsxs(N,{variant:"ghost",size:"sm",onClick:F,children:[e.jsx(M,{className:"h-4 w-4 mr-1"}),"Manage"]})]}),e.jsxs(t,{gap:"xs",className:"flex-wrap",children:[s.participants.slice(0,5).map(r=>e.jsx(c,{title:r.name,className:"relative",children:r.profileImage?e.jsx("img",{src:r.profileImage,alt:r.name,className:"h-8 w-8 rounded-full object-cover border-2 border-white"}):e.jsx(c,{display:"flex",rounded:"full",className:"h-8 w-8 items-center justify-center bg-neutral-200 border-2 border-white",children:e.jsx(a,{variant:"small",className:"font-medium",children:r.name.charAt(0)})})},r.id)),s.participants.length>5&&e.jsx(c,{display:"flex",rounded:"full",className:"h-8 w-8 items-center justify-center bg-neutral-100 border-2 border-white",children:e.jsxs(a,{variant:"small",className:"text-neutral-600",children:["+",s.participants.length-5]})})]})]}),e.jsxs(t,{gap:"sm",className:"border-t border-neutral-100 pt-3",children:[e.jsxs(N,{variant:"secondary",size:"sm",onClick:C,children:[e.jsx(xe,{className:"h-4 w-4 mr-1"}),"View Details"]}),!o&&S==="scheduled"&&e.jsxs(N,{variant:"primary",size:"sm",onClick:F,children:[e.jsx(M,{className:"h-4 w-4 mr-1"}),"Add Participant"]})]})]})})};A.displayName="GroupSessionCard";A.__docgenInfo={description:"",methods:[],displayName:"GroupSessionCard",props:{session:{required:!0,tsType:{name:"GroupSessionData"},description:"Group session data"},showAttendees:{required:!1,tsType:{name:"boolean"},description:"Show attendee avatars",defaultValue:{value:"true",computed:!1}},compact:{required:!1,tsType:{name:"boolean"},description:"Compact mode",defaultValue:{value:"false",computed:!1}},entity:{required:!1,tsType:{name:"string"},description:"Entity context for events",defaultValue:{value:'"TrainingSession"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const Ve={title:"Blaz-Klemenc/Molecules/GroupSessionCard",component:A,parameters:{layout:"centered"},tags:["autodocs"]},n=s=>new Date(Date.now()+s*24*60*60*1e3),p={args:{session:{id:"gs-1",title:"Morning HIIT Class",scheduledAt:n(2),duration:60,maxParticipants:10,currentParticipants:6,status:"scheduled",isGroupSession:!0}}},m={args:{session:{id:"gs-2",title:"Power Yoga",scheduledAt:n(1),duration:75,maxParticipants:10,currentParticipants:9,status:"scheduled",isGroupSession:!0}}},g={args:{session:{id:"gs-3",title:"Spin Class",scheduledAt:n(3),duration:45,maxParticipants:10,currentParticipants:10,status:"scheduled",isGroupSession:!0}}},h={args:{session:{id:"gs-4",title:"CrossFit Session",scheduledAt:new Date,duration:60,maxParticipants:12,currentParticipants:8,status:"in-progress",isGroupSession:!0}}},x={args:{session:{id:"gs-5",title:"Boxing Fundamentals",scheduledAt:n(-1),duration:60,maxParticipants:10,currentParticipants:8,status:"completed",isGroupSession:!0}}},j={args:{session:{id:"gs-6",title:"Outdoor Bootcamp",scheduledAt:n(1),duration:90,maxParticipants:15,currentParticipants:5,status:"cancelled",isGroupSession:!0}}},f={args:{session:{id:"gs-7",title:"Recorded Session",scheduledAt:n(-2),duration:60,maxParticipants:10,currentParticipants:10,status:"completed",isGroupSession:!0,youtubeLink:"https://youtube.com/watch?v=abc123"}}},b={args:{session:{id:"gs-8",title:"Marathon Prep Workshop",scheduledAt:n(5),duration:180,maxParticipants:20,currentParticipants:15,status:"scheduled",isGroupSession:!0}}},P={args:{session:{id:"gs-9",title:"Quick Session",scheduledAt:n(1),duration:30,maxParticipants:8,currentParticipants:4,status:"scheduled",isGroupSession:!0},compact:!0}};var L,V,U;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    session: {
      id: "gs-1",
      title: "Morning HIIT Class",
      scheduledAt: daysFromNow(2),
      duration: 60,
      maxParticipants: 10,
      currentParticipants: 6,
      status: "scheduled",
      isGroupSession: true
    }
  }
}`,...(U=(V=p.parameters)==null?void 0:V.docs)==null?void 0:U.source}}};var z,Y,q;m.parameters={...m.parameters,docs:{...(z=m.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    session: {
      id: "gs-2",
      title: "Power Yoga",
      scheduledAt: daysFromNow(1),
      duration: 75,
      maxParticipants: 10,
      currentParticipants: 9,
      status: "scheduled",
      isGroupSession: true
    }
  }
}`,...(q=(Y=m.parameters)==null?void 0:Y.docs)==null?void 0:q.source}}};var W,_,H;g.parameters={...g.parameters,docs:{...(W=g.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    session: {
      id: "gs-3",
      title: "Spin Class",
      scheduledAt: daysFromNow(3),
      duration: 45,
      maxParticipants: 10,
      currentParticipants: 10,
      status: "scheduled",
      isGroupSession: true
    }
  }
}`,...(H=(_=g.parameters)==null?void 0:_.docs)==null?void 0:H.source}}};var O,R,$;h.parameters={...h.parameters,docs:{...(O=h.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    session: {
      id: "gs-4",
      title: "CrossFit Session",
      scheduledAt: new Date(),
      duration: 60,
      maxParticipants: 12,
      currentParticipants: 8,
      status: "in-progress",
      isGroupSession: true
    }
  }
}`,...($=(R=h.parameters)==null?void 0:R.docs)==null?void 0:$.source}}};var Q,K,J;x.parameters={...x.parameters,docs:{...(Q=x.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    session: {
      id: "gs-5",
      title: "Boxing Fundamentals",
      scheduledAt: daysFromNow(-1),
      duration: 60,
      maxParticipants: 10,
      currentParticipants: 8,
      status: "completed",
      isGroupSession: true
    }
  }
}`,...(J=(K=x.parameters)==null?void 0:K.docs)==null?void 0:J.source}}};var X,Z,ee;j.parameters={...j.parameters,docs:{...(X=j.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    session: {
      id: "gs-6",
      title: "Outdoor Bootcamp",
      scheduledAt: daysFromNow(1),
      duration: 90,
      maxParticipants: 15,
      currentParticipants: 5,
      status: "cancelled",
      isGroupSession: true
    }
  }
}`,...(ee=(Z=j.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var se,te,ae;f.parameters={...f.parameters,docs:{...(se=f.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    session: {
      id: "gs-7",
      title: "Recorded Session",
      scheduledAt: daysFromNow(-2),
      duration: 60,
      maxParticipants: 10,
      currentParticipants: 10,
      status: "completed",
      isGroupSession: true,
      youtubeLink: "https://youtube.com/watch?v=abc123"
    }
  }
}`,...(ae=(te=f.parameters)==null?void 0:te.docs)==null?void 0:ae.source}}};var re,ne,ie;b.parameters={...b.parameters,docs:{...(re=b.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    session: {
      id: "gs-8",
      title: "Marathon Prep Workshop",
      scheduledAt: daysFromNow(5),
      duration: 180,
      maxParticipants: 20,
      currentParticipants: 15,
      status: "scheduled",
      isGroupSession: true
    }
  }
}`,...(ie=(ne=b.parameters)==null?void 0:ne.docs)==null?void 0:ie.source}}};var oe,ce,le;P.parameters={...P.parameters,docs:{...(oe=P.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    session: {
      id: "gs-9",
      title: "Quick Session",
      scheduledAt: daysFromNow(1),
      duration: 30,
      maxParticipants: 8,
      currentParticipants: 4,
      status: "scheduled",
      isGroupSession: true
    },
    compact: true
  }
}`,...(le=(ce=P.parameters)==null?void 0:ce.docs)==null?void 0:le.source}}};const Ue=["Default","AlmostFull","Full","InProgress","Completed","Cancelled","WithYouTubeLink","LongDuration","Compact"];export{m as AlmostFull,j as Cancelled,P as Compact,x as Completed,p as Default,g as Full,h as InProgress,b as LongDuration,f as WithYouTubeLink,Ue as __namedExportsOrder,Ve as default};
