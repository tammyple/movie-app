export const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    const data = res.json();
    if (!data || data === null) {
      throw new Error("No Movie Available");
    } else if (data.status_code === 34) {
      throw new Error("The resource you requested could not be found.");
    } else {
      console.log("data", data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
