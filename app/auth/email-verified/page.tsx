import Container from "@mui/material/Container/Container";
import { EmailVerifiedForm } from "./components/EmailVerifiedFrom";
import { Suspense } from "react";
import Loading from "./loading";

export default function EmailVerifiedPage() {
  return (
    <Suspense fallback={<Loading />}>
      <main>
        <Container className="h-screen grid place-items-center">
          <EmailVerifiedForm />
        </Container>
      </main>
    </Suspense>
  );
}
