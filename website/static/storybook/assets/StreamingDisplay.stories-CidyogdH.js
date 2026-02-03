import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as M}from"./index-GiUgBvb1.js";import{B as v}from"./Box-DYJzRMmP.js";import{V as d}from"./Stack-1XI3stiC.js";import{C as b}from"./Card-Bmes-tNK.js";import"./cn-BNf5BS2b.js";function U(s){const o={};try{return JSON.parse(s)}catch{}const N=["title","description","type","target"];for(const a of N){const n=new RegExp(`"${a}"\\s*:\\s*"([^"]*)"`,"i"),i=s.match(n);i&&(o[a]=i[1])}const j=["estimatedTime"];for(const a of j){const n=new RegExp(`"${a}"\\s*:\\s*(\\d+)`,"i"),i=s.match(n);i&&(o[a]=parseInt(i[1],10))}const t=s.match(/"milestones"\s*:\s*\[([\s\S]*?)(?:\]|$)/);if(t){const a=t[1],n=[],i=/\{[^{}]*"title"\s*:\s*"([^"]*)"[^{}]*\}/g;let c;for(;(c=i.exec(a))!==null;){const r=c[0],m={title:c[1]},l=r.match(/"description"\s*:\s*"([^"]*)"/);l&&(m.description=l[1]),n.push(m)}n.length>0&&(o.milestones=n)}return o}const w=({content:s,loadingTitle:o="Generating...",showRawToggle:N=!1,className:j=""})=>{const[t,a]=M.useState({});M.useEffect(()=>{if(s){const r=U(s);a(r)}},[s]);const n=t.milestones||[],i=t.title||t.description||t.type||t.target,c=i||n.length>0;return e.jsxs(d,{gap:"md",className:`w-full max-w-2xl mx-auto ${j}`,children:[i&&e.jsx(b,{className:"border border-gray-200",children:e.jsxs(d,{gap:"sm",children:[t.title&&e.jsx("h3",{className:"text-xl font-semibold text-gray-900",children:t.title}),t.description&&e.jsx("p",{className:"text-gray-700",children:t.description}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 text-sm",children:[t.type&&e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-500",children:"Type:"}),e.jsx("span",{className:"ml-2 text-gray-900 font-medium",children:t.type})]}),t.target&&e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-500",children:"Target:"}),e.jsx("span",{className:"ml-2 text-gray-900 font-medium",children:t.target})]}),t.estimatedTime&&e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-500",children:"Estimated Time:"}),e.jsxs("span",{className:"ml-2 text-gray-900 font-medium",children:[t.estimatedTime," hours"]})]})]}),n.length>0&&e.jsxs(d,{gap:"sm",className:"mt-4",children:[e.jsx("h4",{className:"text-lg font-semibold text-gray-900",children:"Milestones"}),e.jsx("ul",{className:"space-y-2",children:n.map((r,m)=>{var l;return(l=r.title)!=null&&l.trim()?e.jsxs("li",{className:"flex items-start gap-3 p-3 bg-gray-50 rounded-lg",children:[e.jsx(v,{className:"w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5",children:e.jsx(v,{className:"w-2 h-2 rounded-full bg-indigo-600"})}),e.jsxs(d,{gap:"xs",className:"flex-1",children:[e.jsx("span",{className:"font-medium text-gray-900",children:r.title}),r.description&&e.jsx("span",{className:"text-sm text-gray-600",children:r.description})]})]},r.id||`milestone-${m}`):null})})]})]})}),!c&&e.jsx(b,{className:"border border-gray-200",children:e.jsxs(d,{gap:"sm",align:"center",className:"py-8 text-gray-500",children:[e.jsx(v,{className:"w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"}),e.jsx("span",{className:"text-sm",children:o})]})}),N&&s&&e.jsxs("details",{className:"mt-4",children:[e.jsx("summary",{className:"cursor-pointer text-sm text-gray-600 hover:text-gray-900",children:"Show raw JSON content"}),e.jsx("pre",{className:"mt-2 p-3 bg-gray-50 rounded text-xs overflow-x-auto",children:s})]})]})};w.displayName="StreamingDisplay";w.__docgenInfo={description:"",methods:[],displayName:"StreamingDisplay",props:{content:{required:!0,tsType:{name:"string"},description:"The streaming JSON content (may be incomplete)"},loadingTitle:{required:!1,tsType:{name:"string"},description:"Optional title to display while loading",defaultValue:{value:'"Generating..."',computed:!1}},showRawToggle:{required:!1,tsType:{name:"boolean"},description:"Show raw content toggle",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes",defaultValue:{value:'""',computed:!1}}}};const se={title:"KFlow/Molecules/StreamingDisplay",component:w,parameters:{layout:"padded"},tags:["autodocs"]},p={args:{content:"",loadingTitle:"Generating goal..."}},g={args:{content:'{"title": "Learn Machine Learning Fundamentals"'}},u={args:{content:`{
  "title": "Learn Machine Learning Fundamentals",
  "description": "A comprehensive journey through the core concepts of ML, from basic algorithms to neural networks."`}},h={args:{content:`{
  "title": "Master Python Programming",
  "description": "From beginner to advanced Python development.",
  "type": "skill",
  "target": "professional",
  "estimatedTime": 120`}},f={args:{content:`{
  "title": "Complete Web Development Bootcamp",
  "description": "Full-stack web development from HTML to React.",
  "type": "course",
  "target": "career-change",
  "estimatedTime": 200,
  "milestones": [
    {"title": "HTML & CSS Basics", "description": "Learn the fundamentals of web markup"},
    {"title": "JavaScript Essentials", "description": "Master vanilla JavaScript"},
    {"title": "React Framework", "description": "Build modern React applications"}
  ]
}`}},x={args:{content:`{
  "title": "Data Science Path",
  "description": "Become a data scientist.",
  "milestones": [
    {"title": "Statistics Fundamentals", "description": "Learn probability and statistics"},
    {"title": "Python for Data Science"`}},y={args:{content:JSON.stringify({title:"AI Engineering Certificate",description:"Complete certification in artificial intelligence and machine learning engineering.",type:"certification",target:"career-advancement",estimatedTime:300,milestones:[{id:"ml-basics",title:"Machine Learning Basics",description:"Supervised and unsupervised learning"},{id:"deep-learning",title:"Deep Learning",description:"Neural networks and deep learning frameworks"},{id:"nlp",title:"Natural Language Processing",description:"Text processing and language models"},{id:"cv",title:"Computer Vision",description:"Image recognition and object detection"},{id:"deployment",title:"Model Deployment",description:"Production ML systems and MLOps"}]},null,2)}},S={args:{content:`{
  "title": "Frontend Development",
  "description": "Modern frontend development skills.",
  "type": "skill",
  "milestones": [
    {"title": "React Fundamentals"}
  ]
}`,showRawToggle:!0}};var T,L,D;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    content: '',
    loadingTitle: 'Generating goal...'
  }
}`,...(D=(L=p.parameters)==null?void 0:L.docs)==null?void 0:D.source}}};var k,F,P;g.parameters={...g.parameters,docs:{...(k=g.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    content: '{"title": "Learn Machine Learning Fundamentals"'
  }
}`,...(P=(F=g.parameters)==null?void 0:F.docs)==null?void 0:P.source}}};var R,C,B;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    content: \`{
  "title": "Learn Machine Learning Fundamentals",
  "description": "A comprehensive journey through the core concepts of ML, from basic algorithms to neural networks."\`
  }
}`,...(B=(C=u.parameters)==null?void 0:C.docs)==null?void 0:B.source}}};var E,J,O;h.parameters={...h.parameters,docs:{...(E=h.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    content: \`{
  "title": "Master Python Programming",
  "description": "From beginner to advanced Python development.",
  "type": "skill",
  "target": "professional",
  "estimatedTime": 120\`
  }
}`,...(O=(J=h.parameters)==null?void 0:J.docs)==null?void 0:O.source}}};var W,I,G;f.parameters={...f.parameters,docs:{...(W=f.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    content: \`{
  "title": "Complete Web Development Bootcamp",
  "description": "Full-stack web development from HTML to React.",
  "type": "course",
  "target": "career-change",
  "estimatedTime": 200,
  "milestones": [
    {"title": "HTML & CSS Basics", "description": "Learn the fundamentals of web markup"},
    {"title": "JavaScript Essentials", "description": "Master vanilla JavaScript"},
    {"title": "React Framework", "description": "Build modern React applications"}
  ]
}\`
  }
}`,...(G=(I=f.parameters)==null?void 0:I.docs)==null?void 0:G.source}}};var V,A,$;x.parameters={...x.parameters,docs:{...(V=x.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    content: \`{
  "title": "Data Science Path",
  "description": "Become a data scientist.",
  "milestones": [
    {"title": "Statistics Fundamentals", "description": "Learn probability and statistics"},
    {"title": "Python for Data Science"\`
  }
}`,...($=(A=x.parameters)==null?void 0:A.docs)==null?void 0:$.source}}};var q,H,_;y.parameters={...y.parameters,docs:{...(q=y.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    content: JSON.stringify({
      title: 'AI Engineering Certificate',
      description: 'Complete certification in artificial intelligence and machine learning engineering.',
      type: 'certification',
      target: 'career-advancement',
      estimatedTime: 300,
      milestones: [{
        id: 'ml-basics',
        title: 'Machine Learning Basics',
        description: 'Supervised and unsupervised learning'
      }, {
        id: 'deep-learning',
        title: 'Deep Learning',
        description: 'Neural networks and deep learning frameworks'
      }, {
        id: 'nlp',
        title: 'Natural Language Processing',
        description: 'Text processing and language models'
      }, {
        id: 'cv',
        title: 'Computer Vision',
        description: 'Image recognition and object detection'
      }, {
        id: 'deployment',
        title: 'Model Deployment',
        description: 'Production ML systems and MLOps'
      }]
    }, null, 2)
  }
}`,...(_=(H=y.parameters)==null?void 0:H.docs)==null?void 0:_.source}}};var K,z,Q;S.parameters={...S.parameters,docs:{...(K=S.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    content: \`{
  "title": "Frontend Development",
  "description": "Modern frontend development skills.",
  "type": "skill",
  "milestones": [
    {"title": "React Fundamentals"}
  ]
}\`,
    showRawToggle: true
  }
}`,...(Q=(z=S.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};const ae=["Loading","PartialTitle","PartialWithDescription","WithMetadata","WithMilestones","StreamingMilestones","CompleteGoal","WithRawToggle"];export{y as CompleteGoal,p as Loading,g as PartialTitle,u as PartialWithDescription,x as StreamingMilestones,h as WithMetadata,f as WithMilestones,S as WithRawToggle,ae as __namedExportsOrder,se as default};
