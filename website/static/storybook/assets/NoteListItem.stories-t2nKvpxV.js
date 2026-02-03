import{j as o}from"./jsx-runtime-CDt2p4po.js";import{a as e}from"./index-B-lxVbXh.js";import{N as n}from"./NoteListItem-D0jXF2q7.js";import"./index-GiUgBvb1.js";import"./v4-CtRu48qb.js";import"./Box-DYJzRMmP.js";import"./cn-BNf5BS2b.js";import"./Button-Dn0472P0.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./Badge-CpH0PNM6.js";import"./Typography-Wmkp-g7N.js";import"./Icon-DDCXmKGr.js";import"./lock-BpRazVO9.js";import"./share-2-BGRL1FH9.js";import"./zap-DLdLcnjT.js";import"./refresh-cw-Ocr-wooT.js";import"./external-link-k_e-i1vS.js";import"./link-Csz5KqWX.js";import"./home-JwtCVJF2.js";import"./star-D_3mxVsm.js";import"./clock-DT9ve7xf.js";import"./calendar-rGtwHcH_.js";import"./pause-BGY7Ki7b.js";import"./play-C6U2eifx.js";import"./eye-DPfPdwVp.js";import"./list-B6-UEXVq.js";import"./grid-3x3-DCQtfzd8.js";import"./filter-CMfXM6HV.js";import"./search-CCKipEn6.js";import"./settings-DBj1i3lR.js";import"./user-plus-BlQDsowZ.js";import"./users-CV1mGUsS.js";import"./user-BePscFH1.js";import"./phone-XSC4O3No.js";import"./send-CHVRrjpn.js";import"./message-circle-Yw7MGdXs.js";import"./mail-CI1Ybt8r.js";import"./download-yLSRVNFt.js";import"./file-text-DZQctV9o.js";import"./copy-B40iJsJp.js";import"./save-DyJeJ3Zl.js";import"./trash-2-ChlfdFMf.js";import"./square-pen-D7sL1yO_.js";import"./minus-CvoF9liV.js";import"./plus-jSzJaRn3.js";import"./info-CF8EgE8A.js";import"./alert-triangle-BLuUOBNm.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";import"./check-DliVttWt.js";import"./menu-DUN0as2h.js";import"./x-prXd1WI5.js";import"./arrow-left-CMPuXvFr.js";import"./arrow-right-BdVPe8wH.js";import"./chevron-up-B8qTw58L.js";import"./chevron-down-BQmz_Bpa.js";import"./chevron-left-zGYeMbNT.js";import"./chevron-right-pDF_OUfd.js";import"./Card-BNT5PrJ5.js";import"./Stack-DhhoTPuC.js";import"./useEventBus-BNZMNlv8.js";import"./pen-DNARvM59.js";const et={title:"KFlow/Molecules/NoteListItem",component:n,parameters:{layout:"padded"},tags:["autodocs"]},t={id:"note-1",title:"Introduction to Photosynthesis",content:"Photosynthesis is the process by which plants convert light energy into chemical energy. This is fundamental to life on Earth.",tags:["biology","plants","energy"],level:0,isExpanded:!0,hasChildren:!1,updatedAt:"2024-01-15T10:30:00Z"},s={args:{note:t,isSelected:!1,onSelect:e("UI:SELECT_NOTE"),onDelete:e("UI:DELETE_NOTE"),onEdit:e("UI:EDIT_NOTE")}},r={args:{note:t,isSelected:!0,onSelect:e("UI:SELECT_NOTE"),onDelete:e("UI:DELETE_NOTE"),onEdit:e("UI:EDIT_NOTE")}},a={args:{note:{...t,hasChildren:!0,isExpanded:!0},isSelected:!1,onSelect:e("UI:SELECT_NOTE"),onToggleExpand:e("UI:EXPAND_NOTE"),onAddChild:e("UI:ADD_CHILD_NOTE")},render:Z=>o.jsxs(n,{...Z,children:[o.jsx(n,{note:{id:"child-1",title:"Light Reactions",content:"The first stage of photosynthesis occurs in the thylakoid.",tags:["detail"],level:1},depth:1,onSelect:e("UI:SELECT_NOTE")}),o.jsx(n,{note:{id:"child-2",title:"Calvin Cycle",content:"The second stage occurs in the stroma.",tags:["detail"],level:1},depth:1,onSelect:e("UI:SELECT_NOTE")})]})},i={args:{note:{...t,hasChildren:!0,isExpanded:!1},isSelected:!1,onToggleExpand:e("UI:EXPAND_NOTE")}},l={args:{note:{...t,content:"This is a much longer note content that demonstrates how the component handles text that exceeds the preview limit. The content will be truncated in the default view mode and only show the first 100 characters followed by an ellipsis to indicate there is more content available."},showFullContent:!1,onSelect:e("UI:SELECT_NOTE")}},c={args:{note:{...t,content:"This is a much longer note content that demonstrates how the component handles text when showFullContent is true. All of the content will be displayed without truncation."},showFullContent:!0,onSelect:e("UI:SELECT_NOTE")}},d={args:{note:{...t,tags:[]},onSelect:e("UI:SELECT_NOTE")}},p={args:{note:{...t,tags:["biology","plants","energy","chlorophyll","glucose","oxygen","carbon-dioxide"]},onSelect:e("UI:SELECT_NOTE")}},m={args:{note:{...t,content:""},onSelect:e("UI:SELECT_NOTE")}},h={render:()=>o.jsx("div",{className:"space-y-2",children:o.jsx(n,{note:{id:"root",title:"Root Note",content:"This is the top level note.",hasChildren:!0,isExpanded:!0},depth:0,onSelect:e("select-root"),onToggleExpand:e("expand-root"),children:o.jsx(n,{note:{id:"level-1",title:"Level 1 Note",content:"First level child.",hasChildren:!0,isExpanded:!0},depth:1,onSelect:e("select-level-1"),onToggleExpand:e("expand-level-1"),children:o.jsx(n,{note:{id:"level-2",title:"Level 2 Note",content:"Second level child.",hasChildren:!1},depth:2,onSelect:e("select-level-2")})})})})};var E,T,u;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    note: sampleNote,
    isSelected: false,
    onSelect: action("UI:SELECT_NOTE"),
    onDelete: action("UI:DELETE_NOTE"),
    onEdit: action("UI:EDIT_NOTE")
  }
}`,...(u=(T=s.parameters)==null?void 0:T.docs)==null?void 0:u.source}}};var g,N,S;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    note: sampleNote,
    isSelected: true,
    onSelect: action("UI:SELECT_NOTE"),
    onDelete: action("UI:DELETE_NOTE"),
    onEdit: action("UI:EDIT_NOTE")
  }
}`,...(S=(N=r.parameters)==null?void 0:N.docs)==null?void 0:S.source}}};var C,I,L;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    note: {
      ...sampleNote,
      hasChildren: true,
      isExpanded: true
    },
    isSelected: false,
    onSelect: action("UI:SELECT_NOTE"),
    onToggleExpand: action("UI:EXPAND_NOTE"),
    onAddChild: action("UI:ADD_CHILD_NOTE")
  },
  render: args => <NoteListItem {...args}>
      <NoteListItem note={{
      id: "child-1",
      title: "Light Reactions",
      content: "The first stage of photosynthesis occurs in the thylakoid.",
      tags: ["detail"],
      level: 1
    }} depth={1} onSelect={action("UI:SELECT_NOTE")} />
      <NoteListItem note={{
      id: "child-2",
      title: "Calvin Cycle",
      content: "The second stage occurs in the stroma.",
      tags: ["detail"],
      level: 1
    }} depth={1} onSelect={action("UI:SELECT_NOTE")} />
    </NoteListItem>
}`,...(L=(I=a.parameters)==null?void 0:I.docs)==null?void 0:L.source}}};var x,_,v;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    note: {
      ...sampleNote,
      hasChildren: true,
      isExpanded: false
    },
    isSelected: false,
    onToggleExpand: action("UI:EXPAND_NOTE")
  }
}`,...(v=(_=i.parameters)==null?void 0:_.docs)==null?void 0:v.source}}};var y,O,U;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    note: {
      ...sampleNote,
      content: "This is a much longer note content that demonstrates how the component handles text that exceeds the preview limit. The content will be truncated in the default view mode and only show the first 100 characters followed by an ellipsis to indicate there is more content available."
    },
    showFullContent: false,
    onSelect: action("UI:SELECT_NOTE")
  }
}`,...(U=(O=l.parameters)==null?void 0:O.docs)==null?void 0:U.source}}};var f,w,D;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    note: {
      ...sampleNote,
      content: "This is a much longer note content that demonstrates how the component handles text when showFullContent is true. All of the content will be displayed without truncation."
    },
    showFullContent: true,
    onSelect: action("UI:SELECT_NOTE")
  }
}`,...(D=(w=c.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};var b,A,F;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    note: {
      ...sampleNote,
      tags: []
    },
    onSelect: action("UI:SELECT_NOTE")
  }
}`,...(F=(A=d.parameters)==null?void 0:A.docs)==null?void 0:F.source}}};var j,P,R;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    note: {
      ...sampleNote,
      tags: ["biology", "plants", "energy", "chlorophyll", "glucose", "oxygen", "carbon-dioxide"]
    },
    onSelect: action("UI:SELECT_NOTE")
  }
}`,...(R=(P=p.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};var H,X,M;m.parameters={...m.parameters,docs:{...(H=m.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    note: {
      ...sampleNote,
      content: ""
    },
    onSelect: action("UI:SELECT_NOTE")
  }
}`,...(M=(X=m.parameters)==null?void 0:X.docs)==null?void 0:M.source}}};var k,W,K;h.parameters={...h.parameters,docs:{...(k=h.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div className="space-y-2">
      <NoteListItem note={{
      id: "root",
      title: "Root Note",
      content: "This is the top level note.",
      hasChildren: true,
      isExpanded: true
    }} depth={0} onSelect={action("select-root")} onToggleExpand={action("expand-root")}>
        <NoteListItem note={{
        id: "level-1",
        title: "Level 1 Note",
        content: "First level child.",
        hasChildren: true,
        isExpanded: true
      }} depth={1} onSelect={action("select-level-1")} onToggleExpand={action("expand-level-1")}>
          <NoteListItem note={{
          id: "level-2",
          title: "Level 2 Note",
          content: "Second level child.",
          hasChildren: false
        }} depth={2} onSelect={action("select-level-2")} />
        </NoteListItem>
      </NoteListItem>
    </div>
}`,...(K=(W=h.parameters)==null?void 0:W.docs)==null?void 0:K.source}}};const tt=["Default","Selected","WithChildren","Collapsed","LongContent","FullContent","NoTags","ManyTags","EmptyContent","NestedHierarchy"];export{i as Collapsed,s as Default,m as EmptyContent,c as FullContent,l as LongContent,p as ManyTags,h as NestedHierarchy,d as NoTags,r as Selected,a as WithChildren,tt as __namedExportsOrder,et as default};
