import{N as e,E as o,G}from"./GraphLegend-DMNnZUT-.js";import"./jsx-runtime-CDt2p4po.js";import"./index-GiUgBvb1.js";import"./Box-DYJzRMmP.js";import"./cn-BNf5BS2b.js";import"./Stack-1XI3stiC.js";import"./useEventBus-BNZMNlv8.js";const F={title:"KFlow/Molecules/GraphLegend",component:G,parameters:{layout:"padded"},tags:["autodocs"]},n={args:{items:[{id:"concept",label:"Concept",color:e.concept},{id:"topic",label:"Topic",color:e.topic},{id:"skill",label:"Skill",color:e.skill}]}},l={args:{title:"Node Types",items:[{id:"concept",label:"Concept",color:e.concept},{id:"topic",label:"Topic",color:e.topic},{id:"skill",label:"Skill",color:e.skill},{id:"lesson",label:"Lesson",color:e.lesson}]}},i={args:{title:"Graph Elements",items:[{id:"concept",label:"Concepts",color:e.concept,count:24},{id:"topic",label:"Topics",color:e.topic,count:8},{id:"skill",label:"Skills",color:e.skill,count:15},{id:"lesson",label:"Lessons",color:e.lesson,count:32}]}},s={args:{title:"Toggle Visibility",interactive:!0,items:[{id:"concept",label:"Concepts",color:e.concept,visible:!0,count:24},{id:"topic",label:"Topics",color:e.topic,visible:!0,count:8},{id:"skill",label:"Skills",color:e.skill,visible:!1,count:15},{id:"lesson",label:"Lessons",color:e.lesson,visible:!0,count:32}]}},t={args:{title:"Edge Types",direction:"horizontal",items:[{id:"prerequisite",label:"Prerequisite",color:o.prerequisite},{id:"related",label:"Related",color:o.related},{id:"contains",label:"Contains",color:o.contains},{id:"references",label:"References",color:o.references}]}},r={args:{title:"Connection Types",items:[{id:"prerequisite",label:"Prerequisite",color:o.prerequisite,count:45},{id:"related",label:"Related",color:o.related,count:28},{id:"contains",label:"Contains",color:o.contains,count:12}]}},c={args:{title:"Knowledge Graph Legend",interactive:!0,items:[{id:"concept",label:"Concept",color:e.concept,visible:!0,count:156},{id:"topic",label:"Topic",color:e.topic,visible:!0,count:42},{id:"skill",label:"Skill",color:e.skill,visible:!0,count:89},{id:"lesson",label:"Lesson",color:e.lesson,visible:!0,count:234},{id:"quiz",label:"Quiz",color:e.quiz,visible:!1,count:67},{id:"resource",label:"Resource",color:e.resource,visible:!0,count:45}]}};var a,p,d;n.parameters={...n.parameters,docs:{...(a=n.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 'concept',
      label: 'Concept',
      color: NODE_TYPE_COLORS.concept
    }, {
      id: 'topic',
      label: 'Topic',
      color: NODE_TYPE_COLORS.topic
    }, {
      id: 'skill',
      label: 'Skill',
      color: NODE_TYPE_COLORS.skill
    }]
  }
}`,...(d=(p=n.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var u,O,b;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    title: 'Node Types',
    items: [{
      id: 'concept',
      label: 'Concept',
      color: NODE_TYPE_COLORS.concept
    }, {
      id: 'topic',
      label: 'Topic',
      color: NODE_TYPE_COLORS.topic
    }, {
      id: 'skill',
      label: 'Skill',
      color: NODE_TYPE_COLORS.skill
    }, {
      id: 'lesson',
      label: 'Lesson',
      color: NODE_TYPE_COLORS.lesson
    }]
  }
}`,...(b=(O=l.parameters)==null?void 0:O.docs)==null?void 0:b.source}}};var E,_,m;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    title: 'Graph Elements',
    items: [{
      id: 'concept',
      label: 'Concepts',
      color: NODE_TYPE_COLORS.concept,
      count: 24
    }, {
      id: 'topic',
      label: 'Topics',
      color: NODE_TYPE_COLORS.topic,
      count: 8
    }, {
      id: 'skill',
      label: 'Skills',
      color: NODE_TYPE_COLORS.skill,
      count: 15
    }, {
      id: 'lesson',
      label: 'Lessons',
      color: NODE_TYPE_COLORS.lesson,
      count: 32
    }]
  }
}`,...(m=(_=i.parameters)==null?void 0:_.docs)==null?void 0:m.source}}};var T,C,S;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    title: 'Toggle Visibility',
    interactive: true,
    items: [{
      id: 'concept',
      label: 'Concepts',
      color: NODE_TYPE_COLORS.concept,
      visible: true,
      count: 24
    }, {
      id: 'topic',
      label: 'Topics',
      color: NODE_TYPE_COLORS.topic,
      visible: true,
      count: 8
    }, {
      id: 'skill',
      label: 'Skills',
      color: NODE_TYPE_COLORS.skill,
      visible: false,
      count: 15
    }, {
      id: 'lesson',
      label: 'Lessons',
      color: NODE_TYPE_COLORS.lesson,
      visible: true,
      count: 32
    }]
  }
}`,...(S=(C=s.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};var L,R,g;t.parameters={...t.parameters,docs:{...(L=t.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    title: 'Edge Types',
    direction: 'horizontal',
    items: [{
      id: 'prerequisite',
      label: 'Prerequisite',
      color: EDGE_TYPE_COLORS.prerequisite
    }, {
      id: 'related',
      label: 'Related',
      color: EDGE_TYPE_COLORS.related
    }, {
      id: 'contains',
      label: 'Contains',
      color: EDGE_TYPE_COLORS.contains
    }, {
      id: 'references',
      label: 'References',
      color: EDGE_TYPE_COLORS.references
    }]
  }
}`,...(g=(R=t.parameters)==null?void 0:R.docs)==null?void 0:g.source}}};var P,D,k;r.parameters={...r.parameters,docs:{...(P=r.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    title: 'Connection Types',
    items: [{
      id: 'prerequisite',
      label: 'Prerequisite',
      color: EDGE_TYPE_COLORS.prerequisite,
      count: 45
    }, {
      id: 'related',
      label: 'Related',
      color: EDGE_TYPE_COLORS.related,
      count: 28
    }, {
      id: 'contains',
      label: 'Contains',
      color: EDGE_TYPE_COLORS.contains,
      count: 12
    }]
  }
}`,...(k=(D=r.parameters)==null?void 0:D.docs)==null?void 0:k.source}}};var Y,v,N;c.parameters={...c.parameters,docs:{...(Y=c.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    title: 'Knowledge Graph Legend',
    interactive: true,
    items: [{
      id: 'concept',
      label: 'Concept',
      color: NODE_TYPE_COLORS.concept,
      visible: true,
      count: 156
    }, {
      id: 'topic',
      label: 'Topic',
      color: NODE_TYPE_COLORS.topic,
      visible: true,
      count: 42
    }, {
      id: 'skill',
      label: 'Skill',
      color: NODE_TYPE_COLORS.skill,
      visible: true,
      count: 89
    }, {
      id: 'lesson',
      label: 'Lesson',
      color: NODE_TYPE_COLORS.lesson,
      visible: true,
      count: 234
    }, {
      id: 'quiz',
      label: 'Quiz',
      color: NODE_TYPE_COLORS.quiz,
      visible: false,
      count: 67
    }, {
      id: 'resource',
      label: 'Resource',
      color: NODE_TYPE_COLORS.resource,
      visible: true,
      count: 45
    }]
  }
}`,...(N=(v=c.parameters)==null?void 0:v.docs)==null?void 0:N.source}}};const K=["Default","WithTitle","WithCounts","Interactive","Horizontal","EdgeTypes","FullGraph"];export{n as Default,r as EdgeTypes,c as FullGraph,t as Horizontal,s as Interactive,i as WithCounts,l as WithTitle,K as __namedExportsOrder,F as default};
