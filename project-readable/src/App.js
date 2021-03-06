import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import RootView from "./components/RootView";
import CategoryView from "./components/CategoryView";
import PostView from "./components/PostView";
import PostCreateView from "./components/PostCreateView";
import PostEditView from "./components/PostEditView";
import * as actions from "./actions";

class App extends Component {
  componentWillMount() {
    this.props.fetchCategories();
  }

  render() {
    const { categories } = this.props;
    return (
      <div className="app">
        <Route
          path="/"
          exact
          render={() => <RootView categories={categories} />}
        />
        <Route
          path="/:category"
          exact
          render={props => <CategoryView {...props} categories={categories} />}
        />
        <Route
          path="/:category/:post_id"
          exact
          render={props => <PostView {...props} categories={categories} />}
        />
        <Route
          path="/create_post"
          exact
          render={props =>
            <PostCreateView {...props} categories={categories} />}
        />
        <Route
          path="/:category/:post_id/edit"
          exact
          render={props => <PostEditView {...props} categories={categories} />}
        />
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return { categories };
}

export default connect(mapStateToProps, actions)(App);
