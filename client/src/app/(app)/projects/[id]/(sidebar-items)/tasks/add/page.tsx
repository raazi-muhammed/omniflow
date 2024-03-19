import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import React from "react";
import AddTaskForm from "./_forms/AddTaskForm";
import FormWrapper from "@/components/layout/FormWrapper";

export default function page() {
    return (
        <Container>
            <FormWrapper>
                <Heading variant="spaced">Add task</Heading>
                <AddTaskForm />
            </FormWrapper>
        </Container>
    );
}
