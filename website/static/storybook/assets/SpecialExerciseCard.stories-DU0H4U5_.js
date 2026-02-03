import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as l}from"./index-GiUgBvb1.js";import{c as N}from"./cn-BNf5BS2b.js";import{B as p}from"./Box-DYJzRMmP.js";import{H as o,V as i}from"./Stack-1XI3stiC.js";import{T as r}from"./Typography-Wmkp-g7N.js";import{B as m}from"./Button-B7t-_IKa.js";import{C as k}from"./Card-BNT5PrJ5.js";import{B as D}from"./Badge-Dd4QqFOk.js";import{u as pe}from"./useEventBus-BNZMNlv8.js";import{C as ae}from"./check-circle-2-D18fmE9T.js";import{P as ne}from"./play-circle-CWtX3MJx.js";import{C as de}from"./clock-DT9ve7xf.js";import{D as P}from"./dumbbell-GoIYbK-o.js";import{C as ue}from"./calendar-rGtwHcH_.js";import{E as xe}from"./eye-DPfPdwVp.js";import{P as he}from"./pen-DNARvM59.js";import{T as ge}from"./trash-2-ChlfdFMf.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";const fe={planned:{label:"Planned",color:"bg-blue-100 text-blue-700",icon:de},in_progress:{label:"In Progress",color:"bg-amber-100 text-amber-700",icon:ne},completed:{label:"Completed",color:"bg-green-100 text-green-700",icon:ae}},I=s=>new Date(s).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}),y=({data:s,showActions:S=!0,compact:oe=!1,entity:t="ProgressEntry",className:C})=>{const a=pe(),c=fe[s.status],v=c.icon,E=l.useCallback(()=>{a.emit("UI:VIEW",{row:s,entity:t})},[a,s,t]),ie=l.useCallback(()=>{a.emit("UI:EDIT",{row:s,entity:t})},[a,s,t]),ce=l.useCallback(()=>{a.emit("UI:DELETE",{row:s,entity:t})},[a,s,t]),le=l.useCallback(()=>{a.emit("UI:SAVE",{row:{...s,status:"completed"},entity:t})},[a,s,t]),me=l.useCallback(()=>{a.emit("UI:SAVE",{row:{...s,status:"in_progress"},entity:t})},[a,s,t]);return oe?e.jsx(k,{className:N("p-3 cursor-pointer hover:bg-neutral-50",C),onClick:E,children:e.jsxs(o,{justify:"between",align:"center",children:[e.jsxs(o,{gap:"sm",align:"center",children:[e.jsx(p,{display:"flex",rounded:"lg",padding:"xs",className:"items-center justify-center bg-purple-100",children:e.jsx(P,{className:"h-4 w-4 text-purple-600"})}),e.jsxs(i,{gap:"none",children:[e.jsx(r,{variant:"label",children:s.title}),e.jsx(r,{variant:"small",className:"text-neutral-500",children:I(s.date)})]})]}),e.jsxs(D,{className:c.color,size:"sm",children:[e.jsx(v,{className:"h-3 w-3 mr-1"}),c.label]})]})}):e.jsx(k,{className:N("p-4",C),children:e.jsxs(i,{gap:"md",children:[e.jsxs(o,{justify:"between",align:"start",children:[e.jsxs(o,{gap:"sm",align:"center",children:[e.jsx(p,{display:"flex",rounded:"lg",padding:"sm",className:"items-center justify-center bg-purple-100",children:e.jsx(P,{className:"h-5 w-5 text-purple-600"})}),e.jsxs(i,{gap:"none",children:[e.jsx(r,{variant:"h4",children:s.title}),e.jsxs(o,{gap:"sm",align:"center",children:[e.jsx(ue,{className:"h-3 w-3 text-neutral-400"}),e.jsx(r,{variant:"small",className:"text-neutral-500",children:I(s.date)})]})]})]}),e.jsxs(D,{className:c.color,size:"md",children:[e.jsx(v,{className:"h-3 w-3 mr-1"}),c.label]})]}),s.description&&e.jsx(r,{variant:"body",className:"text-neutral-600",children:s.description}),(s.sets||s.reps)&&e.jsxs(o,{gap:"md",children:[s.sets&&e.jsxs(i,{gap:"none",align:"center",children:[e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Sets"}),e.jsx(r,{variant:"h4",children:s.sets})]}),s.reps&&e.jsxs(i,{gap:"none",align:"center",children:[e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Reps"}),e.jsx(r,{variant:"h4",children:s.reps})]})]}),s.instructions&&e.jsx(p,{padding:"sm",rounded:"lg",className:"bg-neutral-50",children:e.jsxs(i,{gap:"xs",children:[e.jsx(r,{variant:"small",className:"font-medium text-neutral-600",children:"Trainer Instructions"}),e.jsx(r,{variant:"body",className:"text-neutral-700",children:s.instructions})]})}),S&&e.jsxs(o,{gap:"sm",className:"border-t border-neutral-100 pt-3",children:[e.jsxs(m,{variant:"secondary",size:"sm",onClick:E,children:[e.jsx(xe,{className:"h-4 w-4 mr-1"}),"View"]}),e.jsxs(m,{variant:"secondary",size:"sm",onClick:ie,children:[e.jsx(he,{className:"h-4 w-4 mr-1"}),"Edit"]}),s.status==="planned"&&e.jsxs(m,{variant:"primary",size:"sm",onClick:me,children:[e.jsx(ne,{className:"h-4 w-4 mr-1"}),"Start"]}),s.status==="in_progress"&&e.jsxs(m,{variant:"primary",size:"sm",onClick:le,children:[e.jsx(ae,{className:"h-4 w-4 mr-1"}),"Complete"]}),e.jsx(p,{className:"flex-1"}),e.jsx(m,{variant:"ghost",size:"sm",onClick:ce,className:"text-red-500 hover:text-red-600 hover:bg-red-50",children:e.jsx(ge,{className:"h-4 w-4"})})]})]})})};y.displayName="SpecialExerciseCard";y.__docgenInfo={description:"",methods:[],displayName:"SpecialExerciseCard",props:{data:{required:!0,tsType:{name:"SpecialExerciseData"},description:"Exercise data"},showActions:{required:!1,tsType:{name:"boolean"},description:"Show action buttons",defaultValue:{value:"true",computed:!1}},compact:{required:!1,tsType:{name:"boolean"},description:"Compact display mode",defaultValue:{value:"false",computed:!1}},entity:{required:!1,tsType:{name:"string"},description:"Entity context for events",defaultValue:{value:'"ProgressEntry"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const Ue={title:"Blaz-Klemenc/Molecules/SpecialExerciseCard",component:y,parameters:{layout:"centered"},tags:["autodocs"]},n={id:"se-1",entryType:"special_exercise",title:"Shoulder Rehabilitation",description:"Rotator cuff strengthening exercises for injury recovery",date:new Date,status:"planned",sets:3,reps:15},d={args:{data:n}},u={args:{data:{...n,title:"Core Stability Work",description:"Focus on deep core activation and anti-rotation exercises",status:"in_progress"}}},x={args:{data:{...n,title:"Hip Mobility Routine",status:"completed",date:new Date(Date.now()-2*24*60*60*1e3)}}},h={args:{data:{...n,title:"Ankle Strengthening",instructions:"Perform slowly with control. Stop if any pain occurs. Focus on full range of motion.",sets:2,reps:20}}},g={args:{data:{...n,title:"Foam Rolling Routine",videoUrl:"https://youtube.com/watch?v=example",instructions:"Follow the video for proper technique"}}},f={args:{data:{...n,title:"Band Pull-Aparts",sets:5,reps:25,description:"Warm-up and postural correction exercise"}}},j={args:{data:{id:"se-2",entryType:"special_exercise",title:"Stretching Protocol",description:"Hold each stretch for 30 seconds, repeat 3 times",date:new Date,status:"planned"}}},b={args:{data:n,compact:!0}},w={args:{data:n,showActions:!1}};var T,V,A;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    data: baseExercise
  }
}`,...(A=(V=d.parameters)==null?void 0:V.docs)==null?void 0:A.source}}};var R,_,B;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseExercise,
      title: "Core Stability Work",
      description: "Focus on deep core activation and anti-rotation exercises",
      status: "in_progress"
    }
  }
}`,...(B=(_=u.parameters)==null?void 0:_.docs)==null?void 0:B.source}}};var H,U,W;x.parameters={...x.parameters,docs:{...(H=x.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseExercise,
      title: "Hip Mobility Routine",
      status: "completed",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  }
}`,...(W=(U=x.parameters)==null?void 0:U.docs)==null?void 0:W.source}}};var z,F,q;h.parameters={...h.parameters,docs:{...(z=h.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseExercise,
      title: "Ankle Strengthening",
      instructions: "Perform slowly with control. Stop if any pain occurs. Focus on full range of motion.",
      sets: 2,
      reps: 20
    }
  }
}`,...(q=(F=h.parameters)==null?void 0:F.docs)==null?void 0:q.source}}};var M,L,K;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseExercise,
      title: "Foam Rolling Routine",
      videoUrl: "https://youtube.com/watch?v=example",
      instructions: "Follow the video for proper technique"
    }
  }
}`,...(K=(L=g.parameters)==null?void 0:L.docs)==null?void 0:K.source}}};var O,G,J;f.parameters={...f.parameters,docs:{...(O=f.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseExercise,
      title: "Band Pull-Aparts",
      sets: 5,
      reps: 25,
      description: "Warm-up and postural correction exercise"
    }
  }
}`,...(J=(G=f.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var Q,X,Y;j.parameters={...j.parameters,docs:{...(Q=j.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    data: {
      id: "se-2",
      entryType: "special_exercise",
      title: "Stretching Protocol",
      description: "Hold each stretch for 30 seconds, repeat 3 times",
      date: new Date(),
      status: "planned"
    }
  }
}`,...(Y=(X=j.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,$,ee;b.parameters={...b.parameters,docs:{...(Z=b.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    data: baseExercise,
    compact: true
  }
}`,...(ee=($=b.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var se,re,te;w.parameters={...w.parameters,docs:{...(se=w.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    data: baseExercise,
    showActions: false
  }
}`,...(te=(re=w.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};const We=["Default","InProgress","Completed","WithInstructions","WithVideoUrl","HighVolume","NoSetsReps","Compact","HideActions"];export{b as Compact,x as Completed,d as Default,w as HideActions,f as HighVolume,u as InProgress,j as NoSetsReps,h as WithInstructions,g as WithVideoUrl,We as __namedExportsOrder,Ue as default};
