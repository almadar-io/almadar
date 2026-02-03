import{j as e}from"./jsx-runtime-CDt2p4po.js";import{a as N}from"./index-B-lxVbXh.js";import{r as a}from"./index-GiUgBvb1.js";import{B as xe}from"./Box-DYJzRMmP.js";import{u as be}from"./useEventBus-BNZMNlv8.js";import"./v4-CtRu48qb.js";import"./cn-BNf5BS2b.js";const r=({width:n,height:y,initialZoom:re=1,minZoom:C=.25,maxZoom:P=2,enablePan:w=!0,enableZoom:Z=!0,children:se,onZoomChange:d,onPanChange:c,className:oe})=>{const s=be(),u=a.useRef(null),[A,ie]=a.useState({width:n||800,height:y||600}),[le,I]=a.useState(!1),[v,de]=a.useState(re),[i,ce]=a.useState({x:0,y:0}),[j,q]=a.useState(!1),[S,ue]=a.useState({x:0,y:0});a.useEffect(()=>{if(n&&y)return;const t=()=>{u.current&&ie({width:u.current.clientWidth||800,height:u.current.clientHeight||600})};return t(),window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[n,y]);const me=a.useCallback(t=>{if(!Z)return;t.preventDefault();const l=t.deltaY>0?.9:1.1,k=Math.max(C,Math.min(P,v*l));de(k),s.emit("UI:MINDMAP_ZOOM",{zoom:k}),d==null||d(k)},[Z,v,C,P,s,d]),pe=a.useCallback(t=>{!w||t.button!==0||(q(!0),ue({x:t.clientX-i.x,y:t.clientY-i.y}))},[w,i]),he=a.useCallback(t=>{if(!j)return;const l={x:t.clientX-S.x,y:t.clientY-S.y};ce(l),s.emit("UI:MINDMAP_PAN",l),c==null||c(l)},[j,S,s,c]),z=a.useCallback(()=>{q(!1)},[]),ge=a.useCallback(()=>{I(!0),s.emit("UI:MINDMAP_FOCUS",{})},[s]),fe=a.useCallback(()=>{I(!1),s.emit("UI:MINDMAP_BLUR",{})},[s]);return e.jsx(xe,{ref:u,className:`flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg transition-all duration-200 ${le?"border-2 border-blue-500 dark:border-blue-400 ring-2 ring-blue-200 dark:ring-blue-800":"border border-gray-200 dark:border-gray-700"} ${oe||""}`,tabIndex:0,onFocus:ge,onBlur:fe,children:e.jsx("svg",{width:A.width,height:A.height,onWheel:me,onMouseDown:pe,onMouseMove:he,onMouseUp:z,onMouseLeave:z,style:{cursor:j?"grabbing":w?"grab":"default"},children:e.jsx("g",{transform:`translate(${i.x}, ${i.y}) scale(${v})`,children:se})})})};r.displayName="MindMapCanvas";r.__docgenInfo={description:"",methods:[],displayName:"MindMapCanvas",props:{width:{required:!1,tsType:{name:"number"},description:"Width of the canvas"},height:{required:!1,tsType:{name:"number"},description:"Height of the canvas"},initialZoom:{required:!1,tsType:{name:"number"},description:"Initial zoom level",defaultValue:{value:"1",computed:!1}},minZoom:{required:!1,tsType:{name:"number"},description:"Minimum zoom level",defaultValue:{value:"0.25",computed:!1}},maxZoom:{required:!1,tsType:{name:"number"},description:"Maximum zoom level",defaultValue:{value:"2",computed:!1}},enablePan:{required:!1,tsType:{name:"boolean"},description:"Enable pan interaction",defaultValue:{value:"true",computed:!1}},enableZoom:{required:!1,tsType:{name:"boolean"},description:"Enable zoom interaction",defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Children to render in the SVG"},onZoomChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(zoom: number) => void",signature:{arguments:[{type:{name:"number"},name:"zoom"}],return:{name:"void"}}},description:"Callback when zoom changes"},onPanChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(pan: { x: number; y: number }) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ x: number; y: number }",signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]}},name:"pan"}],return:{name:"void"}}},description:"Callback when pan changes"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"},entity:{required:!1,tsType:{name:"string"},description:"Entity type"},data:{required:!1,tsType:{name:"union",raw:"Record<string, unknown> | unknown",elements:[{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>"},{name:"unknown"}]},description:"Data to display"},actions:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ label: string; event: string }",signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"event",value:{name:"string",required:!0}}]}}],raw:"Array<{ label: string; event: string }>"},description:"Actions available"},displayFields:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Fields to display"},showLearningGoals:{required:!1,tsType:{name:"boolean"},description:"Show learning goals"}}};const Ce={title:"KFlow/Organisms/MindMapCanvas",component:r,parameters:{layout:"fullscreen"},tags:["autodocs"],decorators:[n=>e.jsx("div",{style:{height:"500px",width:"100%",padding:"20px"},children:e.jsx(n,{})})]},o=()=>e.jsxs(e.Fragment,{children:[e.jsxs("g",{transform:"translate(300, 200)",children:[e.jsx("rect",{x:"-60",y:"-25",width:"120",height:"50",rx:"8",fill:"#8b5cf6",stroke:"#7c3aed",strokeWidth:"2"}),e.jsx("text",{x:"0",y:"5",textAnchor:"middle",fill:"white",fontSize:"14",fontWeight:"bold",children:"Main Topic"})]}),e.jsxs("g",{transform:"translate(150, 100)",children:[e.jsx("rect",{x:"-50",y:"-20",width:"100",height:"40",rx:"6",fill:"#3b82f6",stroke:"#2563eb",strokeWidth:"1"}),e.jsx("text",{x:"0",y:"5",textAnchor:"middle",fill:"white",fontSize:"12",children:"Subtopic A"})]}),e.jsxs("g",{transform:"translate(450, 100)",children:[e.jsx("rect",{x:"-50",y:"-20",width:"100",height:"40",rx:"6",fill:"#3b82f6",stroke:"#2563eb",strokeWidth:"1"}),e.jsx("text",{x:"0",y:"5",textAnchor:"middle",fill:"white",fontSize:"12",children:"Subtopic B"})]}),e.jsxs("g",{transform:"translate(150, 300)",children:[e.jsx("rect",{x:"-50",y:"-20",width:"100",height:"40",rx:"6",fill:"#10b981",stroke:"#059669",strokeWidth:"1"}),e.jsx("text",{x:"0",y:"5",textAnchor:"middle",fill:"white",fontSize:"12",children:"Subtopic C"})]}),e.jsxs("g",{transform:"translate(450, 300)",children:[e.jsx("rect",{x:"-50",y:"-20",width:"100",height:"40",rx:"6",fill:"#10b981",stroke:"#059669",strokeWidth:"1"}),e.jsx("text",{x:"0",y:"5",textAnchor:"middle",fill:"white",fontSize:"12",children:"Subtopic D"})]}),e.jsx("path",{d:"M 240 200 Q 195 150 150 120",fill:"none",stroke:"#94a3b8",strokeWidth:"2"}),e.jsx("path",{d:"M 360 200 Q 405 150 450 120",fill:"none",stroke:"#94a3b8",strokeWidth:"2"}),e.jsx("path",{d:"M 240 200 Q 195 250 150 280",fill:"none",stroke:"#94a3b8",strokeWidth:"2"}),e.jsx("path",{d:"M 360 200 Q 405 250 450 280",fill:"none",stroke:"#94a3b8",strokeWidth:"2"})]}),m={args:{width:600,height:400,enablePan:!0,enableZoom:!0,onZoomChange:N("UI:MINDMAP_ZOOM"),onPanChange:N("UI:MINDMAP_PAN")},render:n=>e.jsx(r,{...n,children:e.jsx(o,{})})},p={args:{width:600,height:400,initialZoom:1.5,enablePan:!0,enableZoom:!0},render:n=>e.jsx(r,{...n,children:e.jsx(o,{})})},h={args:{width:600,height:400,initialZoom:.5,enablePan:!0,enableZoom:!0},render:n=>e.jsx(r,{...n,children:e.jsx(o,{})})},g={args:{width:600,height:400,enablePan:!0,enableZoom:!1},render:n=>e.jsx(r,{...n,children:e.jsx(o,{})})},f={args:{width:600,height:400,enablePan:!1,enableZoom:!0},render:n=>e.jsx(r,{...n,children:e.jsx(o,{})})},x={args:{width:600,height:400,enablePan:!1,enableZoom:!1},render:n=>e.jsx(r,{...n,children:e.jsx(o,{})})},b={args:{enablePan:!0,enableZoom:!0},render:n=>e.jsx(r,{...n,children:e.jsx(o,{})})},M={args:{width:600,height:400},render:n=>e.jsx(r,{...n,children:e.jsx("text",{x:"300",y:"200",textAnchor:"middle",fill:"#9ca3af",fontSize:"14",children:"Click to add a node"})})};var D,T,O;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    width: 600,
    height: 400,
    enablePan: true,
    enableZoom: true,
    onZoomChange: action("UI:MINDMAP_ZOOM"),
    onPanChange: action("UI:MINDMAP_PAN")
  },
  render: args => <MindMapCanvas {...args}>
      <SampleContent />
    </MindMapCanvas>
}`,...(O=(T=m.parameters)==null?void 0:T.docs)==null?void 0:O.source}}};var W,E,U;p.parameters={...p.parameters,docs:{...(W=p.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    width: 600,
    height: 400,
    initialZoom: 1.5,
    enablePan: true,
    enableZoom: true
  },
  render: args => <MindMapCanvas {...args}>
      <SampleContent />
    </MindMapCanvas>
}`,...(U=(E=p.parameters)==null?void 0:E.docs)==null?void 0:U.source}}};var _,R,F;h.parameters={...h.parameters,docs:{...(_=h.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    width: 600,
    height: 400,
    initialZoom: 0.5,
    enablePan: true,
    enableZoom: true
  },
  render: args => <MindMapCanvas {...args}>
      <SampleContent />
    </MindMapCanvas>
}`,...(F=(R=h.parameters)==null?void 0:R.docs)==null?void 0:F.source}}};var B,V,L;g.parameters={...g.parameters,docs:{...(B=g.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    width: 600,
    height: 400,
    enablePan: true,
    enableZoom: false
  },
  render: args => <MindMapCanvas {...args}>
      <SampleContent />
    </MindMapCanvas>
}`,...(L=(V=g.parameters)==null?void 0:V.docs)==null?void 0:L.source}}};var $,Q,Y;f.parameters={...f.parameters,docs:{...($=f.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    width: 600,
    height: 400,
    enablePan: false,
    enableZoom: true
  },
  render: args => <MindMapCanvas {...args}>
      <SampleContent />
    </MindMapCanvas>
}`,...(Y=(Q=f.parameters)==null?void 0:Q.docs)==null?void 0:Y.source}}};var G,H,X;x.parameters={...x.parameters,docs:{...(G=x.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    width: 600,
    height: 400,
    enablePan: false,
    enableZoom: false
  },
  render: args => <MindMapCanvas {...args}>
      <SampleContent />
    </MindMapCanvas>
}`,...(X=(H=x.parameters)==null?void 0:H.docs)==null?void 0:X.source}}};var K,J,ee;b.parameters={...b.parameters,docs:{...(K=b.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    enablePan: true,
    enableZoom: true
  },
  render: args => <MindMapCanvas {...args}>
      <SampleContent />
    </MindMapCanvas>
}`,...(ee=(J=b.parameters)==null?void 0:J.docs)==null?void 0:ee.source}}};var ne,ae,te;M.parameters={...M.parameters,docs:{...(ne=M.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    width: 600,
    height: 400
  },
  render: args => <MindMapCanvas {...args}>
      <text x="300" y="200" textAnchor="middle" fill="#9ca3af" fontSize="14">
        Click to add a node
      </text>
    </MindMapCanvas>
}`,...(te=(ae=M.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};const Pe=["Default","ZoomedIn","ZoomedOut","PanOnly","ZoomOnly","NoInteraction","AutoSize","Empty"];export{b as AutoSize,m as Default,M as Empty,x as NoInteraction,g as PanOnly,f as ZoomOnly,p as ZoomedIn,h as ZoomedOut,Pe as __namedExportsOrder,Ce as default};
