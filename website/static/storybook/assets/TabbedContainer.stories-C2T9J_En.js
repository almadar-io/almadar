import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as v}from"./index-GiUgBvb1.js";import{c as d}from"./cn-BNf5BS2b.js";import{T as n}from"./Typography-Wmkp-g7N.js";import{B as x}from"./Box-DYJzRMmP.js";const g=({tabs:t,defaultTab:E,activeTab:s,onTabChange:i,position:$="top",className:A})=>{var y;const[O,L]=v.useState(E||((y=t[0])==null?void 0:y.id)||""),o=s!==void 0?s:O,M=v.useCallback(a=>{s===void 0&&L(a),i==null||i(a)},[s,i]),r=t.find(a=>a.id===o),R=(r==null?void 0:r.content)||(r!=null&&r.sectionId?e.jsxs("div",{className:"p-4 text-[var(--color-muted-foreground)]",children:["Section: ",r.sectionId]}):null),m=$==="left";return e.jsxs("div",{className:d("flex w-full h-full",m?"flex-row":"flex-col",A),children:[e.jsx("div",{role:"tablist",className:d("flex flex-shrink-0",m?"flex-col border-r-2 border-[var(--color-border)]":"flex-row border-b-2 border-[var(--color-border)]"),children:t.map(a=>{const l=a.id===o,f=a.disabled;return e.jsxs("button",{role:"tab","aria-selected":l,"aria-controls":`tabpanel-${a.id}`,"aria-disabled":f,disabled:f,onClick:()=>!f&&M(a.id),className:d("flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors","focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:ring-offset-2","disabled:opacity-50 disabled:cursor-not-allowed",l?"bg-[var(--color-primary)] text-[var(--color-primary-foreground)]":"bg-[var(--color-card)] text-[var(--color-foreground)] hover:bg-[var(--color-muted)]",m?"justify-start":"justify-center"),children:[e.jsx(n,{variant:"small",weight:l?"bold":"normal",color:"inherit",children:a.label}),a.badge!==void 0&&e.jsx("span",{className:d("px-1.5 py-0.5 text-xs font-medium rounded",l?"bg-[var(--color-primary-foreground)] text-[var(--color-primary)]":"bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"),children:a.badge})]},a.id)})}),e.jsx("div",{role:"tabpanel",id:`tabpanel-${o}`,"aria-labelledby":`tab-${o}`,className:"flex-1 overflow-auto",children:R})]})};g.displayName="TabbedContainer";g.__docgenInfo={description:"TabbedContainer - Tabbed content areas",methods:[],displayName:"TabbedContainer",props:{tabs:{required:!0,tsType:{name:"Array",elements:[{name:"TabDefinition"}],raw:"TabDefinition[]"},description:"Tab definitions"},defaultTab:{required:!1,tsType:{name:"string"},description:"Default active tab ID"},activeTab:{required:!1,tsType:{name:"string"},description:"Controlled active tab"},onTabChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(tabId: string) => void",signature:{arguments:[{type:{name:"string"},name:"tabId"}],return:{name:"void"}}},description:"Callback when tab changes"},position:{required:!1,tsType:{name:"union",raw:'"top" | "left"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"left"'}]},description:"Tab position",defaultValue:{value:'"top"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const J={title:"Organisms/Layout/TabbedContainer",component:g,parameters:{layout:"fullscreen",backgrounds:{default:"wireframe"}},tags:["autodocs"]},V=()=>e.jsxs(x,{className:"p-6",children:[e.jsx(n,{variant:"h4",children:"Profile Settings"}),e.jsx(n,{variant:"body2",className:"mt-4 text-neutral-600",children:"Manage your profile information, avatar, and personal details."})]}),W=()=>e.jsxs(x,{className:"p-6",children:[e.jsx(n,{variant:"h4",children:"Security Settings"}),e.jsx(n,{variant:"body2",className:"mt-4 text-neutral-600",children:"Update your password, enable two-factor authentication, and manage sessions."})]}),_=()=>e.jsxs(x,{className:"p-6",children:[e.jsx(n,{variant:"h4",children:"Notification Preferences"}),e.jsx(n,{variant:"body2",className:"mt-4 text-neutral-600",children:"Configure email, push, and in-app notification settings."})]}),h=[{id:"profile",label:"Profile",content:e.jsx(V,{})},{id:"security",label:"Security",content:e.jsx(W,{}),badge:2},{id:"notifications",label:"Notifications",content:e.jsx(_,{})}],c={args:{tabs:h,defaultTab:"profile"},decorators:[t=>e.jsx("div",{style:{height:"400px",width:"100%"},children:e.jsx(t,{})})]},b={args:{tabs:h,defaultTab:"profile",position:"left"},decorators:[t=>e.jsx("div",{style:{height:"400px",width:"100%"},children:e.jsx(t,{})})]},p={args:{tabs:[...h,{id:"billing",label:"Billing",content:e.jsx("div",{}),disabled:!0}],defaultTab:"profile"},decorators:[t=>e.jsx("div",{style:{height:"400px",width:"100%"},children:e.jsx(t,{})})]},u={args:{tabs:[{id:"inbox",label:"Inbox",content:e.jsx(V,{}),badge:12},{id:"sent",label:"Sent",content:e.jsx(W,{})},{id:"drafts",label:"Drafts",content:e.jsx(_,{}),badge:3}],defaultTab:"inbox"},decorators:[t=>e.jsx("div",{style:{height:"400px",width:"100%"},children:e.jsx(t,{})})]};var T,j,S;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    tabs: sampleTabs,
    defaultTab: 'profile'
  },
  decorators: [Story => <div style={{
    height: '400px',
    width: '100%'
  }}>
                <Story />
            </div>]
}`,...(S=(j=c.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var w,N,C;b.parameters={...b.parameters,docs:{...(w=b.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    tabs: sampleTabs,
    defaultTab: 'profile',
    position: 'left'
  },
  decorators: [Story => <div style={{
    height: '400px',
    width: '100%'
  }}>
                <Story />
            </div>]
}`,...(C=(N=b.parameters)==null?void 0:N.docs)==null?void 0:C.source}}};var D,I,q;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    tabs: [...sampleTabs, {
      id: 'billing',
      label: 'Billing',
      content: <div />,
      disabled: true
    }],
    defaultTab: 'profile'
  },
  decorators: [Story => <div style={{
    height: '400px',
    width: '100%'
  }}>
                <Story />
            </div>]
}`,...(q=(I=p.parameters)==null?void 0:I.docs)==null?void 0:q.source}}};var B,k,P;u.parameters={...u.parameters,docs:{...(B=u.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    tabs: [{
      id: 'inbox',
      label: 'Inbox',
      content: <ProfileTab />,
      badge: 12
    }, {
      id: 'sent',
      label: 'Sent',
      content: <SecurityTab />
    }, {
      id: 'drafts',
      label: 'Drafts',
      content: <NotificationsTab />,
      badge: 3
    }],
    defaultTab: 'inbox'
  },
  decorators: [Story => <div style={{
    height: '400px',
    width: '100%'
  }}>
                <Story />
            </div>]
}`,...(P=(k=u.parameters)==null?void 0:k.docs)==null?void 0:P.source}}};const K=["Default","VerticalTabs","WithDisabledTab","WithBadges"];export{c as Default,b as VerticalTabs,u as WithBadges,p as WithDisabledTab,K as __namedExportsOrder,J as default};
