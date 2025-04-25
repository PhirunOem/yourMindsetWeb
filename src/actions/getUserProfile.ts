'use server'

export const getUserProfile = async (userId: string) => {
    try {
        const url = `${process.env.API_BASE_URL}/account/profile/${userId}`;
        const userProfileResponse = await fetch(url, {
            method: "GET",
        });

        if (!userProfileResponse.ok) {
            throw new Error(`Error: ${userProfileResponse.status}`);
        }

        const user: any = await userProfileResponse.json();
        return {
            message: 'Retrieve successfull!',
            success: true,
            data: user
        };
    } catch (e) {
        console.error("Fetch error:", e);
        return {
            message: e || 'Something went wrong!',
            success: false
        };
    }
};
