"use client";

// ======================================================
// Reusable DynamicForm (shadcn/ui + react-hook-form + zod)
// - Fixes TypeScript generics with RHF
// - Avoids violating Rules of Hooks by moving useFieldArray
//   into a dedicated child component
// ======================================================
import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  Control,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import { useForm, Controller, useFieldArray } from "react-hook-form";

// shadcn/ui
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// =============================
// Types
// =============================
export type BaseField<TValues extends FieldValues> = {
  name: Path<TValues>; // dot-path of RHF
  label: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  // show/hide conditionally based on form values
  visibleIf?: (values: TValues) => boolean;
};

export type TextField<TValues extends FieldValues> = BaseField<TValues> & {
  type: "text" | "number" | "password";
};
export type TextareaField<TValues extends FieldValues> = BaseField<TValues> & {
  type: "textarea";
  rows?: number;
};
export type SwitchField<TValues extends FieldValues> = BaseField<TValues> & {
  type: "switch";
};
export type SelectField<TValues extends FieldValues> = BaseField<TValues> & {
  type: "select";
  options: { label: string; value: string }[];
};

export type ArrayField<TValues extends FieldValues> = BaseField<TValues> & {
  // Simple array of primitives located at `name`
  type: "array";
  of: "text" | "number";
  addLabel?: string;
};

export type FieldConfig<TValues extends FieldValues> =
  | TextField<TValues>
  | TextareaField<TValues>
  | SwitchField<TValues>
  | SelectField<TValues>
  | ArrayField<TValues>;

export type DynamicFormProps<
  TSchema extends z.ZodTypeAny,
  TValues extends FieldValues = z.infer<TSchema>
> = {
  schema: TSchema; // zod schema for validation
  defaultValues: TValues;
  fields: FieldConfig<TValues>[];
  onSubmit: (values: TValues) => Promise<void> | void;
  title?: string;
  description?: string;
  submitLabel?: string;
  resetLabel?: string;
  showReset?: boolean;
};

