import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";
import { useForm } from "react-hook-form";
import { MdOutlineClear } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router";
import { BuyerType } from "src/actions/Sweater/merch-buyer-action";
import {
    Delete,
    Save,
    Update,
} from "src/actions/Sweater/merch-buyer-action";
import { Alert, AlertTitle, AlertDescription } from "src/components/ui/alert";
import { Button } from "src/components/ui/button";
import { Checkbox } from "src/components/ui/checkbox";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "src/components/ui/command";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "src/components/ui/popover";
import useAxiosInstance from "src/lib/axios-instance";
import { cn } from "src/lib/utils";
import { PageAction } from "src/utility/page-actions";
import { ReactQueryKey } from "src/utility/react-query-key";
import { z } from "zod";
import { CountryType } from "src/actions/get-country-action";
import moment from "moment";
import { GetCompany } from "src/actions/Sweater/swt-planning-board-configure-action";
import { CompanyType } from "src/actions/Configurations/company-action";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "src/components/ui/table";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";



const formSchema = z.object({
    Id: z.number().default(0),
    FACTORYID: z.number().default(0),
    CODE: z.string().min(1, "Code is required."),
    NAME: z.string().min(1, "Name is required."),
    DISPLAY_NAME: z.string().min(1, "Display name is required."),
    CONTACT: z.string().default(""),
    EMAIL: z.string().default(""),
    COMMISSION: z.string().default("0"),
    MAINBUYERID: z.number().default(0),
    COUNTRYID: z.number().default(0),
    ADDRESS: z.string().default(""),
    BUNDLENOSTARTFROMZERO: z.boolean().default(true),
    ISACTIVE: z.boolean().default(true),
});


type comboBoxDataType = {
    label: string;
    value: string;
};


