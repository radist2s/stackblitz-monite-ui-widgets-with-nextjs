"use client";
import { useState } from "react";
import {MoniteProvider, PayableDetails, PayablesTable} from "@team-monite/ui-widgets-react";
import { GrantType, MoniteSDK } from "@team-monite/sdk-api";
import {BrowserRouter, useSearchParams} from "react-router-dom";

export default function MoniteApp() {
  const [monite] = useState(
    () =>
      new MoniteSDK({
        entityId: "05668b7a-5f62-42ab-a923-4ee554cb3b7a",
        apiUrl: "https://api.dev.monite.com/v1",
        fetchToken: async () => {
          return (
            await fetch("/api/auth/token", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            })
          ).json();
        },
      }),
  );
  return (
    <>
      <MoniteProvider monite={monite}>
        <BrowserRouter>
          <Payables  />
        </BrowserRouter>
      </MoniteProvider>
    </>
  );
}

const Payables = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('payable_id');

  const onRowClick = (id: string) => {
    searchParams.set('payable_id', id);
    setSearchParams(searchParams);
  };

  const closeModal = () => {
    searchParams.delete('payable_id');
    setSearchParams(searchParams);
  };

  return (
    <>
      <PayablesTable onRowClick={onRowClick} />
      {id && <PayableDetails id={id} onClose={closeModal} />}
    </>
  );
}