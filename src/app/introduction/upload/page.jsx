// src/app/introduction/upload/page.jsx
import { Suspense } from "react";
import UploadPage from "./UploadPage";

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UploadPage />
    </Suspense>
  );
}
