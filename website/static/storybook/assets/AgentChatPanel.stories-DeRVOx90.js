import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as f}from"./index-GiUgBvb1.js";import{B as m}from"./Box-DYJzRMmP.js";import{H as c,V as E}from"./Stack-DhhoTPuC.js";import{T as g}from"./Typography-Wmkp-g7N.js";import{B as y}from"./Button-Dn0472P0.js";import{I as h}from"./Icon-DDCXmKGr.js";import{B as Ie}from"./Badge-CpH0PNM6.js";import"./AgentAvatar-74--nhR9.js";import{A as Ae}from"./AgentStatusBadge-Df-Q1ir_.js";import"./DiffLine-CkY1GMp-.js";import"./ToolBadge-Dqa-994Y.js";import{T as De}from"./Textarea-C8Aqv8YN.js";import{S as Ce}from"./Spinner-vF2DJrH5.js";import{S as Re}from"./send-CHVRrjpn.js";import{C as Me}from"./ChatMessage-CqaOsWr8.js";import{D as Ee}from"./DiffBlock-CliQOBTk.js";import{E as Ne,F as Ve}from"./FileOperationItem-CwLyi9Qm.js";import"./TodoItem-CddWQn09.js";import{T as H}from"./ToolCallCard-q8eBO_eX.js";import{T as He}from"./TodoList-AXNvbnY8.js";import{S as $e}from"./SchemaDiffViewer-_buI0qAy.js";import{M as $}from"./message-square-CSwv56un.js";import{L as Pe}from"./list-todo-DTjPm3S-.js";import{c as ze}from"./createLucideIcon-CbHznvEr.js";import"./cn-BNf5BS2b.js";import"./loader-2-DXp1ic5P.js";import"./lock-BpRazVO9.js";import"./share-2-BGRL1FH9.js";import"./zap-DLdLcnjT.js";import"./refresh-cw-Ocr-wooT.js";import"./external-link-k_e-i1vS.js";import"./link-Csz5KqWX.js";import"./home-JwtCVJF2.js";import"./star-D_3mxVsm.js";import"./clock-DT9ve7xf.js";import"./calendar-rGtwHcH_.js";import"./pause-BGY7Ki7b.js";import"./play-C6U2eifx.js";import"./eye-DPfPdwVp.js";import"./list-B6-UEXVq.js";import"./grid-3x3-DCQtfzd8.js";import"./filter-CMfXM6HV.js";import"./search-CCKipEn6.js";import"./settings-DBj1i3lR.js";import"./user-plus-BlQDsowZ.js";import"./users-CV1mGUsS.js";import"./user-BePscFH1.js";import"./phone-XSC4O3No.js";import"./message-circle-Yw7MGdXs.js";import"./mail-CI1Ybt8r.js";import"./download-yLSRVNFt.js";import"./file-text-DZQctV9o.js";import"./copy-B40iJsJp.js";import"./save-DyJeJ3Zl.js";import"./trash-2-ChlfdFMf.js";import"./square-pen-D7sL1yO_.js";import"./minus-CvoF9liV.js";import"./plus-jSzJaRn3.js";import"./info-CF8EgE8A.js";import"./alert-triangle-BLuUOBNm.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";import"./check-DliVttWt.js";import"./menu-DUN0as2h.js";import"./x-prXd1WI5.js";import"./arrow-left-CMPuXvFr.js";import"./arrow-right-BdVPe8wH.js";import"./chevron-up-B8qTw58L.js";import"./chevron-down-BQmz_Bpa.js";import"./chevron-left-zGYeMbNT.js";import"./chevron-right-pDF_OUfd.js";import"./Avatar-CJtPgGUU.js";import"./bot-_bS8udXs.js";import"./file-code-yqS-aeuC.js";import"./Alert-mBErZifW.js";import"./book-open-Bc_pgR1e.js";import"./circle-CzFdAxtK.js";import"./ProgressBar-ZQR7fgL2.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fe=ze("GitCompare",[["circle",{cx:"18",cy:"18",r:"3",key:"1xkwt0"}],["circle",{cx:"6",cy:"6",r:"3",key:"1lh9wr"}],["path",{d:"M13 6h3a2 2 0 0 1 2 2v7",key:"1yeb86"}],["path",{d:"M11 18H8a2 2 0 0 1-2-2V9",key:"19pyzm"}]]);function fe({status:t,skill:l,threadId:u,onCancel:i,className:a=""}){const s=t==="running"||t==="interrupted";return e.jsx(m,{padding:"md",border:!0,bg:"transparent",className:`border-t-0 border-l-0 border-r-0 ${a}`,children:e.jsxs(c,{justify:"between",align:"center",children:[e.jsxs(c,{gap:"md",align:"center",children:[e.jsx(Ae,{status:t}),l&&e.jsx(Ie,{variant:"neutral",size:"sm",className:"font-mono",children:l})]}),e.jsxs(c,{gap:"sm",align:"center",children:[u&&e.jsxs(g,{variant:"caption",color:"muted",className:"hidden sm:block",children:[u.slice(0,8),"..."]}),s&&i&&e.jsx(y,{variant:"ghost",size:"sm",onClick:i,children:"Cancel"})]})]})})}fe.__docgenInfo={description:"",methods:[],displayName:"AgentStatusHeader",props:{status:{required:!0,tsType:{name:"union",raw:`| "idle"
| "running"
| "complete"
| "error"
| "interrupted"`,elements:[{name:"literal",value:'"idle"'},{name:"literal",value:'"running"'},{name:"literal",value:'"complete"'},{name:"literal",value:'"error"'},{name:"literal",value:'"interrupted"'}]},description:"Current status"},skill:{required:!1,tsType:{name:"string"},description:"Skill name being used"},threadId:{required:!1,tsType:{name:"string"},description:"Thread ID for the current session"},onCancel:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Cancel callback"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes",defaultValue:{value:'""',computed:!1}}}};function he({placeholder:t="Type a message...",onSend:l,isProcessing:u=!1,disabled:i=!1,className:a=""}){const[s,r]=f.useState(""),o=f.useRef(null),k=i||u||s.trim().length===0;f.useEffect(()=>{const n=o.current;n&&(n.style.height="auto",n.style.height=`${Math.min(n.scrollHeight,120)}px`)},[s]);const b=()=>{if(k)return;const n=s.trim();n&&(l(n),r(""))},C=n=>{n.key==="Enter"&&!n.shiftKey&&(n.preventDefault(),b())};return e.jsx(m,{padding:"md",border:!0,bg:"surface",className:`border-l-0 border-r-0 border-b-0 ${a}`,children:e.jsxs(c,{gap:"sm",align:"end",children:[e.jsx(m,{className:"flex-1",children:e.jsx(De,{ref:o,value:s,onChange:n=>r(n.target.value),onKeyDown:C,placeholder:t,disabled:i,rows:1,className:"resize-none min-h-[40px]"})}),e.jsx(y,{variant:"primary",size:"md",onClick:b,disabled:k,className:"rounded-[var(--radius-full)] w-10 h-10 p-0",children:u?e.jsx(Ce,{size:"sm"}):e.jsx(h,{icon:Re,size:"sm"})})]})})}he.__docgenInfo={description:"",methods:[],displayName:"AgentChatInput",props:{placeholder:{required:!1,tsType:{name:"string"},description:"Placeholder text",defaultValue:{value:'"Type a message..."',computed:!1}},onSend:{required:!0,tsType:{name:"signature",type:"function",raw:"(message: string) => void",signature:{arguments:[{type:{name:"string"},name:"message"}],return:{name:"void"}}},description:"Send callback"},isProcessing:{required:!1,tsType:{name:"boolean"},description:"Whether the agent is currently processing",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether input is disabled",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes",defaultValue:{value:'""',computed:!1}}}};function ye({activities:t,autoScroll:l=!0,onRetryError:u,onDismissError:i,className:a=""}){const s=f.useRef(null);return f.useEffect(()=>{l&&s.current&&s.current.scrollIntoView({behavior:"smooth"})},[t.length,l]),t.length===0?e.jsx(m,{padding:"xl",className:a,children:e.jsx(g,{variant:"body2",color:"muted",align:"center",children:"No activity yet"})}):e.jsxs(E,{gap:"md",className:`overflow-y-auto ${a}`,children:[t.map((r,o)=>{switch(r.type){case"message":return e.jsx(Me,{role:r.role,content:r.content,timestamp:r.timestamp,isStreaming:r.isStreaming},`${r.type}-${o}`);case"tool_call":return e.jsx(H,{tool:r.tool,args:r.args,isExecuting:r.isExecuting},`${r.type}-${o}`);case"tool_result":return e.jsx(H,{tool:r.tool,args:{},result:r.result,success:r.success},`${r.type}-${o}`);case"file_operation":return e.jsx(Ve,{operation:r.operation,path:r.path,success:r.success},`${r.type}-${o}`);case"schema_diff":return e.jsx(Ee,{filePath:r.filePath,hunks:r.hunks,maxHeight:200},`${r.type}-${o}`);case"error":return e.jsx(Ne,{message:r.message,code:r.code,onRetry:u,onDismiss:i},`${r.type}-${o}`);default:return null}}),e.jsx("div",{ref:s})]})}ye.__docgenInfo={description:"",methods:[],displayName:"AgentActivityFeed",props:{activities:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| {
    type: "message";
    role: AvatarRole;
    content: string;
    timestamp: number;
    isStreaming?: boolean;
  }
| {
    type: "tool_call";
    tool: string;
    args: Record<string, unknown>;
    timestamp: number;
    isExecuting?: boolean;
  }
| {
    type: "tool_result";
    tool: string;
    result: unknown;
    success: boolean;
    timestamp: number;
  }
| {
    type: "file_operation";
    operation: FileOperation;
    path: string;
    success?: boolean;
    timestamp: number;
  }
| {
    type: "schema_diff";
    filePath: string;
    hunks: DiffHunk[];
    timestamp: number;
  }
| { type: "error"; message: string; code?: string; timestamp: number }`,elements:[{name:"signature",type:"object",raw:`{
  type: "message";
  role: AvatarRole;
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"message"',required:!0}},{key:"role",value:{name:"union",raw:'"assistant" | "user" | "system" | "tool"',elements:[{name:"literal",value:'"assistant"'},{name:"literal",value:'"user"'},{name:"literal",value:'"system"'},{name:"literal",value:'"tool"'}],required:!0}},{key:"content",value:{name:"string",required:!0}},{key:"timestamp",value:{name:"number",required:!0}},{key:"isStreaming",value:{name:"boolean",required:!1}}]}},{name:"signature",type:"object",raw:`{
  type: "tool_call";
  tool: string;
  args: Record<string, unknown>;
  timestamp: number;
  isExecuting?: boolean;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"tool_call"',required:!0}},{key:"tool",value:{name:"string",required:!0}},{key:"args",value:{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>",required:!0}},{key:"timestamp",value:{name:"number",required:!0}},{key:"isExecuting",value:{name:"boolean",required:!1}}]}},{name:"signature",type:"object",raw:`{
  type: "tool_result";
  tool: string;
  result: unknown;
  success: boolean;
  timestamp: number;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"tool_result"',required:!0}},{key:"tool",value:{name:"string",required:!0}},{key:"result",value:{name:"unknown",required:!0}},{key:"success",value:{name:"boolean",required:!0}},{key:"timestamp",value:{name:"number",required:!0}}]}},{name:"signature",type:"object",raw:`{
  type: "file_operation";
  operation: FileOperation;
  path: string;
  success?: boolean;
  timestamp: number;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"file_operation"',required:!0}},{key:"operation",value:{name:"union",raw:'"ls" | "read_file" | "write_file" | "edit_file"',elements:[{name:"literal",value:'"ls"'},{name:"literal",value:'"read_file"'},{name:"literal",value:'"write_file"'},{name:"literal",value:'"edit_file"'}],required:!0}},{key:"path",value:{name:"string",required:!0}},{key:"success",value:{name:"boolean",required:!1}},{key:"timestamp",value:{name:"number",required:!0}}]}},{name:"signature",type:"object",raw:`{
  type: "schema_diff";
  filePath: string;
  hunks: DiffHunk[];
  timestamp: number;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"schema_diff"',required:!0}},{key:"filePath",value:{name:"string",required:!0}},{key:"hunks",value:{name:"Array",elements:[{name:"DiffHunk"}],raw:"DiffHunk[]",required:!0}},{key:"timestamp",value:{name:"number",required:!0}}]}},{name:"signature",type:"object",raw:'{ type: "error"; message: string; code?: string; timestamp: number }',signature:{properties:[{key:"type",value:{name:"literal",value:'"error"',required:!0}},{key:"message",value:{name:"string",required:!0}},{key:"code",value:{name:"string",required:!1}},{key:"timestamp",value:{name:"number",required:!0}}]}}]}],raw:"ActivityItem[]"},description:"Activity items to display"},autoScroll:{required:!1,tsType:{name:"boolean"},description:"Auto-scroll to bottom on new activities",defaultValue:{value:"true",computed:!1}},onRetryError:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Error retry callback"},onDismissError:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Error dismiss callback"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes",defaultValue:{value:'""',computed:!1}}}};function ve({status:t,skill:l,threadId:u,activities:i,todos:a=[],schemaDiffs:s=[],onSendMessage:r,onCancel:o,onRetryError:k,variant:b="panel",showInput:C=!0,showTodos:n=!0,showDiffs:R=!0,placeholder:be,className:we=""}){const[p,M]=f.useState("activity"),Se=t==="running",xe=b==="full",N=a.length>0,V=s.length>0,qe=a.length,Te=s.length,je=a.filter(_e=>_e.status==="completed").length;return e.jsxs(m,{border:!0,rounded:"xl",overflow:"hidden",shadow:"lg",bg:"surface",display:"flex",className:`flex-col ${xe?"h-full":"h-[600px]"} ${we}`,children:[e.jsx(fe,{status:t,skill:l,threadId:u,onCancel:o}),(n&&N||R&&V)&&e.jsx(m,{border:!0,bg:"muted",className:"border-l-0 border-r-0 border-t-0",children:e.jsxs(c,{gap:"none",children:[e.jsx(y,{variant:p==="activity"?"primary":"ghost",size:"sm",className:"flex-1 rounded-none",onClick:()=>M("activity"),children:e.jsxs(c,{gap:"xs",align:"center",children:[e.jsx(h,{icon:$,size:"sm"}),e.jsx(g,{variant:"caption",children:"Activity"})]})}),n&&N&&e.jsx(y,{variant:p==="todos"?"primary":"ghost",size:"sm",className:"flex-1 rounded-none",onClick:()=>M("todos"),children:e.jsxs(c,{gap:"xs",align:"center",children:[e.jsx(h,{icon:Pe,size:"sm"}),e.jsxs(g,{variant:"caption",children:["Tasks (",je,"/",qe,")"]})]})}),R&&V&&e.jsx(y,{variant:p==="changes"?"primary":"ghost",size:"sm",className:"flex-1 rounded-none",onClick:()=>M("changes"),children:e.jsxs(c,{gap:"xs",align:"center",children:[e.jsx(h,{icon:Fe,size:"sm"}),e.jsxs(g,{variant:"caption",children:["Changes (",Te,")"]})]})})]})}),e.jsxs(E,{flex:!0,className:"overflow-hidden",children:[p==="activity"&&e.jsx(ye,{activities:i,onRetryError:k,className:"h-full p-4"}),p==="todos"&&n&&e.jsx(m,{fullHeight:!0,overflow:"auto",padding:"md",children:e.jsx(He,{todos:a,showHeader:!1})}),p==="changes"&&R&&e.jsx(m,{fullHeight:!0,overflow:"auto",padding:"md",children:e.jsx($e,{diffs:s,title:"Schema Changes"})})]}),C&&e.jsx(he,{onSend:r,isProcessing:Se,disabled:t==="error",placeholder:be}),t==="idle"&&i.length===0&&e.jsx(m,{position:"absolute",className:"inset-0 flex items-center justify-center pointer-events-none",children:e.jsxs(E,{gap:"md",align:"center",children:[e.jsx(h,{icon:$,size:"lg",className:"opacity-30"}),e.jsx(g,{variant:"body2",color:"muted",children:"Start a conversation with the agent"})]})})]})}ve.__docgenInfo={description:"",methods:[],displayName:"AgentChatPanel",props:{status:{required:!0,tsType:{name:"union",raw:`| "idle"
| "running"
| "complete"
| "error"
| "interrupted"`,elements:[{name:"literal",value:'"idle"'},{name:"literal",value:'"running"'},{name:"literal",value:'"complete"'},{name:"literal",value:'"error"'},{name:"literal",value:'"interrupted"'}]},description:"Current agent status"},skill:{required:!1,tsType:{name:"string"},description:"Current skill being used"},threadId:{required:!1,tsType:{name:"string"},description:"Thread ID"},activities:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| {
    type: "message";
    role: AvatarRole;
    content: string;
    timestamp: number;
    isStreaming?: boolean;
  }
| {
    type: "tool_call";
    tool: string;
    args: Record<string, unknown>;
    timestamp: number;
    isExecuting?: boolean;
  }
| {
    type: "tool_result";
    tool: string;
    result: unknown;
    success: boolean;
    timestamp: number;
  }
| {
    type: "file_operation";
    operation: FileOperation;
    path: string;
    success?: boolean;
    timestamp: number;
  }
| {
    type: "schema_diff";
    filePath: string;
    hunks: DiffHunk[];
    timestamp: number;
  }
| { type: "error"; message: string; code?: string; timestamp: number }`,elements:[{name:"signature",type:"object",raw:`{
  type: "message";
  role: AvatarRole;
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"message"',required:!0}},{key:"role",value:{name:"union",raw:'"assistant" | "user" | "system" | "tool"',elements:[{name:"literal",value:'"assistant"'},{name:"literal",value:'"user"'},{name:"literal",value:'"system"'},{name:"literal",value:'"tool"'}],required:!0}},{key:"content",value:{name:"string",required:!0}},{key:"timestamp",value:{name:"number",required:!0}},{key:"isStreaming",value:{name:"boolean",required:!1}}]}},{name:"signature",type:"object",raw:`{
  type: "tool_call";
  tool: string;
  args: Record<string, unknown>;
  timestamp: number;
  isExecuting?: boolean;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"tool_call"',required:!0}},{key:"tool",value:{name:"string",required:!0}},{key:"args",value:{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>",required:!0}},{key:"timestamp",value:{name:"number",required:!0}},{key:"isExecuting",value:{name:"boolean",required:!1}}]}},{name:"signature",type:"object",raw:`{
  type: "tool_result";
  tool: string;
  result: unknown;
  success: boolean;
  timestamp: number;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"tool_result"',required:!0}},{key:"tool",value:{name:"string",required:!0}},{key:"result",value:{name:"unknown",required:!0}},{key:"success",value:{name:"boolean",required:!0}},{key:"timestamp",value:{name:"number",required:!0}}]}},{name:"signature",type:"object",raw:`{
  type: "file_operation";
  operation: FileOperation;
  path: string;
  success?: boolean;
  timestamp: number;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"file_operation"',required:!0}},{key:"operation",value:{name:"union",raw:'"ls" | "read_file" | "write_file" | "edit_file"',elements:[{name:"literal",value:'"ls"'},{name:"literal",value:'"read_file"'},{name:"literal",value:'"write_file"'},{name:"literal",value:'"edit_file"'}],required:!0}},{key:"path",value:{name:"string",required:!0}},{key:"success",value:{name:"boolean",required:!1}},{key:"timestamp",value:{name:"number",required:!0}}]}},{name:"signature",type:"object",raw:`{
  type: "schema_diff";
  filePath: string;
  hunks: DiffHunk[];
  timestamp: number;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"schema_diff"',required:!0}},{key:"filePath",value:{name:"string",required:!0}},{key:"hunks",value:{name:"Array",elements:[{name:"DiffHunk"}],raw:"DiffHunk[]",required:!0}},{key:"timestamp",value:{name:"number",required:!0}}]}},{name:"signature",type:"object",raw:'{ type: "error"; message: string; code?: string; timestamp: number }',signature:{properties:[{key:"type",value:{name:"literal",value:'"error"',required:!0}},{key:"message",value:{name:"string",required:!0}},{key:"code",value:{name:"string",required:!1}},{key:"timestamp",value:{name:"number",required:!0}}]}}]}],raw:"ActivityItem[]"},description:"Activity items"},todos:{required:!1,tsType:{name:"Array",elements:[{name:"Todo"}],raw:"Todo[]"},description:"Todo list",defaultValue:{value:"[]",computed:!1}},schemaDiffs:{required:!1,tsType:{name:"Array",elements:[{name:"SchemaDiff"}],raw:"SchemaDiff[]"},description:"Schema diffs",defaultValue:{value:"[]",computed:!1}},onSendMessage:{required:!0,tsType:{name:"signature",type:"function",raw:"(message: string) => void",signature:{arguments:[{type:{name:"string"},name:"message"}],return:{name:"void"}}},description:"Send message callback"},onCancel:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Cancel callback"},onRetryError:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Retry error callback"},variant:{required:!1,tsType:{name:"union",raw:'"panel" | "full"',elements:[{name:"literal",value:'"panel"'},{name:"literal",value:'"full"'}]},description:"Panel variant",defaultValue:{value:'"panel"',computed:!1}},showInput:{required:!1,tsType:{name:"boolean"},description:"Show the input field",defaultValue:{value:"true",computed:!1}},showTodos:{required:!1,tsType:{name:"boolean"},description:"Show todos section",defaultValue:{value:"true",computed:!1}},showDiffs:{required:!1,tsType:{name:"boolean"},description:"Show schema diffs section",defaultValue:{value:"true",computed:!1}},placeholder:{required:!1,tsType:{name:"string"},description:"Custom placeholder for input"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes",defaultValue:{value:'""',computed:!1}}}};const pr={title:"Builder/Organisms/AgentChatPanel",component:ve,parameters:{layout:"fullscreen"},tags:["autodocs"],argTypes:{status:{control:"select",options:["idle","running","complete","error","interrupted"]},variant:{control:"select",options:["panel","full"]}}},d=[{type:"message",role:"user",content:"Create a task management schema",timestamp:Date.now()-3e5},{type:"message",role:"assistant",content:"I'll create a task management schema for you. Let me start by reading the existing files...",timestamp:Date.now()-24e4},{type:"tool_call",tool:"read_file",args:{file_path:"/project/schema.orb"},timestamp:Date.now()-24e4},{type:"tool_result",tool:"read_file",result:"Read 45 lines",success:!0,timestamp:Date.now()-23e4},{type:"message",role:"assistant",content:"I've analyzed your current schema. Now I'll add the Task orbital...",timestamp:Date.now()-18e4},{type:"tool_call",tool:"edit_file",args:{file_path:"/project/schema.orb",old_string:"old",new_string:"new"},timestamp:Date.now()-12e4},{type:"tool_result",tool:"edit_file",result:"Edit applied successfully",success:!0,timestamp:Date.now()-11e4}],v=[{id:"1",task:"Create Task entity",status:"completed"},{id:"2",task:"Add TaskManagement trait",status:"completed"},{id:"3",task:"Implement state machine",status:"in_progress"},{id:"4",task:"Add render-ui effects",status:"pending"}],ke=[{id:"diff-1",filePath:"schema.orb",hunks:[{oldStart:1,oldLines:2,newStart:1,newLines:6,lines:[{type:"context",content:'  "orbitals": ['},{type:"add",content:"    {"},{type:"add",content:'      "name": "TaskManagement",'},{type:"add",content:'      "entity": { "name": "Task" }'},{type:"add",content:"    }"},{type:"context",content:"  ]"}]}],timestamp:Date.now()-6e4,addedLines:4,removedLines:0}],w={args:{status:"idle",activities:[],todos:[],showInput:!0,placeholder:"Ask me to help with your almadar schema...",onSendMessage:t=>console.log("Send:",t)}},S={args:{status:"running",skill:"almadar-orbitals",activities:d,todos:v,showInput:!0,showTodos:!0,onSendMessage:t=>console.log("Send:",t),onCancel:()=>console.log("Cancel")}},x={args:{status:"complete",skill:"almadar-orbitals",activities:d,todos:v.map(t=>({...t,status:"completed"})),schemaDiffs:ke,showInput:!0,showTodos:!0,showDiffs:!0,onSendMessage:t=>console.log("Send:",t)}},q={args:{status:"error",skill:"almadar-orbitals",activities:[...d,{type:"error",message:"Failed to validate schema: Invalid trait reference",code:"VALIDATION_ERROR",timestamp:Date.now()}],showInput:!0,onSendMessage:t=>console.log("Send:",t),onRetryError:()=>console.log("Retry")}},T={args:{status:"interrupted",skill:"almadar-orbitals",activities:d.slice(0,4),todos:v.slice(0,2),showInput:!0,showTodos:!0,onSendMessage:t=>console.log("Send:",t)}},j={args:{status:"running",variant:"panel",activities:d.slice(0,3),showInput:!0,onSendMessage:t=>console.log("Send:",t)},decorators:[t=>e.jsx("div",{style:{width:"400px",height:"600px"},children:e.jsx(t,{})})]},_={args:{status:"complete",variant:"full",skill:"almadar-orbitals",activities:d,todos:v,schemaDiffs:ke,showInput:!0,showTodos:!0,showDiffs:!0,onSendMessage:t=>console.log("Send:",t)},decorators:[t=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(t,{})})]},I={args:{status:"complete",activities:d,showInput:!1,onSendMessage:t=>console.log("Send:",t)}},A={args:{status:"running",activities:[],todos:v,showTodos:!0,showDiffs:!1,showInput:!1,onSendMessage:t=>console.log("Send:",t)}},D={args:{status:"running",skill:"almadar-orbitals",threadId:"thread_abc123",activities:d.slice(0,2),showInput:!0,onSendMessage:t=>console.log("Send:",t)}};var P,z,F;w.parameters={...w.parameters,docs:{...(P=w.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    status: "idle",
    activities: [],
    todos: [],
    showInput: true,
    placeholder: "Ask me to help with your almadar schema...",
    onSendMessage: message => console.log("Send:", message)
  }
}`,...(F=(z=w.parameters)==null?void 0:z.docs)==null?void 0:F.source}}};var O,L,B;S.parameters={...S.parameters,docs:{...(O=S.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    status: "running",
    skill: "almadar-orbitals",
    activities: mockActivities,
    todos: mockTodos,
    showInput: true,
    showTodos: true,
    onSendMessage: message => console.log("Send:", message),
    onCancel: () => console.log("Cancel")
  }
}`,...(B=(L=S.parameters)==null?void 0:L.docs)==null?void 0:B.source}}};var W,K,G;x.parameters={...x.parameters,docs:{...(W=x.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    status: "complete",
    skill: "almadar-orbitals",
    activities: mockActivities,
    todos: mockTodos.map(t => ({
      ...t,
      status: "completed" as const
    })),
    schemaDiffs: mockDiffs,
    showInput: true,
    showTodos: true,
    showDiffs: true,
    onSendMessage: message => console.log("Send:", message)
  }
}`,...(G=(K=x.parameters)==null?void 0:K.docs)==null?void 0:G.source}}};var J,Q,U;q.parameters={...q.parameters,docs:{...(J=q.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    status: "error",
    skill: "almadar-orbitals",
    activities: [...mockActivities, {
      type: "error" as const,
      message: "Failed to validate schema: Invalid trait reference",
      code: "VALIDATION_ERROR",
      timestamp: Date.now()
    }],
    showInput: true,
    onSendMessage: message => console.log("Send:", message),
    onRetryError: () => console.log("Retry")
  }
}`,...(U=(Q=q.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var X,Y,Z;T.parameters={...T.parameters,docs:{...(X=T.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    status: "interrupted",
    skill: "almadar-orbitals",
    activities: mockActivities.slice(0, 4),
    todos: mockTodos.slice(0, 2),
    showInput: true,
    showTodos: true,
    onSendMessage: message => console.log("Send:", message)
  }
}`,...(Z=(Y=T.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,te,re;j.parameters={...j.parameters,docs:{...(ee=j.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    status: "running",
    variant: "panel",
    activities: mockActivities.slice(0, 3),
    showInput: true,
    onSendMessage: message => console.log("Send:", message)
  },
  decorators: [Story => <div style={{
    width: "400px",
    height: "600px"
  }}>
        <Story />
      </div>]
}`,...(re=(te=j.parameters)==null?void 0:te.docs)==null?void 0:re.source}}};var ne,se,ae;_.parameters={..._.parameters,docs:{...(ne=_.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    status: "complete",
    variant: "full",
    skill: "almadar-orbitals",
    activities: mockActivities,
    todos: mockTodos,
    schemaDiffs: mockDiffs,
    showInput: true,
    showTodos: true,
    showDiffs: true,
    onSendMessage: message => console.log("Send:", message)
  },
  decorators: [Story => <div style={{
    height: "100vh"
  }}>
        <Story />
      </div>]
}`,...(ae=(se=_.parameters)==null?void 0:se.docs)==null?void 0:ae.source}}};var oe,ie,le;I.parameters={...I.parameters,docs:{...(oe=I.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    status: "complete",
    activities: mockActivities,
    showInput: false,
    onSendMessage: message => console.log("Send:", message)
  }
}`,...(le=(ie=I.parameters)==null?void 0:ie.docs)==null?void 0:le.source}}};var ue,me,ce;A.parameters={...A.parameters,docs:{...(ue=A.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    status: "running",
    activities: [],
    todos: mockTodos,
    showTodos: true,
    showDiffs: false,
    showInput: false,
    onSendMessage: message => console.log("Send:", message)
  }
}`,...(ce=(me=A.parameters)==null?void 0:me.docs)==null?void 0:ce.source}}};var de,pe,ge;D.parameters={...D.parameters,docs:{...(de=D.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    status: "running",
    skill: "almadar-orbitals",
    threadId: "thread_abc123",
    activities: mockActivities.slice(0, 2),
    showInput: true,
    onSendMessage: message => console.log("Send:", message)
  }
}`,...(ge=(pe=D.parameters)==null?void 0:pe.docs)==null?void 0:ge.source}}};const gr=["Idle","Running","Complete","WithError","Interrupted","PanelVariant","FullVariant","WithoutInput","TodosOnly","WithThreadId"];export{x as Complete,_ as FullVariant,w as Idle,T as Interrupted,j as PanelVariant,S as Running,A as TodosOnly,q as WithError,D as WithThreadId,I as WithoutInput,gr as __namedExportsOrder,pr as default};
