import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import React from "react";
import AddProjectForm from "./AddProjectForm";

export default function AddProject() {
    return (
        <Container>
            <section className="max-w-xl mx-auto mt-24">
                <Heading>Add project</Heading>
                <AddProjectForm />
            </section>
        </Container>
    );
}
