import{j as n}from"./jsx-runtime-CDt2p4po.js";import{a as t}from"./index-B-lxVbXh.js";import{r as be}from"./index-GiUgBvb1.js";import{u as ke}from"./useEventBus-BNZMNlv8.js";import{P as De}from"./pen-DNARvM59.js";import{S as Se}from"./sparkles-CE_owp1l.js";import{C as Ie}from"./chevron-down-BQmz_Bpa.js";import{C as Te}from"./chevron-right-pDF_OUfd.js";import"./v4-CtRu48qb.js";import"./createLucideIcon-CbHznvEr.js";const we=e=>{if(e.isSeed)return{fill:"#8b5cf6",stroke:"#7c3aed"};const l=[{fill:"#3b82f6",stroke:"#2563eb"},{fill:"#10b981",stroke:"#059669"},{fill:"#f59e0b",stroke:"#d97706"},{fill:"#ec4899",stroke:"#db2777"},{fill:"#06b6d4",stroke:"#0891b2"}],p=(e.layer||0)%l.length;return l[p]},s=({node:e,isSelected:l=!1,isEditing:p=!1,editValue:D,zoom:r=1,pan:O={x:0,y:0},onClick:S,onDoubleClick:o,onSaveEdit:d,onCancelEdit:I,onEditChange:T,onToggleExpand:w,onAIGenerate:M,className:me})=>{const u=ke(),[_,U]=be.useState(!1),ge=(e.x-e.width/2)*r+O.x,Ee=(e.y-e.height/2)*r+O.y,c=e.width*r,v=e.height*r,j=we(e),ye=()=>{u.emit("UI:SELECT_NODE",{nodeId:e.id,entity:"Note"}),S==null||S(e)},fe=i=>{i.stopPropagation(),u.emit("UI:EDIT_NODE",{nodeId:e.id,entity:"Note"}),o==null||o(e)},Ce=i=>{i.key==="Enter"?(i.preventDefault(),d==null||d(e.id,D||e.title)):i.key==="Escape"&&(i.preventDefault(),I==null||I())},xe=i=>{i.stopPropagation(),u.emit("UI:EXPAND_NODE",{nodeId:e.id,expanded:!e.isExpanded}),w==null||w(e)},Ne=i=>{i.stopPropagation(),u.emit("UI:AI_GENERATE",{nodeId:e.id,entity:"Note"}),M==null||M(e)};return n.jsxs("g",{transform:`translate(${ge}, ${Ee})`,onClick:ye,onDoubleClick:fe,onMouseEnter:()=>U(!0),onMouseLeave:()=>U(!1),className:`mindmap-node ${l?"selected":""} ${me||""}`,style:{cursor:"pointer"},children:[n.jsx("rect",{x:0,y:0,width:c,height:v,rx:8*r,ry:8*r,fill:j.fill,stroke:j.stroke,strokeWidth:(l?3:_?2:1)*r,opacity:e.isExpanded===!1&&e.hasChildren?.7:1,strokeDasharray:e.isExpanded===!1&&e.hasChildren?"5,5":"none"}),p?n.jsx("foreignObject",{x:5,y:10,width:c-10,height:30,children:n.jsx("input",{type:"text",value:D??e.title,onChange:i=>T==null?void 0:T(i.target.value),onKeyDown:Ce,onBlur:()=>d==null?void 0:d(e.id,D||e.title),autoFocus:!0,style:{width:"100%",border:"none",outline:"none",background:"rgba(255,255,255,0.9)",borderRadius:"4px",padding:"4px 8px",fontSize:`${Math.max(10,12*r)}px`,textAlign:"center"}})}):n.jsx("text",{x:c/2,y:v/2,textAnchor:"middle",dominantBaseline:"middle",fill:"white",fontSize:Math.max(10,12*r),fontWeight:e.isSeed?"bold":"normal",children:e.title.length>20?e.title.slice(0,20)+"...":e.title}),_&&!p&&n.jsxs(n.Fragment,{children:[n.jsx("foreignObject",{x:5,y:5,width:20,height:20,children:n.jsx("button",{onClick:i=>{i.stopPropagation(),o==null||o(e)},style:{width:"100%",height:"100%",border:"none",background:"rgba(255,255,255,0.9)",borderRadius:"4px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},title:"Edit",children:n.jsx(De,{size:12,color:"#374151"})})}),n.jsx("foreignObject",{x:c-25,y:5,width:20,height:20,children:n.jsx("button",{onClick:Ne,style:{width:"100%",height:"100%",border:"none",background:"rgba(255,255,255,0.9)",borderRadius:"4px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},title:"AI Generate Children",children:n.jsx(Se,{size:12,color:"#8b5cf6"})})}),e.hasChildren&&n.jsx("foreignObject",{x:c/2-10,y:v-5,width:20,height:20,children:n.jsx("button",{onClick:xe,style:{width:"100%",height:"100%",border:"none",background:"rgba(255,255,255,0.9)",borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},title:e.isExpanded?"Collapse":"Expand",children:e.isExpanded?n.jsx(Ie,{size:12,color:"#374151"}):n.jsx(Te,{size:12,color:"#374151"})})})]})]})};s.displayName="MindMapNode";s.__docgenInfo={description:"",methods:[],displayName:"MindMapNode",props:{node:{required:!0,tsType:{name:"MindMapNodeData"},description:"Node data"},isSelected:{required:!1,tsType:{name:"boolean"},description:"Whether this node is selected",defaultValue:{value:"false",computed:!1}},isEditing:{required:!1,tsType:{name:"boolean"},description:"Whether this node is being edited",defaultValue:{value:"false",computed:!1}},editValue:{required:!1,tsType:{name:"string"},description:"Current edit value"},zoom:{required:!1,tsType:{name:"number"},description:"Current zoom level",defaultValue:{value:"1",computed:!1}},pan:{required:!1,tsType:{name:"signature",type:"object",raw:"{ x: number; y: number }",signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]}},description:"Current pan offset",defaultValue:{value:"{ x: 0, y: 0 }",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(node: MindMapNodeData) => void",signature:{arguments:[{type:{name:"MindMapNodeData"},name:"node"}],return:{name:"void"}}},description:"Callback when node is clicked"},onDoubleClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(node: MindMapNodeData) => void",signature:{arguments:[{type:{name:"MindMapNodeData"},name:"node"}],return:{name:"void"}}},description:"Callback when node is double-clicked"},onSaveEdit:{required:!1,tsType:{name:"signature",type:"function",raw:"(nodeId: string, title: string) => void",signature:{arguments:[{type:{name:"string"},name:"nodeId"},{type:{name:"string"},name:"title"}],return:{name:"void"}}},description:"Callback when edit is saved"},onCancelEdit:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when edit is cancelled"},onEditChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:"Callback when edit value changes"},onToggleExpand:{required:!1,tsType:{name:"signature",type:"function",raw:"(node: MindMapNodeData) => void",signature:{arguments:[{type:{name:"MindMapNodeData"},name:"node"}],return:{name:"void"}}},description:"Callback when expand/collapse is toggled"},onAIGenerate:{required:!1,tsType:{name:"signature",type:"function",raw:"(node: MindMapNodeData) => void",signature:{arguments:[{type:{name:"MindMapNodeData"},name:"node"}],return:{name:"void"}}},description:"Callback for AI generation"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const Re={title:"KFlow/Molecules/MindMapNode",component:s,parameters:{layout:"centered"},tags:["autodocs"],decorators:[e=>n.jsx("svg",{width:"300",height:"150",style:{border:"1px solid #e5e7eb"},children:n.jsx(e,{})})]},a={id:"node-1",x:150,y:75,width:120,height:50,title:"Sample Node"},h={args:{node:a,isSelected:!1,isEditing:!1,zoom:1,pan:{x:0,y:0},onClick:t("UI:SELECT_NODE"),onDoubleClick:t("UI:EDIT_NODE")}},m={args:{node:a,isSelected:!0,isEditing:!1,onClick:t("UI:SELECT_NODE"),onDoubleClick:t("UI:EDIT_NODE")}},g={args:{node:a,isSelected:!0,isEditing:!0,editValue:"Sample Node",onClick:t("UI:SELECT_NODE"),onSaveEdit:t("onSaveEdit"),onCancelEdit:t("onCancelEdit"),onEditChange:t("onEditChange")}},E={args:{node:{...a,id:"seed-node",title:"Main Topic",isSeed:!0},isSelected:!1,onClick:t("UI:SELECT_NODE"),onDoubleClick:t("UI:EDIT_NODE")}},y={args:{node:{...a,hasChildren:!0,isExpanded:!0},isSelected:!1,onClick:t("UI:SELECT_NODE"),onToggleExpand:t("UI:EXPAND_NODE")}},f={args:{node:{...a,hasChildren:!0,isExpanded:!1},isSelected:!1,onClick:t("UI:SELECT_NODE"),onToggleExpand:t("UI:EXPAND_NODE")}},C={args:{node:{...a,layer:1,title:"Layer 1 Node"},onClick:t("UI:SELECT_NODE")}},x={args:{node:{...a,layer:2,title:"Layer 2 Node"},onClick:t("UI:SELECT_NODE")}},N={args:{node:{...a,title:"This is a very long title that will be truncated"},onClick:t("UI:SELECT_NODE")}},b={args:{node:{id:"node-zoomed",x:100,y:50,width:120,height:50,title:"Zoomed Node"},zoom:1.5,pan:{x:0,y:0},onClick:t("UI:SELECT_NODE")}},k={render:()=>n.jsxs("svg",{width:"500",height:"300",style:{border:"1px solid #e5e7eb"},children:[n.jsx(s,{node:{id:"root",x:250,y:50,width:120,height:50,title:"Root Topic",isSeed:!0,hasChildren:!0,isExpanded:!0},onClick:t("click-root")}),n.jsx(s,{node:{id:"child-1",x:100,y:150,width:100,height:40,title:"Child A",layer:1},onClick:t("click-child-1")}),n.jsx(s,{node:{id:"child-2",x:250,y:150,width:100,height:40,title:"Child B",layer:1},isSelected:!0,onClick:t("click-child-2")}),n.jsx(s,{node:{id:"child-3",x:400,y:150,width:100,height:40,title:"Child C",layer:1},onClick:t("click-child-3")})]})};var L,q,A;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    node: baseNode,
    isSelected: false,
    isEditing: false,
    zoom: 1,
    pan: {
      x: 0,
      y: 0
    },
    onClick: action("UI:SELECT_NODE"),
    onDoubleClick: action("UI:EDIT_NODE")
  }
}`,...(A=(q=h.parameters)==null?void 0:q.docs)==null?void 0:A.source}}};var P,R,W;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    node: baseNode,
    isSelected: true,
    isEditing: false,
    onClick: action("UI:SELECT_NODE"),
    onDoubleClick: action("UI:EDIT_NODE")
  }
}`,...(W=(R=m.parameters)==null?void 0:R.docs)==null?void 0:W.source}}};var z,B,X;g.parameters={...g.parameters,docs:{...(z=g.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    node: baseNode,
    isSelected: true,
    isEditing: true,
    editValue: "Sample Node",
    onClick: action("UI:SELECT_NODE"),
    onSaveEdit: action("onSaveEdit"),
    onCancelEdit: action("onCancelEdit"),
    onEditChange: action("onEditChange")
  }
}`,...(X=(B=g.parameters)==null?void 0:B.docs)==null?void 0:X.source}}};var V,$,Z;E.parameters={...E.parameters,docs:{...(V=E.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseNode,
      id: "seed-node",
      title: "Main Topic",
      isSeed: true
    },
    isSelected: false,
    onClick: action("UI:SELECT_NODE"),
    onDoubleClick: action("UI:EDIT_NODE")
  }
}`,...(Z=($=E.parameters)==null?void 0:$.docs)==null?void 0:Z.source}}};var F,H,K;y.parameters={...y.parameters,docs:{...(F=y.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseNode,
      hasChildren: true,
      isExpanded: true
    },
    isSelected: false,
    onClick: action("UI:SELECT_NODE"),
    onToggleExpand: action("UI:EXPAND_NODE")
  }
}`,...(K=(H=y.parameters)==null?void 0:H.docs)==null?void 0:K.source}}};var Y,G,J;f.parameters={...f.parameters,docs:{...(Y=f.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseNode,
      hasChildren: true,
      isExpanded: false
    },
    isSelected: false,
    onClick: action("UI:SELECT_NODE"),
    onToggleExpand: action("UI:EXPAND_NODE")
  }
}`,...(J=(G=f.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var Q,ee,ne;C.parameters={...C.parameters,docs:{...(Q=C.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseNode,
      layer: 1,
      title: "Layer 1 Node"
    },
    onClick: action("UI:SELECT_NODE")
  }
}`,...(ne=(ee=C.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var te,ie,re;x.parameters={...x.parameters,docs:{...(te=x.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseNode,
      layer: 2,
      title: "Layer 2 Node"
    },
    onClick: action("UI:SELECT_NODE")
  }
}`,...(re=(ie=x.parameters)==null?void 0:ie.docs)==null?void 0:re.source}}};var ae,se,oe;N.parameters={...N.parameters,docs:{...(ae=N.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseNode,
      title: "This is a very long title that will be truncated"
    },
    onClick: action("UI:SELECT_NODE")
  }
}`,...(oe=(se=N.parameters)==null?void 0:se.docs)==null?void 0:oe.source}}};var de,le,ce;b.parameters={...b.parameters,docs:{...(de=b.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    node: {
      id: "node-zoomed",
      x: 100,
      y: 50,
      width: 120,
      height: 50,
      title: "Zoomed Node"
    },
    zoom: 1.5,
    pan: {
      x: 0,
      y: 0
    },
    onClick: action("UI:SELECT_NODE")
  }
}`,...(ce=(le=b.parameters)==null?void 0:le.docs)==null?void 0:ce.source}}};var pe,ue,he;k.parameters={...k.parameters,docs:{...(pe=k.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  render: () => <svg width="500" height="300" style={{
    border: "1px solid #e5e7eb"
  }}>
      <MindMapNode node={{
      id: "root",
      x: 250,
      y: 50,
      width: 120,
      height: 50,
      title: "Root Topic",
      isSeed: true,
      hasChildren: true,
      isExpanded: true
    }} onClick={action("click-root")} />
      <MindMapNode node={{
      id: "child-1",
      x: 100,
      y: 150,
      width: 100,
      height: 40,
      title: "Child A",
      layer: 1
    }} onClick={action("click-child-1")} />
      <MindMapNode node={{
      id: "child-2",
      x: 250,
      y: 150,
      width: 100,
      height: 40,
      title: "Child B",
      layer: 1
    }} isSelected={true} onClick={action("click-child-2")} />
      <MindMapNode node={{
      id: "child-3",
      x: 400,
      y: 150,
      width: 100,
      height: 40,
      title: "Child C",
      layer: 1
    }} onClick={action("click-child-3")} />
    </svg>
}`,...(he=(ue=k.parameters)==null?void 0:ue.docs)==null?void 0:he.source}}};const We=["Default","Selected","Editing","SeedNode","WithChildren","CollapsedWithChildren","Layer1","Layer2","LongTitle","Zoomed","MultipleNodes"];export{f as CollapsedWithChildren,h as Default,g as Editing,C as Layer1,x as Layer2,N as LongTitle,k as MultipleNodes,E as SeedNode,m as Selected,y as WithChildren,b as Zoomed,We as __namedExportsOrder,Re as default};
