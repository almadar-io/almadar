import{j as r}from"./jsx-runtime-CDt2p4po.js";import{B as a}from"./Button-B7t-_IKa.js";import{T as O}from"./trash-2-ChlfdFMf.js";import{A as q}from"./arrow-right-BdVPe8wH.js";import{M as F}from"./mail-CI1Ybt8r.js";import{C as H}from"./check-DliVttWt.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";const er={title:"Atoms/Button",component:a,parameters:{layout:"centered",backgrounds:{default:"wireframe"}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","ghost","danger","success","warning"]},size:{control:"select",options:["sm","md","lg"]}}},e={args:{children:"Primary Button",variant:"primary"}},n={args:{children:"Secondary Button",variant:"secondary"}},s={args:{children:"Ghost Button",variant:"ghost"}},t={args:{children:"Delete",variant:"danger",icon:O}},o={args:{children:"Send Email",variant:"primary",icon:F}},i={args:{children:"Continue",variant:"primary",iconRight:q}},c={render:()=>r.jsxs("div",{className:"flex items-center gap-4",children:[r.jsx(a,{size:"sm",children:"Small"}),r.jsx(a,{size:"md",children:"Medium"}),r.jsx(a,{size:"lg",children:"Large"})]})},d={render:()=>r.jsxs("div",{className:"flex flex-col gap-4",children:[r.jsx(a,{variant:"primary",icon:H,children:"Primary"}),r.jsx(a,{variant:"secondary",children:"Secondary"}),r.jsx(a,{variant:"ghost",children:"Ghost"}),r.jsx(a,{variant:"danger",icon:O,children:"Danger"}),r.jsx(a,{variant:"success",children:"Success"}),r.jsx(a,{variant:"warning",children:"Warning"})]})},m={args:{children:"Disabled Button",variant:"primary",disabled:!0}},l={args:{children:"Loading...",variant:"primary",isLoading:!0}};var u,p,g;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    children: 'Primary Button',
    variant: 'primary'
  }
}`,...(g=(p=e.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var h,v,y;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
}`,...(y=(v=n.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var B,S,x;s.parameters={...s.parameters,docs:{...(B=s.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    children: 'Ghost Button',
    variant: 'ghost'
  }
}`,...(x=(S=s.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var f,j,D;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    children: 'Delete',
    variant: 'danger',
    icon: Trash2
  }
}`,...(D=(j=t.parameters)==null?void 0:j.docs)==null?void 0:D.source}}};var z,L,b;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    children: 'Send Email',
    variant: 'primary',
    icon: Mail
  }
}`,...(b=(L=o.parameters)==null?void 0:L.docs)==null?void 0:b.source}}};var R,w,A;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    children: 'Continue',
    variant: 'primary',
    iconRight: ArrowRight
  }
}`,...(A=(w=i.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var G,P,C;c.parameters={...c.parameters,docs:{...(G=c.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
        </div>
}`,...(C=(P=c.parameters)==null?void 0:P.docs)==null?void 0:C.source}}};var M,T,E;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
            <Button variant="primary" icon={Check}>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger" icon={Trash2}>Danger</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
        </div>
}`,...(E=(T=d.parameters)==null?void 0:T.docs)==null?void 0:E.source}}};var I,N,W;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    children: 'Disabled Button',
    variant: 'primary',
    disabled: true
  }
}`,...(W=(N=m.parameters)==null?void 0:N.docs)==null?void 0:W.source}}};var k,V,_;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    children: 'Loading...',
    variant: 'primary',
    isLoading: true
  }
}`,...(_=(V=l.parameters)==null?void 0:V.docs)==null?void 0:_.source}}};const nr=["Primary","Secondary","Ghost","Danger","WithIcon","IconRight","Sizes","AllVariants","Disabled","Loading"];export{d as AllVariants,t as Danger,m as Disabled,s as Ghost,i as IconRight,l as Loading,e as Primary,n as Secondary,c as Sizes,o as WithIcon,nr as __namedExportsOrder,er as default};
