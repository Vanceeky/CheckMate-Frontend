import React from 'react'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Users, Upload, UserPlus, GraduationCap } from 'lucide-react'

import { Button } from './ui/button'



const QuickActionsPanel = () => {

    const actions = [
        {
        title: "Bulk Upload Students",
        description: "Upload multiple students via CSV",
        icon: Upload,
        color: "bg-blue-500 hover:bg-blue-600",
        textColor: "text-blue-600",
        bgColor: "bg-blue-50",
        },
        {
        title: "Bulk Upload Teachers",
        description: "Upload multiple teachers via CSV",
        icon: Upload,
        color: "bg-green-500 hover:bg-green-600",
        textColor: "text-green-600",
        bgColor: "bg-green-50",
        },
        {
        title: "Add Student",
        description: "Add a new student manually",
        icon: UserPlus,
        color: "bg-blue-500 hover:bg-blue-600",
        textColor: "text-blue-600",
        bgColor: "bg-blue-50",
        },
        {
        title: "Add Teacher",
        description: "Add a new teacher manually",
        icon: GraduationCap,
        color: "bg-green-500 hover:bg-green-600",
        textColor: "text-green-600",
        bgColor: "bg-green-50",
        },
    ];

    return (
        <Card className="sticky top-6">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Quick Actions
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            {actions.map((action, index) => {
            const Icon = action.icon;
            return (
                <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-auto p-4 hover:bg-primary/10 hover:text-primary cursor-pointer"
                >
                <div className="flex items-start gap-3 w-full ">
                    <div className={`p-2 rounded-lg ${action.bgColor} flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${action.textColor}`} />
                    </div>
                    <div className="text-left">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                        {action.description}
                    </div>
                    </div>
                </div>
                </Button>
            );
            })}
            
            <div className="pt-4 border-t">
            <div className="space-y-2">
                <p className="text-sm font-medium">Need Help?</p>
                <p className="text-xs text-muted-foreground">
                Check our documentation for bulk upload templates and guidelines.
                </p>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                View Documentation →
                </Button>
            </div>
            </div>
        </CardContent>
        </Card>
    );
}

export default QuickActionsPanel