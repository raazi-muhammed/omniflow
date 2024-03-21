"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, X as XIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
    addModule,
    editModule,
    getModuleList,
} from "@/services/module.service";
import { useEffect, useState } from "react";
import { IModule } from "@/types/database";
import { logger } from "@/lib/logger";
import { makeApiCall } from "@/lib/apicaller";
import Heading from "@/components/custom/Heading";
import { Card } from "@/components/ui/card";
import { DeleteAlert } from "@/components/custom/DeleteAlert";

function getLabelFromId(modules: IModule[], id: string): string {
    return modules.reduce((a, e) => {
        if (e.id === id) return e.name;
        return a;
    }, "No dpe");
}

const formSchema = z.object({
    name: z.string().min(3, "Invalid"),
    priority: z.number(),
    startDate: z.date(),
    dueDate: z.date(),
    description: z.string().min(3, "Invalid"),
    dependencies: z.array(z.string()).default([]),
    dependenciesSelector: z.string().optional(),
    parentModule: z.string().optional(),
});

export default function EditModuleForm({
    module,
    handleDelete,
    closeModel,
}: {
    module: IModule;
    handleDelete: () => void;
    closeModel: () => void;
}) {
    const { toast } = useToast();
    const router = useRouter();
    const [modules, setModules] = useState<IModule[]>([]);
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);

    const deps = module.dependencies.map((d) => ({ label: d.name, id: d.id }));
    const [dependencies, setDependencies] =
        useState<{ label: string; id: string }[]>(deps);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: module.name,
            description: module.description,
            priority: module.priority,
            parentModule: module.parentModule,
            startDate: new Date(module.startDate),
            dueDate: new Date(module.dueDate),
        },
        mode: "onTouched",
    });

    useEffect(() => {
        getModuleList().then((response) => {
            logger.debug(response.data);
            setModules(response.data);
        });
    }, []);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        let val = {
            ...values,
            dependencies: dependencies.map((e) => e.id),
        };
        logger.debug(val);

        makeApiCall(() => editModule({ id: module.id }, val), {
            toast,
            afterSuccess: () => {
                closeModel();
                router.refresh();
            },
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <Heading variant="form">Info</Heading>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Heading variant="form">Details</Heading>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Start date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "text-left font-normal h-12",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}>
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Start date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Due date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "text-left font-normal h-12",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}>
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>End date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Priority</FormLabel>
                                <Select
                                    onValueChange={(value) =>
                                        field.onChange(Number(value))
                                    }
                                    defaultValue={String(field.value)}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="priority" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="0">None</SelectItem>
                                        <SelectItem value="1">Low</SelectItem>
                                        <SelectItem value="2">
                                            Medium
                                        </SelectItem>
                                        <SelectItem value="3">High</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="parentModule"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Parent Module</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="No parent module" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {modules.map((module) => (
                                            <SelectItem value={module.id}>
                                                {module.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Heading variant="form">Dependencies</Heading>

                <FormField
                    control={form.control}
                    name="dependenciesSelector"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dependencies</FormLabel>
                            <section className="flex flex-wrap gap-2 pb-2">
                                {dependencies.map((dep, i) => (
                                    <Card className="flex w-fit gap-2 p-2 ps-3">
                                        {dep.label}
                                        <Button
                                            onClick={() => {
                                                const array = dependencies;
                                                array.splice(i, 1);
                                                setDependencies([...array]);
                                            }}
                                            type="button"
                                            size="icon"
                                            variant="destructiveFlat"
                                            className="flex size-5 align-middle">
                                            <XIcon size="1em" />
                                        </Button>
                                    </Card>
                                ))}
                            </section>
                            <Select
                                onValueChange={(val) => {
                                    field.onChange();
                                    setDependencies((d) => [
                                        ...d,
                                        {
                                            label: getLabelFromId(modules, val),
                                            id: val,
                                        },
                                    ]);
                                }}
                                defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Add dependencies" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {modules.map((module) => (
                                        <SelectItem
                                            disabled={dependencies.some(
                                                (dep) => dep.id === module.id
                                            )}
                                            value={module.id}>
                                            {module.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <section className="flex justify-between">
                    <DeleteAlert handleDelete={handleDelete} />
                    <div className="flex w-fit gap-4">
                        <Button
                            onClick={() => router.back()}
                            type="button"
                            variant="outline">
                            Cancel
                        </Button>

                        <Button type="submit">Add</Button>
                    </div>
                </section>
            </form>
        </Form>
    );
}
