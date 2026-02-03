import{j as s}from"./jsx-runtime-CDt2p4po.js";import{A as e}from"./AgentAvatar-74--nhR9.js";import"./index-GiUgBvb1.js";import"./Avatar-CJtPgGUU.js";import"./cn-BNf5BS2b.js";import"./user-BePscFH1.js";import"./createLucideIcon-CbHznvEr.js";import"./settings-DBj1i3lR.js";import"./bot-_bS8udXs.js";const K={title:"Builder/Atoms/AgentAvatar",component:e,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{role:{control:"select",options:["assistant","user","system","tool"]},size:{control:"select",options:["sm","md","lg"]}}},r={args:{role:"assistant",size:"md"}},a={args:{role:"user",size:"md"}},t={args:{role:"system",size:"md"}},o={args:{role:"tool",size:"md"}},n={args:{role:"assistant",size:"sm"}},l={args:{role:"assistant",size:"lg"}},i={render:()=>s.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center"},children:[s.jsx(e,{role:"assistant"}),s.jsx(e,{role:"user"}),s.jsx(e,{role:"system"}),s.jsx(e,{role:"tool"})]})},m={render:()=>s.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center"},children:[s.jsx(e,{role:"assistant",size:"sm"}),s.jsx(e,{role:"assistant",size:"md"}),s.jsx(e,{role:"assistant",size:"lg"})]})};var c,p,d;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    role: "assistant",
    size: "md"
  }
}`,...(d=(p=r.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var g,u,A;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    role: "user",
    size: "md"
  }
}`,...(A=(u=a.parameters)==null?void 0:u.docs)==null?void 0:A.source}}};var x,z,y;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    role: "system",
    size: "md"
  }
}`,...(y=(z=t.parameters)==null?void 0:z.docs)==null?void 0:y.source}}};var v,S,j;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    role: "tool",
    size: "md"
  }
}`,...(j=(S=o.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};var f,I,R;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    role: "assistant",
    size: "sm"
  }
}`,...(R=(I=n.parameters)==null?void 0:I.docs)==null?void 0:R.source}}};var T,h,E;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    role: "assistant",
    size: "lg"
  }
}`,...(E=(h=l.parameters)==null?void 0:h.docs)==null?void 0:E.source}}};var L,U,_;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "16px",
    alignItems: "center"
  }}>
      <AgentAvatar role="assistant" />
      <AgentAvatar role="user" />
      <AgentAvatar role="system" />
      <AgentAvatar role="tool" />
    </div>
}`,...(_=(U=i.parameters)==null?void 0:U.docs)==null?void 0:_.source}}};var B,O,b;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "16px",
    alignItems: "center"
  }}>
      <AgentAvatar role="assistant" size="sm" />
      <AgentAvatar role="assistant" size="md" />
      <AgentAvatar role="assistant" size="lg" />
    </div>
}`,...(b=(O=m.parameters)==null?void 0:O.docs)==null?void 0:b.source}}};const M=["Assistant","User","System","Tool","Small","Large","AllRoles","AllSizes"];export{i as AllRoles,m as AllSizes,r as Assistant,l as Large,n as Small,t as System,o as Tool,a as User,M as __namedExportsOrder,K as default};
