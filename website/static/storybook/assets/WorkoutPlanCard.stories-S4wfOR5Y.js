import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as i}from"./index-GiUgBvb1.js";import{c as z}from"./cn-BNf5BS2b.js";import{B as d}from"./Box-DYJzRMmP.js";import{H as r,V as x}from"./Stack-1XI3stiC.js";import{T as a}from"./Typography-Wmkp-g7N.js";import{B as m}from"./Button-B7t-_IKa.js";import{C as U}from"./Card-BNT5PrJ5.js";import{B as D}from"./Badge-Dd4QqFOk.js";import{u as Pe}from"./useEventBus-BNZMNlv8.js";import{T as we}from"./trash-2-ChlfdFMf.js";import{C as T}from"./check-circle-2-D18fmE9T.js";import{P as ke}from"./play-circle-CWtX3MJx.js";import{C as ye}from"./calendar-rGtwHcH_.js";import{D as V}from"./dumbbell-GoIYbK-o.js";import{C as Le}from"./clock-DT9ve7xf.js";import{U as Ie}from"./users-CV1mGUsS.js";import{U as Be}from"./user-BePscFH1.js";import{c as Ae}from"./createLucideIcon-CbHznvEr.js";import{E as ze}from"./eye-DPfPdwVp.js";import{P as Ue}from"./pen-DNARvM59.js";import{Y as Ve}from"./youtube-BrUjTZcy.js";import"./loader-2-DXp1ic5P.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qe=Ae("ListChecks",[["path",{d:"m3 17 2 2 4-4",key:"1jhpwq"}],["path",{d:"m3 7 2 2 4-4",key:"1obspn"}],["path",{d:"M13 6h8",key:"15sg57"}],["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 18h8",key:"oe0vm4"}]]),He={scheduled:{label:"Scheduled",color:"bg-blue-100 text-blue-700",icon:ye},"in-progress":{label:"In Progress",color:"bg-amber-100 text-amber-700",icon:ke},completed:{label:"Completed",color:"bg-green-100 text-green-700",icon:T},cancelled:{label:"Cancelled",color:"bg-red-100 text-red-700",icon:we}},q=s=>new Date(s).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}),H=s=>{if(s<60)return`${s}min`;const l=Math.floor(s/60),u=s%60;return u>0?`${l}h ${u}m`:`${l}h`},W=({data:s,showExercises:l=!0,showActions:u=!0,compact:Ce=!1,entity:n="TrainingSession",className:P})=>{var B,A;const o=Pe(),p=He[s.status||"scheduled"],L=p.icon,h=((B=s.exercises)==null?void 0:B.length)||0,Ne=((A=s.exercises)==null?void 0:A.filter(c=>c.completed).length)||0,I=i.useCallback(()=>{o.emit("UI:VIEW",{row:s,entity:n})},[o,s,n]),ve=i.useCallback(()=>{o.emit("UI:EDIT",{row:s,entity:n})},[o,s,n]),Se=i.useCallback(()=>{o.emit("UI:START",{row:s,entity:n})},[o,s,n]),Ee=i.useCallback(()=>{o.emit("UI:COMPLETE",{row:s,entity:n})},[o,s,n]),De=i.useCallback(()=>{o.emit("UI:DELETE",{row:s,entity:n})},[o,s,n]),Te=i.useCallback(()=>{s.youtubeLink&&window.open(s.youtubeLink,"_blank")},[s.youtubeLink]);return Ce?e.jsx(U,{className:z("p-3 cursor-pointer hover:bg-neutral-50",P),onClick:I,children:e.jsxs(r,{justify:"between",align:"center",children:[e.jsxs(r,{gap:"sm",align:"center",children:[e.jsx(d,{display:"flex",rounded:"lg",padding:"xs",className:"items-center justify-center bg-indigo-100",children:e.jsx(V,{className:"h-4 w-4 text-indigo-600"})}),e.jsxs(x,{gap:"none",children:[e.jsx(a,{variant:"label",children:s.title}),e.jsxs(r,{gap:"sm",align:"center",children:[e.jsx(a,{variant:"small",className:"text-neutral-500",children:q(s.scheduledAt)}),e.jsx(a,{variant:"small",className:"text-neutral-400",children:H(s.duration)})]})]})]}),e.jsxs(r,{gap:"sm",align:"center",children:[h>0&&e.jsxs(D,{variant:"default",size:"sm",children:[h," exercises"]}),e.jsx(D,{className:p.color,size:"sm",children:e.jsx(L,{className:"h-3 w-3"})})]})]})}):e.jsx(U,{className:z("p-4",P),children:e.jsxs(x,{gap:"md",children:[e.jsxs(r,{justify:"between",align:"start",children:[e.jsxs(r,{gap:"sm",align:"center",children:[e.jsx(d,{display:"flex",rounded:"lg",padding:"sm",className:"items-center justify-center bg-indigo-100",children:e.jsx(V,{className:"h-5 w-5 text-indigo-600"})}),e.jsxs(x,{gap:"none",children:[e.jsx(a,{variant:"h4",children:s.title}),e.jsxs(r,{gap:"sm",align:"center",children:[e.jsx(ye,{className:"h-3 w-3 text-neutral-400"}),e.jsx(a,{variant:"small",className:"text-neutral-500",children:q(s.scheduledAt)})]})]})]}),e.jsxs(D,{className:p.color,size:"md",children:[e.jsx(L,{className:"h-3 w-3 mr-1"}),p.label]})]}),e.jsxs(r,{gap:"lg",className:"py-2",children:[e.jsxs(r,{gap:"xs",align:"center",children:[e.jsx(Le,{className:"h-4 w-4 text-neutral-400"}),e.jsx(a,{variant:"body",children:H(s.duration)})]}),s.isGroupSession?e.jsxs(r,{gap:"xs",align:"center",children:[e.jsx(Ie,{className:"h-4 w-4 text-neutral-400"}),e.jsxs(a,{variant:"body",children:["Group (",s.maxParticipants||"unlimited",")"]})]}):e.jsxs(r,{gap:"xs",align:"center",children:[e.jsx(Be,{className:"h-4 w-4 text-neutral-400"}),e.jsx(a,{variant:"body",children:"1-on-1"})]}),h>0&&e.jsxs(r,{gap:"xs",align:"center",children:[e.jsx(qe,{className:"h-4 w-4 text-neutral-400"}),e.jsxs(a,{variant:"body",children:[Ne,"/",h," exercises"]})]})]}),l&&s.exercises&&s.exercises.length>0&&e.jsxs(x,{gap:"sm",className:"bg-neutral-50 rounded-lg p-3",children:[e.jsx(a,{variant:"label",className:"text-neutral-600",children:"Exercises"}),s.exercises.slice(0,5).map((c,We)=>e.jsxs(r,{justify:"between",align:"center",className:"py-1",children:[e.jsxs(r,{gap:"sm",align:"center",children:[c.completed?e.jsx(T,{className:"h-4 w-4 text-green-500"}):e.jsx(d,{className:"h-4 w-4 rounded-full border-2 border-neutral-300"}),e.jsx(a,{variant:"body",className:c.completed?"line-through text-neutral-400":"",children:c.name})]}),e.jsxs(a,{variant:"small",className:"text-neutral-500",children:[c.sets,"×",c.reps,c.weight?` @ ${c.weight}kg`:""]})]},We)),s.exercises.length>5&&e.jsxs(a,{variant:"small",className:"text-neutral-500",children:["+",s.exercises.length-5," more exercises"]})]}),s.notes&&e.jsx(d,{padding:"sm",rounded:"lg",className:"bg-neutral-50",children:e.jsx(a,{variant:"small",className:"text-neutral-600",children:s.notes})}),u&&e.jsxs(r,{gap:"sm",className:"border-t border-neutral-100 pt-3",children:[e.jsxs(m,{variant:"secondary",size:"sm",onClick:I,children:[e.jsx(ze,{className:"h-4 w-4 mr-1"}),"View"]}),e.jsxs(m,{variant:"secondary",size:"sm",onClick:ve,children:[e.jsx(Ue,{className:"h-4 w-4 mr-1"}),"Edit"]}),s.youtubeLink&&e.jsx(m,{variant:"ghost",size:"sm",onClick:Te,children:e.jsx(Ve,{className:"h-4 w-4 text-red-500"})}),s.status==="scheduled"&&e.jsxs(m,{variant:"primary",size:"sm",onClick:Se,children:[e.jsx(ke,{className:"h-4 w-4 mr-1"}),"Start"]}),s.status==="in-progress"&&e.jsxs(m,{variant:"primary",size:"sm",onClick:Ee,children:[e.jsx(T,{className:"h-4 w-4 mr-1"}),"Complete"]}),e.jsx(d,{className:"flex-1"}),e.jsx(m,{variant:"ghost",size:"sm",onClick:De,className:"text-red-500 hover:text-red-600 hover:bg-red-50",children:e.jsx(we,{className:"h-4 w-4"})})]})]})})};W.displayName="WorkoutPlanCard";W.__docgenInfo={description:"",methods:[],displayName:"WorkoutPlanCard",props:{data:{required:!0,tsType:{name:"WorkoutPlanData"},description:"Workout plan data"},showExercises:{required:!1,tsType:{name:"boolean"},description:"Show exercises list",defaultValue:{value:"true",computed:!1}},showActions:{required:!1,tsType:{name:"boolean"},description:"Show action buttons",defaultValue:{value:"true",computed:!1}},compact:{required:!1,tsType:{name:"boolean"},description:"Compact display mode",defaultValue:{value:"false",computed:!1}},entity:{required:!1,tsType:{name:"string"},description:"Entity context for events",defaultValue:{value:'"TrainingSession"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const ms={title:"Blaz-Klemenc/Molecules/WorkoutPlanCard",component:W,parameters:{layout:"centered"},tags:["autodocs"]},E=[{name:"Squat",sets:4,reps:8,weight:100},{name:"Bench Press",sets:4,reps:8,weight:80},{name:"Barbell Row",sets:4,reps:10,weight:70},{name:"Overhead Press",sets:3,reps:10,weight:50},{name:"Bicep Curls",sets:3,reps:12,weight:15}],t={id:"wp-1",title:"Upper Body Strength",scheduledAt:new Date(Date.now()+24*60*60*1e3),duration:75,status:"scheduled",exercises:E},g={args:{data:t}},b={args:{data:{...t,title:"Push Day",status:"in-progress",scheduledAt:new Date,exercises:E.map((s,l)=>({...s,completed:l<2}))}}},j={args:{data:{...t,title:"Leg Day",status:"completed",scheduledAt:new Date(Date.now()-24*60*60*1e3),exercises:E.map(s=>({...s,completed:!0}))}}},f={args:{data:{...t,youtubeLink:"https://youtube.com/watch?v=example"}}},w={args:{data:{...t,title:"HIIT Circuit",isGroupSession:!0,maxParticipants:10,duration:45}}},k={args:{data:{...t,notes:"Focus on controlled eccentric phase. Rest 90 seconds between sets."}}},y={args:{data:{...t,title:"Full Body",exercises:[...E,{name:"Lunges",sets:3,reps:12},{name:"Tricep Dips",sets:3,reps:15},{name:"Plank",sets:3,reps:60,notes:"seconds"}]}}},C={args:{data:t,compact:!0}},N={args:{data:t,showExercises:!1}},v={args:{data:t,showActions:!1}},S={args:{data:{...t,title:"Recovery Session",status:"cancelled"}}};var M,R,G;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    data: baseWorkout
  }
}`,...(G=(R=g.parameters)==null?void 0:R.docs)==null?void 0:G.source}}};var Y,_,$;b.parameters={...b.parameters,docs:{...(Y=b.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseWorkout,
      title: "Push Day",
      status: "in-progress",
      scheduledAt: new Date(),
      exercises: sampleExercises.map((e, i) => ({
        ...e,
        completed: i < 2
      }))
    }
  }
}`,...($=(_=b.parameters)==null?void 0:_.docs)==null?void 0:$.source}}};var F,O,K;j.parameters={...j.parameters,docs:{...(F=j.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseWorkout,
      title: "Leg Day",
      status: "completed",
      scheduledAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      exercises: sampleExercises.map(e => ({
        ...e,
        completed: true
      }))
    }
  }
}`,...(K=(O=j.parameters)==null?void 0:O.docs)==null?void 0:K.source}}};var J,Q,X;f.parameters={...f.parameters,docs:{...(J=f.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseWorkout,
      youtubeLink: "https://youtube.com/watch?v=example"
    }
  }
}`,...(X=(Q=f.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Z,ee,se;w.parameters={...w.parameters,docs:{...(Z=w.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseWorkout,
      title: "HIIT Circuit",
      isGroupSession: true,
      maxParticipants: 10,
      duration: 45
    }
  }
}`,...(se=(ee=w.parameters)==null?void 0:ee.docs)==null?void 0:se.source}}};var re,ae,te;k.parameters={...k.parameters,docs:{...(re=k.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseWorkout,
      notes: "Focus on controlled eccentric phase. Rest 90 seconds between sets."
    }
  }
}`,...(te=(ae=k.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};var ne,oe,ce;y.parameters={...y.parameters,docs:{...(ne=y.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseWorkout,
      title: "Full Body",
      exercises: [...sampleExercises, {
        name: "Lunges",
        sets: 3,
        reps: 12
      }, {
        name: "Tricep Dips",
        sets: 3,
        reps: 15
      }, {
        name: "Plank",
        sets: 3,
        reps: 60,
        notes: "seconds"
      }]
    }
  }
}`,...(ce=(oe=y.parameters)==null?void 0:oe.docs)==null?void 0:ce.source}}};var le,ie,me;C.parameters={...C.parameters,docs:{...(le=C.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    data: baseWorkout,
    compact: true
  }
}`,...(me=(ie=C.parameters)==null?void 0:ie.docs)==null?void 0:me.source}}};var de,ue,pe;N.parameters={...N.parameters,docs:{...(de=N.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    data: baseWorkout,
    showExercises: false
  }
}`,...(pe=(ue=N.parameters)==null?void 0:ue.docs)==null?void 0:pe.source}}};var he,xe,ge;v.parameters={...v.parameters,docs:{...(he=v.parameters)==null?void 0:he.docs,source:{originalSource:`{
  args: {
    data: baseWorkout,
    showActions: false
  }
}`,...(ge=(xe=v.parameters)==null?void 0:xe.docs)==null?void 0:ge.source}}};var be,je,fe;S.parameters={...S.parameters,docs:{...(be=S.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseWorkout,
      title: "Recovery Session",
      status: "cancelled"
    }
  }
}`,...(fe=(je=S.parameters)==null?void 0:je.docs)==null?void 0:fe.source}}};const ds=["Default","InProgress","Completed","WithYouTubeLink","GroupSession","WithNotes","ManyExercises","Compact","HideExercises","HideActions","Cancelled"];export{S as Cancelled,C as Compact,j as Completed,g as Default,w as GroupSession,v as HideActions,N as HideExercises,b as InProgress,y as ManyExercises,k as WithNotes,f as WithYouTubeLink,ds as __namedExportsOrder,ms as default};
