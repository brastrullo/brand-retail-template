import React, { useState } from 'react';
import shortid from 'shortid';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const Title = styled.p`
  margin: 1rem 0 .5rem;
`;

const List = styled.ul`
  list-style: none;
  display: grid;
  grid-gap: .25rem;
  grid-template-columns: repeat(auto-fit, 4rem);
  padding-left: 0;
  margin: 0;
`;

const ListItem = styled.li`
  box-sizing: border-box;
  padding: 0;
  display: flex;
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
      cursor: default;
      background: #DFDFDF;
      border: 1px solid #DFDFDF;
    }
    span {
      color: #ADADAD;
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
    cursor: pointer;
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

  const ListMap = arr.map(obj => {
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
  })

  const TITLE_LABEL = 'Select ' + title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <Container>
      <Title>{TITLE_LABEL}</Title>
      <List>
        { ListMap }
      </List>
    </Container>
  );
}
