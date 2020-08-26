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
  border: 2px solid white;

  &.selected {
    border: 2px solid black;
  }

  &.not-available {
    label {
      filter: saturate(20%) brightness(80%);
      color: darkgray;
      border: 1px solid lightgray;
      ::after {
        content: 'N/A';
        left: calc(50% - 1rem);
        position: absolute;
        display: block;
      }
    }
  }
`;

const Button = styled.label`
  input[type="radio"] {
    text-align: center;
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  display: flex;
  position: relative;
  width: 4rem;
  height: 1.5rem;
  margin: 0 0 .65rem 0;
  border: 1px solid lightgray;
  align-items: center;
  &:hover {
    filter: opacity(80%);
    border: 1px solid darkgray;
  }

  span {
    position: absolute;
    font-size: .5rem;
    bottom: -.75rem;
    vertical-align: top;
    display: inline-block;
    word-break: break-word;
    width: 100%;
    left: 0;
  }

  ${props => props.fill.length > 1 ?
    `
      background: linear-gradient(90deg,
        ${
          props.fill.map(colour => {
            const stop = 100 / props.fill.length;
            return (`${colour} ${stop}%`);
          })
        }
      )
    `:`
      background: ${props.fill[0]}
    `
  }
`;

export const Colors = (props) => {
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
        const { id, label, fill, available } = obj;
        const labelText = label;
        const valueText = id;
        const isSelected = selected === id;
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
