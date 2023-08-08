import "./App.css";
import React, { useState, useEffect } from "react";
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
import Header from './components/Header'
import BarGraph from "./components/BarGraph";

function App() {
  const [fullData, setFullData] = useState([]);
  const [data, setData] = useState([]);
  const [detailMode, setDetailMode] = useState(false);
  const [detailData, setDetailData] = useState([]);
  const [searchData, setSearchedData] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10000);

    return () => {
      clearInterval(intervalId);
    };
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
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const bpiDetails = (code) => {
    const singleData = data.filter((data) => data.code === code);
    setDetailData(singleData);
    setDetailMode(true);
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  };

  return (
    <>
      <Header/>
      <h2>Bar Graph</h2>
      <BarGraph data={data} />
      <h2>{fullData.chartName}</h2>
      <p>{fullData.disclaimer}</p>
      {!detailMode && (
        <input
          onChange={(e) => setSearchedData(e.target.value)}
          style={{
            height: "2rem",
            borderRadius: "15px",
            textAlign: "center",
            marginBottom: "1rem",
            width:'20rem'
          }}
          placeholder="search"
        />
      )}
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
                <TableCell size="small">
                  <Button onClick={() => requestSort("code")}>Code</Button>
                </TableCell>
                <TableCell size="small">
                  <Button onClick={() => requestSort("symbol")}>Symbol</Button>
                </TableCell>
                <TableCell size="small">
                  <Button onClick={() => requestSort("rate")}>Rate</Button>
                </TableCell>
                <TableCell size="small">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData()
                .filter((data) =>
                  data.code.toLowerCase().includes(searchData.toLowerCase())
                )
                .map((item) => (
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
                        placeholder="view"
                        startIcon={<VisibilityIcon />}
                      >
                        view
                      </Button>
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
