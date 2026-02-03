import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as o}from"./index-GiUgBvb1.js";import{c as n}from"./cn-BNf5BS2b.js";import{B as u}from"./Box-DYJzRMmP.js";import{T as a}from"./Typography-Wmkp-g7N.js";const y=({direction:t="horizontal",ratio:_=50,minSize:j=100,resizable:f=!0,left:A,right:I,className:O,leftClassName:U,rightClassName:X})=>{const[Y,$]=o.useState(_),g=o.useRef(null),x=o.useRef(!1),F=o.useCallback(G=>{if(!f)return;G.preventDefault(),x.current=!0;const w=R=>{if(!x.current||!g.current)return;const r=g.current.getBoundingClientRect();let s;t==="horizontal"?s=(R.clientX-r.left)/r.width*100:s=(R.clientY-r.top)/r.height*100;const S=j/(t==="horizontal"?r.width:r.height)*100,J=100-S;s=Math.max(S,Math.min(J,s)),$(s)},N=()=>{x.current=!1,document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",N)};document.addEventListener("mousemove",w),document.addEventListener("mouseup",N)},[t,j,f]),v=t==="horizontal";return e.jsxs("div",{ref:g,className:n("flex w-full h-full",v?"flex-row":"flex-col",O),children:[e.jsx("div",{className:n("overflow-auto",U),style:{[v?"width":"height"]:`${Y}%`,flexShrink:0},children:A}),f&&e.jsx("div",{onMouseDown:F,className:n("flex-shrink-0 bg-[var(--color-border)] transition-colors",v?"w-1 cursor-col-resize hover:w-1.5 hover:bg-[var(--color-muted-foreground)]":"h-1 cursor-row-resize hover:h-1.5 hover:bg-[var(--color-muted-foreground)]")}),e.jsx("div",{className:n("flex-1 overflow-auto",X),children:I})]})};y.displayName="SplitPane";y.__docgenInfo={description:"SplitPane - Two-pane resizable layout",methods:[],displayName:"SplitPane",props:{direction:{required:!1,tsType:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}]},description:"Direction of the split",defaultValue:{value:'"horizontal"',computed:!1}},ratio:{required:!1,tsType:{name:"number"},description:"Initial ratio (0-100, percentage of first pane)",defaultValue:{value:"50",computed:!1}},minSize:{required:!1,tsType:{name:"number"},description:"Minimum size of either pane in pixels",defaultValue:{value:"100",computed:!1}},resizable:{required:!1,tsType:{name:"boolean"},description:"Allow user resizing",defaultValue:{value:"true",computed:!1}},left:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Content for the left/top pane"},right:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Content for the right/bottom pane"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"},leftClassName:{required:!1,tsType:{name:"string"},description:"Class for left/top pane"},rightClassName:{required:!1,tsType:{name:"string"},description:"Class for right/bottom pane"}}};const ae={title:"Organisms/Layout/SplitPane",component:y,parameters:{layout:"fullscreen",backgrounds:{default:"wireframe"}},tags:["autodocs"]},m=()=>e.jsxs(u,{className:"h-full p-4 bg-neutral-100",children:[e.jsx(a,{variant:"h4",children:"Left Pane"}),e.jsx(a,{variant:"body2",className:"mt-2 text-neutral-600",children:"This is the left/top content area. Drag the handle to resize."})]}),p=()=>e.jsxs(u,{className:"h-full p-4",children:[e.jsx(a,{variant:"h4",children:"Right Pane"}),e.jsx(a,{variant:"body2",className:"mt-2 text-neutral-600",children:"This is the right/bottom content area."})]}),i={args:{left:e.jsx(m,{}),right:e.jsx(p,{}),ratio:50,resizable:!0},decorators:[t=>e.jsx("div",{style:{height:"400px",width:"100%"},children:e.jsx(t,{})})]},l={args:{left:e.jsx(m,{}),right:e.jsx(p,{}),ratio:33,direction:"horizontal"},decorators:[t=>e.jsx("div",{style:{height:"400px",width:"100%"},children:e.jsx(t,{})})]},c={args:{left:e.jsx(m,{}),right:e.jsx(p,{}),direction:"vertical",ratio:40},decorators:[t=>e.jsx("div",{style:{height:"600px",width:"100%"},children:e.jsx(t,{})})]},d={args:{left:e.jsx(m,{}),right:e.jsx(p,{}),ratio:30,resizable:!1},decorators:[t=>e.jsx("div",{style:{height:"400px",width:"100%"},children:e.jsx(t,{})})]},h={args:{left:e.jsxs(u,{className:"h-full p-4 bg-neutral-900 text-white font-mono",children:[e.jsx(a,{variant:"small",className:"text-green-400",children:"// Editor"}),e.jsx("pre",{className:"mt-2 text-sm",children:`function hello() {
  return "Hello, World!";
}`})]}),right:e.jsx(u,{className:"h-full p-4 flex items-center justify-center",children:e.jsx(a,{variant:"h3",children:"Preview: Hello, World!"})}),ratio:50},decorators:[t=>e.jsx("div",{style:{height:"400px",width:"100%"},children:e.jsx(t,{})})]};var b,z,P;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    left: <LeftPane />,
    right: <RightPane />,
    ratio: 50,
    resizable: true
  },
  decorators: [Story => <div style={{
    height: '400px',
    width: '100%'
  }}>
                <Story />
            </div>]
}`,...(P=(z=i.parameters)==null?void 0:z.docs)==null?void 0:P.source}}};var T,C,L;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    left: <LeftPane />,
    right: <RightPane />,
    ratio: 33,
    direction: 'horizontal'
  },
  decorators: [Story => <div style={{
    height: '400px',
    width: '100%'
  }}>
                <Story />
            </div>]
}`,...(L=(C=l.parameters)==null?void 0:C.docs)==null?void 0:L.source}}};var q,E,D;c.parameters={...c.parameters,docs:{...(q=c.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    left: <LeftPane />,
    right: <RightPane />,
    direction: 'vertical',
    ratio: 40
  },
  decorators: [Story => <div style={{
    height: '600px',
    width: '100%'
  }}>
                <Story />
            </div>]
}`,...(D=(E=c.parameters)==null?void 0:E.docs)==null?void 0:D.source}}};var M,B,H;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    left: <LeftPane />,
    right: <RightPane />,
    ratio: 30,
    resizable: false
  },
  decorators: [Story => <div style={{
    height: '400px',
    width: '100%'
  }}>
                <Story />
            </div>]
}`,...(H=(B=d.parameters)==null?void 0:B.docs)==null?void 0:H.source}}};var V,k,W;h.parameters={...h.parameters,docs:{...(V=h.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    left: <Box className="h-full p-4 bg-neutral-900 text-white font-mono">
                <Typography variant="small" className="text-green-400">// Editor</Typography>
                <pre className="mt-2 text-sm">
                    {\`function hello() {
  return "Hello, World!";
}\`}
                </pre>
            </Box>,
    right: <Box className="h-full p-4 flex items-center justify-center">
                <Typography variant="h3">Preview: Hello, World!</Typography>
            </Box>,
    ratio: 50
  },
  decorators: [Story => <div style={{
    height: '400px',
    width: '100%'
  }}>
                <Story />
            </div>]
}`,...(W=(k=h.parameters)==null?void 0:k.docs)==null?void 0:W.source}}};const se=["Default","HorizontalThirds","Vertical","NonResizable","CodePreview"];export{h as CodePreview,i as Default,l as HorizontalThirds,d as NonResizable,c as Vertical,se as __namedExportsOrder,ae as default};
