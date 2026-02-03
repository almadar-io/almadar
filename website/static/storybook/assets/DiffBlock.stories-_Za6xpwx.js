import{j as t}from"./jsx-runtime-CDt2p4po.js";import{D as p}from"./DiffBlock-CliQOBTk.js";import"./index-GiUgBvb1.js";import"./Box-DYJzRMmP.js";import"./cn-BNf5BS2b.js";import"./Stack-DhhoTPuC.js";import"./Typography-Wmkp-g7N.js";import"./Icon-DDCXmKGr.js";import"./createLucideIcon-CbHznvEr.js";import"./lock-BpRazVO9.js";import"./share-2-BGRL1FH9.js";import"./zap-DLdLcnjT.js";import"./refresh-cw-Ocr-wooT.js";import"./external-link-k_e-i1vS.js";import"./link-Csz5KqWX.js";import"./home-JwtCVJF2.js";import"./star-D_3mxVsm.js";import"./clock-DT9ve7xf.js";import"./calendar-rGtwHcH_.js";import"./pause-BGY7Ki7b.js";import"./play-C6U2eifx.js";import"./eye-DPfPdwVp.js";import"./list-B6-UEXVq.js";import"./grid-3x3-DCQtfzd8.js";import"./filter-CMfXM6HV.js";import"./search-CCKipEn6.js";import"./settings-DBj1i3lR.js";import"./user-plus-BlQDsowZ.js";import"./users-CV1mGUsS.js";import"./user-BePscFH1.js";import"./phone-XSC4O3No.js";import"./send-CHVRrjpn.js";import"./message-circle-Yw7MGdXs.js";import"./mail-CI1Ybt8r.js";import"./download-yLSRVNFt.js";import"./file-text-DZQctV9o.js";import"./copy-B40iJsJp.js";import"./save-DyJeJ3Zl.js";import"./trash-2-ChlfdFMf.js";import"./square-pen-D7sL1yO_.js";import"./minus-CvoF9liV.js";import"./plus-jSzJaRn3.js";import"./loader-2-DXp1ic5P.js";import"./info-CF8EgE8A.js";import"./alert-triangle-BLuUOBNm.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";import"./check-DliVttWt.js";import"./menu-DUN0as2h.js";import"./x-prXd1WI5.js";import"./arrow-left-CMPuXvFr.js";import"./arrow-right-BdVPe8wH.js";import"./chevron-up-B8qTw58L.js";import"./chevron-down-BQmz_Bpa.js";import"./chevron-left-zGYeMbNT.js";import"./chevron-right-pDF_OUfd.js";import"./AgentAvatar-74--nhR9.js";import"./Avatar-CJtPgGUU.js";import"./bot-_bS8udXs.js";import"./AgentStatusBadge-Df-Q1ir_.js";import"./Badge-CpH0PNM6.js";import"./DiffLine-CkY1GMp-.js";import"./ToolBadge-Dqa-994Y.js";import"./file-code-yqS-aeuC.js";const qt={title:"Builder/Molecules/DiffBlock",component:p,parameters:{layout:"padded"},tags:["autodocs"]},e={args:{filePath:"schema.orb",hunks:[{oldStart:1,oldLines:4,newStart:1,newLines:4,lines:[{type:"context",content:"{"},{type:"remove",content:'  "name": "OldName",'},{type:"add",content:'  "name": "NewName",'},{type:"context",content:'  "version": "1.0.0"'},{type:"context",content:"}"}]}]}},n={args:{filePath:"traits/TaskManagement.ts",hunks:[{oldStart:1,oldLines:2,newStart:1,newLines:8,lines:[{type:"context",content:"export const TaskManagement = {"},{type:"add",content:'  name: "TaskManagement",'},{type:"add",content:"  states: ["},{type:"add",content:'    { name: "idle" },'},{type:"add",content:'    { name: "creating" },'},{type:"add",content:'    { name: "editing" },'},{type:"add",content:"  ],"},{type:"context",content:"};"}]}]}},o={args:{filePath:"deprecated/oldTrait.ts",hunks:[{oldStart:1,oldLines:4,newStart:1,newLines:0,lines:[{type:"remove",content:"// This trait is deprecated"},{type:"remove",content:"export const OldTrait = {"},{type:"remove",content:'  name: "OldTrait",'},{type:"remove",content:"};"}]}]}},r={args:{filePath:"components/TaskCard.tsx",showLineNumbers:!0,hunks:[{oldStart:1,oldLines:10,newStart:1,newLines:12,lines:[{type:"context",content:"import React from 'react';"},{type:"add",content:"import { Card } from '@/components';"},{type:"context",content:""},{type:"remove",content:"export function TaskCard({ task }) {"},{type:"add",content:"export function TaskCard({ task, onEdit }) {"},{type:"context",content:"  return ("},{type:"remove",content:"    <div className='task-card'>"},{type:"add",content:"    <Card onClick={onEdit}>"},{type:"context",content:"      {task.title}"},{type:"remove",content:"    </div>"},{type:"add",content:"    </Card>"},{type:"context",content:"  );"},{type:"context",content:"}"}]}]}},a={args:{filePath:"large-file.ts",maxHeight:150,hunks:[{oldStart:1,oldLines:10,newStart:1,newLines:12,lines:[{type:"context",content:"// Line 1"},{type:"context",content:"// Line 2"},{type:"add",content:"// New line 3"},{type:"context",content:"// Line 4"},{type:"context",content:"// Line 5"},{type:"remove",content:"// Old line 6"},{type:"add",content:"// New line 6"},{type:"context",content:"// Line 7"},{type:"context",content:"// Line 8"}]}]}},s={render:()=>t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[t.jsx(p,{filePath:"schema.orb",hunks:[{oldStart:1,oldLines:3,newStart:1,newLines:3,lines:[{type:"context",content:'  "name": "TaskManager",'},{type:"remove",content:'  "version": "1.0.0",'},{type:"add",content:'  "version": "1.1.0",'}]}]}),t.jsx(p,{filePath:"orbitals/TaskOrbital.ts",hunks:[{oldStart:1,oldLines:0,newStart:1,newLines:4,lines:[{type:"add",content:"// New almadar added"},{type:"add",content:"export const TaskOrbital = {"},{type:"add",content:'  name: "Task",'},{type:"add",content:"};"}]}]}),t.jsx(p,{filePath:"pages/index.ts",hunks:[{oldStart:1,oldLines:1,newStart:1,newLines:2,lines:[{type:"context",content:"export * from './Dashboard';"},{type:"add",content:"export * from './TaskList';"}]}]})]})},i={args:{filePath:"empty.ts",hunks:[]}};var c,d,m;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    filePath: "schema.orb",
    hunks: [{
      oldStart: 1,
      oldLines: 4,
      newStart: 1,
      newLines: 4,
      lines: [{
        type: "context",
        content: "{"
      }, {
        type: "remove",
        content: '  "name": "OldName",'
      }, {
        type: "add",
        content: '  "name": "NewName",'
      }, {
        type: "context",
        content: '  "version": "1.0.0"'
      }, {
        type: "context",
        content: "}"
      }]
    }]
  }
}`,...(m=(d=e.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var l,y,x;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    filePath: "traits/TaskManagement.ts",
    hunks: [{
      oldStart: 1,
      oldLines: 2,
      newStart: 1,
      newLines: 8,
      lines: [{
        type: "context",
        content: "export const TaskManagement = {"
      }, {
        type: "add",
        content: '  name: "TaskManagement",'
      }, {
        type: "add",
        content: "  states: ["
      }, {
        type: "add",
        content: '    { name: "idle" },'
      }, {
        type: "add",
        content: '    { name: "creating" },'
      }, {
        type: "add",
        content: '    { name: "editing" },'
      }, {
        type: "add",
        content: "  ],"
      }, {
        type: "context",
        content: "};"
      }]
    }]
  }
}`,...(x=(y=n.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var u,f,k;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    filePath: "deprecated/oldTrait.ts",
    hunks: [{
      oldStart: 1,
      oldLines: 4,
      newStart: 1,
      newLines: 0,
      lines: [{
        type: "remove",
        content: "// This trait is deprecated"
      }, {
        type: "remove",
        content: "export const OldTrait = {"
      }, {
        type: "remove",
        content: '  name: "OldTrait",'
      }, {
        type: "remove",
        content: "};"
      }]
    }]
  }
}`,...(k=(f=o.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var h,L,g;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    filePath: "components/TaskCard.tsx",
    showLineNumbers: true,
    hunks: [{
      oldStart: 1,
      oldLines: 10,
      newStart: 1,
      newLines: 12,
      lines: [{
        type: "context",
        content: "import React from 'react';"
      }, {
        type: "add",
        content: "import { Card } from '@/components';"
      }, {
        type: "context",
        content: ""
      }, {
        type: "remove",
        content: "export function TaskCard({ task }) {"
      }, {
        type: "add",
        content: "export function TaskCard({ task, onEdit }) {"
      }, {
        type: "context",
        content: "  return ("
      }, {
        type: "remove",
        content: "    <div className='task-card'>"
      }, {
        type: "add",
        content: "    <Card onClick={onEdit}>"
      }, {
        type: "context",
        content: "      {task.title}"
      }, {
        type: "remove",
        content: "    </div>"
      }, {
        type: "add",
        content: "    </Card>"
      }, {
        type: "context",
        content: "  );"
      }, {
        type: "context",
        content: "}"
      }]
    }]
  }
}`,...(g=(L=r.parameters)==null?void 0:L.docs)==null?void 0:g.source}}};var w,S,v;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    filePath: "large-file.ts",
    maxHeight: 150,
    hunks: [{
      oldStart: 1,
      oldLines: 10,
      newStart: 1,
      newLines: 12,
      lines: [{
        type: "context",
        content: "// Line 1"
      }, {
        type: "context",
        content: "// Line 2"
      }, {
        type: "add",
        content: "// New line 3"
      }, {
        type: "context",
        content: "// Line 4"
      }, {
        type: "context",
        content: "// Line 5"
      }, {
        type: "remove",
        content: "// Old line 6"
      }, {
        type: "add",
        content: "// New line 6"
      }, {
        type: "context",
        content: "// Line 7"
      }, {
        type: "context",
        content: "// Line 8"
      }]
    }]
  }
}`,...(v=(S=a.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};var T,b,N;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  }}>
      <DiffBlock filePath="schema.orb" hunks={[{
      oldStart: 1,
      oldLines: 3,
      newStart: 1,
      newLines: 3,
      lines: [{
        type: "context",
        content: '  "name": "TaskManager",'
      }, {
        type: "remove",
        content: '  "version": "1.0.0",'
      }, {
        type: "add",
        content: '  "version": "1.1.0",'
      }]
    }]} />
      <DiffBlock filePath="orbitals/TaskOrbital.ts" hunks={[{
      oldStart: 1,
      oldLines: 0,
      newStart: 1,
      newLines: 4,
      lines: [{
        type: "add",
        content: "// New almadar added"
      }, {
        type: "add",
        content: "export const TaskOrbital = {"
      }, {
        type: "add",
        content: '  name: "Task",'
      }, {
        type: "add",
        content: "};"
      }]
    }]} />
      <DiffBlock filePath="pages/index.ts" hunks={[{
      oldStart: 1,
      oldLines: 1,
      newStart: 1,
      newLines: 2,
      lines: [{
        type: "context",
        content: "export * from './Dashboard';"
      }, {
        type: "add",
        content: "export * from './TaskList';"
      }]
    }]} />
    </div>
}`,...(N=(b=s.parameters)==null?void 0:b.docs)==null?void 0:N.source}}};var P,O,D;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    filePath: "empty.ts",
    hunks: []
  }
}`,...(D=(O=i.parameters)==null?void 0:O.docs)==null?void 0:D.source}}};const zt=["Default","AdditionsOnly","RemovalsOnly","WithLineNumbers","LimitedHeight","MultipleDiffs","EmptyDiff"];export{n as AdditionsOnly,e as Default,i as EmptyDiff,a as LimitedHeight,s as MultipleDiffs,o as RemovalsOnly,r as WithLineNumbers,zt as __namedExportsOrder,qt as default};
