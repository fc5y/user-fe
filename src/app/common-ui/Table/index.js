/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import PropTypes from 'prop-types';

// Utils
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  border: ${(props) => (props.border ? '1px solid var(--black06)' : '0')};
  border-radius: ${(props) => (props.border ? '4px' : '0')};
  box-shadow: ${(props) => (props.border ? '0px 0px 12px rgba(188, 188, 188, 0.25)' : '0')};
  background-color: ${(props) => (props.background ? '#fff' : 'none')};
`;

const TableContainer = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

const TableHeader = styled.thead`
  width: 100%;
  font-weight: 600;
  font-size: 16px;
`;

const TableHeaderData = styled.td`
  padding: 15px 0;
  border-bottom: 1px solid var(--black06);
  text-align: center;
`;

const TableFirstHeaderData = styled.td`
  padding: 15px 0px 15px 10px;
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

function Table({ config, border, background }) {
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
    <Container border={border} background={background}>
      <TableContainer>
        <TableHeader>{renderTableHead()}</TableHeader>
        <TableBody>{renderTableBody()}</TableBody>
      </TableContainer>
    </Container>
  );
}

Table.propTypes = {
  config: PropTypes.any,
  border: PropTypes.bool,
  background: PropTypes.bool,
};

export default Table;
