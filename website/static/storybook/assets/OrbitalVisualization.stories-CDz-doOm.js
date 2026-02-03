import{j as a}from"./jsx-runtime-CDt2p4po.js";import{r as N}from"./index-GiUgBvb1.js";const he={"1s":{type:"1s",name:"1s Orbital",color:"#C45B5B",glowColor:"rgba(196, 91, 91, 0.3)",lobes:1,hasNode:!1,scale:.6},"2s":{type:"2s",name:"2s Orbital",color:"#D4875B",glowColor:"rgba(212, 135, 91, 0.3)",lobes:1,hasNode:!1,scale:.8},"2p":{type:"2p",name:"2p Orbital",color:"#C9B458",glowColor:"rgba(201, 180, 88, 0.3)",lobes:2,hasNode:!1,scale:1},"3s":{type:"3s",name:"3s Orbital",color:"#5BA87A",glowColor:"rgba(91, 168, 122, 0.3)",lobes:1,hasNode:!0,scale:1},"3p":{type:"3p",name:"3p Orbital",color:"#5B8DC4",glowColor:"rgba(91, 141, 196, 0.3)",lobes:2,hasNode:!0,scale:1.1},"3d":{type:"3d",name:"3d Orbital",color:"#6B5B8A",glowColor:"rgba(107, 91, 138, 0.3)",lobes:4,hasNode:!0,scale:1.2},"4f":{type:"4f",name:"4f Orbital",color:"#8A5B9C",glowColor:"rgba(138, 91, 156, 0.3)",lobes:6,hasNode:!0,scale:1.3}},ye={sm:120,md:200,lg:300,xl:400};function we(e){var l,d,u,m,o,r;if(!e)return 1;const t=((l=e.dataEntities)==null?void 0:l.length)||0,i=((u=(d=e.ui)==null?void 0:d.pages)==null?void 0:u.length)||0,n=((m=e.traits)==null?void 0:m.length)||0,s=((r=(o=e.ui)==null?void 0:o.pages)==null?void 0:r.reduce((p,xe)=>{var C;return p+(((C=xe.sections)==null?void 0:C.length)||0)},0))||0;return t*3+i*2+n*2+s*1}function fe(e){return e<=3?"1s":e<=8?"2s":e<=15?"2p":e<=25?"3s":e<=40?"3p":e<=60?"3d":"4f"}const $=({config:e,size:t,animated:i})=>{const n=t*e.scale*.4;return a.jsx("div",{className:"absolute rounded-full",style:{width:n,height:n,background:`radial-gradient(circle at 30% 30%, ${e.color}dd, ${e.color}88 50%, ${e.color}44 100%)`,boxShadow:`
          inset -10px -10px 20px rgba(0,0,0,0.3),
          inset 5px 5px 15px rgba(255,255,255,0.2),
          0 0 ${t*.15}px ${e.glowColor},
          0 0 ${t*.3}px ${e.glowColor}
        `,left:"50%",top:"50%",transform:"translate(-50%, -50%)",animation:i?"orbital-pulse 3s ease-in-out infinite":void 0}})},k=({config:e,size:t,animated:i,rotation:n=0})=>{const s=t*e.scale*.25,l=t*.18;return a.jsxs("div",{className:"absolute",style:{width:t,height:t,left:"50%",top:"50%",transform:`translate(-50%, -50%) rotate(${n}deg)`,animation:i?"orbital-rotate 8s linear infinite":void 0},children:[a.jsx("div",{className:"absolute rounded-full",style:{width:s,height:s*1.4,background:`radial-gradient(ellipse at 50% 30%, ${e.color}dd, ${e.color}66 70%, transparent 100%)`,boxShadow:`0 0 ${t*.1}px ${e.glowColor}`,left:"50%",top:`calc(50% - ${l}px)`,transform:"translate(-50%, -100%)",borderRadius:"50% 50% 40% 40%"}}),a.jsx("div",{className:"absolute rounded-full",style:{width:s,height:s*1.4,background:`radial-gradient(ellipse at 50% 70%, ${e.color}dd, ${e.color}66 70%, transparent 100%)`,boxShadow:`0 0 ${t*.1}px ${e.glowColor}`,left:"50%",bottom:`calc(50% - ${l}px)`,transform:"translate(-50%, 100%)",borderRadius:"40% 40% 50% 50%"}}),e.hasNode&&a.jsx("div",{className:"absolute rounded-[var(--radius-full)] bg-[var(--color-foreground)]",style:{width:t*.06,height:t*.06,left:"50%",top:"50%",transform:"translate(-50%, -50%)",boxShadow:`0 0 ${t*.05}px rgba(255,255,255,0.8)`}})]})},Oe=({config:e,size:t,animated:i})=>{const n=e.lobes,s=360/n,l=t*.18,d=t*.22;return a.jsxs("div",{className:"absolute",style:{width:t,height:t,left:"50%",top:"50%",transform:"translate(-50%, -50%)",animation:i?"orbital-rotate 12s linear infinite":void 0},children:[Array.from({length:n}).map((u,m)=>{const o=m*s*(Math.PI/180),r=Math.cos(o)*d,p=Math.sin(o)*d;return a.jsx("div",{className:"absolute rounded-full",style:{width:l,height:l*1.3,background:`radial-gradient(ellipse at 50% 40%, ${e.color}dd, ${e.color}55 80%, transparent 100%)`,boxShadow:`0 0 ${t*.08}px ${e.glowColor}`,left:`calc(50% + ${r}px)`,top:`calc(50% + ${p}px)`,transform:`translate(-50%, -50%) rotate(${m*s+90}deg)`}},m)}),a.jsx("div",{className:"absolute rounded-[var(--radius-full)] bg-[var(--color-foreground)]",style:{width:t*.08,height:t*.08,left:"50%",top:"50%",transform:"translate(-50%, -50%)",boxShadow:`0 0 ${t*.06}px rgba(255,255,255,0.9)`}})]})},c=({schema:e,complexity:t,size:i="md",showLabel:n=!0,animated:s=!0,onClick:l,className:d=""})=>{const u=N.useMemo(()=>t!==void 0?t:we(e),[e,t]),m=N.useMemo(()=>fe(u),[u]),o=he[m],r=ye[i],p=()=>{switch(o.lobes){case 1:return a.jsx($,{config:o,size:r,animated:s});case 2:return a.jsxs(a.Fragment,{children:[a.jsx(k,{config:o,size:r,animated:s,rotation:0}),o.hasNode&&a.jsxs(a.Fragment,{children:[a.jsx(k,{config:o,size:r*.7,animated:s,rotation:60}),a.jsx(k,{config:o,size:r*.7,animated:s,rotation:120})]})]});case 4:case 6:return a.jsx(Oe,{config:o,size:r,animated:s});default:return a.jsx($,{config:o,size:r,animated:s})}};return a.jsxs("div",{className:`relative flex flex-col items-center justify-center ${d}`,style:{width:r,height:r+(n?60:0)},onClick:l,role:l?"button":void 0,tabIndex:l?0:void 0,children:[a.jsxs("div",{className:"relative",style:{width:r,height:r,perspective:r*2,cursor:l?"pointer":"default"},children:[a.jsx("div",{className:"absolute rounded-full opacity-30",style:{width:r*.8,height:r*.8,left:"50%",top:"50%",transform:"translate(-50%, -50%)",background:`radial-gradient(circle, ${o.glowColor} 0%, transparent 70%)`,filter:"blur(20px)"}}),p()]}),n&&a.jsxs("div",{className:"mt-4 text-center",children:[a.jsx("div",{className:"text-lg font-semibold text-[var(--color-foreground)]",children:o.name}),a.jsxs("div",{className:"text-sm text-[var(--color-muted-foreground)]",children:["Complexity: ",u," units"]})]}),a.jsx("style",{children:`
        @keyframes orbital-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.9; }
        }

        @keyframes orbital-rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `})]})};c.__docgenInfo={description:"",methods:[],displayName:"OrbitalVisualization",props:{schema:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  dataEntities?: unknown[];
  ui?: { pages?: { sections?: unknown[] }[] };
  traits?: unknown[];
}`,signature:{properties:[{key:"dataEntities",value:{name:"Array",elements:[{name:"unknown"}],raw:"unknown[]",required:!1}},{key:"ui",value:{name:"signature",type:"object",raw:"{ pages?: { sections?: unknown[] }[] }",signature:{properties:[{key:"pages",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ sections?: unknown[] }",signature:{properties:[{key:"sections",value:{name:"Array",elements:[{name:"unknown"}],raw:"unknown[]",required:!1}}]}}],raw:"{ sections?: unknown[] }[]",required:!1}}]},required:!1}},{key:"traits",value:{name:"Array",elements:[{name:"unknown"}],raw:"unknown[]",required:!1}}]}},description:"Full KFlow schema object"},complexity:{required:!1,tsType:{name:"number"},description:"Direct complexity override (1-100+)"},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg" | "xl"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'}]},description:"Size of the visualization",defaultValue:{value:'"md"',computed:!1}},showLabel:{required:!1,tsType:{name:"boolean"},description:"Show complexity label",defaultValue:{value:"true",computed:!1}},animated:{required:!1,tsType:{name:"boolean"},description:"Animation enabled",defaultValue:{value:"true",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Click handler"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes",defaultValue:{value:'""',computed:!1}}}};const Se={title:"Organisms/OrbitalVisualization",component:c,parameters:{layout:"centered",backgrounds:{default:"dark",values:[{name:"dark",value:"#0a0a0a"},{name:"darker",value:"#000000"}]}},tags:["autodocs"],argTypes:{complexity:{control:{type:"range",min:1,max:100},description:"Complexity score (1-100+)"},size:{control:{type:"select"},options:["sm","md","lg","xl"]},animated:{control:{type:"boolean"}},showLabel:{control:{type:"boolean"}}}},b={name:"1s Orbital (Simple)",args:{complexity:2,size:"lg",animated:!0,showLabel:!0}},g={name:"2s Orbital",args:{complexity:6,size:"lg",animated:!0,showLabel:!0}},x={name:"2p Orbital (Dumbbell)",args:{complexity:12,size:"lg",animated:!0,showLabel:!0}},h={name:"3s Orbital",args:{complexity:20,size:"lg",animated:!0,showLabel:!0}},y={name:"3p Orbital",args:{complexity:35,size:"lg",animated:!0,showLabel:!0}},w={name:"3d Orbital (Cloverleaf)",args:{complexity:50,size:"lg",animated:!0,showLabel:!0}},f={name:"4f Orbital (Complex)",args:{complexity:75,size:"lg",animated:!0,showLabel:!0}},O={name:"Size: Small",args:{complexity:12,size:"sm",animated:!0,showLabel:!1}},v={name:"Size: Extra Large",args:{complexity:35,size:"xl",animated:!0,showLabel:!0}},z={name:"Interactive (Clickable)",args:{complexity:25,size:"lg",animated:!0,showLabel:!0,onClick:()=>alert("Orbital clicked!")}},S={name:"From KFlow Schema",args:{schema:{dataEntities:[{name:"User"},{name:"Project"},{name:"Task"}],ui:{pages:[{sections:[{},{},{}]},{sections:[{},{}]},{sections:[{},{},{},{}]}]},traits:[{name:"CRUD"},{name:"Validation"}]},size:"lg",animated:!0,showLabel:!0}},L={name:"All Orbital Types",render:()=>a.jsxs("div",{className:"flex flex-wrap gap-8 items-end justify-center p-8",children:[a.jsx(c,{complexity:2,size:"md",showLabel:!0}),a.jsx(c,{complexity:6,size:"md",showLabel:!0}),a.jsx(c,{complexity:12,size:"md",showLabel:!0}),a.jsx(c,{complexity:20,size:"md",showLabel:!0}),a.jsx(c,{complexity:35,size:"md",showLabel:!0}),a.jsx(c,{complexity:50,size:"md",showLabel:!0}),a.jsx(c,{complexity:75,size:"md",showLabel:!0})]})},j={name:"Static (No Animation)",args:{complexity:35,size:"lg",animated:!1,showLabel:!0}};var A,V,T;b.parameters={...b.parameters,docs:{...(A=b.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: '1s Orbital (Simple)',
  args: {
    complexity: 2,
    size: 'lg',
    animated: true,
    showLabel: true
  }
}`,...(T=(V=b.parameters)==null?void 0:V.docs)==null?void 0:T.source}}};var E,q,F;g.parameters={...g.parameters,docs:{...(E=g.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: '2s Orbital',
  args: {
    complexity: 6,
    size: 'lg',
    animated: true,
    showLabel: true
  }
}`,...(F=(q=g.parameters)==null?void 0:q.docs)==null?void 0:F.source}}};var B,I,D;x.parameters={...x.parameters,docs:{...(B=x.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: '2p Orbital (Dumbbell)',
  args: {
    complexity: 12,
    size: 'lg',
    animated: true,
    showLabel: true
  }
}`,...(D=(I=x.parameters)==null?void 0:I.docs)==null?void 0:D.source}}};var _,M,R;h.parameters={...h.parameters,docs:{...(_=h.parameters)==null?void 0:_.docs,source:{originalSource:`{
  name: '3s Orbital',
  args: {
    complexity: 20,
    size: 'lg',
    animated: true,
    showLabel: true
  }
}`,...(R=(M=h.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};var P,U,K;y.parameters={...y.parameters,docs:{...(P=y.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: '3p Orbital',
  args: {
    complexity: 35,
    size: 'lg',
    animated: true,
    showLabel: true
  }
}`,...(K=(U=y.parameters)==null?void 0:U.docs)==null?void 0:K.source}}};var G,Z,H;w.parameters={...w.parameters,docs:{...(G=w.parameters)==null?void 0:G.docs,source:{originalSource:`{
  name: '3d Orbital (Cloverleaf)',
  args: {
    complexity: 50,
    size: 'lg',
    animated: true,
    showLabel: true
  }
}`,...(H=(Z=w.parameters)==null?void 0:Z.docs)==null?void 0:H.source}}};var J,Q,W;f.parameters={...f.parameters,docs:{...(J=f.parameters)==null?void 0:J.docs,source:{originalSource:`{
  name: '4f Orbital (Complex)',
  args: {
    complexity: 75,
    size: 'lg',
    animated: true,
    showLabel: true
  }
}`,...(W=(Q=f.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var X,Y,ee;O.parameters={...O.parameters,docs:{...(X=O.parameters)==null?void 0:X.docs,source:{originalSource:`{
  name: 'Size: Small',
  args: {
    complexity: 12,
    size: 'sm',
    animated: true,
    showLabel: false
  }
}`,...(ee=(Y=O.parameters)==null?void 0:Y.docs)==null?void 0:ee.source}}};var ae,te,re;v.parameters={...v.parameters,docs:{...(ae=v.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  name: 'Size: Extra Large',
  args: {
    complexity: 35,
    size: 'xl',
    animated: true,
    showLabel: true
  }
}`,...(re=(te=v.parameters)==null?void 0:te.docs)==null?void 0:re.source}}};var se,oe,le;z.parameters={...z.parameters,docs:{...(se=z.parameters)==null?void 0:se.docs,source:{originalSource:`{
  name: 'Interactive (Clickable)',
  args: {
    complexity: 25,
    size: 'lg',
    animated: true,
    showLabel: true,
    onClick: () => alert('Orbital clicked!')
  }
}`,...(le=(oe=z.parameters)==null?void 0:oe.docs)==null?void 0:le.source}}};var ne,ie,ce;S.parameters={...S.parameters,docs:{...(ne=S.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  name: 'From KFlow Schema',
  args: {
    schema: {
      dataEntities: [{
        name: 'User'
      }, {
        name: 'Project'
      }, {
        name: 'Task'
      }],
      ui: {
        pages: [{
          sections: [{}, {}, {}]
        }, {
          sections: [{}, {}]
        }, {
          sections: [{}, {}, {}, {}]
        }]
      },
      traits: [{
        name: 'CRUD'
      }, {
        name: 'Validation'
      }]
    },
    size: 'lg',
    animated: true,
    showLabel: true
  }
}`,...(ce=(ie=S.parameters)==null?void 0:ie.docs)==null?void 0:ce.source}}};var me,de,ue;L.parameters={...L.parameters,docs:{...(me=L.parameters)==null?void 0:me.docs,source:{originalSource:`{
  name: 'All Orbital Types',
  render: () => <div className="flex flex-wrap gap-8 items-end justify-center p-8">
            <OrbitalVisualization complexity={2} size="md" showLabel />
            <OrbitalVisualization complexity={6} size="md" showLabel />
            <OrbitalVisualization complexity={12} size="md" showLabel />
            <OrbitalVisualization complexity={20} size="md" showLabel />
            <OrbitalVisualization complexity={35} size="md" showLabel />
            <OrbitalVisualization complexity={50} size="md" showLabel />
            <OrbitalVisualization complexity={75} size="md" showLabel />
        </div>
}`,...(ue=(de=L.parameters)==null?void 0:de.docs)==null?void 0:ue.source}}};var pe,be,ge;j.parameters={...j.parameters,docs:{...(pe=j.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  name: 'Static (No Animation)',
  args: {
    complexity: 35,
    size: 'lg',
    animated: false,
    showLabel: true
  }
}`,...(ge=(be=j.parameters)==null?void 0:be.docs)==null?void 0:ge.source}}};const Le=["Orbital1s","Orbital2s","Orbital2p","Orbital3s","Orbital3p","Orbital3d","Orbital4f","SmallSize","ExtraLargeSize","Interactive","FromSchema","AllOrbitals","Static"];export{L as AllOrbitals,v as ExtraLargeSize,S as FromSchema,z as Interactive,b as Orbital1s,x as Orbital2p,g as Orbital2s,w as Orbital3d,y as Orbital3p,h as Orbital3s,f as Orbital4f,O as SmallSize,j as Static,Le as __namedExportsOrder,Se as default};
