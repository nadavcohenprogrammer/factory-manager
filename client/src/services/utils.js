import axios from "axios";

export const fetchData = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) { 
    console.error(err);
    throw err; 
  }
};

export const postData = async (url, objData) => {
    try {
      const {data} = await axios.post(url, objData);
      return data;
    } catch (error) {
      console.error("Error creating shift:", error);
      throw error;
    }
  };

export const deleteData = async (url) => {
    try {
      const response = await axios.post(url);
      return response.data;
    } catch (error) {
      console.error("Error delete data:", error);
      throw error;
    }
  };

 