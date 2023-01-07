import { createStyles } from "@mui/material/styles";
import { withStyles } from "@mui/styles";
import Dashboard from "./Dashboard";
import MUIDataTable from "mui-datatables";
import { Vocabulary } from "../Utils/Vocabulary";
import {
  Backdrop,
  Button,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import {
  AddCircleOutlineOutlined,
  Delete,
  Edit,
  Visibility,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { LocalUrlEnum, UrlEnum, get, handleChange, post } from "../Utils/Utils";
import clsx from "clsx";
import User from "../Components/User";
import Modal from "../Components/Modal";
import { useNavigate } from "react-router-dom";
import { ValidatorForm } from "react-material-ui-form-validator";
import theme from "../Theme/Theme";

type Props = {
  classes: any;
};

function UsersTable(props: Props) {
  const { classes } = props;
  const navigate = useNavigate();
  const [state, setState] = useState<any>({
    users: [],
    page: 1,
    perPage: 20,
    order: "asc",
    filter: null,
    preview: false,
    selectedUser: {},
    loading: false,
  });

  const usersHeaders = [
    {
      label: "Prenume",
      name: "lastName",
    },
    { label: "Nume", name: "firstName" },
    { label: "Email", name: "email" },
    // {
    //   label: "Phone",
    //   name: "phone",
    // },
    // {
    //   label: "Date of birth",
    //   name: "dateOfBirth",
    // },
    {
      label: "Rol",
      name: "role",
    },
    { label: "TRUE", name: "status", options: { display: false } },
    {
      label: "Opțiuni",
      name: "Optiuni",
      options: {
        setCellHeaderProps: () => ({
          align: "center",
        }),
        setCellProps: () => ({
          align: "center",
        }),
        filter: false,
        sort: false,

        empty: true,
        customBodyRenderLite: (dataIndex: any, rowIndex: any) => {
          return (
            <div style={{ marginTop: -10, marginBottom: -10 }}>
              <ToggleButtonGroup exclusive aria-label="text alignment">
                <Tooltip title={Vocabulary.view}>
                  <ToggleButton
                    onClick={() => {
                      handlePreview(state.users[rowIndex].id);
                    }}
                    value="left"
                    aria-label="left aligned"
                  >
                    <Visibility />
                  </ToggleButton>
                </Tooltip>
                <Tooltip title={Vocabulary.edit}>
                  <ToggleButton
                    onClick={() => {
                      console.log("Dasds");
                      navigate(
                        `${LocalUrlEnum.user}/${state.users[rowIndex].id}`,
                        { state: { id: state.users[rowIndex].id } }
                      );
                    }}
                    value="center"
                    aria-label="centered"
                  >
                    <Edit />
                  </ToggleButton>
                </Tooltip>
                <Tooltip title={Vocabulary.edit}>
                  <ToggleButton
                    onClick={() => {
                      handleDelete(state.users[rowIndex].id);
                    }}
                    value="center"
                    aria-label="centered"
                  >
                    <Delete />
                  </ToggleButton>
                </Tooltip>
              </ToggleButtonGroup>
            </div>
          );
        },
      },
    },
  ];

  /**
   *
   * @returns
   */
  function getTableOptions() {
    const responsive: "standard" | "vertical" | "simple" | undefined =
      "standard";
    return {
      selectableRows: "none" as any,
      viewColumns: false as any,
      responsive: responsive,
      rowsPerPageOptions: [20, 50, 100],
      confirmFilters: true,
      filter: false,
      textLabels: {
        body: {
          noMatch: Vocabulary.noResultsFound,
        },
      },
      customToolbar: () => {
        return (
          <Button
            onClick={(event: any) => navigate(`${LocalUrlEnum.user}`)}
            variant="outlined"
            style={{
              margin: 7,
              color: theme.palette.textColorSecondary?.main,
              borderRadius: 7,
              backgroundColor: theme.palette.dashboard?.main,
              borderWidth: 0,
            }}
          >
            <AddCircleOutlineOutlined style={{ marginRight: 7 }} />
            {Vocabulary.newUser}
          </Button>
        );
      },
      rowsPerPage: state.perPage,
      page: state.page,
      search: true,
      serverSide: true,
      sort: true,
      onChangePage: (page: any) => {
        setState({ ...state, page: page });
      },
      setRowProps: (row: any, dataIndex: any, rowIndex: any) => {
        return {
          className: clsx({
            [classes.rejected]: row[4].id === 1,
            [classes.processing]: row[4].id === 2,
            [classes.requestAdditions]: row[4].id === 3,
            [classes.approved]: row[4].id === 4,
          }),
        };
      },
    };
  }

  /**
   *
   */
  useEffect(() => {
    if (state.users.length === 0) getUsers();
  }, []);

  /**
   *
   */
  function getUsers() {
    setState({ ...state, loading: true });
    get(
      `${UrlEnum.getUsers}/${state.page}/${state.perPage}/${state.order}/${state.filter}`
    ).then((data) => {
      setState({ ...state, users: data.items, loading: false });
    });
  }

  /**
   *
   * @param id
   */
  function handlePreview(id: any) {
    get(`${UrlEnum.user}/${id}`).then((response: any) => {
      if (response.errorMessages) {
        console.log(response);
      }
      setState({
        ...state,
        preview: true,
        selectedUser: response.user,
      });
    });
  }

  /**
   *
   * @param id
   */
  function handleDelete(id: any) {
    post(`${UrlEnum.user}/${id}`, {}).then((response: any) => {
      if (response.errorMessages) {
        console.log(response);
      }
      getUsers();
    });
  }

  /**
   *
   * @param event
   */
  function handleInputChange(event: any) {
    const newModel: any = handleChange(event, state.selectedUser);
    setState({ ...state, selectedUser: newModel });
  }

  return (
    <Dashboard>
      <MUIDataTable
        title={Vocabulary.users}
        data={state.users}
        columns={usersHeaders}
        options={getTableOptions()}
      />
      {state.preview ? (
        <Modal
          title={Vocabulary.userName}
          onClose={() => setState({ ...state, preview: false })}
          open={state.preview}
          children={
            <>
              <ValidatorForm
                onSubmit={() => {
                  console.log("Sdasdi");
                }}
                instantValidate={true}
              >
                <User
                  model={state.selectedUser}
                  handleChange={handleInputChange}
                />
              </ValidatorForm>
            </>
          }
        ></Modal>
      ) : null}
      {state.loading ? (
        <Backdrop open={true} sx={{ zIndex: "1600 !important" }}>
          <CircularProgress color="primary" />
        </Backdrop>
      ) : null}
    </Dashboard>
  );
}

const styles = (theme: any) =>
  createStyles({
    processing: {
      "& td": { backgroundColor: "#e2dca4" },
    },
    requestAdditions: {
      "& td": { backgroundColor: "#e6c1c1" },
    },
    approved: {
      "& td": { backgroundColor: "#b0ceb1" },
    },
    rejected: {
      "& td": { backgroundColor: "#e16b6b" },
    },
    button: {
      backgroundColor: "#FFF !important",
    },
  });

export default withStyles(styles, { withTheme: true })(UsersTable);
