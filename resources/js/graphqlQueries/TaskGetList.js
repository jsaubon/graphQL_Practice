import React from "react";

const TaskGetList = record => {
    let data = {
        query: `query LeadTask($lead_id: Int!, $completed: Boolean) {
            leadTasks(lead_id: $lead_id,completed: $completed,filter: { orderBy: [{ field: "due_date", order: ASC }] })  {
                key: id
                task
                assigned_to {
                    name
                }
                urgent
                due_date
                completed
            }
        }`,
        variables: {
            lead_id: parseInt(record.key),
            completed: false
        }
    };
    graphQLQuery(data).then(res => {
        setLeadTasks(res.data.leadTasks);
    });
};

export default TaskGetList;
