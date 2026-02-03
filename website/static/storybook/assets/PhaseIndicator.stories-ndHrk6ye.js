import{j as e}from"./jsx-runtime-CDt2p4po.js";import{P as a}from"./PhaseIndicator-C0AecDcg.js";import{V as T,H as q}from"./Stack-1XI3stiC.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";import"./Box-DYJzRMmP.js";import"./Typography-Wmkp-g7N.js";import"./flag-CJoo5uXG.js";import"./createLucideIcon-CbHznvEr.js";import"./check-circle-DX_bNA1C.js";import"./clock-DT9ve7xf.js";import"./file-text-DZQctV9o.js";import"./play-C6U2eifx.js";import"./clipboard-list-C9RrCyxf.js";const ee={title:"Clients/Inspection-System/Atoms/PhaseIndicator",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{phase:{control:"select",options:["preparation","execution","documentation","review","completed","cancelled"]},size:{control:"select",options:["sm","md","lg"]}}},s={args:{phase:"preparation"}},r={args:{phase:"execution"}},o={args:{phase:"documentation"}},t={args:{phase:"review"}},n={args:{phase:"completed"}},c={args:{phase:"cancelled"}},p={render:()=>e.jsxs(T,{gap:"md",children:[e.jsx(a,{phase:"preparation"}),e.jsx(a,{phase:"execution"}),e.jsx(a,{phase:"documentation"}),e.jsx(a,{phase:"review"}),e.jsx(a,{phase:"completed"}),e.jsx(a,{phase:"cancelled"})]})},i={render:()=>e.jsxs(q,{gap:"md",align:"center",children:[e.jsx(a,{phase:"execution",size:"sm"}),e.jsx(a,{phase:"execution",size:"md"}),e.jsx(a,{phase:"execution",size:"lg"})]})},m={args:{phase:"execution",showLabel:!1}};var d,l,u;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    phase: "preparation"
  }
}`,...(u=(l=s.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var h,g,x;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    phase: "execution"
  }
}`,...(x=(g=r.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var S,P,I;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    phase: "documentation"
  }
}`,...(I=(P=o.parameters)==null?void 0:P.docs)==null?void 0:I.source}}};var j,w,z;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    phase: "review"
  }
}`,...(z=(w=t.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var v,f,k;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    phase: "completed"
  }
}`,...(k=(f=n.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var y,C,E;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    phase: "cancelled"
  }
}`,...(E=(C=c.parameters)==null?void 0:C.docs)==null?void 0:E.source}}};var H,V,A;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <VStack gap="md">
      <PhaseIndicator phase="preparation" />
      <PhaseIndicator phase="execution" />
      <PhaseIndicator phase="documentation" />
      <PhaseIndicator phase="review" />
      <PhaseIndicator phase="completed" />
      <PhaseIndicator phase="cancelled" />
    </VStack>
}`,...(A=(V=p.parameters)==null?void 0:V.docs)==null?void 0:A.source}}};var O,R,b;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <HStack gap="md" align="center">
      <PhaseIndicator phase="execution" size="sm" />
      <PhaseIndicator phase="execution" size="md" />
      <PhaseIndicator phase="execution" size="lg" />
    </HStack>
}`,...(b=(R=i.parameters)==null?void 0:R.docs)==null?void 0:b.source}}};var D,L,_;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    phase: "execution",
    showLabel: false
  }
}`,...(_=(L=m.parameters)==null?void 0:L.docs)==null?void 0:_.source}}};const ae=["Preparation","Execution","Documentation","Review","Completed","Cancelled","AllPhases","Sizes","IconOnly"];export{p as AllPhases,c as Cancelled,n as Completed,o as Documentation,r as Execution,m as IconOnly,s as Preparation,t as Review,i as Sizes,ae as __namedExportsOrder,ee as default};
