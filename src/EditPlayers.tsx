/** @jsxImportSource @emotion/react */
import "@mantine/core/styles.css";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material";
import { GetNames, UpdateNames } from "./internal/Players";
import { css } from "@emotion/react";
import MaterialTable from "material-table";
import { useState, useEffect } from "react";

function EditPlayers() {
  const [columns, setColumns] = useState([{ title: "名前", field: "name" }]);
  const [data, setData] = useState(GetNames);
  const mytheme = createTheme({});
  const style = {
    backgroundColor: "#EEE",
  };

  useEffect(() => {
    UpdateNames(data);
  }, [data]);

  return (
    <div
      css={css({
        margin: "0 140px 0 140px",
      })}
    >
      <ThemeProvider theme={mytheme}>
        <MaterialTable
          title="選手編集"
          columns={columns}
          data={data}
          style={style}
          options={{
            cellStyle: { height: 30, paddingTop: 0, paddingBottom: 0 },
            rowStyle: {
              backgroundColor: "#FFF",
            },
            pageSize: 5,
            headerStyle: {
              backgroundColor: "#CCC",
            },
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData([...data, newData]);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);

                  resolve();
                }, 1000);
              }),
          }}
        />
      </ThemeProvider>
    </div>
  );
}

export default EditPlayers;
