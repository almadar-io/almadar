import{j as r}from"./jsx-runtime-CDt2p4po.js";import{r as b}from"./index-GiUgBvb1.js";import{c as n}from"./cn-BNf5BS2b.js";import{B as J}from"./Box-DYJzRMmP.js";import{H as f}from"./Stack-DhhoTPuC.js";import{T as P}from"./Typography-Wmkp-g7N.js";import{B as D}from"./Button-Dn0472P0.js";import{u as Q}from"./useEventBus-BNZMNlv8.js";import{A as W}from"./alert-triangle-BLuUOBNm.js";import{C as Y}from"./clock-DT9ve7xf.js";import{X as Z}from"./x-prXd1WI5.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";const ee=o=>{const e=new Date(o),a=new Date,x=e.getTime()-a.getTime();return Math.ceil(x/(1e3*60*60*24))},y=({expiresAt:o,credits:e,traineeId:a,dismissible:x=!0,onDismiss:C,entity:w="Credit",className:O})=>{const A=Q(),s=b.useMemo(()=>ee(o),[o]),E=b.useMemo(()=>s<=0||s<=3?"critical":s<=7?"warning":"info",[s]),t={critical:{bgColor:"bg-red-50",borderColor:"border-red-200",textColor:"text-red-700",iconColor:"text-red-500",buttonVariant:"primary"},warning:{bgColor:"bg-amber-50",borderColor:"border-amber-200",textColor:"text-amber-700",iconColor:"text-amber-500",buttonVariant:"secondary"},info:{bgColor:"bg-blue-50",borderColor:"border-blue-200",textColor:"text-blue-700",iconColor:"text-blue-500",buttonVariant:"secondary"}}[E],X=b.useCallback(()=>{A.emit("UI:CREATE",{traineeId:a,entity:w})},[A,a,w]);if(s<-30)return null;const G=()=>s<=0?`${e} credit${e>1?"s":""} expired!`:s===1?`${e} credit${e>1?"s":""} expire${e>1?"":"s"} tomorrow!`:`${e} credit${e>1?"s":""} expire${e>1?"":"s"} in ${s} days`;return r.jsx(J,{rounded:"lg",border:!0,padding:"sm",className:n(t.bgColor,t.borderColor,O),children:r.jsxs(f,{justify:"between",align:"center",children:[r.jsxs(f,{gap:"sm",align:"center",children:[E==="critical"?r.jsx(W,{className:n("h-5 w-5",t.iconColor)}):r.jsx(Y,{className:n("h-5 w-5",t.iconColor)}),r.jsx(P,{variant:"body",className:n("font-medium",t.textColor),children:G()})]}),r.jsxs(f,{gap:"sm",align:"center",children:[r.jsx(D,{variant:t.buttonVariant,size:"sm",onClick:X,children:s<=0?"Add Credits":"Renew Now"}),x&&C&&r.jsx(D,{variant:"ghost",size:"sm",onClick:C,className:t.textColor,children:r.jsx(Z,{className:"h-4 w-4"})})]})]})})};y.displayName="CreditExpirationAlert";y.__docgenInfo={description:"",methods:[],displayName:"CreditExpirationAlert",props:{expiresAt:{required:!0,tsType:{name:"union",raw:"string | Date",elements:[{name:"string"},{name:"Date"}]},description:"Expiration date"},credits:{required:!0,tsType:{name:"number"},description:"Credits expiring"},traineeId:{required:!1,tsType:{name:"string"},description:"Trainee ID for context"},dismissible:{required:!1,tsType:{name:"boolean"},description:"Allow dismissing the alert",defaultValue:{value:"true",computed:!1}},onDismiss:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when dismissed"},entity:{required:!1,tsType:{name:"string"},description:"Entity context for events",defaultValue:{value:'"Credit"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const xe={title:"Blaz-Klemenc/Atoms/CreditExpirationAlert",component:y,parameters:{layout:"centered"},tags:["autodocs"]},i=o=>new Date(Date.now()+o*24*60*60*1e3),c={args:{expiresAt:i(1),credits:5,traineeId:"trainee-1"}},d={args:{expiresAt:i(3),credits:8,traineeId:"trainee-2"}},m={args:{expiresAt:i(7),credits:3,traineeId:"trainee-3"}},l={args:{expiresAt:i(-1),credits:2,traineeId:"trainee-4"}},p={args:{expiresAt:i(2),credits:1,traineeId:"trainee-5"}},u={args:{expiresAt:i(5),credits:5,dismissible:!0,onDismiss:()=>console.log("Dismissed")}},g={args:{expiresAt:i(3),credits:4,dismissible:!1}};var N,h,I;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    expiresAt: daysFromNow(1),
    credits: 5,
    traineeId: "trainee-1"
  }
}`,...(I=(h=c.parameters)==null?void 0:h.docs)==null?void 0:I.source}}};var T,j,v;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    expiresAt: daysFromNow(3),
    credits: 8,
    traineeId: "trainee-2"
  }
}`,...(v=(j=d.parameters)==null?void 0:j.docs)==null?void 0:v.source}}};var S,$,F;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    expiresAt: daysFromNow(7),
    credits: 3,
    traineeId: "trainee-3"
  }
}`,...(F=($=m.parameters)==null?void 0:$.docs)==null?void 0:F.source}}};var q,B,k;l.parameters={...l.parameters,docs:{...(q=l.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    expiresAt: daysFromNow(-1),
    credits: 2,
    traineeId: "trainee-4"
  }
}`,...(k=(B=l.parameters)==null?void 0:B.docs)==null?void 0:k.source}}};var V,M,R;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    expiresAt: daysFromNow(2),
    credits: 1,
    traineeId: "trainee-5"
  }
}`,...(R=(M=p.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};var _,z,U;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    expiresAt: daysFromNow(5),
    credits: 5,
    dismissible: true,
    onDismiss: () => console.log("Dismissed")
  }
}`,...(U=(z=u.parameters)==null?void 0:z.docs)==null?void 0:U.source}}};var H,L,K;g.parameters={...g.parameters,docs:{...(H=g.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    expiresAt: daysFromNow(3),
    credits: 4,
    dismissible: false
  }
}`,...(K=(L=g.parameters)==null?void 0:L.docs)==null?void 0:K.source}}};const be=["ExpiresTomorrow","ExpiresIn3Days","ExpiresIn7Days","AlreadyExpired","LowCreditsExpiring","Dismissible","NotDismissible"];export{l as AlreadyExpired,u as Dismissible,d as ExpiresIn3Days,m as ExpiresIn7Days,c as ExpiresTomorrow,p as LowCreditsExpiring,g as NotDismissible,be as __namedExportsOrder,xe as default};
