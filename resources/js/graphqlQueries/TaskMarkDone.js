import moment from "moment";
import { notification } from "antd";
import { graphQLQuery } from "../axios";

const TaskMarkDone = (task, getTaskList) => {
    let data = {
        query: `mutation LeadTask($id: ID!, $date_completed: DateTime!, $completed: Boolean!) {
                completeTask(id: $id, date_completed: $date_completed, completed: $completed) {
                    id
                    task
                    completed
                }
            }`,
        variables: {
            id: parseInt(task.key),
            date_completed: moment().format("YYYY-MM-DD HH:mm:ss"),
            completed: true
        }
    };
    graphQLQuery(data).then(res => {
        console.log("task done", res);
        notification.success({ message: "Task is Done! Thank you!" });
        getTaskList();
    });
};

export default TaskMarkDone;
