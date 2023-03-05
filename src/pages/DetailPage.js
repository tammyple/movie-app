import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { Alert, Box } from "@mui/material";
import MovieDetailCard from "../components/MovieDetailCard";
import MovieTrailer from "../components/MovieTrailer";
import { fetchData } from "../api/getApi";

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
    if (movieDetail && similarMovies && movieTrailer) {
      setLoading(false);
    } else {
      if (
        movieDetail === null &&
        similarMovies === null &&
        movieTrailer === null
      ) {
        setErrorMessage("No Movie Found");
      } else {
        setLoading(true);
      }
    }
  }, [movieDetail, similarMovies, movieTrailer]);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (params.id) {
        try {
          const url = `${baseUrl}movie/${params.id}?api_key=${apiKey}`;
          const data = await fetchData(url);
          setMovieDetail(data);
        } catch (error) {
          setErrorMessage(error.message);
        }
      }
    };
    fetchMovieDetail();
  }, [params.id, apiKey, baseUrl]);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      if (params.id) {
        try {
          const url = `${baseUrl}movie/${params.id}/similar?api_key=${apiKey}`;
          const data = await fetchData(url);
          setSimilarMovies(data.results);
        } catch (error) {
          setErrorMessage(error.message);
        }
      }
    };
    fetchSimilarMovies();
  }, [params.id, apiKey, baseUrl]);

  useEffect(() => {
    const fetchMovieTrailer = async () => {
      if (params.id) {
        try {
          const url = `${baseUrl}movie/${params.id}/videos?api_key=${apiKey}&language=en-US&append_to_response=videos`;
          const data = await fetchData(url);
          setMovieTrailer(data.results);
        } catch (error) {
          setErrorMessage(error.message);
        }
      }
    };
    fetchMovieTrailer();
  }, [params.id, apiKey, baseUrl]);

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
            </>
          )}
        </>
      )}
    </>
  );
}

export default DetailPage;
