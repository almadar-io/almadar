import{j as e}from"./jsx-runtime-CDt2p4po.js";import{C as a}from"./ChatMessage-CqaOsWr8.js";import"./index-GiUgBvb1.js";import"./Box-DYJzRMmP.js";import"./cn-BNf5BS2b.js";import"./Stack-DhhoTPuC.js";import"./Typography-Wmkp-g7N.js";import"./AgentAvatar-74--nhR9.js";import"./Avatar-CJtPgGUU.js";import"./user-BePscFH1.js";import"./createLucideIcon-CbHznvEr.js";import"./settings-DBj1i3lR.js";import"./bot-_bS8udXs.js";import"./AgentStatusBadge-Df-Q1ir_.js";import"./Badge-CpH0PNM6.js";import"./DiffLine-CkY1GMp-.js";import"./ToolBadge-Dqa-994Y.js";const Y={title:"Builder/Molecules/ChatMessage",component:a,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{role:{control:"select",options:["assistant","user","system","tool"]},isStreaming:{control:"boolean"}}},t={args:{role:"user",content:"Can you help me create a new almadar schema for a task management app?",timestamp:Date.now()-12e4}},s={args:{role:"assistant",content:`I'd be happy to help you create an almadar schema for a task management app. Let me start by asking a few questions about your requirements:

1. What entities do you need? (e.g., Task, Project, User)
2. What actions should users be able to perform?
3. Do you need any integrations?`,timestamp:Date.now()-6e4}},o={args:{role:"system",content:"Schema validation completed. 0 errors found.",timestamp:Date.now()}},n={args:{role:"tool",content:"Read 45 lines from schema.orb",timestamp:Date.now()-3e4}},r={args:{role:"assistant",content:"I'm analyzing your schema and looking for potential improvements",timestamp:Date.now(),isStreaming:!0}},m={args:{role:"assistant",content:`Here's the almadar schema I've created for your task management app:

\`\`\`json
{
  "name": "TaskManager",
  "version": "1.0.0",
  "orbitals": [
    {
      "name": "TaskManagement",
      "entity": {
        "name": "Task",
        "fields": [
          { "name": "title", "type": "string" },
          { "name": "description", "type": "string" },
          { "name": "status", "type": "enum", "values": ["todo", "in_progress", "done"] }
        ]
      }
    }
  ]
}
\`\`\`

This schema includes the basic structure for managing tasks. Would you like me to add more features?`,timestamp:Date.now()}},i={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px",maxWidth:"600px"},children:[e.jsx(a,{role:"user",content:"Create a simple todo app schema",timestamp:Date.now()-3e5}),e.jsx(a,{role:"assistant",content:"I'll create a todo app schema for you. Let me first analyze your requirements...",timestamp:Date.now()-24e4}),e.jsx(a,{role:"tool",content:"Writing schema.orb...",timestamp:Date.now()-18e4}),e.jsx(a,{role:"assistant",content:"Done! I've created a schema with Task and Project entities. The schema includes CRUD operations and a kanban board view.",timestamp:Date.now()-12e4}),e.jsx(a,{role:"system",content:"Schema validated successfully.",timestamp:Date.now()-6e4})]})},c={args:{role:"assistant",content:"This message doesn't have a timestamp."}};var p,l,d;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    role: "user",
    content: "Can you help me create a new almadar schema for a task management app?",
    timestamp: Date.now() - 120000
  }
}`,...(d=(l=t.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var u,g,h;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    role: "assistant",
    content: "I'd be happy to help you create an almadar schema for a task management app. Let me start by asking a few questions about your requirements:\\n\\n1. What entities do you need? (e.g., Task, Project, User)\\n2. What actions should users be able to perform?\\n3. Do you need any integrations?",
    timestamp: Date.now() - 60000
  }
}`,...(h=(g=s.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var y,f,w;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    role: "system",
    content: "Schema validation completed. 0 errors found.",
    timestamp: Date.now()
  }
}`,...(w=(f=o.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};var D,b,k;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    role: "tool",
    content: "Read 45 lines from schema.orb",
    timestamp: Date.now() - 30000
  }
}`,...(k=(b=n.parameters)==null?void 0:b.docs)==null?void 0:k.source}}};var M,v,T;r.parameters={...r.parameters,docs:{...(M=r.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    role: "assistant",
    content: "I'm analyzing your schema and looking for potential improvements",
    timestamp: Date.now(),
    isStreaming: true
  }
}`,...(T=(v=r.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var x,S,C;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    role: "assistant",
    content: \`Here's the almadar schema I've created for your task management app:

\\\`\\\`\\\`json
{
  "name": "TaskManager",
  "version": "1.0.0",
  "orbitals": [
    {
      "name": "TaskManagement",
      "entity": {
        "name": "Task",
        "fields": [
          { "name": "title", "type": "string" },
          { "name": "description", "type": "string" },
          { "name": "status", "type": "enum", "values": ["todo", "in_progress", "done"] }
        ]
      }
    }
  ]
}
\\\`\\\`\\\`

This schema includes the basic structure for managing tasks. Would you like me to add more features?\`,
    timestamp: Date.now()
  }
}`,...(C=(S=m.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};var j,W,I;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "600px"
  }}>
      <ChatMessage role="user" content="Create a simple todo app schema" timestamp={Date.now() - 300000} />
      <ChatMessage role="assistant" content="I'll create a todo app schema for you. Let me first analyze your requirements..." timestamp={Date.now() - 240000} />
      <ChatMessage role="tool" content="Writing schema.orb..." timestamp={Date.now() - 180000} />
      <ChatMessage role="assistant" content="Done! I've created a schema with Task and Project entities. The schema includes CRUD operations and a kanban board view." timestamp={Date.now() - 120000} />
      <ChatMessage role="system" content="Schema validated successfully." timestamp={Date.now() - 60000} />
    </div>
}`,...(I=(W=i.parameters)==null?void 0:W.docs)==null?void 0:I.source}}};var q,L,U;c.parameters={...c.parameters,docs:{...(q=c.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    role: "assistant",
    content: "This message doesn't have a timestamp."
  }
}`,...(U=(L=c.parameters)==null?void 0:L.docs)==null?void 0:U.source}}};const Z=["UserMessage","AssistantMessage","SystemMessage","ToolMessage","StreamingMessage","LongMessage","Conversation","WithoutTimestamp"];export{s as AssistantMessage,i as Conversation,m as LongMessage,r as StreamingMessage,o as SystemMessage,n as ToolMessage,t as UserMessage,c as WithoutTimestamp,Z as __namedExportsOrder,Y as default};
