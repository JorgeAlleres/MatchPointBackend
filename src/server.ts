import app from './app'

const PORT = process.env.PORT || 3000

app.use(ErrorMiddleware)

app.listen(PORT, ()=>{
    console.log("Servidor encendido en el puerto:"+PORT)
})

