import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";
import {
  getOnePerfil,
  postCreateItemsPerfil,
  putPerfil,
} from "../../service/profiles/profilesServices";
import MsjToast from "../../components/confirmation/MsjToast";
import ProfileForm from "../../components/forms/ProfileForm";

import {
  getMenusByPerfil,
  getRootsMenus,
} from "../../service/profiles/menusServices";

import { PickList } from "primereact/picklist";

const ProfileEdit = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState();
  const { id = 0 } = useParams();
  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getItems = async () => {
    const res = await getRootsMenus();
    let menus = await getMenusByPerfil(id);

    let itemAvailable = [];
    if (menus.error) {
      itemAvailable = res;
      menus = [];
    } else {
      setOriginalMenus(menus);
      res.forEach((element, index) => {
        const result = menus.filter(
          (menu) => menu.idItemMenu === element.idItemMenu
        );

        if (result.length === 0) {
          itemAvailable.push(res[index]);
        }
      });
    }

    setPicklistTargetValue(menus);
    setPicklistSourceValue(itemAvailable);
  };

  const [picklistSourceValue, setPicklistSourceValue] = useState([]);
  const [picklistTargetValue, setPicklistTargetValue] = useState([]);
  const [originalMenus, setOriginalMenus] = useState([]);

  const loadItem = async () => {
    const res = await getOnePerfil(id);
    setInitial(res);
    setLoading(true);
  };

  useEffect(() => {
    loadItem();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (values) => {
    const res = await putPerfil(values);

    if (res.error) {
      setShow({
        ...show,
        active: true,
        message: res.errorMessage,
      });
    } else {
      updateItemsMenu();
      history.push("/profiles");
    }
  };

  const updateItemsMenu = async () => {
    let newItems = [];

    if (originalMenus.length > 0) {
      originalMenus.forEach((origianl, index) => {
        const result = picklistTargetValue.filter(
          (menu) => menu.idItemMenu === origianl.idItemMenu
        );

        if (result.length === 0) {
          //TODO: "eliminar";
        }
      });

      picklistTargetValue.forEach((origianl, index) => {
        const result = originalMenus.filter(
          (menu) => menu.idItemMenu === origianl.idItemMenu
        );

        if (result.length === 0) {
          newItems.push(picklistTargetValue[index]);
        }
      });
    } else {
      newItems = picklistTargetValue;
    }

    if (newItems.length > 0) {
      await postCreateItemsPerfil(newItems, id);
    }
  };

  return (
    <div className="col-12">
      <div className="card">
        <MsjToast show={show} setShow={setShow} />
        <h5>Editar Pefil</h5>
        {!loading ? (
          <Skeleton width="100%" height="150px"></Skeleton>
        ) : (
          <>
            <ProfileForm initialFormValue={initial} onSubmit={onSubmit} />
            <hr />
            <div className="col-12 ">
              <h5>Menus</h5>
              <PickList
                source={picklistSourceValue}
                target={picklistTargetValue}
                sourceHeader="From"
                targetHeader="To"
                itemTemplate={(item) => <div>{item.nombre}</div>}
                onChange={(e) => {
                  setPicklistSourceValue(e.source);
                  setPicklistTargetValue(e.target);
                }}
                sourceStyle={{ height: "200px" }}
                targetStyle={{ height: "200px" }}
              ></PickList>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileEdit;
