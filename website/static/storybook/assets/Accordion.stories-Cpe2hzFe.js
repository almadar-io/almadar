import{j as e}from"./jsx-runtime-CDt2p4po.js";import{A as S}from"./Accordion-DV-Uk2yL.js";import"./index-GiUgBvb1.js";import"./Icon-T0wFb734.js";import"./cn-BNf5BS2b.js";import"./createLucideIcon-CbHznvEr.js";import"./lock-BpRazVO9.js";import"./share-2-BGRL1FH9.js";import"./zap-DLdLcnjT.js";import"./refresh-cw-Ocr-wooT.js";import"./external-link-k_e-i1vS.js";import"./link-Csz5KqWX.js";import"./home-JwtCVJF2.js";import"./star-D_3mxVsm.js";import"./clock-DT9ve7xf.js";import"./calendar-rGtwHcH_.js";import"./pause-BGY7Ki7b.js";import"./play-C6U2eifx.js";import"./eye-DPfPdwVp.js";import"./list-B6-UEXVq.js";import"./grid-3x3-DCQtfzd8.js";import"./filter-CMfXM6HV.js";import"./search-CCKipEn6.js";import"./settings-DBj1i3lR.js";import"./user-plus-BlQDsowZ.js";import"./users-CV1mGUsS.js";import"./user-BePscFH1.js";import"./phone-XSC4O3No.js";import"./send-CHVRrjpn.js";import"./message-circle-Yw7MGdXs.js";import"./mail-CI1Ybt8r.js";import"./download-yLSRVNFt.js";import"./file-text-DZQctV9o.js";import"./copy-B40iJsJp.js";import"./save-DyJeJ3Zl.js";import"./trash-2-ChlfdFMf.js";import"./square-pen-D7sL1yO_.js";import"./minus-CvoF9liV.js";import"./plus-jSzJaRn3.js";import"./loader-2-DXp1ic5P.js";import"./info-CF8EgE8A.js";import"./alert-triangle-BLuUOBNm.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";import"./check-DliVttWt.js";import"./menu-DUN0as2h.js";import"./x-prXd1WI5.js";import"./arrow-left-CMPuXvFr.js";import"./arrow-right-BdVPe8wH.js";import"./chevron-up-B8qTw58L.js";import"./chevron-down-BQmz_Bpa.js";import"./chevron-left-zGYeMbNT.js";import"./chevron-right-pDF_OUfd.js";import"./Typography-Wmkp-g7N.js";const je={title:"Molecules/Accordion",component:S,parameters:{layout:"centered",backgrounds:{default:"wireframe"}},tags:["autodocs"]},c=[{id:"faq-1",header:"What is this component library?",content:"This is a wireframe-themed component library built with React and Tailwind CSS, following Atomic Design principles."},{id:"faq-2",header:"How do I use it?",content:"Simply import the components you need and use them in your React application. All components are styled with the wireframe theme by default."},{id:"faq-3",header:"Is it customizable?",content:"Yes! You can customize the components using className props and Tailwind CSS utilities. The base theme provides high contrast black and white styling."}],t={args:{items:c},decorators:[a=>e.jsx("div",{className:"w-96",children:e.jsx(a,{})})]},s={args:{items:c,multiple:!1,defaultOpenItems:["faq-1"]},decorators:[a=>e.jsx("div",{className:"w-96",children:e.jsx(a,{})})]},r={args:{items:c,multiple:!0,defaultOpenItems:["faq-1","faq-2"]},decorators:[a=>e.jsx("div",{className:"w-96",children:e.jsx(a,{})})]},i={args:{items:[...c,{id:"faq-4",header:"Disabled Item",content:"This item is disabled and cannot be opened.",disabled:!0}]},decorators:[a=>e.jsx("div",{className:"w-96",children:e.jsx(a,{})})]},o={render:()=>e.jsxs("div",{className:"w-96",children:[e.jsx("h3",{className:"font-bold text-black mb-4",children:"Settings"}),e.jsx(S,{items:[{id:"general",header:"General Settings",content:e.jsxs("div",{className:"space-y-2",children:[e.jsxs("label",{className:"flex items-center gap-2",children:[e.jsx("input",{type:"checkbox",className:"border-2 border-black"}),e.jsx("span",{className:"text-black",children:"Enable notifications"})]}),e.jsxs("label",{className:"flex items-center gap-2",children:[e.jsx("input",{type:"checkbox",className:"border-2 border-black"}),e.jsx("span",{className:"text-black",children:"Dark mode"})]})]}),defaultOpen:!0},{id:"privacy",header:"Privacy Settings",content:e.jsxs("div",{className:"space-y-2",children:[e.jsxs("label",{className:"flex items-center gap-2",children:[e.jsx("input",{type:"checkbox",className:"border-2 border-black",defaultChecked:!0}),e.jsx("span",{className:"text-black",children:"Share usage data"})]}),e.jsxs("label",{className:"flex items-center gap-2",children:[e.jsx("input",{type:"checkbox",className:"border-2 border-black"}),e.jsx("span",{className:"text-black",children:"Allow cookies"})]})]})},{id:"advanced",header:"Advanced Settings",content:e.jsx("p",{className:"text-neutral-600",children:"Advanced configuration options for power users."})}],multiple:!0})]})};var l,m,n;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    items: faqItems
  },
  decorators: [Story => <div className="w-96">
                <Story />
            </div>]
}`,...(n=(m=t.parameters)==null?void 0:m.docs)==null?void 0:n.source}}};var d,p,b;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    items: faqItems,
    multiple: false,
    defaultOpenItems: ['faq-1']
  },
  decorators: [Story => <div className="w-96">
                <Story />
            </div>]
}`,...(b=(p=s.parameters)==null?void 0:p.docs)==null?void 0:b.source}}};var u,h,x;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    items: faqItems,
    multiple: true,
    defaultOpenItems: ['faq-1', 'faq-2']
  },
  decorators: [Story => <div className="w-96">
                <Story />
            </div>]
}`,...(x=(h=r.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var f,g,N;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    items: [...faqItems, {
      id: 'faq-4',
      header: 'Disabled Item',
      content: 'This item is disabled and cannot be opened.',
      disabled: true
    }]
  },
  decorators: [Story => <div className="w-96">
                <Story />
            </div>]
}`,...(N=(g=i.parameters)==null?void 0:g.docs)==null?void 0:N.source}}};var k,y,v;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div className="w-96">
            <h3 className="font-bold text-black mb-4">Settings</h3>
            <Accordion items={[{
      id: 'general',
      header: 'General Settings',
      content: <div className="space-y-2">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="border-2 border-black" />
                                    <span className="text-black">Enable notifications</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="border-2 border-black" />
                                    <span className="text-black">Dark mode</span>
                                </label>
                            </div>,
      defaultOpen: true
    }, {
      id: 'privacy',
      header: 'Privacy Settings',
      content: <div className="space-y-2">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="border-2 border-black" defaultChecked />
                                    <span className="text-black">Share usage data</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="border-2 border-black" />
                                    <span className="text-black">Allow cookies</span>
                                </label>
                            </div>
    }, {
      id: 'advanced',
      header: 'Advanced Settings',
      content: <p className="text-neutral-600">
                                Advanced configuration options for power users.
                            </p>
    }]} multiple />
        </div>
}`,...(v=(y=o.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};const we=["Default","SingleOpen","MultipleOpen","WithDisabledItem","SettingsExample"];export{t as Default,r as MultipleOpen,o as SettingsExample,s as SingleOpen,i as WithDisabledItem,we as __namedExportsOrder,je as default};
