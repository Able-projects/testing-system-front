import * as React from "react";
import { connect } from "react-redux";
import PersistentDrawerLeft from "./AppDrawer";
import { getLevelList } from "../../store/actions/levelActions";
import { getSectionList } from "../../store/actions/sectionActions";
import { getQuestionsList } from "../../store/actions/questionsList";

export function AppMenu(props) {
  React.useEffect(() => {
    props.getSectionList();
    props.getLevelList();
    props.getQuestionsList();
  }, []);
  return <PersistentDrawerLeft />;
}

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, { getQuestionsList, getLevelList, getSectionList })(
  AppMenu,
);
