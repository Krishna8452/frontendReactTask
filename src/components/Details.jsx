import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  IconButton,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";

const Details = ({ detail }) => {
  const USD = detail[0];
  const { code, symbol, rate, description, rate_float } = USD;
  return (
    <>
      <TableContainer sx={{ marginTop: 1 }} component={Paper}>
        <Table sx={{ minWidth: 900 }}>
          <TableBody>
            <TableRow>
              <TableCell size="small">Code</TableCell>
              <TableCell size="small">{code}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell size="small">Symbol</TableCell>
              <TableCell size="small">
                <span dangerouslySetInnerHTML={{ __html: symbol }} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell size="small">Rate</TableCell>

              <TableCell size="small">
                <span dangerouslySetInnerHTML={{ __html: symbol }} />
                {rate}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell size="small">Description</TableCell>
              <TableCell size="small">{description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell size="small">Float_Rate</TableCell>
              <TableCell size="small">
                {" "}
                <span dangerouslySetInnerHTML={{ __html: symbol }} />
                {rate_float}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default Details;
