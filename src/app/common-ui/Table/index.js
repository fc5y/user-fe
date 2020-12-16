/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import PropTypes from 'prop-types';

// Utils
import styled from 'styled-components';
import { getSeriesOfPagination } from './utils';

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
  table-layout: fixed;
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

const FooterContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 5px 0;
`;

const RowPerPageContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Number = styled.div`
  font-weight: bold;
  color: ${(props) => (props.chosen ? 'var(--black80)' : 'var(--primary-default)')};
  padding: 0 6px;
  cursor: pointer;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

function Table({
  config,
  border,
  background,
  numberOfPages,
  onClickPage,
  rowPerPageText,
  onClickRowPerPage,
}) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [numberOfRowPerPage, setNumberOfRowPerPage] = React.useState(10);
  const { titles, data, columnWidth } = config;

  const handleClickRowPerPage = (num) => {
    setNumberOfRowPerPage(num);
    typeof onClickRowPerPage === 'function' && onClickRowPerPage(num);
  };

  const handleClickPageNumber = (num) => {
    setCurrentPage(num);
    typeof onClickPage === 'function' && onClickPage(num);
  };

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
    <>
      <Container border={border} background={background}>
        <TableContainer>
          <colgroup>
            {(columnWidth || []).map((w, k) => (w ? <col key={k} width={w} /> : <col key={k} />))}
          </colgroup>
          <TableHeader>{renderTableHead()}</TableHeader>
          <TableBody>{renderTableBody()}</TableBody>
        </TableContainer>
      </Container>
      <FooterContainer>
        {onClickRowPerPage && (
          <RowPerPageContainer>
            <div>Hiển thị</div>
            <Number chosen={numberOfRowPerPage === 10} onClick={() => handleClickRowPerPage(10)}>
              10
            </Number>
            <Number chosen={numberOfRowPerPage === 20} onClick={() => handleClickRowPerPage(20)}>
              20
            </Number>
            <Number chosen={numberOfRowPerPage === 50} onClick={() => handleClickRowPerPage(50)}>
              50
            </Number>
            <Number chosen={numberOfRowPerPage === 100} onClick={() => handleClickRowPerPage(100)}>
              100
            </Number>
            <div>{rowPerPageText}</div>
          </RowPerPageContainer>
        )}
        {onClickPage && (
          <PaginationContainer>
            <div>Trang</div>
            {getSeriesOfPagination(currentPage, numberOfPages).map((s, k) =>
              typeof s === 'number' ? (
                <Number chosen={currentPage === s} key={k} onClick={() => handleClickPageNumber(s)}>
                  {s}
                </Number>
              ) : (
                <div key={k}>{s}</div>
              ),
            )}
          </PaginationContainer>
        )}
      </FooterContainer>
    </>
  );
}

Table.propTypes = {
  config: PropTypes.any,
  border: PropTypes.bool,
  background: PropTypes.bool,
  numberOfPages: PropTypes.number,
  rowPerPageText: PropTypes.string,
  onClickRowPerPage: PropTypes.func,
  onClickPage: PropTypes.func,
};

export default Table;
