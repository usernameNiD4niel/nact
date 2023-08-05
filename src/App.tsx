import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
    RedirectToSignIn,
} from "@clerk/clerk-react";

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
    console.log("error: no publish key specified");

    throw new Error("Missing PUBLISHABLE_KEY");
}

const clerkKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
    return (
        <ClerkProvider publishableKey={clerkKey}>
            <SignedIn>
                <Welcome />
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </ClerkProvider>
    );
}

function Welcome() {
    return (
        <div>
            <h1 className="text-blue-600 font-bold text-2xl">
                Hello {useUser().user?.fullName} good day!
            </h1>
            <UserButton />
        </div>
    );
}

export default App;
