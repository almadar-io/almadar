import{j as e}from"./jsx-runtime-CDt2p4po.js";import{S as n}from"./Select-CVuTODQb.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";import"./chevron-down-BQmz_Bpa.js";import"./createLucideIcon-CbHznvEr.js";const L={title:"Atoms/Select",component:n,parameters:{layout:"centered",backgrounds:{default:"wireframe"}},tags:["autodocs"]},a=[{value:"us",label:"United States"},{value:"uk",label:"United Kingdom"},{value:"de",label:"Germany"},{value:"fr",label:"France"},{value:"jp",label:"Japan"}],E=[{value:"active",label:"Active"},{value:"pending",label:"Pending"},{value:"inactive",label:"Inactive"},{value:"archived",label:"Archived",disabled:!0}],s={args:{options:a,placeholder:"Select a country..."}},t={render:()=>e.jsxs("div",{className:"w-64 space-y-2",children:[e.jsx("label",{className:"block text-sm font-bold text-black",children:"Country"}),e.jsx(n,{options:a,placeholder:"Select a country..."})]})},r={args:{options:a,placeholder:"Select a country...",error:"This field is required"}},o={args:{options:E,placeholder:"Select status..."}},l={args:{options:a,placeholder:"Select a country...",disabled:!0}},c={render:()=>e.jsxs("div",{className:"w-64 space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"block text-sm font-bold text-black",children:"Country"}),e.jsx(n,{options:a,placeholder:"Select a country..."})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"block text-sm font-bold text-black",children:"Status"}),e.jsx(n,{options:E,placeholder:"Select status..."})]})]})};var i,d,p;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    options: countryOptions,
    placeholder: 'Select a country...'
  }
}`,...(p=(d=s.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var u,m,b;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div className="w-64 space-y-2">
            <label className="block text-sm font-bold text-black">Country</label>
            <Select options={countryOptions} placeholder="Select a country..." />
        </div>
}`,...(b=(m=t.parameters)==null?void 0:m.docs)==null?void 0:b.source}}};var h,y,S;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    options: countryOptions,
    placeholder: 'Select a country...',
    error: 'This field is required'
  }
}`,...(S=(y=r.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var x,v,g;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    options: statusOptions,
    placeholder: 'Select status...'
  }
}`,...(g=(v=o.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var f,k,N;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    options: countryOptions,
    placeholder: 'Select a country...',
    disabled: true
  }
}`,...(N=(k=l.parameters)==null?void 0:k.docs)==null?void 0:N.source}}};var j,O,D;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div className="w-64 space-y-4">
            <div className="space-y-2">
                <label className="block text-sm font-bold text-black">Country</label>
                <Select options={countryOptions} placeholder="Select a country..." />
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-bold text-black">Status</label>
                <Select options={statusOptions} placeholder="Select status..." />
            </div>
        </div>
}`,...(D=(O=c.parameters)==null?void 0:O.docs)==null?void 0:D.source}}};const T=["Default","WithLabel","WithError","WithDisabledOption","Disabled","FormExample"];export{s as Default,l as Disabled,c as FormExample,o as WithDisabledOption,r as WithError,t as WithLabel,T as __namedExportsOrder,L as default};
