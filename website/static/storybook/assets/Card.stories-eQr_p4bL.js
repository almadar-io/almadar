import{j as e}from"./jsx-runtime-CDt2p4po.js";import{C as a,a as i,b as r,c as b,d as g}from"./Card-BNT5PrJ5.js";import{B as l}from"./Button-B7t-_IKa.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";const z={title:"Atoms/Card",component:a,parameters:{layout:"centered",backgrounds:{default:"wireframe"}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","outline","elevated"]}}},t={args:{children:e.jsxs(i,{children:[e.jsx(r,{children:"Card Title"}),e.jsx("p",{className:"text-sm text-neutral-600",children:"This is a simple card with the wireframe theme applied."})]})}},s={render:()=>e.jsxs(a,{className:"w-80",children:[e.jsxs(g,{children:[e.jsx(r,{children:"Card Header"}),e.jsx("p",{className:"text-sm text-neutral-600",children:"With header and body sections"})]}),e.jsx(i,{children:e.jsx("p",{className:"text-black",children:"This card demonstrates the header and body layout."})})]})},d={render:()=>e.jsxs(a,{className:"w-80",children:[e.jsxs(i,{children:[e.jsx(r,{children:"Complete Card"}),e.jsx("p",{className:"text-sm text-neutral-600",children:"Header, body, and footer sections"}),e.jsx("p",{className:"mt-4 text-black",children:"Main content goes here in the body section."})]}),e.jsxs(b,{children:[e.jsx(l,{variant:"secondary",size:"sm",children:"Cancel"}),e.jsx(l,{variant:"primary",size:"sm",children:"Save"})]})]})},n={render:()=>e.jsxs("div",{className:"flex gap-4",children:[e.jsxs(a,{variant:"default",className:"w-48 p-4",children:[e.jsx(r,{children:"Default"}),e.jsx("p",{className:"text-sm text-neutral-600",children:"Default variant"})]}),e.jsxs(a,{variant:"bordered",className:"w-48 p-4",children:[e.jsx(r,{children:"Bordered"}),e.jsx("p",{className:"text-sm text-neutral-600",children:"Bordered variant"})]}),e.jsxs(a,{variant:"elevated",className:"w-48 p-4",children:[e.jsx(r,{children:"Elevated"}),e.jsx("p",{className:"text-sm text-neutral-600",children:"Elevated variant"})]})]})},o={render:()=>e.jsx(a,{className:"w-80 cursor-pointer hover:shadow-wireframe transition-shadow",children:e.jsxs(i,{children:[e.jsx(r,{children:"Interactive Card"}),e.jsx("p",{className:"text-sm text-neutral-600",children:"Hover to see the shadow effect"})]})})};var c,m,p;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    children: <CardBody>
                <CardTitle>Card Title</CardTitle>
                <p className="text-sm text-neutral-600">This is a simple card with the wireframe theme applied.</p>
            </CardBody>
  }
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var h,x,C;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <Card className="w-80">
            <CardHeader>
                <CardTitle>Card Header</CardTitle>
                <p className="text-sm text-neutral-600">With header and body sections</p>
            </CardHeader>
            <CardBody>
                <p className="text-black">
                    This card demonstrates the header and body layout.
                </p>
            </CardBody>
        </Card>
}`,...(C=(x=s.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var u,v,j;d.parameters={...d.parameters,docs:{...(u=d.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <Card className="w-80">
            <CardBody>
                <CardTitle>Complete Card</CardTitle>
                <p className="text-sm text-neutral-600">Header, body, and footer sections</p>
                <p className="mt-4 text-black">
                    Main content goes here in the body section.
                </p>
            </CardBody>
            <CardFooter>
                <Button variant="secondary" size="sm">Cancel</Button>
                <Button variant="primary" size="sm">Save</Button>
            </CardFooter>
        </Card>
}`,...(j=(v=d.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var N,f,w;n.parameters={...n.parameters,docs:{...(N=n.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4">
            <Card variant="default" className="w-48 p-4">
                <CardTitle>Default</CardTitle>
                <p className="text-sm text-neutral-600">Default variant</p>
            </Card>
            <Card variant="bordered" className="w-48 p-4">
                <CardTitle>Bordered</CardTitle>
                <p className="text-sm text-neutral-600">Bordered variant</p>
            </Card>
            <Card variant="elevated" className="w-48 p-4">
                <CardTitle>Elevated</CardTitle>
                <p className="text-sm text-neutral-600">Elevated variant</p>
            </Card>
        </div>
}`,...(w=(f=n.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};var y,T,B;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <Card className="w-80 cursor-pointer hover:shadow-wireframe transition-shadow">
            <CardBody>
                <CardTitle>Interactive Card</CardTitle>
                <p className="text-sm text-neutral-600">Hover to see the shadow effect</p>
            </CardBody>
        </Card>
}`,...(B=(T=o.parameters)==null?void 0:T.docs)==null?void 0:B.source}}};const I=["Default","WithHeader","WithFooter","Variants","Interactive"];export{t as Default,o as Interactive,n as Variants,d as WithFooter,s as WithHeader,I as __namedExportsOrder,z as default};
