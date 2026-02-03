import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as G}from"./index-GiUgBvb1.js";import{B as O}from"./Badge-Dd4QqFOk.js";import{c as o}from"./cn-BNf5BS2b.js";import{C as y}from"./chevron-right-pDF_OUfd.js";import{C as X}from"./chevron-left-zGYeMbNT.js";import{X as J}from"./x-prXd1WI5.js";import{H as D}from"./home-JwtCVJF2.js";import{U as z}from"./users-CV1mGUsS.js";import{c as P}from"./createLucideIcon-CbHznvEr.js";import{F as B}from"./file-text-DZQctV9o.js";import{M as F}from"./mail-CI1Ybt8r.js";import{C as Q}from"./calendar-rGtwHcH_.js";import{S as Y}from"./settings-DBj1i3lR.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=P("BarChart",[["line",{x1:"12",x2:"12",y1:"20",y2:"10",key:"1vz5eb"}],["line",{x1:"18",x2:"18",y1:"20",y2:"4",key:"cun8e5"}],["line",{x1:"6",x2:"6",y1:"20",y2:"16",key:"hq0ia6"}]]),Z=({item:r,collapsed:s})=>{const t=r.icon,l=r.active??r.isActive;return e.jsxs("button",{onClick:r.onClick,className:o("w-full flex items-center gap-3 px-3 py-2.5 transition-all duration-[var(--transition-fast)] group relative","rounded-[var(--radius-sm)] border-[length:var(--border-width-thin)] border-transparent",l?["bg-[var(--color-foreground)] text-[var(--color-background)]","font-medium shadow-[var(--shadow-sm)]","border-[var(--color-border)] translate-x-1 -translate-y-0.5"].join(" "):["text-[var(--color-foreground)]","hover:bg-[var(--color-muted)] hover:border-[var(--color-border)]","active:bg-[var(--color-foreground)] active:text-[var(--color-background)]"].join(" ")),title:s?r.label:void 0,children:[t&&e.jsx(t,{size:20,className:o("min-w-[20px] flex-shrink-0",l&&"text-[var(--color-background)]")}),!s&&e.jsx("span",{className:"font-medium truncate flex-1 text-left",children:r.label}),!s&&r.badge!==void 0&&e.jsx(O,{variant:"danger",size:"sm",children:r.badge}),s&&e.jsx("div",{className:o("absolute left-full ml-2 px-2 py-1 text-xs opacity-0 group-hover:opacity-100","pointer-events-none whitespace-nowrap z-50 transition-opacity","bg-[var(--color-primary)] text-[var(--color-primary-foreground)]","border-[length:var(--border-width-thin)] border-[var(--color-border)]","rounded-[var(--radius-sm)]"),children:r.label})]})},h=({logo:r,logoSrc:s,brandName:t="KFlow",items:l,userSection:p,footerContent:u,collapsed:f,defaultCollapsed:L=!1,onCollapseChange:b,hideCollapseButton:g=!1,showCloseButton:E=!1,onClose:H,onLogoClick:V,className:W})=>{const[_,K]=G.useState(L),a=f!==void 0?f:_,x=()=>{const i=!a;f===void 0&&K(i),b==null||b(i)};return e.jsxs("aside",{className:o("flex flex-col h-full","bg-[var(--color-card)] border-r border-[var(--color-border)]","transition-all duration-300 ease-in-out",a?"w-20":"w-64",W),children:[e.jsxs("div",{className:"h-16 flex items-center justify-between px-4 border-b border-[var(--color-border)] flex-shrink-0",children:[e.jsxs("div",{className:o("flex items-center gap-3 cursor-pointer",a&&"justify-center w-full"),onClick:V,children:[r?typeof r=="string"?e.jsx("img",{src:r,alt:t,className:"h-8 w-8"}):r:s?e.jsx("img",{src:s,alt:t,className:"h-8 w-8"}):e.jsx("div",{className:"h-8 w-8 bg-[var(--color-primary)] flex items-center justify-center rounded-[var(--radius-sm)]",children:e.jsx("span",{className:"text-[var(--color-primary-foreground)] font-bold text-sm",children:"K"})}),!a&&e.jsx("span",{className:"text-xl font-bold text-[var(--color-foreground)]",children:t})]}),!g&&e.jsx("button",{onClick:x,className:o("p-1.5 hover:bg-[var(--color-muted)] text-[var(--color-foreground)] hidden lg:block","rounded-[var(--radius-sm)]",a&&"mx-auto"),title:a?"Expand Sidebar":"Collapse Sidebar",children:a?e.jsx(y,{size:18}):e.jsx(X,{size:18})}),E&&e.jsx("button",{onClick:H,className:"p-1.5 hover:bg-[var(--color-muted)] text-[var(--color-foreground)] lg:hidden rounded-[var(--radius-sm)]","aria-label":"Close sidebar",children:e.jsx(J,{size:18})})]}),e.jsx("nav",{className:"flex-1 py-6 px-3 space-y-1 overflow-y-auto",children:l.map(i=>e.jsx(Z,{item:i,collapsed:a},i.id))}),(u||p)&&e.jsxs("div",{className:"p-3 border-t border-[var(--color-border)] space-y-1 flex-shrink-0",children:[e.jsxs("div",{className:o("flex items-center",a?"justify-center flex-col gap-4":"justify-between px-2"),children:[u&&e.jsx("div",{className:"flex items-center",children:u}),p&&e.jsx("div",{className:"flex items-center",children:p})]}),a&&!g&&e.jsx("button",{onClick:x,className:"w-full flex justify-center p-2 mt-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] lg:hidden",children:e.jsx(y,{size:20})})]})]})};h.displayName="Sidebar";h.__docgenInfo={description:"",methods:[],displayName:"Sidebar",props:{logo:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Logo/Brand content - can be a ReactNode or logo config"},logoSrc:{required:!1,tsType:{name:"string"},description:"Logo image source"},brandName:{required:!1,tsType:{name:"string"},description:"Brand/App name",defaultValue:{value:"'KFlow'",computed:!1}},items:{required:!0,tsType:{name:"Array",elements:[{name:"SidebarItem"}],raw:"SidebarItem[]"},description:"Navigation items"},userSection:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"User section content"},footerContent:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Footer content (e.g., theme toggle)"},collapsed:{required:!1,tsType:{name:"boolean"},description:"Collapsed state (controlled)"},defaultCollapsed:{required:!1,tsType:{name:"boolean"},description:"Default collapsed state",defaultValue:{value:"false",computed:!1}},onCollapseChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(collapsed: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"collapsed"}],return:{name:"void"}}},description:"Callback when collapse state changes"},hideCollapseButton:{required:!1,tsType:{name:"boolean"},description:"Hide the collapse/expand button",defaultValue:{value:"false",computed:!1}},showCloseButton:{required:!1,tsType:{name:"boolean"},description:"Show a close button (for mobile)",defaultValue:{value:"false",computed:!1}},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when close button is clicked"},onLogoClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when logo/brand is clicked"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const ue={title:"Organisms/Sidebar",component:h,parameters:{layout:"fullscreen",backgrounds:{default:"wireframe"}},tags:["autodocs"]},v=[{id:"dashboard",label:"Dashboard",icon:D,href:"#"},{id:"users",label:"Users",icon:z,href:"#"},{id:"reports",label:"Reports",icon:U,href:"#"},{id:"documents",label:"Documents",icon:B,href:"#"},{id:"messages",label:"Messages",icon:F,href:"#",badge:5},{id:"calendar",label:"Calendar",icon:Q,href:"#"},{id:"settings",label:"Settings",icon:Y,href:"#"}],d={args:{items:v,activeItemId:"dashboard",logo:"MyApp"},decorators:[r=>e.jsx("div",{className:"h-screen",children:e.jsx(r,{})})]},n={args:{items:v,activeItemId:"dashboard",logo:"MA",defaultCollapsed:!0},decorators:[r=>e.jsx("div",{className:"h-screen",children:e.jsx(r,{})})]},c={args:{items:[{id:"dashboard",label:"Dashboard",icon:D,href:"#"}],groups:[{id:"main",label:"Main",items:[{id:"users",label:"Users",icon:z,href:"#"},{id:"reports",label:"Reports",icon:U,href:"#"}]},{id:"content",label:"Content",items:[{id:"documents",label:"Documents",icon:B,href:"#"},{id:"messages",label:"Messages",icon:F,href:"#",badge:3}]}],activeItemId:"users",logo:"MyApp"},decorators:[r=>e.jsx("div",{className:"h-screen",children:e.jsx(r,{})})]},m={args:{items:v,activeItemId:"dashboard",logo:"MyApp",footer:e.jsx("div",{className:"p-4 border-t-2 border-black",children:e.jsx("p",{className:"text-sm text-neutral-600",children:"v1.0.0"})})},decorators:[r=>e.jsx("div",{className:"h-screen",children:e.jsx(r,{})})]};var j,N,w;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    items: sidebarItems,
    activeItemId: 'dashboard',
    logo: 'MyApp'
  },
  decorators: [Story => <div className="h-screen">
                <Story />
            </div>]
}`,...(w=(N=d.parameters)==null?void 0:N.docs)==null?void 0:w.source}}};var C,I,S;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    items: sidebarItems,
    activeItemId: 'dashboard',
    logo: 'MA',
    defaultCollapsed: true
  },
  decorators: [Story => <div className="h-screen">
                <Story />
            </div>]
}`,...(S=(I=n.parameters)==null?void 0:I.docs)==null?void 0:S.source}}};var k,R,T;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      href: '#'
    }],
    groups: [{
      id: 'main',
      label: 'Main',
      items: [{
        id: 'users',
        label: 'Users',
        icon: Users,
        href: '#'
      }, {
        id: 'reports',
        label: 'Reports',
        icon: BarChart,
        href: '#'
      }]
    }, {
      id: 'content',
      label: 'Content',
      items: [{
        id: 'documents',
        label: 'Documents',
        icon: FileText,
        href: '#'
      }, {
        id: 'messages',
        label: 'Messages',
        icon: Mail,
        href: '#',
        badge: 3
      }]
    }],
    activeItemId: 'users',
    logo: 'MyApp'
  },
  decorators: [Story => <div className="h-screen">
                <Story />
            </div>]
}`,...(T=(R=c.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};var M,q,A;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    items: sidebarItems,
    activeItemId: 'dashboard',
    logo: 'MyApp',
    footer: <div className="p-4 border-t-2 border-black">
                <p className="text-sm text-neutral-600">v1.0.0</p>
            </div>
  },
  decorators: [Story => <div className="h-screen">
                <Story />
            </div>]
}`,...(A=(q=m.parameters)==null?void 0:q.docs)==null?void 0:A.source}}};const fe=["Default","Collapsed","WithGroups","WithFooter"];export{n as Collapsed,d as Default,m as WithFooter,c as WithGroups,fe as __namedExportsOrder,ue as default};
