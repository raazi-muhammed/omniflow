import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import React from "react";
import FormWrapper from "@/components/layout/FormWrapper";
import AddTableForm from "./_components/AddTableForm";

export default function page() {
    return (
        <Container>
            <FormWrapper>
                <Heading variant="spaced">Add table</Heading>
                <AddTableForm />
            </FormWrapper>
        </Container>
    );
}
