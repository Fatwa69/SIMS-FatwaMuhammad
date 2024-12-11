import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../config/store";
import { getTransactionHistory } from "../config/transactionSlice";
import { Card, CardContent, Typography, Button } from "@mui/material";
import ProfileWalletContainer from "../components/ProfileWalletContainer";

const ITEMS_PER_PAGE = 5;

const TransactionHistory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions } = useSelector(
    (state: RootState) => state.transactions
  );

  const [visibleTransactions, setVisibleTransactions] =
    useState(ITEMS_PER_PAGE);

  useEffect(() => {
    dispatch(getTransactionHistory());
  }, [dispatch]);

  const handleShowMore = () => {
    setVisibleTransactions((prev) => prev + ITEMS_PER_PAGE);
  };

  console.log("Visible Transactions:", visibleTransactions);
  console.log("Total Transactions:", transactions.length);

  return (
    <div className="mt-24">
      <ProfileWalletContainer />
      <div className="w-full ml-10 mr-10 justify-items-center mt-12">
        <Card sx={{ maxWidth: 800, width: "100%", marginTop: "24px" }}>
          <h1 className="text-xl px-4 py-4 font-segoe font-semibold">
            Semua Transaksi
          </h1>
          <CardContent>
            <div className="space-y-4 flex flex-col items-center">
              {transactions.slice(0, visibleTransactions).map((transaction) => (
                <div
                  key={transaction.invoice_number}
                  className="flex justify-between items-center w-full border-b border-gray-300 pb-4"
                >
                  <div>
                    <Typography
                      variant="body1"
                      color={
                        transaction.transaction_type === "TOPUP"
                          ? "success.main"
                          : "error.main"
                      }
                      fontWeight="bold"
                      fontFamily="Segoe UI"
                    >
                      {transaction.transaction_type === "TOPUP" ? "+" : "-"} Rp{" "}
                      {Math.abs(transaction.total_amount).toLocaleString(
                        "id-ID"
                      )}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontFamily="Segoe UI"
                    >
                      {new Date(transaction.created_on).toLocaleDateString(
                        "id-ID",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}{" "}
                      {new Date(transaction.created_on).toLocaleTimeString(
                        "id-ID",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}{" "}
                      WIB
                    </Typography>
                  </div>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontFamily="Segoe UI"
                  >
                    {transaction.description}
                  </Typography>
                </div>
              ))}
            </div>
            {visibleTransactions < transactions.length && (
              <div className="mt-4 text-center">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleShowMore}
                  sx={{ mt: 2 }}
                >
                  Show more
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionHistory;
