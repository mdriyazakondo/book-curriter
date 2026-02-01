import useAuth from "../../../hooks/useAuth";
import Loading from "../../../shared/Loading/Loading";
import InvoicesTable from "../../../components/Dashboard/Invoices/InvoicesTable";
import { FaFileInvoiceDollar, FaCheckCircle, FaReceipt } from "react-icons/fa";
import { useGetInvoiceQuery } from "../../../redux/features/invoices/invoice";

const Invoices = () => {
  const { user } = useAuth();
  const { data: payments = [], isLoading } = useGetInvoiceQuery(user?.email);

  if (isLoading) return <Loading />;

  const totalPaid = payments.reduce(
    (acc, curr) => acc + (parseFloat(curr.price) || 0),
    0,
  );

  return (
    <div className="animate-in fade-in duration-700 pb-10">
      <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-[3px] mb-2">
            <FaFileInvoiceDollar size={14} /> Payment Archives
          </div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            My{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Invoices
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
            Download and manage your transaction history.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-emerald-600 text-white p-5 rounded-3xl shadow-xl shadow-emerald-200/20 dark:shadow-none flex items-center gap-5 min-w-[200px]">
            <div className="bg-white/20 p-3 rounded-xl">
              <FaCheckCircle size={20} />
            </div>
            <div>
              <p className="text-emerald-100 text-[9px] font-black uppercase tracking-widest">
                Total Paid
              </p>
              <p className="text-2xl font-black">${totalPaid.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-3xl shadow-sm flex items-center gap-5 min-w-[180px]">
            <div className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl">
              <FaReceipt size={20} />
            </div>
            <div>
              <p className="text-slate-400 dark:text-slate-500 text-[9px] font-black uppercase tracking-widest">
                Invoices
              </p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                {payments.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-4xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto px-2">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="border-b border-slate-50 dark:border-slate-800">
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-left">
                  Book Title
                </th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Customer
                </th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Transaction ID
                </th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Status
                </th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Amount
                </th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Paid On
                </th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {payments.length > 0 ? (
                payments.map((order) => (
                  <InvoicesTable key={order._id} order={order} />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-24 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                        <FaFileInvoiceDollar className="text-slate-200 dark:text-slate-700 text-3xl" />
                      </div>
                      <p className="text-slate-400 dark:text-slate-600 font-bold uppercase tracking-widest text-xs italic">
                        No payment records found.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
