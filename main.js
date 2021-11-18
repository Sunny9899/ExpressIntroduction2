const express= require("express");

const books=require("./books.json");

const app=express();

app.use(express.json());

//1 GET
app.get("/",(req,res)=>{
    res.send({books});
})

//2 POST
app.post("/books",(req,res)=>{
    const newBooks=[...books,req.body];
   // console.log(newBooks);
    res.send(newBooks);

})


//3 GET (Single Book) 
app.get("/books/:id",(req,res)=>{
    //console.log(req.params.id);
    const oneBook=books.filter((book)=> book.id==req.params.id);
    //console.log(oneBook);
    res.send(oneBook);
})

//4 PATCH
app.patch("/books/:id",(req,res)=>{
    const replaceBook=books.map(book=>{
        if(req.params.id==book.id){
            return req.body;
        }
        return book;
    })
    res.send(replaceBook);
})

//5 DELETE
app.delete("/books:id",(req,res)=>{
    const delBook=books.filter((book)=> book.id!=req.params.id);
    res.send(delBook);
})

app.listen(1234,()=>{
    console.log("Listening to port 1234");
})