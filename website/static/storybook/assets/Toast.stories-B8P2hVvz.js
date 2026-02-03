import{j as s}from"./jsx-runtime-CDt2p4po.js";import{T as e}from"./Toast-DEaAKpC_.js";import"./index-GiUgBvb1.js";import"./Icon-DDCXmKGr.js";import"./cn-BNf5BS2b.js";import"./createLucideIcon-CbHznvEr.js";import"./lock-BpRazVO9.js";import"./share-2-BGRL1FH9.js";import"./zap-DLdLcnjT.js";import"./refresh-cw-Ocr-wooT.js";import"./external-link-k_e-i1vS.js";import"./link-Csz5KqWX.js";import"./home-JwtCVJF2.js";import"./star-D_3mxVsm.js";import"./clock-DT9ve7xf.js";import"./calendar-rGtwHcH_.js";import"./pause-BGY7Ki7b.js";import"./play-C6U2eifx.js";import"./eye-DPfPdwVp.js";import"./list-B6-UEXVq.js";import"./grid-3x3-DCQtfzd8.js";import"./filter-CMfXM6HV.js";import"./search-CCKipEn6.js";import"./settings-DBj1i3lR.js";import"./user-plus-BlQDsowZ.js";import"./users-CV1mGUsS.js";import"./user-BePscFH1.js";import"./phone-XSC4O3No.js";import"./send-CHVRrjpn.js";import"./message-circle-Yw7MGdXs.js";import"./mail-CI1Ybt8r.js";import"./download-yLSRVNFt.js";import"./file-text-DZQctV9o.js";import"./copy-B40iJsJp.js";import"./save-DyJeJ3Zl.js";import"./trash-2-ChlfdFMf.js";import"./square-pen-D7sL1yO_.js";import"./minus-CvoF9liV.js";import"./plus-jSzJaRn3.js";import"./loader-2-DXp1ic5P.js";import"./info-CF8EgE8A.js";import"./alert-triangle-BLuUOBNm.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";import"./check-DliVttWt.js";import"./menu-DUN0as2h.js";import"./x-prXd1WI5.js";import"./arrow-left-CMPuXvFr.js";import"./arrow-right-BdVPe8wH.js";import"./chevron-up-B8qTw58L.js";import"./chevron-down-BQmz_Bpa.js";import"./chevron-left-zGYeMbNT.js";import"./chevron-right-pDF_OUfd.js";import"./Typography-Wmkp-g7N.js";import"./Button-Dn0472P0.js";import"./Badge-CpH0PNM6.js";const Fs={title:"Molecules/Toast",component:e,parameters:{layout:"centered",backgrounds:{default:"wireframe"}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["success","error","warning","info"]}}},r={args:{variant:"info",message:"This is an informational toast message.",title:"Information"}},a={args:{variant:"success",message:"Your changes have been saved successfully.",title:"Success"}},t={args:{variant:"warning",message:"Please review your input before continuing.",title:"Warning"}},i={args:{variant:"error",message:"An error occurred while processing your request.",title:"Error"}},o={args:{variant:"info",message:"You have a new message from John.",title:"New Message",actionLabel:"View",onAction:()=>console.log("Action clicked")}},n={args:{variant:"success",message:"Click the X to dismiss this toast.",title:"Dismissible",dismissible:!0,onDismiss:()=>console.log("Dismissed")}},c={args:{variant:"info",message:"You have new notifications waiting.",title:"Notifications",badge:5}},m={render:()=>s.jsxs("div",{className:"space-y-4",children:[s.jsx(e,{variant:"info",message:"This is an info toast.",title:"Info"}),s.jsx(e,{variant:"success",message:"Operation completed.",title:"Success"}),s.jsx(e,{variant:"warning",message:"Please be careful.",title:"Warning"}),s.jsx(e,{variant:"error",message:"Something went wrong.",title:"Error"})]})},p={render:()=>s.jsxs("div",{className:"space-y-4",children:[s.jsx(e,{variant:"success",message:"Changes saved successfully!"}),s.jsx(e,{variant:"error",message:"Failed to save changes.",dismissible:!0})]})};var l,g,u;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    variant: 'info',
    message: 'This is an informational toast message.',
    title: 'Information'
  }
}`,...(u=(g=r.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var d,v,f;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    message: 'Your changes have been saved successfully.',
    title: 'Success'
  }
}`,...(f=(v=a.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var h,w,b;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    variant: 'warning',
    message: 'Please review your input before continuing.',
    title: 'Warning'
  }
}`,...(b=(w=t.parameters)==null?void 0:w.docs)==null?void 0:b.source}}};var S,T,y;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    variant: 'error',
    message: 'An error occurred while processing your request.',
    title: 'Error'
  }
}`,...(y=(T=i.parameters)==null?void 0:T.docs)==null?void 0:y.source}}};var x,W,j;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    variant: 'info',
    message: 'You have a new message from John.',
    title: 'New Message',
    actionLabel: 'View',
    onAction: () => console.log('Action clicked')
  }
}`,...(j=(W=o.parameters)==null?void 0:W.docs)==null?void 0:j.source}}};var A,D,E;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    message: 'Click the X to dismiss this toast.',
    title: 'Dismissible',
    dismissible: true,
    onDismiss: () => console.log('Dismissed')
  }
}`,...(E=(D=n.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};var N,I,Y;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    variant: 'info',
    message: 'You have new notifications waiting.',
    title: 'Notifications',
    badge: 5
  }
}`,...(Y=(I=c.parameters)==null?void 0:I.docs)==null?void 0:Y.source}}};var k,C,P;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">
            <Toast variant="info" message="This is an info toast." title="Info" />
            <Toast variant="success" message="Operation completed." title="Success" />
            <Toast variant="warning" message="Please be careful." title="Warning" />
            <Toast variant="error" message="Something went wrong." title="Error" />
        </div>
}`,...(P=(C=m.parameters)==null?void 0:C.docs)==null?void 0:P.source}}};var V,M,O;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">
            <Toast variant="success" message="Changes saved successfully!" />
            <Toast variant="error" message="Failed to save changes." dismissible />
        </div>
}`,...(O=(M=p.parameters)==null?void 0:M.docs)==null?void 0:O.source}}};const Js=["Info","Success","Warning","Error","WithAction","Dismissible","WithBadge","AllVariants","WithoutTitle"];export{m as AllVariants,n as Dismissible,i as Error,r as Info,a as Success,t as Warning,o as WithAction,c as WithBadge,p as WithoutTitle,Js as __namedExportsOrder,Fs as default};
