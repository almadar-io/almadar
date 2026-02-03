import{j as e}from"./jsx-runtime-CDt2p4po.js";import{P as s}from"./ProgressBar-ZQR7fgL2.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";const R={title:"Atoms/ProgressBar",component:s,parameters:{layout:"centered",backgrounds:{default:"wireframe"}},tags:["autodocs"],argTypes:{type:{control:"select",options:["linear","circular","stepped"]},variant:{control:"select",options:["default","primary","success","warning","danger"]},color:{control:"select",options:["primary","success","warning","danger"]},size:{control:"select",options:["sm","md","lg"]}}},a={args:{value:65},decorators:[r=>e.jsx("div",{className:"w-80",children:e.jsx(r,{})})]},t={args:{value:75,label:"Upload Progress",showPercentage:!0},decorators:[r=>e.jsx("div",{className:"w-80",children:e.jsx(r,{})})]},l={render:()=>e.jsxs("div",{className:"w-80 space-y-4",children:[e.jsx(s,{value:65,color:"primary",label:"Primary",showPercentage:!0}),e.jsx(s,{value:85,color:"success",label:"Success",showPercentage:!0}),e.jsx(s,{value:45,color:"warning",label:"Warning",showPercentage:!0}),e.jsx(s,{value:25,color:"danger",label:"Danger",showPercentage:!0})]})},c={args:{value:72,type:"circular",showPercentage:!0,size:"lg"}},o={render:()=>e.jsxs("div",{className:"flex items-end gap-6",children:[e.jsxs("div",{className:"text-center",children:[e.jsx(s,{value:65,type:"circular",size:"sm",showPercentage:!0}),e.jsx("p",{className:"mt-2 text-sm text-black",children:"Small"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx(s,{value:75,type:"circular",size:"md",showPercentage:!0}),e.jsx("p",{className:"mt-2 text-sm text-black",children:"Medium"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx(s,{value:85,type:"circular",size:"lg",showPercentage:!0}),e.jsx("p",{className:"mt-2 text-sm text-black",children:"Large"})]})]})},n={args:{value:60,type:"stepped",steps:5,label:"Onboarding Progress",showPercentage:!0},decorators:[r=>e.jsx("div",{className:"w-80",children:e.jsx(r,{})})]},p={render:()=>e.jsxs("div",{className:"w-80 space-y-4",children:[e.jsx(s,{value:20,type:"stepped",steps:5,label:"Step 1 of 5"}),e.jsx(s,{value:40,type:"stepped",steps:5,label:"Step 2 of 5"}),e.jsx(s,{value:60,type:"stepped",steps:5,label:"Step 3 of 5"}),e.jsx(s,{value:80,type:"stepped",steps:5,label:"Step 4 of 5"}),e.jsx(s,{value:100,type:"stepped",steps:5,label:"Complete!",color:"success"})]})},d={render:()=>e.jsxs("div",{className:"w-80 p-4 border-2 border-black space-y-4",children:[e.jsx("h3",{className:"font-bold text-black",children:"Uploading files..."}),e.jsx(s,{value:35,label:"document.pdf",showPercentage:!0}),e.jsx(s,{value:100,label:"image.png",showPercentage:!0,color:"success"}),e.jsx(s,{value:12,label:"video.mp4",showPercentage:!0})]})};var i,m,u;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    value: 65
  },
  decorators: [Story => <div className="w-80">
                <Story />
            </div>]
}`,...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var g,v,x;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    value: 75,
    label: 'Upload Progress',
    showPercentage: true
  },
  decorators: [Story => <div className="w-80">
                <Story />
            </div>]
}`,...(x=(v=t.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var P,b,h;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div className="w-80 space-y-4">
            <ProgressBar value={65} color="primary" label="Primary" showPercentage />
            <ProgressBar value={85} color="success" label="Success" showPercentage />
            <ProgressBar value={45} color="warning" label="Warning" showPercentage />
            <ProgressBar value={25} color="danger" label="Danger" showPercentage />
        </div>
}`,...(h=(b=l.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var w,y,j;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    value: 72,
    type: 'circular',
    showPercentage: true,
    size: 'lg'
  }
}`,...(j=(y=c.parameters)==null?void 0:y.docs)==null?void 0:j.source}}};var S,N,f;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="flex items-end gap-6">
            <div className="text-center">
                <ProgressBar value={65} type="circular" size="sm" showPercentage />
                <p className="mt-2 text-sm text-black">Small</p>
            </div>
            <div className="text-center">
                <ProgressBar value={75} type="circular" size="md" showPercentage />
                <p className="mt-2 text-sm text-black">Medium</p>
            </div>
            <div className="text-center">
                <ProgressBar value={85} type="circular" size="lg" showPercentage />
                <p className="mt-2 text-sm text-black">Large</p>
            </div>
        </div>
}`,...(f=(N=o.parameters)==null?void 0:N.docs)==null?void 0:f.source}}};var B,k,z;n.parameters={...n.parameters,docs:{...(B=n.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    value: 60,
    type: 'stepped',
    steps: 5,
    label: 'Onboarding Progress',
    showPercentage: true
  },
  decorators: [Story => <div className="w-80">
                <Story />
            </div>]
}`,...(z=(k=n.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};var C,E,U;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div className="w-80 space-y-4">
            <ProgressBar value={20} type="stepped" steps={5} label="Step 1 of 5" />
            <ProgressBar value={40} type="stepped" steps={5} label="Step 2 of 5" />
            <ProgressBar value={60} type="stepped" steps={5} label="Step 3 of 5" />
            <ProgressBar value={80} type="stepped" steps={5} label="Step 4 of 5" />
            <ProgressBar value={100} type="stepped" steps={5} label="Complete!" color="success" />
        </div>
}`,...(U=(E=p.parameters)==null?void 0:E.docs)==null?void 0:U.source}}};var D,L,W;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div className="w-80 p-4 border-2 border-black space-y-4">
            <h3 className="font-bold text-black">Uploading files...</h3>
            <ProgressBar value={35} label="document.pdf" showPercentage />
            <ProgressBar value={100} label="image.png" showPercentage color="success" />
            <ProgressBar value={12} label="video.mp4" showPercentage />
        </div>
}`,...(W=(L=d.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};const T=["Default","WithLabel","Colors","Circular","CircularSizes","Stepped","StepsExample","UploadExample"];export{c as Circular,o as CircularSizes,l as Colors,a as Default,n as Stepped,p as StepsExample,d as UploadExample,t as WithLabel,T as __namedExportsOrder,R as default};
