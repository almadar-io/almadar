import{j as r}from"./jsx-runtime-CDt2p4po.js";import{T as e}from"./ToolCallCard-q8eBO_eX.js";import"./index-GiUgBvb1.js";import"./Box-DYJzRMmP.js";import"./cn-BNf5BS2b.js";import"./Stack-DhhoTPuC.js";import"./Typography-Wmkp-g7N.js";import"./Button-Dn0472P0.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./Icon-DDCXmKGr.js";import"./lock-BpRazVO9.js";import"./share-2-BGRL1FH9.js";import"./zap-DLdLcnjT.js";import"./refresh-cw-Ocr-wooT.js";import"./external-link-k_e-i1vS.js";import"./link-Csz5KqWX.js";import"./home-JwtCVJF2.js";import"./star-D_3mxVsm.js";import"./clock-DT9ve7xf.js";import"./calendar-rGtwHcH_.js";import"./pause-BGY7Ki7b.js";import"./play-C6U2eifx.js";import"./eye-DPfPdwVp.js";import"./list-B6-UEXVq.js";import"./grid-3x3-DCQtfzd8.js";import"./filter-CMfXM6HV.js";import"./search-CCKipEn6.js";import"./settings-DBj1i3lR.js";import"./user-plus-BlQDsowZ.js";import"./users-CV1mGUsS.js";import"./user-BePscFH1.js";import"./phone-XSC4O3No.js";import"./send-CHVRrjpn.js";import"./message-circle-Yw7MGdXs.js";import"./mail-CI1Ybt8r.js";import"./download-yLSRVNFt.js";import"./file-text-DZQctV9o.js";import"./copy-B40iJsJp.js";import"./save-DyJeJ3Zl.js";import"./trash-2-ChlfdFMf.js";import"./square-pen-D7sL1yO_.js";import"./minus-CvoF9liV.js";import"./plus-jSzJaRn3.js";import"./info-CF8EgE8A.js";import"./alert-triangle-BLuUOBNm.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";import"./check-DliVttWt.js";import"./menu-DUN0as2h.js";import"./x-prXd1WI5.js";import"./arrow-left-CMPuXvFr.js";import"./arrow-right-BdVPe8wH.js";import"./chevron-up-B8qTw58L.js";import"./chevron-down-BQmz_Bpa.js";import"./chevron-left-zGYeMbNT.js";import"./chevron-right-pDF_OUfd.js";import"./AgentAvatar-74--nhR9.js";import"./Avatar-CJtPgGUU.js";import"./bot-_bS8udXs.js";import"./AgentStatusBadge-Df-Q1ir_.js";import"./Badge-CpH0PNM6.js";import"./DiffLine-CkY1GMp-.js";import"./ToolBadge-Dqa-994Y.js";const se={title:"Builder/Molecules/ToolCallCard",component:e,parameters:{layout:"padded"},tags:["autodocs"]},s={args:{tool:"read_file",args:{file_path:"/project/schema.orb"},result:"Read 125 lines",success:!0}},t={args:{tool:"write_file",args:{file_path:"/project/schema.orb",content:'{ "name": "MyProject" }'},result:"File written successfully",success:!0}},o={args:{tool:"edit_file",args:{file_path:"/project/schema.orb",old_string:'"version": "1.0.0"',new_string:'"version": "1.1.0"'},result:"Edit applied successfully",success:!0}},a={args:{tool:"bash",args:{command:"npm run build"},result:"Build completed in 3.2s",success:!0}},n={args:{tool:"bash",args:{command:"npm test"},error:"Error: 3 tests failed",success:!1}},i={args:{tool:"execute",args:{prompt:"Search for authentication patterns"},isExecuting:!0}},l={args:{tool:"edit_file",args:{file_path:"/project/config.json",old_string:`{
  "name": "OldProject",
  "version": "1.0.0"
}`,new_string:`{
  "name": "NewProject",
  "version": "2.0.0"
}`},result:"Edit applied",success:!0}},c={args:{tool:"validate",args:{schema_path:"/project/schema.orb",options:{strict:!0,warnings:!0,format:"json"}},result:{errors:0,warnings:2,valid:!0},success:!0}},p={args:{tool:"ls",args:{path:"/project"}}},m={render:()=>r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px",maxWidth:"600px"},children:[r.jsx(e,{tool:"read_file",args:{file_path:"/project/schema.orb"},result:"Read 45 lines",success:!0}),r.jsx(e,{tool:"edit_file",args:{file_path:"/project/schema.orb",old_string:"OldValue",new_string:"NewValue"},result:"1 replacement made",success:!0}),r.jsx(e,{tool:"bash",args:{command:"almadar validate schema.orb"},result:"Validation passed: 0 errors, 2 warnings",success:!0})]})},u={render:()=>r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px",maxWidth:"600px"},children:[r.jsx(e,{tool:"read_file",args:{file_path:"/project/schema.orb"},result:"Read file content",success:!0}),r.jsx(e,{tool:"edit_file",args:{file_path:"/project/schema.orb",old_string:"old",new_string:"new"},isExecuting:!0}),r.jsx(e,{tool:"bash",args:{command:"almadar validate schema.orb"}})]})};var d,g,h;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    tool: "read_file",
    args: {
      file_path: "/project/schema.orb"
    },
    result: "Read 125 lines",
    success: true
  }
}`,...(h=(g=s.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var f,_,x;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    tool: "write_file",
    args: {
      file_path: "/project/schema.orb",
      content: '{ "name": "MyProject" }'
    },
    result: "File written successfully",
    success: true
  }
}`,...(x=(_=t.parameters)==null?void 0:_.docs)==null?void 0:x.source}}};var j,b,w;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    tool: "edit_file",
    args: {
      file_path: "/project/schema.orb",
      old_string: '"version": "1.0.0"',
      new_string: '"version": "1.1.0"'
    },
    result: "Edit applied successfully",
    success: true
  }
}`,...(w=(b=o.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var v,E,C;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    tool: "bash",
    args: {
      command: "npm run build"
    },
    result: "Build completed in 3.2s",
    success: true
  }
}`,...(C=(E=a.parameters)==null?void 0:E.docs)==null?void 0:C.source}}};var S,T,y;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    tool: "bash",
    args: {
      command: "npm test"
    },
    error: "Error: 3 tests failed",
    success: false
  }
}`,...(y=(T=n.parameters)==null?void 0:T.docs)==null?void 0:y.source}}};var R,W,D;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    tool: "execute",
    args: {
      prompt: "Search for authentication patterns"
    },
    isExecuting: true
  }
}`,...(D=(W=i.parameters)==null?void 0:W.docs)==null?void 0:D.source}}};var N,P,V;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    tool: "edit_file",
    args: {
      file_path: "/project/config.json",
      old_string: '{\\n  "name": "OldProject",\\n  "version": "1.0.0"\\n}',
      new_string: '{\\n  "name": "NewProject",\\n  "version": "2.0.0"\\n}'
    },
    result: "Edit applied",
    success: true
  }
}`,...(V=(P=l.parameters)==null?void 0:P.docs)==null?void 0:V.source}}};var B,M,O;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    tool: "validate",
    args: {
      schema_path: "/project/schema.orb",
      options: {
        strict: true,
        warnings: true,
        format: "json"
      }
    },
    result: {
      errors: 0,
      warnings: 2,
      valid: true
    },
    success: true
  }
}`,...(O=(M=c.parameters)==null?void 0:M.docs)==null?void 0:O.source}}};var q,A,F;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    tool: "ls",
    args: {
      path: "/project"
    }
  }
}`,...(F=(A=p.parameters)==null?void 0:A.docs)==null?void 0:F.source}}};var J,k,z;m.parameters={...m.parameters,docs:{...(J=m.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxWidth: "600px"
  }}>
      <ToolCallCard tool="read_file" args={{
      file_path: "/project/schema.orb"
    }} result="Read 45 lines" success={true} />
      <ToolCallCard tool="edit_file" args={{
      file_path: "/project/schema.orb",
      old_string: "OldValue",
      new_string: "NewValue"
    }} result="1 replacement made" success={true} />
      <ToolCallCard tool="bash" args={{
      command: "almadar validate schema.orb"
    }} result="Validation passed: 0 errors, 2 warnings" success={true} />
    </div>
}`,...(z=(k=m.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};var G,H,I;u.parameters={...u.parameters,docs:{...(G=u.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxWidth: "600px"
  }}>
      <ToolCallCard tool="read_file" args={{
      file_path: "/project/schema.orb"
    }} result="Read file content" success={true} />
      <ToolCallCard tool="edit_file" args={{
      file_path: "/project/schema.orb",
      old_string: "old",
      new_string: "new"
    }} isExecuting={true} />
      <ToolCallCard tool="bash" args={{
      command: "almadar validate schema.orb"
    }} />
    </div>
}`,...(I=(H=u.parameters)==null?void 0:H.docs)==null?void 0:I.source}}};const te=["ReadTool","WriteTool","EditTool","BashTool","ErrorState","ExecutingState","JsonEditWithDiff","WithComplexArgs","NoResult","MultipleToolCalls","ExecutionSequence"];export{a as BashTool,o as EditTool,n as ErrorState,i as ExecutingState,u as ExecutionSequence,l as JsonEditWithDiff,m as MultipleToolCalls,p as NoResult,s as ReadTool,c as WithComplexArgs,t as WriteTool,te as __namedExportsOrder,se as default};
