import CustomLink from "@/components/custom/CustomLink";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { formatConstants } from "@/lib/formaters";
import { ITask } from "@/types/database";
import moment from "moment";

export default function TaskCard({
    task,
    onHomeScreen = true,
}: {
    task: ITask;
    onHomeScreen?: boolean;
}) {
    return (
        <Card className="p-4">
            <CustomLink href={onHomeScreen ? `tasks/${task.id}` : `${task.id}`}>
                {task.name}
            </CustomLink>
            <div className="flex justify-between">
                <Label>{moment(task.dueDate).format("ll")}</Label>
                <Badge className="ms-auto flex w-fit" variant="secondary">
                    {formatConstants(task.status)}
                </Badge>
            </div>
        </Card>
    );
}
