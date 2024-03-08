import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import FormWrapper from "@/components/layout/FormWrapper";
import React from "react";
import AddEndpointForm from "./_forms/AddEndpointForm";

export default function page() {
    return (
        <Container>
            <FormWrapper>
                <Heading variant="spaced">Add endpoint</Heading>
                <AddEndpointForm />
            </FormWrapper>
        </Container>
    );
}
