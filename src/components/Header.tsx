import Image from "next/image";
import Link from "next/link"
import { Button } from "@/components/ui/button"
export default function Header() {
    return (
        <header className="flex items-center justify-between py-4 px-8 border-b-[1px]">
            <div className="flex items-center justify-start space-x-8">
                <Link href="/" className="text-3xl font-bold flex items-center gap-2">
                    <Image src="/images/logo.svg" alt="Scenarios" width={40} height={40} />
                    ChatScripter
                </Link>
                <nav className="hidden md:flex">
                    <Button asChild variant="link">
                        <Link href="/games">Games</Link>
                    </Button>
                </nav>
            </div>
            {/* <div className="flex items-center justify-end space-x-8">
                <a href="/login" className="text-sm">Login</a>
                <a href="/signup" className="text-sm">Sign Up</a>
            </div> */}
        </header>
    )
}