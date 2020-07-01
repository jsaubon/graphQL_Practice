import React, { useState, useEffect, useContext } from "react";
import { Table, Button } from "antd";
import Context from "../context";
import { TasksTableColumns } from "../components/TasksTableColumns";
import TasksGetList from "../graphqlQueries/TasksGetList";

const TasksPage = () => {
    const { state, dispatch } = useContext(Context);

    useEffect(() => {
        getTaskList();
        return () => {};
    }, []);

    useEffect(() => {
        console.log(state);
        return () => {};
    }, [state]);

    const handleOnPageChange = (page, pageSize) => {
        TasksGetList(dispatch, page, pageSize);
    };
    const handleOnPageSizeChange = (page, pageSize) => {
        TasksGetList(dispatch, page, pageSize);
    };

    const getTaskList = () => {
        TasksGetList(dispatch);
    };

    return (
        <div>
            <h1>Tasks Page</h1>
            {state && (
                <Table
                    dataSource={state.tasks.data}
                    columns={TasksTableColumns(getTaskList)}
                    pagination={{
                        onChange: (page, pageSize) =>
                            handleOnPageChange(page, pageSize),
                        onShowSizeChange: (current, size) =>
                            handleOnPageSizeChange(current, size),
                        total:
                            state.tasks.paginatorInfo &&
                            state.tasks.paginatorInfo.total
                    }}
                />
            )}
            ;
        </div>
    );
};

export default TasksPage;
