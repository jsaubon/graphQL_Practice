import React from "react";
import { message } from "antd";

const TaskDelete = (record, getTaskList) => {
    let data = {
        query: `mutation Task($id: ID!) {
            deleteTask(id: $id) {
                id
            }
        }`,
        variables: {
            id: parseInt(record.key)
        }
    };
    graphQLQuery(data).then(res => {
        getTaskList();
        message.info("Successfully Deleted");
    });
};

export default TaskDelete;
