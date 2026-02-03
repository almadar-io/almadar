import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as P,R as re}from"./index-GiUgBvb1.js";import{B as T}from"./Button-Dn0472P0.js";import{T as t}from"./Typography-Wmkp-g7N.js";import{B as l}from"./Box-DYJzRMmP.js";import{I as k}from"./Icon-DDCXmKGr.js";import{c}from"./cn-BNf5BS2b.js";import{C as se}from"./check-DliVttWt.js";import{C as te}from"./chevron-left-zGYeMbNT.js";import{C as oe}from"./chevron-right-pDF_OUfd.js";import{I as W}from"./Input-DhFss4oc.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./lock-BpRazVO9.js";import"./share-2-BGRL1FH9.js";import"./zap-DLdLcnjT.js";import"./refresh-cw-Ocr-wooT.js";import"./external-link-k_e-i1vS.js";import"./link-Csz5KqWX.js";import"./home-JwtCVJF2.js";import"./star-D_3mxVsm.js";import"./clock-DT9ve7xf.js";import"./calendar-rGtwHcH_.js";import"./pause-BGY7Ki7b.js";import"./play-C6U2eifx.js";import"./eye-DPfPdwVp.js";import"./list-B6-UEXVq.js";import"./grid-3x3-DCQtfzd8.js";import"./filter-CMfXM6HV.js";import"./search-CCKipEn6.js";import"./settings-DBj1i3lR.js";import"./user-plus-BlQDsowZ.js";import"./users-CV1mGUsS.js";import"./user-BePscFH1.js";import"./phone-XSC4O3No.js";import"./send-CHVRrjpn.js";import"./message-circle-Yw7MGdXs.js";import"./mail-CI1Ybt8r.js";import"./download-yLSRVNFt.js";import"./file-text-DZQctV9o.js";import"./copy-B40iJsJp.js";import"./save-DyJeJ3Zl.js";import"./trash-2-ChlfdFMf.js";import"./square-pen-D7sL1yO_.js";import"./minus-CvoF9liV.js";import"./plus-jSzJaRn3.js";import"./info-CF8EgE8A.js";import"./alert-triangle-BLuUOBNm.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";import"./menu-DUN0as2h.js";import"./x-prXd1WI5.js";import"./arrow-left-CMPuXvFr.js";import"./arrow-right-BdVPe8wH.js";import"./chevron-up-B8qTw58L.js";import"./chevron-down-BQmz_Bpa.js";const C=({steps:r,currentStep:i,onStepChange:u,onComplete:w,showProgress:X=!0,allowBack:h=!0,compact:x=!1,className:G,entity:ce})=>{const[H,J]=P.useState(0),z=(()=>{if(i==null)return;if(typeof i=="number")return i;if(typeof i=="string")return parseInt(i,10);const s=Number(i);return isNaN(s)?void 0:s})(),o=z!==void 0?z:H,d=r.length,a=r[o],B=o===0,N=o===d-1,S=P.useCallback(s=>{s<0||s>=d||(i===void 0&&J(s),u==null||u(s))},[i,d,u]),Q=()=>{a.isValid&&!a.isValid()||(N?w==null||w():S(o+1))},U=()=>{!B&&h&&S(o-1)};return e.jsxs(l,{className:c("flex flex-col h-full",G),children:[X&&e.jsx(l,{border:!0,className:c("border-b-2 border-x-0 border-t-0 border-[var(--color-border)]",x?"px-4 py-2":"px-6 py-4"),children:e.jsx("div",{className:"flex items-center gap-2",children:r.map((s,n)=>{const g=n===o,m=n<o,Z=s.id??s.tabId??`step-${n}`,ee=s.title??s.name??`Step ${n+1}`;return e.jsxs(re.Fragment,{children:[e.jsx("button",{onClick:()=>m&&h&&S(n),disabled:!m||!h,className:c("w-8 h-8 flex items-center justify-center text-sm font-bold transition-colors","border-2 border-[var(--color-border)]",g&&"bg-[var(--color-primary)] text-[var(--color-primary-foreground)]",m&&"bg-[var(--color-primary)] text-[var(--color-primary-foreground)] cursor-pointer hover:bg-[var(--color-primary-hover)]",!g&&!m&&"bg-[var(--color-card)] text-[var(--color-foreground)]"),children:m?e.jsx(k,{icon:se,size:"sm"}):n+1}),e.jsx("div",{className:c("hidden md:block",g?"text-[var(--color-foreground)] font-bold":"text-[var(--color-muted-foreground)]"),children:e.jsx(t,{variant:"small",weight:g?"bold":"normal",children:ee})}),n<d-1&&e.jsx("div",{className:c("flex-1 h-0.5",n<o?"bg-[var(--color-primary)]":"bg-[var(--color-border)]")})]},Z)})})}),!x&&a&&e.jsxs(l,{paddingX:"lg",paddingY:"md",border:!0,className:"border-b-2 border-x-0 border-t-0 border-[var(--color-border)]",children:[e.jsx(t,{variant:"h4",as:"h2",children:a.title??a.name??`Step ${o+1}`}),a.description&&e.jsx(t,{variant:"body2",className:"text-[var(--color-muted-foreground)] mt-1",children:a.description})]}),e.jsx("div",{className:c("flex-1 overflow-auto",x?"p-4":"p-6"),children:a==null?void 0:a.content}),e.jsxs(l,{border:!0,className:c("border-t-2 border-x-0 border-b-0 border-[var(--color-border)] flex justify-between",x?"px-4 py-2":"px-6 py-4"),children:[e.jsxs(T,{variant:"secondary",onClick:U,disabled:B||!h,children:[e.jsx(k,{icon:te,size:"sm"}),"Back"]}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs(t,{variant:"caption",className:"text-[var(--color-muted-foreground)]",children:["Step ",o+1," of ",d]})}),e.jsxs(T,{variant:"primary",onClick:Q,children:[N?"Complete":"Next",!N&&e.jsx(k,{icon:oe,size:"sm"})]})]})]})};C.displayName="WizardContainer";C.__docgenInfo={description:"WizardContainer - Multi-step wizard",methods:[],displayName:"WizardContainer",props:{steps:{required:!0,tsType:{name:"Array",elements:[{name:"WizardStep"}],raw:"WizardStep[]"},description:"Wizard steps"},currentStep:{required:!1,tsType:{name:"union",raw:"number | string | unknown",elements:[{name:"number"},{name:"string"},{name:"unknown"}]},description:"Current step index (controlled) - accepts unknown for generated code compatibility"},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(stepIndex: number) => void",signature:{arguments:[{type:{name:"number"},name:"stepIndex"}],return:{name:"void"}}},description:"Callback when step changes"},onComplete:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when wizard is completed"},showProgress:{required:!1,tsType:{name:"boolean"},description:"Show progress indicator",defaultValue:{value:"true",computed:!1}},allowBack:{required:!1,tsType:{name:"boolean"},description:"Allow navigation to previous steps",defaultValue:{value:"true",computed:!1}},compact:{required:!1,tsType:{name:"boolean"},description:"Modal mode (compact header, no padding)",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"},entity:{required:!1,tsType:{name:"string"},description:"Entity type name (schema-driven)"}}};const mr={title:"Organisms/WizardContainer",component:C,parameters:{layout:"fullscreen",backgrounds:{default:"wireframe"}},tags:["autodocs"]},ae=()=>e.jsxs(l,{children:[e.jsx(t,{variant:"body1",className:"mb-4",children:"Welcome to the setup wizard. Let's get started by entering your basic information."}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx(t,{variant:"small",weight:"semibold",className:"mb-1 block",children:"Name"}),e.jsx(W,{placeholder:"Enter your name"})]}),e.jsxs("div",{children:[e.jsx(t,{variant:"small",weight:"semibold",className:"mb-1 block",children:"Email"}),e.jsx(W,{type:"email",placeholder:"Enter your email"})]})]})]}),ie=()=>e.jsxs(l,{children:[e.jsx(t,{variant:"body1",className:"mb-4",children:"Now let's configure your preferences."}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx(t,{variant:"small",weight:"semibold",className:"mb-1 block",children:"Theme"}),e.jsxs("select",{className:"w-full border-2 border-black p-2",children:[e.jsx("option",{children:"Light"}),e.jsx("option",{children:"Dark"}),e.jsx("option",{children:"System"})]})]}),e.jsxs("div",{children:[e.jsx(t,{variant:"small",weight:"semibold",className:"mb-1 block",children:"Language"}),e.jsxs("select",{className:"w-full border-2 border-black p-2",children:[e.jsx("option",{children:"English"}),e.jsx("option",{children:"Spanish"}),e.jsx("option",{children:"French"})]})]})]})]}),ne=()=>e.jsxs(l,{className:"text-center py-8",children:[e.jsx(t,{variant:"h3",className:"mb-4",children:"All Done!"}),e.jsx(t,{variant:"body1",className:"text-neutral-600",children:'Your account has been set up successfully. Click "Complete" to finish.'})]}),p=[{id:"info",title:"Basic Information",description:"Enter your personal details",content:e.jsx(ae,{})},{id:"preferences",title:"Preferences",description:"Configure your settings",content:e.jsx(ie,{})},{id:"complete",title:"Complete",description:"Review and finish",content:e.jsx(ne,{})}],f={args:{steps:p,showProgress:!0,allowBack:!0,onComplete:()=>console.log("Wizard completed!")},decorators:[r=>e.jsx("div",{style:{height:"600px",width:"100%"},children:e.jsx(r,{})})]},b={args:{steps:p,showProgress:!1,allowBack:!0},decorators:[r=>e.jsx("div",{style:{height:"500px",width:"100%"},children:e.jsx(r,{})})]},v={args:{steps:p,showProgress:!0,allowBack:!1},decorators:[r=>e.jsx("div",{style:{height:"600px",width:"100%"},children:e.jsx(r,{})})]},y={args:{steps:p,showProgress:!0,allowBack:!0,compact:!0},decorators:[r=>e.jsx("div",{style:{height:"400px",width:"100%"},children:e.jsx(r,{})})]},j={args:{steps:p,currentStep:1,showProgress:!0,allowBack:!0},decorators:[r=>e.jsx("div",{style:{height:"600px",width:"100%"},children:e.jsx(r,{})})]};var q,E,I;f.parameters={...f.parameters,docs:{...(q=f.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    steps: sampleSteps,
    showProgress: true,
    allowBack: true,
    onComplete: () => console.log('Wizard completed!')
  },
  decorators: [Story => <div style={{
    height: '600px',
    width: '100%'
  }}>
                <Story />
            </div>]
}`,...(I=(E=f.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};var A,L,R;b.parameters={...b.parameters,docs:{...(A=b.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    steps: sampleSteps,
    showProgress: false,
    allowBack: true
  },
  decorators: [Story => <div style={{
    height: '500px',
    width: '100%'
  }}>
                <Story />
            </div>]
}`,...(R=(L=b.parameters)==null?void 0:L.docs)==null?void 0:R.source}}};var V,_,M;v.parameters={...v.parameters,docs:{...(V=v.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    steps: sampleSteps,
    showProgress: true,
    allowBack: false
  },
  decorators: [Story => <div style={{
    height: '600px',
    width: '100%'
  }}>
                <Story />
            </div>]
}`,...(M=(_=v.parameters)==null?void 0:_.docs)==null?void 0:M.source}}};var D,F,$;y.parameters={...y.parameters,docs:{...(D=y.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    steps: sampleSteps,
    showProgress: true,
    allowBack: true,
    compact: true
  },
  decorators: [Story => <div style={{
    height: '400px',
    width: '100%'
  }}>
                <Story />
            </div>]
}`,...($=(F=y.parameters)==null?void 0:F.docs)==null?void 0:$.source}}};var O,Y,K;j.parameters={...j.parameters,docs:{...(O=j.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    steps: sampleSteps,
    currentStep: 1,
    showProgress: true,
    allowBack: true
  },
  decorators: [Story => <div style={{
    height: '600px',
    width: '100%'
  }}>
                <Story />
            </div>]
}`,...(K=(Y=j.parameters)==null?void 0:Y.docs)==null?void 0:K.source}}};const pr=["Default","NoProgress","NoBackNavigation","CompactMode","SecondStep"];export{y as CompactMode,f as Default,v as NoBackNavigation,b as NoProgress,j as SecondStep,pr as __namedExportsOrder,mr as default};
