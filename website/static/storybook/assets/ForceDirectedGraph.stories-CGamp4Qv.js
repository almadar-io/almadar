import{j as c}from"./jsx-runtime-CDt2p4po.js";import{a as e}from"./index-B-lxVbXh.js";import{F as U}from"./ForceDirectedGraph-Cueu1A49.js";import"./index-GiUgBvb1.js";import"./v4-CtRu48qb.js";import"./Box-DYJzRMmP.js";import"./cn-BNf5BS2b.js";import"./Typography-Wmkp-g7N.js";import"./Stack-1XI3stiC.js";import"./Card-BNT5PrJ5.js";import"./Spinner-vF2DJrH5.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./useEventBus-BNZMNlv8.js";const V={title:"KFlow/Organisms/ForceDirectedGraph",component:U,parameters:{layout:"fullscreen"},tags:["autodocs"],decorators:[i=>c.jsx("div",{style:{height:"600px",width:"100%"},children:c.jsx(i,{})})]},d={seedConceptId:"concept-1",nodes:{"concept-1":{id:"concept-1",type:"Concept",properties:{name:"Photosynthesis",description:"The process by which plants convert light energy into chemical energy",layer:0,isSeed:!0}},"concept-2":{id:"concept-2",type:"Concept",properties:{name:"Chlorophyll",description:"Green pigment that absorbs light",layer:1}},"concept-3":{id:"concept-3",type:"Concept",properties:{name:"Light Reactions",description:"First stage of photosynthesis",layer:1}},"concept-4":{id:"concept-4",type:"Concept",properties:{name:"Calvin Cycle",description:"Second stage of photosynthesis",layer:1}},"concept-5":{id:"concept-5",type:"Concept",properties:{name:"ATP",description:"Energy currency of cells",layer:2}},"concept-6":{id:"concept-6",type:"Concept",properties:{name:"NADPH",description:"Electron carrier",layer:2}},"layer-1":{id:"layer-1",type:"Layer",properties:{name:"Layer 1",layer:1}},"layer-2":{id:"layer-2",type:"Layer",properties:{name:"Layer 2",layer:2}},"goal-1":{id:"goal-1",type:"LearningGoal",properties:{name:"Understand Photosynthesis"}},"lesson-1":{id:"lesson-1",type:"Lesson",properties:{name:"Introduction to Photosynthesis"}}},relationships:[{source:"concept-1",target:"concept-2",type:"hasChild"},{source:"concept-1",target:"concept-3",type:"hasChild"},{source:"concept-1",target:"concept-4",type:"hasChild"},{source:"concept-3",target:"concept-5",type:"hasChild"},{source:"concept-3",target:"concept-6",type:"hasChild"},{source:"concept-4",target:"concept-5",type:"hasPrerequisite"},{source:"concept-2",target:"layer-1",type:"belongsToLayer"},{source:"concept-3",target:"layer-1",type:"belongsToLayer"},{source:"concept-4",target:"layer-1",type:"belongsToLayer"},{source:"concept-5",target:"layer-2",type:"belongsToLayer"},{source:"concept-6",target:"layer-2",type:"belongsToLayer"},{source:"concept-1",target:"goal-1",type:"hasLearningGoal"},{source:"concept-1",target:"lesson-1",type:"hasLesson"}]},_={seedConceptId:"node-1",nodes:{"node-1":{id:"node-1",type:"Concept",properties:{name:"Main Concept",isSeed:!0}},"node-2":{id:"node-2",type:"Concept",properties:{name:"Child A",layer:1}},"node-3":{id:"node-3",type:"Concept",properties:{name:"Child B",layer:1}},"node-4":{id:"node-4",type:"Concept",properties:{name:"Child C",layer:1}}},relationships:[{source:"node-1",target:"node-2",type:"hasChild"},{source:"node-1",target:"node-3",type:"hasChild"},{source:"node-1",target:"node-4",type:"hasChild"},{source:"node-2",target:"node-3",type:"hasPrerequisite"}]},o={args:{graph:d,showLabels:!0,showLegend:!0,onNodeClick:e("UI:SELECT_NODE")}},r={args:{graph:_,showLabels:!0,showLegend:!0,onNodeClick:e("UI:SELECT_NODE")}},t={args:{graph:d,showLabels:!0,showLegend:!1,onNodeClick:e("UI:SELECT_NODE")}},s={args:{graph:d,showLabels:!1,showLegend:!0,onNodeClick:e("UI:SELECT_NODE")}},a={args:{graph:null,isLoading:!0}},n={args:{graph:null,isLoading:!1}},p={args:{graph:_,width:600,height:400,showLabels:!0,showLegend:!1,onNodeClick:e("UI:SELECT_NODE")},decorators:[i=>c.jsx("div",{style:{padding:"20px",backgroundColor:"#f5f5f5"},children:c.jsx(i,{})})]};var l,h,g;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    graph: mockGraph,
    showLabels: true,
    showLegend: true,
    onNodeClick: action("UI:SELECT_NODE")
  }
}`,...(g=(h=o.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var m,y,u;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    graph: simpleGraph,
    showLabels: true,
    showLegend: true,
    onNodeClick: action("UI:SELECT_NODE")
  }
}`,...(u=(y=r.parameters)==null?void 0:y.docs)==null?void 0:u.source}}};var L,C,E;t.parameters={...t.parameters,docs:{...(L=t.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    graph: mockGraph,
    showLabels: true,
    showLegend: false,
    onNodeClick: action("UI:SELECT_NODE")
  }
}`,...(E=(C=t.parameters)==null?void 0:C.docs)==null?void 0:E.source}}};var w,N,f;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    graph: mockGraph,
    showLabels: false,
    showLegend: true,
    onNodeClick: action("UI:SELECT_NODE")
  }
}`,...(f=(N=s.parameters)==null?void 0:N.docs)==null?void 0:f.source}}};var S,b,D;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    graph: null,
    isLoading: true
  }
}`,...(D=(b=a.parameters)==null?void 0:b.docs)==null?void 0:D.source}}};var T,k,G;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    graph: null,
    isLoading: false
  }
}`,...(G=(k=n.parameters)==null?void 0:k.docs)==null?void 0:G.source}}};var x,I,O;p.parameters={...p.parameters,docs:{...(x=p.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    graph: simpleGraph,
    width: 600,
    height: 400,
    showLabels: true,
    showLegend: false,
    onNodeClick: action("UI:SELECT_NODE")
  },
  decorators: [Story => <div style={{
    padding: "20px",
    backgroundColor: "#f5f5f5"
  }}>
        <Story />
      </div>]
}`,...(O=(I=p.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};const W=["Default","SimpleGraph","NoLegend","NoLabels","Loading","Empty","FixedDimensions"];export{o as Default,n as Empty,p as FixedDimensions,a as Loading,s as NoLabels,t as NoLegend,r as SimpleGraph,W as __namedExportsOrder,V as default};
