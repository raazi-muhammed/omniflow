import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { getEndpoint } from "@/services/endpoints.service";
import { IEndpoint } from "@/types/database";
import { cookies } from "next/headers";

async function loadEndpoint(id: string) {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const response = await getEndpoint(
        { id },
        {
            headers: {
                Authorization: `Bearer ${userToken}`,
                Project: `Bearer ${projectToken}`,
            },
        }
    );
    return response.data;
}

export default async function page({
    params,
}: {
    params: { endpointId: string };
}) {
    const endpoint: IEndpoint = await loadEndpoint(params.endpointId);

    return (
        <Container>
            <Heading variant="spaced">{endpoint.name}</Heading>
            <small className="text-secondary">Method</small>
            <p>{endpoint.method}</p>
            <br />
            <small className="text-secondary">URL</small>
            <p>{endpoint.route}</p>
            <br />
            <small className="text-secondary">Summary</small>
            <p>{endpoint.summary ? endpoint.summary : "No summary"}</p>
            <br />
        </Container>
    );
}
