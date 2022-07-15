import React, { useState, useEffect, useMemo } from 'react';
import MaterialTable from "material-react-table";
import axios from 'axios'
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, MenuItem, Typography, } from '@mui/material';
import styles from "../Assets/RegistrationForm.module.css";

function validateEmail(email){
  //  const re = "";
  const re=/\S+@\S+\.\S+/;
  //  const re=/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}
function DataTable1() {

  const [data, setData] = useState([]); //table data
  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
 
  //start Form 
  const initialValuesOfForm = {
    id: "",
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  }
  const [addFormData, setAddFormData] = useState({initialValuesOfForm});
  let initVal = false;

  const addFormHandler = (event) => {
    initVal = false;
const arr={id:data.length+1}
const enableEdit={enableEditing: true};
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...enableEdit,...arr,...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    console.log("columns")
    console.log(columns)
    console.log("columns")
const abc=data[data.length]=addFormData;
setData(abc);
    initVal = true;
    console.log(" initVal ");
    console.log(initVal);
    console.log(" addFormData ");
    console.log(addFormData);
    console.log(" data  ");
    console.log(data);
    console.log(" newDataSet  ");
  };

    //End Form

  useEffect(() => { 
    axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res => {            
          const users = res.data;  
          setData(users) 
          console.log("users ")
          console.log(users)
        //    setData(res.data.data)
         })
         .catch(error=>{
             console.log("Error")
             console.log(error)
         })
        }, [])


const columns  = useMemo(
  () => [
     { accessorKey: 'id',header: 'id',title: 'id', field: 'id', enableEditing: false,
    },
    { accessorKey: 'name',header: 'NAME',title: 'NAME', field: 'name' },
  { accessorKey: 'username',header: 'USERNAME',title: 'USERNAME', field: 'username' },
  { accessorKey: 'email',header: 'EMAIL',title: 'EMAIL', field: 'email' },
  { accessorKey: 'phone',header: 'PHONE',title: 'PHONE', field: 'phone' },
  { accessorKey: 'website',header: 'WEBSITE',title: 'WEBSITE', field: 'website' },
],
[],
);
const handleTableRowUpdate = (newData, olddata, resolve) => {
 //validating the data inputs
   let errorList = []
   console.log("newData row index number " );
  console.log(newData.row.id);
  console.log("newData " );
  console.log(newData);
  console.log(" oldData ");
  console.log(olddata);
  console.log(" Data ");
  console.log(data);
  console.log(" Data id");
  console.log(data.id);
  console.log("newData.row.original.id ");
  console.log(newData.row.original.id);
  console.log("errorList");
   console.log(errorList);
   console.log("newData.row._valuesCache.name ");
   console.log(newData.row._valuesCache.name);
   console.log("newData.row._valuesCache.id ");
   console.log(newData.row._valuesCache.id);
   if (newData.row._valuesCache.name === "") {
     errorList.push("Try Again, You didn't enter the name field")
   }
   if (newData.row._valuesCache.username === "") {
     errorList.push("Try Again, You didn't enter the Username field")
   }

   if (newData.row._valuesCache.email === "" ) {
     errorList.push("Oops!!! Please enter a valid email")
   }
   if (newData.row._valuesCache.phone === "") {
     errorList.push("Try Again, Phone number field can't be blank")
   }
   if (newData.row._valuesCache.website === "") {
     errorList.push("Try Again, Enter website url before submitting")
   }
   console.log("errorList");
   console.log(errorList);
   console.log("errorList.length");
   console.log(errorList.length);

   if(errorList.length < 1){
         resolve();
         setIserror(false)
         setErrorMessages([])
  }else{
  setErrorMessages(errorList);
  setIserror(true);
  resolve();
   }
 }

  return (
      <div id="body" className="wide-layout">
      <div id="pageWrapper" className="page-wrapper"></div>
       <div className="container">
            <div className="row">
                {/* <div className="col-md-1"/> */}
                <div className="col-md-9">
            <MaterialTable
              title="User Details"
              columns={columns}
              data={data}
              enableRowActions
             enableEditing

              renderToolbarTopCustomActions={() => {
                return(
                <Typography variant="h4">Users Table</Typography>             
                 );}}

              onEditRowSubmit={(newData, olddata)=>
                new Promise((resolve) => {
                    handleTableRowUpdate(newData, olddata, resolve)})}

              renderRowActionMenuItems={({ row, closeMenu }) => [

                <MenuItem
                  key={2}
                  onClick={() => {
                //    console.info('Remove', row);
                    console.log('Remove row');
                    console.log(row.index);
                    console.log('Remove data');
           //         console.log(data);
                    const dataDelete = [...data];
                    dataDelete.splice(row.index, 1);
                    setData([...dataDelete]);
                    closeMenu();
                  }}
                >
                  <DeleteIcon /> Remove
                </MenuItem>,
              ]}
                     />
                     <>
                {iserror && 
                <Alert severity="error">
                      {errorMessages.map((msg, i) => {
                          return <div key={i}>{msg}</div>
                      })}
                  </Alert>
                }       
                      </>
                     
                </div>
                <div className="col-md-3">

                <form className={styles.formStyle} onSubmit={submitHandler}>
                  <h3>Add User</h3>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Full name"
                      className={styles.formControl}
                      name="name"
                      value={initVal ? "" : addFormData.name}
                      onChange={addFormHandler}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="username">
                      User Name
                    </label>
                    <input
                      type="text"
                      placeholder="User name"
                      className={styles.formControl}
                      name="username"
                      onChange={addFormHandler}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      placeholder="Email"
                      className={styles.formControl}
                      name="email"
                      onChange={addFormHandler}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="number"
                      placeholder="Phone"
                      className={styles.formControl}
                      name="phone"
                      onChange={addFormHandler}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      placeholder="Website"
                      className={styles.formControl}
                      name="website"
                      onChange={addFormHandler}
                      required
                    />
                  </div>
                  <div>
                    <Button type="submit">Add User</Button>
                  </div>
                </form>

                </div>
            </div>
        </div> 
    </div>
  );
}
export default DataTable1;