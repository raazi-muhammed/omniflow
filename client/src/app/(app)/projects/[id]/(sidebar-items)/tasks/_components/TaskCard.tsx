import AnimateCard from "@/components/animated/AnimateCard";
import CustomLink from "@/components/custom/CustomLink";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { formatConstants } from "@/lib/formaters";
import { ITask } from "@/types/database";
import moment from "moment";
import Link from "next/link";

export default function TaskCard({
    task,
    onHomeScreen = true,
}: {
    task: ITask;
    onHomeScreen?: boolean;
}) {
    return (
        <AnimateCard type="subtle">
            <Link href={onHomeScreen ? `tasks/${task.id}` : `${task.id}`}>
                <Card className="p-4">
                    {task.name}
                    <div className="flex justify-between">
                        <Label>{moment(task.dueDate).format("ll")}</Label>
                        <Badge
                            className="ms-auto flex w-fit"
                            variant="secondary">
                            {formatConstants(task.status)}
                        </Badge>
                    </div>
                </Card>
            </Link>
        </AnimateCard>
    );
}
