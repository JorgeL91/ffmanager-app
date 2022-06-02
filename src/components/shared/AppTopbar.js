import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import useToken from "../../hooks/useToken";
import escudo from "../../assets/images/escudo.png";
import title from "../../assets/images/title.png";

export const AppTopbar = (props) => {
  const { deleteToken } = useToken();

  return (
    <div className="layout-topbar">
      <Link to="/" className="layout-topbar-logo">
        <img src={escudo} alt="logo" />
        {/* <span>{config.namePage}</span> */}
        <img src={title} alt="logo" height="2rem" />
      </Link>

      <button
        type="button"
        className="p-link  layout-menu-button layout-topbar-button"
        onClick={props.onToggleMenuClick}
      >
        <i className="pi pi-bars" />
      </button>

      <button
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={props.onMobileTopbarMenuClick}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <ul
        className={classNames("layout-topbar-menu lg:flex origin-top", {
          "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive,
        })}
      >
        <li>
          <button
            className="p-link layout-topbar-button"
            onClick={() => deleteToken()}
          >
            <i className="pi pi-sign-out" />
            <span>Cerrar sesión</span>
          </button>
        </li>
        {/* <li>
          <button
            className="p-link layout-topbar-button"
            onClick={props.onMobileSubTopbarMenuClick}
          >
            <i className="pi pi-cog" />
            <span>Settings</span>
          </button>
        </li> */}
        {/* <li>
          <button
            className="p-link layout-topbar-button"
            onClick={props.onMobileSubTopbarMenuClick}
          >
            <i className="pi pi-user" />
            <span>Perfil</span>
          </button>
        </li> */}
      </ul>
    </div>
  );
};
