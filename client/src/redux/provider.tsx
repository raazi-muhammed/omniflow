"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { fetchCurrentUser } from "./features/authSlice";

store.dispatch(fetchCurrentUser());

export default function ReduxProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Provider store={store}>{children}</Provider>;
}