// =============================
// Subcomponent: PrimitiveArrayField (uses useFieldArray internally)
// =============================
function PrimitiveArrayField<TValues extends FieldValues>(props: {
  form: UseFormReturn<TValues>;
  field: ArrayField<TValues>;
}) {
  const { form, field } = props;
  const { fields, append, remove } = useFieldArray({
    control: form.control as unknown as Control<FieldValues>,
    name: field.name as unknown as Path<FieldValues>,
  });
  const isNumber = field.of === "number";

  return (
    <FormField
      control={form.control}
      name={field.name as any}
      render={() => (
        <FormItem className={field.className}>
          <FormLabel>{field.label}</FormLabel>
          {field.description ? (
            <FormDescription>{field.description}</FormDescription>
          ) : null}
          <div className="space-y-2">
            {fields.map((row: any, idx: number) => (
              <div key={row.id} className="flex items-center gap-2">
                <Controller
                  control={form.control}
                  name={`${field.name}.${idx}` as any}
                  render={({ field: f }) => (
                    <Input
                      type={isNumber ? "number" : "text"}
                      placeholder={field.placeholder}
                      disabled={field.disabled}
                      {...f}
                    />
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="text-red-600"
                  onClick={() => remove(idx)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() => append(isNumber ? (0 as any) : ("" as any))}
            >
              {field.addLabel ?? "Add item"}
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// =============================
// Component
// =============================
export function DynamicForm<
  TSchema extends z.ZodTypeAny,
  TValues extends FieldValues = z.infer<TSchema>
>(props: DynamicFormProps<TSchema, TValues>) {
  const {
    schema,
    defaultValues,
    fields,
    onSubmit,
    title = "Dynamic Form",
    description,
    submitLabel = "Submit",
    resetLabel = "Reset",
    showReset = true,
  } = props;

  // RHF form — type-safe to TValues
  const form = useForm<TValues>({
    resolver: zodResolver(schema) as any, // cast keeps resolver generic versions happy
    defaultValues,
    mode: "onChange",
  });

  const values = form.watch();

  function renderField(field: FieldConfig<TValues>) {
    if (field.visibleIf && !field.visibleIf(values)) return null;

    if (field.type === "array") {
      return <PrimitiveArrayField key={field.name} form={form} field={field} />;
    }

    // TEXT / NUMBER / PASSWORD
    if (
      field.type === "text" ||
      field.type === "number" ||
      field.type === "password"
    ) {
      return (
        <FormField
          key={field.name}
          control={form.control}
          name={field.name as any}
          render={({ field: f }) => (
            <FormItem className={field.className}>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Input
                  type={field.type === "text" ? "text" : field.type}
                  placeholder={field.placeholder}
                  disabled={field.disabled}
                  {...f}
                />
              </FormControl>
              {field.description ? (
                <FormDescription>{field.description}</FormDescription>
              ) : null}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }

    // TEXTAREA
    if (field.type === "textarea") {
      const f2 = field as TextareaField<TValues>;
      return (
        <FormField
          key={field.name}
          control={form.control}
          name={field.name as any}
          render={({ field: f }) => (
            <FormItem className={field.className}>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Textarea
                  rows={f2.rows ?? 4}
                  placeholder={field.placeholder}
                  disabled={field.disabled}
                  {...f}
                />
              </FormControl>
              {field.description ? (
                <FormDescription>{field.description}</FormDescription>
              ) : null}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }

    // SWITCH
    if (field.type === "switch") {
      return (
        <FormField
          key={field.name}
          control={form.control}
          name={field.name as any}
          render={({ field: f }) => (
            <FormItem className={"flex flex-col gap-2 " + (field.className ?? "") }>
              <div className="flex items-center justify-between">
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Switch
                    checked={!!f.value}
                    onCheckedChange={f.onChange}
                    disabled={field.disabled}
                  />
                </FormControl>
              </div>
              {field.description ? (
                <FormDescription>{field.description}</FormDescription>
              ) : null}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }

    // SELECT
    if (field.type === "select") {
      const f2 = field as SelectField<TValues>;
      return (
        <FormField
          key={field.name}
          control={form.control}
          name={field.name as any}
          render={({ field: f }) => (
            <FormItem className={field.className}>
              <FormLabel>{field.label}</FormLabel>
              <Select
                onValueChange={f.onChange}
                defaultValue={f.value as any}
                disabled={field.disabled}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={field.placeholder ?? "Select"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {f2.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {field.description ? (
                <FormDescription>{field.description}</FormDescription>
              ) : null}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }

    return null;
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {fields.map((f) => (
                <React.Fragment key={f.name}>{renderField(f)}</React.Fragment>
              ))}
            </div>
            <Separator />
            <CardFooter className="flex items-center justify-between p-0 pt-2">
              {showReset ? (
                <Button type="button" variant="outline" onClick={() => form.reset(defaultValues)}>
                  {resetLabel}
                </Button>
              ) : (
                <span />
              )}
              <Button type="submit">{submitLabel}</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

// =============================
// EXAMPLE USAGE — Tambah & Tambah Produk
// =============================
export function TambahPage() {
  const schema = z.object({
    nama: z.string().min(1, "Wajib diisi"),
    deskripsi: z.string().min(5, "Min 5 karakter"),
    aktif: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  });
  type T = z.infer<typeof schema>;

  const defaults: T = { nama: "", deskripsi: "", aktif: false, tags: [] };

  const fields: FieldConfig<T>[] = [
    { type: "text", name: "nama", label: "Nama", placeholder: "Masukkan nama" },
    { type: "textarea", name: "deskripsi", label: "Deskripsi", placeholder: "Tuliskan deskripsi" },
    { type: "switch", name: "aktif", label: "Aktif?", description: "Tandai sebagai aktif." },
    { type: "array", name: "tags", label: "Tags", of: "text", addLabel: "Tambah tag" },
  ];

  function handleSubmit(values: T) {
    console.log("Form Tambah submitted", values);
    alert("Form Tambah submitted — cek console");
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <DynamicForm schema={schema} defaultValues={defaults} fields={fields} onSubmit={handleSubmit} title="Form Tambah" submitLabel="Simpan" />
    </div>
  );
}

export function TambahProdukPage() {
  const schema = z
    .object({
      nama: z.string().min(1, "Nama produk wajib"),
      sku: z.string().min(3, "Min 3 karakter"),
      harga: z.coerce.number().positive("Harga harus > 0"),
      tipe: z.enum(["physical", "digital"]),
      publish: z.boolean().default(false),
      lisensi: z.string().optional(),
    })
    .refine((v) => (v.tipe === "digital" ? !!v.lisensi : true), {
      message: "Lisensi wajib untuk produk digital",
      path: ["lisensi"],
    });
  type P = z.infer<typeof schema>;

  const defaults: P = { nama: "", sku: "", harga: 0, tipe: "physical", publish: false, lisensi: "" };

  const fields: FieldConfig<P>[] = [
    { type: "text", name: "nama", label: "Nama Produk", placeholder: "Contoh: USB Hub" },
    { type: "text", name: "sku", label: "SKU", placeholder: "Contoh: HUB-001" },
    { type: "number", name: "harga", label: "Harga (Rp)", placeholder: "0" },
    { type: "select", name: "tipe", label: "Tipe Produk", options: [ { label: "Physical", value: "physical" }, { label: "Digital", value: "digital" } ] },
    { type: "text", name: "lisensi", label: "License Key", placeholder: "XXXXX-XXXXX", visibleIf: (v) => v.tipe === "digital" },
    { type: "switch", name: "publish", label: "Publish?" },
  ];

  function handleSubmit(values: P) {
    console.log("Tambah Produk submitted", values);
    alert("Tambah Produk submitted — cek console");
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <DynamicForm schema={schema} defaultValues={defaults} fields={fields} onSubmit={handleSubmit} title="Tambah Produk" submitLabel="Simpan Produk" />
    </div>
  );
}

// =============================
// Notes
// - If your project uses strict resolver types, keep the `as any` cast on zodResolver.
//   Alternatively, import `Resolver` from RHF and type it: `resolver: zodResolver(schema) as Resolver<TValues>`.
// - We moved `useFieldArray` into `PrimitiveArrayField` to respect the Rules of Hooks.
// - Field names are typed with RHF `Path<TValues>` for safety.
// - Extend FieldConfig to support date, radio, checkbox-group, file, etc.


// ======================================================
// ALT DYNAMIC COMPONENT STYLE — FormFields (your pattern)
// Typed & fixed version with better error typing and file/select handling
// Save as: components/form-fields.tsx
// ======================================================
"use client";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
  Path,
  UseFormRegister,
  useFieldArray,
  UseFieldArrayRemove,
  UseFieldArrayAppend,
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

// Optional custom fields (comment if not present)
import CurrencyInput from "@/components/form/curency-input";
import { DatePickerField } from "@/components/form/datepicker-field";

export type InputType =
  | "text"
  | "number"
  | "file"
  | "select"
  | "textarea"
  | "tel"
  | "email"
  | "password"
  | "currency"
  | "date"
  | "array";

export interface FieldConfig<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type: InputType;
  options?: { label: string; value: string }[]; // for select
  readOnly?: boolean;
  expand?: boolean; // span full width
  suffix?: string; // e.g. "kg"
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  fields?: FieldConfig<T>[]; // nested fields (for array rows)
  direction?: "row" | "col"; // layout for array rows
}

interface FormFieldsProps<T extends FieldValues> {
  fields: FieldConfig<T>[];
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

export function FormFields<T extends FieldValues>({
  fields,
  control,
  register,
  errors,
}: FormFieldsProps<T>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
      {fields.map((field) => (
        <FormField<T>
          key={String(field.name)}
          field={field}
          control={control}
          register={register}
          errors={errors}
        />
      ))}
    </div>
  );
}

interface FormFieldProps<T extends FieldValues> {
  field: FieldConfig<T>;
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

function getError<T extends FieldValues>(errors: FieldErrors<T>, name: Path<T>) {
  // RHF errors is a nested object keyed by field paths; safe access via string split
  const parts = String(name).split(".");
  let cur: any = errors;
  for (const p of parts) {
    if (!cur) return undefined;
    cur = cur[p as keyof typeof cur];
  }
  return cur as { message?: string } | undefined;
}

function FormField<T extends FieldValues>({ field, control, register, errors }: FormFieldProps<T>) {
  if (field.type === "array" && field.fields) {
    return (
      <ArrayField<T>
        field={field}
        control={control}
        register={register}
        errors={errors}
      />
    );
  }

  const err = getError(errors, field.name);

  return (
    <div className={`grid gap-1 ${field.expand ? "md:col-span-2" : ""}`}>
      <Label htmlFor={String(field.name)} className="text-xs text-muted-foreground">
        {field.label}
        {field.required && <span className="text-red-500">*</span>}
      </Label>
      {renderField({ ...field, control, register, errors })}
      {err?.message && <p className="text-sm text-red-500">{err.message}</p>}
    </div>
  );
}

function ArrayField<T extends FieldValues>({ field, control, register, errors }: FormFieldProps<T>) {
  const { fields: rows, append, remove } = useFieldArray({ control, name: field.name as any });
  const isRow = field.direction === "row";
  const arrayErr = getError(errors, field.name);

  return (
    <div className={`grid gap-3 ${field.expand ? "md:col-span-2" : ""}`}>
      <div className="flex justify-between items-center">
        <Label className="text-xs text-muted-foreground">
          {field.label}
          {field.required && <span className="text-red-500">*</span>}
        </Label>
        <Button type="button" variant="outline" size="sm" onClick={() => append({} as any)}>
          <Plus className="h-4 w-4 mr-1" /> Tambah
        </Button>
      </div>

      {arrayErr?.message && <p className="text-sm text-red-500">{arrayErr.message}</p>}

      <div className={`grid gap-4 items-start ${isRow ? "md:grid-cols-2" : "grid-cols-1"}`}>
        {rows.map((item, index) => (
          <div key={item.id} className="relative p-4 border rounded-lg space-y-3 w-full">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute top-0 right-0 text-red-500 hover:text-red-600"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            {field.fields?.map((nestedField) => {
              const nestedName = `${field.name}.${index}.${nestedField.name}` as Path<T>;
              const nestedErr = getError(errors, nestedName);

              return (
                <div className="grid gap-1" key={String(nestedName)}>
                  <Label htmlFor={String(nestedName)} className="text-xs text-muted-foreground">
                    {nestedField.label}
                    {nestedField.required && <span className="text-red-500">*</span>}
                  </Label>
                  {renderField({
                    ...nestedField,
                    name: nestedName,
                    control,
                    register,
                    errors,
                  })}
                  {nestedErr?.message && <p className="text-sm text-red-500">{nestedErr.message}</p>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function renderField<T extends FieldValues>({
  name,
  label,
  type,
  options,
  control,
  register,
  errors,
  readOnly,
  suffix,
  placeholder,
  required,
  min,
  max,
}: FieldConfig<T> & { control: Control<T>; register: UseFormRegister<T>; errors: FieldErrors<T> }) {
  const registerOptions = {
    valueAsNumber: type === "number",
    required: required ? `${label} wajib diisi` : undefined,
    min: min !== undefined ? { value: min, message: `${label} minimal ${min}` } : undefined,
    max: max !== undefined ? { value: max, message: `${label} maksimal ${max}` } : undefined,
  } as const;

  const err = getError(errors, name);

  // Input with suffix adornment
  if (suffix) {
    return (
      <div
        className={`flex w-full rounded-md border ${
          err ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-200" : "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        } overflow-hidden`}
      >
        <Input
          id={String(name)}
          type={type as any}
          step={type === "number" ? "any" : undefined}
          min={type === "number" && min !== undefined ? min : undefined}
          max={type === "number" && max !== undefined ? max : undefined}
          {...register(name, registerOptions as any)}
          placeholder={placeholder}
          disabled={readOnly}
          readOnly={readOnly}
          className={`rounded-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${err ? "text-red-500" : ""}`}
        />
        <span className={`flex items-center px-3 text-sm ${err ? "text-red-500" : "text-muted-foreground"} bg-muted/10 border-l`}>
          {suffix}
        </span>
      </div>
    );
  }

  switch (type) {
    case "select":
      return (
        <Controller
          name={name}
          control={control}
          rules={{ required: required ? `${label} wajib diisi` : undefined }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value ? String(field.value) : undefined} disabled={readOnly}>
              <SelectTrigger id={String(name)} className={`w-full ${err ? "border-red-500" : ""}`}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      );

    case "textarea":
      return (
        <Textarea
          id={String(name)}
          {...register(name, registerOptions as any)}
          rows={4}
          className={`resize-y ${err ? "border-red-500" : ""}`}
          placeholder={placeholder}
          disabled={readOnly}
          readOnly={readOnly}
        />
      );

    case "currency":
      return (
        <Controller
          name={name}
          control={control}
          rules={{ required: required ? `${label} wajib diisi` : undefined }}
          render={({ field }) => (
            <CurrencyInput
              readOnly={readOnly}
              name={String(name)}
              value={field.value ?? 0}
              onChange={field.onChange}
              error={err?.message}
            />
          )}
        />
      );

    case "date":
      return (
        <Controller
          name={name}
          control={control}
          rules={{ required: required ? `${label} wajib diisi` : undefined }}
          render={({ field }) => (
            <DatePickerField
              readOnly={readOnly}
              value={field.value ? new Date(field.value as any) : undefined}
              onChange={(date) => field.onChange(date ? date.toISOString() : undefined)}
              error={err?.message}
            />
          )}
        />
      );

    case "file":
      // RHF stores FileList; you might want to transform to File in onSubmit
      return (
        <Input
          id={String(name)}
          type="file"
          {...register(name)}
          disabled={readOnly}
          readOnly={readOnly}
          className={err ? "border-red-500" : ""}
        />
      );

    default:
      return (
        <Input
          id={String(name)}
          type={type}
          step={type === "number" ? "any" : undefined}
          min={type === "number" && min !== undefined ? min : undefined}
          max={type === "number" && max !== undefined ? max : undefined}
          {...register(name, registerOptions as any)}
          placeholder={placeholder}
          disabled={readOnly}
          readOnly={readOnly}
          className={err ? "border-red-500" : ""}
        />
      );
  }
}

// ======================================================
// Example usage (Zod optional) — app/produk/tambah/page.tsx
// ======================================================
/*
"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFields, FieldConfig } from "@/components/form-fields";
import { Button } from "@/components/ui/button";

const schema = z.object({
  nama: z.string().min(1, "Wajib diisi"),
  sku: z.string().min(3),
  harga: z.coerce.number().positive(),
  tipe: z.enum(["physical", "digital"]),
  lisensi: z.string().optional(),
  variants: z.array(
    z.object({ warna: z.string(), stok: z.coerce.number().int().min(0) })
  ).default([]),
}).refine((v) => (v.tipe === "digital" ? !!v.lisensi : true), { message: "Lisensi wajib untuk digital", path: ["lisensi"] });

type FormValues = z.infer<typeof schema>;

export default function Page() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { nama: "", sku: "", harga: 0, tipe: "physical", lisensi: "", variants: [] },
    mode: "onChange",
  });

  const fields: FieldConfig<FormValues>[] = [
    { name: "nama", label: "Nama Produk", type: "text", required: true },
    { name: "sku", label: "SKU", type: "text", required: true },
    { name: "harga", label: "Harga", type: "currency", required: true },
    { name: "tipe", label: "Tipe", type: "select", options: [ { label: "Physical", value: "physical" }, { label: "Digital", value: "digital" } ], required: true },
    { name: "lisensi", label: "License Key", type: "text", placeholder: "XXXXX-XXXXX" },
    {
      name: "variants",
      label: "Variants",
      type: "array",
      direction: "row",
      expand: true,
      fields: [
        { name: "warna" as any, label: "Warna", type: "text", required: true },
        { name: "stok" as any, label: "Stok", type: "number", min: 0, required: true },
      ],
    },
  ];

  const onSubmit = (values: FormValues) => {
    console.log(values);
    alert("submitted");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormFields fields={fields} control={form.control} register={form.register} errors={form.formState.errors} />
      <div className="flex justify-end"><Button type="submit">Simpan</Button></div>
    </form>
  );
}
*/

// ======================================================
// SebiForm — my take: schema-driven, type-safe, extensible
// - Works with react-hook-form (any resolver, e.g., Zod)
// - Supports: text/number/password/email/tel, textarea, select, switch,
//   radio group, checkbox group, currency, date, file, array-of-objects
// - Sections & responsive grid
// Save as: components/sebi-form.tsx
// ======================================================
"use client";
import * as React from "react";
import type {
  Control,
  FieldErrors,
  FieldPath,
  FieldValues,
  Path,
  Resolver,
  UseFormRegister,
  UseFormReturn,
} from "react-hook-form";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";

// Optional custom widgets
// Comment these if you don't have them
import CurrencyInput from "@/components/form/curency-input";
import { DatePickerField } from "@/components/form/datepicker-field";

// ---------------------------
// Types
// ---------------------------
export type SebiInputType =
  | "text"
  | "number"
  | "password"
  | "email"
  | "tel"
  | "textarea"
  | "select"
  | "switch"
  | "radio"
  | "checkbox-group"
  | "currency"
  | "date"
  | "file"
  | "array"; // array of objects

export type Option = { label: string; value: string };

export type When<T extends FieldValues> = (ctx: {
  values: T;
  watch: UseFormReturn<T>["watch"];
  get: UseFormReturn<T>["getValues"];
}) => boolean;

export interface BaseField<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type: SebiInputType;
  placeholder?: string;
  help?: string;
  required?: boolean | string; // custom message supported
  readOnly?: boolean;
  disabled?: boolean;
  colSpan?: 1 | 2; // responsive in 2-col grid
  when?: When<T>; // conditional visibility
}

export interface TextLikeField<T extends FieldValues> extends BaseField<T> {
  type: "text
