import{F as Q}from"./FlashCardStack-Cpb4BYIv.js";import"./jsx-runtime-CDt2p4po.js";import"./index-GiUgBvb1.js";import"./Stack-DhhoTPuC.js";import"./cn-BNf5BS2b.js";import"./Card-Bmes-tNK.js";import"./FlashCard-W1LivJee.js";import"./Box-DYJzRMmP.js";import"./useEventBus-BNZMNlv8.js";import"./check-DliVttWt.js";import"./createLucideIcon-CbHznvEr.js";import"./rotate-ccw-cyxkXXLc.js";import"./check-circle-DX_bNA1C.js";const Z={title:"KFlow/Organisms/FlashCardStack",component:Q,parameters:{layout:"centered"},tags:["autodocs"]},m=[{id:"1",front:"What is the capital of France?",back:"Paris"},{id:"2",front:"What is 2 + 2?",back:"4"},{id:"3",front:"What is H₂O?",back:"Water"},{id:"4",front:"What planet is known as the Red Planet?",back:"Mars"},{id:"5",front:"Who wrote Romeo and Juliet?",back:"William Shakespeare"}],s={args:{cards:m}},e={args:{cards:[]}},n={args:{cards:[{id:"1",front:"Only one card",back:"Just this one!"}]}},t={args:{cards:[{id:"1",front:"Studied card 1",back:"Answer 1",studied:!0},{id:"2",front:"Studied card 2",back:"Answer 2",studied:!0},{id:"3",front:"Not studied yet",back:"Answer 3"},{id:"4",front:"Also not studied",back:"Answer 4"},{id:"5",front:"Need to study this",back:"Answer 5"}],currentIndex:2}},d={args:{cards:m.map(r=>({...r,studied:!0}))}},o={args:{cards:m,showShuffle:!1}},c={args:{cards:m.map(r=>({...r,studied:!0})),showSummary:!1}},i={args:{cards:Array.from({length:20},(r,a)=>({id:`card-${a+1}`,front:`Question ${a+1}`,back:`Answer ${a+1}`,studied:a<7})),currentIndex:7}},u={args:{cards:[{id:"1",front:"What is the derivative of x²?",back:"2x"},{id:"2",front:"What is ∫x dx?",back:"x²/2 + C"},{id:"3",front:"What is sin²θ + cos²θ?",back:"1"},{id:"4",front:"What is the quadratic formula?",back:"x = (-b ± √(b²-4ac)) / 2a"},{id:"5",front:"What is e^(iπ) + 1?",back:"0 (Euler's identity)"}]}};var p,l,f;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    cards: sampleCards
  }
}`,...(f=(l=s.parameters)==null?void 0:l.docs)==null?void 0:f.source}}};var h,b,g;e.parameters={...e.parameters,docs:{...(h=e.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    cards: []
  }
}`,...(g=(b=e.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var k,S,y;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    cards: [{
      id: '1',
      front: 'Only one card',
      back: 'Just this one!'
    }]
  }
}`,...(y=(S=n.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var w,x,A;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    cards: [{
      id: '1',
      front: 'Studied card 1',
      back: 'Answer 1',
      studied: true
    }, {
      id: '2',
      front: 'Studied card 2',
      back: 'Answer 2',
      studied: true
    }, {
      id: '3',
      front: 'Not studied yet',
      back: 'Answer 3'
    }, {
      id: '4',
      front: 'Also not studied',
      back: 'Answer 4'
    }, {
      id: '5',
      front: 'Need to study this',
      back: 'Answer 5'
    }],
    currentIndex: 2
  }
}`,...(A=(x=t.parameters)==null?void 0:x.docs)==null?void 0:A.source}}};var W,C,N;d.parameters={...d.parameters,docs:{...(W=d.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    cards: sampleCards.map(card => ({
      ...card,
      studied: true
    }))
  }
}`,...(N=(C=d.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};var $,E,F;o.parameters={...o.parameters,docs:{...($=o.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    cards: sampleCards,
    showShuffle: false
  }
}`,...(F=(E=o.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};var M,O,v;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    cards: sampleCards.map(card => ({
      ...card,
      studied: true
    })),
    showSummary: false
  }
}`,...(v=(O=c.parameters)==null?void 0:O.docs)==null?void 0:v.source}}};var I,P,_;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    cards: Array.from({
      length: 20
    }, (_, i) => ({
      id: \`card-\${i + 1}\`,
      front: \`Question \${i + 1}\`,
      back: \`Answer \${i + 1}\`,
      studied: i < 7
    })),
    currentIndex: 7
  }
}`,...(_=(P=i.parameters)==null?void 0:P.docs)==null?void 0:_.source}}};var J,q,D;u.parameters={...u.parameters,docs:{...(J=u.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    cards: [{
      id: '1',
      front: 'What is the derivative of x²?',
      back: '2x'
    }, {
      id: '2',
      front: 'What is ∫x dx?',
      back: 'x²/2 + C'
    }, {
      id: '3',
      front: 'What is sin²θ + cos²θ?',
      back: '1'
    }, {
      id: '4',
      front: 'What is the quadratic formula?',
      back: 'x = (-b ± √(b²-4ac)) / 2a'
    }, {
      id: '5',
      front: 'What is e^(iπ) + 1?',
      back: '0 (Euler\\'s identity)'
    }]
  }
}`,...(D=(q=u.parameters)==null?void 0:q.docs)==null?void 0:D.source}}};const rr=["Default","Empty","SingleCard","PartiallyStudied","AllStudied","NoShuffle","NoSummary","ManyCards","MathCards"];export{d as AllStudied,s as Default,e as Empty,i as ManyCards,u as MathCards,o as NoShuffle,c as NoSummary,t as PartiallyStudied,n as SingleCard,rr as __namedExportsOrder,Z as default};
