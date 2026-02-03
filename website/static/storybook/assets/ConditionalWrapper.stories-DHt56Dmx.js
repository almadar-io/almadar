import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as y}from"./index-GiUgBvb1.js";import{C as l}from"./ConditionalWrapper-B0uLFjZO.js";import{I as x}from"./Input-DhFss4oc.js";import{S as J}from"./Select-CVuTODQb.js";import{V as o}from"./Stack-1XI3stiC.js";import{T as a}from"./Typography-Wmkp-g7N.js";import{B as r}from"./Box-DYJzRMmP.js";import"./SExpressionEvaluator-DyJCz_6e.js";import"./cn-BNf5BS2b.js";import"./chevron-down-BQmz_Bpa.js";import"./createLucideIcon-CbHznvEr.js";import"./x-prXd1WI5.js";const ie={title:"Atoms/ConditionalWrapper",component:l,parameters:{layout:"centered",backgrounds:{default:"wireframe"}},tags:["autodocs"]},d={args:{context:{formValues:{},globalVariables:{}},children:e.jsx(r,{padding:"md",border:!0,rounded:"md",children:e.jsx(a,{variant:"body",children:"This content is always visible (no condition)"})})}},c={args:{condition:["=","@entity.formValues.showContent",!0],context:{formValues:{showContent:!1},globalVariables:{}},children:e.jsx(r,{padding:"md",border:!0,rounded:"md",children:e.jsx(a,{variant:"body",children:"This content is hidden"})})}},m={args:{condition:["=","@entity.formValues.showContent",!0],context:{formValues:{showContent:!0},globalVariables:{}},children:e.jsx(r,{padding:"md",border:!0,rounded:"md",children:e.jsx(a,{variant:"body",children:"This content is visible because showContent is true"})})}},p={args:{condition:[">=","@entity.formValues.age",18],context:{formValues:{age:16},globalVariables:{}},fallback:e.jsx(r,{padding:"md",bg:"muted",rounded:"md",children:e.jsx(a,{variant:"body",color:"muted",children:"You must be 18 or older to see this content"})}),children:e.jsx(r,{padding:"md",border:!0,rounded:"md",children:e.jsx(a,{variant:"body",children:"Adult content visible"})})}},h={args:{condition:["=","@entity.formValues.expanded",!0],context:{formValues:{expanded:!0},globalVariables:{}},animate:!0,children:e.jsx(r,{padding:"md",border:!0,rounded:"md",children:e.jsx(a,{variant:"body",children:"This content animates in and out"})})}},i={render:function(){const[t,u]=y.useState("personal"),n={formValues:{vehicleType:t},globalVariables:{}};return e.jsxs(o,{gap:"md",className:"w-80",children:[e.jsxs(o,{gap:"xs",children:[e.jsx(a,{variant:"label",weight:"bold",children:"Vehicle Type"}),e.jsx(J,{value:t,onChange:g=>u(g.target.value),options:[{value:"personal",label:"Personal"},{value:"commercial",label:"Commercial"}]})]}),e.jsx(l,{condition:["=","@entity.formValues.vehicleType","commercial"],context:n,children:e.jsxs(o,{gap:"xs",children:[e.jsx(a,{variant:"label",weight:"bold",children:"Commercial License Number"}),e.jsx(x,{placeholder:"Enter license number"})]})}),e.jsx(l,{condition:["=","@entity.formValues.vehicleType","commercial"],context:n,children:e.jsxs(o,{gap:"xs",children:[e.jsx(a,{variant:"label",weight:"bold",children:"Fleet Size"}),e.jsx(x,{type:"number",placeholder:"Number of vehicles"})]})})]})}},s={render:function(){const[t,u]=y.useState(2e3),[n,g]=y.useState(!1),V={formValues:{weight:t,hasPermit:n},globalVariables:{}};return e.jsxs(o,{gap:"md",className:"w-96",children:[e.jsxs(o,{gap:"xs",children:[e.jsx(a,{variant:"label",weight:"bold",children:"Vehicle Weight (kg)"}),e.jsx(x,{type:"number",value:t,onChange:b=>u(Number(b.target.value))})]}),e.jsx(o,{gap:"xs",children:e.jsxs(a,{variant:"label",weight:"bold",children:[e.jsx("input",{type:"checkbox",checked:n,onChange:b=>g(b.target.checked),className:"mr-2"}),"Has Heavy Vehicle Permit"]})}),e.jsx(l,{condition:["and",[">=","@entity.formValues.weight",3500],["not","@entity.formValues.hasPermit"]],context:V,children:e.jsx(r,{padding:"md",bg:"muted",rounded:"md",className:"border-l-4 border-amber-500",children:e.jsx(a,{variant:"body",color:"warning",children:"Warning: Vehicles over 3500kg require a heavy vehicle permit"})})}),e.jsx(l,{condition:["and",[">=","@entity.formValues.weight",3500],"@entity.formValues.hasPermit"],context:V,children:e.jsx(r,{padding:"md",bg:"muted",rounded:"md",className:"border-l-4 border-emerald-500",children:e.jsx(a,{variant:"body",color:"success",children:"Heavy vehicle permit verified"})})})]})}};var v,f,T;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    context: {
      formValues: {},
      globalVariables: {}
    },
    children: <Box padding="md" border rounded="md">
        <Typography variant="body">This content is always visible (no condition)</Typography>
      </Box>
  }
}`,...(T=(f=d.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};var C,w,j;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    condition: ['=', '@entity.formValues.showContent', true],
    context: {
      formValues: {
        showContent: false
      },
      globalVariables: {}
    },
    children: <Box padding="md" border rounded="md">
        <Typography variant="body">This content is hidden</Typography>
      </Box>
  }
}`,...(j=(w=c.parameters)==null?void 0:w.docs)==null?void 0:j.source}}};var S,k,W;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    condition: ['=', '@entity.formValues.showContent', true],
    context: {
      formValues: {
        showContent: true
      },
      globalVariables: {}
    },
    children: <Box padding="md" border rounded="md">
        <Typography variant="body">This content is visible because showContent is true</Typography>
      </Box>
  }
}`,...(W=(k=m.parameters)==null?void 0:k.docs)==null?void 0:W.source}}};var B,N,P;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    condition: ['>=', '@entity.formValues.age', 18],
    context: {
      formValues: {
        age: 16
      },
      globalVariables: {}
    },
    fallback: <Box padding="md" bg="muted" rounded="md">
        <Typography variant="body" color="muted">You must be 18 or older to see this content</Typography>
      </Box>,
    children: <Box padding="md" border rounded="md">
        <Typography variant="body">Adult content visible</Typography>
      </Box>
  }
}`,...(P=(N=p.parameters)==null?void 0:N.docs)==null?void 0:P.source}}};var H,I,A;h.parameters={...h.parameters,docs:{...(H=h.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    condition: ['=', '@entity.formValues.expanded', true],
    context: {
      formValues: {
        expanded: true
      },
      globalVariables: {}
    },
    animate: true,
    children: <Box padding="md" border rounded="md">
        <Typography variant="body">This content animates in and out</Typography>
      </Box>
  }
}`,...(A=(I=h.parameters)==null?void 0:I.docs)==null?void 0:A.source}}};var F,D,E,q,z;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: function InteractiveDemo() {
    const [vehicleType, setVehicleType] = useState('personal');
    const context = {
      formValues: {
        vehicleType
      },
      globalVariables: {}
    };
    return <VStack gap="md" className="w-80">
        <VStack gap="xs">
          <Typography variant="label" weight="bold">Vehicle Type</Typography>
          <Select value={vehicleType} onChange={e => setVehicleType(e.target.value)} options={[{
          value: 'personal',
          label: 'Personal'
        }, {
          value: 'commercial',
          label: 'Commercial'
        }]} />
        </VStack>

        <ConditionalWrapper condition={['=', '@entity.formValues.vehicleType', 'commercial']} context={context}>
          <VStack gap="xs">
            <Typography variant="label" weight="bold">Commercial License Number</Typography>
            <Input placeholder="Enter license number" />
          </VStack>
        </ConditionalWrapper>

        <ConditionalWrapper condition={['=', '@entity.formValues.vehicleType', 'commercial']} context={context}>
          <VStack gap="xs">
            <Typography variant="label" weight="bold">Fleet Size</Typography>
            <Input type="number" placeholder="Number of vehicles" />
          </VStack>
        </ConditionalWrapper>
      </VStack>;
  }
}`,...(E=(D=i.parameters)==null?void 0:D.docs)==null?void 0:E.source},description:{story:"Interactive example showing conditional form fields",...(z=(q=i.parameters)==null?void 0:q.docs)==null?void 0:z.description}}};var L,O,R,Y,_;s.parameters={...s.parameters,docs:{...(L=s.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: function ComplexDemo() {
    const [weight, setWeight] = useState(2000);
    const [hasPermit, setHasPermit] = useState(false);
    const context = {
      formValues: {
        weight,
        hasPermit
      },
      globalVariables: {}
    };
    return <VStack gap="md" className="w-96">
        <VStack gap="xs">
          <Typography variant="label" weight="bold">Vehicle Weight (kg)</Typography>
          <Input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} />
        </VStack>

        <VStack gap="xs">
          <Typography variant="label" weight="bold">
            <input type="checkbox" checked={hasPermit} onChange={e => setHasPermit(e.target.checked)} className="mr-2" />
            Has Heavy Vehicle Permit
          </Typography>
        </VStack>

        <ConditionalWrapper condition={['and', ['>=', '@entity.formValues.weight', 3500], ['not', '@entity.formValues.hasPermit']]} context={context}>
          <Box padding="md" bg="muted" rounded="md" className="border-l-4 border-amber-500">
            <Typography variant="body" color="warning">
              Warning: Vehicles over 3500kg require a heavy vehicle permit
            </Typography>
          </Box>
        </ConditionalWrapper>

        <ConditionalWrapper condition={['and', ['>=', '@entity.formValues.weight', 3500], '@entity.formValues.hasPermit']} context={context}>
          <Box padding="md" bg="muted" rounded="md" className="border-l-4 border-emerald-500">
            <Typography variant="body" color="success">
              Heavy vehicle permit verified
            </Typography>
          </Box>
        </ConditionalWrapper>
      </VStack>;
  }
}`,...(R=(O=s.parameters)==null?void 0:O.docs)==null?void 0:R.source},description:{story:"Complex condition example with AND/OR logic",...(_=(Y=s.parameters)==null?void 0:Y.docs)==null?void 0:_.description}}};const se=["AlwaysVisible","ConditionallyHidden","ConditionallyVisible","WithFallback","WithAnimation","InteractiveFormFields","ComplexConditions"];export{d as AlwaysVisible,s as ComplexConditions,c as ConditionallyHidden,m as ConditionallyVisible,i as InteractiveFormFields,h as WithAnimation,p as WithFallback,se as __namedExportsOrder,ie as default};
