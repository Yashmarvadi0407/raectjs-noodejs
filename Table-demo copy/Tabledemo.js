import React, { useEffect } from "react";
import { useState } from "react";
import MainTable from "./components/MainTable";
import DraggableDialog from "./components/Model";
import { connect } from "react-redux";
import withReducer from "app/store/withReducer";
import { bindActionCreators } from "redux";
import userreducer from "./store/reducer/register.reducer";
import {
  addUser,
  getdata,
  deleteUser,
  updateUser,
} from "./store/action/register.action";

const Tabledemo = (props) => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    profile: "",
  });
  const [arr, setArr] = useState([]);

  const [table, setTable] = useState([]);
  const { addUser } = props;
  const { getdata } = props;
  const { deleteUser } = props;
  const { updateUser } = props;
  const { userList, limit, count, page } = props;
console.log("coooooountt",count,page,limit)
  useEffect(() => {
    getdata().then((data) => {
      setArr(data.user);
    });
  }, [userList, page, limit]);

  return (
    <>
      <center>
        <div>
          <h1 style={{ marginTop: "5px", color: "red", fontSize: 60 }}>
            User Table
          </h1>
        </div>
        <DraggableDialog
          user={user}
          setUser={setUser}
          table={table}
          setTable={setTable}
          addUser={addUser}
          getdata={getdata}
          arr={arr}
          setArr={setArr}
        ></DraggableDialog>
        <div className="p-40">
          <MainTable
            pagee={page}
            limitt={limit}
            countt={count}
            getdata={getdata}
            arr={arr}
            setArr={setArr}
            deleteUser={deleteUser}
            updateUser={updateUser}
          ></MainTable>
        </div>
      </center>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userList: state.auth?.user?.user,
    limit: state.user?.user?.limit,
    count: state.user?.user?.count,
    page: state.user?.user?.page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addUser,
      getdata,
      deleteUser,
      updateUser,
    },
    dispatch
  );
};

export default withReducer(
  "user",
  userreducer
)(connect(mapStateToProps, mapDispatchToProps)(Tabledemo));
