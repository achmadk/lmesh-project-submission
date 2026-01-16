/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import type { DefaultValues } from "react-hook-form";
import { array, number, object, string } from "yup";
import type { IWorkload } from "@/models/workload";
import { Form } from "@/providers/Form";
import { useHomeContext } from "@/providers/HomeContext";
import { FormWorkloadInner } from "./WorkloadInner";

export interface IFormPayload<Data extends IWorkload = IWorkload> {
  workloads: Data[];
  action: string;
  comment: string;
}

export const FormWorkload = <
  Data extends IWorkload = IWorkload,
  FormPayload extends IFormPayload<Data> = IFormPayload<Data>,
>() => {
  const { setSelectedIndex } = useHomeContext();
  const defaultValues = {
    workloads: [
      {
        id: "abc",
        month_name: "January",
        month_number: 1,
        total: 1,
      },
      {
        id: "def",
        month_name: "February",
        month_number: 2,
        total: 1,
      },
      {
        id: "ghi",
        month_name: "March",
        month_number: 3,
        total: 4,
      },
      {
        id: "jkl",
        month_name: "April",
        month_number: 4,
        total: 0.3,
      },
      {
        id: "mno",
        month_name: "May",
        month_number: 5,
        total: 1,
      },
      {
        id: "pqr",
        month_name: "June",
        month_number: 6,
        total: 1,
      },
      {
        id: "stv",
        month_name: "July",
        month_number: 7,
        total: 1,
      },
      {
        id: "uvw",
        month_name: "August",
        month_number: 8,
        total: 1,
      },
      {
        id: "xyz",
        month_name: "September",
        month_number: 9,
        total: 1,
      },
      {
        id: "rst",
        month_name: "October",
        month_number: 10,
        total: 1,
      },
      {
        id: "tuv",
        month_name: "November",
        month_number: 11,
        total: 1,
      },
      {
        id: "wxy",
        month_name: "December",
        month_number: 12,
        total: 1,
      },
    ],
    action: "ACTING_AS",
    comment: "",
  } as DefaultValues<FormPayload>;
  return (
    <div
      className="flex w-100dvw min-h-screen items-center justify-center font-sans bg-gray"
      onClick={() => setSelectedIndex(null)}
    >
      <main
        data-testid="form-workload"
        className="flex min-h-screen w-full flex-col items-center justify-between xs:p-2 sm:p-4 lg:py-8 lg:px-4 xl:py-16 xl:px-8 sm:items-start"
      >
        <Form<FormPayload>
          defaultValues={defaultValues}
          onSubmit={console.log}
          // @ts-expect-error
          resolver={yupResolver(
            object({
              workloads: array()
                .of(
                  object({
                    id: string().required(),
                    month_name: string().required(),
                    month_number: number().required(),
                    total: number()
                      .label("Total")
                      .positive()
                      .min(0)
                      .max(5)
                      .required()
                      .defined(),
                  }),
                )
                .required(),
              action: string(),
              comment: string().required(),
            }).required(),
          )}
          formProps={{ style: { width: "100%" } }}
        >
          {/** @ts-expect-error */}
          <FormWorkloadInner initialValue={defaultValues} />
        </Form>
      </main>
    </div>
  );
};
