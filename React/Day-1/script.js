let root = document.querySelector("#root")

let rh1 = React.createElement(
    "h1",
    {className : "reactH1"},
    "I'm React h1"
)
let rh2 = React.createElement(
    "h2",
    {className : "reactH2"},
    "I'm React h2"
)
let elemArr = [rh1,rh2]
let rootOfReact = ReactDOM.createRoot(root)
rootOfReact.render(elemArr)


