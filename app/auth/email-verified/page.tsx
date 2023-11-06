import { EmailVerifiedForm } from "./components/EmailVerifiedFrom";
import { Suspense } from "react";
import Loading from "./loading";

export default function EmailVerifiedPage() {
  return (
    <Suspense fallback={<Loading />}>
      <main className="h-screen grid place-items-center">
        <EmailVerifiedForm />
      </main>
    </Suspense>
  );
}
