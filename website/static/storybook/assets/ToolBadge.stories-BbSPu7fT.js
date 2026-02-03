import{j as e}from"./jsx-runtime-CDt2p4po.js";import{T as a}from"./ToolBadge-Dqa-994Y.js";import"./index-GiUgBvb1.js";import"./Badge-CpH0PNM6.js";import"./cn-BNf5BS2b.js";import"./Stack-DhhoTPuC.js";import"./Typography-Wmkp-g7N.js";const fe={title:"Builder/Atoms/ToolBadge",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","file","shell","schema"]},size:{control:"select",options:["sm","md"]}}},r={args:{tool:"read_file"}},o={args:{tool:"write_file"}},s={args:{tool:"edit_file"}},t={args:{tool:"bash"}},l={args:{tool:"execute"}},n={args:{tool:"validate"}},i={args:{tool:"generate_schema"}},c={args:{tool:"ls"}},d={args:{tool:"read_file",variant:"file"}},m={args:{tool:"bash",variant:"shell"}},p={args:{tool:"validate",variant:"schema"}},g={render:()=>e.jsxs("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:[e.jsx(a,{tool:"read_file"}),e.jsx(a,{tool:"write_file"}),e.jsx(a,{tool:"edit_file"}),e.jsx(a,{tool:"bash"}),e.jsx(a,{tool:"execute"}),e.jsx(a,{tool:"validate"}),e.jsx(a,{tool:"generate_schema"}),e.jsx(a,{tool:"ls"})]})},u={render:()=>e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx(a,{tool:"custom",variant:"default"}),e.jsx(a,{tool:"read_file",variant:"file"}),e.jsx(a,{tool:"bash",variant:"shell"}),e.jsx(a,{tool:"validate",variant:"schema"})]})},f={args:{tool:"read_file",size:"sm"}},x={args:{tool:"write_file",size:"md"}};var h,v,_;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    tool: "read_file"
  }
}`,...(_=(v=r.parameters)==null?void 0:v.docs)==null?void 0:_.source}}};var S,T,B;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    tool: "write_file"
  }
}`,...(B=(T=o.parameters)==null?void 0:T.docs)==null?void 0:B.source}}};var j,y,V;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    tool: "edit_file"
  }
}`,...(V=(y=s.parameters)==null?void 0:y.docs)==null?void 0:V.source}}};var b,w,F;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    tool: "bash"
  }
}`,...(F=(w=t.parameters)==null?void 0:w.docs)==null?void 0:F.source}}};var E,z,A;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    tool: "execute"
  }
}`,...(A=(z=l.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};var W,R,D;n.parameters={...n.parameters,docs:{...(W=n.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    tool: "validate"
  }
}`,...(D=(R=n.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};var G,L,M;i.parameters={...i.parameters,docs:{...(G=i.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    tool: "generate_schema"
  }
}`,...(M=(L=i.parameters)==null?void 0:L.docs)==null?void 0:M.source}}};var O,k,q;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    tool: "ls"
  }
}`,...(q=(k=c.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};var C,H,I;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    tool: "read_file",
    variant: "file"
  }
}`,...(I=(H=d.parameters)==null?void 0:H.docs)==null?void 0:I.source}}};var J,K,N;m.parameters={...m.parameters,docs:{...(J=m.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    tool: "bash",
    variant: "shell"
  }
}`,...(N=(K=m.parameters)==null?void 0:K.docs)==null?void 0:N.source}}};var P,Q,U;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    tool: "validate",
    variant: "schema"
  }
}`,...(U=(Q=p.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var X,Y,Z;g.parameters={...g.parameters,docs:{...(X=g.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  }}>
      <ToolBadge tool="read_file" />
      <ToolBadge tool="write_file" />
      <ToolBadge tool="edit_file" />
      <ToolBadge tool="bash" />
      <ToolBadge tool="execute" />
      <ToolBadge tool="validate" />
      <ToolBadge tool="generate_schema" />
      <ToolBadge tool="ls" />
    </div>
}`,...(Z=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,ee,ae;u.parameters={...u.parameters,docs:{...($=u.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "8px"
  }}>
      <ToolBadge tool="custom" variant="default" />
      <ToolBadge tool="read_file" variant="file" />
      <ToolBadge tool="bash" variant="shell" />
      <ToolBadge tool="validate" variant="schema" />
    </div>
}`,...(ae=(ee=u.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};var re,oe,se;f.parameters={...f.parameters,docs:{...(re=f.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    tool: "read_file",
    size: "sm"
  }
}`,...(se=(oe=f.parameters)==null?void 0:oe.docs)==null?void 0:se.source}}};var te,le,ne;x.parameters={...x.parameters,docs:{...(te=x.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    tool: "write_file",
    size: "md"
  }
}`,...(ne=(le=x.parameters)==null?void 0:le.docs)==null?void 0:ne.source}}};const xe=["ReadFile","WriteFile","EditFile","Bash","Execute","Validate","GenerateSchema","ListDirectory","FileVariant","ShellVariant","SchemaVariant","AllTools","AllVariants","Small","Medium"];export{g as AllTools,u as AllVariants,t as Bash,s as EditFile,l as Execute,d as FileVariant,i as GenerateSchema,c as ListDirectory,x as Medium,r as ReadFile,p as SchemaVariant,m as ShellVariant,f as Small,n as Validate,o as WriteFile,xe as __namedExportsOrder,fe as default};
