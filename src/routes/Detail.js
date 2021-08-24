import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

const GET_MOVIE = gql`
  # query에 variable이 포함될 경우 그 query의 이름을 적어줘야한다.
  query getMovie($id: Int!) {
    # for Apollo. check the type of the variable
    movie(id: $id) {
      # for your Server. actual query.
      title
      language
      rating
      description_intro
      medium_cover_image
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

const Detail = () => {
  const { id } = useParams();
  //variable 전달
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: +id },
  });
  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading..." : data?.movie?.title}</Title>
        <Subtitle>
          {data?.movie?.language} ∙ {data?.movie?.rating}
        </Subtitle>
        <Description>{data?.movie?.description_intro}</Description>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}></Poster>
      {data?.suggestions?.map((m) => m.id)}
    </Container>
  );
};
export default Detail;
