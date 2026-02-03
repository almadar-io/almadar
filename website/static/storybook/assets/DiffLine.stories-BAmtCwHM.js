import{j as e}from"./jsx-runtime-CDt2p4po.js";import{D as r}from"./DiffLine-CkY1GMp-.js";import"./index-GiUgBvb1.js";import"./Stack-DhhoTPuC.js";import"./cn-BNf5BS2b.js";import"./Box-DYJzRMmP.js";import"./Typography-Wmkp-g7N.js";const R={title:"Builder/Atoms/DiffLine",component:r,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{type:{control:"select",options:["add","remove","context"]},showLineNumber:{control:"boolean"}}},t={args:{type:"add",content:'  "name": "MyProject",',lineNumber:2,showLineNumber:!0}},o={args:{type:"remove",content:'  "name": "OldProject",',lineNumber:2,showLineNumber:!0}},n={args:{type:"context",content:'  "version": "1.0.0",',lineNumber:3,showLineNumber:!0}},s={args:{type:"add",content:'  "description": "A new description"',showLineNumber:!1}},i={render:()=>e.jsxs("div",{style:{fontFamily:"monospace"},children:[e.jsx(r,{type:"context",content:"{",lineNumber:1,showLineNumber:!0}),e.jsx(r,{type:"remove",content:'  "name": "OldProject",',lineNumber:2,showLineNumber:!0}),e.jsx(r,{type:"add",content:'  "name": "NewProject",',lineNumber:2,showLineNumber:!0}),e.jsx(r,{type:"context",content:'  "version": "1.0.0",',lineNumber:3,showLineNumber:!0}),e.jsx(r,{type:"add",content:'  "description": "Added description",',lineNumber:4,showLineNumber:!0}),e.jsx(r,{type:"context",content:"}",lineNumber:5,showLineNumber:!0})]})},a={args:{type:"add",content:'  "longProperty": "This is a very long value that might need to wrap or scroll in the diff viewer interface",',lineNumber:10,showLineNumber:!0}};var m,c,u;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    type: "add",
    content: '  "name": "MyProject",',
    lineNumber: 2,
    showLineNumber: true
  }
}`,...(u=(c=t.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var d,p,l;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    type: "remove",
    content: '  "name": "OldProject",',
    lineNumber: 2,
    showLineNumber: true
  }
}`,...(l=(p=o.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var N,b,y;n.parameters={...n.parameters,docs:{...(N=n.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    type: "context",
    content: '  "version": "1.0.0",',
    lineNumber: 3,
    showLineNumber: true
  }
}`,...(y=(b=n.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var L,h,f;s.parameters={...s.parameters,docs:{...(L=s.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    type: "add",
    content: '  "description": "A new description"',
    showLineNumber: false
  }
}`,...(f=(h=s.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var w,g,x;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div style={{
    fontFamily: "monospace"
  }}>
      <DiffLine type="context" content="{" lineNumber={1} showLineNumber />
      <DiffLine type="remove" content='  "name": "OldProject",' lineNumber={2} showLineNumber />
      <DiffLine type="add" content='  "name": "NewProject",' lineNumber={2} showLineNumber />
      <DiffLine type="context" content='  "version": "1.0.0",' lineNumber={3} showLineNumber />
      <DiffLine type="add" content='  "description": "Added description",' lineNumber={4} showLineNumber />
      <DiffLine type="context" content="}" lineNumber={5} showLineNumber />
    </div>
}`,...(x=(g=i.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var v,j,D;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    type: "add",
    content: '  "longProperty": "This is a very long value that might need to wrap or scroll in the diff viewer interface",',
    lineNumber: 10,
    showLineNumber: true
  }
}`,...(D=(j=a.parameters)==null?void 0:j.docs)==null?void 0:D.source}}};const T=["Added","Removed","Context","WithoutLineNumber","DiffBlockExample","LongContent"];export{t as Added,n as Context,i as DiffBlockExample,a as LongContent,o as Removed,s as WithoutLineNumber,T as __namedExportsOrder,R as default};
