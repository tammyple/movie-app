import React, { useState, useEffect } from "react";

function GenreList({ baseUrl, apiKey }) {
  const [genreList, setGenreList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genreId, setGenreId] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchGenreList = async () => {
      setLoading(true);
      try {
        const url = `${baseUrl}genre/movie/list?api_key=${apiKey}&language=en-US`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          console.log(JSON.stringify(data));
          setGenreList(data.genres);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        console.log("error", error.message);
      }
      setLoading(false);
    };
    fetchGenreList();
  }, [apiKey, baseUrl]);
  useEffect(() => console.log("genreList", genreList), [genreList]);
  return (
    <div>
      {genreList.map((genre) => (
        <div>{genre.name}</div>
      ))}
    </div>
  );
}

export default GenreList;
