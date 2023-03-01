import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { Alert } from "@mui/material";
import MovieDetailCard from "../components/MovieDetailCard";

function DetailPage() {
  const [movieDetail, setMovieDetail] = useState(null);
  const [similarMovies, setSimilarMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const params = useParams();

  const apiKey = `681565f353a3b4d3df92168a51105ce9`;
  const baseUrl = `https://api.themoviedb.org/3/`;
  const posterPath = `https://image.tmdb.org/t/p/original`;

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (params.id) {
        setLoading(true);
        try {
          const url = `${baseUrl}movie/${params.id}?api_key=${apiKey}`;
          const res = await fetch(url);
          const data = await res.json();
          if (res.ok) {
            console.log(JSON.stringify(data));
            setMovieDetail(data);

            setErrorMessage("");
          } else {
            setErrorMessage(data.message);
          }
        } catch (error) {
          setErrorMessage(error.message);
        }
        setLoading(false);
      }
    };
    fetchMovieDetail();
  }, [params.id, apiKey, baseUrl]);
  useEffect(() => console.log("movieDetail", movieDetail), [movieDetail]);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      if (params.id) {
        setLoading(true);
        try {
          const url = `${baseUrl}movie/${params.id}/similar?api_key=${apiKey}`;
          const res = await fetch(url);
          const data = await res.json();
          if (res.ok) {
            console.log(JSON.stringify(data));
            setSimilarMovies(data.results);

            setErrorMessage("");
          } else {
            setErrorMessage(data.message);
          }
        } catch (error) {
          setErrorMessage(error.message);
        }
        setLoading(false);
      }
    };
    fetchSimilarMovies();
  }, [params.id, apiKey, baseUrl]);
  useEffect(() => console.log("similarMovies", similarMovies), [similarMovies]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {errorMessage ? (
            <Alert severity="error">{errorMessage}</Alert>
          ) : (
            <>
              {movieDetail && (
                <MovieDetailCard
                  movieDetail={movieDetail}
                  similarMovies={similarMovies}
                  posterPath={posterPath}
                />
              )}
              {/* {!movie && (
                <Typography variant="h6">404 Movie Not Found</Typography>
              )} */}
            </>
          )}
        </>
      )}
    </>
  );
}

export default DetailPage;
