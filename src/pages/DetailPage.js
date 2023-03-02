import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { Alert, Box, Typography } from "@mui/material";
import MovieDetailCard from "../components/MovieDetailCard";
import MovieTrailer from "../components/MovieTrailer";

function DetailPage() {
  const [movieDetail, setMovieDetail] = useState(null);
  const [similarMovies, setSimilarMovies] = useState(null);
  const [movieTrailer, setMovieTrailer] = useState([]);

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

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      if (params.id) {
        setLoading(true);
        try {
          const url = `${baseUrl}movie/${params.id}/similar?api_key=${apiKey}`;
          const res = await fetch(url);
          const data = await res.json();
          if (res.ok) {
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

  useEffect(() => {
    const fetchMovieTrailer = async () => {
      setLoading(true);
      try {
        const url = `${baseUrl}movie/${params.id}/videos?api_key=${apiKey}&language=en-US&append_to_response=videos`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          console.log(JSON.stringify(data));
          setMovieTrailer(data.results);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchMovieTrailer();
  }, [baseUrl, apiKey, params.id]);

  // useEffect(() => console.log("movie Trailer", movieTrailer), [movieTrailer]);
  // useEffect(() => console.log("movieDetail", movieDetail), [movieDetail]);
  // useEffect(
  //   () => console.log("similar Movies", similarMovies),
  //   [similarMovies]
  // );
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
              {movieDetail && similarMovies ? (
                <Box width="100%">
                  {movieTrailer &&
                  movieTrailer !== null &&
                  movieTrailer.length > 0 ? (
                    <MovieTrailer movieTrailer={movieTrailer} />
                  ) : null}
                  <MovieDetailCard
                    movieDetail={movieDetail}
                    similarMovies={similarMovies}
                    posterPath={posterPath}
                  />
                </Box>
              ) : (
                <Typography variant="h6">404 Movie Not Found</Typography>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default DetailPage;