export default function BuyerForm() {
    //--
    const [mainBuyers, setMainBuyers] = React.useState<comboBoxDataType[]>();
    const [openMainBuyer, setOpenMainBuyer] = React.useState(false);

    const [country, setCountry] = React.useState<comboBoxDataType[]>();
    const [openCountry, setOpenCountry] = React.useState(false);

    const [factory, setFactory] = React.useState<comboBoxDataType[]>();
    const [openFactory, setOpenFactory] = React.useState(false);

    const {
        data: factoryData,
        isError,
        error,
    } = GetCompany<CompanyType>();

    //--
    //--------------------------
    const location = useLocation();
    const navigator = useNavigate();
    const axios = useAxiosInstance();
    //--------------------------

    React.useEffect(() => {
        let _: comboBoxDataType[] = [];

        factoryData?.forEach((ele) => {
            _.push({ label: ele.NAME || "", value: ele.ID.toString() });
        });
        setFactory([..._]);
    }, []);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // console.log("form-value", values);

        var data: BuyerType = {
            Id: values.Id,
            NAME: values.NAME,
            CODE: values.CODE,
            DISPLAY_NAME: values.DISPLAY_NAME,
            CONTACT: values.CONTACT,
            EMAIL: values.EMAIL,
            COMMISSION: Number(values.COMMISSION),
            MAINBUYERID: values.MAINBUYERID,
            COUNTRYID: values.COUNTRYID,
            ADDRESS: values.ADDRESS,
            BUNDLENOSTARTFROMZERO: values.BUNDLENOSTARTFROMZERO ? "1" : "0",
            ISACTIVE: values.ISACTIVE ? "1" : "0",
            Country: null,
            REMARKS: null,
            CREATEBY: "",
            CREATEDATE: moment().format("YYYY-MM-DD"),
            UPDATEBY: null,
            UPDATEDATE: moment().format("YYYY-MM-DD"),
            IS_LOCAL: "",
            OUTSIDE_CHALLAN_BUYER_NAME: "",
        };

    }

    return (
        <>
            <div className="w-full p-1">

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-3">
                            <div className="flex justify-between items-end">
                                <FormField
                                    control={form.control}
                                    name="FACTORYID"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col flex-1">
                                            <FormLabel>Factory</FormLabel>
                                            <Popover open={openFactory} onOpenChange={setOpenFactory}>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={openFactory}
                                                            className={cn(
                                                                "w-full justify-between",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value
                                                                ? factory?.find((buyer) => Number(buyer.value) === field.value)?.label
                                                                : "Select a buyer"}
                                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search floor..." className="h-9" />
                                                        <CommandList>
                                                            <CommandEmpty>No buyer found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {factory?.map((buyer) => (
                                                                    <CommandItem
                                                                        value={buyer.label}
                                                                        key={buyer.value}
                                                                        onSelect={() => {
                                                                            form.setValue("FACTORYID", Number(buyer.value));
                                                                            setOpenFactory(false);
                                                                        }}
                                                                    >
                                                                        {buyer.label}
                                                                        <CheckIcon
                                                                            className={cn(
                                                                                "ml-auto h-4 w-4",
                                                                                Number(buyer.value) === field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    onClick={() => form.resetField("FACTORYID")}
                                    variant={"outline"}
                                    type="button"
                                    className="m-0 ml-1 px-[12px]"
                                >
                                    <MdOutlineClear className="rounded text-slate-600 m-0" />
                                </Button>
                            </div>

                            <div className="flex justify-between items-end">
                                <FormField
                                    control={form.control}
                                    name="FACTORYID"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col flex-1">
                                            <FormLabel>Liability(LC)</FormLabel>
                                            <Popover open={openFactory} onOpenChange={setOpenFactory}>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={openFactory}
                                                            className={cn(
                                                                "w-full justify-between",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value
                                                                ? factory?.find((buyer) => Number(buyer.value) === field.value)?.label
                                                                : "Select a buyer"}
                                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search floor..." className="h-9" />
                                                        <CommandList>
                                                            <CommandEmpty>No buyer found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {factory?.map((buyer) => (
                                                                    <CommandItem
                                                                        value={buyer.label}
                                                                        key={buyer.value}
                                                                        onSelect={() => {
                                                                            form.setValue("FACTORYID", Number(buyer.value));
                                                                            setOpenFactory(false);
                                                                        }}
                                                                    >
                                                                        {buyer.label}
                                                                        <CheckIcon
                                                                            className={cn(
                                                                                "ml-auto h-4 w-4",
                                                                                Number(buyer.value) === field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    onClick={() => form.resetField("FACTORYID")}
                                    variant={"outline"}
                                    type="button"
                                    className="m-0 ml-1 px-[12px]"
                                >
                                    <MdOutlineClear className="rounded text-slate-600 m-0" />
                                </Button>
                            </div>

                            <div className="flex justify-between items-end">
                                <FormField
                                    control={form.control}
                                    name="FACTORYID"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col flex-1">
                                            <FormLabel>Liability(TT)</FormLabel>
                                            <Popover open={openFactory} onOpenChange={setOpenFactory}>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={openFactory}
                                                            className={cn(
                                                                "w-full justify-between",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value
                                                                ? factory?.find((buyer) => Number(buyer.value) === field.value)?.label
                                                                : "Select a buyer"}
                                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search floor..." className="h-9" />
                                                        <CommandList>
                                                            <CommandEmpty>No buyer found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {factory?.map((buyer) => (
                                                                    <CommandItem
                                                                        value={buyer.label}
                                                                        key={buyer.value}
                                                                        onSelect={() => {
                                                                            form.setValue("FACTORYID", Number(buyer.value));
                                                                            setOpenFactory(false);
                                                                        }}
                                                                    >
                                                                        {buyer.label}
                                                                        <CheckIcon
                                                                            className={cn(
                                                                                "ml-auto h-4 w-4",
                                                                                Number(buyer.value) === field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    onClick={() => form.resetField("FACTORYID")}
                                    variant={"outline"}
                                    type="button"
                                    className="m-0 ml-1 px-[12px]"
                                >
                                    <MdOutlineClear className="rounded text-slate-600 m-0" />
                                </Button>
                            </div>
                            <div className="flex justify-between items-end">
                                <FormField
                                    control={form.control}
                                    name="FACTORYID"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col flex-1">
                                            <FormLabel>Sales Ledger</FormLabel>
                                            <Popover open={openFactory} onOpenChange={setOpenFactory}>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={openFactory}
                                                            className={cn(
                                                                "w-full justify-between",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value
                                                                ? factory?.find((buyer) => Number(buyer.value) === field.value)?.label
                                                                : "Select a buyer"}
                                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search floor..." className="h-9" />
                                                        <CommandList>
                                                            <CommandEmpty>No buyer found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {factory?.map((buyer) => (
                                                                    <CommandItem
                                                                        value={buyer.label}
                                                                        key={buyer.value}
                                                                        onSelect={() => {
                                                                            form.setValue("FACTORYID", Number(buyer.value));
                                                                            setOpenFactory(false);
                                                                        }}
                                                                    >
                                                                        {buyer.label}
                                                                        <CheckIcon
                                                                            className={cn(
                                                                                "ml-auto h-4 w-4",
                                                                                Number(buyer.value) === field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    onClick={() => form.resetField("FACTORYID")}
                                    variant={"outline"}
                                    type="button"
                                    className="m-0 ml-1 px-[12px]"
                                >
                                    <MdOutlineClear className="rounded text-slate-600 m-0" />
                                </Button>
                            </div>

                            <div className="flex justify-between items-end">
                                <FormField
                                    control={form.control}
                                    name="FACTORYID"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col flex-1">
                                            <FormLabel>Account Receivabe</FormLabel>
                                            <Popover open={openFactory} onOpenChange={setOpenFactory}>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={openFactory}
                                                            className={cn(
                                                                "w-full justify-between",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value
                                                                ? factory?.find((buyer) => Number(buyer.value) === field.value)?.label
                                                                : "Select a buyer"}
                                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search floor..." className="h-9" />
                                                        <CommandList>
                                                            <CommandEmpty>No buyer found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {factory?.map((buyer) => (
                                                                    <CommandItem
                                                                        value={buyer.label}
                                                                        key={buyer.value}
                                                                        onSelect={() => {
                                                                            form.setValue("FACTORYID", Number(buyer.value));
                                                                            setOpenFactory(false);
                                                                        }}
                                                                    >
                                                                        {buyer.label}
                                                                        <CheckIcon
                                                                            className={cn(
                                                                                "ml-auto h-4 w-4",
                                                                                Number(buyer.value) === field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    onClick={() => form.resetField("FACTORYID")}
                                    variant={"outline"}
                                    type="button"
                                    className="m-0 ml-1 px-[12px]"
                                >
                                    <MdOutlineClear className="rounded text-slate-600 m-0" />
                                </Button>
                            </div>
                        </div>

                        <div className="mt-3">
                            <Table className="min-w-full rounded-md">
                                <TableHeader className="bg-green-100 rounded-md">
                                    <TableRow className=" rounded-md">
                                        <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                                            S/L
                                        </TableHead>
                                        <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                                            Factory
                                        </TableHead>
                                        <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                                            Liability(LC)
                                        </TableHead>
                                        <TableHead className="border border-gray-300 text-center px-4">
                                            Liability(TT)
                                        </TableHead>
                                        <TableHead className="border border-gray-300 text-center px-4">
                                            Sales Ledger
                                        </TableHead>
                                        <TableHead className="border border-gray-300 text-center px-4">
                                            Account Receivable
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex justify-between mt-3">
                            <div className="flex gap-2">
                            </div>
                            <Button
                                type="reset"
                                onClick={() =>
                                    location.pathname.includes("win/")
                                        ? navigator("/win/merchandising/buyer")
                                        : navigator("/dashboard/merchandising/buyer")
                                }
                                variant={"outline"}
                                className={cn("w-24")}
                            >
                                Back
                            </Button>
                        </div>
                    </form>
                </Form >
            </div>
        </>
    );
}
