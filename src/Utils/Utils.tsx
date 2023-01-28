type indexedType = {
  [index: string]: any;
};
const access_token = readCookie("access_token");

export const UrlEnum: indexedType = {
  /** USERS */
  login: "/api/login",
  register: "/api/register",
  logout: "/api/logout",
  getUsers: "/api/users",
  getRoles: "/api/roles",
  user: "/api/user",
  /** SUBJECT */
  getSubjects: "/api/subjects",
  subject: "/api/subject",
  /** CLASS */
  getClasses: "/api/classes",
  class: "/api/class",
};

export const LocalUrlEnum = {
  /** USERS */
  login: "/login",
  register: "/register",
  logout: "/logout",
  user: "/user",
  users: "/users",
  /** SUBJECT */
  subjects: "/subjects",
  subject: "/subject",
  /** Class */
  classes: "/classes",
  class: "/class",
};

export const HttpStatusCode = {
  OK: 200,
  Created: 201,
  Accepted: 202,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  RequestTimeout: 408,
  InternalServerError: 500,
  NotImplemented: 501,
  UnprocessableEntity: 422,
};

/**
 *
 * @param name
 * @returns
 */
export function readCookie(name: any) {
  const n = `${name}=`;
  const index = document.cookie.indexOf(n);
  if (index < 0) {
    return "";
  }
  let cookieValue = document.cookie.substring(index + n.length);
  const end = cookieValue.indexOf(";");
  if (end >= 0) {
    cookieValue = cookieValue.substring(0, end);
  }
  return cookieValue;
}

/**
 *
 * @param response
 * @param history
 * @returns
 */
async function handleHttpResponse(response: any, history: any) {
  const res = response.clone();
  switch (res.status) {
    case HttpStatusCode.OK:
      // ok
      try {
        const resp = await res.json();
        return resp;
      } catch (e) {
        const r = await response.text();
        return r;
      }
    case HttpStatusCode.BadRequest:
    case HttpStatusCode.InternalServerError:
    case HttpStatusCode.Forbidden:
      try {
        const resp = await res.json();
        return { errors: resp[Object.keys(resp)[0]] };
      } catch (e) {
        try {
          const errText = await response.text();
          if (errText.substring(0, 1) === "<") {
            return { errors: "Error" };
          }
          if (errText && errText.length > 0) {
            return { errors: errText };
          }
        } catch (ex) {
          console.log(ex);
        }
      }
      return { errors: response.statusText };
    case HttpStatusCode.Unauthorized:
    case HttpStatusCode.UnprocessableEntity:
      if (document.location.pathname !== LocalUrlEnum.login) {
        const expires = new Date(Date.now() - 3600).toUTCString();
        document.cookie = `access_token=;expires=${expires};path=/`;
        if (history) {
          history.push(LocalUrlEnum.login);
        } else {
          document.location.href = LocalUrlEnum.login;
          return { errors: "Unauthorized" };
        }
      } else {
        try {
          const resp = await res.json();
          return { errors: resp[Object.keys(resp)[0]] };
        } catch (e) {
          try {
            const errText = await response.text();
            if (errText.substring(0, 1) === "<") {
              return { errors: "Error" };
            }
            if (errText && errText.length > 0) {
              return { errors: errText };
            }
          } catch (ex) {
            console.log(ex);
          }
        }
      }
      break;
    case HttpStatusCode.NotFound:
      return { errors: "Not Found" };
    default:
      break;
  }
  return res;
}

/**
 *
 * @param url
 * @param data
 * @param props
 * @param history
 * @returns
 */
export async function post(
  url: string,
  data: any = null,
  props: any = null,
  history = null
) {
  let properties: RequestInit = {
    method: "POST",
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    body: JSON.stringify(data),
  };

  if (data instanceof FormData) {
    properties = {
      method: "POST",
      cache: "no-cache",
      body: data,
      headers: {
        Authorization: "Bearer " + access_token,
      },
      redirect: "follow",
    };
  }
  if (props) {
    properties = Object.assign(properties, props);
  }
  const response = await fetch(url, properties);

  return handleHttpResponse(response, history);
}

/**
 *
 * @param url
 * @param requestHeaders
 * @param history
 * @returns
 */
export async function get(
  url: any,
  requestHeaders = undefined,
  history = null
) {
  const headers = requestHeaders
    ? requestHeaders
    : {
        "Content-Type": "application/json",
        Accept: "*/json",
        Authorization: "Bearer " + access_token,
      };
  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
    headers: headers,
  });

  return handleHttpResponse(response, history);
}

/**
 *
 */
export function disableAllFields() {
  const previewDialogContent = document.getElementById("previewDialogContent");
  if (!previewDialogContent) return;

  const fullInputHTML = previewDialogContent.getElementsByTagName("input");
  if (fullInputHTML.length <= 0) return;

  const fullDatePickerHTLM =
    previewDialogContent.getElementsByClassName("disableWrapper");

  const fullSelectHTML = previewDialogContent.getElementsByTagName("select");
  const fullLabelHTML = previewDialogContent.getElementsByTagName("label");
  const fieldSets = previewDialogContent.getElementsByTagName("fieldset");
  const fullTextAreaHTML =
    previewDialogContent.getElementsByTagName("textarea");
  let index = 0;

  if (fullDatePickerHTLM.length > 0)
    for (index = 0; index < fullDatePickerHTLM.length; index++) {
      fullDatePickerHTLM[index].addEventListener(
        "click",
        (e) => {
          e.stopImmediatePropagation();
          e.stopPropagation();
        },
        true
      );
      fullDatePickerHTLM[index].addEventListener(
        "mousedown",
        (e) => {
          e.stopImmediatePropagation();
          e.stopPropagation();
        },
        true
      );
    }

  for (index = 0; index < fullTextAreaHTML.length; index++)
    fullTextAreaHTML[index].setAttribute("disabled", "disabled");

  for (index = 0; index < fieldSets.length; index++)
    if (!fieldSets[index].getAttribute("aria-hidden"))
      fieldSets[index].style.border = "none";

  for (index = 0; index < fullInputHTML.length; index++) {
    if (fullInputHTML[index].id === "CautareNume")
      fullInputHTML[index].removeAttribute("disabled");
    else {
      fullInputHTML[index].setAttribute("disabled", "disabled");
    }
  }

  for (index = 0; index < fullSelectHTML.length; index++) {
    if (fullSelectHTML[index].id !== "roles[0].FK_compartmentId")
      fullSelectHTML[index].setAttribute("disabled", "disabled");
  }

  for (index = 0; index < fullLabelHTML.length; index++)
    fullLabelHTML[index].setAttribute("disabled", "disabled");
}

/**
 *
 * @param event
 * @param model
 * @param callback
 */
export function handleChange(event: any, model: any) {
  const newModel: any = Object.assign({}, model);
  const { name } = event.target;
  if (name === "image") {
    const { 0: file } = event.target.files;
    newModel[name] = file;
  } else {
    if (name.indexOf("[") > 0) {
      const nameParts: any = name.substring(0, name.indexOf("["));
      const index = parseInt(
        name.substring(name.indexOf("[") + 1, name.indexOf("]"))
      );
      newModel[nameParts][index] = event.target.value;
    } else {
      newModel[name] = event.target.value;
    }
  }
  return newModel;
}

/**
 * delete data from http request
 * @param url
 * @param history
 * @returns
 */
export async function httpDelete(url: any, history = null) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "*/json",
    Authorization: `Bearer ${access_token}`,
  };
  const response = await fetch(url, {
    method: "DELETE",
    cache: "no-cache",
    headers: headers,
  });

  return handleHttpResponse(response, history);
}
