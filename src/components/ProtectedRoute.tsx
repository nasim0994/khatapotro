import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userLogout } from "@/redux/slices/authSlice";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const isTokenExpired = (token: string) => {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useAppSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    if (!token) {
      router.replace("/login");
      return;
    }

    const tokenExpired = isTokenExpired(token);
    if (tokenExpired) {
      dispatch(userLogout());
      router.replace("/login");
    }
  }, [token, isReady, dispatch]);

  if (!isReady || !token || isTokenExpired(token)) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0D1117",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#2F80ED" />
      </View>
    );
  }

  return <>{children}</>;
}
