import PaymentGrid from "./components/PaymentGrid";
import { getPaymentStudents } from "./lib/getPaymentStudents";

export default async function FeesPage() {
  const students = await getPaymentStudents();

  return (
    <div className="space-y-6">
      <PaymentGrid students={students} />
    </div>
  );
}
