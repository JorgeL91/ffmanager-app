import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Route, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { AppTopbar } from "../components/shared/AppTopbar";
import { AppFooter } from "../components/shared/AppFooter";
import { AppMenu } from "../components/menu/AppMenu";
import { AppConfig } from "../components/shared/AppConfig";

import Dashboard from "../components/ui/Dashboard";
import ButtonDemo from "../components/ui/ButtonDemo";
import ChartDemo from "../components/ui/ChartDemo";
import Documentation from "../components/ui/Documentation";
import FileDemo from "../components/ui/FileDemo";
import FloatLabelDemo from "../components/ui/FloatLabelDemo";
import FormLayoutDemo from "../components/ui/FormLayoutDemo";
import InputDemo from "../components/ui/InputDemo";
import ListDemo from "../components/ui/ListDemo";
import MenuDemo from "../components/ui/MenuDemo";
import MessagesDemo from "../components/ui/MessagesDemo";
import MiscDemo from "../components/ui/MiscDemo";
import OverlayDemo from "../components/ui/OverlayDemo";
import MediaDemo from "../components/ui/MediaDemo";
import PanelDemo from "../components/ui/PanelDemo";
import TableDemo from "../components/ui/TableDemo";
import TreeDemo from "../components/ui/TreeDemo";
import InvalidStateDemo from "../components/ui/InvalidStateDemo";
import BlocksDemo from "../components/ui/BlocksDemo";
import IconsDemo from "../components/ui/IconsDemo";

import Institution from "../pages/Institution";

import Crud from "../pages/Crud";
import EmptyPage from "../pages/EmptyPage";
import TimelineDemo from "../pages/TimelineDemo";

import PrimeReact from "primereact/api";
import { Tooltip } from "primereact/tooltip";

import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "../assets/demo/flags/flags.css";
import "../assets/demo/Demos.scss";
import "../assets/layout/layout.scss";
import Complex from "../pages/Complex";
import TypeArea from "../pages/TypeArea";

