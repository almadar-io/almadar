import{j as e}from"./jsx-runtime-CDt2p4po.js";import{c}from"./cn-BNf5BS2b.js";import{B as A}from"./Box-DYJzRMmP.js";import{V as a,H as t}from"./Stack-1XI3stiC.js";import{T as r}from"./Typography-Wmkp-g7N.js";import{B as l}from"./Button-B7t-_IKa.js";import{C as U}from"./Card-BNT5PrJ5.js";import{B as b}from"./Badge-Dd4QqFOk.js";import{A as he}from"./Avatar-CJtPgGUU.js";import{S as je}from"./Spinner-vF2DJrH5.js";import{u as fe}from"./useEventBus-BNZMNlv8.js";import{A as Se}from"./arrow-left-CMPuXvFr.js";import{S as ve}from"./square-pen-D7sL1yO_.js";import{S as ye}from"./star-D_3mxVsm.js";import{M as Ne}from"./mail-CI1Ybt8r.js";import{U as Ue}from"./users-CV1mGUsS.js";import{C as we}from"./calendar-rGtwHcH_.js";import{A as B}from"./activity-DUdIMRW5.js";import{S as Ie}from"./shield-CEa1K-yC.js";import"./index-GiUgBvb1.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./user-BePscFH1.js";const Ae=N=>{switch(N){case"active":return"success";case"pending":return"warning";case"suspended":return"error";default:return"neutral"}},w=({user:N,data:me,isLoading:ue=!1,error:I=null,showBack:pe=!0,className:o})=>{const i=fe(),s=N||me,ge=()=>{i.emit("UI:BACK",{})},xe=()=>{s&&i.emit("UI:EDIT",{row:s,entity:"User"})};return ue?e.jsxs(a,{align:"center",justify:"center",className:c("py-12",o),children:[e.jsx(je,{size:"lg"}),e.jsx(r,{variant:"body",className:"text-neutral-500",children:"Loading user profile..."})]}):I?e.jsx(a,{align:"center",justify:"center",className:c("py-12",o),children:e.jsxs(r,{variant:"body",className:"text-red-500",children:["Error: ",I.message]})}):s?e.jsxs(a,{gap:"lg",className:c("p-6",o),children:[e.jsxs(t,{justify:"between",align:"center",wrap:!0,children:[e.jsxs(t,{gap:"md",align:"center",children:[pe&&e.jsxs(l,{variant:"ghost",onClick:ge,className:"gap-2",children:[e.jsx(Se,{className:"h-4 w-4"}),"Back"]}),e.jsx(a,{gap:"xs",children:e.jsx(r,{variant:"h1",children:"User Profile"})})]}),e.jsxs(l,{variant:"primary",onClick:xe,className:"gap-2",children:[e.jsx(ve,{className:"h-4 w-4"}),"Edit Profile"]})]}),e.jsx(U,{className:"p-6",children:e.jsxs(t,{gap:"lg",align:"start",wrap:!0,children:[e.jsxs(a,{align:"center",gap:"md",className:"min-w-[150px]",children:[e.jsx(he,{name:s.name,size:"xl"}),e.jsx(b,{variant:Ae(s.status),size:"lg",children:s.status}),s.isBetaUser&&e.jsxs(b,{variant:"info",className:"gap-1",children:[e.jsx(ye,{className:"h-3 w-3"}),"Beta User"]})]}),e.jsxs(a,{gap:"md",className:"flex-1",children:[e.jsxs(a,{gap:"xs",children:[e.jsx(r,{variant:"h2",children:s.name}),e.jsxs(t,{gap:"xs",align:"center",className:"text-neutral-500",children:[e.jsx(Ne,{className:"h-4 w-4"}),e.jsx(r,{variant:"body",children:s.email})]})]}),e.jsxs(A,{className:"grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t",children:[s.primaryCategory&&e.jsxs(a,{gap:"xs",children:[e.jsx(r,{variant:"label",className:"text-neutral-500",children:"Primary Category"}),e.jsx(r,{variant:"body",children:s.primaryCategory})]}),e.jsxs(a,{gap:"xs",children:[e.jsx(r,{variant:"label",className:"text-neutral-500",children:"Connection Slots"}),e.jsxs(t,{gap:"xs",align:"center",children:[e.jsx(Ue,{className:"h-4 w-4 text-neutral-400"}),e.jsxs(r,{variant:"body",children:[s.usedSlots||0," / ",s.connectionSlots||10," used"]})]})]}),s.createdAt&&e.jsxs(a,{gap:"xs",children:[e.jsx(r,{variant:"label",className:"text-neutral-500",children:"Member Since"}),e.jsxs(t,{gap:"xs",align:"center",children:[e.jsx(we,{className:"h-4 w-4 text-neutral-400"}),e.jsx(r,{variant:"body",children:new Date(s.createdAt).toLocaleDateString()})]})]}),s.lastActiveAt&&e.jsxs(a,{gap:"xs",children:[e.jsx(r,{variant:"label",className:"text-neutral-500",children:"Last Active"}),e.jsxs(t,{gap:"xs",align:"center",children:[e.jsx(B,{className:"h-4 w-4 text-neutral-400"}),e.jsx(r,{variant:"body",children:new Date(s.lastActiveAt).toLocaleDateString()})]})]}),s.inviteCode&&e.jsxs(a,{gap:"xs",children:[e.jsx(r,{variant:"label",className:"text-neutral-500",children:"Invite Code"}),e.jsx(r,{variant:"body",className:"font-mono",children:s.inviteCode})]})]})]})]})}),e.jsxs(A,{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsx(U,{className:"p-4",children:e.jsxs(a,{gap:"sm",children:[e.jsxs(t,{gap:"sm",align:"center",children:[e.jsx(Ie,{className:"h-5 w-5 text-blue-500"}),e.jsx(r,{variant:"h4",children:"Trust Score"})]}),s.trustScoreId?e.jsxs(r,{variant:"body",className:"text-neutral-500",children:["Score ID: ",s.trustScoreId]}):e.jsx(r,{variant:"body",className:"text-neutral-400",children:"No trust score calculated yet"}),e.jsx(l,{variant:"secondary",size:"sm",onClick:()=>i.emit("UI:VIEW_TRUST_SCORE",{userId:s.id}),children:"View Trust Details"})]})}),e.jsx(U,{className:"p-4",children:e.jsxs(a,{gap:"sm",children:[e.jsxs(t,{gap:"sm",align:"center",children:[e.jsx(B,{className:"h-5 w-5 text-emerald-500"}),e.jsx(r,{variant:"h4",children:"Assessment"})]}),s.assessmentId?e.jsxs(r,{variant:"body",className:"text-neutral-500",children:["Assessment ID: ",s.assessmentId]}):e.jsx(r,{variant:"body",className:"text-neutral-400",children:"No assessment completed yet"}),e.jsx(l,{variant:"secondary",size:"sm",onClick:()=>i.emit("UI:VIEW_ASSESSMENT",{userId:s.id}),children:"View Assessment"})]})})]})]}):e.jsx(a,{align:"center",justify:"center",className:c("py-12",o),children:e.jsx(r,{variant:"body",className:"text-neutral-500",children:"User not found"})})};w.displayName="UserProfileTemplate";w.__docgenInfo={description:"",methods:[],displayName:"UserProfileTemplate",props:{user:{required:!1,tsType:{name:"UserProfileData"},description:"User data to display"},data:{required:!1,tsType:{name:"UserProfileData"},description:"Data prop alias"},isLoading:{required:!1,tsType:{name:"boolean"},description:"Loading state",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"union",raw:"Error | null",elements:[{name:"Error"},{name:"null"}]},description:"Error state",defaultValue:{value:"null",computed:!1}},showBack:{required:!1,tsType:{name:"boolean"},description:"Show back button",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const n={id:"user-1",name:"Alex Thompson",email:"alex.thompson@example.com",status:"active",primaryCategory:"Technology",connectionSlots:150,usedSlots:45,isBetaUser:!0,inviteCode:"ALEX2024",createdAt:new Date(Date.now()-1e3*60*60*24*90).toISOString(),lastActiveAt:new Date(Date.now()-1e3*60*60*2).toISOString(),assessmentId:"assess-123",trustScoreId:"ts-456"},Qe={title:"Clients/Winning-11/Templates/UserProfileTemplate",component:w,parameters:{layout:"fullscreen"},tags:["autodocs"]},d={args:{user:n}},m={args:{user:{...n,status:"active"}}},u={args:{user:{...n,status:"pending",assessmentId:void 0,trustScoreId:void 0}}},p={args:{user:{...n,status:"suspended"}}},g={args:{user:{...n,isBetaUser:!0}}},x={args:{user:{...n,connectionSlots:150,usedSlots:145}}},h={args:{user:{...n,assessmentId:void 0,trustScoreId:void 0}}},j={args:{isLoading:!0}},f={args:{error:new Error("Failed to load user profile")}},S={args:{user:void 0}},v={args:{user:n,showBack:!1}},y={args:{data:n}};var k,C,T;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    user: mockUser
  }
}`,...(T=(C=d.parameters)==null?void 0:C.docs)==null?void 0:T.source}}};var E,D,P;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    user: {
      ...mockUser,
      status: "active"
    }
  }
}`,...(P=(D=m.parameters)==null?void 0:D.docs)==null?void 0:P.source}}};var L,V,q;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    user: {
      ...mockUser,
      status: "pending",
      assessmentId: undefined,
      trustScoreId: undefined
    }
  }
}`,...(q=(V=u.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};var _,O,z;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    user: {
      ...mockUser,
      status: "suspended"
    }
  }
}`,...(z=(O=p.parameters)==null?void 0:O.docs)==null?void 0:z.source}}};var F,H,M;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    user: {
      ...mockUser,
      isBetaUser: true
    }
  }
}`,...(M=(H=g.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};var R,W,K;x.parameters={...x.parameters,docs:{...(R=x.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    user: {
      ...mockUser,
      connectionSlots: 150,
      usedSlots: 145
    }
  }
}`,...(K=(W=x.parameters)==null?void 0:W.docs)==null?void 0:K.source}}};var X,G,J;h.parameters={...h.parameters,docs:{...(X=h.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    user: {
      ...mockUser,
      assessmentId: undefined,
      trustScoreId: undefined
    }
  }
}`,...(J=(G=h.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var Q,Y,Z;j.parameters={...j.parameters,docs:{...(Q=j.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    isLoading: true
  }
}`,...(Z=(Y=j.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,ee,se;f.parameters={...f.parameters,docs:{...($=f.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    error: new Error("Failed to load user profile")
  }
}`,...(se=(ee=f.parameters)==null?void 0:ee.docs)==null?void 0:se.source}}};var re,ae,te;S.parameters={...S.parameters,docs:{...(re=S.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    user: undefined
  }
}`,...(te=(ae=S.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};var ne,oe,ie;v.parameters={...v.parameters,docs:{...(ne=v.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    user: mockUser,
    showBack: false
  }
}`,...(ie=(oe=v.parameters)==null?void 0:oe.docs)==null?void 0:ie.source}}};var ce,le,de;y.parameters={...y.parameters,docs:{...(ce=y.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    data: mockUser
  }
}`,...(de=(le=y.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};const Ye=["Default","ActiveUser","PendingUser","SuspendedUser","BetaUser","HighConnectionUsage","NoAssessmentOrTrustScore","Loading","ErrorState","NotFound","NoBackButton","UsingDataProp"];export{m as ActiveUser,g as BetaUser,d as Default,f as ErrorState,x as HighConnectionUsage,j as Loading,h as NoAssessmentOrTrustScore,v as NoBackButton,S as NotFound,u as PendingUser,p as SuspendedUser,y as UsingDataProp,Ye as __namedExportsOrder,Qe as default};
