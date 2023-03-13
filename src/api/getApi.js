export const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    const data = res.json();
    if (!data || data === null) {
      return "Fetching is not available";
    } else {
      return data;
    }
  } catch (error) {
    return "Fetching is not available";
  }
};
