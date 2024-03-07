import Container from "@/components/layout/Container";
import InviteMemberForm from "./_forms/InviteMemberFrom";
import FormWrapper from "@/components/layout/FormWrapper";
import Heading from "@/components/custom/Heading";

export default function page() {
    return (
        <Container>
            <FormWrapper>
                <Heading variant="spaced"> Invite a member</Heading>
                <InviteMemberForm />
            </FormWrapper>
        </Container>
    );
}
