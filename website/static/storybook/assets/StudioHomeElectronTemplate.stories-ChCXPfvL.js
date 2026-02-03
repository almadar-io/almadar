import{j as e}from"./jsx-runtime-CDt2p4po.js";import{B as c}from"./Box-DYJzRMmP.js";import{V as a,H as o}from"./Stack-DhhoTPuC.js";import{T as t}from"./Typography-Wmkp-g7N.js";import{B as i}from"./Button-Dn0472P0.js";import{I as s,F as W}from"./Icon-DDCXmKGr.js";import{C as b}from"./Card-BNT5PrJ5.js";import{u as X}from"./useEventBus-BNZMNlv8.js";import{c as Y}from"./createLucideIcon-CbHznvEr.js";import{P as $}from"./plus-jSzJaRn3.js";import{T as G}from"./trash-2-ChlfdFMf.js";import{F as f}from"./file-code-yqS-aeuC.js";import{X as K}from"./x-prXd1WI5.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";import"./loader-2-DXp1ic5P.js";import"./lock-BpRazVO9.js";import"./share-2-BGRL1FH9.js";import"./zap-DLdLcnjT.js";import"./refresh-cw-Ocr-wooT.js";import"./external-link-k_e-i1vS.js";import"./link-Csz5KqWX.js";import"./home-JwtCVJF2.js";import"./star-D_3mxVsm.js";import"./clock-DT9ve7xf.js";import"./calendar-rGtwHcH_.js";import"./pause-BGY7Ki7b.js";import"./play-C6U2eifx.js";import"./eye-DPfPdwVp.js";import"./list-B6-UEXVq.js";import"./grid-3x3-DCQtfzd8.js";import"./filter-CMfXM6HV.js";import"./search-CCKipEn6.js";import"./settings-DBj1i3lR.js";import"./user-plus-BlQDsowZ.js";import"./users-CV1mGUsS.js";import"./user-BePscFH1.js";import"./phone-XSC4O3No.js";import"./send-CHVRrjpn.js";import"./message-circle-Yw7MGdXs.js";import"./mail-CI1Ybt8r.js";import"./download-yLSRVNFt.js";import"./file-text-DZQctV9o.js";import"./copy-B40iJsJp.js";import"./save-DyJeJ3Zl.js";import"./square-pen-D7sL1yO_.js";import"./minus-CvoF9liV.js";import"./info-CF8EgE8A.js";import"./alert-triangle-BLuUOBNm.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";import"./check-DliVttWt.js";import"./menu-DUN0as2h.js";import"./arrow-left-CMPuXvFr.js";import"./arrow-right-BdVPe8wH.js";import"./chevron-up-B8qTw58L.js";import"./chevron-down-BQmz_Bpa.js";import"./chevron-left-zGYeMbNT.js";import"./chevron-right-pDF_OUfd.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=Y("Orbit",[["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}],["circle",{cx:"19",cy:"5",r:"2",key:"mhkx31"}],["circle",{cx:"5",cy:"19",r:"2",key:"v8kfzx"}],["path",{d:"M10.4 21.9a10 10 0 0 0 9.941-15.416",key:"eohfx2"}],["path",{d:"M13.5 2.1a10 10 0 0 0-9.841 15.416",key:"19pvbm"}]]),v=({recentFiles:j,version:_="1.0.0",className:B=""})=>{const{emit:n}=X(),D=()=>{n("UI:OPEN_FILE",{})},H=()=>{n("UI:CREATE_NEW",{})},M=r=>{n("UI:OPEN_RECENT",{file:r,entity:"RecentFile"})},q=(r,x)=>{x.stopPropagation(),n("UI:REMOVE_RECENT",{file:r,entity:"RecentFile"})},J=()=>{n("UI:CLEAR_RECENT",{})};return e.jsx(c,{fullHeight:!0,fullWidth:!0,className:`bg-[var(--color-background)] ${B}`,children:e.jsxs(a,{gap:"none",className:"h-full",align:"center",justify:"center",children:[e.jsxs(a,{gap:"md",align:"center",className:"mb-12",children:[e.jsx(c,{className:"w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center",children:e.jsx(s,{icon:Q,size:"lg",className:"text-white"})}),e.jsxs(a,{gap:"xs",align:"center",children:[e.jsx(t,{variant:"h1",children:"Almadar Studio"}),e.jsxs(t,{variant:"body2",className:"text-[var(--color-muted-foreground)]",children:["v",_]})]})]}),e.jsxs(o,{gap:"md",className:"mb-12",children:[e.jsx(i,{size:"lg",onClick:H,children:e.jsxs(o,{gap:"xs",align:"center",children:[e.jsx(s,{icon:$,size:"sm"}),e.jsx("span",{children:"New Project"})]})}),e.jsx(i,{size:"lg",variant:"secondary",onClick:D,children:e.jsxs(o,{gap:"xs",align:"center",children:[e.jsx(s,{icon:W,size:"sm"}),e.jsx("span",{children:"Open File"})]})})]}),e.jsxs(c,{className:"w-full max-w-2xl",padding:"lg",children:[e.jsxs(o,{justify:"between",align:"center",className:"mb-4",children:[e.jsx(t,{variant:"h3",children:"Recent Files"}),j.length>0&&e.jsx(i,{variant:"ghost",size:"sm",onClick:J,children:e.jsxs(o,{gap:"xs",align:"center",children:[e.jsx(s,{icon:G,size:"sm"}),e.jsx("span",{children:"Clear All"})]})})]}),j.length===0?e.jsx(b,{padding:"lg",children:e.jsxs(a,{gap:"md",align:"center",className:"py-8",children:[e.jsx(s,{icon:f,size:"lg",className:"text-[var(--color-muted-foreground)] opacity-50"}),e.jsx(t,{variant:"body1",className:"text-[var(--color-muted-foreground)]",children:"No recent files"}),e.jsx(t,{variant:"body2",className:"text-[var(--color-muted-foreground)]",children:"Open a .orb file to get started"})]})}):e.jsx(a,{gap:"sm",children:j.map(r=>e.jsx(b,{padding:"md",className:"cursor-pointer hover:bg-[var(--color-muted)] transition-colors",onClick:()=>M(r),children:e.jsxs(o,{justify:"between",align:"center",children:[e.jsxs(o,{gap:"md",align:"center",children:[e.jsx(s,{icon:f,size:"md",className:"text-[var(--color-primary)]"}),e.jsxs(a,{gap:"none",children:[e.jsx(t,{variant:"body1",className:"font-medium",children:r.name}),e.jsx(t,{variant:"caption",className:"text-[var(--color-muted-foreground)]",children:r.path})]})]}),e.jsxs(o,{gap:"sm",align:"center",children:[e.jsx(t,{variant:"caption",className:"text-[var(--color-muted-foreground)]",children:r.lastOpened}),e.jsx(i,{variant:"ghost",size:"sm",onClick:x=>q(r,x),className:"text-[var(--color-muted-foreground)] hover:text-[var(--color-error)]",children:e.jsx(s,{icon:K,size:"sm"})})]})]})},r.path))})]}),e.jsx(c,{className:"absolute bottom-4",children:e.jsx(t,{variant:"caption",className:"text-[var(--color-muted-foreground)]",children:"Press Ctrl+O to open a file, Ctrl+N to create new"})})]})})};v.displayName="StudioHomeElectronTemplate";v.__docgenInfo={description:"",methods:[],displayName:"StudioHomeElectronTemplate",props:{recentFiles:{required:!0,tsType:{name:"Array",elements:[{name:"RecentFile"}],raw:"RecentFile[]"},description:"List of recent files"},version:{required:!1,tsType:{name:"string"},description:"App version",defaultValue:{value:'"1.0.0"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes",defaultValue:{value:'""',computed:!1}}}};const sr={title:"Builder/Templates/StudioHomeElectronTemplate",component:v,parameters:{layout:"fullscreen"},tags:["autodocs"]},u=[{path:"/Users/dev/projects/task-manager/schema.orb",name:"task-manager.orb",lastOpened:"2 hours ago"},{path:"/Users/dev/projects/ecommerce/schema.orb",name:"ecommerce.orb",lastOpened:"Yesterday"},{path:"/Users/dev/projects/blog/schema.orb",name:"blog-platform.orb",lastOpened:"3 days ago"},{path:"/Users/dev/projects/fitness/schema.orb",name:"fitness-tracker.orb",lastOpened:"1 week ago"},{path:"/Users/dev/projects/learning/schema.orb",name:"learning-platform.orb",lastOpened:"2 weeks ago"}],m={args:{recentFiles:u,version:"1.0.0"}},l={args:{recentFiles:[],version:"1.0.0"}},p={args:{recentFiles:[u[0]],version:"1.0.0"}},d={args:{recentFiles:[...u,{path:"/path/to/project6.orb",name:"project6.orb",lastOpened:"1 month ago"},{path:"/path/to/project7.orb",name:"project7.orb",lastOpened:"1 month ago"},{path:"/path/to/project8.orb",name:"project8.orb",lastOpened:"2 months ago"}],version:"1.0.0"}},h={args:{recentFiles:u,version:"1.1.0-beta.1"}},g={args:{recentFiles:[{path:"/Users/developer/Documents/Projects/Very/Long/Path/To/Project/schema.orb",name:"schema.orb",lastOpened:"Just now"},{path:"/Users/developer/Desktop/Another/Really/Long/Directory/Structure/project.orb",name:"project.orb",lastOpened:"1 hour ago"}],version:"1.0.0"}};var y,N,F;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    recentFiles: mockRecentFiles,
    version: "1.0.0"
  }
}`,...(F=(N=m.parameters)==null?void 0:N.docs)==null?void 0:F.source}}};var O,k,E;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    recentFiles: [],
    version: "1.0.0"
  }
}`,...(E=(k=l.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};var R,C,S;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    recentFiles: [mockRecentFiles[0]],
    version: "1.0.0"
  }
}`,...(S=(C=p.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};var T,P,w;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    recentFiles: [...mockRecentFiles, {
      path: "/path/to/project6.orb",
      name: "project6.orb",
      lastOpened: "1 month ago"
    }, {
      path: "/path/to/project7.orb",
      name: "project7.orb",
      lastOpened: "1 month ago"
    }, {
      path: "/path/to/project8.orb",
      name: "project8.orb",
      lastOpened: "2 months ago"
    }],
    version: "1.0.0"
  }
}`,...(w=(P=d.parameters)==null?void 0:P.docs)==null?void 0:w.source}}};var U,z,I;h.parameters={...h.parameters,docs:{...(U=h.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    recentFiles: mockRecentFiles,
    version: "1.1.0-beta.1"
  }
}`,...(I=(z=h.parameters)==null?void 0:z.docs)==null?void 0:I.source}}};var L,A,V;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    recentFiles: [{
      path: "/Users/developer/Documents/Projects/Very/Long/Path/To/Project/schema.orb",
      name: "schema.orb",
      lastOpened: "Just now"
    }, {
      path: "/Users/developer/Desktop/Another/Really/Long/Directory/Structure/project.orb",
      name: "project.orb",
      lastOpened: "1 hour ago"
    }],
    version: "1.0.0"
  }
}`,...(V=(A=g.parameters)==null?void 0:A.docs)==null?void 0:V.source}}};const ar=["Default","Empty","SingleFile","ManyFiles","BetaVersion","LongPaths"];export{h as BetaVersion,m as Default,l as Empty,g as LongPaths,d as ManyFiles,p as SingleFile,ar as __namedExportsOrder,sr as default};
