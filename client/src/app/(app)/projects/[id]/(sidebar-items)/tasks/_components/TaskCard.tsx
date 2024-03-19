import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ITask } from "@/types/database";
import moment from "moment";

export default function TaskCard({ task }: { task: ITask }) {
    return (
        <Card className="p-4">
            <p>{task.name}</p>
            <div className="flex justify-between">
                <Label>{moment(task.dueDate).format("ll")}</Label>
                <Badge className="ms-auto flex w-fit" variant="secondary">
                    {task.status}
                </Badge>
            </div>
        </Card>
    );
}
