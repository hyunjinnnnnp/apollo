import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_MOVIES = gql`
  query {
    movies {
      id
      medium_cover_image
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (data && data.movies)
    return data.movies.map((movie) => <h1>{movie.id}</h1>);
  return <h1>Home</h1>;
};

export default Home;
