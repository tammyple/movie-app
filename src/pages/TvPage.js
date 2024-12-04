import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../api/getApi";
import ProgramGrid from "../components/ProgramGrid";

function TvPage() {
  const [discoverTv, setDiscoverTv] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { pageId } = useParams();
  const pageTitle = `tv`;

  const apiKey = `681565f353a3b4d3df92168a51105ce9`;
  const baseUrl = `https://api.themoviedb.org/3/`;
  const posterPath = `https://image.tmdb.org/t/p/original`;

  useEffect(() => {
    const fetchDiscoverTv = async () => {
      setLoading(true);
      try {
        const url = `${baseUrl}discover/tv?api_key=${apiKey}&language=en-US&page=${pageId}`;
        const data = await fetchData(url);
        setDiscoverTv(data.results);
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchDiscoverTv();
  }, [apiKey, baseUrl, pageId]);

  return (
    <>
      <ProgramGrid
        discoverList={discoverTv}
        pageTitle={pageTitle}
        loading={loading}
        errorMessage={errorMessage}
        posterPath={posterPath}
      />
    </>
  );
}

export default TvPage;
