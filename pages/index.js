import React, { memo } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Link from "next/link";

// actions
import { increaseCount } from "../src/actions/counter";

// components
import { Button } from "@material-ui/core";

const IndexPage = styled.div`
  border: 2px solid ${props => props.theme.colors.black};
  padding: 10px;
  text-align: center;
  width: 268px;
  margin: 50px auto;
`;

function Index(props) {
  // redux props
  const { counter } = props;
  const { value } = counter;

  // redux action props
  const { increaseCount } = props;

  return (
    <IndexPage>
      <Link href="/hello">
        <a>Hello</a>
      </Link>
      <h2>Counter: {value}</h2>
      <Button variant="contained" color="primary" onClick={increaseCount}>
        +
      </Button>
    </IndexPage>
  );
}

function mapStateToProps(state) {
  const { counter } = state;
  return {
    counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      increaseCount
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Index));
