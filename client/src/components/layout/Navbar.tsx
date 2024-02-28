import Avatar from "../custom/Avatar";
import { Card } from "../ui/card";
import Container from "./Container";
import { ChevronDown as ChevronDownIcon } from "lucide-react";

function Navbar() {
    return (
        <Card className="rounded-none p-4">
            <Container>
                <nav className="flex ms-auto w-fit gap-8">
                    <div className="ms-auto flex gap-4">
                        <Avatar src="https://github.com/shadcn.png" />
                        <div>
                            <p>Raazi Muhmmaed</p>
                            <small className="text-secondary flex -mt-1">
                                raazi@gmail.com
                            </small>
                        </div>
                        <ChevronDownIcon
                            size="1em"
                            className="my-auto text-secondary"
                        />
                    </div>
                </nav>
            </Container>
        </Card>
    );
}

export default Navbar;
