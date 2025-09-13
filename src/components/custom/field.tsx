import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, Path } from "react-hook-form";
import CustomPassword from "./password";

const CustomField = <TFieldValues extends object>({
  control,
  formValue,
  placeholder,
  description,
  formLabel,
  password,
}: {
  control: Control<TFieldValues>;
  formValue: Path<TFieldValues>;
  placeholder?: string;
  description?: string;
  formLabel?: string;
  password?: boolean;
}) => {
  return (
    <FormField
      control={control}
      name={formValue}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">
            {formLabel ? formLabel : formValue}
          </FormLabel>
          <FormControl>
            {password ? (
              <CustomPassword placeholder={placeholder} {...field} />
            ) : (
              <Input placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomField;
