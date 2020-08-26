import React, { useState } from 'react';
import shortid from 'shortid';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const Title = styled.h3``;

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
  border: 1px solid white;

  &.selected {
    border: 1px solid black;
    label {
      background: white;
    }
    span {
      color: black;
    }
  }
  &.not-available {
    label {
      background: lightgray;
      color: darkgray;
      border: 1px solid lightgray;
    }
  }
`;

const Button = styled.label`
  display: flex;
  box-sizing: border-box;
  position: relative;
  background: black;
  width: 4rem;
  
  input[type="radio"] {
    text-align: center;
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  &:hover {
    background: #363636;
  }
  span {
    margin: auto;
    text-align: center;
    color: white;
    padding: .25rem 0;
  }
`;

export const Sizes = (props) => {
  const { objKey, arr, title, changeHandler } = props
  const [selected, setSelected] = useState(false);

  const clickHandler = (e) => {
    setSelected(e.target.value)
    changeHandler({ [objKey]: e.target.value})
  }

  const TITLE_LABEL = title.charAt(0).toUpperCase() + title.slice(1) + 's';

  return (
    <Container>
      <Title>{TITLE_LABEL}</Title>
      <List>{ arr.map(obj => {
        const { id, value, fill, available } = obj;

        const labelText = value;
        const valueText = value;
        const isSelected = selected === labelText;
        const isDisabled = !available;
        return (
          <ListItem
            type={title}
            key={shortid.generate()}
            className={
              `${ isSelected ? 'selected' : ''}` +
              `${ isDisabled ? 'not-available' : ''}`
            }
          >
            <Button fill={fill} type={title} htmlFor={id}>
              <input
                type="radio"
                id={id}
                name={title}
                value={valueText}
                disabled={isDisabled}
                onClick={clickHandler}
              />
              <span>{labelText}</span>
            </Button>
          </ListItem>
        )
      })}</List>
    </Container>
  );
}
