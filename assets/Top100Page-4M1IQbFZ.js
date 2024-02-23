import{r as d,u as B,a as z,j as e,F as K,b as $,T as L,c as j,d as A,e as O,f as R,g as b,h as U,A as P}from"./index-C1Y1nGWU.js";import{B as M}from"./BackToTopButton-DUtuoQXK.js";const I="CG-CkBdtnfSNEuwN9o3DFMjPMdS",Q=()=>{const[m,h]=d.useState([]),[t,v]=d.useState({key:null,direction:"desc"}),[u,f]=d.useState(""),[N,g]=d.useState(!1),p=d.useRef(null),k=B(),o=z(s=>s.favorites),w=s=>{k(`/cryptoverse-explorer/coins/${s.id}`)};d.useEffect(()=>{(async()=>{try{const n=await(await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false?x_cg_demo_api_key=${I}`)).json();h(n)}catch(r){console.error("Error fetching data:",r)}})();const a=r=>{r.key==="/"?(p.current.focus(),r.preventDefault()):r.key==="Escape"&&p.current.blur()};return document.addEventListener("keydown",a),()=>{document.removeEventListener("keydown",a)}},[]);const C=[...m].sort((s,a)=>t.direction==="desc"?s[t.key]>a[t.key]?-1:1:t.direction==="asc"?s[t.key]>a[t.key]?1:-1:0),_=s=>{let a="desc";t.key===s&&(a=t.direction==="desc"?"asc":"desc");let r=[...m];s==="favorite"?r=r.sort((n,x)=>{const i=o.includes(n.id),l=o.includes(x.id);return i&&!l?-1:!i&&l?1:i&&l?t.direction==="desc"?o.indexOf(n.id)-o.indexOf(x.id):o.indexOf(x.id)-o.indexOf(n.id):0}):r=r.sort((n,x)=>{const i=n[s],l=x[s];return i<l?a==="asc"?-1:1:i>l?a==="asc"?1:-1:0}),h(r),v({key:s,direction:a})},S=C.filter(s=>s.name.toLowerCase().includes(u.toLowerCase())||s.symbol.toLowerCase().includes(u.toLowerCase())),D=s=>{f(s.target.value),g(s.target.value!=="")},F=()=>{f(""),g(!1),p.current.focus()},T=s=>{s.key==="/"&&(p.current.focus(),s.preventDefault())},y=s=>t.key===s?t.direction==="desc"?e.jsx(b,{className:"inline p-0.5 pe-1"}):e.jsx(U,{className:"inline p-0.5 pe-1"}):e.jsx(b,{className:"opacity-25 group-hover:opacity-75 transition-opacity inline p-0.5 pe-1"}),c=({label:s,sortKey:a,className:r})=>e.jsxs("th",{className:`px-4 py-2 cursor-pointer group text-end ${r}`,onClick:()=>_(a),children:[s!=="Name"&&y(a),s,s==="Name"&&y(a)]}),E=({crypto:s,index:a})=>e.jsxs("tr",{className:`${a%2===0?"bg-zinc-200 dark:bg-zinc-700":"bg-gray-50 dark:bg-zinc-800"} cursor-pointer hover:bg-zinc-400 dark:hover:bg-zinc-500 transition-colors whitespace-nowrap `,onClick:()=>w(s),children:[e.jsx("td",{className:"px-4 py-2",children:s.market_cap_rank}),e.jsx("td",{className:"px-4 py-2",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("img",{className:"w-8 h-8 p-1",src:s.image,alt:`${s.name} Logo`}),e.jsx("span",{className:"ml-2",children:s.name})," ",e.jsx("span",{className:"inline-block text-gray-700 dark:text-gray-300 px-2 py-1 text-xs font-semibold uppercase",children:s.symbol})]})}),e.jsxs("td",{className:"px-4 py-2 text-end",children:["$",j(s.current_price)]}),e.jsxs("td",{className:"px-4 py-2 text-end",children:["$",j(s.market_cap)]}),e.jsxs("td",{className:`px-4 py-2 text-end ${s.price_change_percentage_24h>=0?"text-green-600":"text-red-600"}`,children:[s.price_change_percentage_24h>=0?e.jsx(A,{className:"p-0.5 pe-1 inline-flex"}):e.jsx(O,{className:"p-0.5 pe-1 inline-flex"}),s.price_change_percentage_24h,"%"]}),e.jsxs("td",{children:[" ",e.jsx(R,{id:s.id})]})]},s.id);return e.jsxs("div",{className:"container mx-auto ",children:[e.jsxs("div",{className:"inline-flex w-full ",children:[e.jsx("h2",{className:"text-3xl font-semibold mb-4",children:"Top 100 Cryptocurrencies"}),e.jsxs("form",{className:"ml-auto w-80",onSubmit:s=>s.preventDefault(),children:[e.jsx("label",{htmlFor:"default-search",className:"mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white",children:"Search"}),e.jsxs("div",{className:"relative group w-full",children:[e.jsx("div",{className:"absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none",children:e.jsx(K,{className:"opacity-40"})}),e.jsx("input",{id:"default-search",className:"block w-full p-3 px-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ",placeholder:"Search Top 100 Cryptocurrencies",required:!0,value:u,onChange:D,onKeyDown:T,ref:p}),N?e.jsx("button",{type:"button",className:"absolute inset-y-0 hover:scale-105 pointer-cursor border-none end-0 flex items-center pr-3",onClick:F,children:e.jsx($,{className:"opacity-40"})}):e.jsx("div",{className:"absolute group group-focus-within:invisible inset-y-0 end-0 flex items-center pr-3",children:e.jsxs("div",{className:"relative",children:[e.jsx("kbd",{className:"px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500",children:"/"}),e.jsx(L,{className:"opacity-0 z-50 -bottom-12 group-hover:-bottom-10 group-hover:opacity-100 whitespace-nowrap",content:"Use to trigger search",showArrow:!1})]})})]})]})]}),e.jsx("div",{className:"w-full overflow-x-auto",children:e.jsxs("table",{className:"table-auto w-full rounded-lg overflow-hidden ",children:[e.jsx("thead",{className:"bg-zinc-300 dark:bg-zinc-900 whitespace-nowrap w-full ",children:e.jsxs("tr",{children:[e.jsx(c,{className:"w-10 text-end",label:"#",sortKey:"market_cap_rank"}),e.jsx(c,{className:"!text-start",label:"Name",sortKey:"name"}),e.jsx(c,{label:"Current Price (USD)",sortKey:"current_price"}),e.jsx(c,{label:"Market Cap (USD)",sortKey:"market_cap"}),e.jsx(c,{label:"24h Change (%)",sortKey:"price_change_percentage_24h"}),e.jsx(c,{className:"text-end ",label:"",sortKey:"favorite"})]})}),e.jsx("tbody",{children:S.map((s,a)=>e.jsx(E,{crypto:s,index:a},s.id))})]})})]})};function H(){return e.jsxs("div",{className:"transition-all duration-50 flex-grow bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-neutral-200  w-full",children:[e.jsxs("div",{className:"text-xl opacity-80 mt-4 mb-10 inline-flex items-center   space-x-5",children:["Cryptoverse ",e.jsx(P,{className:"mx-2"})," Explorer"]}),e.jsx("div",{className:"mx-auto mb-24  px-32",children:e.jsx(Q,{})}),e.jsx(M,{})]})}export{H as default};
