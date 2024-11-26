var express = require("express"),
  bodyParser = require("body-parser")
  const cors =require("cors");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());//si se quisiera meter requerimentos o excepciones, habria que meterlo en los parentesis, como lo dejamos en blanco, vale con todo
app.use(bodyParser.json());

//tengo que ir modificando de aqui
app.use("/profesor", require("./routes/profesor"));
app.use("/alumno", require("./routes/alumno"));
app.use("/curso", require("./routes/curso"));
app.use("/gestion", require("./routes/gestion"));


const PORT = process.env.PORT || 3000;
app.listen(PORT);

console.debug("Server listening on port: " + PORT);