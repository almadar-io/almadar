import{j as e}from"./jsx-runtime-CDt2p4po.js";import{c}from"./cn-BNf5BS2b.js";import{B as p}from"./Box-DYJzRMmP.js";import{V as t,H as n}from"./Stack-DhhoTPuC.js";import{T as r}from"./Typography-Wmkp-g7N.js";import{B as m}from"./Button-Dn0472P0.js";import{C as l}from"./Card-BNT5PrJ5.js";import{B as g}from"./Badge-CpH0PNM6.js";import{A as Te}from"./Avatar-CJtPgGUU.js";import{S as Ee}from"./Spinner-vF2DJrH5.js";import{u as Be}from"./useEventBus-BNZMNlv8.js";import{A as Le}from"./arrow-left-CMPuXvFr.js";import{F as ve}from"./folder-kanban-ByPEPdGw.js";import{S as Oe}from"./square-pen-D7sL1yO_.js";import{S as Me}from"./settings-DBj1i3lR.js";import{C as Se}from"./check-circle-DX_bNA1C.js";import{T as Ue}from"./target-Dfqc9R93.js";import{U as Ve}from"./user-plus-BlQDsowZ.js";import{U as B}from"./users-CV1mGUsS.js";import{B as qe}from"./bar-chart-3-CgbdUllU.js";import{C as L}from"./clock-DT9ve7xf.js";import{P as _e}from"./pause-circle-CcmpY60R.js";import{P as ze}from"./play-circle-CWtX3MJx.js";import"./index-GiUgBvb1.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./user-BePscFH1.js";const Fe=i=>{switch(i){case"active":return{color:"success",icon:ze,label:"Active"};case"planning":return{color:"info",icon:L,label:"Planning"};case"paused":return{color:"warning",icon:_e,label:"Paused"};case"completed":return{color:"success",icon:Se,label:"Completed"};case"archived":return{color:"neutral",icon:ve,label:"Archived"};default:return{color:"neutral",icon:L,label:i}}},Re=i=>{switch(i){case"critical":return"error";case"high":return"warning";case"medium":return"info";case"low":return"neutral";default:return"neutral"}},C=({project:i,data:ye,isLoading:be=!1,error:T=null,showBack:Pe=!0,className:u})=>{var E;const d=Be(),a=i||ye,Ie=()=>{d.emit("UI:BACK",{})},ke=()=>{a&&d.emit("UI:EDIT",{row:a,entity:"Project"})},Ae=()=>{a&&d.emit("UI:ADD_MEMBER",{projectId:a.id})};if(be)return e.jsxs(t,{align:"center",justify:"center",className:c("py-12",u),children:[e.jsx(Ee,{size:"lg"}),e.jsx(r,{variant:"body",className:"text-neutral-500",children:"Loading project..."})]});if(T)return e.jsx(t,{align:"center",justify:"center",className:c("py-12",u),children:e.jsxs(r,{variant:"body",className:"text-red-500",children:["Error: ",T.message]})});if(!a)return e.jsx(t,{align:"center",justify:"center",className:c("py-12",u),children:e.jsx(r,{variant:"body",className:"text-neutral-500",children:"Project not found"})});const k=Fe(a.status),Ce=k.icon;return e.jsxs(t,{gap:"lg",className:c("p-6",u),children:[e.jsxs(n,{justify:"between",align:"center",wrap:!0,children:[e.jsxs(n,{gap:"md",align:"center",children:[Pe&&e.jsxs(m,{variant:"ghost",onClick:Ie,className:"gap-2",children:[e.jsx(Le,{className:"h-4 w-4"}),"Back"]}),e.jsx(t,{gap:"xs",children:e.jsxs(n,{gap:"sm",align:"center",children:[e.jsx(p,{rounded:"lg",padding:"sm",className:"bg-blue-100",children:e.jsx(ve,{className:"h-6 w-6 text-blue-600"})}),e.jsx(r,{variant:"h1",children:a.name})]})})]}),e.jsxs(n,{gap:"sm",children:[e.jsxs(m,{variant:"secondary",onClick:ke,className:"gap-2",children:[e.jsx(Oe,{className:"h-4 w-4"}),"Edit"]}),e.jsxs(m,{variant:"secondary",className:"gap-2",children:[e.jsx(Me,{className:"h-4 w-4"}),"Settings"]})]})]}),e.jsxs(n,{gap:"md",wrap:!0,children:[e.jsxs(g,{variant:k.color,size:"lg",className:"gap-1",children:[e.jsx(Ce,{className:"h-4 w-4"}),k.label]}),a.priority&&e.jsxs(g,{variant:Re(a.priority),size:"lg",children:[a.priority," priority"]}),(E=a.tags)==null?void 0:E.map(s=>e.jsx(g,{variant:"neutral",children:s},s))]}),e.jsxs(p,{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[e.jsxs(t,{gap:"md",className:"lg:col-span-2",children:[e.jsx(l,{className:"p-4",children:e.jsxs(t,{gap:"sm",children:[e.jsx(r,{variant:"h4",children:"Description"}),e.jsx(r,{variant:"body",className:"text-neutral-600",children:a.description||"No description provided."})]})}),a.progress!==void 0&&e.jsx(l,{className:"p-4",children:e.jsxs(t,{gap:"sm",children:[e.jsxs(n,{justify:"between",align:"center",children:[e.jsx(r,{variant:"h4",children:"Progress"}),e.jsxs(r,{variant:"h3",className:"text-blue-600",children:[a.progress,"%"]})]}),e.jsx(p,{className:"w-full bg-neutral-200 rounded-full h-3",children:e.jsx(p,{className:c("rounded-full h-3 transition-all",a.progress>=80?"bg-emerald-500":a.progress>=50?"bg-blue-500":"bg-amber-500"),style:{width:`${a.progress}%`}})})]})}),a.milestones&&a.milestones.length>0&&e.jsx(l,{className:"p-4",children:e.jsxs(t,{gap:"md",children:[e.jsxs(n,{justify:"between",align:"center",children:[e.jsx(r,{variant:"h4",children:"Milestones"}),e.jsxs(g,{variant:"info",children:[a.milestones.filter(s=>s.completed).length,"/",a.milestones.length]})]}),e.jsx(t,{gap:"sm",children:a.milestones.map((s,A)=>e.jsxs(n,{gap:"sm",align:"center",className:"p-2 rounded-lg hover:bg-neutral-50",children:[e.jsx(p,{className:c("w-5 h-5 rounded-full flex items-center justify-center",s.completed?"bg-emerald-100":"bg-neutral-100"),children:s.completed&&e.jsx(Se,{className:"h-3 w-3 text-emerald-600"})}),e.jsx(r,{variant:"body",className:c(s.completed&&"line-through text-neutral-400"),children:s.name}),s.dueDate&&e.jsx(r,{variant:"small",className:"text-neutral-400 ml-auto",children:new Date(s.dueDate).toLocaleDateString()})]},A))})]})}),a.goals&&a.goals.length>0&&e.jsx(l,{className:"p-4",children:e.jsxs(t,{gap:"md",children:[e.jsx(r,{variant:"h4",children:"Goals"}),e.jsx(t,{gap:"sm",children:a.goals.map((s,A)=>e.jsxs(n,{gap:"sm",align:"start",children:[e.jsx(Ue,{className:"h-4 w-4 text-blue-500 mt-0.5"}),e.jsx(r,{variant:"body",children:s})]},A))})]})})]}),e.jsxs(t,{gap:"md",children:[e.jsx(l,{className:"p-4",children:e.jsxs(t,{gap:"md",children:[e.jsxs(n,{justify:"between",align:"center",children:[e.jsx(r,{variant:"h4",children:"Team"}),e.jsxs(m,{variant:"ghost",size:"sm",onClick:Ae,className:"gap-1",children:[e.jsx(Ve,{className:"h-3 w-3"}),"Add"]})]}),a.teamName&&e.jsxs(n,{gap:"sm",align:"center",className:"text-neutral-600",children:[e.jsx(B,{className:"h-4 w-4"}),e.jsx(r,{variant:"body",children:a.teamName})]}),a.members&&a.members.length>0?e.jsxs(t,{gap:"sm",children:[a.members.slice(0,5).map(s=>e.jsxs(n,{gap:"sm",align:"center",children:[e.jsx(Te,{name:s.userName||"User",size:"sm"}),e.jsxs(t,{gap:"none",className:"flex-1",children:[e.jsx(r,{variant:"small",className:"font-medium",children:s.userName||`User ${s.userId.slice(-4)}`}),e.jsx(r,{variant:"small",className:"text-neutral-400",children:s.role})]})]},s.id)),a.members.length>5&&e.jsxs(r,{variant:"small",className:"text-neutral-500",children:["+",a.members.length-5," more"]})]}):e.jsx(r,{variant:"small",className:"text-neutral-400",children:"No team members yet"})]})}),e.jsx(l,{className:"p-4",children:e.jsxs(t,{gap:"md",children:[e.jsx(r,{variant:"h4",children:"Details"}),e.jsxs(t,{gap:"sm",children:[e.jsxs(n,{justify:"between",children:[e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Owner"}),e.jsx(r,{variant:"small",children:a.ownerName||`User ${a.ownerId.slice(-4)}`})]}),a.startDate&&e.jsxs(n,{justify:"between",children:[e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Start Date"}),e.jsx(r,{variant:"small",children:new Date(a.startDate).toLocaleDateString()})]}),a.endDate&&e.jsxs(n,{justify:"between",children:[e.jsx(r,{variant:"small",className:"text-neutral-500",children:"End Date"}),e.jsx(r,{variant:"small",children:new Date(a.endDate).toLocaleDateString()})]}),e.jsxs(n,{justify:"between",children:[e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Created"}),e.jsx(r,{variant:"small",children:new Date(a.createdAt).toLocaleDateString()})]}),a.updatedAt&&e.jsxs(n,{justify:"between",children:[e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Last Updated"}),e.jsx(r,{variant:"small",children:new Date(a.updatedAt).toLocaleDateString()})]})]})]})}),e.jsx(l,{className:"p-4",children:e.jsxs(t,{gap:"sm",children:[e.jsx(r,{variant:"h4",children:"Quick Actions"}),e.jsxs(m,{variant:"secondary",className:"w-full gap-2 justify-start",onClick:()=>d.emit("UI:VIEW_ANALYTICS",{projectId:a.id}),children:[e.jsx(qe,{className:"h-4 w-4"}),"View Analytics"]}),e.jsxs(m,{variant:"secondary",className:"w-full gap-2 justify-start",onClick:()=>d.emit("UI:VIEW_TEAM",{teamId:a.teamId}),children:[e.jsx(B,{className:"h-4 w-4"}),"Manage Team"]})]})})]})]})]})};C.displayName="ProjectDetailTemplate";C.__docgenInfo={description:"",methods:[],displayName:"ProjectDetailTemplate",props:{project:{required:!1,tsType:{name:"ProjectDetailData"},description:"Project data to display"},data:{required:!1,tsType:{name:"ProjectDetailData"},description:"Data prop alias"},isLoading:{required:!1,tsType:{name:"boolean"},description:"Loading state",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"union",raw:"Error | null",elements:[{name:"Error"},{name:"null"}]},description:"Error state",defaultValue:{value:"null",computed:!1}},showBack:{required:!1,tsType:{name:"boolean"},description:"Show back button",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const o={id:"proj-1",name:"Trust Network v2.0",description:"Major upgrade to the trust scoring algorithm with improved accuracy and bias detection. This project involves retraining our ML models with expanded datasets and implementing new fairness constraints.",status:"active",priority:"high",ownerId:"user-1",ownerName:"Alex Thompson",teamId:"team-1",teamName:"Core Platform",memberCount:8,progress:65,startDate:new Date(Date.now()-1e3*60*60*24*30).toISOString(),endDate:new Date(Date.now()+1e3*60*60*24*60).toISOString(),createdAt:new Date(Date.now()-1e3*60*60*24*45).toISOString(),updatedAt:new Date(Date.now()-1e3*60*60*2).toISOString(),tags:["AI/ML","Algorithm","Core"],goals:["Improve trust score accuracy by 15%","Reduce bias in scoring across demographics","Implement real-time score updates","Add explainability features for score breakdowns"],milestones:[{name:"Data collection and preprocessing",completed:!0,dueDate:new Date(Date.now()-1e3*60*60*24*20).toISOString()},{name:"Model architecture design",completed:!0,dueDate:new Date(Date.now()-1e3*60*60*24*10).toISOString()},{name:"Training pipeline setup",completed:!0,dueDate:new Date(Date.now()-1e3*60*60*24*5).toISOString()},{name:"Model training and validation",completed:!1,dueDate:new Date(Date.now()+1e3*60*60*24*10).toISOString()},{name:"A/B testing",completed:!1,dueDate:new Date(Date.now()+1e3*60*60*24*30).toISOString()},{name:"Production rollout",completed:!1,dueDate:new Date(Date.now()+1e3*60*60*24*50).toISOString()}],members:[{id:"pm-1",userId:"user-1",userName:"Alex Thompson",role:"Project Lead",joinedAt:new Date(Date.now()-1e3*60*60*24*45).toISOString()},{id:"pm-2",userId:"user-2",userName:"Sarah Chen",role:"ML Engineer",joinedAt:new Date(Date.now()-1e3*60*60*24*40).toISOString()},{id:"pm-3",userId:"user-3",userName:"Mike Rodriguez",role:"Data Engineer",joinedAt:new Date(Date.now()-1e3*60*60*24*40).toISOString()},{id:"pm-4",userId:"user-4",userName:"Emily Watson",role:"QA Lead",joinedAt:new Date(Date.now()-1e3*60*60*24*30).toISOString()},{id:"pm-5",userId:"user-5",userName:"David Kim",role:"DevOps",joinedAt:new Date(Date.now()-1e3*60*60*24*30).toISOString()}]},xa={title:"Clients/Winning-11/Templates/ProjectDetailTemplate",component:C,parameters:{layout:"fullscreen"},tags:["autodocs"]},j={args:{project:o}};var O;const h={args:{project:{...o,status:"completed",progress:100,milestones:(O=o.milestones)==null?void 0:O.map(i=>({...i,completed:!0}))}}};var M;const x={args:{project:{...o,status:"planning",progress:0,milestones:(M=o.milestones)==null?void 0:M.map(i=>({...i,completed:!1}))}}},f={args:{project:{...o,status:"paused",progress:35}}},w={args:{project:{...o,priority:"critical"}}},N={args:{project:{...o,milestones:void 0}}},D={args:{project:{...o,goals:void 0}}},v={args:{project:{...o,members:void 0}}},S={args:{isLoading:!0}},y={args:{error:new Error("Failed to load project details")}},b={args:{project:void 0}},P={args:{project:o,showBack:!1}},I={args:{data:o}};var U,V,q;j.parameters={...j.parameters,docs:{...(U=j.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    project: mockProject
  }
}`,...(q=(V=j.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};var _,z,F;h.parameters={...h.parameters,docs:{...(_=h.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    project: {
      ...mockProject,
      status: "completed",
      progress: 100,
      milestones: mockProject.milestones?.map(m => ({
        ...m,
        completed: true
      }))
    }
  }
}`,...(F=(z=h.parameters)==null?void 0:z.docs)==null?void 0:F.source}}};var R,W,G;x.parameters={...x.parameters,docs:{...(R=x.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    project: {
      ...mockProject,
      status: "planning",
      progress: 0,
      milestones: mockProject.milestones?.map(m => ({
        ...m,
        completed: false
      }))
    }
  }
}`,...(G=(W=x.parameters)==null?void 0:W.docs)==null?void 0:G.source}}};var K,$,H;f.parameters={...f.parameters,docs:{...(K=f.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    project: {
      ...mockProject,
      status: "paused",
      progress: 35
    }
  }
}`,...(H=($=f.parameters)==null?void 0:$.docs)==null?void 0:H.source}}};var Q,Y,J;w.parameters={...w.parameters,docs:{...(Q=w.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    project: {
      ...mockProject,
      priority: "critical"
    }
  }
}`,...(J=(Y=w.parameters)==null?void 0:Y.docs)==null?void 0:J.source}}};var X,Z,ee;N.parameters={...N.parameters,docs:{...(X=N.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    project: {
      ...mockProject,
      milestones: undefined
    }
  }
}`,...(ee=(Z=N.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var ae,re,se;D.parameters={...D.parameters,docs:{...(ae=D.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    project: {
      ...mockProject,
      goals: undefined
    }
  }
}`,...(se=(re=D.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var te,ne,oe;v.parameters={...v.parameters,docs:{...(te=v.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    project: {
      ...mockProject,
      members: undefined
    }
  }
}`,...(oe=(ne=v.parameters)==null?void 0:ne.docs)==null?void 0:oe.source}}};var ie,ce,le;S.parameters={...S.parameters,docs:{...(ie=S.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    isLoading: true
  }
}`,...(le=(ce=S.parameters)==null?void 0:ce.docs)==null?void 0:le.source}}};var me,de,pe;y.parameters={...y.parameters,docs:{...(me=y.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    error: new Error("Failed to load project details")
  }
}`,...(pe=(de=y.parameters)==null?void 0:de.docs)==null?void 0:pe.source}}};var ue,ge,je;b.parameters={...b.parameters,docs:{...(ue=b.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    project: undefined
  }
}`,...(je=(ge=b.parameters)==null?void 0:ge.docs)==null?void 0:je.source}}};var he,xe,fe;P.parameters={...P.parameters,docs:{...(he=P.parameters)==null?void 0:he.docs,source:{originalSource:`{
  args: {
    project: mockProject,
    showBack: false
  }
}`,...(fe=(xe=P.parameters)==null?void 0:xe.docs)==null?void 0:fe.source}}};var we,Ne,De;I.parameters={...I.parameters,docs:{...(we=I.parameters)==null?void 0:we.docs,source:{originalSource:`{
  args: {
    data: mockProject
  }
}`,...(De=(Ne=I.parameters)==null?void 0:Ne.docs)==null?void 0:De.source}}};const fa=["Default","CompletedProject","PlanningPhase","PausedProject","CriticalPriority","NoMilestones","NoGoals","NoMembers","Loading","ErrorState","NotFound","NoBackButton","UsingDataProp"];export{h as CompletedProject,w as CriticalPriority,j as Default,y as ErrorState,S as Loading,P as NoBackButton,D as NoGoals,v as NoMembers,N as NoMilestones,b as NotFound,f as PausedProject,x as PlanningPhase,I as UsingDataProp,fa as __namedExportsOrder,xa as default};
