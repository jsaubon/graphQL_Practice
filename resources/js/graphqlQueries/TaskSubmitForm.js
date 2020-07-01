import React from "react";
import { graphQLQuery } from "../axios";

const TaskSubmitForm = e => {
    let data = {
        query: `mutation LeadTask($lead_id: Int!,$task: String!,$due_date: DateTime!, $urgent: Boolean ) {
            saveTask(lead_id: $lead_id, task: $task, due_date: $due_date, urgent: $urgent) {
                id
                task
                due_date
            }
        }`,
        variables: {
            lead_id: parseInt(leadData.key),
            task: e.task,
            due_date: e.due_date.format("YYYY-MM-DD HH:mm:ss"),
            urgent: e.urgent == true ? true : false
        }
    };

    graphQLQuery(data).then(res => {
        getTaskList();
    });
};

export default TaskSubmitForm;
