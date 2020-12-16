/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import PropTypes from 'prop-types';

// Utils
import styled, { css } from 'styled-components';

const Container = styled.div`
  width: 100%;
`;

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
`;

const TableHeader = styled.thead`
  width: 100%;
  font-weight: 600;
  font-size: 16px;
`;

const TableHeaderData = styled.td`
  padding: 17px 0;
  border-bottom: 1px solid var(--black06);
  text-align: center;
`;

const TableFirstHeaderData = styled.td`
  padding: 17px 0px 17px 10px;
  border-bottom: 1px solid var(--black06);
  text-align: left;
`;

const TableBody = styled.tbody`
  width: 100%;
`;

const TableBodyData = styled.td`
  padding: 9px 0;
  border-bottom: 1px solid var(--black06);
  text-align: center;
`;

const TableFirstBodyData = styled.td`
  padding: 9px 0px 9px 10px;
  border-bottom: 1px solid var(--black06);
  text-align: left;
`;

function Table({ config }) {
  const { titles, data } = config;

  // Render table header
  const renderTableHead = () => {
    return (
      <tr>
        {(titles || []).map((t, k) => {
          return k === 0 ? (
            <TableFirstHeaderData key={k}>{t}</TableFirstHeaderData>
          ) : (
            <TableHeaderData key={k}>{t}</TableHeaderData>
          );
        })}
      </tr>
    );
  };

  // Render table body
  const renderTableBody = () => {
    return (data || []).map((row, idx1) => {
      return (
        <tr key={idx1}>
          {Object.values(row).map((r, idx2) =>
            idx2 === 0 ? (
              <TableFirstBodyData key={idx2}>{r}</TableFirstBodyData>
            ) : (
              <TableBodyData key={idx2}>{r}</TableBodyData>
            ),
          )}
        </tr>
      );
    });
  };

  return (
    <Container>
      <TableContainer>
        <TableHeader>{renderTableHead()}</TableHeader>
        <TableBody>{renderTableBody()}</TableBody>
      </TableContainer>
    </Container>
  );
}

Table.propTypes = {
  config: PropTypes.any,
};

export default Table;
