import React, { useState } from 'react'
import { Card, CardContent, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import {DragDropContext,Draggable,Droppable} from 'react-beautiful-dnd'
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Board(props) {
  const classes = useStyles();

  const [tasks,setTasks] = useState([
    {id:"10",title:"task 10"},
    {id:"11",title:"task 11"},
    {id:"12",title:"task 12"},
    {id:"13",title:"task 13"},
    {id:"14",title:"task 14"},
    {id:"15",title:"task 15"},
  ])

  const [inProgressTask,setInProgressTask] = useState([
    {id:"6",title:"task 6"},
    {id:"7",title:"task 7"},
    {id:"8",title:"task 8"},
    {id:"9",title:"task 9"},
  ])
  const [comletedTask,setComletedTask] = useState([
    {id:"1",title:"task 1"},
    {id:"2",title:"task 2"},
    {id:"3",title:"task 3"},
    {id:"4",title:"task 4"},
    {id:"5",title:"task 5"},
  ])

const handleOnDragEnd = (result) => {
    // console.log(result)
    const {destination,source,reason} = result 
    const tasksObj = Object.assign([],tasks)
    const inProgressTaskObj = Object.assign([],inProgressTask)
    const comletedTaskObj = Object.assign([],comletedTask)

    const droppedTask = tasks[source.index]
    const droppedInProgressTask = inProgressTask[source.index]
    const droppedCompletedTask = comletedTask[source.index]

    if(!destination || reason ==='CANCEL'){
      return
    }
    if(destination.droppableId === source.droppableId && destination.index === source.index){
      return
    }
    if(source.droppableId === "tasksCompleted" && destination.droppableId === "tasksInProgress"){
      return
    }
    if(source.droppableId === "tasks" && destination.droppableId === "tasksCompleted"){
      return
    }
    if(source.droppableId === "tasks" && destination.droppableId === "tasksInProgress"){
      tasksObj.splice(source.index,1)
      inProgressTaskObj.splice(destination.index,0,droppedTask)
      setTasks(tasksObj)
      setInProgressTask(inProgressTaskObj)
      return
    }
    if(source.droppableId === "tasksInProgress" && destination.droppableId === "tasks"){
      inProgressTaskObj.splice(source.index,1)
      tasksObj.splice(destination.index,0,droppedInProgressTask)
      setTasks(tasksObj)
      setInProgressTask(inProgressTaskObj)
      return
    }
    if(source.droppableId === "tasksInProgress" && destination.droppableId === "tasksCompleted"){
      inProgressTaskObj.splice(source.index,1)
      comletedTaskObj.splice(destination.index,0,droppedInProgressTask)
      setInProgressTask(inProgressTaskObj)
      setComletedTask(comletedTaskObj)
      return
    }
   
    switch(destination.droppableId)
    {
      case "tasks":
        tasksObj.splice(source.index,1)
        tasksObj.splice(destination.index,0,droppedTask)
        setTasks(tasksObj)
        return
      case "tasksInProgress":
        inProgressTaskObj.splice(source.index,1)
        inProgressTaskObj.splice(destination.index,0,droppedInProgressTask)
        setInProgressTask(inProgressTaskObj)
        return
      case "tasksCompleted":
        comletedTaskObj.splice(source.index,1)
        comletedTaskObj.splice(destination.index,0,droppedCompletedTask)
        setComletedTask(comletedTaskObj)
        return
      default: return
    }
}

  return (
    <DragDropContext onDragEnd={(data) => handleOnDragEnd(data)}>
    <Container>
      <Grid container spacing={3} direction="row">
        <Grid item xs={4}>
        
          <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                TASKS LIST
                </Typography>
                {/* <DragDropContext onDragEnd={(data) => handleOnDragEnd(data)}> */}
                <Droppable droppableId="tasks">
                {
                    (provided)=>(
                        <div className="task-container" {...provided.droppableProps} ref={provided.innerRef}>
                        {
                            tasks.length > 0 
                            && tasks.map( (task,index) => 
                            <Draggable key={task.id} index={index} draggableId={task.id}>
                                {
                                    (provided) => (
                                        <p className="btn-task secondary" 
                                        ref={provided.innerRef} 
                                        {...provided.draggableProps} 
                                        {...provided.dragHandleProps}
                                        >
                                            { task.title }
                                        </p>
                                    )
                                }
                            </Draggable>
                            )
                        }
                        {
                            provided.placeholder
                        }
                        </div>
                    )
                }
                </Droppable>
                {/* </DragDropContext> */}
            </CardContent >
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                TASKS IN PROGRESS
              </Typography>
              {/* <DragDropContext onDragEnd={(data) => handleOnDragEnd(data)}> */}
                <Droppable droppableId="tasksInProgress">
                  {
                    (provided) => (
                      <div className="task-container" 
                      {...provided.droppableProps} 
                      ref={provided.innerRef}
                      >
                      {
                        inProgressTask.length > 0 
                        && inProgressTask.map( (task,index) => 
                        <Draggable key={task.id} index={index} draggableId={task.id}>
                        {
                          (provided) => (
                            <p className="btn-task primary" 
                            ref={provided.innerRef} 
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            >
                            { task.title }
                            </p>
                          )
                        }
                        </Draggable>
                        )
                      }
                      {
                          provided.placeholder
                      }
                      </div>
                    )
                   }
                  
                </Droppable>
              {/* </DragDropContext> */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                TASKS FINISHED SUCCESSFULLY
              </Typography>
              {/* <DragDropContext onDragEnd={(data)=>{handleOnDragEnd(data)}}> */}
              <Droppable droppableId="tasksCompleted">
                {
                  (provided) =>(
                    <div className="task-container"
                    {...provided.droppableProps} 
                    ref={provided.innerRef}>
                    {
                      comletedTask.length > 0 
                      && comletedTask.map((task,index) => 
                        <Draggable draggableId={task.id}  index={index} key={task.id}>
                        {
                          (provided) => (
                            <p className="btn-task success"
                            ref={provided.innerRef} 
                            {...provided.draggableProps} 
                            {...provided.dragHandleProps}
                            >
                              { task.title }
                            </p>
                          )
                        }
                        </Draggable>
                      )
                    }
                    {
                      provided.placeholder
                    }
                  </div>
                  )
                }
              </Droppable>  
              {/* </DragDropContext> */}
            </CardContent>
          </Card>
        </Grid>
      
      </Grid>
    </Container>
    </DragDropContext>
  );
}

export default Board;