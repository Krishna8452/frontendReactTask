import "./App.css";
import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Paper from "@mui/material/Paper";
import CancelIcon from "@mui/icons-material/Cancel";
import Details from "./components/Details";
import BarGraph from "./components/BarGraph";

function App() {
  const [fullData, setFullData] = useState([]);
  const [data, setData] = useState([]);
  const [detailMode, setDetailMode] = useState(false);
  const [detailData, setDetailData] = useState([]);
  const [searchData, setSearchedData] = useState("");
  

  useEffect(() => {
    fetchData();
    setInterval(fetchData, 10000)
    console.log("hello")
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      const result = await response.json();
      setFullData(result);
      const dataArray = Object.entries(result.bpi).map(([code, details]) => ({
        code,
        ...details,
      }));
      setData(dataArray);
    }catch(error){
      console.log("Error fetching data:", error);
    }
  };
  const bpiDetails = (code) => {
    const singleData = data.filter((data) => data.code === code);
    setDetailData(singleData);
    setDetailMode(true);
  };
  console.log(fullData,'dfd')
  return (
    <>
      <BarGraph data= {data}/>
      <h2>{fullData.chartName}</h2>
      <p>{fullData.disclaimer}</p>
      {!detailMode && <input onChange={(e)=>setSearchedData(e.target.value)} style={{height:'1.5rem', borderRadius:'10px', textAlign:'center', marginBottom:'1rem'}} placeholder="search"/>}
      <TableContainer component={Paper}>
        {!detailMode ? (
          "List of Coins"
        ) : (
          <IconButton
            color={"red"}
            onClick={() => setDetailMode(false)}
            title="Cancel"
          >
            <CancelIcon />
          </IconButton>
        )}
      </TableContainer>

      {!detailMode ? (
        <TableContainer sx={{ marginTop: 1 }} component={Paper}>
          <Table sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow>
                <TableCell size="small">Code</TableCell>
                <TableCell size="small">Symbol</TableCell>
                <TableCell size="small">Rate</TableCell>
                <TableCell size="small">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.filter((data)=>data.code.toLowerCase().includes(searchData.toLowerCase())).map((item) => (
            <TableRow key={item.code}>
              <TableCell size="small">{item.code}</TableCell>
              <TableCell size="small">{item.symbol}</TableCell>
              <TableCell size="small">{item.rate}</TableCell>
              <TableCell size="small">
                <Button
                  onClick={() => bpiDetails(item.code)}
                  size="small"
                  variant="outlined"
                  color="primary"
                  title="view"
                  startIcon={<VisibilityIcon />}
                ></Button>
              </TableCell>
            </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Details detail={detailData} />
      )}
    </>
  );
}
export default App;
