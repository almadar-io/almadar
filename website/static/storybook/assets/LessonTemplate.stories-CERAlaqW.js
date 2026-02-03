import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as U}from"./index-GiUgBvb1.js";import{B as r}from"./Box-DYJzRMmP.js";import{H as n,V as i}from"./Stack-1XI3stiC.js";import{C as G}from"./Card-Bmes-tNK.js";import{S as $}from"./SegmentRenderer-DX42oBbk.js";import{u as K}from"./useEventBus-BNZMNlv8.js";import{M as X}from"./menu-DUN0as2h.js";import{C as g}from"./check-circle-DX_bNA1C.js";import{X as Y}from"./x-prXd1WI5.js";import{C as J}from"./chevron-left-zGYeMbNT.js";import{C as Q}from"./chevron-right-pDF_OUfd.js";import"./cn-BNf5BS2b.js";import"./CodeBlock-uF8EdpE9.js";import"./Button-B7t-_IKa.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./Badge-Dd4QqFOk.js";import"./check-DliVttWt.js";import"./copy-B40iJsJp.js";import"./MarkdownContent-OWRRFu5Z.js";import"./ActivationBlock-C7dmry_L.js";import"./Textarea-C8Aqv8YN.js";import"./Typography-Wmkp-g7N.js";import"./Icon-T0wFb734.js";import"./lock-BpRazVO9.js";import"./share-2-BGRL1FH9.js";import"./zap-DLdLcnjT.js";import"./refresh-cw-Ocr-wooT.js";import"./external-link-k_e-i1vS.js";import"./link-Csz5KqWX.js";import"./home-JwtCVJF2.js";import"./star-D_3mxVsm.js";import"./clock-DT9ve7xf.js";import"./calendar-rGtwHcH_.js";import"./pause-BGY7Ki7b.js";import"./play-C6U2eifx.js";import"./eye-DPfPdwVp.js";import"./list-B6-UEXVq.js";import"./grid-3x3-DCQtfzd8.js";import"./filter-CMfXM6HV.js";import"./search-CCKipEn6.js";import"./settings-DBj1i3lR.js";import"./user-plus-BlQDsowZ.js";import"./users-CV1mGUsS.js";import"./user-BePscFH1.js";import"./phone-XSC4O3No.js";import"./send-CHVRrjpn.js";import"./message-circle-Yw7MGdXs.js";import"./mail-CI1Ybt8r.js";import"./download-yLSRVNFt.js";import"./file-text-DZQctV9o.js";import"./save-DyJeJ3Zl.js";import"./trash-2-ChlfdFMf.js";import"./square-pen-D7sL1yO_.js";import"./minus-CvoF9liV.js";import"./plus-jSzJaRn3.js";import"./info-CF8EgE8A.js";import"./alert-triangle-BLuUOBNm.js";import"./alert-circle-CBFh8Gcj.js";import"./arrow-left-CMPuXvFr.js";import"./arrow-right-BdVPe8wH.js";import"./chevron-up-B8qTw58L.js";import"./chevron-down-BQmz_Bpa.js";import"./Card-BNT5PrJ5.js";import"./lightbulb-BScBdEp_.js";import"./ConnectionBlock-DJvj-Aik.js";import"./link-2-Dn-_D5jQ.js";import"./ReflectionBlock-CQA7TcNG.js";import"./pause-circle-CcmpY60R.js";import"./BloomQuizBlock-B88UHy7e.js";const h=({entity:s,sidebarItems:z=[],hasPrevious:q=!1,hasNext:R=!1,readingProgress:M=0,className:O="",headerContent:B,footerContent:F})=>{const{emit:a}=K(),[u,o]=U.useState(!1),V=()=>{a("UI:LESSON_COMPLETE",{lessonId:s.id})},W=()=>{a("UI:LESSON_NEXT",{currentLessonId:s.id})},A=()=>{a("UI:LESSON_PREV",{currentLessonId:s.id})},D=()=>{o(!u),a("UI:TOGGLE_SIDEBAR",{open:!u})},H=t=>{a("UI:SELECT_LESSON",{lessonId:t}),o(!1)};return e.jsxs(r,{className:`min-h-screen bg-gray-50 ${O}`,children:[e.jsxs("header",{className:"fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200",children:[e.jsxs(n,{justify:"between",align:"center",className:"px-4 h-14",children:[e.jsxs(n,{gap:"sm",align:"center",children:[e.jsx("button",{onClick:D,className:"p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded",children:e.jsx(X,{size:20})}),e.jsxs(i,{gap:"none",className:"min-w-0",children:[s.courseTitle&&e.jsx("span",{className:"text-xs text-gray-500 truncate",children:s.courseTitle}),e.jsx("span",{className:"font-medium text-gray-900 truncate",children:s.title})]})]}),e.jsxs(n,{gap:"sm",align:"center",children:[s.isCompleted&&e.jsxs("span",{className:"px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded flex items-center gap-1",children:[e.jsx(g,{size:12}),"Completed"]}),s.courseProgress!==void 0&&e.jsxs(n,{gap:"xs",align:"center",className:"w-32",children:[e.jsx(r,{className:"flex-1 h-2 bg-gray-200 rounded-full overflow-hidden",children:e.jsx(r,{className:"h-full bg-indigo-500",style:{width:`${s.courseProgress}%`}})}),e.jsxs("span",{className:"text-xs text-gray-500",children:[s.courseProgress,"%"]})]}),B]})]}),e.jsx(r,{className:"h-1 bg-gray-100",children:e.jsx(r,{className:"h-full bg-indigo-600 transition-all duration-300",style:{width:`${M}%`}})})]}),u&&e.jsxs(e.Fragment,{children:[e.jsx(r,{className:"fixed inset-0 bg-black/50 z-40",onClick:()=>o(!1)}),e.jsxs("aside",{className:"fixed top-0 left-0 bottom-0 w-80 bg-white z-50 overflow-y-auto",children:[e.jsxs(n,{justify:"between",align:"center",className:"p-4 border-b border-gray-200",children:[e.jsx("span",{className:"font-semibold text-gray-900",children:"Course Content"}),e.jsx("button",{onClick:()=>o(!1),className:"p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded",children:e.jsx(Y,{size:20})})]}),e.jsx(i,{gap:"none",className:"p-2",children:z.map(t=>e.jsx("button",{onClick:()=>H(t.id),className:`w-full text-left px-3 py-2 rounded text-sm transition-colors ${t.isCurrent?"bg-indigo-50 text-indigo-700 font-medium":t.isCompleted?"text-gray-500":"text-gray-700 hover:bg-gray-50"}`,children:e.jsxs(n,{gap:"sm",align:"center",children:[t.isCompleted&&e.jsx(g,{size:14,className:"text-green-500"}),e.jsx("span",{className:"truncate",children:t.title})]})},t.id))})]})]}),e.jsx("main",{className:"pt-20 pb-24",children:e.jsx("article",{className:"max-w-3xl mx-auto px-4",children:e.jsxs(i,{gap:"lg",children:[e.jsxs(i,{gap:"sm",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-900",children:s.title}),s.duration&&e.jsxs("span",{className:"text-sm text-gray-500",children:[s.duration," min read"]})]}),s.segments&&s.segments.length>0?e.jsx($,{segments:s.segments}):e.jsx(G,{children:e.jsx("div",{className:"prose prose-indigo max-w-none",dangerouslySetInnerHTML:{__html:s.content}})}),!s.isCompleted&&e.jsx(r,{className:"text-center py-8",children:e.jsxs("button",{onClick:V,className:"px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 flex items-center gap-2 mx-auto",children:[e.jsx(g,{size:20}),"Mark as Complete"]})})]})})}),e.jsx("footer",{className:"fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30",children:e.jsxs(n,{justify:"between",align:"center",className:"max-w-3xl mx-auto px-4 py-3",children:[e.jsxs("button",{onClick:A,disabled:!q,className:"px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1",children:[e.jsx(J,{size:16}),"Previous"]}),F||e.jsx("span",{className:"text-sm text-gray-500",children:s.isCompleted?"Lesson completed!":"Keep learning..."}),e.jsxs("button",{onClick:W,disabled:!R,className:"px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1",children:["Next",e.jsx(Q,{size:16})]})]})})]})};h.displayName="LessonTemplate";h.__docgenInfo={description:"",methods:[],displayName:"LessonTemplate",props:{entity:{required:!0,tsType:{name:"LessonEntity"},description:"Lesson entity data"},sidebarItems:{required:!1,tsType:{name:"Array",elements:[{name:"SidebarItem"}],raw:"SidebarItem[]"},description:"Sidebar items (other lessons)",defaultValue:{value:"[]",computed:!1}},hasPrevious:{required:!1,tsType:{name:"boolean"},description:"Has previous lesson",defaultValue:{value:"false",computed:!1}},hasNext:{required:!1,tsType:{name:"boolean"},description:"Has next lesson",defaultValue:{value:"false",computed:!1}},readingProgress:{required:!1,tsType:{name:"number"},description:"Reading progress (0-100)",defaultValue:{value:"0",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes",defaultValue:{value:"''",computed:!1}},headerContent:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Custom header content"},footerContent:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Custom footer content"}}};const xs={title:"KFlow/Templates/LessonTemplate",component:h,parameters:{layout:"fullscreen"},tags:["autodocs"]},E=[{type:"markdown",content:`## Introduction to Neural Networks

Neural networks are computing systems inspired by biological neural networks that constitute animal brains. They are designed to recognize patterns and interpret data through a form of machine perception.

### Key Concepts

1. **Neurons** - The basic units of computation
2. **Weights** - Parameters that are learned during training
3. **Activation Functions** - Non-linear functions that enable complex mappings
`},{type:"code",content:`import torch.nn as nn

class SimpleNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.layer1 = nn.Linear(10, 5)
        self.layer2 = nn.Linear(5, 1)

    def forward(self, x):
        x = torch.relu(self.layer1(x))
        return self.layer2(x)`,language:"python"},{type:"markdown",content:`### Training Process

The training process involves:
- Forward propagation
- Loss calculation
- Backward propagation
- Weight updates
`}],_=[{id:"1",title:"Introduction to ML",isCompleted:!0},{id:"2",title:"Neural Networks Basics",isCurrent:!0},{id:"3",title:"Backpropagation"},{id:"4",title:"Optimization Techniques"},{id:"5",title:"Regularization"}],l={args:{entity:{id:"lesson-1",title:"Introduction to Neural Networks",content:"<p>This is the lesson content.</p>",segments:E,duration:15,courseTitle:"Machine Learning Fundamentals",courseProgress:40},sidebarItems:_,hasPrevious:!0,hasNext:!0,readingProgress:35}},c={args:{entity:{id:"lesson-2",title:"Completed Lesson",content:"<p>You have completed this lesson.</p>",duration:10,isCompleted:!0,courseTitle:"Python Basics",courseProgress:100},hasPrevious:!0,hasNext:!1,readingProgress:100}},d={args:{entity:{id:"lesson-0",title:"Getting Started",content:"<p>Welcome to the course!</p>",duration:5,courseTitle:"Introduction Course",courseProgress:0},sidebarItems:_,hasPrevious:!1,hasNext:!0,readingProgress:0}},m={args:{entity:{id:"lesson-3",title:"Advanced Neural Networks",content:"",segments:[...E,{type:"quiz",question:"What is the main purpose of an activation function?",answer:"To introduce non-linearity into the network, allowing it to learn complex patterns that linear functions cannot represent."},{type:"bloom",level:"understand",question:"Explain why neural networks need multiple layers.",answer:"Multiple layers allow the network to learn hierarchical representations of data, with each layer learning increasingly abstract features."}],duration:25,courseTitle:"Deep Learning",courseProgress:60},hasPrevious:!0,hasNext:!0,readingProgress:50}},p={args:{entity:{id:"lesson-4",title:"Standalone Lesson",content:"<p>This lesson has no course context.</p>",duration:8},hasPrevious:!1,hasNext:!1}};var x,f,y;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    entity: {
      id: "lesson-1",
      title: "Introduction to Neural Networks",
      content: "<p>This is the lesson content.</p>",
      segments: sampleSegments,
      duration: 15,
      courseTitle: "Machine Learning Fundamentals",
      courseProgress: 40
    },
    sidebarItems: sampleSidebarItems,
    hasPrevious: true,
    hasNext: true,
    readingProgress: 35
  }
}`,...(y=(f=l.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var N,b,w;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    entity: {
      id: "lesson-2",
      title: "Completed Lesson",
      content: "<p>You have completed this lesson.</p>",
      duration: 10,
      isCompleted: true,
      courseTitle: "Python Basics",
      courseProgress: 100
    },
    hasPrevious: true,
    hasNext: false,
    readingProgress: 100
  }
}`,...(w=(b=c.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var j,v,C;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    entity: {
      id: "lesson-0",
      title: "Getting Started",
      content: "<p>Welcome to the course!</p>",
      duration: 5,
      courseTitle: "Introduction Course",
      courseProgress: 0
    },
    sidebarItems: sampleSidebarItems,
    hasPrevious: false,
    hasNext: true,
    readingProgress: 0
  }
}`,...(C=(v=d.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var S,T,P;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    entity: {
      id: "lesson-3",
      title: "Advanced Neural Networks",
      content: "",
      segments: [...sampleSegments, {
        type: "quiz" as const,
        question: "What is the main purpose of an activation function?",
        answer: "To introduce non-linearity into the network, allowing it to learn complex patterns that linear functions cannot represent."
      }, {
        type: "bloom" as const,
        level: "understand",
        question: "Explain why neural networks need multiple layers.",
        answer: "Multiple layers allow the network to learn hierarchical representations of data, with each layer learning increasingly abstract features."
      }],
      duration: 25,
      courseTitle: "Deep Learning",
      courseProgress: 60
    },
    hasPrevious: true,
    hasNext: true,
    readingProgress: 50
  }
}`,...(P=(T=m.parameters)==null?void 0:T.docs)==null?void 0:P.source}}};var L,k,I;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    entity: {
      id: "lesson-4",
      title: "Standalone Lesson",
      content: "<p>This lesson has no course context.</p>",
      duration: 8
    },
    hasPrevious: false,
    hasNext: false
  }
}`,...(I=(k=p.parameters)==null?void 0:k.docs)==null?void 0:I.source}}};const fs=["Default","Completed","FirstLesson","WithSegments","NoSidebar"];export{c as Completed,l as Default,d as FirstLesson,p as NoSidebar,m as WithSegments,fs as __namedExportsOrder,xs as default};
