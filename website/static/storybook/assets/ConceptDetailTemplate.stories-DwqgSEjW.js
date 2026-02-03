import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as H}from"./index-GiUgBvb1.js";import{B as x}from"./Box-DYJzRMmP.js";import{H as t,V as r}from"./Stack-1XI3stiC.js";import{C as i}from"./Card-Bmes-tNK.js";import{S as $}from"./SegmentRenderer-DX42oBbk.js";import{F as K}from"./FlashCardStack-w-P1GXyZ.js";import{C as Z}from"./ConceptMetaTags-BohXwPUW.js";import{L as Q}from"./LearningGoalDisplay-DlqtVzCl.js";import{u as J}from"./useEventBus-BNZMNlv8.js";import{A as X}from"./arrow-left-CMPuXvFr.js";import{L as Y}from"./layers-BDYQqVNI.js";import{C as ee}from"./chevron-right-pDF_OUfd.js";import{B as b}from"./book-open-Bc_pgR1e.js";import{c as se}from"./createLucideIcon-CbHznvEr.js";import{P as ae}from"./play-circle-CWtX3MJx.js";import"./cn-BNf5BS2b.js";import"./CodeBlock-uF8EdpE9.js";import"./Button-B7t-_IKa.js";import"./loader-2-DXp1ic5P.js";import"./Badge-Dd4QqFOk.js";import"./check-DliVttWt.js";import"./copy-B40iJsJp.js";import"./MarkdownContent-OWRRFu5Z.js";import"./ActivationBlock-C7dmry_L.js";import"./Textarea-C8Aqv8YN.js";import"./Typography-Wmkp-g7N.js";import"./Icon-T0wFb734.js";import"./lock-BpRazVO9.js";import"./share-2-BGRL1FH9.js";import"./zap-DLdLcnjT.js";import"./refresh-cw-Ocr-wooT.js";import"./external-link-k_e-i1vS.js";import"./link-Csz5KqWX.js";import"./home-JwtCVJF2.js";import"./star-D_3mxVsm.js";import"./clock-DT9ve7xf.js";import"./calendar-rGtwHcH_.js";import"./pause-BGY7Ki7b.js";import"./play-C6U2eifx.js";import"./eye-DPfPdwVp.js";import"./list-B6-UEXVq.js";import"./grid-3x3-DCQtfzd8.js";import"./filter-CMfXM6HV.js";import"./search-CCKipEn6.js";import"./settings-DBj1i3lR.js";import"./user-plus-BlQDsowZ.js";import"./users-CV1mGUsS.js";import"./user-BePscFH1.js";import"./phone-XSC4O3No.js";import"./send-CHVRrjpn.js";import"./message-circle-Yw7MGdXs.js";import"./mail-CI1Ybt8r.js";import"./download-yLSRVNFt.js";import"./file-text-DZQctV9o.js";import"./save-DyJeJ3Zl.js";import"./trash-2-ChlfdFMf.js";import"./square-pen-D7sL1yO_.js";import"./minus-CvoF9liV.js";import"./plus-jSzJaRn3.js";import"./info-CF8EgE8A.js";import"./alert-triangle-BLuUOBNm.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";import"./menu-DUN0as2h.js";import"./x-prXd1WI5.js";import"./arrow-right-BdVPe8wH.js";import"./chevron-up-B8qTw58L.js";import"./chevron-down-BQmz_Bpa.js";import"./chevron-left-zGYeMbNT.js";import"./Card-BNT5PrJ5.js";import"./lightbulb-BScBdEp_.js";import"./ConnectionBlock-DJvj-Aik.js";import"./link-2-Dn-_D5jQ.js";import"./ReflectionBlock-CQA7TcNG.js";import"./pause-circle-CcmpY60R.js";import"./BloomQuizBlock-B88UHy7e.js";import"./FlashCard-DT7Ss_vD.js";import"./rotate-ccw-cyxkXXLc.js";import"./target-Dfqc9R93.js";import"./pen-DNARvM59.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=se("Brain",[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",key:"ep3f8r"}],["path",{d:"M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4",key:"1p4c4q"}],["path",{d:"M17.599 6.5a3 3 0 0 0 .399-1.375",key:"tmeiqw"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M19.938 10.5a4 4 0 0 1 .585.396",key:"1qfode"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M19.967 17.484A4 4 0 0 1 18 18",key:"159ez6"}]]),f=({entity:s,graphId:W,showBack:F=!0,className:z=""})=>{const{emit:n}=J(),[o,u]=H.useState("overview"),D=()=>{n("UI:BACK",{fromConcept:s.id})},P=()=>{u("lesson"),n("UI:START_LESSON",{conceptId:s.id})},O=()=>{u("practice"),n("UI:START_PRACTICE",{conceptId:s.id})},V=a=>{n("UI:NAVIGATE_PREREQUISITE",{prerequisiteName:a,fromConcept:s.id})};return e.jsxs(x,{className:`min-h-screen bg-gray-50 ${z}`,children:[e.jsxs("header",{className:"bg-white border-b border-gray-200 sticky top-0 z-10",children:[e.jsxs(t,{justify:"between",align:"center",className:"max-w-4xl mx-auto px-4 py-4",children:[F&&e.jsxs("button",{onClick:D,className:"p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded flex items-center gap-1",children:[e.jsx(X,{size:20}),e.jsx("span",{className:"text-sm",children:"Back"})]}),e.jsx(t,{gap:"sm",children:s.layer!==void 0&&e.jsxs("span",{className:"px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded flex items-center gap-1",children:[e.jsx(Y,{size:12}),"Layer ",s.layer]})})]}),e.jsx(t,{gap:"none",className:"max-w-4xl mx-auto px-4 border-t border-gray-100",children:["overview","lesson","practice"].map(a=>e.jsx("button",{onClick:()=>u(a),className:`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${o===a?"border-indigo-500 text-indigo-600":"border-transparent text-gray-500 hover:text-gray-700"}`,children:a.charAt(0).toUpperCase()+a.slice(1)},a))})]}),e.jsxs("main",{className:"max-w-4xl mx-auto px-4 py-6",children:[o==="overview"&&e.jsxs(r,{gap:"lg",children:[e.jsxs(r,{gap:"sm",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-900",children:s.name}),s.description&&e.jsx("p",{className:"text-gray-600 text-lg",children:s.description})]}),e.jsx(Z,{layer:s.layer,isSeed:s.isSeed,parents:s.parents||[]}),s.learningGoal&&e.jsx(Q,{goal:s.learningGoal,layerNumber:s.layer||0,graphId:W}),s.prerequisites&&s.prerequisites.length>0&&e.jsx(i,{children:e.jsxs(r,{gap:"sm",children:[e.jsx("span",{className:"font-semibold text-gray-900",children:"Prerequisites"}),e.jsx(r,{gap:"xs",children:s.prerequisites.map(a=>e.jsxs("button",{onClick:()=>V(a),className:"text-left px-3 py-2 bg-gray-50 rounded hover:bg-gray-100 text-gray-700 flex items-center justify-between",children:[e.jsx("span",{children:a}),e.jsx(ee,{size:16,className:"text-gray-400"})]},a))})]})}),s.progress!==void 0&&e.jsx(i,{children:e.jsxs(r,{gap:"sm",children:[e.jsxs(t,{justify:"between",align:"center",children:[e.jsx("span",{className:"font-semibold text-gray-900",children:"Progress"}),e.jsxs("span",{className:"text-sm text-gray-500",children:[s.progress,"%"]})]}),e.jsx(x,{className:"w-full h-2 bg-gray-200 rounded-full overflow-hidden",children:e.jsx(x,{className:"h-full bg-indigo-500 transition-all",style:{width:`${s.progress}%`}})})]})}),e.jsxs(t,{gap:"md",wrap:!0,children:[s.hasLesson&&e.jsxs("button",{onClick:P,className:"px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 flex items-center gap-2",children:[e.jsx(b,{size:20}),"Start Lesson"]}),s.flashcards&&s.flashcards.length>0&&e.jsxs("button",{onClick:O,className:"px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 flex items-center gap-2",children:[e.jsx(y,{size:20}),"Practice (",s.flashcards.length," cards)"]})]})]}),o==="lesson"&&e.jsx(r,{gap:"lg",children:s.lessonSegments&&s.lessonSegments.length>0?e.jsx($,{segments:s.lessonSegments}):e.jsx(i,{children:e.jsxs(r,{gap:"md",align:"center",className:"py-12",children:[e.jsx(b,{size:48,className:"text-gray-300"}),e.jsx("span",{className:"text-gray-500",children:"No lesson content available"}),!s.hasLesson&&e.jsxs("button",{onClick:()=>n("UI:GENERATE_LESSON",{conceptId:s.id}),className:"px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center gap-2",children:[e.jsx(ae,{size:16}),"Generate Lesson"]})]})})}),o==="practice"&&e.jsx(r,{gap:"lg",children:s.flashcards&&s.flashcards.length>0?e.jsx(K,{cards:s.flashcards}):e.jsx(i,{children:e.jsxs(r,{gap:"md",align:"center",className:"py-12",children:[e.jsx(y,{size:48,className:"text-gray-300"}),e.jsx("span",{className:"text-gray-500",children:"No practice cards available"})]})})})]})]})};f.displayName="ConceptDetailTemplate";f.__docgenInfo={description:"",methods:[],displayName:"ConceptDetailTemplate",props:{entity:{required:!0,tsType:{name:"ConceptEntity"},description:"Concept entity data"},graphId:{required:!1,tsType:{name:"string"},description:"Graph ID for context"},showBack:{required:!1,tsType:{name:"boolean"},description:"Show back button",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes",defaultValue:{value:"''",computed:!1}}}};const As={title:"KFlow/Templates/ConceptDetailTemplate",component:f,parameters:{layout:"fullscreen"},tags:["autodocs"]},h=[{type:"markdown",content:`## Understanding Backpropagation

Backpropagation is the fundamental algorithm used to train neural networks. It calculates the gradient of the loss function with respect to each weight by propagating the error backward through the network.

### The Chain Rule

The chain rule of calculus is essential to understanding backpropagation. It allows us to compute derivatives of composite functions.
`},{type:"code",content:`def backward(self, grad_output):
    # Compute gradients
    grad_weights = np.dot(self.input.T, grad_output)
    grad_input = np.dot(grad_output, self.weights.T)

    # Update weights
    self.weights -= learning_rate * grad_weights

    return grad_input`,language:"python"}],U=[{id:"1",front:"What is backpropagation?",back:"An algorithm for calculating gradients by propagating errors backward through a network."},{id:"2",front:"What mathematical rule is essential to backpropagation?",back:"The chain rule of calculus."},{id:"3",front:"What do we update during backpropagation?",back:"The weights of the neural network."}],c={args:{entity:{id:"concept-1",name:"Backpropagation",description:"The fundamental algorithm for training neural networks by computing gradients through the chain rule.",layer:2,prerequisites:["Gradient Descent","Chain Rule","Neural Network Basics"],parents:["Neural Networks","Optimization"],learningGoal:"Understand how backpropagation works and be able to implement it from scratch.",hasLesson:!0,lessonSegments:h,flashcards:U,progress:45},graphId:"ml-course-1"}},l={args:{entity:{id:"concept-2",name:"Transformer Architecture",description:"The architecture behind modern language models like GPT and BERT.",layer:4,prerequisites:["Attention Mechanism","Embeddings"],parents:["Deep Learning"],hasLesson:!1,progress:0}}},p={args:{entity:{id:"concept-3",name:"Mathematics Foundations",description:"Core mathematical concepts needed for machine learning.",layer:0,isSeed:!0,learningGoal:"Build a strong foundation in linear algebra, calculus, and probability.",hasLesson:!0,lessonSegments:h,progress:100}}},m={args:{entity:{id:"concept-4",name:"Activation Functions",description:"Non-linear functions used in neural networks.",layer:1,flashcards:[{id:"1",front:"What is ReLU?",back:"Rectified Linear Unit: f(x) = max(0, x)"},{id:"2",front:"What is Sigmoid?",back:"f(x) = 1 / (1 + e^(-x))"},{id:"3",front:"What is Tanh?",back:"Hyperbolic tangent: f(x) = (e^x - e^(-x)) / (e^x + e^(-x))"},{id:"4",front:"Why use activation functions?",back:"To introduce non-linearity, enabling the network to learn complex patterns."}],hasLesson:!1,progress:25}}},d={args:{entity:{id:"concept-5",name:"Linear Regression",description:"The simplest form of supervised learning.",layer:1,prerequisites:["Statistics Basics"],parents:["Machine Learning"],learningGoal:"Master linear regression and understand its assumptions.",hasLesson:!0,lessonSegments:h,flashcards:U.map(s=>({...s,studied:!0})),progress:100}}},g={args:{entity:{id:"concept-6",name:"Introduction",description:"Welcome to the course.",layer:0,hasLesson:!0,lessonSegments:h},showBack:!1}};var k,j,w;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    entity: {
      id: 'concept-1',
      name: 'Backpropagation',
      description: 'The fundamental algorithm for training neural networks by computing gradients through the chain rule.',
      layer: 2,
      prerequisites: ['Gradient Descent', 'Chain Rule', 'Neural Network Basics'],
      parents: ['Neural Networks', 'Optimization'],
      learningGoal: 'Understand how backpropagation works and be able to implement it from scratch.',
      hasLesson: true,
      lessonSegments: sampleLessonSegments,
      flashcards: sampleFlashcards,
      progress: 45
    },
    graphId: 'ml-course-1'
  }
}`,...(w=(j=c.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var N,S,L;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    entity: {
      id: 'concept-2',
      name: 'Transformer Architecture',
      description: 'The architecture behind modern language models like GPT and BERT.',
      layer: 4,
      prerequisites: ['Attention Mechanism', 'Embeddings'],
      parents: ['Deep Learning'],
      hasLesson: false,
      progress: 0
    }
  }
}`,...(L=(S=l.parameters)==null?void 0:S.docs)==null?void 0:L.source}}};var T,C,v;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    entity: {
      id: 'concept-3',
      name: 'Mathematics Foundations',
      description: 'Core mathematical concepts needed for machine learning.',
      layer: 0,
      isSeed: true,
      learningGoal: 'Build a strong foundation in linear algebra, calculus, and probability.',
      hasLesson: true,
      lessonSegments: sampleLessonSegments,
      progress: 100
    }
  }
}`,...(v=(C=p.parameters)==null?void 0:C.docs)==null?void 0:v.source}}};var B,A,I;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    entity: {
      id: 'concept-4',
      name: 'Activation Functions',
      description: 'Non-linear functions used in neural networks.',
      layer: 1,
      flashcards: [{
        id: '1',
        front: 'What is ReLU?',
        back: 'Rectified Linear Unit: f(x) = max(0, x)'
      }, {
        id: '2',
        front: 'What is Sigmoid?',
        back: 'f(x) = 1 / (1 + e^(-x))'
      }, {
        id: '3',
        front: 'What is Tanh?',
        back: 'Hyperbolic tangent: f(x) = (e^x - e^(-x)) / (e^x + e^(-x))'
      }, {
        id: '4',
        front: 'Why use activation functions?',
        back: 'To introduce non-linearity, enabling the network to learn complex patterns.'
      }],
      hasLesson: false,
      progress: 25
    }
  }
}`,...(I=(A=m.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var R,q,E;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    entity: {
      id: 'concept-5',
      name: 'Linear Regression',
      description: 'The simplest form of supervised learning.',
      layer: 1,
      prerequisites: ['Statistics Basics'],
      parents: ['Machine Learning'],
      learningGoal: 'Master linear regression and understand its assumptions.',
      hasLesson: true,
      lessonSegments: sampleLessonSegments,
      flashcards: sampleFlashcards.map(c => ({
        ...c,
        studied: true
      })),
      progress: 100
    }
  }
}`,...(E=(q=d.parameters)==null?void 0:q.docs)==null?void 0:E.source}}};var M,G,_;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    entity: {
      id: 'concept-6',
      name: 'Introduction',
      description: 'Welcome to the course.',
      layer: 0,
      hasLesson: true,
      lessonSegments: sampleLessonSegments
    },
    showBack: false
  }
}`,...(_=(G=g.parameters)==null?void 0:G.docs)==null?void 0:_.source}}};const Is=["Default","NoLesson","SeedConcept","WithFlashcardsOnly","FullyCompleted","NoBackButton"];export{c as Default,d as FullyCompleted,g as NoBackButton,l as NoLesson,p as SeedConcept,m as WithFlashcardsOnly,Is as __namedExportsOrder,As as default};
