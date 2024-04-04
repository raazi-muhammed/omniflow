import { useAppSelector } from "@/redux/store";
import { AccessLevels } from "@/types/database";

export default function useHasAccess() {
    const project = useAppSelector(
        (state) => state.projectReducer.projectData?.access
    );
    const hasAccessToApiDoc = {
        edit:
            (!!project && project.apiDoc < AccessLevels.CAN_EDIT) ||
            project == null,
    };
    const hasAccessToDbDesign = {
        edit:
            (!!project && project.dbDesign < AccessLevels.CAN_EDIT) ||
            project == null,
    };

    return { hasAccessToApiDoc, hasAccessToDbDesign };
}
