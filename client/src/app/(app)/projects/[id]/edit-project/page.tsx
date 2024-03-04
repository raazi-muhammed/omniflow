import Container from "@/components/layout/Container";
import EditProjectForm from "./EditProjectForm";
import { Button } from "@/components/ui/button";
import DeleteProject from "./DeleteProject";

export default function page() {
    return (
        <main className="w-full">
            <Container>
                <p>Edit project</p>
                <EditProjectForm />
                <DeleteProject />
            </Container>
        </main>
    );
}
