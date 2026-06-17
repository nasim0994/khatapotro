import { useGetUserBalanceReportQuery } from "@/redux/features/reportApi";
import { useAppSelector } from "@/redux/hooks";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Text, View } from "react-native";

export default function DashboardCard() {
  const { loggedUser } = useAppSelector((state) => state.auth);
  dayjs.extend(customParseFormat);

  const { data } = useGetUserBalanceReportQuery(loggedUser?._id, {
    skip: !loggedUser?._id,
  });
  const balance = data?.data;

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "rgba(47, 128, 237, 0.15)",
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: "rgba(47, 128, 237, 0.3)",
        shadowColor: "#2F80ED",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Text
          style={{
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: 11,
            letterSpacing: 0.8,
            textTransform: "uppercase",
            fontFamily: "Poppins-SemiBold",
          }}
        >
          Balance
        </Text>
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <Text
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: 10,
              letterSpacing: 0.4,
              fontFamily: "Poppins-Medium",
            }}
          >
            {dayjs(balance?.month, "MM-YYYY").format("MMM-YYYY")}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 28,
            letterSpacing: -0.5,
            fontFamily: "Poppins-SemiBold",
          }}
        >
          {balance?.balance || 0}
        </Text>
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          marginBottom: 12,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* INCOME COLUMN */}
        <View
          style={{
            flex: 1,
            paddingHorizontal: 2,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <View
              style={[
                {
                  width: 3,
                  height: 12,
                  borderRadius: 2,
                  marginRight: 6,
                },
                { backgroundColor: "#34C759" },
              ]}
            />
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.4)",
                fontSize: 10,
                letterSpacing: 0.4,
                fontFamily: "Poppins-SemiBold",
              }}
            >
              INCOME
            </Text>
          </View>
          <Text
            style={[
              {
                fontSize: 16,
                paddingLeft: 9,
                fontFamily: "Poppins-SemiBold",
                color: "#FFFFFF",
              },
            ]}
          >
            +{balance?.income || 0}
          </Text>
        </View>

        {/* VERTICAL SEPARATOR LINE */}
        <View
          style={{
            width: 1,
            height: 36,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            marginHorizontal: 12,
          }}
        />

        {/* EXPENSES COLUMN */}
        <View
          style={{
            flex: 1,
            paddingHorizontal: 2,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <View
              style={[
                {
                  width: 3,
                  height: 12,
                  borderRadius: 2,
                  marginRight: 6,
                },
                { backgroundColor: "#EB5757" },
              ]}
            />
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.4)",
                fontSize: 10,
                fontFamily: "Poppins-SemiBold",
                letterSpacing: 0.4,
              }}
            >
              EXPENSES
            </Text>
          </View>
          <Text
            style={[
              {
                fontSize: 16,
                fontFamily: "Poppins-SemiBold",
                paddingLeft: 9,
                color: "#FFA1A1",
              },
            ]}
          >
            -{balance?.expense || 0}
          </Text>
        </View>
      </View>
    </View>
  );
}
