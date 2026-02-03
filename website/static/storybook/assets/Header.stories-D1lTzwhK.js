import{j as e}from"./jsx-runtime-CDt2p4po.js";import{S as _}from"./SearchInput-Cd97mNb1.js";import{A as O}from"./Avatar-CJtPgGUU.js";import{B as K}from"./Badge-CpH0PNM6.js";import{c as o}from"./cn-BNf5BS2b.js";import{X as Y}from"./x-prXd1WI5.js";import{M as X}from"./menu-DUN0as2h.js";import"./index-GiUgBvb1.js";import"./Input-DhFss4oc.js";import"./chevron-down-BQmz_Bpa.js";import"./createLucideIcon-CbHznvEr.js";import"./Spinner-vF2DJrH5.js";import"./loader-2-DXp1ic5P.js";import"./useEventBus-BNZMNlv8.js";import"./useQuerySingleton-BfKwTnRX.js";import"./search-CCKipEn6.js";import"./user-BePscFH1.js";const p=({logo:s,logoSrc:g,brandName:t="KFlow",navigationItems:u,showMenuToggle:U=!0,isMenuOpen:f=!1,onMenuToggle:J,showSearch:V=!1,searchPlaceholder:z="Search...",onSearch:F,userAvatar:a,userName:n,onUserClick:h,actions:H,sticky:L=!0,variant:v="mobile",onLogoClick:b,className:B})=>{var y;const E=(a==null?void 0:a.initials)||((y=n==null?void 0:n[0])==null?void 0:y.toUpperCase())||"U";return e.jsxs("header",{className:o("h-16 border-b border-[var(--color-border)]","flex items-center px-4 justify-between bg-[var(--color-card)]",L&&"sticky top-0 z-50",v==="mobile"&&"lg:hidden",B),children:[e.jsxs("div",{className:"flex items-center gap-3",children:[U&&e.jsx("button",{onClick:J,className:"p-2 -ml-2 text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors","aria-label":f?"Close menu":"Open menu",children:f?e.jsx(Y,{size:24}):e.jsx(X,{size:24})}),e.jsxs("div",{className:o("flex items-center gap-2",b&&"cursor-pointer"),onClick:b,children:[s?typeof s=="string"?e.jsx("img",{src:s,alt:t,className:"h-8 w-8"}):s:g?e.jsx("img",{src:g,alt:t,className:"h-8 w-8"}):null,t&&e.jsx("span",{className:"text-lg font-bold text-[var(--color-foreground)]",children:t})]})]}),v==="desktop"&&u&&u.length>0&&e.jsx("nav",{className:"hidden md:flex items-center gap-1 flex-1 justify-center",children:u.map((r,W)=>e.jsxs("button",{onClick:r.onClick,className:o("flex items-center gap-2 px-3 py-2 rounded-[var(--radius-lg)] transition-colors",r.active?"bg-[var(--color-primary)]/10 text-[var(--color-primary)]":"text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"),children:[r.icon&&e.jsx(r.icon,{size:18}),e.jsx("span",{className:"font-medium",children:r.label}),r.badge!==void 0&&e.jsx(K,{variant:"danger",size:"sm",children:r.badge})]},W))}),V&&e.jsx("div",{className:"hidden lg:block flex-1 max-w-md mx-4",children:e.jsx(_,{placeholder:z,onSearch:F})}),e.jsxs("div",{className:"flex items-center gap-3",children:[H,(a||n)&&e.jsx("button",{onClick:h,className:o("w-8 h-8 rounded-[var(--radius-full)] bg-[var(--color-primary)]/10 flex items-center justify-center","text-[var(--color-primary)] font-bold text-xs","hover:ring-2 hover:ring-[var(--color-ring)] transition-all",h&&"cursor-pointer"),children:a!=null&&a.src?e.jsx(O,{src:a.src,alt:a.alt||n,size:"sm"}):E})]})]})};p.displayName="Header";p.__docgenInfo={description:"",methods:[],displayName:"Header",props:{logo:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Logo/Brand content"},logoSrc:{required:!1,tsType:{name:"string"},description:"Logo image source"},brandName:{required:!1,tsType:{name:"string"},description:"Brand/App name",defaultValue:{value:'"KFlow"',computed:!1}},navigationItems:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: LucideIcon;
  badge?: string | number;
  active?: boolean;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"href",value:{name:"string",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"icon",value:{name:"LucideIcon",required:!1}},{key:"badge",value:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}],required:!1}},{key:"active",value:{name:"boolean",required:!1}}]}}],raw:`Array<{
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: LucideIcon;
  badge?: string | number;
  active?: boolean;
}>`},description:"Navigation items (for desktop header variant)"},showMenuToggle:{required:!1,tsType:{name:"boolean"},description:`Show menu toggle button
@default true`,defaultValue:{value:"true",computed:!1}},isMenuOpen:{required:!1,tsType:{name:"boolean"},description:"Is menu open (for toggle icon)",defaultValue:{value:"false",computed:!1}},onMenuToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Menu toggle callback"},showSearch:{required:!1,tsType:{name:"boolean"},description:`Show search input
@default false`,defaultValue:{value:"false",computed:!1}},searchPlaceholder:{required:!1,tsType:{name:"string"},description:"Search placeholder",defaultValue:{value:'"Search..."',computed:!1}},onSearch:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:"Search callback"},userAvatar:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  src?: string;
  alt?: string;
  initials?: string;
}`,signature:{properties:[{key:"src",value:{name:"string",required:!1}},{key:"alt",value:{name:"string",required:!1}},{key:"initials",value:{name:"string",required:!1}}]}},description:"User avatar configuration"},userName:{required:!1,tsType:{name:"string"},description:"User name (display name or email)"},onUserClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when user avatar is clicked"},actions:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Action buttons (right side)"},sticky:{required:!1,tsType:{name:"boolean"},description:`Sticky header
@default true`,defaultValue:{value:"true",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:'"mobile" | "desktop"',elements:[{name:"literal",value:'"mobile"'},{name:"literal",value:'"desktop"'}]},description:`Variant - mobile shows menu toggle, desktop shows full nav
@default 'mobile'`,defaultValue:{value:'"mobile"',computed:!1}},onLogoClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when logo/brand is clicked"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const pe={title:"Organisms/Header",component:p,parameters:{layout:"fullscreen",backgrounds:{default:"wireframe"}},tags:["autodocs"]},i={args:{logo:"MyApp",user:{name:"John Doe",email:"john@example.com",avatar:"https://i.pravatar.cc/150?img=1"},navItems:[{label:"Dashboard",href:"#"},{label:"Projects",href:"#"},{label:"Team",href:"#"}]}},l={args:{logo:"MyApp",showSearch:!0,user:{name:"Jane Smith",email:"jane@example.com"},navItems:[{label:"Dashboard",href:"#"},{label:"Projects",href:"#"}]}},c={args:{logo:"MyApp",user:{name:"John Doe",email:"john@example.com"},notifications:[{id:"1",title:"New message",message:"You have a new message from Jane",time:"5 min ago"},{id:"2",title:"Task completed",message:"Project review is complete",time:"1 hour ago"},{id:"3",title:"Update available",message:"A new version is available",time:"2 hours ago"}],navItems:[{label:"Dashboard",href:"#"},{label:"Projects",href:"#"}]}},m={args:{logo:"SimpleApp"}},d={args:{logo:"Enterprise App",showSearch:!0,user:{name:"Admin User",email:"admin@company.com",avatar:"https://i.pravatar.cc/150?img=3"},navItems:[{label:"Dashboard",href:"#",active:!0},{label:"Analytics",href:"#"},{label:"Reports",href:"#"},{label:"Settings",href:"#"}],notifications:[{id:"1",title:"New user signup",message:"5 new users signed up today",time:"10 min ago"},{id:"2",title:"Server alert",message:"CPU usage above 80%",time:"30 min ago"}]}};var x,w,j;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    logo: 'MyApp',
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    navItems: [{
      label: 'Dashboard',
      href: '#'
    }, {
      label: 'Projects',
      href: '#'
    }, {
      label: 'Team',
      href: '#'
    }]
  }
}`,...(j=(w=i.parameters)==null?void 0:w.docs)==null?void 0:j.source}}};var k,S,q;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    logo: 'MyApp',
    showSearch: true,
    user: {
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    navItems: [{
      label: 'Dashboard',
      href: '#'
    }, {
      label: 'Projects',
      href: '#'
    }]
  }
}`,...(q=(S=l.parameters)==null?void 0:S.docs)==null?void 0:q.source}}};var T,N,C;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    logo: 'MyApp',
    user: {
      name: 'John Doe',
      email: 'john@example.com'
    },
    notifications: [{
      id: '1',
      title: 'New message',
      message: 'You have a new message from Jane',
      time: '5 min ago'
    }, {
      id: '2',
      title: 'Task completed',
      message: 'Project review is complete',
      time: '1 hour ago'
    }, {
      id: '3',
      title: 'Update available',
      message: 'A new version is available',
      time: '2 hours ago'
    }],
    navItems: [{
      label: 'Dashboard',
      href: '#'
    }, {
      label: 'Projects',
      href: '#'
    }]
  }
}`,...(C=(N=c.parameters)==null?void 0:N.docs)==null?void 0:C.source}}};var D,I,M;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    logo: 'SimpleApp'
  }
}`,...(M=(I=m.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};var A,P,R;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    logo: 'Enterprise App',
    showSearch: true,
    user: {
      name: 'Admin User',
      email: 'admin@company.com',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    navItems: [{
      label: 'Dashboard',
      href: '#',
      active: true
    }, {
      label: 'Analytics',
      href: '#'
    }, {
      label: 'Reports',
      href: '#'
    }, {
      label: 'Settings',
      href: '#'
    }],
    notifications: [{
      id: '1',
      title: 'New user signup',
      message: '5 new users signed up today',
      time: '10 min ago'
    }, {
      id: '2',
      title: 'Server alert',
      message: 'CPU usage above 80%',
      time: '30 min ago'
    }]
  }
}`,...(R=(P=d.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};const ge=["Default","WithSearch","WithNotifications","MinimalHeader","FullFeatured"];export{i as Default,d as FullFeatured,m as MinimalHeader,c as WithNotifications,l as WithSearch,ge as __namedExportsOrder,pe as default};
