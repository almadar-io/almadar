import{j as s}from"./jsx-runtime-CDt2p4po.js";import{A as e}from"./AgentStatusBadge-Df-Q1ir_.js";import"./index-GiUgBvb1.js";import"./Badge-CpH0PNM6.js";import"./cn-BNf5BS2b.js";import"./Stack-DhhoTPuC.js";import"./Box-DYJzRMmP.js";const W={title:"Builder/Atoms/AgentStatusBadge",component:e,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{status:{control:"select",options:["idle","running","complete","error","interrupted"]},size:{control:"select",options:["sm","md","lg"]},dotOnly:{control:"boolean"}}},r={args:{status:"idle"}},t={args:{status:"running"}},a={args:{status:"complete"}},n={args:{status:"error"}},o={args:{status:"interrupted"}},u={render:()=>s.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center"},children:[s.jsx(e,{status:"idle"}),s.jsx(e,{status:"running"}),s.jsx(e,{status:"complete"}),s.jsx(e,{status:"error"}),s.jsx(e,{status:"interrupted"})]})},c={args:{status:"running",dotOnly:!0}},p={args:{status:"running",size:"sm"}},m={args:{status:"complete",size:"lg"}},i={args:{status:"running",label:"Processing..."}};var d,g,l;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    status: "idle"
  }
}`,...(l=(g=r.parameters)==null?void 0:g.docs)==null?void 0:l.source}}};var S,x,y;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    status: "running"
  }
}`,...(y=(x=t.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var A,j,B;a.parameters={...a.parameters,docs:{...(A=a.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    status: "complete"
  }
}`,...(B=(j=a.parameters)==null?void 0:j.docs)==null?void 0:B.source}}};var I,O,b;n.parameters={...n.parameters,docs:{...(I=n.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    status: "error"
  }
}`,...(b=(O=n.parameters)==null?void 0:O.docs)==null?void 0:b.source}}};var f,z,C;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    status: "interrupted"
  }
}`,...(C=(z=o.parameters)==null?void 0:z.docs)==null?void 0:C.source}}};var E,L,v;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "16px",
    alignItems: "center"
  }}>
      <AgentStatusBadge status="idle" />
      <AgentStatusBadge status="running" />
      <AgentStatusBadge status="complete" />
      <AgentStatusBadge status="error" />
      <AgentStatusBadge status="interrupted" />
    </div>
}`,...(v=(L=u.parameters)==null?void 0:L.docs)==null?void 0:v.source}}};var R,D,P;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    status: "running",
    dotOnly: true
  }
}`,...(P=(D=c.parameters)==null?void 0:D.docs)==null?void 0:P.source}}};var _,h,T;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    status: "running",
    size: "sm"
  }
}`,...(T=(h=p.parameters)==null?void 0:h.docs)==null?void 0:T.source}}};var k,q,w;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    status: "complete",
    size: "lg"
  }
}`,...(w=(q=m.parameters)==null?void 0:q.docs)==null?void 0:w.source}}};var F,G,H;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    status: "running",
    label: "Processing..."
  }
}`,...(H=(G=i.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};const X=["Idle","Running","Complete","Error","Interrupted","AllStatuses","DotOnly","Small","Large","CustomLabel"];export{u as AllStatuses,a as Complete,i as CustomLabel,c as DotOnly,n as Error,r as Idle,o as Interrupted,m as Large,t as Running,p as Small,X as __namedExportsOrder,W as default};
