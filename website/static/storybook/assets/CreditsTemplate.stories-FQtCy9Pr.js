import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as w}from"./index-GiUgBvb1.js";import{c as y}from"./cn-BNf5BS2b.js";import{B as C}from"./Box-DYJzRMmP.js";import{V as d,H as o}from"./Stack-DhhoTPuC.js";import{T as s}from"./Typography-Wmkp-g7N.js";import{B as g}from"./Button-Dn0472P0.js";import{I as ze}from"./Input-DhFss4oc.js";import{C as f}from"./Card-BNT5PrJ5.js";import{B as z}from"./Badge-CpH0PNM6.js";import{S as Be}from"./Spinner-vF2DJrH5.js";import{u as Le}from"./useEventBus-BNZMNlv8.js";import{P as Pe}from"./plus-jSzJaRn3.js";import{A as F}from"./alert-triangle-BLuUOBNm.js";import{C as B}from"./credit-card-CQwe3_yO.js";import{T as Oe}from"./trending-down-Dv2LyMoL.js";import{T as Re}from"./trending-up-D7By3kN5.js";import{S as Ue}from"./search-CCKipEn6.js";import{c as _e}from"./createLucideIcon-CbHznvEr.js";import{S as $e}from"./square-pen-D7sL1yO_.js";import{T as Je}from"./trash-2-ChlfdFMf.js";import"./loader-2-DXp1ic5P.js";import"./chevron-down-BQmz_Bpa.js";import"./x-prXd1WI5.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ke=_e("PlusCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]),b=t=>{if(!t)return!1;const a=new Date(t),n=new Date,i=Math.ceil((a.getTime()-n.getTime())/(1e3*60*60*24));return i>0&&i<=7},V=t=>t?new Date(t)<new Date:!1,Ge=t=>t?new Date(t).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"N/A",Qe=({credit:t,onAction:a})=>{const n=V(t.expiresAt),i=b(t.expiresAt),u=t.totalCredits>0?(t.totalCredits-t.remainingCredits)/t.totalCredits*100:0;return e.jsx(f,{className:y("p-4 hover:shadow-md transition-shadow",n&&"border-red-200 bg-red-50",i&&!n&&"border-amber-200 bg-amber-50"),children:e.jsxs(d,{gap:"md",children:[e.jsxs(o,{justify:"between",align:"start",children:[e.jsxs(o,{gap:"sm",align:"center",children:[e.jsx(C,{display:"flex",rounded:"lg",padding:"xs",className:y("items-center justify-center",n?"bg-red-100":i?"bg-amber-100":"bg-blue-100"),children:e.jsx(B,{className:y("h-4 w-4",n?"text-red-600":i?"text-amber-600":"text-blue-600")})}),e.jsxs(d,{gap:"none",children:[e.jsx(s,{variant:"body",className:"font-medium",children:"Credit Package"}),e.jsxs(s,{variant:"small",className:"text-neutral-500",children:["Expires: ",Ge(t.expiresAt)]})]})]}),n?e.jsx(z,{variant:"danger",children:"Expired"}):i?e.jsxs(z,{variant:"warning",children:[e.jsx(F,{className:"h-3 w-3 mr-1"}),"Expiring Soon"]}):e.jsx(z,{variant:"success",children:"Active"})]}),e.jsxs(d,{gap:"sm",children:[e.jsxs(o,{justify:"between",children:[e.jsx(s,{variant:"body",className:"text-neutral-500",children:"Credits Remaining"}),e.jsxs(s,{variant:"h3",children:[t.remainingCredits," / ",t.totalCredits]})]}),e.jsx(C,{rounded:"full",className:"h-2 w-full bg-neutral-200 overflow-hidden",children:e.jsx(C,{className:y("h-full transition-all",u>=80?"bg-red-500":u>=50?"bg-amber-500":"bg-green-500"),style:{width:`${100-u}%`}})}),e.jsxs(s,{variant:"small",className:"text-neutral-500",children:[t.totalCredits-t.remainingCredits," credits used (",u.toFixed(0),"%)"]})]}),e.jsxs(o,{gap:"sm",className:"pt-2 border-t",wrap:!0,children:[e.jsxs(g,{variant:"ghost",size:"sm",onClick:()=>a("ADJUST",t),className:"gap-1",children:[e.jsx(Ke,{className:"h-3 w-3"}),"Adjust"]}),e.jsxs(g,{variant:"ghost",size:"sm",onClick:()=>a("EDIT",t),className:"gap-1",children:[e.jsx($e,{className:"h-3 w-3"}),"Edit"]}),e.jsx(C,{className:"flex-1"}),e.jsx(g,{variant:"ghost",size:"sm",onClick:()=>a("DELETE",t),className:"gap-1 text-red-600 hover:text-red-700",children:e.jsx(Je,{className:"h-3 w-3"})})]})]})})},L=({items:t,data:a,isLoading:n=!1,error:i=null,title:u="Credit Management",subtitle:De="Manage trainee credit packages and balances",showHeader:Te=!0,showSearch:P=!0,showFilters:O=!0,entity:x="Credit",className:Se})=>{const h=Le(),[Ee,Ie]=w.useState(""),[c,v]=w.useState("all"),m=t||a||[],ke=w.useCallback(r=>{Ie(r),h.emit("UI:SEARCH",{searchTerm:r,entity:x})},[h,x]),Me=w.useCallback(()=>{h.emit("UI:CREATE",{entity:x})},[h,x]),He=w.useCallback((r,p)=>{h.emit(`UI:${r}`,{row:p,entity:x})},[h,x]),R=m.filter(r=>{if(c!=="all"){const p=V(r.expiresAt),J=b(r.expiresAt);if(c==="active"&&(p||J)||c==="expiring"&&!J||c==="expired"&&!p)return!1}return!0}),qe=m.reduce((r,p)=>r+p.totalCredits,0),Fe=m.reduce((r,p)=>r+p.remainingCredits,0),Ve=m.filter(r=>V(r.expiresAt)).length,U=m.filter(r=>b(r.expiresAt)).length,_=m.filter(r=>!V(r.expiresAt)&&!b(r.expiresAt)).length,$=m.filter(r=>b(r.expiresAt));return e.jsxs(d,{gap:"lg",className:y("p-6",Se),children:[Te&&e.jsxs(o,{justify:"between",align:"center",wrap:!0,children:[e.jsxs(d,{gap:"xs",children:[e.jsx(s,{variant:"h1",children:u}),e.jsx(s,{variant:"body",className:"text-neutral-500",children:De})]}),e.jsxs(g,{variant:"primary",onClick:Me,className:"gap-2",children:[e.jsx(Pe,{className:"h-4 w-4"}),"Add Credits"]})]}),$.length>0&&e.jsx(f,{className:"p-4 border-amber-200 bg-amber-50",children:e.jsxs(o,{gap:"sm",align:"start",children:[e.jsx(F,{className:"h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5"}),e.jsxs(d,{gap:"xs",children:[e.jsxs(s,{variant:"body",className:"font-medium text-amber-700",children:[$.length," credit package(s) expiring soon"]}),e.jsx(s,{variant:"small",className:"text-amber-600",children:"Review and renew credits before they expire to avoid service interruption."})]})]})}),e.jsxs(o,{gap:"md",wrap:!0,children:[e.jsx(f,{className:"p-3 flex-1 min-w-[140px]",children:e.jsxs(o,{gap:"sm",align:"center",children:[e.jsx(B,{className:"h-5 w-5 text-blue-500"}),e.jsxs(d,{gap:"none",children:[e.jsx(s,{variant:"h3",children:qe}),e.jsx(s,{variant:"small",className:"text-neutral-500",children:"Total Credits"})]})]})}),e.jsx(f,{className:"p-3 flex-1 min-w-[140px]",children:e.jsxs(o,{gap:"sm",align:"center",children:[e.jsx(Oe,{className:"h-5 w-5 text-green-500"}),e.jsxs(d,{gap:"none",children:[e.jsx(s,{variant:"h3",children:Fe}),e.jsx(s,{variant:"small",className:"text-neutral-500",children:"Remaining"})]})]})}),e.jsx(f,{className:"p-3 flex-1 min-w-[140px]",children:e.jsxs(o,{gap:"sm",align:"center",children:[e.jsx(Re,{className:"h-5 w-5 text-purple-500"}),e.jsxs(d,{gap:"none",children:[e.jsx(s,{variant:"h3",children:_}),e.jsx(s,{variant:"small",className:"text-neutral-500",children:"Active"})]})]})}),e.jsx(f,{className:"p-3 flex-1 min-w-[140px]",children:e.jsxs(o,{gap:"sm",align:"center",children:[e.jsx(F,{className:"h-5 w-5 text-amber-500"}),e.jsxs(d,{gap:"none",children:[e.jsx(s,{variant:"h3",children:U}),e.jsx(s,{variant:"small",className:"text-neutral-500",children:"Expiring"})]})]})})]}),(P||O)&&e.jsxs(o,{justify:"between",align:"center",wrap:!0,gap:"sm",children:[P&&e.jsx(C,{className:"w-full max-w-sm",children:e.jsx(ze,{placeholder:"Search credits...",value:Ee,onChange:r=>ke(r.target.value),leftIcon:e.jsx(Ue,{className:"h-4 w-4 text-neutral-400"})})}),O&&e.jsxs(o,{gap:"sm",children:[e.jsxs(g,{variant:c==="all"?"primary":"secondary",size:"sm",onClick:()=>v("all"),children:["All (",m.length,")"]}),e.jsxs(g,{variant:c==="active"?"primary":"secondary",size:"sm",onClick:()=>v("active"),children:["Active (",_,")"]}),e.jsxs(g,{variant:c==="expiring"?"primary":"secondary",size:"sm",onClick:()=>v("expiring"),children:[e.jsx(F,{className:"h-3 w-3 mr-1"}),"Expiring (",U,")"]}),e.jsxs(g,{variant:c==="expired"?"primary":"secondary",size:"sm",onClick:()=>v("expired"),children:["Expired (",Ve,")"]})]})]}),n&&e.jsxs(d,{align:"center",justify:"center",className:"py-12",children:[e.jsx(Be,{size:"lg"}),e.jsx(s,{variant:"body",className:"text-neutral-500",children:"Loading credits..."})]}),i&&e.jsx(d,{align:"center",justify:"center",className:"py-12",children:e.jsxs(s,{variant:"body",className:"text-red-500",children:["Error: ",i.message]})}),!n&&!i&&e.jsx(e.Fragment,{children:R.length===0?e.jsxs(d,{align:"center",justify:"center",className:"py-12",children:[e.jsx(B,{className:"h-12 w-12 text-neutral-300"}),e.jsx(s,{variant:"h3",className:"text-neutral-500",children:"No credits found"}),e.jsx(s,{variant:"body",className:"text-neutral-400",children:c!=="all"?"Try changing the filter":"Add credits for your trainees to get started"})]}):e.jsx(C,{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:R.map(r=>e.jsx(Qe,{credit:r,onAction:He},r.id))})})]})};L.displayName="CreditsTemplate";L.__docgenInfo={description:"",methods:[],displayName:"CreditsTemplate",props:{items:{required:!1,tsType:{name:"unknown"},description:"Credit items to display"},data:{required:!1,tsType:{name:"unknown"},description:"Data prop alias"},isLoading:{required:!1,tsType:{name:"boolean"},description:"Loading state",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"union",raw:"Error | null",elements:[{name:"Error"},{name:"null"}]},description:"Error state",defaultValue:{value:"null",computed:!1}},title:{required:!1,tsType:{name:"string"},description:"Page title",defaultValue:{value:'"Credit Management"',computed:!1}},subtitle:{required:!1,tsType:{name:"string"},description:"Page subtitle",defaultValue:{value:'"Manage trainee credit packages and balances"',computed:!1}},showHeader:{required:!1,tsType:{name:"boolean"},description:"Show header",defaultValue:{value:"true",computed:!1}},showSearch:{required:!1,tsType:{name:"boolean"},description:"Show search",defaultValue:{value:"true",computed:!1}},showFilters:{required:!1,tsType:{name:"boolean"},description:"Show filters",defaultValue:{value:"true",computed:!1}},entity:{required:!1,tsType:{name:"string"},description:"Entity context for events",defaultValue:{value:'"Credit"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const wt={title:"Blaz-Klemenc/Templates/CreditsTemplate",component:L,parameters:{layout:"fullscreen"},tags:["autodocs"],argTypes:{showHeader:{control:"boolean"},showSearch:{control:"boolean"},showFilters:{control:"boolean"}}},l=t=>{const a=new Date;return a.setDate(a.getDate()+t),a},j=[{id:"credit-1",traineeId:"trainee-1",totalCredits:20,remainingCredits:15,expiresAt:l(60)},{id:"credit-2",traineeId:"trainee-2",totalCredits:10,remainingCredits:3,expiresAt:l(5)},{id:"credit-3",traineeId:"trainee-3",totalCredits:30,remainingCredits:28,expiresAt:l(90)},{id:"credit-4",traineeId:"trainee-4",totalCredits:15,remainingCredits:0,expiresAt:l(-10)},{id:"credit-5",traineeId:"trainee-5",totalCredits:20,remainingCredits:8,expiresAt:l(3)},{id:"credit-6",traineeId:"trainee-6",totalCredits:25,remainingCredits:20,expiresAt:l(45)},{id:"credit-7",traineeId:"trainee-7",totalCredits:10,remainingCredits:2,expiresAt:l(-5)},{id:"credit-8",traineeId:"trainee-8",totalCredits:50,remainingCredits:42,expiresAt:l(120)}],A={args:{items:j,title:"Credit Management",subtitle:"Manage trainee credit packages and balances",showHeader:!0,showSearch:!0,showFilters:!0}},N={args:{items:[],isLoading:!0}},D={args:{items:[],error:{message:"Failed to load credits."}}},T={args:{items:[],title:"Credit Management",subtitle:"Manage trainee credit packages and balances"}},S={args:{items:j.filter(t=>{const a=new Date(t.expiresAt),n=new Date;return Math.ceil((a.getTime()-n.getTime())/(1e3*60*60*24))>7}),title:"Active Credits",subtitle:"Credits with more than 7 days validity"}},E={args:{items:j.filter(t=>{const a=new Date(t.expiresAt),n=new Date,i=Math.ceil((a.getTime()-n.getTime())/(1e3*60*60*24));return i>0&&i<=7}),title:"Expiring Credits",subtitle:"Credits expiring within 7 days"}},I={args:{items:j.filter(t=>new Date(t.expiresAt)<new Date),title:"Expired Credits",subtitle:"Credits that have expired"}},k={args:{items:[{id:"h1",traineeId:"t1",totalCredits:20,remainingCredits:18,expiresAt:l(60)},{id:"h2",traineeId:"t2",totalCredits:15,remainingCredits:12,expiresAt:l(45)},{id:"h3",traineeId:"t3",totalCredits:30,remainingCredits:25,expiresAt:l(90)}],title:"Healthy Credits",subtitle:"All credits in good standing"}},M={args:{items:[{id:"c1",traineeId:"t1",totalCredits:10,remainingCredits:1,expiresAt:l(2)},{id:"c2",traineeId:"t2",totalCredits:15,remainingCredits:2,expiresAt:l(3)},{id:"c3",traineeId:"t3",totalCredits:20,remainingCredits:0,expiresAt:l(-1)}],title:"Critical Credits",subtitle:"Credits requiring immediate attention"}},H={args:{items:j,showHeader:!1,showFilters:!0}},q={args:{items:j,showHeader:!0,showSearch:!1,showFilters:!1}};var K,G,Q;A.parameters={...A.parameters,docs:{...(K=A.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    items: sampleCredits,
    title: "Credit Management",
    subtitle: "Manage trainee credit packages and balances",
    showHeader: true,
    showSearch: true,
    showFilters: true
  }
}`,...(Q=(G=A.parameters)==null?void 0:G.docs)==null?void 0:Q.source}}};var W,X,Y;N.parameters={...N.parameters,docs:{...(W=N.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    items: [],
    isLoading: true
  }
}`,...(Y=(X=N.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,ee,te;D.parameters={...D.parameters,docs:{...(Z=D.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    items: [],
    error: {
      message: "Failed to load credits."
    } as Error
  }
}`,...(te=(ee=D.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var re,se,ae;T.parameters={...T.parameters,docs:{...(re=T.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    items: [],
    title: "Credit Management",
    subtitle: "Manage trainee credit packages and balances"
  }
}`,...(ae=(se=T.parameters)==null?void 0:se.docs)==null?void 0:ae.source}}};var ie,ne,le;S.parameters={...S.parameters,docs:{...(ie=S.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    items: sampleCredits.filter(c => {
      const exp = new Date(c.expiresAt!);
      const now = new Date();
      const diffDays = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays > 7;
    }),
    title: "Active Credits",
    subtitle: "Credits with more than 7 days validity"
  }
}`,...(le=(ne=S.parameters)==null?void 0:ne.docs)==null?void 0:le.source}}};var de,oe,ce;E.parameters={...E.parameters,docs:{...(de=E.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    items: sampleCredits.filter(c => {
      const exp = new Date(c.expiresAt!);
      const now = new Date();
      const diffDays = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays > 0 && diffDays <= 7;
    }),
    title: "Expiring Credits",
    subtitle: "Credits expiring within 7 days"
  }
}`,...(ce=(oe=E.parameters)==null?void 0:oe.docs)==null?void 0:ce.source}}};var me,pe,ge;I.parameters={...I.parameters,docs:{...(me=I.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    items: sampleCredits.filter(c => new Date(c.expiresAt!) < new Date()),
    title: "Expired Credits",
    subtitle: "Credits that have expired"
  }
}`,...(ge=(pe=I.parameters)==null?void 0:pe.docs)==null?void 0:ge.source}}};var ue,xe,he;k.parameters={...k.parameters,docs:{...(ue=k.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    items: [{
      id: "h1",
      traineeId: "t1",
      totalCredits: 20,
      remainingCredits: 18,
      expiresAt: getDate(60)
    }, {
      id: "h2",
      traineeId: "t2",
      totalCredits: 15,
      remainingCredits: 12,
      expiresAt: getDate(45)
    }, {
      id: "h3",
      traineeId: "t3",
      totalCredits: 30,
      remainingCredits: 25,
      expiresAt: getDate(90)
    }],
    title: "Healthy Credits",
    subtitle: "All credits in good standing"
  }
}`,...(he=(xe=k.parameters)==null?void 0:xe.docs)==null?void 0:he.source}}};var fe,Ce,je;M.parameters={...M.parameters,docs:{...(fe=M.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    items: [{
      id: "c1",
      traineeId: "t1",
      totalCredits: 10,
      remainingCredits: 1,
      expiresAt: getDate(2)
    }, {
      id: "c2",
      traineeId: "t2",
      totalCredits: 15,
      remainingCredits: 2,
      expiresAt: getDate(3)
    }, {
      id: "c3",
      traineeId: "t3",
      totalCredits: 20,
      remainingCredits: 0,
      expiresAt: getDate(-1)
    }],
    title: "Critical Credits",
    subtitle: "Credits requiring immediate attention"
  }
}`,...(je=(Ce=M.parameters)==null?void 0:Ce.docs)==null?void 0:je.source}}};var we,ye,be;H.parameters={...H.parameters,docs:{...(we=H.parameters)==null?void 0:we.docs,source:{originalSource:`{
  args: {
    items: sampleCredits,
    showHeader: false,
    showFilters: true
  }
}`,...(be=(ye=H.parameters)==null?void 0:ye.docs)==null?void 0:be.source}}};var ve,Ae,Ne;q.parameters={...q.parameters,docs:{...(ve=q.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    items: sampleCredits,
    showHeader: true,
    showSearch: false,
    showFilters: false
  }
}`,...(Ne=(Ae=q.parameters)==null?void 0:Ae.docs)==null?void 0:Ne.source}}};const yt=["Default","Loading","Error","Empty","ActiveOnly","ExpiringOnly","ExpiredOnly","AllHealthy","AllCritical","NoHeader","MinimalView"];export{S as ActiveOnly,M as AllCritical,k as AllHealthy,A as Default,T as Empty,D as Error,I as ExpiredOnly,E as ExpiringOnly,N as Loading,q as MinimalView,H as NoHeader,yt as __namedExportsOrder,wt as default};
