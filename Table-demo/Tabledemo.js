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
    age: "",
  });
  const [arr, setArr] = useState([]);
  const [render, setRender] = useState(false);
  const { addUser, getdata, deleteUser, updateUser, count } = props;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  function renderHandler() {
    setRender(!render);
  }

  function setLimitAndPageHandler(limit, page) {
    setLimit(limit);
    setPage(page);
    renderHandler();
  }

  useEffect(() => {
    getdata(page, limit).then((data) => {
      console.log(data);
      setArr(data.user);
    });
  }, [render]);

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
          addUser={addUser}
          renderHandler={renderHandler}
        ></DraggableDialog>
        <div className="p-40">
          <MainTable
            count={count}
            arr={arr}
            deleteUser={deleteUser}
            updateUser={updateUser}
            renderHandler={renderHandler}
            setLimitAndPageHandler={setLimitAndPageHandler}
          ></MainTable>
        </div>
      </center>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userList: state.auth?.user?.user,
    count: state.user?.user?.count,
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
