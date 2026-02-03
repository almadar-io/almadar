import{j as o}from"./jsx-runtime-CDt2p4po.js";import{F as B}from"./FloatingActionMenu-CuTts6fI.js";import{B as c}from"./Box-DYJzRMmP.js";import{C as F}from"./camera-Cr6IZ-wx.js";import{F as k}from"./file-text-DZQctV9o.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";import"./Stack-1XI3stiC.js";import"./Typography-Wmkp-g7N.js";import"./useEventBus-BNZMNlv8.js";import"./user-plus-BlQDsowZ.js";import"./createLucideIcon-CbHznvEr.js";import"./alert-circle-CBFh8Gcj.js";import"./phone-XSC4O3No.js";import"./x-prXd1WI5.js";import"./plus-jSzJaRn3.js";const q={title:"Clients/Inspection-System/Organisms/FloatingActionMenu",component:B,parameters:{layout:"fullscreen"},tags:["autodocs"],decorators:[a=>o.jsxs(c,{className:"relative h-[500px] bg-neutral-100 p-4",children:[o.jsx(c,{className:"p-4 bg-white rounded-lg shadow",children:o.jsx("p",{className:"text-neutral-600",children:"Click the floating action button in the corner to see the menu expand."})}),o.jsx(a,{})]})]},e={args:{}},t={args:{position:"bottom-left"}},r={args:{position:"bottom-center"}},n={args:{actions:[{id:"photo",label:"Take Photo",icon:F,color:"text-blue-600",bgColor:"bg-blue-100"},{id:"note",label:"Add Note",icon:k,color:"text-green-600",bgColor:"bg-green-100"}]}},s={args:{context:{inspectionId:"insp-123",currentStep:"rule-check"},onAction:a=>alert(`Action: ${a}`)}};var i,m,p;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {}
}`,...(p=(m=e.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var l,d,u;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    position: "bottom-left"
  }
}`,...(u=(d=t.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var g,b,x;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    position: "bottom-center"
  }
}`,...(x=(b=r.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var h,C,f;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    actions: [{
      id: "photo",
      label: "Take Photo",
      icon: Camera,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    }, {
      id: "note",
      label: "Add Note",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-100"
    }]
  }
}`,...(f=(C=n.parameters)==null?void 0:C.docs)==null?void 0:f.source}}};var A,S,j;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    context: {
      inspectionId: "insp-123",
      currentStep: "rule-check"
    },
    onAction: actionId => alert(\`Action: \${actionId}\`)
  }
}`,...(j=(S=s.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};const z=["Default","BottomLeft","BottomCenter","CustomActions","WithContext"];export{r as BottomCenter,t as BottomLeft,n as CustomActions,e as Default,s as WithContext,z as __namedExportsOrder,q as default};
