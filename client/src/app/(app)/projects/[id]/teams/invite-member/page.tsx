import Container from "@/components/layout/Container";
import InviteMemberForm from "./InviteMemberFrom";

export default function page() {
    return (
        <Container>
            <div className="mx-auto mt-24 max-w-lg">
                <p>Invite a member</p>
                <InviteMemberForm />
            </div>
        </Container>
    );
}
