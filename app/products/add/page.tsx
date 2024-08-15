"use client";
import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { UploadIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import ProductSchema from "@/src/service/zod/product";
import { Textarea } from "@/src/components/ui/textarea";
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
import { addProduct } from "@/src/service/actions/product";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateProductPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      images: ["/crackers.png"],
    },
  });

  const onSubmit = async (data: z.infer<typeof ProductSchema>) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`/api/product`, {
        method: "POST",
        body: formData,
      });
      const image = await response.json();
      const _data = { ...data, images: [image.filePath] };
      const _res = await addProduct(_data);
      console.log(_res);
      router.push("/products");
    } catch (error) {
      console.log(error);
    }
  };

  const [image, ...images] = form.getValues("images");

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFile(file);
  };

  const tempImage = file ? URL.createObjectURL(file) : image;

  return (
    <div className="w-full p-6 grid flex-1 gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 grid-cols-[1fr_300px]"
        >
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>Enter the all the information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Product Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="description"
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Price"
                            type="number"
                            {...field}
                            onChange={(event) =>
                              field.onChange(+event.target.value)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Category" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>Enter the all the information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Image
                  alt="Product image"
                  className="aspect-square w-full rounded-md object-cover"
                  height="100"
                  src={tempImage}
                  width="100"
                />
                <div className="grid grid-cols-3 gap-2">
                  <div
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "aspect-square w-full border-dashed flex h-auto relative"
                    )}
                  >
                    <input
                      type="file"
                      className="opacity-0 absolute h-full w-full"
                      accept="image/*"
                      onChange={uploadImage}
                    />
                    <UploadIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Upload</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div />
          <div className="flex justify-end gap-4">
            <Link
              href="/products"
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

export default CreateProductPage;
