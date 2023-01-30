import { createStyles } from "@mui/material/styles";
import { withStyles } from "@mui/styles";
import MUIDataTable from "mui-datatables";
import { Vocabulary } from "../Utils/Vocabulary";
import {
  Backdrop,
  Button,
  ButtonGroup,
  CircularProgress,
  TextField,
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
import {
  LocalUrlEnum,
  UrlEnum,
  get,
  handleChange,
  httpDelete,
} from "../Utils/Utils";
import clsx from "clsx";
import User from "../Components/User";
import Modal from "../Components/Modal";
import { useNavigate } from "react-router-dom";
import { ValidatorForm } from "react-material-ui-form-validator";
import { ToastContainer } from "react-toastify";
import Filter from "../Components/Filter";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Config from "../Utils/Config";

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
    preview: false,
    selectedUser: {},
    loading: false,
    startDate: null,
    endDate: null,
    status: true,
  });

  const usersHeaders = [
    {
      label: "Prenume",
      name: "lastName",
      options: { sort: false },
    },
    { label: "Nume", name: "firstName", options: { sort: false } },
    { label: "Email", name: "email", options: { sort: false } },
    {
      label: "Rol",
      name: "role",
      options: { sort: false },
    },
    { label: "Status", name: "status", options: { display: false } },
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
                {state.users[rowIndex].status === 1 ? (
                  <Tooltip title={Vocabulary.edit}>
                    <ToggleButton
                      onClick={() => {
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
                ) : null}
                {state.users[rowIndex].status === 1 ? (
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
                ) : null}
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
            variant="contained"
            color="secondary"
            className={classes.addButton}
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
      onSearchChange: (searchText: string | null) => {
        if (searchText && searchText?.length >= 3) getUsers(searchText);
        if (!searchText) getUsers(null);
      },
      onColumnSortChange: (changedColumn: string, direction: string) => {
        setState({ ...state, order: direction });
      },
      onChangePage: (page: any) => {
        setState({ ...state, page: page });
      },
      onChangeRowsPerPage: (numberOfRows: any) => {
        setState({ ...state, perPage: numberOfRows });
      },
      setRowProps: (row: any, dataIndex: any, rowIndex: any) => {
        return {
          className: clsx({
            [classes.active]: row[4] === 1,
            [classes.inactive]: row[4] === 0,
          }),
        };
      },
    };
  }

  /**
   *
   */
  useEffect(() => {
    getUsers();
  }, [
    state.perPage,
    state.page,
    state.status,
    state.startDate,
    state.endDate,
    state.order,
  ]);

  /**
   *
   */
  function getUsers(filter: string | null = null) {
    setState({ ...state, loading: true });
    get(
      `${UrlEnum.getUsers}/${state.page}/${state.perPage}/${state.startDate}/${state.endDate}/${state.order}/${state.status}/${filter}`
    ).then((data) => {
      setState({ ...state, users: data.users, loading: false });
    });
  }

  /**
   *
   * @param id
   */
  function handlePreview(id: any) {
    get(`${UrlEnum.user}/${id}`).then((response: any) => {
      if (response.errors) {
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
    httpDelete(`${UrlEnum.user}/${id}`).then((response: any) => {
      if (response.errors) {
        console.log(response);
      }
      getUsers();
    });
  }

  /**
   *
   * @param e
   */
  const handleStatusChange = (status: boolean) => {
    setState({ ...state, status: status });
  };

  /**
   *
   * @param event
   */
  function handleInputChange(event: any) {
    const newModel: any = handleChange(event, state.selectedUser);
    setState({ ...state, selectedUser: newModel });
  }

  /**
   *
   */
  const handleDeleteFilters = () => {
    setState({
      ...state,
      startDate: null,
      endDate: null,
      status: true,
      filter: null,
    });
  };

  return (
    <>
      <ToastContainer hideProgressBar={true} />
      <Filter
        children={
          <>
            <ButtonGroup variant="contained" className={classes.groupButton}>
              <Button
                onClick={() => handleStatusChange(true)}
                className={classes.active}
              >
                {Vocabulary.activeUsers}
              </Button>
              <Button
                onClick={() => handleStatusChange(false)}
                className={classes.inactive}
              >
                {Vocabulary.deletedUsers}
              </Button>
            </ButtonGroup>
            <div>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  className={classes.datePicker}
                  inputFormat={Config.momentEUDateFormat}
                  label={Vocabulary.startDate}
                  value={state.startDate}
                  onChange={(value) => {
                    setState({
                      ...state,
                      startDate: value.format(Config.datePickerFormat),
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                ></DatePicker>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  className={classes.datePicker}
                  inputFormat={Config.momentEUDateFormat}
                  label={Vocabulary.endDate}
                  value={state.endDate}
                  onChange={(value) => {
                    setState({
                      ...state,
                      endDate: value.format(Config.datePickerFormat),
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                ></DatePicker>
              </LocalizationProvider>
            </div>
          </>
        }
        handleDeleteFilters={handleDeleteFilters}
      />
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
          }
        ></Modal>
      ) : null}
      {state.loading ? (
        <Backdrop open={true} sx={{ zIndex: "1600 !important" }}>
          <CircularProgress color="primary" />
        </Backdrop>
      ) : null}
    </>
  );
}

const styles = (theme: any) =>
  createStyles({
    active: {
      "& td": { backgroundColor: "#b0ceb1" },
      backgroundColor: "#b0ceb1 !important",
    },
    inactive: {
      "& td": { backgroundColor: "#e16b6b" },
      backgroundColor: "#e16b6b !important",
    },
    button: {
      backgroundColor: "#FFF !important",
    },
    addButton: {
      margin: 7,
      color: theme.palette.textColorSecondary?.main,
      borderRadius: 7,
      backgroundColor: theme.palette.dashboard?.main,
      borderWidth: 0,
    },
    groupButton: {
      alignSelf: "flex-start",
      margin: 5,
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
    },
    datePicker: {
      margin: "5px !important",
    },
  });

export default withStyles(styles, { withTheme: true })(UsersTable);
