import{j as e}from"./jsx-runtime-CDt2p4po.js";import{c as g}from"./cn-BNf5BS2b.js";import{B as u}from"./Box-DYJzRMmP.js";import{V as r,H as t}from"./Stack-DhhoTPuC.js";import{T as s}from"./Typography-Wmkp-g7N.js";import{B as i}from"./Button-Dn0472P0.js";import{C as m}from"./Card-BNT5PrJ5.js";import{B as A}from"./Badge-CpH0PNM6.js";import{A as U}from"./Avatar-CJtPgGUU.js";import{S as ze}from"./Spinner-vF2DJrH5.js";import{u as Fe}from"./useEventBus-BNZMNlv8.js";import{A as Pe}from"./arrow-left-CMPuXvFr.js";import{U as l}from"./users-CV1mGUsS.js";import{S as _e}from"./square-pen-D7sL1yO_.js";import{S as qe}from"./settings-DBj1i3lR.js";import{T as O}from"./target-Dfqc9R93.js";import{U as $e}from"./user-plus-BlQDsowZ.js";import{C as M,U as We}from"./user-minus-BiKOst1L.js";import{S as R}from"./shield-CEa1K-yC.js";import{B as He}from"./bar-chart-3-CgbdUllU.js";import"./index-GiUgBvb1.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./user-BePscFH1.js";const Ge=c=>{switch(c){case"project":return"info";case"department":return"success";case"cross-functional":return"warning";case"temporary":return"neutral";default:return"neutral"}},Ke=c=>{switch(c){case"active":return"success";case"inactive":return"warning";case"archived":return"neutral";default:return"neutral"}},Je=c=>{switch(c){case"leader":return M;case"member":return l;case"observer":return l;default:return l}},E=({team:c,data:Ae,isLoading:Me=!1,error:B=null,showBack:Ee=!0,className:p})=>{var L;const d=Fe(),a=c||Ae,Be=()=>{d.emit("UI:BACK",{})},Le=()=>{a&&d.emit("UI:EDIT",{row:a,entity:"Team"})},Ue=()=>{a&&d.emit("UI:ADD_MEMBER",{teamId:a.id})},Oe=n=>{a&&d.emit("UI:REMOVE_MEMBER",{teamId:a.id,member:n})};if(Me)return e.jsxs(r,{align:"center",justify:"center",className:g("py-12",p),children:[e.jsx(ze,{size:"lg"}),e.jsx(s,{variant:"body",className:"text-neutral-500",children:"Loading team..."})]});if(B)return e.jsx(r,{align:"center",justify:"center",className:g("py-12",p),children:e.jsxs(s,{variant:"body",className:"text-red-500",children:["Error: ",B.message]})});if(!a)return e.jsx(r,{align:"center",justify:"center",className:g("py-12",p),children:e.jsx(s,{variant:"body",className:"text-neutral-500",children:"Team not found"})});const Re=a.maxMembers?`${a.memberCount}/${a.maxMembers}`:a.memberCount.toString();return e.jsxs(r,{gap:"lg",className:g("p-6",p),children:[e.jsxs(t,{justify:"between",align:"center",wrap:!0,children:[e.jsxs(t,{gap:"md",align:"center",children:[Ee&&e.jsxs(i,{variant:"ghost",onClick:Be,className:"gap-2",children:[e.jsx(Pe,{className:"h-4 w-4"}),"Back"]}),e.jsx(r,{gap:"xs",children:e.jsxs(t,{gap:"sm",align:"center",children:[e.jsx(u,{rounded:"lg",padding:"sm",className:"bg-purple-100",children:e.jsx(l,{className:"h-6 w-6 text-purple-600"})}),e.jsx(s,{variant:"h1",children:a.name})]})})]}),e.jsxs(t,{gap:"sm",children:[e.jsxs(i,{variant:"secondary",onClick:Le,className:"gap-2",children:[e.jsx(_e,{className:"h-4 w-4"}),"Edit"]}),e.jsxs(i,{variant:"secondary",className:"gap-2",children:[e.jsx(qe,{className:"h-4 w-4"}),"Settings"]})]})]}),e.jsxs(t,{gap:"md",wrap:!0,children:[e.jsx(A,{variant:Ke(a.status),size:"lg",children:a.status}),e.jsx(A,{variant:Ge(a.type),size:"lg",children:a.type}),e.jsxs(t,{gap:"xs",align:"center",children:[e.jsx(l,{className:"h-4 w-4 text-neutral-500"}),e.jsxs(s,{variant:"body",children:[Re," members"]})]}),(L=a.tags)==null?void 0:L.map(n=>e.jsx(A,{variant:"neutral",children:n},n))]}),e.jsxs(u,{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[e.jsxs(r,{gap:"md",className:"lg:col-span-2",children:[e.jsx(m,{className:"p-4",children:e.jsxs(r,{gap:"sm",children:[e.jsx(s,{variant:"h4",children:"About"}),e.jsx(s,{variant:"body",className:"text-neutral-600",children:a.description||"No description provided."})]})}),a.goals&&a.goals.length>0&&e.jsx(m,{className:"p-4",children:e.jsxs(r,{gap:"md",children:[e.jsx(s,{variant:"h4",children:"Team Goals"}),e.jsx(r,{gap:"sm",children:a.goals.map((n,Ve)=>e.jsxs(t,{gap:"sm",align:"start",children:[e.jsx(O,{className:"h-4 w-4 text-purple-500 mt-0.5"}),e.jsx(s,{variant:"body",children:n})]},Ve))})]})}),e.jsx(m,{className:"p-4",children:e.jsxs(r,{gap:"md",children:[e.jsxs(t,{justify:"between",align:"center",children:[e.jsx(s,{variant:"h4",children:"Team Members"}),e.jsxs(i,{variant:"primary",size:"sm",onClick:Ue,className:"gap-1",children:[e.jsx($e,{className:"h-3 w-3"}),"Add Member"]})]}),a.members&&a.members.length>0?e.jsx(r,{gap:"sm",children:a.members.map(n=>(Je(n.role),e.jsxs(t,{gap:"sm",align:"center",className:"p-2 rounded-lg hover:bg-neutral-50",children:[e.jsx(U,{name:n.userName||"User",size:"md"}),e.jsxs(r,{gap:"none",className:"flex-1",children:[e.jsxs(t,{gap:"sm",align:"center",children:[e.jsx(s,{variant:"body",className:"font-medium",children:n.userName||`User ${n.userId.slice(-4)}`}),n.role==="leader"&&e.jsx(M,{className:"h-4 w-4 text-amber-500"})]}),e.jsxs(s,{variant:"small",className:"text-neutral-500",children:[n.role," • Joined"," ",new Date(n.joinedAt).toLocaleDateString()]})]}),n.trustScore!==void 0&&e.jsxs(t,{gap:"xs",align:"center",children:[e.jsx(R,{className:"h-3 w-3 text-blue-500"}),e.jsx(s,{variant:"small",className:"font-medium",children:n.trustScore})]}),n.role!=="leader"&&e.jsx(i,{variant:"ghost",size:"sm",onClick:()=>Oe(n),className:"text-red-500 hover:text-red-600",children:e.jsx(We,{className:"h-4 w-4"})})]},n.id)))}):e.jsxs(r,{align:"center",className:"py-8",children:[e.jsx(l,{className:"h-8 w-8 text-neutral-300"}),e.jsx(s,{variant:"body",className:"text-neutral-400",children:"No members yet"})]})]})})]}),e.jsxs(r,{gap:"md",children:[e.jsx(m,{className:"p-4",children:e.jsxs(r,{gap:"md",children:[e.jsx(s,{variant:"h4",children:"Team Metrics"}),a.averageTrustScore!==void 0&&e.jsxs(r,{gap:"xs",children:[e.jsxs(t,{justify:"between",align:"center",children:[e.jsxs(t,{gap:"sm",align:"center",children:[e.jsx(R,{className:"h-4 w-4 text-blue-500"}),e.jsx(s,{variant:"small",className:"text-neutral-500",children:"Average Trust Score"})]}),e.jsx(s,{variant:"h3",className:"text-blue-600",children:a.averageTrustScore})]}),e.jsx(u,{className:"w-full bg-neutral-200 rounded-full h-2",children:e.jsx(u,{className:"bg-blue-500 rounded-full h-2",style:{width:`${a.averageTrustScore}%`}})})]}),a.cohesionScore!==void 0&&e.jsxs(r,{gap:"xs",children:[e.jsxs(t,{justify:"between",align:"center",children:[e.jsxs(t,{gap:"sm",align:"center",children:[e.jsx(O,{className:"h-4 w-4 text-emerald-500"}),e.jsx(s,{variant:"small",className:"text-neutral-500",children:"Cohesion Score"})]}),e.jsxs(s,{variant:"h3",className:"text-emerald-600",children:[a.cohesionScore,"%"]})]}),e.jsx(u,{className:"w-full bg-neutral-200 rounded-full h-2",children:e.jsx(u,{className:"bg-emerald-500 rounded-full h-2",style:{width:`${a.cohesionScore}%`}})})]})]})}),e.jsx(m,{className:"p-4",children:e.jsxs(r,{gap:"sm",children:[e.jsx(s,{variant:"h4",children:"Team Leader"}),e.jsxs(t,{gap:"sm",align:"center",children:[e.jsx(U,{name:a.leaderName||"Leader",size:"md"}),e.jsxs(r,{gap:"none",children:[e.jsx(s,{variant:"body",className:"font-medium",children:a.leaderName||`User ${a.leaderId.slice(-4)}`}),e.jsxs(t,{gap:"xs",align:"center",children:[e.jsx(M,{className:"h-3 w-3 text-amber-500"}),e.jsx(s,{variant:"small",className:"text-neutral-500",children:"Team Leader"})]})]})]})]})}),e.jsx(m,{className:"p-4",children:e.jsxs(r,{gap:"md",children:[e.jsx(s,{variant:"h4",children:"Details"}),e.jsxs(r,{gap:"sm",children:[e.jsxs(t,{justify:"between",children:[e.jsx(s,{variant:"small",className:"text-neutral-500",children:"Created"}),e.jsx(s,{variant:"small",children:new Date(a.createdAt).toLocaleDateString()})]}),a.updatedAt&&e.jsxs(t,{justify:"between",children:[e.jsx(s,{variant:"small",className:"text-neutral-500",children:"Last Updated"}),e.jsx(s,{variant:"small",children:new Date(a.updatedAt).toLocaleDateString()})]}),a.maxMembers&&e.jsxs(t,{justify:"between",children:[e.jsx(s,{variant:"small",className:"text-neutral-500",children:"Max Members"}),e.jsx(s,{variant:"small",children:a.maxMembers})]})]})]})}),e.jsx(m,{className:"p-4",children:e.jsxs(r,{gap:"sm",children:[e.jsx(s,{variant:"h4",children:"Quick Actions"}),e.jsxs(i,{variant:"secondary",className:"w-full gap-2 justify-start",onClick:()=>d.emit("UI:VIEW_ANALYTICS",{teamId:a.id}),children:[e.jsx(He,{className:"h-4 w-4"}),"View Analytics"]}),e.jsxs(i,{variant:"secondary",className:"w-full gap-2 justify-start",onClick:()=>d.emit("UI:VIEW_MEMBERS",{teamId:a.id}),children:[e.jsx(l,{className:"h-4 w-4"}),"Manage Members"]})]})})]})]})]})};E.displayName="TeamDetailTemplate";E.__docgenInfo={description:"",methods:[],displayName:"TeamDetailTemplate",props:{team:{required:!1,tsType:{name:"TeamDetailData"},description:"Team data to display"},data:{required:!1,tsType:{name:"TeamDetailData"},description:"Data prop alias"},isLoading:{required:!1,tsType:{name:"boolean"},description:"Loading state",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"union",raw:"Error | null",elements:[{name:"Error"},{name:"null"}]},description:"Error state",defaultValue:{value:"null",computed:!1}},showBack:{required:!1,tsType:{name:"boolean"},description:"Show back button",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const o={id:"team-1",name:"Core Platform",description:"Responsible for the core trust scoring algorithm and platform infrastructure. This team maintains the heart of the Winning-11 platform, ensuring reliability, accuracy, and scalability.",type:"department",status:"active",leaderId:"user-1",leaderName:"Alex Thompson",memberCount:8,maxMembers:12,averageTrustScore:85,cohesionScore:88,createdAt:new Date(Date.now()-1e3*60*60*24*180).toISOString(),updatedAt:new Date(Date.now()-1e3*60*60*24*2).toISOString(),tags:["Engineering","Core","Infrastructure"],goals:["Maintain 99.9% platform uptime","Improve trust score calculation speed by 50%","Reduce false positive rate in fraud detection","Implement real-time score updates"],members:[{id:"tm-1",userId:"user-1",userName:"Alex Thompson",role:"leader",trustScore:92,joinedAt:new Date(Date.now()-1e3*60*60*24*180).toISOString()},{id:"tm-2",userId:"user-2",userName:"Sarah Chen",role:"member",trustScore:88,joinedAt:new Date(Date.now()-1e3*60*60*24*150).toISOString()},{id:"tm-3",userId:"user-3",userName:"Mike Rodriguez",role:"member",trustScore:85,joinedAt:new Date(Date.now()-1e3*60*60*24*120).toISOString()},{id:"tm-4",userId:"user-4",userName:"Emily Watson",role:"member",trustScore:82,joinedAt:new Date(Date.now()-1e3*60*60*24*90).toISOString()},{id:"tm-5",userId:"user-5",userName:"David Kim",role:"member",trustScore:86,joinedAt:new Date(Date.now()-1e3*60*60*24*60).toISOString()},{id:"tm-6",userId:"user-6",userName:"Lisa Park",role:"observer",trustScore:79,joinedAt:new Date(Date.now()-1e3*60*60*24*30).toISOString()}]},Na={title:"Clients/Winning-11/Templates/TeamDetailTemplate",component:E,parameters:{layout:"fullscreen"},tags:["autodocs"]},h={args:{team:o}},x={args:{team:{...o,type:"project",name:"Mobile App Launch"}}},j={args:{team:{...o,type:"cross-functional",name:"Enterprise Solutions"}}},f={args:{team:{...o,type:"temporary",name:"Security Task Force",maxMembers:5,memberCount:4}}},S={args:{team:{...o,status:"inactive"}}},N={args:{team:{...o,cohesionScore:95,averageTrustScore:91}}},v={args:{team:{...o,cohesionScore:45,averageTrustScore:62}}},b={args:{team:{...o,goals:void 0}}},T={args:{team:{...o,members:void 0,memberCount:0}}};var V;const y={args:{team:{...o,members:(V=o.members)==null?void 0:V.slice(0,2),memberCount:2}}},w={args:{isLoading:!0}},D={args:{error:new Error("Failed to load team details")}},C={args:{team:void 0}},I={args:{team:o,showBack:!1}},k={args:{data:o}};var z,F,P;h.parameters={...h.parameters,docs:{...(z=h.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    team: mockTeam
  }
}`,...(P=(F=h.parameters)==null?void 0:F.docs)==null?void 0:P.source}}};var _,q,$;x.parameters={...x.parameters,docs:{...(_=x.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    team: {
      ...mockTeam,
      type: "project",
      name: "Mobile App Launch"
    }
  }
}`,...($=(q=x.parameters)==null?void 0:q.docs)==null?void 0:$.source}}};var W,H,G;j.parameters={...j.parameters,docs:{...(W=j.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    team: {
      ...mockTeam,
      type: "cross-functional",
      name: "Enterprise Solutions"
    }
  }
}`,...(G=(H=j.parameters)==null?void 0:H.docs)==null?void 0:G.source}}};var K,J,Q;f.parameters={...f.parameters,docs:{...(K=f.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    team: {
      ...mockTeam,
      type: "temporary",
      name: "Security Task Force",
      maxMembers: 5,
      memberCount: 4
    }
  }
}`,...(Q=(J=f.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var Y,X,Z;S.parameters={...S.parameters,docs:{...(Y=S.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    team: {
      ...mockTeam,
      status: "inactive"
    }
  }
}`,...(Z=(X=S.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,ae,se;N.parameters={...N.parameters,docs:{...(ee=N.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    team: {
      ...mockTeam,
      cohesionScore: 95,
      averageTrustScore: 91
    }
  }
}`,...(se=(ae=N.parameters)==null?void 0:ae.docs)==null?void 0:se.source}}};var re,te,ne;v.parameters={...v.parameters,docs:{...(re=v.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    team: {
      ...mockTeam,
      cohesionScore: 45,
      averageTrustScore: 62
    }
  }
}`,...(ne=(te=v.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var oe,ce,ie;b.parameters={...b.parameters,docs:{...(oe=b.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    team: {
      ...mockTeam,
      goals: undefined
    }
  }
}`,...(ie=(ce=b.parameters)==null?void 0:ce.docs)==null?void 0:ie.source}}};var me,le,de;T.parameters={...T.parameters,docs:{...(me=T.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    team: {
      ...mockTeam,
      members: undefined,
      memberCount: 0
    }
  }
}`,...(de=(le=T.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};var ue,pe,ge;y.parameters={...y.parameters,docs:{...(ue=y.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    team: {
      ...mockTeam,
      members: mockTeam.members?.slice(0, 2),
      memberCount: 2
    }
  }
}`,...(ge=(pe=y.parameters)==null?void 0:pe.docs)==null?void 0:ge.source}}};var he,xe,je;w.parameters={...w.parameters,docs:{...(he=w.parameters)==null?void 0:he.docs,source:{originalSource:`{
  args: {
    isLoading: true
  }
}`,...(je=(xe=w.parameters)==null?void 0:xe.docs)==null?void 0:je.source}}};var fe,Se,Ne;D.parameters={...D.parameters,docs:{...(fe=D.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    error: new Error("Failed to load team details")
  }
}`,...(Ne=(Se=D.parameters)==null?void 0:Se.docs)==null?void 0:Ne.source}}};var ve,be,Te;C.parameters={...C.parameters,docs:{...(ve=C.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    team: undefined
  }
}`,...(Te=(be=C.parameters)==null?void 0:be.docs)==null?void 0:Te.source}}};var ye,we,De;I.parameters={...I.parameters,docs:{...(ye=I.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  args: {
    team: mockTeam,
    showBack: false
  }
}`,...(De=(we=I.parameters)==null?void 0:we.docs)==null?void 0:De.source}}};var Ce,Ie,ke;k.parameters={...k.parameters,docs:{...(Ce=k.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  args: {
    data: mockTeam
  }
}`,...(ke=(Ie=k.parameters)==null?void 0:Ie.docs)==null?void 0:ke.source}}};const va=["Default","ProjectTeam","CrossFunctionalTeam","TemporaryTeam","InactiveTeam","HighCohesion","LowCohesion","NoGoals","NoMembers","SmallTeam","Loading","ErrorState","NotFound","NoBackButton","UsingDataProp"];export{j as CrossFunctionalTeam,h as Default,D as ErrorState,N as HighCohesion,S as InactiveTeam,w as Loading,v as LowCohesion,I as NoBackButton,b as NoGoals,T as NoMembers,C as NotFound,x as ProjectTeam,y as SmallTeam,f as TemporaryTeam,k as UsingDataProp,va as __namedExportsOrder,Na as default};
