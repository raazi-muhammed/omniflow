import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import React from "react";
import AddModuleForm from "./_forms/AddModuleForm";
import FormWrapper from "@/components/layout/FormWrapper";

export default function page() {
    return (
        <Container>
            <FormWrapper>
                <Heading variant="spaced">Add modules</Heading>
                <AddModuleForm />
            </FormWrapper>
        </Container>
    );
}
