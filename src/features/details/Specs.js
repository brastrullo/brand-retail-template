import React, { useState } from 'react';
import shortid from 'shortid';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const Title = styled.h3`
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  padding-left: 0;
  margin: 0;
`;

const ListItem = styled.li`
  box-sizing: border-box;
  padding: 0;
  display: flex;
  margin: .25rem;
  position: relative;

  input[type="radio"] {
    text-align: center;
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  label {
    box-sizing: border-box;
    margin: 0;
    border: 1px solid black;
    width: 3rem;
    background: black;
    height: auto;
    text-align: center;
    height: auto;
    vertical-align: middle;
    padding: .75rem .25rem;
    display: inline-block;
    color: white;
    &:hover {
      background: #363636;
    }
  }
  

  &.selected {
    label {
      background: white;
      color: black;
    }
  }
`;

export const Specs = (props) => {
  const { objKey, arr, title, changeHandler } = props
  const [selected, setSelected] = useState(false);
  const clickHandler = (e) => {
    setSelected(e.target.value)
    changeHandler({[objKey]: e.target.value})
  }
  return (
    <Container>
      <Title>{`${title}s`}</Title>
      <List>{ arr.map(spec => {
        const id = `${title.toLowerCase()}${spec.specID}`
        return (
          <ListItem
            key={shortid.generate()}
            className={selected === spec.specID && 'selected'}
          >
          <input
            type="radio"
            id={id}
            name={title.toLowerCase()}
            value={spec.specID.toString()}
            onClick={clickHandler}
          />
          <label
            htmlFor={id}
          >
            { spec.obj.name }
          </label>
          </ListItem>
        )
      })}</List>
    </Container>
  );
}
