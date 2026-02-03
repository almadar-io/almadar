import{j as e}from"./jsx-runtime-CDt2p4po.js";import{R as a}from"./Radio-DlbJoV6R.js";import{r as B}from"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";const _={title:"Atoms/Radio",component:a,parameters:{layout:"centered",backgrounds:{default:"wireframe"}},tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"]}}},s={args:{label:"Option 1"}},t={args:{label:"Selected option",checked:!0}},o={args:{label:"Premium Plan",helperText:"Best for growing teams with advanced needs."}},n={args:{label:"Option with error",error:"This option is not available",checked:!0}},l={args:{label:"Disabled option",disabled:!0}},c={render:()=>e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{label:"Small",size:"sm",name:"sizes"}),e.jsx(a,{label:"Medium (default)",size:"md",name:"sizes"}),e.jsx(a,{label:"Large",size:"lg",name:"sizes"})]})},d={render:function(){const[r,m]=B.useState("starter");return e.jsxs("div",{className:"space-y-4 w-80",children:[e.jsx("p",{className:"font-bold text-black mb-2",children:"Select a plan:"}),e.jsx(a,{label:"Starter",helperText:"$9/month - For individuals",name:"plan",checked:r==="starter",onChange:()=>m("starter")}),e.jsx(a,{label:"Professional",helperText:"$29/month - For small teams",name:"plan",checked:r==="professional",onChange:()=>m("professional")}),e.jsx(a,{label:"Enterprise",helperText:"$99/month - For large organizations",name:"plan",checked:r==="enterprise",onChange:()=>m("enterprise")}),e.jsxs("p",{className:"pt-4 text-sm text-neutral-600",children:["Selected: ",e.jsx("span",{className:"font-bold text-black",children:r})]})]})}},i={render:()=>e.jsxs("div",{className:"w-80 p-4 border-2 border-black space-y-4",children:[e.jsx("h3",{className:"font-bold text-black",children:"Payment Method"}),e.jsx(a,{label:"Credit Card",name:"payment",defaultChecked:!0}),e.jsx(a,{label:"PayPal",name:"payment"}),e.jsx(a,{label:"Bank Transfer",name:"payment"}),e.jsx(a,{label:"Cryptocurrency",name:"payment",disabled:!0})]})};var p,u,b;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    label: 'Option 1'
  }
}`,...(b=(u=s.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};var h,x,g;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: 'Selected option',
    checked: true
  }
}`,...(g=(x=t.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var f,S,y;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    label: 'Premium Plan',
    helperText: 'Best for growing teams with advanced needs.'
  }
}`,...(y=(S=o.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var k,j,R;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    label: 'Option with error',
    error: 'This option is not available',
    checked: true
  }
}`,...(R=(j=n.parameters)==null?void 0:j.docs)==null?void 0:R.source}}};var z,C,v;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    label: 'Disabled option',
    disabled: true
  }
}`,...(v=(C=l.parameters)==null?void 0:C.docs)==null?void 0:v.source}}};var T,N,P;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">
            <Radio label="Small" size="sm" name="sizes" />
            <Radio label="Medium (default)" size="md" name="sizes" />
            <Radio label="Large" size="lg" name="sizes" />
        </div>
}`,...(P=(N=c.parameters)==null?void 0:N.docs)==null?void 0:P.source}}};var w,E,F;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: function RadioGroupStory() {
    const [selected, setSelected] = useState('starter');
    return <div className="space-y-4 w-80">
                <p className="font-bold text-black mb-2">Select a plan:</p>
                <Radio label="Starter" helperText="$9/month - For individuals" name="plan" checked={selected === 'starter'} onChange={() => setSelected('starter')} />
                <Radio label="Professional" helperText="$29/month - For small teams" name="plan" checked={selected === 'professional'} onChange={() => setSelected('professional')} />
                <Radio label="Enterprise" helperText="$99/month - For large organizations" name="plan" checked={selected === 'enterprise'} onChange={() => setSelected('enterprise')} />
                <p className="pt-4 text-sm text-neutral-600">
                    Selected: <span className="font-bold text-black">{selected}</span>
                </p>
            </div>;
  }
}`,...(F=(E=d.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};var D,$,O;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div className="w-80 p-4 border-2 border-black space-y-4">
            <h3 className="font-bold text-black">Payment Method</h3>
            <Radio label="Credit Card" name="payment" defaultChecked />
            <Radio label="PayPal" name="payment" />
            <Radio label="Bank Transfer" name="payment" />
            <Radio label="Cryptocurrency" name="payment" disabled />
        </div>
}`,...(O=($=i.parameters)==null?void 0:$.docs)==null?void 0:O.source}}};const A=["Default","Checked","WithHelperText","WithError","Disabled","Sizes","RadioGroup","FormExample"];export{t as Checked,s as Default,l as Disabled,i as FormExample,d as RadioGroup,c as Sizes,n as WithError,o as WithHelperText,A as __namedExportsOrder,_ as default};
