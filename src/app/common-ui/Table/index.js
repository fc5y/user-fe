/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import PropTypes from 'prop-types';

// Utils
import styled from 'styled-components';
import { getSeriesOfPagination } from './utils';

// Components
import Skeleton from '../Skeleton';

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
  font-weight: bold;
  font-size: 16px;
`;

const TableHeaderData = styled.td`
  padding: 15px 0;
  border-bottom: 1px solid var(--black06);
  text-align: center;
`;

const TableFirstHeaderData = styled.td`
  padding: 15px 0px 15px 18px;
  border-bottom: 1px solid var(--black06);
  text-align: left;
`;

const TableBody = styled.tbody`
  width: 100%;
`;

const TableBodyData = styled.td`
  padding: 6px 0;
  border-bottom: 1px solid var(--black06);
  text-align: center;
`;

const TableFirstBodyData = styled.td`
  padding: 6px 0px 6px 18px;
  border-bottom: 1px solid var(--black06);
  text-align: left;
`;

const FooterContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 10px 0;
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

const SkeletonText = styled(Skeleton.Text)`
  margin: 5px 10px;
`;

function Table({
  config,
  border,
  background,
  pagination,
  pageSize,
  showSkeleton,
  isAddingNewRows,
}) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [numberOfRowPerPage, setNumberOfRowPerPage] = React.useState(10);
  const { titles, data, colWidths } = config;
  const { numberOfPages, onClickPage } = pagination || {};
  const { rowPerPageText, onClickRowPerPage } = pageSize || {};

  const handleClickPageNumber = (num) => {
    setCurrentPage(num);
    typeof onClickPage === 'function' && onClickPage(num);
  };

  const handleClickRowPerPage = (num) => {
    setNumberOfRowPerPage(num);
    typeof onClickRowPerPage === 'function' && onClickRowPerPage(num);

    // Reset back to page 1 if user change Page size
    handleClickPageNumber(1);
  };

  // Render table header
  const renderTableHead = () => {
    return (
      <tr>
        {titles.map((t, k) => {
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
    return ((data || []).slice(0, numberOfRowPerPage) || []).map((row, idx1) => {
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

  // Render new adding row
  const renderNewAddingRow = () => {
    return (
      <tr>
        {colWidths.map((w, k) => {
          return (
            <td key={k}>
              {k === 0 ? (
                <Skeleton.Text
                  key={k}
                  style={{ width: w ? `${w - 10}px` : '200px', margin: '10px 10px' }}
                />
              ) : (
                <Skeleton.Text
                  key={k}
                  style={{ width: w ? `${w - 10}px` : '200px', margin: '10px 0' }}
                />
              )}
            </td>
          );
        })}
      </tr>
    );
  };

  // Skeleton Loading
  if (showSkeleton) {
    return (
      <Container border background>
        <TableContainer>
          <colgroup>
            {(colWidths || []).map((w, k) => (w ? <col key={k} width={w} /> : <col key={k} />))}
          </colgroup>
          <TableHeader>
            <tr>
              {colWidths.map((t, k) => (
                <td key={k}>
                  <SkeletonText />
                </td>
              ))}
            </tr>
          </TableHeader>
          <TableHeader>
            <tr>
              {colWidths.map((t, k) => (
                <td key={k}>
                  <SkeletonText />
                </td>
              ))}
            </tr>
          </TableHeader>
          <TableHeader>
            <tr>
              {colWidths.map((t, k) => (
                <td key={k}>
                  <SkeletonText />
                </td>
              ))}
            </tr>
          </TableHeader>
        </TableContainer>
      </Container>
    );
  }

  // Main content
  return (
    <>
      <Container border={border} background={background}>
        <TableContainer>
          <colgroup>
            {(colWidths || []).map((w, k) => (w ? <col key={k} width={w} /> : <col key={k} />))}
          </colgroup>
          {titles && Array.isArray(titles) && titles.length && (
            <TableHeader>{renderTableHead()}</TableHeader>
          )}
          <TableBody>
            {renderTableBody()}
            {isAddingNewRows && renderNewAddingRow()}
            {isAddingNewRows && renderNewAddingRow()}
            {isAddingNewRows && renderNewAddingRow()}
          </TableBody>
        </TableContainer>
      </Container>
      <FooterContainer>
        <RowPerPageContainer>
          {onClickRowPerPage && (
            <>
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
              <Number
                chosen={numberOfRowPerPage === 100}
                onClick={() => handleClickRowPerPage(100)}
              >
                100
              </Number>
              <div>{rowPerPageText}</div>
            </>
          )}
        </RowPerPageContainer>
        <PaginationContainer>
          {onClickPage && (
            <>
              <div>Trang</div>
              {getSeriesOfPagination(currentPage, numberOfPages).map((s, k) =>
                typeof s === 'number' ? (
                  <Number
                    chosen={currentPage === s}
                    key={k}
                    onClick={() => handleClickPageNumber(s)}
                  >
                    {s}
                  </Number>
                ) : (
                  <div key={k}>{s}</div>
                ),
              )}
            </>
          )}
        </PaginationContainer>
      </FooterContainer>
    </>
  );
}

Table.propTypes = {
  config: PropTypes.any,
  border: PropTypes.bool,
  isAddingNewRows: PropTypes.bool,
  background: PropTypes.bool,
  showSkeleton: PropTypes.bool,
  pagination: PropTypes.any,
  pageSize: PropTypes.any,
};

export default Table;
