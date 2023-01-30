import { createStyles } from "@mui/material/styles";
import { withStyles } from "@mui/styles";
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
import {
  LocalUrlEnum,
  UrlEnum,
  get,
  handleChange,
  httpDelete,
} from "../Utils/Utils";
import Modal from "../Components/Modal";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ValidatorForm } from "react-material-ui-form-validator";
import SchoolClass from "../Components/SchoolClass";

type Props = {
  classes: any;
};

function ClassesTable(props: Props) {
  const { classes } = props;
  const navigate = useNavigate();
  const [state, setState] = useState<any>({
    classes: [],
    page: 1,
    perPage: 20,
    preview: false,
    selectedClass: {},
    loading: false,
  });

  const classesHeaders = [
    {
      label: "Denumire",
      name: "name",
      options: { sort: false },
    },
    { label: "An", name: "schoolYear", options: { sort: false } },
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
        filter: true,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex: any, rowIndex: any) => {
          return (
            <div style={{ marginTop: -10, marginBottom: -10 }}>
              <ToggleButtonGroup exclusive aria-label="text alignment">
                <Tooltip title={Vocabulary.view}>
                  <ToggleButton
                    onClick={() => {
                      handlePreview(state.classes[rowIndex].id);
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
                      navigate(
                        `${LocalUrlEnum.class}/${state.classes[rowIndex].id}`,
                        { state: { id: state.classes[rowIndex].id } }
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
                      handleDelete(state.classes[rowIndex].id);
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
            onClick={(event: any) => navigate(`${LocalUrlEnum.class}`)}
            variant="contained"
            color="secondary"
            className={classes.addButton}
          >
            <AddCircleOutlineOutlined style={{ marginRight: 7 }} />
            {Vocabulary.addClass}
          </Button>
        );
      },
      rowsPerPage: state.perPage,
      page: state.page,
      search: true,
      serverSide: true,
      sort: true,
      onSearchChange: (searchText: string | null) => {
        if (searchText && searchText?.length > 3) getClasses(searchText);
        if (!searchText) getClasses(null);
      },
      onChangePage: (page: any) => {
        setState({ ...state, page: page });
      },
      onChangeRowsPerPage: (numberOfRows: any) => {
        setState({ ...state, perPage: numberOfRows });
      },
    };
  }

  /**
   *
   */
  useEffect(() => {
    getClasses();
  }, [state.perPage, state.page]);

  /**
   *
   */
  function getClasses(filter: string | null = null) {
    setState({ ...state, loading: true });
    get(`${UrlEnum.getClasses}/${state.page}/${state.perPage}/${filter}`).then(
      (data) => {
        setState({ ...state, classes: data.classes, loading: false });
      }
    );
  }

  /**
   *
   * @param id
   */
  function handlePreview(id: any) {
    get(`${UrlEnum.class}/${id}`).then((response: any) => {
      if (response.errors) {
        toast.error(response.errors);
      }
      setState({
        ...state,
        selectedClass: response.class,
        preview: true,
      });
    });
  }

  /**
   *
   * @param id
   */
  function handleDelete(id: any) {
    httpDelete(`${UrlEnum.class}/${id}`).then((response: any) => {
      if (response.errors) {
        toast.error(response.errors);
      }
      getClasses();
    });
  }

  /**
   *
   * @param event
   */
  function handleInputChange(event: any) {
    const newModel: any = handleChange(event, state.selectedClass);
    setState({ ...state, selectedUser: newModel });
  }

  return (
    <>
      <ToastContainer hideProgressBar={true} />
      <MUIDataTable
        title={Vocabulary.classes}
        data={state.classes}
        columns={classesHeaders}
        options={getTableOptions()}
      />
      {state.preview ? (
        <Modal
          title={Vocabulary.class}
          onClose={() => setState({ ...state, preview: false })}
          open={state.preview}
          children={
            <ValidatorForm
              onSubmit={() => {
                console.log("Sdasdi");
              }}
              instantValidate={true}
            >
              <SchoolClass
                model={state.selectedClass}
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
  });

export default withStyles(styles, { withTheme: true })(ClassesTable);
