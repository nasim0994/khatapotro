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
        backgroundColor: "rgba(37, 62, 115, 0.3)",
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.08)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        marginVertical: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Text
          style={{
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: 12,
            fontWeight: "700",
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Balance
        </Text>
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <Text
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: 11,
              fontWeight: "600",
              letterSpacing: 0.5,
            }}
          >
            {dayjs(balance?.month, "MM-YYYY").format("MMM-YYYY")}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginBottom: 14,
        }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 32,
            fontWeight: "700",
            letterSpacing: -0.5,
          }}
        >
          {balance?.balance || 0}
        </Text>
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          marginBottom: 16,
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
            paddingHorizontal: 4,
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
                  height: 14,
                  borderRadius: 2,
                  marginRight: 8,
                },
                { backgroundColor: "#34C759" },
              ]}
            />
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.4)",
                fontSize: 11,
                fontWeight: "700",
                letterSpacing: 0.5,
              }}
            >
              INCOME
            </Text>
          </View>
          <Text
            style={[
              {
                fontSize: 18,
                fontWeight: "700",
                paddingLeft: 11,
              },
              { color: "#FFFFFF" },
            ]}
          >
            +{balance?.income || 0}
          </Text>
        </View>

        {/* VERTICAL SEPARATOR LINE */}
        <View
          style={{
            width: 1,
            height: 40,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            marginHorizontal: 15,
          }}
        />

        {/* EXPENSES COLUMN */}
        <View
          style={{
            flex: 1,
            paddingHorizontal: 4,
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
                  height: 14,
                  borderRadius: 2,
                  marginRight: 8,
                },
                { backgroundColor: "#EB5757" },
              ]}
            />
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.4)",
                fontSize: 11,
                fontWeight: "700",
                letterSpacing: 0.5,
              }}
            >
              EXPENSES
            </Text>
          </View>
          <Text
            style={[
              {
                fontSize: 18,
                fontWeight: "700",
                paddingLeft: 11,
              },
              { color: "#FFA1A1" },
            ]}
          >
            -{balance?.expense || 0}
          </Text>
        </View>
      </View>
    </View>
  );
}
