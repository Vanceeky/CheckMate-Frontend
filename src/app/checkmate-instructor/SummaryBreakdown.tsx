import React from "react";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const SummaryBreakdown = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-3">
            Total Answer Keys
            <span className="font-bold text-foreground">10</span>
          </div>

          <div className="flex justify-between items-center mb-3">
            Published
            <span className="font-bold text-green-500">15</span>
          </div>

          <div className="flex justify-between items-center">
            Draft
            <span className="font-bold text-orange-500">25</span>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between items-center">
            Total Questions
            <span className="font-bold">50</span>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Exam Type Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-3">
            Prelim
            <Badge variant="outline" className="text-sm bg-blue-200">
              1
            </Badge>
          </div>

          <div className="flex justify-between items-center mb-3">
            Midterm
            <Badge variant="outline" className="text-sm bg-purple-200">
              1
            </Badge>
          </div>

          <div className="flex justify-between items-center mb-3">
            Semi-Finals
            <Badge variant="outline" className="text-sm bg-orange-200">
              1
            </Badge>
          </div>

          <div className="flex justify-between items-center mb-3">
            Finals
            <Badge variant="outline" className="text-sm bg-red-200">
              1
            </Badge>
          </div>

          <div className="flex justify-between items-center mb-3">
            Summer Class
            <Badge variant="outline" className="text-sm bg-green-200">
              1
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryBreakdown;
