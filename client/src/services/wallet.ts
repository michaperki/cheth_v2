// src/services/wallet.ts
interface WalletLoginResponse {
  success: boolean;
  token?: string;
  error?: string;
}

export const submitWalletLogin = async (
  user: string,
  message: string,
  signature: string
): Promise<WalletLoginResponse> => {
  try {
    // use ENV variables
    const response = await fetch(
      `${import.meta.env.VIRTUAL_LABS_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          message,
          signature,
        }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};
