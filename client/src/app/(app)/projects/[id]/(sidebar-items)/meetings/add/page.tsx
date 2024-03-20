import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import React from "react";
import AddMeetingForm from "./_forms/AddMeetingFrom";
import FormWrapper from "@/components/layout/FormWrapper";

export default function page() {
    return (
        <Container>
            <FormWrapper>
                <Heading variant="spaced">Add meeting</Heading>
                <AddMeetingForm />
            </FormWrapper>
        </Container>
    );
}
