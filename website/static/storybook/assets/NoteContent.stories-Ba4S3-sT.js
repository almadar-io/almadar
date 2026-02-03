import{a as n}from"./index-B-lxVbXh.js";import{j as s}from"./jsx-runtime-CDt2p4po.js";import{r as a}from"./index-GiUgBvb1.js";import{B as S}from"./Box-DYJzRMmP.js";import{T as oe}from"./Textarea-C8Aqv8YN.js";import{T as _}from"./Typography-Wmkp-g7N.js";import{u as se}from"./useEventBus-BNZMNlv8.js";import"./v4-CtRu48qb.js";import"./cn-BNf5BS2b.js";const y=({noteId:w,content:e,isEditing:z,showFullContent:G=!1,previewLength:C=100,placeholder:J="Add your notes here...",rows:Q=4,onChange:p,onStartEditing:m,onSave:g,onCancel:T,className:v})=>{const O=se(),E=a.useRef(null),[X,f]=a.useState(!1),[N,r]=a.useState(e),o=z??X;a.useEffect(()=>{o||r(e)},[e,o]),a.useEffect(()=>{o&&E.current&&E.current.focus()},[o]);const Y=()=>{f(!0),r(e),O.emit("UI:EDIT_NOTE_CONTENT",{noteId:w,entity:"Note"}),m==null||m()},b=()=>{f(!1),O.emit("UI:SAVE_NOTE_CONTENT",{noteId:w,content:N,entity:"Note"}),g==null||g(N)},Z=()=>{f(!1),r(e),T==null||T()},ee=t=>{const I=t.target.value;r(I),p==null||p(I)},te=t=>{t.key==="Escape"?(t.preventDefault(),Z()):t.key==="Enter"&&t.ctrlKey&&(t.preventDefault(),b())};if(o)return s.jsxs(S,{className:v,onClick:t=>t.stopPropagation(),children:[s.jsx(oe,{ref:E,value:N,onChange:ee,onBlur:b,onKeyDown:te,rows:Q,placeholder:J,className:"w-full border-2 border-blue-500 focus:ring-2 focus:ring-blue-200"}),s.jsx(_,{variant:"small",className:"text-gray-400 mt-1",children:"Ctrl+Enter to save, Esc to cancel"})]});const ne=G?e||"No content":e.length>C?`${e.substring(0,C)}...`:e||"No content";return s.jsx(S,{className:`cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded px-2 py-1 transition-colors ${v||""}`,onClick:Y,title:"Click to edit content",children:s.jsx(_,{variant:"body",className:`${e?"text-gray-700 dark:text-gray-300":"text-gray-400 italic"}`,children:ne})})};y.displayName="NoteContent";y.__docgenInfo={description:"",methods:[],displayName:"NoteContent",props:{noteId:{required:!0,tsType:{name:"string"},description:"Note ID"},content:{required:!0,tsType:{name:"string"},description:"Current content value"},isEditing:{required:!1,tsType:{name:"boolean"},description:"Whether the content is being edited"},showFullContent:{required:!1,tsType:{name:"boolean"},description:"Show full content or truncated preview",defaultValue:{value:"false",computed:!1}},previewLength:{required:!1,tsType:{name:"number"},description:"Maximum characters to show in preview",defaultValue:{value:"100",computed:!1}},placeholder:{required:!1,tsType:{name:"string"},description:"Placeholder text",defaultValue:{value:'"Add your notes here..."',computed:!1}},rows:{required:!1,tsType:{name:"number"},description:"Number of rows for textarea",defaultValue:{value:"4",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(content: string) => void",signature:{arguments:[{type:{name:"string"},name:"content"}],return:{name:"void"}}},description:"Callback when content changes"},onStartEditing:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when editing starts"},onSave:{required:!1,tsType:{name:"signature",type:"function",raw:"(content: string) => void",signature:{arguments:[{type:{name:"string"},name:"content"}],return:{name:"void"}}},description:"Callback when editing ends (save)"},onCancel:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when editing is cancelled"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const me={title:"KFlow/Molecules/NoteContent",component:y,parameters:{layout:"padded"},tags:["autodocs"]},i={args:{noteId:"note-1",content:"This is a sample note content. It can contain detailed information about the topic being studied.",showFullContent:!0,onSave:n("UI:SAVE_NOTE_CONTENT"),onStartEditing:n("UI:EDIT_NOTE_CONTENT")}},c={args:{noteId:"note-2",content:"This is a much longer note content that will be truncated in the preview mode. It contains extensive information that the user has written about the topic. The full content would be shown when clicked to edit.",showFullContent:!1,previewLength:100,onSave:n("UI:SAVE_NOTE_CONTENT")}},l={args:{noteId:"note-3",content:"Edit this content...",isEditing:!0,onChange:n("onChange"),onSave:n("UI:SAVE_NOTE_CONTENT"),onCancel:n("onCancel")}},u={args:{noteId:"note-4",content:"",placeholder:"Start writing your notes here...",onSave:n("UI:SAVE_NOTE_CONTENT")}},d={args:{noteId:"note-5",content:`# Photosynthesis Notes

Photosynthesis is the process by which plants convert light energy into chemical energy.

## Key Points:
1. Takes place in chloroplasts
2. Uses water and carbon dioxide
3. Produces glucose and oxygen

## The Light Reactions
- Occur in thylakoid membranes
- Convert light energy to ATP and NADPH
- Split water molecules (photolysis)

## The Calvin Cycle
- Occurs in the stroma
- Uses ATP and NADPH from light reactions
- Fixes CO2 into glucose

## Important Equations
6CO2 + 6H2O + light energy → C6H12O6 + 6O2`,showFullContent:!0,rows:10,onSave:n("UI:SAVE_NOTE_CONTENT")}},h={args:{noteId:"note-6",content:"This content will be truncated at a custom length. Only the first 50 characters will be shown in preview mode.",showFullContent:!1,previewLength:50,onSave:n("UI:SAVE_NOTE_CONTENT")}};var x,A,P;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    noteId: "note-1",
    content: "This is a sample note content. It can contain detailed information about the topic being studied.",
    showFullContent: true,
    onSave: action("UI:SAVE_NOTE_CONTENT"),
    onStartEditing: action("UI:EDIT_NOTE_CONTENT")
  }
}`,...(P=(A=i.parameters)==null?void 0:A.docs)==null?void 0:P.source}}};var U,V,k;c.parameters={...c.parameters,docs:{...(U=c.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    noteId: "note-2",
    content: "This is a much longer note content that will be truncated in the preview mode. It contains extensive information that the user has written about the topic. The full content would be shown when clicked to edit.",
    showFullContent: false,
    previewLength: 100,
    onSave: action("UI:SAVE_NOTE_CONTENT")
  }
}`,...(k=(V=c.parameters)==null?void 0:V.docs)==null?void 0:k.source}}};var q,D,F;l.parameters={...l.parameters,docs:{...(q=l.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    noteId: "note-3",
    content: "Edit this content...",
    isEditing: true,
    onChange: action("onChange"),
    onSave: action("UI:SAVE_NOTE_CONTENT"),
    onCancel: action("onCancel")
  }
}`,...(F=(D=l.parameters)==null?void 0:D.docs)==null?void 0:F.source}}};var L,H,j;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    noteId: "note-4",
    content: "",
    placeholder: "Start writing your notes here...",
    onSave: action("UI:SAVE_NOTE_CONTENT")
  }
}`,...(j=(H=u.parameters)==null?void 0:H.docs)==null?void 0:j.source}}};var K,B,R;d.parameters={...d.parameters,docs:{...(K=d.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    noteId: "note-5",
    content: \`# Photosynthesis Notes

Photosynthesis is the process by which plants convert light energy into chemical energy.

## Key Points:
1. Takes place in chloroplasts
2. Uses water and carbon dioxide
3. Produces glucose and oxygen

## The Light Reactions
- Occur in thylakoid membranes
- Convert light energy to ATP and NADPH
- Split water molecules (photolysis)

## The Calvin Cycle
- Occurs in the stroma
- Uses ATP and NADPH from light reactions
- Fixes CO2 into glucose

## Important Equations
6CO2 + 6H2O + light energy → C6H12O6 + 6O2\`,
    showFullContent: true,
    rows: 10,
    onSave: action("UI:SAVE_NOTE_CONTENT")
  }
}`,...(R=(B=d.parameters)==null?void 0:B.docs)==null?void 0:R.source}}};var $,M,W;h.parameters={...h.parameters,docs:{...($=h.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    noteId: "note-6",
    content: "This content will be truncated at a custom length. Only the first 50 characters will be shown in preview mode.",
    showFullContent: false,
    previewLength: 50,
    onSave: action("UI:SAVE_NOTE_CONTENT")
  }
}`,...(W=(M=h.parameters)==null?void 0:M.docs)==null?void 0:W.source}}};const ge=["Default","Truncated","Editing","Empty","LongContent","CustomPreviewLength"];export{h as CustomPreviewLength,i as Default,l as Editing,u as Empty,d as LongContent,c as Truncated,ge as __namedExportsOrder,me as default};
