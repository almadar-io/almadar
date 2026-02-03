import{j as e}from"./jsx-runtime-CDt2p4po.js";import{c as R}from"./cn-BNf5BS2b.js";import{B as t}from"./Box-DYJzRMmP.js";import{T as a}from"./Typography-Wmkp-g7N.js";import{B as r}from"./Button-B7t-_IKa.js";import{C as s}from"./Card-BNT5PrJ5.js";import{P as z}from"./plus-jSzJaRn3.js";import{D as F}from"./download-yLSRVNFt.js";import{S as I}from"./settings-DBj1i3lR.js";import"./index-GiUgBvb1.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";const l=({title:P,subtitle:p,children:D,headerActions:m,footer:h,className:M})=>e.jsxs(t,{display:"flex",fullHeight:!0,className:R("flex-col",M),children:[e.jsxs(t,{padding:"md",border:!0,className:"border-b-2 border-x-0 border-t-0 border-[var(--color-border)] flex items-center justify-between flex-shrink-0",children:[e.jsxs("div",{children:[e.jsx(a,{variant:"h3",children:P}),p&&e.jsx(a,{variant:"body2",color:"secondary",className:"mt-1",children:p})]}),m&&e.jsx("div",{className:"flex items-center gap-2",children:m})]}),e.jsx(t,{fullWidth:!0,overflow:"auto",className:"flex-1",children:e.jsx(t,{padding:"lg",children:D})}),h&&e.jsx(t,{padding:"md",border:!0,bg:"muted",className:"border-t-2 border-x-0 border-b-0 border-[var(--color-border)] flex-shrink-0",children:h})]});l.displayName="GenericAppTemplate";l.__docgenInfo={description:"",methods:[],displayName:"GenericAppTemplate",props:{title:{required:!0,tsType:{name:"string"},description:"Page title"},subtitle:{required:!1,tsType:{name:"string"},description:"Subtitle or description"},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Main content"},headerActions:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Header actions (buttons, links)"},footer:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Footer content"},className:{required:!1,tsType:{name:"string"},description:"Additional class name"}}};const $={title:"Templates/GenericAppTemplate",component:l,parameters:{layout:"fullscreen",backgrounds:{default:"wireframe"}},tags:["autodocs"]},o={args:{title:"My Application",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{variant:"body1",children:"This is the main content area of your application."}),e.jsxs(s,{className:"p-4",children:[e.jsx(a,{variant:"h5",children:"Welcome!"}),e.jsx(a,{variant:"body2",color:"secondary",children:"Start building your application from this template."})]})]})}},i={args:{title:"Dashboard",subtitle:"Overview of your system metrics and activities",children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsxs(s,{className:"p-4",children:[e.jsx(a,{variant:"h6",children:"Metric 1"}),e.jsx(a,{variant:"h3",children:"2,543"})]}),e.jsxs(s,{className:"p-4",children:[e.jsx(a,{variant:"h6",children:"Metric 2"}),e.jsx(a,{variant:"h3",children:"$45,231"})]}),e.jsxs(s,{className:"p-4",children:[e.jsx(a,{variant:"h6",children:"Metric 3"}),e.jsx(a,{variant:"h3",children:"156"})]})]})}},n={args:{title:"Projects",subtitle:"Manage your active projects",headerActions:e.jsxs(e.Fragment,{children:[e.jsx(r,{variant:"ghost",size:"sm",leftIcon:e.jsx(I,{className:"h-4 w-4"}),children:"Settings"}),e.jsx(r,{variant:"primary",size:"sm",leftIcon:e.jsx(z,{className:"h-4 w-4"}),children:"New Project"})]}),children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs(s,{className:"p-4",children:[e.jsx(a,{variant:"h6",children:"Project Alpha"}),e.jsx(a,{variant:"body2",color:"secondary",children:"Last updated 2 hours ago"})]}),e.jsxs(s,{className:"p-4",children:[e.jsx(a,{variant:"h6",children:"Project Beta"}),e.jsx(a,{variant:"body2",color:"secondary",children:"Last updated 1 day ago"})]})]})}},c={args:{title:"Document Editor",children:e.jsx("div",{className:"h-[300px] border-2 border-dashed border-neutral-300 flex items-center justify-center",children:e.jsx(a,{color:"secondary",children:"Editor content goes here"})}),footer:e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx(a,{variant:"body2",color:"secondary",children:"Last saved: 5 minutes ago"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(r,{variant:"ghost",size:"sm",children:"Cancel"}),e.jsx(r,{variant:"primary",size:"sm",leftIcon:e.jsx(F,{className:"h-4 w-4"}),children:"Save Document"})]})]})}},d={args:{title:"User Management",subtitle:"View and manage all users in your organization",headerActions:e.jsxs(e.Fragment,{children:[e.jsx(r,{variant:"ghost",size:"sm",children:"Export"}),e.jsx(r,{variant:"primary",size:"sm",leftIcon:e.jsx(z,{className:"h-4 w-4"}),children:"Add User"})]}),children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(s,{className:"p-4",children:e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("div",{children:[e.jsx(a,{variant:"body1",className:"font-bold",children:"John Doe"}),e.jsx(a,{variant:"body2",color:"secondary",children:"john@example.com"})]}),e.jsx("span",{className:"px-2 py-1 border-2 border-emerald-600 text-emerald-600 text-xs font-bold",children:"Active"})]})}),e.jsx(s,{className:"p-4",children:e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("div",{children:[e.jsx(a,{variant:"body1",className:"font-bold",children:"Jane Smith"}),e.jsx(a,{variant:"body2",color:"secondary",children:"jane@example.com"})]}),e.jsx("span",{className:"px-2 py-1 border-2 border-amber-500 text-amber-500 text-xs font-bold",children:"Pending"})]})})]}),footer:e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx(a,{variant:"body2",color:"secondary",children:"Showing 2 of 156 users"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(r,{variant:"ghost",size:"sm",children:"Previous"}),e.jsx(r,{variant:"ghost",size:"sm",children:"Next"})]})]})}};var y,g,x;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    title: 'My Application',
    children: <div className="space-y-4">
                <Typography variant="body1">
                    This is the main content area of your application.
                </Typography>
                <Card className="p-4">
                    <Typography variant="h5">Welcome!</Typography>
                    <Typography variant="body2" color="secondary">
                        Start building your application from this template.
                    </Typography>
                </Card>
            </div>
  }
}`,...(x=(g=o.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var u,v,j;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    title: 'Dashboard',
    subtitle: 'Overview of your system metrics and activities',
    children: <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                    <Typography variant="h6">Metric 1</Typography>
                    <Typography variant="h3">2,543</Typography>
                </Card>
                <Card className="p-4">
                    <Typography variant="h6">Metric 2</Typography>
                    <Typography variant="h3">$45,231</Typography>
                </Card>
                <Card className="p-4">
                    <Typography variant="h6">Metric 3</Typography>
                    <Typography variant="h3">156</Typography>
                </Card>
            </div>
  }
}`,...(j=(v=i.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var b,f,N;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    title: 'Projects',
    subtitle: 'Manage your active projects',
    headerActions: <>
                <Button variant="ghost" size="sm" leftIcon={<Settings className="h-4 w-4" />}>
                    Settings
                </Button>
                <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                    New Project
                </Button>
            </>,
    children: <div className="space-y-4">
                <Card className="p-4">
                    <Typography variant="h6">Project Alpha</Typography>
                    <Typography variant="body2" color="secondary">Last updated 2 hours ago</Typography>
                </Card>
                <Card className="p-4">
                    <Typography variant="h6">Project Beta</Typography>
                    <Typography variant="body2" color="secondary">Last updated 1 day ago</Typography>
                </Card>
            </div>
  }
}`,...(N=(f=n.parameters)==null?void 0:f.docs)==null?void 0:N.source}}};var T,w,B;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    title: 'Document Editor',
    children: <div className="h-[300px] border-2 border-dashed border-neutral-300 flex items-center justify-center">
                <Typography color="secondary">Editor content goes here</Typography>
            </div>,
    footer: <div className="flex justify-between items-center">
                <Typography variant="body2" color="secondary">
                    Last saved: 5 minutes ago
                </Typography>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Cancel</Button>
                    <Button variant="primary" size="sm" leftIcon={<Download className="h-4 w-4" />}>
                        Save Document
                    </Button>
                </div>
            </div>
  }
}`,...(B=(w=c.parameters)==null?void 0:w.docs)==null?void 0:B.source}}};var S,C,A;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    title: 'User Management',
    subtitle: 'View and manage all users in your organization',
    headerActions: <>
                <Button variant="ghost" size="sm">Export</Button>
                <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                    Add User
                </Button>
            </>,
    children: <div className="space-y-4">
                <Card className="p-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <Typography variant="body1" className="font-bold">John Doe</Typography>
                            <Typography variant="body2" color="secondary">john@example.com</Typography>
                        </div>
                        <span className="px-2 py-1 border-2 border-emerald-600 text-emerald-600 text-xs font-bold">Active</span>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <Typography variant="body1" className="font-bold">Jane Smith</Typography>
                            <Typography variant="body2" color="secondary">jane@example.com</Typography>
                        </div>
                        <span className="px-2 py-1 border-2 border-amber-500 text-amber-500 text-xs font-bold">Pending</span>
                    </div>
                </Card>
            </div>,
    footer: <div className="flex justify-between items-center">
                <Typography variant="body2" color="secondary">
                    Showing 2 of 156 users
                </Typography>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Previous</Button>
                    <Button variant="ghost" size="sm">Next</Button>
                </div>
            </div>
  }
}`,...(A=(C=d.parameters)==null?void 0:C.docs)==null?void 0:A.source}}};const K=["Default","WithSubtitle","WithHeaderActions","WithFooter","FullFeatured"];export{o as Default,d as FullFeatured,c as WithFooter,n as WithHeaderActions,i as WithSubtitle,K as __namedExportsOrder,$ as default};
