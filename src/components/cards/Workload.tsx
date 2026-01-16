import {
  Activity,
  type ChangeEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify/unstyled";
import { useDebounce } from "use-debounce";
import type { IWorkload } from "@/models/workload";
import { useHomeContext } from "@/providers/HomeContext";
import type { IFormPayload } from "../forms/Workload";

export interface CardWorkloadProps<Data extends IWorkload = IWorkload> {
  data: Data;

  /**
   * @default false
   */
  withMonthName?: boolean;

  /**
   * @default null
   */
  index?: number | null;
  onButtonUpdateClicked: (data: Data) => void;
  isLoading?: boolean;

  /**
   * @default "DEFAULT"
   */
  mode?: "DEFAULT" | "WITH_ICON_BUTTON";

  /**
   * @default false
   */
  isSelected?: boolean;
}

export const CardWorkload = <
  Data extends IWorkload = IWorkload,
  Props extends CardWorkloadProps<Data> = CardWorkloadProps<Data>,
>({
  isLoading,
  data,
  index,
  mode = "DEFAULT",
  isSelected = false,
  withMonthName = true,
  onButtonUpdateClicked,
}: Props) => {
  const { selectedIndex, setSelectedIndex } = useHomeContext();
  const [isFictive, setIsFictive] = useState(false);
  const [prevValue, setPrevValue] = useState(() => data.total);
  const { register, formState, setValue, watch, setFocus } =
    useFormContext<IFormPayload>();
  const toastId = useRef<string | number | null>(null);

  const errorMessage =
    formState.errors?.workloads?.[index!]?.total?.message ?? null;
  const initialTotal = (watch("workloads")?.[index!]?.total ?? 0) as
    | string
    | number;
  const total =
    typeof initialTotal === "string" ? parseFloat(initialTotal) : initialTotal;
  const [debouncedTotal] = useDebounce(total, 500);
  const { onChange: defaultOnChange, ...formFields } = register(
    `workloads.${index!}.total`,
  );

  const selected =
    (isSelected && mode === "DEFAULT") ||
    (typeof index === "number" && index === selectedIndex);

  const getBGColor = (
    initialValue: number | string,
    prefix: "bg" | "text" = "bg",
  ) => {
    const total =
      typeof initialValue === "string"
        ? parseFloat(initialValue)
        : initialValue;
    if (mode === "DEFAULT") {
      if (isFictive) {
        if (prefix === "text") {
          return "text-orange-content";
        }
        return "bg-orange";
      }
      return `bg-gray`;
    }
    if (total === 0) {
      if (prefix === "text") {
        return "text-error-content";
      }
      return "bg-error";
    }
    if (total > 0 && total < 1) {
      if (prefix === "text") {
        return "text-warning-content";
      }
      return "bg-warning";
    }
    if (total >= 1 && total < 2) {
      if (prefix === "text") {
        return "text-success-content";
      }
      return "bg-success";
    }
    if (prefix === "text") {
      if (isFictive) {
        return "text-orange";
      }
      return "text-info-content";
    }
    return "bg-info";
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onButtonUpdateClicked(data);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, "");
    defaultOnChange(e);
  };
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setIsFictive((prev) => {
      const newVal = !prev;
      setValue(`workloads.${index!}.total`, newVal ? 0 : prevValue);
      return newVal;
    });
    setSelectedIndex(null);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (
      selectedIndex === null &&
      mode === "DEFAULT" &&
      typeof errorMessage === "string"
    ) {
      setValue(`workloads.${index!}.total`, prevValue, {
        shouldValidate: true,
      });
    }
  }, [errorMessage, mode, selectedIndex]);

  useEffect(() => {
    if (mode === "DEFAULT" && typeof errorMessage === "string") {
      toastId.current = toast.error(errorMessage);
    }
  }, [errorMessage, mode]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isSelected && mode === "DEFAULT" && !isFictive) {
      setFocus(`workloads.${index!}.total`);
    }
  }, [isSelected, isFictive]);

  useEffect(() => {
    if (errorMessage === null && !isFictive) {
      setPrevValue(debouncedTotal);
    }
  }, [debouncedTotal, errorMessage, isFictive]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (
      errorMessage === null &&
      toastId.current &&
      toast.isActive(toastId.current)
    ) {
      toast.dismiss(toastId.current);
    }
  }, [errorMessage, toastId.current]);

  return (
    <div {...(selected && { className: "col-span-2" })}>
      {withMonthName && (
        <div className="text-lg text-center mt-16 mb-2">
          {typeof index === "number" && index === selectedIndex
            ? data.month_name
            : data.month_name?.slice(0, 3)}
        </div>
      )}
      <div
        className={`card w-full ${getBGColor(total)} text-center`}
        {...(mode === "DEFAULT" && {
          tabIndex: 0,
          style: { cursor: "pointer" },
          onClick: handleClick,
        })}
      >
        <div className="card-body p-1">
          <div
            className={`flex gap-2 p-1${mode === "WITH_ICON_BUTTON" ? " justify-between" : " items-center min-h-8"}`}
          >
            <div className={`flex-1 flex flex-col justify-between`}>
              <Activity mode={isLoading ? "visible" : "hidden"}>
                <div className="skeleton h-16 w-8" />
              </Activity>
              <Activity mode={!isSelected ? "visible" : "hidden"}>
                <span className={`text-md ${getBGColor(total, "text")}`}>
                  {total}
                </span>
              </Activity>
              <Activity
                mode={isSelected && mode === "DEFAULT" ? "visible" : "hidden"}
              >
                <div className="w-full pb-2">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    {...formFields}
                    {...{ onChange }}
                    disabled={isFictive}
                    className="range range-sm"
                  />
                </div>
              </Activity>
            </div>
            {mode === "DEFAULT" && (
              <input
                type="checkbox"
                checked={isFictive}
                {...(isFictive && { "aria-checked": true })}
                className={`checkbox checkbox-sm flex items-center ${isFictive ? "bg-orange-content text-orange" : ""}`}
                onChange={handleCheckboxChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
