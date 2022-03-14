import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";

const logout = () => {
    window.sessionStorage.setItem("token", "");
    window.location.href = "/";
}
export default logout;