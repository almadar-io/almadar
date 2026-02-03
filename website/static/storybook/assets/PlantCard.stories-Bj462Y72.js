import{j as e}from"./jsx-runtime-CDt2p4po.js";import{P as r}from"./PlantCard-DBgZC5NZ.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";import"./Card-BNT5PrJ5.js";import"./Badge-CpH0PNM6.js";import"./Button-Dn0472P0.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./Box-DYJzRMmP.js";import"./Stack-DhhoTPuC.js";import"./Typography-Wmkp-g7N.js";import"./GrowthMeter-CJHkjVjN.js";import"./useEventBus-BNZMNlv8.js";import"./sprout-DtMiqT4n.js";import"./leaf-BDxyAs1g.js";import"./TrustMeter-CMZeLnbQ.js";import"./award-DIurtA9C.js";import"./shield-CEa1K-yC.js";import"./CareIndicator-Cytufey8.js";import"./star-D_3mxVsm.js";import"./truck-CSOrl2J5.js";import"./credit-card-CQwe3_yO.js";import"./message-circle-Yw7MGdXs.js";import"./alert-circle-CBFh8Gcj.js";const re={title:"Clients/Winning-11/Molecules/PlantCard",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{growthStage:{control:{type:"range",min:0,max:100}},trustLevel:{control:"select",options:["seedling","growing","mature","flourishing"]}}},t={args:{name:"Green Valley Farm",type:"Organic Producer",growthStage:45,trustLevel:"growing"}},a={args:{name:"Sunrise Orchards",type:"Fruit Supplier",growthStage:15,trustLevel:"seedling",lastInteraction:"2 days ago"}},n={args:{name:"Heritage Grains Co.",type:"Grain Supplier",growthStage:85,trustLevel:"flourishing",lastInteraction:"Yesterday"}},s={args:{name:"Mountain Dairy",type:"Dairy Producer",growthStage:60,trustLevel:"mature",needsAttention:!0,careNeeds:[{type:"communication",urgency:"high"},{type:"payment",urgency:"medium"}],lastInteraction:"2 weeks ago"}},o={args:{name:"River Valley Produce",type:"Vegetable Supplier",growthStage:50,trustLevel:"growing",careNeeds:[{type:"feedback",urgency:"low"},{type:"delivery",urgency:"medium"}]}},i={args:{name:"Coastal Fisheries",type:"Seafood Supplier",growthStage:70,trustLevel:"mature",onClick:()=>alert("Card clicked!")}},c={render:()=>e.jsxs("div",{className:"grid w-[600px] grid-cols-2 gap-4",children:[e.jsx(r,{name:"Green Valley Farm",type:"Organic Producer",growthStage:85,trustLevel:"flourishing"}),e.jsx(r,{name:"Sunrise Orchards",type:"Fruit Supplier",growthStage:45,trustLevel:"growing",needsAttention:!0,careNeeds:[{type:"communication",urgency:"medium"}]}),e.jsx(r,{name:"Heritage Grains",type:"Grain Supplier",growthStage:20,trustLevel:"seedling",lastInteraction:"Today"}),e.jsx(r,{name:"Mountain Dairy",type:"Dairy Producer",growthStage:65,trustLevel:"mature",careNeeds:[{type:"payment",urgency:"high"},{type:"feedback",urgency:"low"}]})]})};var p,g,u;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    name: 'Green Valley Farm',
    type: 'Organic Producer',
    growthStage: 45,
    trustLevel: 'growing'
  }
}`,...(u=(g=t.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var m,l,d;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    name: 'Sunrise Orchards',
    type: 'Fruit Supplier',
    growthStage: 15,
    trustLevel: 'seedling',
    lastInteraction: '2 days ago'
  }
}`,...(d=(l=a.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var y,h,S;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    name: 'Heritage Grains Co.',
    type: 'Grain Supplier',
    growthStage: 85,
    trustLevel: 'flourishing',
    lastInteraction: 'Yesterday'
  }
}`,...(S=(h=n.parameters)==null?void 0:h.docs)==null?void 0:S.source}}};var w,v,C;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    name: 'Mountain Dairy',
    type: 'Dairy Producer',
    growthStage: 60,
    trustLevel: 'mature',
    needsAttention: true,
    careNeeds: [{
      type: 'communication',
      urgency: 'high'
    }, {
      type: 'payment',
      urgency: 'medium'
    }],
    lastInteraction: '2 weeks ago'
  }
}`,...(C=(v=s.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var L,P,f;o.parameters={...o.parameters,docs:{...(L=o.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    name: 'River Valley Produce',
    type: 'Vegetable Supplier',
    growthStage: 50,
    trustLevel: 'growing',
    careNeeds: [{
      type: 'feedback',
      urgency: 'low'
    }, {
      type: 'delivery',
      urgency: 'medium'
    }]
  }
}`,...(f=(P=o.parameters)==null?void 0:P.docs)==null?void 0:f.source}}};var N,G,k;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    name: 'Coastal Fisheries',
    type: 'Seafood Supplier',
    growthStage: 70,
    trustLevel: 'mature',
    onClick: () => alert('Card clicked!')
  }
}`,...(k=(G=i.parameters)==null?void 0:G.docs)==null?void 0:k.source}}};var x,b,D;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div className="grid w-[600px] grid-cols-2 gap-4">
      <PlantCard name="Green Valley Farm" type="Organic Producer" growthStage={85} trustLevel="flourishing" />
      <PlantCard name="Sunrise Orchards" type="Fruit Supplier" growthStage={45} trustLevel="growing" needsAttention careNeeds={[{
      type: 'communication',
      urgency: 'medium'
    }]} />
      <PlantCard name="Heritage Grains" type="Grain Supplier" growthStage={20} trustLevel="seedling" lastInteraction="Today" />
      <PlantCard name="Mountain Dairy" type="Dairy Producer" growthStage={65} trustLevel="mature" careNeeds={[{
      type: 'payment',
      urgency: 'high'
    }, {
      type: 'feedback',
      urgency: 'low'
    }]} />
    </div>
}`,...(D=(b=c.parameters)==null?void 0:b.docs)==null?void 0:D.source}}};const te=["Default","NewRelationship","EstablishedPartner","NeedsAttention","WithCareNeeds","Clickable","CardGrid"];export{c as CardGrid,i as Clickable,t as Default,n as EstablishedPartner,s as NeedsAttention,a as NewRelationship,o as WithCareNeeds,te as __namedExportsOrder,re as default};
