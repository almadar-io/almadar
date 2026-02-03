import{j as e}from"./jsx-runtime-CDt2p4po.js";import{c as F}from"./cn-BNf5BS2b.js";import{B as s}from"./Box-DYJzRMmP.js";import{T as a}from"./Typography-Wmkp-g7N.js";import{B as c}from"./Button-B7t-_IKa.js";import{P as I}from"./pause-BGY7Ki7b.js";import{P as L}from"./play-C6U2eifx.js";import{R as W}from"./rotate-ccw-cyxkXXLc.js";import{B as E}from"./Badge-Dd4QqFOk.js";import"./index-GiUgBvb1.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";const p=({title:q="Game",children:B,hud:y,debugPanel:m,showDebugPanel:H=!1,controls:r,className:O})=>e.jsxs(s,{display:"flex",fullHeight:!0,className:F("flex-col lg:flex-row",O),children:[e.jsxs(s,{display:"flex",className:"flex-1 flex-col",children:[e.jsxs(s,{padding:"md",border:!0,className:"border-b-2 border-x-0 border-t-0 border-[var(--color-border)] flex items-center justify-between",children:[e.jsx(a,{variant:"h4",children:q}),r&&e.jsxs("div",{className:"flex items-center gap-2",children:[r.isPlaying?e.jsx(c,{variant:"secondary",size:"sm",leftIcon:e.jsx(I,{className:"h-4 w-4"}),onClick:r.onPause,children:"Pause"}):e.jsx(c,{variant:"primary",size:"sm",leftIcon:e.jsx(L,{className:"h-4 w-4"}),onClick:r.onPlay,children:"Play"}),e.jsx(c,{variant:"ghost",size:"sm",leftIcon:e.jsx(W,{className:"h-4 w-4"}),onClick:r.onReset,children:"Reset"})]})]}),e.jsxs(s,{position:"relative",fullWidth:!0,className:"flex-1 bg-[var(--color-muted)]",children:[B,y&&e.jsx(s,{position:"absolute",className:"top-0 left-0 right-0 pointer-events-none",children:e.jsx(s,{padding:"md",className:"pointer-events-auto w-fit",children:y})})]})]}),H&&m&&e.jsxs(s,{bg:"surface",border:!0,shadow:"sm",overflow:"auto",className:"w-full lg:w-80 lg:border-l-2 lg:border-t-0 border-t-2 border-[var(--color-border)]",children:[e.jsx(s,{padding:"md",border:!0,className:"border-b-2 border-x-0 border-t-0 border-[var(--color-border)]",children:e.jsx(a,{variant:"h6",children:"Debug Panel"})}),e.jsx(s,{padding:"md",children:m})]})]});p.displayName="GameTemplate";p.__docgenInfo={description:"",methods:[],displayName:"GameTemplate",props:{title:{required:!1,tsType:{name:"string"},description:"Title of the game",defaultValue:{value:'"Game"',computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"The main game canvas or content"},hud:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"HUD overlay content (scores, health, etc.)"},debugPanel:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Debug panel content"},showDebugPanel:{required:!1,tsType:{name:"boolean"},description:"Whether the debug panel is visible",defaultValue:{value:"false",computed:!1}},controls:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  onPlay?: () => void;
  onPause?: () => void;
  onReset?: () => void;
  isPlaying?: boolean;
}`,signature:{properties:[{key:"onPlay",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"onPause",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"onReset",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"isPlaying",value:{name:"boolean",required:!1}}]}},description:"Game controls"},className:{required:!1,tsType:{name:"string"},description:"Additional class name"}}};const $={title:"Templates/GameTemplate",component:p,parameters:{layout:"fullscreen",backgrounds:{default:"wireframe"}},tags:["autodocs"]},o={args:{title:"Super Platform Quest",children:e.jsx("div",{className:"h-[400px] bg-neutral-100 flex items-center justify-center border-2 border-dashed border-neutral-300",children:e.jsx(a,{color:"secondary",children:"Game Canvas"})})}},n={args:{title:"Platformer Game",controls:{isPlaying:!1,onPlay:()=>console.log("Play"),onPause:()=>console.log("Pause"),onReset:()=>console.log("Reset")},children:e.jsx("div",{className:"h-[400px] bg-neutral-100 flex items-center justify-center border-2 border-dashed border-neutral-300",children:e.jsx(a,{color:"secondary",children:"Click Play to start"})})}},l={args:{title:"Platformer Game",controls:{isPlaying:!0,onPlay:()=>console.log("Play"),onPause:()=>console.log("Pause"),onReset:()=>console.log("Reset")},children:e.jsx("div",{className:"h-[400px] bg-neutral-100 flex items-center justify-center border-2 border-dashed border-neutral-300",children:e.jsx(a,{color:"secondary",children:"Game Running..."})})}},i={args:{title:"Adventure Game",controls:{isPlaying:!0,onPlay:()=>console.log("Play"),onPause:()=>console.log("Pause"),onReset:()=>console.log("Reset")},hud:e.jsx("div",{className:"bg-white border-2 border-black p-2 shadow-wireframe",children:e.jsxs("div",{className:"flex gap-4",children:[e.jsxs("div",{children:[e.jsx(a,{variant:"caption",color:"secondary",children:"SCORE"}),e.jsx(a,{variant:"h6",children:"12,500"})]}),e.jsxs("div",{children:[e.jsx(a,{variant:"caption",color:"secondary",children:"HEALTH"}),e.jsxs("div",{className:"flex gap-1",children:[e.jsx("span",{className:"text-red-500",children:"❤️"}),e.jsx("span",{className:"text-red-500",children:"❤️"}),e.jsx("span",{className:"text-neutral-300",children:"❤️"})]})]}),e.jsxs("div",{children:[e.jsx(a,{variant:"caption",color:"secondary",children:"LEVEL"}),e.jsx(a,{variant:"h6",children:"3"})]})]})}),children:e.jsx("div",{className:"h-[400px] bg-neutral-100 flex items-center justify-center border-2 border-dashed border-neutral-300",children:e.jsx(a,{color:"secondary",children:"Game Canvas with HUD Overlay"})})}},t={args:{title:"Debug Mode",showDebugPanel:!0,controls:{isPlaying:!0,onPlay:()=>console.log("Play"),onPause:()=>console.log("Pause"),onReset:()=>console.log("Reset")},debugPanel:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx(a,{variant:"caption",color:"secondary",children:"Entity: Player"}),e.jsxs("div",{className:"font-mono text-xs space-y-1 mt-1",children:[e.jsx("div",{children:"x: 150"}),e.jsx("div",{children:"y: 320"}),e.jsx("div",{children:"health: 100"}),e.jsx("div",{children:"score: 12500"})]})]}),e.jsxs("div",{children:[e.jsx(a,{variant:"caption",color:"secondary",children:"State Machine"}),e.jsx("div",{className:"mt-1",children:e.jsx(E,{variant:"info",children:"idle"})})]}),e.jsxs("div",{children:[e.jsx(a,{variant:"caption",color:"secondary",children:"FPS"}),e.jsx(a,{variant:"body1",className:"font-mono",children:"60"})]})]}),children:e.jsx("div",{className:"h-[400px] bg-neutral-100 flex items-center justify-center border-2 border-dashed border-neutral-300",children:e.jsx(a,{color:"secondary",children:"Game Canvas"})})}},d={args:{title:"Super Platform Quest",showDebugPanel:!0,controls:{isPlaying:!0,onPlay:()=>console.log("Play"),onPause:()=>console.log("Pause"),onReset:()=>console.log("Reset")},hud:e.jsx("div",{className:"bg-white border-2 border-black p-3 shadow-wireframe",children:e.jsxs("div",{className:"flex gap-6",children:[e.jsxs("div",{children:[e.jsx(a,{variant:"caption",color:"secondary",children:"SCORE"}),e.jsx(a,{variant:"h5",children:"25,000"})]}),e.jsxs("div",{children:[e.jsx(a,{variant:"caption",color:"secondary",children:"LIVES"}),e.jsx(a,{variant:"h5",children:"3"})]}),e.jsxs("div",{children:[e.jsx(a,{variant:"caption",color:"secondary",children:"COINS"}),e.jsx(a,{variant:"h5",children:"47"})]})]})}),debugPanel:e.jsxs("div",{className:"space-y-4 text-sm",children:[e.jsxs("div",{children:[e.jsx(a,{variant:"caption",color:"secondary",className:"font-bold",children:"Player"}),e.jsxs("div",{className:"font-mono text-xs mt-1 space-y-1",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"position:"}),e.jsx("span",{children:"(256, 384)"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"velocity:"}),e.jsx("span",{children:"(2.5, 0)"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"grounded:"}),e.jsx("span",{children:"true"})]})]})]}),e.jsxs("div",{children:[e.jsx(a,{variant:"caption",color:"secondary",className:"font-bold",children:"State"}),e.jsx(E,{variant:"success",className:"mt-1",children:"running"})]}),e.jsxs("div",{children:[e.jsx(a,{variant:"caption",color:"secondary",className:"font-bold",children:"Performance"}),e.jsxs("div",{className:"font-mono text-xs mt-1 space-y-1",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"FPS:"}),e.jsx("span",{children:"60"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Entities:"}),e.jsx("span",{children:"24"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Tick:"}),e.jsx("span",{children:"1847"})]})]})]})]}),children:e.jsx("div",{className:"h-[400px] bg-gradient-to-b from-sky-100 to-sky-200 flex items-end justify-center border-2 border-dashed border-neutral-300",children:e.jsxs("div",{className:"mb-8 text-center",children:[e.jsx("div",{className:"w-8 h-12 bg-blue-500 border-2 border-black mx-auto mb-2"}),e.jsx(a,{color:"secondary",children:"Game Running"})]})})}};var h,u,v;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    title: 'Super Platform Quest',
    children: <div className="h-[400px] bg-neutral-100 flex items-center justify-center border-2 border-dashed border-neutral-300">
                <Typography color="secondary">Game Canvas</Typography>
            </div>
  }
}`,...(v=(u=o.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};var g,x,b;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    title: 'Platformer Game',
    controls: {
      isPlaying: false,
      onPlay: () => console.log('Play'),
      onPause: () => console.log('Pause'),
      onReset: () => console.log('Reset')
    },
    children: <div className="h-[400px] bg-neutral-100 flex items-center justify-center border-2 border-dashed border-neutral-300">
                <Typography color="secondary">Click Play to start</Typography>
            </div>
  }
}`,...(b=(x=n.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var f,j,P;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    title: 'Platformer Game',
    controls: {
      isPlaying: true,
      onPlay: () => console.log('Play'),
      onPause: () => console.log('Pause'),
      onReset: () => console.log('Reset')
    },
    children: <div className="h-[400px] bg-neutral-100 flex items-center justify-center border-2 border-dashed border-neutral-300">
                <Typography color="secondary">Game Running...</Typography>
            </div>
  }
}`,...(P=(j=l.parameters)==null?void 0:j.docs)==null?void 0:P.source}}};var N,T,w;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    title: 'Adventure Game',
    controls: {
      isPlaying: true,
      onPlay: () => console.log('Play'),
      onPause: () => console.log('Pause'),
      onReset: () => console.log('Reset')
    },
    hud: <div className="bg-white border-2 border-black p-2 shadow-wireframe">
                <div className="flex gap-4">
                    <div>
                        <Typography variant="caption" color="secondary">SCORE</Typography>
                        <Typography variant="h6">12,500</Typography>
                    </div>
                    <div>
                        <Typography variant="caption" color="secondary">HEALTH</Typography>
                        <div className="flex gap-1">
                            <span className="text-red-500">❤️</span>
                            <span className="text-red-500">❤️</span>
                            <span className="text-neutral-300">❤️</span>
                        </div>
                    </div>
                    <div>
                        <Typography variant="caption" color="secondary">LEVEL</Typography>
                        <Typography variant="h6">3</Typography>
                    </div>
                </div>
            </div>,
    children: <div className="h-[400px] bg-neutral-100 flex items-center justify-center border-2 border-dashed border-neutral-300">
                <Typography color="secondary">Game Canvas with HUD Overlay</Typography>
            </div>
  }
}`,...(w=(T=i.parameters)==null?void 0:T.docs)==null?void 0:w.source}}};var R,S,G;t.parameters={...t.parameters,docs:{...(R=t.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    title: 'Debug Mode',
    showDebugPanel: true,
    controls: {
      isPlaying: true,
      onPlay: () => console.log('Play'),
      onPause: () => console.log('Pause'),
      onReset: () => console.log('Reset')
    },
    debugPanel: <div className="space-y-4">
                <div>
                    <Typography variant="caption" color="secondary">Entity: Player</Typography>
                    <div className="font-mono text-xs space-y-1 mt-1">
                        <div>x: 150</div>
                        <div>y: 320</div>
                        <div>health: 100</div>
                        <div>score: 12500</div>
                    </div>
                </div>
                <div>
                    <Typography variant="caption" color="secondary">State Machine</Typography>
                    <div className="mt-1">
                        <Badge variant="info">idle</Badge>
                    </div>
                </div>
                <div>
                    <Typography variant="caption" color="secondary">FPS</Typography>
                    <Typography variant="body1" className="font-mono">60</Typography>
                </div>
            </div>,
    children: <div className="h-[400px] bg-neutral-100 flex items-center justify-center border-2 border-dashed border-neutral-300">
                <Typography color="secondary">Game Canvas</Typography>
            </div>
  }
}`,...(G=(S=t.parameters)==null?void 0:S.docs)==null?void 0:G.source}}};var k,C,D;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    title: 'Super Platform Quest',
    showDebugPanel: true,
    controls: {
      isPlaying: true,
      onPlay: () => console.log('Play'),
      onPause: () => console.log('Pause'),
      onReset: () => console.log('Reset')
    },
    hud: <div className="bg-white border-2 border-black p-3 shadow-wireframe">
                <div className="flex gap-6">
                    <div>
                        <Typography variant="caption" color="secondary">SCORE</Typography>
                        <Typography variant="h5">25,000</Typography>
                    </div>
                    <div>
                        <Typography variant="caption" color="secondary">LIVES</Typography>
                        <Typography variant="h5">3</Typography>
                    </div>
                    <div>
                        <Typography variant="caption" color="secondary">COINS</Typography>
                        <Typography variant="h5">47</Typography>
                    </div>
                </div>
            </div>,
    debugPanel: <div className="space-y-4 text-sm">
                <div>
                    <Typography variant="caption" color="secondary" className="font-bold">Player</Typography>
                    <div className="font-mono text-xs mt-1 space-y-1">
                        <div className="flex justify-between"><span>position:</span><span>(256, 384)</span></div>
                        <div className="flex justify-between"><span>velocity:</span><span>(2.5, 0)</span></div>
                        <div className="flex justify-between"><span>grounded:</span><span>true</span></div>
                    </div>
                </div>
                <div>
                    <Typography variant="caption" color="secondary" className="font-bold">State</Typography>
                    <Badge variant="success" className="mt-1">running</Badge>
                </div>
                <div>
                    <Typography variant="caption" color="secondary" className="font-bold">Performance</Typography>
                    <div className="font-mono text-xs mt-1 space-y-1">
                        <div className="flex justify-between"><span>FPS:</span><span>60</span></div>
                        <div className="flex justify-between"><span>Entities:</span><span>24</span></div>
                        <div className="flex justify-between"><span>Tick:</span><span>1847</span></div>
                    </div>
                </div>
            </div>,
    children: <div className="h-[400px] bg-gradient-to-b from-sky-100 to-sky-200 flex items-end justify-center border-2 border-dashed border-neutral-300">
                <div className="mb-8 text-center">
                    <div className="w-8 h-12 bg-blue-500 border-2 border-black mx-auto mb-2"></div>
                    <Typography color="secondary">Game Running</Typography>
                </div>
            </div>
  }
}`,...(D=(C=d.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};const ee=["Default","WithControls","Playing","WithHUD","WithDebugPanel","FullFeatured"];export{o as Default,d as FullFeatured,l as Playing,n as WithControls,t as WithDebugPanel,i as WithHUD,ee as __namedExportsOrder,$ as default};
