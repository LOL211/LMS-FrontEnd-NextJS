import SideBar from "@/components/sideBar/sidebar";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SideBar content={children} />
        </>
    );
}
