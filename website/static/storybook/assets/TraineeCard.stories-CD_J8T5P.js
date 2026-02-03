import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as N}from"./index-GiUgBvb1.js";import{c as D}from"./cn-BNf5BS2b.js";import{B as d}from"./Box-DYJzRMmP.js";import{H as o,V as p}from"./Stack-DhhoTPuC.js";import{T as i}from"./Typography-Wmkp-g7N.js";import{B as le}from"./Button-Dn0472P0.js";import{C as A}from"./Card-BNT5PrJ5.js";import{u as de}from"./useEventBus-BNZMNlv8.js";import{C as k}from"./CreditMeter-CRtBFWe-.js";import{U as I}from"./user-BePscFH1.js";import{C as pe}from"./chevron-right-pDF_OUfd.js";import{M as ue}from"./message-circle-Yw7MGdXs.js";import{C as E}from"./calendar-rGtwHcH_.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./Badge-CpH0PNM6.js";import"./alert-triangle-BLuUOBNm.js";import"./clock-DT9ve7xf.js";const ge=m=>{const r=new Date(m),n=Math.floor((new Date().getTime()-r.getTime())/(1e3*60*60*24));return n===0?"Today":n===1?"Yesterday":n<7?`${n} days ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})},he=m=>{const r=new Date(m),c=new Date,n=r.getTime()-c.getTime(),t=Math.floor(n/(1e3*60*60*24));return t===0?r.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"}):t===1?"Tomorrow":t<7?r.toLocaleDateString("en-US",{weekday:"short"}):r.toLocaleDateString("en-US",{month:"short",day:"numeric"})},S=({trainee:m,data:r,showActions:c=!0,compact:n=!1,entity:t="User",className:y})=>{const l=de(),a=m??(Array.isArray(r)?r[0]:void 0);if(!a)return null;const v=N.useCallback(()=>{l.emit("UI:VIEW",{row:a,entity:t})},[l,a,t]),me=N.useCallback(ce=>{ce.stopPropagation(),l.emit("UI:MESSAGE_TRAINEE",{row:a,entity:t})},[l,a,t]);return n?e.jsx(A,{className:D("p-3 cursor-pointer hover:bg-neutral-50",y),onClick:v,children:e.jsxs(o,{justify:"between",align:"center",children:[e.jsxs(o,{gap:"sm",align:"center",children:[a.profileImage?e.jsx("img",{src:a.profileImage,alt:a.name,className:"h-10 w-10 rounded-full object-cover"}):e.jsx(d,{display:"flex",rounded:"full",className:"h-10 w-10 items-center justify-center bg-blue-100",children:e.jsx(I,{className:"h-5 w-5 text-blue-600"})}),e.jsxs(p,{gap:"none",children:[e.jsx(i,{variant:"body",className:"font-medium",children:a.name}),a.credits&&e.jsx(k,{data:a.credits,compact:!0,showActionButton:!1})]})]}),e.jsx(pe,{className:"h-4 w-4 text-neutral-400"})]})}):e.jsx(A,{className:D("p-4 cursor-pointer hover:shadow-md transition-shadow",y),onClick:v,children:e.jsxs(p,{gap:"md",children:[e.jsxs(o,{justify:"between",align:"start",children:[e.jsxs(o,{gap:"sm",align:"center",children:[a.profileImage?e.jsx("img",{src:a.profileImage,alt:a.name,className:"h-12 w-12 rounded-full object-cover"}):e.jsx(d,{display:"flex",rounded:"full",className:"h-12 w-12 items-center justify-center bg-blue-100",children:e.jsx(I,{className:"h-6 w-6 text-blue-600"})}),e.jsxs(p,{gap:"none",children:[e.jsx(i,{variant:"h4",children:a.name}),e.jsx(i,{variant:"small",className:"text-neutral-500",children:a.email})]})]}),c&&e.jsx(le,{variant:"ghost",size:"sm",onClick:me,className:"text-blue-600 hover:bg-blue-50",children:e.jsx(ue,{className:"h-4 w-4"})})]}),a.credits&&e.jsx(k,{data:a.credits,size:"sm",showActionButton:!1}),a.nextSession?e.jsx(d,{rounded:"lg",padding:"sm",className:"bg-blue-50",children:e.jsxs(o,{gap:"sm",align:"center",children:[e.jsx(E,{className:"h-4 w-4 text-blue-600"}),e.jsxs(p,{gap:"none",children:[e.jsxs(i,{variant:"small",className:"text-blue-600 font-medium",children:["Next: ",a.nextSession.title]}),e.jsx(i,{variant:"small",className:"text-blue-500",children:he(a.nextSession.scheduledAt)})]})]})}):e.jsx(d,{rounded:"lg",padding:"sm",className:"bg-amber-50",children:e.jsxs(o,{gap:"sm",align:"center",children:[e.jsx(E,{className:"h-4 w-4 text-amber-600"}),e.jsx(i,{variant:"small",className:"text-amber-600",children:"No session scheduled"})]})}),e.jsxs(o,{justify:"between",className:"text-neutral-500",children:[a.totalSessions!==void 0&&e.jsxs(i,{variant:"small",children:[a.totalSessions," sessions"]}),a.lastActiveAt&&e.jsxs(i,{variant:"small",children:["Active ",ge(a.lastActiveAt)]})]})]})})};S.displayName="TraineeCard";S.__docgenInfo={description:"",methods:[],displayName:"TraineeCard",props:{trainee:{required:!1,tsType:{name:"TraineeData"},description:"Trainee data"},data:{required:!1,tsType:{name:"union",raw:"TraineeData[] | unknown[]",elements:[{name:"Array",elements:[{name:"TraineeData"}],raw:"TraineeData[]"},{name:"Array",elements:[{name:"unknown"}],raw:"unknown[]"}]},description:"Data array for list mode"},showActions:{required:!1,tsType:{name:"boolean"},description:"Show action buttons",defaultValue:{value:"true",computed:!1}},showCredits:{required:!1,tsType:{name:"boolean"},description:"Show credits"},showProgress:{required:!1,tsType:{name:"boolean"},description:"Show progress"},layout:{required:!1,tsType:{name:"union",raw:'"list" | "grid" | "cards" | string',elements:[{name:"literal",value:'"list"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"cards"'},{name:"string"}]},description:"Layout mode"},compact:{required:!1,tsType:{name:"boolean"},description:"Compact mode",defaultValue:{value:"false",computed:!1}},entity:{required:!1,tsType:{name:"string"},description:"Entity context for events",defaultValue:{value:'"User"',computed:!1}},operations:{required:!1,tsType:{name:"Array",elements:[{name:"TraineeOperation"}],raw:"TraineeOperation[]"},description:"Operations/actions available"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const Pe={title:"Blaz-Klemenc/Molecules/TraineeCard",component:S,parameters:{layout:"centered"},tags:["autodocs"]},fe={totalCredits:10,remainingCredits:8},s={id:"trainee-1",name:"John Smith",email:"john@example.com",phone:"+1 234 567 8900",role:"trainee",credits:fe,nextSession:{title:"Strength Training",scheduledAt:new Date(Date.now()+2*24*60*60*1e3)}},u={args:{trainee:s}},g={args:{trainee:{...s,profileImage:"https://i.pravatar.cc/150?u=john"}}},h={args:{trainee:{...s,name:"Jane Doe",email:"jane@example.com",credits:{totalCredits:10,remainingCredits:2}}}},f={args:{trainee:{...s,name:"Mike Johnson",email:"mike@example.com",nextSession:void 0}}},x={args:{trainee:{...s,name:"Sarah Wilson",email:"sarah@example.com",credits:{totalCredits:10,remainingCredits:5,expiresAt:new Date(Date.now()+5*24*60*60*1e3)}}}},w={args:{trainee:s,compact:!0}},C={args:{trainee:s,showActions:!1}},j={args:{trainee:{...s,name:"Alex Brown",email:"alex@example.com",phone:void 0}}},b={args:{trainee:{...s,name:"Chris Green",credits:{totalCredits:10,remainingCredits:10}}}},T={args:{trainee:{...s,name:"Pat Taylor",credits:{totalCredits:10,remainingCredits:0}}}};var U,B,M;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    trainee: baseTrainee
  }
}`,...(M=(B=u.parameters)==null?void 0:B.docs)==null?void 0:M.source}}};var q,P,L;g.parameters={...g.parameters,docs:{...(q=g.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    trainee: {
      ...baseTrainee,
      profileImage: "https://i.pravatar.cc/150?u=john"
    }
  }
}`,...(L=(P=g.parameters)==null?void 0:P.docs)==null?void 0:L.source}}};var V,J,W;h.parameters={...h.parameters,docs:{...(V=h.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(W=(J=h.parameters)==null?void 0:J.docs)==null?void 0:W.source}}};var _,H,O;f.parameters={...f.parameters,docs:{...(_=f.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    trainee: {
      ...baseTrainee,
      name: "Mike Johnson",
      email: "mike@example.com",
      nextSession: undefined
    }
  }
}`,...(O=(H=f.parameters)==null?void 0:H.docs)==null?void 0:O.source}}};var z,G,R;x.parameters={...x.parameters,docs:{...(z=x.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(R=(G=x.parameters)==null?void 0:G.docs)==null?void 0:R.source}}};var F,Z,K;w.parameters={...w.parameters,docs:{...(F=w.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    trainee: baseTrainee,
    compact: true
  }
}`,...(K=(Z=w.parameters)==null?void 0:Z.docs)==null?void 0:K.source}}};var Y,$,Q;C.parameters={...C.parameters,docs:{...(Y=C.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    trainee: baseTrainee,
    showActions: false
  }
}`,...(Q=($=C.parameters)==null?void 0:$.docs)==null?void 0:Q.source}}};var X,ee,ae;j.parameters={...j.parameters,docs:{...(X=j.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    trainee: {
      ...baseTrainee,
      name: "Alex Brown",
      email: "alex@example.com",
      phone: undefined
    }
  }
}`,...(ae=(ee=j.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};var re,se,ne;b.parameters={...b.parameters,docs:{...(re=b.parameters)==null?void 0:re.docs,source:{originalSource:`{
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
}`,...(ne=(se=b.parameters)==null?void 0:se.docs)==null?void 0:ne.source}}};var te,ie,oe;T.parameters={...T.parameters,docs:{...(te=T.parameters)==null?void 0:te.docs,source:{originalSource:`{
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
}`,...(oe=(ie=T.parameters)==null?void 0:ie.docs)==null?void 0:oe.source}}};const Le=["Default","WithProfileImage","LowCredits","NoUpcomingSession","ExpiringCredits","Compact","HideActions","NoPhone","FullCredits","ZeroCredits"];export{w as Compact,u as Default,x as ExpiringCredits,b as FullCredits,C as HideActions,h as LowCredits,j as NoPhone,f as NoUpcomingSession,g as WithProfileImage,T as ZeroCredits,Le as __namedExportsOrder,Pe as default};
