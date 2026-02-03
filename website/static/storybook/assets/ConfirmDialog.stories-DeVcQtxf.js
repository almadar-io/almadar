import{j as e}from"./jsx-runtime-CDt2p4po.js";import{M as K}from"./Modal-Bpl9EjHC.js";import{B as f}from"./Button-Dn0472P0.js";import{I as Q}from"./Icon-DDCXmKGr.js";import{T as g}from"./Typography-Wmkp-g7N.js";import{c as U}from"./cn-BNf5BS2b.js";import{C as v}from"./check-DliVttWt.js";import{A as X}from"./alert-triangle-BLuUOBNm.js";import{T as Z}from"./trash-2-ChlfdFMf.js";import{r as $}from"./index-GiUgBvb1.js";import"./Box-DYJzRMmP.js";import"./Overlay-CxBLilSV.js";import"./x-prXd1WI5.js";import"./createLucideIcon-CbHznvEr.js";import"./loader-2-DXp1ic5P.js";import"./lock-BpRazVO9.js";import"./share-2-BGRL1FH9.js";import"./zap-DLdLcnjT.js";import"./refresh-cw-Ocr-wooT.js";import"./external-link-k_e-i1vS.js";import"./link-Csz5KqWX.js";import"./home-JwtCVJF2.js";import"./star-D_3mxVsm.js";import"./clock-DT9ve7xf.js";import"./calendar-rGtwHcH_.js";import"./pause-BGY7Ki7b.js";import"./play-C6U2eifx.js";import"./eye-DPfPdwVp.js";import"./list-B6-UEXVq.js";import"./grid-3x3-DCQtfzd8.js";import"./filter-CMfXM6HV.js";import"./search-CCKipEn6.js";import"./settings-DBj1i3lR.js";import"./user-plus-BlQDsowZ.js";import"./users-CV1mGUsS.js";import"./user-BePscFH1.js";import"./phone-XSC4O3No.js";import"./send-CHVRrjpn.js";import"./message-circle-Yw7MGdXs.js";import"./mail-CI1Ybt8r.js";import"./download-yLSRVNFt.js";import"./file-text-DZQctV9o.js";import"./copy-B40iJsJp.js";import"./save-DyJeJ3Zl.js";import"./square-pen-D7sL1yO_.js";import"./minus-CvoF9liV.js";import"./plus-jSzJaRn3.js";import"./info-CF8EgE8A.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";import"./menu-DUN0as2h.js";import"./arrow-left-CMPuXvFr.js";import"./arrow-right-BdVPe8wH.js";import"./chevron-up-B8qTw58L.js";import"./chevron-down-BQmz_Bpa.js";import"./chevron-left-zGYeMbNT.js";import"./chevron-right-pDF_OUfd.js";const ee={danger:{icon:Z,iconBg:"bg-[var(--color-error)]",iconColor:"text-[var(--color-error-foreground)]",confirmVariant:"primary"},warning:{icon:X,iconBg:"bg-[var(--color-warning)]",iconColor:"text-[var(--color-warning-foreground)]",confirmVariant:"primary"},info:{icon:v,iconBg:"bg-[var(--color-info)]",iconColor:"text-[var(--color-info-foreground)]",confirmVariant:"primary"},default:{icon:v,iconBg:"bg-[var(--color-primary)]",iconColor:"text-[var(--color-primary-foreground)]",confirmVariant:"primary"}},d=({isOpen:p=!0,onClose:t=()=>{},onConfirm:r=()=>{},title:L,message:B,description:E,confirmText:P,confirmLabel:z,cancelText:_,cancelLabel:M,variant:W="danger",size:Y="sm",isLoading:a=!1,className:F})=>{const o=ee[W],u=B??E??"",G=P??z??"Confirm",H=_??M??"Cancel",J=()=>{r()};return e.jsx(K,{isOpen:p,onClose:t,size:Y,showCloseButton:!1,closeOnOverlayClick:!a,closeOnEscape:!a,className:F,footer:e.jsxs("div",{className:"flex justify-end gap-3",children:[e.jsx(f,{variant:"secondary",onClick:t,disabled:a,children:H}),e.jsx(f,{variant:o.confirmVariant,onClick:J,disabled:a,children:a?"Loading...":G})]}),children:e.jsxs("div",{className:"flex gap-4",children:[e.jsx("div",{className:U("flex-shrink-0 w-12 h-12 flex items-center justify-center",o.iconBg),children:e.jsx(Q,{icon:o.icon,size:"lg",className:o.iconColor})}),e.jsxs("div",{className:"flex-1",children:[e.jsx(g,{variant:"h5",className:"mb-2",children:L}),typeof u=="string"?e.jsx(g,{variant:"body2",className:"text-[var(--color-muted-foreground)]",children:u}):u]})]})})};d.displayName="ConfirmDialog";d.__docgenInfo={description:"ConfirmDialog - Confirmation dialog for important actions",methods:[],displayName:"ConfirmDialog",props:{isOpen:{required:!1,tsType:{name:"boolean"},description:"Whether the dialog is open (defaults to true when rendered by slot wrapper)",defaultValue:{value:"true",computed:!1}},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when dialog is closed (injected by slot wrapper)",defaultValue:{value:"() => {}",computed:!1}},onConfirm:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when action is confirmed (injected by slot wrapper)",defaultValue:{value:"() => {}",computed:!1}},title:{required:!0,tsType:{name:"string"},description:"Dialog title"},message:{required:!1,tsType:{name:"union",raw:"string | React.ReactNode",elements:[{name:"string"},{name:"ReactReactNode",raw:"React.ReactNode"}]},description:"Dialog message/description"},description:{required:!1,tsType:{name:"union",raw:"string | React.ReactNode",elements:[{name:"string"},{name:"ReactReactNode",raw:"React.ReactNode"}]},description:"Alias for message (schema compatibility)"},confirmText:{required:!1,tsType:{name:"string"},description:"Confirm button text"},confirmLabel:{required:!1,tsType:{name:"string"},description:"Alias for confirmText (schema compatibility)"},cancelText:{required:!1,tsType:{name:"string"},description:"Cancel button text"},cancelLabel:{required:!1,tsType:{name:"string"},description:"Alias for cancelText (schema compatibility)"},variant:{required:!1,tsType:{name:"union",raw:'"danger" | "warning" | "info" | "default"',elements:[{name:"literal",value:'"danger"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"info"'},{name:"literal",value:'"default"'}]},description:"Dialog variant",defaultValue:{value:'"danger"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg" | "xl" | "full"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'},{name:"literal",value:'"full"'}]},description:"Dialog size",defaultValue:{value:'"sm"',computed:!1}},isLoading:{required:!1,tsType:{name:"boolean"},description:"Loading state for confirm button",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const nr={title:"Organisms/ConfirmDialog",component:d,parameters:{layout:"centered",backgrounds:{default:"wireframe"}},tags:["autodocs"]},re=({variant:p="danger"})=>{const[t,r]=$.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(f,{variant:"primary",onClick:()=>r(!0),children:"Open Dialog"}),e.jsx(d,{isOpen:t,onClose:()=>r(!1),onConfirm:()=>{console.log("Confirmed!"),r(!1)},title:"Delete Item",message:"Are you sure you want to delete this item? This action cannot be undone.",variant:p})]})},n={render:()=>e.jsx(re,{})},i={args:{isOpen:!0,title:"Delete Project",message:"Are you sure you want to delete this project? All data will be permanently removed.",confirmText:"Delete",cancelText:"Cancel",variant:"danger",onClose:()=>{},onConfirm:()=>{}}},s={args:{isOpen:!0,title:"Archive Item",message:"This item will be archived and hidden from the main view. You can restore it later.",confirmText:"Archive",cancelText:"Cancel",variant:"warning",onClose:()=>{},onConfirm:()=>{}}},l={args:{isOpen:!0,title:"Confirm Action",message:"Are you sure you want to proceed with this action?",confirmText:"Proceed",cancelText:"Cancel",variant:"info",onClose:()=>{},onConfirm:()=>{}}},m={args:{isOpen:!0,title:"Deleting...",message:"Please wait while we delete the item.",isLoading:!0,onClose:()=>{},onConfirm:()=>{}}},c={args:{isOpen:!0,title:"Important Notice",message:"This is a larger dialog with more content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",size:"lg",onClose:()=>{},onConfirm:()=>{}}};var C,h,x;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <InteractiveExample />
}`,...(x=(h=n.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var y,w,T;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    title: 'Delete Project',
    message: 'Are you sure you want to delete this project? All data will be permanently removed.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    variant: 'danger',
    onClose: () => {},
    onConfirm: () => {}
  }
}`,...(T=(w=i.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};var b,j,D;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    title: 'Archive Item',
    message: 'This item will be archived and hidden from the main view. You can restore it later.',
    confirmText: 'Archive',
    cancelText: 'Cancel',
    variant: 'warning',
    onClose: () => {},
    onConfirm: () => {}
  }
}`,...(D=(j=s.parameters)==null?void 0:j.docs)==null?void 0:D.source}}};var A,O,N;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed with this action?',
    confirmText: 'Proceed',
    cancelText: 'Cancel',
    variant: 'info',
    onClose: () => {},
    onConfirm: () => {}
  }
}`,...(N=(O=l.parameters)==null?void 0:O.docs)==null?void 0:N.source}}};var V,q,I;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    title: 'Deleting...',
    message: 'Please wait while we delete the item.',
    isLoading: true,
    onClose: () => {},
    onConfirm: () => {}
  }
}`,...(I=(q=m.parameters)==null?void 0:q.docs)==null?void 0:I.source}}};var R,S,k;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    title: 'Important Notice',
    message: 'This is a larger dialog with more content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    size: 'lg',
    onClose: () => {},
    onConfirm: () => {}
  }
}`,...(k=(S=c.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};const ir=["Default","DangerVariant","WarningVariant","InfoVariant","Loading","LargeDialog"];export{i as DangerVariant,n as Default,l as InfoVariant,c as LargeDialog,m as Loading,s as WarningVariant,ir as __namedExportsOrder,nr as default};
