import React, { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { SwitchModal } from "./TaskField";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const PropertyTaskList = () => {
  const { propertyID } = useParams();

  const today = new Date();

  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);

  const fetchTasks = async () => {
    const result = await axios.get(`/api/propertyTasks/${propertyID}`);
    const upcomingTasks = [];
    const overdueTasks = [];
    const tasks = result.data.tasks;
    if (tasks.length > 0) {
      for (let i = 0; i < tasks.length; i++){
        if (tasks[i] !== undefined) {
          if (new Date(tasks[i][1]) <= today){
            overdueTasks.push(tasks[i]);
          } else {
            upcomingTasks.push(tasks[i]);
          }
        }
      }
      setOverdueTasks(overdueTasks);
      setUpcomingTasks(upcomingTasks);
    } else {
      setUpcomingTasks([]);
      setOverdueTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [upcomingTasks.length, overdueTasks.length]);

  const navigate = useNavigate();
  const addTask = () => navigate("/addTask/" + propertyID);

  return (
    <>
      <Table responsive className="blue-border">
        <thead>
          <tr>
            <th className="mb-3 blue-header p-3">Outstanding Tasks</th>
          </tr>
        </thead>
        <tbody>
            {overdueTasks.map((task, i) => {
                return (
                    <SwitchModal
                    task={task}
                    fetchTasks={() => fetchTasks()}
                    key={"out" + i}
                    i={i}
                    color={"red"}
                    />
                )
            })}
            <tr>
                {overdueTasks.length === 0 && (
                    <td className="green-secondary-header mb-3">
                        {"Congratulations on keeping your property maintained!"}
                    </td>
                )}
            </tr>
        </tbody>
      </Table>
      <Table responsive className="blue-border">
        <thead>
          <tr>
            <th></th>
            <th className="mb-3 blue-header p-3">Upcoming Tasks</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {upcomingTasks.map((task, i) => {
            return (
                <SwitchModal
                    task={task}
                    fetchTasks={() => fetchTasks()}
                    key={"up" + i}
                    i={i}
                />
            );
          })}
        </tbody>
      </Table>

      <Button className="my-3 green-button" type="submit" onClick={addTask}>
        Add Custom Task
      </Button>
    </>
  );
};