const App = () => {
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("light");
  const [inputStyle, setInputStyle] = useState("outlined");
  const [ripple, setRipple] = useState(true);
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
  const copyTooltipRef = useRef();
  const location = useLocation();

  PrimeReact.ripple = true;

  let menuClick = false;
  let mobileTopbarMenuClick = false;

  useEffect(() => {
    if (mobileMenuActive) {
      addClass(document.body, "body-overflow-hidden");
    } else {
      removeClass(document.body, "body-overflow-hidden");
    }
  }, [mobileMenuActive]);

  useEffect(() => {
    copyTooltipRef &&
      copyTooltipRef.current &&
      copyTooltipRef.current.updateTargetEvents();
  }, [location]);

  const onInputStyleChange = (inputStyle) => {
    setInputStyle(inputStyle);
  };

  const onRipple = (e) => {
    PrimeReact.ripple = e.value;
    setRipple(e.value);
  };

  const onLayoutModeChange = (mode) => {
    setLayoutMode(mode);
  };

  const onColorModeChange = (mode) => {
    setLayoutColorMode(mode);
  };

  const onWrapperClick = (event) => {
    if (!menuClick) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }

    if (!mobileTopbarMenuClick) {
      setMobileTopbarMenuActive(false);
    }

    mobileTopbarMenuClick = false;
    menuClick = false;
  };

  const onToggleMenuClick = (event) => {
    menuClick = true;

    if (isDesktop()) {
      if (layoutMode === "overlay") {
        if (mobileMenuActive === true) {
          setOverlayMenuActive(true);
        }

        setOverlayMenuActive((prevState) => !prevState);
        setMobileMenuActive(false);
      } else if (layoutMode === "static") {
        setStaticMenuInactive((prevState) => !prevState);
      }
    } else {
      setMobileMenuActive((prevState) => !prevState);
    }

    event.preventDefault();
  };

  const onSidebarClick = () => {
    menuClick = true;
  };

  const onMobileTopbarMenuClick = (event) => {
    mobileTopbarMenuClick = true;

    setMobileTopbarMenuActive((prevState) => !prevState);
    event.preventDefault();
  };

  const onMobileSubTopbarMenuClick = (event) => {
    mobileTopbarMenuClick = true;

    event.preventDefault();
  };

  const onMenuItemClick = (event) => {
    if (!event.item.items) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
  };
  const isDesktop = () => {
    return window.innerWidth >= 992;
  };

  const menu = [
    {
      label: "Home",
      items: [
        {
          label: "Dashboard",
          icon: "pi pi-fw pi-home",
          to: "/",
        },
      ],
    },
    {
      label: "Administracion",
      items: [
        {
          label: "Instituciónes",
          icon: "pi pi-fw pi-home",
          to: "/institutions",
        },
        {
          label: "Complejos",
          icon: "pi pi-fw pi-home",
          to: "/complexes",
        },
        {
          label: "Tipos de areas",
          icon: "pi pi-fw pi-home",
          to: "/types-of-areas",
        },
      ],
    },

    {
      label: "Ui",
      icon: "pi pi-fw pi-search",
      items: [
        {
          label: "Options",
          icon: "pi pi-fw pi-clone",
          items: [
            {
              label: "Components",
              icon: "pi pi-fw pi-sitemap",
              items: [
                {
                  label: "Form Layout",
                  icon: "pi pi-fw pi-id-card",
                  to: "/formlayout",
                },
                {
                  label: "Input",
                  icon: "pi pi-fw pi-check-square",
                  to: "/input",
                },
                {
                  label: "Float Label",
                  icon: "pi pi-fw pi-bookmark",
                  to: "/floatlabel",
                },
                {
                  label: "Invalid State",
                  icon: "pi pi-fw pi-exclamation-circle",
                  to: "invalidstate",
                },
                { label: "Button", icon: "pi pi-fw pi-mobile", to: "/button" },
                { label: "Table", icon: "pi pi-fw pi-table", to: "/table" },
                { label: "List", icon: "pi pi-fw pi-list", to: "/list" },
                { label: "Tree", icon: "pi pi-fw pi-share-alt", to: "/tree" },
                { label: "Panel", icon: "pi pi-fw pi-tablet", to: "/panel" },
                { label: "Overlay", icon: "pi pi-fw pi-clone", to: "/overlay" },
                { label: "Media", icon: "pi pi-fw pi-image", to: "/media" },
                { label: "Menu", icon: "pi pi-fw pi-bars", to: "/menu" },
                {
                  label: "Message",
                  icon: "pi pi-fw pi-comment",
                  to: "/messages",
                },
                { label: "File", icon: "pi pi-fw pi-file", to: "/file" },
                { label: "Chart", icon: "pi pi-fw pi-chart-bar", to: "/chart" },
                { label: "Misc", icon: "pi pi-fw pi-circle-off", to: "/misc" },
              ],
            },
            {
              label: "UI Blocks",
              icon: "pi pi-fw pi-bookmark",
              items: [
                {
                  label: "Free Blocks",
                  icon: "pi pi-fw pi-eye",
                  to: "/blocks",
                  badge: "NEW",
                },
                {
                  label: "All Blocks",
                  icon: "pi pi-fw pi-globe",
                  url: "https://www.primefaces.org/primeblocks-react",
                },
              ],
            },
            {
              label: "Pages",
              icon: "pi pi-fw pi-clone",
              items: [
                { label: "Crud", icon: "pi pi-fw pi-user-edit", to: "/crud" },
                {
                  label: "Timeline",
                  icon: "pi pi-fw pi-calendar",
                  to: "/timeline",
                },
                {
                  label: "Empty",
                  icon: "pi pi-fw pi-circle-off",
                  to: "/empty",
                },
              ],
            },
            {
              label: "Icons",
              icon: "pi pi-fw pi-bookmark",
              items: [
                {
                  label: "PrimeIcons",
                  icon: "pi pi-fw pi-prime",
                  to: "/icons",
                },
              ],
            },
            {
              label: "Get Started",
              icon: "pi pi-fw pi-bookmark",
              items: [
                {
                  label: "Documentation",
                  icon: "pi pi-fw pi-question",
                  command: () => {
                    window.location = "#/documentation";
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const addClass = (element, className) => {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  };

  const removeClass = (element, className) => {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
  };

  const wrapperClass = classNames("layout-wrapper", {
    "layout-overlay": layoutMode === "overlay",
    "layout-static": layoutMode === "static",
    "layout-static-sidebar-inactive":
      staticMenuInactive && layoutMode === "static",
    "layout-overlay-sidebar-active":
      overlayMenuActive && layoutMode === "overlay",
    "layout-mobile-sidebar-active": mobileMenuActive,
    "p-input-filled": inputStyle === "filled",
    "p-ripple-disabled": ripple === false,
    "layout-theme-light": layoutColorMode === "light",
  });

  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      <Tooltip
        ref={copyTooltipRef}
        target=".block-action-copy"
        position="bottom"
        content="Copied to clipboard"
        event="focus"
      />

      <AppTopbar
        onToggleMenuClick={onToggleMenuClick}
        layoutColorMode={layoutColorMode}
        mobileTopbarMenuActive={mobileTopbarMenuActive}
        onMobileTopbarMenuClick={onMobileTopbarMenuClick}
        onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}
      />

      <div className="layout-sidebar" onClick={onSidebarClick}>
        <AppMenu
          model={menu}
          onMenuItemClick={onMenuItemClick}
          layoutColorMode={layoutColorMode}
        />
      </div>

      <div className="layout-main-container">
        <div className="layout-main">
          <Route
            path="/"
            exact
            render={() => (
              <Dashboard colorMode={layoutColorMode} location={location} />
            )}
          />
          <Route path="/formlayout" component={FormLayoutDemo} />
          <Route path="/input" component={InputDemo} />
          <Route path="/floatlabel" component={FloatLabelDemo} />
          <Route path="/invalidstate" component={InvalidStateDemo} />
          <Route path="/button" component={ButtonDemo} />
          <Route path="/table" component={TableDemo} />
          <Route path="/list" component={ListDemo} />
          <Route path="/tree" component={TreeDemo} />
          <Route path="/panel" component={PanelDemo} />
          <Route path="/overlay" component={OverlayDemo} />
          <Route path="/media" component={MediaDemo} />
          <Route path="/menu" component={MenuDemo} />
          <Route path="/messages" component={MessagesDemo} />
          <Route path="/blocks" component={BlocksDemo} />
          <Route path="/icons" component={IconsDemo} />
          <Route path="/file" component={FileDemo} />
          <Route
            path="/chart"
            render={() => (
              <ChartDemo colorMode={layoutColorMode} location={location} />
            )}
          />
          <Route path="/misc" component={MiscDemo} />
          <Route path="/timeline" component={TimelineDemo} />
          <Route path="/crud" component={Crud} />
          <Route path="/empty" component={EmptyPage} />
          <Route path="/documentation" component={Documentation} />
          {/* Start route app */}
          <Route path="/institutions" component={Institution} />
          <Route path="/complexes" component={Complex} />
          <Route path="/types-of-areas" component={TypeArea} />
        </div>

        <AppFooter layoutColorMode={layoutColorMode} />
      </div>

      <AppConfig
        rippleEffect={ripple}
        onRippleEffect={onRipple}
        inputStyle={inputStyle}
        onInputStyleChange={onInputStyleChange}
        layoutMode={layoutMode}
        onLayoutModeChange={onLayoutModeChange}
        layoutColorMode={layoutColorMode}
        onColorModeChange={onColorModeChange}
      />

      <CSSTransition
        classNames="layout-mask"
        timeout={{ enter: 200, exit: 200 }}
        in={mobileMenuActive}
        unmountOnExit
      >
        <div className="layout-mask p-component-overlay"></div>
      </CSSTransition>
    </div>
  );
};

export default App;
