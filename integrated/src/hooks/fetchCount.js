// import { useEffect, useState } from "react";
// import axios from "axios";

// const fetchCount = (url) => {
//   const [data1, setData] = useState(0);
 
//   const [loading1, setLoading] = useState(false);
//   const [error1, setError] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(url);
//         setData(res.data[0].count);
//       } catch (err) {
//         setError(err);
//       }
//       setLoading(false);
//     };
//     fetchData();
//   }, [url]);

//   const reFetch1 = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(url);
//       setData(res.data[0].count);
//     } catch (err) {
//       setError(err);
//     }
//     setLoading(false);
//   };

//   return { data1, loading1, error1, reFetch1 };
// };

// export default fetchCount;
import { useEffect, useState } from "react";
import axios from "axios";

const fetchCount = (url, url1) => {
    const [data1, setData1] = useState(0);
    const [data2, setData2] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    console.log(data1)
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res1 = await axios.get(url);
          const res2 = await axios.get(url1);
          setData1(res1.data);
          setData2(res2.data[0].count);
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
        setData2(res2.data[0].count);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
  
    return { data1,data2, loading, error, reFetch };
  };
  
  export default fetchCount;