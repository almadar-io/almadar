import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as d}from"./index-GiUgBvb1.js";import{c as j}from"./cn-BNf5BS2b.js";import{B as Ce}from"./Box-DYJzRMmP.js";import{V as n,H as r}from"./Stack-1XI3stiC.js";import{T as a}from"./Typography-Wmkp-g7N.js";import{B as p}from"./Button-B7t-_IKa.js";import{C as h}from"./Card-BNT5PrJ5.js";import{B as P}from"./Badge-Dd4QqFOk.js";import{S as Te}from"./Spinner-vF2DJrH5.js";import{u as ke}from"./useEventBus-BNZMNlv8.js";import{E as Ee}from"./ExerciseVideoLink-SBtiE1_Q.js";import{C as L}from"./calendar-rGtwHcH_.js";import{X as ue}from"./x-circle-CCPeOM9T.js";import{C as he}from"./check-circle-2-D18fmE9T.js";import{P as xe}from"./play-circle-CWtX3MJx.js";import{A as De}from"./arrow-left-CMPuXvFr.js";import{C as Le}from"./clock-DT9ve7xf.js";import{S as Ae}from"./square-pen-D7sL1yO_.js";import{T as Ie}from"./trash-2-ChlfdFMf.js";import{U as B}from"./users-CV1mGUsS.js";import{U as q}from"./user-BePscFH1.js";import{M as Pe}from"./map-pin-BS1jFVqS.js";import{F as Be}from"./file-text-DZQctV9o.js";import{Y as qe}from"./youtube-BrUjTZcy.js";import{D as Ue}from"./dumbbell-GoIYbK-o.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./play-C6U2eifx.js";import"./external-link-k_e-i1vS.js";const Me={scheduled:{label:"Scheduled",color:"bg-blue-100 text-blue-700",icon:L,actions:["START","CANCEL"]},"in-progress":{label:"In Progress",color:"bg-amber-100 text-amber-700",icon:xe,actions:["COMPLETE","CANCEL"]},completed:{label:"Completed",color:"bg-green-100 text-green-700",icon:he,actions:[]},cancelled:{label:"Cancelled",color:"bg-red-100 text-red-700",icon:ue,actions:[]}},Fe=s=>new Date(s).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit"}),U=s=>{if(s<60)return`${s} minutes`;const l=Math.floor(s/60),c=s%60;return c>0?`${l}h ${c}m`:`${l} hour${l>1?"s":""}`},A=({data:s,trainer:l,participants:c,exercises:x,isLoading:ge=!1,error:I=null,entity:i="TrainingSession",className:g})=>{const o=ke(),je=d.useCallback(()=>{o.emit("UI:BACK",{entity:i})},[o,i]),fe=d.useCallback(()=>{o.emit("UI:EDIT",{row:s,entity:i})},[o,s,i]),be=d.useCallback(()=>{o.emit("UI:START",{row:s,entity:i})},[o,s,i]),Se=d.useCallback(()=>{o.emit("UI:COMPLETE",{row:s,entity:i})},[o,s,i]),we=d.useCallback(()=>{o.emit("UI:CANCEL",{row:s,entity:i})},[o,s,i]),ye=d.useCallback(()=>{o.emit("UI:DELETE",{row:s,entity:i})},[o,s,i]);if(ge)return e.jsxs(n,{align:"center",justify:"center",className:j("p-6 min-h-[400px]",g),children:[e.jsx(Te,{size:"lg"}),e.jsx(a,{variant:"body",className:"text-neutral-500",children:"Loading session details..."})]});if(I)return e.jsx(n,{align:"center",justify:"center",className:j("p-6 min-h-[400px]",g),children:e.jsxs(a,{variant:"body",className:"text-red-500",children:["Error: ",I.message]})});if(!s)return e.jsxs(n,{align:"center",justify:"center",className:j("p-6 min-h-[400px]",g),children:[e.jsx(L,{className:"h-12 w-12 text-neutral-300"}),e.jsx(a,{variant:"h3",className:"text-neutral-500",children:"Session not found"})]});const m=Me[s.status||"scheduled"],ve=m.icon;return e.jsxs(n,{gap:"lg",className:j("p-6",g),children:[e.jsxs(r,{justify:"between",align:"start",wrap:!0,children:[e.jsxs(r,{gap:"md",align:"center",children:[e.jsx(p,{variant:"ghost",size:"sm",onClick:je,children:e.jsx(De,{className:"h-4 w-4"})}),e.jsxs(n,{gap:"xs",children:[e.jsxs(r,{gap:"sm",align:"center",children:[e.jsx(a,{variant:"h1",children:s.title}),e.jsxs(P,{className:m.color,children:[e.jsx(ve,{className:"h-3 w-3 mr-1"}),m.label]})]}),e.jsxs(r,{gap:"md",align:"center",className:"text-neutral-500",children:[e.jsxs(r,{gap:"xs",align:"center",children:[e.jsx(L,{className:"h-4 w-4"}),e.jsx(a,{variant:"body",children:Fe(s.scheduledAt)})]}),e.jsxs(r,{gap:"xs",align:"center",children:[e.jsx(Le,{className:"h-4 w-4"}),e.jsx(a,{variant:"body",children:U(s.duration)})]})]})]})]}),e.jsxs(r,{gap:"sm",children:[e.jsxs(p,{variant:"secondary",onClick:fe,children:[e.jsx(Ae,{className:"h-4 w-4 mr-1"}),"Edit"]}),m.actions.includes("START")&&e.jsxs(p,{variant:"primary",onClick:be,children:[e.jsx(xe,{className:"h-4 w-4 mr-1"}),"Start Session"]}),m.actions.includes("COMPLETE")&&e.jsxs(p,{variant:"primary",onClick:Se,children:[e.jsx(he,{className:"h-4 w-4 mr-1"}),"Complete"]}),m.actions.includes("CANCEL")&&e.jsxs(p,{variant:"ghost",onClick:we,className:"text-amber-600 hover:text-amber-700",children:[e.jsx(ue,{className:"h-4 w-4 mr-1"}),"Cancel"]}),e.jsx(p,{variant:"ghost",onClick:ye,className:"text-red-500 hover:text-red-600 hover:bg-red-50",children:e.jsx(Ie,{className:"h-4 w-4"})})]})]}),e.jsxs(r,{gap:"lg",wrap:!0,className:"w-full items-start",children:[e.jsxs(n,{gap:"md",className:"flex-1 min-w-[300px]",children:[e.jsx(h,{className:"p-4",children:e.jsxs(n,{gap:"md",children:[e.jsx(a,{variant:"h4",children:"Session Details"}),e.jsxs(n,{gap:"sm",children:[e.jsxs(r,{justify:"between",children:[e.jsx(a,{variant:"body",className:"text-neutral-500",children:"Type"}),e.jsx(r,{gap:"xs",align:"center",children:s.isGroupSession?e.jsxs(e.Fragment,{children:[e.jsx(B,{className:"h-4 w-4 text-blue-500"}),e.jsxs(a,{variant:"body",children:["Group Session (",s.maxParticipants||"unlimited"," ","max)"]})]}):e.jsxs(e.Fragment,{children:[e.jsx(q,{className:"h-4 w-4 text-green-500"}),e.jsx(a,{variant:"body",children:"1-on-1 Session"})]})})]}),e.jsxs(r,{justify:"between",children:[e.jsx(a,{variant:"body",className:"text-neutral-500",children:"Duration"}),e.jsx(a,{variant:"body",children:U(s.duration)})]}),s.location&&e.jsxs(r,{justify:"between",children:[e.jsx(a,{variant:"body",className:"text-neutral-500",children:"Location"}),e.jsxs(r,{gap:"xs",align:"center",children:[e.jsx(Pe,{className:"h-4 w-4 text-neutral-400"}),e.jsx(a,{variant:"body",children:s.location})]})]}),l&&e.jsxs(r,{justify:"between",children:[e.jsx(a,{variant:"body",className:"text-neutral-500",children:"Trainer"}),e.jsx(a,{variant:"body",children:l.name})]})]})]})}),s.notes&&e.jsx(h,{className:"p-4",children:e.jsxs(n,{gap:"sm",children:[e.jsxs(r,{gap:"xs",align:"center",children:[e.jsx(Be,{className:"h-4 w-4 text-neutral-400"}),e.jsx(a,{variant:"h4",children:"Notes"})]}),e.jsx(a,{variant:"body",className:"text-neutral-600",children:s.notes})]})}),s.youtubeLink&&e.jsx(h,{className:"p-4",children:e.jsxs(n,{gap:"sm",children:[e.jsxs(r,{gap:"xs",align:"center",children:[e.jsx(qe,{className:"h-4 w-4 text-red-500"}),e.jsx(a,{variant:"h4",children:"Session Video"})]}),e.jsx(Ee,{videoUrl:s.youtubeLink,exerciseName:"Session Recording"})]})})]}),e.jsxs(n,{gap:"md",className:"flex-1 min-w-[300px]",children:[c&&c.length>0&&e.jsx(h,{className:"p-4",children:e.jsxs(n,{gap:"md",children:[e.jsx(r,{justify:"between",align:"center",children:e.jsxs(r,{gap:"xs",align:"center",children:[e.jsx(B,{className:"h-4 w-4 text-neutral-400"}),e.jsxs(a,{variant:"h4",children:["Participants (",c.length,")"]})]})}),e.jsx(n,{gap:"sm",children:c.map(t=>e.jsxs(r,{justify:"between",align:"center",className:"py-2 border-b border-neutral-100 last:border-0",children:[e.jsxs(r,{gap:"sm",align:"center",children:[e.jsx(Ce,{display:"flex",rounded:"full",className:"items-center justify-center h-8 w-8 bg-neutral-100",children:t.profileImage?e.jsx("img",{src:t.profileImage,alt:t.name,className:"h-8 w-8 rounded-full object-cover"}):e.jsx(q,{className:"h-4 w-4 text-neutral-400"})}),e.jsx(a,{variant:"body",children:t.name})]}),t.attended!==void 0&&e.jsx(P,{className:t.attended?"bg-green-100 text-green-700":"bg-neutral-100 text-neutral-600",size:"sm",children:t.attended?"Attended":"Absent"})]},t.id))})]})}),x&&x.length>0&&e.jsx(h,{className:"p-4",children:e.jsxs(n,{gap:"md",children:[e.jsxs(r,{gap:"xs",align:"center",children:[e.jsx(Ue,{className:"h-4 w-4 text-neutral-400"}),e.jsxs(a,{variant:"h4",children:["Exercises (",x.length,")"]})]}),e.jsx(n,{gap:"sm",children:x.map((t,Ne)=>e.jsxs(r,{justify:"between",align:"center",className:"py-2 border-b border-neutral-100 last:border-0",children:[e.jsx(a,{variant:"body",children:t.name}),e.jsxs(a,{variant:"small",className:"text-neutral-500",children:[t.sets,"x",t.reps,t.weight?` @ ${t.weight}kg`:""]})]},Ne))})]})})]})]})]})};A.displayName="SessionDetailTemplate";A.__docgenInfo={description:"",methods:[],displayName:"SessionDetailTemplate",props:{data:{required:!1,tsType:{name:"TrainingSessionData"},description:"Session data"},trainer:{required:!1,tsType:{name:"signature",type:"object",raw:"{ id: string; name: string; email?: string }",signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"email",value:{name:"string",required:!1}}]}},description:"Trainer data"},participants:{required:!1,tsType:{name:"Array",elements:[{name:"ParticipantData"}],raw:"ParticipantData[]"},description:"Trainee or participants"},exercises:{required:!1,tsType:{name:"Array",elements:[{name:"SessionExercise"}],raw:"SessionExercise[]"},description:"Exercises in this session"},isLoading:{required:!1,tsType:{name:"boolean"},description:"Loading state",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"union",raw:"Error | null",elements:[{name:"Error"},{name:"null"}]},description:"Error state",defaultValue:{value:"null",computed:!1}},entity:{required:!1,tsType:{name:"string"},description:"Entity context for events",defaultValue:{value:'"TrainingSession"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const fs={title:"Blaz-Klemenc/Templates/SessionDetailTemplate",component:A,parameters:{layout:"fullscreen"},tags:["autodocs"]},E={id:"session-1",traineeId:"trainee-1",trainerId:"trainer-1",title:"Upper Body Strength Training",scheduledAt:new Date(Date.now()+2*60*60*1e3),duration:60,status:"scheduled",isGroupSession:!1,notes:"Focus on progressive overload for bench press. Client mentioned slight shoulder discomfort last session - warm up thoroughly.",location:"Gym Floor A"},Ve={id:"session-2",traineeId:"trainee-2",trainerId:"trainer-1",title:"HIIT Group Training",scheduledAt:new Date,duration:45,status:"in-progress",isGroupSession:!0,maxParticipants:8,youtubeLink:"https://youtube.com/watch?v=example",notes:"High intensity interval training. Bring water and towel.",location:"Studio B"},Ge={id:"session-3",traineeId:"trainee-3",trainerId:"trainer-1",title:"Lower Body Assessment",scheduledAt:new Date(Date.now()-24*60*60*1e3),duration:75,status:"completed",isGroupSession:!1,youtubeLink:"https://youtube.com/watch?v=recording"},u={id:"trainer-1",name:"Blaz Klemenc",email:"blaz@trainer.com"},He=[{id:"p1",name:"Ana Kovac",email:"ana@example.com",attended:!0},{id:"p2",name:"Marko Horvat",email:"marko@example.com",attended:!0},{id:"p3",name:"Luka Novak",email:"luka@example.com",attended:!1},{id:"p4",name:"Maja Krajnc",email:"maja@example.com",attended:!0},{id:"p5",name:"Jan Vidmar",email:"jan@example.com",attended:!0}],D=[{name:"Bench Press",sets:4,reps:8,weight:70,notes:"Increase weight if form is good"},{name:"Incline Dumbbell Press",sets:3,reps:10,weight:25},{name:"Cable Flyes",sets:3,reps:12},{name:"Tricep Pushdowns",sets:3,reps:12,weight:30},{name:"Overhead Tricep Extension",sets:3,reps:10,weight:20}],f={args:{data:E,trainer:u,exercises:D}},b={args:{isLoading:!0}},S={args:{error:{message:"Failed to load session details."}}},w={args:{data:void 0}},y={args:{data:Ve,trainer:u,participants:He,exercises:[{name:"Burpees",sets:4,reps:10},{name:"Mountain Climbers",sets:4,reps:20},{name:"Jump Squats",sets:4,reps:15},{name:"Push-ups",sets:4,reps:12},{name:"Plank Hold",sets:3,reps:45,notes:"45 seconds each"}]}},v={args:{data:Ge,trainer:u,exercises:D}},N={args:{data:{...E,status:"in-progress",scheduledAt:new Date},trainer:u,exercises:D}},C={args:{data:{...E,status:"cancelled"},trainer:u}},T={args:{data:{...E,youtubeLink:"https://youtube.com/watch?v=session-recording"},trainer:u,exercises:D}},k={args:{data:{id:"session-min",title:"Quick Session",scheduledAt:new Date,duration:30,status:"scheduled"}}};var M,F,V;f.parameters={...f.parameters,docs:{...(M=f.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    data: sampleSession,
    trainer: sampleTrainer,
    exercises: sampleExercises
  }
}`,...(V=(F=f.parameters)==null?void 0:F.docs)==null?void 0:V.source}}};var G,H,z;b.parameters={...b.parameters,docs:{...(G=b.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    isLoading: true
  }
}`,...(z=(H=b.parameters)==null?void 0:H.docs)==null?void 0:z.source}}};var $,K,O;S.parameters={...S.parameters,docs:{...($=S.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    error: {
      message: "Failed to load session details."
    } as Error
  }
}`,...(O=(K=S.parameters)==null?void 0:K.docs)==null?void 0:O.source}}};var R,_,J;w.parameters={...w.parameters,docs:{...(R=w.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    data: undefined
  }
}`,...(J=(_=w.parameters)==null?void 0:_.docs)==null?void 0:J.source}}};var Q,W,X;y.parameters={...y.parameters,docs:{...(Q=y.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    data: groupSession,
    trainer: sampleTrainer,
    participants: sampleParticipants,
    exercises: [{
      name: "Burpees",
      sets: 4,
      reps: 10
    }, {
      name: "Mountain Climbers",
      sets: 4,
      reps: 20
    }, {
      name: "Jump Squats",
      sets: 4,
      reps: 15
    }, {
      name: "Push-ups",
      sets: 4,
      reps: 12
    }, {
      name: "Plank Hold",
      sets: 3,
      reps: 45,
      notes: "45 seconds each"
    }]
  }
}`,...(X=(W=y.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var Y,Z,ee;v.parameters={...v.parameters,docs:{...(Y=v.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    data: completedSession,
    trainer: sampleTrainer,
    exercises: sampleExercises
  }
}`,...(ee=(Z=v.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var se,ae,re;N.parameters={...N.parameters,docs:{...(se=N.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    data: {
      ...sampleSession,
      status: "in-progress",
      scheduledAt: new Date()
    },
    trainer: sampleTrainer,
    exercises: sampleExercises
  }
}`,...(re=(ae=N.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};var ne,te,ie;C.parameters={...C.parameters,docs:{...(ne=C.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    data: {
      ...sampleSession,
      status: "cancelled"
    },
    trainer: sampleTrainer
  }
}`,...(ie=(te=C.parameters)==null?void 0:te.docs)==null?void 0:ie.source}}};var oe,le,ce;T.parameters={...T.parameters,docs:{...(oe=T.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    data: {
      ...sampleSession,
      youtubeLink: "https://youtube.com/watch?v=session-recording"
    },
    trainer: sampleTrainer,
    exercises: sampleExercises
  }
}`,...(ce=(le=T.parameters)==null?void 0:le.docs)==null?void 0:ce.source}}};var me,de,pe;k.parameters={...k.parameters,docs:{...(me=k.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    data: {
      id: "session-min",
      title: "Quick Session",
      scheduledAt: new Date(),
      duration: 30,
      status: "scheduled"
    }
  }
}`,...(pe=(de=k.parameters)==null?void 0:de.docs)==null?void 0:pe.source}}};const bs=["Default","Loading","Error","NotFound","GroupSession","CompletedSession","InProgressSession","CancelledSession","WithVideoLink","MinimalData"];export{C as CancelledSession,v as CompletedSession,f as Default,S as Error,y as GroupSession,N as InProgressSession,b as Loading,k as MinimalData,w as NotFound,T as WithVideoLink,bs as __namedExportsOrder,fs as default};
