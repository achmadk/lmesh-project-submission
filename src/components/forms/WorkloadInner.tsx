/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
"use client";

import { type MouseEvent, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useHomeContext } from "@/providers/HomeContext";
import { CardWorkload } from "../cards/Workload";
import type { IFormPayload } from "./Workload";

export interface FormWorkloadInnerProps<
  Payload extends IFormPayload = IFormPayload,
> {
  initialValue: Payload;
}

export const FormWorkloadInner = <
  Payload extends IFormPayload = IFormPayload,
  Props extends
    FormWorkloadInnerProps<Payload> = FormWorkloadInnerProps<Payload>,
>({
  initialValue,
}: Props) => {
  const { selectedIndex, setSelectedIndex } = useHomeContext();
  const { getValues, formState, register, watch } = useFormContext<Payload>();
  const [showTooltip, setShowTooltip] = useState(false);

  // @ts-expect-error
  const workloads = getValues("workloads") as Payload["workloads"];

  const handleTextAreaFocused = (e: MouseEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    setShowTooltip(true);
  };
  const handleTextAreaBlur = (e: MouseEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    setShowTooltip(false);
  };

  return (
    <div className="card w-full border-2 border-gray rounded-2xl bg-base-100">
      <div className="card-body">
        <h1 className="text-2xl font-bold">BIANCHINI Thierry</h1>
        <div
          className={`grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-14 gap-4`}
        >
          <div className="col-span-2">
            <h2 className="text-xl">Workload</h2>
          </div>
          {/* <div
          className={`grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-4`}
        > */}
          {workloads.map(
            (workload, index) =>
              typeof workload === "object" &&
              !Array.isArray(workload) && (
                <CardWorkload
                  key={`workload-item-${
                    // biome-ignore lint/suspicious/noArrayIndexKey: added with other strings as a key
                    index
                  }`}
                  index={index}
                  mode="WITH_ICON_BUTTON"
                  data={initialValue.workloads[index]}
                  onButtonUpdateClicked={() => {
                    setSelectedIndex(index);
                  }}
                />
              ),
          )}
        </div>
        <div className="divider" />
        <div className="text-xl">
          <strong>Serial Life PSA</strong> | Europe | SELLANTIS | PSA
        </div>
        {/* <div className="text-lg">DE | MR10R801</div> */}
        {/* <span>Total</span> */}
        <div
          // className={`grid ${selectedIndex !== null ? "md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-13" : "md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12"} gap-4`}
          // className={`grid grid-cols-12 gap-4`}
          className={`grid grid-cols-14 gap-4 mt-8`}
        >
          <div className="col-span-2">
            <div className="flex flex-col-reverse items-end w-full">
              <span className="text-oldgray">Total</span>
            </div>
          </div>
          {workloads.map((workload, index) => {
            return (
              <div
                key={`workload-item-${
                  // biome-ignore lint/style/noNonNullAssertion: <explanation>
                  index!
                }`}
                className={`col text-center font-bold text-md`}
              >
                {workload.total}
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-14 gap-4">
          <div className="col-span-2 flex gap-2">
            <div className="mt-1 w-2 h-6 bg-primary border rounded-2xl" />
            <div className="flex-1 flex flex-col">
              <span className="text-lg">DE |</span>
              <span className="text-lg">MR10R801</span>
            </div>
          </div>
          {workloads.map(
            (workload, index) =>
              typeof workload === "object" &&
              !Array.isArray(workload) && (
                <CardWorkload
                  key={`workload-item-${
                    // biome-ignore lint/suspicious/noArrayIndexKey: added with other strings as a key
                    index
                  }`}
                  withMonthName={false}
                  index={index}
                  data={initialValue.workloads[index]}
                  onButtonUpdateClicked={() => {
                    setSelectedIndex(index);
                  }}
                  isSelected={selectedIndex === index}
                />
              ),
          )}
        </div>
        <div className="grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-14 gap-4 pt-2">
          <div className="col-span-2" />
          <select
            // @ts-expect-error
            {...register("action")}
            className="col-span-2 select bg-gray border-0"
          >
            <option value="ACTING_AS">Acting As</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <div className="col-span-10">
            <div
              className={`tooltip${showTooltip ? " tooltip-open" : ""} tooltip-open tooltip-bottom w-full`}
              // @ts-expect-error
              data-tip={watch("comment")}
            >
              <textarea
                // @ts-expect-error
                {...register("comment")}
                placeholder="Comment"
                className="textarea border-0 bg-gray w-full"
                onMouseEnter={handleTextAreaFocused}
                onMouseLeave={handleTextAreaBlur}
              />
            </div>
          </div>
        </div>
        <div className="divider" />
      </div>
    </div>
  );
};
