import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as m}from"./index-GiUgBvb1.js";import{c as u}from"./cn-BNf5BS2b.js";import{B as L}from"./Box-DYJzRMmP.js";import{V as t,H as s}from"./Stack-DhhoTPuC.js";import{T as r}from"./Typography-Wmkp-g7N.js";import{B as d}from"./Button-Dn0472P0.js";import{C as l}from"./Card-BNT5PrJ5.js";import{B as ve}from"./Badge-CpH0PNM6.js";import{S as we}from"./Spinner-vF2DJrH5.js";import{u as De}from"./useEventBus-BNZMNlv8.js";import{C as Ne}from"./CreditMeter-CRtBFWe-.js";import{P as Se}from"./ProgressChart-BgFKRv5z.js";import{U as I}from"./user-BePscFH1.js";import{A as Te}from"./arrow-left-CMPuXvFr.js";import{D as C}from"./dumbbell-GoIYbK-o.js";import{G as ye}from"./graduation-cap-CC0dMjgV.js";import{M as be}from"./mail-CI1Ybt8r.js";import{P as Ce}from"./phone-XSC4O3No.js";import{S as ke}from"./square-pen-D7sL1yO_.js";import{T as Ee}from"./trash-2-ChlfdFMf.js";import{C as B}from"./calendar-rGtwHcH_.js";import{A as Ae}from"./activity-DUdIMRW5.js";import{T as We}from"./trending-up-D7By3kN5.js";import{A as Pe}from"./award-DIurtA9C.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./alert-triangle-BLuUOBNm.js";import"./clock-DT9ve7xf.js";import"./trending-down-Dv2LyMoL.js";import"./minus-CvoF9liV.js";const Le=a=>a?new Date(a).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"}):"",k=({data:a,stats:i,creditData:W,progressData:b,isLoading:pe=!1,error:P=null,entity:o="User",className:x})=>{const n=De(),xe=m.useCallback(()=>{n.emit("UI:BACK",{entity:o})},[n,o]),ue=m.useCallback(()=>{n.emit("UI:EDIT",{row:a,entity:o})},[n,a,o]),he=m.useCallback(()=>{n.emit("UI:DELETE",{row:a,entity:o})},[n,a,o]),ge=m.useCallback(()=>{n.emit("UI:VIEW_LIFTS",{traineeId:a==null?void 0:a.id,entity:"Lift"})},[n,a]),je=m.useCallback(()=>{n.emit("UI:VIEW_SESSIONS",{traineeId:a==null?void 0:a.id,entity:"TrainingSession"})},[n,a]);if(pe)return e.jsxs(t,{align:"center",justify:"center",className:u("p-6 min-h-[400px]",x),children:[e.jsx(we,{size:"lg"}),e.jsx(r,{variant:"body",className:"text-neutral-500",children:"Loading trainee details..."})]});if(P)return e.jsx(t,{align:"center",justify:"center",className:u("p-6 min-h-[400px]",x),children:e.jsxs(r,{variant:"body",className:"text-red-500",children:["Error: ",P.message]})});if(!a)return e.jsxs(t,{align:"center",justify:"center",className:u("p-6 min-h-[400px]",x),children:[e.jsx(I,{className:"h-12 w-12 text-neutral-300"}),e.jsx(r,{variant:"h3",className:"text-neutral-500",children:"Trainee not found"})]});const c=a.role==="trainee",fe=c?C:ye;return e.jsxs(t,{gap:"lg",className:u("p-6",x),children:[e.jsxs(s,{justify:"between",align:"start",wrap:!0,children:[e.jsxs(s,{gap:"md",align:"center",children:[e.jsx(d,{variant:"ghost",size:"sm",onClick:xe,children:e.jsx(Te,{className:"h-4 w-4"})}),e.jsx(L,{display:"flex",rounded:"full",className:"items-center justify-center h-16 w-16 bg-neutral-100",children:a.profileImage?e.jsx("img",{src:a.profileImage,alt:a.name,className:"h-16 w-16 rounded-full object-cover"}):e.jsx(I,{className:"h-8 w-8 text-neutral-400"})}),e.jsxs(t,{gap:"xs",children:[e.jsxs(s,{gap:"sm",align:"center",children:[e.jsx(r,{variant:"h1",children:a.name}),e.jsxs(ve,{className:c?"bg-green-100 text-green-700":"bg-blue-100 text-blue-700",children:[e.jsx(fe,{className:"h-3 w-3 mr-1"}),a.role]})]}),e.jsxs(s,{gap:"md",align:"center",className:"text-neutral-500",children:[e.jsxs(s,{gap:"xs",align:"center",children:[e.jsx(be,{className:"h-4 w-4"}),e.jsx(r,{variant:"body",children:a.email})]}),a.phone&&e.jsxs(s,{gap:"xs",align:"center",children:[e.jsx(Ce,{className:"h-4 w-4"}),e.jsx(r,{variant:"body",children:a.phone})]})]})]})]}),e.jsxs(s,{gap:"sm",children:[e.jsxs(d,{variant:"secondary",onClick:ue,children:[e.jsx(ke,{className:"h-4 w-4 mr-1"}),"Edit"]}),e.jsxs(d,{variant:"ghost",onClick:he,className:"text-red-500 hover:text-red-600 hover:bg-red-50",children:[e.jsx(Ee,{className:"h-4 w-4 mr-1"}),"Delete"]})]})]}),e.jsxs(s,{gap:"lg",wrap:!0,className:"w-full",children:[e.jsx(l,{className:"p-4 flex-1 min-w-[300px]",children:e.jsxs(t,{gap:"md",children:[e.jsx(r,{variant:"h4",children:"Profile Information"}),e.jsxs(t,{gap:"sm",children:[e.jsxs(s,{justify:"between",children:[e.jsx(r,{variant:"body",className:"text-neutral-500",children:"Email"}),e.jsx(r,{variant:"body",children:a.email})]}),a.phone&&e.jsxs(s,{justify:"between",children:[e.jsx(r,{variant:"body",className:"text-neutral-500",children:"Phone"}),e.jsx(r,{variant:"body",children:a.phone})]}),e.jsxs(s,{justify:"between",children:[e.jsx(r,{variant:"body",className:"text-neutral-500",children:"Role"}),e.jsx(r,{variant:"body",className:"capitalize",children:a.role})]}),a.createdAt&&e.jsxs(s,{justify:"between",children:[e.jsx(r,{variant:"body",className:"text-neutral-500",children:"Joined"}),e.jsx(r,{variant:"body",children:Le(a.createdAt)})]})]})]})}),c&&W&&e.jsx(L,{className:"flex-1 min-w-[300px]",children:e.jsx(Ne,{data:W,size:"lg",showActionButton:!0})})]}),c&&i&&e.jsxs(t,{gap:"md",children:[e.jsx(r,{variant:"h3",children:"Performance Stats"}),e.jsxs(s,{gap:"md",wrap:!0,children:[e.jsx(l,{className:"p-4 flex-1 min-w-[150px]",children:e.jsxs(t,{gap:"xs",align:"center",children:[e.jsx(C,{className:"h-6 w-6 text-blue-500"}),e.jsx(r,{variant:"h2",children:i.totalLifts}),e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Total Lifts"})]})}),e.jsx(l,{className:"p-4 flex-1 min-w-[150px]",children:e.jsxs(t,{gap:"xs",align:"center",children:[e.jsx(B,{className:"h-6 w-6 text-green-500"}),e.jsx(r,{variant:"h2",children:i.totalSessions}),e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Sessions"})]})}),e.jsx(l,{className:"p-4 flex-1 min-w-[150px]",children:e.jsxs(t,{gap:"xs",align:"center",children:[e.jsx(Ae,{className:"h-6 w-6 text-purple-500"}),e.jsx(r,{variant:"h2",children:i.avgWellnessScore.toFixed(1)}),e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Avg Wellness"})]})}),e.jsx(l,{className:"p-4 flex-1 min-w-[150px]",children:e.jsxs(t,{gap:"xs",align:"center",children:[e.jsx(We,{className:"h-6 w-6 text-orange-500"}),e.jsx(r,{variant:"h2",children:i.currentStreak}),e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Day Streak"})]})}),e.jsx(l,{className:"p-4 flex-1 min-w-[150px]",children:e.jsxs(t,{gap:"xs",align:"center",children:[e.jsx(Pe,{className:"h-6 w-6 text-yellow-500"}),e.jsx(r,{variant:"h2",children:i.milestonesAchieved}),e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Milestones"})]})})]})]}),c&&b&&b.length>0&&e.jsx(l,{className:"p-4",children:e.jsx(Se,{data:b,metric:"Progress Over Time",chartType:"line",showDateSelector:!0})}),c&&e.jsxs(s,{gap:"md",children:[e.jsxs(d,{variant:"secondary",onClick:ge,children:[e.jsx(C,{className:"h-4 w-4 mr-1"}),"View Lifts"]}),e.jsxs(d,{variant:"secondary",onClick:je,children:[e.jsx(B,{className:"h-4 w-4 mr-1"}),"View Sessions"]})]})]})};k.displayName="TraineeDetailTemplate";k.__docgenInfo={description:"",methods:[],displayName:"TraineeDetailTemplate",props:{data:{required:!1,tsType:{name:"UserData"},description:"Trainee data"},stats:{required:!1,tsType:{name:"TraineeStats"},description:"Trainee stats"},creditData:{required:!1,tsType:{name:"CreditData"},description:"Credit data"},progressData:{required:!1,tsType:{name:"Array",elements:[{name:"ChartDataPoint"}],raw:"ChartDataPoint[]"},description:"Progress chart data"},isLoading:{required:!1,tsType:{name:"boolean"},description:"Loading state",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"union",raw:"Error | null",elements:[{name:"Error"},{name:"null"}]},description:"Error state",defaultValue:{value:"null",computed:!1}},entity:{required:!1,tsType:{name:"string"},description:"Entity context for events",defaultValue:{value:'"User"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const pa={title:"Blaz-Klemenc/Templates/TraineeDetailTemplate",component:k,parameters:{layout:"fullscreen"},tags:["autodocs"]},p={id:"trainee-1",name:"Ana Kovac",email:"ana.kovac@example.com",role:"trainee",phone:"+386 40 123 456",createdAt:new Date(Date.now()-90*24*60*60*1e3)},Ie={id:"trainer-1",name:"Blaz Klemenc",email:"blaz@trainer.com",role:"trainer",phone:"+386 30 111 222",createdAt:new Date(Date.now()-365*24*60*60*1e3)},E={totalLifts:245,totalSessions:48,avgWellnessScore:8.2,currentStreak:21,milestonesAchieved:7},y={id:"credit-1",traineeId:"trainee-1",totalCredits:20,remainingCredits:12,expiresAt:new Date(Date.now()+30*24*60*60*1e3)},A=[{date:"2024-01-01",label:"Week 1",value:65},{date:"2024-01-08",label:"Week 2",value:70},{date:"2024-01-15",label:"Week 3",value:68},{date:"2024-01-22",label:"Week 4",value:75},{date:"2024-01-29",label:"Week 5",value:78},{date:"2024-02-05",label:"Week 6",value:82},{date:"2024-02-12",label:"Week 7",value:80},{date:"2024-02-19",label:"Week 8",value:85}],h={args:{data:p,stats:E,creditData:y,progressData:A}},g={args:{isLoading:!0}},j={args:{error:{message:"Failed to load trainee details."}}},f={args:{data:void 0}},v={args:{data:Ie}},w={args:{data:p,creditData:y}},D={args:{data:p,stats:E,progressData:A}},N={args:{data:p,stats:E,creditData:y}},S={args:{data:{id:"trainee-2",name:"New Trainee",email:"new@example.com",role:"trainee"}}},T={args:{data:p,stats:{totalLifts:520,totalSessions:96,avgWellnessScore:9.1,currentStreak:45,milestonesAchieved:15},creditData:{...y,totalCredits:50,remainingCredits:35},progressData:A}};var V,U,q;h.parameters={...h.parameters,docs:{...(V=h.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    data: sampleTrainee,
    stats: sampleStats,
    creditData: sampleCreditData,
    progressData: sampleProgressData
  }
}`,...(q=(U=h.parameters)==null?void 0:U.docs)==null?void 0:q.source}}};var z,F,M;g.parameters={...g.parameters,docs:{...(z=g.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    isLoading: true
  }
}`,...(M=(F=g.parameters)==null?void 0:F.docs)==null?void 0:M.source}}};var _,H,K;j.parameters={...j.parameters,docs:{...(_=j.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    error: {
      message: "Failed to load trainee details."
    } as Error
  }
}`,...(K=(H=j.parameters)==null?void 0:H.docs)==null?void 0:K.source}}};var O,R,G;f.parameters={...f.parameters,docs:{...(O=f.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    data: undefined
  }
}`,...(G=(R=f.parameters)==null?void 0:R.docs)==null?void 0:G.source}}};var J,Q,X;v.parameters={...v.parameters,docs:{...(J=v.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    data: sampleTrainer
  }
}`,...(X=(Q=v.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,$;w.parameters={...w.parameters,docs:{...(Y=w.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    data: sampleTrainee,
    creditData: sampleCreditData
  }
}`,...($=(Z=w.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,ae,re;D.parameters={...D.parameters,docs:{...(ee=D.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    data: sampleTrainee,
    stats: sampleStats,
    progressData: sampleProgressData
  }
}`,...(re=(ae=D.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};var se,te,ne;N.parameters={...N.parameters,docs:{...(se=N.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    data: sampleTrainee,
    stats: sampleStats,
    creditData: sampleCreditData
  }
}`,...(ne=(te=N.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var ie,le,oe;S.parameters={...S.parameters,docs:{...(ie=S.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    data: {
      id: "trainee-2",
      name: "New Trainee",
      email: "new@example.com",
      role: "trainee"
    }
  }
}`,...(oe=(le=S.parameters)==null?void 0:le.docs)==null?void 0:oe.source}}};var ce,me,de;T.parameters={...T.parameters,docs:{...(ce=T.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    data: sampleTrainee,
    stats: {
      totalLifts: 520,
      totalSessions: 96,
      avgWellnessScore: 9.1,
      currentStreak: 45,
      milestonesAchieved: 15
    },
    creditData: {
      ...sampleCreditData,
      totalCredits: 50,
      remainingCredits: 35
    },
    progressData: sampleProgressData
  }
}`,...(de=(me=T.parameters)==null?void 0:me.docs)==null?void 0:de.source}}};const xa=["Default","Loading","Error","NotFound","TrainerView","WithoutStats","WithoutCredits","WithoutProgress","MinimalData","HighPerformer"];export{h as Default,j as Error,T as HighPerformer,g as Loading,S as MinimalData,f as NotFound,v as TrainerView,D as WithoutCredits,N as WithoutProgress,w as WithoutStats,xa as __namedExportsOrder,pa as default};
