import { useEffect, useState } from "react";
import axios from "axios";

const fetchAll = (url, url1) => {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res1 = await axios.get(url);
          const res2 = await axios.get(url1);
          setData1(res1.data);
          setData2(res2.data);
        } catch (err) {
          setError(err);
        }
        setLoading(false);
      };
      fetchData();
    }, [url, url1]);
  
    const reFetch = async () => {
      setLoading(true);
      try {
        const res1 = await axios.get(url);
        const res2 = await axios.get(url1);
        setData1(res1.data);
        setData2(res2.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
  
    return { data1,data2, loading, error, reFetch };
  };
  
  export default fetchAll;