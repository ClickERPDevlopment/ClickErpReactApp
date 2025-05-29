import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ShowBookingForm from "./show-booking-form";

export default function ShowBookingView() {
  return (
    <div className="min-h-full flex justify-center items-center">
      <Card className="md:w-[450px] sm:w-full sm:mx-1 bg-white">
        <CardHeader>
          <CardTitle>Booking Show</CardTitle>
          <CardDescription>
            Input necessary data and click on show button.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ShowBookingForm />
        </CardContent>
        <CardFooter className="flex justify-between">
          <CardDescription>
            On show button click report will open in new tab.
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
