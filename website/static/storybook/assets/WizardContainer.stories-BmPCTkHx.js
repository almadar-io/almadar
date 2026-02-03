import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as z,R as Z}from"./index-GiUgBvb1.js";import{B as P}from"./Button-B7t-_IKa.js";import{T as s}from"./Typography-Wmkp-g7N.js";import{B as n}from"./Box-DYJzRMmP.js";import{I as k}from"./Icon-T0wFb734.js";import{c as i}from"./cn-BNf5BS2b.js";import{C as $}from"./check-DliVttWt.js";import{C as ee}from"./chevron-left-zGYeMbNT.js";import{C as re}from"./chevron-right-pDF_OUfd.js";import{I as T}from"./Input-DhFss4oc.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./lock-BpRazVO9.js";import"./share-2-BGRL1FH9.js";import"./zap-DLdLcnjT.js";import"./refresh-cw-Ocr-wooT.js";import"./external-link-k_e-i1vS.js";import"./link-Csz5KqWX.js";import"./home-JwtCVJF2.js";import"./star-D_3mxVsm.js";import"./clock-DT9ve7xf.js";import"./calendar-rGtwHcH_.js";import"./pause-BGY7Ki7b.js";import"./play-C6U2eifx.js";import"./eye-DPfPdwVp.js";import"./list-B6-UEXVq.js";import"./grid-3x3-DCQtfzd8.js";import"./filter-CMfXM6HV.js";import"./search-CCKipEn6.js";import"./settings-DBj1i3lR.js";import"./user-plus-BlQDsowZ.js";import"./users-CV1mGUsS.js";import"./user-BePscFH1.js";import"./phone-XSC4O3No.js";import"./send-CHVRrjpn.js";import"./message-circle-Yw7MGdXs.js";import"./mail-CI1Ybt8r.js";import"./download-yLSRVNFt.js";import"./file-text-DZQctV9o.js";import"./copy-B40iJsJp.js";import"./save-DyJeJ3Zl.js";import"./trash-2-ChlfdFMf.js";import"./square-pen-D7sL1yO_.js";import"./minus-CvoF9liV.js";import"./plus-jSzJaRn3.js";import"./info-CF8EgE8A.js";import"./alert-triangle-BLuUOBNm.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";import"./menu-DUN0as2h.js";import"./x-prXd1WI5.js";import"./arrow-left-CMPuXvFr.js";import"./arrow-right-BdVPe8wH.js";import"./chevron-up-B8qTw58L.js";import"./chevron-down-BQmz_Bpa.js";const C=({steps:r,currentStep:m,onStepChange:u,onComplete:w,showProgress:G=!0,allowBack:h=!0,compact:x=!1,className:H})=>{const[J,K]=z.useState(0),t=m!==void 0?m:J,c=r.length,o=r[t],B=t===0,S=t===c-1,N=z.useCallback(a=>{a<0||a>=c||(m===void 0&&K(a),u==null||u(a))},[m,c,u]),Q=()=>{o.isValid&&!o.isValid()||(S?w==null||w():N(t+1))},U=()=>{!B&&h&&N(t-1)};return e.jsxs(n,{className:i("flex flex-col h-full",H),children:[G&&e.jsx(n,{border:!0,className:i("border-b-2 border-x-0 border-t-0 border-[var(--color-border)]",x?"px-4 py-2":"px-6 py-4"),children:e.jsx("div",{className:"flex items-center gap-2",children:r.map((a,l)=>{const g=l===t,d=l<t;return e.jsxs(Z.Fragment,{children:[e.jsx("button",{onClick:()=>d&&h&&N(l),disabled:!d||!h,className:i("w-8 h-8 flex items-center justify-center text-sm font-bold transition-colors","border-2 border-[var(--color-border)]",g&&"bg-[var(--color-primary)] text-[var(--color-primary-foreground)]",d&&"bg-[var(--color-primary)] text-[var(--color-primary-foreground)] cursor-pointer hover:bg-[var(--color-primary-hover)]",!g&&!d&&"bg-[var(--color-card)] text-[var(--color-foreground)]"),children:d?e.jsx(k,{icon:$,size:"sm"}):l+1}),e.jsx("div",{className:i("hidden md:block",g?"text-[var(--color-foreground)] font-bold":"text-[var(--color-muted-foreground)]"),children:e.jsx(s,{variant:"small",weight:g?"bold":"normal",children:a.title})}),l<c-1&&e.jsx("div",{className:i("flex-1 h-0.5",l<t?"bg-[var(--color-primary)]":"bg-[var(--color-border)]")})]},a.id)})})}),!x&&o&&e.jsxs(n,{paddingX:"lg",paddingY:"md",border:!0,className:"border-b-2 border-x-0 border-t-0 border-[var(--color-border)]",children:[e.jsx(s,{variant:"h4",as:"h2",children:o.title}),o.description&&e.jsx(s,{variant:"body2",className:"text-[var(--color-muted-foreground)] mt-1",children:o.description})]}),e.jsx("div",{className:i("flex-1 overflow-auto",x?"p-4":"p-6"),children:o==null?void 0:o.content}),e.jsxs(n,{border:!0,className:i("border-t-2 border-x-0 border-b-0 border-[var(--color-border)] flex justify-between",x?"px-4 py-2":"px-6 py-4"),children:[e.jsxs(P,{variant:"secondary",onClick:U,disabled:B||!h,children:[e.jsx(k,{icon:ee,size:"sm"}),"Back"]}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs(s,{variant:"caption",className:"text-[var(--color-muted-foreground)]",children:["Step ",t+1," of ",c]})}),e.jsxs(P,{variant:"primary",onClick:Q,children:[S?"Complete":"Next",!S&&e.jsx(k,{icon:re,size:"sm"})]})]})]})};C.displayName="WizardContainer";C.__docgenInfo={description:"WizardContainer - Multi-step wizard",methods:[],displayName:"WizardContainer",props:{steps:{required:!0,tsType:{name:"Array",elements:[{name:"WizardStep"}],raw:"WizardStep[]"},description:"Wizard steps"},currentStep:{required:!1,tsType:{name:"number"},description:"Current step index (controlled)"},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(stepIndex: number) => void",signature:{arguments:[{type:{name:"number"},name:"stepIndex"}],return:{name:"void"}}},description:"Callback when step changes"},onComplete:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when wizard is completed"},showProgress:{required:!1,tsType:{name:"boolean"},description:"Show progress indicator",defaultValue:{value:"true",computed:!1}},allowBack:{required:!1,tsType:{name:"boolean"},description:"Allow navigation to previous steps",defaultValue:{value:"true",computed:!1}},compact:{required:!1,tsType:{name:"boolean"},description:"Modal mode (compact header, no padding)",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const nr={title:"Organisms/WizardContainer",component:C,parameters:{layout:"fullscreen",backgrounds:{default:"wireframe"}},tags:["autodocs"]},se=()=>e.jsxs(n,{children:[e.jsx(s,{variant:"body1",className:"mb-4",children:"Welcome to the setup wizard. Let's get started by entering your basic information."}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx(s,{variant:"small",weight:"semibold",className:"mb-1 block",children:"Name"}),e.jsx(T,{placeholder:"Enter your name"})]}),e.jsxs("div",{children:[e.jsx(s,{variant:"small",weight:"semibold",className:"mb-1 block",children:"Email"}),e.jsx(T,{type:"email",placeholder:"Enter your email"})]})]})]}),te=()=>e.jsxs(n,{children:[e.jsx(s,{variant:"body1",className:"mb-4",children:"Now let's configure your preferences."}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx(s,{variant:"small",weight:"semibold",className:"mb-1 block",children:"Theme"}),e.jsxs("select",{className:"w-full border-2 border-black p-2",children:[e.jsx("option",{children:"Light"}),e.jsx("option",{children:"Dark"}),e.jsx("option",{children:"System"})]})]}),e.jsxs("div",{children:[e.jsx(s,{variant:"small",weight:"semibold",className:"mb-1 block",children:"Language"}),e.jsxs("select",{className:"w-full border-2 border-black p-2",children:[e.jsx("option",{children:"English"}),e.jsx("option",{children:"Spanish"}),e.jsx("option",{children:"French"})]})]})]})]}),oe=()=>e.jsxs(n,{className:"text-center py-8",children:[e.jsx(s,{variant:"h3",className:"mb-4",children:"All Done!"}),e.jsx(s,{variant:"body1",className:"text-neutral-600",children:'Your account has been set up successfully. Click "Complete" to finish.'})]}),p=[{id:"info",title:"Basic Information",description:"Enter your personal details",content:e.jsx(se,{})},{id:"preferences",title:"Preferences",description:"Configure your settings",content:e.jsx(te,{})},{id:"complete",title:"Complete",description:"Review and finish",content:e.jsx(oe,{})}],f={args:{steps:p,showProgress:!0,allowBack:!0,onComplete:()=>console.log("Wizard completed!")},decorators:[r=>e.jsx("div",{style:{height:"600px",width:"100%"},children:e.jsx(r,{})})]},b={args:{steps:p,showProgress:!1,allowBack:!0},decorators:[r=>e.jsx("div",{style:{height:"500px",width:"100%"},children:e.jsx(r,{})})]},v={args:{steps:p,showProgress:!0,allowBack:!1},decorators:[r=>e.jsx("div",{style:{height:"600px",width:"100%"},children:e.jsx(r,{})})]},y={args:{steps:p,showProgress:!0,allowBack:!0,compact:!0},decorators:[r=>e.jsx("div",{style:{height:"400px",width:"100%"},children:e.jsx(r,{})})]},j={args:{steps:p,currentStep:1,showProgress:!0,allowBack:!0},decorators:[r=>e.jsx("div",{style:{height:"600px",width:"100%"},children:e.jsx(r,{})})]};var W,q,E;f.parameters={...f.parameters,docs:{...(W=f.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(E=(q=f.parameters)==null?void 0:q.docs)==null?void 0:E.source}}};var I,A,L;b.parameters={...b.parameters,docs:{...(I=b.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(L=(A=b.parameters)==null?void 0:A.docs)==null?void 0:L.source}}};var R,V,M;v.parameters={...v.parameters,docs:{...(R=v.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(M=(V=v.parameters)==null?void 0:V.docs)==null?void 0:M.source}}};var _,D,F;y.parameters={...y.parameters,docs:{...(_=y.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(F=(D=y.parameters)==null?void 0:D.docs)==null?void 0:F.source}}};var O,Y,X;j.parameters={...j.parameters,docs:{...(O=j.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(X=(Y=j.parameters)==null?void 0:Y.docs)==null?void 0:X.source}}};const lr=["Default","NoProgress","NoBackNavigation","CompactMode","SecondStep"];export{y as CompactMode,f as Default,v as NoBackNavigation,b as NoProgress,j as SecondStep,lr as __namedExportsOrder,nr as default};
