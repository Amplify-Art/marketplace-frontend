import React, { useState, useEffect } from "react";
import "./Nominate.scss";
import moment from "moment";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchUsersAction } from "../../redux/actions/UserAction";
import {
  addNominationAction,
  toggleNominateCongratsModal,
  toggleNominate,
  fetchNominationsAction,
} from "../../redux/actions/NominationAction";
import NominateModal from "../../Components/Parts/NominateModal";
import GeneralModal from "../../Components/Common/GeneralModal";
import ConfettiImage from "../../assets/images/confetti.png";
import useDebounce from "../../Components/Common/UseDebounce";
import jwt from "jsonwebtoken";

const Nominate = ({
  showNominateModal,
  setShowNominateModal,
  fetchNominations,
  ...props
}) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [nominateName, setNominateName] = useState("");
  const debouncedSearchTerm = useDebounce(search, 500);
  let currentUser = jwt.decode(localStorage.getItem("amplify_app_token"));

  const getUsers = (s) => {
    props.fetchUsers({
      params: {
        search: (s && s.replace("@", "")) || undefined,
        "filter[type]": "user",
        is_filter_nominee: true,
      },
    });
  };

  const onSearch = (e) => {
    const { value: nextValue } = e.target;
    if (nominateName === "") {
      setSelected(null);
    }
    setNominateName(nextValue);
    setSearch(nextValue);
  };

  const onSelect = (user) => {
    setSelected(user);
    setNominateName(user.near_account_id);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!selected) return;
    props.addNomination({
      nominee: selected.id,
    });
    setNominateName("");
    setShowNominateModal(false);
  };

  const handleGoHome = () => {
    props.history.push("/");
    props.toggleNominateCongratsModal(false);
    props.toggleNominate(false);
  };

  useEffect(() => {
    if (debouncedSearchTerm.length !== 0 || debouncedSearchTerm.trim() !== "") {
      getUsers(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (currentUser)
      fetchNominations({
        params: {
          "filter[nominated_by]": currentUser.id,
          is_in_queue: true,
          related: "nominatedBy",
        },
      });
  }, []);

  const handleCloseModal = () => {
    setShowNominateModal(false);
  };
  return (
    <>
      {showNominateModal && (
        <GeneralModal
          bodyChildren={
            <NominateModal
              daysLeft={moment().daysInMonth() - moment().date()}
              onChange={onSearch}
              onClick={onSubmit}
              onClose={() => setShowNominateModal(false)}
              inputValue={nominateName}
              suggestion={props.users}
              search={search}
              selected={selected}
              currentUser={currentUser}
              onSelect={onSelect}
              nominations={props.nominations}
              nominationloading={props.nominationloading}
            />
          }
          isCloseButton="true"
          closeModal={handleCloseModal}
        />
      )}
      {props.showCongratsModal && (
        <GeneralModal
          topIcon={ConfettiImage}
          headline="Thank You For Your Nomination"
          buttons={[
            {
              type: "solid go-home",
              text: "Go Home",
              onClick: () => handleGoHome(),
            },
          ]}
          className="centered"
        />
      )}
    </>
  );
};

export default connect(
  (state) => {
    return {
      users: state.users.users,
      showCongratsModal: state.nominations?.showCongratsModal,
      nominations: state.nominations.nominations,
      nominationloading: state.nominations.loading,
    };
  },
  (dispatch) => {
    return {
      fetchUsers: (data) => dispatch(fetchUsersAction(data)),
      addNomination: (data) => dispatch(addNominationAction(data)),
      toggleNominateCongratsModal: (data) =>
        dispatch(toggleNominateCongratsModal(data)),
      toggleNominate: (data) => dispatch(toggleNominate(data)),
      fetchNominations: (data) => dispatch(fetchNominationsAction(data)),
    };
  }
)(withRouter(Nominate));
