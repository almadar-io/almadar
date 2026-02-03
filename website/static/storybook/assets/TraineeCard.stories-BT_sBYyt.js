import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as N}from"./index-GiUgBvb1.js";import{c as v}from"./cn-BNf5BS2b.js";import{B as l}from"./Box-DYJzRMmP.js";import{H as o,V as d}from"./Stack-1XI3stiC.js";import{T as t}from"./Typography-Wmkp-g7N.js";import{B as ce}from"./Button-B7t-_IKa.js";import{C as y}from"./Card-BNT5PrJ5.js";import{u as me}from"./useEventBus-BNZMNlv8.js";import{C as D}from"./CreditMeter-W0DSATns.js";import{U as A}from"./user-BePscFH1.js";import{C as le}from"./chevron-right-pDF_OUfd.js";import{M as de}from"./message-circle-Yw7MGdXs.js";import{C as I}from"./calendar-rGtwHcH_.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./Badge-Dd4QqFOk.js";import"./alert-triangle-BLuUOBNm.js";import"./clock-DT9ve7xf.js";const pe=a=>{const n=new Date(a),s=Math.floor((new Date().getTime()-n.getTime())/(1e3*60*60*24));return s===0?"Today":s===1?"Yesterday":s<7?`${s} days ago`:n.toLocaleDateString("en-US",{month:"short",day:"numeric"})},ue=a=>{const n=new Date(a),c=new Date,s=n.getTime()-c.getTime(),i=Math.floor(s/(1e3*60*60*24));return i===0?n.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"}):i===1?"Tomorrow":i<7?n.toLocaleDateString("en-US",{weekday:"short"}):n.toLocaleDateString("en-US",{month:"short",day:"numeric"})},S=({trainee:a,showActions:n=!0,compact:c=!1,entity:s="User",className:i})=>{const m=me(),T=N.useCallback(()=>{m.emit("UI:VIEW",{row:a,entity:s})},[m,a,s]),oe=N.useCallback(ie=>{ie.stopPropagation(),m.emit("UI:MESSAGE_TRAINEE",{row:a,entity:s})},[m,a,s]);return c?e.jsx(y,{className:v("p-3 cursor-pointer hover:bg-neutral-50",i),onClick:T,children:e.jsxs(o,{justify:"between",align:"center",children:[e.jsxs(o,{gap:"sm",align:"center",children:[a.profileImage?e.jsx("img",{src:a.profileImage,alt:a.name,className:"h-10 w-10 rounded-full object-cover"}):e.jsx(l,{display:"flex",rounded:"full",className:"h-10 w-10 items-center justify-center bg-blue-100",children:e.jsx(A,{className:"h-5 w-5 text-blue-600"})}),e.jsxs(d,{gap:"none",children:[e.jsx(t,{variant:"body",className:"font-medium",children:a.name}),a.credits&&e.jsx(D,{data:a.credits,compact:!0,showActionButton:!1})]})]}),e.jsx(le,{className:"h-4 w-4 text-neutral-400"})]})}):e.jsx(y,{className:v("p-4 cursor-pointer hover:shadow-md transition-shadow",i),onClick:T,children:e.jsxs(d,{gap:"md",children:[e.jsxs(o,{justify:"between",align:"start",children:[e.jsxs(o,{gap:"sm",align:"center",children:[a.profileImage?e.jsx("img",{src:a.profileImage,alt:a.name,className:"h-12 w-12 rounded-full object-cover"}):e.jsx(l,{display:"flex",rounded:"full",className:"h-12 w-12 items-center justify-center bg-blue-100",children:e.jsx(A,{className:"h-6 w-6 text-blue-600"})}),e.jsxs(d,{gap:"none",children:[e.jsx(t,{variant:"h4",children:a.name}),e.jsx(t,{variant:"small",className:"text-neutral-500",children:a.email})]})]}),n&&e.jsx(ce,{variant:"ghost",size:"sm",onClick:oe,className:"text-blue-600 hover:bg-blue-50",children:e.jsx(de,{className:"h-4 w-4"})})]}),a.credits&&e.jsx(D,{data:a.credits,size:"sm",showActionButton:!1}),a.nextSession?e.jsx(l,{rounded:"lg",padding:"sm",className:"bg-blue-50",children:e.jsxs(o,{gap:"sm",align:"center",children:[e.jsx(I,{className:"h-4 w-4 text-blue-600"}),e.jsxs(d,{gap:"none",children:[e.jsxs(t,{variant:"small",className:"text-blue-600 font-medium",children:["Next: ",a.nextSession.title]}),e.jsx(t,{variant:"small",className:"text-blue-500",children:ue(a.nextSession.scheduledAt)})]})]})}):e.jsx(l,{rounded:"lg",padding:"sm",className:"bg-amber-50",children:e.jsxs(o,{gap:"sm",align:"center",children:[e.jsx(I,{className:"h-4 w-4 text-amber-600"}),e.jsx(t,{variant:"small",className:"text-amber-600",children:"No session scheduled"})]})}),e.jsxs(o,{justify:"between",className:"text-neutral-500",children:[a.totalSessions!==void 0&&e.jsxs(t,{variant:"small",children:[a.totalSessions," sessions"]}),a.lastActiveAt&&e.jsxs(t,{variant:"small",children:["Active ",pe(a.lastActiveAt)]})]})]})})};S.displayName="TraineeCard";S.__docgenInfo={description:"",methods:[],displayName:"TraineeCard",props:{trainee:{required:!0,tsType:{name:"TraineeData"},description:"Trainee data"},showActions:{required:!1,tsType:{name:"boolean"},description:"Show action buttons",defaultValue:{value:"true",computed:!1}},compact:{required:!1,tsType:{name:"boolean"},description:"Compact mode",defaultValue:{value:"false",computed:!1}},entity:{required:!1,tsType:{name:"string"},description:"Entity context for events",defaultValue:{value:'"User"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const Me={title:"Blaz-Klemenc/Molecules/TraineeCard",component:S,parameters:{layout:"centered"},tags:["autodocs"]},ge={totalCredits:10,remainingCredits:8},r={id:"trainee-1",name:"John Smith",email:"john@example.com",phone:"+1 234 567 8900",role:"trainee",credits:ge,nextSession:{title:"Strength Training",scheduledAt:new Date(Date.now()+2*24*60*60*1e3)}},p={args:{trainee:r}},u={args:{trainee:{...r,profileImage:"https://i.pravatar.cc/150?u=john"}}},g={args:{trainee:{...r,name:"Jane Doe",email:"jane@example.com",credits:{totalCredits:10,remainingCredits:2}}}},h={args:{trainee:{...r,name:"Mike Johnson",email:"mike@example.com",nextSession:void 0}}},x={args:{trainee:{...r,name:"Sarah Wilson",email:"sarah@example.com",credits:{totalCredits:10,remainingCredits:5,expiresAt:new Date(Date.now()+5*24*60*60*1e3)}}}},f={args:{trainee:r,compact:!0}},C={args:{trainee:r,showActions:!1}},j={args:{trainee:{...r,name:"Alex Brown",email:"alex@example.com",phone:void 0}}},w={args:{trainee:{...r,name:"Chris Green",credits:{totalCredits:10,remainingCredits:10}}}},b={args:{trainee:{...r,name:"Pat Taylor",credits:{totalCredits:10,remainingCredits:0}}}};var k,E,U;p.parameters={...p.parameters,docs:{...(k=p.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    trainee: baseTrainee
  }
}`,...(U=(E=p.parameters)==null?void 0:E.docs)==null?void 0:U.source}}};var B,M,P;u.parameters={...u.parameters,docs:{...(B=u.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    trainee: {
      ...baseTrainee,
      profileImage: "https://i.pravatar.cc/150?u=john"
    }
  }
}`,...(P=(M=u.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var V,L,q;g.parameters={...g.parameters,docs:{...(V=g.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    trainee: {
      ...baseTrainee,
      name: "Jane Doe",
      email: "jane@example.com",
      credits: {
        totalCredits: 10,
        remainingCredits: 2
      }
    }
  }
}`,...(q=(L=g.parameters)==null?void 0:L.docs)==null?void 0:q.source}}};var J,W,_;h.parameters={...h.parameters,docs:{...(J=h.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    trainee: {
      ...baseTrainee,
      name: "Mike Johnson",
      email: "mike@example.com",
      nextSession: undefined
    }
  }
}`,...(_=(W=h.parameters)==null?void 0:W.docs)==null?void 0:_.source}}};var H,z,G;x.parameters={...x.parameters,docs:{...(H=x.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    trainee: {
      ...baseTrainee,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      credits: {
        totalCredits: 10,
        remainingCredits: 5,
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      }
    }
  }
}`,...(G=(z=x.parameters)==null?void 0:z.docs)==null?void 0:G.source}}};var R,F,Z;f.parameters={...f.parameters,docs:{...(R=f.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    trainee: baseTrainee,
    compact: true
  }
}`,...(Z=(F=f.parameters)==null?void 0:F.docs)==null?void 0:Z.source}}};var K,O,Y;C.parameters={...C.parameters,docs:{...(K=C.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    trainee: baseTrainee,
    showActions: false
  }
}`,...(Y=(O=C.parameters)==null?void 0:O.docs)==null?void 0:Y.source}}};var $,Q,X;j.parameters={...j.parameters,docs:{...($=j.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    trainee: {
      ...baseTrainee,
      name: "Alex Brown",
      email: "alex@example.com",
      phone: undefined
    }
  }
}`,...(X=(Q=j.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var ee,ae,se;w.parameters={...w.parameters,docs:{...(ee=w.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    trainee: {
      ...baseTrainee,
      name: "Chris Green",
      credits: {
        totalCredits: 10,
        remainingCredits: 10
      }
    }
  }
}`,...(se=(ae=w.parameters)==null?void 0:ae.docs)==null?void 0:se.source}}};var re,ne,te;b.parameters={...b.parameters,docs:{...(re=b.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    trainee: {
      ...baseTrainee,
      name: "Pat Taylor",
      credits: {
        totalCredits: 10,
        remainingCredits: 0
      }
    }
  }
}`,...(te=(ne=b.parameters)==null?void 0:ne.docs)==null?void 0:te.source}}};const Pe=["Default","WithProfileImage","LowCredits","NoUpcomingSession","ExpiringCredits","Compact","HideActions","NoPhone","FullCredits","ZeroCredits"];export{f as Compact,p as Default,x as ExpiringCredits,w as FullCredits,C as HideActions,g as LowCredits,j as NoPhone,h as NoUpcomingSession,u as WithProfileImage,b as ZeroCredits,Pe as __namedExportsOrder,Me as default};
