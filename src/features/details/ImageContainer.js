import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import shortid from 'shortid';

const Container = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-gap: .5rem;
  grid-template-rows: minmax(auto, 800px) 200px;
  /* overflow-y: hidden; */
  grid-template-areas:
  "image"
  "list";
`;

const MainImageWrapper = styled.div`
  grid-area: image;
  img {
    /* min-height: 800px; */
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
`;

const ImageList = styled.ul`
  grid-area: list;
  list-style: none;
  margin: 0;
  grid-gap: .5rem;
  padding-left: 0;
  display: flex;
  flex-flow: row nowrap;
  /* grid-template-columns: repeat(auto-fit, 200px); 
  grid-template-rows: 200px; */
  overflow-x: scroll;
  overflow-y: hidden;
`;

const SubImage = styled.li`
  height: 200px;
  width: 200px;
  img {
    height: auto;
    width: auto;
  }
`;

export const ImageContainer = (props) => {
  const { main: id, list, alt } = props;
  const [mainId, setMainId] = useState(id);
  const [imgList, setImgList] = useState(list);

  useEffect(() => {
    // Preload images in imgList
    if (imgList) {
      imgList.forEach(id => {
        new Image().src = `https://source.unsplash.com/${id}/1000x1000`;
      })
    } else {
      setMainId(id)
      setImgList(list)
    }
  }, [id, list, imgList])

  const mainUrl = `https://source.unsplash.com/${mainId}/1000x1000`;
  const updateMainImg = (id) => {
    const newList = [...imgList.filter(item => item !== id), mainId];
    setMainId(id);
    setImgList(newList);
  }
  return (
    <>
      <Container>
        <MainImageWrapper>
          <img src={mainUrl} alt={alt} />
        </MainImageWrapper>
        <ImageList>
          { imgList.map(id => {
            const imgUrl = `https://source.unsplash.com/${id}/200x200`;
            return(
              <SubImage key={shortid.generate()} onClick={() => updateMainImg(id)}>
                <img src={imgUrl} alt={alt} />
              </SubImage>
            )})
          }
        </ImageList>
      </Container>
    </>
  );
}