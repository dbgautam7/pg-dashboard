import PageWrapper from "../../layouts/PageWrapper";
import { useInterventionsData } from "../../hooks/useQueryData";
import { useSuperInterventionMutation } from "../../hooks/useMutateData";
import { useToast } from "../../contexts/ToastContext";
import { useNavigate } from "react-router-dom";

export default function InterventionsPage() {
  const { data } = useInterventionsData();
  const { updateToast } = useToast();
  const navigate = useNavigate();

  const interventationMutation = useSuperInterventionMutation();

  const toggleInterventionActiveStatus = (idx: string) => {
    interventationMutation.mutate(["post", `${idx}/toggle-status/`]);
    if (interventationMutation.status !== "idle") {
      if (interventationMutation.error) {
        // updateToast(
        //   interventationMutation.error.response?.data?.detail,
        //   "error"
        // );
      }
      if (interventationMutation.isSuccess) {
        updateToast("Status toggle successful", "success");
      }
    }
  };
  return (
    <PageWrapper>
      <div className="space-y-6">
        <section className="flex justify-between">
          <h1 className="text-3xl font-semibold text-primary">Transactions</h1>
        </section>
        <p>This is Transaction Page.</p>
      </div>
    </PageWrapper>
  );
}
