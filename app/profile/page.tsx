import { ProfileContent } from "@/features/profile/profile-content";
import { Suspense } from "react";

export default function ProfilePage() {
    return (
        <div className="h-screen w-full">
            <Suspense fallback={
                <div className="flex h-screen w-full items-center justify-center bg-gray-100">
                    <p className="text-lg text-gray-600">Carregando Perfil...</p>
                </div>
            }>
                <ProfileContent />
            </Suspense>
        </div>
    );
}