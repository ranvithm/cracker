"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Button, buttonVariants } from "@/src/components/ui/button";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { useRouter } from "next/navigation";
import CustomerSchema from "@/src/service/zod/customer";
import { addCustomer } from "@/src/service/actions/customer";

const customersField = [
  {
    name: "name",
    placeholder: "Customer Name",
    label: "Name",
  },
  {
    name: "phone",
    placeholder: "Phone Number",
    label: "Phone",
  },
  {
    name: "email",
    placeholder: "Email",
    label: "Email",
  },
  {
    name: "address",
    placeholder: "Address",
    label: "Address",
  },
  {
    name: "city",
    placeholder: "City",
    label: "City",
  },
  {
    name: "state",
    placeholder: "State",
    label: "State",
  },
  {
    name: "country",
    placeholder: "Country",
    label: "Country",
  },
  {
    name: "postalCode",
    placeholder: "Postal Code",
    label: "Postal Code",
  },
];

const CreateCustomer = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof CustomerSchema>>({
    resolver: zodResolver(CustomerSchema),
  });

  const onSubmit = async (data: z.infer<typeof CustomerSchema>) => {
    const _res = await addCustomer(data);
    console.log(_res);
    router.push("/customers");
  };

  return (
    <div className="w-full p-6 grid flex-1 gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-4 justify-center flex flex-col items-center"
        >
          <Card className="w-3/4">
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
              <CardDescription>Enter the all the information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 grid-cols-2">
                {customersField.map((item) => (
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      // @ts-ignore
                      name={item.name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{item.label}</FormLabel>
                          <FormControl>
                            <Input placeholder={item.placeholder} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div />
          <div className="flex justify-end w-3/4 gap-4">
            <Link
              href="/customers"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              Cancel
            </Link>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCustomer;
