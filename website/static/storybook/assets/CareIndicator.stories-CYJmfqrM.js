import{j as e}from"./jsx-runtime-CDt2p4po.js";import{C as r}from"./CareIndicator-Cytufey8.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";import"./Box-DYJzRMmP.js";import"./star-D_3mxVsm.js";import"./createLucideIcon-CbHznvEr.js";import"./truck-CSOrl2J5.js";import"./credit-card-CQwe3_yO.js";import"./message-circle-Yw7MGdXs.js";const Z={title:"Clients/Winning-11/Atoms/CareIndicator",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{type:{control:"select",options:["communication","payment","delivery","feedback"]},urgency:{control:"select",options:["low","medium","high"]},size:{control:"select",options:["sm","md","lg"]}}},a={args:{type:"communication",urgency:"medium"}},n={args:{type:"payment",urgency:"high"}},s={args:{type:"delivery",urgency:"low"}},c={args:{type:"feedback",urgency:"low"}},t={args:{type:"payment",urgency:"high"}},o={args:{type:"communication",urgency:"medium",tooltip:"Last contacted 2 weeks ago"}},i={args:{type:"communication",urgency:"medium",size:"sm"}},m={args:{type:"payment",urgency:"high",size:"lg"}},p={render:()=>e.jsxs("div",{className:"flex gap-4",children:[e.jsx(r,{type:"communication",urgency:"low"}),e.jsx(r,{type:"payment",urgency:"medium"}),e.jsx(r,{type:"delivery",urgency:"high"}),e.jsx(r,{type:"feedback",urgency:"low"})]})},y={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{className:"w-20 text-sm",children:"Low:"}),e.jsx(r,{type:"communication",urgency:"low"}),e.jsx(r,{type:"payment",urgency:"low"}),e.jsx(r,{type:"delivery",urgency:"low"}),e.jsx(r,{type:"feedback",urgency:"low"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{className:"w-20 text-sm",children:"Medium:"}),e.jsx(r,{type:"communication",urgency:"medium"}),e.jsx(r,{type:"payment",urgency:"medium"}),e.jsx(r,{type:"delivery",urgency:"medium"}),e.jsx(r,{type:"feedback",urgency:"medium"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{className:"w-20 text-sm",children:"High:"}),e.jsx(r,{type:"communication",urgency:"high"}),e.jsx(r,{type:"payment",urgency:"high"}),e.jsx(r,{type:"delivery",urgency:"high"}),e.jsx(r,{type:"feedback",urgency:"high"})]})]})};var d,u,g;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    type: 'communication',
    urgency: 'medium'
  }
}`,...(g=(u=a.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var l,h,x;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    type: 'payment',
    urgency: 'high'
  }
}`,...(x=(h=n.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var v,w,f;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    type: 'delivery',
    urgency: 'low'
  }
}`,...(f=(w=s.parameters)==null?void 0:w.docs)==null?void 0:f.source}}};var j,C,I;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    type: 'feedback',
    urgency: 'low'
  }
}`,...(I=(C=c.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};var N,k,b;t.parameters={...t.parameters,docs:{...(N=t.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    type: 'payment',
    urgency: 'high'
  }
}`,...(b=(k=t.parameters)==null?void 0:k.docs)==null?void 0:b.source}}};var S,L,z;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    type: 'communication',
    urgency: 'medium',
    tooltip: 'Last contacted 2 weeks ago'
  }
}`,...(z=(L=o.parameters)==null?void 0:L.docs)==null?void 0:z.source}}};var A,T,H;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    type: 'communication',
    urgency: 'medium',
    size: 'sm'
  }
}`,...(H=(T=i.parameters)==null?void 0:T.docs)==null?void 0:H.source}}};var U,D,E;m.parameters={...m.parameters,docs:{...(U=m.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    type: 'payment',
    urgency: 'high',
    size: 'lg'
  }
}`,...(E=(D=m.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};var F,M,P;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4">
      <CareIndicator type="communication" urgency="low" />
      <CareIndicator type="payment" urgency="medium" />
      <CareIndicator type="delivery" urgency="high" />
      <CareIndicator type="feedback" urgency="low" />
    </div>
}`,...(P=(M=p.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var _,O,R;y.parameters={...y.parameters,docs:{...(_=y.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm">Low:</span>
        <CareIndicator type="communication" urgency="low" />
        <CareIndicator type="payment" urgency="low" />
        <CareIndicator type="delivery" urgency="low" />
        <CareIndicator type="feedback" urgency="low" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm">Medium:</span>
        <CareIndicator type="communication" urgency="medium" />
        <CareIndicator type="payment" urgency="medium" />
        <CareIndicator type="delivery" urgency="medium" />
        <CareIndicator type="feedback" urgency="medium" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm">High:</span>
        <CareIndicator type="communication" urgency="high" />
        <CareIndicator type="payment" urgency="high" />
        <CareIndicator type="delivery" urgency="high" />
        <CareIndicator type="feedback" urgency="high" />
      </div>
    </div>
}`,...(R=(O=y.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};const $=["Communication","Payment","Delivery","Feedback","HighUrgency","CustomTooltip","Small","Large","AllTypes","AllUrgencies"];export{p as AllTypes,y as AllUrgencies,a as Communication,o as CustomTooltip,s as Delivery,c as Feedback,t as HighUrgency,m as Large,n as Payment,i as Small,$ as __namedExportsOrder,Z as default};
