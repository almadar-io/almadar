import{j as e}from"./jsx-runtime-CDt2p4po.js";import{C as a}from"./Checkbox-JlfTorra.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";const G={title:"Atoms/Checkbox",component:a,parameters:{layout:"centered",backgrounds:{default:"wireframe"}},tags:["autodocs"]},r={args:{label:"Accept terms and conditions"}},s={args:{label:"I agree",defaultChecked:!0}},c={args:{}},t={args:{label:"Disabled checkbox",disabled:!0}},l={args:{label:"Disabled and checked",disabled:!0,defaultChecked:!0}},o={render:()=>e.jsxs("div",{className:"space-y-3",children:[e.jsx("p",{className:"font-bold text-black mb-2",children:"Select your interests:"}),e.jsx(a,{label:"Design"}),e.jsx(a,{label:"Development",defaultChecked:!0}),e.jsx(a,{label:"Marketing"}),e.jsx(a,{label:"Analytics"})]})},d={render:()=>e.jsxs("div",{className:"w-80 space-y-4 p-4 border-2 border-black",children:[e.jsx("h3",{className:"font-bold text-black",children:"Newsletter Preferences"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(a,{label:"Weekly digest",defaultChecked:!0}),e.jsx(a,{label:"Product updates",defaultChecked:!0}),e.jsx(a,{label:"Marketing emails"}),e.jsx(a,{label:"Partner offers"})]})]})};var n,b,i;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    label: 'Accept terms and conditions'
  }
}`,...(i=(b=r.parameters)==null?void 0:b.docs)==null?void 0:i.source}}};var m,u,p;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    label: 'I agree',
    defaultChecked: true
  }
}`,...(p=(u=s.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var k,h,x;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {}
}`,...(x=(h=c.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var g,f,C;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: 'Disabled checkbox',
    disabled: true
  }
}`,...(C=(f=t.parameters)==null?void 0:f.docs)==null?void 0:C.source}}};var j,D,y;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    label: 'Disabled and checked',
    disabled: true,
    defaultChecked: true
  }
}`,...(y=(D=l.parameters)==null?void 0:D.docs)==null?void 0:y.source}}};var N,v,S;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div className="space-y-3">
            <p className="font-bold text-black mb-2">Select your interests:</p>
            <Checkbox label="Design" />
            <Checkbox label="Development" defaultChecked />
            <Checkbox label="Marketing" />
            <Checkbox label="Analytics" />
        </div>
}`,...(S=(v=o.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var P,w,A;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div className="w-80 space-y-4 p-4 border-2 border-black">
            <h3 className="font-bold text-black">Newsletter Preferences</h3>
            <div className="space-y-2">
                <Checkbox label="Weekly digest" defaultChecked />
                <Checkbox label="Product updates" defaultChecked />
                <Checkbox label="Marketing emails" />
                <Checkbox label="Partner offers" />
            </div>
        </div>
}`,...(A=(w=d.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};const I=["Default","Checked","WithoutLabel","Disabled","DisabledChecked","CheckboxGroup","FormExample"];export{o as CheckboxGroup,s as Checked,r as Default,t as Disabled,l as DisabledChecked,d as FormExample,c as WithoutLabel,I as __namedExportsOrder,G as default};
