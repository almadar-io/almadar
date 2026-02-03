import{C as O}from"./CodeBlock-uF8EdpE9.js";import"./jsx-runtime-CDt2p4po.js";import"./index-GiUgBvb1.js";import"./Box-DYJzRMmP.js";import"./cn-BNf5BS2b.js";import"./Button-B7t-_IKa.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./Badge-Dd4QqFOk.js";import"./Stack-1XI3stiC.js";import"./useEventBus-BNZMNlv8.js";import"./check-DliVttWt.js";import"./copy-B40iJsJp.js";const ee={title:"KFlow/Molecules/Markdown/CodeBlock",component:O,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{language:{control:"select",options:["javascript","typescript","python","rust","go","html","css","json","bash","text"]},showCopyButton:{control:"boolean"},showLanguageBadge:{control:"boolean"},maxHeight:{control:"text"}}},g=`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate the 10th Fibonacci number
const result = fibonacci(10);
console.log(result); // Output: 55`,$=`interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}! You are logged in as \${user.role}.\`;
}

const user: User = {
  id: "1",
  name: "Alice",
  email: "alice@example.com",
  role: "admin",
};

console.log(greetUser(user));`,F=`def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

# Example usage
numbers = [3, 6, 8, 10, 1, 2, 1]
print(quicksort(numbers))`,P=`fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    let sum: i32 = numbers
        .iter()
        .filter(|&x| x % 2 == 0)
        .map(|x| x * 2)
        .sum();

    println!("Sum of doubled even numbers: {}", sum);
}`,e={args:{code:g,language:"javascript",showCopyButton:!0,showLanguageBadge:!0}},a={args:{code:$,language:"typescript",showCopyButton:!0,showLanguageBadge:!0}},o={args:{code:F,language:"python",showCopyButton:!0,showLanguageBadge:!0}},r={args:{code:P,language:"rust",showCopyButton:!0,showLanguageBadge:!0}},t={args:{code:g,language:"javascript",showCopyButton:!1,showLanguageBadge:!0}},n={args:{code:g,language:"javascript",showCopyButton:!0,showLanguageBadge:!1}},s={args:{code:g,language:"javascript",showCopyButton:!1,showLanguageBadge:!1}},u={args:{code:`// A very long code block
${Array(50).fill('console.log("Line of code");').join(`
`)}`,language:"javascript",showCopyButton:!0,showLanguageBadge:!0,maxHeight:"200px"}},c={args:{code:globalThis.JSON.stringify({name:"kflow",version:"1.0.0",dependencies:{react:"^18.0.0",typescript:"^5.0.0"}},null,2),language:"json",showCopyButton:!0,showLanguageBadge:!0}};var i,p,d;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    code: javascriptCode,
    language: "javascript",
    showCopyButton: true,
    showLanguageBadge: true
  }
}`,...(d=(p=e.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var l,m,h;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    code: typescriptCode,
    language: "typescript",
    showCopyButton: true,
    showLanguageBadge: true
  }
}`,...(h=(m=a.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};var y,w,B;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    code: pythonCode,
    language: "python",
    showCopyButton: true,
    showLanguageBadge: true
  }
}`,...(B=(w=o.parameters)==null?void 0:w.docs)==null?void 0:B.source}}};var f,C,v;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    code: rustCode,
    language: "rust",
    showCopyButton: true,
    showLanguageBadge: true
  }
}`,...(v=(C=r.parameters)==null?void 0:C.docs)==null?void 0:v.source}}};var x,L,j;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    code: javascriptCode,
    language: "javascript",
    showCopyButton: false,
    showLanguageBadge: true
  }
}`,...(j=(L=t.parameters)==null?void 0:L.docs)==null?void 0:j.source}}};var b,S,k;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    code: javascriptCode,
    language: "javascript",
    showCopyButton: true,
    showLanguageBadge: false
  }
}`,...(k=(S=n.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var H,J,N;s.parameters={...s.parameters,docs:{...(H=s.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    code: javascriptCode,
    language: "javascript",
    showCopyButton: false,
    showLanguageBadge: false
  }
}`,...(N=(J=s.parameters)==null?void 0:J.docs)==null?void 0:N.source}}};var A,T,U;u.parameters={...u.parameters,docs:{...(A=u.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    code: \`// A very long code block
\${Array(50).fill('console.log("Line of code");').join("\\n")}\`,
    language: "javascript",
    showCopyButton: true,
    showLanguageBadge: true,
    maxHeight: "200px"
  }
}`,...(U=(T=u.parameters)==null?void 0:T.docs)==null?void 0:U.source}}};var q,E,M;c.parameters={...c.parameters,docs:{...(q=c.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    code: globalThis.JSON.stringify({
      name: "kflow",
      version: "1.0.0",
      dependencies: {
        react: "^18.0.0",
        typescript: "^5.0.0"
      }
    }, null, 2),
    language: "json",
    showCopyButton: true,
    showLanguageBadge: true
  }
}`,...(M=(E=c.parameters)==null?void 0:E.docs)==null?void 0:M.source}}};const ae=["JavaScript","TypeScript","Python","Rust","NoCopyButton","NoLanguageBadge","MinimalView","LimitedHeight","JsonExample"];export{e as JavaScript,c as JsonExample,u as LimitedHeight,s as MinimalView,t as NoCopyButton,n as NoLanguageBadge,o as Python,r as Rust,a as TypeScript,ae as __namedExportsOrder,ee as default};
