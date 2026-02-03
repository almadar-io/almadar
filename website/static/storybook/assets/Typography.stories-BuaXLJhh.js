import{j as r}from"./jsx-runtime-CDt2p4po.js";import{T as a}from"./Typography-Wmkp-g7N.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";const k={title:"Atoms/Typography",component:a,parameters:{layout:"centered",backgrounds:{default:"wireframe"}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["h1","h2","h3","h4","h5","h6","body","body2","small","caption"]},color:{control:"select",options:["primary","secondary","muted","error","success","warning","inherit"]},weight:{control:"select",options:["normal","medium","semibold","bold"]}}},e={args:{children:"The quick brown fox jumps over the lazy dog"}},o={render:()=>r.jsxs("div",{className:"space-y-2",children:[r.jsx(a,{variant:"h1",children:"Heading 1"}),r.jsx(a,{variant:"h2",children:"Heading 2"}),r.jsx(a,{variant:"h3",children:"Heading 3"}),r.jsx(a,{variant:"h4",children:"Heading 4"}),r.jsx(a,{variant:"h5",children:"Heading 5"}),r.jsx(a,{variant:"h6",children:"Heading 6"})]})},n={render:()=>r.jsxs("div",{className:"space-y-4 max-w-lg",children:[r.jsx(a,{variant:"body",children:"Body: This is the default body text used for paragraphs and regular content. It provides optimal readability for longer text."}),r.jsx(a,{variant:"body2",children:"Body 2: A slightly smaller body variant for secondary content or less prominent text."}),r.jsx(a,{variant:"small",children:"Small: Used for captions, labels, and auxiliary information."}),r.jsx(a,{variant:"caption",children:"Caption: The smallest text variant for meta information."})]})},s={render:()=>r.jsxs("div",{className:"space-y-2",children:[r.jsx(a,{color:"primary",children:"Primary Color"}),r.jsx(a,{color:"secondary",children:"Secondary Color"}),r.jsx(a,{color:"muted",children:"Muted Color"}),r.jsx(a,{color:"error",children:"Error Color"}),r.jsx(a,{color:"success",children:"Success Color"}),r.jsx(a,{color:"warning",children:"Warning Color"})]})},i={render:()=>r.jsxs("div",{className:"space-y-2",children:[r.jsx(a,{weight:"normal",children:"Normal Weight"}),r.jsx(a,{weight:"medium",children:"Medium Weight"}),r.jsx(a,{weight:"semibold",children:"Semibold Weight"}),r.jsx(a,{weight:"bold",children:"Bold Weight"})]})},t={args:{as:"a",children:"This is a link",className:"underline hover:no-underline cursor-pointer"}};var p,d,l;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    children: 'The quick brown fox jumps over the lazy dog'
  }
}`,...(l=(d=e.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var c,y,h;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <div className="space-y-2">
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>
        </div>
}`,...(h=(y=o.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var g,m,u;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 max-w-lg">
            <Typography variant="body">
                Body: This is the default body text used for paragraphs and regular content.
                It provides optimal readability for longer text.
            </Typography>
            <Typography variant="body2">
                Body 2: A slightly smaller body variant for secondary content or less prominent text.
            </Typography>
            <Typography variant="small">
                Small: Used for captions, labels, and auxiliary information.
            </Typography>
            <Typography variant="caption">
                Caption: The smallest text variant for meta information.
            </Typography>
        </div>
}`,...(u=(m=n.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var T,v,x;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div className="space-y-2">
            <Typography color="primary">Primary Color</Typography>
            <Typography color="secondary">Secondary Color</Typography>
            <Typography color="muted">Muted Color</Typography>
            <Typography color="error">Error Color</Typography>
            <Typography color="success">Success Color</Typography>
            <Typography color="warning">Warning Color</Typography>
        </div>
}`,...(x=(v=s.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var j,b,f;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div className="space-y-2">
            <Typography weight="normal">Normal Weight</Typography>
            <Typography weight="medium">Medium Weight</Typography>
            <Typography weight="semibold">Semibold Weight</Typography>
            <Typography weight="bold">Bold Weight</Typography>
        </div>
}`,...(f=(b=i.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var w,C,H;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    as: 'a',
    children: 'This is a link',
    className: 'underline hover:no-underline cursor-pointer'
  }
}`,...(H=(C=t.parameters)==null?void 0:C.docs)==null?void 0:H.source}}};const A=["Default","Headings","Body","Colors","Weights","AsLink"];export{t as AsLink,n as Body,s as Colors,e as Default,o as Headings,i as Weights,A as __namedExportsOrder,k as default};
