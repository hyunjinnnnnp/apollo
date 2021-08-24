// import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_MOVIE = gql`
  # query에 variable이 포함될 경우 그 query의 이름을 적어줘야한다.
  query getMovie($id: Int!) {
    # for Apollo. check the type of the variable
    movie(id: $id) {
      # for your Server. actual query.
      id
      title
      description_intro
      medium_cover_image
    }
  }
`;

const Detail = () => {
  const { id } = useParams();
  //variable 전달
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: +id },
  });
  if (loading) {
    return "loading";
  }
  if (data && data.movie) {
    return data.movie.title;
  }
};
export default Detail;
