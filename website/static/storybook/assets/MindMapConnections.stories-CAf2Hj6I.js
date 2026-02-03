import{j as i}from"./jsx-runtime-CDt2p4po.js";import"./index-GiUgBvb1.js";const y=({connections:u,zoom:e=1,pan:r={x:0,y:0},strokeColor:A="#94a3b8",strokeWidth:N=2,className:V})=>i.jsx("g",{className:V,children:u.map((n,X)=>{const d=n.source.x*e+r.x,m=n.source.y*e+r.y,p=n.target.x*e+r.x,l=n.target.y*e+r.y,Y=(d+p)/2,_=(m+l)/2,L=p-d,D=l-m,g=.2,E=Y-D*g,P=_+L*g;return i.jsx("path",{d:`M ${d} ${m} Q ${E} ${P} ${p} ${l}`,fill:"none",stroke:A,strokeWidth:N*e,strokeLinecap:"round",className:"mindmap-connection transition-all duration-200"},n.id||X)})});y.displayName="MindMapConnections";y.__docgenInfo={description:"",methods:[],displayName:"MindMapConnections",props:{connections:{required:!0,tsType:{name:"Array",elements:[{name:"MindMapConnection"}],raw:"MindMapConnection[]"},description:"Array of connections to render"},zoom:{required:!1,tsType:{name:"number"},description:"Current zoom level",defaultValue:{value:"1",computed:!1}},pan:{required:!1,tsType:{name:"signature",type:"object",raw:"{ x: number; y: number }",signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]}},description:"Current pan offset",defaultValue:{value:"{ x: 0, y: 0 }",computed:!1}},strokeColor:{required:!1,tsType:{name:"string"},description:"Line color",defaultValue:{value:'"#94a3b8"',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"Line width",defaultValue:{value:"2",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const K={title:"KFlow/Atoms/MindMapConnections",component:y,parameters:{layout:"centered"},tags:["autodocs"],decorators:[u=>i.jsx("svg",{width:"400",height:"300",style:{border:"1px solid #e5e7eb"},children:i.jsx(u,{})})]},x=[{source:{x:200,y:50},target:{x:100,y:150}},{source:{x:200,y:50},target:{x:300,y:150}},{source:{x:200,y:50},target:{x:200,y:150}}],Z=[{source:{x:200,y:30},target:{x:80,y:100}},{source:{x:200,y:30},target:{x:200,y:100}},{source:{x:200,y:30},target:{x:320,y:100}},{source:{x:80,y:100},target:{x:40,y:180}},{source:{x:80,y:100},target:{x:120,y:180}},{source:{x:320,y:100},target:{x:280,y:180}},{source:{x:320,y:100},target:{x:360,y:180}}],o={args:{connections:x,zoom:1,pan:{x:0,y:0}}},t={args:{connections:Z,zoom:1,pan:{x:0,y:0}}},s={args:{connections:x,strokeColor:"#3b82f6",strokeWidth:3}},a={args:{connections:[{source:{x:100,y:50},target:{x:50,y:100}},{source:{x:100,y:50},target:{x:150,y:100}}],zoom:1.5,pan:{x:50,y:25}}},c={args:{connections:x,zoom:1,pan:{x:-50,y:20}}};var f,C,h;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    connections: simpleConnections,
    zoom: 1,
    pan: {
      x: 0,
      y: 0
    }
  }
}`,...(h=(C=o.parameters)==null?void 0:C.docs)==null?void 0:h.source}}};var b,M,k;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    connections: treeConnections,
    zoom: 1,
    pan: {
      x: 0,
      y: 0
    }
  }
}`,...(k=(M=t.parameters)==null?void 0:M.docs)==null?void 0:k.source}}};var v,S,q;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    connections: simpleConnections,
    strokeColor: "#3b82f6",
    strokeWidth: 3
  }
}`,...(q=(S=s.parameters)==null?void 0:S.docs)==null?void 0:q.source}}};var T,j,z;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    connections: [{
      source: {
        x: 100,
        y: 50
      },
      target: {
        x: 50,
        y: 100
      }
    }, {
      source: {
        x: 100,
        y: 50
      },
      target: {
        x: 150,
        y: 100
      }
    }],
    zoom: 1.5,
    pan: {
      x: 50,
      y: 25
    }
  }
}`,...(z=(j=a.parameters)==null?void 0:j.docs)==null?void 0:z.source}}};var W,$,w;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    connections: simpleConnections,
    zoom: 1,
    pan: {
      x: -50,
      y: 20
    }
  }
}`,...(w=($=c.parameters)==null?void 0:$.docs)==null?void 0:w.source}}};const O=["Default","TreeStructure","CustomColor","Zoomed","WithPan"];export{s as CustomColor,o as Default,t as TreeStructure,c as WithPan,a as Zoomed,O as __namedExportsOrder,K as default};
