
let http = require("http")
let server = http.createServer((req,res)=>{
    console.log("HEy im server");
    res.end("chilla mat lala, mara jayega!")
})

server.listen(3000, ()=>{
    console.log("server running on 3000");
    
});

