import{a as e}from"./index-B-lxVbXh.js";import{S as U}from"./SegmentRenderer-CWRELuD4.js";import"./v4-CtRu48qb.js";import"./jsx-runtime-CDt2p4po.js";import"./index-GiUgBvb1.js";import"./Box-DYJzRMmP.js";import"./cn-BNf5BS2b.js";import"./Stack-DhhoTPuC.js";import"./CodeBlock-BKW3PHWX.js";import"./Button-Dn0472P0.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./Badge-CpH0PNM6.js";import"./useEventBus-BNZMNlv8.js";import"./check-DliVttWt.js";import"./copy-B40iJsJp.js";import"./MarkdownContent-OWRRFu5Z.js";import"./ActivationBlock-DCIkLRGW.js";import"./Textarea-C8Aqv8YN.js";import"./Typography-Wmkp-g7N.js";import"./Icon-DDCXmKGr.js";import"./lock-BpRazVO9.js";import"./share-2-BGRL1FH9.js";import"./zap-DLdLcnjT.js";import"./refresh-cw-Ocr-wooT.js";import"./external-link-k_e-i1vS.js";import"./link-Csz5KqWX.js";import"./home-JwtCVJF2.js";import"./star-D_3mxVsm.js";import"./clock-DT9ve7xf.js";import"./calendar-rGtwHcH_.js";import"./pause-BGY7Ki7b.js";import"./play-C6U2eifx.js";import"./eye-DPfPdwVp.js";import"./list-B6-UEXVq.js";import"./grid-3x3-DCQtfzd8.js";import"./filter-CMfXM6HV.js";import"./search-CCKipEn6.js";import"./settings-DBj1i3lR.js";import"./user-plus-BlQDsowZ.js";import"./users-CV1mGUsS.js";import"./user-BePscFH1.js";import"./phone-XSC4O3No.js";import"./send-CHVRrjpn.js";import"./message-circle-Yw7MGdXs.js";import"./mail-CI1Ybt8r.js";import"./download-yLSRVNFt.js";import"./file-text-DZQctV9o.js";import"./save-DyJeJ3Zl.js";import"./trash-2-ChlfdFMf.js";import"./square-pen-D7sL1yO_.js";import"./minus-CvoF9liV.js";import"./plus-jSzJaRn3.js";import"./info-CF8EgE8A.js";import"./alert-triangle-BLuUOBNm.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";import"./menu-DUN0as2h.js";import"./x-prXd1WI5.js";import"./arrow-left-CMPuXvFr.js";import"./arrow-right-BdVPe8wH.js";import"./chevron-up-B8qTw58L.js";import"./chevron-down-BQmz_Bpa.js";import"./chevron-left-zGYeMbNT.js";import"./chevron-right-pDF_OUfd.js";import"./Card-BNT5PrJ5.js";import"./lightbulb-BScBdEp_.js";import"./ConnectionBlock-BvMyBNte.js";import"./link-2-Dn-_D5jQ.js";import"./ReflectionBlock-mpqwruh0.js";import"./pause-circle-CcmpY60R.js";import"./BloomQuizBlock-DQ0HN0-o.js";const Ge={title:"KFlow/Organisms/SegmentRenderer",component:U,parameters:{layout:"padded"},tags:["autodocs"]},C=[{type:"markdown",content:`# Introduction to Functions

Functions are one of the fundamental building blocks in programming. They allow you to:

- **Encapsulate** code that performs a specific task
- **Reuse** that code throughout your program
- **Organize** your code into logical units`},{type:"code",language:"javascript",content:`function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World")); // Output: Hello, World!`},{type:"markdown",content:"Notice how the function takes a **parameter** called `name` and uses it to create a personalized greeting."}],_=[{type:"activate",question:"Think about tasks you do repeatedly every day. How might grouping related actions together make them easier to remember and perform?"},{type:"connect",content:"This lesson builds on your understanding of **variables** and **data types**. Functions use these concepts but add a new layer of organization to your code."},{type:"markdown",content:`# Understanding Functions

A function is a reusable block of code designed to perform a particular task. Functions help us:

1. Write **DRY** (Don't Repeat Yourself) code
2. Break complex problems into smaller parts
3. Make code more readable and maintainable`},{type:"code",language:"python",content:`def calculate_area(width, height):
    """Calculate the area of a rectangle."""
    return width * height

# Using the function
room_area = calculate_area(10, 12)
print(f"The room area is {room_area} square feet")`},{type:"reflect",prompt:"How might using functions change the way you approach writing a program? Think about a project you've worked on that could benefit from functions."},{type:"markdown",content:`## Function Parameters

Parameters are variables that act as placeholders for the values that will be passed to the function when it's called.`},{type:"bloom",level:"remember",question:"What are the two main parts of a function definition?",answer:`The two main parts are:
1. **Function signature** - includes the function name and parameters
2. **Function body** - the code that executes when the function is called`},{type:"bloom",level:"apply",question:"Write a function that takes two numbers and returns their average.",answer:"```python\ndef average(a, b):\n    return (a + b) / 2\n\n# Test\nprint(average(10, 20))  # Output: 15.0\n```"}],F=[{type:"markdown",content:`## Quick Quiz

Test your understanding with these questions:`},{type:"quiz",question:"What keyword is used to define a function in Python?",answer:"The `def` keyword is used to define functions in Python."},{type:"quiz",question:"What is the difference between a parameter and an argument?",answer:"A **parameter** is the variable in the function definition, while an **argument** is the actual value passed to the function when it's called."}],t={args:{segments:C,conceptId:"concept-functions-intro",onSaveActivation:e("UI:SAVE_ACTIVATION"),onSaveReflection:e("UI:SAVE_REFLECTION"),onAnswerBloom:e("UI:ANSWER_BLOOM")}},n={args:{segments:_,conceptId:"concept-functions-full",onSaveActivation:e("UI:SAVE_ACTIVATION"),onSaveReflection:e("UI:SAVE_REFLECTION"),onAnswerBloom:e("UI:ANSWER_BLOOM")}},o={args:{segments:_,conceptId:"concept-functions-full",userProgress:{activationResponse:"I brush my teeth the same way every morning - it's like a routine or function!",reflectionNotes:["I think functions would help me avoid copy-pasting code when I need to do the same calculation multiple times."],bloomAnswered:{0:!0}},onSaveActivation:e("UI:SAVE_ACTIVATION"),onSaveReflection:e("UI:SAVE_REFLECTION"),onAnswerBloom:e("UI:ANSWER_BLOOM")}},r={args:{segments:F,conceptId:"concept-quiz"}},a={args:{segments:[{type:"markdown",content:`# Pure Markdown Content

This example shows the SegmentRenderer with only markdown content.

## Features

- **Bold text** and *italic text*
- Lists like this one
- Code like \`console.log()\`

## Tables

| Feature | Supported |
|---------|-----------|
| Headers | Yes |
| Bold | Yes |
| Tables | Yes |

> Blockquotes are also supported!`}]}},s={args:{segments:[{type:"markdown",content:`## Multiple Code Examples

Here are examples in different languages:`},{type:"code",language:"javascript",content:`// JavaScript
const sum = (a, b) => a + b;`},{type:"code",language:"python",content:`# Python
def sum(a, b):
    return a + b`},{type:"code",language:"rust",content:`// Rust
fn sum(a: i32, b: i32) -> i32 {
    a + b
}`}]}},i={args:{segments:[]}};var c,m,p;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    segments: simpleSegments,
    conceptId: "concept-functions-intro",
    onSaveActivation: action("UI:SAVE_ACTIVATION"),
    onSaveReflection: action("UI:SAVE_REFLECTION"),
    onAnswerBloom: action("UI:ANSWER_BLOOM")
  }
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,l,d;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    segments: fullLessonSegments,
    conceptId: "concept-functions-full",
    onSaveActivation: action("UI:SAVE_ACTIVATION"),
    onSaveReflection: action("UI:SAVE_REFLECTION"),
    onAnswerBloom: action("UI:ANSWER_BLOOM")
  }
}`,...(d=(l=n.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var g,h,f;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    segments: fullLessonSegments,
    conceptId: "concept-functions-full",
    userProgress: {
      activationResponse: "I brush my teeth the same way every morning - it's like a routine or function!",
      reflectionNotes: ["I think functions would help me avoid copy-pasting code when I need to do the same calculation multiple times."],
      bloomAnswered: {
        0: true
      }
    },
    onSaveActivation: action("UI:SAVE_ACTIVATION"),
    onSaveReflection: action("UI:SAVE_REFLECTION"),
    onAnswerBloom: action("UI:ANSWER_BLOOM")
  }
}`,...(f=(h=o.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var y,w,S;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    segments: quizOnlySegments,
    conceptId: "concept-quiz"
  }
}`,...(S=(w=r.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};var I,A,b;a.parameters={...a.parameters,docs:{...(I=a.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    segments: [{
      type: "markdown",
      content: \`# Pure Markdown Content

This example shows the SegmentRenderer with only markdown content.

## Features

- **Bold text** and *italic text*
- Lists like this one
- Code like \\\`console.log()\\\`

## Tables

| Feature | Supported |
|---------|-----------|
| Headers | Yes |
| Bold | Yes |
| Tables | Yes |

> Blockquotes are also supported!\`
    }]
  }
}`,...(b=(A=a.parameters)==null?void 0:A.docs)==null?void 0:b.source}}};var v,k,E;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    segments: [{
      type: "markdown",
      content: "## Multiple Code Examples\\n\\nHere are examples in different languages:"
    }, {
      type: "code",
      language: "javascript",
      content: \`// JavaScript
const sum = (a, b) => a + b;\`
    }, {
      type: "code",
      language: "python",
      content: \`# Python
def sum(a, b):
    return a + b\`
    }, {
      type: "code",
      language: "rust",
      content: \`// Rust
fn sum(a: i32, b: i32) -> i32 {
    a + b
}\`
    }]
  }
}`,...(E=(k=s.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};var O,T,R;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    segments: []
  }
}`,...(R=(T=i.parameters)==null?void 0:T.docs)==null?void 0:R.source}}};const Xe=["SimpleLesson","FullLesson","WithUserProgress","QuizOnly","MarkdownOnly","CodeHeavy","Empty"];export{s as CodeHeavy,i as Empty,n as FullLesson,a as MarkdownOnly,r as QuizOnly,t as SimpleLesson,o as WithUserProgress,Xe as __namedExportsOrder,Ge as default};
