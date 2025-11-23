"use client";
import { OurCard, OurCardActionsDropdown } from "@/components/custom/our-card";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { CalendarDatePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { cn, formatValue } from "@/lib/utils";
import { File, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import request from "@/utils/request";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const FormSchema = z.object({
  calendar: z.object({
    from: z.date(), // Bisa Date atau undefined
    to: z.date().optional(), // Bisa Date atau undefined
  }),
});

export default function TopicSidebar() {
  const [dataTopic, setDataTopic] = useState<any>({ data: [] });
  const [selectedDates, setSelectedDates] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(), // Awalnya undefined
    to: undefined, // Awalnya undefined
  });

  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const fetchDataTopic = async (
    fromDate: Date | undefined,
    toDate: Date | undefined
  ) => {
    try {
      setLoading(true); // Start loading
      // Kirim permintaan tanpa tanggal jika fromDate atau toDate adalah undefined
      const res = await request.get(
        `/issue-monitoring/topics?start_date=${
          fromDate ? formatDate(fromDate) : ""
        }&end_date=${toDate ? formatDate(toDate) : ""}`
      );
      console.log(res.data);
      setDataTopic(res.data);
    } catch (err) {
      console.error("Gagal fetch data perencanaan:", err);
      toast.error("Failed to fetch data!");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    // Fetch data topic with the initial dates
    fetchDataTopic(selectedDates.from, selectedDates.to);
  }, [selectedDates]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      calendar: {
        from: new Date(),
        to: undefined,
      },
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const { from, to } = data.calendar;
    // Update state selectedDates hanya jika from dan to ada (tidak undefined)
    setSelectedDates({ from: from ?? undefined, to: to ?? undefined });
  };

  return (
    <OurCard
      title="List Topic"
      period="Saturday, December 23, 2025"
      action={<OurCardActionsDropdown />}
      size="fill"
      contentClassName="justify-start gap-4"
      className="h-[calc(100vh-150px)]"
    >
      {/* Sticky wrapper */}
      <div className="sticky top-0 z-10 bg-card flex flex-col gap-2 py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="calendar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-normal">
                      Date Range
                    </FormLabel>
                    <FormControl className="w-full">
                      <CalendarDatePicker
                        date={field.value}
                        onDateSelect={({ from, to }) => {
                          form.setValue("calendar", { from, to });
                        }}
                        variant="outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button variant="default" type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>

        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder="Search..."
            className={cn(
              "w-full pl-10 pr-3 rounded-md bg-muted/50 text-muted-foreground"
            )}
          />
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-full ">
          <Spinner variant={"default"} size={32} />
          <span className="ml-4 text-muted-foreground font-medium">
            Load Data
          </span>
        </div>
      ) : (
        <ScrollArea className="h-[calc(100vh-470px)] overflow-auto">
          <ul className="flex flex-col gap-4">
            {dataTopic.data &&
              dataTopic.data.map((item, index) => (
                <Link
                  key={index}
                  href={`/issue-monitoring/issue-highlights/${item.id}`}
                >
                  <OurCard
                    title={item.name}
                    period={`${formatValue(item.count, "regular")} Mentions`}
                    size="fill"
                    icon={File}
                    onClick={() => {}}
                  >
                    <div className="flex justify-between ">
                      <div>
                        <CardDescription>Positif</CardDescription>
                        <CardTitle>
                          {formatValue(
                            Number(item.sentimen.positive),
                            "regular"
                          )}
                        </CardTitle>
                      </div>
                      <div>
                        <CardDescription>Negative</CardDescription>
                        <CardTitle>
                          {formatValue(
                            Number(item.sentimen.negative),
                            "regular"
                          )}
                        </CardTitle>
                      </div>
                      <div>
                        <CardDescription>Netral</CardDescription>
                        <CardTitle>
                          {formatValue(
                            Number(item.sentimen.neutral),
                            "regular"
                          )}
                        </CardTitle>
                      </div>
                    </div>
                  </OurCard>
                </Link>
              ))}
          </ul>
        </ScrollArea>
      )}
    </OurCard>
  );
}
