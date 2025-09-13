import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

const CustomField = ({
  control,
  formValue,
  placeholder,
}: {
  control: Control<any>;
  formValue: string;
  placeholder?: string;
}) => {
  return (
    <FormField
      control={control}
      name={formValue}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{formValue}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomField;