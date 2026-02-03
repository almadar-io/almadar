import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as v}from"./index-GiUgBvb1.js";import{B as p}from"./Box-DYJzRMmP.js";import{V as t,H as n}from"./Stack-1XI3stiC.js";import{C as c}from"./Card-Bmes-tNK.js";import{F as re}from"./ForceDirectedGraph-Cueu1A49.js";import{C as ae}from"./ConceptCard-B7sNMSu8.js";import{L as te}from"./LayerNavigator-EdjYa0Vu.js";import{N as l,G as ne}from"./GraphLegend-DMNnZUT-.js";import{L as se}from"./LearningGoalDisplay-DlqtVzCl.js";import{u as oe}from"./useEventBus-BNZMNlv8.js";import{N as le}from"./network-DCWhD59H.js";import{L as ie}from"./list-B6-UEXVq.js";import{G as pe}from"./grid-3x3-DCQtfzd8.js";import"./cn-BNf5BS2b.js";import"./Typography-Wmkp-g7N.js";import"./Card-BNT5PrJ5.js";import"./Spinner-vF2DJrH5.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./chevron-down-BQmz_Bpa.js";import"./chevron-right-pDF_OUfd.js";import"./check-DliVttWt.js";import"./book-open-Bc_pgR1e.js";import"./circle-CzFdAxtK.js";import"./chevron-left-zGYeMbNT.js";import"./layers-BDYQqVNI.js";import"./target-Dfqc9R93.js";import"./info-CF8EgE8A.js";import"./pen-DNARvM59.js";import"./save-DyJeJ3Zl.js";import"./x-prXd1WI5.js";const j=({entity:a,defaultView:$="graph",showLayerNav:H=!0,showLegend:W=!0,className:Y="",headerContent:J})=>{var k;const{emit:x}=oe(),[f,Q]=v.useState($),[N,X]=v.useState(null),Z=r=>{X(r.id),x("UI:SELECT_NODE",{nodeId:r.id,graphId:a.id})},w=r=>{Q(r),x("UI:TOGGLE_VIEW",{mode:r,graphId:a.id})},L=(k=a.concepts)==null?void 0:k.filter(r=>r.layer===a.currentLayer),C=Object.entries(l).map(([r,b])=>({id:r,label:r.charAt(0).toUpperCase()+r.slice(1),color:b,count:a.nodes.filter(ee=>ee.type===r).length})).filter(r=>r.count>0);return e.jsxs(p,{className:`min-h-screen bg-gray-50 ${Y}`,children:[e.jsx("header",{className:"bg-white border-b border-gray-200 sticky top-0 z-10",children:e.jsxs(t,{gap:"none",className:"max-w-7xl mx-auto",children:[e.jsxs(n,{justify:"between",align:"center",className:"px-4 py-4",children:[e.jsxs(t,{gap:"xs",children:[e.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:a.title}),a.description&&e.jsx("p",{className:"text-gray-600",children:a.description})]}),e.jsxs(n,{gap:"md",align:"center",children:[e.jsxs(n,{gap:"xs",className:"bg-gray-100 rounded-lg p-1",children:[e.jsxs("button",{onClick:()=>w("graph"),className:`px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-1 ${f==="graph"?"bg-white text-gray-900 shadow-sm":"text-gray-500 hover:text-gray-700"}`,children:[e.jsx(le,{size:16}),"Graph"]}),e.jsxs("button",{onClick:()=>w("list"),className:`px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-1 ${f==="list"?"bg-white text-gray-900 shadow-sm":"text-gray-500 hover:text-gray-700"}`,children:[e.jsx(ie,{size:16}),"List"]})]}),J]})]}),H&&a.layers.length>0&&e.jsx(p,{className:"px-4 py-3 border-t border-gray-100",children:e.jsx(te,{layers:a.layers,currentLayer:a.currentLayer,showCounts:!0})})]})}),a.learningGoal&&e.jsx(p,{className:"max-w-7xl mx-auto px-4 py-4",children:e.jsx(se,{goal:a.learningGoal,layerNumber:a.currentLayer,graphId:a.id})}),e.jsx("main",{className:"max-w-7xl mx-auto px-4 py-6",children:f==="graph"?e.jsxs(n,{gap:"lg",align:"start",children:[e.jsx(p,{className:"flex-1",children:e.jsx(c,{className:"overflow-hidden",children:e.jsx(re,{graph:{nodes:Object.fromEntries(a.nodes.map(r=>[r.id,r])),relationships:a.links},height:600,onNodeClick:Z})})}),e.jsxs(t,{gap:"md",className:"w-64 flex-shrink-0",children:[W&&C.length>0&&e.jsx(ne,{title:"Node Types",items:C,interactive:!0}),N&&e.jsx(c,{children:e.jsxs(t,{gap:"sm",children:[e.jsx("span",{className:"font-semibold text-gray-900",children:"Selected Concept"}),(()=>{const r=a.nodes.find(b=>b.id===N);return r?e.jsxs(t,{gap:"xs",children:[e.jsx("span",{className:"text-gray-700",children:r.properties.label}),r.type&&e.jsx("span",{className:"text-xs px-2 py-0.5 rounded",style:{backgroundColor:`${l[r.type]||l.default}20`,color:l[r.type]||l.default},children:r.type})]}):null})(),e.jsx("button",{onClick:()=>x("UI:VIEW_CONCEPT",{conceptId:N}),className:"w-full px-3 py-2 text-sm font-medium bg-indigo-600 text-white rounded hover:bg-indigo-700",children:"View Details"})]})}),e.jsx(c,{children:e.jsxs(t,{gap:"xs",children:[e.jsx("span",{className:"font-semibold text-gray-900",children:"Statistics"}),e.jsxs(n,{justify:"between",children:[e.jsx("span",{className:"text-sm text-gray-500",children:"Concepts"}),e.jsx("span",{className:"text-sm font-medium",children:a.nodes.length})]}),e.jsxs(n,{justify:"between",children:[e.jsx("span",{className:"text-sm text-gray-500",children:"Connections"}),e.jsx("span",{className:"text-sm font-medium",children:a.links.length})]}),e.jsxs(n,{justify:"between",children:[e.jsx("span",{className:"text-sm text-gray-500",children:"Layers"}),e.jsx("span",{className:"text-sm font-medium",children:a.layers.length})]})]})})]})]}):e.jsx(t,{gap:"md",children:L&&L.length>0?L.map(r=>e.jsx(ae,{entity:r,operations:[{label:"View",action:"view",variant:"primary"}]},r.id)):e.jsx(c,{children:e.jsxs(t,{gap:"md",align:"center",className:"py-12",children:[e.jsx(pe,{size:48,className:"text-gray-300"}),e.jsx("span",{className:"text-gray-500",children:"No concepts in this layer"})]})})})})]})};j.displayName="KnowledgeGraphTemplate";j.__docgenInfo={description:"",methods:[],displayName:"KnowledgeGraphTemplate",props:{entity:{required:!0,tsType:{name:"KnowledgeGraphEntity"},description:"Knowledge graph entity data"},defaultView:{required:!1,tsType:{name:"union",raw:'"graph" | "list"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"list"'}]},description:"Default view mode",defaultValue:{value:'"graph"',computed:!1}},showLayerNav:{required:!1,tsType:{name:"boolean"},description:"Show layer navigator",defaultValue:{value:"true",computed:!1}},showLegend:{required:!1,tsType:{name:"boolean"},description:"Show legend",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes",defaultValue:{value:'""',computed:!1}},headerContent:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Custom header content"}}};const Be={title:"KFlow/Templates/KnowledgeGraphTemplate",component:j,parameters:{layout:"fullscreen"},tags:["autodocs"]},s=[{id:"1",type:"topic",properties:{label:"Machine Learning",layer:0}},{id:"2",type:"concept",properties:{label:"Supervised Learning",layer:1}},{id:"3",type:"concept",properties:{label:"Unsupervised Learning",layer:1}},{id:"4",type:"concept",properties:{label:"Neural Networks",layer:2}},{id:"5",type:"concept",properties:{label:"Decision Trees",layer:2}},{id:"6",type:"concept",properties:{label:"Clustering",layer:2}},{id:"7",type:"topic",properties:{label:"Deep Learning",layer:3}},{id:"8",type:"skill",properties:{label:"Backpropagation",layer:3}}],o=[{source:"1",target:"2",type:"related"},{source:"1",target:"3",type:"related"},{source:"2",target:"4",type:"prerequisite"},{source:"2",target:"5",type:"prerequisite"},{source:"3",target:"6",type:"prerequisite"},{source:"4",target:"7",type:"related"},{source:"4",target:"8",type:"related"}],i=[{number:0,name:"Foundations",conceptCount:1,completed:!0},{number:1,name:"Core Concepts",conceptCount:2,completed:!0},{number:2,name:"Techniques",conceptCount:3,completed:!1},{number:3,name:"Advanced",conceptCount:2,completed:!1}],z=[{id:"4",name:"Neural Networks",description:"Computational models inspired by biological neural networks.",layer:2,hasLesson:!0,progress:60},{id:"5",name:"Decision Trees",description:"A tree-structured model for classification and regression.",layer:2,hasLesson:!0,progress:100,isCompleted:!0},{id:"6",name:"Clustering",description:"Grouping similar data points together.",layer:2,hasLesson:!1,progress:0}],d={args:{entity:{id:"graph-1",title:"Machine Learning Fundamentals",description:"A comprehensive knowledge graph covering ML concepts.",nodes:s,links:o,layers:i,currentLayer:2,concepts:z,learningGoal:"Master the fundamental techniques of machine learning."}}},m={args:{entity:{id:"graph-2",title:"Deep Learning Course",nodes:s,links:o,layers:i,currentLayer:2,concepts:z},defaultView:"list"}},u={args:{entity:{id:"graph-3",title:"Python Programming",nodes:s.slice(0,4),links:o.slice(0,3),layers:i.slice(0,2),currentLayer:1},showLegend:!1}},g={args:{entity:{id:"graph-4",title:"Single Layer Graph",nodes:s.filter(a=>a.properties.layer===0||a.properties.layer===1),links:o.slice(0,2),layers:[{number:0,name:"All Concepts",conceptCount:3}],currentLayer:0},showLayerNav:!1}},y={args:{entity:{id:"graph-5",title:"Data Science Path",nodes:s,links:o,layers:[...i,{number:4,name:"Expert",conceptCount:0}],currentLayer:4,concepts:[]},defaultView:"list"}},h={args:{entity:{id:"graph-6",title:"Complete AI Curriculum",description:"An extensive knowledge graph covering all aspects of artificial intelligence.",nodes:[...s,{id:"9",type:"concept",properties:{label:"CNNs",layer:4}},{id:"10",type:"concept",properties:{label:"RNNs",layer:4}},{id:"11",type:"concept",properties:{label:"Transformers",layer:4}},{id:"12",type:"concept",properties:{label:"GANs",layer:4}},{id:"13",type:"topic",properties:{label:"Reinforcement Learning",layer:3}},{id:"14",type:"topic",properties:{label:"NLP",layer:3}}],links:[...o,{source:"7",target:"9",type:"related"},{source:"7",target:"10",type:"related"},{source:"7",target:"11",type:"related"},{source:"7",target:"12",type:"related"},{source:"1",target:"13",type:"related"},{source:"1",target:"14",type:"related"},{source:"13",target:"14",type:"related"}],layers:[...i,{number:4,name:"Architectures",conceptCount:4}],currentLayer:0,learningGoal:"Become proficient in all major areas of artificial intelligence."}}};var G,S,T;d.parameters={...d.parameters,docs:{...(G=d.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    entity: {
      id: "graph-1",
      title: "Machine Learning Fundamentals",
      description: "A comprehensive knowledge graph covering ML concepts.",
      nodes: sampleNodes,
      links: sampleLinks,
      layers: sampleLayers,
      currentLayer: 2,
      concepts: sampleConcepts,
      learningGoal: "Master the fundamental techniques of machine learning."
    }
  }
}`,...(T=(S=d.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var E,V,A;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    entity: {
      id: "graph-2",
      title: "Deep Learning Course",
      nodes: sampleNodes,
      links: sampleLinks,
      layers: sampleLayers,
      currentLayer: 2,
      concepts: sampleConcepts
    },
    defaultView: "list"
  }
}`,...(A=(V=m.parameters)==null?void 0:V.docs)==null?void 0:A.source}}};var I,D,q;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    entity: {
      id: "graph-3",
      title: "Python Programming",
      nodes: sampleNodes.slice(0, 4),
      links: sampleLinks.slice(0, 3),
      layers: sampleLayers.slice(0, 2),
      currentLayer: 1
    },
    showLegend: false
  }
}`,...(q=(D=u.parameters)==null?void 0:D.docs)==null?void 0:q.source}}};var P,R,M;g.parameters={...g.parameters,docs:{...(P=g.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    entity: {
      id: "graph-4",
      title: "Single Layer Graph",
      nodes: sampleNodes.filter(n => n.properties.layer === 0 || n.properties.layer === 1),
      links: sampleLinks.slice(0, 2),
      layers: [{
        number: 0,
        name: "All Concepts",
        conceptCount: 3
      }],
      currentLayer: 0
    },
    showLayerNav: false
  }
}`,...(M=(R=g.parameters)==null?void 0:R.docs)==null?void 0:M.source}}};var O,_,K;y.parameters={...y.parameters,docs:{...(O=y.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    entity: {
      id: "graph-5",
      title: "Data Science Path",
      nodes: sampleNodes,
      links: sampleLinks,
      layers: [...sampleLayers, {
        number: 4,
        name: "Expert",
        conceptCount: 0
      }],
      currentLayer: 4,
      concepts: []
    },
    defaultView: "list"
  }
}`,...(K=(_=y.parameters)==null?void 0:_.docs)==null?void 0:K.source}}};var B,F,U;h.parameters={...h.parameters,docs:{...(B=h.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    entity: {
      id: "graph-6",
      title: "Complete AI Curriculum",
      description: "An extensive knowledge graph covering all aspects of artificial intelligence.",
      nodes: [...sampleNodes, {
        id: "9",
        type: "concept",
        properties: {
          label: "CNNs",
          layer: 4
        }
      }, {
        id: "10",
        type: "concept",
        properties: {
          label: "RNNs",
          layer: 4
        }
      }, {
        id: "11",
        type: "concept",
        properties: {
          label: "Transformers",
          layer: 4
        }
      }, {
        id: "12",
        type: "concept",
        properties: {
          label: "GANs",
          layer: 4
        }
      }, {
        id: "13",
        type: "topic",
        properties: {
          label: "Reinforcement Learning",
          layer: 3
        }
      }, {
        id: "14",
        type: "topic",
        properties: {
          label: "NLP",
          layer: 3
        }
      }],
      links: [...sampleLinks, {
        source: "7",
        target: "9",
        type: "related"
      }, {
        source: "7",
        target: "10",
        type: "related"
      }, {
        source: "7",
        target: "11",
        type: "related"
      }, {
        source: "7",
        target: "12",
        type: "related"
      }, {
        source: "1",
        target: "13",
        type: "related"
      }, {
        source: "1",
        target: "14",
        type: "related"
      }, {
        source: "13",
        target: "14",
        type: "related"
      }],
      layers: [...sampleLayers, {
        number: 4,
        name: "Architectures",
        conceptCount: 4
      }],
      currentLayer: 0,
      learningGoal: "Become proficient in all major areas of artificial intelligence."
    }
  }
}`,...(U=(F=h.parameters)==null?void 0:F.docs)==null?void 0:U.source}}};const Fe=["Default","ListView","NoLegend","NoLayerNav","EmptyLayer","LargeGraph"];export{d as Default,y as EmptyLayer,h as LargeGraph,m as ListView,g as NoLayerNav,u as NoLegend,Fe as __namedExportsOrder,Be as default};
