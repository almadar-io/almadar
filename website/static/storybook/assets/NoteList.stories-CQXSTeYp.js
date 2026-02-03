import{a as t}from"./index-B-lxVbXh.js";import{j as e}from"./jsx-runtime-CDt2p4po.js";import{B as h}from"./Box-DYJzRMmP.js";import{V as S}from"./Stack-1XI3stiC.js";import{T as O}from"./Typography-Wmkp-g7N.js";import{S as ee}from"./Spinner-vF2DJrH5.js";import{N as te}from"./NoteListItem-GMVb0Gkv.js";import{u as ne}from"./useEventBus-BNZMNlv8.js";import"./v4-CtRu48qb.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./Button-B7t-_IKa.js";import"./Badge-Dd4QqFOk.js";import"./Icon-T0wFb734.js";import"./lock-BpRazVO9.js";import"./share-2-BGRL1FH9.js";import"./zap-DLdLcnjT.js";import"./refresh-cw-Ocr-wooT.js";import"./external-link-k_e-i1vS.js";import"./link-Csz5KqWX.js";import"./home-JwtCVJF2.js";import"./star-D_3mxVsm.js";import"./clock-DT9ve7xf.js";import"./calendar-rGtwHcH_.js";import"./pause-BGY7Ki7b.js";import"./play-C6U2eifx.js";import"./eye-DPfPdwVp.js";import"./list-B6-UEXVq.js";import"./grid-3x3-DCQtfzd8.js";import"./filter-CMfXM6HV.js";import"./search-CCKipEn6.js";import"./settings-DBj1i3lR.js";import"./user-plus-BlQDsowZ.js";import"./users-CV1mGUsS.js";import"./user-BePscFH1.js";import"./phone-XSC4O3No.js";import"./send-CHVRrjpn.js";import"./message-circle-Yw7MGdXs.js";import"./mail-CI1Ybt8r.js";import"./download-yLSRVNFt.js";import"./file-text-DZQctV9o.js";import"./copy-B40iJsJp.js";import"./save-DyJeJ3Zl.js";import"./trash-2-ChlfdFMf.js";import"./square-pen-D7sL1yO_.js";import"./minus-CvoF9liV.js";import"./plus-jSzJaRn3.js";import"./info-CF8EgE8A.js";import"./alert-triangle-BLuUOBNm.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";import"./check-DliVttWt.js";import"./menu-DUN0as2h.js";import"./x-prXd1WI5.js";import"./arrow-left-CMPuXvFr.js";import"./arrow-right-BdVPe8wH.js";import"./chevron-up-B8qTw58L.js";import"./chevron-down-BQmz_Bpa.js";import"./chevron-left-zGYeMbNT.js";import"./chevron-right-pDF_OUfd.js";import"./Card-BNT5PrJ5.js";import"./pen-DNARvM59.js";const J=({note:o,notes:n,selectedNoteId:i,showFullContent:l,onSelectNote:a,onDeleteNote:d,onEditNote:c,onToggleExpand:p,onAddChild:m,depth:g})=>{const u=n.filter(r=>r.parentId===o.id);return e.jsx(te,{note:{...o,hasChildren:u.length>0},isSelected:i===o.id,depth:g,showFullContent:l,onSelect:a,onDelete:d,onEdit:c,onToggleExpand:p,onAddChild:m,children:o.isExpanded&&u.map(r=>e.jsx(J,{note:r,notes:n,selectedNoteId:i,showFullContent:l,onSelectNote:a,onDeleteNote:d,onEditNote:c,onToggleExpand:p,onAddChild:m,depth:g+1},r.id))})},D=({notes:o,selectedNoteId:n,showFullContent:i=!1,isLoading:l=!1,error:a=null,onSelectNote:d,onDeleteNote:c,onEditNote:p,onToggleExpand:m,onAddChild:g,emptyMessage:u="No notes yet. Create one to get started!",className:r})=>{if(ne(),l)return e.jsx(h,{className:`flex items-center justify-center py-12 ${r||""}`,children:e.jsxs(S,{gap:"md",align:"center",children:[e.jsx(ee,{size:"lg"}),e.jsx(O,{variant:"body",className:"text-gray-500",children:"Loading notes..."})]})});if(a)return e.jsx(h,{className:`py-8 ${r||""}`,children:e.jsxs(O,{variant:"body",className:"text-red-500 text-center",children:["Error loading notes: ",a.message]})});if(o.length===0)return e.jsx(h,{className:`py-12 ${r||""}`,children:e.jsx(S,{gap:"md",align:"center",children:e.jsx(O,{variant:"body",className:"text-gray-500 text-center",children:u})})});const Y=o.filter(s=>!s.parentId||s.level===0);return e.jsx(h,{className:r,children:e.jsx(S,{gap:"sm",children:Y.map(s=>e.jsx(J,{note:s,notes:o,selectedNoteId:n,showFullContent:i,onSelectNote:d,onDeleteNote:c,onEditNote:p,onToggleExpand:m,onAddChild:g,depth:0},s.id))})})};D.displayName="NoteList";D.__docgenInfo={description:"",methods:[],displayName:"NoteList",props:{notes:{required:!0,tsType:{name:"Array",elements:[{name:"NoteData"}],raw:"NoteData[]"},description:"Array of notes to display"},selectedNoteId:{required:!1,tsType:{name:"string"},description:"Currently selected note ID"},showFullContent:{required:!1,tsType:{name:"boolean"},description:"Show full content in items",defaultValue:{value:"false",computed:!1}},isLoading:{required:!1,tsType:{name:"boolean"},description:"Loading state",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"union",raw:"Error | null",elements:[{name:"Error"},{name:"null"}]},description:"Error state",defaultValue:{value:"null",computed:!1}},onSelectNote:{required:!1,tsType:{name:"signature",type:"function",raw:"(note: NoteData) => void",signature:{arguments:[{type:{name:"NoteData"},name:"note"}],return:{name:"void"}}},description:"Callback when note is selected"},onDeleteNote:{required:!1,tsType:{name:"signature",type:"function",raw:"(noteId: string) => void",signature:{arguments:[{type:{name:"string"},name:"noteId"}],return:{name:"void"}}},description:"Callback when note is deleted"},onEditNote:{required:!1,tsType:{name:"signature",type:"function",raw:"(note: NoteData) => void",signature:{arguments:[{type:{name:"NoteData"},name:"note"}],return:{name:"void"}}},description:"Callback when note edit is requested"},onToggleExpand:{required:!1,tsType:{name:"signature",type:"function",raw:"(noteId: string) => void",signature:{arguments:[{type:{name:"string"},name:"noteId"}],return:{name:"void"}}},description:"Callback when note expand is toggled"},onAddChild:{required:!1,tsType:{name:"signature",type:"function",raw:"(parentNoteId: string) => void",signature:{arguments:[{type:{name:"string"},name:"parentNoteId"}],return:{name:"void"}}},description:"Callback when add child is clicked"},emptyMessage:{required:!1,tsType:{name:"string"},description:"Empty state message",defaultValue:{value:'"No notes yet. Create one to get started!"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const gt={title:"KFlow/Organisms/NoteList",component:D,parameters:{layout:"padded"},tags:["autodocs"]},Q=[{id:"note-1",title:"Photosynthesis Overview",content:"The process by which plants convert light energy into chemical energy.",tags:["biology","plants"],level:0,hasChildren:!0,isExpanded:!0,updatedAt:"2024-01-15T10:30:00Z"},{id:"note-2",title:"Light Reactions",content:"Occurs in the thylakoid membrane. Produces ATP and NADPH.",tags:["detail"],level:1,hasChildren:!1,updatedAt:"2024-01-15T11:00:00Z"},{id:"note-3",title:"Calvin Cycle",content:"Occurs in the stroma. Uses ATP and NADPH to fix CO2.",tags:["detail"],level:1,hasChildren:!1,updatedAt:"2024-01-15T11:30:00Z"},{id:"note-4",title:"Cellular Respiration",content:"The reverse process - converting glucose back to energy.",tags:["biology","energy"],level:0,hasChildren:!1,updatedAt:"2024-01-16T09:00:00Z"}],N={args:{notes:Q,selectedNoteId:void 0,onSelectNote:t("UI:SELECT_NOTE"),onDeleteNote:t("UI:DELETE_NOTE"),onEditNote:t("UI:EDIT_NOTE"),onToggleExpand:t("UI:EXPAND_NOTE"),onAddChild:t("UI:ADD_CHILD_NOTE")}},E={args:{notes:Q,selectedNoteId:"note-2",onSelectNote:t("UI:SELECT_NOTE"),onDeleteNote:t("UI:DELETE_NOTE"),onEditNote:t("UI:EDIT_NOTE")}},y={args:{notes:[],isLoading:!0}},T={args:{notes:[],error:new globalThis.Error("Failed to load notes. Please try again.")}},f={args:{notes:[],emptyMessage:"No notes found. Click the button above to create your first note!"}},C={args:{notes:[{id:"flat-1",title:"First Note",content:"This is the first note in a flat list.",tags:["general"],level:0},{id:"flat-2",title:"Second Note",content:"This is the second note.",tags:["general"],level:0},{id:"flat-3",title:"Third Note",content:"This is the third note.",tags:["general"],level:0}],onSelectNote:t("UI:SELECT_NOTE")}},v={args:{notes:Array.from({length:10},(o,n)=>({id:`note-${n}`,title:`Note ${n+1}`,content:`This is the content of note ${n+1}. It contains some sample text.`,tags:n%2===0?["even"]:["odd"],level:0,hasChildren:!1,updatedAt:new Date(Date.now()-n*864e5).toISOString()})),onSelectNote:t("UI:SELECT_NOTE"),onDeleteNote:t("UI:DELETE_NOTE")}},I={args:{notes:[{id:"long-1",title:"Detailed Notes",content:`# Photosynthesis

Photosynthesis is the process used by plants, algae, and certain bacteria to convert light energy into chemical energy.

## Key Components
- Chlorophyll (green pigment)
- Water (H2O)
- Carbon dioxide (CO2)
- Sunlight

## The Process
1. Light absorption by chlorophyll
2. Water splitting (photolysis)
3. Carbon fixation (Calvin cycle)

## Equation
6CO2 + 6H2O + light → C6H12O6 + 6O2`,tags:["biology","comprehensive"],level:0}],showFullContent:!0,onSelectNote:t("UI:SELECT_NOTE")}};var x,b,L;N.parameters={...N.parameters,docs:{...(x=N.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    notes: sampleNotes,
    selectedNoteId: undefined,
    onSelectNote: action("UI:SELECT_NOTE"),
    onDeleteNote: action("UI:DELETE_NOTE"),
    onEditNote: action("UI:EDIT_NOTE"),
    onToggleExpand: action("UI:EXPAND_NOTE"),
    onAddChild: action("UI:ADD_CHILD_NOTE")
  }
}`,...(L=(b=N.parameters)==null?void 0:b.docs)==null?void 0:L.source}}};var _,w,U;E.parameters={...E.parameters,docs:{...(_=E.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    notes: sampleNotes,
    selectedNoteId: "note-2",
    onSelectNote: action("UI:SELECT_NOTE"),
    onDeleteNote: action("UI:DELETE_NOTE"),
    onEditNote: action("UI:EDIT_NOTE")
  }
}`,...(U=(w=E.parameters)==null?void 0:w.docs)==null?void 0:U.source}}};var A,j,P;y.parameters={...y.parameters,docs:{...(A=y.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    notes: [],
    isLoading: true
  }
}`,...(P=(j=y.parameters)==null?void 0:j.docs)==null?void 0:P.source}}};var q,k,F;T.parameters={...T.parameters,docs:{...(q=T.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    notes: [],
    error: new globalThis.Error("Failed to load notes. Please try again.")
  }
}`,...(F=(k=T.parameters)==null?void 0:k.docs)==null?void 0:F.source}}};var H,$,V;f.parameters={...f.parameters,docs:{...(H=f.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    notes: [],
    emptyMessage: "No notes found. Click the button above to create your first note!"
  }
}`,...(V=($=f.parameters)==null?void 0:$.docs)==null?void 0:V.source}}};var W,M,Z;C.parameters={...C.parameters,docs:{...(W=C.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    notes: [{
      id: "flat-1",
      title: "First Note",
      content: "This is the first note in a flat list.",
      tags: ["general"],
      level: 0
    }, {
      id: "flat-2",
      title: "Second Note",
      content: "This is the second note.",
      tags: ["general"],
      level: 0
    }, {
      id: "flat-3",
      title: "Third Note",
      content: "This is the third note.",
      tags: ["general"],
      level: 0
    }],
    onSelectNote: action("UI:SELECT_NOTE")
  }
}`,...(Z=(M=C.parameters)==null?void 0:M.docs)==null?void 0:Z.source}}};var B,K,R;v.parameters={...v.parameters,docs:{...(B=v.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    notes: Array.from({
      length: 10
    }, (_, i) => ({
      id: \`note-\${i}\`,
      title: \`Note \${i + 1}\`,
      content: \`This is the content of note \${i + 1}. It contains some sample text.\`,
      tags: i % 2 === 0 ? ["even"] : ["odd"],
      level: 0,
      hasChildren: false,
      updatedAt: new Date(Date.now() - i * 86400000).toISOString()
    })),
    onSelectNote: action("UI:SELECT_NOTE"),
    onDeleteNote: action("UI:DELETE_NOTE")
  }
}`,...(R=(K=v.parameters)==null?void 0:K.docs)==null?void 0:R.source}}};var X,z,G;I.parameters={...I.parameters,docs:{...(X=I.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    notes: [{
      id: "long-1",
      title: "Detailed Notes",
      content: \`# Photosynthesis

Photosynthesis is the process used by plants, algae, and certain bacteria to convert light energy into chemical energy.

## Key Components
- Chlorophyll (green pigment)
- Water (H2O)
- Carbon dioxide (CO2)
- Sunlight

## The Process
1. Light absorption by chlorophyll
2. Water splitting (photolysis)
3. Carbon fixation (Calvin cycle)

## Equation
6CO2 + 6H2O + light → C6H12O6 + 6O2\`,
      tags: ["biology", "comprehensive"],
      level: 0
    }],
    showFullContent: true,
    onSelectNote: action("UI:SELECT_NOTE")
  }
}`,...(G=(z=I.parameters)==null?void 0:z.docs)==null?void 0:G.source}}};const ut=["Default","WithSelection","Loading","ErrorState","Empty","FlatList","ManyNotes","ShowFullContent"];export{N as Default,f as Empty,T as ErrorState,C as FlatList,y as Loading,v as ManyNotes,I as ShowFullContent,E as WithSelection,ut as __namedExportsOrder,gt as default};
