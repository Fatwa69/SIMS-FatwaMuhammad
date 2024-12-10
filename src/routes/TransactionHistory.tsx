import { useEffect, useCallback, useMemo } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  listTransactionAsync,
  selectTransactions,
  selectTransactionOffset,
} from "../config/UserProfileSlice";
import FormatCurrency from "../components/FormatCurrency";
import ProfileWalletContainer from "../components/ProfileWalletContainer";
import { format, parseISO } from "date-fns";
import { AppDispatch } from "../config/store";

interface Transaction {
  description: string;
  total_amount: number;
  created_on: string;
}

const TransactionHistory = () => {
  const dispatch = useDispatch<AppDispatch>();

  const records: Transaction[] = useSelector(selectTransactions) || [];
  const offset = useSelector(selectTransactionOffset);

  console.log("Current Records:", records);
  console.log("Current Offset:", offset);

  const showMore = useCallback(() => {
    dispatch(listTransactionAsync(offset));
  }, [dispatch, offset]);

  useEffect(() => {
    if (records.length === 0) {
      console.log("Attempting to fetch initial transactions");
      dispatch(listTransactionAsync(0));
    }
  }, [dispatch, records.length]);

  const transactionList = useMemo(() => {
    return records.map((transaction: Transaction, i: number) => (
      <div
        className="card shadow pt-2 ps-3 mb-3"
        key={`${transaction.description}-${i}`}
      >
        <div className="d-flex">
          {transaction.description === "Top Up Balance" ? (
            <p className="fs-4 fw-semibold col-md-6 text-success text-start">
              {`+ ${FormatCurrency(Number(transaction.total_amount))}`}
            </p>
          ) : (
            <p className="fs-4 fw-semibold col-md-6 text-danger text-start">
              {`- ${FormatCurrency(Number(transaction.total_amount))}`}
            </p>
          )}
          <p className="col-md-6 text-end pe-2">{transaction.description}</p>
        </div>
        <p className="text-secondary">
          {format(
            parseISO(transaction.created_on),
            "dd MMMM yyyy 'pukul' HH:mm"
          )}
        </p>
      </div>
    ));
  }, [records]);

  return (
    <div className="pt-24">
      <Container>
        <ProfileWalletContainer />
        <div className="row mt-4">
          <p className="font-semibold text-xl px-10 py-4">Semua Transaksi</p>
          <div>
            {records && records.length > 0 ? (
              <div>{transactionList}</div>
            ) : (
              <h1 className="text-center">
                Maaf, tidak ada histori transaksi saat ini.
              </h1>
            )}
          </div>
          {records && records.length > 0 && (
            <div
              className="my-5 text-center fw-bold text-danger cursor-pointer"
              onClick={showMore}
            >
              Show more
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default TransactionHistory;
