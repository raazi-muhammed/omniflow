import Heading from "@/components/custom/Heading";
import AddTeamForm from "./AddTeamForm";
import Container from "@/components/layout/Container";

export default function page() {
    return (
        <div className="w-full">
            <Container>
                <Heading>Add a team</Heading>
                <AddTeamForm />
            </Container>
        </div>
    );
}
