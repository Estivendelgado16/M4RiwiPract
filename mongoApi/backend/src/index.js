const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect('mongodb+srv://admin:admin.16@cluster0.vo8b6cn.mongodb.net/')
    .then(() => console.log('connected to mongobd'))
    .catch(err => console.log('ERROR TO CONECT', err))


const TareaSchema = new mongoose.Schema({
  titulo: String,
  completada: { type: Boolean, default: false }
});
const Tarea = mongoose.model('Tarea', TareaSchema);

app.post('/tareas', async (req, res) => {
  const nuevaTarea = new Tarea(req.body);
  await nuevaTarea.save();
  res.json(nuevaTarea);
});


app.get('/tareas', async (req, res) => {
  const tareas = await Tarea.find();
  res.json(tareas);
});


app.put('/tareas/:id', async (req, res) => {
  const tareaEditada = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(tareaEditada);
});


app.delete('/tareas/:id', async (req, res) => {
  await Tarea.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Tarea eliminada" });
});



app.listen(3000, () => console.log("🚀 Servidor en http://localhost:3000"));