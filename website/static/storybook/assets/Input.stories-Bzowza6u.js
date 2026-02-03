import{j as e}from"./jsx-runtime-CDt2p4po.js";import{I as a}from"./Input-DhFss4oc.js";import{L as U}from"./lock-BpRazVO9.js";import{S as _}from"./search-CCKipEn6.js";import{U as O}from"./user-BePscFH1.js";import{M as C}from"./mail-CI1Ybt8r.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";import"./chevron-down-BQmz_Bpa.js";import"./createLucideIcon-CbHznvEr.js";import"./x-prXd1WI5.js";const ee={title:"Atoms/Input",component:a,parameters:{layout:"centered",backgrounds:{default:"wireframe"}},tags:["autodocs"]},r={args:{placeholder:"Enter text..."}},s={args:{placeholder:"Enter your email",type:"email"},render:J=>e.jsxs("div",{className:"w-80 space-y-2",children:[e.jsx("label",{className:"block text-sm font-bold text-black",children:"Email Address"}),e.jsx(a,{...J})]})},l={args:{placeholder:"Search...",icon:_}},o={args:{placeholder:"Enter email",type:"email",rightIcon:e.jsx(C,{className:"h-4 w-4"})}},t={args:{placeholder:"Enter password",type:"password",icon:U}},c={args:{placeholder:"Enter email",error:"Invalid email address",defaultValue:"invalid-email"}},n={args:{placeholder:"Disabled input",disabled:!0,defaultValue:"Cannot edit"}},d={render:()=>e.jsxs("div",{className:"w-80 space-y-4",children:[e.jsx(a,{placeholder:"Text input",type:"text"}),e.jsx(a,{placeholder:"Email input",type:"email"}),e.jsx(a,{placeholder:"Search input",type:"search"})]})},p={render:()=>e.jsxs("div",{className:"w-80 space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"block text-sm font-bold text-black",children:"Full Name"}),e.jsx(a,{placeholder:"John Doe",icon:O})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"block text-sm font-bold text-black",children:"Email"}),e.jsx(a,{placeholder:"john@example.com",type:"email",icon:C})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"block text-sm font-bold text-black",children:"Password"}),e.jsx(a,{placeholder:"••••••••",type:"password",icon:U})]})]})};var i,m,u;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...'
  }
}`,...(u=(m=r.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var h,x,b;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter your email',
    type: 'email'
  },
  render: args => <div className="w-80 space-y-2">
            <label className="block text-sm font-bold text-black">Email Address</label>
            <Input {...args} />
        </div>
}`,...(b=(x=s.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var y,g,f;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search...',
    icon: Search
  }
}`,...(f=(g=l.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var N,j,v;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter email',
    type: 'email',
    rightIcon: <Mail className="h-4 w-4" />
  }
}`,...(v=(j=o.parameters)==null?void 0:j.docs)==null?void 0:v.source}}};var E,k,w;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter password',
    type: 'password',
    icon: Lock
  }
}`,...(w=(k=t.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var I,S,D;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter email',
    error: 'Invalid email address',
    defaultValue: 'invalid-email'
  }
}`,...(D=(S=c.parameters)==null?void 0:S.docs)==null?void 0:D.source}}};var L,W,F;n.parameters={...n.parameters,docs:{...(L=n.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    placeholder: 'Disabled input',
    disabled: true,
    defaultValue: 'Cannot edit'
  }
}`,...(F=(W=n.parameters)==null?void 0:W.docs)==null?void 0:F.source}}};var M,P,T;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div className="w-80 space-y-4">
            <Input placeholder="Text input" type="text" />
            <Input placeholder="Email input" type="email" />
            <Input placeholder="Search input" type="search" />
        </div>
}`,...(T=(P=d.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};var V,A,R;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <div className="w-80 space-y-4">
            <div className="space-y-2">
                <label className="block text-sm font-bold text-black">Full Name</label>
                <Input placeholder="John Doe" icon={User} />
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-bold text-black">Email</label>
                <Input placeholder="john@example.com" type="email" icon={Mail} />
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-bold text-black">Password</label>
                <Input placeholder="••••••••" type="password" icon={Lock} />
            </div>
        </div>
}`,...(R=(A=p.parameters)==null?void 0:A.docs)==null?void 0:R.source}}};const ae=["Default","WithLabel","WithLeftIcon","WithRightIcon","Password","WithError","Disabled","Types","FormExample"];export{r as Default,n as Disabled,p as FormExample,t as Password,d as Types,c as WithError,s as WithLabel,l as WithLeftIcon,o as WithRightIcon,ae as __namedExportsOrder,ee as default};
