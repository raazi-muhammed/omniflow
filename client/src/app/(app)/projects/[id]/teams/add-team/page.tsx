import Heading from "@/components/custom/Heading";
import AddTeamForm from "./AddTeamForm";
import Container from "@/components/layout/Container";
import FormWrapper from "@/components/layout/FormWrapper";

export default function page() {
    return (
        <div className="w-full">
            <Container>
                <FormWrapper>
                    <Heading variant="spaced">Add a team</Heading>
                    <AddTeamForm />
                </FormWrapper>
            </Container>
        </div>
    );
}
