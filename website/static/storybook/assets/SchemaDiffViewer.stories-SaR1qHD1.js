import{S as B}from"./SchemaDiffViewer-_buI0qAy.js";import"./jsx-runtime-CDt2p4po.js";import"./index-GiUgBvb1.js";import"./Box-DYJzRMmP.js";import"./cn-BNf5BS2b.js";import"./Stack-DhhoTPuC.js";import"./Typography-Wmkp-g7N.js";import"./Button-Dn0472P0.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./Icon-DDCXmKGr.js";import"./lock-BpRazVO9.js";import"./share-2-BGRL1FH9.js";import"./zap-DLdLcnjT.js";import"./refresh-cw-Ocr-wooT.js";import"./external-link-k_e-i1vS.js";import"./link-Csz5KqWX.js";import"./home-JwtCVJF2.js";import"./star-D_3mxVsm.js";import"./clock-DT9ve7xf.js";import"./calendar-rGtwHcH_.js";import"./pause-BGY7Ki7b.js";import"./play-C6U2eifx.js";import"./eye-DPfPdwVp.js";import"./list-B6-UEXVq.js";import"./grid-3x3-DCQtfzd8.js";import"./filter-CMfXM6HV.js";import"./search-CCKipEn6.js";import"./settings-DBj1i3lR.js";import"./user-plus-BlQDsowZ.js";import"./users-CV1mGUsS.js";import"./user-BePscFH1.js";import"./phone-XSC4O3No.js";import"./send-CHVRrjpn.js";import"./message-circle-Yw7MGdXs.js";import"./mail-CI1Ybt8r.js";import"./download-yLSRVNFt.js";import"./file-text-DZQctV9o.js";import"./copy-B40iJsJp.js";import"./save-DyJeJ3Zl.js";import"./trash-2-ChlfdFMf.js";import"./square-pen-D7sL1yO_.js";import"./minus-CvoF9liV.js";import"./plus-jSzJaRn3.js";import"./info-CF8EgE8A.js";import"./alert-triangle-BLuUOBNm.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";import"./check-DliVttWt.js";import"./menu-DUN0as2h.js";import"./x-prXd1WI5.js";import"./arrow-left-CMPuXvFr.js";import"./arrow-right-BdVPe8wH.js";import"./chevron-up-B8qTw58L.js";import"./chevron-down-BQmz_Bpa.js";import"./chevron-left-zGYeMbNT.js";import"./chevron-right-pDF_OUfd.js";import"./ChatMessage-CqaOsWr8.js";import"./AgentAvatar-74--nhR9.js";import"./Avatar-CJtPgGUU.js";import"./bot-_bS8udXs.js";import"./AgentStatusBadge-Df-Q1ir_.js";import"./Badge-CpH0PNM6.js";import"./DiffLine-CkY1GMp-.js";import"./ToolBadge-Dqa-994Y.js";import"./DiffBlock-CliQOBTk.js";import"./file-code-yqS-aeuC.js";import"./FileOperationItem-CwLyi9Qm.js";import"./Alert-mBErZifW.js";import"./book-open-Bc_pgR1e.js";import"./TodoItem-CddWQn09.js";import"./circle-CzFdAxtK.js";import"./ToolCallCard-q8eBO_eX.js";const Ut={title:"Builder/Organisms/SchemaDiffViewer",component:B,parameters:{layout:"padded"},tags:["autodocs"]},t={args:{diffs:[{id:"diff-1",filePath:"schema.orb",hunks:[{oldStart:1,oldLines:4,newStart:1,newLines:5,lines:[{type:"context",content:"{"},{type:"remove",content:'  "name": "OldProject",'},{type:"add",content:'  "name": "NewProject",'},{type:"context",content:'  "version": "1.0.0",'},{type:"add",content:'  "description": "A new description",'},{type:"context",content:"}"}]}],timestamp:Date.now(),addedLines:2,removedLines:1}],title:"Schema Changes"}},e={args:{diffs:[{id:"diff-1",filePath:"schema.orb",hunks:[{oldStart:1,oldLines:2,newStart:1,newLines:3,lines:[{type:"context",content:'  "orbitals": ['},{type:"add",content:'    { "name": "TaskManagement" },'},{type:"context",content:"  ]"}]}],timestamp:Date.now()-6e4,addedLines:1,removedLines:0},{id:"diff-2",filePath:"traits/TaskManagement.ts",hunks:[{oldStart:1,oldLines:0,newStart:1,newLines:7,lines:[{type:"add",content:"export const TaskManagement = {"},{type:"add",content:'  name: "TaskManagement",'},{type:"add",content:"  states: ["},{type:"add",content:'    { name: "idle" },'},{type:"add",content:'    { name: "creating" },'},{type:"add",content:"  ],"},{type:"add",content:"};"}]}],timestamp:Date.now()-3e4,addedLines:7,removedLines:0},{id:"diff-3",filePath:"pages/TaskList.tsx",hunks:[{oldStart:1,oldLines:0,newStart:1,newLines:5,lines:[{type:"add",content:"import { TaskManagement } from '../traits';"},{type:"add",content:""},{type:"add",content:"export function TaskListPage() {"},{type:"add",content:"  return <TaskList />;"},{type:"add",content:"}"}]}],timestamp:Date.now(),addedLines:5,removedLines:0}],title:"Project Changes"}},n={args:{diffs:[{id:"diff-1",filePath:"src/components/TaskCard.tsx",hunks:[{oldStart:1,oldLines:15,newStart:1,newLines:28,lines:[{type:"context",content:"import React from 'react';"},{type:"add",content:"import { Card, Badge, Button } from '@almadar/ui';"},{type:"remove",content:"import { Card } from './Card';"},{type:"context",content:""},{type:"context",content:"interface TaskCardProps {"},{type:"remove",content:"  title: string;"},{type:"add",content:"  task: Task;"},{type:"add",content:"  onEdit?: () => void;"},{type:"add",content:"  onDelete?: () => void;"},{type:"context",content:"}"},{type:"context",content:""},{type:"remove",content:"export function TaskCard({ title }) {"},{type:"add",content:"export function TaskCard({ task, onEdit, onDelete }) {"},{type:"context",content:"  return ("},{type:"remove",content:"    <Card>"},{type:"add",content:"    <Card variant='interactive'>"},{type:"remove",content:"      <h3>{title}</h3>"},{type:"add",content:"      <div className='flex justify-between'>"},{type:"add",content:"        <h3>{task.title}</h3>"},{type:"add",content:"        <Badge>{task.status}</Badge>"},{type:"add",content:"      </div>"},{type:"add",content:"      <p>{task.description}</p>"},{type:"add",content:"      <div className='flex gap-2 mt-4'>"},{type:"add",content:"        <Button onClick={onEdit}>Edit</Button>"},{type:"add",content:"        <Button variant='danger' onClick={onDelete}>Delete</Button>"},{type:"add",content:"      </div>"},{type:"context",content:"    </Card>"},{type:"context",content:"  );"},{type:"context",content:"}"}]}],timestamp:Date.now(),addedLines:15,removedLines:5}],title:"Component Refactoring"}},o={args:{diffs:[],title:"No Changes"}},a={args:{diffs:[{id:"diff-1",filePath:"new-feature.ts",hunks:[{oldStart:1,oldLines:0,newStart:1,newLines:4,lines:[{type:"add",content:"// New feature implementation"},{type:"add",content:"export function newFeature() {"},{type:"add",content:"  console.log('New feature!');"},{type:"add",content:"}"}]}],timestamp:Date.now(),addedLines:4,removedLines:0}],title:"New Files"}},d={args:{diffs:[{id:"diff-1",filePath:"deprecated.ts",hunks:[{oldStart:1,oldLines:4,newStart:1,newLines:0,lines:[{type:"remove",content:"// Deprecated code"},{type:"remove",content:"export function oldFunction() {"},{type:"remove",content:"  // This is no longer needed"},{type:"remove",content:"}"}]}],timestamp:Date.now(),addedLines:0,removedLines:4}],title:"Removed Files"}},i={args:{diffs:[{id:"diff-1",filePath:"schema.orb",hunks:[{oldStart:1,oldLines:1,newStart:1,newLines:2,lines:[{type:"context",content:"{"},{type:"add",content:'  "newField": true'}]}],timestamp:Date.now(),addedLines:1,removedLines:0}],title:"Schema Changes",defaultCollapsed:!0}};var r,s,p;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    diffs: [{
      id: "diff-1",
      filePath: "schema.orb",
      hunks: [{
        oldStart: 1,
        oldLines: 4,
        newStart: 1,
        newLines: 5,
        lines: [{
          type: "context",
          content: "{"
        }, {
          type: "remove",
          content: '  "name": "OldProject",'
        }, {
          type: "add",
          content: '  "name": "NewProject",'
        }, {
          type: "context",
          content: '  "version": "1.0.0",'
        }, {
          type: "add",
          content: '  "description": "A new description",'
        }, {
          type: "context",
          content: "}"
        }]
      }],
      timestamp: Date.now(),
      addedLines: 2,
      removedLines: 1
    }],
    title: "Schema Changes"
  }
}`,...(p=(s=t.parameters)==null?void 0:s.docs)==null?void 0:p.source}}};var c,m,l;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    diffs: [{
      id: "diff-1",
      filePath: "schema.orb",
      hunks: [{
        oldStart: 1,
        oldLines: 2,
        newStart: 1,
        newLines: 3,
        lines: [{
          type: "context",
          content: '  "orbitals": ['
        }, {
          type: "add",
          content: '    { "name": "TaskManagement" },'
        }, {
          type: "context",
          content: "  ]"
        }]
      }],
      timestamp: Date.now() - 60000,
      addedLines: 1,
      removedLines: 0
    }, {
      id: "diff-2",
      filePath: "traits/TaskManagement.ts",
      hunks: [{
        oldStart: 1,
        oldLines: 0,
        newStart: 1,
        newLines: 7,
        lines: [{
          type: "add",
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
          content: "  ],"
        }, {
          type: "add",
          content: "};"
        }]
      }],
      timestamp: Date.now() - 30000,
      addedLines: 7,
      removedLines: 0
    }, {
      id: "diff-3",
      filePath: "pages/TaskList.tsx",
      hunks: [{
        oldStart: 1,
        oldLines: 0,
        newStart: 1,
        newLines: 5,
        lines: [{
          type: "add",
          content: "import { TaskManagement } from '../traits';"
        }, {
          type: "add",
          content: ""
        }, {
          type: "add",
          content: "export function TaskListPage() {"
        }, {
          type: "add",
          content: "  return <TaskList />;"
        }, {
          type: "add",
          content: "}"
        }]
      }],
      timestamp: Date.now(),
      addedLines: 5,
      removedLines: 0
    }],
    title: "Project Changes"
  }
}`,...(l=(m=e.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var y,f,u;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    diffs: [{
      id: "diff-1",
      filePath: "src/components/TaskCard.tsx",
      hunks: [{
        oldStart: 1,
        oldLines: 15,
        newStart: 1,
        newLines: 28,
        lines: [{
          type: "context",
          content: "import React from 'react';"
        }, {
          type: "add",
          content: "import { Card, Badge, Button } from '@almadar/ui';"
        }, {
          type: "remove",
          content: "import { Card } from './Card';"
        }, {
          type: "context",
          content: ""
        }, {
          type: "context",
          content: "interface TaskCardProps {"
        }, {
          type: "remove",
          content: "  title: string;"
        }, {
          type: "add",
          content: "  task: Task;"
        }, {
          type: "add",
          content: "  onEdit?: () => void;"
        }, {
          type: "add",
          content: "  onDelete?: () => void;"
        }, {
          type: "context",
          content: "}"
        }, {
          type: "context",
          content: ""
        }, {
          type: "remove",
          content: "export function TaskCard({ title }) {"
        }, {
          type: "add",
          content: "export function TaskCard({ task, onEdit, onDelete }) {"
        }, {
          type: "context",
          content: "  return ("
        }, {
          type: "remove",
          content: "    <Card>"
        }, {
          type: "add",
          content: "    <Card variant='interactive'>"
        }, {
          type: "remove",
          content: "      <h3>{title}</h3>"
        }, {
          type: "add",
          content: "      <div className='flex justify-between'>"
        }, {
          type: "add",
          content: "        <h3>{task.title}</h3>"
        }, {
          type: "add",
          content: "        <Badge>{task.status}</Badge>"
        }, {
          type: "add",
          content: "      </div>"
        }, {
          type: "add",
          content: "      <p>{task.description}</p>"
        }, {
          type: "add",
          content: "      <div className='flex gap-2 mt-4'>"
        }, {
          type: "add",
          content: "        <Button onClick={onEdit}>Edit</Button>"
        }, {
          type: "add",
          content: "        <Button variant='danger' onClick={onDelete}>Delete</Button>"
        }, {
          type: "add",
          content: "      </div>"
        }, {
          type: "context",
          content: "    </Card>"
        }, {
          type: "context",
          content: "  );"
        }, {
          type: "context",
          content: "}"
        }]
      }],
      timestamp: Date.now(),
      addedLines: 15,
      removedLines: 5
    }],
    title: "Component Refactoring"
  }
}`,...(u=(f=n.parameters)==null?void 0:f.docs)==null?void 0:u.source}}};var L,g,w;o.parameters={...o.parameters,docs:{...(L=o.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    diffs: [],
    title: "No Changes"
  }
}`,...(w=(g=o.parameters)==null?void 0:g.docs)==null?void 0:w.source}}};var h,v,k;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    diffs: [{
      id: "diff-1",
      filePath: "new-feature.ts",
      hunks: [{
        oldStart: 1,
        oldLines: 0,
        newStart: 1,
        newLines: 4,
        lines: [{
          type: "add",
          content: "// New feature implementation"
        }, {
          type: "add",
          content: "export function newFeature() {"
        }, {
          type: "add",
          content: "  console.log('New feature!');"
        }, {
          type: "add",
          content: "}"
        }]
      }],
      timestamp: Date.now(),
      addedLines: 4,
      removedLines: 0
    }],
    title: "New Files"
  }
}`,...(k=(v=a.parameters)==null?void 0:v.docs)==null?void 0:k.source}}};var x,S,C;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    diffs: [{
      id: "diff-1",
      filePath: "deprecated.ts",
      hunks: [{
        oldStart: 1,
        oldLines: 4,
        newStart: 1,
        newLines: 0,
        lines: [{
          type: "remove",
          content: "// Deprecated code"
        }, {
          type: "remove",
          content: "export function oldFunction() {"
        }, {
          type: "remove",
          content: "  // This is no longer needed"
        }, {
          type: "remove",
          content: "}"
        }]
      }],
      timestamp: Date.now(),
      addedLines: 0,
      removedLines: 4
    }],
    title: "Removed Files"
  }
}`,...(C=(S=d.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};var D,T,P;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    diffs: [{
      id: "diff-1",
      filePath: "schema.orb",
      hunks: [{
        oldStart: 1,
        oldLines: 1,
        newStart: 1,
        newLines: 2,
        lines: [{
          type: "context",
          content: "{"
        }, {
          type: "add",
          content: '  "newField": true'
        }]
      }],
      timestamp: Date.now(),
      addedLines: 1,
      removedLines: 0
    }],
    title: "Schema Changes",
    defaultCollapsed: true
  }
}`,...(P=(T=i.parameters)==null?void 0:T.docs)==null?void 0:P.source}}};const Wt=["SingleFile","MultipleFiles","LargeDiff","Empty","AdditionsOnly","RemovalsOnly","CollapsedByDefault"];export{a as AdditionsOnly,i as CollapsedByDefault,o as Empty,n as LargeDiff,e as MultipleFiles,d as RemovalsOnly,t as SingleFile,Wt as __namedExportsOrder,Ut as default};
