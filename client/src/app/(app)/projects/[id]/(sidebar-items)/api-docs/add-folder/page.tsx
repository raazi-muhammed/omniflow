import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import FormWrapper from "@/components/layout/FormWrapper";
import React from "react";
import AddFolderForm from "./_forms/AddFolderForm";

export default function page() {
    return (
        <Container>
            <FormWrapper>
                <Heading variant="spaced">Add folder</Heading>
                <AddFolderForm />
            </FormWrapper>
        </Container>
    );
}
