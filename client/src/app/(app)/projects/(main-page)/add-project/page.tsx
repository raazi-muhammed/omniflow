import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import React from "react";
import AddProjectForm from "./_forms/AddProjectForm";
import FormWrapper from "@/components/layout/FormWrapper";

export default function AddProject() {
    return (
        <Container>
            <FormWrapper>
                <Heading variant="spaced">Add project</Heading>
                <AddProjectForm />
            </FormWrapper>
        </Container>
    );
}
