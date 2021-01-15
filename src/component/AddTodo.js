import {Button, Container, Grid, TextField, Typography } from '@material-ui/core'
// import { db, auth, storage } from '../firebase'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { useHistory } from 'react-router-dom'
function AddTodo(props) {
    // let history = useHistory()
    var today = new Date(),
    currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    const [title, setTitle] = useState('')
    const [date, setDate] = useState(currentDate)
    const [time, setTime] = useState('12:00')
    const [description,setDescription] = useState('')
    const [userId,setUserId] =useState(null)
    
    useEffect(()=>{
        // var user = JSON.parse(localStorage.getItem("user"))
        // user===null ? history.push('/signin'):setUserId(user.uid)
    })
    
    const reset=()=>{
        setTitle("")
        setDate(currentDate)
        setTime("12:00")
        setDescription("")
    }
    const handleSubmit = (e) =>{
        e.preventDefault()  
        debugger
        console.log("it's call")
        // var conDate=date.split("-")
        // var conTime=time.split(":")
        // // console.log(conDate)
        // if(conTime == "")
        // {
        //     conTime[0]="12"
        //     conTime[1]="00"
        // }
        // var conDateTime=Date(conDate[0],conDate[1],conDate[2],conTime[0],conTime[1])
        // db.collection("tasks").add({
        //     title,
        //     description,
        //     dateTime:conDateTime.toLocaleString(),
        //     entryTime:Date().toLocaleString(),  
        //     user:userId,
        //     status:false
        // })
        // .then(function() {
        //     toast.info("Added new task")
        //     // console.log("Document successfully written!")
        //     reset()
        // })
        // .catch(function(error) {
        //     toast.error("Something went wrong!")
        //     console.error("Error writing document: ", error);
        // });
    } 
    return (
        <div>
            <ToastContainer />
            <Container className="">
                <div className="">
                    <Typography component="h1" variant="h5" className="signup__smallBottomMargin">
                        Add Task
                    </Typography>
                    <form noValidate className="signup__form signup__smallTopMargin">
                        <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="title"
                                name="title"
                                variant="outlined"
                                required
                                fullWidth
                                id="title"
                                label="Task Title"
                                autoFocus
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="date"
                                name="date"
                                type="date"
                                variant="outlined"
                                required
                                fullWidth
                                id="date"
                                label="Task Date"
                                autoFocus
                                onChange={(e) => setDate(e.target.value)}
                                value={date}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                type="time"
                                required
                                fullWidth
                                id="time"
                                label="Task Time"
                                name="lastName"
                                autoComplete="time"
                                onChange={(e) => setTime(e.target.value)}
                                value={time}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required    
                                fullWidth
                                multiline
                                rows={7}
                                name="description"
                                label="Task Description"
                                id="description"
                                autoComplete="task-description"
                                onChange={(e)=>setDescription(e.target.value)}
                                value={description}
                            />
                        </Grid>
                        </Grid>
                        <Button
                            className="mt-1"
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Add Task
                        </Button>
                        
                    </form>
                </div>
            </Container>
        </div>
    );
}

export default AddTodo;