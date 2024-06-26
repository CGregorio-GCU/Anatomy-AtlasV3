import { redirect } from "next/navigation";

import { Items } from "./items";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { FeedWrapper } from "@/components/feed-wrapper";
import Image from "next/image"

const ShopPage = async () => {
    const userProgressData = getUserProgress();
    
    const [
        userProgress
    ] = await Promise.all([
        userProgressData,
    ]);

    //if no user progress found
    if (!userProgress || !userProgress.activeCourse) {
        redirect ("/courses")
    }

    return (
        <div className="flex flex-row-reverse gap-[49px] px-6">
            <StickyWrapper>
                <UserProgress 
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                />
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image 
                        src="/shop.svg"
                        alt="Shop"
                        width={90}
                        height={90}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Shop
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Spend your points on something nice!
                    </p>
                    <Items 
                        hearts={userProgress.hearts}
                        points={userProgress.points}
                    />
                </div>
            </FeedWrapper>
        </div>
    );
}

export default ShopPage;