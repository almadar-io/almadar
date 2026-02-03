import{j as e}from"./jsx-runtime-CDt2p4po.js";import{D as a}from"./Divider-D6QVU1l7.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";const T={title:"Atoms/Divider",component:a,parameters:{layout:"centered",backgrounds:{default:"wireframe"}},tags:["autodocs"],argTypes:{orientation:{control:"select",options:["horizontal","vertical"]}}},t={args:{orientation:"horizontal"},decorators:[s=>e.jsx("div",{className:"w-80",children:e.jsx(s,{})})]},r={args:{orientation:"vertical"},decorators:[s=>e.jsx("div",{className:"h-24 flex items-center",children:e.jsx(s,{})})]},o={args:{label:"OR"},decorators:[s=>e.jsx("div",{className:"w-80",children:e.jsx(s,{})})]},i={render:()=>e.jsxs("div",{className:"w-80 space-y-4",children:[e.jsx("p",{className:"text-black",children:"This is the first section of content."}),e.jsx(a,{}),e.jsx("p",{className:"text-black",children:"This is the second section of content."}),e.jsx(a,{label:"NEW SECTION"}),e.jsx("p",{className:"text-black",children:"This is the third section with a label."})]})},c={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{className:"text-black font-bold",children:"Option A"}),e.jsx(a,{orientation:"vertical",className:"h-4"}),e.jsx("span",{className:"text-black font-bold",children:"Option B"}),e.jsx(a,{orientation:"vertical",className:"h-4"}),e.jsx("span",{className:"text-black font-bold",children:"Option C"})]})};var n,l,d;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    orientation: 'horizontal'
  },
  decorators: [Story => <div className="w-80">
                <Story />
            </div>]
}`,...(d=(l=t.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var m,p,h;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    orientation: 'vertical'
  },
  decorators: [Story => <div className="h-24 flex items-center">
                <Story />
            </div>]
}`,...(h=(p=r.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var x,N,v;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    label: 'OR'
  },
  decorators: [Story => <div className="w-80">
                <Story />
            </div>]
}`,...(v=(N=o.parameters)==null?void 0:N.docs)==null?void 0:v.source}}};var b,f,u;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div className="w-80 space-y-4">
            <p className="text-black">This is the first section of content.</p>
            <Divider />
            <p className="text-black">This is the second section of content.</p>
            <Divider label="NEW SECTION" />
            <p className="text-black">This is the third section with a label.</p>
        </div>
}`,...(u=(f=i.parameters)==null?void 0:f.docs)==null?void 0:u.source}}};var j,g,k;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
            <span className="text-black font-bold">Option A</span>
            <Divider orientation="vertical" className="h-4" />
            <span className="text-black font-bold">Option B</span>
            <Divider orientation="vertical" className="h-4" />
            <span className="text-black font-bold">Option C</span>
        </div>
}`,...(k=(g=c.parameters)==null?void 0:g.docs)==null?void 0:k.source}}};const D=["Horizontal","Vertical","WithLabel","InContent","VerticalInline"];export{t as Horizontal,i as InContent,r as Vertical,c as VerticalInline,o as WithLabel,D as __namedExportsOrder,T as default};
