import{j as e}from"./jsx-runtime-CDt2p4po.js";import{S as s}from"./Spinner-vF2DJrH5.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";const O={title:"Atoms/Spinner",component:s,parameters:{layout:"centered",backgrounds:{default:"wireframe"}},tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"]}}},r={args:{}},a={args:{size:"sm"}},t={args:{size:"md"}},n={args:{size:"lg"}},c={render:()=>e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsxs("div",{className:"text-center",children:[e.jsx(s,{size:"sm"}),e.jsx("p",{className:"mt-2 text-sm text-black",children:"Small"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx(s,{size:"md"}),e.jsx("p",{className:"mt-2 text-sm text-black",children:"Medium"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx(s,{size:"lg"}),e.jsx("p",{className:"mt-2 text-sm text-black",children:"Large"})]})]})},m={render:()=>e.jsxs("button",{className:"flex items-center gap-2 px-4 py-2 bg-black text-white font-bold",children:[e.jsx(s,{size:"sm",className:"text-white"}),"Loading..."]})},o={render:()=>e.jsxs("div",{className:"w-64 p-8 border-2 border-black flex flex-col items-center justify-center",children:[e.jsx(s,{size:"lg"}),e.jsx("p",{className:"mt-4 text-black font-bold",children:"Loading data..."})]})};var i,l,d;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {}
}`,...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var p,x,u;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    size: 'sm'
  }
}`,...(u=(x=a.parameters)==null?void 0:x.docs)==null?void 0:u.source}}};var g,b,N;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    size: 'md'
  }
}`,...(N=(b=t.parameters)==null?void 0:b.docs)==null?void 0:N.source}}};var f,S,j;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    size: 'lg'
  }
}`,...(j=(S=n.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};var z,v,h;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-6">
            <div className="text-center">
                <Spinner size="sm" />
                <p className="mt-2 text-sm text-black">Small</p>
            </div>
            <div className="text-center">
                <Spinner size="md" />
                <p className="mt-2 text-sm text-black">Medium</p>
            </div>
            <div className="text-center">
                <Spinner size="lg" />
                <p className="mt-2 text-sm text-black">Large</p>
            </div>
        </div>
}`,...(h=(v=c.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};var k,L,w;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <button className="flex items-center gap-2 px-4 py-2 bg-black text-white font-bold">
            <Spinner size="sm" className="text-white" />
            Loading...
        </button>
}`,...(w=(L=m.parameters)==null?void 0:L.docs)==null?void 0:w.source}}};var y,I,M;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div className="w-64 p-8 border-2 border-black flex flex-col items-center justify-center">
            <Spinner size="lg" />
            <p className="mt-4 text-black font-bold">Loading data...</p>
        </div>
}`,...(M=(I=o.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};const R=["Default","Small","Medium","Large","AllSizes","InButton","InCard"];export{c as AllSizes,r as Default,m as InButton,o as InCard,n as Large,t as Medium,a as Small,R as __namedExportsOrder,O as default};
