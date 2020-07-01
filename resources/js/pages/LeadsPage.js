import React, { useState, useEffect, useContext } from "react";
import { Table, Button } from "antd";
import Context from "../context";
import { LeadsTableColumns } from "../components/LeadsTableColumns";
import LeadsAddLeadModal from "../components/LeadsAddLeadModal";
import LeadsGetList from "../graphqlQueries/LeadsGetList";
import LeadsTasksModal from "../components/LeadsTasksModal";

const LeadsPage = () => {
    const { state, dispatch } = useContext(Context);
    const [showAddLeadModal, setShowAddLeadModal] = useState(false);
    const [showLeadTasksModal, setShowLeadTasksModal] = useState(false);
    const [leadData, setLeadData] = useState();

    useEffect(() => {
        getLeadList();
        return () => {};
    }, []);

    useEffect(() => {
        console.log(state);
        return () => {};
    }, [state]);

    const handleOnPageChange = (page, pageSize) => {
        LeadsGetList(dispatch, page, pageSize);
    };
    const handleOnPageSizeChange = (page, pageSize) => {
        LeadsGetList(dispatch, page, pageSize);
    };

    const toggleShowAddLeadModal = () => {
        setShowAddLeadModal(!showAddLeadModal);
    };
    const toggleShowLeadTasksModal = (leadData = null) => {
        if (leadData) {
            setLeadData(leadData);
        }
        setShowLeadTasksModal(!showLeadTasksModal);
    };

    const getLeadList = () => {
        LeadsGetList(dispatch);
    };

    return (
        <div>
            <h1>
                Leads Page
                <Button
                    type="primary"
                    style={{ float: "right" }}
                    onClick={e => toggleShowAddLeadModal()}
                >
                    Add Lead
                </Button>
            </h1>
            {state && (
                <Table
                    dataSource={state.leads.data}
                    columns={LeadsTableColumns(
                        getLeadList,
                        toggleShowLeadTasksModal
                    )}
                    pagination={{
                        onChange: (page, pageSize) =>
                            handleOnPageChange(page, pageSize),
                        onShowSizeChange: (current, size) =>
                            handleOnPageSizeChange(current, size),
                        total:
                            state.leads.paginatorInfo &&
                            state.leads.paginatorInfo.total
                    }}
                />
            )}
            ;
            <LeadsAddLeadModal
                toggleShowAddLeadModal={toggleShowAddLeadModal}
                showAddLeadModal={showAddLeadModal}
                getLeadList={getLeadList}
            />
            <LeadsTasksModal
                showLeadTasksModal={showLeadTasksModal}
                toggleShowLeadTasksModal={toggleShowLeadTasksModal}
                leadData={leadData}
            />
        </div>
    );
};

export default LeadsPage;
