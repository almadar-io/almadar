import{j as a}from"./jsx-runtime-CDt2p4po.js";import{B as e}from"./Badge-Dd4QqFOk.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";const K={title:"Atoms/Badge",component:e,parameters:{layout:"centered",backgrounds:{default:"wireframe"}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","primary","success","warning","danger","info"]},size:{control:"select",options:["sm","md"]}}},r={args:{children:"Badge"}},s={args:{children:"Primary",variant:"primary"}},n={args:{children:"Success",variant:"success"}},c={args:{children:"Warning",variant:"warning"}},i={args:{children:"Danger",variant:"danger"}},t={args:{children:"Info",variant:"info"}},d={render:()=>a.jsxs("div",{className:"flex flex-wrap gap-2",children:[a.jsx(e,{variant:"default",children:"Default"}),a.jsx(e,{variant:"primary",children:"Primary"}),a.jsx(e,{variant:"success",children:"Success"}),a.jsx(e,{variant:"warning",children:"Warning"}),a.jsx(e,{variant:"danger",children:"Danger"}),a.jsx(e,{variant:"info",children:"Info"})]})},o={render:()=>a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx(e,{size:"sm",children:"Small"}),a.jsx(e,{size:"md",children:"Medium"})]})},l={render:()=>a.jsxs("div",{className:"flex gap-2",children:[a.jsx(e,{variant:"primary",children:"3"}),a.jsx(e,{variant:"danger",children:"99+"}),a.jsx(e,{variant:"success",children:"New"})]})},m={render:()=>a.jsxs("div",{className:"flex items-center gap-4",children:[a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx("span",{className:"font-bold text-black",children:"Notifications"}),a.jsx(e,{variant:"danger",children:"12"})]}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx("span",{className:"font-bold text-black",children:"Messages"}),a.jsx(e,{variant:"primary",children:"New"})]}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx("span",{className:"font-bold text-black",children:"Status"}),a.jsx(e,{variant:"success",children:"Active"})]})]})};var g,p,u;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    children: 'Badge'
  }
}`,...(u=(p=r.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var v,x,f;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    children: 'Primary',
    variant: 'primary'
  }
}`,...(f=(x=s.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var h,B,N;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    children: 'Success',
    variant: 'success'
  }
}`,...(N=(B=n.parameters)==null?void 0:B.docs)==null?void 0:N.source}}};var j,S,y;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    children: 'Warning',
    variant: 'warning'
  }
}`,...(y=(S=c.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var b,w,D;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    children: 'Danger',
    variant: 'danger'
  }
}`,...(D=(w=i.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};var I,W,k;t.parameters={...t.parameters,docs:{...(I=t.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    children: 'Info',
    variant: 'info'
  }
}`,...(k=(W=t.parameters)==null?void 0:W.docs)==null?void 0:k.source}}};var z,P,A;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
        </div>
}`,...(A=(P=d.parameters)==null?void 0:P.docs)==null?void 0:A.source}}};var M,C,E;o.parameters={...o.parameters,docs:{...(M=o.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-2">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
        </div>
}`,...(E=(C=o.parameters)==null?void 0:C.docs)==null?void 0:E.source}}};var V,_,O;l.parameters={...l.parameters,docs:{...(V=l.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <div className="flex gap-2">
            <Badge variant="primary">3</Badge>
            <Badge variant="danger">99+</Badge>
            <Badge variant="success">New</Badge>
        </div>
}`,...(O=(_=l.parameters)==null?void 0:_.docs)==null?void 0:O.source}}};var R,T,q;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <span className="font-bold text-black">Notifications</span>
                <Badge variant="danger">12</Badge>
            </div>
            <div className="flex items-center gap-2">
                <span className="font-bold text-black">Messages</span>
                <Badge variant="primary">New</Badge>
            </div>
            <div className="flex items-center gap-2">
                <span className="font-bold text-black">Status</span>
                <Badge variant="success">Active</Badge>
            </div>
        </div>
}`,...(q=(T=m.parameters)==null?void 0:T.docs)==null?void 0:q.source}}};const L=["Default","Primary","Success","Warning","Danger","Info","AllVariants","Sizes","WithNumbers","InContext"];export{d as AllVariants,i as Danger,r as Default,m as InContext,t as Info,s as Primary,o as Sizes,n as Success,c as Warning,l as WithNumbers,L as __namedExportsOrder,K as default};
