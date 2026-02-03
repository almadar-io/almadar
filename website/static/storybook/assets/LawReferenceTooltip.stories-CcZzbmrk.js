import{j as e}from"./jsx-runtime-CDt2p4po.js";import{L as a}from"./LawReferenceTooltip-Zz-7ZG0W.js";import{T as r}from"./Typography-Wmkp-g7N.js";import{V as p,H as u}from"./Stack-1XI3stiC.js";import{B as s}from"./Box-DYJzRMmP.js";import"./index-GiUgBvb1.js";import"./Divider-D6QVU1l7.js";import"./cn-BNf5BS2b.js";const H={title:"Atoms/LawReferenceTooltip",component:a,parameters:{layout:"centered",backgrounds:{default:"wireframe"}},tags:["autodocs"],argTypes:{position:{control:"select",options:["top","bottom","left","right"]}}},l={args:{reference:{law:"VVO",article:"8",lawName:"Verkehrsverordnung",clause:"Die zulassige Gesamtmasse darf 3500 kg nicht uberschreiten."},children:e.jsx(r,{variant:"small",className:"text-blue-600 underline cursor-help",children:"VVO 8"})}},t={args:{reference:{law:"TPED",article:"Art. 5 Abs. 2",lawName:"Transportable Pressure Equipment Directive",clause:"Equipment shall be designed to withstand internal pressure without permanent deformation.",link:"https://example.com/tped"},children:e.jsx(r,{variant:"small",className:"text-blue-600 underline cursor-help",children:"TPED Art. 5"})}},o={args:{reference:{law:"StVO",article:"23"},children:e.jsx(r,{variant:"small",className:"text-blue-600 underline cursor-help",children:"StVO 23"})}},n={render:()=>e.jsx(s,{padding:"2xl",children:e.jsxs(p,{gap:"xl",align:"center",children:[e.jsx(a,{position:"bottom",reference:{law:"VVO",article:"8",clause:"Tooltip appears below"},children:e.jsx(r,{variant:"small",className:"text-blue-600 underline cursor-help",children:"Bottom Position"})}),e.jsxs(u,{gap:"xl",children:[e.jsx(a,{position:"right",reference:{law:"VVO",article:"8",clause:"Tooltip appears to the right"},children:e.jsx(r,{variant:"small",className:"text-blue-600 underline cursor-help",children:"Right Position"})}),e.jsx(a,{position:"left",reference:{law:"VVO",article:"8",clause:"Tooltip appears to the left"},children:e.jsx(r,{variant:"small",className:"text-blue-600 underline cursor-help",children:"Left Position"})})]}),e.jsx(a,{position:"top",reference:{law:"VVO",article:"8",clause:"Tooltip appears above"},children:e.jsx(r,{variant:"small",className:"text-blue-600 underline cursor-help",children:"Top Position (default)"})})]})})},i={render:()=>e.jsx(s,{padding:"lg",className:"w-96",children:e.jsxs(p,{gap:"md",children:[e.jsxs(p,{gap:"xs",children:[e.jsxs(u,{gap:"xs",align:"center",children:[e.jsx(r,{variant:"label",weight:"bold",children:"Vehicle Weight (kg)"}),e.jsx(a,{reference:{law:"VVO",article:"8 Abs. 3",lawName:"Verkehrsverordnung",clause:"Fahrzeuge mit einer zulassigen Gesamtmasse von mehr als 3500 kg benotigen eine Sondergenehmigung."},children:e.jsx(r,{variant:"caption",className:"text-blue-600 cursor-help",children:"[VVO 8]"})})]}),e.jsx(s,{as:"input",border:!0,rounded:"md",padding:"sm",fullWidth:!0,type:"number",placeholder:"Enter weight",className:"focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),e.jsxs(p,{gap:"xs",children:[e.jsxs(u,{gap:"xs",align:"center",children:[e.jsx(r,{variant:"label",weight:"bold",children:"Hazardous Materials"}),e.jsx(a,{reference:{law:"ADR",article:"Section 1.1.3.6",lawName:"Agreement concerning Dangerous Goods by Road",clause:"The carriage of dangerous goods is subject to compliance with specific conditions.",link:"https://example.com/adr"},children:e.jsx(r,{variant:"caption",className:"text-blue-600 cursor-help",children:"[ADR 1.1.3.6]"})})]}),e.jsxs(s,{as:"select",border:!0,rounded:"md",padding:"sm",fullWidth:!0,className:"focus:outline-none focus:ring-2 focus:ring-blue-500",children:[e.jsx("option",{value:"",children:"Select classification"}),e.jsx("option",{value:"class1",children:"Class 1 - Explosives"}),e.jsx("option",{value:"class2",children:"Class 2 - Gases"}),e.jsx("option",{value:"class3",children:"Class 3 - Flammable Liquids"})]})]})]})})},c={render:()=>e.jsx(s,{padding:"lg",children:e.jsxs(r,{variant:"body",children:["This inspection form requires compliance with multiple regulations including"," ",e.jsx(a,{reference:{law:"VVO",article:"8",lawName:"Verkehrsverordnung",clause:"Weight and dimension requirements for road vehicles."},children:e.jsx(r,{as:"span",variant:"body",className:"text-blue-600 underline cursor-help",children:"VVO 8"})}),","," ",e.jsx(a,{reference:{law:"ADR",article:"1.1.3.6",lawName:"Dangerous Goods Agreement",clause:"Specific requirements for dangerous goods transport."},children:e.jsx(r,{as:"span",variant:"body",className:"text-blue-600 underline cursor-help",children:"ADR 1.1.3.6"})}),", and"," ",e.jsx(a,{reference:{law:"TPED",article:"Art. 5",lawName:"Transportable Pressure Equipment",clause:"Design and manufacturing requirements for pressure equipment."},children:e.jsx(r,{as:"span",variant:"body",className:"text-blue-600 underline cursor-help",children:"TPED Art. 5"})}),"."]})})};var d,m,h;l.parameters={...l.parameters,docs:{...(d=l.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    reference: {
      law: 'VVO',
      article: '8',
      lawName: 'Verkehrsverordnung',
      clause: 'Die zulassige Gesamtmasse darf 3500 kg nicht uberschreiten.'
    },
    children: <Typography variant="small" className="text-blue-600 underline cursor-help">
        VVO 8
      </Typography>
  }
}`,...(h=(m=l.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};var g,f,x;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    reference: {
      law: 'TPED',
      article: 'Art. 5 Abs. 2',
      lawName: 'Transportable Pressure Equipment Directive',
      clause: 'Equipment shall be designed to withstand internal pressure without permanent deformation.',
      link: 'https://example.com/tped'
    },
    children: <Typography variant="small" className="text-blue-600 underline cursor-help">
        TPED Art. 5
      </Typography>
  }
}`,...(x=(f=t.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var T,b,w;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    reference: {
      law: 'StVO',
      article: '23'
    },
    children: <Typography variant="small" className="text-blue-600 underline cursor-help">
        StVO 23
      </Typography>
  }
}`,...(w=(b=o.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var y,V,v;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <Box padding="2xl">
      <VStack gap="xl" align="center">
        <LawReferenceTooltip position="bottom" reference={{
        law: 'VVO',
        article: '8',
        clause: 'Tooltip appears below'
      }}>
          <Typography variant="small" className="text-blue-600 underline cursor-help">
            Bottom Position
          </Typography>
        </LawReferenceTooltip>

        <HStack gap="xl">
          <LawReferenceTooltip position="right" reference={{
          law: 'VVO',
          article: '8',
          clause: 'Tooltip appears to the right'
        }}>
            <Typography variant="small" className="text-blue-600 underline cursor-help">
              Right Position
            </Typography>
          </LawReferenceTooltip>

          <LawReferenceTooltip position="left" reference={{
          law: 'VVO',
          article: '8',
          clause: 'Tooltip appears to the left'
        }}>
            <Typography variant="small" className="text-blue-600 underline cursor-help">
              Left Position
            </Typography>
          </LawReferenceTooltip>
        </HStack>

        <LawReferenceTooltip position="top" reference={{
        law: 'VVO',
        article: '8',
        clause: 'Tooltip appears above'
      }}>
          <Typography variant="small" className="text-blue-600 underline cursor-help">
            Top Position (default)
          </Typography>
        </LawReferenceTooltip>
      </VStack>
    </Box>
}`,...(v=(V=n.parameters)==null?void 0:V.docs)==null?void 0:v.source}}};var j,N,R;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <Box padding="lg" className="w-96">
      <VStack gap="md">
        <VStack gap="xs">
          <HStack gap="xs" align="center">
            <Typography variant="label" weight="bold">Vehicle Weight (kg)</Typography>
            <LawReferenceTooltip reference={{
            law: 'VVO',
            article: '8 Abs. 3',
            lawName: 'Verkehrsverordnung',
            clause: 'Fahrzeuge mit einer zulassigen Gesamtmasse von mehr als 3500 kg benotigen eine Sondergenehmigung.'
          }}>
              <Typography variant="caption" className="text-blue-600 cursor-help">
                [VVO 8]
              </Typography>
            </LawReferenceTooltip>
          </HStack>
          <Box as="input" border rounded="md" padding="sm" fullWidth
        // @ts-expect-error - input props
        type="number" placeholder="Enter weight" className="focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </VStack>

        <VStack gap="xs">
          <HStack gap="xs" align="center">
            <Typography variant="label" weight="bold">Hazardous Materials</Typography>
            <LawReferenceTooltip reference={{
            law: 'ADR',
            article: 'Section 1.1.3.6',
            lawName: 'Agreement concerning Dangerous Goods by Road',
            clause: 'The carriage of dangerous goods is subject to compliance with specific conditions.',
            link: 'https://example.com/adr'
          }}>
              <Typography variant="caption" className="text-blue-600 cursor-help">
                [ADR 1.1.3.6]
              </Typography>
            </LawReferenceTooltip>
          </HStack>
          <Box as="select" border rounded="md" padding="sm" fullWidth className="focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select classification</option>
            <option value="class1">Class 1 - Explosives</option>
            <option value="class2">Class 2 - Gases</option>
            <option value="class3">Class 3 - Flammable Liquids</option>
          </Box>
        </VStack>
      </VStack>
    </Box>
}`,...(R=(N=i.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var k,S,D;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <Box padding="lg">
      <Typography variant="body">
        This inspection form requires compliance with multiple regulations including{' '}
        <LawReferenceTooltip reference={{
        law: 'VVO',
        article: '8',
        lawName: 'Verkehrsverordnung',
        clause: 'Weight and dimension requirements for road vehicles.'
      }}>
          <Typography as="span" variant="body" className="text-blue-600 underline cursor-help">
            VVO 8
          </Typography>
        </LawReferenceTooltip>
        ,{' '}
        <LawReferenceTooltip reference={{
        law: 'ADR',
        article: '1.1.3.6',
        lawName: 'Dangerous Goods Agreement',
        clause: 'Specific requirements for dangerous goods transport.'
      }}>
          <Typography as="span" variant="body" className="text-blue-600 underline cursor-help">
            ADR 1.1.3.6
          </Typography>
        </LawReferenceTooltip>
        , and{' '}
        <LawReferenceTooltip reference={{
        law: 'TPED',
        article: 'Art. 5',
        lawName: 'Transportable Pressure Equipment',
        clause: 'Design and manufacturing requirements for pressure equipment.'
      }}>
          <Typography as="span" variant="body" className="text-blue-600 underline cursor-help">
            TPED Art. 5
          </Typography>
        </LawReferenceTooltip>
        .
      </Typography>
    </Box>
}`,...(D=(S=c.parameters)==null?void 0:S.docs)==null?void 0:D.source}}};const W=["Default","WithLink","MinimalReference","AllPositions","InFormContext","MultipleReferences"];export{n as AllPositions,l as Default,i as InFormContext,o as MinimalReference,c as MultipleReferences,t as WithLink,W as __namedExportsOrder,H as default};
