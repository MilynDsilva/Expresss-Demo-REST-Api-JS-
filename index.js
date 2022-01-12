const Joi = require('joi'); //class is returend // pascal convention
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id:1,name:'course1'},{id:2,name:'course2'},{id:3,name:'course2'}
]

//4-6 = route
app.get('/',(req,res)=>{
    res.send('Hello world!');
});

app.get('/api/coursesz',(req,res)=>{
    res.send(JSON.stringify([1,2,3]));
});

app.get('/api/courses',(req,res)=>{
   // res.send([1,2,3]);
   res.send(courses);
});

app.get('/api/courses/:id',(req,res)=>{
  const coursefound =  courses.find(c=>c.id === parseInt(req.params.id));
  if(!coursefound) res.status(404).send('Course does not exist ');//404
  res.send(coursefound);
});

// app.post('/api/courses',(req,res)=>{
//     if(!req.body.name || req.body.name.length <3){ //security purpose
//         //400 bad request
//         res.status(400).send('Name is required and show be min 3 chars');
//         return; //exits here 
//     }
//     const course = {
//         id: courses.length+1,
//         name: req.body.name
//     };
//     courses.push(course);
//     res.send(course); 
// });

app.post('/api/courses',(req,res)=>{
    const result = validateCourse(req.body);
    // const schema = {
    //     name: Joi.string().min(3).required()
    // };

    // const result = Joi.validate(req.body,schema);
    // console.log(result);

    if(result.error){
    //400 bad request
        res.status(400).send(result.error.details[0].message);
        return; //exits here 
    }
    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course); 
});

app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.params);
});

app.put('/api/courses/:id',(req,res)=>{
//look up for the course
const coursefound = courses.find((c)=>c.id === parseInt(req.params.id));
if(!coursefound) res.status(404).send('Course id does not exist');
res.send(coursefound);
//const result = validateCourse(req.body);
const {error} = validateCourse(req.body); //object destructuring // equal to result.error


//not existing? then return 404 status
// const schema = {
//     name:Joi.string().min(3).required()
// };
// //validate
// const result = Joi.validate(req.body.schema);
//if invalid then return 400 status - bad request
if(error){
    res.status(400).send('Invalid request'+error.details[0].message);
    return;
}

//update course

coursefound.name = req.body.name;
res.send(coursefound);
//return the updated course
});
app.delete('/api/courses/:id',(req,res)=>{
    //look up the course
    //not existing, return 404
    const coursefound = courses.find((c)=>c.id === parseInt(req.params.id));
    if(!coursefound) res.status(404).send('Course id does not exist');
        //res.send(coursefound);

    //delete
    const index = courses.indexOf(coursefound);
    //const data = courses.pop(index);

    courses.splice(index,1);
    //return the same course
    //return data;
    res.send(courses);
});

// app.get('/api/posts/:year/:month',(req,res)=>{
//     res.send(req.query);
// });
//http://localhost:3000/api/posts/2021/1?sortBy=name
//query string

function validateCourse(course) {
    const schema = {
        name:Joi.string().min(3).required()
    };
    return Joi.validate(course,schema)
}


//PORT
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening to port ${port}`));
//nodemon for auto restart server and update content
//npm i -g nodemon


//50:24 / 58:39 cwm

//Making use of express , nodemon , joi@13.1.0 vs