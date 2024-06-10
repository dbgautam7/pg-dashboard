import * as RadioGroup from "@radix-ui/react-radio-group";
import { IRadioButtonProps } from "../../types";

const RadioButton = ({
  filterOptions,
  selectedFilter,
  setSelectedFilter,
}: IRadioButtonProps) => (
  <form>
    <RadioGroup.Root
      value={selectedFilter?.value?.toString()}
      onValueChange={(newValue) => {
        const selectedOption: any = filterOptions?.find(
          (item) => item.value === newValue
        );
        setSelectedFilter(selectedOption);
      }}
      className="flex gap-3"
    >
      {filterOptions.map((item, id) => (
        <div key={id} className="flex gap-3">
          <div className="flex items-center">
            <RadioGroup.Item
              className="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_8px]  hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-primary outline-none cursor-default"
              value={item.value?.toString()}
              id={item.value.toString()}
            >
              <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-primary" />
            </RadioGroup.Item>
            <label
              className="text-lg leading-none pl-3"
              htmlFor={item.value.toString()}
            >
              {item.label}
            </label>
          </div>
        </div>
      ))}
    </RadioGroup.Root>
  </form>
);

export default RadioButton;
